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
  window.open(apiPath.invoiceOpening.opening.download + '?' + params.join('&'))
}
// 电票下载(改动后)
export function downloadNew(data) {
  return request({
    url: apiPath.invoiceOpening.opening.download,
    method: 'post',
    data
  })
}
// 获取未开票的发票代码、发票号码
export function getNotInvoiceYetDmHm(data) {
  return request({
    url: apiPath.invoiceOpening.opening.getNotInvoiceYetDmHm,
    method: 'post',
    data
  })
}
