<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-25 15:29:40
 -->
<template>
  <div class="invoice_dialog">
    <el-dialog :visible.sync="dialogFormVisible" title="收货地址" >
      <el-form ref="dynamicValidateForm" :rules="rules" :model="dynamicValidateForm" label-width="120px">
        <el-form-item label="选择订单数">
          <el-input disabled="disabled"/>
        </el-form-item>
        <el-form-item label="合计金额（不含税)">
          <el-input disabled="disabled"/>
        </el-form-item>
        <el-form-item label="合计税额">
          <el-input disabled="disabled"/>
        </el-form-item>
        <el-form-item label="加税合计">
          <el-input disabled="disabled"/>
        </el-form-item>
        <el-form-item label="购方税号" required>
          <el-input/>
        </el-form-item>
        <el-form-item label="购方地址电话">
          <el-input/>
        </el-form-item>
        <el-form-item label="开户行及账号" >
          <el-input/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dynamicValidateForm.email"/>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="dynamicValidateForm.tel"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'InvoiceDialog',
  data() {
    return {
      dialogFormVisible: true,
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: '',
        tel: 'invoice'
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        tel: [
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.invoice {
  &_dialog {
    margin: 0px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
