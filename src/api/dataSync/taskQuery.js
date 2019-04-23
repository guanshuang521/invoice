/**
 * @author Wujy
 * @date 2019/4/8
 * @Description: 任务查询
*/
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
import { getToken } from '@/utils/auth'

export function getList(data) {
  return request({
    url: apiPath.dataSync.taskQuery.getList,
    method: 'post',
    data: data
  })
}
export function exportExcel(data) {
  const params = ['x-access-token=' + getToken()]
  for (const key in data) {
    params.push(key + '=' + data[key])
  }
  window.open(apiPath.dataSync.taskQuery.exportExcel + '?' + params.join('&'))
}
