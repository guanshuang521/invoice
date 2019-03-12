<template>
  <div class="organization-container">
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h4>组织机构</h4>
          <el-input v-model="filterText" placeholder="请输入关键字"/>
          <el-tree
            ref="organTree"
            :data="organTree"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :expand-on-click-node="autoExpand"
            :highlight-current="highlight"
            class="filter-tree"
            default-expand-all
            @node-click="showTabs()"
          />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <h4>节点属性面板</h4>
          <el-tabs v-if="isTreeChecked" v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="节点维护" name="first">
              <el-form ref="nodeMaintenanceForm" :model="nodeMaintenanceForm" :rules="nodeMaintenanceRules" label-width="120px">
                <el-form-item label="组织机构代码" prop="code">
                  <el-input v-model="nodeMaintenanceForm.code"/>
                </el-form-item>
                <el-form-item label="组织机构名称" prop="name">
                  <el-input v-model="nodeMaintenanceForm.name"/>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                  <el-input v-model="nodeMaintenanceForm.note" classs="note" type="textarea"/>
                </el-form-item>
                <el-form-item label="是否是叶节点" prop="isLeafNode">
                  <el-radio-group v-model="nodeMaintenanceForm.isLeafNode">
                    <el-radio label="true">是</el-radio>
                    <el-radio label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete" @click="deleteNode">删除</el-button>
                  <el-button type="primary" icon="el-icon-check" @click="updateForm('nodeMaintenanceForm')">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="currentNodeType === 'system'" label="新增子节点" name="second">新增子节点</el-tab-pane>
            <el-tab-pane v-if="currentNodeType !== 'system'" label="税号维护" name="third">税号维护</el-tab-pane>
            <el-tab-pane v-if="currentNodeType !== 'system'" label="税号关联终端" name="fourth">税号关联终端</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getNodeList, getNodeDetail, deleteNode, updateNode } from '@/api/system'
export default {
  name: 'Dashboard',
  data() {
    return {
      // 机构树检索关键字
      filterText: '',
      // 默认展示tab类名
      activeName: 'first',
      // 点击节点是否自动展开
      autoExpand: false,
      // 树高亮显示
      highlight: true,
      // 是否展示tabs
      isTreeChecked: false,
      // 当前节点类型
      currentNodeType: '',
      // 当前节点ID
      currentNodeID: '',
      // 节点维护表单
      nodeMaintenanceForm: {
        code: '',
        name: '',
        note: '',
        isLeafNode: ''
      },
      // 节点维护表单校验规则
      nodeMaintenanceRules: {
        code: [
          { required: true, message: '请输入组织机构代码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入组织机构名称', trigger: 'blur' }
        ],
        isLeafNode: [
          { required: true, message: '请选择是否是叶节点', trigger: 'change' }
        ]
      },
      // 机构树
      organTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.organTree.filter(val)
    }
  },
  mounted() {
    this.initTree()
    // list().then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  methods: {
    // 初始化机构树
    initTree() {
      getNodeList().then(res => {
        this.organTree = res.data
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    // 机构关键字检索
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 点击机构展示对应的机构详情
    showTabs() {
      getNodeDetail().then(res => {
        console.log(res)
        this.currentNodeType = res.data.nodeType
        this.isTreeChecked = true
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    // 更新机构
    updateForm(data) {
      console.log(data)
      this.$refs[data].validate((valid) => {
        if (valid) {
          updateNode(this.nodeMaintenanceForm).then(res => {
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
      })
    },
    // 删除机构
    deleteNode() {
      console.log(this.$refs.organTree.getCurrentNode())
      this.$confirm('确定删除选择数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNode().then(res => {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClick() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .organization {
    &-container{
      margin: 10px;
      h4{
        padding: 10px;
        background-color: #d9e8fb;
      }
    }
    .note{
      resize: none;
    }
  }
</style>
