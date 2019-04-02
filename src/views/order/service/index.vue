<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-25 10:50:12
 -->
<template>
  <div class="service-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="二级供应商编码">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="费用单据编号">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="结算单号">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="单据起号">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="单据止号">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="传输日期起">
          <el-date-picker
            v-model="searchParams.userName"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="传输日期止">
          <el-date-picker
            v-model="searchParams.userName"
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
      <el-button type="primary" icon="el-icon-edit" size="small" @click="createPreInvoice">同一购方订单生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-circle-check" size="small" @click="checkCreateInvoice">勾选订单生成预制发票</el-button>
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
    <!--生成预制发票弹窗-->
    <invoice-dialog :ishow="invoiceDialogVisible" @hideDialog="closeDialog"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrderlist } from '@/api/order'
import invoiceDialog from '../components/invoiceDialog'
export default {
  name: 'Dashboard',
  components: { invoiceDialog },
  data() {
    return {
      // 列表查询参数
      searchParams: {
        pageSize: 10,
        currentPage: 1,
        userName: ''
      },
      // 列表数据
      tableList: [],
      // 列表总条数
      totalCount: 0,
      // 生成预制发票窗口是否显示
      invoiceDialogVisible: false,
      multipleSelection: [],
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
  mounted() {},
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
        userName: '',
        role: ''
      }
      this.initTable()
    },
    // 同一购方订单生成预制发票
    createPreInvoice() {
      this.invoiceDialogVisible = true
    },
    // 勾选生成预制发票
    checkCreateInvoice() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('至少选择一条数据')
        return false
      }
    },
    // 关闭弹窗
    closeDialog(val) {
      console.log(val)
      this.invoiceDialogVisible = val
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
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.service {
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
