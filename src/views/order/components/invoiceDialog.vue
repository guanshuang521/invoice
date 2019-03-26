<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-13 10:10:12
 * @LastEditTime: 2019-03-25 18:01:12
 -->
<template>
  <div class="invoice_dialog">
    <el-dialog :visible.sync="ishow" :before-close="hideDialog" title="预制发票">
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
        <el-form-item label="预制发票类型" prop="ydzfpType">
          <el-select v-model="dynamicValidateForm.ydzfpType" placeholder="请选择预制发票类型">
            <el-option v-for="option in dynamicValidateForm.options" :key="option.id" :value="option.id" :label="option.text"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="moudelType ==='pos'" label="购方名称" prop="gfmc">
          <el-select v-model="dynamicValidateForm.gfmc" placeholder="请选择购方名称">
            <el-option v-for="option in dynamicValidateForm.options" :key="option.id" :value="option.id" :label="option.text"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="moudelType ==='pos'" label="购方税号" prop="gfsh">
          <el-input v-model="dynamicValidateForm.gfsh"/>
        </el-form-item>
        <el-form-item v-if="moudelType ==='pos'" label="购方地址电话">
          <el-input v-model="dynamicValidateForm.address" />
        </el-form-item>
        <el-form-item v-if="moudelType ==='pos'" label="开户行及账号" >
          <el-input v-model="dynamicValidateForm.khhinfo" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dynamicValidateForm.email"/>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="dynamicValidateForm.tel"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
    }
  },
  data() {
    return {
    //   dialogFormVisible: true,
      dynamicValidateForm: {
        gfmc: '',
        options: [
          {
            id: 0,
            text: '快车'
          },
          {
            id: 1,
            text: '专车'
          },
          {
            id: 2,
            text: '顺风车'
          },
          {
            id: 3,
            text: '出租车'
          }
        ],
        ydzfpType: '',
        gfsh: '',
        khhinfo: '',
        address: '',
        email: '',
        tel: ''
      },
      rules: {
        ydzfpType: [
          { required: true, message: '请选择预制发票类型', trigger: 'blur' }
        ],
        gfmc: [
          { required: true, message: '请选择购方名称', trigger: 'blur' }
        ],
        gfsh: [
          { required: true, message: '请输入购方税号', trigger: 'blur' }
        ],
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
          this.$emit('makeInvoicePre', this.dynamicValidateForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    hideDialog() {
      this.$emit('hideDialog')
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
