import Joi from 'joi'
import _ from 'lodash'
import {modifyErrorObject} from '../../utils'

const deliverToCustomerSchema = Joi.object().keys({
	job_id: Joi.number().required()
}).required()

const deliverToCustomerValidator = (req, res, next) => {
	const {error, value} = deliverToCustomerSchema.validate(req.body)
	error ? next(modifyErrorObject(error)) : next()
}

export {
	deliverToCustomerValidator
}
