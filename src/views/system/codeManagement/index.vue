/**
* @author Dongyt
* @date 2019/3/27
* @Description: 税收分类编码管理
*/
<template>
  <div class="codeManagement-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="商品分类">
          <el-select v-model="searchParams.sign" placeholder="请选择" size="small">
            <el-option label="已开具" value="1"/>
            <el-option label="未开具" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="税收编码">
          <el-input v-model="searchParams.shflbm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="商品或服务名称">
          <el-input v-model="searchParams.spmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchFn">查询</el-button>
          <el-button type="primary" size="small" @click="initSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button type="primary" size="mini" @click="importExcel">导入</el-button>
      <el-button type="primary" size="mini" @click="exportData">导出</el-button>
      <el-button type="primary" size="mini" @click="exportModle">导入模板下载</el-button>
    </div>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="80px"/>
        <el-table-column label="序号" align="center" width="50px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="商品或服务名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.shflmc }}
          </template>
        </el-table-column>
        <el-table-column label="商品或服务分类简称" align="center">
          <template slot-scope="scope">
            {{ scope.row.jm }}
          </template>
        </el-table-column>
        <el-table-column label="税收分类编码" align="center">
          <template slot-scope="scope">
            {{ scope.row.shflbm }}
          </template>
        </el-table-column>
        <el-table-column label="税率" align="center">
          <template slot-scope="scope">
            {{ scope.row.sl }}
          </template>
        </el-table-column>
        <el-table-column label="说明" align="center">
          <template slot-scope="scope">
            {{ scope.row.spsm }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="searchParams.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="searchParams.pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
        <!-- <span></span> -->
      </el-pagination>
    </div>
    <!-- 导入弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible2"
      :before-close="handleClose"
      title="客户基础信息导入"
      width="350px"
      custom-class="add-customer">
      <el-upload
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :action="uploadPath()"
        accept=".xls,.xlsx"
        class="upload-demo">
        <div slot="tip" class="el-upload__tip">选择上传文件</div>
        <el-button slot="trigger" size="small" type="primary">添加文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
      </el-upload>
    </el-dialog>
    <!--导入模板下载-->
    <el-dialog
      :visible.sync="dialogVisible3"
      :before-close="handleClose"
      title="税收分类编码导入模板.xlsx"
      width="30%">
      <span>税收分类编码导入模板.xlsx</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="Determineclick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { commodictList } from '@/api/system/codeManagement'
import apiPath from '@/api/apiUrl'
export default {
  data() {
    return {
      searchParams: {
        // 商品分类
        sign: '',
        // 税收编码
        shflbm: '',
        // 商品或服务名称
        spmc: '',
        currentPage: 1,
        pageSize: 10
      },
      listLoading: false, // loading
      list: [
      ],
      checkedList: [],
      currentPage: 1,
      pageSize: 25,
      total: 0,
      dialogVisible2: false,
      dialogVisible3: false,
      fileList: []
    }
  },
  mounted() {
    this.$store.getters.isAutoLoadData ? this.getList() : ''
  },
  methods: {
    searchFn() { // 查询
      this.getList()
    },
    getList() { // 获取数据列表
      this.loading = true
      commodictList(this.searchParams).then(res => {
        this.loading = false
        if (res.code === '0000') {
          this.list = res.data.list
          this.total = res.data.count
        }
      }).catch(e => {
        this.$message({
          message: '网络错误，请稍后再试',
          type: 'error'
        })
        this.loading = false
      })
    },
    initSearch() { // 重置
      this.searchParams = {
        sign: '',
        // 税收编码
        shflbm: '',
        // 商品或服务名称
        spmc: '',
        ssflbm: '',
        spmc: '',
        currentPage: 1,
        pageSize: 10
      }
      this.getList()
    },
    handleSizeChange(val) { // 改变单页条数
      this.searchParams.currentPage = 1
      this.searchParams.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) { // 改变页码
      this.searchParams.currentPage = val
      this.getList()
    },
    exportData() { // 导出数据
      const url = apiPath.system.codeManagement.exportData + '?spbm=' + this.searchParams.spbm + '&spmc=' + this.searchParams.spmc
      window.open(url)
    },
    exportModle() { // 导出模板
      window.open(apiPath.system.codeManagement.exportModle)
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    importExcel() { // 导入Excel表格
      this.dialogVisible2 = true
    },
    submitUpload() { // 开始上传按钮
      this.loading = true
      this.$refs.upload.submit()
    },
    uploadSuccess(res, file, fileList) { // 上传成功后的回调
      this.loading = false
      this.$message({
        message: res.message,
        type: res.code === '0000' ? 'success' : 'error'
      })
      res.code === '0000' ? this.dialogVisible2 = false : this.$refs.upload.clearFiles()
      this.getList()
    },
    uploadError(res, file, fileList) { // 上传错误
      this.loading = false
      this.$message({
        message: '网络错误，请稍后再试',
        type: 'error'
      })
      this.dialogVisible2 = false
      this.getList()
    },
    uploadPath() { // 上传地址
      return apiPath.system.codeManagement.importExcel
    },
    handleClose() { // 关闭弹窗
      this.dialogVisible2 = false
      this.dialogVisible3 = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    Determineclick() { // 点击确定
      console.log(6666)
      this.dialogVisible3 = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .codeManagement {
    &-container {
      margin: 30px;
      .button-container {
        margin-bottom: 20px;
      }
      .authTree {
        border: 1px solid #eeeeee;
        width: 454px;
        max-height: 200px;
        overflow-y: scroll;
      }
    }
  }
</style>
