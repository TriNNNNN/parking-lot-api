import Joi from 'joi'
import {modifyErrorObject} from '../../utils'

const saveParkingSlotConfigSchema = Joi.object().keys({
	total_parking_slot: Joi.number().required().min(10),
	reserved_parking_capacity: Joi.number().required().min(10)
}).required()

const saveParkingSlotConfigValidator = (req, res, next) => {
	const {error} = saveParkingSlotConfigSchema.validate(req.body)
	if (error) {
		next(modifyErrorObject(error))
	}
	next()
}

export {
	saveParkingSlotConfigValidator
}

