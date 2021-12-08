import {
	Sequelize
} from 'sequelize'

const {
	MYSQL_CONN: mysqlConn,
	SCHEMA: schema
} = process.env

const sequelize = new Sequelize(mysqlConn, {
	dialect: 'mysql',
	define: {
		freezeTableName: true,
		timestamps: false
	}
})

sequelize
.authenticate()
.then(() => {
	console.log('connected')
})
.catch(up => {
	throw up
})

export default sequelize
