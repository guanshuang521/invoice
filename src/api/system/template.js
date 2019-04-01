/**
 * @author Linzb
 * @date 2019/4/1
 * @Description: 开票规则模板API
*/
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
// 获取模板列表
export function getTable(data) {
  return request({
    url: apiPath.system.template.list,
    method: 'post',
    data: data
  })
}
