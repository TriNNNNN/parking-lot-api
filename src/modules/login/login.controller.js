import * as crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {APIError} from '../../utils'
import {isValidLogin, getUserById} from '../login/login.service'
const {JWT_SECRET} = process.env

const login = async(req, res, next) => {
	try {
		const {username, password} = req.body
		if (!username && !password) {
			throw new APIError('Invalid request', 500)
		}
		const pass = crypto.createHash('md5').update(password).digest('hex')
		console.log('pass', pass)
		const validUser = await isValidLogin(username, pass)
		if (!validUser) {
			throw new APIError('Invalid username or password', 500)
		}
		else {
			const token = jwt.sign(validUser, JWT_SECRET)
			res.status(200).send({token})
		}
	}
	catch (err) {
		next(err)
	}
}

const getUserInfo = async (req, res, next) => {
	try{
		const {user:{id}} = req
		let data = await getUserById(id)
		return res.status(200).send(data)
	} catch(err){
		next(err)
	}
}

export {
	login,
	getUserInfo
}
