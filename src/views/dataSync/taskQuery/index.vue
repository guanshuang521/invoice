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
        <el-form-item label="同步日期起">
          <el-date-picker
            v-model="searchParams.syncStart"
            type="date"
            size="small"
            value-format="yyyy-MM-dd "
            class="filter-item"
            placeholder="同步日期起"/>
        </el-form-item>
        <el-form-item label="同步日期止">
          <el-date-picker
            v-model="searchParams.syncEnd"
            type="date"
            value-format="yyyy-MM-dd"
            size="small"
            class="filter-item"
            placeholder="同步日期止"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button size="small" type="primary" @click="exportExcel">导出</el-button>
    </div>
    <div class="table-container">
      <el-table
        ref="table"
        :data="list"
        :key="list.id"
        element-loading-text="listloading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="34px"/>
        <el-table-column label="序号" align="center" width="50px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="数据类型" align="center" prop="dataType">
          <template slot-scope="scope">
            {{ SYS_SJLX[scope.row.dataType] }}
          </template>
        </el-table-column>
        <el-table-column label="数据源系统" align="center" prop="dataSource"/>
        <el-table-column label="同步时间" align="center" prop="syncTime"/>
        <el-table-column label="同步状态" align="center" prop="jobStatus">
          <template slot-scope="scope">
            {{ SYS_TBZT[scope.row.syncStatus] }}
          </template>
        </el-table-column>
        <el-table-column label="入库记录数" align="center" prop="recordNum"/>
        <el-table-column label="同步状态描述" align="center" prop="syncDescription"/>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page="searchParams.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="10"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <el-dialog
      :close-on-click-modal="closeOnClickModal"
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
import invoiceOrderMessage from '@/components/queryStatistics/invoiceOrderMessage'
import { getList, exportExcel } from '@/api/dataSync/taskQuery'
import { arrayToMapField } from '@/utils/public'
import Template from "../../system/template/index";

export default {
  name: 'TaskQuery',
  components: {
    Template,
    invoiceOrderMessage
  },
  data() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
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
      listloading: false,
      searchs: {
        customerName: '',
        customerTaxNumber: ''
      },
      checkedList: [],
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'dictList'
    ]),
    SYS_SJLX() { // 数据类型
      return arrayToMapField(this.dictList['SYS_SJLX'], 'code', 'name')
    },
    SYS_TBZT() { // 同步状态
      return arrayToMapField(this.dictList['SYS_TBZT'], 'code', 'name')
    }
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
      this.listloading = true
      getList(this.searchParams).then(response => {
        this.listloading = false
        this.list = response.data.list
        this.total = response.data.count
      }).catch(e => {
        this.listloading = false
      })
    },
    initTable() {
      this.getList()
    },
    reset() { // 重置
      this.searchParams = {
        dataType: '',
        syncStatus: '',
        syncStart: '',
        syncEnd: '',
        currentPage: 1,
        pageSize: 10
      }
      this.initTable()
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
    exportExcel() { // 下载
      // openPostWindow(apiPath.dataSync.taskQuery.exportExcel, this.searchParams)
      exportExcel(this.searchParams)
    },
    handleSizeChange(val) { // 改变单页数据
      this.searchParams.pageSize = val
      this.initTable()
    },
    handleCurrentChange(val) { // 改变页码
      this.searchParams.currentPage = val
      this.initTable()
    },
    handleClose() { // 关闭弹窗
      this.dialogVisible = false
      this.dialogVisible2 = false
    },
    handleEdit(index, row) {
      this.dialogVisible = true
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
