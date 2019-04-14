/**
 * @author Wujy
 * @date 2019/3/21
 * @Description:已开专票管理
*/
<template>
  <div class="oSpecial-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="listQuery.gmfMc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="listQuery.ddh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="发票代码">
          <el-input v-model="listQuery.fpDm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input v-model="listQuery.fpHm" placeholder="请输入" size="small"/>
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
        <el-form-item label="作废日期起">
          <el-date-picker
            v-model="listQuery.zfrq_start"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="作废日期止">
          <el-date-picker
            v-model="listQuery.zfrq_end"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="发票状态">
          <el-select v-model="listQuery.fpzt" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_FPZT']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="打印状态">
          <el-select v-model="listQuery.dybz" placeholder="请选择" size="small">
            <el-option label="是" value="1"/>
            <el-option label="否" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="税率">
          <el-select v-model="listQuery.sl" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_SL']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search" @click="initList">查询</el-button>
          <el-button size="small" style="margin-left: 10px" type="primary" icon="el-icon-edit" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="printFp">打印发票</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="batchIssue">打印清单</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="cancel">作废</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="fpzhDialogVisible = true">发票找回</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="billIssue">导出</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="billSendBack">数据回传</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="exportList">发票验证</el-button>
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
        <el-table-column label="购方名称" prop="gmfMc" align="center"/>
        <el-table-column label="购方税号" prop="gmfNsrsbh" align="center"/>
        <el-table-column label="金额（不含税）" prop="hjje" align="center"/>
        <el-table-column label="税额" prop="hjse" align="center"/>
        <el-table-column label="价税合计" prop="jshj" align="center"/>
        <el-table-column label="开票时间" prop="kprq" align="center"/>
        <el-table-column label="开票机号" prop="kpjh" align="center"/>
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
          width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">查看</el-button>
            <el-button type="primary" size="mini">作废重开</el-button>
            <el-button type="primary" size="mini">红冲发票</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQuery.currentPage"
        :page-sizes="[10, 50, 100]"
        :page-size="listQuery.pageSize"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!--发票找回弹窗-->
    <el-dialog :visible.sync="fpzhDialogVisible" title="发票找回" width="380px">
      <el-form ref="fpzhForm" :model="fpzhForm" :rules="fpzhFormRules" size="mini" label-width="100px">
        <el-form-item label="发票类型：" prop="fplx">
          <el-select v-model="fpzhForm.fplx" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_FPLX']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="发票代码：" prop="fpDm" size="small">
          <el-input v-model="fpzhForm.fpDm" placeholder="请输入" style="width: 182px"/>
        </el-form-item>
        <el-form-item label="发票号码：" prop="fpHm" size="small">
          <el-input v-model="fpzhForm.fpHm" placeholder="请输入" style="width: 182px"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" size="mini" @click="submitRetrieve('templateForm')">确 定</el-button>
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--打印发票弹窗-->
    <el-dialog :visible.sync="dyfpDialogVisible" title="打印发票信息列表" width="380px">
      <el-table
        :data="checkedItems"
        border
        fit
        highlight-current-row>
        <el-table-column label="序号" prop="gmfMc" align="center"/>
        <el-table-column label="发票类型" prop="gmfMc" align="center"/>
        <el-table-column label="发票代码" prop="gmfNsrsbh" align="center"/>
        <el-table-column label="发票号码" prop="hjje" align="center"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getList, retrieve } from '@/api/invoice/oSpecial'
import { arrayToMapField } from '@/utils/public'
import { mapGetters } from 'vuex'

export default {
  name: 'OSpecial',
  data() {
    return {
      // 列表总条数
      totalCount: 0,
      // 列表查询条件
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        gmfMc: '',
        fpDm: '',
        fpHm: '',
        kprq_start: '',
        kprq_end: '',
        zfrq_start: '',
        zfrq_end: '',
        fplx: '004',
        xsfNsrsbh: '500102020160826'
      },
      listLoading: false,
      dataList: [],
      // 勾选的列表项
      checkedItems: [],
      // 发票找回弹窗是否显示
      fpzhDialogVisible: false,
      // 打印发票窗口是否显示
      dyfpDialogVisible: false,
      // 发票找回表单
      fpzhForm: {
        fpDm: '',
        fpHm: '',
        fplx: ''
      },
      // 发票找回表单校验规则
      fpzhFormRules: {
        fplx: [
          { required: true, message: '发票类型不能为空', trigger: 'change' }
        ],
        fpHm: [
          { required: true, message: '发票号码不能为空', trigger: 'blur' }
        ],
        fpDm: [
          { required: true, message: '发票代码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'dictList'
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
    this.initList()
  },
  methods: {
    initList() {
      getList(this.listQuery).then(res => {
        this.dataList = res.data.list
        this.totalCount = res.data.count
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 发票找回
    submitRetrieve() {
      this.$refs['fpzhForm'].validate((valid) => {
        if (valid) {
          const args = Object.assign({}, this.fpzhForm)
          retrieve(args).then(res => {
            this.$message.success(res.message)
            this.fpzhDialogVisible = false
            this.initList()
          })
        }
      })
    },
    // 发票作废
    cancel() {
      if (this.checkedItems.length === 0) {
        this.$message({
          message: '请至少选择一条数据！',
          type: 'error'
        })
        return
      }
    },
    printFp() {
      if (this.checkedItems.length === 0) {
        this.$message({
          message: '请至少选择一条数据！',
          type: 'error'
        })
        return
      }
      this.dyfpDialogVisible = true
    },
    // 发票开具
    billIssue() {
      if (this.checkedItems.length === 0) {
        this.$message({
          message: '请至少选择一条数据！',
          type: 'error'
        })
        return
      }
    },
    // 批量开具
    batchIssue() {
      if (this.checkedItems.length === 0) {
        this.$message({
          message: '请至少选择一条数据！',
          type: 'error'
        })
        return
      }
      this.$confirm('是否确认批量开具选择预制发票?', '批量开具', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchIssue().then(res => {
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
    // 预制发票退回
    billSendBack() {
      if (this.checkedItems.length === 0) {
        this.$message({
          message: '请至少选择一条数据！',
          type: 'error'
        })
        return
      }
      this.$confirm('是否确认回退选择的预制发票？?', '预制发票回退', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        billSendBack().then(res => {
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
    },
    // 重置
    handleReset() {
      this.listQuery = {
        title: '',
        importance: '',
        type: '',
        sort: '',
        currentPage: 1,
        pageSize: 10
      }
      this.initList()
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
  .oSpecial {
    &-container{
      margin: 30px;
      .filter-container{
        margin-bottom: 20px;
      }
      .button-container{
        margin-bottom: 20px;
      }
    }
  }
</style>
