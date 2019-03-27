/**
* @author Wujy
* @date 2019/3/21
* @Description:已开普票管理
*/
<template>
  <div class="oOpecial-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="listQuery.gfmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="listQuery.ddh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input v-model="listQuery.spmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input v-model="listQuery.fphm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="开票日期起">
          <el-date-picker
            v-model="listQuery.spmc"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="开票日期止">
          <el-date-picker
            v-model="listQuery.spmc"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="作废日期起">
          <el-date-picker
            v-model="listQuery.spmc"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="作废日期止">
          <el-date-picker
            v-model="listQuery.spmc"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="发票状态">
          <el-input v-model="listQuery.fphm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="打印状态">
          <el-input v-model="listQuery.fphm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="税率">
          <el-input v-model="listQuery.fphm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search" @click="initList">查询</el-button>
          <el-button size="small" style="margin-left: 10px" type="primary" icon="el-icon-edit" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="billIssue">打印发票</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="batchIssue">打印清单</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="billSendBack">作废</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="exportList">发票找回</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="billIssue">导出</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="batchIssue">设置打印机</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="billSendBack">数据回传</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="exportList">发票验证</el-button>
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
        <el-table-column label="发票代码" prop="orderNo" align="center"/>
        <el-table-column label="发票号码" prop="gfmc" align="center"/>
        <el-table-column label="发票类型" prop="gfsh" align="center"/>
        <el-table-column label="购方名称" prop="fplx" align="center"/>
        <el-table-column label="购方税号" prop="je" align="center"/>
        <el-table-column label="金额（不含税）" prop="sl" align="center"/>
        <el-table-column label="税率" prop="se" align="center"/>
        <el-table-column label="税额" prop="jshj" align="center"/>
        <el-table-column label="价税合计" prop="kpzt" align="center"/>
        <el-table-column label="开票时间" prop="kpts" align="center"/>
        <el-table-column label="开票机号" prop="sl" align="center"/>
        <el-table-column label="清单标志" prop="se" align="center"/>
        <el-table-column label="发票状态" prop="jshj" align="center"/>
        <el-table-column label="打印状态" prop="kpzt" align="center"/>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">查看</el-button>
            <el-button type="primary" size="mini">作废重开</el-button>
            <el-button type="primary" size="mini">红冲发票</el-button>
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
  </div>
</template>

<script>
import { batchIssue, billSendBack, initList } from '@/api/invoice/wSpecial'
export default {
  name: 'Dashboard',
  data() {
    return {
      totalCount: 100,
      placeholder: '请输入',
      listQuery: {
        title: '',
        importance: '',
        type: '',
        sort: '',
        limit: 10,
        currentPage: 2
      },
      calendarTypeOptions: [{ name: '1', key: '1' }],
      listLoading: false,
      list: [{ id: 1 }],
      tableKey: '',
      dataList: [{
        orderNo: 1,
        gfmc: '购方名称',
        gfsh: '购方税号'
      }],
      // 勾选的列表项
      checkedItems: []
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
  .oOpecial {
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
