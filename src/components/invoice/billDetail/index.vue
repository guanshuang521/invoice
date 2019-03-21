/**
* @author Linzb
* @date 2019/3/21
* @Description: 发票明细公共组件
*/
<template>
  <el-dialog
    :visible.sync="show"
    title="发票明细"
    width="80%"
    @close="closeDialog">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180"/>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"/>
      <el-table-column
        prop="address"
        label="地址"/>
    </el-table>
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
    }
  }
}
</script>

<style type="stylesheet/css" lang="scss" scoped>

</style>
