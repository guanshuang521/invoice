/**
* @author Linzb
* @date 2019/3/25
* @Description: 开票弹窗组件
*/
<template>
  <div class="invoiceDialog-container">
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="开具"
      width="600px">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">开 具</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped>

</style>
