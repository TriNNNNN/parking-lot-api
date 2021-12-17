import {vwJobList} from '../../models/vw_job_list'

const getJobsPendingForQC = mst_service_location_id => vwJobList.findAll({
	where: {mst_service_location_id,
		mst_action_status: 'Pending For QC'}
})

export {
	getJobsPendingForQC
}
