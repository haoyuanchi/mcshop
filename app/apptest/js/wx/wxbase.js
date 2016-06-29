//品牌链接跳转重定向
function GetLocation(url, hash) {
    var newurl = location.href;//完整路径http://wx.jnby.com/apptest/wx_portal.aspx/hash=jnby
    var pathname = location.pathname;//apptest/wx_portal.aspx
    var search = location.search;//?hash=jnby
    var host = location.host;//wx.jnby.com
    var newhost = "";
    switch (hash) {
        /*case "jnby": newhost = "wx.jnby.com"; break;
        case "croquis": newhost = "wx.jnby.com"; break;
        case "less": newhost = "less.jnby.com"; break;
        case "tjnby": newhost = "tjnby.jnby.com"; break;
        case "jnbyit": newhost = "it.jnby.com"; break;*/
		case "jnby": newhost = ""; break;
        case "croquis": newhost = ""; break;
        case "less": newhost = ""; break;
        case "tjnby": newhost = ""; break;
        case "jnbyit": newhost = ""; break;
        default: newurl = newurl; break;
    }
    //alert(url.substring(0, url.lastIndexOf('/')).length);
    if (url.substring(0, url.lastIndexOf('/')).length > 0) {
        //如果大于0则是不同级别目录访问
        //再改
        newurl = newurl.replace(host, newhost).replace(pathname.substring(pathname.lastIndexOf('/') + 1) + search, url).toLowerCase();
    }
    else {
        newurl = newurl.replace(host, newhost).replace(pathname.substring(pathname.lastIndexOf('/') + 1) + search, url).toLowerCase();
    }
    //本地调试
    if (host.match("localhost") == "localhost") {
        newurl = url.toLowerCase();
    }
    return newurl;
}
//
function GetAppendHtml(arrlist) {
    //arrlist  [{tagname:标签div,content:内容,type:类型}]
    for (var i = 0; i < arrlist.length; i++) {
        if (arrlist[i].type == "childnode") {

        }
        else if (arrlist[i].type == "nextnode") {

        }
        else {
            null;
        }
    }

}

//添加js(清除js脚本缓存)
function AppendJs(jsUrl) {
    var script = document.createElement("script");
    script.src = jsUrl + "?" + Math.floor(Math.random() * (1000 + 1));
    $("head").append(script);

}

/*TODO 暂时做相对路径的处理方法 樊作森 20150908 */
urlDepth = function () {
    var depthStr = '';
    //var urlRootLenth = window.location.host + '/apptest/';
    var urlLocation = window.location.href.toLowerCase();
    var urlRootLenth = urlLocation.indexOf('apptest/') + 8;
    var urlStr = window.location.href.substring(urlRootLenth, window.location.href.length);
    var depth = urlStr.split('/');
    for (i = 1; i < depth.length; i++) {
        depthStr += '../';
    }
    return depthStr;
}

// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/* 重复执行函数方法  20150930 */
function repeatExeFun(fn, times, delay) {
    return function () {
        if (times-- > 0) {
            fn.apply(null, arguments);
            var args = Array.prototype.slice.call(arguments);
            var self = arguments.callee;
            setTimeout(function () { self.apply(null, args) }, delay);
        }
    };
}

/* 执行动态函数  20150930 */
function makeFunc() {
    var args = Array.prototype.slice.call(arguments);
    var func = args.shift();
    return function () {
        return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    };
}
//是否启用页面锚点高度记忆 樊作森 20151015 参数建议为页面名称，或唯一
function isPageAnchor(cookieName) {
    var cN = cookieName + '_' + "scrHeight";
    $("html,body").animate({ scrollTop: getCookie(cN) || 0 }, 200);
    var timeout = false;
    $(window).scroll(function () {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            var currentHeight = document.documentElement.scrollTop || document.body.scrollTop;
            var re_height = getCookie(cN) || 0;
            if (re_height != currentHeight && currentHeight > 300) {
                //alert(re_height + "__" + currentHeight)
                addCookie(cN, currentHeight, 1);
            }
        }, 100);
    });
}
//20151020  设置页面cookie  
//设置cookice页面参数,参数为json字符串，对象名统一命名为PageParames
//PageParames 格式 '{"PageParames":[{"name":"p1","value":"1"},{"name":"p2","value":"22"},{"name":"p3","value":"3"}]}'
//time　cookie有校时间　
function SetPageParameter(jsonStr, time) {
    var paramArray = JSON.parse(jsonStr);
    if (paramArray.PageParames.length > 0) {
        $.each(paramArray.PageParames, function (index, item) {
            //alert(item.name + "_" + item.value)
            if (getCookie(item.name) != item.value) {
                addCookie(item.name, item.value, time);
            }
        });
    }
}
//处理个人中心导航切换按键
var pageSwitchoverFun;
function UserCentricitBrandClick(pFun) {
    if (re_hash == '' || typeof (re_hash) == 'undefined')
        re_hash = request("hash");
    $("#brand td div").removeClass("curr");
    $("#brand_" + re_hash).find("div").addClass("curr");
    if (typeof (pFun) != 'undefined') {
        pageSwitchoverFun = makeFunc(pFun);
    }
    $("#brand td").click(function () {
        $("#brand td div").removeClass("curr");
        $(this).find("div").addClass("curr");
        var thisID = $(this).attr("id");
        //alert(thisID);
        itemHash = thisID.substring(thisID.toString().indexOf('_') + 1, thisID.length)
        re_hash = itemHash;
        if (re_hash == 'tjnby') {
            var url = "WX_PostFittingOrder.aspx?hash=" + re_hash;
            location.herf = GetLocation(url, re_hash)
        }
        if (re_hash == 'croquis') {
            var url = "WX_PostFittingOrder.aspx?hash=" + re_hash;
            location.herf = GetLocation(url, re_hash)
        }
        if (re_hash == 'less') {
            var url = "WX_PostFittingOrder.aspx?hash=" + re_hash;
            location.herf = GetLocation(url, re_hash)
        }
        if (re_hash == 'jnby') {
            var url = "WX_PostFittingOrder.aspx?hash=" + re_hash;
            location.herf = GetLocation(url, re_hash)
        }
        if (re_hash == 'jnbyit') {
            var url = "WX_PostFittingOrder.aspx?hash=" + re_hash;
            location.herf = GetLocation(url, re_hash)
        }
        // Msg.show("加载中...", 3);
        if (typeof (pageSwitchoverFun) != 'undefined' && typeof (pageSwitchoverFun) == "function") {
            pageSwitchoverFun(itemHash);
        }
    });
}