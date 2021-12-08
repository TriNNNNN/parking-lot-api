import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'
// import {trJobHead, mstActionStatus, mstUser} from '../models'
import {trJobHead} from '../models/tr_job_head'
import {mstActionStatus} from '../models/mst_action_status'
import {mstUser} from '../models/mst_user'

const {
	tr_job_detail
} = tables


const trJobDetail = sequelize.define(tr_job_detail, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	tr_job_head_id: Sequelize.NUMBER(),
	mst_action_status_id: Sequelize.NUMBER(),
	assigned_on: Sequelize.DATE(),
	assigned_by: Sequelize.NUMBER(),
	assigned_to: Sequelize.NUMBER(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

trJobDetail.belongsTo(
	trJobHead,
	{
		foreignKey: 'tr_job_head_id',
		targetKey: 'id'
	}
)

trJobDetail.belongsTo(
	mstActionStatus,
	{
		foreignKey: 'mst_action_status_id',
		targetKey: 'id'
	}
)

trJobDetail.belongsTo(
	mstUser,
	{
		foreignKey: 'assigned_by',
		targetKey: 'id'
	}
)

trJobDetail.belongsTo(
	mstUser,
	{
		foreignKey: 'assigned_to',
		targetKey: 'id'
	}
)

export {
	trJobDetail
}
