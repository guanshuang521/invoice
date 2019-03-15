<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-15 09:50:49
 * @LastEditTime: 2019-03-15 14:11:04
 -->
<template>
  <div class="searchTable_wrapper">
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[25, 50, 100]"
      :page-size="25"
      :total="50"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
    <span class="demonstration">当前没有记录</span>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SearchTable',
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    handleSizeChange() {
      console.log(124)
    },
    handleCurrentChange() {
      console.log(1243455678)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
