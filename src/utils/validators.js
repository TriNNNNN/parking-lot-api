import Joi from 'joi'

export default {
	array: Joi.array().sparse(false).unique().single().default([]),
	boolean: Joi.boolean().truthy(['true', 'y', '1', 1]).falsy(['false', 'n', 'null', 'undefined', '0', 0, null]),
	binary: Joi.binary(),
	date: Joi.date().iso(),
	number: Joi.number(),
	object: Joi.object().default({}),
	string: Joi.string().default('')
}
