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
      <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="addUserDialog">新增</el-button>
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
        <el-table-column label="账号" prop="userCode" align="center"/>
        <el-table-column label="密码" prop="password" align="center"/>
        <el-table-column label="复核人" prop="reviewer" align="center"/>
        <el-table-column label="收款人" prop="receiver" align="center"/>
        <el-table-column label="所属机构" prop="orgId" align="center"/>
        <el-table-column label="终端号" prop="terminalId" align="center"/>
        <el-table-column label="用户状态" prop="status" align="center"/>
        <el-table-column label="上次登录IP" prop="modifiedId" align="center" width="100"/>
        <el-table-column label="最后登录时间" prop="modifiedTime" align="center" width="120"/>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="searchParams.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="searchParams.pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!--新增编辑用户弹窗-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :lock-scroll="true" width="640px" custom-class="showPop dialog-wapper pub-min-pop">
      <el-form ref="userForm" :inline="true" :model="userInfo" :rules="userRules" class="form" label-width="100px" size="mini">
        <el-form-item label="账号：" prop="userCode" >
          <el-input v-model="userInfo.userCode" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="密码：" prop="password" >
          <el-input v-model="userInfo.password" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="用户名：" prop="userName" >
          <el-input v-model="userInfo.userName" placeholder="请输入"/>
        </el-form-item>
        <br>
        <el-form-item label="角色：" prop="role">
          <el-select v-model="userInfo.role" filterable multiple placeholder="请选择" size="small" style="width: 450px">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="收款人：" prop="receiver" >
          <el-input v-model="userInfo.receiver" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="复核人：" prop="checker" >
          <el-input v-model="userInfo.reviewer" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="所属机构：" prop="kplx">
          <el-select v-model="userInfo.orgId" placeholder="请选择" style="width: 450px">
            <el-option
              v-for="item in orgIdOptions"
              :key="item.id"
              :label="item.orgName"
              :value="item.id "/>
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态：" prop="status" >
          <el-select v-model="userInfo.status" placeholder="请选择" style="width: 170px">
            <el-option label="状态1" value="0"/>
            <el-option label="状态2" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item label="终端号：" prop="terminalCode" >
          <el-input v-model="userInfo.terminalId" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="数据权限：" prop="auth" >
          <div class="authTree">
            <el-tree
              ref="organTree"
              :data="organTreeData"
              class="filter-tree"
              default-expand-all
              node-key="id"
              show-checkbox
            />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" size="mini" @click="addUser">保存</el-button>
        <el-button size="mini" @click="dialogVisible = !dialogVisible">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, add, edit, deleteUser, getAllRoles } from '@/api/system/user'
import { getNodeList } from '@/api/system/organization'
import { arrayToTree } from '@/utils/public'
import { mapGetters } from 'vuex'

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
      tableList: [],
      // 列表总条数
      total: 0,
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
        userCode: '',
        password: '',
        userName: '',
        receiver: '',
        reviewer: '',
        status: '',
        terminalId: '',
        auth: []
      },
      userRules: {
        userCode: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      },
      organTreeData: [],
      // 所属机构
      orgIdOptions: [],
      // 所有角色列表
      roleList: []
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  mounted() {
    this.listLoading = true
    this.$store.getters.isAutoLoadData ? this.initTable() : ''
    this.handleRoleList()
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false
    },
    initTree() { // 初始化机构树
      this.loading = true
      getNodeList({}).then(res => {
        this.loading = false
        this.orgIdOptions = res.data.list
        this.organTreeData = arrayToTree(res.data.list, 'orgName')
      }).catch(e => {
        this.loading = false
        this.$message.error(e)
      })
      getNodeList({ type: 2 }).then(res => {
        this.loading = false
        this.orgIdOptions = res.data.list
      }).catch(err => {
        this.loading = false
        this.$message.error(err)
      })
    },
    initTable() { // table列表查询
      this.loading = true
      getList(this.searchParams).then(res => {
        this.loading = false
        this.total = res.data.count
        this.tableList = res.data.list
      }).catch(err => {
        this.loading = false
        this.$message.error(err)
      })
    },
    // table重置
    reset() {
      this.searchParams = {
        userName: '',
        role: '',
        currentPage: 1,
        pageSize: 10
      }
      this.initTable()
    },
    addUserDialog() { // 新增用户打开弹框
      this.dialogTitle = '新增用户'
      this.dialogType = 'addUser'
      this.dialogVisible = true
      this.userInfo = {
        userCode: '',
        password: '',
        userName: '',
        receiver: '',
        reviewer: '',
        status: '',
        terminalId: '',
        role: []
      }
      this.initTree()
    },
    addUser() { // 新增用户保存
      this.userInfo.auth = JSON.parse(JSON.stringify(this.$refs.organTree.getCheckedKeys()))
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'addUser') {
            this.loading = true
            const roles = {
              roleIdList: this.userInfo.role.join(',')
            }
            const args = Object.assign({}, this.userInfo)
            add(args).then(res => {
              this.$message.success(res.message)
              this.loading = false
              this.closeDialog()
              this.initTable()
            }).catch(err => {
              this.loading = false
              this.$message.error(err)
              this.closeDialog()
            })
          } else {
            this.loading = true
            edit(this.userInfo).then(res => {
              this.loading = false
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.closeDialog()
              this.initTable()
            }).catch(err => {
              this.loading = false
              this.$message({
                message: err,
                type: 'error'
              })
              this.closeDialog()
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
        const args = {
          ids: this.checkedList.join()
        }
        this.loading = true
        deleteUser(args).then(res => {
          this.loading = false
          this.$message({
            type: 'success',
            message: res.message
          })
          this.initTable()
        }).catch(err => {
          this.loading = false
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      })
    },
    editUser(row) { // 编辑用户
      this.dialogTitle = '编辑用户'
      this.dialogType = 'editUser'
      this.dialogVisible = true
      this.initTree()
      this.userInfo = row
    },
    // 列表勾选
    handleSelectionChange(val) {
      this.checkedList = []
      val.forEach((item) => {
        this.checkedList.push(item.id)
      })
      var set = new Set(this.checkedList) // {1,2,3,4}
      this.checkedList = Array.from(set)
    },
    // 更改每页显示条数
    handleSizeChange(val) {
      console.log(val)
      this.searchParams.pageSize = val
      this.initTable()
    },
    // 更改当前页码
    handleCurrentChange(val) {
      console.log(val)
      this.searchParams.currentPage = val
      this.initTable()
    },
    handleRoleList() {
      getAllRoles({}).then(res => {
        this.listLoading = false
        this.roleList = res.data.list
        this.$message.success(res)
      }).catch(err => {
        this.listLoading = false
        this.$message.error(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user {
  &-container{
    margin: 30px;
    .button-container{
      margin-bottom: 20px;
    }
    .authTree{
      border: 1px solid #eeeeee;
      width: 454px;
      max-height: 200px;
      overflow-y: scroll;
    }
  }
}
</style>
