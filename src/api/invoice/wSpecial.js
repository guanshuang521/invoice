/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'

export function f() {
  return request({
    url: apiPath.system.organization.list,
    method: 'post'
  })
}
