<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{ name }}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <div>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          <el-input v-model="input" placeholder="请输入内容" style="width:130px;"/>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <el-row>
            <el-button type="primary" size="mini">查询</el-button>
            <el-button type="primary" size="mini">重置</el-button>
          </el-row>
        </div></el-col>
      </el-row>
    </div>
    <div style="margin-top:10px;">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          <el-row>
            <el-button type="primary" size="mini">新增</el-button>
            <el-button type="primary" size="mini">删除</el-button>
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
          label="日期"
          width="120">
          <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
          <template slot-scope="scope">{{ scope.row.storeName }}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="120">
          <template slot-scope="scope">{{ scope.row.storeCode }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top:10px;">
      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :current-page="currentPage4"
        :total="400"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getList } from '@/api/system/shop'

export default {
  name: 'Dashboard',
  data() {
    return {
      input: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      list: [],
      multipleSelection: [],
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
        console.log(res, 88888)
      }).catch(err => {
        console.log(err)
      })
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
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
</style>
