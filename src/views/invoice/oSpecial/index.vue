/**
 * @author Wujy
 * @date 2019/3/21
 * @Description:已开专票管理
*/
<template>
  <div
    v-loading.fullscreen.lock="listLoading"
    class="oSpecial-container"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
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
        <el-form-item label="开票日期起">
          <el-date-picker
            v-model="listQuery.kprq_start"
            value-format="yyyy-MM-dd"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="开票日期止">
          <el-date-picker
            v-model="listQuery.kprq_end"
            value-format="yyyy-MM-dd"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="作废日期起">
          <el-date-picker
            v-model="listQuery.zfrq_start"
            value-format="yyyy-MM-dd"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="作废日期止">
          <el-date-picker
            v-model="listQuery.zfrq_end"
            value-format="yyyy-MM-dd"
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
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="openPrintFp">打印发票</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="printList">打印清单</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="cancel">作废</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="fpzhDialogVisible = true">发票找回</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="exportExcel">导出</el-button>
      <!--<el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="billSendBack">数据回传</el-button>-->
      <!--<el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="validate">发票验证</el-button>-->
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
        <el-table-column label="发票代码" prop="fpDm" align="center" width="100"/>
        <el-table-column label="发票号码" prop="fpHm" align="center" width="100"/>
        <el-table-column label="发票类型" prop="fplx" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_FPLX[scope.row.fplx] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购方名称" prop="gmfMc" align="center" width="220"/>
        <el-table-column label="购方税号" prop="gmfNsrsbh" align="center" width="160"/>
        <el-table-column label="金额（不含税）" prop="hjje" align="center" width="100"/>
        <el-table-column label="税额" prop="hjse" align="center"/>
        <el-table-column label="价税合计" prop="jshj" align="center"/>
        <el-table-column label="开票时间" align="center" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.kprq }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开票机号" prop="kpjh" align="center"/>
        <el-table-column label="清单标志" prop="qdbz" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_QDBZ[scope.row.qdbz] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发票状态" prop="fpzt" align="center" width="160">
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
            <el-button type="primary" size="mini" @click="checkFP(scope.row)">查看</el-button>
            <el-button v-if="parseInt(scope.row.fpzt) == 1" type="primary" size="mini" @click="reInvoice(scope.row)">作废重开</el-button>
            <el-button v-if="parseInt(scope.row.fpzt) == 4" type="primary" size="mini" @click="reInvoice(scope.row)">重开</el-button>
            <el-button v-if="parseInt(scope.row.fpzt) == 1 && parseInt(scope.row.kplx) == 0" type="primary" size="mini" @click="hcInvoice(scope.row)">红冲发票</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQuery.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="listQuery.pageSize"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!--发票找回弹窗-->
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="fpzhDialogVisible" title="发票找回" width="380px">
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
        <el-button size="mini" @click="fpzhDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--打印发票弹窗-->
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="dyfpDialogVisible" title="打印发票信息列表" width="680px">
      <el-table
        :data="checkedItems"
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
        <el-table-column label="发票代码" prop="fpDm" align="center"/>
        <el-table-column label="发票号码" prop="fpHm" align="center"/>
      </el-table>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button size="mini" type="primary" @click="printFp()">打印</el-button>
      </div>
    </el-dialog>
    <!--发票作废弹窗-->
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="fpzfDialogVisible" :before-close="handleCloseFpzf" title="发票作废列表" width="880px">
      <el-table
        :data="fpzfShowList"
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
        <el-table-column label="发票代码" prop="fpDm" align="center"/>
        <el-table-column label="发票号码" prop="fpHm" align="center"/>
        <el-table-column label="作废状态" prop="zfStatus" align="center" width="300"/>
      </el-table>
    </el-dialog>
    <!--发票查看弹窗-->
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="fpckDialogVisible" title="发票查看" width="1280px">
      <fppmShow v-if="fpckDialogVisible && !isFarmBill" :formdata="fppmShowData" :readonly="true"/>
      <fppmShowFarm v-if="isFarmBill" :formdata="fppmShowData" :is-all-readonly="true"/>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" size="mini" @click="fpckDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!--作废重开弹窗-->
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="zfckDialogVisible" title="作废重开" width="1280px">
      <fppmShow v-if="zfckDialogVisible && !isFarmBill" :readonly="true" :formdata="fppmZfckData"/>
      <fppmShowFarm v-if="isFarmBill" :formdata="fppmZfckData" :readonly="false"/>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" size="mini" @click="reInvoiceSubmit">开具</el-button>
      </div>
    </el-dialog>
    <!--红冲发票弹窗-->
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="hckpDialogVisible" title="红冲开票" width="1280px">
      <el-form ref="hcfpForm" :model="hcfpForm" :rules="hcfpFormRules" size="mini" label-width="130px">
        <el-form-item label="红字信息表编号：" prop="hzxxbbh" size="small" style="margin-bottom: 0">
          <el-input v-model="hcfpForm.hzxxbbh" placeholder="请输入" style="width: 182px"/>
        </el-form-item>
      </el-form>
      <fppmShow v-if="hckpDialogVisible && !isFarmBill" :formdata="fppmHckpData" :readonly="false"/>
      <fppmShowFarm v-if="isFarmBill" :formdata="fppmHckpData" :readonly="true"/>
      <div slot="footer" class="dialog-footer" align="center" style="padding-top: 0">
        <el-button type="primary" size="mini" @click="hcInvoiceSubmit">开具</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, retrieve, cancel, exportAll, exportInvoiceSelected, validate, passBackInvoice, fpDetail, reInvoice, printFP } from '@/api/invoice/oSpecial'
import { invoice } from '@/api/invoiceOpening/opening'
import { arrayToMapField } from '@/utils/public'
import { mapGetters } from 'vuex'
import fppmShow from '@/components/fppiaomianShow'
import fppmShowFarm from '@/components/fppiaomianFarmShow'

export default {
  name: 'OSpecial',
  components: {
    fppmShow,
    fppmShowFarm
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
        kprq_start: '',
        kprq_end: '',
        zfrq_start: '',
        zfrq_end: '',
        fplx: '',
        xsfNsrsbh: ''
      },
      listLoading: false,
      dataList: [],
      // 勾选的列表项
      checkedItems: [],
      // 发票找回弹窗是否显示
      fpzhDialogVisible: false,
      // 打印发票窗口是否显示
      dyfpDialogVisible: false,
      // 发票作废窗口是否显示
      fpzfDialogVisible: false,
      // 发票查看窗口是否显示
      fpckDialogVisible: false,
      // 作废重开窗口是否显示
      zfckDialogVisible: false,
      // 红冲窗口是否显示
      hckpDialogVisible: false,
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
      },
      // 发票作废展示列表
      fpzfShowList: [],
      // 发票票面展示数据
      fppmShowData: {},
      // 作废重开原始数据
      fppmZfckDataBefore: {},
      // 作废重开数据
      fppmZfckData: {},
      // 红冲发票数据
      fppmHckpData: {},
      // 红字信息表表单
      hcfpForm: {
        hzxxbbh: ''
      },
      hcfpFormRules: {
        hzxxbbh: [
          { required: true, message: '红字信息表编号不能为空', trigger: 'blur' }
        ]
      },
      // 当前发票是否是农产品发票
      isFarmBill: false
    }
  },
  computed: {
    ...mapGetters([
      'dictList',
      'org',
      'info'
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
    // console.log(this.listQuery)
  },
  methods: {
    initList() {
      this.listQuery.xsfNsrsbh = this.org.taxNum
      this.listQuery.fplx = '004'
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
          this.listLoading = true
          retrieve(args).then(res => {
            this.listLoading = false
            this.$message.success(res.message)
            this.fpzhDialogVisible = false
            this.initList()
          }).catch(err => {
            this.listLoading = false
            this.$message.error(err)
          })
        }
      })
    },
    // 查看发票
    checkFP(val) {
      if (val.tzpz === '02') {
        this.isFarmBill = true
      }
      fpDetail({ fpDm: val.fpDm, fpHm: val.fpHm }).then(res => {
        console.log(res)
        this.fpckDialogVisible = true
        this.fppmShowData = res.data
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 作废重开
    reInvoice(val) {
      if (val.tzpz === '02') {
        this.isFarmBill = true
      }
      fpDetail({ fpDm: val.fpDm, fpHm: val.fpHm }).then(res => {
        this.zfckDialogVisible = true
        this.fppmZfckDataBefore = JSON.parse(JSON.stringify(res.data))
        this.fppmZfckData = JSON.parse(JSON.stringify(res.data))
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 作废重开提交
    reInvoiceSubmit() {
      const args = Object.assign({}, this.fppmZfckData)
      args.zfInvoice = Object.assign({}, this.fppmZfckDataBefore, {
        zflx: 1,
        zfr: this.info.userName,
        zfyy: '',
        check: true
      })
      this.listLoading = true
      reInvoice(args).then(res => {
        this.zfckDialogVisible = false
        this.listLoading = false
        this.$message.success(res.message)
        this.initList()
      }).catch(err => {
        this.listLoading = false
        this.$message.error(err)
      })
    },
    // 红冲开票
    hcInvoice(val) {
      if (val.tzpz === '02') {
        this.isFarmBill = true
      }
      fpDetail({ fpDm: val.fpDm, fpHm: val.fpHm }).then(res => {
        this.hckpDialogVisible = true
        res.data.lines.forEach(item => {
          item.hjje = -item.hjje
          item.hjse = -item.hjse
          item.jshj = -item.jshj
          item.se = -item.se
          item.hsxmje = -item.hsxmje
          item.xmje = -item.xmje
          // item.xmsl = -item.xmsl === '0' ? '' : -item.xmsl
        })
        this.fppmHckpData = res.data
        this.fppmHckpData.check = true
        this.fppmHckpData.hjje = -this.fppmHckpData.hjje
        this.fppmHckpData.hjse = -this.fppmHckpData.hjse
        this.fppmHckpData.jshj = -this.fppmHckpData.jshj
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 红冲开票提交
    hcInvoiceSubmit() {
      this.$refs['hcfpForm'].validate((valid) => {
        if (valid) {
          const args = Object.assign({}, this.fppmHckpData)
          this.listLoading = true
          args.kplx = 1
          args.yFpdm = args.fpDm
          args.yFphm = args.fpHm
          args.xxbbh = this.hcfpForm.hzxxbbh
          invoice(args).then(res => {
            this.hckpDialogVisible = false
            this.listLoading = false
            this.$message.success(res.message)
            this.initList()
          }).catch(err => {
            this.listLoading = false
            this.$message.error(err)
          })
        }
      })
    },
    // 发票作废
    cancel() {
      let checked = true
      if (this.checkedItems.length === 0) {
        this.$message.warning('请至少选择一条数据！')
        return
      }
      const currentMonth = (new Date().getMonth()).toString().length === 1 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
      this.checkedItems.forEach(item => {
        if (item.fpzt !== '1' && item.fpzt !== '2') {
          this.$message.error('存在不可作废状态发票，请确认！')
          checked = false
        }
        if (item.kprq.substr(5, 2) !== currentMonth) {
          this.$message.error('存在非本月开具发票，不能作废，请确认！')
          checked = false
        }
      })
      if (checked) {
        this.fpzfDialogVisible = true
        this.fpzfShowList = Object.assign([], this.checkedItems)
        this.fpzfShowList.forEach((item, key) => {
          this.$set(this.fpzfShowList[key], 'zfStatus', '正在处理中...')
          cancel(item).then(res => {
            this.$set(this.fpzfShowList[key], 'zfStatus', res.data.returnMessage)
          }).catch(err => {
            this.listLoading = false
            this.$set(this.fpzfShowList[key], 'zfStatus', err)
          })
        })
      }
    },
    // 打印发票弹窗
    openPrintFp() {
      if (this.checkedItems.length !== 1) {
        this.$message.warning('请选择一条数据！')
        return
      }
      function sortBy(field) {
        return function(a, b) {
          return a[field] - b[field]
        }
      }
      // 验证规则：发票代码一样，发票号码需连续
      this.checkedItems.sort(sortBy('fpHm'))
      let valid = true
      const defaultFpDm = this.checkedItems[0].fpDm
      this.checkedItems.reduce((pre, curr) => {
        if (pre && parseFloat(pre.fpHm) !== parseFloat(curr.fpHm) - 1) {
          this.$message.error('发票号码需连续！')
          valid = false
        }
      })
      this.checkedItems.forEach(item => {
        if (item.fpDm !== defaultFpDm) {
          this.$message.error('发票代码需一致！')
          valid = false
        }
      })
      if (valid) {
        this.dyfpDialogVisible = true
      }
    },
    // 打印
    printFp() {
      this.checkedItems.forEach(item => {
        const xml = `<?xml version="1.0" encoding="gbk"?>
    <business id="20004"comment="发票打印">
        <body yylxdm="1">
        <kpzdbs>${this.info.terminalMark}</kpzdbs>
        <fplxdm>${item.fplx}</fplxdm>
        <fpdm>${item.fpDm}</fpdm>
        <fphm>${item.fpHm}</fphm>
        <dylx>0</dylx>
        <dyfs>1</dyfs>
        </body>
      </business>`
        console.log(xml)
        const Base64 = require('js-base64').Base64
        const args = '<content>' + Base64.encode(xml) + '</content>'
        printFP(args).then()
      })
    },
    // 打印清单
    printList() {
      if (this.checkedItems.length !== 1) {
        this.$message.warning('请选择一条数据！')
        return
      }
      const xml = `<?xml version="1.0" encoding="gbk"?>
        <business id="20004"comment="发票打印">
        <body yylxdm="1">
        <kpzdbs>${this.info.terminalMark}</kpzdbs>
        <fplxdm>${this.checkedItems[0].fplx}</fplxdm>
        <fpdm>${this.checkedItems[0].fpDm}</fpdm>
        <fphm>${this.checkedItems[0].fpHm}</fphm>
        <dylx>1</dylx>
        <dyfs>1</dyfs>
        </body>
      </business>`
      console.log(xml)
      const Base64 = require('js-base64').Base64
      const args = '<content>' + Base64.encode(xml) + '</content>'
      printFP(args).then()
    },
    // 发票验证
    validate() {
      if (this.checkedItems.length === 0) {
        this.$message.warning('请至少选择一条数据！')
        return
      }
      this.checkedItems.forEach(item => {
        validate({ fpqqlshStr: item.fpqqlsh }).then(res => {
          this.$message.success(res.message)
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    // 导出
    exportExcel() {
      if (this.checkedItems.length !== 0) {
        const fpqqlshStr = []
        this.checkedItems.forEach((item) => {
          fpqqlshStr.push(item.fpqqlsh)
        })
        exportInvoiceSelected(fpqqlshStr)
      } else {
        this.$confirm('确定导出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listQuery.xsfNsrsbh = this.org.taxNum
          exportAll(this.listQuery)
        })
      }
    },
    // 数据回传
    billSendBack() {
      this.$confirm('确定数据回传?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        passBackInvoice(this.listQuery).then(res => {
          this.loading = false
          this.$message.success(res.message)
          this.initTable()
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
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
        kprq_start: '',
        kprq_end: '',
        zfrq_start: '',
        zfrq_end: '',
        fplx: '004',
        xsfNsrsbh: this.org.taxNum
      }
      this.initList()
    },
    // 关闭作废窗口重新加载数据
    handleCloseFpzf() {
      this.initList()
      this.fpzfDialogVisible = false
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
    /deep/ .el-dialog__body{
      padding: 0!important;
    }
  }
</style>
