<template>
  <div class="ordinary"><!--手工填开专票 004-->
    <fppm :pmfplx="fplx"/>
  </div>
</template>

<script>
import fppm from '@/components/fppiaomian/index'

export default {
  name: 'Ordinary',
  components: {
    fppm
  },
  data() {
    return {
      fplx: this.$store.getters.fplx_gen // 普票 007
    }
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ordinary{
    width: 1040px;
    height: 606px;
    border: 1px solid #E0E0E0;
    box-shadow: 0 0 10px #ccc;
    margin: 20px;
}
</style>
