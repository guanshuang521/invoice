<template>
  <div class="dashboard-container">
    <el-row>
      <el-button type="primary" size="mini" class="dashboard-button" @click="dialogFormVisible = true">新增</el-button>
      <el-button type="primary" size="mini" class="dashboard-button" @click="dialogVisible = true">删除</el-button>
      <!--新增规则弹框-->
      <el-dialog :visible.sync="dialogFormVisible" title="新增规则" width="55%">
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
    </el-row>
    <el-row>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="index"
          label="序号"
          width="50"/>
        <el-table-column
          prop="ruleName"
          label="模板名称"
          width="100"/>
        <el-table-column
          prop="ruleName"
          label="按相同大类合并"
          width="175"/>
        <el-table-column
          prop="ruleName"
          label="按相同税率合并"
          width="175"/>
        <el-table-column
          prop="ruleName"
          label="按相同品名合并"
          width="175"/>
        <el-table-column
          prop="ruleName"
          label="正负合并"
          width="100"/>
        <el-table-column
          prop="ruleName"
          label="按相同单价合并"
          width="175"/>
        <el-table-column
          prop="ruleName"
          label="清单标识"
          width="100"/>
        <el-table-column
          prop="ruleName"
          label="发票明细限制行数"
          width="200"/>
        <el-table-column
          prop="ruleName"
          label="启用状态"
          width="100"/>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page = "currentPage4"
          :page-sizes = "[100, 200, 300, 400]"
          :page-size = "100"
          :total = "400"
          layout = "total, sizes, prev, pager, next, jumper"
          @size-change = "handleSizeChange"
          @current-change = "handleCurrentChange"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      currentPage4: 4,
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
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        haha: '3243',
        index: '1',
        ruleName: '哈哈'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        index: '2'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        index: '3'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        index: '4'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        index: '5'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        index: '6'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
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
  methods: {
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
.dashboard {
  &-container {
    margin: 30px;
  }
  &-button{
    display: inline-block;
    float: left;
    margin-left: 20px;
  }
  &-selectBox{
    width: 320px;
    display: inline-block;
  }
}
</style>
