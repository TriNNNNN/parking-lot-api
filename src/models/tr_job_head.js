import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'
// import {trCustomerProduct, trCustomer, mstActionStatus, mstServiceLocation, mstPlatform, mstWarrentyStatus, mstOem} from '../models'
import {trCustomerProduct} from '../models/tr_customer_product'
import {trCustomer} from '../models/tr_customer'
import {mstActionStatus} from '../models/mst_action_status'
import {mstServiceLocation} from '../models/mst_service_location'
import {mstPlatform} from '../models/mst_platform'
import {mstWarrentyStatus} from '../models/mst_warrenty_status'
import {mstOem} from '../models/mst_oem'

const {
	tr_job_head
} = tables


const trJobHead = sequelize.define(tr_job_head, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	job_number: Sequelize.STRING(64),
	tr_customer_id: Sequelize.NUMBER(),
	tr_customer_product_id: Sequelize.NUMBER(),
	mst_service_location_id: Sequelize.NUMBER(),
	mst_platform_id: Sequelize.NUMBER(),
	mst_action_status_id: Sequelize.NUMBER(),
	mst_warrenty_status_id: Sequelize.NUMBER(),
	mst_oem_id: Sequelize.NUMBER(),
	repair_start_date: Sequelize.DATE(),
	repair_end_date: Sequelize.DATE(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

trJobHead.belongsTo(
	trCustomerProduct,
	{
		foreignKey: 'tr_customer_product_id',
		targetKey: 'id'
	}
)

trJobHead.belongsTo(
	trCustomer,
	{
		foreignKey: 'tr_customer_id',
		targetKey: 'id'
	}
)

trJobHead.belongsTo(
	mstActionStatus,
	{
		foreignKey: 'mst_action_status_id',
		targetKey: 'id'
	}
)

trJobHead.belongsTo(
	mstServiceLocation,
	{
		foreignKey: 'mst_service_location_id',
		targetKey: 'id'
	}
)

trJobHead.belongsTo(
	mstPlatform,
	{
		foreignKey: 'mst_platform_id',
		targetKey: 'id'
	}
)

trJobHead.belongsTo(
	mstWarrentyStatus,
	{
		foreignKey: 'mst_warrenty_status_id',
		targetKey: 'id'
	}
)

trJobHead.belongsTo(
	mstOem,
	{
		foreignKey: 'mst_oem_id',
		targetKey: 'id'
	}
)

export {
	trJobHead
}
