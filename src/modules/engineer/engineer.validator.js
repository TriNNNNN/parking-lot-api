import Joi from 'joi'
import _ from 'lodash'
import {modifyErrorObject} from '../../utils'

const assignEngineerSchema = Joi.object().keys({
	job_id: Joi.number().required(),
	engineer_id: Joi.number().required()
}).required()

const repairCompleteSchema = Joi.object().keys({
	job_id: Joi.number().required()
}).required()

const assignEngineerValidator = (req, res, next) => {
	const {error, value} = assignEngineerSchema.validate(req.body)
	error ? next(modifyErrorObject(error)) : next()
}

const repairCompleteValidator = (req, res, next) => {
	const {error, value} = repairCompleteSchema.validate(req.body)
	error ? next(modifyErrorObject(error)) : next()
}

export {
	assignEngineerValidator,
	repairCompleteValidator
}
