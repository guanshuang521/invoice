<template>
  <div class="dashboard-editor-container add-edit-info-container">
    <el-form ref="form" :model="terminalInfo" :rules="terminalRules" class="form" label-width="100px" size="mini">
      <el-form-item label="所属税号：" prop="taxNum" >
        <el-input v-model="terminalInfo.taxNum" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="终端标识：" prop="terminalMark" >
        <el-input v-model="terminalInfo.terminalMark" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="终端名称：" prop="terminalName" >
        <el-input v-model="terminalInfo.terminalName" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="终端地址：" prop="terminalIp" >
        <el-input v-model="terminalInfo.terminalIp" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="终端端口号：" prop="terminalPort" >
        <el-input v-model="terminalInfo.terminalPort" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="机器编号：" prop="machineCode" >
        <el-input v-model="terminalInfo.machineCode" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="开票类型：" prop="invoiceType" >
        <el-checkbox-group v-model="terminalInfo.invoiceType">
          <el-checkbox label="007" name="invoiceType">普票</el-checkbox>
          <el-checkbox label="004" name="invoiceType">专票</el-checkbox>
          <el-checkbox label="026" name="invoiceType">电票</el-checkbox>
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
