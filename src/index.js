import './env_setup'
import express from 'express'
import http from 'http'
import setupRoutes from './routes'
import {
	setupPreRoute,
	setupPostRoute
} from './middlewares'

const {
	PORT = 9000
} = process.env

const app = express()

setupPreRoute(app)
setupRoutes(app)
setupPostRoute(app)

const server = http.Server(app)
server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})

process
.on('unhandledRejection', (_reason, promise) => {
	promise.catch(error => {
		console.error(error)
		throw new Error(error)
	})
})
.on('uncaughtException', error => {
	console.error(error)
	process.exit(1)
})
