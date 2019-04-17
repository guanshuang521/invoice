/**
* @author Wujy
* @date 2019/3/21
* @Description:任务设置
*/
<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="taskSettings-container"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <el-tabs v-model="activeName">
      <el-tab-pane label="手工同步" name="first">
        <el-form ref="manualForm" :model="manualForm" :rules="manualFormRules" class="manual-form" label-width="100px">
          <el-form-item label="数据类型" prop="dataType">
            <el-select v-model="manualForm.dataType" placeholder="请选择">
              <el-option
                v-for="item in sjlx"
                :key="item.id"
                :label="item.name"
                :value="item.code"/>
            </el-select>
          </el-form-item>
          <el-form-item label="数据源系统" prop="dataSource">
            <el-select v-model="manualForm.dataSource" placeholder="请选择">
              <el-option
                v-for="item in sjyxt"
                :key="item.id"
                :label="item.name"
                :value="item.code"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="syncSubmit">同步</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="定时同步" name="second">
        <div class="button-container">
          <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
        </div>
        <el-table
          v-loading="loading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row>
          <el-table-column align="center" width="41px">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="数据类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.dataType }}
            </template>
          </el-table-column>
          <el-table-column label="数据源系统" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.dataSource }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.startTime }}
            </template>
          </el-table-column>
          <el-table-column label="结束时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.endTime }}
            </template>
          </el-table-column>
          <el-table-column label="同步频率" align="center">
            <template slot-scope="scope">
              {{ scope.row.frequency }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              {{ qyzt[scope.row.jobStatus] }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :close-on-click-modal="closeOnClickModal" :visible.sync="dialogVisible" :title="dialogTitle" width="640px" custom-class="showPop dialog-wapper pub-min-pop">
      <el-form ref="dataSyncForm" :inline="true" :rules="dataSyncFormRules" :model="dataSyncForm" class="form" label-width="100px" size="mini">
        <el-form-item label="数据类型" prop="dataType" >
          <el-select v-model="dataSyncForm.dataType" placeholder="请选择" style="width: 170px">
            <el-option
              v-for="item in sjlx"
              :key="item.id"
              :label="item.name"
              :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="数据源系统" prop="dataSource">
          <el-select v-model="dataSyncForm.dataSource" placeholder="请选择" style="width: 170px">
            <el-option
              v-for="item in sjyxt"
              :key="item.id"
              :label="item.name"
              :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-time-picker
            v-model="dataSyncForm.startTime"
            picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            value-format="HH:mm:ss"
            size="small"
            class="filter-item"
            style="width: 170px"
            placeholder="开始时间"/>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-time-picker
            v-model="dataSyncForm.endTime"
            picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            value-format="HH:mm:ss"
            size="small"
            class="filter-item"
            style="width: 170px"
            placeholder="结束时间"/>
        </el-form-item>
        <el-form-item label="同步频率" prop="frequency" >
          <el-select v-model="dataSyncForm.frequency" placeholder="请选择" style="width: 170px">
            <el-option
              v-for="item in tbpl"
              :key="item.id"
              :label="item.name"
              :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="启用状态" prop="jobStatus" >
          <el-select v-model="dataSyncForm.jobStatus" placeholder="请选择" style="width: 170px">
            <el-option
              v-for="item in dictList['SYS_QYZT']"
              :key="item.id"
              :label="item.name"
              :value="item.code"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button v-if="dialogType === 'add'" type="primary" size="mini" @click="submit">保存</el-button>
        <el-button v-else type="primary" size="mini" @click="submit">提交</el-button>
        <el-button size="mini" @click="dialogVisible = !dialogVisible">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { submitSync, addSave, initData, handleEdit } from '@/api/dataSync/taskSetting'
import testSettings from '@/components/dataSync/testSettings'
import { arrayToMapField } from '@/utils/public'
export default {
  name: 'Dashboard',
  components: {
    testSettings
  },
  data: function() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      // 手工同步表单
      manualForm: {
        dataType: '',
        dataSource: ''
      },
      // 手工同步校验规则
      manualFormRules: {
        dataType: [
          { required: true, message: '请选择数据类型', trigger: 'change' }
        ],
        dataSource: [
          { required: true, message: '请选择数据来源', trigger: 'change' }
        ]
      },
      // 默认选中的tab页
      activeName: 'first',
      // 定时同步数据列表
      list: [],
      // 请求遮罩
      loading: false,
      // 查询条件
      searchParams: {
        currentPage: 1,
        pageSize: 10
      },
      // 列表总条数
      total: 0,
      // 定时同步新增弹窗显示
      dialogVisible: false,
      // 弹窗标题
      dialogTitle: '',
      // 弹窗类型
      dialogType: '',
      // 数据同步表单
      dataSyncForm: {
        dataType: '',
        dataSource: '',
        startTime: '',
        endTime: '',
        frequency: '',
        jobStatus: ''
      },
      dataSyncFormRules: {
        dataType: [
          { required: true, message: '请选择数据类型', trigger: 'change' }
        ],
        dataSource: [
          { required: true, message: '请选择数据来源', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请输入开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请输入结束时间', trigger: 'blur' }
        ],
        frequency: [
          { required: true, message: '请选择同步频率', trigger: 'change' }
        ],
        jobStatus: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'dictList'
    ]),
    sjlx() {
      return this.dictList['SYS_SJLX']
    },
    sjyxt() {
      return this.dictList['SYS_SJYXT']
    },
    tbpl() {
      return this.dictList['SYS_TBPL']
    },
    qyzt() {
      return arrayToMapField(this.dictList['SYS_QYZT'], 'code', 'name')
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 获取定时同步列表数据
    initData() {
      initData(this.searchParams).then(res => {
        this.list = res.data.list
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 同步提交
    syncSubmit() {
      this.$refs['manualForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          submitSync(this.manualForm).then(res => {
            this.manualForm = {
              dataType: '',
              dataSource: ''
            }
            this.loading = false
            this.$message.success(res.message)
          }).catch(err => {
            this.loading = false
            this.$message.error(err)
          })
        }
      })
    },
    // 新增定时任务
    handleAdd() {
      this.dialogType = 'add'
      this.dialogTitle = '新增数据同步规则'
      this.dialogVisible = true
    },
    // 新增提交
    submit() {
      this.$refs['dataSyncForm'].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'add') {
            const args = Object.assign({}, this.dataSyncForm)
            this.loading = true
            addSave(args).then(res => {
              this.$message.success(res.message)
              this.initData()
              this.dialogVisible = false
              this.dialogType = ''
              this.$refs['dataSyncForm'].resetFields()
              this.loading = false
            }).catch(err => {
              this.loading = false
              this.$message.error(err)
            })
          } else {
            const args = Object.assign({}, this.dataSyncForm)
            this.loading = true
            handleEdit(args).then(res => {
              this.$message.success(res.message)
              this.initData()
              this.dialogVisible = false
              this.dialogType = ''
              this.loading = false
              this.$refs['dataSyncForm'].resetFields()
            }).catch(err => {
              this.loading = false
              this.$message.error(err)
            })
          }
        }
      })
    },
    // 点击编辑
    handleEdit(data) {
      this.dialogType = 'edit'
      this.dialogTitle = '编辑数据同步规则'
      this.dialogVisible = true
      this.dataSyncForm = Object.assign({}, data)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.taskSettings {
  &-container {
    margin: 30px;
    .manual-form{
      width: 300px;
    }
    .el-dialog__body{
      padding-top: 50px;
      padding-bottom: 50px;
      .content{
        margin-left: 10px;
        .search-item{
          float: left;
          margin-bottom: 20px;
          margin-left: 30px;
        }
      }
    }
    .button-container{
      margin-bottom: 20px;
    }
  }
}
.el-dialog .search-item span{
  float: left;
  width: 100px;
  height: 35px;
  text-align: center;
  line-height: 35px;
}
.el-dialog .el-date-editor--date{
  width: 170px;
  height: 15px;
}
.search-item{
  float: left;
  margin-bottom: 20px;
  margin-left: 30px;
}
.el-input{
  width: 140px;
  height: 35px;
}
.button-box{
  float: left;
  margin-top: 10px;
  margin-left: 34%;
}
</style>
