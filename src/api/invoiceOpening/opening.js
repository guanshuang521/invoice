/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'
import { getToken } from '@/utils/auth'

// 纸票开具
export function invoice(params) {
  return request({
    url: apiPath.invoiceOpening.opening.makeInvoicePaper,
    method: 'post',
    data: params
  })
}
// 电票开具
export function invoiceEle(params) {
  return request({
    url: apiPath.invoiceOpening.opening.makeEInvoice,
    method: 'post',
    data: params
  })
}
// 打印
export function print(params) {
  return request({
    url: apiPath.invoiceOpening.opening.makeInvoicePaper,
    method: 'post',
    data: params
  })
}
// 电票下载
export function download(data) {
  const params = ['x-access-token=' + getToken()]
  for (const key in data) {
    params.push(key + '=' + data[key])
  }
  window.open(apiPath.invoice.invoicePre.exportInvoicePre + '?' + params.join('&'))
}
