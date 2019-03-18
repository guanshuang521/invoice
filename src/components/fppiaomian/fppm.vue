<!--子组件:票面-->
<template>
    <div class="fppm">
        <div class="edgebg leftEdge">
            <ul class="edge_left">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        
        <div class="pm_all">
            <div class="fpTitle">
                <div class="fpTitleLeft">
                    <img  v-if="formdata.fplx == this.$store.getters.fplx_ele" src="../../assets/common/logo_dian.png">
                    <img  v-if="formdata.fplx == this.$store.getters.fplx_gen" src="../../assets/common/logo_pu.png">
                    <img  v-if="formdata.fplx == this.$store.getters.fplx_spe" src="../../assets/common/logo_zhuan.png">
                </div>
                <div class="fpTitleCenter">
                    <div v-if="formdata.fplx == this.$store.getters.fplx_ele" id="titleText">增值税电子发票</div>
                    <div v-if="formdata.fplx == this.$store.getters.fplx_gen" id="titleText">增值税普通发票</div>
                    <div v-if="formdata.fplx == this.$store.getters.fplx_spe" id="titleText">增值税专用发票</div>
                </div>
                <div class="fpTitleRight">
                    <img src="../../assets/common/no.jpg">
                    <div class="titlekprq">
                        <span class="kprqText">开票日期：</span>
                        <span class="kprq">{{kprq}}</span>
                    </div>
                </div>
            </div>
            <div class="fpTable">
                <div class="tableTop">
                    <div class="tbT gmfText">购<br>买<br>方</div>
                    <div class="tbT gmfTable">
                        <div class="tbmc">
                            <span class="gmftitle">名　　　　称：</span>
                            <input class="gmfcontent" v-model="formdata.gmf_mc">
                            <button class="small_select customerSelect" type="button">···</button>
                        </div>
                        <div class="tbnsrsbh">
                            <span class="gmftitle">纳税人识别号：</span>
                            <input class="gmfcontent" v-model="formdata.gmf_nsrsbh">
                        </div>
                        <div class="tbdzdh">
                            <span class="gmftitle">地址  、  电话：</span>
                            <input class="gmfcontent" v-model="formdata.gmf_dzdh">
                        </div>
                        <div class="tbkhh">
                            <span class="gmftitle">开户行及账号：</span>
                            <input class="gmfcontent" v-model="formdata.gmf_yhzh">
                        </div>
                    </div>
                    <div class="tbT mmqText">密<br>码<br>区</div>
                    <div class="tbT mmqTable"></div>
                </div>
                <div class="tableLines">
                    <ul class="linesTitle">
                        <li style="width:5%">行号</li>
                        <li style="width:20%">货物或应税劳务、服务名称</li>
                        <li style="width:8%">规格型号</li>
                        <li style="width:6%">单位</li>
                        <li style="width:9%">数量</li>
                        <li style="width:10%">单价</li>
                        <li style="width:10%">金额</li>
                        <li style="width:8%">税率</li>
                        <li style="width:8%">税额</li>
                        <li style="width:16%">操作</li>
                    </ul>
                    <div class="linesList">
                       <!--<tr v-for="(item, index) in lines.length" :model="lines[index]" :key="item.id" :class="lines[index].fphxz === '1' ? 'discount_tr' : ''">-->
                        <ul class="linesConten" v-for="(item, index) in formdata.lines"  :key="item.id">
                            <li style="width:5%">{{index + 1}}</li>
                            <li style="width:20%;position: relative;">
                                <input v-model="formdata.lines[index].xmmc">
                                <button class="small_select taxNumSelectBtn" style="top:7px" @click="dialogTableVisible = true">···</button>
                            </li>
                            <li style="width:8%">
                                <input v-model="formdata.lines[index].ggxh" readOnly>
                            </li>
                            <li style="width:6%">
                                <input v-model="formdata.lines[index].dw" readOnly>
                            </li>
                            <li style="width:9%"><input v-model="formdata.lines[index].xmsl"></li>
                            <li style="width:10%"><input v-model="formdata.lines[index].xmdj"></li>
                            <li style="width:10%"><input v-model="formdata.lines[index].xmje"></li>
                            <li style="width:8%">
                                <input v-model="formdata.lines[index].sl" readOnly>
                            </li>
                            <li style="width:8%">
                                <input v-model="formdata.lines[index].se" readOnly>
                            </li>
                            <li style="width:16%">
                                <div class="czbtn">
                                    <a class="addRow" @click="addBtn"></a>
                                    <!--<a class="ywbmBtn">业务编号</a>-->
                                    <a class="delRow" @click="delBtn"></a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tablehj">
                    <ul class="hjtop">
                        <li style="width:60%;padding-left: 5px;">合计</li>
                        <li style="width:18%">￥{{formdata.hjje}}</li>
                        <li style="width:20%">￥{{formdata.hjse}}</li>
                    </ul>
                    <ul class="hjbottom">
                        <li style="width:20%;" class="hjTitle">价税合计（大写）</li>
                        <li style="width:40%">
                            <img src="../../assets/common/hjdx.png" style="float: left;margin: 4px 3px;">
                            {{formdata.jshjupper}}
                        </li>
                        <li style="width:10%" class="hjTitle">（小写）</li>
                        <li style="width:30%">￥{{formdata.jshj}}</li>
                    </ul>
                </div>
                <div class="tableBottom">
                    <div class="tbB xsfText">销<br>售<br>方</div>
                    <div class="tbB xsfTable">
                        <div class="tbmc">
                            <span class="xsftitle">名　　　　称：</span>
                            <span class="xsfcontent" v-model="formdata.xsf_mc"></span>
                        </div>
                        <div class="tbnsrsbh">
                            <span class="xsftitle">纳税人识别号：</span>
                            <span class="xsfcontent" v-model="formdata.xsf_nsrsbh"></span>
                        </div>
                        <div class="tbdzdh">
                            <span class="xsftitle">地址  、  电话：</span>
                            <span class="xsfcontent" v-model="formdata.xsf_dzdh"></span>
                        </div>
                        <div class="tbkhh">
                            <span class="xsftitle">开户行及账号：</span>
                            <span class="xsfcontent" v-model="formdata.xsf_yhzh"></span>
                        </div>
                    </div>
                    <div class="tbB bzText">备<br><br>注</div>
                    <div class="tbB bzTable">
                        <textarea v-model="formdata.xsf_yhzh"></textarea>
                    </div>
                </div>
            </div>
            <div class="fpmsg">
                <div class="msgText">收款人：</div>
                <div class="msgCon" v-model="formdata.skr"></div>
                <div class="msgText">复核人：</div>
                <div class="msgCon" v-model="formdata.fhr"></div>
                <div class="msgText"><span class="required">*</span>开票人：</div>
                <div class="msgCon" v-model="formdata.kpr"></div>
                <div class="msgText"><span class="required">*</span>销售方：(章)</div>
                <div class="msgCon"></div>
            </div>
            <div class="fphintmsg">
                <p>信息提示：您目前开票选择的业务类型为“”，绑定的业务编号为“”</p>
                <p>绑定的流水号为“”,接收发票推送的邮箱为“”</p>
            </div>
        </div>
        
        <div class="edgebg rightEdge">
            <ul class="edge_right">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        
        <!--选择税收编码-->
        <el-dialog title="选择税收编码" :visible.sync="dialogTableVisible">
            <div class="dialog_item">
              <div class="search_item">
                <div class="search_label">商品税收编码：</div>
                <input class="search_input" type="text" v-model="goods.spssbm">
              </div>
              <div class="search_item">
                <div class="search_label">商品名称：</div>
                <input class="search_input" type="text" v-model="goods.spmc">
              </div>
              <div class="bluebtn" @click="getGoodsList">查询</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getDate } from '@/utils/datefilter'
import { getDx } from '@/utils/dxfilter'
export default {
    name:'fppm',
    props: ['pmfplx'],
    data() {
        return {
            // 票面form信息
            formdata:{
                fpqqlsh:'',
                fplx:this.pmfplx,
                bmb_bbh:'',
                zsfs:'',
                xsf_nsrsbh:'',
                xsf_mc:'',
                xsf_dzdh:'',
                xsf_yhzh:'',
                gmf_nsrsbh:'',
                gmf_mc:'',
                gmf_dzdh:'',
                gmf_yhzh:'',
                gmf_sjh:'',
                gmf_dzyx:'',
                kpr:'',
                fhr:'',
                skr:'',
                yfp_dm:'',
                yfp_hm:'',
                jshj:'',
                jshjupper:'',
                hjje:'',
                hjse:'',
                kce:'',
                bz:'',
                hylx:'',
                tspz:'',
                ent_id:'',
                od_no:'',
                od_lsh:'',
                wd_id:'',
                kpzh:'',
                lines: [
                    {
                      num: '1', // 序号
                      commodityId: '', // 商品编号
                      fphxz: '0', // 0 正常行,1折扣行,2被折扣行
                      yhzcbs: '0',  //优惠政策标识  0：不使用，1：使用
                      lslbs: '', // 零税率标识，空：非零税率， 1：免税，2：不征收，3 普通零税率
                      spmc: '', // 商品名称
                      spbh: '', // 商品编号
                      spbm: '', // 商品编码
                      xmmc: '', // 项目名称
                      zxbm: '', // 自行编码
                      ggxh: '', // 规格型号
                      dw: '', // 单位
                      xmsl: '', // 项目数量
                      hsxmdj: '', // 含税项目单价
                      xmdjShow: '', // 前端显示项目单价
                      xmdj: '', // 不含税项目单价
                      hsxmje: '', // 含税项目金额
                      xmjeShow: '', // 前端显示项目金额
                      xmje: '', // 不含税项目金额
                      sl: '', // 税率
                      se: '', // 税额
                      ywbh: '', // 业务编号
                      zzstsgl:''  //增值税特殊管理 
                    }
                ],
            },
            
            kprq:'',
            dialogTableVisible: false,
            // 商品信息
            goods: {
                dialogGoodsShow: false, // 选择商品弹框
                dialogGoodsIndex: '', // 打开第几个商品
                item: '',
                totalCount: 0,
                pageSize: 5,
                pageNum: 1,
                spssbm: '',
                spmc: '',
                goodsList: []
            }
        }
    },
    modules: {
        
    },
    computed: {
    },
    created:function(){
    },
    mounted:function(){
        this.kprq = getDate(new Date().getTime(),'yyyy年MM月dd日');
        // 计算所有 明细项 金额、税额 合计
        if (this.formdata.hjje) {
            this.formdata.hjje = Number(this.formdata.hjje).toFixed(2);
        }
        if (this.formdata.hjse) {
            this.formdata.hjse = Number(this.formdata.hjse).toFixed(2);
        }
        this.formdata.jshj = (Number(this.formdata.hjje)+Number(this.formdata.hjse)).toFixed(2);
        this.formdata.jshjupper = getDx(this.formdata.jshj)
        
        this.$emit('getformdata',this.formdata);
    },
    watch:{
    },
    methods: {
         // 添加一行
        addBtn() {
          this.formdata.lines.push(
            {
              num: this.formdata.lines.length + 1, // 序号
              commodityId: '', // 商品编号
              fphxz: '0', // 0 正常行,1折扣行,2被折扣行
              yhzcbs: '0',
              lslbs: '', // 零税率标识，暂时为空
              spmc: '', // 商品名称
              spbh: '', // 商品编号
              spbm: '', // 商品编码
              xmmc: '', // 项目名称
              zxbm: '', // 征税编码
              ggxh: '', // 规格型号
              dw: '', // 单位
              xmsl: '', // 项目数量
              hsxmdj: '', // 含税项目单价
              xmdjShow: '', // 前端显示项目单价
              xmdj: '', // 不含税项目单价
              hsxmje: '', // 含税项目金额
              xmjeShow: '', // 前端显示项目金额
              xmje: '', // 不含税项目金额
              sl: '', // 税率
              se: '', // 税额
              ywbh: '' // 业务编号
            }
          );
        },
        // 删除一行
        delBtn(index, yphxz) {
          let _this = this;
          if (this.formdata.lines.length === 1) {
            return false;
          }
          if (yphxz === '2') {
            hintFunction(_this.$store, 'warnHint', '该行已添加折扣信息，请先删除此行的折扣信息');
            return;
          }
          this.formdata.lines.splice(index, 1);
        },
        //查询商品列表
        getGoodsList(){
            console.log(this.goods)
        }
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .fppm{
        display: flex;
        overflow: hidden;
        background-color: #fff;
        height: 100%;
    }
    .edgebg{
        width: 40px;
        height: 100%;
        ul{
            height: 100%;
            padding: 0;
            padding-top: 17px;
            li{
                list-style: none;
                width: 40px;
                height: 26px;
                margin: 0 auto 34px;
                background: url(../../assets/common/circle.png) no-repeat center;
            }
        }
    }
    .leftEdge{
        border-right: 1px dashed #F0F0F0;
    }
    .rightEdge{
        border-left: 1px dashed #F0F0F0;
    }
    .pm_all{
        flex: 1;
        margin: 0 15px;
        .small_select{
            width: 20px;
            height: 16px;
            line-height: 14px;
            background: #4DA1FF;
            color: #fff;
            border: none;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -ms-border-radius: 5px;
            -o-border-radius: 5px;
            position: absolute;
            right: 5px;
            top: 5px;
            cursor: pointer;
            font-size: 12px;
        }
    }
    .fpTitle{
        font-size: 0;
        height: 100px;
        .fpTitleLeft{
            width: 30%;
            display: inline-block;
            vertical-align: top;
            img{
                margin-top: 25px;
            }
        }
        .fpTitleCenter{
            width: 30%;
            height: 48px;
            line-height:50px;
            display: inline-block;
            vertical-align: top;
            border-bottom: 4px double #B2945F;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #B2945F;
        }
        .fpTitleRight{
            width: 40%;
            display: inline-block;
            vertical-align: top;
            img{
                width: 30px;
                margin-top: 50px;
                margin-left: 100px;
            }
            .titlekprq{
                width: auto;
                font-size: 0;
                margin-top: 5px;
                margin-left: 195px;
                .kprqText{
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 14px;
                    color: #866d3d;
                }
                .kprq{
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 14px;
                }
            }
            
        }
    }
    .tableTop{
        width: 100%;
        height: 100px;
        border-left: 1px solid #B2945F;
        border-top: 1px solid #B2945F;
        font-size: 0;
        .tbT{
            display: inline-block;
            vertical-align: top;
            border-right: 1px solid #B2945F;
            border-bottom: 1px solid #B2945F;
            box-sizing: border-box;
        }
        .gmfText{
            width: 4%;
            height: 100%;
            margin:0 auto;
            line-height:32px;
            color: #b2945f;
            font-size: 14px;
            text-align: center;
        }
        .gmfTable{
            width: 57%;
            height: 100%;
            display: inline-block;
            vertical-align: top;
            border: none;
            .tbmc,.tbnsrsbh,.tbdzdh,.tbkhh{
                height: 25px;
                font-size: 0;
                position: relative;
            }
            .gmftitle{
                width: 20%;
                line-height: 24px;
                font-size: 14px;
                text-align: center;
                display: inline-block;
                vertical-align: top;
                border-right: 1px solid #B2945F;
                border-bottom: 1px solid #B2945F;
                box-sizing: border-box;
                color: #b2945f;
            }
            .gmfcontent{
                width: 80%;
                height: 100%;
                font-size: 14px;
                display: inline-block;
                vertical-align: top;
                border-right: 1px solid #B2945F;
                border-bottom: 1px solid #B2945F;
                box-sizing: border-box;
            }
            input{
                border: none;
                padding-left: 5px;
            }
        }
        .mmqText{
            width: 3%;
            height: 100%;
            margin:0 auto;
            line-height:32px;
            color: #b2945f;
            font-size: 14px;
            text-align: center;
        }
        .mmqTable{
            width: 36%;
            height: 100%;
        }
    }
    .tableLines{
        width: 100%;
        /*height: 140px;*/
        border-left: 1px solid #B2945F;
        border-right: 1px solid #B2945F;
        box-sizing: border-box;
        font-size: 0;
        .linesTitle{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #B2945F;
            box-sizing: border-box;
            color: #B2945F;
            li{
                line-height: 40px;    
            }
        }
        .linesList{
            min-height: 97px;
            max-height: 150px;
            overflow-y: auto;
        }
        .linesConten{
            width: 100%;
            height: 30px;
            border-bottom: 1px solid #B2945F;
            li{
                line-height: 30px;    
            }
            .czbtn{
                font-size: 0;
                a{
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    vertical-align: middle;
                    cursor: pointer;
                }
                .addRow{
                    background: url(../../assets/common/jiabtn.png) no-repeat;
                    margin-right: 10px;
                }
                .delRow{
                    background: url(../../assets/common/jianbtn.png) no-repeat;
                }
                .ywbmBtn{
                    font-size: 12px;
                    width: auto;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    padding: 0 5px;
                    background-color: #4DA1FF;
                    color: #ffffff;
                    border-radius: 4px;
                    margin: 0 5px;
                }
            }
        }
        input{
            border: none;
            width: 90%;
            text-align: center;
        }
        li{
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
            text-align: center;
            border-right: 1px solid #B2945F;
            box-sizing: border-box;
        }
        li:last-child{
            border: none;
        }
    }
    .tablehj{
        border-left: 1px solid #B2945F;
        border-top: 1px solid #B2945F;
        .hjtop{
            width: 100%;
            height: 45px;
            padding-top: 25px;
            font-size: 0;
            border-right: 1px solid #B2945F;
            box-sizing: border-box;
            li{
                display: inline-block;
                vertical-align: bottom;
                font-size: 12px;
            }
        }
        .hjbottom{
            width: 100%;
            height: 25px;
            font-size: 0;
            box-sizing: border-box;
            border-top: 1px solid #B2945F;
            li{
                display: inline-block;
                vertical-align: bottom;
                font-size: 14px;
                line-height: 24px;
                border-bottom: 1px solid #B2945F;
                border-right: 1px solid #B2945F;
                box-sizing: border-box;
            }
            .hjTitle{
                text-align: center;
                color: #b2945f;
            }
        }
    }
    .tableBottom{
        width: 100%;
        height: 100px;
        border-left: 1px solid #B2945F;
        border-top: 1px solid #B2945F;
        font-size: 0;
        .tbB{
            display: inline-block;
            vertical-align: top;
            border-right: 1px solid #B2945F;
            border-bottom: 1px solid #B2945F;
            box-sizing: border-box;
        }
        .xsfText{
            width: 4%;
            height: 100%;
            margin:0 auto;
            line-height:32px;
            color: #b2945f;
            font-size: 14px;
            text-align: center;
        }
        .xsfTable{
            width: 56%;
            height: 100%;
            display: inline-block;
            vertical-align: top;
            border: none;
            .tbmc,.tbnsrsbh,.tbdzdh,.tbkhh{
                height: 25px;
                font-size: 0;
            }
            .xsftitle{
                width: 28%;
                line-height: 24px;
                font-size: 14px;
                text-align: center;
                display: inline-block;
                vertical-align: top;
                border-right: 1px solid #B2945F;
                border-bottom: 1px solid #B2945F;
                box-sizing: border-box;
                color: #b2945f;
            }
            .xsfcontent{
                width: 72%;
                height: 100%;
                font-size: 14px;
                display: inline-block;
                vertical-align: top;
                border-right: 1px solid #B2945F;
                border-bottom: 1px solid #B2945F;
                box-sizing: border-box;
            }
            input{
                border: none;
                padding-left: 5px;
            }
        }
        .bzText{
            width: 10%;
            height: 100%;
            margin:0 auto;
            line-height:32px;
            color: #b2945f;
            font-size: 14px;
            text-align: center;
        }
        .bzTable{
            width: 30%;
            height: 100%;
        }
    }
    .fpmsg{
        margin-top: 7px;
        font-size: 0;
        .msgText{
            display: inline-block;
            vertical-align: bottom;
            font-size: 12px;
            color: #b2945f;
        }
        .msgCon{
            display: inline-block;
            vertical-align: bottom;
            font-size: 14px;
            width: 140px;
            border-bottom: 1px solid #B2945F;
            padding: 0 0 2px 10px;
        }
    }
    .fphintmsg{
        width: 100%;
        height: auto;
        font-size: 12px;
        margin: 10px auto 20px;
        color: #4DA1FF;
        p{
            line-height: 18px;
        }
        p:nth-child(2){
            padding-left: 60px;
        }
    }
    textarea{
        width: 100%;
        height: 98px;
        border: 0;
        resize: none;
        font-size: 14px;
    }
    
</style>