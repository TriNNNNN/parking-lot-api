import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'

// import {mstOem, mstUser} from '../models'
import {mstOem} from '../models/mst_oem'
import {mstUser} from '../models/mst_user'

const {
	map_user_oem
} = tables


const mapUserOem = sequelize.define(map_user_oem, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	mst_user_id: Sequelize.NUMBER(),
	mst_oem_id: Sequelize.NUMBER(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

mapUserOem.belongsTo(
	mstOem,
	{
		foreignKey: 'mst_oem_id',
		targetKey: 'id'
	}
)

mapUserOem.belongsTo(
	mstUser,
	{
		foreignKey: 'mst_user_id',
		targetKey: 'id'
	}
)

export {
	mapUserOem
}
