/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 商品名称查询列表
export function getSpmcList(params) {
  return request({
    url: apiPath.invoiceOpening.opening.spmcGetList,
    method: 'post',
    data: 
      params
    
  })
}
// 购买方信息查询列表
export function getGmfList(params) {
  return request({
    url: apiPath.invoiceOpening.opening.gmfGetList,
    method: 'post',
    data: 
      params
    
  })
}
