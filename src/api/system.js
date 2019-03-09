import request from '@/utils/request'
import apiPath from '@/api/apiUrl'

export function list(username, password) {
  return request({
    url: apiPath.system.organization.list,
    method: 'post',
    data: {
      username,
      password
    }
  })
}
