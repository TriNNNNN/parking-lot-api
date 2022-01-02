import {getReadyForDeliveryJobs, deliverToCustomer} from './fd.controller'
import {deliverToCustomerValidator} from './fd.validator'

const routes = [{
	path: '/ready_for_delivery',
	method: 'get',
	handler: getReadyForDeliveryJobs
},
{
	path: '/deliver_to_customer',
	method: 'post',
	middlewares: [deliverToCustomerValidator],
	handler: deliverToCustomer
}]

export default {
	routes
}
