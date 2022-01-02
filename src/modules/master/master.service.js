import _ from 'lodash'

const getMasterDataByModel = (model, filter = {}) => {
    let where = filter
    return model.findAll({ where, raw: true })
    .catch(err => { 
        throw err 
    })
}

export {
	getMasterDataByModel
}
