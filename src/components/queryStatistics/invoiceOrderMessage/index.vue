/**
* @author Wujy
* @date 2019/3/21
* @Description:发票订单信息查询
*/
<template>
  <div>
    <!-- 新增弹窗 -->
    <el-table
      :data="list"
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
          <span>{{ SYS_DJLX[scope.row.djlx] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购方名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.gfmc }}
        </template>
      </el-table-column>
      <el-table-column label="购方税号" align="center">
        <template slot-scope="scope">
          {{ scope.row.gfsh }}
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
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script type="application/ecmascript">
import { orderInfo } from '@/api/queryStatistics/orderOpenMessage'
import { mapGetters } from 'vuex'
import { arrayToMapField } from '@/utils/public'

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
      showDialog: false,
      list: [],
      searchParams: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: ''
    }
  },
  computed: {
    ...mapGetters([
      'dictList',
      'org',
      'info'
    ]),
    SYS_DJLX() {
      return arrayToMapField(this.dictList['SYS_DJLX'], 'code', 'name')
    }
  },
  mounted() {
    this.initList()
  },
  methods: {
    initList() {
      const params = Object.assign({}, this.searchParams)
      params.invoiceId = this.id
      orderInfo(params).then(res => {
        console.log(res)
        this.list = res.data.data.list
        this.totalCount = res.data.data.total
      }).catch(err => {
        this.$message.error(err)
      })
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
