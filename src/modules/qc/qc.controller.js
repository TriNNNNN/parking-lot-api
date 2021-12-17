import {APIError} from '../../utils'
import {getJobsPendingForQC} from '../qc/qc.service'

const getQCJobs = async(req, res, next) => {
	try {
		const {user: {role_name, mst_service_location_id}} = req
		if (role_name !== 'QC') {
			throw new APIError('Permission denied', 403)
		}
		const data = await getJobsPendingForQC(mst_service_location_id)
		return res.status(200).send(data)
	}
	catch (err) {
		next(err)
	}
}

const addQC = async(req, res, next) => {
	try {
		return res.status(200).send({})
	}
	catch (err) {
		next(err)
	}
}

export {
	getQCJobs,
	addQC
}
