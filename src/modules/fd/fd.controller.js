import {APIError, sequelize} from '../../utils'
import {getJobsPendingForDelivery} from '../fd/fd.service'
import {getJob, addJobDetail, updateJobStatus} from '../engineer/engineer.service'

const getReadyForDeliveryJobs = async(req, res, next) => {
	try {
		const {user: {role_name, mst_service_location_id}} = req
		if (role_name !== 'Front Desk') {
			throw new APIError('Permission denied', 403)
		}
		const data = await getJobsPendingForDelivery(mst_service_location_id)
		return res.status(200).send(data)
	}
	catch (err) {
		next(err)
	}
}

const deliverToCustomer = async(req, res, next) => {
	try {
		const {user: {id, role_name, mst_service_location_id}, body: {job_id}} = req
		if (role_name !== 'Front Desk') {
			throw new APIError('Permission denied', 403)
		}
		const jobInfo = await getJob(job_id)

		if (!jobInfo) {
			throw new APIError('Invalid job', 403)
		}
		if (jobInfo.mst_service_location_id != mst_service_location_id) {
			throw new APIError('Invalid operation. Permission denied', 403)
		}
		if (jobInfo.mst_action_status_id != 5) {
			throw new APIError('Invalid job status.', 403)
		}

		return sequelize.transaction(async transaction => {
			const jobDetail = {tr_job_head_id: job_id,
				mst_action_status_id: 6,
				assigned_by: id}
			await addJobDetail(jobDetail, transaction)
			await updateJobStatus(job_id, 6, transaction)
			return res.status(200).send({message: 'Delivered to customer successfully'})
		})
		.catch(err => {
			throw err
		})
	}
	catch (err) {
		next(err)
	}
}

export {
	getReadyForDeliveryJobs,
	deliverToCustomer
}
