var re_hash = in_hash;
var re_openid = in_openid;
var re_weid = in_weid;

var url_sub_croquis = "wx_fellow.html?hash=" + re_hash ;
var url_sub_less = "http://mp.weixin.qq.com/s?__biz=MzA4NjI2ODkzNQ==&mid=217947185&idx=1&sn=d7a15a5008e5346f6a7663d265ee18bd#rd";
var url_sub_tjnby = "http://mp.weixin.qq.com/s?__biz=MjM5MDUyMTcyNA==&mid=204944189&idx=1&sn=1911d670867ac8c41c5119d34a699ecc#rd";
Msg.show("加载中...", 3);


$(document).ready(function () {
    var postRemarkdata = {
        Method: "get_integrallog",
        OPENID: re_openid,
        HASH: re_hash
    }
    GetIntegralDet(postRemarkdata);  //显示集团卡条码
	$("#help").click(function () {
          $("#usercenter_help").removeClass("hidden");      
			$("#maincontent").css("opacity","0.3")		  
    })
	$("#help_btn").click(function () {
          $("#usercenter_help").addClass("hidden"); 
		$("#maincontent").css("opacity","1.0")			  
    })
})

$(document).ready(function () {
   
    var postdata = { jfhandler: "wxusercenter", hash: re_hash, openid: re_openid };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdata,
        dataType: "text",
        error: function (result) {
           /** var listarr = eval("(" + result + ")");**/
			var listarr ={
				"info_brand": [
					{
						"HASH": "tjnby",
						"ISCUST": "N",
						"OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4"
					},
					{
						"HASH": "jnby",
						"ISCUST": "Y",
						"OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4"
					},
					{
						"HASH": "croquis",
						"ISCUST": "N",
						"OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4"
					},
					{
						"HASH": "less",
						"ISCUST": "N",
						"OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4"
					}
				],
				"info_levelLogo": "./WXDATA/public/icon/levellogo/v1.png"
			};
            //品牌点亮信息
            $.each(listarr.info_brand, function (index, item) {
                var pp = "#brand_" + item.HASH;
                if (item.ISCUST == "Y") {

                    $(pp).attr("class", "highlight");
                    var path = $(pp).find(".brandImg").attr("src");
                    $(pp).find(".brandImg").attr("src", path.replace("-2", "-1"));
                   // var main_brand_ct = "<img class='brandImg main' src='Demo/Resources/images/Mall/LogoMain.png' />";
                    if (re_hash == item.HASH) {
                      //  $(pp).append(main_brand_ct);
                    }
                    $(pp).click(function () {

                      //  location.href = "wx_integral.html?hash=" + re_hash + "&chash=" + item.HASH;   /*****积分明细页面****/
					  location.href = "wx_usercenter.html?hash=" + re_hash 
                    })
                }
                else {

                    $(pp).click(function () {
                        //记录品牌点亮点击数据
                        //RecordBrandClick(re_hash, re_openid, item.HASH);
                         GetSubUrl(item.HASH);
                    })
                }
            })

           /** var ret_levelLogo = $.parseJSON(result).info_levelLogo;**/
		   var ret_levelLogo = listarr.info_levelLogo;
            if (ret_levelLogo != null && ret_levelLogo != "") {
                $(".levelLogo").append("<img src='" + ret_levelLogo + "' / >");
            }
            //隐藏加载动画效果
            Msg.hide();
        }
    })

})
//未点亮引导关注
function GetSubUrl(hash) {
   /* switch (hash) {
        case "jnby": location.href = url_sub_jnby; break;  
       
        case "less": location.href = url_sub_less; break;
        case "tjnby": location.href = url_sub_tjnby; break;
		
		 case "croquis": location.href = url_sub_croquis; break;
        default: break;
    }*/
	$("#ewm_ed").removeClass("hidden");
	$("#panelList").css("opacity","0.3");
}
//记录品牌点亮点击数据
function RecordBrandClick(hash,openid,c_hash) {  
    var postdata = { jfhandler: "recordbrandclick", hash: hash, openid: openid, c_hash: c_hash };
    $.ajax({
        type: "post",
        url: "wxhandler.ashx",
        data: postdata,
        datatype: "text",
        error: function (result) {
            GetSubUrl(c_hash);
        }

    })
}



function GetIntegralDet(postRemarkdata) {
    $.ajax({
        type: "post",
        url: "WXShelf.ashx",
        data: postRemarkdata,
        dataType: "text",
        error: function (result) {
           /** var data = eval("(" + result + ")");**/
			var data ={"info_list":[],"info_card":[{"CARDNO":"G00684215"}]}
            //alert(result);
            $.each(data.info_card, function (index, item) {
                $("#kh").text(item.CARDNO);
            })
            $(".vouchers").each(function () {
                var vid = $(this).text();
                var type = "code128";
                $(this).barcode(vid, type, { barWidth: 1, barHeight: 50, bgColor: 'none' });
            });
        }
    })
}
