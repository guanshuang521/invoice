/**
* @author Linzb
* @date 2019/3/26
* @Description: 用户管理
*/
<template>
  <div class="user-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="searchParams.role" placeholder="请选择" size="small">
            <el-option label="角色1" value="shanghai"/>
            <el-option label="角色2" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="addUser">新增</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="deleteUser">删除</el-button>
    </div>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="tableList"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        style="width: 100%">
        <el-table-column type="selection" width="35"/>
        <el-table-column label="用户名称" prop="userName" align="center"/>
        <el-table-column label="账号" prop="gfmc" align="center"/>
        <el-table-column label="密码" prop="gfsh" align="center"/>
        <el-table-column label="角色" prop="fplx" align="center"/>
        <el-table-column label="复核人" prop="je" align="center"/>
        <el-table-column label="收款人" prop="sl" align="center"/>
        <el-table-column label="所属机构" prop="se" align="center"/>
        <el-table-column label="终端号" prop="jshj" align="center"/>
        <el-table-column label="用户状态" prop="kpzt" align="center"/>
        <el-table-column label="上次登录IP" prop="kpts" align="center" width="100"/>
        <el-table-column label="最后登录时间" prop="kpts" align="center" width="120"/>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editUser">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="searchParams.currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!--新增编辑用户弹窗-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :lock-scroll="true" width="640px" custom-class="showPop dialog-wapper pub-min-pop">
      <el-form ref="userForm" :inline="true" :model="userInfo" :rules="userRules" class="form" label-width="100px" size="mini">
        <el-form-item label="账号：" prop="account" >
          <el-input v-model="userInfo.account" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="密码：" prop="password" >
          <el-input v-model="userInfo.password" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="用户名：" prop="userName" >
          <el-input v-model="userInfo.userName" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="角色：" prop="role" >
          <el-input v-model="userInfo.role" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="收款人：" prop="receiver" >
          <el-input v-model="userInfo.receiver" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="复核人：" prop="checker" >
          <el-input v-model="userInfo.checker" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="所属机构：" prop="kplx">
          <el-select v-model="userInfo.organization" placeholder="请选择" style="width: 455px">
            <el-option label="机构1" value="shanghai"/>
            <el-option label="机构2" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态：" prop="status" >
          <el-select v-model="userInfo.status" placeholder="请选择" style="width: 170px">
            <el-option label="状态1" value="shanghai"/>
            <el-option label="状态2" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="终端号：" prop="terminalCode" >
          <el-input v-model="userInfo.terminalCode" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="数据权限：" prop="auth" >
          <div class="authTree">
            <el-tree
              ref="organTree"
              :data="organTree"
              class="filter-tree"
              default-expand-all
              node-key="id"
              show-checkbox
              @check-change="handleCheckChange"
            />
          </div>
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
import { getList, saveUser, deleteUser, getUserDetail } from '@/api/system/user'
import { getNodeList } from '@/api/system/organization'

export default {
  name: 'Dashboard',
  data() {
    return {
      // 加载动画
      listLoading: false,
      // 查询条件
      searchParams: {
        userName: '',
        role: '',
        currentPage: 1,
        pageSize: 10
      },
      // 列表数据
      tableList: [{
        userName: 1
      }],
      // 列表总条数
      totalCount: 0,
      // 已勾选的列表项
      checkedList: [],
      // 弹窗标题
      dialogTitle: '',
      // 弹窗类型
      dialogType: '',
      // 弹窗是否显示
      dialogVisible: false,
      // 新增用户表单
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
      organTree: []
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    // 初始化机构树
    initTree() {
      this.loading = true
      getNodeList().then(res => {
        this.loading = false
        this.organTree = res.data
      }).catch(err => {
        this.loading = false
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    // table列表查询
    initTable() {
      getList(this.searchParams).then(res => {
        this.list = res.info
        console.log(res, 88888)
      }).catch(err => {
        console.log(err)
      })
    },
    // table重置
    reset() {
      this.searchParams = {
        userName: '',
        role: ''
      }
      this.initTable()
    },
    // 新增用户
    addUser() {
      this.dialogTitle = '新增用户'
      this.dialogType = 'addUser'
      this.dialogVisible = true
      this.userInfo = {
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
      this.initTree()
    },
    // 新增用户保存
    save() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'addUser') {
            saveUser(this.userInfo).then(res => {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            }).catch(err => {
              this.$message({
                message: err,
                type: 'error'
              })
            })
          } else {
            saveUser(this.userInfo).then(res => {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            }).catch(err => {
              this.$message({
                message: err,
                type: 'error'
              })
            })
          }
        }
      })
    },
    // 删除用户
    deleteUser() {
      if (this.checkedList.length === 0) {
        this.$message({
          type: 'error',
          message: '请至少选择一条数据！'
        })
        return
      }
      this.$confirm('确定删除选择数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(this.checkedList).then(res => {
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
    // 编辑用户
    editUser() {
      this.dialogTitle = '编辑用户'
      this.dialogType = 'editUser'
      this.dialogVisible = true
      this.initTree()
      this.getUserDetail()
    },
    // 获取用户详情
    getUserDetail() {
      getUserDetail().then(res => {
        this.userInfo = {
          account: res.account,
          password: res.password,
          userName: res.userName,
          role: res.role,
          receiver: res.receiver,
          checker: res.checker,
          organization: res.organization,
          status: res.status,
          terminalCode: res.terminalCode,
          auth: res.auth
        }
      }).catch()
    },
    // 列表勾选
    handleSelectionChange(val) {
      this.checkedList = val
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
    handleCheckChange() {
      console.log(this.$refs.organTree.getCheckedKeys())
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user {
  &-container{
    margin: 30px;
    .filter-item{
      margin: 0 10px 20px 0;
    }
    .authTree{
      border: 1px solid #eeeeee;
      width: 454px;
      max-height: 200px;
      overflow-y: scroll;
    }
  }
  .button-container{
    margin-bottom: 20px;
  }
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
