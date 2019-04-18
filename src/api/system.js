/**
 * @author Linzb
 * @date 2019/3/29
 * @Description: 发送系统相关请求
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取节点列表
export function getDictList() {
  return request({
    url: apiPath.login.dict,
    method: 'post',
    data: {}
  })
}
// 修改密码
export function changePassword() {
  return request({
    url: apiPath.login.dict,
    method: 'post',
    data: {}
  })
}
