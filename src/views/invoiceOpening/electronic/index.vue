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
    <!--推送弹窗-->
    <el-dialog
      :visible.sync="dialogVisible"
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
  </div>
</template>

<script>
import fppm from '@/components/fppiaomian'
import { invoiceEle } from '@/api/invoiceOpening/opening'
import { mapGetters } from 'vuex'

export default {
  name: 'Special',
  components: {
    fppm
  },
  data() {
    return {
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
          },
          {
            required: true, message: '手机号码不能为空', trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'org'
    ])
  },
  methods: {
    kaijuBtn() {
      this.dialogVisible = true
    },
    // 开具
    submit() {
      this.$refs['sendForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          const args = Object.assign({}, this.form, this.sendForm, {
            xsfNsrsbh: this.org.nsrsbh,
            xsfMc: this.org.mc,
            xsfDzdh: this.org.zcDzdh,
            xsfYhzh: this.org.khhMczh,
            kpr: this.org.kpr
          })
          invoiceEle(args).then(res => {
            this.loading = false
            this.dialogVisible = false
            this.$message.success(res.message)
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
