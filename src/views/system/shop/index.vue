/**
* @author Shangll
* @date 2019/3/22
* @Description: 门店管理
*/
<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="shop-container"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="button-container">
      <el-button type="primary" icon="el-icon-search" size="mini" @click="dialogVisible('add')">新增</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="dialogVisible('edit')">修改</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="remove">删除</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="getTableList">查询</el-button>
    </div>
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="35"/>
        <el-table-column prop="index" label="序号" align="center" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="storeName"
          label="门店名称"
          align="center"
          width="180">
          <template slot-scope="scope">{{ scope.row.storeName }}</template>
        </el-table-column>
        <el-table-column
          prop="storeCode"
          label="门店号"
          align="center"
          width="160">
          <template slot-scope="scope">{{ scope.row.storeCode }}</template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          align="center"
          width="160">
          <template slot-scope="scope">{{ scope.row.userName }}</template>
        </el-table-column>
        <el-table-column
          prop="userPwd"
          label="密码"
          align="center"
          width="180">
          <template slot-scope="scope">{{ scope.row.userPwd }}</template>
        </el-table-column>
        <el-table-column
          prop="datasourceDrive"
          label="数据源驱动"
          align="center"
          width="180">
          <template slot-scope="scope">{{ scope.row.datasourceDrive }}</template>
        </el-table-column>
        <el-table-column
          prop="datasourceLink"
          label="数据源链接"
          align="center"
          width="180">
          <template slot-scope="scope">{{ scope.row.datasourceLink }}</template>
        </el-table-column>
        <el-table-column
          prop="datasourceType"
          label="数据类型"
          align="center"
          width="180">
          <template slot-scope="scope">{{ scope.row.datasourceType }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top:10px;">
      <el-pagination
        :total="totalCount"
        :current-page="searchParams.currentPage"
        :page-sizes="[10, 50, 100]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!--新增/编辑弹框-->
    <el-dialog
      v-if="showDialog"
      :visible.sync="showDialog"
      :title="type === 'add' && '新增' || type === 'edit' && '编辑' || ''"
      width="500px">
      <el-form ref="store" :model="form" :rules="storeRule" label-width="130px" size="mini">
        <el-form-item label="门店名称：" prop="storeName">
          <el-input v-model="form.storeName" size="mini"/>
        </el-form-item>
        <el-form-item label="门店编号：" prop="storeCode">
          <el-input v-model="form.storeCode" size="mini"/>
        </el-form-item>
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="form.userName" size="mini"/>
        </el-form-item>
        <el-form-item label="密码：" prop="userPwd">
          <el-input v-model="form.userPwd" size="mini"/>
        </el-form-item>
        <el-form-item label="数据类型：" prop="datasourceType">
          <el-input v-model="form.datasourceType" size="mini"/>
        </el-form-item>
        <el-form-item label="数据源驱动：" prop="datasourceDrive">
          <el-input v-model="form.datasourceDrive" size="mini"/>
        </el-form-item>
        <el-form-item label="链接：" prop="datasourceLink">
          <el-input v-model="form.datasourceLink" size="mini"/>
        </el-form-item>
        <el-form-item label="所属组织机构：" prop="orgId">
          <el-select v-model="form.orgId" placeholder="请选择" filterable>
            <el-option
              v-for="item in orgIdOptions"
              :key="item.id"
              :label="item.orgName"
              :value="item.id "/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button size="mini" type="primary" @click="handleSubmit()">确 定</el-button>
        <el-button size="mini" @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addStore, editData, deleteData, detailData } from '@/api/system/shop'
import { getNodeList } from '@/api/system/organization'
export default {
  name: 'Shop',
  data() {
    return {
      // 数据总条数
      totalCount: 0,
      // 查询参数
      searchParams: {
        currentPage: 1,
        pageSize: 10
      },
      // 新增/编辑门店表单校验
      storeRule: {
        storeName: [
          { required: true, message: '请输入门店名称', trigger: 'blur' }
        ],
        storeCode: [
          { required: true, message: '请输入门店代码', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        datasourceDrive: [
          { required: true, message: '请输入数据源驱动', trigger: 'change' }
        ],
        datasourceLink: [
          { required: true, message: '请输入链接', trigger: 'change' }
        ],
        orgId: [
          { required: true, message: '请选择启所属组织机构', trigger: 'change' }
        ]
      },
      // 所属组织机构
      orgIdOptions: [],
      // 是否显示门店弹窗
      showDialog: false,
      // 加载层
      loading: false,
      // 弹窗标题
      dialogTitle: '',
      // 弹窗类型
      type: '',
      list: [],
      multipleSelection: [],
      form: {
        storeName: '',
        storeCode: '',
        userName: '',
        userPwd: '',
        datasourceType: '',
        datasourceDrive: '',
        datasourceLink: '',
        orgId: ''
      },
      data: '',
      data2: '',
      storeIds: [],
      listData: '',
      Id: '',
      currentPage1: 1
    }
  },
  mounted() {
    this.$store.getters.isAutoLoadData ? this.getTableList() : ''
    this.getOrgList()
  },
  methods: {
    // table列表查询
    getTableList() {
      getList(this.searchParams).then(res => {
        this.list = res.data.list
        this.totalCount = res.data.count
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    // 获取所属机构
    getOrgList() {
      getNodeList({ type: 2 }).then(res => {
        this.orgIdOptions = res.data.list
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 点击新增/编辑按钮弹框出现
    dialogVisible(type) {
      this.type = type
      if (type === 'add') {
        this.form = {
          storeName: '',
          storeCode: '',
          userName: '',
          userPwd: '',
          datasourceType: '',
          datasourceDrive: '',
          datasourceLink: '',
          orgId: ''
        }
        this.showDialog = true
        this.form = {
          storeName: '',
          storeCode: '',
          userName: '',
          userPwd: '',
          datasourceType: '',
          datasourceDrive: '',
          datasourceLink: '',
          orgId: ''
        }
        this.$nextTick(() => {
          this.$refs['store'].resetFields()
        })
      } else {
        if (this.multipleSelection.length !== 1) {
          this.$message({
            message: '请选择一条数据进行操作',
            type: 'error'
          })
          return false
        }
        const args = {
          id: this.multipleSelection[0]['id']
        }
        detailData(args).then(res => {
          this.form = res.info
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
        this.showDialog = true
      }
    },
    // 新增/编辑数据
    handleSubmit() {
      if (this.type === 'add') {
        this.$refs['store'].validate((valid) => {
          if (valid) {
            this.loading = true
            addStore(this.form).then(res => {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.getTableList()
              this.showDialog = false
              this.loading = false
            }).catch(err => {
              this.loading = false
              this.showDialog = false
            })
          }
        })
      } else {
        this.$refs['store'].validate((valid) => {
          if (valid) {
            this.showDialog = false
            editData(this.data2).then(res => {
              this.getTableList()
              this.showDialog = false
            }).catch(err => {
              this.loading = false
              this.showDialog = false
              console.log(err)
            })
          }
        })
      }
    },
    // 点击弹框中取消和确定弹框消失
    close() {
      this.showDialog = false
    },
    // 删除数据
    remove() {
      if (this.multipleSelection.length < 1) {
        this.$message.error('至少选择一条数据')
      } else {
        const ids = []
        this.multipleSelection.forEach((item) => {
          ids.push(item.id)
        })
        deleteData(ids.join(',')).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getTableList()
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val
      this.getTableList()
    },
    handleCurrentChange(val) {
      this.searchParams.currentPage = val
      this.getTableList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shop {
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
