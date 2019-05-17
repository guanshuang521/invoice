<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="special"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <form>
      <!--<button class="bluebtn" style="margin: 20px 0 0 20px" @click.prevent="kaijuBtn">确认开具</button>-->
      <input type="button" class="bluebtn" style="margin: 20px 0 0 20px" value="确认开具" @click.prevent="kaijuBtn">
      <div class="specialPm">
        <fppm :pmfplx="fplx" @getformdata="pmformdata"/>
      </div>
    </form>
    <download-or-print :show="xzdyDialogVisible" :fp-data="fpdata" @closeDialog="closeDownload"/>
  </div>
</template>

<script>
import fppm from '@/components/fppiaomianFarm'
import downloadOrPrint from '@/components/downloadOrPrintBill'
import { invoice } from '@/api/invoiceOpening/opening'
import { mapGetters } from 'vuex'

export default {
  name: 'Special',
  components: {
    fppm,
    downloadOrPrint
  },
  data() {
    return {
      fplx: this.$store.getters.fplx_gen, // 普票 007
      // 开具数据
      form: {},
      loading: false,
      // 下载打印窗口是否显示
      xzdyDialogVisible: false,
      // 发票信息
      fpdata: {}
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
      // 校验用户是否有终端标识
      if (!this.info.terminalMark) {
        this.$message.error('当前用户没有终端标识，不能开票！')
        return false
      }
      // 校验
      let checked = true
      if (!this.form.gmfMc) {
        this.$message.error('销方名称不能为空')
        return
      }
      if (!this.form.gmfNsrsbh) {
        this.$message.error('销方纳税人识别号不能为空')
        return
      }
      // if (!this.form.gmfDzdh) {
      //   this.$message.error('销方地址、电话不能为空')
      //   return
      // }
      // if (!this.form.gmfYhzh) {
      //   this.$message.error('销方开户行及账号不能为空')
      //   return
      // }
      this.form.lines.forEach((item, key) => {
        if (!item.xmmc) {
          this.$message.error('第' + (key + 1) + '行商品名称不能为空')
          checked = false
        }
        if (!item.xmje) {
          this.$message.error('第' + (key + 1) + '行金额不能为空')
          checked = false
        }
        if (item.xmdj === 0) {
          item.xmdj = null
        }
      })
      if (checked) {
        this.loading = true
        const args = Object.assign({}, this.form, {
          // xsfNsrsbh: this.org.taxNum,
          xsfNsrsbh: this.org.taxNum,
          xsfMc: this.org.coName,
          // xsfDzdh: this.org.zcDzdh,
          xsfDzdh: this.org.coAddr + ' ' + this.org.coPhone,
          xsfYhzh: this.org.bankName + ' ' + this.org.bankCode,
          kpr: this.info.userName,
          fplx: '007', // 发票类型
          tzpz: '02', // 特殊票种标识
          dybz: '0', // 打印标识
          qdbz: '0', // 清单标识
          zfbz: '0', // 作废标识
          kplx: '0', // 开票类型
          fpDm: '', // 发票代码
          fpHm: '', // 发票号码
          hsbz: '0', // 含税标识
          lyxt: 99, // 来源系统
          xsfId: this.org.id, // ？
          xsfBmid: this.org.id, // ？
          xsfBmmc: this.org.name, // ？
          qdbs: '0', // 明细清单
          xsfJgid: this.info.orgId, // 销售方机构id
          xsfJgmc: this.org.name, // 销售方机构名称
          kpzdbs: this.info.terminalMark, // 开票终端标识 ?
          fplxdm: this.fplx, // 发票类型代码
          check: true, // 手工开具必传
          skfplx: '2'
          // lslbs: 1,
          // sl: 0
        })
        // // 商品行信息每项加零税率标识
        // args.lines.forEach((item) => {
        //   item.lslbs = '1'
        // })
        invoice(args).then(res => {
          this.loading = false
          console.log(res)
          this.xzdyDialogVisible = true
          this.fpdata = {
            type: 'print',
            fpDm: res.data.fpDm,
            fpHm: res.data.fpHm,
            fpqqlsh: res.data.fpqqlsh,
            jym: res.data.jym,
            terminalMark: this.info.terminalMark,
            fplx: this.fplx
          }
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      }
    },
    pmformdata: function(msg) {
      this.form = msg
    },
    // 关闭下载弹窗
    closeDownload(msg) {
      console.log(msg)
      this.xzdyDialogVisible = msg
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
