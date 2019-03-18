<template>
  <div class="electronic"><!--手工填开专票 004-->
    <fppm :pmfplx='fplx'></fppm>
  </div>
</template>

<script>
import fppm from 'components/fppiaomian/fppm.vue'

export default {
    name: 'electronic',
    components:{
        fppm
    },
    data(){
        return{
            fplx:this.$store.getters.fplx_ele //电票 026
        }
    },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped> 
.electronic{
    width: 1040px;
    height: 606px;
    border: 1px solid #E0E0E0;
    box-shadow: 0 0 10px #ccc;
    margin: 20px;
}
</style>
