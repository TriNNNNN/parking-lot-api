const _ = require('lodash')
import {APIError} from '../utils'

const modifyErrorObject = err => {
	const error = _.pick(err, 'details').details.map(i => i.message).join('and')
	return new APIError(error, 500)
}

const formatResponse = (message, data = []) => ({message: message.legth ? message : 'Success',
	data})

export {
	modifyErrorObject,
	formatResponse
}
