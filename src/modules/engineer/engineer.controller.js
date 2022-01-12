import {getEngineers, getJob, getEngineer, addJobDetail, updateJobStatus, fetchMyAssignedJobs, isValidJob, fetchJobProblems} from './engineer.service'
import {addJobProblems} from '../job/job.service'
import _ from 'lodash'
import {APIError, sequelize, formatResponse} from '../../utils'

const fetchEngineers = async(req, res, next) => {
	const {user: {mst_service_location_id, role_name}} = req
	try {
		if (role_name !== 'Supervisor') {
			throw new APIError('Permission denied', 403)
		}
		const data = await getEngineers(mst_service_location_id)
		res.status(200).send(formatResponse('', data))
	}
	catch (err) {
		next(err)
	}
}

const assignEngineer = async(req, res, next) => {
	const {job_id, engineer_id} = req.body
	const {id} = req.user
	try {
		const job = await getJob(job_id)
		const engineer = await getEngineer(engineer_id)

		if (engineer.role_name != 'Engineer') {
			throw new APIError('Invalid Engineer', 500)
		}
		if ((job && job.mst_service_location_id) != (engineer && engineer.mst_service_location_id)) {
			throw new APIError('Invalid job assignment', 500)
		}

		return sequelize.transaction(async transaction => {
			const jobDetail = {tr_job_head_id: job.id,
				mst_action_status_id: 3,
				assigned_by: id,
				assigned_to: engineer_id}
			await addJobDetail(jobDetail, transaction)
			await updateJobStatus(job.id, 3, transaction)
			return res.status(200).send(formatResponse('Engineer assigned successfully'))
		})
		.catch(err => {
			throw err
		})
	}
	catch (err) {
		next(err)
	}
}

const fetchMyJobs = async(req, res, next) => {
	try {
		const {user: {mst_service_location_id, role_name, id}} = req
		if (role_name != 'Engineer') {
			throw new APIError('Invalid Engineer', 500)
		}
		const myJobs = await fetchMyAssignedJobs(id, 3)
		const jonProblems = await fetchJobProblems(id, 3)

		myJobs.forEach(i => {
			i.problems = jonProblems.filter(p => p.tr_job_head_id == i.id)
		})

		return res.status(200).send(formatResponse('', myJobs))
	}
	catch (err) {
		next(err)
	}
}

const repairComplete = async(req, res, next) => {
	const {user: {role_name, id}, body: {job_id, problems}} = req
	try {
		if (role_name !== 'Engineer') {
			throw new APIError('Permission denied', 403)
		}
		const job = await isValidJob(job_id, id)
		if (job) {
			return sequelize.transaction(async transaction => {
				const jobDetail = {tr_job_head_id: job_id,
					mst_action_status_id: 4,
					assigned_by: id}
				await addJobDetail(jobDetail, transaction)
				await updateJobStatus(job_id, 4, transaction)
				if (problems.length) {
					const jobProblems = problems.map(i => {
						const jobObj = {
							tr_job_head_id: job_id,
							mst_problem_id: i.id,
							remark: i.remark,
							added_by: id
						}
						return jobObj
					})
					await addJobProblems(jobProblems, {transaction})
				}
				return res.status(200).send(formatResponse('Repair successful.'))
			})
			.catch(err => {
				throw err
			})
		}
		throw new APIError('Invalid job.', 500)
	}
	catch (err) {
		next(err)
	}
}

export {
	fetchEngineers,
	assignEngineer,
	fetchMyJobs,
	repairComplete
}
