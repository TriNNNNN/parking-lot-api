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
	vw_user
} = tables


const vwUser = sequelize.define(vw_user, {
	id: {
		type: Sequelize.NUMBER(),
		primaryKey: true
	},
	first_name: Sequelize.STRING(64),
	last_name: Sequelize.STRING(64),
	login_id: Sequelize.STRING(64),
	mobile_number: Sequelize.STRING(32),
	email_id: Sequelize.STRING(64),
	password: Sequelize.STRING(256),
	reset_password_date: Sequelize.DATE(),
	lock_status: Sequelize.NUMBER(),
	is_active: Sequelize.BOOLEAN(),
	mst_role_id: Sequelize.NUMBER(),
	mst_service_location_id: Sequelize.NUMBER(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE(),
	role_name: Sequelize.STRING(64),
	service_location: Sequelize.STRING(64)
})

export {
	vwUser
}
