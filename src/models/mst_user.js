import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'
// import {mstRole} from '../models'
import {mstRole} from '../models/mst_role'
import {mstServiceLocation} from '../models/mst_service_location'

const {
	mst_user
} = tables


const mstUser = sequelize.define(mst_user, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	first_name: Sequelize.STRING(64),
	last_name: Sequelize.STRING(64),
	login_id: Sequelize.STRING(64),
	mobile_number: Sequelize.STRING(32),
	email_id: Sequelize.STRING(64),
	password: Sequelize.STRING(64),
	reset_password_date: Sequelize.DATE(),
	lock_status: Sequelize.NUMBER(),
	is_active: Sequelize.BOOLEAN(),
	mst_role_id: Sequelize.NUMBER(),
	mst_service_location_id: Sequelize.NUMBER(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

mstUser.belongsTo(
	mstRole,
	{
		foreignKey: 'mst_role_id',
		targetKey: 'id'
	}
)

mstUser.belongsTo(
	mstServiceLocation,
	{
		foreignKey: 'mst_service_location_id',
		targetKey: 'id'
	}
)

export {
	mstUser
}
