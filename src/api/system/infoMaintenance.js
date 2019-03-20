/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取购方列表
export function getCustomerList(data) {
  return request({
    url: apiPath.system.customer.selectByCustomer,
    method: 'post',
    data
  })
}
// 删除购方
export function deleteCustomer(data) {
  return request({
    url: apiPath.system.customer.deleteCustomer,
    method: 'post',
    data
  })
}
// 新增购方
export function insertCustomer(data) {
  return request({
    url: apiPath.system.customer.insertCustomer,
    method: 'post',
    data
  })
}

