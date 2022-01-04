import {createJob, getJobsPendingForAssignment, getAllActiveJobs, searchJob} from './job.controller'
import {createJobValidator, searchJobValidator} from './job.validator'

const routes = [{
	path: '/job',
	subRoutes: [{
		path: '/create',
		method: 'post',
		middlewares: [createJobValidator],
		handler: createJob
	}, {
		path: '/pending',
		method: 'get',
		// middlewares: [createJobValidator],
		handler: getJobsPendingForAssignment
	}, {
		path: '/all',
		method: 'get',
		handler: getAllActiveJobs
	},
	{
		path: '/search',
		method: 'post',
		middlewares: [searchJobValidator],
		handler: searchJob
	}]
}]

export default {
	routes
}
