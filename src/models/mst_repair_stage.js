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
	mst_repair_stage
} = tables


const mstRepairStage = sequelize.define(mst_repair_stage, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING(64),
	description: Sequelize.STRING(255),
	is_active: Sequelize.BOOLEAN(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

export {
	mstRepairStage
}
