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
          <el-input v-model="searchParams.spgsqc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="二级供应商编码">
          <el-input v-model="searchParams.ejgysbm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="费用单据编号">
          <el-input v-model="searchParams.fydjbh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchParams.status" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_ERP_STATUS']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="单据起号">
          <el-input v-model="searchParams.startDjbh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="单据止号">
          <el-input v-model="searchParams.endDjbh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="传输日期起">
          <el-date-picker
            v-model="searchParams.startDate"
            type="date"
            size="small"
            class="filter-item"
            value-format="yyyy-MM-dd"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="传输日期止">
          <el-date-picker
            v-model="searchParams.endDate"
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
      <el-button type="primary" icon="el-icon-upload" size="small" @click="exportData">导出</el-button>
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
          align="center"/>
        <el-table-column
          prop="sjlx"
          label="数据类型"
          align="center"/>
        <el-table-column
          prop="djlx"
          label="单据类型"
          align="center"/>
        <el-table-column
          prop="fydjbh"
          label="费用单据编号"
          align="center"/>
        <el-table-column
          prop="ejgysbm"
          label="二级供应商编码"
          align="center"/>
        <el-table-column
          prop="hjje"
          label="金额（不含税）"
          align="center"/>
        <el-table-column
          prop="hjse"
          label="税额"
          align="center"/>
        <el-table-column
          prop="jshj"
          label="价税合计"
          align="center"/>
        <el-table-column
          prop="xfnssbh"
          label="销方税号"
          align="center"/>
        <el-table-column
          prop="spgsqc"
          label="购方名称"
          align="center"/>
        <el-table-column
          prop="gfsh"
          label="购方税号"
          align="center"/>
        <el-table-column
          prop="gfdzdh"
          label="购方地址电话"
          align="center"/>
        <el-table-column
          prop="gfkhhzh"
          label="购方开户行及账号"
          align="center"/>
        <el-table-column
          prop="csrq"
          label="传输日期"
          align="center"/>
        <el-table-column
          label="订单状态"
          align="center">
          <template slot-scope="scope">
            {{ SYS_ERP_STATUS[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="bz"
          label="备注"
          align="center"/>
      </el-table>
      <el-pagination
        :current-page = "searchParams.currentPage"
        :page-sizes = "[10, 20, 30, 50, 100]"
        :page-size = "searchParams.pageSize"
        :total = "totalCount"
        style="margin-top: 20px"
        layout = "total, sizes, prev, pager, next, jumper"
        @size-change = "handleSizeChange"
        @current-change = "handleCurrentChange"/>
    </div>
    <!--生成预制发票弹窗-->
    <invoice-dialog :ishow="invoiceDialogVisible" :dialog-title="dialogTitle" :build-pop="buildPop" :make-pop-data="makePopData" @hideDialog="closeDialog"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getServiceOrderlist, generatenIvoices, buildInvoice } from '@/api/order'
import invoiceDialog from '../components/invoiceDialog'
import apiPath from '@/api/apiUrl'
import { arrayToMapField } from '@/utils/public'
import { getToken } from '@/utils/auth'
export default {
  name: 'Dashboard',
  components: { invoiceDialog },
  data() {
    return {
      // 列表查询参数
      searchParams: {
        pageSize: 10,
        currentPage: 1,
        spgsqc: '',
        ejgysbm: '',
        fydjbh: '',
        status: '',
        startDjbh: '',
        endDjbh: '',
        startDate: '',
        endDate: ''
      },
      // 列表勾选项
      checkedList: [],
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
      operation: {},
      buildPop: {},
      makePopData: {},
      dialogTitle: ''
    }
  },
  computed: {
    ...mapGetters(['name', 'roles', 'dictList']),
    SYS_ERP_STATUS() { // 状态
      return arrayToMapField(this.dictList['SYS_ERP_STATUS'], 'code', 'name')
    }
  },
  mounted() {},
  methods: {
    // 初始化数据
    initTable() {
      this.listLoading = true
      getServiceOrderlist(this.searchParams).then(res => {
        this.loading = false
        this.tableList = res.data.list
        this.totalCount = res.data.count
      }).catch(err => {
        this.$message.error(err)
        this.listLoading = false
      })
    },
    // 查询重置
    reset() {
      this.searchParams = {
        spgsqc: '',
        ejgysbm: '',
        fydjbh: '',
        status: '',
        startDjbh: '',
        endDjbh: '',
        startDate: '',
        endDate: '',
        currentPage: 1,
        pageSize: 10
      }
      this.initTable()
    },
    // 同一购方订单生成预制发票
    createPreInvoice() {
      if (this.checkedList.length === 0) {
        this.$message.warning('请先选择表格中的一条数据')
        return false
      }
      this.$confirm('确定要同一购方订单生成预制发票吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const params = {
          id: this.checkedList.join(),
          djlx: 'CEI费用'
        }
        this.loading = true
        buildInvoice(params).then(response => {
          this.dialogTitle = '同一购方订单生成预制发票'
          this.invoiceDialogVisible = true
          this.buildPop.num = response.data.num
          this.buildPop.hjje = response.data.hjje
          this.buildPop.hjse = response.data.hjse
          this.buildPop.jshj = response.data.jshj
          this.buildPop.ids = response.data.ids
          this.buildPop = response.data
          this.loading = false
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
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
        this.$message.warning('请先选择表格中的一条数据')
        return false
      }
      this.$confirm('确定要生成预制发票吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const params = {
          ids: this.checkedList.join(','),
          djlx: 'CEI费用'
        }
        this.loading = true
        generatenIvoices(params).then(response => {
          this.loading = false
          this.dialogTitle = '生成预制发票'
          this.invoiceDialogVisible = true
          this.makePopData = response.data
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      })
    },
    exportData() { // 导出数据
      // const args = Object.assign({}, this.searchParams)
      const token = getToken()
      const url = apiPath.order.list.exportErp + '?spgsqc=' + this.searchParams.spgsqc + '&ejgysbm=' + this.searchParams.ejgysbm + '&startDjbh=' + this.searchParams.startDjbh + '&endDjbh=' + this.searchParams.endDjbh + '&startDate=' + this.searchParams.startDate + '&endtDate=' + this.searchParams.endDate + '&status=' + this.searchParams.status + '&fydjbh=' + this.searchParams.fydjbh + '&x-access-token=' + token
      window.open(url)
    },
    // 关闭弹窗
    closeDialog(val) {
      console.log(val)
      this.invoiceDialogVisible = val
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
