console.log('先加载一次');


export default class countDown {
    static _setStr(num) {
        return num <= 9 ? '0' + num : num + ''
    }
    static _update(expireTime) {
        const nowTime = new Date().getTime();
        let surplusTime = expireTime - nowTime;
        surplusTime = parseInt(surplusTime > 0 ? surplusTime : 0) / 1000;
        const d = this._setStr(parseInt(surplusTime / 86400));
        const h = this._setStr(parseInt(surplusTime / 3600 % 24));
        const m = this._setStr(parseInt(surplusTime / 60 % 60));
        const s = this._setStr(parseInt(surplusTime % 60));
        return {
            d: d,
            h: h,
            m: m,
            s: s,
            surplusTime: surplusTime
        }
    }
    constructor(isReal, expireTime, cb) {
        let _timer = null;
        const _isReal = isReal || false;
        let date = null;
        date = countDown._update(expireTime);
        if (!parseInt(date.d) || _isReal) {
            _timer = setInterval(function () {
                date = countDown._update(expireTime);
                cb(date);
                if (date.surplusTime === 0) {
                    clearInterval(_timer)
                }
            }, 1000)
        } else {
            cb(date)
        }
    }
}
