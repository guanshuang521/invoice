/**
* @author Liuq
* @date 2019/3/27
* @Description: 角色权限管理
*/
<template>
  <div class="role-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="searchParams.roleName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="有效标志">
          <el-select v-model="searchParams.status" placeholder="请选择" size="small">
            <el-option label="有效" value="1"/>
            <el-option label="无效" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchFn">查询</el-button>
          <el-button type="primary" size="small" @click="initSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button type="primary" size="mini" @click="addRole">新增</el-button>
      <el-button type="primary" size="mini" @click="delRole">删除</el-button>
    </div>
    <div class="table-container">
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
        <el-table-column label="角色名称" prop="roleName" align="center"/>
        <el-table-column label="有效标志" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status == 1 && '有效' || scope.row.status == 0 && '无效' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">权限分配</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[25, 50, 100]"
        :page-size="pageSize"
        :total="total"
        style="margin-top: 20px"
        layout="prev, pager, next, jumper, total, sizes, slot"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
        <!-- <span></span> -->
      </el-pagination>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog
      :title="dialogType === 'add' && '新增角色' || dialogType === 'edit' && '权限分配' || ''"
      :visible.sync="dialogVisible"
      :before-close="() => handleClose('form')"
      width="530px"
      custom-class="add-edit-role">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px" size="mini">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" :disabled="dialogType === 'edit'" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="有效标志" prop="status">
          <el-select v-model="form.status" :disabled="dialogType === 'edit'" placeholder="请选择">
            <el-option label="有效" value="1"/>
            <el-option label="无效" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单权限">
          <div class="tree-container">
            <el-tree
              ref="tree2"
              :data="treeData"
              :props="defaultProps"
              :filter-node-method="filterNode"
              :default-checked-keys="form.resourceId"
              node-key="id"
              class="filter-tree"
              default-expand-all
              show-checkbox
              @check="handleCheck"
            />
          </div>
        </el-form-item>
        <el-form-item class="button">
          <el-button v-if="dialogType === 'add'" type="primary" @click="addRoleFn('form')">添加</el-button>
          <el-button v-if="dialogType === 'edit'" type="primary" @click="editRoleFn('form')">保存</el-button>
          <el-button type="primary" @click="handleClose('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { arrayToTree } from '@/utils/public'
import { getRoleList, deleteRole, insertRole, updateRole, selectByResource } from '@/api/system/role'

export default {
  name: 'Role',
  data() {
    return {
      list: [],
      list0: [
        {
          roleName: '管理员',
          status: '1',
          roleCode: '管理员',
          id: 0,
          resourceId: []
        }, {
          roleName: '对方v',
          status: '1',
          roleCode: '认同',
          id: 1,
          resourceId: []
        }, {
          roleName: '额度',
          status: '1',
          roleCode: '如同',
          id: 2,
          resourceId: []
        }
      ],
      listLoading: false,
      searchParams: {
        roleName: '',
        status: ''
      },
      checkedList: [],
      currentPage: 1,
      pageSize: 25,
      total: 1000,
      dialogVisible: false,
      dialogType: '',
      form: {
        roleName: '',
        status: '',
        roleCode: '',
        resourceId: []
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '有效标志不能为空', trigger: 'blur' }
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'lable'
      },
      treeData: [],
      resourceId: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      var params = JSON.parse(JSON.stringify(this.searchParams))
      params.pageSize = this.pageSize
      params.currentPage = this.currentPage
      getRoleList(params).then(response => {
        if (response.code === '0000') {
          this.list = response.data.list
          this.total = response.data.count
        }
        this.listLoading = false
      })
    },
    getResource() {
      var params = {}
      selectByResource(params).then(response => {
        if (response.code === '0000') {
          this.treeData = arrayToTree(response.data.list)
        }
      })
    },
    searchFn() {
      this.fetchData()
    },
    initSearch() {
      this.searchs = {
        roleName: '',
        status: ''
      }
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = []
      for (var i = 0; i < val.length; i++) {
        this.checkedList.push(val[i].id)
      }
    },
    addRole() {
      this.getResource()
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    addRoleFn(formName) { // 添加角色
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = JSON.parse(JSON.stringify(this.form))
          params.resourceId = this.resourceId
          insertRole(params).then(response => {
            if (response.code === '0000') {
              this.fetchData()
            }
            this.dialogVisible = false
            this.dialogType = ''
            this.$refs[formName].resetFields()
            this.clearForm()
          })
        }
      })
    },
    editRoleFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = JSON.parse(JSON.stringify(this.form))
          params.resourceId = this.resourceId
          updateRole(params).then(response => {
            if (response.code === '0000') {
              this.fetchData()
            }
            this.dialogVisible = false
            this.dialogType = ''
            this.$refs[formName].resetFields()
            this.clearForm()
          })
        }
      })
    },
    delRole() { // 删除数据
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
      }).then(() => {
        var params = {
          ids: this.checkedList
        }
        deleteRole(params).then(response => {
          if (response.code === '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          }
        })
      })
    },
    handleEdit(index, item) { // 权限分配
      this.getResource()
      this.dialogVisible = true
      this.dialogType = 'edit'
      this.form = JSON.parse(JSON.stringify(item))
      this.form.status = item.status.toString()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleClose(formName) { // 关闭弹窗
      this.dialogVisible = false
      this.dialogType = ''
      this.$refs[formName].resetFields()
      this.clearForm()
    },
    clearForm() {
      for (var k in this.form) {
        if (Object.prototype.toString.call(this.form[k]) === '[object String]') {
          this.form[k] = ''
        }
        if (Object.prototype.toString.call(this.form[k]) === '[object Number]') {
          this.form[k] = 0
        }
        if (Object.prototype.toString.call(this.form[k]) === '[object Array]') {
          this.form[k] = []
        }
      }
    },
    filterNode(value, data, node) { // 对树节点进行筛选时执行的方法
      return true
    },
    handleCheckChange(data, checked, indeterminate) { // @check-change="handleCheckChange"
      console.log(data, checked, indeterminate)
    },
    handleCheck(data, checks) {
      var arr = []
      for (var i = 0; i < checks.checkedNodes.length; i++) {
        arr.push(checks.checkedNodes[i].id)
      }
      this.resourceId = arr
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .role {
    &-container{
      margin: 30px;
      .filter-container{
        margin-bottom: 20px;
      }
      .button-container{
        margin-bottom: 20px;
      }
      .tree-container{
        border: 1px solid #eeeeee;
        width: 454px;
        max-height: 200px;
        overflow-y: scroll;
      }
    }
  }
</style>
