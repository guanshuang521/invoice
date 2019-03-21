<template>
  <div>
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
      <el-input v-model="searchs.customerTaxNumber"/>
    </div>
    <div class="search-item">
      <span>结束时间</span>
      <el-input v-model="searchs.customerTaxNumber"/>
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
</template>
<script type="application/ecmascript">
export default {
  props: {
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 25,
      total: 1000,
      showDialog: false,
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
    handleClose() { // 关闭弹窗
    }
  }
}
</script>
