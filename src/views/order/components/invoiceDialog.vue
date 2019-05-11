<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-26 11:10:07
 -->
<template>
  <div class="invoice_dialog" >
    <el-dialog :visible.sync="ishow" :close-on-click-modal="closeOnClickModal" :before-close="hideDialog" :title="dialogTitle" width="450px">
      <el-form ref="dynamicValidateForm" :rules="rules" :model="dynamicValidateForm" label-width="110px" size="mini">
        <el-form-item label="选择订单数">
          <el-input v-if="dialogTitle == '同一购方订单生成预制发票'" v-model="buildPop.num" disabled="disabled"/>
          <el-input v-if="dialogTitle !== '同一购方订单生成预制发票'" v-model="makePopData.num" disabled="disabled"/>
        </el-form-item>
        <el-form-item label="合计金额（不含税)">
          <el-input v-if="dialogTitle == '同一购方订单生成预制发票'" v-model="buildPop.hjje" disabled="disabled"/>
          <el-input v-if="dialogTitle !== '同一购方订单生成预制发票'" v-model="makePopData.hjje" disabled="disabled"/>
        </el-form-item>
        <el-form-item label="合计税额">
          <el-input v-if="dialogTitle == '同一购方订单生成预制发票'" v-model="buildPop.hjse" disabled="disabled"/>
          <el-input v-if="dialogTitle !== '同一购方订单生成预制发票'" v-model="makePopData.hjse" disabled="disabled"/>
        </el-form-item>
        <el-form-item label="价税合计">
          <el-input v-if="dialogTitle == '同一购方订单生成预制发票'" v-model="buildPop.jshj" disabled="disabled"/>
          <el-input v-if="dialogTitle !== '同一购方订单生成预制发票'" v-model="makePopData.jshj" disabled="disabled"/>
          <!--<el-input v-model="buildPop.jshj" disabled="disabled"/>-->
        </el-form-item>
        <el-form-item label="预制发票类型" prop="fplx">
          <el-select v-model="dynamicValidateForm.fplx" placeholder="请选择预制发票类型">
            <el-option v-for="option in dictList['SYS_FPLX']" :key="option.id" :value="option.code" :label="option.name"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dynamicValidateForm.fplx=='004'" label="备用发票类型" prop="byfplx">
          <el-select v-model="dynamicValidateForm.byfplx" placeholder="请选择备用发票类型" style="width: 100%">
            <el-option value ="007">普票</el-option>
            <el-option value ="026">电票</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="gmfSjh">
          <el-input v-model="dynamicValidateForm.gmfSjh"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="hideDialog">取 消</el-button>
        <el-button v-if="dialogTitle !== '同一购方订单生成预制发票'" size="mini" type="primary" @click="submitAllForm('dynamicValidateForm')">确 定</el-button>
        <el-button v-if="dialogTitle === '同一购方订单生成预制发票'" type="primary" size="mini" @click="submitForm('dynamicValidateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { dobuildInvoiceGmf, dobuildInvoiceIds } from '@/api/order'
export default {
  name: 'InvoiceDialog',
  props: {
    moudelType: {
      type: String,
      default: () => ''
    },
    ishow: {
      type: Boolean,
      default: () => false
    },
    buildPop: { // 表格数据源
      type: Object,
      default: () => {}
    },
    makePopData: { // 表格数据源
      type: Object,
      default: () => {}
    },
    dialogTitle: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      // 弹窗标题
      dynamicValidateForm: {
        ids: '',
        fplx: '',
        byfplx: '',
        gmfDzyx: '',
        gmfSjh: '',
        hjje: '',
        jshj: '',
        hjse: ''
      },
      rules: {
        fplx: [
          { required: true, message: '请选择预制发票类型', trigger: 'blur' }
        ],
        byfplx: [
          { required: true, message: '请选择备用发票类型', trigger: 'blur' }
        ],
        gmfDzyx: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        gmfSjh: [
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'roles', 'dictList'])
  },
  mounted() {
  },
  methods: {
    // 同一购方确定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('makeInvoicePre', this.dynamicValidateForm)
          const args = Object.assign({}, this.dynamicValidateForm)
          args.ids = this.buildPop.ids
          args.hjje = this.buildPop.hjje
          args.hjse = this.buildPop.hjse
          args.jshj = this.buildPop.jshj
          args.gmfDzdh = this.buildPop.gmfDzdh
          args.gmfMc = this.buildPop.gmfMc
          args.gmfNsrsbh = this.buildPop.gmfNsrsbh
          args.gmfYhzh = this.buildPop.gmfYhzh
          this.loading = true
          console.log(args)
          dobuildInvoiceGmf(args).then(response => {
            this.loading = false
            this.$message({
              type: 'success',
              message: response.message
            })
            this.$emit('hideDialog', false)
          }).catch(err => {
            this.loading = false
            this.$message({
              type: 'error',
              message: err.message
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 勾选生成发票确定
    submitAllForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('makeInvoicePre', this.dynamicValidateForm)
          const args = Object.assign({}, this.dynamicValidateForm)
          args.ids = this.makePopData.ids
          args.hjje = this.makePopData.hjje
          args.hjse = this.makePopData.hjse
          args.jshj = this.makePopData.jshj
          args.gmfDzdh = this.makePopData.gmfDzdh
          args.gmfMc = this.makePopData.gmfMc
          args.gmfNsrsbh = this.makePopData.gmfNsrsbh
          args.gmfYhzh = this.makePopData.gmfYhzh
          this.loading = true
          console.log(args)
          dobuildInvoiceIds(args).then(response => {
            this.loading = false
            this.$message({
              type: 'success',
              message: response.message
            })
            this.$emit('hideDialog', false)
          }).catch(err => {
            this.loading = false
            this.$message({
              type: 'error',
              message: err.message
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    hideDialog() {
      this.$emit('hideDialog', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.invoice {
  &_dialog {
    margin: 0px;
  }
}
</style>
