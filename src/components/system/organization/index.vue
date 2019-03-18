<template>
  <div class="dashboard-editor-container add-edit-info-container">
    <el-form ref="form" :model="userInfo" :rules="rules" class="form" label-width="100px">
      <el-form-item label="任务名称：" prop="title" >
        <el-input v-model="userInfo.title" placeholder="长度不超过50"/>
      </el-form-item>
      <el-form-item label="呼叫组：" prop="gid" >
        <el-select v-model="userInfo.gid" placeholder="请选择呼叫组" style="width: 100%" clearable filterable>
          <el-option v-for="item in gidList" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="执行方式：" prop="mode" style="margin-bottom: 0!important;">
        <el-radio-group v-model="userInfo.mode">
          <el-radio label="auto">预约执行</el-radio>
          <el-radio label="manually">手动执行</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="userInfo.mode == 'auto'" style="margin-top: 0;margin-bottom: 12px!important;line-height:16px">
        <p style="font-size: 12px;color: #747474;margin: 0">设置预约执行时间，系统自动导入号码，到期后自动执行任务</p>
      </el-form-item>
      <el-form-item v-if="userInfo.mode == 'manually'" style="margin-top: 0;margin-bottom: 12px!important;line-height:16px">
        <p style="font-size: 12px;color: #747474;margin: 0">任务创建者自己导入号码，需手动启动任务方可执行</p>
      </el-form-item>
      <el-form-item v-if="isStartTimeShow" label="执行时间：" prop="startTime">
        <el-date-picker v-model="userInfo.startTime" :picker-options="pickerOptions0" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input v-model="userInfo.description" type="textarea" rows="4" resize="none" placeholder="长度不超过200"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {
  },
  props: ['userInfo', 'gidList'],
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入任务名称' },
          { min: 1, max: 50, message: '长度不超过50', trigger: 'blur' }
        ],
        mode: [
          { required: true, message: '请选择执行方式', trigger: 'change' }
        ],
        gid: [
          { required: true, message: '请选择呼叫组', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请输入时间', trigger: 'change' }
        ],
        description: [
          { min: 1, max: 200, message: '长度不超过200', trigger: 'blur' }
        ]
      },
      isEditPassword: true,
      rolesInfo: {},
      isStartTimeShow: this.userInfo.mode == 'auto',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function() {
      // `this` 指向 vm 实例
      return this.isEdit
    },
    mode: function() {
      return this.userInfo.mode
    }
  },
  watch: {
    mode(newValue, oldValue) {
      if (newValue == 'auto') {
        this.isStartTimeShow = true
      } else {
        this.isStartTimeShow = false
        this.userInfo.startTime = null
      }
    }
  },
  beforeUpdate() {

  },
  created() {
    console.log(this.userInfo)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    rolesFun(param) {
      this.userInfo.roles = param
    },
    changePassword() {
      this.isEditPassword = !this.isEditPassword
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    .form {
      padding: 16px 16px 0;
    }
    .btns{ text-align: center;}
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .add-edit-info-container{
    background: #fff;
  }
</style>
