<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-19 17:45:23
 -->
<template>
  <div class="dashboard-container">
    <search-Form :moudel-type="moudelType" :config="queryConditionsForm" :data.sync="searchConditions"/>
    <search-Table
      :data-source="dataSource.list"
      :columns="columns"
      :operation="operation"
      @handleDelete="handleDelete"
      @handleSelectionChange="handleSelectionChange"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SearchForm from '../components/searchForm'
import SearchTable from '../components/searchTable'
import { getOrderlist } from '@/api/order'
import searchconfig from '../components/searchconfig'
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
      queryConditionsForm: [],
      dataSource: {}, // 数据源
      columns: [
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'billCode', // <String>  对应属性名
          label: '单据编号', // <String>   表头标签
          align: 'center',
          width: '100'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'countOrderNum', // <String>  对应属性名
          label: '结算单号', // <String>   表头标签
          align: 'center',
          width: '100'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'datatype', // <String>  对应属性名
          label: '数据类型', // <String>   表头标签
          align: 'center',
          width: '100'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'ordertype', // <String>  对应属性名
          label: '单据类型', // <String>   表头标签
          align: 'center',
          width: '100'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'OrderNum', // <String>  对应属性名
          label: '费用单据编号', // <String>   表头标签
          align: 'center',
          width: '100'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'supplierCode', // <String>  对应属性名
          label: '二级供应商编码', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'money', // <String>  对应属性名
          label: '金额（不含税）', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'se', // <String>  对应属性名
          label: '税额', // <String>   表头标签
          align: 'center',
          width: 200 // 列宽
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'sjhj', // <String>  对应属性名
          label: '价税合计', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'xfsh', // <String>  对应属性名
          label: '销方税号', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'gfmc', // <String>  对应属性名
          label: '购方名称', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'gfsh', // <String>  对应属性名
          label: '购方税号', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'addtel', // <String>  对应属性名
          label: '购方地址电话', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'account', // <String>  对应属性名
          label: '购方开户行及账号', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'transferdate', // <String>  对应属性名
          label: '传输日期', // <String>   表头标签
          align: 'center'
        },
        {
          hasSort: true, // <Boolean> 是否排序
          isShow: true, // <Boolean> 是否展示
          prop: 'bz', // <String>  对应属性名
          label: '备注', // <String>   表头标签
          align: 'center'
        }
      ],
      operation: { // 操作功能
        label: '操作', // 操作列的行首文字
        width: '200', // 操作列的宽度
        className: '', // 操作列的class名
        data: [ // 操作列数据
          {
            label: '删除', // 按钮文字
            Fun: 'handleDelete', // 点击按钮后触发的父组件事件
            size: 'mini', // 按钮大小
            id: '1', // 按钮循环组件的key值
            classname: 'show', // 按钮的类名
            type: 'danger' // 按钮的类型
          }
        ]
      }

    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
    this.queryConditionsForm = searchconfig.queryConditionsForm
  },
  methods: {
    searchSubmit() {
      getOrderlist().then(res => {
        console.log(res)
        this.dataSource = res.data
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
      // this.$message({
      //   message: '方法查询',
      //   type: 'success'
      // })
    },
    handleDelete(a, b) {
      console.log(searchconfig)
    },
    handleSelectionChange(item) {
      var idsStr = ''
      for (var i = 0; i < item.length; i++) {
        idsStr += item[i]['username'] + ','
      }
      console.log(idsStr)
      console.log(123)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    margin: 0px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
