/**
 * @author Wujy
 * @date 2019/3/21
 * @Description:订单开票信息查询
*/
<template>
  <div class="orderOpen-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="纳税主体">
          <el-select v-model="searchParams.xfsh" placeholder="请选择" size="small">
            <el-option v-for="item in orgList" :key="item.id" :label="item.orgName" :value="item.taxNum"/>
          </el-select>
        </el-form-item>
        <el-form-item label="购方名称">
          <el-input v-model="searchParams.gfmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="单据起号">
          <el-input v-model="searchParams.startDjbh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="单据止号">
          <el-input v-model="searchParams.endDjbh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="单据类型">
          <el-select v-model="searchParams.djlx" placeholder="请选择" size="small">
            <el-option label="商品类订单" value="SLC"/>
            <el-option label="服务类订单" value="CEI费用"/>
            <el-option label="开票号" value="POS"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
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
          align="center"
          width="34px"/>
        <el-table-column align="center" width="31px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="单据编号" align="center">
          <template slot-scope="scope">
            {{ scope.row.djbh }}
          </template>
        </el-table-column>
        <el-table-column label="销方名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.xfmc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="销方税号" align="center">
          <template slot-scope="scope">
            {{ scope.row.xfsh }}
          </template>
        </el-table-column>
        <el-table-column label="购方名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.gfmc }}
          </template>
        </el-table-column>
        <el-table-column label="购方税号" align="center">
          <template slot-scope="scope">
            {{ scope.row.gfsh }}
          </template>
        </el-table-column>
        <el-table-column label="金额（不含税）" align="center">
          <template slot-scope="scope">
            {{ scope.row.bhsje }}
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
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            {{ SYS_DDZT[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page = "searchParams.currentPage"
        :page-sizes = "[1, 10, 20, 30, 50, 100]"
        :page-size = "searchParams.pageSize"
        :total = "total"
        style="margin-top: 20px"
        layout = "total, sizes, prev, pager, next, jumper"
        @size-change = "handleSizeChange"
        @current-change = "handleCurrentChange"/>
    </div>
    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="查看"
      width="750px"
      custom-class="add-customer">
      <order-open-message :tableList="tableList" :tableTotal="tableTotal" @TableCurrentChange="TableCurrentChange" @TablePagesizeChange="TablePagesizeChange"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { arrayToMapField } from '@/utils/public'
import { selectUserOrgList } from '@/api/system/user'
import { getTableList, getOrderList } from '@/api/queryStatistics/orderOpenMessage'
import orderOpenMessage from '@/components/queryStatistics/orderOpenMessage'
import apiPath from '@/api/apiUrl'

export default {
  name: 'OrderOpenMessage',
  components: {
    orderOpenMessage
  },
  data() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      dialogVisible2: false,
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
      tableTotal: 0,
      searchParams: {
        djlx: 'SLC',
        gfmc: '',
        xfsh: '',
        startDjbh: '',
        endDjbh: '',
        currentPage: 1,
        pageSize: 10
      },
      searchParamsTable: {
        orderId: '',
        currentPage: 1,
        pageSize: 10
      },
      listQuery: [
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
      list: [
      ],
      listLoading: false,
      searchs: {
        customerName: '',
        customerTaxNumber: ''
      },
      checkedList: [],
      currentPage: 1,
      pageSize: 25,
      total: 0,
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
      },
      fileList: [],
      // 用户有权限的机构列表
      orgList: [],
      // 弹框表格
      tableList: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'org',
      'dictList'
    ]),
    SYS_DDZT() {
      return arrayToMapField(this.dictList['SYS_DDZT'], 'code', 'name')
    }
  },
  mounted() {
    selectUserOrgList().then(res => {
      this.orgList = res.data
    }).catch(err => {
      this.$message.error(err)
    })
    // 纳税主体默认值
    this.searchParams.xfsh = this.org.taxNum
    this.$store.getters.isAutoLoadData ? this.getTableList() : ''
  },
  created() {
    // this.fetchData()

  },
  methods: {
    change(a) {
      this.dialogVisible = false
    },
    initTable() {
      this.getTableList()
    },
    getTableList() {
      getTableList(this.searchParams).then(res => {
        this.list = res.data.data.list
        this.total = res.data.data.total
      }).catch(err => {
        this.$message.error(err)
      })
    },
    submitUpload() { // 开始上传按钮
      this.loading = true
      this.$refs.upload.submit()
    },
    uploadSuccess(res, file, fileList) { // 上传成功后的回调
      this.loading = false
      this.$message({
        message: res.message,
        type: res.code === '0000' ? 'success' : 'error'
      })
      res.code === '0000' ? this.dialogVisible2 = false : this.$refs.upload.clearFiles()
      this.getList()
    },
    uploadError(res, file, fileList) { // 上传错误
      this.loading = false
      this.$message({
        message: '网络错误，请稍后再试',
        type: 'error'
      })
      this.dialogVisible2 = false
      this.getList()
    },
    uploadPath() { // 上传地址
      return apiPath.system.codeManagement.importExcel
    },
    reset() { // 重置
      const djlx = this.searchParams.djlx
      this.searchParams = {
        djlx: djlx,
        gfmc: '',
        xfsh: '',
        startDjbh: '',
        endDjbh: '',
        currentPage: 1,
        pageSize: 10
      }
      this.getTableList()
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
      }).then((res) => {
        console.log(this.checkedList)
        this.$message.success(res.message)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    downloadExcel() { // 下载
      // this.dialogVisible = true
    },
    importExcel() {
      this.dialogVisible2 = true
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val
      this.initTable()
    },
    handleCurrentChange(val) {
      this.searchParams.currentPage = val
      this.initTable()
    },
    handleClose() { // 关闭弹窗
      this.dialogVisible = false
      this.dialogVisible2 = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    TablePagesizeChange(val) {
      this.searchParamsTable.pageSize = val
      this.getOrderList()
    },
    TableCurrentChange(val) {
      this.searchParamsTable.currentPage = val
      this.getOrderList()
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      this.searchParamsTable.orderId = row.id
      this.getOrderList()
    },
    getOrderList() {
      getOrderList(this.searchParamsTable).then(e => {
        this.tableList = e.data.data.list
        this.tableTotal = e.data.data.total
        console.log(this.tableList)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .orderOpen {
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
