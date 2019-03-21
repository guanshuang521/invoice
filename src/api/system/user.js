/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取节点列表
export function getList() {
  return request({
    url: apiPath.system.User.list,
    method: 'get'
  })
}
