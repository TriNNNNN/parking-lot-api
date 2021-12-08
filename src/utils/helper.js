const _ = require('lodash')
import {APIError} from '../utils'

const modifyErrorObject = err => {
	const error = _.pick(err, 'details').details.map(i => i.message).join('and')
	return new APIError(error, 500)
}

export {
	modifyErrorObject
}
