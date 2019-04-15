/**
* @author Wujy
* @date 2019/3/21
* @Description:待开电子发票管理
*/
<template>
  <div class="wSpecial-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="listQuery.gmfMc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="listQuery.djbh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="listQuery.xmmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search" @click="initList">查询</el-button>
          <el-button size="small" style="margin-left: 10px" type="primary" icon="el-icon-edit" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="billIssue">开具发票</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="batchIssue">批量开具</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="billSendBack">预制发票回退</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="exportList">导出</el-button>
    </div>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :key="tableKey"
        :data="dataList"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        style="width: 100%;">
        <el-table-column type="selection" width="35"/>
        <el-table-column label="购方名称" prop="gmfMc" align="center"/>
        <el-table-column label="购方税号" prop="gmfNsrsbh" align="center"/>
        <el-table-column label="发票类型" prop="fplx" align="center"/>
        <el-table-column label="合计金额" prop="hjje" align="center"/>
        <el-table-column label="合计税额" prop="hjse" align="center"/>
        <el-table-column label="价税合计" prop="jshj" align="center"/>
        <el-table-column label="发票代码" prop="fpDm" align="center"/>
        <el-table-column label="发票号码" prop="fpHm" align="center"/>
        <el-table-column label="开票日期" prop="kprq" align="center"/>
        <el-table-column label="开票状态" prop="kpzt" align="center"/>
        <el-table-column label="开票提示" prop="bz" align="center"/>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">发票预览</el-button>
            <el-button type="primary" size="mini">发票明细</el-button>
            <el-button type="primary" size="mini">订单明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQuery.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="100"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
  import {initTableList, invoice, batchInvoice, backInvoicePre, exportData, getOrderDetail} from '@/api/invoice/inovicePre'
  import BillDetail from '@/components/invoice/billDetail'
  import OrderDetail from '@/components/invoice/orderDetail'
  import fppm from '@/components/fppiaomian'
  export default {
    name: 'WElectronic',
    components: { BillDetail, OrderDetail, fppm },
    data() {
      return {
        // 显示发票明细弹窗
        showBillDialog: false,
        // 显示订单明细弹窗
        showOrderDialog: false,
        // 显示发票预览
        showBillPreview: false,
        // 查询条件
        listQuery: {
          currentPage: 1,
          pageSize: 10,
          fplx: this.$store.getters.fplx_ele
        },
        totalCount: 0,
        // 加载动画是否显示
        listLoading: false,
        // 列表数据
        dataList: [],
        // 勾选的列表项
        checkedList: [],
        // 发票明细
        billList: [],
        // 发票类型
        fplx: this.$store.getters.fplx_ele
      }
    },
    methods: {
      // 查询
      initList() {
        this.listLoading = true
        initTableList(this.listQuery).then(res => {
          this.listLoading = false
          this.dataList = res.data.list
          this.totalCount = res.data.count
        }).catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
          this.listLoading = false
        })
      },
      // 重置
      handleReset() {
        this.listQuery = {
          currentPage: 1,
          pageSize: 10,
          fplx: this.$store.getters.fplx_ele,
          gmfMc: '',
          djbh: '',
          xmmc: ''
        }
        this.initList()
      },
      // 发票开具
      invoice() {
        if (this.checkedList && this.checkedList.length === 1) {
          this.$confirm('确认要开具发票吗?', '确认开票', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            invoice(this.checkedList[0]).then(res => {
              if (res.code === '0000') {
                initTableList()
              } else {
                this.$message.success(res.messgae)
              }
            }).catch(err => {
              this.$message.error(err)
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '请选择一条数据！'
          })
        }
      },
      // 批量开具
      batchInvoice() {
        if (this.checkedList.length === 0) {
          this.$message.info('请至少选择一条数据！')
          return
        }
        this.$confirm('是否确认批量开具选择预制发票?', '批量开具', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchInvoice().then(res => {
            this.$message.success(res.messgae)
          }).catch(err => {
            this.$message.error(err)
          })
        })
      },
      // 预制发票退回
      backInvoicePre() {
        if (this.checkedList.length === 0) {
          this.$message({
            message: '请至少选择一条数据！',
            type: 'error'
          })
          return
        }
        this.$confirm('是否确认回退选择的预制发票?', '预制发票回退', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const idArr = []
          this.checkedList.forEach(function(item) {
            idArr.push(item.id)
          })
          backInvoicePre(idArr.join(',')).then(res => {
            this.$message({
              type: 'success',
              message: res.msg
            })
          }).catch(err => {
            this.$message({
              type: 'error',
              message: err.msg
            })
          })
        })
      },
      // 导出
      exportList() {
        exportData(this.listQuery).catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
      }, // 发票预览
      billPreview(rowData) {
        this.showBillPreview = true
      },
      // 发票明细
      billDetail(rowData) {
        this.showBillDialog = true
      },
      // 订单明细
      orderDetail(rowData) {
        const orderParam = {
          id: rowData.id
        }
        getOrderDetail(orderParam).catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
          this.listLoading = false
        })
        this.showOrderDialog = true
      },
      // 关闭订单明细
      closeBillDetail(val) {
        this.showBillDialog = val
        this.showOrderDialog = val
      },
      // 订单预览
      getPmData() {},
      handleSizeChange() {},
      handleCurrentChange() {},
      // 表格选中数据发生变化
      handleSelectionChange(val) {
        this.checkedList = []
        this.checkedList = val
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wSpecial {
    &-container{
      margin: 30px;
      .filter-container{
        margin-bottom: 20px;
      }
      .button-container{
        margin-bottom: 20px;
      }
    }
  }
</style>
