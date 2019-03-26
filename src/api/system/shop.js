/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取表格列表
export function getList() {
  return request({
    url: apiPath.system.shop.list,
    method: 'get'
  })
}
// 新增数据
export function getNew(data1) {
  return request({
    url: apiPath.system.shop.newAdd,
    method: 'post',
    data: data1
  })
}
// 修改数据
export function editData(data2) {
  return request({
    url: apiPath.system.shop.editdata,
    method: 'post',
    data: data2
  })
}
// 删除数据
export function deleteData(storeIds) {
  return request({
    url: apiPath.system.shop.deletedata,
    method: 'Post',
    data: {
      storeIds
    }
  })
}
