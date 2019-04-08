<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-25 17:37:23
 -->
<template>
  <div class="dashboard-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="开票码">
          <el-input v-model="searchParams.djbh" placeholder="请输入开票码" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button type="primary" icon="el-icon-edit" size="small" @click="orderDownload">订单下载</el-button>
      <el-button type="primary" icon="el-icon-circle-check" size="small" @click="showInvoiceDialog">勾选生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-upload" size="small">导出</el-button>
      <el-button type="primary" size="mini" @click="delList">删除</el-button>
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
          label="结算单号"
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
      <!--<span v-show="dataSource.list&&dataSource.list.length>1" class="hjje">合计金额:{{ dataSource.total }}</span>-->
      <!--<span class="hjje">合计金额:</span>-->
      <!--<span class="hjse">合计税额:</span>-->
      <!--<span class="jshj">加税合计:</span>-->
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
import Invoicedialog from '../components/invoiceDialog'
import { getPoslist, delPosList } from '@/api/order'

export default {
  name: 'Dashboard',
  components: { Invoicedialog },
  data() {
    return {
      // 列表查询参数
      searchParams: {
        pageSize: 10,
        currentPage: 1,
        djbh: ''
      },
      // 列表数据
      tableList: [],
      // 列表总条数
      totalCount: 0,
      moudelType: 'pos',
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
      queryConditionsForm: [], // 接受的config的查询条件配置的参数
      columns: [], // 接受的config的配置的参数
      operation: {}, // 接受的config的操作配置的参数
      showDialog: false,
      // 已勾选的列表项
      checkedList: []
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
      this.listLoading = true
      getPoslist(this.searchParams).then(res => {
        console.log(res)
        // this.list = res.data.list
        // this.totalCount = res.data.count
        this.listLoading = false
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
        this.listLoading = false
      })
    },
    // 查询重置
    reset() {
      this.searchParams = {
        pageSize: 10,
        currentPage: 1,
        djbh: ''
      }
      this.initTable()
    },
    delList() { // 删除数据
      if (this.checkedList.length === 0) {
        this.$message({
          type: 'info',
          message: '请先选择表格中的数据'
        })
        return false
      }
      this.$confirm('确定要删除选择的数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const params = {
          ids: this.checkedList.join()
        }
        this.loading = true
        delPosList(params).then(response => {
          if (response.code === '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initTable()
          }
        }).catch(err => {
          this.loading = false
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      })
    },
    // 订单下载
    orderDownload() {
      this.$prompt('开票码', '下载POS订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleEdit(ind, rows) { // 编辑
      this.dialogVisible = true
      this.dialogType = 'edit'
      console.log(rows)
      this.form = rows
    },
    // 选中复选框
    handleSelectionChange(val) {
      this.checkedList = val
    },
    // 删除操作
    handleDelete(a, b) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 生成预制发票
    makeInvoicePre(formName) {
      console.log(formName)
    },
    showInvoiceDialog() {
      this.showDialog = true
      console.log(this.showDialog)
    },
    hideDialog() {
      this.showDialog = false
    },
    // 关闭弹窗
    closeDialog(val) {
      console.log(val)
      this.invoiceDialogVisible = val
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
    }
  }
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
