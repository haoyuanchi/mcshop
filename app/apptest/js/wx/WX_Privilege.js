var re_hash = in_hash;
var re_openid = in_openid;
var re_rentid = in_rentid;
var re_weid = in_weid;

$(document).ready(function () {
    var fittingnew = request("fittingnew");
    if (fittingnew != 0) {
        $("#td_orderprotal").append("<div style=\"width:15px;height: 15px;background-color: red;border-radius: 8px;border: none;position: absolute;top: 20%;left: 75%; z-index:2000; text-align:center; vertical-align:middle; padding-left:1px;color:White \">" + fittingnew + "</div>")
    }
    $(".try").click(function () {
        $.post("WXShelf.ashx", {
            Method: "get_power",
            WEID: re_weid,
            OPENID: re_openid
        },
			function (result) {
			    var listvar1 = result;
			    $.each(listvar1.list, function (index, item) {
			        if (item.FLAG == "N") {
			            Msg.show("您还未获得权限，敬请期待！", 1);
			            //setTimeout(function () { location.href = "wx_portal.aspx?hash=" + re_hash; }, 1300);
			        } else {
			            $.post("wxshelf.ashx", {
			                Method: "trynum_sel",
			                rentid: re_rentid,
			                weid: re_weid,
			                openid: re_openid

			            }, function (result) {

			                var listvar = result;
			                $.each(listvar.list, function (index, item) {
			                    if (item.NUM == 0) {
			                        Msg.show("请到收藏夹，体验预约试衣吧！", 1);
			                        //                                   setTimeout(function () { location.href = "wx_collect.aspx?hash=" + re_hash; }, 1300);
			                    } else if (item.NUM > 0) {
			                        location.href = "wx_myfitting.aspx?hash=" + re_hash;
			                    } else {
			                        Msg.show("请稍后重试！", 1);
			                        setTimeout(function () {
			                            location.href = "wx_privilege.aspx?hash=" + re_hash;
			                        }, 1300);

			                    }
			                })
			            })

			        }
			    })

			});
    });
    $("#td_dongtian").click(function () {
        location.href = "wx_dongtian.aspx?hash=" + re_hash;
    });
    $("#userBg").click(function () {

        location.href = "http://mp.weixin.qq.com/s?__biz=MjM5OTM3NjQ3Mg==&mid=213960475&idx=3&sn=b4b8fa0cd4ae7e27ca549e6855125eb8#rd";

    })
    $("#td_jssy").click(function () {

        location.href = "WX_SendFitting.aspx?hash="+re_hash;

    })

})
