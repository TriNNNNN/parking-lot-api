import {assignEngineer, fetchEngineers, fetchMyJobs, repairComplete} from './engineer.controller'
import {assignEngineerValidator, repairCompleteValidator} from './engineer.validator'

const routes = [{
	path: '/engineer',
	subRoutes: [{
		path: '/mapped',
		method: 'get',
		// middlewares: [createJobValidator],
		handler: fetchEngineers
	},
	{
		path: '/assign',
		method: 'post',
		middlewares: [assignEngineerValidator],
		handler: assignEngineer
	},
	{
		path: '/myjobs',
		method: 'get',
		// middlewares: [createJobValidator],
		handler: fetchMyJobs
	},
	{
		path: '/repaircomplete',
		method: 'post',
		middlewares: [repairCompleteValidator],
		handler: repairComplete
	}]
}]

export default {
	routes
}
