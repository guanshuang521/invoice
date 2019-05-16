/**
 * @author Linzb
 * @date 2019/4/18
 * @Description: 定义全局过滤器文件
 */
// 将UTC时间转化为北京时间
export function utoTimeToBeijing(value) {
  return new Date(+new Date(new Date(value).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
// 将数字转换成金额显示
export function toMoney(num) {
  num = parseFloat(num).toFixed(2)
  num = num.toLocaleString()
  return num
}
// 发票校验码格式化
export function formatBillcheckNumber(num) {
  num = parseFloat(num).toFixed(2)
  num = num.toLocaleString()
  return num
}
