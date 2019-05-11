<!--子组件:票面-->
<template>
  <div class="fppm">
    <div class="edgebg leftEdge">
      <ul class="edge_left">
        <li/>
        <li/>
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
    <div class="pm_all">
      <div class="fpTitle">
        <div class="fpTitleLeft">
          <img v-if="formdata.fplx == this.$store.getters.fplx_ele" src="../../assets/common/logo_dian.png">
          <img v-if="formdata.fplx == this.$store.getters.fplx_gen" src="../../assets/common/logo_pu.png">
          <img v-if="formdata.fplx == this.$store.getters.fplx_spe" src="../../assets/common/logo_zhuan.png">
        </div>
        <div class="fpTitleCenter">
          <div v-if="formdata.fplx == this.$store.getters.fplx_ele">增值税电子发票</div>
          <div v-if="formdata.fplx == this.$store.getters.fplx_gen">增值税普通发票</div>
          <div v-if="formdata.fplx == this.$store.getters.fplx_spe">增值税专用发票</div>
        </div>
        <div class="fpTitleRight" style="margin-top: 20px">
          <!--<img src="../../assets/common/no.jpg">-->
          <div class="titlekprq">
            <span class="kprqText">发票代码：</span>
            <span class="kprq">{{ fpdmShow }}</span>
          </div>
          <div class="titlekprq">
            <span class="kprqText">发票号码：</span>
            <span class="kprq">{{ fphmShow }}</span>
          </div>
          <div class="titlekprq">
            <span class="kprqText">开票日期：</span>
            <span class="kprq">{{ kprq }}</span>
          </div>
        </div>
      </div>
      <div class="fpTable">
        <div class="tableTop">
          <div class="tbT gmfText">购<br>买<br>方</div>
          <div class="tbT gmfTable">
            <div class="tbmc">
              <span class="gmftitle">名      称：</span>
              <el-select
                v-model="formdata.gmfMc"
                :remote-method="remoteSearch"
                filterable
                remote
                clearable
                reserve-keyword
                allow-create
                size="mini"
                placeholder="请输入关键词"
                class="gfMc"
                @change="remoteChange">
                <el-option
                  v-for="item in gfList"
                  :key="item.value"
                  :label="item.khmc"
                  :value="item.khmc"/>
              </el-select>
            </div>
            <div class="tbnsrsbh">
              <span class="gmftitle">纳税人识别号：</span>
              <input v-model="formdata.gmfNsrsbh" class="gmfcontent">
            </div>
            <div class="tbdzdh">
              <span class="gmftitle">地址  、  电话：</span>
              <input v-model="formdata.gmfDzdh" class="gmfcontent">
            </div>
            <div class="tbkhh">
              <span class="gmftitle">开户行及账号：</span>
              <input v-model="formdata.gmfYhzh" class="gmfcontent">
            </div>
          </div>
          <div class="tbT mmqText">密<br>码<br>区</div>
          <div class="tbT mmqTable"/>
        </div>
        <div class="tableLines">
          <ul class="linesTitle">
            <li style="width:5%">行号</li>
            <li style="width:20%">货物或应税劳务、服务名称</li>
            <li style="width:8%">规格型号</li>
            <li style="width:6%">单位</li>
            <li style="width:9%">数量</li>
            <li style="width:10%">单价(含税)</li>
            <li style="width:10%">金额(含税)</li>
            <li style="width:8%">税率</li>
            <li style="width:8%">税额</li>
            <li style="width:16%">操作</li>
          </ul>
          <div class="linesList">
            <ul v-for="(item, index) in formdata.lines" :key="item.id" class="linesConten">
              <li style="width:5%">{{ index + 1 }}</li>
              <li style="width:20%;position: relative;">
                <input v-model="formdata.lines[index].xmmc">
                <a class="small_select taxNumSelectBtn" style="top:7px" @click="isGoodsDialog(index)">···</a>
              </li>
              <li style="width:8%">
                <input v-model="formdata.lines[index].ggxh" readOnly>
              </li>
              <li style="width:6%">
                <input v-model="formdata.lines[index].dw" readOnly>
              </li>
              <li style="width:9%">
                <input v-model="formdata.lines[index].xmsl" type="text" @blur="inputBlur(index, 'xmsl', $event)">
<!--                type="number"-->
              </li>
              <li style="width:10%">
                <input v-model="formdata.lines[index].hsxmdj" type="number" @blur="inputBlur(index, 'xmdj', $event)">
              </li>
              <li style="width:10%">
                <input v-model="formdata.lines[index].hsxmje" type="number" @blur="inputBlur(index, 'xmje', $event)">
              </li>
              <li style="width:8%">
                <input v-model="formdata.lines[index].sl" readOnly>
              </li>
              <li style="width:8%">
                <input v-model="formdata.lines[index].se" readOnly>
              </li>
              <li style="width:16%">
                <div class="czbtn">
                  <a class="addRow" @click="addBtn"/>
                  <!--<a class="ywbmBtn">业务编号</a>-->
                  <a class="delRow" @click="delBtn(index)"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="tablehj">
          <ul class="hjtop">
            <li style="width:60%;padding-left: 5px;">合计</li>
            <li style="width:18%">￥{{ formdata.hjje }}</li>
            <li style="width:20%">￥{{ formdata.hjse }}</li>
          </ul>
          <ul class="hjbottom">
            <li style="width:20%;" class="hjTitle">价税合计（大写）</li>
            <li style="width:40%">
              <img src="../../assets/common/hjdx.png" style="float: left;margin: 4px 3px;">
              {{ formdata.jshjupper }}
            </li>
            <li style="width:10%" class="hjTitle">（小写）</li>
            <li style="width:30%">￥{{ formdata.jshj }}</li>
          </ul>
        </div>
        <div class="tableBottom">
          <div class="tbB xsfText">销<br>售<br>方</div>
          <div class="tbB xsfTable">
            <div class="tbmc">
              <span class="xsftitle">名称：</span>
              <span class="xsfcontent" v-html="xsfMc"/>
            </div>
            <div class="tbnsrsbh">
              <span class="xsftitle">纳税人识别号：</span>
              <span class="xsfcontent" v-html="xsfNsrsbh"/>
            </div>
            <div class="tbdzdh">
              <span class="xsftitle">地址  、  电话：</span>
              <span class="xsfcontent" v-html="xsfDzdh"/>
            </div>
            <div class="tbkhh">
              <span class="xsftitle">开户行及账号：</span>
              <span class="xsfcontent" v-html="xsfYhzh"/>
            </div>
          </div>
          <div class="tbB bzText">备<br><br>注</div>
          <div class="tbB bzTable">
            <textarea v-model="formdata.bz"/>
          </div>
        </div>
      </div>
      <div class="fpmsg">
        <div class="msgText">收款人：</div>
        <div class="msgCon">
          <input v-model="formdata.skr" class="gmfcontent" style="border: none">
        </div>
        <div class="msgText">复核人：</div>
        <div class="msgCon">
          <input v-model="formdata.fhr" class="gmfcontent" style="border: none">
        </div>
        <div class="msgText"><span class="required">*</span>开票人：</div>
        <div class="msgCon" v-html="kpr"/>
        <div class="msgText"><span class="required">*</span>销售方：(章)</div>
        <div class="msgCon"/>
      </div>
    </div>
    <div class="edgebg rightEdge">
      <ul class="edge_right">
        <li/>
        <li/>
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

    <!--选择税收编码dialog-->
    <el-dialog :visible.sync="isgoods" :close-on-click-modal="closeOnClickModal" :before-close="closeIsGoods" title="选择税收编码" width="800px" class="goodsDialog">
      <div class="dialog_item">
        <div class="search_item">
          <div class="search_label">商品税收编码：</div>
          <input v-model="goods.spbm" class="search_input" type="text">
        </div>
        <div class="search_item">
          <div class="search_label">商品名称：</div>
          <input v-model="goods.spmc" class="search_input" type="text">
        </div>
        <div class="bluebtn" @click="getGoodsList">查询</div>
        <div class="bluebtn" @click="resetGoodsList">重置</div>
      </div>

      <div class="list-table-container">
        <ul class="dialog_goodsList_ul">
          <li>
            <div/>
            <div>商品税收编码</div>
            <div>商品名称</div>
            <div>税率</div>
          </li>
          <li v-for="(item, index) in goods.list" :key="item.id" @dblclick="dbSelectGoods(item,index)">
            <div>
              <input v-model="goods.item" :value="item" type="radio" name="goodsId">
              {{ index + 1 }}
            </div>
            <div>{{ item.spbm }}</div>
            <div>{{ item.spmc }}</div>
            <div>{{ SYS_SL[item.sl] }}</div>
          </li>
        </ul>
      </div>

      <el-pagination
        :current-page="goods.currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="goods.pageSize"
        :total="goods.totalCount"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: 20px auto"
        @size-change="handleSizeChange($event,'isgoods')"
        @current-change="handleCurrentChange($event,'isgoods')"
        @prev-click="prePageChange($event,'isgoods')"
        @next-click="nextPageChange($event,'isgoods')"/>
      <div class="dialogbutton-box">
        <a class="bluebtn" @click="selectGoods">确认</a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDate, getDx, dataConversion } from '@/utils/filter'
import { getNotInvoiceYetDmHm } from '@/api/invoiceOpening/opening'
import { getAllCustomer } from '@/api/system/infoMaintenance'
import { commodictList } from '@/api/system/infoManagement'
import { arrayToMapField } from '@/utils/public'
import { mapGetters } from 'vuex'
import globaldata from '@/utils/filter'
// import pagination from 'components/pagination/pagination'

export default {
  name: 'Fppm',
  components: {
    /* 'v-pagination': pagination*/
  },
  props: {
    'pmfplx': {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 控制弹窗点击空白位置不关闭
      closeOnClickModal: false,
      dataConversion: dataConversion,
      globaldata: globaldata,
      // 票面form信息
      formdata: {
        fpqqlsh: '',
        fplx: this.pmfplx,
        bmb_bbh: '',
        zsfs: '',
        // 销方信息
        xsfNsrsbh: '',
        xsfMc: '',
        xsfDzdh: '',
        xsfYhzh: '',
        // 购方信息
        gmfNsrsbh: '',
        gmfMc: '',
        gmfDzdh: '',
        gmfYhzh: '',
        gmfSjh: '',
        gmfDzyx: '',
        kpr: '',
        fhr: '',
        skr: '',
        yfp_dm: '',
        yfp_hm: '',
        jshj: '',
        jshjupper: '',
        hjje: '',
        hjse: '',
        kce: '',
        bz: '',
        hylx: '',
        tspz: '',
        ent_id: '',
        od_no: '',
        od_lsh: '',
        wd_id: '',
        kpzh: '',
        lines: [
          {
            xh: '1', // 序号
            commodityId: '', // 商品编号
            fphxz: '0', // 0 正常行,1折扣行,2被折扣行
            yhzcbs: '0', // 优惠政策标识  0：不使用，1：使用
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
            zzstsgl: '' // 增值税特殊管理
          }
        ]
      },
      kprq: '',
      fpdmShow: '',
      fphmShow: '',
      isgoods: false, // 选择税收编码弹窗显示
      isgmfmcDialog: false, // 选择购买方名称弹窗显示
      isyhxx: false, // 添加客户信息弹窗显示
      // 查询购买方信息
      gmfmcList: {
        // dialogGoodsIndex: '', // 打开第几个商品
        currentPage: 1, // 当前页数
        pageSize: 5, // 每页显示条目个数
        skfplx: '',
        khmc: '',
        khbh: '',
        khsh: '',
        list: [],
        totalCount: 0, // 总条目数
        item: '',
        gmfchecked: false
      },
      // 查询商品信息
      goods: {
        dialogGoodsIndex: '', // 打开第几个商品
        item: '',
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示条目个数
        skfplx: '',
        spbm: '',
        spmc: '',
        spssbm: '',
        list: [],
        totalCount: 0// 总条目数
      },
      // 用户信息
      userList: {
        bz: '',
        dzdh: '',
        khbh: '',
        khmc: '',
        khsh: '',
        yhzh: ''
      },
      // 购方信息列表
      gfList: []
    }
  },
  computed: {
    ...mapGetters([
      'dictList',
      'org',
      'info'
    ]),
    SYS_SL() { // 税率
      return arrayToMapField(this.dictList['SYS_SL'], 'code', 'name')
    },
    xsfMc() {
      this.formdata.coName
      return this.org.coName
    },
    xsfNsrsbh() {
      this.formdata.taxNum
      return this.org.taxNum
    },
    xsfDzdh() {
      this.formdata.xsfDzdh
      return this.org.coAddr + ' ' + this.org.coPhone
    },
    xsfYhzh() {
      this.formdata.xsfYhzh
      return this.org.bankName + ' ' + this.org.bankCode
    },
    kpr() {
      return this.info.userName
    }
  },
  watch: {
    'formdata.lines': {
      deep: true,
      handler(newValue, oldValue) {
        let totalHjje = 0
        let totalHjse = 0
        newValue.forEach(item => {
          if (item.hasOwnProperty('xmje') && item.xmje !== '') {
            totalHjje += parseFloat(item.xmje)
            totalHjse += parseFloat(item.se)
          }
        })
        this.formdata.hjje = totalHjje.toFixed(2)
        this.formdata.hjse = totalHjse.toFixed(2)
        this.formdata.jshjupper = getDx((totalHjje + totalHjse))
        this.formdata.jshj = Math.round(totalHjje + totalHjse).toFixed(2)
      }
    }
  },
  mounted: function() {
    this.getNotInvoiceYetDmHm()
    this.getGoodList()
    this.kprq = getDate(new Date().getTime(), 'yyyy年MM月dd日')
    // 计算所有 明细项 金额、税额 合计
    if (this.formdata.hjje) {
      this.formdata.hjje = Number(this.formdata.hjje).toFixed(2)
    }
    if (this.formdata.hjse) {
      this.formdata.hjse = Number(this.formdata.hjse).toFixed(2)
    }
    this.formdata.jshj = (Number(this.formdata.hjje) + Number(this.formdata.hjse)).toFixed(2)
    this.$emit('getformdata', this.formdata)
  },
  methods: {
    // 添加一行
    addBtn() {
      this.formdata.lines.push(
        {
          xh: this.formdata.lines.length + 1, // 序号
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
      )
    },
    // 删除一行
    delBtn(index, yphxz) {
      // const _this = this
      if (this.formdata.lines.length === 1) {
        return false
      }
      if (yphxz === '2') {
        // hintFunction(_this.$store, 'warnHint', '该行已添加折扣信息，请先删除此行的折扣信息')
        // todo this.$message
        return
      }
      this.formdata.lines.splice(index, 1)
    },
    // 查询商品列表
    getGoodsList() {
      const args = {
        currentPage: this.goods.currentPage,
        pageSize: this.goods.pageSize,
        spbm: this.goods.spbm,
        spmc: this.goods.spmc
      }
      commodictList(args).then(res => {
        this.goods.list = res.data.list
        this.goods.totalCount = res.data.count
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 重置商品列表
    resetGoodsList() {
      const args = {
        currentPage: 1,
        pageSize: 10,
        spbm: '',
        spmc: ''
      }
      commodictList(args).then(res => {
        this.goods.list = res.data.list
        this.goods.totalCount = res.data.count
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 购方名称关键字检索
    remoteSearch(query) {
      const args = {
        khmc: query
      }
      getAllCustomer(args).then(res => {
        this.gfList = res.data.list
      }).catch(err => {
        this.$message.error(err)
      })
    },
    remoteChange(val) {
      this.gfList.forEach(item => {
        if (item.id === val) {
          this.formdata.gmfNsrsbh = item.khsh
          this.formdata.gmfDzdh = item.khdz
          this.formdata.gmfYhzh = item.khh
        }
      })
    },
    handleSizeChange(data, type) {
      if (type === 'isgoods') {
        const args = {
          currentPage: this.goods.currentPage,
          pageSize: data,
          spbm: this.goods.spbm,
          spmc: this.goods.spmc
        }
        commodictList(args).then(res => {
          this.goods.list = res.data.list
          this.goods.totalCount = res.data.count
        }).catch(err => {
          this.$message.error(err)
        })
      }
      if (type === 'isgmfmc') {
        this.gmfmcList.pageSize = data
        // this.getGmfmcList();
      }
    },
    handleCurrentChange(data, type) {
      // 选择税收编码dialog
      if (type === 'isgoods') {
        const args = {
          currentPage: data,
          pageSize: data,
          spbm: this.goods.spbm,
          spmc: this.goods.spmc
        }
        commodictList(args).then(res => {
          this.goods.list = res.data.list
          this.goods.totalCount = res.data.count
        }).catch(err => {
          this.$message.error(err)
        })
      }
      // 选择购买方名称dialog
      if (type === 'isgmfmc') {
        this.gmfmcList.pageSize = data
        this.getGmfmcList()
      }
    },
    prePageChange(data, type) {
      if (type === 'isgoods') {
        this.goods.currentPage = data
        this.getGoodsList()
      }
      // 选择购买方名称dialog
      if (type === 'isgmfmc') {
        this.gmfmcList.pageSize = data
        this.getGmfmcList()
      }
    },
    nextPageChange(data, type) {
      if (type === 'isgoods') {
        this.goods.currentPage = data
        this.getGoodsList()
      }
      // 选择购买方名称dialog
      if (type === 'isgmfmc') {
        this.gmfmcList.pageSize = data
        this.getGmfmcList()
      }
    },
    getGoodList() {
      const args = {
        currentPage: this.goods.currentPage,
        pageSize: this.goods.pageSize,
        spbm: this.goods.spbm,
        spmc: this.goods.spmc
      }
      commodictList(args).then(res => {
        this.goods.list = res.data.list
        this.goods.totalCount = res.data.count
      }).catch(err => {
        this.$message.error(err)
      })
    },
    isGoodsDialog(index) {
      this.isgoods = true
      this.goods.dialogGoodsIndex = index
    },
    // 双击选择商品
    dbSelectGoods(item, index) {
      this.formdata.lines[this.goods.dialogGoodsIndex]['xmmc'] = item.spmc
      this.formdata.lines[this.goods.dialogGoodsIndex]['spbm'] = item.shflbm
      this.formdata.lines[this.goods.dialogGoodsIndex]['spbh'] = item.id
      this.formdata.lines[this.goods.dialogGoodsIndex]['sl'] = item.sl
      this.formdata.lines[this.goods.dialogGoodsIndex]['hsxmdj'] = item.dj
      // 清空数量、金额、税额
      this.formdata.lines[this.goods.dialogGoodsIndex]['xmsl'] = ''
      this.formdata.lines[this.goods.dialogGoodsIndex]['hsxmje'] = ''
      this.formdata.lines[this.goods.dialogGoodsIndex]['se'] = ''
      this.isgoods = false
    },
    // 确认回填税收编码
    selectGoods() {
      if (this.goods.item !== '') {
        var checked = Object.assign({}, this.goods.item)
        this.formdata.lines[this.goods.dialogGoodsIndex]['xmmc'] = checked.spmc
        this.formdata.lines[this.goods.dialogGoodsIndex]['spbm'] = checked.shflbm
        this.formdata.lines[this.goods.dialogGoodsIndex]['spbh'] = checked.spbh
        this.formdata.lines[this.goods.dialogGoodsIndex]['commodityId'] = checked.spmc
        this.formdata.lines[this.goods.dialogGoodsIndex]['sl'] = checked.sl
        // 清空数量、金额、税额
        this.formdata.lines[this.goods.dialogGoodsIndex]['xmsl'] = ''
        this.formdata.lines[this.goods.dialogGoodsIndex]['hsxmje'] = ''
        this.formdata.lines[this.goods.dialogGoodsIndex]['se'] = ''
        this.isgoods = false
      }
    },
    closeIsGoods() {
      this.goods.list = []
      this.isgoods = false
    },
    // 双击选择用户
    dbSelectUser(item, index) {
      this.formdata['gmf_nsrsbh'] = item.khsh
      this.formdata['gmf_mc'] = item.khmc
      this.formdata['gmf_dzdh'] = item.dzdh
      this.formdata['gmf_yhzh'] = item.yhzh
      this.isgmfmcDialog = false
    },
    // 确认回填用户信息
    selectUser() {
      if (this.gmfmcList.item !== '') {
        var checked = this.gmfmcList.item
        this.formdata['gmf_nsrsbh'] = checked.khsh
        this.formdata['gmf_mc'] = checked.khmc
        this.formdata['gmf_dzdh'] = checked.dzdh
        this.formdata['gmf_yhzh'] = checked.yhzh
        this.isgmfmcDialog = false
      }
    },
    // 金额，数量，单价，获得焦点事件
    inputFocus(event, xmjeShow) {
      this.inputFocusVal = event.target.value
      this.inputFocusMoneyVal = ''
      if (xmjeShow) {
        this.inputFocusMoneyVal = event.target.value
      }
    },
    // 金额，数量，单价，失去焦点事件
    inputBlur(index, currentInput, event) {
      const _thisLines = this.formdata.lines
      const xmsl = _thisLines[index].xmsl
      const xmdj = _thisLines[index].xmdj
      const xmdjShow = _thisLines[index].xmdjShow
      const hsxmdj = _thisLines[index].hsxmdj
      const xmjeShow = Number(_thisLines[index].xmjeShow)
      const xmje = Number(_thisLines[index].xmje)
      const hsxmje = Number(_thisLines[index].hsxmje)
      const sl = Number(_thisLines[index].sl)
      const se = Number(_thisLines[index].se)
      // 调用计算函数（金额，税额）
      this.calculateMoney(index, xmsl, xmdj, xmdjShow, hsxmdj, xmjeShow, xmje, hsxmje, sl, se, currentInput)
      // 控制输入0
    },
    // 金额，税额计算
    calculateMoney(index, xmsl, xmdj, xmdjShow, hsxmdj, xmjeShow, xmje, hsxmje, sl, se, currentInput) {
      const _thisLines = this.formdata.lines
      if (currentInput === 'xmje') {
        _thisLines[index].hsxmdj = ''
        _thisLines[index].xmdj = ''
        _thisLines[index].xmsl = ''
        _thisLines[index].se = Number(_thisLines[index].hsxmje * sl / (1 + sl)).toFixed(2)
        _thisLines[index].xmje = _thisLines[index].hsxmje - _thisLines[index].se
      } else {
        // 0510添加
        _thisLines[index].xmsl = ''
        // 含税金额
        _thisLines[index].hsxmje = hsxmdj * xmsl
        // 税额
        _thisLines[index].se = Number(_thisLines[index].hsxmje * sl / (1 + sl)).toFixed(2)
        // 不含税金额
        _thisLines[index].xmje = _thisLines[index].hsxmje - _thisLines[index].se
        // 不含税单价
        _thisLines[index].xmdj = hsxmdj - Number(_thisLines[index].hsxmdj * sl / (1 + sl)).toFixed(2)
      }
      // this.calculatePrice(index, xmsl, xmdj, xmdjShow, hsxmdj, xmje, xmjeShow, hsxmje, sl, currentInput)
    },
    // 处理单价
    calculatePrice(index, xmsl, xmdj, xmdjShow, hsxmdj, xmje, xmjeShow, hsxmje, sl, currentInput) {
      const _thisLines = this.formdata.lines
      // 金额，单价
      if (Number(xmsl) !== 0 && Number(xmdj) !== 0) {
        // 如果是金额输入框
        if (currentInput === 'xmje' && Number(xmje) !== 0) {
          _thisLines[index].hsxmdj = 0
          _thisLines[index].xmsl = 0
          // _thisLines[index].hsxmdj = Math.abs(this.dealWithDataShow(hsxmje / xmsl));
        } else {
          _thisLines[index].xmje = Number(xmdj * xmsl).toFixed(2)
        }
      } else if (Number(xmsl) !== 0 && Number(xmje) !== 0) {
        _thisLines[index].xmdj = Math.abs(this.dealWithDataShow(xmje / xmsl))
        // _thisLines[index].hsxmdj = Math.abs(this.dealWithDataShow(hsxmje / xmsl));
      } else if (Number(xmdj) !== 0 && Number(xmje) !== 0) {
        _thisLines[index].xmsl = this.dealWithDataShow(xmje / xmdj)
      }
    },
    // 处理六位小数
    dealWithDataShow(data) {
      data = parseFloat(Number(data))
      const x = String(data).indexOf('.') + 1 // 小数点的位置
      const y = String(data).length - x // 小数的位数

      if ((x === 0) || (y <= 6)) {
        // 没有小数
        return data
      } else if (y > 6) {
        return data.toFixed(6)
      }
    },
    // 添加用户信息
    addUser() {
      this.isyhxx = false
    },
    // 获取发票号码、发票代码
    getNotInvoiceYetDmHm() {
      const args = {
        fplx: this.pmfplx,
        kpzdbs: this.info.terminalMark,
        xsfNsrsbh: this.org.taxNum
      }
      getNotInvoiceYetDmHm(args).then(res => {
        if (res.code === '0000') {
          this.fpdmShow = res.data.dqfpdm
          this.fphmShow = res.data.dqfphm
        }
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .tbmc /deep/ .el-input__inner{
    height: 25px!important;
    border-radius: 0;
    border-top: none;
    border-left: none;
    border-color: #B2945F;
    width: 422px;
  }
  .gfMc /deep/ .el-input__inner{
    padding-left: 5px;
    font-size: 14px;
  }
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
      margin-bottom: 0!important;
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
  .list-table-container{
    margin-top: 20px;
    .dialog_goodsList_ul{
      width: auto;
      border-top: 1px solid #ddd;
      max-height: 155px;
      overflow: auto;
      font-size: 0;
      li{
        width: 760px;
        border: 1px solid #ddd;
        border-top: none;
        font-size: 0;
        display: table;
        div{
          display: table-cell;
          vertical-align: middle;
          min-width: 50px;
          height: auto;
          line-height: 18px;
          padding: 6px 0;
          text-align: center;
          white-space: normal;
          border-left: 1px solid #ddd;
          font-size: 12px;
        }
        div:nth-child(1){
          width: 50px;
          border-left: none;
        }
      }
    }
  }
  .goodsDialog{
    .dialog_goodsList_ul li{
      div:nth-child(2){
        width: 310px;}
      div:nth-child(3){
        width: 310px;}
      div:nth-child(4){
        width: 90px;}
    }
  }
  .gmfmcDialog{
    .dialog_goodsList_ul li{
      div:nth-child(2){
        width: 90px;}
      div:nth-child(3){
        width: 90px;}
      div:nth-child(4){
        width: 320px;}
    }
  }
</style>
