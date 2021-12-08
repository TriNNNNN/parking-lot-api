import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'
// import {mstOem} from '../models'
import {mstOem} from '../models/mst_oem'

const {
	mst_product
} = tables


const mstProduct = sequelize.define(mst_product, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING(64),
	code: Sequelize.STRING(32),
	mst_oem_id: Sequelize.NUMBER(),
	is_active: Sequelize.BOOLEAN(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

mstProduct.belongsTo(
	mstOem,
	{
		foreignKey: 'mst_oem_id',
		targetKey: 'id'
	}
)

export {
	mstProduct
}
