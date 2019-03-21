<template>
  <div class="wSpecial-container">
    <div class="filter-container">
      <label>购方名称</label>
      <el-input :placeholder="placeholder" v-model="listQuery.title" size="small" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <label>订单号</label>
      <el-input :placeholder="placeholder" v-model="listQuery.title" size="small" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <label>商品名称</label>
      <el-input :placeholder="placeholder" v-model="listQuery.title" size="small" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleReset">重置</el-button>
    </div>
    <div class="button-container">
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">开具发票</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleReset">批量开具</el-button>
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">预制发票回退</el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleReset">导出</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="订单号" prop="id" align="center"/>
      <el-table-column label="购方名称" prop="gfmc" align="center"/>
      <el-table-column label="购方税号" prop="gfsh" align="center"/>
      <el-table-column label="发票类型" prop="fplx" align="center"/>
      <el-table-column label="金额（不含税）" prop="je" align="center"/>
      <el-table-column label="税率" prop="sl" align="center"/>
      <el-table-column label="税额" prop="se" align="center"/>
      <el-table-column label="价税合计" prop="jshj" align="center"/>
      <el-table-column label="开票状态" prop="kpzt" align="center"/>
      <el-table-column label="开票提示" prop="kpts" align="center"/>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">发票预览</el-button>
          <el-button type="primary" size="mini">发票明细</el-button>
          <el-button type="primary" size="mini">订单明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="listQuery.currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      totalCount: 100,
      placeholder: '请输入',
      listQuery: {
        title: '',
        importance: '',
        type: '',
        sort: '',
        limit: 10,
        currentPage: 2
      },
      calendarTypeOptions: [{ name: '1', key: '1' }],
      listLoading: false,
      list: [{ id: 1 }],
      tableKey: ''
    }
  },
  methods: {
    handleFilter() {
    },
    handleReset() {
    },
    getList() {
    },
    handleSizeChange() {
    },
    handleCurrentChange() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wSpecial {
  &-container {
    margin: 30px;
    .filter-container{
      .filter-item{
        margin-right: 10px;
      }
    }
    .button-container{
      margin: 20px 0;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
