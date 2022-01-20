const colors = require('colors')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const URI = process.env.MONGO_CLOUD

const connectMongo = function() {
	console.log(colors.yellow(`[booting] *** connecting to [${URI}] `))
	mongoose.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
}

// Error handler
mongoose.connection.on('error', err => {
	console.log(colors.red(`[booting] *** MongoDB failed to establish connection [${err}]`))
})

// On Connection established
mongoose.connection.on('open', () => {
	console.log(colors.green(`[booting] *** connection established to [${URI}] `))
})

// Reconnect when closed
mongoose.connection.on('disconnected', () => {
	setTimeout(() => {
		connectMongo()
	}, 1000)
})

const helper = {
	importAllModels() {
		require('../models/index')
	}
}

helper.importAllModels()


export default connectMongo
