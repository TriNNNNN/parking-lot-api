import Joi from 'joi'
import _ from 'lodash'
import {modifyErrorObject} from '../../utils'

const getMasterDataSchema = Joi.object().keys({
	model: Joi.string().required()
}).required()

const getMasterDataValidator = (req, res, next) => {
	const {error, value} = getMasterDataSchema.validate(req.body)
	error ? next(modifyErrorObject(error)) : next()
}

export {
	getMasterDataValidator
}
