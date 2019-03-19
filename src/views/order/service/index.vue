<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-19 14:53:53
 -->
<template>
  <div class="dashboard-container">
    <search-Form :moudel-type="moudelType" :config="queryConditionsForm" :data.sync="searchConditions"/>
    <search-Table
      :data-source="dataSource"
      :columns="columns"
      :operation="operation"
      @handleDelete="handleDelete"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchForm from '../components/searchForm'
import SearchTable from '../components/searchTable'

export default {
  name: 'Dashboard',
  components: { SearchForm, SearchTable },
  data() {
    return {
      moudelType: 'server',
      searchConditions: {
        buyyerName: '',
        supplierCode: '',
        billCode: '',
        countOrderNum: '',
        orderStart: '',
        orderEnd: '',
        dateStart: '',
        dateEnd: '',
        orderState: ''
      },
      queryConditionsForm: [
        {
          title: '购方名称',
          code: 'buyyerName'
        },
        {
          title: '二级供应商编码',
          code: 'supplierCode'
        },
        {
          title: '费用单据编号',
          code: 'billCode'
        },
        {
          title: '结算单号',
          code: 'countOrderNum'
        },
        {
          title: '单据起号',
          code: 'orderStart'
        },
        {
          title: '单据止号',
          code: 'orderEnd'
        },
        {
          title: '传输起止日期',
          code1: 'dateStart',
          code2: 'dateEnd',
          type: 'datepicker'
        },
        {
          title: '订单状态',
          code: 'orderState',
          type: 'select',
          options: [
            {
              id: 0,
              text: '快车'
            },
            {
              id: 1,
              text: '专车'
            },
            {
              id: 2,
              text: '顺风车'
            },
            {
              id: 3,
              text: '出租车'
            }
          ]
        }
      ],
      dataSource: [
        {
          createTime: '2016-05-02',
          username: '8',
          status: '上海市普陀区金沙江路 1518 弄',
          deptName: '家'
        }, {
          createTime: '2016-05-04',
          username: '6',
          status: '上海市普陀区金沙江路 1517 弄',
          deptName: '公司'
        }, {
          createTime: '2016-05-01',
          username: '3',
          status: '上海市普陀区金沙江路 1519 弄',
          deptName: '家'
        }, {
          createTime: '2016-05-03',
          username: '1',
          status: '上海市普陀区金沙江路 1516 弄',
          deptName: '公司'
        }
      ], // 数据源
      columns: [
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'billCode', // <String>  对应属性名
          label: '单据编号', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'countOrderNum', // <String>  对应属性名
          label: '结算单号', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'datatype', // <String>  对应属性名
          label: '数据类型', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'ordertype', // <String>  对应属性名
          label: '单据类型', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'OrderNum', // <String>  对应属性名
          label: '费用单据编号', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'supplierCode', // <String>  对应属性名
          label: '二级供应商编码', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'money', // <String>  对应属性名
          label: '金额（不含税）', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'se', // <String>  对应属性名
          label: '税额', // <String>   表头标签
          align: 'center',
          width: 200 // 列宽
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'username', // <String>  对应属性名
          label: '名字', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'deptName', // <String>  对应属性名
          label: '价税合计', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'status', // <String>  对应属性名
          label: '销方税号', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'status6', // <String>  对应属性名
          label: '购方名称', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'status5', // <String>  对应属性名
          label: '购方税号', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'status4', // <String>  对应属性名
          label: '购方地址电话', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'status3', // <String>  对应属性名
          label: '购方开户行及账号', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'status2', // <String>  对应属性名
          label: '传输日期', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'status1', // <String>  对应属性名
          label: '备注', // <String>   表头标签
          align: 'center'
        }
      ],
      operation: { // 操作功能
        label: '操作', // 操作列的行首文字
        width: '200', // 操作列的宽度
        className: '', // 操作列的class名
        data: [ // 操作列数据
          {
            label: '删除', // 按钮文字
            Fun: 'handleDelete', // 点击按钮后触发的父组件事件
            size: 'mini', // 按钮大小
            id: '1', // 按钮循环组件的key值
            classname: 'show', // 按钮的类名
            type: 'danger' // 按钮的类型
          }
        ]
      }

    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  methods: {
    searchSubmit() {
      this.$message({
        message: '方法查询',
        type: 'success'
      })
    },
    handleDelete(a, b) {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    margin: 0px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
