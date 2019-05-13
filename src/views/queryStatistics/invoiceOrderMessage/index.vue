/**
* @author Wujy
* @date 2019/3/21
* @Description:发票订单信息查询
*/
<template>
  <div class="invoiceOrder-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="销方名称">
          <el-input v-model="searchParams.xsfMc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="购方名称">
          <el-input v-model="searchParams.gmfMc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input v-model="searchParams.fpDm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input v-model="searchParams.fpHm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="发票类型">
          <el-select v-model="searchParams.fplx" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_FPLX']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button type="primary" size="mini" @click="importExcel">导出</el-button>
    </div>
    <div class="table-container">
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
          align="center"/>
        <el-table-column label="序号" align="center" width="65">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="发票代码" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.fpDm }}
          </template>
        </el-table-column>
        <el-table-column label="发票号码" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.fpHm }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发票类型" align="center" width="100">
          <template slot-scope="scope">
            {{ SYS_FPLX[scope.row.fplx] }}
          </template>
        </el-table-column>
        <el-table-column label="销方名称" align="center" width="160">
          <template slot-scope="scope">
            {{ scope.row.xsfMc }}
          </template>
        </el-table-column>
        <el-table-column label="销方税号" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.xsfNsrsbh }}
          </template>
        </el-table-column>
        <el-table-column label="购方名称" align="center" width="160">
          <template slot-scope="scope">
            {{ scope.row.gmfMc }}
          </template>
        </el-table-column>
        <el-table-column label="购方税号" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.gmfNsrsbh }}
          </template>
        </el-table-column>
        <el-table-column label="金额（不含税）" align="center">
          <template slot-scope="scope">
            {{ scope.row.hjje }}
          </template>
        </el-table-column>
        <el-table-column label="税额" align="center">
          <template slot-scope="scope">
            {{ scope.row.hjse }}
          </template>
        </el-table-column>
        <el-table-column label="价税合计" align="center">
          <template slot-scope="scope">
            {{ scope.row.jshj }}
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            {{ scope.row.bz }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100px">
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
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next, jumper, total, sizes, slot"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
        <!-- <span></span> -->
      </el-pagination>
    </div>
    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="订单信息"
      width="750px"
      custom-class="add-customer">
      <invoice-order-message v-if="dialogVisible" :id="currentId"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOrderList, orderInfo } from '@/api/queryStatistics/orderOpenMessage'
import invoiceOrderMessage from '@/components/queryStatistics/invoiceOrderMessage'
import { arrayToMapField } from '@/utils/public'
export default {
  name: 'InvoiceOrderMessage',
  components: {
    invoiceOrderMessage
  },
  data() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      value: '',
      searchParams: {
        currentPage: 1,
        pageSize: 10,
        gmfMc: '',
        fpDm: '',
        fpHm: '',
        fplx: '',
        xsfMc: ''
      },
      list: [],
      poptotal: '',
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
      poplist: {},
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
      },
      currentId: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'dictList',
      'org'
    ]),
    SYS_FPLX() {
      return arrayToMapField(this.dictList['SYS_FPLX'], 'code', 'name')
    }
  },
  mounted() {
  },
  created() {
    // this.getTableList()
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
    initTable() {
      this.searchParams.xsfNsrsbh = this.org.taxNum
      getOrderList(this.searchParams).then(res => {
        this.list = res.data.data.list
        this.total = res.data.count
      }).catch(err => {
        this.$message.error(err)
      })
    },
    reset() { // 重置
      this.searchParams = {
        currentPage: 1,
        pageSize: 10,
        gmfMc: '',
        fpDm: '',
        fpHm: '',
        fplx: '',
        xsfMc: ''
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
      this.currentId = row.id
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .invoiceOrder {
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
      .button-container {
        /*margin-top: 10px;*/
        margin-bottom: 10px;
      }
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .invoiceOrder-container {
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
