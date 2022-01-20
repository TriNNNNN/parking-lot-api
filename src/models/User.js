const mongoose = require('mongoose')
const constants = require('../constants/collections')

const userschema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		mobile: {
			type: Number,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
			select: false
		},
		gender: {
			type: String,
			enum: ['male', 'female'],
			required: true
		},
		specially_abled: {
			type: Boolean,
			required: true,
			default: false
		},
		is_active: {
			type: Boolean,
			default: true
		}

	},
	{
		collection: constants.UserModel,
		autoIndex: true,
		timestamps: true
	}
)

userschema.index({
	mobile: 'text'
})

module.exports = mongoose.model(constants.UserModel, userschema)
