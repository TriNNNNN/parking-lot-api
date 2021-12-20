import {getQCJobs, addQC} from './qc.controller'
import {addQCValidator} from './qc.validator'

const routes = [{
	path: '/qc',
	method: 'get',
	handler: getQCJobs
},
{
	path: '/qc',
	method: 'post',
	middlewares: [addQCValidator],
	handler: addQC
}]

export default {
	routes
}
