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
      :current-page="searchParams.currentPage"
      :page-sizes="[10, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </el-dialog>
</template>

<script>
import { getOrderDetail } from '@/api/invoice/inovicePre'
export default {
  name: 'BillDetail',
  props: {
    'showDialog': {
      type: Boolean,
      default: false
    },
    'currentFpId': {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchParams: {
        currentPage: 1,
        pageSize: 10
      },
      // 订单列表
      tableData: [],
      // 列表条数
      totalCount: 0
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
    initList() {
      getOrderDetail({ id: this.currentFpId }).then(res => {
        this.tableData = res.data.list
      }).catch(err => {
        this.$message.error(err)
      })
    },
    closeDialog() {
      this.$emit('close-dialog', false)
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val
      this.initList()
    },
    handleCurrentChange(val) {
      this.searchParams.currentPage = val
      this.initList()
    }
  }
}
</script>

<style type="stylesheet/css" lang="scss" scoped>

</style>
