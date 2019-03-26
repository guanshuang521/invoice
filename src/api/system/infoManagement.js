/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取商品信息
export function commodictList(data) {
  return request({
    url: apiPath.system.InfoManagement.list,
    method: 'post',
    data: data
  })
}
// 商品信息添加
export function AddData(data) {
  console.log(data)
  return request({
    url: apiPath.system.InfoManagement.newAdd,
    method: 'post',
    data: data
  })
}
// 商品信息添加
export function updateData(data, id) {
  console.log(data)
  return request({
    url: apiPath.system.InfoManagement.updateda,
    method: 'post',
    data: {
      data,
      id
    }
  })
}
