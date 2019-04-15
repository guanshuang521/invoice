<template>
  <div class="redTable-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="searchParams.ghdwmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="销方名称">
          <el-input v-model="searchParams.xhdwmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="信息表状态">
          <el-select v-model="searchParams.clzt" placeholder="请选择" size="small">
            <el-option v-for="item in clztObj" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="信息表编号">
          <el-input v-model="searchParams.xxbbh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="填开日期起">
          <el-input v-model="searchParams.tkrq" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="填开日期止">
          <el-input v-model="searchParams.tkrq" placeholder="请输入" size="small"/>
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
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="">同步</el-button>
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
          prop="name"
          label="申请单号"
          width="120"/>
        <el-table-column
          prop="name"
          label="红字信息表编号"
          width="120"/>
        <el-table-column
          prop="name"
          label="信息表状态"
          width="120"/>
        <el-table-column
          prop="name"
          label="填开日期"
          width="120"/>
        <el-table-column
          prop="name"
          label="发票代码"
          width="120"/>
        <el-table-column
          prop="name"
          label="发票号码"
          width="120"/>
        <el-table-column
          prop="name"
          label="金额（不含税）"
          width="120"/>
        <el-table-column
          prop="name"
          label="税额"
          width="120"/>
        <el-table-column
          prop="name"
          label="价税合计"
          width="120"/>
        <el-table-column
          prop="name"
          label="购方名称"
          width="120"/>
        <el-table-column
          prop="name"
          label="销方名称"
          width="120"/>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small">上传</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page = "searchParams.currentPage"
        :page-sizes = "[10, 20, 30, 50, 100]"
        :page-size = "searchParams.pageSize"
        :total = "totalCount"
        layout = "total, sizes, prev, pager, next, jumper"
        @size-change = "handleSizeChange"
        @current-change = "handleCurrentChange"/>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="红字信息表申请" width="380px">
      <el-form ref="form" :model="form" label-width="82x">
        <el-form-item label="原发票代码：">
          <el-input v-model="form.fpdm" size="small" style="width: 240px"/>
        </el-form-item>
        <el-form-item label="原发票号码：">
          <el-input v-model="form.fphm" size="small" style="width: 240px"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="redTableOpen">下一步</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogRedTableVisible" title="红字信息表填开-申请" width="1200px">
      <red-table v-if="dialogRedTableVisible" :form="form" @getformdata="getInfo"/>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import redTable from '@/components/redTable/index'
import { initList, del, insert, apply, sync } from '@/api/invoice/redTable'
export default {
  name: 'Dashboard',
  components: { redTable },
  data() {
    return {
      // 查询条件
      searchParams: {
        ghdwmc: '',
        xhdwmc: '',
        clzt: '',
        xxbbh: '',
        currentPage: 1,
        pageSize: 10
      },
      clztObj: [
        { id: 0, name: '未处理' },
        { id: 1, name: '已提交' },
        { id: 2, name: '审核通过' },
        { id: 3, name: '审核不通过' }
      ],
      // 列表数据
      tableList: [],
      form: {
        fpdm: '',
        fphm: ''
      },
      totalCount: 0,
      dialogVisible: false,
      dialogRedTableVisible: false,
      // 票面信息
      pfDetail: {}
    }
  },
  methods: {
    // table列表查询
    initTable() {
      initList(this.searchParams).then(res => {
        this.tableList = res.data.list
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // table重置
    reset() {
      this.searchParams = {
        ghdwmc: '',
        xhdwmc: '',
        clzt: '',
        xxbbh: '',
        currentPage: 1,
        pageSize: 10
      }
      this.initTable()
    },
    // 获取红字信息表详情
    redTableOpen() {
      this.dialogVisible = false
      this.dialogRedTableVisible = true
    },
    // 保存
    save() {
      const args = Object.assign({}, this.pfDetail)
      insert(args).then(res => {
        this.$message.success(res.message)
        this.dialogRedTableVisible = false
      }).catch(err => {
        this.$message.error(err)
        this.dialogRedTableVisible = false
      })
    },
    // 获取票面信息
    getInfo(msg) {
      console.log(msg)
      this.pfDetail = msg
    },
    // 查看
    handleClick(row) {
      console.log(row)
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
