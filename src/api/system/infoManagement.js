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
// 导出模板文件
export function exportModle() {
  return request({
    url: apiPath.system.InfoManagement.exportModle,
    method: 'get'
  })
}
// 设置分类编码
export function settingNum(data) {
  console.log(data)
  return request({
    url: apiPath.system.InfoManagement.newAdd,
    method: 'post',
    data: data
  })
}
// 导入Excel
export function importExcel(data) {
  return request({
    url: apiPath.system.InfoManagement.importExcel,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}
// 导出数据
export function exportData(data) {
  return request({
    url: apiPath.system.InfoManagement.exportData,
    method: 'get'
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
