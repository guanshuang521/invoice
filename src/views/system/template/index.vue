/**
* @author Linzb
* @date 2019/4/1
* @Description: 开票规则模板
*/
<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="template-container"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <div class="button-container">
      <el-button type="primary" size="mini" class="dashboard-button" @click="openDialog">新增</el-button>
      <el-button type="primary" size="mini" class="dashboard-button" @click="templateDelete">删除</el-button>
      <el-button type="primary" size="mini" class="dashboard-button" @click="initTable">查询</el-button>
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
        <el-table-column prop="index" label="序号" align="center" width="54">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="ruleName"
          label="模板名称"
          align="center"
          width="160"/>
        <el-table-column
          label="按相同大类合并"
          align="center"
          width="160">
          <template slot-scope="scope">
            {{ showBoolean[scope.row.classBig] }}
          </template>
        </el-table-column>
        <el-table-column
          label="按相同税率合并"
          align="center"
          width="160">
          <template slot-scope="scope">
            {{ showBoolean[scope.row.rate] }}
          </template>
        </el-table-column>
        <el-table-column
          label="按相同品名合并"
          align="center"
          width="160">
          <template slot-scope="scope">
            {{ showBoolean[scope.row.commodity] }}
          </template>
        </el-table-column>
        <el-table-column
          label="正负合并"
          align="center"
          width="160">
          <template slot-scope="scope">
            {{ showBoolean[scope.row.plusMinus] }}
          </template>
        </el-table-column>
        <el-table-column
          label="按相同单价合并"
          align="center"
          width="160">
          <template slot-scope="scope">
            {{ showBoolean[scope.row.price] }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="启用状态"
          align="center"
          width="160">
          <template slot-scope="scope">
            {{ showBoolean[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editTemplate(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page = "searchParams.currentPage"
        :page-sizes = "[10, 20, 30, 50, 100]"
        :page-size = "searchParams.pageSize"
        :total = "totalCount"
        style="margin-top: 20px"
        layout = "total, sizes, prev, pager, next, jumper"
        @size-change = "handleSizeChange"
        @current-change = "handleCurrentChange"/>
    </div>
    <!--新增规则弹框-->
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="dialogFormVisible" :title="dialogTitle" width="620px">
      <el-form ref="templateForm" :model="templateForm" :rules="rules" :inline="isInline" size="mini" label-width="140px">
        <el-form-item label="模板名称：" prop="ruleName">
          <el-input v-model="templateForm.ruleName "/>
        </el-form-item>
        <br>
        <el-form-item label="按相同大类合并：" class="dashboard-selectBox">
          <el-switch
            v-model="templateForm.classBig"
            active-text="是"
            inactive-text="否"
            active-value="1"
            inactive-value="2"/>
        </el-form-item>
        <el-form-item label="按相同税率合并：" class="dashboard-selectBox">
          <el-switch
            v-model="templateForm.rate"
            active-text="是"
            inactive-text="否"
            active-value="1"
            inactive-value="2"/>
        </el-form-item>
        <el-form-item label="按相同品名合并：" class="dashboard-selectBox">
          <el-switch
            v-model="templateForm.commodity"
            active-text="是"
            inactive-text="否"
            active-value="1"
            inactive-value="2"/>
        </el-form-item>
        <el-form-item label="正负合并：" class="dashboard-selectBox">
          <el-switch
            v-model="templateForm.plusMinus"
            active-text="是"
            inactive-text="否"
            active-value="1"
            inactive-value="2"/>
        </el-form-item>
        <el-form-item label="按相同单价合并：" class="dashboard-selectBox">
          <el-switch
            v-model="templateForm.price"
            active-text="是"
            inactive-text="否"
            active-value="1"
            inactive-value="2"/>
        </el-form-item>
        <el-form-item label="启用状态：" class="dashboard-selectBox">
          <el-switch
            v-model="templateForm.status"
            active-text="启用"
            inactive-text="停用"
            active-value="1"
            inactive-value="0"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button v-if="dialogTitle !== '编辑规则'" type="primary" size="mini" @click="addTemplate('templateForm')">确 定</el-button>
        <el-button v-if="dialogTitle === '编辑规则'" type="primary" size="mini" @click="saveTemplate('templateForm')">保 存</el-button>
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTable, addTemplate, editTemplate, deleteTemplate } from '@/api/system/template'
export default {
  name: 'Template',
  data() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      // 弹窗标题
      dialogTitle: '',
      // 加载层
      loading: false,
      // 表单行内显示
      isInline: true,
      // 列表查询参数
      searchParams: {
        currentPage: 1,
        pageSize: 10
      },
      // 新增表单
      templateForm: {
        ruleName: '',
        classBig: '',
        rate: '',
        commodity: '',
        plusMinus: '',
        price: '',
        status: '1'
      },
      // 新增表单校验规则
      rules: {
        ruleName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ]
      },
      // 列表数据
      tableList: [],
      // 列表总条数
      totalCount: 0,
      // 列表回显是否
      showBoolean: {
        1: '是',
        2: '否'
      },
      // 列表回显清单标识
      showListSign: {
        1: '带清单',
        2: '无清单'
      },
      // 列表回显启用状态
      showStatus: {
        1: '启用',
        0: '停用'
      },
      multipleSelection: [],
      dialogFormVisible: false,
      invoiceLine: '',
      formLabelWidth: '127px',
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.$store.getters.isAutoLoadData ? this.initTable() : ''
  },
  methods: {
    // 初始化列表
    initTable() {
      getTable(this.searchParams).then(res => {
        this.tableList = res.data.list
        this.totalCount = res.data.count
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    openDialog() {
      this.dialogTitle = '新增规则'
      this.dialogFormVisible = true
      this.templateForm = {
        ruleName: '',
        classBig: '2',
        rate: '2',
        commodity: '2',
        plusMinus: '2',
        price: '2',
        status: '1'
      }
    },
    // 新增模板
    addTemplate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var args = Object.assign({}, this.templateForm)
          addTemplate(args).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.dialogFormVisible = false
            this.initTable()
          }).catch(err => {
            this.$message({
              type: 'error',
              message: err
            })
          })
          this.dialogFormVisible = false
        }
      })
    },
    // 编辑模板
    editTemplate(row) {
      console.log(row)
      this.dialogTitle = '编辑规则'
      this.dialogFormVisible = true
      this.templateForm = Object.assign({}, row)
    },
    // 编辑模板保存
    saveTemplate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var args = Object.assign({}, this.templateForm)
          editTemplate(args).then(res => {
            this.$message.success(res.message)
            this.dialogFormVisible = false
            this.initTable()
          }).catch(err => {
            this.$message.error(err)
          })
          this.dialogFormVisible = false
        }
      })
    },
    // 删除模板
    templateDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('至少选择一条数据')
        return false
      }
      this.$confirm('确定删除选择数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = []
        this.multipleSelection.forEach((item) => {
          id.push(item.id)
        })
        const args = {
          ids: id.join(',')
        }
        deleteTemplate(args).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.initTable()
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
      })
    },
    // 勾选列表项
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 更改每页显示条数
    handleSizeChange(val) {
      this.searchParams.pageSize = val
      this.initTable()
    },
    // 页面跳转
    handleCurrentChange(val) {
      this.searchParams.currentPage = val
      this.initTable()
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
