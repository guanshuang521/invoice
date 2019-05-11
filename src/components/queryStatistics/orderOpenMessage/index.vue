/**
* @author Wujy
* @date 2019/3/21
* @Description:订单开票信息查询
*/
<template>
  <div>
    <!-- 新增弹窗 -->
    <el-table
      :data="tableList"
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
          {{ scope.row.fpDm }}
        </template>
      </el-table-column>
      <el-table-column label="发票号码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fpHm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.fplx }}
        </template>
      </el-table-column>
      <el-table-column label="金额（不含税）" align="center">
        <template slot-scope="scope">
          {{ scope.row.hjje }}
        </template>
      </el-table-column>
      <el-table-column label="税额" align="center">
        <template slot-scope="scope">
          {{ scope.row.hjse }}
        </template>
      </el-table-column>
      <el-table-column label="税价合计" align="center">
        <template slot-scope="scope">
          {{ scope.row.jshj }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.bz }}
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        :current-page = "tableCur"
        :page-sizes = "[1, 10, 20, 30, 50, 100]"
        :page-size = "tableSize"
        :total = "tableTotal"
        style="margin-top: 20px"
        layout = "total, sizes, prev, pager, next, jumper"
        @size-change = "handleSizeChange"
        @current-change = "handleCurrentChange"/>
    </div>
  </div>
</template>
<script type="application/ecmascript">
export default {
  props: {
    tableList: Array,
    tableTotal: Number
  },
  data() {
    return {
      tableCur: 1,
      tableSize: 25,
      showDialog: false,
      list: [
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
      this.$emit('TablePagesizeChange', val)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.$emit('TableCurrentChange', val)
      console.log(`当前页: ${val}`)
    },
    handleClose() { // 关闭弹窗
    }
  }
}
</script>
