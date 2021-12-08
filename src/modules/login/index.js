import {login, getUserInfo} from './login.controller'

const routes = [{
	path: '/login',
	method: 'post',
	handler: login,
	noAuth: true
},
{
	path: '/userdetails',
	method: 'get',
	handler: getUserInfo
}]

export default {
	routes
}
