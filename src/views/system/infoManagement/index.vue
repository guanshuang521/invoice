/**
* @author Wujy
* @date 2019/3/27
* @Description: 商品信息管理
*/
<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="infoManagement-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="searchParams.spmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="商品编码">
          <el-input v-model="searchParams.spbm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchFn">查询</el-button>
          <el-button type="primary" size="small" @click="initSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button type="primary" size="mini" @click="addClick">新增</el-button>
      <el-button type="primary" size="mini" @click="settingClick">设置税收分类编码</el-button>
      <el-button type="primary" size="mini" @click="exportData">导出数据</el-button>
      <el-button type="primary" size="mini" @click="exportModle">Excel模板下载</el-button>
      <el-button type="primary" size="mini" @click="importExcel">导入Excel</el-button>
    </div>
    <div class="table-container">
      <el-table
        v-loading="loading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="35"/>
        <el-table-column label="序号" align="center" width="50px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="商品编码" align="center">
          <template slot-scope="scope">
            {{ scope.row.spbm }}
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.spmc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品税目" align="center">
          <template slot-scope="scope">
            {{ scope.row.spsm }}
          </template>
        </el-table-column>
        <el-table-column label="简码" align="center">
          <template slot-scope="scope">
            {{ scope.row.jm }}
          </template>
        </el-table-column>
        <el-table-column label="规格型号" align="center">
          <template slot-scope="scope">
            {{ scope.row.ggxh }}
          </template>
        </el-table-column>
        <el-table-column label="单价" align="center">
          <template slot-scope="scope">
            {{ scope.row.dj }}
          </template>
        </el-table-column>
        <el-table-column label="计量单位" align="center">
          <template slot-scope="scope">
            {{ scope.row.jldw }}
          </template>
        </el-table-column>
        <el-table-column label="含税标志" align="center">
          <template slot-scope="scope">
            {{ SYS_HSBZ[scope.row.hsbz] }}
          </template>
        </el-table-column>
        <el-table-column label="税收分类编码" align="center">
          <template slot-scope="scope">
            {{ scope.row.shflbm }}
          </template>
        </el-table-column>
        <el-table-column label="税收分类名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.shflmc }}
          </template>
        </el-table-column>
        <el-table-column label="税率" align="center">
          <template slot-scope="scope">
            {{ SYS_SL[scope.row.sl] }}
          </template>
        </el-table-column>
        <el-table-column label="零税率标识" align="center">
          <template slot-scope="scope">
            {{ scope.row.lslbs }}
          </template>
        </el-table-column>
        <el-table-column label="免税类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.mslx }}
          </template>
        </el-table-column>
        <el-table-column label="是否享受优惠政策" align="center">
          <template slot-scope="scope">
            {{ scope.row.sfxsyhzc }}
          </template>
        </el-table-column>
        <el-table-column label="优惠政策类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.yhzclx }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="searchParams.currentPage"
        :page-sizes="[10, 50, 100]"
        :page-size="searchParams.pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
        <!-- <span></span> -->
      </el-pagination>
    </div>
    <!--新增弹框-->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :title="dialogType === 'adds' && '新增' || dialogType === 'edit' && '编辑' || ''"
      width="740px"
      custom-class="add-customer">
      <el-form ref="form" :inline="isInline" :rules="rules" :model="form" label-width="140px" size="mini">
        <el-form-item label="商品编码" prop="spbm" size="small">
          <el-input v-model="form.spbm" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="商品名称" prop="spmc" size="small">
          <el-input v-model="form.spmc" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="税收分类名称" prop="shflmc" size="small">
          <el-select v-model="form.shflmc" filterable placeholder="请选择" size="small" @change="changeShflmc">
            <el-option v-for="item in commodityTypes" :key="item.id" :label="item.shflmc" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="税收分类编码" prop="shflbm" size="small">
          <el-input v-model="form.shflbm" placeholder="请输入" readonly/>
        </el-form-item>
        <el-form-item label="规格型号" prop="ggxh" size="small">
          <el-input v-model="form.ggxh" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="计量单位" prop="meteringcom" size="small">
          <el-input v-model="form.jldw" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="含税标志" prop="hsbz" size="small">
          <el-select v-model="form.hsbz" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_HSBZ']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="单价(元)" prop="dj" size="small">
          <el-input v-model="form.dj" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="零含税标识" prop="lslbs" size="small">
          <el-select v-model="form.lslbs" placeholder="请选择">
            <el-option v-for="item in dictList['SYS_LSLBS']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="税率(%)" prop="sl" size="small">
          <el-select v-model="form.sl" placeholder="税率" size="small">
            <el-option v-for="item in dictList['SYS_SL']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否享受优惠政策" prop="sfxsyhzc" size="small">
          <el-select v-model="form.sfxsyhzc" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_SFXSYHZC']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="免税类型" prop="mslx" size="small">
          <el-select v-model="form.mslx" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_MSLX']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠政策类型" prop="yhzclx" size="small">
          <el-select v-model="form.yhzclx" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_YHZCLX']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" size="mini" @click="addAdata('form')">确认</el-button>
        <el-button size="mini" @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!--设置税收分类编码-->
    <el-dialog
      :visible.sync="dialogVisible1"
      :before-close="handleClose"
      title="新增商品税收编码转换"
      width="700px"
      custom-class="add-customer">
      <el-form ref="form1" :rules="rules" :model="form1" :inline="true" label-width="120px">
        <el-form-item label="税收分类名称">
          <el-select v-model="form1.shflmc" filterable placeholder="请选择" size="small">
            <el-option v-for="item in commodityTypes" :key="item.id" :label="item.jm" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="税收分类编码" prop="spmcName" size="small">
          <el-input v-model="form1.shflbm"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" size="mini" @click="handleUpdata('form1')">保存</el-button>
        <el-button size="mini" @click="dialogVisible1 = false">取消</el-button>
      </div>
    </el-dialog>
    <!--导入Excel-->
    <el-dialog
      :visible.sync="dialogVisible2"
      :before-close="handleClose"
      title="商品税收编码转换文件导入(大小不能超过100k)"
      width="350px"
      custom-class="add-customer">
      <el-upload
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
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
import { commodictList, AddData, editData, getAllCommodityTypes } from '@/api/system/infoManagement'
import apiPath from '@/api/apiUrl'
import { arrayToMapField } from '@/utils/public'
import { mapGetters } from 'vuex'
export default{
  name: 'InfoManagement',
  data() {
    return {
      isInline: true,
      loading: false, // loading
      list: [],
      searchParams: {
        // 商品名称
        spmc: '',
        // 商品编码
        spbm: '',
        currentPage: 1,
        pageSize: 10
      },
      total: 0,
      checkedList: [],
      dialogType: '',
      fileList: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      form: {
        spbm: '',
        spmc: '',
        spsm: '',
        jm: '',
        ggxh: '',
        dj: '',
        jldw: '',
        hsbz: '',
        shflbm: '',
        shflmc: '',
        sl: '',
        lslbs: '',
        mslx: '',
        sfxsyhzc: '',
        yhzclx: '',
        id: 0
      },
      form1: {
        shflmc: '',
        shflbm: ''
      },
      rules: {
        spbm: [
          { required: true, message: '商品编码不能为空', trigger: 'blur' }
        ],
        spmc: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        shflmc: [
          { required: true, message: '税收分类名称不能为空', trigger: 'blur' }
        ],
        hsbz: [
          { required: true, message: '含税标志名称不能为空', trigger: 'blur' }
        ],
        jm: [
          { required: true, message: '简码不能为空', trigger: 'blur' }
        ],
        lslbs: [
          { required: true, message: '零含税标识不能为空', trigger: 'blur' }
        ],
        sl: [
          { required: true, message: '税率不能为空', trigger: 'blur' }
        ],
        sfxsyhzc: [
          { required: true, message: '是否享受优惠政策不能为空', trigger: 'blur' }
        ],
        mslx: [
          { required: true, message: '免税类型不能为空', trigger: 'blur' }
        ],
        yhzclx: [
          { required: true, message: '优惠政策类型不能为空', trigger: 'blur' }
        ],
        jldw: [
          { required: true, message: '计量单位不能为空', trigger: 'blur' }
        ],
        shflbm: [
          { required: true, message: '税收分类编码不能为空', trigger: 'blur' }
        ]
      },
      // 所有税收分类编码
      commodityTypes: []
    }
  },
  computed: {
    ...mapGetters([
      'dictList'
    ]),
    SYS_SPSM() { // 商品税目
      return arrayToMapField(this.dictList['SYS_SPSM'], 'code', 'name')
    },
    SYS_HSBZ() { // 含税标志
      return arrayToMapField(this.dictList['SYS_HSBZ'], 'code', 'name')
    },
    SYS_LSLBS() { // 零税率标识
      return arrayToMapField(this.dictList['SYS_LSLBS'], 'code', 'name')
    },
    SYS_MSLX() { // 免税类型
      return arrayToMapField(this.dictList['SYS_MSLX'], 'code', 'name')
    },
    SYS_YHZCLX() { // 优惠政策类型
      return arrayToMapField(this.dictList['SYS_YHZCLX'], 'code', 'name')
    },
    SYS_SL() { // 税率
      return arrayToMapField(this.dictList['SYS_SL'], 'code', 'name')
    },
    SYS_SFXSYHZC() { // 是否享受优惠政策
      return arrayToMapField(this.dictList['SYS_SFXSYHZC'], 'code', 'name')
    }
  },
  mounted() {
    this.$store.getters.isAutoLoadData ? this.getList() : ''
    // 获取所有的税收分类名称
    getAllCommodityTypes({}).then(res => {
      this.commodityTypes = res.data.list
    }).catch(err => {
      this.$message.error(err)
    })
  },
  methods: {
    // 税收分类名称切换
    changeShflmc() {
      console.log(this.form.shflmc)
      this.commodityTypes.forEach(item => {
        if (item.id === this.form.shflmc) {
          this.form.shflbm = item.shflbm
          this.form.sl = item.sl
          this.form.sfxsyhzc = item.sfxsyhzc
        }
      })
    },
    searchFn() {
      this.getList()
    },
    initSearch() {
      this.searchParams = {
        spmc: '',
        spbm: '',
        currentPage: 1,
        pageSize: 10
      }
      this.getList()
    },
    getList() { // 获取数据列表
      this.loading = true
      commodictList(this.searchParams).then(res => {
        this.loading = false
        this.list = res.data.list
        this.total = res.data.count
      })
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    handleEdit(ind, rows) { // 编辑
      this.dialogVisible = true
      this.dialogType = 'edit'
      this.form = rows
    },
    handleSizeChange(val) { // 改变单页条数
      this.searchParams.currentPage = 1
      this.searchParams.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) { // 改变页码
      this.searchParams.currentPage = val
      this.getList()
    },
    exportData() { // 导出数据
      const url = apiPath.system.InfoManagement.exportData + '?spbm=' + this.searchParams.spbm + '&spmc=' + this.searchParams.spmc
      window.open(url)
    },
    exportModle() { // 导出模板
      window.open(apiPath.system.InfoManagement.exportModle)
    },
    addClick() { // 添加
      this.dialogVisible = true
      this.dialogType = 'adds'
      this.form = {}
    },
    addAdata(formName) { // 点击添加确定后
      if (this.dialogType === 'adds') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = JSON.parse(JSON.stringify(this.form))
            this.loading = true
            AddData(params).then(res => {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.loading = false
              this.getList()
              this.dialogVisible = false
              this.dialogType = ''
            }).catch(e => {
              this.$message({
                message: e,
                type: 'error'
              })
              this.loading = false
            })
          }
        })
      }
      if (this.dialogType === 'edit') { // 点击编辑成功后
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = JSON.parse(JSON.stringify(this.form))
            this.loading = true
            editData(params).then(res => {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.loading = false
              this.getList()
              this.dialogVisible = false
              this.dialogType = ''
              this.form = {}
            }).catch(e => {
              this.$message({
                message: e,
                type: 'error'
              })
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    },
    settingClick() { // 设置税收分类编码
      if (this.checkedList.length !== 1) {
        this.$message({
          message: '请选择一条数据操作',
          type: 'error'
        })
        return false
      }
      this.dialogVisible1 = true
    },
    handleUpdata(formName) { // 设置税收分类编码提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = {}
          params.shflbm = JSON.parse(JSON.stringify(this.form1)).shflbm
          params.shflmc = JSON.parse(JSON.stringify(this.form1)).shflmc
          params.id = this.checkedList[0].id
          this.loading = true
          editData(params).then(res => {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.loading = false
            this.getList()
            this.dialogVisible1 = false
            this.dialogType = ''
            this.form = {}
          }).catch(e => {
            this.$message({
              message: e,
              type: 'error'
            })
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    importExcel() { // 导入Excel表格
      this.dialogVisible2 = true
    },
    handleClose() { // 关闭弹窗
      this.dialogVisible = false
      this.dialogVisible1 = false
      this.dialogVisible2 = false
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
    },
    uploadError(res, file, fileList) { // 上传错误
      this.loading = false
      this.$message({
        message: '网络错误，请稍后再试',
        type: 'error'
      })
    },
    uploadPath() { // 上传地址
      return apiPath.system.InfoManagement.importExcel
    },
    handleRemove(file, fileList) { // 文件列表移除文件时的钩子
      console.log(file, fileList)
    },
    handlePreview(file) { // 点击文件列表中已上传的文件时的钩子
      console.log(file)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .infoManagement {
    &-container {
      margin: 30px;
      /deep/ .el-input__inner{
        width: 180px;
      }
      .button-container {
        margin-bottom: 20px;
      }
      .authTree {
        border: 1px solid #eeeeee;
        width: 454px;
        max-height: 200px;
        overflow-y: scroll;
      }
    }
  }
</style>
