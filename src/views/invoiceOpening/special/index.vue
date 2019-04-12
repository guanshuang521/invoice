<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="special"
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
import { invoice, print } from '@/api/invoiceOpening/opening'
import { mapGetters } from 'vuex'

export default {
  name: 'Special',
  components: {
    fppm
  },
  data() {
    return {
      fplx: this.$store.getters.fplx_spe, // 专票 004
      // 开具数据
      form: {},
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'org',
      'info'
    ])
  },
  methods: {
    // 开具
    kaijuBtn() {
      this.loading = true
      const args = Object.assign({}, this.form, {
        xsfNsrsbh: this.org.nsrsbh,
        xsfMc: this.org.mc,
        xsfDzdh: this.org.zcDzdh,
        xsfYhzh: this.org.khhMczh,
        kpr: this.org.kpr,
        fplx: this.fplx, // 发票类型
        tzpz: '00', // 特殊票种标识
        dybz: '0', // 打印标识
        qdbz: '0', // 清单标识
        zfbz: '0', // 作废标识
        kplx: '0', // 开票类型
        fpDm: '', // 发票代码
        fpHm: '', // 发票号码
        hsbz: '1', // 含税标识
        xsfId: this.org.id, // ？
        xsfBmid: this.org.id, // ？
        xsfBmmc: this.org.name, // ？
        qdbs: '0', // 明细清单
        xsfJgid: this.info.orgId, // 销售方机构id
        xsfJgmc: this.org.name, // 销售方机构名称
        kpzdbs: this.info.kpzdbs, // 开票终端标识 ?
        fplxdm: this.fplx, // 发票类型代码
        // check: true 手工开具必传
        skfplx: '2'
      })
      invoice(args).then(res => {
        this.loading = false
        this.$message.success(res.message)
        this.$confirm(res.message, '提示', {
          confirmButtonText: '打印',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          print().then(res).catch(err)
        })
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
