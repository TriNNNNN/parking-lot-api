const mongoose = require('mongoose')
const constants = require('../constants/collections')

const parkingslotconfigschema = new mongoose.Schema(
	{
		total_parking_slot: {type: Number},
		reserved_parking_capacity: {type: Number},
		is_active: {
			type: Boolean,
			default: true
		}
	},
	{
		collection: constants.ParkingSlotConfigModel,
		autoIndex: true,
		timestamps: true
	}
)

module.exports = mongoose.model(constants.ParkingSlotConfigModel, parkingslotconfigschema)
