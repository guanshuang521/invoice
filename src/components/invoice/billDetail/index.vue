/**
* @author Linzb
* @date 2019/3/21
* @Description: 发票明细公共组件
*/
<template>
  <el-dialog
    :visible.sync="show"
    title="发票明细"
    width="1070px"
    @close="closeDialog">
    <el-table
      :data="tableData"
      border
      style="width: 1040px;max-height: 600px;overflow-y: scroll">
      <el-table-column prop="index" label="" align="center" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="xmmc"
        label="品名"
        align="left"
        width="250"/>
      <el-table-column
        prop="ggxh"
        label="规格型号"
        align="center"
        width="120"/>
      <el-table-column
        prop="dw"
        label="单位"
        align="center"
        width="100"/>
      <el-table-column
        prop="xmsl"
        label="数量"
        align="center"
        width="100"/>
      <el-table-column
        prop="xmdj"
        label="单价"
        align="center"
        width="100"/>
      <el-table-column
        prop="xmje"
        label="金额"
        align="center"
        width="100"/>
      <el-table-column
        prop="sl"
        label="税率"
        align="center"
        width="100"/>
      <el-table-column
        prop="se"
        label="税额"
        align="center"
        width="100"/>
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
    },
    handleSizeChange() {
    },
    handleCurrentChange() {
    }
  }
}
</script>

<style type="stylesheet/css" lang="scss" scoped>

</style>
