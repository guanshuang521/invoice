/**
* @author Linzb
* @date 2019/3/21
* @Description: 发票明细公共组件
*/
<template>
  <el-dialog
    :visible.sync="show"
    title="发票明细"
    width="1000px"
    @close="closeDialog">
    <el-table
      :data="tableData"
      border
      style="width: 1000px">
      <el-table-column prop="index" label="" align="center" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="品名"
        align="center"
        width="150"/>
      <el-table-column
        prop="date"
        label="规格型号"
        align="center"
        width="120"/>
      <el-table-column
        prop="date"
        label="单位"
        align="center"
        width="120"/>
      <el-table-column
        prop="date"
        label="数量"
        align="center"
        width="120"/>
      <el-table-column
        prop="date"
        label="单价"
        align="center"
        width="120"/>
      <el-table-column
        prop="date"
        label="金额"
        align="center"
        width="120"/>
      <el-table-column
        prop="date"
        label="税率"
        align="center"
        width="120"/>
      <el-table-column
        prop="date"
        label="税额"
        align="center"
        width="120"/>
    </el-table>
    <el-pagination
      :total="totalCount"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </el-dialog>
</template>

<script>
export default {
  name: 'BillDetail',
  props: {
    'showDialog': {
      type: Boolean,
      default: false
    },
    'tableData': {
      type: [Array, Object],
      required: true
    },
    'totalCount': {
      type: Number,
      default: 0
    },
    'currentPage': {
      type: Number,
      default: 1
    },
    'pageSize': {
      type: Number,
      default: 10
    }
  },
  computed: {
    show: {
      get: function() {
        return this.showDialog
      },
      set: function() {
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog', false)
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style type="stylesheet/css" lang="scss" scoped>

</style>
