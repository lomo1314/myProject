
var animate = (function () {


    var getCss = function (curEle, attr) {
        var val, reg;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                var temp = curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
                temp = reg.exec(temp);
                val = temp ? temp[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
        }
        }
        reg = /^-?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem|vh|vw)$/;
        return reg.test(val) ? parseFloat(val) : val;
    };


    var setCss = function (curEle, attr, value) {
        var reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
        if (attr === "opacity") {
            value = parseFloat(value);
            value = value < 0 || value > 1 ? 1 + value : value;
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
        } else if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (reg.test(attr)) {
            curEle["style"][attr] = isNaN(value) ? value : value + "px";
        } else {
            curEle["style"][attr] = value;
        }
    };


    var zhufengEffect = {
            //匀速
            Linear: function (t, b, c, d) {
                return c * t / d + b;
            },

        Bounce: {//反弹
            easeIn: function (t, b, c, d) {
                return c - zhufengEffect.Bounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) {
                    return zhufengEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                }
                return zhufengEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        },
        //二次方的缓动
        Quad: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        //三次方的缓动
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        //四次方的缓动
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        //五次方的缓动
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        //正弦曲线的缓动
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        //指数曲线的缓动
        Expo: {
            easeIn: function (t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function (t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        //圆形曲线的缓动
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        //超过范围的三次方缓动
        Back: {//返回
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        //指数衰减的正弦曲线缓动
        Elastic: {//弹性
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                var s;
                !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        }
    };

    //实现我们的animate动画库
    return function (curEle, options, duration, effect, callback) {
        //init effect
        var fnEffect = zhufengEffect.Linear;//->默认是匀速的运动
        if (typeof effect === "number") {
            //1->Linear 2->Elastic-easeOut 3->Back-easeOut 4->Bounce-easeOut 5->Expo-easeIn
            var ary = ["Linear", "Elastic-easeOut", "Back-easeOut", "Bounce-easeOut", "Expo-easeIn"];
            for (var i = 0; i < ary.length; i++) {
                if (effect === (i + 1)) {
                    var curItem = ary[i].split("-");
                    var curItemFir = curItem[0];
                    var curItemTwo = curItem[1];
                    fnEffect = curItem.length === 1 ? zhufengEffect[curItemFir] : zhufengEffect[curItemFir][curItemTwo];
                    break;
                }
            }
        } else if (effect instanceof Array) {
            var effectFir = effect[0];
            var effectTwo = effect[1];
            fnEffect = effect.length === 1 ? zhufengEffect[effectFir] : zhufengEffect[effectFir][effectTwo];
        } else if (typeof effect === "function") {

            callback = effect;
        }

        //init parameter
        var times = 0, interval = 15, oBegin = {}, oChange = {};
        for (var key in options) {
            if (options.hasOwnProperty(key)) {

                oBegin[key] = getCss(curEle, key);
                oChange[key] = options[key] - oBegin[key];
            }
        }

        //init
        var move = function () {
            window.clearTimeout(curEle.timer);
            times += interval;
            if (times >= duration) {

                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        setCss(curEle, key, options[key]);
                    }
                }
                typeof callback === "function" ? callback.call(curEle) : null;
                return;
            }
            for (var attr in oChange) {
                if (oChange.hasOwnProperty(attr)) {
                    var curVal = fnEffect(times, oBegin[attr], oChange[attr], duration);
                    setCss(curEle, attr, curVal);
                }
            }
            curEle.timer = window.setTimeout(move, interval);
        };
        move();
    }
})();