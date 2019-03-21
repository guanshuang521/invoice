<template>
  <div class="dashboard-container">
    <div class="search-box">
      <div class="search-item">
        <span>销方名称</span>
        <el-input v-model="searchs.customerName"/>
      </div>
      <div class="search-item">
        <span>购方名称</span>
        <el-input v-model="searchs.customerTaxNumber"/>
      </div>
      <div class="search-item">
        <span>发票代码</span>
        <el-input v-model="searchs.customerTaxNumber"/>
      </div>
      <div class="search-item">
        <span>发票号码</span>
        <el-input v-model="searchs.customerTaxNumber"/>
      </div>
      <div class="search-item">
        <span>发票类型</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
      <el-button type="primary" size="small" @click="searchFn">查询</el-button>
      <el-button type="primary" size="small" @click="initSearch">重置</el-button>
    </div>
    <div class="button-box">
      <el-button type="primary" size="mini" @click="importExcel">导出</el-button>
    </div>
    <div class="table-box">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="34px"/>
        <el-table-column align="center" width="31px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="发票代码" align="center">
          <template slot-scope="scope">
            {{ scope.row.djsh }}
          </template>
        </el-table-column>
        <el-table-column label="发票号码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.xfmc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发票类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.xfsh }}
          </template>
        </el-table-column>
        <el-table-column label="销方名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.gfmc }}
          </template>
        </el-table-column>
        <el-table-column label="销方税号" align="center">
          <template slot-scope="scope">
            {{ scope.row.gfsh }}
          </template>
        </el-table-column>
        <el-table-column label="购方名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.je }}
          </template>
        </el-table-column>
        <el-table-column label="购方税号" align="center">
          <template slot-scope="scope">
            {{ scope.row.se }}
          </template>
        </el-table-column>
        <el-table-column label="金额（不含税）" align="center">
          <template slot-scope="scope">
            {{ scope.row.ddzt }}
          </template>
        </el-table-column>
        <el-table-column label="税额" align="center">
          <template slot-scope="scope">
            {{ scope.row.se }}
          </template>
        </el-table-column>
        <el-table-column label="价税合计" align="center">
          <template slot-scope="scope">
            {{ scope.row.jshj }}
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            {{ scope.row.ddzt }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">订单信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[25, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next, jumper, total, sizes, slot"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
        <!-- <span></span> -->
      </el-pagination>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="订单信息"
      width="750px"
      custom-class="add-customer">
      <invoice-order-message/>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTableList } from '@/api/queryStatistics/orderOpenMessage'
import invoiceOrderMessage from '@/components/queryStatistics/invoiceOrderMessage'
export default {
  name: 'InvoiceOrderMessage',
  components: {
    invoiceOrderMessage
  },
  data() {
    return {
      value: '',
      options: [{
        value: '01',
        label: '费用单据'
      }, {
        value: '02',
        label: '结算单据'
      }, {
        value: '03',
        label: '开票号'
      }],
      list: [
        {
          djsh: '管理员',
          xfmc: 1,
          gfmc: '北京市丰台科技园',
          xfsh: '12433323454',
          gfsh: '23543212343',
          je: '北京银行中关村支行',
          se: '123444321234567876',
          jshj: 0,
          ddzt: 0
        }
      ],
      listLoading: false,
      searchs: {
        customerName: '',
        customerTaxNumber: ''
      },
      checkedList: [],
      currentPage: 1,
      pageSize: 25,
      total: 1000,
      dialogVisible: false,
      dialogType: '',
      form: {
        customerName: '',
        customerTaxNumber: '',
        address: '',
        email: '',
        contacts: '',
        contactNumber: '',
        phone: '',
        bank: '',
        bankAccount: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
  },
  created() {
    // this.fetchData()
    this.getTableList()
  },
  methods: {
    change(a) {
      this.dialogVisible = false
    },
    fetchData() { // 获取数据
      this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
    searchFn() {},
    initSearch() { // 重置
      this.searchs = {
        customerName: '',
        customerTaxNumber: ''
      }
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    addCustomer() {
      this.dialogVisible = true
    },
    addRoleFn() {
      this.dialogVisible = false
    },
    delCustomer() { // 删除数据
      this.$confirm('确定要删除选择的数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning',
        // center: true
      }).then(() => {
        console.log(this.checkedList)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    downloadExcel() { // 下载
      // this.dialogVisible = true
    },
    importExcel() {
      this.dialogVisible2 = true
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
    },
    handleClose() { // 关闭弹窗
      this.dialogVisible = false
      this.dialogVisible2 = false
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleEdit(index, row) {
      this.dialogVisible = true
    },
    getTableList() {
      getTableList().then(res => {
        if (res.code === 20000) {
          this.list = res.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
      .search-box {
        .search-item {
          // float: left;
          display: inline-block;
          span {
            font-size: 14px;
          }
        }
      }
      .button-box {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .dashboard-container {
    .search-box {
      .search-item {
        .el-input {
          max-width: 105px;
          // height: 25px;
        }
      }
    }
  }
  .add-customer {
    .el-form:after {
      content: '';
      display: block;
      clear: both;
    }
    .el-form-item {
      float: left;
      .el-input {
        max-width: 150px;
        // height: 25px;
      }
      &.address .el-input {
        width: 450px;
        max-width: 450px;
      }
      &.button {
        width: 610px;
        .el-form-item__content {
          margin-left: 0!important;
          text-align: center;
          .el-button+.el-button {
            margin-left: 50px;
          }
        }
      }
    }
  }
</style>
