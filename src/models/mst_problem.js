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
	mst_problem
} = tables


const mstProblem = sequelize.define(mst_problem, {
	id: {
		type: Sequelize.NUMBER(),
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING(64),
	created_at: Sequelize.DATE(),
	modified_at: Sequelize.DATE()
})

export {
	mstProblem
}
