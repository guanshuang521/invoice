<template>
  <div class="dashboard-container">
    <div class="search-box">
      <el-row>
        <el-col :span="9">
          <div class="search-item">
            <span>商品名称: </span>
            <el-input v-model="searchs.commodityName" size="small"/>
          </div>
          <div class="search-item">
            <span>商品编码: </span>
            <el-input v-model="searchs.comcode" size="small"/>
          </div>
        </el-col>
        <el-col :span="9">
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
              <el-button type="primary" size="mini">新增</el-button>
              <el-button type="primary" size="mini">设置税收分类编码</el-button>
              <el-button type="primary" size="mini">导出数据</el-button>
              <el-button type="primary" size="mini">Excel模板下载</el-button>
              <el-button type="primary" size="mini">导入Excel</el-button>
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
        <el-table-column label="商品编码" align="center">
          <template slot-scope="scope">
            {{ scope.row.spbm }}
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.spmc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品税目" align="center">
          <template slot-scope="scope">
            {{ scope.row.spsm }}
          </template>
        </el-table-column>
        <el-table-column label="简码" align="center">
          <template slot-scope="scope">
            {{ scope.row.jcode }}
          </template>
        </el-table-column>
        <el-table-column label="规格型号" align="center">
          <template slot-scope="scope">
            {{ scope.row.ggxh }}
          </template>
        </el-table-column>
        <el-table-column label="单价" align="center">
          <template slot-scope="scope">
            {{ scope.row.UnitPrice }}
          </template>
        </el-table-column>
        <el-table-column label="计量单位" align="center">
          <template slot-scope="scope">
            {{ scope.row.meteringcom }}
          </template>
        </el-table-column>
        <el-table-column label="含税标志" align="center">
          <template slot-scope="scope">
            {{ scope.row.hssign }}
          </template>
        </el-table-column>
        <el-table-column label="税收分类编码" align="center">
          <template slot-scope="scope">
            {{ scope.row.ssflbm }}
          </template>
        </el-table-column>
        <el-table-column label="税收分类名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.ssflmc }}
          </template>
        </el-table-column>
        <el-table-column label="税率" align="center">
          <template slot-scope="scope">
            {{ scope.row.sl }}%
          </template>
        </el-table-column>
        <el-table-column label="零税率标识" align="center">
          <template slot-scope="scope">
            {{ scope.row.lslbs }}
          </template>
        </el-table-column>
        <el-table-column label="免税类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.mslx }}
          </template>
        </el-table-column>
        <el-table-column label="是否享受优惠政策" align="center">
          <template slot-scope="scope">
            {{ scope.row.sfxsyh }}
          </template>
        </el-table-column>
        <el-table-column label="优惠政策类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.yhzclx }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
export default{
  name: 'Dashboard',
  data() {
    return {
      listLoading: false, // loading
      list: [
        {
          spbm: '111',
          spmc: '安斯里',
          spsm: '245677',
          jcode: '421456',
          ggxh: '76543d',
          UnitPrice: '10000',
          meteringcom: '元',
          hssign: '大萨达',
          ssflbm: '65432',
          ssflmc: '987654332',
          sl: '1.2',
          lslbs: '零税率标识',
          mslx: '免税类型',
          sfxsyh: '是',
          yhzclx: '优惠政策类型',
          id: 0
        },
        {
          spbm: '222',
          spmc: '安斯里',
          spsm: '4444',
          jcode: '5555',
          ggxh: '76543d',
          UnitPrice: '33333',
          meteringcom: '元',
          hssign: '阿萨德',
          ssflbm: '65432',
          ssflmc: '987654332',
          sl: '1.2',
          lslbs: '零税率标识',
          mslx: '免税类型',
          sfxsyh: '否',
          yhzclx: '优惠政策类型',
          id: 1
        }
      ],
      searchs: {
        // 商品名称
        commodityName: '111',
        // 商品编码
        comcode: '222'
      },
      checkedList: [],
      currentPage: 1,
      pageSize: 25,
      total: 1000
    }
  },
  methods: {
    searchFn() {
    },
    initSearch() {
      this.searchs = {
        commodityName: '',
        comcode: ''
      }
    },
    handleSelectionChange(val) { // 表格选中数据发生变化
      this.checkedList = val
    },
    handleEdit(ind, rows) { // 编辑
      console.log(rows)
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
  .search-box {
  .search-item {
  // float: left;
    display: inline-block;
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
