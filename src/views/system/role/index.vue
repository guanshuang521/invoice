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
          <el-button type="primary" size="small" @click="reset">重置</el-button>
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
        <el-table-column prop="index" label="序号" align="center" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
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
              @click="handleEdit(scope.row.id)">权限分配</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="searchParams.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="searchParams.pageSize"
        :total="total"
        style="margin-top: 20px"
        layout = "total, sizes, prev, pager, next, jumper"
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
      width="600px"
      custom-class="add-edit-role">
      <el-form ref="form" :inline="isInline" :rules="rules" :model="form" label-width="80px" size="mini">
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
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button v-if="dialogType === 'add'" size="mini" type="primary" @click="addRoleFn('form')">添加</el-button>
        <el-button v-if="dialogType === 'edit'" size="mini" type="primary" @click="editRoleFn('form')">保存</el-button>
        <el-button size="mini" @click="handleClose('form')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { arrayToTree } from '@/utils/public'
import { getRoleList, deleteRole, insertRole, getRoleDetail, updateRole } from '@/api/system/role'
import { getRoute } from '@/api/login'

export default {
  name: 'Role',
  data() {
    return {
      // 表单行内显示
      isInline: true,
      // 列表数据
      list: [],
      listLoading: false,
      // 查询参数
      searchParams: {
        currentPage: 1,
        pageSize: 10,
        roleName: '',
        status: ''
      },
      // 选中的列表项
      checkedList: [],
      // 列表总条数
      total: 0,
      // 是否显示弹窗
      dialogVisible: false,
      // 弹窗类型
      dialogType: '',
      // 弹窗表单
      form: {
        roleName: '',
        status: '',
        resourceId: []
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '有效标志不能为空', trigger: 'blur' }
        ]
      },
      // 树形组件配置
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [],
      resourceId: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 初始化数据
    fetchData() {
      this.listLoading = true
      var params = JSON.parse(JSON.stringify(this.searchParams))
      getRoleList(params).then(res => {
        this.list = res.data.list
        this.total = res.data.count
        this.listLoading = false
      }).catch(err => {
        this.$message.error(err)
        this.listLoading = false
      })
    },
    // 获取权限树数据
    getResource() {
      var params = {}
      getRoute(params).then(res => {
        this.treeData = arrayToTree(res.data, 'title')
      })
    },
    // 查询
    searchFn() {
      this.fetchData()
    },
    // 重置
    reset() {
      this.searchParams = {
        roleName: '',
        status: '',
        currentPage: 1,
        pageSize: 10
      }
      this.fetchData()
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
    // 添加角色提交
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
        this.$message.error('至少选择一条数据')
        return false
      }
      this.$confirm('确定要删除选择的数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        var params = {
          roleId: this.checkedList.join(',')
        }
        deleteRole(params).then(res => {
          this.$message.success(res.message)
          this.fetchData()
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    handleEdit(id) {
      getRoleDetail(id).then(res => {
        this.form = res.data
      }).catch(err => {
        this.$message.error(err)
      })
      this.dialogVisible = true
      this.dialogType = 'edit'
      // this.form = JSON.parse(JSON.stringify(item))
      // this.form.status = item.status.toString()
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.searchParams.currentPage = val
      this.fetchData()
    },
    handleClose(formName) { // 关闭弹窗
      this.dialogVisible = false
      this.dialogType = ''
      this.$refs[formName].resetFields()
      this.clearForm()
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
