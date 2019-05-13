/**
* @author Wujy
* @date 2019/3/21
* @Description:发票订单信息查询
*/
<template>
  <div>
    <!-- 新增弹窗 -->
    <el-table
      :data="poplist"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" width="39px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="单据编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.djbh }}
        </template>
      </el-table-column>
      <el-table-column label="单据类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.djlx }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购方名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmfMc }}
        </template>
      </el-table-column>
      <el-table-column label="购方税号" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmfNsrsbh }}
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
      <el-table-column label="价税合计" align="center">
        <template slot-scope="scope">
          {{ scope.row.jshj }}
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="100"
        :total="poptotal"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script type="application/ecmascript">
export default {
  name: 'InvoiceDialog',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 25,
      showDialog: false,
      list: []
    }
  },
  mounted() {

  },
  methods: {
    initList() {

    },
    handleSizeChange() {},
    handleCurrentChange() {},
    // 表格选中数据发生变化
    handleSelectionChange(val) {
      this.checkedList = []
      this.checkedList = val
    }
  }
}
</script>
