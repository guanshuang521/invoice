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
          <el-input v-model="searchParams.ssbm" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="商品或服务名称">
          <el-input v-model="searchParams.sphfumc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchFn">查询</el-button>
          <el-button type="primary" size="small" @click="initSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button type="primary" size="mini" @click="importExcel">导入</el-button>
      <el-button type="primary" size="mini" @click="exportExcel">导出</el-button>
      <el-button type="primary" size="mini" @click="importExceldownload">导入摸板下载</el-button>
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
        <el-table-column label="序号" align="center" width="31px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="商品或服务名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.sphfumc }}
          </template>
        </el-table-column>
        <el-table-column label="商品或服务分类简" align="center">
          <template slot-scope="scope">
            {{ scope.row.sphffl }}
          </template>
        </el-table-column>
        <el-table-column label="税收分类编码" align="center">
          <template slot-scope="scope">
            {{ scope.row.ssflbm }}
          </template>
        </el-table-column>
        <el-table-column label="税率" align="center">
          <template slot-scope="scope">
            {{ scope.row.ssl }}
          </template>
        </el-table-column>
        <el-table-column label="说明" align="center">
          <template slot-scope="scope">
            {{ scope.row.sphfumc }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="searchParams.currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="searchParams.pageSize"
        :total="total"
        layout="prev, pager, next, jumper, total, sizes, slot"
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
        accept=".xls,.xlsx"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/">
        <div slot="tip" class="el-upload__tip">选择上传文件</div>
        <el-button slot="trigger" size="mini" type="primary">添加文件</el-button>
        <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">开始上传</el-button>
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
export default {
  data() {
    return {
      searchParams: {
        // 商品分类
        sign: '',
        // 税收编码
        ssbm: '',
        // 商品或服务名称
        sphfumc: '',
        currentPage: 1,
        pageSize: 10
      },
      listLoading: false, // loading
      list: [
        {
          sphfumc: '111',
          sl: '1.2',
          sphffl: '让啊多若',
          ssflbm: '654326',
          splikm: '优惠政策类型',
          id: 0
        },
        {
          sphfumc: '543333',
          sl: '1.2',
          sphffl: '的情况都快疯了',
          ssflbm: '543432',
          splikm: '优惠政策类型',
          id: 1
        }
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
  created() {

  },
  methods: {
    searchFn() { // 查询
      console.log('查询')
    },
    initSearch() { // 重置
      this.searchs = {
        sign: '',
        ssbm: '',
        sphfumc: ''
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    importExcel() { // 导入弹框显示
      this.dialogVisible2 = true
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    importExceldownload() { // 导入摸板下载弹框显示
      this.dialogVisible3 = true
    },
    handleClose() { // 关闭弹窗
      this.dialogVisible2 = false
      this.dialogVisible3 = false
    },
    exportExcel() {
      console.log('导出')
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
      .filter-container {
        margin-bottom: 20px;
      }
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
