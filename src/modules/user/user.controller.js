import * as crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {APIError, formatResponse} from '../../utils'
import {isValidLogin, getAllRegisteredUsers, registerUser} from './user.service'
const {JWT_SECRET} = process.env

/**
 * Authenticate login user and generate token
 * @param {Number}	mobile user's mobile no.
 * @param {String}	password user's password
 * @return {Object} token based on user info
 */
const login = async(req, res, next) => {
	try {
		const {mobile, password} = req.body
		if (!mobile && !password) {
			throw new APIError('Invalid request', 400)
		}
		const pass = crypto.createHash('md5').update(password).digest('hex')
		const validUser = await isValidLogin(mobile, pass)
		if (!validUser) {
			throw new APIError('Invalid username or password', 403)
		}
		else {
			const token = jwt.sign(validUser.toJSON(), JWT_SECRET)
			res.status(200).send(formatResponse('', {token}))
		}
	}
	catch (err) {
		next(err)
	}
}

/**
 * Get all registered users
 * @return {Array} returns all registered users
 */
const getAllUsers = async(req, res, next) => {
	try {
		const users = await getAllRegisteredUsers()
		if (!users) {
			throw new APIError('Failed to fetch all registered users', 400)
		}
		else {
			res.status(200).send(formatResponse('', {users}))
		}
	}
	catch (err) {
		next(err)
	}
}

/**
 * Create users
 * @param {String}	name
 * @param {String}	gender
 * @param {String}	specially_abled
 * @param {String}	mobile
 * @param {String}	password
 * @return {Object} returns registered user
 */
const register = async(req, res, next) => {
	try {
		const {password} = req.body
		const pass = crypto.createHash('md5').update(password).digest('hex')
		req.body.password = pass
		const user = await registerUser(req.body)
		if (!user) {
			throw new APIError('Failed to create user', 200)
		}
		else {
			res.status(200).send(formatResponse('User registered successfully', {user}))
		}
	}
	catch (err) {
		next(err)
	}
}

export {login, getAllUsers, register}
