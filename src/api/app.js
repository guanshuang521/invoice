/**
 * @author Linzb
 * @date 2019/4/17
 * @Description: 系统相关请求
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'

export function changePassword(data) {
  return request({
    url: apiPath.app.changePassword,
    method: 'post',
    data
  })
}
