import {vwUser} from '../../models/vw_user'

const isValidLogin = (username, password) => vwUser.findOne({
	where: {login_id: username,
		password,
		is_active: true
	},
	raw: true
})

const getUserById = id => vwUser.findOne({
	where: {
		id
	},
	raw: true
})

export {
	isValidLogin,
	getUserById
}
