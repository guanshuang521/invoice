<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-15 09:50:49
 * @LastEditTime: 2019-03-25 10:36:16
 -->
<template>
  <div class="searchTable_wrapper">
    <el-table
      ref="searchTable"
      :data="dataSource.list"
      tooltip-effect="light"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column label="序号" width="55" align="center">
        <template slot-scope="scope">
          <span style="float: right;">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!--数据源-->
      <el-table-column
        v-for=" column in columns"
        v-show="column.isShow"
        :sortable="column.hasSort"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :align="column.align"
        :height="20"
        :width="column.width"
        show-overflow-tooltip
        header-align="center"/>
      <el-table-column v-if="operation.isShow" label="操作">
        <template slot-scope="scope">
          <el-button
            v-for="item in operation.data"
            :class="item.classname ? item.classname : ''"
            :key="item.id"
            :size="item.size"
            :type="item.type"
            @click.stop="handleOperation(scope.$index, scope.row, item.id)">{{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination_box">
      <el-pagination
        :current-page="dataSource.currentPage"
        :page-sizes="[10, 50, 100]"
        :page-size="dataSource.pageSize"
        :total="dataSource.count"
        layout="prev, pager, next, jumper, total, sizes, slot"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
      <span v-show="dataSource.list&&dataSource.list.length>1" class="hjje">合计金额:{{ dataSource.total }}</span>
      <span v-show="dataSource.list&&dataSource.list.length>1" class="hjse">合计税额:{{ dataSource.total }}</span>
      <span v-show="dataSource.list&&dataSource.list.length>1" class="jshj">加税合计:{{ dataSource.total }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchTable',
  props: {
    dataSource: { // 表格数据源
      type: Object,
      default: () => {}
    },
    columns: { // 表格的字段展示
      type: Array,
      default: () => []
    },
    operation: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', this.multipleSelection)
    },
    handleOperation(a, b, id) {
      const data = this.operation.data
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          this.$emit(data[i].Fun, a, b)
        }
      }
    },
    handleSizeChange(val) {
      this.dataSource.pageSize = val
      this.$parent.getList()
    },
    handleCurrentChange(val) {
      this.dataSource.currentPage = val
      this.$parent.getList()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.searchTable {
  &_wrapper {
     padding: 0 20px;
     background-color: #fff;
     border-top: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    .cell{
      height: 60px;
      line-height: 60px;
    }
}
.el-table__body-wrapper{
  padding-bottom: 25px;
}
.el-table__body tr,
  .el-table__body td{
    padding: 0;
    .cell{
      height: 40px;
      line-height: 40px;
    }
}
.pagination_box{
display: flex;
align-items: center;
.hjje,.hjse,.jshj{
color: #ff0000;
padding-left: 20px;
float: right;
}
.hjje{
  margin-left: 20px;
}
}
  }
}
</style>
