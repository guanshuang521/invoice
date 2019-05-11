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
export function editData(data, id) {
  return request({
    url: apiPath.system.InfoManagement.editData,
    method: 'post',
    data: data
  })
}
export function getAllCommodityTypes(data) {
  return request({
    url: apiPath.system.InfoManagement.commodityTypes,
    method: 'post',
    data: data
  })
}
// 获取所有商品列表
export function getAllList(data) {
  return request({
    url: apiPath.system.InfoManagement.allList,
    method: 'post',
    data: data
  })
}
// 根据税收分类编码获取商品编码
export function getManagementCode(data) {
  return request({
    url: apiPath.system.InfoManagement.getManagementCode,
    method: 'post',
    data: data
  })
}
// 批量设置税收分类编码
export function updateCommodityByShflbm(data) {
  return request({
    url: apiPath.system.InfoManagement.updateCommodityByShflbm,
    method: 'post',
    data: data
  })
}
