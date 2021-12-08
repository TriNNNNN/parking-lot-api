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
	mst_service_location
} = tables


const mstServiceLocation = sequelize.define(mst_service_location, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING(64),
	code: Sequelize.STRING(64),
	mobile_number: Sequelize.STRING(32),
	email_id: Sequelize.STRING(64),
	address: Sequelize.STRING(512),
	pincode: Sequelize.NUMBER(),
	country: Sequelize.STRING(128),
	gstin: Sequelize.STRING(128),
	is_repair_line_engineer: Sequelize.NUMBER(),
	is_active: Sequelize.BOOLEAN(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

export {
	mstServiceLocation
}
