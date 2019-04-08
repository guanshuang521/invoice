/**
 * @author Wujy
 * @date 2019/3/21
 * @Description:任务查询
*/
<template>
  <div class="taskQuery-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="数据类型">
          <el-select v-model="searchParams.dataType" placeholder="请选择" size="small">
            <el-option label="商品类订单" value="1"/>
            <el-option label="服务类订单" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="同步状态">
          <el-select v-model="searchParams.syncStatus" placeholder="请选择" size="small">
            <el-option label="成功" value="1"/>
            <el-option label="失败" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="开票日期起">
          <el-date-picker
            v-model="searchParams.syncStart"
            type="date"
            size="small"
            value-format="yyyy-MM-dd "
            class="filter-item"
            placeholder="开票日期起"/>
        </el-form-item>
        <el-form-item label="开票日期止">
          <el-date-picker
            v-model="searchParams.syncEnd"
            type="date"
            value-format="yyyy-MM-dd"
            size="small"
            class="filter-item"
            placeholder="开票日期止"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button size="small" type="primary" @click="importExcel">导出</el-button>
    </div>
    <div class="table-container">
      <el-table
        v-loading="loading"
        :data="list"
        border
        element-loading-text="loading"
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
        <el-table-column label="数据类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.dataType }}
          </template>
        </el-table-column>
        <el-table-column label="数据源系统" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.dataSource }}</span>
          </template>
        </el-table-column>
        <el-table-column label="同步时间" align="center">
          <template slot-scope="syncTime">
            {{ scope.row.xfsh }}
          </template>
        </el-table-column>
        <el-table-column label="同步状态" align="center">
          <template slot-scope="syncDescription">
            {{ scope.row.gfmc }}
          </template>
        </el-table-column>
        <el-table-column label="入库记录数" align="center">
          <template slot-scope="scope">
            {{ scope.row.gfsh }}
          </template>
        </el-table-column>
        <el-table-column label="同步状态描述" align="center">
          <template slot-scope="scope">
            {{ scope.row.beanName }}
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
import { getList, exportExcel } from '@/api/dataSync/taskQuery'
export default {
  name: 'TaskQuery',
  components: {
    invoiceOrderMessage
  },
  data() {
    return {
      value: '',
      searchParams: {
        dataType: '',
        syncStatus: '',
        syncStart: '',
        syncEnd: '',
        currentPage: 1,
        pageSize: 10
      },
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
      ],
      loading: false,
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
  },
  methods: {
    change(a) {
      this.dialogVisible = false
    },
    getList() { // 获取数据
      this.loading = true
      getList(this.searchParams).then(response => {
        this.loading = false
        this.list = response.data.items
        this.listLoading = false
      }).catch(e => {
        this.loading = false
      })
    },
    initTable() {
      this.getList()
    },
    reset() { // 重置
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
<style rel="stylesheet/scss" lang="scss">
.taskQuery {
  &-container{
    margin: 30px;
    .filter-item{
      margin: 0 10px 20px 0;
    }
    .authTree{
      border: 1px solid #eeeeee;
      width: 454px;
      max-height: 200px;
      overflow-y: scroll;
    }
    .button-container{
      margin-bottom: 20px;
    }
  }

}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
