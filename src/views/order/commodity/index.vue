<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-25 17:52:50
 -->
<template>
  <div class="dashboard-container">
    <search-Form :moudel-type="moudelType" :config="queryConditionsForm" :data.sync="searchConditions" :data-source="dataSource"/>
    <div class="btn_wrapper">
      <el-button type="primary" icon="el-icon-edit" @click="showInvoiceDialog">同一购方订单生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-circle-check" @click="showInvoiceDialog">勾选订单生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-upload">导出</el-button>
    </div>
    <search-Table
      :data-source="dataSource"
      :columns="columns"
      :operation="operation"
      @handleDelete="handleDelete"
      @handleSelectionChange="handleSelectionChange"/>
    <Invoicedialog
      :moudel-type="moudelType"
      :ishow="showDialog"
      @makeInvoicePre="makeInvoicePre"
      @hideDialog="hideDialog"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SearchForm from '../components/searchForm'
import SearchTable from '../components/searchTable'
import { getOrderlist } from '@/api/order'
import orderConfig from '../components/orderConfig'
import Invoicedialog from '../components/invoiceDialog'
export default {
  name: 'Dashboard',
  components: { SearchForm, SearchTable, Invoicedialog },
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
      operation: {},
      showDialog: false
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
    },
    makeInvoicePre(formName) {
      console.log(formName)
    },
    // 显示预制发票弹出框
    showInvoiceDialog() {
      this.showDialog = true
    },
    // 关闭预制发票弹出框
    hideDialog() {
      this.showDialog = false
    }
  }
  // 生成预制发票

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
