<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-19 09:34:24
 -->
<template>
  <div class="dashboard-container">
    <search-Form :moudel-type="moudelType" :config="queryConditionsForm" :data.sync="searchConditions"/>
    <search-Table :table-data3="tableData3" />
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
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
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
