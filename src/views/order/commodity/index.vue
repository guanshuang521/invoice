<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-21 17:34:30
 -->
<template>
  <div class="dashboard-container">
    <search-Form :moudel-type="moudelType" :config="queryConditionsForm" :data.sync="searchConditions" :data-source="dataSource"/>
    <div class="btn_wrapper">
      <el-button type="primary" icon="el-icon-edit">同一购方订单生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-circle-check">勾选订单生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-upload">导出</el-button>
    </div>
    <search-Table
      :data-source="dataSource"
      :columns="columns"
      :operation="operation"
      @handleDelete="handleDelete"
      @handleSelectionChange="handleSelectionChange"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SearchForm from '../components/searchForm'
import SearchTable from '../components/searchTable'
import { getOrderlist } from '@/api/order'
import orderConfig from '../components/orderConfig'
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
      queryConditionsForm: [],
      dataSource: {
        currentPage: 1,
        count: 0,
        pageSize: 5
      }, // 数据源
      columns: [],
      operation: {}
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
    this.queryConditionsForm = orderConfig.commodityConditionsForm
    this.columns = orderConfig.commodityColumns
    // this.operation = orderConfig.operation
  },
  methods: {
    getList() {
      console.log(this.dataSource)
      // if(){}
      console.log(this.searchConditions === '{}')
      getOrderlist().then(res => {
        console.log(res)
        this.dataSource = res.data
        this.$message({
          message: '查询成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    handleDelete(a, b) {
      console.log(orderConfig)
    },
    handleSelectionChange(item) {
      var idsStr = ''
      for (var i = 0; i < item.length; i++) {
        idsStr += item[i]['username'] + ','
      }
      console.log(idsStr)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    margin: 0px;
    .btn_wrapper{
      padding: 10px 20px
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
