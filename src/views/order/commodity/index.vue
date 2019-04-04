<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-25 17:52:50
 -->
<template>
  <div class="dashboard-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="searchParams.billingCode" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="费用单据编号">
          <el-input v-model="searchParams.billingCode" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="二级供应商编码">
          <el-input v-model="searchParams.billingCode" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="searchParams.billingCode" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="单据起号">
          <el-input v-model="searchParams.billingCode" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="单据止号">
          <el-input v-model="searchParams.billingCode" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="传输日期起">
          <el-date-picker
            v-model="searchParams.billingCode"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="传输日期止">
          <el-date-picker
            v-model="searchParams.billingCode"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button type="primary" icon="el-icon-edit" size="small" @click="showInvoiceDialog">同一购方订单生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-circle-check" size="small" @click="showInvoiceDialog">勾选订单生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-upload" size="small">导出</el-button>
    </div>
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="tableList"
        border
        fit
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="35" align="center"/>
        <el-table-column prop="index" label="序号" align="center" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="billCode"
          label="单据编号"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="数据类型"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="单据类型"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="费用单据编号"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="二级供应商编码"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="金额（不含税）"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="税额"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="价税合计"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="销方税号"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="购方名称"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="购方税号"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="购方地址电话"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="购方开户行及账号"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="传输日期"
          align="center"
          width="130"/>
        <el-table-column
          prop="billCode"
          label="备注"
          align="center"
          width="130"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page = "searchParams.currentPage"
        :page-sizes = "[10, 20, 30, 40]"
        :page-size = "searchParams.pageSize"
        :total = "totalCount"
        style="margin-top: 20px"
        layout = "total, sizes, prev, pager, next, jumper"
        @size-change = "handleSizeChange"
        @current-change = "handleCurrentChange"/>
    </div>
    <Invoicedialog
      :moudel-type="moudelType"
      :ishow="showDialog"
      @makeInvoicePre="makeInvoicePre"
      @hideDialog="hideDialog"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrderlist } from '@/api/order'
import Invoicedialog from '../components/invoiceDialog'
export default {
  name: 'Dashboard',
  components: { Invoicedialog },
  data() {
    return {
      // 列表查询参数
      searchParams: {
        pageSize: 10,
        currentPage: 1,
        billingCode: ''
      },
      // 列表数据
      tableList: [],
      // 列表总条数
      totalCount: 0,
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
  },
  methods: {
    // 初始化数据
    initTable() {
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
    // 查询重置
    reset() {
      this.searchParams = {
        billingCode: ''
      }
      this.initTable()
    },
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
    // handleSelectionChange(item) {
    //   var idsStr = ''
    //   for (var i = 0; i < item.length; i++) {
    //     idsStr += item[i]['billingCode'] + ','
    //   }
    //   console.log(idsStr)
    // },
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
    },
    // 列表勾选
    handleSelectionChange(val) {
      this.checkedList = val
      console.log(this.checkedList)
    },
    // 更改每页显示条数
    handleSizeChange(val) {
      this.searchParams.pageSize = val
      this.initTable()
    },
    // 更改当前页码
    handleCurrentChange(val) {
      this.searchParams.currentPage = val
      this.initTable()
    },
    handleCheckChange() {
    },
    handleEdit(ind, rows) { // 编辑
      this.dialogVisible = true
      this.dialogType = 'edit'
      console.log(rows)
      this.form = rows
    }
  }
  // 生成预制发票

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
      .button-container{
        margin-bottom: 20px;
      }
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
