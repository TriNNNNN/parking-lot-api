import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'

const {
	vw_job_list
} = tables


const vwJobList = sequelize.define(vw_job_list, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	job_number: Sequelize.STRING(64),
	tr_customer_id: Sequelize.NUMBER(),
	tr_customer_product_id: Sequelize.NUMBER(),
	mst_service_location_id: Sequelize.NUMBER(),
	mst_platform_id: Sequelize.NUMBER(),
	mst_action_status_id: Sequelize.NUMBER(),
	mst_warrenty_status_id: Sequelize.NUMBER(),
	mst_oem_id: Sequelize.NUMBER(),
	repair_start_date: Sequelize.DATE(),
	repair_end_date: Sequelize.DATE(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE(),
	name: Sequelize.STRING(64),
	mobile_number: Sequelize.STRING(32),
	email_id: Sequelize.STRING(64),
	dop: Sequelize.DATE(),
	serial_number: Sequelize.STRING(512),
	imei1: Sequelize.STRING(512),
	imei2: Sequelize.STRING(512),
	popurl: Sequelize.STRING(512),
	mst_model_id: Sequelize.NUMBER(),
	mst_product_id: Sequelize.NUMBER(),
	mst_model_name: Sequelize.STRING(255),
	mst_product_name: Sequelize.STRING(255),
	mst_service_location_name: Sequelize.STRING(255),
	mst_platform_name: Sequelize.STRING(255),
	mst_warrenty_status: Sequelize.STRING(255),
	mst_oem_name: Sequelize.STRING(255),
	mst_action_status: Sequelize.STRING(255)
})

export {
	vwJobList
}
