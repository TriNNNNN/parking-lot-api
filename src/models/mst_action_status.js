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
	mst_action_status
} = tables


const mstActionStatus = sequelize.define(mst_action_status, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING(64),
	code: Sequelize.STRING(32),
	description: Sequelize.STRING(255),
	is_active: Sequelize.BOOLEAN(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

export {
	mstActionStatus
}
