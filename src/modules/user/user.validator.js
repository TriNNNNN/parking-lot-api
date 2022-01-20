import Joi from 'joi'
import {modifyErrorObject} from '../../utils'

const loginUserSchema = Joi.object().keys({
	mobile: Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required(),
	password: Joi.string().required().min(8)
})

const registerUserSchema = Joi.object().keys({
	name: Joi.string()
	.min(3)
	.max(30)
	.required(),
	password: Joi.string().required().min(8),
	gender: Joi.string().valid('male', 'female').required(),
	mobile: Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required(),
	specially_abled: Joi.boolean().required().default(false)
})

const registerUserValidator = (req, res, next) => {
	const {error} = registerUserSchema.validate(req.body)
	if (error) {
		next(modifyErrorObject(error))
	}
	next()
}

const loginUserValidator = (req, res, next) => {
	const {error} = loginUserSchema.validate(req.body)
	if (error) {
		next(modifyErrorObject(error))
	}
	next()
}

export {
	registerUserValidator,
	loginUserValidator
}
