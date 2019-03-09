<template>
  <div class="organization-container">
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h4>组织机构</h4>
          <el-input v-model="filterText" placeholder="请输入关键字"/>
          <el-tree
            ref="organTree"
            :data="data2"
            :props="defaultProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            default-expand-all
          />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <h4>节点属性面板</h4>
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="节点维护" name="first">
              <el-form ref="form" :model="nodeMaintenanceForm" label-width="120px">
                <el-form-item label="组织机构代码">
                  <el-input v-model="nodeMaintenanceForm.code"/>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="新增子节点" name="second">新增子节点</el-tab-pane>
            <el-tab-pane label="税号维护" name="third">税号维护</el-tab-pane>
            <el-tab-pane label="税号关联终端" name="fourth">税号关联终端</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { list } from '@/api/system'
export default {
  name: 'Dashboard',
  data() {
    return {
      filterText: '',
      activeName: 'first',
      nodeMaintenanceForm: {
        name: ''
      },
      // 机构树
      data2: [{
        id: 1,
        label: 'Level one 1',
        children: [{
          id: 4,
          label: 'Level two 1-1',
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
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  watch: {
    filterText(val) {
      this.$refs.organTree.filter(val)
    }
  },
  mounted() {
    // list().then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
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
  }
</style>
