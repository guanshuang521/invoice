<template>
  <div>
    <!-- 新增弹窗 -->
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" width="31px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="发票代码" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerName }}
        </template>
      </el-table-column>
      <el-table-column label="发票号码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customerTaxNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="金额（不含税）" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="税额" align="center">
        <template slot-scope="scope">
          {{ scope.row.contacts }}
        </template>
      </el-table-column>
      <el-table-column label="税价合计" align="center">
        <template slot-scope="scope">
          {{ scope.row.contactNumber }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>
<script type="application/ecmascript">
export default {
  props: {
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 25,
      total: 1000,
      showDialog: false,
      list: [
        {
          djsh: '管理员',
          xfmc: 1,
          gfmc: '北京市丰台科技园',
          xfsh: '12433323454',
          gfsh: '23543212343',
          je: '北京银行中关村支行',
          se: '123444321234567876',
          jshj: 0,
          ddzt: 0
        }
      ]
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
    },
    handleClose() { // 关闭弹窗
    }
  }
}
</script>
