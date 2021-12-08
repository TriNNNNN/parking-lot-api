import {QueryTypes} from 'sequelize'
import {sequelize} from '../../utils'
import {mapServiceLocationOem} from '../../models/map_service_location_oem'
import {trCustomer} from '../../models/tr_customer'
import {trCustomerAddress} from '../../models/tr_customer_address'
import {trCustomerProduct} from '../../models/tr_customer_product'
import {trJobHead} from '../../models/tr_job_head'
import {trJobDetail} from '../../models/tr_job_detail'
import {vwJobList} from '../../models/vw_job_list'


const isValidModelProductOemMap = (model_id, product_id, oem_id) => {
	const qry = `select
                    *
                from
                    SR_DEV.mst_model md
                join SR_DEV.mst_product pr on
                    md.mst_product_id = pr.id
                where
                    md.id = :model_id
                    and pr.id = :product_id
                    and pr.mst_oem_id = :oem_id; `
	return sequelize.query(qry, {replacements: {model_id,
		product_id,
		oem_id},
	plain: false,
	raw: true,
	type: QueryTypes.SELECT})
}

const isValidOemServiceLocation = (mst_service_location_id, mst_oem_id) => mapServiceLocationOem.findOne({where: {mst_service_location_id,
	mst_oem_id},
raw: true})

const addCustomer = (data, options) => trCustomer.create(data, options)

const addCustomerAddress = (data, options) => trCustomerAddress.create(data, options)

const addCustomerProduct = (data, options) => trCustomerProduct.create(data, options)

const addJob = (data, options) => trJobHead.create(data, options)
.then(res => {
	const jobDetail = {tr_job_head_id: res.id,
		mst_action_status_id: res.mst_action_status_id}
	return trJobDetail.create(jobDetail, options)
})
.catch(err => {
	throw err
})

const getJobsPendingForAss = mst_service_location_id => vwJobList.findAll({
	where: {mst_service_location_id,
		mst_action_status: 'Job Creation'}
})

export {
	isValidModelProductOemMap,
	isValidOemServiceLocation,
	addCustomer,
	addCustomerAddress,
	addCustomerProduct,
	addJob,
	getJobsPendingForAss
}
