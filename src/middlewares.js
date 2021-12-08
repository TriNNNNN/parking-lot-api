import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
// import httpStatus from 'http-status'
import authMiddleWare from './utils/auth.decode'

function catchError(error, req, res) {
	console.log(error)
	let {
		status,
		message = '',
		...rest // eslint-disable-line prefer-const
	} = error
	if (!status) {
		status = error.code || 500
	}
	if (message && typeof message === 'object') {
		message = JSON.stringify(message)
	}

	if (!res.headersSent) {
		try {
			res.status(status).send({
				status,
				message,
				...rest
			})
		}
		catch (error) {
			res.status(500).send({
				status: 500,
				message: 'Something Went Wrong'
			})
		}
	}
}

const setupPreRoute = app => {
	app.use(helmet())
	app.use(cors())
	app.use(compression({
		filter: (req, res) => {
			if (req.headers['x-no-compression']) {
				return false
			}
			return compression.filter(req, res)
		}
	}))
	app.use(express.json({limit: '50mb'}))
	app.use(express.urlencoded({
		extended: true
	}))
	app.use(authMiddleWare)
}

const setupPostRoute = app => {
	app.use((err, _req, res, _next) => { // eslint-disable-line no-unused-vars
		if (!res.headersSent) {
			catchError(err, _req, res)
		}
	})
}

export {
	setupPreRoute,
	setupPostRoute
}
