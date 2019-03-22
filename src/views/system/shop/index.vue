<!--
 * @Description:
 * @Author: zhangzheng
 * @LastEditors: zhangzheng
 * @Date: 2019-03-21 17:55:26
 * @LastEditTime: 2019-03-22 15:17:35
 -->
<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{ name }}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->

    <div style="margin-top:10px;">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <el-row>
            <el-button type="primary" size="mini" @click="dialogVisible('add')">新增</el-button>
            <el-button type="primary" size="mini" @click="dialogVisible('edit')">修改</el-button>
            <el-button type="primary" size="mini" @click="remove">删除</el-button>
          </el-row>
        </div></el-col>
      </el-row>
    </div>
    <div class="table" style="padding:5px;">
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          label="序号"
          width="120">
          <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          prop="storeName"
          label="门店名称"
          width="180">
          <template slot-scope="scope">{{ scope.row.storeName }}</template>
        </el-table-column>
        <el-table-column
          prop="storeCode"
          label="门店号"
          width="160">
          <template slot-scope="scope">{{ scope.row.storeCode }}</template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="160">
          <template slot-scope="scope">{{ scope.row.userName }}</template>
        </el-table-column>
        <el-table-column
          prop="userPwd"
          label="密码"
          width="160">
          <template slot-scope="scope">{{ scope.row.userPwd }}</template>
        </el-table-column>
        <el-table-column
          prop="datasourceDrive"
          label="数据源驱动"
          width="160">
          <template slot-scope="scope">{{ scope.row.datasourceDrive }}</template>
        </el-table-column>
        <el-table-column
          prop="datasourceLink"
          label="数据源链接"
          width="160">
          <template slot-scope="scope">{{ scope.row.datasourceLink }}</template>
        </el-table-column>
        <el-table-column
          prop="datasourceType"
          label="数据类型"
          width="160">
          <template slot-scope="scope">{{ scope.row.datasourceType }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top:10px;">
      <el-pagination
        :total="400"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!--新增弹框-->
    <el-dialog
      :visible.sync="show"
      :before-close="handleClose"
      title="新增门店"
      width="33%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="门店名称">
          <el-input v-model="form.storeName" size="mini"/>
        </el-form-item>
        <el-form-item label="门店编号">
          <el-input v-model="form.storeCode" size="mini"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.userName" size="mini"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.userPwd" size="mini"/>
        </el-form-item>
        <el-form-item label="数据类型">
          <el-input v-model="form.datasourceType" size="mini"/>
        </el-form-item>
        <el-form-item label="数据源驱动">
          <el-input v-model="form.datasourceDrive" size="mini"/>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.datasourceLink" size="mini"/>
        </el-form-item>
        <el-form-item label="启所属组织机构">
          <el-input v-model="form.orgId" size="mini"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList, getNew, editData, deleteData } from '@/api/system/shop'

export default {
  name: 'Shop',
  data() {
    return {
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
      show: false,
      data: '',
      data2: '',
      storeIds: [],
      listData: '',
      Id: '',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    // table列表查询
    getTableList() {
      getList().then(res => {
        this.list = res.info
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击新增/编辑按钮弹框出现
    dialogVisible(type) {
      if (type === 'add') {
        this.type = type
        this.show = true
      } else {
        this.$message.error('只能选择一条数据')
        if (this.multipleSelection.length === 1) {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.listData = this.multipleSelection[0]
            this.Id = this.listData.id
          }
          this.type = type
          this.show = true
          this.form.storeName = this.listData.storeName
          this.form.storeCode = this.listData.storeCode
          this.form.userName = this.listData.userName
          this.form.userPwd = this.listData.userPwd
          this.form.datasourceType = this.listData.datasourceType
          this.form.datasourceDrive = this.listData.datasourceDrive
          this.form.datasourceLink = this.listData.datasourceLink
          this.form.orgId = this.listData.orgId
          this.data2 = this.form
          this.data2.id = this.Id
        }
      }
    },
    // 新增/编辑数据
    handleSubmit() {
      if (this.type === 'add') {
        this.show = false
        this.data = this.form
        getNew(this.data).then(res => {
          this.getTableList()
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.show = false
        editData(this.data2).then(res => {
          this.getTableList()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 点击弹框中取消和确定弹框消失
    close() {
      this.show = false
    },
    // 新增弹框X号关闭是否关闭弹框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 删除数据
    remove() {
      if (this.multipleSelection.length < 1) {
        this.$message.error('至少选择一条数据')
      } else {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.storeIds.push(this.multipleSelection[i].id)
        }
        deleteData(this.storeIds).then(res => {
          this.getTableList()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  el-dialog el-input {
    width:300px;
    margin-bottom:15px;
  }
</style>
