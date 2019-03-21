/**
* @author Wujy
* @date 2019/3/21
* @Description:任务设置组件
*/
<template>
  <div>
    <div class="content" style="overflow: hidden">
      <div class="search-item">
        <span>数据类型</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
      <div class="search-item">
        <span>数据源系统</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
      <div class="search-item">
        <span>开始时间</span>
        <el-input v-model="list.se"/>
      </div>
      <div class="search-item">
        <span>结束时间</span>
        <el-input v-model="list.se"/>
      </div>
      <div class="search-item">
        <span>同步频率</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
      <div class="search-item">
        <span>启用状态</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
    </div>
    <div class="button-box">
      <el-button type="primary" size="mini" @click="importExcel">提交</el-button>
      <el-button type="primary" size="mini" @click="importExcel">取消</el-button>
    </div>
  </div>
</template>
<script type="application/ecmascript">
export default {
  props: {
  },
  data() {
    return {
      value: '',
      currentPage: 1,
      pageSize: 25,
      total: 1000,
      showDialog: false,
      options: [{
        value: '01',
        label: '服务类订单'
      }, {
        value: '02',
        label: '商品类订单'
      }],
      list: [
        {
          djsh: '管理员',
          xfmc: 1,
          gfmc: '北京市丰台科技园',
          xfsh: '12433323454',
          gfsh: '23543212343',
          je: '北京银行中关村支行',
          se: '123444321234567876',
          jshj: 0,
          ddzt: 0
        }
      ]
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
    },
    importExcel() { // 关闭弹窗
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
  .el-dialog__body{
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .content{
    margin-left: 10px;
  }
   .search-item{
    float: left;
    margin-bottom: 20px;
    margin-left: 30px;
  }
   .search-item span{
    float: left;
    width: 100px;
    height: 35px;
    text-align: center;
    line-height: 35px;
  }
   .button-box{
    float: left;
    margin-top: 10px;
    margin-left: 34%;
  }
   .el-input__inner{
    width: 140px;
    height: 35px;
  }
   .el-input{
    width: 140px;
    height: 35px;
  }
  .search-item{
    float: left;
    margin-bottom: 20px;
    margin-left: 30px;
  }
  .el-input{
    width: 140px;
    height: 35px;
  }
</style>
