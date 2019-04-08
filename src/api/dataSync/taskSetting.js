/**
 * @author Wujy
 * @date 2019/4/8
 * @Description: 任务设置
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
export function initData(data) {
  return request({
    url: apiPath.dataSync.taskSetting.list,
    method: 'post',
    data: data
  })
}
export function submitSync(data) {
  return request({
    url: apiPath.dataSync.taskSetting.submitSync,
    method: 'post',
    data: data
  })
}
export function addSave(data) {
  return request({
    url: apiPath.dataSync.taskSetting.add,
    method: 'post',
    data: data
  })
}
export function handleEdit(data) {
  return request({
    url: apiPath.dataSync.taskSetting.edit,
    method: 'post',
    data: data
  })
}
