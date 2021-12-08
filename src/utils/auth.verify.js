export default (req, res, next) => {
	if (!req.user) {
		res.status(401).send('401: Unauthorized')
	}
	else {
		next()
	}
}
