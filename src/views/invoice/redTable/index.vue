<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24" class="dashboard-condition"><div class="grid-content bg-purple-dark dashboard-conditionSpan">
        购方名称:<el-input v-model="input" placeholder="请输入内容" class="dashboard-input"/>
      </div></el-col>
      <el-col :span="24" class="dashboard-condition"><div class="grid-content bg-purple-dark dashboard-conditionSpan">
        销方名称:<el-input v-model="input" placeholder="请输入内容" class="dashboard-input"/>
      </div></el-col>
      <el-col :span="24" class="dashboard-condition">
        <div class="grid-content bg-purple-dark dashboard-conditionSpan1">
          信息表状态:
          <el-select v-model="value" placeholder="请选择" class="dashboard-select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24" class="dashboard-condition"><div class="grid-content bg-purple-dark dashboard-conditionSpan1">
        信息表编号:<el-input v-model="input" placeholder="请输入内容" class="dashboard-input"/>
      </div></el-col>
      <el-col :span="24" class="dashboard-condition"><div class="grid-content bg-purple-dark dashboard-conditionSpan1">
        填开日期起:<el-date-picker v-model="value1" type="date" placeholder="选择日期" class="dashboard-select"/>
      </div></el-col>
      <el-col :span="24" class="dashboard-condition"><div class="grid-content bg-purple-dark dashboard-conditionSpan1">
        填开日期止:<el-date-picker v-model="value1" type="date" placeholder="选择日期" class="dashboard-select"/>
      </div></el-col>
      <el-button type="primary" class="dashboard-button">查询</el-button>
      <el-button type="primary" class="dashboard-button">重置</el-button>
    </el-row>
    <el-row>
      <el-col :span="24" class="dashboard-ButtonRow">
        <el-button type="primary" class="dashboard-button" @click="dialogVisible = true" >新增申请 </el-button>
        <el-button type="primary" class="dashboard-button">删除</el-button>
        <el-button type="primary" class="dashboard-button">打印</el-button>
      </el-col>
      <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="红字信息表申请" width="30%">
        <el-form ref="form" :model="form" label-width="82x">
          <el-form-item label="原发票代码">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="原发票号码">
            <el-input v-model="form.name"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="redTableOpen">下一步</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="dialogRedTable" :before-close="handleClose" width="90%">
        <el-form ref="form" :model="form" label-width="82x" class="demo-form-inline">
          <el-row style="margin-left: 60px">
            <el-col :span="24" class="dashboard-condition " style="width: 100%">
              <div class="dashboard-dialogTablebody">
                <table class="dashboard-dialogTitle">
                  <tbody>
                    <tr>
                      <td width="31.5%">填开日期：<input id="tkrq" type="text" name="tkrq" readonly="readonly" style="border: 0;"></td>
                      <td width="36%">申请方经办人：<input type="text" name="tkrq" readonly="readonly" style="border: 0;"></td>
                      <td width="31.5%"> 申请单号：<input id="sqDh" type="text" name="sqdh" readonly="readonly" style="border: 0"></td>
                    </tr>
                  </tbody>
                </table>
                <table class="dashboard-dialogTop dashboard-same">
                  <tbody>
                    <tr>
                      <td rowspan="2" width="10%" style="text-align:center;">销<br>方 </td>
                      <td style="text-align:center;" width="14%">名    称：</td>
                      <td width="26%" style="position:relative;">
                        <input type="text" class="bw-input" readonly="readonly" name="xhdwmc">
                      </td>
                      <td rowspan="2" style="text-align:center;" width="10%">购<br>方</td>
                      <td style="text-align:center;" width="14%">名    称：</td>
                      <td width="26%">
                        <input type="text" class="bw-input" readonly="readonly" name="ghdwmc">
                      </td>
                    </tr>
                    <tr>
                      <td align="center">纳税人识别号：</td>
                      <td><input type="text" class="bw-input" readonly="readonly" name="xhdwsbh" maxlength="20"></td>
                      <td align="center">纳税人识别号：</td>
                      <td><input type="text" class="bw-input" readonly="readonly" name="ghdwsbh"></td>
                    </tr>
                  </tbody>
                </table>
                <table class="dashboard-dialogCenter">
                  <tbody>
                    <tr>
                      <td class="dashboard-tab1">开<br>具<br>红<br>字<br>专<br>用<br>发<br>票<br>内<br>容</td>
                      <td style="vertical-align: top;overflow: hidden;">

                        <table class="dashboard-tabCenter">
                          <tbody>
                            <tr>
                              <td rowselect="n" style="border-bottom:1px solid #716048">
                                <table class="dashboard-tabs">
                                  <tbody>
                                    <tr class="dashboard-zzTab">
                                      <td width="4.5%">行号</td>
                                      <td rowselect="n" width="20.5%"><span style="color:red;" class="ui-hide">(清单)</span>货物或应税劳务、服务名称</td>
                                      <td width="8%">规格型号</td>
                                      <td width="6%">单位</td>
                                      <td width="9%">数量</td>
                                      <td width="10%">单价<span style="color:red" class="">(含税)</span></td>
                                      <td width="10%">金额<span style="color:red" class="">(含税)</span></td>
                                      <td width="8%">税率</td>
                                      <td width="8%">税额</td>
                                      <td width="16%">操作</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td rowselect="n">
                                <div class="dashboard-newRow">
                                  <table class=" dashboard-fyxms  dashboard-tab2 dashboard-zzTab">
                                    <tbody>
                                      <tr>
                                        <td width="4.5%" nowrap="">1</td>
                                        <td width="20.5%">
                                          <input name="lines.xmmc">
                                        </td>
                                        <td width="8%">
                                          <input name="lines.ggxh" readonly="">
                                        </td>
                                        <td width="6%">
                                          <input name="lines.dw" readonly="">
                                        </td>
                                        <td width="9%">
                                          <div><input name="lines.xmsl" maxlength="20" onmouseover="this.title=this.value" class="" autocomplete="off" value="" title="" style=""></div>
                                        </td>
                                        <td width="10%">
                                          <div><input name="lines.xmdjShow" onmouseover="this.title=this.value" class="" autocomplete="off" value="" title="" style=""></div>
                                        </td>
                                        <td width="10%">
                                          <div><input name="lines.xmjeShow" onmouseover="this.title=this.value" class="" autocomplete="off" value="" style=""></div>
                                        </td>
                                        <td width="8%">
                                          <input type="text">
                                        </td>
                                        <td width="8%">
                                          <input name="lines.se" readonly="" onmouseover="this.title=this.value">
                                        </td>
                                        <td width="16%">
                                          <div class="datagrid-cell datagrid-cell-c1-x zzj_btn">
                                            <a class="raise zzj_btn_cz jiabtn AddRow "/>

                                            <a class="delRow reduce zzj_btn_cz jianbtn DelRow "/>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>

                            <tr style="color: red;">
                              <td rowselect="n">
                                <table class=" dashboard-tab3">
                                  <tbody>
                                    <tr style="height: 18px;"/>
                                  </tbody>
                                </table>
                              </td>
                            </tr>

                            <tr style="color: #000;">
                              <td style="border-bottom: none;" rowselect="n">
                                <table class="dashboard-tab4">
                                  <tbody>
                                    <tr style="height: 18px;">
                                      <td width="10%" style="padding-left: 4px;box-sizing: border-box;color: #252D3A;">合计</td>
                                      <td rowselect="n" width="15%"/>
                                      <td width="10%"/>
                                      <td width="10%"/>
                                      <td width="10%"/>
                                      <td width="10%" align="right"><span style="color:#252D3A; font-size:14px;" class="fp_kjsj">￥</span></td>
                                      <td width="10%" style="text-align: center;color: #252D3A;">
                                        <input type="text " name="hjje" class="hj_je" style="width: 100%; border: none; " value="0.00" readonly="readonly">
                                      </td>
                                      <td width="8%" align="right">
                                        <span style="color:#252D3A; font-size:14px;" class="fp_kjsj">￥</span>
                                      </td>
                                      <td width="13%" style="text-align: center;color: #252D3A;">
                                        <input type="text " name="hjse" class="hj_je" style="width: 100%; border: none; " value="0.00" readonly="readonly">
                                      </td>
                                      <td style="border-right: 0;" width="4%"/>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="dashboard-same  dashboard-tab5">
                  <tbody>
                    <tr>
                      <td align="center" width="10%">说<br>明</td>
                      <td id="fwq" width="45% ">
                        <ul class="mleft10">

                          <li>
                            <input id="xfsq" type="radio" name="sqlx" value="2" disabled="disabled">
                            <span class="kjhzxx_xfsq font-cor">销货方申请</span>
                          </li>
                        </ul>
                      </td>
                      <td id="skp" style="display: none;" width="45% ">
                        <ul class="mleft10">
                          <li>
                            <div class="kjhzxx_gfsq font-cor">
                              <input type="radio" name="gforxfsq" value="1" disabled="disabled">
                              <span class="">一、购买方申请</span>
                            </div>
                            <div class="kjhzxx_gfsq ml20 font-cor">
                            <input type="radio" name="ydkorwdksq" value="0" disabled="disabled">已抵扣</div>
                            <div class="wdksq kjhzxx_gfsq ml20 font-cor">
                              <input type="radio" name="ydkorwdksq" value="7" disabled="disabled">未抵扣
                            </div>
                            <div class="ml40">
                              <p>
                                <input id="wdksq3" type="radio" name="wdksq" value="1" disabled="disabled">
                                <span class="wdksq font-cor">（1）无法认证</span>
                              </p>
                              <p>
                                <input id="wdksq4" type="radio" name="wdksq" value="2" disabled="disabled">
                                <span class="wdksq font-cor">（2）纳税人识别号认证不符</span>
                              </p>
                              <p>
                                <input id="wdksq5" type="radio" name="wdksq" value="3" disabled="disabled">
                                <span class="wdksq font-cor">（3）增值税专用发票代码、号码认证不符</span>
                              </p>
                              <p>
                                <input id="wdksq6" type="radio" name="wdksq" value="4" disabled="disabled">
                                <span class="wdksq font-cor">（4）所购货物不属于增值税扣税项目范围</span>
                              </p>
                            </div>
                          </li>
                          <li>
                            <input type="radio" name="gforxfsq" value="2" disabled="disabled">
                            <span class="kjhzxx_xfsq font-cor">销货方申请</span>
                            <div class="ml40">
                              <p>
                                <input id="xfsq7" type="radio" name="sqxf" value="5" disabled="disabled">
                                <span class="kjhzxx_xfsq font-cor">（1）因开票有误购方拒收的</span>
                              </p>
                              <p>
                                <input id="xfsq8" type="radio" name="sqxf" value="6" disabled="disabled">
                                <span class="kjhzxx_xfsq font-cor">（2）因开票有误等原因尚未交付的</span>
                              </p>
                            </div>
                          </li>
                        </ul>
                      </td>
                      <td width="45%" style="padding: 5px;">
                        <div>
                          <div class="kjhzxx_xfsq mbt5 margin_left mbottom10 font-cor">对应蓝字专用发票密码区内打印的发票信息：</div>
                          <div >
                            <span>发票代码：</span>
                            <input type="text" name="fpdm" disabled="true" class="hzxx_input search-input" value="">
                          </div>
                          <div>
                            <span>发票号码：</span>
                            <input id="fphmsq" type="text" name="fphm" disabled="true" class="hzxx_input search-input" value="">
                          </div>
                          <div style="font-size: 14px;">
                            <span>发票种类：</span>
                            <span>增值税专用发票</span>
                          </div>
                          <div>
                            <span style="font-size: 14px;">联系电话：</span>
                            <input type="text " class="hzxx_input search-input" autocomplete="off" placeholder="" name="lxfs">
                            <input type="hidden" class="textbox-value" value="">
                          </div>
                          <div>
                            <span style="float: left;display: inline;">申请理由：</span>

                            <textarea name="sqly" data-exclude="true" style="border: 1px solid #E0E0E0"/>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">保存</el-button>
        </span>
      </el-dialog>
    </el-row>
    <el-row>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120"/>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip/>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page = "currentPage4"
          :page-sizes = "[100, 200, 300, 400]"
          :page-size = "100"
          :total = "400"
          layout = "total, sizes, prev, pager, next, jumper"
          @size-change = "handleSizeChange"
          @current-change = "handleCurrentChange"/>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      form: {
        name: ''
      },
      input: '',
      value1: '',
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
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      currentPage4: 4,
      dialogVisible: false,
      dialogRedTable: false
    }
  },
  methods: {
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
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    redTableOpen() {
      this.dialogVisible = false
      this.dialogRedTable = true
    }

  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
  &-container {
    margin: 30px;
    z-index: 100;
  }
  &-condition{
   width: 250px;
  }
  &-conditionSpan{
    text-align: right;
    width: 250px;
    display: inline-block;
  }
  &-conditionSpan1{
    text-align: right;
    width: 250px;
    display: inline-block;
  }
  &-select{
    width: 150px;
    display: inline-block;
  }
  &-input{
    width: 150px;
  }
  &-button{
    display: inline-block;
    float: left;
    margin-left: 20px;
    padding: 10px;
  }
  &-ButtonRow{
    margin-top: 10px;
  }
   &-dialogTitle {
      height: 34px;
      width: 800px;
      margin: 0 auto;
    }
  form {
    padding: 0px;
  }
  .hzfp_all {
    width: 1152px;
    overflow: hidden;
    background: #fff;
    margin: 0 auto 0;
    border: 1px solid #E0E0E0;
    box-shadow: 0 0 10px #CCC;
  }
  .hzbg_left {
    width: 40px;
    overflow: hidden;
    height: 535px;
    float: left;
    background: #fff;
    border-right: 1px dashed #F0F0F0;
  }
  &-dialogTablebody {
    color: #B2945F;
    float: left;
    width: 1048px;
  }

  table{
    border-collapse: initial;
    border-spacing: 0;
    display: table;
    border-color: grey;
    color: #B2945F;
  }
    &-same, &-same tr td {
    border: 1px solid #B2945F;
    border-collapse: collapse;
    color: #B2945F;
  }
  &-dialogTop {
    width: 1000px;
    margin: -1px auto 0;
    position: relative;
    float: none;
    background-color: #fff;
  }
  &-dialogCenter {
    border: 1px solid #B2945F;
    table-layout: fixed;
    width: 1000px;
    margin: -1px auto 0;
  }
    &-same, &-same tr td {
    border: 1px solid #B2945F;
    border-collapse: collapse;
    color: #B2945F;
  }
  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }
  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }
  td, th {
    display: table-cell;
    vertical-align: inherit;
  }
  input {
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
  }
  input, textarea, select, button {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    font: 400 13.3333px Arial;
  }
  input, textarea, select, button, meter, progress {
    -webkit-writing-mode: horizontal-tb !important;
  }
  &-same tr {
    height: 24px;
    line-height: 24px;
  }
  &-same tr td {
    height: 22px;
  }
  &-tab1 {
    border-right: 1px solid #B2945F;
    text-align: center;
    width: 5%;
    height: 140px;
  }
  &-tabCenter {
    border: none;
  }
    &-tabCenter {
    width: 100%;
    margin: -1px auto 0;
    table-layout: fixed;
      font-size: 12px!important;
  }
  &-tabs {
    margin-bottom: -4px;
    table-layout: fixed;
    width: 100%;
    margin-top: -9px;
  }
  &-zzTab {
    width: 100%;
  }
  &-zzTab td {
    font-size: 12px;
    height: 39px;
  }
  &-zzTab td {
    border-right: 1px solid #B2945F;
    text-align: center;
    border-bottom: 1px solid #B2945F;
  }
    &-newRow {
    min-height: 122px;
      overflow: auto;
      width: 100%;
  }
  &-tab2 {
    table-layout: fixed;
    width: 100%;
  }
  &-fyxms td {
    height: 30px;
  }
    &-newRow td {
    border-bottom: 1px solid #B2945F;
  }
  &-zzTab td {
    border-right: 1px solid #B2945F;
    text-align: center;
  }
    &-zzTab td:last-child {
    border-right: none;
  }
  &-tab3 {
    color: red;
    table-layout: fixed;
    width: 100%;
    border-top: 1px solid #B2945F;
    height: 24px
  }
  &-tab4 {
    color: #000;
    table-layout: fixed;
    width: 100%;
  }
  &-tab5{
    margin: -1px auto 0;
    width: 1000px;
    height: 110px;
    position: relative;
    float: none;
  }
  input{
    border: none;
  }
    &-newRow td input{
    width: 100%;
  }
}
</style>
