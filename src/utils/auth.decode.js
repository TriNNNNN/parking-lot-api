import jwt from 'jsonwebtoken'
const {
	JWT_SECRET: jwtSecret
} = process.env

export default (req, res, next) => {
	const {
		authorization: token = ''
	} = req.headers

	const handleToken = _token => {
		jwt.verify(_token, jwtSecret, (err, decoded) => {
			// console.log(err, decoded)
			if (err || !decoded) {
				if (err) {
					console.log(err)
				}
				else {
					console.log('Unknown error: No decoded and no error')
				}
				next(err || new Error('Internal server error'))
			}
			else {
				req.user = decoded
				next()
			}
		})
	}
	token ? handleToken(token) : next()
}
