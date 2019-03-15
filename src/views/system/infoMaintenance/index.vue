<template>
  <div class="dashboard-container">
    <div class="search-box">
      <div class="search-item">
        <span>客户名称</span>
        <el-input v-model="searchs.customerName"/>
      </div>
      <div class="search-item">
        <span>客户税号</span>
        <el-input v-model="searchs.customerTaxNumber"/>
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
            {{ scope.row.customerName }}
          </template>
        </el-table-column>
        <el-table-column label="购方税号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.customerTaxNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column label="联系人员" align="center">
          <template slot-scope="scope">
            {{ scope.row.contacts }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">
            {{ scope.row.contactNumber }}
          </template>
        </el-table-column>
        <el-table-column label="移动电话" align="center">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column label="开户行" align="center">
          <template slot-scope="scope">
            {{ scope.row.bank }}
          </template>
        </el-table-column>
        <el-table-column label="银行账号" align="center">
          <template slot-scope="scope">
            {{ scope.row.bankAccount }}
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
      :before-close="handleClose"
      title="新增购方信息"
      width="650px"
      custom-class="add-customer">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="购方名称" prop="customerName">
          <el-input v-model="form.customerName"/>
        </el-form-item>
        <el-form-item label="购方税号" prop="customerTaxNumber">
          <el-input v-model="form.customerTaxNumber"/>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.contactNumber"/>
        </el-form-item>
        <el-form-item label="移动电话">
          <el-input v-model="form.phone"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-select v-model="form.address" placeholder="省">
            <el-option label="北京市" value="北京市"/>
            <el-option label="上海市" value="上海市"/>
          </el-select>
          <span>-</span>
          <el-select v-model="form.address" placeholder="市">
            <el-option label="北京市" value="北京市"/>
            <el-option label="上海市" value="上海市"/>
          </el-select>
          <span>-</span>
          <el-select v-model="form.address" placeholder="区">
            <el-option label="北京市" value="北京市"/>
            <el-option label="上海市" value="上海市"/>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" class="address">
          <el-input v-model="form.address"/>
        </el-form-item>
        <el-form-item label="开户银行">
          <el-select v-model="form.bank" placeholder="开户银行">
            <el-option label="华夏银行" value="华夏银行"/>
            <el-option label="北京银行" value="北京银行"/>
          </el-select>
        </el-form-item>
        <el-form-item label="银行账号">
          <el-input v-model="form.bankAccount"/>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="addRoleFn">保存</el-button>
          <el-button type="primary" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 导入弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible2"
      :before-close="handleClose"
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

export default {
  name: 'Dashboard',
  data() {
    function emailFilter(rule, value, callback) { // 邮箱验证
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      } else {
        var re = /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/
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
          customerName: '管理员',
          customerTaxNumber: 1,
          address: '北京市丰台科技园',
          email: 'aerefe@123.com',
          contacts: '管理员',
          contactNumber: '12433323454',
          phone: '23543212343',
          bank: '北京银行中关村支行',
          bankAccount: '123444321234567876',
          id: 0
        }
      ],
      listLoading: false,
      searchs: {
        customerName: '',
        customerTaxNumber: ''
      },
      checkedList: [],
      currentPage: 1,
      pageSize: 25,
      total: 1000,
      dialogVisible: false,
      dialogType: '',
      form: {
        customerName: '',
        customerTaxNumber: '',
        address: '',
        email: '',
        contacts: '',
        contactNumber: '',
        phone: '',
        bank: '',
        bankAccount: ''
      },
      rules: {
        customerName: [
          { required: true, message: '购方名称不能为空', trigger: 'blur' }
        ],
        customerTaxNumber: [
          { required: true, message: '购方税号不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: emailFilter, trigger: 'blur' }
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
    // this.fetchData()
  },
  methods: {
    fetchData() { // 获取数据
      this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
    searchFn() {},
    initSearch() { // 重置
      this.searchs = {
        customerName: '',
        customerTaxNumber: ''
      }
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    addCustomer() {
      this.dialogVisible = true
    },
    addRoleFn() {
      this.dialogVisible = false
    },
    delCustomer() { // 删除数据
      this.$confirm('确定要删除选择的数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning',
        // center: true
      }).then(() => {
        console.log(this.checkedList)
        this.$message({
          type: 'success',
          message: '删除成功!'
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
    handleClose() { // 关闭弹窗
      this.dialogVisible = false
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
      .search-item {
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
    .search-item {
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
