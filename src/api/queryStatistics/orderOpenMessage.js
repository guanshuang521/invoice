/**
 * Created by wujy
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取节点列表
export function getTableList() {
  console.log(apiPath.queryStatistics.orderOpenMessage.getTableList)
  return request({
    url: apiPath.queryStatistics.orderOpenMessage.getTableList,
    method: 'post',
    data: 'data'
  })
}
