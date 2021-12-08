import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'

import {mstOem} from '../models/mst_oem'
import {mstServiceLocation} from '../models/mst_service_location'

const {
	map_service_location_oem
} = tables


const mapServiceLocationOem = sequelize.define(map_service_location_oem, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	mst_service_location_id: Sequelize.NUMBER(),
	mst_oem_id: Sequelize.NUMBER(),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

mapServiceLocationOem.belongsTo(
	mstOem,
	{
		foreignKey: 'mst_oem_id',
		targetKey: 'id'
	}
)

mapServiceLocationOem.belongsTo(
	mstServiceLocation,
	{
		foreignKey: 'mst_service_location_id',
		targetKey: 'id'
	}
)

export {
	mapServiceLocationOem
}
