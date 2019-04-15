/**
* @author Linzb
* @date 2019/3/21
* @Description: 系统管理->组织机构管理
*/
<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="organization-container"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h4>组织机构</h4>
          <el-input v-model="filterText" placeholder="请输入关键字" size="mini"/>
          <el-tree
            ref="organTree"
            key="id"
            :data="organTree"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :expand-on-click-node="autoExpand"
            :highlight-current="highlight"
            class="filter-tree"
            default-expand-all
            @node-click="showTabs()"
          />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <h4>节点属性面板</h4>
          <el-tabs v-if="isTreeChecked" v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane name="first" label="节点维护">
              <el-form ref="nodeMaintenanceForm" :model="nodeMaintenanceForm" :rules="nodeMaintenanceRules" label-width="120px" size="mini">
                <el-form-item label="组织机构代码" prop="orgCode">
                  <el-input v-model="nodeMaintenanceForm.orgCode"/>
                </el-form-item>
                <el-form-item label="组织机构名称" prop="orgName">
                  <el-input v-model="nodeMaintenanceForm.orgName"/>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="nodeMaintenanceForm.remark" classs="note" type="textarea"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete" @click="deleteNode">删除</el-button>
                  <el-button type="primary" icon="el-icon-check" @click="updateForm('nodeMaintenanceForm')">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="currentNodeType === 1" name="second" label="新增子节点">
              <el-form ref="addNodeForm" :model="addNodeForm" :rules="nodeMaintenanceRules" label-width="120px" size="mini">
                <el-form-item label="组织机构代码" prop="orgCode">
                  <el-input v-model="addNodeForm.orgCode"/>
                </el-form-item>
                <el-form-item label="组织机构名称" prop="orgName">
                  <el-input v-model="addNodeForm.orgName"/>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="addNodeForm.remark" classs="note" type="textarea"/>
                </el-form-item>
                <el-form-item label="是否是叶节点" prop="type">
                  <el-radio-group v-model="addNodeForm.type">
                    <el-radio label="1">组织节点</el-radio>
                    <el-radio label="2">税号节点</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-check" @click="addNode('addNodeForm')">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="currentNodeType === 2" name="third" label="税号维护">
              <el-form ref="codeMaintenanceForm" :model="codeMaintenanceForm" :rules="codeMaintenanceRules" label-width="120px" size="mini">
                <el-form-item label="税号" prop="taxNum">
                  <el-input v-model="codeMaintenanceForm.taxNum"/>
                </el-form-item>
                <el-form-item label="单位名称" prop="coName">
                  <el-input v-model="codeMaintenanceForm.coName"/>
                </el-form-item>
                <el-form-item label="开户银行" prop="bankName">
                  <el-input v-model="codeMaintenanceForm.bankName"/>
                </el-form-item>
                <el-form-item label="银行账号" prop="bankCode">
                  <el-input v-model="codeMaintenanceForm.bankCode"/>
                </el-form-item>
                <el-form-item label="专票限额" prop="expertLimit">
                  <el-input v-model="codeMaintenanceForm.expertLimit" type="number"/>
                </el-form-item>
                <el-form-item label="普票限额" prop="generalLimit">
                  <el-input v-model="codeMaintenanceForm.generalLimit" type="number"/>
                </el-form-item>
                <el-form-item label="电子发票限额" prop="electricityLimit">
                  <el-input v-model="codeMaintenanceForm.electricityLimit" type="number"/>
                </el-form-item>
                <el-form-item label="商品行数" prop="maxOrderNum">
                  <el-input v-model.number="codeMaintenanceForm.maxOrderNum" type="number"/>
                </el-form-item>
                <el-form-item label="地址" prop="coAddr">
                  <el-input v-model="codeMaintenanceForm.coAddr"/>
                </el-form-item>
                <el-form-item label="电话" prop="coPhone">
                  <el-input v-model="codeMaintenanceForm.coPhone"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-check" @click="submitCodeMaintence('codeMaintenanceForm')">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="currentNodeType === 2" name="fourth" label="税号关联终端">
              <template>
                <el-table
                  :data="codeRelevanceTerminalList"
                  border
                  style="width: 100%"
                  height="250">
                  <el-table-column label="序号" align="center" width="50px">
                    <template slot-scope="scope">
                      {{ scope.$index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="terminalMark" label="终端标识" width="100"/>
                  <el-table-column prop="terminalName" label="终端名称" width="100"/>
                  <el-table-column prop="terminalIp" label="终端地址" width="100"/>
                  <el-table-column prop="terminalPort" label="终端端口" width="100"/>
                  <el-table-column label="开票类型" width="100">
                    <template slot-scope="scope">
                      <span v-for="item in scope.row.invoiceType.split(',')" :key="item" class="space">{{ invoiceTypeObj[item] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="taxNum" label="所属税号" width="100"/>
                  <el-table-column
                    prop="machineCode"
                    label="机器编号"
                    width="100"/>
                  <el-table-column
                    label="操作"
                    width="120">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="deleteTerminal(scope.row)">删除</el-button>
                      <el-button type="text" size="small" @click="modifyTerminal(scope.row)">修改</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :current-page="terminalQueryParams.currentPage"
                  :page-sizes="[10, 20, 30, 50, 100]"
                  :page-size="100"
                  :total="totalCount"
                  layout="total, sizes, prev, pager, next, jumper"
                  style="margin-top: 10px"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"/>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <!--创建和编辑终端-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisiblity" :lock-scroll="true" width="500px" custom-class="showPop dialog-wapper pub-min-pop">
      <dialog-detail ref="dialog" :terminal-info="terminalInfo" :key="terminalInfo.id"/>
      <span slot="footer" class="dialog-footer" >
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="mini" @click="saveTerminal">保存</el-button>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" size="mini" @click="dialogVisiblity = !dialogVisiblity">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getNodeList, deleteNode, updateNode, addNode, terminalList, deleteTerminal, updateterminal } from '@/api/system/organization'
import dialogDetail from '@/components/system/organization'
import { arrayToTree, arrayToMapField } from '@/utils/public'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    dialogDetail
  },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 机构树检索关键字
      filterText: '',
      // 默认展示tab类名
      activeName: 'first',
      // 点击节点是否自动展开
      autoExpand: false,
      // 树高亮显示
      highlight: true,
      // 是否展示tabs
      isTreeChecked: false,
      // 当前节点类型
      currentNodeType: '',
      // 当前节点ID
      currentNodeID: '',
      // 节点维护表单
      nodeMaintenanceForm: {
        orgCode: '',
        orgName: '',
        remark: '',
        type: ''
      },
      // 新增子节点表单
      addNodeForm: {
        orgCode: '',
        orgName: '',
        remark: '',
        type: ''
      },
      // 税号维护表单
      codeMaintenanceForm: {
        taxNum: '',
        coName: '',
        bankName: '',
        bankCode: '',
        expertLimit: '',
        generalLimit: '',
        electricityLimit: '',
        maxOrderNum: 0,
        coAddr: '',
        coPhone: ''
      },
      // 节点维护表单校验规则
      nodeMaintenanceRules: {
        orgCode: [
          { required: true, message: '请输入组织机构代码', trigger: 'blur' }
        ],
        orgName: [
          { required: true, message: '请输入组织机构名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择是否是叶节点', trigger: 'change' }
        ]
      },
      // 税号维护表单校验规则
      codeMaintenanceRules: {
        taxNum: [
          { required: true, message: '请输入税号', trigger: 'blur' }
        ],
        coName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        bankCode: [
          { required: true, message: '请输入银行账号', trigger: 'blur' }
        ],
        expertLimit: [
          { required: true, message: '请输入专票限额', trigger: 'blur' }
        ],
        generalLimit: [
          { required: true, message: '请输入普票限额', trigger: 'blur' }
        ],
        electricityLimit: [
          { required: true, message: '请输入电子发票限额', trigger: 'blur' }
        ],
        maxOrderNum: [
          { required: true, type: 'number', message: '请输入最大订单数', trigger: 'blur' },
          { min: 1, max: 100, type: 'number', message: '长度在 1 到 100 之间', trigger: 'blur' }
        ],
        coAddr: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        coPhone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 11, max: 11, message: '电话号码长度不正确', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      },
      // 机构树
      organTree: [],
      // 税号关联终端
      codeRelevanceTerminalList: [],
      // 组织树显示节点名的字段
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 弹窗标题
      dialogTitle: '',
      // 弹窗是否显示
      dialogVisiblity: false,
      // 终端信息
      terminalInfo: {
        taxNum: '',
        terminalMark: '',
        terminalName: '',
        terminalIp: '',
        terminalPort: '',
        machineCode: '',
        invoiceType: []
      },
      // 加载页面
      fullscreenLoading: false,
      // 当前总条数
      totalCount: 0,
      // 当前所有节点的数组
      nodeList: '',
      // 当前选中节点详细信息
      currentNodeDetail: {},
      // 税号关联终端列表查询参数
      terminalQueryParams: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    // 获取数据字典
    ...mapGetters([
      'dictList'
    ]),
    // 发票类型
    invoiceTypeObj() {
      return arrayToMapField(this.dictList['SYS_FPLX'], 'code', 'name')
    }
    // invoiceTypeObj() {
    //   console.log(arrayToMap(this.dictList['SYS_FPLX'], 'code'))
    //   return arrayToMap(this.dictList['SYS_FPLX'], 'code')
    // }
  },
  watch: {
    filterText(val) {
      this.$refs.organTree.filter(val)
    }
  },
  mounted() {
    this.initTree()
  },
  methods: {
    // 初始化机构树
    initTree() {
      this.loading = true
      getNodeList({}).then(res => {
        this.loading = false
        this.nodeList = res.data.list
        this.organTree = arrayToTree(res.data.list, 'orgName')
      }).catch(err => {
        this.loading = false
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    // 机构关键字检索
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 点击机构展示对应的机构详情
    showTabs() {
      this.nodeList.forEach((item) => {
        if (item.id === this.$refs.organTree.getCurrentNode().id) {
          this.currentNodeDetail = item
          this.currentNodeType = item.type
          this.isTreeChecked = true
          this.nodeMaintenanceForm = {
            orgCode: item.orgCode,
            orgName: item.orgName,
            remark: item.remark,
            type: item.type.toString()
          }
          this.codeMaintenanceForm = {
            taxNum: item.taxNum,
            coName: item.coName,
            bankName: item.bankName,
            bankCode: item.bankCode,
            expertLimit: item.expertLimit,
            generalLimit: item.generalLimit,
            electricityLimit: item.electricityLimit,
            maxOrderNum: item.maxOrderNum,
            coAddr: item.coAddr,
            coPhone: item.coPhone
          }
          // this.$nextTick(function() {
          //   document.getElementById('tab-0').click()
          // })
        }
      })
    },
    // 更新机构
    updateForm(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          const args = Object.assign({}, this.nodeMaintenanceForm)
          args.id = this.$refs.organTree.getCurrentNode().id
          updateNode(args).then(res => {
            this.$message.success(res.message)
            this.initTree()
          }).catch(err => {
            this.$message.error(err)
          })
        }
      })
    },
    // 删除机构
    deleteNode() {
      this.$confirm('确定删除选择数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNode(this.$refs.organTree.getCurrentNode().id).then(res => {
          this.$message.success(res.message)
          this.initTree()
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    // 新增子节点
    addNode(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          const args = Object.assign({}, this.addNodeForm)
          args.fid = this.$refs.organTree.getCurrentNode().id
          addNode(args).then(res => {
            this.$refs[data].resetFields()
            this.$message.success(res.message)
            this.initTree()
          }).catch(err => {
            this.$message.error(err)
          })
        }
      })
    },
    // 获取税号关联终端列表
    getTerminal() {
      const args = this.terminalQueryParams
      args.orgId = this.currentNodeDetail.orgCode
      terminalList(args).then(res => {
        this.codeRelevanceTerminalList = res.data.list
        this.totalCount = res.data.count
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 税号维护提交
    submitCodeMaintence(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          const args = this.codeMaintenanceForm
          args.id = this.$refs.organTree.getCurrentNode().id
          args.orgCode = this.currentNodeDetail.orgCode
          this.loading = true
          updateNode(args).then(res => {
            this.$refs[data].resetFields()
            this.$message.success(res.message)
            this.initTree()
            this.loading = false
            this.isTreeChecked = false
          }).catch(err => {
            this.$message({
              message: err,
              type: 'error'
            })
            this.loading = false
          })
        }
      })
    },
    // 删除终端
    deleteTerminal(data) {
      this.$confirm('确定删除选择数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTerminal({ id: data.id }).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getTerminal()
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改终端
    modifyTerminal(data) {
      this.dialogVisiblity = true
      this.dialogTitle = '修改终端信息'
      this.terminalInfo = Object.assign({}, data)
      this.terminalInfo.invoiceType = this.terminalInfo.invoiceType.split(',')
    },
    // 修改终端保存
    saveTerminal() {
      this.$refs.dialog.$refs.form.validate((valid) => {
        if (valid) {
          const args = Object.assign({}, this.terminalInfo)
          args.invoiceType = args.invoiceType.join(',')
          updateterminal(args).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.dialogVisiblity = false
            this.getTerminal()
          }).catch(err => {
            this.$message({
              type: 'error',
              message: err
            })
          })
        }
      })
    },
    handleClick(node) {
      if (node.name === 'fourth') {
        this.getTerminal()
      }
    },
    // 修改每页最大条数
    handleSizeChange(val) {
      this.terminalQueryParams.pageSize = val
      this.getTerminal()
    },
    // 更改页数
    handleCurrentChange(val) {
      this.terminalQueryParams.currentPage = val
      this.getTerminal()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .organization {
    &-container{
      margin: 10px;
      h4{
        padding: 10px;
        background-color: #d9e8fb;
      }
      .el-input--mini{
        width: 200px!important;
      }
      .space{
        margin-right: 10px  ;
      }
    }
    .note{
      resize: none;
    }
  }
</style>
