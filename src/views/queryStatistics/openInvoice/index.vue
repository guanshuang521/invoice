/**
 * @author Wujy
 * @date 2019/3/21
 * @Description:已开发票查询
*/
<template>
  <div class="invoiceList-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="listQuery.gmfMc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="listQuery.xmmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input v-model="listQuery.fpDm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input v-model="listQuery.fpHm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="发票类型">
          <el-select v-model="listQuery.fplx" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_FPLX']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="发票状态">
          <el-select v-model="listQuery.fpzt" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_FPZT']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="打印状态">
          <el-select v-model="listQuery.dyzt" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_DYBZ']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="税率">
          <el-select v-model="listQuery.sl" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_SL']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="开票日期起">
          <el-date-picker
            v-model="listQuery.kprq_start"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="开票日期止">
          <el-date-picker
            v-model="listQuery.kprq_end"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="纳税主体">
          <el-select v-model="listQuery.xsfNsrsbh" placeholder="请选择" size="small">
            <el-option v-for="item in orgList" :key="item.id" :label="item.orgName" :value="item.taxNum"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initList">查询</el-button>
          <el-button type="primary" size="small" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="exportExcel">导出</el-button>
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
        <el-table-column label="发票代码" prop="fpDm" align="center"/>
        <el-table-column label="发票号码" prop="fpHm" align="center"/>
        <el-table-column label="发票类型" prop="fplx" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_FPLX[scope.row.fplx] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购方名称" prop="gmfMc" align="center" width="220"/>
        <el-table-column label="购方税号" prop="gmfNsrsbh" align="center" width="160"/>
        <el-table-column label="金额（不含税）" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.hjje | toMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="税额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.hjse | toMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价税合计" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.jshj | toMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开票时间" align="center" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.kprq }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开票机号" prop="kpjh" align="center" width="160"/>
        <el-table-column label="清单标志" prop="qdbz" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_QDBZ[scope.row.qdbz] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发票状态" prop="fpzt" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_FPZT[scope.row.fpzt] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="打印状态" prop="dybz" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_DYBZ[scope.row.dybz] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="checkFP(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page = "listQuery.currentPage"
        :page-sizes = "[10, 20, 30, 50, 100]"
        :page-size = "listQuery.pageSize"
        :total = "totalCount"
        style="margin-top: 20px"
        layout = "total, sizes, prev, pager, next, jumper"
        @size-change = "handleSizeChange"
        @current-change = "handleCurrentChange"/>
    </div>
    <!--发票查看弹窗-->
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="fpckDialogVisible" title="发票查看" width="1280px">
      <fppmShow :formdata="fppmShowData" :readonly="true"/>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" size="mini" @click="fpckDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { opeinvoiceList, fpSeeDetail } from '@/api/invoice/oSpecial'
import { selectUserOrgList } from '@/api/system/user'
import { arrayToMapField } from '@/utils/public'
import { mapGetters } from 'vuex'
import apiPath from '@/api/apiUrl'
import { getToken } from '@/utils/auth'
import fppmShow from '@/components/fppiaomianShow'

export default {
  name: 'OSpecial',
  components: {
    fppmShow
  },
  data() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      // 列表总条数
      totalCount: 0,
      // 列表查询条件
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        xmmc: '',
        gmfMc: '',
        fpDm: '',
        fpHm: '',
        fplx: '',
        fpzt: '',
        dybz: '',
        sl: '',
        kprq_start: '',
        kprq_end: '',
        zfrq_start: '',
        zfrq_end: '',
        xsfNsrsbh: ''
      },
      listLoading: false,
      dataList: [],
      fppmShowData: [],
      // 发票查看窗口是否显示
      fpckDialogVisible: false,
      // 用户有权限的机构列表
      orgList: []
    }
  },
  computed: {
    ...mapGetters([
      'dictList',
      'org'
    ]),
    SYS_FPZT() {
      return arrayToMapField(this.dictList['SYS_FPZT'], 'code', 'name')
    },
    SYS_FPLX() {
      return arrayToMapField(this.dictList['SYS_FPLX'], 'code', 'name')
    },
    SYS_QDBZ() {
      return arrayToMapField(this.dictList['SYS_QDBZ'], 'code', 'name')
    },
    SYS_DYBZ() {
      return arrayToMapField(this.dictList['SYS_DYBZ'], 'code', 'name')
    }
  },
  mounted() {
    this.$store.getters.isAutoLoadData ? this.initList() : ''
    selectUserOrgList({}).then(res => {
      this.orgList = res.data
    }).catch(err => {
      this.$message.error(err)
    })
  },
  methods: {
    // 查询
    initList() {
      opeinvoiceList(this.listQuery).then(res => {
        this.dataList = res.data.list
        this.totalCount = res.data.count
      }).catch(err => {
        this.$message.error(err)
      })
    },
    exportExcel() {
      this.$confirm('确定要导出数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const paramArr = ['x-access-token=' + getToken()]
        Object.keys(this.listQuery).forEach(item => {
          paramArr.push(item + '=' + this.listQuery[item])
        })
        const url = apiPath.invoice.openInvoice.exportIssuedInvoice + '?' + paramArr.join('&')
        console.log(url)
        window.open(url)
      })
    },
    // 重置
    handleReset() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 10,
        xmmc: '',
        gmfMc: '',
        fpDm: '',
        fpHm: '',
        fplx: '',
        fpzt: '',
        dybz: '',
        sl: '',
        kprq_start: '',
        kprq_end: '',
        zfrq_start: '',
        zfrq_end: ''
      }
      this.initList()
    },
    // 查看发票
    checkFP(val) {
      fpSeeDetail({ fpDm: val.fpDm, fpHm: val.fpHm, fplx: val.fplx }).then(res => {
        console.log(res)
        this.fpckDialogVisible = true
        this.fppmShowData = res.data
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.initList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.initList()
    },
    handleSelectionChange(val) {
      this.checkedItems = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .invoiceList {
    &-container{
      margin: 30px;
      .filter-container{
        margin-bottom: 20px;
      }
      .button-container{
        margin-bottom: 20px;
      }
    }
    /deep/ .el-dialog__body{
      padding: 0!important;
    }
  }
</style>
