import {saveParkingConfig, getOccupiedSlots, getAvailableSlots, bookSlot} from './parkingslot.controller'
import {saveParkingSlotConfigValidator} from './parkingslot.validator'

const routes = [
	{
		path: '/parkingslot',
		subRoutes: [
			{
				path: '/saveconfig',
				method: 'post',
				middlewares: [saveParkingSlotConfigValidator],
				handler: saveParkingConfig
			},
			{
				path: '/getoccupiedslots',
				method: 'get',
				handler: getOccupiedSlots
			},
			{
				path: '/getavailableslots',
				method: 'get',
				handler: getAvailableSlots
			},
			{
				path: '/bookslot',
				method: 'get',
				handler: bookSlot
			}
		]
	}
]

export default {
	routes
}
