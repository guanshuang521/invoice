<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-15 09:50:49
 * @LastEditTime: 2019-03-19 14:34:09
 -->
<template>
  <div class="searchTable_wrapper">
    <el-table
      ref="refTable"

      :data="dataSource"
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange"
      @expand-change="expandChange"
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
        :width="column.width"
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
    </el-table-column></el-table>
</div></template>

<script>
export default {
  name: 'SearchTable',
  props: {
    dataSource: { // 表格数据源
      type: Array,
      default: () => []
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
      var idsStr = ''
      for (var i = 0; i < this.multipleSelection.length; i++) {
        idsStr += this.multipleSelection[i]['username'] + ','
      }
      console.log(idsStr)
    },
    expandChange() {
      console.log('wwww')
    },
    handleOperation(a, b, id) {
      const data = this.operation.data
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          this.$emit(data[i].Fun, a, b)
        }
      }
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.searchTable {
  &_wrapper {
     padding: 20px;
  }
}
</style>
