<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-15 09:50:29
 * @LastEditTime: 2019-03-21 17:31:50
 -->

<template>
  <div class="searchForm_wrapper">
    <el-form ref="data" :model="data" :inline="true" label-width="120px" size="mini" class="demo-form-inline" >
      <el-form-item v-for="(item,index) in config" v-show="index<3 || ishow" :label="item.title" :key="item.code" :prop="item.code" class="table-header-item">
        <el-select v-if="item.type === 'select'" v-model="data[item.code]" :placeholder="`请选择${item.title}`">
          <el-option v-for="option in item.options" :key="option.id" :value="option.id" :label="option.text"/>
        </el-select>
        <el-form-item v-else-if="item.type === 'datepicker'" class="fixedclass">
          <el-col :span="11">
            <el-form-item :prop="item.code1">
              <el-date-picker v-model="data[item.code1]" type="date" value-format="yyyyMMdd" placeholder="请选择日期" style="width: 100%; margin-right:0px;"/>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="line" style="text-align:center;padding-right:10px;">-</el-col>
          <el-col :span="11">
            <el-form-item :prop="item.code2">
              <el-date-picker v-model="data[item.code2]" value-format="timestamp" type="date" placeholder="请选择日期" style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item v-else-if="item.type === 'button'" style="padding-left:100px;margin-bottom:0px;">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="reset('data')">重置</el-button>
          <el-button v-show="config.length>3" type="primary" @click="more">{{ moreInfo }}</el-button>
        </el-form-item>
        <el-input v-else v-model="data[item.code]" :placeholder="`请输入${item.title}`"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
/**
 * search条件
 * html使用全局组件： <search-Form  :moudel-type="moudelType" :config="queryConditionsForm" v-on:click="close"></search-Form>
 * 传入参数：
 * moudelType 字符串 区分不同页面
 * queryConditionsForm: [
 *      {
 *         title: '购方名称',   //显示标题
 *         type：  'select/datepicker/input' 创建类型input可不传
 *         code: 'value'        //传值 默认值
 *         code1： ‘value’      //传值  datepicker专用传值
 *         code2：‘value        //传值  datepicker专用传值
 *         options: [{   //type为select时用的下拉选项传值
 *              id: 0,      // value
 *             text: ''  // label
 *          }]
 *       },
 *
 *补充信息：查询方法在父组件中写命名为getList
 */
export default {
  name: 'SearchForm',
  props: {
    moudelType: {
      type: String,
      default: ''
    },
    config: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => {}
    },
    dataSource: { // 表格数据源
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ishow: false,
      moreInfo: '更多条件'
    }
  },
  mounted() {
    this._copy = Object.assign({}, this.data)
  },
  methods: {
    onSubmit() {
      this.$parent.getList()
    },
    reset(data) {
      this.$nextTick(() => {
        this.$refs[data].resetFields()
        // this.$emit('update:data', Object.assign({}, this._copy))
        // this.onSubmit()
        this.dataSource.list = []
        this.dataSource.currentPage = 1
        this.dataSource.count = 0
        this.$message({
          message: '查询条件重置成功',
          type: 'success'
        })
      })
    },
    more() {
      this.ishow = !this.ishow
      this.moreInfo = this.ishow ? '收起条件' : '更多条件'
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.searchForm {
  &_wrapper {
    padding: 20px 20px 0  20px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    background-color: #fff;
    .fixedclass.el-form-item--mini.el-form-item{
      margin-bottom: 0px !important;
      .el-col-11 .el-form-item.el-form-item--mini{
          margin-bottom: 0px !important;
      }
    }
    .el-col .el-form-item__content .el-input--suffix .el-input__inner{
    padding-right: 12px !important;
  }
   .el-input--suffix .el-input__inner{
    padding-right: 15px !important;
  }
  }
}
</style>
