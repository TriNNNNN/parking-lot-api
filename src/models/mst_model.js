import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'
// import {mstProduct} from '../models'
import {mstProduct} from '../models/mst_product'

const {
	mst_model
} = tables


const mstModel = sequelize.define(mst_model, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING(64),
	code: Sequelize.STRING(32),
	mst_product_id: Sequelize.NUMBER(),
	is_active: Sequelize.BOOLEAN(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

mstModel.belongsTo(
	mstProduct,
	{
		foreignKey: 'mst_product_id',
		targetKey: 'id'
	}
)

export {
	mstModel
}
