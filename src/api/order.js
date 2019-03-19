/*
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-19 16:50:23
 * @LastEditTime: 2019-03-19 16:55:52
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
export function getOrderlist(username, password) {
  return request({
    url: apiPath.order.list,
    method: 'post',
    data: {
      username,
      password
    }
  })
}

