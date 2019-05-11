<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="ordinary"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <form>
      <button class="bluebtn" style="margin: 20px 0 0 20px" @click.prevent="kaijuBtn">确认开具</button>
      <div class="specialPm">
        <fppm :pmfplx="fplx" @getformdata="pmformdata"/>
      </div>
    </form>
    <!--推送弹窗-->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="closeOnClickModal"
      title="发票推送"
      width="400px">
      <el-form ref="sendForm" :model="sendForm" :rules="sendFormRules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="yx">
          <el-input v-model="sendForm.yx" type="text" size="mini"/>
        </el-form-item>
        <el-form-item label="手机号" prop="sjh">
          <el-input v-model="sendForm.sjh" type="text" size="mini"/>
        </el-form-item>
      </el-form>
      <div slot="footer" size="mini" class="dialog-footer" align="center">
        <el-button type="primary" @click="submit">提 交</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <download-or-print :show="xzdyDialogVisible" :fp-data="fpdata" @closeDialog="closeDownload"/>
  </div>
</template>

<script>
import fppm from '@/components/fppiaomian'
import downloadOrPrint from '@/components/downloadOrPrintBill'
import { invoiceEle } from '@/api/invoiceOpening/opening'
import { mapGetters } from 'vuex'

export default {
  name: 'Special',
  components: {
    fppm,
    downloadOrPrint
  },
  data() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      fplx: this.$store.getters.fplx_ele, // 电票 026
      // 开具数据
      form: {},
      loading: false,
      // 发票推送弹窗是否显示
      dialogVisible: false,
      sendForm: {
        yx: '',
        sjh: ''
      },
      sendFormRules: {
        yx: [{
          required: true, message: '邮箱不能为空', trigger: 'blur'
        }],
        sjh: [
          {
            pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur'
          }
        ]
      },
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
    kaijuBtn() {
      let checked = true
      if (!this.form.gmfMc) {
        this.$message.error('购方名称不能为空')
        return
      }
      this.form.lines.forEach((item, key) => {
        if (!item.xmmc) {
          this.$message.error('第' + (key + 1) + '行商品名称不能为空')
          checked = false
        }
        if (!item.xmje) {
          this.$message.error('第' + (key + 1) + '行金额不能为空')
          checked = false
        }
      })
      if (checked) {
        this.dialogVisible = true
      }
    },
    // 开具
    submit() {
      this.$refs['sendForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          const args = Object.assign({}, this.form, {
            // xsfNsrsbh: this.org.taxNum,
            xsfNsrsbh: this.org.taxNum,
            xsfMc: this.org.coName,
            // xsfDzdh: this.org.zcDzdh,
            xsfDzdh: this.org.coAddr + ' ' + this.org.coPhone,
            xsfYhzh: this.org.bankName + ' ' + this.org.bankCode,
            kpr: this.info.userName,
            fplx: this.fplx, // 发票类型
            tzpz: '00', // 特殊票种标识
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
            kpzdbs: this.info.kpzdbs, // 开票终端标识 ?
            fplxdm: this.fplx, // 发票类型代码
            check: true, // 手工开具必传
            skfplx: '2'
          })
          invoiceEle(args).then(res => {
            this.loading = false
            this.dialogVisible = false
            console.log(res)
            this.xzdyDialogVisible = true
            this.fpdata = {
              type: 'download',
              fpDm: res.data.fpDm,
              fpHm: res.data.fpHm,
              fpqqlsh: res.data.fpqqlsh,
              xsfNsrsbh: this.org.taxNum
            }
          }).catch(err => {
            this.loading = false
            this.dialogVisible = false
            this.$message.error(err)
          })
        }
      })
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
