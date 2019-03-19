/*
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-19 16:36:21
 * @LastEditTime: 2019-03-19 17:04:59
 */
const Order = {
  Orderlist: {
    count: 58,
    currentPage: 2,
    pageSize: 5,
    list: [
      {
        createTime: '2016-05-02',
        username: '8',
        status: '上海市普陀区金沙江路 1518 弄',
        deptName: '家',
        billCode: '12345678900000000',
        countOrderNum: '324243535667',
        supplierCode: '12344556',
        datatype: '12133',
        se: '0.22',
        money: '222.00',
        sjhj: '10.22',
        bz: 'hahaahahahah'
      },
      {
        createTime: '2016-05-02',
        username: '8',
        status: '上海市普陀区金沙江路 1518 弄',
        deptName: '家',
        billCode: '12345678900000000',
        countOrderNum: '324243535667',
        supplierCode: '12344556',
        datatype: '12133',
        se: '0.22',
        money: '222.00',
        sjhj: '10.22',
        bz: 'hahaahahahah'
      },
      {
        createTime: '2016-05-02',
        username: '8',
        status: '上海市普陀区金沙江路 1518 弄',
        deptName: '家',
        billCode: '12345678900000000',
        countOrderNum: '324243535667',
        supplierCode: '12344556',
        datatype: '12133',
        se: '0.22',
        money: '222.00',
        sjhj: '10.22',
        bz: 'hahaahahahah'
      },
      {
        createTime: '2016-05-02',
        username: '8',
        status: '上海市普陀区金沙江路 1518 弄',
        deptName: '家',
        billCode: '12345678900000000',
        countOrderNum: '324243535667',
        supplierCode: '12344556',
        datatype: '12133',
        se: '0.22',
        money: '222.00',
        sjhj: '10.22',
        bz: 'hahaahahahah'
      },
      {
        createTime: '2016-05-02',
        username: '8',
        status: '上海市普陀区金沙江路 1518 弄',
        deptName: '家',
        billCode: '12345678900000000',
        countOrderNum: '324243535667',
        supplierCode: '12344556',
        datatype: '12133',
        se: '0.22',
        money: '222.00',
        sjhj: '10.22',
        bz: 'hahaahahahah'
      }
    ]
  }

}
export default {
  getOrderlist: res => {
    const info = Order['Orderlist']
    if (info) {
      return {
        code: 20000,
        data: info
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  }
}
