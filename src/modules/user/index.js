import {login, getAllUsers, register} from './user.controller'
import {registerUserValidator, loginUserValidator} from './user.validator'

const routes = [
	{
		path: '/user',
		subRoutes: [
			{
				path: '/login',
				method: 'post',
				middlewares: [loginUserValidator],
				noAuth: true,
				handler: login
			},
			{
				path: '/register',
				method: 'post',
				noAuth: true,
				middlewares: [registerUserValidator],
				handler: register
			},
			{
				path: '/all',
				method: 'get',
				handler: getAllUsers
			}
		]
	}
]

export default {
	routes
}
