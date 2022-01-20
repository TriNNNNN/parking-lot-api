import dayjs from 'dayjs'
import {APIError, formatResponse} from '../../utils'
import {
	getActiveParkingSlotConfig, toggleParkingSlotConfig, saveParkingSlotConfig, insertParkingSlotDummyRows, toggleParkingSlot, findOccupiedSlots,
	findAvailableSlots, findTotalParkingSlots, updateTimeExceededSlots, updateSlot, checkIfSlotAlreadyAllocated
} from './parkingslot.service'


/**
 * Save parking config and create 'total_parking_slot' no. of parking slots
 * Disables previously added parking config and
 * create new parking config and 'n' no of slot on every request
 * @param {Number} total_parking_slot			total no. of parking slot
 * @param {Number} reserved_parking_capacity	reserved parking capacity in percent
 */
const saveParkingConfig = async(req, res, next) => {
	try {
		if (!req.body) {
			throw new APIError('Invalid request', 500)
		}
		let generalParkingRows = []
		let reservedParkingRows = []
		const activeParkingSlotConfig = await getActiveParkingSlotConfig()
		if (activeParkingSlotConfig && activeParkingSlotConfig.is_active) {
			await toggleParkingSlotConfig(activeParkingSlotConfig._id)
			await toggleParkingSlot(activeParkingSlotConfig._id)
		}
		const saveConfig = await saveParkingSlotConfig(req.body)
		if (!saveConfig._id) {
			throw new APIError('Cannot save parking config', 500)
		}
		let totalReservedSlots = Math.floor(saveConfig.total_parking_slot / 100 * saveConfig.reserved_parking_capacity)
		let totalGeneralSlots = Math.ceil(saveConfig.total_parking_slot - totalReservedSlots)
		totalReservedSlots = totalReservedSlots ? totalReservedSlots : totalReservedSlots + 1 // if reserved capacity goes below 0
		totalGeneralSlots = totalReservedSlots ? totalGeneralSlots : totalGeneralSlots - 1
		generalParkingRows = generateParkingSlots(saveConfig._id, totalGeneralSlots, false)
		reservedParkingRows = generateParkingSlots(saveConfig._id, totalReservedSlots, true)

		await insertParkingSlotDummyRows([...generalParkingRows, ...reservedParkingRows])
		res.status(200).send(formatResponse('Parking config saved successfully', {parkingSlotConfig: saveConfig}))
	}
	catch (err) {
		next(err)
	}
}

/**
 * Fetch occupied parking slot details
 * Also releases the parking slot which has exceeded the buffer time
 * @return {Array} returns occupied parking slot details
 */
const getOccupiedSlots = async(req, res, next) => {
	try {
		const totalParkingSlots = await findTotalParkingSlots()
		await computeActualAvailableSlots(totalParkingSlots)
		const occupiedSlots = await findOccupiedSlots()
		res.status(200).send(formatResponse(!occupiedSlots.length ? 'No slots occupied' : 'Fetched occupied slots successfully', !occupiedSlots.length ? {} : {occupiedSlots}))
	}
	catch (err) {
		next(err)
	}
}

/**
 * Fetch available parking slot details
 * Also releases the parking slot which has exceeded the buffer time
 * @return {Array} returns available parking slot details
 */
const getAvailableSlots = async(req, res, next) => {
	try {
		const totalParkingSlots = await findTotalParkingSlots()
		const availableSlots = await computeActualAvailableSlots(totalParkingSlots)
		res.status(200).send(formatResponse(!availableSlots.length ? 'No slots available' : 'Fetched available slots successfully', !availableSlots.length ? {} : {availableSlots}))
	}
	catch (err) {
		next(err)
	}
}

/**
 * Assign parking slot to user
 * Releases the parking slot which has exceeded the buffer time
 * If more than 50% capacity is occupied buffer time is updated to 15 mins( Default Buffer time: 30 mins)
 * If reserved capacity is full for Female and Specially abled person, slots are assigned from general parking slot
 * @return {Object} slotInfo returns alloted slot info
 */
// eslint-disable-next-line consistent-return
const bookSlot = async(req, res, next) => {
	try {
		const {user} = req
		const totalParkingSlots = await findTotalParkingSlots()
		const actualAvailableSlots = await computeActualAvailableSlots(totalParkingSlots)
		const alreadyAssignedSlot = await checkIfSlotAlreadyAllocated(user.mobile)
		if (alreadyAssignedSlot) {
			return res.status(200).send(formatResponse('Parking slot already assigned', {slotInfo: alreadyAssignedSlot}))
		}
		if (actualAvailableSlots.length) {
			const slotInfo = await assignSlot(actualAvailableSlots, user)
			return res.status(200).send(formatResponse('Slot Booked Successfully', {slotInfo}))
		}

		return res.status(200).send(formatResponse('No slots available', {}))
	}
	catch (err) {
		next(err)
	}
}

/**
 * Assign parking slot to user
 * Identifies slot to be allocated in general or reserved slots
 * @param {Array}	availableSlots refreshed available slots
 * @param {Object}	user user data
 * @return {Object} returns parking slot and returns parking slot and booked time
 */
const assignSlot = async(availableSlots, user) => {
	let slotInfo
	const userBelongsReservedType = Boolean(user.specially_abled || user.gender === 'female')
	const reservedPendingForAllotment = availableSlots.filter(ele => !ele.user_id && !ele.booked_datetime && ele.is_reserved)
	const generalPendingForAllotment = availableSlots.filter(ele => !ele.user_id && !ele.booked_datetime && !ele.is_reserved)
	if (userBelongsReservedType && reservedPendingForAllotment.length) {
		const pendingForAllotment = reservedPendingForAllotment.find(ele => ele.is_reserved)
		slotInfo = await updateSlot({_id: pendingForAllotment._id}, {
			user_id: user._id,
			booked_datetime: dayjs().format('YYYY-MM-DDTHH:mm')
		})
	}
	else {
		const pendingForAllotment = generalPendingForAllotment.find(ele => !ele.user_id && !ele.booked_datetime)
		slotInfo = await updateSlot({_id: pendingForAllotment._id}, {
			user_id: user._id,
			booked_datetime: dayjs().format('YYYY-MM-DDTHH:mm')
		})
	}
	return {
		parking_slot: slotInfo.parking_slot,
		booking_time: slotInfo.booked_datetime
	}
}

/**
 * Fetch available parking slot details
 * Also releases the parking slot which has exceeded the buffer time
 * @param {Array}	totalParkingSlots total parking slot
 * @return {Array}	total available parking slots
 */
const computeActualAvailableSlots = async totalParkingSlots => {
	const bookedParkingSlots = totalParkingSlots.filter(ele => ele.user_id && ele.booked_datetime)
	const isOverFiftyOccupied = bookedParkingSlots.length >= totalParkingSlots.length / 2
	const bufferTime = isOverFiftyOccupied ? 15 : 30
	const timeExceededSlotsIds = totalParkingSlots
	.filter(element => dayjs().diff(dayjs(element.booked_datetime), 'minute') > bufferTime)
	.map(({_id}) => _id)
	await updateTimeExceededSlots(timeExceededSlotsIds)
	const availableSlots = await findAvailableSlots()
	return availableSlots.length ? availableSlots : []
}

/**
 * Fetch available parking slot details
 * Also releases the parking slot which has exceeded the buffer time
 * @param {Number}	configId active parking config id
 * @param {Array}	parkingRows total parking slot
 * @param {Boolean}	isReservedType reserved parking capacity
 * @return {Array}	total number of parking slots
 */
const generateParkingSlots = (configId, parkingRows, isReservedType) => {
	const totalParkingSlots = []
	Array.from(Array(parkingRows)).forEach((_, index) => {
		totalParkingSlots.push({
			parking_slot: isReservedType ? `PR${index}` : `P${index}`,
			parking_slot_config_id: configId,
			user_id: null,
			booked_datetime: null,
			is_reserved: isReservedType
		})
	})
	return totalParkingSlots
}

export {
	saveParkingConfig,
	getOccupiedSlots,
	getAvailableSlots,
	bookSlot
}
