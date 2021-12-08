import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'
import {mstRepairStage, trJobHead, mstUser} from '../models'
const {
	tr_job_stage
} = tables


const trJobStage = sequelize.define(tr_job_stage, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	tr_job_head_id: Sequelize.NUMBER(),
	mst_repair_stage_id: Sequelize.NUMBER(),
	assigned_by: Sequelize.NUMBER(),
	assigned_to: Sequelize.NUMBER(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

trJobStage.belongsTo(
	trJobHead,
	{
		foreignKey: 'tr_job_head_id',
		targetKey: 'id'
	}
)

trJobStage.belongsTo(
	mstRepairStage,
	{
		foreignKey: 'mst_repair_stage_id',
		targetKey: 'id'
	}
)

trJobStage.belongsTo(
	mstUser,
	{
		foreignKey: 'assigned_by',
		targetKey: 'id'
	}
)

trJobStage.belongsTo(
	mstUser,
	{
		foreignKey: 'assigned_to',
		targetKey: 'id'
	}
)

export {
	trJobStage
}
