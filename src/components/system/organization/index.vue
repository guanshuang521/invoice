<template>
  <div class="dashboard-editor-container add-edit-info-container">
    <el-form ref="form" :model="terminalInfo" :rules="terminalRules" class="form" label-width="100px" size="mini">
      <el-form-item label="所属税号：" prop="sssh" >
        <el-input v-model="terminalInfo.sssh" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="终端标识：" prop="zdbz" >
        <el-input v-model="terminalInfo.zdbz" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="终端名称：" prop="zdmc" >
        <el-input v-model="terminalInfo.zdmc" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="终端地址：" prop="zddz" >
        <el-input v-model="terminalInfo.zddz" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="终端端口号：" prop="zddkh" >
        <el-input v-model="terminalInfo.zddkh" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="机器编号：" prop="jqbh" >
        <el-input v-model="terminalInfo.jqbh" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="开票类型：" prop="kplx" >
        <el-checkbox-group v-model="terminalInfo.kplx">
          <el-checkbox label="普票" name="pp"/>
          <el-checkbox label="专票" name="zp"/>
          <el-checkbox label="电票" name="dp"/>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {
  },
  props: {
    'terminalInfo': {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      terminalRules: {
        sssh: [
          { required: true, message: '请输入所属税号', trigger: 'blur' }
        ],
        zdbz: [
          { required: true, message: '请输入终端标识', trigger: 'blur' }
        ],
        zdmc: [
          { required: true, message: '请输入终端名称', trigger: 'blur' }
        ],
        zddz: [
          { required: true, message: '请输入终端地址', trigger: 'blur' }
        ],
        zddkh: [
          { required: true, message: '请输入终端端口号', trigger: 'blur' }
        ],
        jqbh: [
          { required: true, message: '请输入机器编号', trigger: 'blur' }
        ],
        kplx: [
          { required: true, message: '请选择开票类型', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    console.log(this.userInfo)
  },
  methods: {
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
