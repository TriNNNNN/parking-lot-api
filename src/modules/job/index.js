import {createJob, getJobsPendingForAssignment} from './job.controller'
import {createJobValidator} from './job.validator'

const routes = [{
	path: '/job',
	subRoutes: [{
		path: '/create',
		method: 'post',
		middlewares: [createJobValidator],
		handler: createJob
	},
	{
		path: '/pending',
		method: 'get',
		// middlewares: [createJobValidator],
		handler: getJobsPendingForAssignment
	}
]
}]

export default {
	routes
}
