<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <el-form ref="queryConditionsForm" :model="queryConditionsForm" :inline="true" label-width="120px" size="mini" class="demo-form-inline" >
      <el-form-item label="购方名称">
        <el-input v-model="queryConditionsForm.name"/>
      </el-form-item>
      <el-form-item label="二级供应商编码">
        <el-input v-model="queryConditionsForm.name"/>
      </el-form-item>
      <el-form-item label="费用单据编号">
        <el-input v-model="queryConditionsForm.name"/>
      </el-form-item>
      <el-form-item label="结算单号">
        <el-input v-model="queryConditionsForm.name"/>
      </el-form-item>
      <el-form-item
        prop="name"
        label="单据起号">
        <el-input v-model.number="queryConditionsForm.name"/>
      </el-form-item>
      <el-form-item label="单据止号">
        <el-input v-model="queryConditionsForm.name"/>
      </el-form-item>
      <el-form-item label="传输起止日期" prop="date2">
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker v-model="queryConditionsForm.date1" type="date" placeholder="选择日期" style="width: 100%; margin-right:0px;" class="fixedclass"/>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="line" style="text-align:center;padding-right:10px;">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-date-picker v-model="queryConditionsForm.date2" type="date" placeholder="选择日期" style="width: 100%;" class="fixedclass"/>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="订单状态" prop="region" >
        <el-select v-model="queryConditionsForm.region" placeholder="请选择" class="fixedclass">
          <el-option v-for="(item,key) in region" :key="key" :value="item.text"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="reset('queryConditionsForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      queryConditionsForm: {
        name: '',
        region: '',
        date1: '',
        date2: ''
      },
      region: [
        {
          id: 0,
          text: '快车'
        },
        {
          id: 1,
          text: '专车'
        },
        {
          id: 2,
          text: '顺风车'
        },
        {
          id: 3,
          text: '出租车'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  methods: {
    onSubmit() {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },
    reset(queryConditionsForm) {
      this.$nextTick(() => {
        this.$refs[queryConditionsForm].resetFields()
        this.$message({
          message: '查询条件重置成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    margin: 10px;
   .el-col .el-form-item--mini.el-form-item{
      margin-bottom: 0px;
    }
    .fixedclass .el-input--suffix .el-input__inner{
    padding-right: 15px !important;
  }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
