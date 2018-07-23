//GA统计
(function(i,s,o,g,r,a,m){
    i['GoogleAnalyticsObject']=r;
    i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments);
    },
    i[r].l=1*new Date();
    a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];
    a.async=1;a.src=g;
    m.parentNode.insertBefore(a,m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-66397277-1', 'auto');
ga('send', 'pageview');

/**
 * 错误显示
 * @param  {string} s 要显示给用户的消息
 * @return {undfined}
 */
$.fixAlert = function(s){
    if(! s) return;

    var $fixedAlertDiv = $(".fixedAlert");
    if(!$fixedAlertDiv.length) {
        $fixedAlertDiv = $("<div class='fixedAlert'/>").appendTo("body").css({
            "position" : "fixed",
            "top"      : "-50px",
            "width"    : "400px",
            "left"     : "50%",
            "margin-left":"-200px",
            "text-align":"center",
            "border-radius":"-1 0 5px 5px",
            "background": "#fd890b",
            "color"    : "#fff",
            "font-size": "14px",
            "line-height" : "2em",
            "z-index" : "10000",
            "-webkit-transition":"all 400ms ease",
            "-moz-transition":"all 400ms ease",
            "-ms-transition":"all 400ms ease"
        });
    }

    $fixedAlertDiv
        .text(s)
        .css("top",0);

    setTimeout(function(){
        $fixedAlertDiv.css("top","-50px");
    },3000);
};

/**
 * 获得当天的日期 yyyy-MM-dd
 * @return {string} 当天日期
 */
function getFullDate () {
    var d = new Date(),
        M = d.getMonth()+1,

    D = d.getDate();
    return d.getFullYear() + "-" + (M < 10 ? '0' + M : M) + '-' + (D < 10 ? '0' + D : D);
}

/**
 * 用户提醒
 * @type {Object}
 */
var Tip = {
    _timer: undefined,

    types: {
        info:"info",
        success:"success",
        warning:"warning",
        error:"error",
        loading: "loading"
    },

    showMessage: function showMessage(message, type, timeout) {
        timeout = timeout || 2500;
        type = type || 'info';

        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = undefined;
        }
        $("#tip-container").remove();

        var container = $("<div id='tip-container'><div class='tip-inner'>" +
            "<i class='tip-icon'></i>" +
            "<span class='close'></span>" +
            "<span class='text'></span>" +
            "</div></div>");

        container
            .attr("class", 'tip-window tip-' + type)
            .find(".text")
            .html(message);

        if (type == "loading") {
            container.find(".tip-icon").addClass("fa-spin");
        }

        $(document.body).append(container);
        container.css({top: -container.height() - 10});


        if (type == this.types.note) {
            $(".close", container).show().click(function () {
                container.animate({ top: -container.height() - 10 }, "fast");
            });
        }

        container.animate({ top:-1 }, "fast");

        if (type !== "loading") {
            if (timeout > 0) {
                this._timer = setTimeout(function () {
                    container.animate({ top: -container.outerHeight() - 10 }, "normal");
                    this._timer = undefined;
                }, timeout);
            }
        }

        return container;
    },

    success: function (msg, timeout) {
        this.showMessage(msg, 'success', timeout);
    },

    error: function (msg, timeout) {
        this.showMessage(msg, 'error', timeout);
    },

    warn: function (msg, timeout) {
        this.showMessage(msg, 'warning', timeout);
    },

    info: function (msg, timeout) {
        this.showMessage(msg, 'info', timeout);
    },

    confirm: function confirm(message) {
        return window.confirm("\n" + message);
    },

    alert: function alert(message) {
        return window.alert("\n" + message);
    },

    loading: function loading() {
        return this.showMessage("loading", 'loading');
    },
    hideLoading: function (container) {
        container.animate({ top: -container.height() - 10 }, "fast");
    }
};

/**
 * 把object序列化成key=value&key2=value2样子的query string
 * @param  {object} obj
 * @return {string}
 */
function serializeObj (obj) {
    var tmpArray = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop]) {
            tmpArray.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
        }
    }
    return tmpArray.join('&');
}

/**
 * 获取url的查询字条串
 * @return {object}
 */
function getQueryStringArgs () {
    var qs = location.search.length > 0 ? location.search.substring(1) : "",
        args = {},
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null;

    for(var i = 0, len = items.length; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length) {
            args[name] = value;
        }
    }

    return args;
}

/**
 * 用于金额转换,后台金额是是乘以100000的
 * @param  {number} amount 要被转换的金额
 * @return {number}
 */
function readableMoney (amount, toFixed) {
    toFixed = toFixed || 2;
    var divided = amount / 100000;
    if (isInt(divided)) {
        return divided;
    }

    return parseFloat(divided.toFixed(2));
}

/**
 * 判断数字是否为整数
 * @param  {number}
 * @return {Boolean}
 */
function isInt(n) {
   return n % 1 === 0;
}

/**
 * 根据name获取url参数值
 * @param  {string} name 参数名
 * @return {string}      参数值
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * 判断字符串是否为数字
 * @param  {string}  n
 * @return {Boolean}
 */
function isNumeric (n) {
    return !isNaN(n) && isFinite(n);
}

/**
 * 滚动到某个form控件并使其获得焦点
 */
function focusField (opt) {
    var ele = $(opt.ele);

    scrollTo({
        obj: ele,
        offset: -100,
        callback: function () {
            ele.focus();
        }
    });

    Tip.error(opt.tips);
}

/**
 * 平滑滚动页面到某个位置
 * @param  {object} option {
 *     obj: $('body'),          // 要滚动到的元素
 *     offset: 100,             // 偏移量
 *     callback: function () {} // 滚动后的回调
 * }
 * @return {[type]}        [description]
 */
function scrollTo (option){
    var top = 0;
    var defaults = {
        offset: 0
    };

    $.extend(defaults, option);
    top += defaults.offset;

    if (defaults.obj && defaults.obj.length) {
        top += defaults.obj.offset().top;
    }

    $("html, body").animate({ scrollTop: top }, 400, defaults.callback);
}

window.DateUtil = {
    /**
     * 获取日期中某个月的第一天
     * @param  {date} date
     * @return {date}
     */
    getFirstDayOfMonth: function (date) {
        var d = date || new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    },

    /**
     * 获取日期中某个月的最后一天
     * @param  {date} date
     * @return {date}
     */
    getLastDayOfMonth: function (date) {
        var d = date || new Date();
        return new Date(d.getFullYear(), d.getMonth() + 1, 0);
    },

    /**
     * 获取当前季度
     * @param  {date} date 日期
     * @return {number}      0 1 2 3 为代表的4个季度
     */
    getQuarter: function (date) {
        date = date || new Date();
        return Math.floor(date.getMonth() / 3);
    },

    /**
     * 获取日期中上个季度的第一天
     * @param  {date} date
     * @return {date}
     */
    getFirstDayOfQuarter: function  (date) {
        var d = date || new Date();
        var quarter = this.getQuarter(d);
        var firstMonth = quarter * 3;
        d.setMonth(firstMonth);
        return this.getFirstDayOfMonth(d);
    },

    /**
     * 获取日期中上个季度的最后天
     * @param  {date} date
     * @return {date}
     */
    getLastDayOfQuarter: function (date) {
        var d = date || new Date();
        var quarter = this.getQuarter(d);
        var lastMonth = quarter * 3 + 3;
        d.setMonth(lastMonth);
        return this.getLastDayOfMonth(d);
    },

    /**
     * 日期格式化
     * @param  {date} date
     * @param  {string} fmt  要格式化成的格式, 如yyyy-MM-dd
     * @return {string}
     */
    format: function (date, fmt) {
        date = date || new Date();
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
                    .substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
                        (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },

    /**
     * 日期增减量
     * @param  {number} days 要增减的天数
     * @param  {date} date 基于日期
     * @return {date}      增减后的日期
     */
    daysDelta: function (days, date){
        if (typeof days !== 'number') {
            throw new Error('expect number argument');
        }

        var d = date ? new Date(date) : new Date();
        var time = d.getTime() + days * 24 * 60 * 60 * 1000;
        d.setTime(time);
        return d;
    }
};

/*
 * 解析object string为对象
 * @param  {string} str
 * @return {object}
 */
function parseObjectString(str) {
    var validJSON = str
        // wrap keys without quote with valid double quote
        .replace(/([\w]+)\s*:/g, '"$1":')
        // replacing single quote wrapped ones to double quote
        .replace(/'([^']+)'/g, '"$1"');
    return JSON.parse(validJSON);
}

/**
 * 校验图片宽高
 * @param  {object} actual {width: 100, height: 200}宽高组成的对象
 * @param  {array} expect
 * @return {boolean}
 */
function isDimensionsValid (wh, dimensions) {
    var valid = false,
        obj, width, height;

    /**
     * 图片宽高数值校验
     * @param  {number}  actual 实际的宽高数字
     *
     * // number为具体的值, string为最小值-最大值范围:"100-200", array可能为多个值
     * @param  {number,string,array}  expect 期望的值
     * @return {Boolean}
     */
    function isValueValid (actual, expect) {
        var type = Array.isArray(expect) ? "array" : typeof expect;
        var pair = "";

        switch(type) {
            case "number":
                return expect === actual;
            case "string":
                pair = expect.split("-");
                return pair[0] <= actual && actual <= pair[1];
            case "array":
                return expect.indexOf(actual) > -1;
        }
    }

    if (typeof Array.prototype.some === "function") {
        valid = dimensions.some(function (ele) {
            var width = ele.width, height = ele.height;
            return isValueValid(wh.width, width) && isValueValid(wh.height, height);
        });
    } else {
        for (var i in dimensions) {
            obj = dimensions[i];
            width = obj.width;
            height = obj.height;

            if (isValueValid(wh.width, width) && isValueValid(wh.height, height)) {
                valid = true;
            }
        }
    }

    return valid;
}

/**
 * 获取图片文件的分辨率
 * @param  {file} imgFile 图片文件
 * @return {object}         返回{width: xxx, height: xxx}
 */
function getNativeImgDimensions (imgFile) {
    if (imgFile.type.indexOf('image') == -1) {
        throw new Error("请选择图片文件");
    }
    var deferred = $.Deferred(),
        img = new Image(),
        URL = window.URL || window.webkitURL;

    img.onload = function () {
        deferred.resolve({"width": this.width, "height":this.height});
    };
    img.onerror = function () {
        deferred.reject();
    };
    img.src = URL.createObjectURL(imgFile);
    return deferred.promise();
}

 /**
 * byte 到 MB GB等size的转换
 * @param  {int} bytes 要转换的bytes数
 * @return {string}       返回适当的MB,GB
 */
function bytesToSize(bytes) {
    if(bytes === 0) return '0 byte';
    var k = 1024;
    var sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

/**
 * 获取文件名后缀
 * @param  {string} name 文件名
 * @return {string}      文件名后缀
 */
function getExt(name) {
    return name.substr((~-name.lastIndexOf(".") >>> 0) + 2).toLowerCase();
}

/**
 * 判断对象为空
 * @param  {Object}  obj
 * @return {Boolean}
 */
function isEmptyObject (obj) {
    if (obj === null) {
        return true;
    }

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return true;
}

/**
 * 删除行首和行尾的空格
 * @param  {String} str
 * @return {String}
 */
function trim (str) {
    if (!str) {
        return "";
    }

    return str.replace(/^\s+|\s+$/g, "");
}

/**
 * 删除行首空格
 * @param  {String} str
 * @return {String}
 */
function ltrim (str) {
    return str.replace(/^\s+/g, "");
}

/**
 * 删除行尾空格
 * @param  {String} str
 * @return {String}
 */
function rtrim (str) {
    return str.replace(/\s+$/g, "");
}

/**
 * 正则判断是否为中文
 * @param  {String}  str
 * @return {Boolean}
 */
function isChinese (str) {
    return  /^[\u4e00-\u9fa5]+$/.test(str);
}

/**
 * 把数字转化成大写
 * @param  {Number} integer
 * @return {String}
 */
function intToChinese(integer) {
    integer = integer + '';
    var len = integer.length - 1;
    var idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
    var num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    return integer.replace(/([1-9]|0+)/g, function($, $1, idx, full) {
        var pos = 0;
        if ($1[0] != '0') {
            pos = len - idx;
            if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
                return idxs[len - idx];
            }
            return num[$1[0]] + idxs[len - idx];
        } else {
            var left = len - idx;
            var right = len - idx + $1.length;
            if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
                pos = left - left % 4;
            }

            if (pos) {
                return idxs[pos] + num[$1[0]];
            } else if (idx + $1.length >= len) {
                return '';
            } else {
                return num[$1[0]];
            }
        }
    });
}

function isEmpty (obj) {
    if (null == obj || obj === "") {
        return true;
    }

    if (Array.isArray(obj)) {
        return obj.length === 0;
    }

    if (Object.prototype.toString.call(obj) === "[object Object]") {
        if (Object.keys(obj).length === 0) {
            return true;
        }
    }

}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// 统计js出错
window.onerror = handleError;
function handleError(errorMessage, scriptURI, lineNumber, columnNumber, errorObj){
    window.ga('send', 'event', 'jsError', errorMessage, scriptURI + '  line:' + lineNumber +'  column:' + columnNumber);
}

/**
 * Sublime text like fuzy match
 * @param  {String} text   整个字符串
 * @param  {String} search 要搜索的字符串
 * @return {String}        如果匹配,则返回整个字符串,否则返回""
 */
function fuzyMatch (text, search) {
    search = search.replace(/\s/g, "").toLowerCase();
    var searchPosition = 0;

    for (var i = 0; i < text.length; i++) {
        var textChar = text[i];
        if (searchPosition < search.length && search[searchPosition] == textChar.toLowerCase()) {
            searchPosition += 1;
        }
    }

    if (searchPosition != search.length) {
        return "";
    }

    return text;
}

/**
 * 消息通知
 * @type {Object}
 */
var Notification = {
    URL_CONFIG: {
        newMsg:  "/notification/get_new_msg/",
        ignoreMsg: "/notification/ignore_new_msg/"
    },

    init: function () {
        this.cacheElements();
        this.bindEvents();
        this.getNewMsgs();
    },

    /**
     * 缓存jqeury选择的元素
     */
    cacheElements: function () {
        this.listTmpl = $("#notification-tmpl");
        this.wrap = $(".js-notify");
        this.list = this.wrap.find(".js-notify__list__ul");
        this.ignoreBtn = this.wrap.find(".js-notify__ignore");
        this.notifyBlock = this.wrap.find('.js-notify-block');
        this.closeBtn = this.wrap.find(".js-notify__list__close");
        this.viewBtn = this.wrap.find(".js-notify__list__viewall");
        this.msgMenu = $("#msg-anchor");
    },

    /**
     * 绑定事件
     */
    bindEvents: function () {
        this.ignoreBtn.on('click', $.proxy(this.ignoreNewMsgs, this));
        this.closeBtn.on('click', $.proxy(this.closeNotify, this, true));
        this.viewBtn.on('click', $.proxy(this.closeNotify, this));
    },

    /**
     * 隐藏消息列表
     */
    closeNotify: function (mark) {
        this.notifyBlock.hide();
        if (mark) {
            this.ignoreNewMsgs();
        }
    },

    /**
     * 获取新消息
     */
    getNewMsgs: function () {
        // 消息中心页面不显示消息提醒
        var path = location.pathname;
        if (path == "/notification/" || path == "/register/") {
            return;
        }

        var that = this;
        var signMarkup = '<i class="fa new-msg-sign"></i>';

        $.ajax({
            url: this.URL_CONFIG.newMsg,
            type: 'GET'
        })
        .done(function(data) {
            if (data.has_new) {
                // 消息中心有未读消息时消息中心菜单上显示红点
                $signMarkup = $(signMarkup);
                $signMarkup.text(data.all_count);
                that.msgMenu.append($signMarkup);

                if (data.new_msg && data.new_msg.length > 0) {
                    that.notifyBlock.removeClass("hide");
                    that.list.html(that.listTmpl.tmpl(data.new_msg));
                }
            }
        })
        .fail(function() {
            console.error("获取未读消息失败");
        });

    },

    /**
     * 忽略未读消息
     * @param  {event} e event
     */
    ignoreNewMsgs: function (e) {
        if (e) {
            e.preventDefault();
        }

        var that = this;

        $.ajax({
            url: this.URL_CONFIG.ignoreMsg,
            type: 'POST'
        })
        .done(function() {
            that.notifyBlock.hide();
            // 去掉菜单里的红点
            that.msgMenu.find('.new-msg-sign').remove();
        })
        .fail(function() {
            console.error("忽略消息失败");
        });

    },

};

/**
 *cookie操作
 * @type {Object}
 */
var CookieUtil = {

        get: function(name) {
            var cookieName = encodeURIComponent(name) + "=",
            cookies = document.cookie.split(";"),
            cookieValue = null;
            for(var i=0;i<cookies.length;i++){
                cookie = cookies[i].trim();
                cookieStart = cookie.indexOf(cookieName);
                if(cookieStart === 0) {
                    cookieValue = decodeURIComponent(cookie.substring(cookieName.length));
                }
            }
            return cookieValue;
         },

        set: function(name, value, expires, path, domain, secure) {
            var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            if(expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            }
            if(path) {
                cookieText += "; path=" + path;
            }
            if(domain) {
                cookieText += "; domain=" + domain;
            }
            if(secure) {
                cookieText += "; secure";
            }
            document.cookie = cookieText;
         },

        unset: function(name, path, domain, secure) {
           this.set(name, "", new Date(0), path, domain, secure);
        }

    };
