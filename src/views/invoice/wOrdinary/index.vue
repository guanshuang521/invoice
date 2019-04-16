/**
* @author Wujy
* @date 2019/3/21
* @Description:待开普票管理
*/
<template>
  <div class="wSpecial-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="listQuery.gmfMc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="listQuery.djbh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="listQuery.xmmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search" @click="initList">查询</el-button>
          <el-button size="small" style="margin-left: 10px" type="primary" icon="el-icon-edit" @click="handleReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="invoice">开具发票</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="batchInvoice">批量开具</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="backInvoicePre">预制发票回退</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="exportList">导出</el-button>
    </div>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="dataList"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        style="width: 100%;">
        <el-table-column type="selection" width="35"/>
        <el-table-column label="购方名称" prop="gmfMc" align="center"/>
        <el-table-column label="购方税号" prop="gmfNsrsbh" align="center"/>
        <el-table-column label="发票类型" prop="fplx" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_FPLX[scope.row.fplx] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合计金额" prop="hjje" align="center"/>
        <el-table-column label="合计税额" prop="hjse" align="center"/>
        <el-table-column label="价税合计" prop="jshj" align="center"/>
        <el-table-column label="发票代码" prop="fpDm" align="center"/>
        <el-table-column label="发票号码" prop="fpHm" align="center"/>
        <el-table-column label="开票日期" prop="kprq" align="center"/>
        <el-table-column label="开票状态" prop="kpzt" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_KPZT[scope.row.kpzt] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开票提示" prop="bz" align="center"/>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="billPreview(scope.row)">发票预览</el-button>
            <el-button type="primary" size="mini" @click="billDetail(scope.row)">发票明细</el-button>
            <el-button type="primary" size="mini" @click="orderDetail(scope.row)">订单明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQuery.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="100"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <Bill-detail :show-dialog="showBillDialog" :table-data="fppmShowData" @close-dialog="closeBillDetail"/>
    <Order-detail :show-dialog="showOrderDialog" :current-fp-id="currentFpId" @close-dialog="closeBillDetail"/>
    <!--发票查看弹窗-->
    <el-dialog :visible.sync="showBillPreview" title="发票查看" width="1280px">
      <fppmShow :formdata="fppmShowData" :is-all-readonly="true"/>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" size="mini" @click="showBillPreview = false">关闭</el-button>
      </div>
    </el-dialog>
    <!--发票批量开具弹窗-->
    <el-dialog :visible.sync="showBranchInvice" :before-close="closeBranchInvoice" title="批量开具发票" width="880px">
      <el-table
        :data="branchInviceData"
        border
        fit
        highlight-current-row>
        <el-table-column prop="index" label="序号" align="center" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="发票类型" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_FPLX[scope.row.fplx] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购方信息" prop="gmfMc" align="center"/>
        <el-table-column label="价税合计" prop="jshj" align="center"/>
        <el-table-column label="开具状态" prop="kpStatus" align="center" width="300">
          <template slot-scope="scope">
            <span v-html="scope.row.kpStatus">
              {{ scope.row.kpStatus }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { initTableList, backInvoicePre, exportData } from '@/api/invoice/inovicePre'
import { invoice, print } from '@/api/invoiceOpening/opening'
import BillDetail from '@/components/invoice/billDetail'
import OrderDetail from '@/components/invoice/orderDetail'
import { arrayToMapField } from '@/utils/public'
import fppmShow from '@/components/fppiaomianShow'
import { mapGetters } from 'vuex'

export default {
  name: 'WOrdinary',
  components: { BillDetail, OrderDetail, fppmShow },
  data() {
    return {
      // 显示发票明细弹窗
      showBillDialog: false,
      // 显示订单明细弹窗
      showOrderDialog: false,
      // 显示发票预览
      showBillPreview: false,
      // 显示批量开票弹窗
      showBranchInvice: false,
      // 查询条件
      listQuery: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      // 加载动画是否显示
      listLoading: false,
      // 列表数据
      dataList: [],
      // 勾选的列表项
      checkedList: [],
      // 发票明细
      fppmShowData: [],
      // 批量开具发票数据
      branchInviceData: [],
      // 当前订单ID
      currentFpId: 0
    }
  },
  computed: {
    ...mapGetters([
      'dictList',
      'org',
      'info'
    ]),
    SYS_FPLX() {
      return arrayToMapField(this.dictList['SYS_FPLX'], 'code', 'name')
    },
    SYS_KPZT() {
      return arrayToMapField(this.dictList['SYS_KPZT'], 'code', 'name')
    }
  },
  methods: {
    // 查询
    initList() {
      this.listLoading = true
      const args = Object.assign({}, this.listQuery, {
        xsfNsrsbh: this.org.taxNum,
        fplx: this.$store.getters.fplx_gen
      })
      initTableList(args).then(res => {
        this.listLoading = false
        this.dataList = res.data.list
        this.totalCount = res.data.count
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
        this.listLoading = false
      })
    },
    // 重置
    handleReset() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 10,
        gmfMc: '',
        djbh: '',
        xmmc: ''
      }
      this.initList()
    },
    // 发票开具
    invoice() {
      if (this.checkedList && this.checkedList.length === 1) {
        this.$confirm('确认要开具发票吗?', '确认开票', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          invoice(this.checkedList[0]).then(res => {
            if (res.code === '0000') {
              // TODO
              initTableList()
            } else {
              this.$message.success(res.messgae)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        })
      } else {
        this.$message({
          type: 'error',
          message: '请选择一条数据！'
        })
      }
    },
    // 批量开具
    batchInvoice() {
      let checked = true
      if (this.checkedList.length === 0) {
        this.$message.info('请至少选择一条数据！')
        return
      }
      this.checkedList.forEach(item => {
        if (item.kpzt === 1) {
          this.$message.error('存在已开具的预制发票，请确认！')
          checked = false
        }
      })
      if (checked) {
        this.showBranchInvice = true
        this.branchInviceData = Object.assign([], this.checkedList)
        this.branchInviceData.forEach((item, key) => {
          this.$set(this.branchInviceData[key], 'kpStatus', '正在处理中...')
          this.listLoading = true
          invoice(item).then(res => {
            if (res.code === '0000') {
              this.$set(this.branchInviceData[key], 'kpStatus', '<span style="color:green">开具成功</span>')
            } else {
              this.$set(this.branchInviceData[key], 'kpStatus', '<span style="color:red">' + res.message + '</span>')
            }
            this.listLoading = false
          }).catch(err => {
            this.listLoading = false
            this.$set(this.branchInviceData[key], 'kpStatus', '<span style="color:red">' + err + '</span>')
          })
        })
      }
    },
    // 预制发票退回
    backInvoicePre() {
      if (this.checkedList.length === 0) {
        this.$message({
          message: '请至少选择一条数据！',
          type: 'error'
        })
        return
      }
      this.$confirm('是否确认回退选择的预制发票?', '预制发票回退', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const idArr = []
        this.checkedList.forEach(function(item) {
          idArr.push(item.id)
        })
        backInvoicePre(idArr.join(',')).then(res => {
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
      exportData(this.listQuery).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    }, // 发票预览
    billPreview(rowData) {
      this.fppmShowData = rowData
      this.showBillPreview = true
    },
    // 发票明细
    billDetail(rowData) {
      this.fppmShowData = rowData.lines
      this.showBillDialog = true
    },
    // 订单明细
    orderDetail(rowData) {
      this.currentFpId = rowData.id
      this.showOrderDialog = true
    },
    // 关闭订单明细
    closeBillDetail(val) {
      this.showBillDialog = val
      this.showOrderDialog = val
    },
    closeBranchInvoice() {
      this.initList()
      this.showBranchInvice = false
    },
    // 订单预览
    getPmData() {
    },
    handleSizeChange() {
    },
    handleCurrentChange() {
    },
    // 表格选中数据发生变化
    handleSelectionChange(val) {
      this.checkedList = []
      this.checkedList = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wSpecial {
    &-container {
      margin: 30px;

      .filter-container {
        margin-bottom: 20px;
      }

      .button-container {
        margin-bottom: 20px;
      }
    }
  }
</style>
