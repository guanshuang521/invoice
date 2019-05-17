<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-25 17:37:23
 -->
<template>
  <div class="dashboard-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="开票码">
          <el-input v-model="searchParams.djbh" placeholder="请输入开票码" size="small"/>
        </el-form-item>
        <!--<el-form-item label="纳税主体">-->
        <!--<el-select v-model="searchParams.xfsh" placeholder="请选择" size="small" disabled>-->
        <!--<el-option v-for="item in orgList" :key="item.id" :label="item.orgName" :value="item.taxNum"/>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button type="primary" icon="el-icon-edit" size="small" @click="orderDownload">订单下载</el-button>
      <el-button type="primary" icon="el-icon-circle-check" size="small" @click="showInvoiceDialog">勾选生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-upload" size="small" @click="exportPos">导出</el-button>
      <el-button type="primary" icon="el-icon-delete" size="small" @click="delList">删除</el-button>
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
          label="开票码"
          align="center"/>
        <el-table-column
          prop="mdh"
          label="门店号"
          align="center"/>
        <el-table-column
          prop="jshj"
          label="价税合计"
          align="center"/>
        <el-table-column
          prop="zkje"
          label="折扣金额"
          align="center"/>
        <el-table-column
          label="订单状态"
          align="center">
          <template slot-scope="scope">
            {{ SYS_DDZT[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column
          label="开票状态"
          align="center">
          <template slot-scope="scope">
            {{ SYS_KPZT[scope.row.kpzt] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="rksj"
          label="下载时间"
          align="center"/>
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
    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible"
      :before-close="hideDialog"
      title="勾选生成预制发票"
      width="620px"
      custom-class="add-customer">
      <el-form ref="dynamicValidateForm" :rules="rules" :model="dynamicValidateForm" label-width="110px" size="mini">
        <el-form-item label="选择订单数">
          <el-input v-model="num" disabled="disabled"/>
        </el-form-item>
        <el-form-item label="合计金额（不含税)">
          <el-input v-model="hjje" disabled="disabled"/>
        </el-form-item>
        <el-form-item label="合计税额">
          <el-input v-model="hjse" disabled="disabled"/>
        </el-form-item>
        <el-form-item label="价税合计">
          <el-input v-model="jshj" disabled="disabled"/>
        </el-form-item>
        <el-form-item label="预制发票类型" prop="fplx">
          <el-select v-model="dynamicValidateForm.fplx" placeholder="请选择预制发票类型" style="width: 100%">
            <el-option v-for="option in dictList['SYS_FPLX']" :key="option.id" :value="option.code" :label="option.name"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dynamicValidateForm.fplx=='004'" label="备用发票类型" prop="byfplx">
          <el-select v-model="dynamicValidateForm.byfplx" placeholder="请选择备用发票类型" style="width: 100%">
            <el-option value ="普票">普票</el-option>
            <!--            007-->
            <el-option value ="电票">电票</el-option>
            <!--            026-->
          </el-select>
        </el-form-item>
        <el-form-item label="购方名称" prop="gmfMc">
          <el-select
            v-model="dynamicValidateForm.gmfMc"
            :remote-method="remoteSearch"
            filterable
            remote
            clearable
            reserve-keyword
            allow-create
            size="mini"
            placeholder="请输入关键词"
            class="gfMc"
            style="width: 100%"
            @change="remoteChange">
            <el-option
              v-for="item in gfmcData"
              :key="item.value"
              :label="item.khmc"
              :value="item.khmc"/>
          </el-select>
        </el-form-item>
        <el-form-item label="购方税号" prop="gmfNsrsbh">
          <el-input v-model="dynamicValidateForm.gmfNsrsbh" @input="toUpperCase()"/>
        </el-form-item>
        <el-form-item label="购方地址电话">
          <el-input v-model="dynamicValidateForm.gmfDzdh" />
        </el-form-item>
        <el-form-item label="开户行及账号" >
          <el-input v-model="dynamicValidateForm.gmfYhzh" />
        </el-form-item>
        <el-form-item :rules="dynamicValidateForm.fplx=='026'?rules.gmfDzyx:[{ required: false, message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]" label="邮箱" prop="gmfDzyx">
          <el-input v-model="dynamicValidateForm.gmfDzyx"/>
        </el-form-item>
        <el-form-item label="手机号" prop="gmfSjh">
          <el-input v-model="dynamicValidateForm.gmfSjh"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button size="mini" type="primary" @click="submitForm('dynamicValidateForm')">确 定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getPoslist, delPosList, downPosOrder, buildInvoicePre, dobuildInvoicePre } from '@/api/order'
import { getAllCustomer } from '@/api/system/infoMaintenance'
import apiPath from '@/api/apiUrl'
import { arrayToMapField } from '@/utils/public'
import { getToken } from '@/utils/auth'
import { selectUserOrgList } from '@/api/system/user'

export default {
  name: 'Dashboard',
  data() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      // 列表查询参数
      searchParams: {
        pageSize: 10,
        currentPage: 1,
        djbh: '',
        xfsh: ''
      },
      // 列表数据
      tableList: [],
      gfmcData: [],
      // 列表总条数
      totalCount: 0,
      idtotal: '',
      searchConditions: {
        buyyerName: '',
        supplierCode: '',
        billCode: '',
        countOrderNum: '',
        orderStart: '',
        orderEnd: '',
        dateStart: '',
        dateEnd: '',
        orderState: ''
      },
      queryConditionsForm: [], // 接受的config的查询条件配置的参数
      columns: [], // 接受的config的配置的参数
      operation: {}, // 接受的config的操作配置的参数
      dialogVisible: false,
      // 已勾选的列表项
      checkedList: [],
      dynamicValidateForm: {
        gmfMc: '',
        gmfNsrsbh: '',
        fplx: '',
        byfplx: '',
        gmfYhzh: '',
        gmfDzdh: '',
        gmfDzyx: '',
        gmfSjh: '',
        ids: ''
      },
      rules: {
        fplx: [
          { required: true, message: '请选择预制发票类型', trigger: 'blur' }
        ],
        byfplx: [
          { required: true, message: '请选择备用发票类型', trigger: 'blur' }
        ],
        gmfMc: [
          { required: true, message: '请选择购方名称', trigger: 'blur' }
        ],
        gmfNsrsbh: [
          { required: true, message: '请输入购方税号', trigger: 'blur' }
        ],
        gmfDzyx: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        gmfSjh: [
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      },
      // 勾选弹窗
      num: '',
      hjje: '',
      hjse: '',
      jshj: '',
      ddzt: '',
      orgList: []
    }
  },
  computed: {
    ...mapGetters(['name', 'roles', 'org', 'dictList']),
    SYS_DDZT() { // 税率
      return arrayToMapField(this.dictList['SYS_DDZT'], 'code', 'name')
    },
    SYS_KPZT() { // 开票状态
      return arrayToMapField(this.dictList['SYS_KPZT'], 'code', 'name')
    }
  },
  mounted() {
    this.searchParams.xfsh = this.org.taxNum
    // selectUserOrgList({}).then(res => {
    //   res.data.forEach((item) => {
    //     if (item.id === this.org.id) {
    //       this.orgList.push(item)
    //       this.searchParams.xfsh = item.taxNum
    //     }
    //   })
    // }).catch(err => {
    //   this.$message.error(err)
    // })
  },
  methods: {
    // 初始化数据
    initTable() {
      this.listLoading = true
      getPoslist(this.searchParams).then(res => {
        this.loading = false
        this.totalCount = res.data.count
        this.tableList = res.data.list
      }).catch(err => {
        this.$message.error(err)
        this.listLoading = false
      })
    },
    // 查询重置
    reset() {
      this.searchParams = {
        pageSize: 10,
        currentPage: 1,
        djbh: '',
        xfsh: ''
      }
      this.initTable()
    },
    exportPos() {
      const params = ['x-access-token=' + getToken()]
      for (const key in this.searchParams) {
        params.push(key + '=' + this.searchParams[key])
      }
      const url = apiPath.order.pos.exportPosOrder + '?' + params.join('&')
      window.open(url)
    },
    delList() { // 删除数据
      if (this.checkedList.length === 0) {
        this.$message.warning('请先选择表格中的数据')
        return false
      }
      this.$confirm('确定要删除选择的数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const params = {
          ids: this.checkedList.join(',')
        }
        this.loading = true
        delPosList(params).then(response => {
          this.$message.success('删除成功')
          this.initTable()
          this.loading = false
        }).catch(err => {
          this.loading = false
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      })
    },
    // 订单下载
    orderDownload() {
      this.$prompt('开票码', '下载POS订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9]+$/,
        inputErrorMessage: '请输入正确的开票码'
      }).then(({ value }) => {
        // value是输入框的值
        const params = {
          djbh: value
        }
        downPosOrder(params).then(response => {
          this.$message.success(response.message)
          this.initTable()
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    handleEdit(ind, rows) { // 编辑
      this.dialogVisible = true
      this.dialogType = 'edit'
      console.log(rows)
      this.form = rows
    },
    // 表格选中数据发生变化
    handleSelectionChange(val) {
      this.checkedList = []
      for (let i = 0; i < val.length; i++) {
        this.checkedList.push(val[i].id)
      }
    },
    // 删除操作
    handleDelete(a, b) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.initTable()
      })
    },
    // 生成预制发票
    makeInvoicePre(formName) {
      console.log(formName)
    },
    // 购方名称关键字检索
    remoteSearch(query) {
      const args = {
        khmc: query
      }
      getAllCustomer(args).then(res => {
        this.gfmcData = res.data.list
      }).catch(err => {
        this.$message.error(err)
      })
    },
    remoteChange(val) {
      this.gfmcData.forEach(item => {
        if (item.khmc === val) {
          this.dynamicValidateForm.gmfNsrsbh = item.khsh.toUpperCase()
          this.dynamicValidateForm.gmfDzdh = (item.khdz === null ? '' : item.khdz) + ' ' + (item.lxdh === null ? '' : item.lxdh)
          this.dynamicValidateForm.gmfYhzh = item.yhzh
        }
      })
    },
    // 勾选生成预制发票
    showInvoiceDialog() {
      // this.dialogVisible = true
      if (this.checkedList.length === 0) {
        this.$message.warning('请先选择表格中的数据')
        return false
      }
      this.$confirm('确定要生成预制发票吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // 勾选生成预制发票
        // 购方名称
        const args = {
          khmc: ''
        }
        getAllCustomer(args).then(res => {
          this.gfmcData = res.data.list
        }).catch(err => {
          this.$message.error(err)
        })
        const params = {
          ids: this.checkedList.join(',')
        }
        this.loading = true
        buildInvoicePre(params).then(response => {
          this.loading = false
          this.dialogVisible = true
          this.$nextTick(() => {
            this.$refs['dynamicValidateForm'].resetFields()
          })
          this.num = response.data.num
          this.hjje = response.data.hjje
          this.hjse = response.data.hjse
          this.jshj = response.data.jshj
          this.idtotal = response.data.ids
          console.log(this.idtotal)
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      })
    },
    hideDialog() {
      this.dialogVisible = false
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dynamicValidateForm.byfplx === '普票') {
            this.dynamicValidateForm.byfplx = '007'
          } else if (this.dynamicValidateForm.byfplx === '电票') {
            this.dynamicValidateForm.byfplx = '026'
          }
          this.$emit('makeInvoicePre', this.dynamicValidateForm)
          const args = Object.assign({}, this.dynamicValidateForm)
          args.ids = this.idtotal
          this.loading = true
          console.log(args)
          dobuildInvoicePre(args).then(response => {
            this.loading = false
            this.$message({
              type: 'success',
              message: '勾选生成预制发票成功'
            })
            this.dialogVisible = false
          }).catch(err => {
            this.loading = false
            this.$message.error(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toUpperCase() {
      this.dynamicValidateForm.gmfNsrsbh = this.dynamicValidateForm.gmfNsrsbh.toUpperCase()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
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
  .invoice {
    &_dialog {
      margin: 0px;
    }
  }
</style>
