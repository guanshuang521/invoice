/**
* @author Linzb
* @date 2019/4/1
* @Description: 开票规则模板
*/
<template>
  <div class="template-container">
    <div class="button-container">
      <el-button type="primary" size="mini" class="dashboard-button" @click="dialogFormVisible = true">新增</el-button>
      <el-button type="primary" size="mini" class="dashboard-button" @click="dialogVisible = true">删除</el-button>
    </div>
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="tableList"
        border
        fit
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="35" align="center"/>
        <el-table-column
          prop="index"
          label="序号"
          align="center"
          width="50"/>
        <el-table-column
          prop="ruleName"
          label="模板名称"
          align="center"
          width="100"/>
        <el-table-column
          prop="ruleName"
          label="按相同大类合并"
          align="center"
          width="175"/>
        <el-table-column
          prop="ruleName"
          label="按相同税率合并"
          align="center"
          width="175"/>
        <el-table-column
          prop="ruleName"
          label="按相同品名合并"
          align="center"
          width="175"/>
        <el-table-column
          prop="ruleName"
          label="正负合并"
          align="center"
          width="100"/>
        <el-table-column
          prop="ruleName"
          label="按相同单价合并"
          align="center"
          width="175"/>
        <el-table-column
          prop="ruleName"
          label="清单标识"
          align="center"
          width="100"/>
        <el-table-column
          prop="ruleName"
          label="发票明细限制行数"
          align="center"
          width="200"/>
        <el-table-column
          prop="ruleName"
          label="启用状态"
          align="center"
          width="100"/>
      </el-table>
      <el-pagination
        :current-page = "searchParams.currentPage"
        :page-sizes = "[10, 20, 30, 40]"
        :page-size = "100"
        :total = "400"
        style="margin-top: 20px"
        layout = "total, sizes, prev, pager, next, jumper"
        @size-change = "handleSizeChange"
        @current-change = "handleCurrentChange"/>
    </div>
    <!--新增规则弹框-->
    <el-dialog :visible.sync="dialogFormVisible" title="新增规则" width="720px">
      <el-form :model="templateForm" :ref="templateForm" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="模板名称" class="dashboard-selectBox" prop="ruleName">
          <el-input v-model="templateForm.ruleName "/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="按相同大类合并" class="dashboard-selectBox">
          <el-radio v-model="templateForm.classBig" label="1">是</el-radio>
          <el-radio v-model="templateForm.classBig" label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="按相同税率合并" class="dashboard-selectBox">
          <el-radio v-model="templateForm.rate " label="1">是</el-radio>
          <el-radio v-model="templateForm.rate " label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="按相同品名合并" class="dashboard-selectBox">
          <el-radio v-model="templateForm.commodity" label="1">是</el-radio>
          <el-radio v-model="templateForm.commodity" label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="正负合并" class="dashboard-selectBox">
          <el-radio v-model="templateForm.plusMinus" label="1">是</el-radio>
          <el-radio v-model="templateForm.plusMinus" label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="按相同单价合并" class="dashboard-selectBox">
          <el-radio v-model="templateForm.price " label="1">是</el-radio>
          <el-radio v-model="templateForm.price " label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="清单标识" class="dashboard-selectBox">
          <el-radio v-model="templateForm.listSign " label="1">带清单</el-radio>
          <el-radio v-model="templateForm.listSign " label="2">无清单</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="发票明细限制行数" class="dashboard-selectBox" >
          <el-input v-model="templateForm.invoiceLine" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="启用状态" class="dashboard-selectBox">
          <el-radio v-model="templateForm.status " label="1">启用</el-radio>
          <el-radio v-model="templateForm.status " label="2">停用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="addTemplate(templateForm)">确 定</el-button>
      </div>
    </el-dialog>
    <!--删除弹框-->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="提示"
      width="30%">
      <span>确定要删除选择的数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="templateDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTable } from '@/api/system/template'
export default {
  name: 'Template',
  data() {
    return {
      searchParams: {
        currentPage: 1,
        pageSize: 10
      },
      templateForm: {
        ruleName: '',
        classBig: '1',
        rate: '1',
        commodity: '1',
        plusMinus: '1',
        price: '1',
        listSign: '1',
        invoiceLine: '',
        status: '1'
      },
      tableList: [{
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        index: '3'
      }],
      multipleSelection: [],
      dialogFormVisible: false,
      invoiceLine: '',
      formLabelWidth: '127px',
      dialogVisible: false,
      rules: {
        ruleName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable() {
      getTable(this.searchParams).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    templateDelete() {
      this.dialogVisible = false
    },
    addTemplate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .template {
    &-container {
      margin: 30px;
      .button-container{
        margin-bottom: 20px;
      }
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
