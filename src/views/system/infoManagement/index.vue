<template>
  <div class="dashboard-container">
    <div class="search-box">
      <el-row>
        <el-col :span="9">
          <div class="search-item">
            <span>商品名称: </span>
            <el-input v-model="searchs.commodityName" size="small"/>
          </div>
          <div class="search-item">
            <span>商品编码: </span>
            <el-input v-model="searchs.comcode" size="small"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-button type="primary" size="small" @click="searchFn">查询</el-button>
              <el-button type="primary" size="small" @click="initSearch">重置</el-button>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="button-box">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row>
              <el-button type="primary" size="mini" @click="addClick">新增</el-button>
              <el-button type="primary" size="mini" @click="settingClick">设置税收分类编码</el-button>
              <el-button type="primary" size="mini">导出数据</el-button>
              <el-button type="primary" size="mini">Excel模板下载</el-button>
              <el-button type="primary" size="mini" @click="importExcel">导入Excel</el-button>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="80px"/>
        <el-table-column label="序号" align="center" width="31px">
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
            {{ scope.row.jcode }}
          </template>
        </el-table-column>
        <el-table-column label="规格型号" align="center">
          <template slot-scope="scope">
            {{ scope.row.ggxh }}
          </template>
        </el-table-column>
        <el-table-column label="单价" align="center">
          <template slot-scope="scope">
            {{ scope.row.UnitPrice }}
          </template>
        </el-table-column>
        <el-table-column label="计量单位" align="center">
          <template slot-scope="scope">
            {{ scope.row.meteringcom }}
          </template>
        </el-table-column>
        <el-table-column label="含税标志" align="center">
          <template slot-scope="scope">
            {{ scope.row.hssign }}
          </template>
        </el-table-column>
        <el-table-column label="税收分类编码" align="center">
          <template slot-scope="scope">
            {{ scope.row.ssflbm }}
          </template>
        </el-table-column>
        <el-table-column label="税收分类名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.ssflmc }}
          </template>
        </el-table-column>
        <el-table-column label="税率" align="center">
          <template slot-scope="scope">
            {{ scope.row.sl }}%
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
            {{ scope.row.sfxsyh }}
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
    <!--新增弹框-->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :title="dialogType === 'adds' && '新增' || dialogType === 'edit' && '编辑' || ''"
      width="650px"
      custom-class="add-customer">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品编码" prop="spbm" size="small">
              <el-input v-model="form.spbm"/>
            </el-form-item>
            <el-form-item label="商品名称" prop="spmc" size="small">
              <el-input v-model="form.spmc"/>
            </el-form-item>
            <el-form-item label="商品税目">
              <el-select v-model="form.spsm" placeholder="请选择" size="small">
                <el-option label="企业所得税" value="企业"/>
                <el-option label="个人所得税" value="个人"/>
              </el-select>
            </el-form-item>
            <el-form-item label="简码" prop="jcode" size="small">
              <el-input v-model="form.jcode"/>
            </el-form-item>
            <el-form-item label="含税标志">
              <el-select v-model="form.hssign" placeholder="请选择" size="small">
                <el-option label="企业所得税" value="企业"/>
                <el-option label="个人所得税" value="个人"/>
              </el-select>
            </el-form-item>
            <el-form-item label="零含税标识">
              <el-select v-model="form.lslbs" placeholder="请选择" size="small">
                <el-option label="企业所得税" value="企业"/>
                <el-option label="个人所得税" value="个人"/>
              </el-select>
            </el-form-item>
            <el-form-item label="免税类型">
              <el-select v-model="form.mslx" placeholder="请选择" size="small">
                <el-option label="企业所得税" value="企业"/>
                <el-option label="个人所得税" value="个人"/>
              </el-select>
            </el-form-item>
            <el-form-item label="优惠政策类型">
              <el-select v-model="form.yhzclx" placeholder="请选择" size="small">
                <el-option label="企业所得税" value="企业"/>
                <el-option label="个人所得税" value="个人"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税率(%)">
              <el-select v-model="form.sl" placeholder="税率" size="small">
                <el-option label="5%" value="0.05"/>
                <el-option label="6%" value="0.06"/>
              </el-select>
            </el-form-item>
            <el-form-item label="规格型号" prop="ggxh" size="small">
              <el-input v-model="form.ggxh"/>
            </el-form-item>
            <el-form-item label="单元(元)" prop="UnitPrice" size="small">
              <el-input v-model="form.UnitPrice"/>
            </el-form-item>
            <el-form-item label="计量单位" prop="meteringcom" size="small">
              <el-input v-model="form.meteringcom"/>
            </el-form-item>
            <el-form-item label="税收分类名称">
              <el-select v-model="form.ssflmc" placeholder="请选择" size="small">
                <el-option label="企业所得税" value="企业"/>
                <el-option label="个人所得税" value="个人"/>
              </el-select>
            </el-form-item>
            <el-form-item label="税收分类编码" prop="ssflbm" size="small">
              <el-input v-model="form.ssflbm"/>
            </el-form-item>
            <el-form-item label="是否享受优惠政策">
              <el-select v-model="form.sfxsyh" placeholder="请选择" size="small">
                <el-option label="企业所得税" value="企业"/>
                <el-option label="个人所得税" value="个人"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item class="button">
            <el-button type="primary" @click="addAdata('form')">确认</el-button>
            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
    <!--设置税收分类编码-->
    <el-dialog
      :visible.sync="dialogVisible1"
      :before-close="handleClose"
      title="新增商品税收编码转换"
      width="650px"
      custom-class="add-customer">
      <el-form ref="form1" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="税收分类名称">
          <el-select v-model="form1.ssflmc" placeholder="请选择" size="small">
            <el-option label="企业所得税" value="企业"/>
            <el-option label="个人所得税" value="个人"/>
          </el-select>
        </el-form-item>
        <el-form-item label="税收分类编码" prop="spmcName" size="small">
          <el-input v-model="form1.ssflbm"/>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="dialogVisible1 = false">保存</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">取消</el-button>
        </el-form-item>
      </el-form>
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
        accept=".xls,.xlsx"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/">
        <div slot="tip" class="el-upload__tip">选择上传文件</div>
        <el-button slot="trigger" size="small" type="primary">添加文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import { commodictList, AddData, updateData } from '@/api/system/infoManagement'
export default{
  name: 'Dashboard',
  data() {
    return {
      listLoading: false, // loading
      list: [],
      searchs: {
        // 商品名称
        commodityName: '',
        // 商品编码
        comcode: ''
      },
      checkedList: [],
      currentPage: 1,
      pageSize: 25,
      total: 1000,
      dialogType: '',
      fileList: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      form: {
        spbm: '',
        spmc: '',
        spsm: '',
        jcode: '',
        ggxh: '',
        UnitPrice: '',
        meteringcom: '',
        hssign: '',
        ssflbm: '',
        ssflmc: '',
        sl: '',
        lslbs: '',
        mslx: '',
        sfxsyh: '',
        yhzclx: '',
        id: 0
      },
      form1: {
        ssflmc: '',
        ssflbm: ''
      },
      rules: {
        spbm: [
          { required: true, message: '商品编码不能为空', trigger: 'blur' }
        ],
        spmc: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        ggxh: [
          { required: true, message: '规格型号不能为空', trigger: 'blur' }
        ],
        jcode: [
          { required: true, message: '简码不能为空', trigger: 'blur' }
        ],
        UnitPrice: [
          { required: true, message: '单元不能为空', trigger: 'blur' }
        ],
        meteringcom: [
          { required: true, message: '计量单位不能为空', trigger: 'blur' }
        ],
        ssflbm: [
          { required: true, message: '税收分类编码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  created() {
    this.gitlist()
  },
  methods: {
    searchFn() {
    },
    initSearch() {
      this.searchs = {
        commodityName: '',
        comcode: ''
      }
    },
    gitlist() { // 获取数据列表
      commodictList().then(res => {
        if (res.code === '0000') {
          this.list = res.data
        }
      })
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    handleEdit(ind, rows) { // 编辑
      this.dialogVisible = true
      this.dialogType = 'edit'
      console.log(rows)
      this.form = rows
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    addClick() { // 添加
      this.dialogVisible = true
      this.dialogType = 'adds'
      console.log(111)
    },
    addAdata(formName) { // 点击添加确定后
      if (this.dialogType === 'adds') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = JSON.parse(JSON.stringify(this.form))
            AddData(params).then(res => {
              if (res.code === '0000') {
                console.log(res)
                this.gitlist()
              }
              this.dialogVisible = false
              this.dialogType = ''
            })
          } else {
            console.log('error!!')
            return false
          }
        })
      }
      if (this.dialogType === 'edit') { // 点击编辑成功后
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = JSON.parse(JSON.stringify(this.form))
            updateData(params, params.id).then(res => {
              if (res.code === '0000') {
                console.log(res)
                this.gitlist()
              }
              this.dialogVisible = false
              this.dialogType = ''
              this.form = {}
            })
          } else {
            console.log('error!!')
            return false
          }
        })
      }
    },
    settingClick() { // 设置税收分类编码
      this.dialogVisible1 = true
    },
    importExcel() {
      this.dialogVisible2 = true
    },
    handleClose() { // 关闭弹窗
      this.dialogVisible = false
      this.dialogVisible1 = false
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
  &-container {
     margin: 30px;
      .search-box {
        .search-item {
          float: left;
          display: inline-block;
            span {
              font-size: 14px;
            }
          }
      }
      .button-box {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 0px;
      }
    }
    &-text {
       font-size: 30px;
       line-height: 46px;
    }
  }
</style>
