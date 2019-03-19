<template>
  <div class="dashboard-container">
    <div class="search-box">
      <el-row>
        <el-col :span="14">
          <div class="search-item">
            <span>商品分类</span>
            <el-select v-model="searchs.sign" placeholder="请选择" size="small">
              <el-option label="已开具" value="1"/>
              <el-option label="未开具" value="0"/>
            </el-select>
          </div>
          <div class="search-item">
            <span>税收编码: </span>
            <el-input v-model="searchs.ssbm" size="small"/>
          </div>
          <div class="search-item">
            <span>商品或服务名称: </span>
            <el-input v-model="searchs.sphfumc" size="small"/>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple-light">
            <el-row>
              <el-button type="primary" size="small" @click="searchFn">查询</el-button>
              <el-button type="primary" size="small" @click="initSearch">重置</el-button>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="button-box">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-row>
              <el-button type="primary" size="mini">导入</el-button>
              <el-button type="primary" size="mini">导出</el-button>
              <el-button type="primary" size="mini">导入摸板下载</el-button>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="80px"/>
        <el-table-column label="序号" align="center" width="31px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="商品或服务名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.sphfumc }}
          </template>
        </el-table-column>
        <el-table-column label="商品或服务分类简" align="center">
          <template slot-scope="scope">
            {{ scope.row.sphffl }}
          </template>
        </el-table-column>
        <el-table-column label="税收分类编码" align="center">
          <template slot-scope="scope">
            {{ scope.row.ssflbm }}
          </template>
        </el-table-column>
        <el-table-column label="税率" align="center">
          <template slot-scope="scope">
            {{ scope.row.ssl }}
          </template>
        </el-table-column>
        <el-table-column label="说明" align="center">
          <template slot-scope="scope">
            {{ scope.row.sphfumc }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[25, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next, jumper, total, sizes, slot"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
        <!-- <span></span> -->
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchs: {
        // 商品分类
        sign: '',
        // 税收编码
        ssbm: '',
        // 商品或服务名称
        sphfumc: ''
      },
      listLoading: false, // loading
      list: [
        {
          sphfumc: '111',
          sl: '1.2',
          sphffl: '让啊多若',
          ssflbm: '654326',
          splikm: '优惠政策类型',
          id: 0
        },
        {
          sphfumc: '543333',
          sl: '1.2',
          sphffl: '的情况都快疯了',
          ssflbm: '543432',
          splikm: '优惠政策类型',
          id: 1
        }
      ],
      checkedList: [],
      currentPage: 1,
      pageSize: 25,
      total: 1000
    }
  },
  created() {

  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
  &-container {
     margin: 30px;
  .search-box {
  .search-item {
  // float: left;
    display: inline-block;
    margin-right: 10px;
  span {
    font-size: 14px;
  }
  }
  }
  .button-box {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  }
  &-text {
     font-size: 30px;
     line-height: 46px;
   }
  }
</style>
