// 金额转换成大写
export function  getDx(n) { 
  
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