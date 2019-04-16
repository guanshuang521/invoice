/**
* @author Linzb
* @date 2019/4/16
* @Description: 发票打印、下载组件
*/
<template>
  <el-dialog :visible.sync="show" title="开具成功" width="400px" custom-class="showPop dialog-wapper pub-min-pop">
    <el-form label-width="120px" size="mini" style="margin: 20px 40px 0 0">
      <el-form-item label="发票代码:" prop="orgCode">
        <el-input v-model="fpData.fpDm"/>
      </el-form-item>
      <el-form-item label="发票号码:" prop="orgName">
        <el-input v-model="fpData.fpHm"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button v-if="fpData.type === 'print'" type="primary" size="mini" @click="print">打印</el-button>
      <el-button v-if="fpData.type === 'download'" type="primary" size="mini" @click="download">下载</el-button>
      <el-button size="mini" @click="dialogVisiblity = !dialogVisiblity">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { download } from '@/api/invoiceOpening/opening'

export default {
  name: 'DownloadOrPrint',
  components: {
    /* 'v-pagination': pagination*/
  },
  props: {
    'show': {
      type: Boolean,
      default: false
    },
    'type': {
      type: String,
      default: ''
    },
    'fpData': {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  mounted: function() {
  },
  methods: {
    print() {},
    download() {
      download().then(res => {
        this.$emit('closeDialog', true)
        this.$message.success(res.message)
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
</style>
