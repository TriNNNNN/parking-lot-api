import './env_setup'
import express from 'express'
import http from 'http'
import setupRoutes from './routes'
const colors = require('colors')

import {
	setupPreRoute,
	setupPostRoute,
	setupMongoConnection
} from './middlewares'

const {
	PORT = 9000
} = process.env

const app = express()

setupPreRoute(app)
setupMongoConnection()
setupRoutes(app)
setupPostRoute(app)

const server = http.Server(app)
server.listen(PORT, () => {
	console.log(colors.green(`[booting] *** listening on port ${PORT}`))
})

process
.on('unhandledRejection', (_reason, promise) => {
	promise.catch(error => {
		console.error(colors.red('[error] ***', error))
		throw new Error(error)
	})
})
.on('uncaughtException', error => {
	console.error(colors.red('[error] ***', error))
	process.exit(1)
})
