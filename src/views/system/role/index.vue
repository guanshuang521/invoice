<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <div class="search-box">
      <div class="search-item">
        <span>角色名称</span>
        <el-input v-model="searchs.roleName"/>
      </div>
      <div class="search-item">
        <span>有效标志</span>
        <el-select v-model="searchs.sign" placeholder="请选择">
          <el-option label="有效" value="1"/>
          <el-option label="无效" value="0"/>
        </el-select>
      </div>
      <el-button type="primary" size="small" @click="searchFn">查询</el-button>
      <el-button type="primary" size="small" @click="initSearch">重置</el-button>
    </div>
    <div class="button-box">
      <el-button type="primary" size="mini" @click="addRole">新增</el-button>
      <el-button type="primary" size="mini" @click="delRole">删除</el-button>
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
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.roleName }}
          </template>
        </el-table-column>
        <el-table-column label="有效标志" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sign == 1 && '有效' || scope.row.sign == 0 && '无效' }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="角色类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.roleType }}
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">权限分配</el-button>
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
      :title="dialogType === 'add' && '新增角色' || dialogType === 'edit' && '权限分配' || ''"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="530px"
      custom-class="add-edit-role">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" :disabled="dialogType === 'edit'"/>
        </el-form-item>
        <el-form-item label="有效标志" prop="sign">
          <el-select v-model="form.sign" :disabled="dialogType === 'edit'" placeholder="请选择">
            <el-option label="有效" value="1"/>
            <el-option label="无效" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单权限"/>
        <el-form-item label="" class="tree-box">
          <el-tree
            ref="tree2"
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :default-checked-keys="form.checkTree"
            class="filter-tree"
            default-expand-all
            show-checkbox
            @check="handleCheck"
          />
        </el-form-item>
        <el-form-item class="button">
          <el-button v-if="dialogType === 'add'" type="primary" @click="addRoleFn('form')">添加</el-button>
          <el-button v-if="dialogType === 'edit'" type="primary" @click="editRoleFn('form')">保存</el-button>
          <el-button type="primary" @click="handleClose('form')">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- <div>
        <span><span class="mark">*</span>角色名称</span>
        <el-input v-model="form.roleName" :disabled="dialogType === 'edit'"/>
        <span><span class="mark">*</span>有效标志</span>
        <el-select v-model="form.sign" :disabled="dialogType === 'edit'" placeholder="请选择">
          <el-option label="有效" value="1"/>
          <el-option label="无效" value="0"/>
        </el-select>
        <br>
        <span>菜单权限</span>
        <div class="tree-box">
          <el-tree
            ref="tree2"
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            default-expand-all
            show-checkbox
            @check-change="handleCheckChange"
          />
        </div>
      </div> -->
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addRoleFn">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      list: [
        {
          roleName: '管理员',
          sign: '1',
          roleType: '管理员',
          id: 0,
          checkTree: []
        }, {
          roleName: '对方v',
          sign: '1',
          roleType: '认同',
          id: 1,
          checkTree: []
        }, {
          roleName: '额度',
          sign: '1',
          roleType: '如同',
          id: 2,
          checkTree: []
        }
      ],
      list0: [],
      listLoading: false,
      searchs: {
        roleName: '',
        sign: ''
      },
      checkedList: [],
      currentPage: 1,
      pageSize: 25,
      total: 1000,
      dialogVisible: false,
      dialogType: '',
      form: {
        roleName: '',
        sign: '',
        roleType: '',
        checkTree: []
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        sign: [
          { required: true, message: '有效标志不能为空', trigger: 'blur' }
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [
        {
          id: 1,
          label: '进项管理',
          children: [{
            id: 4,
            label: '发票采集管理',
            children: [{
              id: 9,
              label: 'Level three 1-1-1'
            }, {
              id: 10,
              label: 'Level three 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: 'Level one 2',
          children: [{
            id: 5,
            label: 'Level two 2-1'
          }, {
            id: 6,
            label: 'Level two 2-2'
          }]
        }, {
          id: 3,
          label: 'Level one 3',
          children: [{
            id: 7,
            label: 'Level two 3-1'
          }, {
            id: 8,
            label: 'Level two 3-2'
          }]
        }
      ]
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
    fetchData() {
      // this.listLoading = true
      this.list0 = JSON.parse(JSON.stringify(this.list))
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    },
    searchFn() {},
    initSearch() {
      this.searchs = {
        roleName: '',
        sign: ''
      }
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    addRole() {
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    addRoleFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.dialogType = ''
          console.log(this.form)
          var arr = JSON.parse(JSON.stringify(this.form))
          arr.id = this.list0.length // 假定数据id
          this.list0.push(arr) // 总数据添加
          this.list = JSON.parse(JSON.stringify(this.list0)) // 修改显示数据
          for (var k in this.form) {
            this.form[k] = ''
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editRoleFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.dialogType = ''
          console.log(this.form)
          for (var i = 0; i < this.list0.length; i++) {
            if (this.list0[i].id === this.form.id) {
              this.list0.splice(i, 1, this.form)
            }
          }
          this.list = JSON.parse(JSON.stringify(this.list0)) // 修改显示数据
          for (var k in this.form) {
            this.form[k] = ''
          }
        } else {
          console.log('error submit!!')
          return false
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
        // type: 'warning',
        // center: true
      }).then(() => {
        console.log(this.checkedList)
        for (var i = 0; i < this.checkedList.length; i++) {
          for (var j = 0; j < this.list0.length; j++) {
            if (this.checkedList[i].id === this.list0[j].id) {
              this.list0.splice(j, 1)
            }
          }
        }
        this.list = JSON.parse(JSON.stringify(this.list0))
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
    handleEdit(index, item) { // 权限分配
      this.dialogVisible = true
      this.dialogType = 'edit'
      this.form = item
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
    },
    filterNode(value, data, node) { // 对树节点进行筛选时执行的方法
      return true
    },
    handleCheckChange(data, checked, indeterminate) { // @check-change="handleCheckChange"
      console.log(data, checked, indeterminate)
    },
    handleCheck(data, checks) {
      console.log(data, checks, checks.checkedNodes)
      var arr = []
      for (var i = 0; i < checks.checkedNodes.length; i++) {
        arr.push(checks.checkedNodes[i].id)
      }
      this.form.checkTree = arr
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
.add-edit-role {
  height: 407px;
  .mark {
    color: red;
  }
  .tree-box {
    // width: 440px;
    // max-height: 222px;
    // overflow: auto;
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
.add-edit-role {
  .el-input {
    max-width: 150px;
    // height: 25px;
  }
  .el-form:after {
    content: '';
    display: block;
    clear: both;
  }
  .el-form-item {
    float: left;
    .el-input {
      max-width: 150px;
    }
  }
  .tree-box .el-form-item__content {
    margin-left: 20px!important;
    width: 440px;
    max-height: 222px;
    overflow: auto;
  }
  .button {
    margin-bottom: 0;
  }
}
</style>
