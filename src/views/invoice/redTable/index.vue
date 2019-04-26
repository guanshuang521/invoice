/**
* @author Linzb
* @date 2019/4/23
* @Description: 红字信息表
*/
<template>
  <div class="redTable-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="购方名称">
          <el-input v-model="searchParams.ghdwmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="销方名称">
          <el-input v-model="searchParams.xhdwmc" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="信息表状态">
          <el-select v-model="searchParams.clzt" placeholder="请选择" size="small">
            <el-option v-for="item in dictList['SYS_HZXXB_CLZT']" :key="item.id" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="信息表编号">
          <el-input v-model="searchParams.xxbbh" placeholder="请输入" size="small"/>
        </el-form-item>
        <el-form-item label="填开日期起">
          <el-date-picker
            v-model="searchParams.tkrq_start"
            value-format="yyyy-MM-dd"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item label="填开日期止">
          <el-date-picker
            v-model="searchParams.tkrq_end"
            value-format="yyyy-MM-dd"
            type="date"
            size="small"
            class="filter-item"
            placeholder="请选择"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initTable">查询</el-button>
          <el-button type="primary" size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-container">
      <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="addApply">新增申请</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="del">删除</el-button>
      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="openPrintFp">打印</el-button>
    </div>
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="tableList"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="35"/>
        <el-table-column prop="sqdh" label="申请单号" width="120" align="center"/>
        <el-table-column prop="xxbbh" label="红字信息表编号" width="120" align="center"/>
        <el-table-column prop="clzt" label="信息表状态" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_HZXXB_CLZT[scope.row.clzt] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="填开日期" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tkrq | utoTimeToBeijing }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="yfpdm" label="发票代码" width="120" align="center"/>
        <el-table-column prop="yfphm" label="发票号码" width="120" align="center"/>
        <el-table-column prop="je" label="金额（不含税）" width="120" align="center"/>
        <el-table-column prop="se" label="税额" width="120" align="center"/>
        <el-table-column prop="jshj" label="价税合计" width="120" align="center"/>
        <el-table-column prop="ghdwmc" label="购方名称" width="120" align="center"/>
        <el-table-column prop="xhdwmc" label="销方名称" width="120" align="center"/>
        <el-table-column fixed="right" label="操作" width="190" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkHZXXB(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="uploadData(scope.row)">上传</el-button>
            <el-button type="text" size="small" @click="editData(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="asyncData(scope.row)">同步</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page = "searchParams.currentPage"
        :page-sizes = "[10, 50, 100]"
        :page-size = "searchParams.pageSize"
        :total = "totalCount"
        style="margin-top: 20px"
        layout = "total, sizes, prev, pager, next, jumper"
        @size-change = "handleSizeChange"
        @current-change = "handleCurrentChange"/>
    </div>
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="dialogVisible" title="红字信息表申请" width="380px">
      <el-form ref="applyForm" :model="form" :rules="applyRules" size="mini" label-width="100px">
        <el-form-item label="发票代码:" prop="yfpdm" size="small">
          <el-input v-model="form.yfpdm" placeholder="请输入" style="width: 182px"/>
        </el-form-item>
        <el-form-item label="发票号码:" prop="yfphm" size="small">
          <el-input v-model="form.yfphm" placeholder="请输入" style="width: 182px"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="redTableOpen">下一步</el-button>
      </span>
    </el-dialog>
    <!--红字信息表新增、编辑-->
    <el-dialog
      :close-on-click-modal="closeOnClickModal"
      :visible.sync="dialogRedTableVisible"
      :title="dialogRedTableTitle"
      width="1200px">
      <red-table v-if="dialogRedTableVisible" :form="form" :is-edit="isEdit" :editable="true" @closeDialog="getInfo"/>
    </el-dialog>
    <!--红字信息表查看-->
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="checkHZXXBVisible" title="红字信息表填开-查看" width="1200px">
      <red-table v-if="checkHZXXBVisible" :form="form" :editable="false" @closeDialog="getInfo"/>
    </el-dialog>
    <!--打印发票弹窗-->
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="dyfpDialogVisible" title="打印发票信息列表" width="680px">
      <el-table
        :data="checkedItems"
        border
        fit
        highlight-current-row>
        <el-table-column prop="index" label="序号" align="center" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="发票类型" align="center">
          <template slot-scope="scope">
            <span>{{ SYS_FPLX[scope.row.fplx] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发票代码" prop="fpDm" align="center"/>
        <el-table-column label="发票号码" prop="fpHm" align="center"/>
      </el-table>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button size="mini" type="primary" @click="printFp()">打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import redTable from '@/components/redTable/index'
import { initList, del, apply, sync } from '@/api/invoice/redTable'
import { printFP } from '@/api/invoice/oSpecial'
import { arrayToMapField } from '@/utils/public'
import Template from '../../system/template/index'
import { mapGetters } from 'vuex'

export default {
  name: 'RedTable',
  components: { Template, redTable },
  data() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      // 查询条件
      searchParams: {
        ghdwmc: '',
        xhdwmc: '',
        clzt: '',
        xxbbh: '',
        tkrq_start: '',
        tkrq_end: '',
        currentPage: 1,
        pageSize: 10
      },
      // 列表数据
      tableList: [],
      form: {
        yfpdm: '',
        yfphm: ''
      },
      applyRules: {
        yfpdm: [
          { required: true, message: '发票代码不能为空', trigger: 'bulr' }
        ],
        yfphm: [
          { required: true, message: '发票号码不能为空', trigger: 'bulr' }
        ]
      },
      totalCount: 0,
      dialogVisible: false,
      // 新增编辑红字信息表是否显示
      dialogRedTableVisible: false,
      dialogRedTableTitle: '',
      // 查看红字信息表是否显示
      checkHZXXBVisible: false,
      // 票面信息
      pfDetail: {},
      checkedList: [],
      editable: false,
      // 发票打印窗口是否显示
      dyfpDialogVisible: false,
      // 勾选的列表项
      checkedItems: []
    }
  },
  computed: {
    ...mapGetters([
      'dictList'
    ]),
    SYS_HZXXB_CLZT() { // 税率
      return arrayToMapField(this.dictList['SYS_HZXXB_CLZT'], 'code', 'name')
    },
    SYS_FPLX() {
      return arrayToMapField(this.dictList['SYS_FPLX'], 'code', 'name')
    }
  },
  mounted() {
    this.$store.getters.isAutoLoadData ? this.initTable() : ''
  },
  methods: {
    // table列表查询
    initTable() {
      initList(this.searchParams).then(res => {
        this.tableList = res.data.list
        this.totalCount = res.data.count
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // table重置
    reset() {
      this.searchParams = {
        ghdwmc: '',
        xhdwmc: '',
        clzt: '',
        xxbbh: '',
        currentPage: 1,
        pageSize: 10
      }
      this.initTable()
    },
    // 删除
    del() {
      if (this.checkedList.length === 0) {
        this.$message.info('请至少选择一条数据！')
        return false
      }
      this.$confirm('确定要删除选择的数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const args = {
          ids: this.checkedList.join(',')
        }
        this.loading = true
        del(args).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.initTable()
          this.loading = false
        })
      })
    },
    // 获取红字信息表详情
    redTableOpen() {
      this.$refs['applyForm'].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.dialogRedTableVisible = true
          this.dialogRedTableTitle = '红字信息表填开-申请'
          this.isEdit = false
        }
      })
    },
    // 获取票面信息
    getInfo(msg) {
      console.log(msg)
      this.dialogRedTableVisible = false
      this.initTable()
    },
    // 查看
    checkHZXXB(row) {
      this.checkHZXXBVisible = true
    },
    // 新增申请
    addApply() {
      this.dialogVisible = true
      this.form = {
        yfpdm: '',
        yfphm: ''
      }
      this.$nextTick(() => {
        this.$refs['applyForm'].resetFields()
      })
    },
    // 编辑
    editData(row) {
      this.dialogRedTableVisible = true
      this.dialogRedTableTitle = '红字信息表填开-编辑'
      this.isEdit = true
      this.form = {
        id: row.id
      }
    },
    // 上传
    uploadData(row) {
      this.$confirm('确定上传选择的红字信息表申请数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        const params = {
          id: row.id
        }
        apply(params).then(res => {
          this.loading = false
          this.$message.success(res.message)
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      })
    },
    // 同步
    asyncData(row) {
      this.$confirm('确定上传选择的红字信息表申请数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        const params = {
          id: row.id
        }
        sync(params).then(res => {
          this.loading = false
          this.$message.success(res.message)
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      })
    },
    // 打印
    openPrintFp() {
      if (this.checkedItems.length === 0) {
        this.$message.info('请至少选择一条数据！')
        return
      }
      function sortBy(field) {
        return function(a, b) {
          return a[field] - b[field]
        }
      }
      // 验证规则：发票代码一样，发票号码需连续
      this.checkedItems.sort(sortBy('yfphm'))
      let valid = true
      const defaultFpDm = this.checkedItems[0].yfphm
      this.checkedItems.reduce((pre, curr) => {
        if (pre && parseFloat(pre.yfphm) !== parseFloat(curr.yfphm) - 1) {
          this.$message.error('发票号码需连续！')
          valid = false
        }
      })
      this.checkedItems.forEach(item => {
        if (item.yfpdm !== defaultFpDm) {
          this.$message.error('发票代码需一致！')
          valid = false
        }
      })
      if (valid) {
        this.dyfpDialogVisible = true
      }
    },
    // 打印
    printFp() {
      this.checkedItems.forEach(item => {
        const xml = `<?xml version="1.0" encoding="gbk"?>
    <business id="20004"comment="发票打印">
        <body yylxdm="1">
        <kpzdbs>${this.info.terminalMark}</kpzdbs>
        <fplxdm>${item.fplx}</fplxdm>
        <fpdm>${item.yfpdm}</fpdm>
        <fphm>${item.yfphm}</fphm>
        <dylx>0</dylx>
        <dyfs>1</dyfs>
        </body>
      </business>`
        const Base64 = require('js-base64').Base64
        const args = '<content>' + Base64.encode(xml) + '</content>'
        printFP(args).then()
      })
    },
    // 获取选中列表项
    handleSelectionChange(val) {
      this.checkedList = []
      for (let i = 0; i < val.length; i++) {
        this.checkedList.push(val[i].id)
      }
      this.checkedItems = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .redTable {
    &-container{
      margin: 30px;
      .filter-container{
        margin-bottom: 20px;
      }
      .button-container{
        margin-bottom: 20px;
      }
      /deep/ .el-dialog__footer{
        text-align: center;
      }
    }
  }
</style>
