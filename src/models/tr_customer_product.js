import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'
// import {trCustomer, mstModel} from '../models'
import {trCustomer} from '../models/tr_customer'
import {mstModel} from '../models/mst_model'

const {
	tr_customer_product
} = tables


const trCustomerProduct = sequelize.define(tr_customer_product, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	tr_customer_id: Sequelize.NUMBER(),
	mst_model_id: Sequelize.NUMBER(),
	dop: Sequelize.DATE(),
	serial_number: Sequelize.STRING(512),
	imei1: Sequelize.STRING(512),
	imei2: Sequelize.STRING(512),
	popurl: Sequelize.STRING(512),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

trCustomerProduct.belongsTo(
	trCustomer,
	{
		foreignKey: 'tr_customer_id',
		targetKey: 'id'
	}
)

trCustomerProduct.belongsTo(
	mstModel,
	{
		foreignKey: 'mst_model_id',
		targetKey: 'id'
	}
)

export {
	trCustomerProduct
}
