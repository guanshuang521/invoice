<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="changePassword-container"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <!--修改密码弹窗-->
    <el-dialog
      :visible.sync="showChangePassword"
      :close-on-click-modal="closeOnClickModal"
      title="修改密码"
      width="400px">
      <el-form ref="xgmmForm" :model="xgmmForm" :rules="xgmmFormRules" label-width="100px" class="demo-ruleForm" size="mini">
        <el-form-item label="原密码：" prop="oldPassword">
          <el-input v-model="xgmmForm.oldPassword" type="password" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input v-model="xgmmForm.newPassword" type="password" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPassword" >
          <el-input v-model="xgmmForm.confirmPassword" type="password" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <div slot="footer" size="mini" class="dialog-footer" align="center">
        <el-button type="primary" size="mini" @click="xgmmSubmit">提 交</el-button>
        <el-button size="mini" @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { changePassword } from '@/api/app'
export default {
  data() {
    const validateConfirm = (rule, value, callback) => {
      console.log(rule)
      console.log(value)
      if (this.xgmmForm.newPassword !== this.xgmmForm.confirmPassword) {
        callback('确认密码应与新密码一致！')
      }
      callback()
    }
    return {
      // 遮罩层
      loading: false,
      // 修改密码弹窗是否显示
      xgmmdialogVisible: false,
      // 点击空白位置不关闭弹窗
      closeOnClickModal: false,
      // 修改密码表单
      xgmmForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      xgmmFormRules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validateConfirm, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'showChangePassword'
    ])
  },
  methods: {
    // 修改密码提交
    xgmmSubmit() {
      this.$refs['xgmmForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          changePassword(this.xgmmForm).then(res => {
            this.loading = false
            this.$message.error(res.message)
            this.closeDialog()
          }).catch(err => {
            this.loading = false
            this.$message.error(err)
          })
        }
      })
    },
    // 关闭弹窗
    closeDialog() {
      this.$store.dispatch('ToggleShowPassword', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    background-color: #ffffff;
    height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        line-height: initial;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .el-dropdown-menu{
    padding: 0!important;
  }
  /deep/ .el-dropdown-menu__item{
    padding: 0!important;
    overflow-x: hidden;
    text-align: center;
  }
</style>

