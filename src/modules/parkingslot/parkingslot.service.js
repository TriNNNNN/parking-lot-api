const mongoose = require('mongoose')

const constants = require('../../constants/collections')

const ParkingSlotConfigModel = mongoose.model(constants.ParkingSlotConfigModel)
const ParkingSlotModel = mongoose.model(constants.ParkingSlotModel)
const UserModel = mongoose.model(constants.UserModel)

const getActiveParkingSlotConfig = () => ParkingSlotConfigModel.findOne({
	is_active: true
})

const toggleParkingSlotConfig = parkingSlotConfigId => ParkingSlotConfigModel.findOneAndUpdate({_id: parkingSlotConfigId}, {is_active: false})
const toggleParkingSlot = parkingSlotConfigId => ParkingSlotModel.updateMany({parking_slot_config_id: parkingSlotConfigId}, {is_active: false})

const saveParkingSlotConfig = async config => {
	const model = new ParkingSlotConfigModel(config)
	const resp = await model.save()
	return resp
}

const insertParkingSlotDummyRows = parkingSlots => ParkingSlotModel.insertMany(parkingSlots)

const findOccupiedSlots = () => ParkingSlotModel.find({
	user_id: {$ne: null},
	booked_datetime: {$ne: null},
	is_active: true
})

const findAvailableSlots = () => ParkingSlotModel.find({
	user_id: {$eq: null},
	booked_datetime: {$eq: null},
	is_active: true
})

const findTotalParkingSlots = () => ParkingSlotModel.find({is_active: true})

const updateTimeExceededSlots = timeExceededSlotsIds =>
	ParkingSlotModel.updateMany(
		{_id: {$in: timeExceededSlotsIds}},
		{
			$set: {
				user_id: null,
				booked_datetime: null
			}
		},
		{multi: true}
	)

const updateSlot = (slotInfo, data) => ParkingSlotModel.findOneAndUpdate(
	{_id: slotInfo._id},
	{
		user_id: data.user_id,
		booked_datetime: data.booked_datetime
	},
	{
		new: true
	}
)

const checkIfSlotAlreadyAllocated = async mobile => {
	const user = await UserModel.findOne({mobile})
	const parkingSlot = await ParkingSlotModel.findOne({user_id: user._id,
		is_active: true})
	return parkingSlot
}

export {
	getActiveParkingSlotConfig,
	toggleParkingSlotConfig,
	toggleParkingSlot,
	saveParkingSlotConfig,
	insertParkingSlotDummyRows,
	findOccupiedSlots,
	findAvailableSlots,
	findTotalParkingSlots,
	updateTimeExceededSlots,
	updateSlot,
	checkIfSlotAlreadyAllocated
}
