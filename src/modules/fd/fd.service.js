import {vwJobList} from '../../models/vw_job_list'

const getJobsPendingForDelivery = mst_service_location_id => vwJobList.findAll({
	where: {mst_service_location_id,
		mst_action_status: 'Pending for Delivery'}
})

export {
	getJobsPendingForDelivery
}
