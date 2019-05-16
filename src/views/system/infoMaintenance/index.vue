/**
* @author Linzb
* @date 2019/3/31
* @Description: 购方信息维护
*/
<template>
  <div
    v-loading.fullscreen.lock="listLoading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
    class="infoMaintenance-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="searchParams.khmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="购方税号">
          <el-input v-model="searchParams.khsh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button type="primary" size="mini" @click="addCustomer">新增</el-button>
      <el-button type="primary" size="mini" @click="delCustomer">删除</el-button>
      <el-button type="primary" size="mini" @click="exportModle">Excel模板下载</el-button>
      <el-button type="primary" size="mini" @click="importExcel">导入Excel</el-button>
    </div>
    <div class="table-container">
      <el-table
        ref="table"
        :data="list"
        element-loading-text="Loading"
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
        <el-table-column label="购方名称" align="center" prop="khmc"/>
        <el-table-column label="购方税号" align="center" prop="khsh"/>
        <el-table-column label="地址" align="center" prop="khdz"/>
        <el-table-column label="邮箱" align="center" prop="yx"/>
        <el-table-column label="联系人员" align="center" prop="lxry"/>
        <el-table-column label="联系电话" align="center" prop="lxdh"/>
        <el-table-column label="移动电话" align="center" prop="sjhm"/>
        <el-table-column label="开户行" align="center" prop="khh"/>
        <el-table-column label="银行账号" align="center" prop="yhzh"/>
        <el-table-column
          align="left"
          fixed="right"
          label="操作"
          width="80">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editInfomain(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page="searchParams.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="10"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="closeOnClickModal"
      :before-close="() => handleClose('form')"
      :title="dialogTitle"
      width="650px"
      custom-class="add-customer">
      <el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="120px" size="mini">
        <el-form-item label="购方名称：" prop="khmc">
          <el-input v-model="form.khmc" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="购方税号：" prop="khsh">
          <el-input v-model="form.khsh" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="form.lxry" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="form.lxdh" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="移动电话：">
          <el-input v-model="form.sjhm" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="form.yx" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="详细地址：" prop="khdz" style="width: 596px">
          <el-input v-model="form.khdz" placeholder="请输入" class="detailAddress"/>
        </el-form-item>
        <el-form-item label="开户银行：" >
          <el-input v-model="form.khh" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="银行账号：">
          <el-input v-model="form.yhzh" class="address"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button v-if="dialogTitle == '新增购方信息'" type="primary" size="mini" this. @click="addCustomerFn('form')">保存</el-button>
        <el-button v-if="dialogTitle != '新增购方信息' " type="primary" size="mini" @click="editCustomerFn('form')">保存</el-button>
        <el-button size="mini" @click="handleClose('form')">取消</el-button>
      </div>
    </el-dialog>
    <!-- 导入弹窗 -->
    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogVisible2"
      title="客户基础信息导入"
      width="350px"
      custom-class="add-customer">
      <el-upload
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :headers="headers"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :action="uploadPath()"
        accept=".xls,.xlsx"
        class="upload-demo">
        <div slot="tip" class="el-upload__tip">选择上传文件</div>
        <el-button slot="trigger" size="small" type="primary">添加文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getCustomerList, deleteCustomer, insertCustomer, editCustomer } from '@/api/system/infoMaintenance'
import apiPath from '@/api/apiUrl'
import { arrayToMapField } from '@/utils/public'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'InfoMaintenance',
  data() {
    function yxFilter(rule, value, callback) { // 邮箱验证
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      } else {
        var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        if (!(re.test(value))) {
          callback(new Error('邮箱格式有误， 请重新输入'))
        } else {
          callback()
        }
      }
    }
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      // 列表
      list: [],
      // 加载层
      listLoading: false,
      // 列表查询参数
      searchParams: {
        khmc: '',
        khsh: '',
        currentPage: 1,
        pageSize: 10
      },
      // 列表勾选项
      checkedList: [],
      // 列表总条数
      totalCount: 0,
      // 新增弹窗是否显示
      dialogVisible: false,
      // 新增表单
      form: {
        khmc: '',
        khsh: '',
        khdz: '',
        yx: '',
        lxry: '',
        lxdh: '',
        sjhm: '',
        khh: '',
        yhzh: ''
      },
      // 新增表单校验规则
      rules: {
        khmc: [
          { required: true, message: '购方名称不能为空', trigger: 'blur' }
        ],
        khsh: [
          { required: true, message: '购方税号不能为空', trigger: 'blur' },
          { min: 15, max: 20, type: 'string', message: '长度在 15 到 20 之间', trigger: 'blur' }
        ],
        yx: [
          { required: true, validator: yxFilter, trigger: 'blur' }
        ]
      },
      // 导入弹窗是否显示
      dialogVisible2: false,
      fileList: [],
      // 弹窗标题
      dialogTitle: '',
      // 弹窗类型
      dialogType: ''
    }
  },
  computed: {
    ...mapGetters([
      'dictList'
    ]),
    headers() {
      return {
        'x-access-token': getToken()
      }
    },
    invoiceTypeObj() {
      console.log(arrayToMapField(this.dictList['SYS_FPLX'], 'code', 'name'))
      return arrayToMapField(this.dictList['SYS_FPLX'], 'code', 'name')
    }
  },
  mounted() {
    this.$store.getters.isAutoLoadData ? this.initTable() : ''
  },
  methods: {
    initTable() { // 获取数据
      this.listLoading = true
      getCustomerList(this.searchParams).then(res => {
        this.list = res.data.list
        this.totalCount = res.data.count
        this.listLoading = false
      }).catch(err => {
        console.log(err)
        this.listLoading = false
      })
    },
    // table重置
    reset() {
      this.searchParams = {
        khmc: '',
        khsh: '',
        currentPage: 1,
        pageSize: 10
      }
      this.initTable()
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = []
      val.forEach((item) => {
        this.checkedList.push(item.id)
      })
    },
    addCustomer() {
      this.dialogTitle = '新增购方信息'
      this.dialogType = 'addInformation'
      this.dialogVisible = true
      for (const k in this.form) {
        this.form[k] = ''
      }
    },
    getToken() {
      return getToken
    },
    editInfomain(row) {
      this.dialogTitle = '编辑购方信息'
      this.dialogType = 'editInformation'
      this.dialogVisible = true
      this.form = Object.assign({}, row)
    },
    editCustomerFn(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          editCustomer(this.form).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.initTable()
            this.dialogVisible = false
            for (const k in this.form) {
              this.form[k] = ''
            }
          }).catch(e => {
            this.$message.error(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addCustomerFn(form) { // 添加购方信息
      this.$refs[form].validate((valid) => {
        if (valid) {
          insertCustomer(this.form).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.initTable()
            this.dialogVisible = false
            for (const k in this.form) {
              this.form[k] = ''
            }
          }).catch(e => {
            this.$message.error(e)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    delCustomer() { // 删除数据
      if (this.checkedList.length === 0) {
        this.$message.warning('请至少选择一条数据！')
        return false
      }
      this.$confirm('确定要删除选择的数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const args = {
          ids: this.checkedList.join(',')
        }
        this.loading = true
        deleteCustomer(args).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.initTable()
          this.loading = false
        })
      })
    },
    exportModle() { // 导出模板
      const downurl = apiPath.system.customer.exportModle + '?x-access-token=' + getToken()
      window.open(downurl)
    },
    importExcel() {
      this.dialogVisible2 = true
      this.fileList = []
    },
    handleSizeChange(val) { // 改变单页数据
      this.searchParams.pageSize = val
      this.initTable()
    },
    handleCurrentChange(val) { // 改变页码
      this.searchParams.currentPage = val
      this.initTable()
    },
    handleClose(formName) { // 关闭弹窗
      this.dialogVisible = false
      this.$refs[formName].resetFields()
    },
    submitUpload() {
      this.loading = true
      this.$refs.upload.submit()
    },
    uploadPath() {
      return apiPath.system.customer.importExcel
    },
    uploadSuccess(res, file, fileList) { // 上传成功后的回调
      this.loading = false
      this.$message({
        message: res.message,
        type: res.code === '0000' ? 'success' : 'error'
      })
      this.$refs.upload.clearFiles()
      this.dialogVisible2 = false
      this.initTable()
    },
    uploadError(res, file, fileList) { // 上传错误
      this.loading = false
      this.$message({
        message: '网络错误，请稍后再试',
        type: 'error'
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.infoMaintenance {
    &-container {
      margin: 30px;
      .search-item {
        display: inline-block;
        span {
          font-size: 14px;
        }
      }
      .detailAddress{
       /deep/ .el-input__inner{
          width: 474px;
          max-width: 474px;
        }
      }
      .button-container {
        margin-bottom: 10px;
      }
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
