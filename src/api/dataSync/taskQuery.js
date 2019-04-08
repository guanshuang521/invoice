/**
 * @author Wujy
 * @date 2019/4/8
 * @Description: 任务查询
*/
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'

export function getList(data) {
  return request({
    url: apiPath.dataSync.taskQuery.getList,
    method: 'post',
    data: data
  })
}
export function exportExcel() {
  return request({
    url: apiPath.invoice.dataSync.exportExcel,
    method: 'post'
  })
}
