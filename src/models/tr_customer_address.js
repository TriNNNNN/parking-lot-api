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
	tr_customer_address
} = tables


const trCustomerAddress = sequelize.define(tr_customer_address, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	flat_number: Sequelize.STRING(64),
	apartment_name: Sequelize.STRING(64),
	street_name: Sequelize.STRING(64),
	landmark: Sequelize.STRING(64),
	area: Sequelize.STRING(64),
	pincode: Sequelize.NUMBER(),
	country: Sequelize.STRING(64),
	state: Sequelize.STRING(64),
	is_active: Sequelize.BOOLEAN(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

export {
	trCustomerAddress
}
