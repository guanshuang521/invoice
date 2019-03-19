/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取节点列表
export function getSpmcList(params) {
  return request({
    url: apiPath.invoiceOpening.opening.spmcGetList,
    method: 'post',
    data: 
      params
    
  })
}
