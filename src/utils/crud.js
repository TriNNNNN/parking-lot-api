export default class DBWrapper {
	constructor(model) {
		this.model = model
	}

	findAll(options) {
		return this.model.findAll(options)
		.catch(err => {
			throw new Error(err)
		})
	}

	findOne(options) {
		return this.model.findOne(options)
		.catch(err => {
			throw new Error(err)
		})
	}

	create(data, options) {
		return this.model.create(data, options)
		.catch(err => {
			throw new Error(err)
		})
	}

	update(data, options) {
		return this.model.update(data, options)
		.catch(err => {
			throw new Error(err)
		})
	}

	updateOne(data, options) {
		return this.model.updateOne(data, options)
		.catch(err => {
			throw new Error(err)
		})
	}
}
