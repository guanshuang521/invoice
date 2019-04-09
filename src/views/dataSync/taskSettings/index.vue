/**
* @author Wujy
* @date 2019/3/21
* @Description:任务设置
*/
<template>
  <div class="taskSettings-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="手工同步" name="first">
        <div class="search-item">
          <span>数据类型</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
        <div class="search-item">
          <span>数据源系统</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
        <div class="button-box">
          <el-button type="primary" size="mini" @click="importExcel">同步</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="定时同步" name="second">
        <div class="button-container">
          <el-button type="primary" size="mini" @click="importExcel">新增</el-button>
        </div>
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
          <el-table-column label="数据类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.djsh }}
            </template>
          </el-table-column>
          <el-table-column label="数据源系统" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.xfmc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.xfsh }}
            </template>
          </el-table-column>
          <el-table-column label="结束时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.xfsh }}
            </template>
          </el-table-column>
          <el-table-column label="同步频率" align="center">
            <template slot-scope="scope">
              {{ scope.row.xfsh }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              {{ scope.row.gfmc }}
            </template>
          </el-table-column>
          <el-table-column label="入库记录数" align="center">
            <template slot-scope="scope">
              {{ scope.row.gfsh }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">操作</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="dialogVisible" :visible.sync="dialogVisible" :lock-scroll="true" width="640px" custom-class="showPop dialog-wapper pub-min-pop">
      <el-form ref="userForm" :inline="true" :model="userInfo" :rules="userRules" class="form" label-width="100px" size="mini">
        <el-form-item label="数据类型：" prop="status" >
          <el-select v-model="userInfo.status" placeholder="请选择" style="width: 170px">
            <el-option label="商品类订单" value="shanghai"/>
            <el-option label="服务类订单" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="数据源系统：" prop="status" >
          <el-select v-model="userInfo.status" placeholder="请选择" style="width: 170px">
            <el-option label="EBS系统" value="shanghai"/>
          </el-select>
        </el-form-item>
        <el-form-item label="开票日期起">
          <el-date-picker
            v-model="listQuery.spmc"
            type="date"
            size="small"
            class="filter-item"
            placeholder="开票日期起"/>
        </el-form-item>
        <el-form-item label="开票日期止">
          <el-date-picker
            v-model="listQuery.spmc"
            type="date"
            size="small"
            class="filter-item"
            placeholder="开票日期止"/>
        </el-form-item>
        <el-form-item label="同步频率：" prop="status" >
          <el-select v-model="userInfo.status" placeholder="请选择" style="width: 170px">
            <el-option label="30分钟" value="Thirty"/>
            <el-option label="60分钟" value="Sixty"/>
            <el-option label="1天" value="Day"/>
          </el-select>
        </el-form-item>
        <el-form-item label="启用状态：" prop="status" >
          <el-select v-model="userInfo.status" placeholder="请选择" style="width: 170px">
            <el-option label="启用" value="Thirty"/>
            <el-option label="禁用" value="Sixty"/>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" size="mini" @click="save">保存</el-button>
        <el-button size="mini" @click="dialogVisible = !dialogVisible">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTableList } from '@/api/queryStatistics/orderOpenMessage'
import testSettings from '@/components/dataSync/testSettings'
export default {
  name: 'Dashboard',
  components: {
    testSettings
  },
  data: function() {
    return {
      value: '',
      activeName: 'first',
      options: [{
        value: '01',
        label: '服务类订单'
      }, {
        value: '02',
        label: '商品类订单'
      }],
      list: [
        {
          djsh: '管理员',
          xfmc: 1,
          gfmc: '北京市丰台科技园',
          xfsh: '12433323454',
          gfsh: '23543212343',
          je: '北京银行中关村支行',
          se: '123444321234567876',
          jshj: 0,
          ddzt: 0
        }
      ],
      listQuery: {
        title: '',
        importance: '',
        type: '',
        sort: '',
        limit: 10,
        currentPage: 2
      },
      userRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      },
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
      userInfo: {
        account: '',
        password: '',
        userName: '',
        role: '',
        receiver: '',
        checker: '',
        organization: '',
        status: '',
        terminalCode: '',
        auth: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    // this.getTastData()
  },
  methods: {
    change(a) {
      this.dialogVisible = false
    },
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
      })
    },
    downloadExcel() { // 下载
      // this.dialogVisible = true
    },
    importExcel() {
      this.dialogVisible2 = true
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
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
    },
    handleEdit(index, row) {
      this.dialogVisible = true
    },
    save() {

    },
    getTableList() {
      getTableList().then(res => {
        if (res.code === 20000) {
          this.list = res.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.taskSettings {
  &-container {
    margin: 30px;
    .el-dialog__body{
      padding-top: 50px;
      padding-bottom: 50px;
      .content{
        margin-left: 10px;
        .search-item{
          float: left;
          margin-bottom: 20px;
          margin-left: 30px;
        }
      }
    }
    .button-container{
      margin-bottom: 20px;
    }
  }
}
.el-dialog .search-item span{
  float: left;
  width: 100px;
  height: 35px;
  text-align: center;
  line-height: 35px;
}
.el-dialog .el-date-editor--date{
  width: 170px;
  height: 15px;
}
.search-item{
  float: left;
  margin-bottom: 20px;
  margin-left: 30px;
}
.el-input{
  width: 140px;
  height: 35px;
}
.button-box{
  float: left;
  margin-top: 10px;
  margin-left: 34%;
}
</style>
