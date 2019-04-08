/*
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-19 16:50:23
 * @LastEditTime: 2019-03-19 16:55:52
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 服务类订单管理
export function getOrderlist(data) {
  return request({
    url: apiPath.order.list.erpList,
    method: 'post',
    data: data
  })
}
export function getPoslist(data) {
  return request({
    url: apiPath.order.pos.findList,
    method: 'post',
    data: data
  })
}
export function delPosList(data) {
  return request({
    url: apiPath.order.pos.delList,
    method: 'post',
    data: data
  })
}
