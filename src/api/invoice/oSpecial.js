/**
 * @author Linzb
 * @date 2019/4/11
 * @Description: 已开专票
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'

// 获取表格列表
export function getList(data) {
  return request({
    url: apiPath.invoice.oSpecial.list,
    method: 'post',
    data: data
  })
}
