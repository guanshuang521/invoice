/**
 * Created by admin on .
 */
import request from '@/utils/request'
import apiPath from '@/api/apiUrl'

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
  return request({
    url: apiPath.invoiceOpening.opening.download,
    method: 'post',
    data
  })
}
