import Joi from 'joi'
import _ from 'lodash'
import {modifyErrorObject} from '../../utils'

const trCustomerSchema = Joi.object().keys({
	first_name: Joi.string().required(),
	last_name: Joi.string().required(),
	mobile_number: Joi.string().required(),
	mobile_number_alt: Joi.string().allow(''),
	email_id: Joi.string().email().required(),
	email_id_alt: Joi.string().email().allow('')
}).required()

const trCustomerAddressSchema = Joi.object().keys({
	flat_number: Joi.string().required(),
	apartment_name: Joi.string().required(),
	street_name: Joi.string().allow(''),
	landmark: Joi.string().allow(''),
	area: Joi.string().allow(''),
	pincode: Joi.number().required(),
	country: Joi.string().allow(''),
	state: Joi.string().allow('')
}).required()

const trCustomerProductSchema = Joi.object().keys({
	dop: Joi.date(),
	serial_number: Joi.string().allow('').default('').min(14, 'utf8').max(17, 'utf8'),
	imei1: Joi.string().default('').allow('').min(14, 'utf8').max(17, 'utf8'),
	imei2: Joi.string().default('').allow('').min(14, 'utf8').max(17, 'utf8'),
	popurl: Joi.string().default('').allow(''),
	mst_model_id: Joi.number().required(),
	product_id: Joi.number().required()
}).required()

const createJobSchema = Joi.object().keys({
	mst_service_location_id: Joi.number().required(),
	mst_platform_id: Joi.number().required(),
	mst_warrenty_status_id: Joi.number().required(),
	mst_oem_id: Joi.number().required(),
	customer: trCustomerSchema,
	customer_address: trCustomerAddressSchema,
	customer_product: trCustomerProductSchema
})

const searchJobSchema = Joi.object().keys({
	searchText: Joi.string().required().min(2)
})

const createJobValidator = (req, res, next) => {
	const {error, value} = createJobSchema.validate(req.body)
	error ? next(modifyErrorObject(error)) : next()
}

const searchJobValidator = (req, res, next) => {
	const {error, value} = searchJobSchema.validate(req.body)
	error ? next(modifyErrorObject(error)) : next()
}

export {
	createJobValidator,
	searchJobValidator
}
