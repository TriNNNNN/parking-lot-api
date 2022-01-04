import {isValidModelProductOemMap, isValidOemServiceLocation, addCustomer, addCustomerAddress, addCustomerProduct, addJob, getJobsPendingForAss, getActiveJobs, getJobDetails, isAlreadyActiveJob} from './job.service'
import _ from 'lodash'
import {APIError, sequelize} from '../../utils'

const validateInputData = async(model_id, product_id, mst_oem_id, mst_service_location_id, imei1) => {
	const isValidProductMap = await isValidModelProductOemMap(model_id, product_id, mst_oem_id)
	if (_.isEmpty(isValidProductMap)) {
		throw new APIError('Invalid product, model and oem mapping', 500)
	}

	const isValidOemServicelocationMap = await isValidOemServiceLocation(mst_service_location_id, mst_oem_id)
	if (_.isEmpty(isValidOemServicelocationMap)) {
		throw new APIError('Invalid oem and service location mapping', 500)
	}

	const isAlreadyExists = await isAlreadyActiveJob(imei1)
	if (isAlreadyExists) {
		throw new APIError('Job is already open for this imei number', 500)
	}
}

function createJobHeadObj(data, customerProduct) {
	return {
		mst_service_location_id: data.mst_service_location_id,
		mst_platform_id: data.mst_platform_id,
		mst_warrenty_status_id: data.mst_warrenty_status_id,
		mst_oem_id: data.mst_oem_id,
		tr_customer_id: customerProduct.tr_customer_id,
		tr_customer_product_id: customerProduct.id,
		mst_action_status_id: 1
	}
}

const processJobCreation = data => sequelize.transaction(async transaction => {
	const customerAddress = await addCustomerAddress({...data.customer_address}, {transaction})
	const customer = await addCustomer({...data.customer,
		tr_customer_address_id: customerAddress.id}, {transaction})
	const customerProduct = await addCustomerProduct({...data.customer_product,
		tr_customer_id: customer.id}, {transaction})
	// console.log(customerAddress, customer, customerProduct)
	const jobHeadObj = createJobHeadObj(data, customerProduct)
	const job = await addJob(jobHeadObj, {transaction})
	return job
})
.catch(err => {
	throw err
})

const createJob = async(req, res, next) => {
	const {body: {customer_product: {mst_model_id, product_id, imei1}, mst_oem_id, mst_service_location_id}, user: {role_name}} = req
	try {
		if (role_name !== 'Front Desk') {
			throw new APIError('Permission denied', 403)
		}
		await validateInputData(mst_model_id, product_id, mst_oem_id, mst_service_location_id, imei1)
		const jobObj = await processJobCreation(req.body)
		res.status(200).send({message: 'Job created successfully',
			job: jobObj})
	}
	catch (err) {
		next(err)
	}
}


const getJobsPendingForAssignment = async(req, res, next) => {
	const {user: {mst_service_location_id, role_name}} = req
	try {
		if (role_name !== 'Supervisor') {
			throw new APIError('Permission denied', 403)
		}
		const data = await getJobsPendingForAss(mst_service_location_id)
		res.status(200).send(data)
	}
	catch (err) {
		next(err)
	}
}

const getAllActiveJobs = async(req, res, next) => {
	const {user: {mst_service_location_id, role_name}} = req
	try {
		const data = await getActiveJobs(mst_service_location_id)
		res.status(200).send(data)
	}
	catch (err) {
		next(err)
	}
}

const searchJob = async(req, res, next) => {
	const {body: {searchText}, user: {mst_service_location_id, role_name}} = req
	try {
		const data = await getJobDetails(mst_service_location_id, searchText)
		res.status(200).send(data)
	}
	catch (err) {
		next(err)
	}
}


export {
	createJob,
	getJobsPendingForAssignment,
	getAllActiveJobs,
	searchJob
}
