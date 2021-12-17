import {getQCJobs, addQC} from './qc.controller'

const routes = [{
	path: '/qc',
	method: 'get',
	handler: getQCJobs
}]

export default {
	routes
}
