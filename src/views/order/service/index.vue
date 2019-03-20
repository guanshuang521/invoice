<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-20 17:04:14
 -->
<template>
  <div class="dashboard-container">
    <search-Form :moudel-type="moudelType" :config="queryConditionsForm" :data.sync="searchConditions"/>
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
      dataSource: {}, // 数据源
      columns: [],
      operation: {}
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
    this.queryConditionsForm = orderConfig.queryConditionsForm
    this.columns = orderConfig.columns
    this.operation = orderConfig.operation
  },
  methods: {
    getList() {
      console.log(this.dataSource)
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
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
