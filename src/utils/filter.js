// 时间戳转换成日期格式
export function getDate(val, format) { 
  if (!val) {
    return '';
  }
  // 如果时间戳后不是毫秒值就加000,变成毫秒值
  // if (val && val.length == 10) { val = parseInt(val+'000'); }
  if (val && val.length != 13) {
    if (val && val.length == 10) {
      val = parseInt(val+'000');
    };
    for (var i = 0; i < 13; i++) {
      if (val.length === i) {
        val = parseInt(val*(10^(13-i)));
      }
    }
  }
  var date = new Date(val);
  var o = {   
      "M+" : date.getMonth()+1,                 //月份   
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours(),                   //小时   
      "m+" : date.getMinutes(),                 //分   
      "s+" : date.getSeconds(),                 //秒   
      "q+" : Math.floor((date.getMonth()+3)/3), //季度   
      "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }            
  for(var k in o) {
    if(new RegExp("("+ k +")").test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    }  
  }
  return format;   
}

// 金额转换成大写
export function getDx(n) { 
  
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
        var head = n < 0 ? '负' : '';
        n = Math.abs(n);

        var s = '';
        var test1 = n.toString().split('.');
        var test2 = '';
        if(test1.length > 1){
            test2 = test1[1];
        }

        for (var i = 0; i < fraction.length; i++) {
            if(Math.floor(n)>0){
                s += (digit[test2.substr(i,1)%10] + fraction[i])
            } else{
                s += (digit[test2.substr(i,1)%10] + fraction[i]).replace(/零./, '');
            }
        }
        if(s=="零角零分"){
            s = '整'
        }
        if(s.indexOf('零分')>0){
            s = s.replace('零分', '')
        }
        // s = s || '整';
        n = Math.floor(n);

        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '');
}

var globaldata = {
    fapiaoSL: [
        {value: '', show: ''},
        {value: '0.00', show: '0%'},
        {value: '0.03', show: '3%'},
        {value: '0.04', show: '4%'},
        {value: '0.05', show: '5%'},
        {value: '0.06', show: '6%'},
        {value: '0.10', show: '10%'},
        {value: '0.11', show: '11%'},
        {value: '0.13', show: '13%'},
        {value: '0.16', show: '16%'},
        {value: '0.17', show: '17%'}
    ]
}

/**
 *  dataConversion数据转换
 *  data 需要转换的值
 *  dataSource 数据源
 **/
export function dataConversion(data, dataSource) {
    console.log(data,'data')
    console.log(dataSource,'dataSource')
    for (let dataKey in dataSource) {
        if ((dataSource[dataKey].code || dataSource[dataKey].id || dataSource[dataKey].value) == data) {
            return dataSource[dataKey].name || dataSource[dataKey].text || dataSource[dataKey].show;
        }
    }
}

export default {
    globaldata
}