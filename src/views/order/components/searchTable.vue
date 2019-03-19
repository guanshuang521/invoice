<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-15 09:50:49
 * @LastEditTime: 2019-03-19 09:33:13
 -->
<template>
  <div class="searchTable_wrapper">
    <el-table
      :data="tableData3"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        label="日期"
        width="120">
        <!-- <template scope="scope">{{ scope.row.date }}</template> -->
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
  </div>
</template>

<script>
export default {
  name: 'SearchTable',
  data() {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
