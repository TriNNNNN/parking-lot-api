import {
	Sequelize
} from 'sequelize'
import {
	sequelize
} from '../utils'
import {
	tables
} from '../constants'

import {mstProblem} from '../models/mst_problem'
import {trJobHead} from '../models/tr_job_head'

const {
	map_job_problem
} = tables


const mapJobProblem = sequelize.define(map_job_problem, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	mst_problem_id: Sequelize.NUMBER(),
	tr_job_head_id: Sequelize.NUMBER(),
	remark: Sequelize.STRING(256),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

mapJobProblem.belongsTo(
	mstProblem,
	{
		foreignKey: 'mst_problem_id',
		targetKey: 'id'
	}
)

mapJobProblem.belongsTo(
	trJobHead,
	{
		foreignKey: 'tr_job_head_id',
		targetKey: 'id'
	}
)

export {
	mapJobProblem
}
