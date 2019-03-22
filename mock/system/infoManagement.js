/**
 * Created by dongyudian on 2019/3/21.
 */
const infoManagement = {
  'list': [
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
  ]
}
export default {
  getlist: res => {
    const info = infoManagement['list']
    console.log(info)
    if (info) {
      return {
        code: '0000',
        data: info
      }
    }
    return {
      message: '获取失败'
    }
  },
  newAdd: res => {
    const datas = JSON.parse(res.body)
    //console.log(res)
    let info = infoManagement['list']
    let ids = info[info.length - 1].id + 1
    let obj = {
      spbm: 'String',
      spmc: 'String',
      spsm: 'String',
      jcode: 'String',
      ggxh: 'String',
      UnitPrice: 'String',
      meteringcom: 'String',
      hssign: 'String',
      ssflbm: 'String',
      ssflmc: 'String',
      sl: 'String',
      lslbs: 'String',
      mslx: 'String',
      sfxsyh: 'String',
      yhzclx: 'String',
      id: ids
    }
    for(let k in obj) {
      obj[k] = datas[k]
    }
    info.push(obj)
    console.log(info)
    return {
      code: '0000',
      data: info
    }
  }
}
