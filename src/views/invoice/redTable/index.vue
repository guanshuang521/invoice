<template>
  <div class="redTable-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="销方名称">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="信息表状态">
          <el-select v-model="searchParams.userName" placeholder="请选择" size="small">
            <el-option label="状态1" value="shanghai"/>
            <el-option label="状态2" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="信息表编号">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="填开日期起">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="填开日期止">
          <el-input v-model="searchParams.userName" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="addApply">新增申请</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="">删除</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="">打印</el-button>
    </div>
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="tableList"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120"/>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip/>
      </el-table>
      <el-pagination
        :current-page = "currentPage"
        :page-sizes = "[100, 200, 300, 400]"
        :page-size = "100"
        :total = "400"
        layout = "total, sizes, prev, pager, next, jumper"
        @size-change = "handleSizeChange"
        @current-change = "handleCurrentChange"/>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="红字信息表申请" width="380px">
      <el-form ref="form" :model="form" label-width="82x">
        <el-form-item label="原发票代码：">
          <el-input v-model="form.name" size="small" style="width: 240px"/>
        </el-form-item>
        <el-form-item label="原发票号码：">
          <el-input v-model="form.name" size="small" style="width: 240px"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="redTableOpen">下一步</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogRedTableVisible" title="红字信息表填开-申请" width="1200px">
      <red-table/>
    </el-dialog>
  </div>
</template>

<script>
import redTable from '@/components/redTable/index'
export default {
  name: 'Dashboard',
  components: { redTable },
  data() {
    return {
      // 当前页数
      currentPage: 1,
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
      form: {
        name: ''
      },
      dialogVisible: false,
      dialogRedTableVisible: false
    }
  },
  methods: {
    // table列表查询
    initTable() {
      // getList(this.searchParams).then(res => {
      //   this.list = res.info
      //   console.log(res, 88888)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // table重置
    reset() {
      this.searchParams = {
        userName: '',
        role: ''
      }
      this.initTable()
    },
    // 新增申请
    addApply() {
      this.dialogVisible = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    redTableOpen() {
      this.dialogVisible = false
      this.dialogRedTableVisible = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .redTable {
    &-container{
      margin: 30px;
      .filter-container{
        margin-bottom: 20px;
      }
      .button-container{
        margin-bottom: 20px;
      }
      /deep/ .el-dialog__footer{
        text-align: center;
      }
    }
  }
</style>
