import {getMasterData} from './master.controller'
import {getMasterDataValidator} from './master.validator'

const routes = [{
	path: '/master',
	method: 'post',
	// middlewares: [getMasterDataValidator],
	handler: getMasterData
}]

export default {
	routes
}
