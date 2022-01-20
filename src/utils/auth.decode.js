import jwt from 'jsonwebtoken'
const colors = require('colors')
const {
	JWT_SECRET: jwtSecret
} = process.env

export default (req, res, next) => {
	const {
		authorization: token = ''
	} = req.headers

	const handleToken = _token => {
		jwt.verify(_token, jwtSecret, (err, decoded) => {
			if (err || !decoded) {
				if (err) {
					console.log(err)
				}
				else {
					console.log(colors.red('Unknown error: No decoded and no error'))
				}
				next(err || new Error('Internal server error'))
			}
			else {
				req.user = decoded
				next()
			}
		})
	}
	if (token) {
		handleToken(token)
	}
	else {
		next()
	}
}
