import {
	Router
} from 'express'
import {
	compact
} from 'lodash'
import staticTextHandler from './static_text_handler'
import authMiddleware from './auth.verify'


export default function generateRouter(routes) {
	if (!Array.isArray(routes)) {
		routes = [routes]
	}
	const router = Router()
	compact(routes).forEach(({
		path,
		method = 'get',
		handler = staticTextHandler(),
		middlewares = [],
		subRoutes,
		noAuth = false
	}) => {
		if (!noAuth) {
			middlewares.unshift(authMiddleware)
		}
		if (path) {
			router[method](path, middlewares, handler)
			if (subRoutes) {
				router.use(path, generateRouter(subRoutes))
			}
		}
	})
	return router
}
