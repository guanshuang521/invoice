/**
* @author Linzb
* @date 2019/4/16
* @Description: 发票打印、下载组件
*/
<template>
  <el-dialog :visible.sync="show" :close-on-click-modal="closeOnClickModal" title="开具成功" width="400px" custom-class="showPop dialog-wapper pub-min-pop">
    <el-form label-width="120px" size="mini" style="margin: 20px 40px 0 0" class="showForm">
      <el-form-item label="发票代码:" prop="orgCode">
        <el-input v-model="fpData.fpDm" readonly style="border: none"/>
      </el-form-item>
      <el-form-item label="发票号码:" prop="orgName">
        <el-input v-model="fpData.fpHm" readonly style="border: none"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button v-if="fpData.type === 'print'" type="primary" size="mini" @click="print">打印</el-button>
      <el-button v-if="fpData.type === 'download'" type="primary" size="mini" @click="download">下载</el-button>
      <el-button size="mini" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { download } from '@/api/invoiceOpening/opening'
import { printFP } from '@/api/invoice/oSpecial'

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
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false
    }
  },
  mounted: function() {
  },
  methods: {
    print() {
      const xml = `<?xml version="1.0" encoding="gbk"?>
    <business id="20004"comment="发票打印">
        <body yylxdm="1">
        <kpzdbs>${this.fpData.terminalMark}</kpzdbs>
        <fplxdm>${this.fpData.fplx}</fplxdm>
        <fpdm>${this.fpData.fpDm}</fpdm>
        <fphm>${this.fpData.fpHm}</fphm>
        <dylx>0</dylx>
        <dyfs>1</dyfs>
        </body>
      </business>`
      console.log(xml)
      const Base64 = require('js-base64').Base64
      const args = '<content>' + Base64.encode(xml) + '</content>'
      printFP(args).then()
    },
    download() {
      console.log(this.fpData)
      const args = {
        fpDm: this.fpData.fpDm,
        fpHm: this.fpData.fpHm,
        jym: this.fpData.jym
      }
      this.$emit('closeDialog', false)
      download(args)
    },
    closeDialog() {
      this.$emit('closeDialog', false)
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .showForm{
    /deep/ .el-input__inner{
      border: none!important;
    }
  }
</style>
