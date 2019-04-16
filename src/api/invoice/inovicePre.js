/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
import { getToken } from '@/utils/auth'

export function initTableList(data) {
  return request({
    url: apiPath.invoice.invoicePre.list,
    method: 'post',
    data: data
  })
}
export function backInvoicePre(ids) {
  return request({
    url: apiPath.invoice.invoicePre.backInvoicePre,
    method: 'post',
    data: 'ids=' + ids
  })
}
export function exportData(data) {
  const params = ['x-access-token=' + getToken()]
  for (const key in data) {
    params.push(key + '=' + data[key])
  }
  window.open(apiPath.invoice.invoicePre.exportInvoicePre + '?' + params.join('&'))
}
export function getOrderDetail(data) {
  return request({
    url: apiPath.invoice.invoicePre.orderDetail,
    method: 'post',
    data: data
  })
}
