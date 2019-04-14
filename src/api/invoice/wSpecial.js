/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'

export function batchIssue() {
  return request({
    url: apiPath.invoice.wSpecial.batchIssue,
    method: 'post'
  })
}
export function billSendBack() {
  return request({
    url: apiPath.invoice.wSpecial.billSendBack,
    method: 'post'
  })
}
export function initList(data) {
  return request({
    url: apiPath.invoice.wSpecial.list,
    method: 'post',
    data
  })
}
export function getBillDetail() {
  return request({
    url: apiPath.invoice.wSpecial.billDetail,
    method: 'post'
  })
}
