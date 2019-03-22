<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-22 15:10:54
 -->
<template>
  <div class="dashboard-container">
    <search-Form :moudel-type="moudelType" :config="queryConditionsForm" :data.sync="searchConditions" :data-source="dataSource"/>
    <div class="btn_wrapper">
      <el-button type="primary" icon="el-icon-edit">订单下载</el-button>
      <el-button type="primary" icon="el-icon-circle-check">勾选生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-upload">导出</el-button>
    </div>
    <search-Table
      :data-source="dataSource"
      :columns="columns"
      :operation="operation"
      @handleDelete="handleDelete"
      @handleSelectionChange="handleSelectionChange"/>
    <!--弹框-->
    <el-dialog v-show="showDeldialog" title="删除" size="small">
      <span>确定删除选择的数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDeldialog = false">取 消</el-button>
        <el-button type="primary" @click="showDeldialog = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SearchForm from '../components/searchForm'
import SearchTable from '../components/searchTable'
import { getOrderlist } from '@/api/order'
import orderConfig from '../components/orderConfig'
export default {
  name: 'Dashboard',
  components: { SearchForm, SearchTable },
  data() {
    return {
      moudelType: 'server',
      searchConditions: {
        buyyerName: '',
        supplierCode: '',
        billCode: '',
        countOrderNum: '',
        orderStart: '',
        orderEnd: '',
        dateStart: '',
        dateEnd: '',
        orderState: ''
      },
      queryConditionsForm: [], // 接受的config的查询条件配置的参数
      dataSource: {
        currentPage: 1,
        count: 0,
        pageSize: 5
      }, // 数据源
      columns: [], // 接受的config的配置的参数
      operation: {}, // 接受的config的操作配置的参数
      showDeldialog: true
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
    this.queryConditionsForm = orderConfig.posForm
    this.columns = orderConfig.columns
    this.operation = orderConfig.posOperation
  },
  methods: {
    getList() {
      console.log(this.dataSource)
      getOrderlist().then(res => {
        console.log(res)
        this.dataSource = res.data
        this.$message({
          message: '查询成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    handleDelete(a, b) {
      console.log(orderConfig)
    },
    handleSelectionChange(item) {
      var idsStr = ''
      for (var i = 0; i < item.length; i++) {
        idsStr += item[i]['username'] + ','
      }
      console.log(idsStr)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    margin: 0px;
    .btn_wrapper{
      padding: 10px 20px
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
