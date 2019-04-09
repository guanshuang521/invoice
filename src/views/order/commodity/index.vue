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
          <el-input v-model="searchParams.djbh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="二级供应商编码">
          <el-input v-model="searchParams.billingCode" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="searchParams.ddzt" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="单据起号">
          <el-input v-model="searchParams.djqh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="单据止号">
          <el-input v-model="searchParams.djzh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="传输日期起">
          <el-date-picker
            v-model="searchParams.createTime"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="传输日期止">
          <el-date-picker
            v-model="searchParams.createTime"
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
          prop="djbh"
          label="单据编号"
          align="center"
          width="130"/>
        <el-table-column
          prop="sjlx"
          label="数据类型"
          align="center"
          width="130"/>
        <el-table-column
          prop="djlx"
          label="单据类型"
          align="center"
          width="130"/>
        <el-table-column
          prop="djbh"
          label="费用单据编号"
          align="center"
          width="130"/>
        <el-table-column
          prop="ejgysbm"
          label="二级供应商编码"
          align="center"
          width="130"/>
        <el-table-column
          prop="je"
          label="金额（不含税）"
          align="center"
          width="130"/>
        <el-table-column
          prop="sj"
          label="税额"
          align="center"
          width="130"/>
        <el-table-column
          prop="jshj"
          label="价税合计"
          align="center"
          width="130"/>
        <el-table-column
          prop="xfnssbh"
          label="销方税号"
          align="center"
          width="130"/>
        <el-table-column
          prop="gfmc"
          label="购方名称"
          align="center"
          width="130"/>
        <el-table-column
          prop="gfsh"
          label="购方税号"
          align="center"
          width="130"/>
        <el-table-column
          prop="gfdzdh"
          label="购方地址电话"
          align="center"
          width="130"/>
        <el-table-column
          prop="gfkhhzh"
          label="购方开户行及账号"
          align="center"
          width="130"/>
        <el-table-column
          prop="csrq"
          label="传输日期"
          align="center"
          width="130"/>
        <el-table-column
          prop="bz"
          label="备注"
          align="center"
          width="130"/>
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
import { getOrderlist, generatenIvoices, exportERP, buildInvoice } from '@/api/order'
import Invoicedialog from '../components/invoiceDialog'
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
        gfmc: '',
        ejgysbm: '',
        djbh: '',
        ddzt: '',
        djqh: '',
        djzh: '',
        createTime: '',
        billingCode: ''
      },
      // 列表数据
      tableList: [],
      // 列表勾选项
      checkedList: [],
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
      this.listLoading = true
      getOrderlist(this.searchParams).then(res => {
        console.log(res)
        this.list = res.data.list
        this.totalCount = res.data.count
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
    // 同一购方订单生成预制发票
    createPreInvoice() {
      if (this.checkedList.length === 0) {
        this.$message({
          type: 'info',
          message: '请先选择表格中的一条数据'
        })
        return false
      }
      if (this.checkedList.length !== 1) {
        this.$message({
          type: 'info',
          message: '请选择表格中的一条数据'
        })
        return false
      }
      this.$confirm('确定要同一购方订单生成预制发票吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const params = {
          id: this.checkedList.join()
        }
        this.loading = true
        buildInvoice(params).then(response => {
          console.log(response)
          this.showDialog = true
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
    // 表格选中数据发生变化
    handleSelectionChange(val) {
      this.checkedList = []
      for (let i = 0; i < val.length; i++) {
        this.checkedList.push(val[i].id)
      }
    },
    // 勾选生成预制发票
    checkCreateInvoice() {
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
        this.loading = true
        generatenIvoices(params).then(response => {
          this.loading = false
          this.showDialog = true
        }).catch(err => {
          this.loading = false
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      })
    },
    exportData() { // 导出数据
      window.open(apiPath.order.list.exportErp)
      // exportERP(this.searchParams).then(response => {
      // }).catch(err => {
      //   this.$message({
      //     type: 'error',
      //     message: err.message
      //   })
      // })
    },
    // 关闭预制发票弹出框
    hideDialog() {
      this.showDialog = false
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
