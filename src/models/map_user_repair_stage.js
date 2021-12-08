import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'
// import {mstUser, mstRepairStage} from '../models'
import {mstUser} from '../models/mst_user'
import {mstRepairStage} from '../models/mst_repair_stage'


const {
	map_user_repair_stage
} = tables


const mapUserRepairStage = sequelize.define(map_user_repair_stage, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	mst_user_id: Sequelize.NUMBER(),
	mst_repair_stage_id: Sequelize.NUMBER(),
	is_active: Sequelize.BOOLEAN(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

mapUserRepairStage.belongsTo(
	mstUser,
	{
		foreignKey: 'mst_user_id',
		targetKey: 'id'
	}
)

mapUserRepairStage.belongsTo(
	mstRepairStage,
	{
		foreignKey: 'mst_repair_stage_id',
		targetKey: 'id'
	}
)

export {
	mapUserRepairStage
}
