const {createPool} = require('mysql2')
const {MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DB} = process.env

const pool = createPool({
	host: MYSQL_HOST,
	user: MYSQL_USER,
	database: MYSQL_DB,
	waitForConnections: true,
	password: MYSQL_PASSWORD,
	connectionLimit: 10,
	queueLimit: 0
})

const promisePool = pool.promise()

const query = queryConfig => promisePool.query(queryConfig)
.then(([rows, fields]) => rows)
.catch(console.log)

export default {
	query
}
