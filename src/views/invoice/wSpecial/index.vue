/**
* @author Linzb
* @date 2019/3/21
* @Description: 待开专票管理
*/
<template>
  <div class="wSpecial-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="listQuery.gfmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="listQuery.ddh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="listQuery.spmc" placeholder="请输入" size="small"/>
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
        <el-table-column label="订单号" prop="orderNo" align="center"/>
        <el-table-column label="购方名称" prop="gfmc" align="center"/>
        <el-table-column label="购方税号" prop="gfsh" align="center"/>
        <el-table-column label="发票类型" prop="fplx" align="center"/>
        <el-table-column label="金额（不含税）" prop="je" align="center"/>
        <el-table-column label="税率" prop="sl" align="center"/>
        <el-table-column label="税额" prop="se" align="center"/>
        <el-table-column label="价税合计" prop="jshj" align="center"/>
        <el-table-column label="开票状态" prop="kpzt" align="center"/>
        <el-table-column label="开票提示" prop="kpts" align="center"/>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">发票预览</el-button>
            <el-button type="primary" size="mini" @click="billDetail">发票明细</el-button>
            <el-button type="primary" size="mini">订单明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQuery.currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <Bill-detail :show-dialog="showDialog" :table-data="billList" @close-dialog="closeBillDetail"/>
  </div>
</template>

<script>
import { batchIssue, billSendBack, initList, getBillDetail } from '@/api/invoice/wSpecial'
import BillDetail from '@/components/invoice/billDetail'
export default {
  name: 'WSpecial',
  components: { BillDetail },
  data() {
    return {
      showDialog: false,
      totalCount: 100,
      // 查询条件
      listQuery: {
        title: '',
        importance: '',
        type: '',
        sort: '',
        limit: 10,
        currentPage: 1
      },
      // 加载动画是否显示
      listLoading: false,
      tableKey: '',
      // 列表数据
      dataList: [{
        orderNo: 1,
        gfmc: '购方名称',
        gfsh: '购方税号'
      }],
      // 勾选的列表项
      checkedItems: [],
      // 发票明细
      billList: []
    }
  },
  methods: {
    // 发票开具
    billIssue() {
      console.log('')
    },
    // 批量开具
    batchIssue() {
      if (this.checkedItems.length === 0) {
        this.$message({
          message: '请至少选择一条数据！',
          type: 'error'
        })
        return
      }
      this.$confirm('是否确认批量开具选择预制发票?', '批量开具', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchIssue().then(res => {
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
    // 预制发票退回
    billSendBack() {
      if (this.checkedItems.length === 0) {
        this.$message({
          message: '请至少选择一条数据！',
          type: 'error'
        })
        return
      }
      this.$confirm('是否确认回退选择的预制发票？?', '预制发票回退', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        billSendBack().then(res => {
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
    },
    // 查询
    initList() {
      initList().then(res => {
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    // 重置
    handleReset() {
      this.listQuery.gfmc = ''
      this.listQuery.ddh = ''
      this.listQuery.spmc = ''
      this.initList()
    },
    // 发票明细
    billDetail() {
      getBillDetail().then(res => {
        this.showDialog = true
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    // 关闭订单明细
    closeBillDetail(val) {
      this.showDialog = val
    },
    handleSizeChange() {
    },
    handleCurrentChange() {},
    handleSelectionChange(val) {
      this.checkedItems = val
      console.log(val)
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
