import {APIError, sequelize, formatResponse} from '../../utils'
import {getJobsPendingForQC} from '../qc/qc.service'
import {getJob, addJobDetail, updateJobStatus} from '../engineer/engineer.service'

const getQCJobs = async(req, res, next) => {
	try {
		const {user: {role_name, mst_service_location_id}} = req
		if (role_name !== 'QC') {
			throw new APIError('Permission denied', 403)
		}
		const data = await getJobsPendingForQC(mst_service_location_id)
		return res.status(200).send(formatResponse('', data))
	}
	catch (err) {
		next(err)
	}
}

const addQC = async(req, res, next) => {
	try {
		const {user: {id, role_name, mst_service_location_id}, body: {job_id}} = req
		if (role_name !== 'QC') {
			throw new APIError('Permission denied', 403)
		}
		const jobInfo = await getJob(job_id)

		if (!jobInfo) {
			throw new APIError('Invalid job', 403)
		}
		if (jobInfo.mst_service_location_id != mst_service_location_id) {
			throw new APIError('Invalid operation. Permission denied', 403)
		}
		if (jobInfo.mst_action_status_id != 4) {
			throw new APIError('Invalid job status.', 403)
		}

		return sequelize.transaction(async transaction => {
			const jobDetail = {tr_job_head_id: job_id,
				mst_action_status_id: 5,
				assigned_by: id}
			await addJobDetail(jobDetail, transaction)
			await updateJobStatus(job_id, 5, transaction)
			return res.status(200).send(formatResponse('QC completed successfully'))
		})
		.catch(err => {
			throw err
		})
		// return res.status(200).send({message: 'QC completed successfully'})
	}
	catch (err) {
		next(err)
	}
}

export {
	getQCJobs,
	addQC
}
