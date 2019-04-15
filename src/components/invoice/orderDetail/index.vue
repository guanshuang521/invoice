/**
* @author Linzb
* @date 2019/4/4
* @Description: 订单明细公共组件
*/
<template>
  <el-dialog
    :visible.sync="show"
    title="订单明细"
    width="1000px"
    @close="closeDialog">
    <el-table
      :data="tableData"
      border
      style="width: 1000px;max-height: 600px;overflow-y: scroll">
      <el-table-column prop="index" label="" align="center" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="djbh"
        label="订单编号"
        align="center"
        width="150"/>
      <el-table-column
        prop="xmmc"
        label="品名"
        align="center"
        width="150"/>
      <el-table-column
        prop="ggxh"
        label="规格型号"
        align="center"
        width="120"/>
      <el-table-column
        prop="dw"
        label="单位"
        align="center"
        width="120"/>
      <el-table-column
        prop="xmsl"
        label="数量"
        align="center"
        width="120"/>
      <el-table-column
        prop="xmdj"
        label="单价"
        align="center"
        width="120"/>
      <el-table-column
        prop="xmje"
        label="金额"
        align="center"
        width="120"/>
      <el-table-column
        prop="sl"
        label="税率"
        align="center"
        width="120"/>
      <el-table-column
        prop="se"
        label="税额"
        align="center"
        width="120"/>
    </el-table>
    <el-pagination
      :total="totalCount"
      :current-page="searchParams.currentPage"
      :page-sizes="[10, 50, 100]"
      :page-size="searchParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </el-dialog>
</template>

<script>
import { getOrderDetail } from '@/api/invoice/inovicePre'

export default {
  name: 'OrderDetail',
  props: {
    'showDialog': {
      type: Boolean,
      default: false
    },
    'currentFpId': {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchParams: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      tableData: [],
      currentId: ''
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
  watch: {
    currentFpId(newVal, oldVal) {
      this.currentId = newVal
      this.initList()
      console.log(newVal + '/' + oldVal)
    }
  },
  methods: {
    initList() {
      console.log(this.currentId)
      const args = Object.assign({}, this.searchParams, { id: this.currentId })
      getOrderDetail(args).then(res => {
        this.tableData = res.data.list
        this.totalCount = res.data.total
      }).catch(err => {
        this.$message.error(err)
      })
    },
    closeDialog() {
      this.$emit('close-dialog', false)
    },
    handleSizeChange(val) {
      this.searchParams.currentPage = 1
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
