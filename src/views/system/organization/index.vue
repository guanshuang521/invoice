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
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h4>组织机构</h4>
          <el-input v-model="filterText" placeholder="请输入关键字" size="mini"/>
          <el-tree
            ref="organTree"
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
          <el-tabs v-if="isTreeChecked" :key="tabKey" v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane ref="first" label="节点维护">
              <el-form ref="nodeMaintenanceForm" :model="nodeMaintenanceForm" :rules="nodeMaintenanceRules" label-width="120px" size="mini">
                <el-form-item label="组织机构代码" prop="code">
                  <el-input v-model="nodeMaintenanceForm.orgCode"/>
                </el-form-item>
                <el-form-item label="组织机构名称" prop="name">
                  <el-input v-model="nodeMaintenanceForm.orgName"/>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                  <el-input v-model="nodeMaintenanceForm.remark" classs="note" type="textarea"/>
                </el-form-item>
                <el-form-item label="是否是叶节点" prop="isLeafNode">
                  <el-radio-group v-model="nodeMaintenanceForm.type">
                    <el-radio label="1">组织节点</el-radio>
                    <el-radio label="2">税号节点</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" icon="el-icon-delete" @click="deleteNode">删除</el-button>
                  <el-button type="primary" icon="el-icon-check" @click="updateForm('nodeMaintenanceForm')">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="currentNodeType === 1" ref="second" label="新增子节点">
              <el-form ref="addNodeForm" :model="addNodeForm" :rules="nodeMaintenanceRules" label-width="120px" size="mini">
                <el-form-item label="组织机构代码" prop="code">
                  <el-input v-model="addNodeForm.orgCode"/>
                </el-form-item>
                <el-form-item label="组织机构名称" prop="name">
                  <el-input v-model="addNodeForm.orgName"/>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                  <el-input v-model="addNodeForm.remark" classs="note" type="textarea"/>
                </el-form-item>
                <el-form-item label="是否是叶节点" prop="isLeafNode">
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
            <el-tab-pane v-if="currentNodeType === 2" ref="third" label="税号维护">
              <el-form ref="codeMaintenanceForm" :model="codeMaintenanceForm" :rules="codeMaintenanceRules" label-width="120px" size="mini">
                <el-form-item label="税号" prop="code">
                  <el-input v-model="codeMaintenanceForm.taxNum"/>
                </el-form-item>
                <el-form-item label="单位名称" prop="unitName">
                  <el-input v-model="codeMaintenanceForm.coName"/>
                </el-form-item>
                <el-form-item label="开户银行" prop="unitName">
                  <el-input v-model="codeMaintenanceForm.bankName"/>
                </el-form-item>
                <el-form-item label="银行账号" prop="cardNo">
                  <el-input v-model="codeMaintenanceForm.bankCode"/>
                </el-form-item>
                <el-form-item label="专票限额" prop="specialTicketAmount">
                  <el-input v-model="codeMaintenanceForm.expertLimit" type="number"/>
                </el-form-item>
                <el-form-item label="普票限额" prop="generalTicketAmount">
                  <el-input v-model="codeMaintenanceForm.generalLimit" type="number"/>
                </el-form-item>
                <el-form-item label="电子发票限额" prop="electronicTicketAmount">
                  <el-input v-model="codeMaintenanceForm.electricityLimit" type="number"/>
                </el-form-item>
                <el-form-item label="最大订单数" prop="maxOrderNo">
                  <el-input v-model="codeMaintenanceForm.maxOrderNum" type="number"/>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                  <el-input v-model="codeMaintenanceForm.coAddr"/>
                </el-form-item>
                <el-form-item label="电话" prop="telephoneNo">
                  <el-input v-model="codeMaintenanceForm.coPhone"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-check" @click="submitCodeMaintence('addNodeForm')">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="currentNodeType === 2" ref="fourth" label="税号关联终端">
              <template>
                <el-table
                  :data="codeRelevanceTerminalList"
                  border
                  style="width: 100%"
                  height="250">
                  <el-table-column
                    prop="date"
                    label="终端标识"
                    width="100"/>
                  <el-table-column
                    prop="name"
                    label="终端名称"
                    width="100"/>
                  <el-table-column
                    prop="province"
                    label="终端地址"
                    width="100"/>
                  <el-table-column
                    prop="city"
                    label="终端端口"
                    width="100"/>
                  <el-table-column
                    prop="address"
                    label="开票类型"
                    width="100"/>
                  <el-table-column
                    prop="zip"
                    label="所属税号"
                    width="100"/>
                  <el-table-column
                    prop="zip"
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
                  :current-page="currentPage"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  :total="totalCount"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"/>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <!--创建和编辑终端-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisiblity" :lock-scroll="true" width="40%" custom-class="showPop dialog-wapper pub-min-pop">
      <dialog-detail ref="dialog" :terminal-info="terminalInfo" :key="terminalInfo.id"/>
      <span slot="footer" class="dialog-footer" >
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" size="mini" @click="saveTerminal">保存</el-button>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" size="mini" @click="dialogVisiblity = !dialogVisiblity">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getNodeList, deleteNode, updateNode, addNode } from '@/api/system/organization'
import dialogDetail from '@/components/system/organization'
import { arrayToTree } from '@/utils/public'
export default {
  name: 'Dashboard',
  components: {
    dialogDetail
  },
  data() {
    return {
      tabKey: '',
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
        maxOrderNum: '',
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
        code: [
          { required: true, message: '请输入税号', trigger: 'blur' }
        ],
        unitName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        cardNo: [
          { required: true, message: '请输入银行账号', trigger: 'blur' }
        ],
        specialTicketAmount: [
          { required: true, message: '请输入专票限额', trigger: 'blur' }
        ],
        generalTicketAmount: [
          { required: true, message: '请输入普票限额', trigger: 'blur' }
        ],
        electronicTicketAmount: [
          { required: true, message: '请输入电子发票限额', trigger: 'blur' }
        ],
        maxOrderNo: [
          { required: true, message: '请输入最大订单数', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        telephoneNo: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 11, max: 11, message: '电话号码长度不正确', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      },
      // 机构树
      organTree: [],
      // 税号关联终端
      codeRelevanceTerminalList: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
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
        sssh: '',
        zdbz: '',
        zdmc: '',
        zddz: '',
        zddkh: '',
        jqbh: '',
        kplx: []
      },
      // 加载页面
      fullscreenLoading: false,
      // 当前分页
      currentPage: 1,
      // 当前总条数
      totalCount: 1,
      // 当前所有节点的数组
      nodeList: ''
    }
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
      getNodeList().then(res => {
        this.loading = false
        this.nodeList = res.data.list
        this.organTree = arrayToTree(res.data.list)
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
          this.tabKey = this.$refs.organTree.getCurrentNode().id
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
          this.$refs.first.classList.add('is-active')
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
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.initTree()
          }).catch(err => {
            this.$message({
              message: err,
              type: 'error'
            })
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
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.initTree()
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.msg
          })
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
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.initTree()
          }).catch(err => {
            this.$message({
              message: err,
              type: 'error'
            })
          })
        }
      })
    },
    // 税号维护提交
    submitCodeMaintence(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          addNode(this.addNodeForm).then(res => {
            this.$refs[data].resetFields()
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }).catch(err => {
            this.$message({
              message: err,
              type: 'error'
            })
          })
        }
      })
    },
    // 删除终端
    deleteTerminal() {
      this.$confirm('确定删除选择数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNode().then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.msg
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
    modifyTerminal() {
      this.dialogVisiblity = true
      this.dialogTitle = '修改终端信息'
    },
    // 修改终端保存
    saveTerminal() {
      this.$refs.dialog.$refs.form.validate((valid) => {
        if (valid) {
          console.log(valid)
        }
      })
    },
    handleClick() {
    },
    // 修改每页最大条数
    handleSizeChange() {
    },
    // 更改页数
    handleCurrentChange() {
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
    }
    .note{
      resize: none;
    }
  }
</style>
