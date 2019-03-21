import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'
import systemAPI from './system/organization'
import orderOpenMessageAPI from './queryStatistics/orderOpenMessage'
import infoManagementAPI from './system/infoManagement'

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
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)
Mock.mock(/\/user\/getRoute/, 'post', userAPI.getRoute)
// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list)
// System
Mock.mock(/\/organization\/nodeDetail/, 'post', systemAPI.nodeDetail)
Mock.mock(/\/organization\/list/, 'post', systemAPI.getlist)
Mock.mock(/\/commoditye\/selectByCommodity/, 'post', infoManagementAPI.getlist) // 商品信息维护获取数据
Mock.mock(/\/commoditye\/insertCommodity/, 'post', infoManagementAPI.newAdd) // 商品信息维护添加数据
// orderOpenMessage
Mock.mock(/\/orderOpenMessage\/getTableList/, 'post', orderOpenMessageAPI.getTableList)
export default Mock
