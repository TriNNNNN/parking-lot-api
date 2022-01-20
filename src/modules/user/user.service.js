const mongoose = require('mongoose')

const constants = require('../../constants/collections')

const UserModel = mongoose.model(constants.UserModel)

const isValidLogin = (mobile, password) => UserModel.findOne({
	mobile,
	password,
	is_active: true
})

const getAllRegisteredUsers = () => UserModel.find({raw: true})

const registerUser = async user => {
	const model = new UserModel(user)
	let resp = await model.save()
	if (resp) {
		resp = resp.toJSON()
		delete resp.password
	}
	return resp
}

export {
	isValidLogin,
	getAllRegisteredUsers,
	registerUser
}
