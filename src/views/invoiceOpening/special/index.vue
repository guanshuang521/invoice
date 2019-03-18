<template>
  <div class="special"><!--手工填开专票 004-->
    <fppm :pmfplx='fplx'></fppm>
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
    data(){
        return{
            fplx:this.$store.getters.fplx_spe //专票 004
        }
    },
  computed: {
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
