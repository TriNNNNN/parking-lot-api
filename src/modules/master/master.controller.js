import {getMasterDataByModel} from '../master/master.service'
import {Promise} from 'bluebird'

const {
	tables: {
		mst_oem,
		mst_model,
		mst_action_status,
		mst_warrenty_status,
		mst_platform,
		mst_product,
		mst_role,
		mst_service_location
	}
} = require('../../constants')

const master_tables = [
	mst_oem,
	mst_model,
	mst_action_status,
	mst_warrenty_status,
	mst_platform,
	mst_product,
	mst_role,
	mst_service_location
]

const getMasterData = async(req, res, next) => {
	try {
		return Promise.map(master_tables, async model => {
			const data = await getMasterDataByModel(model, {})
			return Promise.resolve({model,
				data})
		}, {concurrency: 2})
		.then(result => result.reduce((out, i) => {
			out[i.model] = i.data
			return out
		}, {}))
		.then(d => res.status(200).send(d))
		.catch(err => {
			throw err
		})
	}
	catch (err) {
		next(err)
	}
}

export {
	getMasterData
}
