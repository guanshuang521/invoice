<template>
  <div class="special"><!--手工填开专票 004-->
   <form>
        <button class="bluebtn" @click='kaijuBtn'>确认开具</button>
        <div class="specialPm">
            <fppm :pmfplx='fplx' @getformdata='pmformdata'></fppm>
        </div>
   </form>
  </div>
</template>

<script>
import fppm from 'components/fppiaomian/fppm.vue'

export default {
    name: 'special',
    components:{
        fppm
    },
    data(){
        return{
            fplx:this.$store.getters.fplx_spe, //专票 004
            formlist:{},
        }
    },
    computed: {
    },
    methods:{
        kaijuBtn(){
            console.log(this.formlist)
        },
        pmformdata:function(msg){
            this.formlist = msg
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped> 
.specialPm{
    width: 1040px;
    height: 606px;
    border: 1px solid #E0E0E0;
    box-shadow: 0 0 10px #ccc;
    margin: 20px;
}
</style>
