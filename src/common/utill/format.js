/**
 * 格式化金额
 * @param  {[type]} v     [要转换的数字]
 * @param  {[type]} len   [小数点位数,默认2位]
 * @param  {[type]} split [分隔符,默认',']
 * @time 2018年2月24日 13:32:24
 * @return {[type]}       [返回转换完的字符串]
 */

export function fmoney(v, len, split) {
    split = (split || ",");
    len = Math.abs((+len) % 20 || 2);
    v = parseFloat((v + "").replace(/[^\d.-]/g, "")).toFixed(len) + "";
    return v.replace(/\d+/, function (v) {
            let lit = v.length % 3 === 0;
            let index = lit ? v.length - 3 : -1;
            return v.split('').reverse().join('').replace(/\d{3}/g, function (k, l) {
                return k + ((l === index && lit) ? "" : split);
            }).split('').reverse().join('')
        }
    );
}