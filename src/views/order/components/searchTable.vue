<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-15 09:50:49
 * @LastEditTime: 2019-03-20 17:00:48
 -->
<template>
  <div class="searchTable_wrapper">
    <el-table
      ref="searchTable"
      :data="dataSource.list"
      tooltip-effect="light"
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
      <el-table-column label="操作">
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
    <el-pagination
      :current-page="dataSource.currentPage"
      :page-sizes="[5, 10, 20, 50,100]"
      :page-size="dataSource.pageSize"
      :total="dataSource.count"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
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
<style rel="stylesheet/scss" lang="scss">
.searchTable {
  &_wrapper {
     padding: 0 20px;
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
  }
}
</style>
