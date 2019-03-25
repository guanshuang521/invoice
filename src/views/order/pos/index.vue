<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-25 15:33:44
 -->
<template>
  <div class="dashboard-container">
    <search-Form :moudel-type="moudelType" :config="queryConditionsForm" :data.sync="searchConditions" :data-source="dataSource"/>
    <div class="btn_wrapper">
      <el-button type="primary" icon="el-icon-edit" @click="orderDownload">订单下载</el-button>
      <el-button type="primary" icon="el-icon-circle-check">勾选生成预制发票</el-button>
      <el-button type="primary" icon="el-icon-upload">导出</el-button>
    </div>
    <search-Table
      :data-source="dataSource"
      :columns="columns"
      :operation="operation"
      @handleDelete="handleDelete"
      @handleSelectionChange="handleSelectionChange"/>
    <!-- <el-dialog :visible.sync="dialogFormVisible" title="收货地址">
      <el-form>
        <el-form-item label="活动名称">
          <el-input/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
    <Invoicedialog/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SearchForm from '../components/searchForm'
import SearchTable from '../components/searchTable'
import orderConfig from '../components/orderConfig'
import Invoicedialog from '../components/invoiceDialog'
import { getOrderlist } from '@/api/order'

export default {
  name: 'Dashboard',
  components: { SearchForm, SearchTable, Invoicedialog },
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
      dialogFormVisible: true
    //   dynamicValidateForm: {
    //     domains: [{
    //       value: ''
    //     }],
    //     email: '',
    //     tel: 'invoice'
    //   },
    //   rules: {
    //     email: [
    //       { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    //       { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    //     ],
    //     tel: [
    //       { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
    //     ]
    //   }
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
    // 获取查询列表
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
    // 订单下载
    orderDownload() {
      this.$prompt('开票码', '下载POS订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 选中复选框
    handleSelectionChange(item) {
      var idsStr = ''
      for (var i = 0; i < item.length; i++) {
        idsStr += item[i]['username'] + ','
      }
      console.log(idsStr)
    },
    // 删除操作
    handleDelete(a, b) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
