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
      <el-button type="primary" icon="el-icon-upload" size="small" @click="exportPos">导出</el-button>
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
          prop="djbh"
          label="开票码"
          align="center"/>
        <el-table-column
          prop="mdh"
          label="门店号"
          align="center"/>
        <el-table-column
          prop="jshj"
          label="价税合计"
          align="center"/>
        <el-table-column
          prop="zkje"
          label="折扣金额"
          align="center"/>
        <el-table-column
          prop="ddzt"
          label="订单状态"
          align="center"/>
        <el-table-column
          prop="rksj"
          label="下载时间"
          align="center"/>
        <el-table-column
          prop="bz"
          label="备注"
          align="center"/>
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
import { getPoslist, delPosList, downPosOrder, buildInvoicePre, exportPosOrder } from '@/api/order'
import apiPath from '@/api/apiUrl'
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
        this.loading = false
        this.total = res.data.count
        this.tableList = res.data.list
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
    exportPos() {
      // window.open(apiPath.order.pos.exportPosOrder)
      exportPosOrder(this.searchParams, { responseType: 'arraybuffer' }).then(response => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
        const objectUrl = URL.createObjectURL(blob)
        window.location.href = objectUrl
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
      })
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
          ids: this.checkedList.join(',')
        }
        this.loading = true
        delPosList(params).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.initTable()
          this.loading = false
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
        inputPattern: /^[a-zA-Z0-9]+$/,
        inputErrorMessage: '请输入正确的开票码'
      }).then(({ value }) => {
        // value是输入框的值
        const params = {
          djbh: value
        }
        downPosOrder(params).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          })
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
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
    // 表格选中数据发生变化
    handleSelectionChange(val) {
      this.checkedList = []
      for (let i = 0; i < val.length; i++) {
        this.checkedList.push(val[i].id)
      }
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
      if (this.checkedList.length === 0) {
        this.$message({
          type: 'info',
          message: '请先选择表格中的数据'
        })
        return false
      }
      this.$confirm('确定要生成预制发票吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const params = {
          ids: this.checkedList.join(',')
        }
        console.log(this.checkedList.join(','))
        this.loading = true
        buildInvoicePre(params).then(response => {
          this.loading = false
          this.showDialog = true
          console.log(response)
        }).catch(err => {
          this.loading = false
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      })
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
