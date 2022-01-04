import _ from 'lodash'
import {sequelize} from '../../utils'

const getMasterDataByModel = (model, filter = {}) => {
	const where = filter
	return sequelize.models[model].findAll({where,
		raw: true})
	.catch(err => {
		throw err
	})
}

export {
	getMasterDataByModel
}
