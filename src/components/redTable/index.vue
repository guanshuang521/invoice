<!--子组件:票面-->
<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="organization-container"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <div :class="{readonly: !editable}" class="hzfp_all">
      <div class="fpbg_left hzbg_left fl">
        <ul class="edge_left hz_left">
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
        </ul>
      </div>
      <div class="hzxx_tablebody" ui="type:Control;id:hzxxbContainpm">
        <table class="hzfp_title" ui="type:Control;id:hzxxbContainTitle">
          <tbody>
            <tr>
              <td width="33%">填开日期：<input v-model="formdata.tkrq" type="text" readonly="readonly" style="border: 0"></td>
              <td width="33%"> 申请方经办人：<input v-model="formdata.sqrmc" type="text" readonly="readonly" style="border:0"></td>
              <td width="33%"> 申请单号：<input v-model="formdata.sqdh" type="text" readonly="readonly" style="border: 0;width: 190px"></td>
            </tr>
          </tbody>
        </table>
        <!-- // 上部分 -->
        <table class="pop-up fff hztab_top">
          <tbody>
            <tr>
              <td rowspan="2" width="10%" style="text-align:center;">销<br>方 </td>
              <td class="td_border" style="text-align:center;" width="14%">名称：</td>
              <td class="td_border" width="26%" style="position:relative;">
                <input v-model="formdata.xhdwmc" type="text" class="bw-input" readonly="readonly">
              </td>
              <td rowspan="2" style="text-align:center;" width="10%">购<br>方</td>
              <td class="td_border" style="text-align:center;" width="14%">名称：</td>
              <td class="td_border" width="26%">
                <input v-model="formdata.ghdwmc" type="text" class="bw-input" readonly="readonly">
              </td>
            </tr>
            <tr>
              <td class="td_border" align="center">纳税人识别号：</td>
              <td class="td_border">
                <input v-model="formdata.xhdwsbh" type="text" class="bw-input" readonly="readonly">
              </td>
              <td class="td_border" align="center">纳税人识别号：</td>
              <td class="td_border">
                <input v-model="formdata.ghdwsbh" type="text" class="bw-input" readonly="readonly">
              </td>
            </tr>
          </tbody>
        </table>
        <!-- // 中间部分 -->
        <table class="hztab_center" style="display: block;max-height: 200px;overflow-y: scroll;pointer-events: all">
          <tbody>
            <tr>
              <td class="hzxx_tab1">开<br>具<br>红<br>字<br>专<br>用<br>发<br>票<br>内<br>容</td>
              <td style="vertical-align: top;overflow: hidden;position: relative">
                <table id="fyxmdiv" class="tab_center">
                  <tbody>
                    <tr class="zz_tab">
                      <td width="4.5%">行号</td>
                      <td rowselect="n" width="20.5%"><span style="color:red;" class="ui-hide">(清单)</span>货物或应税劳务、服务名称</td>
                      <td width="8%">规格型号</td>
                      <td width="6%">单位</td>
                      <td width="9%">数量</td>
                      <td width="10%">单价<span style="color:red">(含税)</span></td>
                      <td width="10%">金额<span style="color:red">(含税)</span></td>
                      <td width="8%">税率</td>
                      <td width="8%">税额</td>
                    </tr>
                    <tr v-for="(item,index) in formdata.lines" :key="item.id" class="zz_tab">
                      <td width="4.5%">{{ index+1 }}</td>
                      <td id="spmctitle" rowselect="n" width="20.5%">
                        <input v-model="item.spmc" type="text" class="formInput">
                      </td>
                      <td width="8%">
                        <input v-model="item.ggxh" type="text" class="formInput">
                      </td>
                      <td width="6%">
                        <input v-model="item.dw" type="text" class="formInput">
                      </td>
                      <td width="9%">
                        <input v-model="item.cpsl" type="text" class="formInput">
                      </td>
                      <td width="10%">
                        <input v-model="item.dj" type="text" class="formInput">
                      </td>
                      <td width="10%">
                        <input v-model="item.je" type="text" class="formInput">
                      </td>
                      <td width="8%">
                        <input v-model="item.sl" type="text" class="formInput">
                      </td>
                      <td width="8%">
                        <input v-model="item.se" type="text" class="formInput">
                      </td>
                    </tr>
                  </tbody>
                </table>
                <ul class="hjtop" style="position: absolute;width: 100%;bottom: 0">
                  <li style="width:60%;padding-left: 5px;">合计</li>
                  <li style="width:18%">￥{{ formdata.hjje }}</li>
                  <li style="width:20%">￥{{ formdata.hjse }}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- // 下部分 -->
        <table class="pop-up fff hzxx_tab5">
          <tbody>
            <tr>
              <td align="center" width="10%">说<br>明</td>
              <td id="fwq" width="45% ">
                <ul class="mleft10">
                  <li>
                    <input id="xfsq" type="radio" name="sqlx" value="2" disabled="disabled" checked>
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
                <div class="search-items" style="margin-bottom: 10px">
                  <div class="kjhzxx_xfsq mbt5 margin_left mbottom10 font-cor">对应蓝字专用发票密码区内打印的发票信息：</div>
                  <div class="search-item" style="margin-bottom: 10px">
                    <span class="hzxx_span search-label">发票代码：</span>
                    <input v-model="formdata.yfpdm" type="text" readonly class="hzxx_input search-input">
                  </div>
                  <div class="search-item" style="margin-bottom: 10px">
                    <span class="hzxx_span search-label">发票号码：</span>
                    <input v-model="formdata.yfphm" type="text" readonly class="hzxx_input search-input">
                  </div>
                  <div class="search-item" style="margin-bottom: 10px">
                    <span class="hzxx_span">发票种类：</span>
                    <span>增值税专用发票</span>
                  </div>
                  <div class="search-item" style="margin-bottom: 10px">
                    <span class="hzxx_span search-label" style="font-size: 14px;">联系电话：</span>
                    <input v-model="formdata.lxfs" type="text" class="hzxx_input search-input">
                  </div>
                  <div class="search-item">
                    <span class="fl hzxx_span search-label" style="float: left;display: inline;">申请理由：</span>
                    <textarea v-model="formdata.sqly" class="sqly_area" data-exclude="true" style="border: 1px solid #E0E0E0;margin-left: 4px"/>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="fpbg_right hzbg_left">
        <ul class="edge_left hz_left">
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
        </ul>
      </div>
    </div>
    <div v-if="editable" slot="footer" class="dialog-footer" align="center" style="margin-bottom: 20px">
      <el-button type="primary" size="mini" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import { detail, editDetail, insert, editSave } from '@/api/invoice/redTable'
export default {
  name: 'Hzfp',
  components: {
    /* 'v-pagination': pagination*/
  },
  props: {
    'form': {
      type: Object,
      default: {}
    },
    'editable': {
      type: Boolean,
      default: true
    },
    'isEdit': {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      formdata: {
        // 填开日期
        tkrq: '',
        // 申请方经办人
        sqrmc: '',
        // 申请单号
        sqdh: '',
        // 销方名称
        xhdwmc: '',
        // 销方税号
        xhdwsbh: '',
        // 购方名称
        ghdwmc: '',
        // 购方税号
        ghdwsbh: '',
        // 联系电话
        lxfs: '',
        // 申请理由
        sqly: '',
        // 原发票代码
        yfpdm: '',
        // 原发票号码
        yfphm: '',
        lines: [],
        sqlx: 2
      }
    }
  },
  mounted: function() {
    this.isEdit ? this.editDetail() : this.detail()
  },
  methods: {
    // 获取编辑详情
    editDetail() {
      editDetail({ id: this.form.id }).then(res => {
        this.formdata = res.data
        this.formdata.sqlx = 2
        console.log(this.formdata)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 获取详情
    detail() {
      detail(this.form).then(res => {
        this.formdata = res.data.hzxxb
        this.formdata.sqlx = 2
        console.log(res)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    save() {
      this.loading = true
      if (this.isEdit) {
        editSave(this.formdata).then(res => {
          this.loading = false
          this.$message.success(res.message)
          this.$emit('closeDialog', true)
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      } else {
        insert(this.formdata).then(res => {
          this.loading = false
          this.$message.success(res.message)
          this.$emit('closeDialog', true)
        }).catch(err => {
          this.loading = false
          this.$message.error(err)
        })
      }
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  .hjtop li{
    display: inline-block;
  }
  .formInput{
    width: 90%;
    margin: 5% auto;
    text-align: center;
    border: none;
    pointer-events: none;
  }
  .hzfp_all {
    width: 1154px;
    overflow: hidden;
    background: #fff;
    margin: 15px auto 15px;
    border: 1px solid #E0E0E0;
    box-shadow: 0 0 10px #CCCCCC;
  }
  .fpbg_left {
    width: 50px;
    float: left;
    background: #fff;
    border-right: 1px dashed #F0F0F0;
  }
  .fpbg_right {
    width: 50px;
    float: left;
    background: #fff;
    border-left: 1px dashed #F0F0F0;
  }
  .edge_left li {
    width: 20px;
    height: 20px;
    margin: 32px auto;
    background: url('../../assets/common/circle.png') no-repeat center;
  }
  .hzxx_tablebody {
    color: #B2945F;
    float: left;
    width: 1048px;
  }
  .hzxx_tablebody .pop-up,
  .hzxx_tablebody .pop-up tr td {
    border: 1px solid #B2945F;
    border-collapse: collapse;
    color: #B2945F;
  }
  .hzxx_tablebody .tablenoborder,
  .hzxx_tablebody .tablenoborder tr td {
    border: 0px solid #B2945F;
  }
  .hzfp_title {
    height: 60px;
    width: 1000px;
    margin: 0 auto;
  }
  .hztab_top {
    width: 1000px;
    border: 1px solid #B2945F;
    margin: 0 auto;
    position: relative;
    float: none;
  }
  .pop-up tr td textarea {
    resize: none;
    overflow: auto;
  }
  .td_border .small_select{
    top:4px!important;
  }
  .bw-input {
     width: 90%;
     border: none;
     margin-left: 3px;
     color: #252D3A;
   }
  .hztab_center {
    border: 1px solid #B2945F;
    border-top: none;
    border-bottom: none;
    border-collapse: collapse;
    table-layout: fixed;
    width: 1000px;
    margin: 0 auto;
    .tab_center{
      width: 100%;
    }
  }
  .hzxx_tab1 {
    border-right: 1px solid #B2945F;
    text-align: center;
    width: 5%;
    height: 140px;
  }
  .hzxx_tab5 {
    margin: 0 auto;
    width: 1000px;
    height: 110px;
    position: relative;
    float: none;
  }
  .font-cor {
    color: #CCCCCC;
  }
  .ml40 {
    margin-left: 40px;
  }
  .mbottom10 {
    margin-bottom: 10px;
  }
  .hzxx_span {
    line-height: 30px;
  }
  .hzxx_input {
    width: 280px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #E0E0E0;
    background-color: #fff;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    padding-left: 5px;
    box-sizing: border-box;
    color: #252D3A;
  }
  .sqly_area {
    height: 50px;
    width: 315px;
    border: 1px solid #DDE2E8;
    border-radius: 4px;
    color: black;
    padding: 10px;
    margin-bottom: 10px;
  }
  .tab_center {
    table-layout: fixed;
    width: 1000px;
    margin: 0 auto;
    font-size: 12px !important;
    input{
      font-size: 12px !important;
    }
  }
  .spaninp {
    display: inline-block;
    width: 139px;
  }
  .zz_tab td {
    border-right: 1px solid #B2945F;
    border-bottom: 1px solid #B2945F;
    text-align: center;
  }
  .zz_tab td:last-child{
    border-right:none;
  }
  .zz_tab td {
    font-size: 12px;
    height: 39px;
  }
  .ui-hide{
    display: none;
  }
  table {
    border-spacing: 0;
  }
  .readonly{
    pointer-events: none!important;
  }
</style>
