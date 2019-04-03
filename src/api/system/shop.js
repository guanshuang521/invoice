/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取表格列表
export function getList(data) {
  return request({
    url: apiPath.system.shop.list,
    method: 'post',
    data: data
  })
}
// 新增数据
export function addStore(data1) {
  return request({
    url: apiPath.system.shop.newAdd,
    method: 'post',
    data: data1
  })
}
// 修改数据
export function editData(data2) {
  return request({
    url: apiPath.system.shop.edit,
    method: 'post',
    data: data2
  })
}
// 删除数据
export function deleteData(ids) {
  return request({
    url: apiPath.system.shop.delete,
    method: 'get',
    params: {
      ids
    }
  })
}
// 数据详情
export function detailData(id) {
  return request({
    url: apiPath.system.shop.detail,
    method: 'get',
    params: id
  })
}
