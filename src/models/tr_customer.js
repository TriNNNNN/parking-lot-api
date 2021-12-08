import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'
// import {trCustomerAddress} from '../models'
import {trCustomerAddress} from '../models/tr_customer_address'

const {
	tr_customer
} = tables


const trCustomer = sequelize.define(tr_customer, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	first_name: Sequelize.STRING(64),
	last_name: Sequelize.STRING(64),
	mobile_number: Sequelize.STRING(32),
	mobile_number_alt: Sequelize.STRING(32),
	email_id: Sequelize.STRING(64),
	email_id_alt: Sequelize.STRING(64),
	tr_customer_address_id: Sequelize.NUMBER(),
	is_active: Sequelize.BOOLEAN(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

trCustomer.belongsTo(
	trCustomerAddress,
	{
		foreignKey: 'tr_customer_address_id',
		targetKey: 'id'
	}
)

export {
	trCustomer
}
