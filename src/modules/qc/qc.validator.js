import Joi from 'joi'
import _ from 'lodash'
import {modifyErrorObject} from '../../utils'

const addQCSchema = Joi.object().keys({
	job_id: Joi.number().required()
}).required()

const addQCValidator = (req, res, next) => {
	const {error, value} = addQCSchema.validate(req.body)
	error ? next(modifyErrorObject(error)) : next()
}

export {
	addQCValidator
}
