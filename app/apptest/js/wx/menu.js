//版本:2015-03-26
//说明:公用的菜单配置信息,包含主界面里面的logo和菜.

var _hash = in_hash;
var _openid = in_openid;
//var _weid = in_weid; 
//logo图片切换
//var logopath = $("#less").attr("src");
//$("#less").attr("src", logopath.replace("logo", _hash));
//$("#less").show();
//获取手机系统 并判断是否是安卓//搜索
var sUserAgent = navigator.userAgent.toLowerCase();
var bIsAndroid = sUserAgent.match(/android/i) == "android";

var winWidth = 0;
var winHeight = 0;
//获取窗口宽度
if (window.innerWidth)
    winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
    winWidth = document.body.clientWidth;
//获取窗口高度
if (window.innerHeight)
    winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
    winHeight = document.body.clientHeight;
//通过深入Document内部对body进行检测，获取窗口大小
if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
}


$(document).ready(function () {
    get_infomation();
});


//获取菜单信息
function get_infomation() {
    var postdata = { "jfhandler": "wxmenuinfo", "hash": _hash, "openid": _openid };
    $.ajax({
        type: "post",
        url: urlDepth() + "WXHandler.ashx",
        data: postdata,
        dataType: "text",
        error: function (result1) {
			var listarr = {
				"info_all": [
					{
						"GOODSTYPE": "全部商品",
						"TYPE": "all"
					}
				],
				"info_menu": [
					{
						"GOODSTYPE": "腰裙",
						"MENUID": 3087
					},
					{
						"GOODSTYPE": "背心",
						"MENUID": 3099
					},
					{
						"GOODSTYPE": "鞋子",
						"MENUID": 3100
					},
					{
						"GOODSTYPE": "皮带",
						"MENUID": 3088
					},
					{
						"GOODSTYPE": "衬衣",
						"MENUID": 3109
					},
					{
						"GOODSTYPE": "裤子",
						"MENUID": 3114
					},
					{
						"GOODSTYPE": "T恤",
						"MENUID": 3115
					},
					{
						"GOODSTYPE": "外套",
						"MENUID": 3117
					},
					{
						"GOODSTYPE": "连衣裙",
						"MENUID": 3118
					},
					{
						"GOODSTYPE": "包",
						"MENUID": 3092
					}
				],
				"info_member": [
					{
						"HEADIMGURL": "http://wx.qlogo.cn/mmopen/bh1KMb7vEADV2UqFk3bgDQhbicibWcIqdefCQwHiab8AakQoAwyLVibJCMbfXMHzrvX9JGjzJSBKA9L5Rgrn6XxS3heSCrCpibqbU/132",
						"NAME": "张三",
						"SEX": "男",
						"CARTNUM": 1
					}
				],
				"info_recommend": [
					{
						"NAME": "推荐类",
						"MENUNAME": "旅行",
						"ORDERINDEX": 1,
						"CONTENT": "./WXDATA/jnby/image/public/recommend/1-1.png",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=6101"
					},
					{
						"NAME": "推荐类",
						"MENUNAME": "壳",
						"ORDERINDEX": 2,
						"CONTENT": "./WXDATA/jnby/image/public/recommend/1-2.png",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=6102"
					},
					{
						"NAME": "推荐类",
						"MENUNAME": "MOD",
						"ORDERINDEX": 3,
						"CONTENT": "./WXDATA/jnby/image/public/recommend/1-3.png",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=6103"
					}
				]
			};
           // var listarr = eval("(" + result + ")");
            //会员信息
            $.each(listarr.info_member, function (index, item) {
                if (listarr.info_member.length > 0) {
                    $("#head").attr("src", item.HEADIMGURL);
                    $("#username").text(item.NAME);
                    //alert(item.CARTNUM);
                    $("#buyNum").text(item.CARTNUM);
                    //item.MSGNUM  消息数量
                }
            })

            var list = "<table>";
            var i = 0;
            //左边菜单类别(全部)
            $.each(listarr.info_all, function (index, item) {
                //开启tr标签
                if (i % 3 == 0) {
                    list += "<tr>";
                }
                list += "<td class='item'><span class='menutype' style='display:none;'>" + item.TYPE + "</span>" + item.GOODSTYPE + "</td>"
                //结束tr标签
                if (i % 3 == 2) {
                    list += "</tr>";
                }
                i++;
            })
            //左边菜单类别
            $.each(listarr.info_menu, function (index, item) {
                //开启tr标签
                if (i % 3 == 0) {
                    list += "<tr>";
                }
                list += "<td class='item'><span class='menutype' style='display:none;'>" + item.MENUID + "</span>" + item.GOODSTYPE + "</td>"
                //结束tr标签
                if (i % 3 == 2) {
                    list += "</tr>";
                }
                i++;

            })

            //补tr标签
            if (i % 3 != 0) {
                list += "</tr>";
            }
            list += "</table>"; 
            $("#list").html(list);
            //左边菜单点击跳到列表内容
            $("#list .item").click(function () {
                var new_menuid = $(this).find(".menutype").text();
                if (new_menuid != "" && new_menuid != null) {
                    if (new_menuid != "all")
                        location.href = urlDepth() + "wx_goodlist.html?hash=" + _hash + "&typeid=2&typeval=" + new_menuid;
                    else
                        location.href = urlDepth() + "wx_goodlist.html?hash=" + _hash + "&typeid=1&typeval=" + new_menuid;
                }
            })
            //推荐类
            var list_rmd = "<table>";
            var rmd_img = "<tr>";
            var rmd_name = "<tr>";
            $.each(listarr.info_recommend, function (index, item) {
				rmd_img += "<td style='border-right: 1px solid #eee;'><a  href='"+item.SUBCONTENT+"'><img class='infoBtn' src='" + item.CONTENT + "' runat='server' /></a> </td>";
               // rmd_img += "<td style='border-right: 1px solid #eee;'><a  href='"+item.SUBCONTENT+"'><img class='infoBtn' src='" + item.CONTENT.replace('~', '..') + "' runat='server' /></a> </td>";
                rmd_name += "<td><span>" + item.MENUNAME + "</span> </td>";
            })
            rmd_img += "</tr>";
            rmd_name += "</tr>";
            list_rmd += rmd_img + rmd_name + "</table>";
            $("#recommend").append(list_rmd);

        },
        success: function (e) {
            // alert("加载失败,请重新尝试!");
        }
    })
}
$(function () {
    //链到个人中心
    $("#head").click(function () {
        location.href = urlDepth() + "wx_usercenter.html?hash=" + _hash;
    })

    //链到购物车(购物车记录数)
    $("#buyNum").click(function () {

        location.href = urlDepth() + "wx_cart.html?hash=" + _hash;
    })
    //链到试衣车(试衣车记录数)
    /**$("#tryNum").click(function () {
        location.href = urlDepth() + "wxtryroom.html?hash=" + _hash;
    })**/
    $("#btn_cart").click(function () {
        location.href = urlDepth() + "wx_cart.html?hash=" + _hash;
    })
    //链到收藏夹
    $("#btn_clt").click(function () {
        location.href = urlDepth() + "wx_collect.html?hash=" + _hash;
    })
    //链到首页
    $("#btn_portal").click(function () {
        location.href = urlDepth() + "wx_portal.html?hash=" + _hash;
    })
    //搜索跳到商品列表
    $("#userInfo .input-group input").change(function () {

        var txt_search = $(this).val();
        // alert(txt_search);
        if (txt_search != "" && txt_search != null) {
            location.href = urlDepth() + "wx_goodlist.html?hash=" + _hash + "&typeid=1&typeval=" + txt_search;
        }
    })
    //键盘确认输入搜索
    $('#userInfo .input-group input').keydown(function (e) {
        if (e.keyCode == 13) {
            var txt_search = $(this).val();
            if (txt_search != "" && txt_search != null) {
                if (bIsAndroid) {
                    location.href = urlDepth() + "wx_goodlist.html?hash=" + _hash + "&typeid=1&typeval=" + txt_search;
                    return false;
                }
                else {
                    location.href = urlDepth() + "wx_goodlist.html?hash=" + _hash + "&typeid=1&typeval=" + txt_search;
                }
            }
            else {
                return false;
            }
        }
    });


})
