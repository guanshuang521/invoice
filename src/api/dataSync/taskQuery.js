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
    params: data
  })
}
export function exportExcel(data) {
  console.log(data)
  return request({
    url: apiPath.dataSync.taskQuery.exportExcel,
    method: 'get',
    pr: data
  })
}
