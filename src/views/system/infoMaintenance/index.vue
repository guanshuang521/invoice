<template>
  <div class="dashboard-container">
    <div class="search-box">
      <div class="search-items">
        <span>客户名称</span>
        <el-input v-model="searchs.khmc"/>
      </div>
      <div class="search-items">
        <span>客户税号</span>
        <el-input v-model="searchs.khsh"/>
      </div>
      <el-button type="primary" size="small" @click="searchFn">查询</el-button>
      <el-button type="primary" size="small" @click="initSearch">重置</el-button>
    </div>
    <div class="button-box">
      <el-button type="primary" size="mini" @click="addCustomer">新增</el-button>
      <el-button type="primary" size="mini" @click="delCustomer">删除</el-button>
      <el-button type="primary" size="mini" @click="downloadExcel">Excel模板下载</el-button>
      <el-button type="primary" size="mini" @click="importExcel">导入Excel</el-button>
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
          width="34px"/>
        <el-table-column align="center" width="31px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="购方名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.khmc }}
          </template>
        </el-table-column>
        <el-table-column label="购方税号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.khsh }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">
            {{ scope.row.khdz }}
          </template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">
            {{ scope.row.yx }}
          </template>
        </el-table-column>
        <el-table-column label="联系人员" align="center">
          <template slot-scope="scope">
            {{ scope.row.lxry }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">
            {{ scope.row.lxdh }}
          </template>
        </el-table-column>
        <el-table-column label="移动电话" align="center">
          <template slot-scope="scope">
            {{ scope.row.sjhm }}
          </template>
        </el-table-column>
        <el-table-column label="开户行" align="center">
          <template slot-scope="scope">
            {{ scope.row.khh }}
          </template>
        </el-table-column>
        <el-table-column label="银行账号" align="center">
          <template slot-scope="scope">
            {{ scope.row.yhzh }}
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
    <!-- 新增弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="() => handleClose('form')"
      title="新增购方信息"
      width="650px"
      custom-class="add-customer">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="购方名称" prop="khmc">
          <el-input v-model="form.khmc"/>
        </el-form-item>
        <el-form-item label="购方税号" prop="khsh">
          <el-input v-model="form.khsh"/>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.lxry"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.lxdh"/>
        </el-form-item>
        <el-form-item label="移动电话">
          <el-input v-model="form.sjhm"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="yx">
          <el-input v-model="form.yx"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-select v-model="form.khdz" placeholder="省">
            <el-option label="北京市" value="北京市"/>
            <el-option label="上海市" value="上海市"/>
          </el-select>
          <span>-</span>
          <el-select v-model="form.khdz" placeholder="市">
            <el-option label="北京市" value="北京市"/>
            <el-option label="上海市" value="上海市"/>
          </el-select>
          <span>-</span>
          <el-select v-model="form.khdz" placeholder="区">
            <el-option label="北京市" value="北京市"/>
            <el-option label="上海市" value="上海市"/>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" class="address">
          <el-input v-model="form.khdz"/>
        </el-form-item>
        <el-form-item label="开户银行">
          <el-select v-model="form.khh" placeholder="开户银行">
            <el-option label="华夏银行" value="华夏银行"/>
            <el-option label="北京银行" value="北京银行"/>
          </el-select>
        </el-form-item>
        <el-form-item label="银行账号">
          <el-input v-model="form.yhzh"/>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="addCustomerFn('form')">保存</el-button>
          <el-button type="primary" @click="handleClose('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 导入弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible2"
      :before-close="handleClose2"
      title="客户基础信息导入"
      width="650px"
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
import { mapGetters } from 'vuex'
import { getCustomerList, deleteCustomer, insertCustomer } from '@/api/system/infoMaintenance'

export default {
  name: 'Dashboard',
  data() {
    function khshFilter(rule, value, callback) { // 购方税号验证
      if (value === '') {
        callback(new Error('购方税号不能为空'))
      } else {
        var re = /^[A-Za-z\d]+$/
        if (!(re.test(value)) || !(value.length === 15 || value.length === 18 || value.length === 20)) {
          callback(new Error('购方税号应由15、18或20个字符组成'))
        } else {
          callback()
        }
      }
    }
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
      list: [
        {
          khmc: '管理员',
          khsh: '1',
          khdz: '北京市丰台科技园',
          yx: 'aerefe@123.com',
          lxry: '管理员',
          lxdh: '12433323454',
          sjhm: '23543212343',
          khh: '北京银行中关村支行',
          yhzh: '123444321234567876',
          id: 0
        }, {
          khmc: '附带v',
          khsh: '5675432345f',
          khdz: '北京市丰台科技园',
          yx: 'aerefe@123.com',
          lxry: '地方',
          lxdh: '12433323454',
          sjhm: '23543212343',
          khh: '北京银行中关村支行',
          yhzh: '123444321234567876',
          id: 1
        }, {
          khmc: '而VS',
          khsh: '344454566775g',
          khdz: '北京市丰台科技园',
          yx: 'aerefe@123.com',
          lxry: '额度',
          lxdh: '12433323454',
          sjhm: '23543212343',
          khh: '北京银行中关村支行',
          yhzh: '123444321234567876',
          id: 2
        }
      ],
      list0: [], // 临时
      listLoading: false,
      searchs: {
        khmc: '',
        khsh: ''
      },
      checkedList: [],
      currentPage: 1,
      pageSize: 25,
      total: 1000,
      dialogVisible: false,
      dialogType: '',
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
      rules: {
        khmc: [
          { required: true, message: '购方名称不能为空', trigger: 'blur' }
        ],
        khsh: [
          { required: true, validator: khshFilter, trigger: 'blur' }
        ],
        yx: [
          { required: true, validator: yxFilter, trigger: 'blur' }
        ]
      },
      dialogVisible2: false,
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() { // 获取数据
      this.listLoading = true
      this.list0 = JSON.parse(JSON.stringify(this.list))
      // this.total = this.list0.length
      var params = JSON.parse(JSON.stringify(this.searchs))
      params.pageSize = this.pageSize
      params.currentPage = this.currentPage
      getCustomerList(params).then(response => {
        // console.log(response)
        if (response.code === '0000') {
          this.list = response.data.list
          this.total = response.data.count
        }
        this.listLoading = false
      })
    },
    searchFn() {
      this.fetchData()
    },
    initSearch() { // 重置
      this.searchs = {
        khmc: '',
        khsh: ''
      }
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    addCustomer() {
      this.dialogVisible = true
    },
    addCustomerFn(form) { // 添加购方信息
      this.$refs[form].validate((valid) => {
        if (valid) {
          var params = JSON.parse(JSON.stringify(this.form))
          insertCustomer(params).then(response => {
            if (response.code === '0000') {
              this.fetchData()
            }
            this.dialogVisible = false
            for (var k in this.form) {
              this.form[k] = ''
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    delCustomer() { // 删除数据
      if (this.checkedList.length === 0) {
        this.$message({
          type: 'info',
          message: '请先选择表格中的数据'
        })
        return false
      }
      this.$confirm('确定要删除选择的数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning',
        // center: true
      }).then(() => {
        console.log(this.checkedList)
        var ids = []
        for (var i = 0; i < this.checkedList.length; i++) {
          ids.push(this.checkedList[i].id)
        }
        var params = {
          ids
        }
        deleteCustomer(params).then(response => {
          console.log(response)
          if (response.code === '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          }
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      })
    },
    downloadExcel() { // 下载
      // this.dialogVisible = true
    },
    importExcel() {
      this.dialogVisible2 = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleClose(formName) { // 关闭弹窗
      this.dialogVisible = false
      this.$refs[formName].resetFields()
    },
    handleClose2() { // 关闭弹窗
      this.dialogVisible2 = false
      this.fileList = []
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
  } // ,
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'gray',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .search-box {
      .search-items {
        // float: left;
        display: inline-block;
        span {
          font-size: 14px;
        }
      }
    }
    .button-box {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 0;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.dashboard-container {
  .search-box {
    .search-items {
      .el-input {
        max-width: 105px;
        // height: 25px;
      }
    }
  }
}
.add-customer {
  .el-form:after {
    content: '';
    display: block;
    clear: both;
  }
  .el-form-item {
    float: left;
    .el-input {
      max-width: 150px;
      // height: 25px;
    }
    &.address .el-input {
      width: 450px;
      max-width: 450px;
    }
    &.button {
      width: 610px;
      .el-form-item__content {
        margin-left: 0!important;
        text-align: center;
        .el-button+.el-button {
          margin-left: 50px;
        }
      }
    }
  }
}
</style>
