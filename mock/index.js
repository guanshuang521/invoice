/*
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-19 09:38:33
 * @LastEditTime: 2019-03-21 17:48:23
 */
import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'
// import systemAPI from './system'
import orderListAPI from './orderList'

import systemAPI from './system/organization'
import orderOpenMessageAPI from './queryStatistics/orderOpenMessage'
// 开具
import getListAPI from './invoiceOpening/getlist'
import getGmfListAPI from './invoiceOpening/getGmflist'

import wSpecialAPI from './invoice/wSpecial'
// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })

// User
// Mock.mock(/\/rbac\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)
Mock.mock(/\/user\/getRoute/, 'post', userAPI.getRoute)
// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list)
// System
Mock.mock(/\/organization\/nodeDetail/, 'post', systemAPI.nodeDetail)
// Mock.mock(/\/commoditye\/selectByCommodity/, 'post', infoManagementAPI.getlist) // 商品信息维护获取数据
// Mock.mock(/\/commoditye\/insertCommodity/, 'post', infoManagementAPI.newAdd) // 商品信息维护添加数据
// Mock.mock(/\/commoditye\/updateCommodity/, 'post', infoManagementAPI.updateda) // 商品信息编辑修改
Mock.mock(/\/order\/list/, 'post', orderListAPI.getOrderlist)
// Role
// Mock.mock(/\/role\/selectByRole/, 'post', roleAPI.selectByRole)
// Mock.mock(/\/role\/deleteRole/, 'post', roleAPI.deleteRole)
// Mock.mock(/\/role\/insertRole/, 'post', roleAPI.insertRole)
// Mock.mock(/\/role\/updateRole/, 'post', roleAPI.updateRole)
// Mock.mock(/\/resource\/selectByResource/, 'post', roleAPI.selectByResource)
// Customer
// Mock.mock(/\/customer\/selectByCustomer/, 'post', customerAPI.selectByCustomer)
// Mock.mock(/\/customer\/deleteCustomer/, 'post', customerAPI.deleteCustomer)
// Mock.mock(/\/customer\/insertCustomer/, 'post', customerAPI.insertCustomer)
// orderOpenMessage
Mock.mock(/\/orderOpenMessage\/getTableList/, 'post', orderOpenMessageAPI.getTableList)

// invoiceOpening 开具
Mock.mock(/\/commodityInfo\/getList/, 'post', getListAPI.getlist)
Mock.mock(/\/customer\/getList/, 'post', getGmfListAPI.getGmflist)

// invoice
Mock.mock(/\/invoice\/billDetail/, 'post', wSpecialAPI.getBillDetail)

export default Mock
