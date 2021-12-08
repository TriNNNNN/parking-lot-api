import {
	compact
} from 'lodash'
import {
	staticTextHandler,
	generateRouter
} from './utils'
import modules from './modules'
const {
	api_version: apiVersion = '1'
} = process.env

export default app => {
	compact(Object.values(modules)).forEach(({
		routes = []
	}) => {
		app.use(`/v${apiVersion}`, generateRouter(routes))
	})
	app.all('/*', staticTextHandler())
}
