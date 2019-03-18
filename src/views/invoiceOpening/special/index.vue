<template>
  <div class="special"><!--手工填开专票-->
    <!--<div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <fppm></fppm>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fppm from 'components/fppiaomian/fppm.vue'

export default {
    name: 'special',
    components:{
        fppm
    },
  computed: {
    /*
    *    ...取出参数对象(mapGetters)中的所有可遍历属性，拷贝到当前对象之中
    *    mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
    */
    ...mapGetters([
    /*
        name: state => state.user.name,
        roles: state => state.user.roles,
    */
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/*
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
*/
    
.special{
    width: 1040px;
    height: 606px;
    border: 1px solid #E0E0E0;
    box-shadow: 0 0 10px #ccc;
    margin: 20px;
}
</style>
