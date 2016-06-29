var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match("ipad") == "ipad";

var js_title;
var js_link;
var js_imgurl;
var js_desc;
var js_type;
var js_url;
var js_hash = in_hash;
var js_openid = in_openid;

var is_active = false;

var re_longitude = "";   //经度
var re_latitude = "";   //纬度


js_title = jsapi_title;
js_link = jsapi_link;
js_imgurl = jsapi_imgurl;
js_desc = jsapi_desc;
js_type = jsapi_type;
js_activityid = jsapi_activityid;
js_url = location.href;

//js-api接口 
function GetEanCode(str) {
    var ret_ean = "";
    var code = str.substring(0, str.indexOf(','));
    switch (code) {
        case "EAN_13": ret_ean = str.substring(str.indexOf(',') + 1); break;
        case "EAN_8": ret_ean = str.substring(str.indexOf(',') + 1); break;
        default: ret_ean = "error"; break;
    }
    return ret_ean;
};


wx.config({
    debug: false,
    appId: jsapi_appid,
    timestamp: jsapi_timestamp,
    nonceStr: jsapi_noncestr, // 必填，生成签名的随机串
    signature: jsapi_signature, // 必填，签名，见附录1
    jsApiList: ['onMenuShareTimeline',
                'onMenuShareAppMessage',
                        'scanQRCode',
                        'getLocation',
                         'previewImage',
                          'addCard',
                          'chooseCard',
                          'openCard',
                          'closeWindow', 'hideOptionMenu', 'showOptionMenu', 'showMenuItems', 'hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});


wx.ready(function () {

    //分享朋友圈      
    wx.onMenuShareTimeline({
        title: js_desc, // 分享标题
        link: js_link, // 分享链接
        imgUrl: js_imgurl, // 分享图标
        success: function () {
            var in_json = { url: js_url, nickname: "", phone: "", activityid: js_activityid };
            GetActiveShare(js_type, in_json)
        },
        cancel: function () {
            // alert("1取消分享"); // 用户取消分享后执行的回调函数
        }
    });
    //分享朋友
    wx.onMenuShareAppMessage({
        title: js_title, // 分享标题
        desc: js_desc, // 分享描述
        link: js_link, // 分享链接
        imgUrl: js_imgurl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link        
        success: function () {
            var in_json = { url: js_url, nickname: "", phone: "", activityid: js_activityid };
            GetActiveShare(js_type, in_json)
        },
        cancel: function () {
            //alert("2取消分享");
        }
    });
});
//扫条码
$("#btn_scan").click(function () {
    return;
    if (bIsIpad) {
        alert("Ipad不支持扫一扫,请使用手机扫描");
    }
    else {
        wx.ready(function () {
            wx.scanQRCode({
                needResult: 1,
                desc: 'scanQRCode desc',
                success: function (res) {
                    var ret = res.errMsg;
                    if (ret == "scanQRCode:ok") {
                        //调用条码获取商品的方法
                        var retstr = res.resultStr;
                        var retmsg = GetEanCode(retstr);
                        if (retmsg == "" || retmsg == "error") {
                            alert("请扫描正确的商品");
                        } else {
                            getsku(retmsg);
                        }
                    }
                }
            });
        })
    }
})
//根据条码查找商品
function getsku(in_barcode) {
    var postdata = { jfhandler: "wxscaninfo", hash: js_hash, barcode: in_barcode };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdata,
        dataType: "text",
        success: function (result) {
            if (result == "" || result == null) {
                alert("找不到此款商品.");
            }
            else {
                var str = "wx_detail.html?hash=" + js_hash + "&goodsid=" + result;
                location.href = str;
            }
        }
    });

}
