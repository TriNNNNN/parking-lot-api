import {getMasterDataByModel} from '../master/master.service'

const getMasterData = async(req, res, next) => {
	try {
		const {model, filter} = req.body
		const data = await getMasterDataByModel(model, filter)
		return res.status(200).send(data)
	}
	catch (err) {
		next(err)
	}
}

export {
	getMasterData
}
