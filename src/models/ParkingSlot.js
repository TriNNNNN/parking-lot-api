const mongoose = require('mongoose')
const constants = require('../constants/collections')

const parkingslotschema = new mongoose.Schema(
	{
		parking_slot: {
			type: String,
			required: true
		},
		parking_slot_config_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: constants.ParkingSlotConfigModel
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: constants.UserModel,
			default: null
		},

		booked_datetime: {
			type: String,
			default: null
		},
		is_reserved: {
			type: Boolean,
			default: false
		},
		is_active: {
			type: Boolean,
			default: true
		}
	},
	{
		collection: constants.ParkingSlotModel,
		autoIndex: true,
		timestamps: true
	}
)

module.exports = mongoose.model(constants.ParkingSlotModel, parkingslotschema)
