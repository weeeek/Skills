//细节处理用的js function
//取路由参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return "";
}

function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

//取图片流
function get64Code(baseCode) {
    return baseCode.substring(baseCode.indexOf('base64,')+7);
}

//滚到底
function scrollBottom(obj) {
    obj.scrollTop(obj[0].scrollHeight);
}

//当前日期
function nowDatetime() {
    return new Date();
}

//日期加上天数后的新日期.
function addDays(date, days) {
    if (date === "") {
        return "";
    }
    var nd = new Date(date);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    return new Date(nd);
}

//日期格式化
Date.prototype.Format = function (fmt) {
    //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//String.format = function () {
//    var s = arguments[0];
//    for (var i = 0; i < arguments.length - 1; i++) {
//        var reg = new RegExp("\\{" + i + "\\}", "gm");
//        s = s.replace(reg, arguments[i + 1]);
//    }
//    return s;
//}

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

String.prototype.toFixed = function (digits) {    
    if (!this || this == "") {
        return 0;
    }
    return parseFloat(this * Math.pow(10, digits) / Math.pow(10,digits)).toFixed(digits);
}

String.prototype.endsWith = function (suffix) {
    return (this.substr(this.length - suffix.length) === suffix);
}

String.prototype.startsWith = function (prefix) {
    return (this.substr(0, prefix.length) === prefix);
}

String.prototype.subLastString = function (text) {
    var arr = this.split(text);
    return arr[arr.length - 1];
}

//移除数组中指定位置的值
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
    return true;
};

//取差集
function differenceSet(a, b) {
    var result = [];
    for (var i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) === -1)
            result.push(a[i]);
    }
    return result;
}

//合并数组
function uniqueArr(arr){
    //Set数据结构，它类似于数组，其成员的值都是唯一的
    return Array.from(new Set(arr)); // 利用Array.from将Set结构转换成数组
}

//https://www.zhihu.com/question/54822257
//传说中的柯里化 加,顺便做了转型和保留1位小数
function multiPlus(str) {
    var x = parseFloat(str);
    const result = (y) => multiPlus(x + parseFloat(y));
    result.valueOf = () => x.toFixed(1);
    return result;    
}

function isEmpty(obj) {
    return (Object.keys(obj).length === 0 && obj.constructor === Object);
}

function deleteEmptyString(test, recurse) {
    for (var i in test) {
        if (test[i] === '') {
            delete test[i];
        } else if (recurse && typeof test[i] === 'object') {
            deleteEmptyString(test[i], recurse);
        }
    }
}

function deleteEmptyObject(test, recurse) {
    for (var i in test) {
        if (isEmpty(test[i])) {
            delete test[i];
        } else if (recurse && typeof test[i] === 'object') {
            deleteEmptyObject(test[i], recurse);
        }
    }
}

function deleteEmpty(test, recurse) {
    if (recurse === undefined)
    {
        recurse = true;
    }
    deleteEmptyString(test, recurse);
    deleteEmptyObject(test, recurse);
}

//计算分页的每页数量
function getPageSize(lineHeight) {
    if (lineHeight === undefined)
        lineHeight = 45;
    return window.innerHeight > 768 ? Math.floor((window.innerHeight - 250) / lineHeight) : "5";
}

var inputNumberOnly = {
    onkeyup: function (_this, full) {
        _this.value = Number(_this.value.replace(/\D/g, ''));
        if (full && Number(_this.value) > Number(full)) {
            _this.value = full;
        }
    },
    onafterpaste: function (_this,full) {
        _this.value = Number(_this.value.replace(/\D/g, ''));
        if (full && Number(_this.value) > Number(full)) {
            _this.value = full;
        }
    }
}

//控件id，操作类型，最大值，最小值，步长（0.1，0.5，1）
function jquerySpinnerOperate(id, o,max,min,step) {
    var input = $("#spinner-" + id).find("input");
    var value = Number(input.val());
    switch (o) {
        case 1:
        case "+":
            if (value < max) {
                value = (value * step * 100 + 100 * step) / (100 * step);
                input.val(value);
            }
            break;
        case 2:
        case "-":
            if (value > min) {
                value = (value * step * 100 - 100 * step) / (100 * step);
                input.val(value);
            }
            break;
        default:
            break;
    }
}

function consecutiveIntArr(start,end,reverse) {
    var intArr = [];
    for (; start <= end+1; start++) {
        intArr.push(start);
    }
    return reverse ? intArr.reverse() : intArr;
}

