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
	mst_warrenty_status
} = tables


const mstWarrentyStatus = sequelize.define(mst_warrenty_status, {
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
	mstWarrentyStatus
}
