<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="ordinary"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <form>
      <button class="bluebtn" style="margin: 20px 0 0 20px" @click="kaijuBtn">确认开具</button>
      <div class="specialPm">
        <fppm :pmfplx="fplx" @getformdata="pmformdata"/>
      </div>
    </form>
  </div>
</template>

<script>
import fppm from '@/components/fppiaomian'
import { invoice } from '@/api/invoiceOpening/opening'
import { mapGetters } from 'vuex'

export default {
  name: 'Special',
  components: {
    fppm
  },
  data() {
    return {
      fplx: this.$store.getters.fplx_gen, // 普票 004
      // 开具数据
      form: {},
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'org'
    ])
  },
  methods: {
    // 开具
    kaijuBtn() {
      this.loading = true
      const args = Object.assign({}, this.form, {
        xsfNsrsbh: this.org.taxNum,
        xsfMc: this.org.mc,
        xsfDzdh: this.org.zcDzdh,
        xsfYhzh: this.org.khhMczh,
        kpr: this.org.kpr
      })
      invoice(args).then(res => {
        this.loading = false
        this.$message.success(res.message)
      }).catch(err => {
        this.loading = false
        this.$message.error(err)
      })
    },
    pmformdata: function(msg) {
      this.form = msg
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
