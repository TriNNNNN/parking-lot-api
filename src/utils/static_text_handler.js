const {
	api_version: apiVersion = '1'
} = process.env


export default ({
	text = `404. Use: /v${apiVersion}/&lt;path&gt;`,
	status = 404
} = {}) => (_req, res) => {
	if (!res.headersSent) {
		res.status(status).send(text)
	}
}
