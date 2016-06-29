$(document).ready(function () {
    var re_rentid = in_rentid;
    var re_weid = in_weid;
    var re_hash = request("hash");
    var re_goodsid = request("goodsid");
    var re_openid = in_openid;
    var re_historypage = in_historypage;
    var re_historyurl = in_historyurl;
	



    //var re_rentid = "1";
    //var re_weid = "4";
    //var re_hash = "tjnby";
    //var re_aid = "";
    //var re_goodsid = "576015";
    //var re_openid = "ofHd8jhAnaIMvpL365OFxOHOgXgI";
 
    //商品详情配置信息
	/*****自己添加的ajax获取商品详情信息*********/
	 getGoodDetail();
	function getGoodDetail(){
		var postdata = { jfhandler: "wxdetailinfo", hash: re_hash, openid: re_openid, goodsid:re_goodsid };
		 $.ajax({
				url: "wxhandler.ashx",
				type: "post",
				data: postdata,
				dataType: "text",
				async:true,  /** 实际中为false 强制同步，必须success才执行以后代码**/
				error: function (result) {
					in_ret = {
						"goodsid" : 577949,
						"code" : "5G461069",
						"goodsname" : "T\u6064(\u77ED\u8896)",
						"price" : 360,
						"ori_price" : 360,
						"img_list" : [{
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/6D428-1.jpg"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/6D428-2.jpg"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/6D428-3.jpg"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/6D428-4.jpg"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/5G461069435-5.jpg"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/5G461069099-6.jpg"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/5G461069260-7.jpg"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/5G461069415-8.jpg"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/5G461069435-9.jpg"
						}],
						"color_list" : [{
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/5G461069260-7_1.jpg",
						"colorval" : "260",
						"colorname" : "\u8089\u5361\u5176"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/5G461069435-5_1.jpg",
						"colorval" : "435",
						"colorname" : "\u5B9D\u84DD"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/5G461069415-8_1.jpg",
						"colorval" : "415",
						"colorname" : "\u85CF\u9752"
						}, {
						"imgurl" : "./WXDATA/JNBY/image/gooddetail/5G461069099-6_1.jpg",
						"colorval" : "099",
						"colorname" : "\u9ED1\u8272\u7CFB\u82B1\u578B"
						}],
						"size_list" : [{
						"size" : "XS",
						"sizeval" : "01",
						"sizedet" : "150/76A"
						}, {
						"size" : "S",
						"sizeval" : "02",
						"sizedet" : "155/80A"
						}, {
						"size" : "M",
						"sizeval" : "03",
						"sizedet" : "160/84A"
						}, {
						"size" : "L",
						"sizeval" : "04",
						"sizedet" : "165/88A"
						}, {
						"size" : "XL",
						"sizeval" : "05",
						"sizedet" : "170/92A"
						}],
						"sku_count" : 20,  /**颜色和尺码组合数  4x5=20 **/
						"sku_list" : [{
						"skuid" : 1153509,  /*****对应颜色尺码的id****/
						"kcsl" : 0,     /**应该是剩余商品数**/
						"colorval" : "415",  /****颜色编号*****/
						"sizeval" : "03"  /**尺码  第三个**/
						}, {
						"skuid" : 1153790,
						"kcsl" : 145,
						"colorval" : "435",
						"sizeval" : "03"
						}, {
						"skuid" : 1153806,
						"kcsl" : 23,
						"colorval" : "435",
						"sizeval" : "01"
						}, {
						"skuid" : 1153457,
						"kcsl" : 51,
						"colorval" : "415",
						"sizeval" : "01"
						}, {
						"skuid" : 1153461,
						"kcsl" : 302,
						"colorval" : "415",
						"sizeval" : "02"
						}, {
						"skuid" : 1153807,
						"kcsl" : 141,
						"colorval" : "435",
						"sizeval" : "02"
						}, {
						"skuid" : 1153523,
						"kcsl" : 148,
						"colorval" : "415",
						"sizeval" : "04"
						}, {
						"skuid" : 1153786,
						"kcsl" : 91,
						"colorval" : "435",
						"sizeval" : "04"
						}, {
						"skuid" : 1153440,
						"kcsl" : 34,
						"colorval" : "415",
						"sizeval" : "05"
						}, {
						"skuid" : 1153808,
						"kcsl" : 22,
						"colorval" : "435",
						"sizeval" : "05"
						}, {
						"skuid" : 1152061,
						"kcsl" : 17,
						"colorval" : "260",
						"sizeval" : "01"
						}, {
						"skuid" : 1152050,
						"kcsl" : 146,
						"colorval" : "260",
						"sizeval" : "03"
						}, {
						"skuid" : 1152049,
						"kcsl" : 111,
						"colorval" : "260",
						"sizeval" : "02"
						}, {
						"skuid" : 1152051,
						"kcsl" : 90,
						"colorval" : "260",
						"sizeval" : "04"
						}, {
						"skuid" : 1152057,
						"kcsl" : 15,
						"colorval" : "260",
						"sizeval" : "05"
						}, {
						"skuid" : 1150114,
						"kcsl" : 2,
						"colorval" : "099",
						"sizeval" : "01"
						}, {
						"skuid" : 1150115,
						"kcsl" : 27,
						"colorval" : "099",
						"sizeval" : "03"
						}, {
						"skuid" : 1150099,
						"kcsl" : 23,
						"colorval" : "099",
						"sizeval" : "02"
						}, {
						"skuid" : 1150120,
						"kcsl" : 55,
						"colorval" : "099",
						"sizeval" : "04"
						}, {
						"skuid" : 1150111,
						"kcsl" : 14,
						"colorval" : "099",
						"sizeval" : "05"
						}]
					}
				}
			})
	}
	/******end*****/
	
    var json_ret = in_ret;  /**自己编写ajax获取相关in_ret值**/
 
    var str_color = "";
    var str_size = "";
    var cclist = new Array();   /** 颜色和尺码对应商品列表**/
    var imglist = new Array();  /******商品详情页面中的图片列表********/
    var colorlist = new Array();
    var sizelist = new Array();
    var index_i;
    var status = "Y";
    Msg.show("加载中...", 3);
    //返回之前的操作
    //根据历史页面session值指定操作
    $("#return").click(function () {
        if (history.length == 1)
            ClostWindows(); //微信关闭当前窗口
        else {
            if (re_historypage == "" || re_historyurl == "") {
                history.go(-1); //返回上一个页面
            }
            else {
                var historyUrl = "";
                switch (re_historypage) {
                   // case "wx_goodlist.aspx":
					case "wx_goodlist.html":
                        historyUrl = re_historyurl.substring(0, re_historyurl.lastIndexOf("code") - 1); //含有code会导致微信回调有多个code,从而导致页面无效
                        break;
                    case "wx_detailcode.html":
                        ClostWindows(); //微信关闭当前窗口
                        return;
                    default:
                        history.go(-1);
                        return;
                }
                location.href = historyUrl;
            }
        }

    })
    $("#btn_cart").click(function () {
        location.href = urlDepth() + "wx_cart.html?hash=" + _hash;
    })
    $(".addcart").click(function () {
        $(".payBtn").text($(this).text());
        $(".payBtn").removeClass("tryBtn");
        $(".payBtn").removeClass("buyBtn");
        $(".payBtn").addClass("cartBtn");

        $.fn.fullpage.setAutoScrolling(false);
        $(".input-group-btn").attr("style", "display:");
    })

    $(".buy").click(function () {
        $(".payBtn").text($(this).text());
        $(".payBtn").removeClass("cartBtn");
        $(".payBtn").removeClass("tryBtn");
        $(".payBtn").addClass("buyBtn");

        $.fn.fullpage.setAutoScrolling(false);
        $(".input-group-btn").attr("style", "display:");
    })

    $(".activeBtn").click(function () {
        $(".payBtn").text("立即购买");
        $(".payBtn").removeClass("cartBtn");
        $(".payBtn").removeClass("tryBtn");
        $(".payBtn").addClass("buyBtn");
        $('#product').modal("show");
        $.fn.fullpage.setAutoScrolling(false);
        $(".input-group-btn").attr("style", "display:");
    })

    $(".price").click(function () {
        $.fn.fullpage.setAutoScrolling(false);
        $(".input-group-btn").attr("style", "display:");
    })

    $(".close").click(function () {
        $.fn.fullpage.setAutoScrolling(true);
        $(".input-group-btn").attr("style", "display:");
    })
    $("#oMin").click(function () {
        if (parseInt($(this).parent().parent().find("input").val()) <= 1) {
            $(this).parent().parent().find("input").val("1");
        } else {
            $(this).parent().parent().find("input").val(parseInt($(this).parent().parent().find("input").val()) - 1);
        }
    });

    $("#oPlus").click(function () {
        ;
        if ($.trim($(this).parent().parent().find("input").val()) == "") {
            $(this).parent().parent().find("input").val("1");
        } else {
            $(this).parent().parent().find("input").val(parseInt($(this).parent().parent().find("input").val()) + 1);
        }
    });

    $(".pDetail").parent().find("i").click(function () {
        if ($(this).hasClass("icon-angle-down")) {
            $(this).removeClass("icon-angle-down");
            $(this).addClass("icon-angle-up");
        }
        else {
            $(this).removeClass("icon-angle-up");
            $(this).addClass("icon-angle-down");
        }
        $(this).closest("td").find(".pDetail").slideToggle();
    })

    
    //收藏功能
    $(".collect").click(function () {
        var c_goodsid = re_goodsid;
        var c_openid = re_openid;
		var postdata_1 ={Method: "insertcollect", openid: c_openid, goodsid: c_goodsid }
		$.ajax({
			type: "post",
			url: "WXHandler.ashx",
			data: postdata_1,
			dataType: "text",
			error: function (result) {
				/**var data ={"ret":"2","errmsg":"删除收藏夹成功"} ;**/
				var data ={"ret":"1","errmsg":"添加到收藏夹成功"} ;
				for (var key in data) {
                    if (key == "ret") {
                        var jf_ret = data[key];
                    }
                    if (key == "errmsg") {
                        var jf_errmsg = data[key];
                    }
                }
                if (jf_ret == 1) {
                    Msg.show("已收藏", 2);
                    $(".collect").html("<i class='icon-heart'></i>");
                    $(".collect").css("color", "#a5e8f4");
                }
                else if (jf_ret == 2) {
                    Msg.show("取消收藏", 1);
                    $(".collect").html("<i class='icon-heart-empty'></i>");
                    $(".collect").css("color", "#676767");
                }
                else {
                    //Msg.show("已收藏", 2);
                    Msg.show(jf_errmsg, 1);
                }
				
			}
			
			
		});
    })
    //商品详情配置
    function GetDetail() {
   
        $.each(json_ret.sku_list, function (index, item) {
            var listarr = { "skuid": item.skuid,
                "color": item.colorval,
                "size": item.sizeval,
                "kcsl": item.kcsl
            };
            cclist.push(listarr);
        })
        // alert("start_01");
        $.each(json_ret.color_list, function (index, item) {   /***购买项中颜色列表**/
            var listarr = {
                "colorval": item.colorval,
                "imgurl": item.icon_url
            };

            var color_ct = " <td><span> <img class='cloth' src='" + item.imgurl + "' /><span class='colorval' style='display : none;' >" + item.colorval + "</span></span></td>";
            $(".oper_val").append(color_ct);
            var color_ct1 = " <td>" + item.colorname + "/" + item.colorval + "</td>";
            $(".oper_val1").append(color_ct1);
            colorlist.push(listarr);
        })
        // alert("start_02");
        $.each(json_ret.size_list, function (index, item) {  /***购买项中尺寸列表**/
            var listarr = {
                "size": item.size,
                "sizeval": item.sizeval,
                "sizedet": item.sizedet
            }
            var size_ct = " <td>" + item.size + "<span class='sizeval' style='display:none;'>" + item.sizeval + "</span></td>";
            $(".sizeRow").append(size_ct);
            var det_ct = " <td>" + item.sizedet + "</td>";
            $(".detRow").append(det_ct);
            sizelist.push(listarr);
        })
        //alert("start_03");
        $.each(json_ret.img_list, function (index, item) {  /** 商品详情页面中的图片 **/
            var detail_ct = "";
            detail_ct = "<div class='section'><img class='bgImg' src='" + item.imgurl + "'/> </div>";
            $("#fullpage").append(detail_ct);
            imglist.push(item.imgurl);
        })
        $(".section").click(function () {
            index_i = $(this).index();
            GetImgPreview();
        })
        $("#productName").text(json_ret.goodsname);
        $("#productCode").text(json_ret.code);
        $("#productPrice").text(json_ret.price);
        $("#pCode").text(json_ret.code);
        $("#pPrice").text(json_ret.price);
        $(".price span:first").text("￥" + parseInt(json_ret.price).toFixed(2));
        //    var html_collocation = "<div class='section'><div class='matchGoods' style='display:none;'>";
        //    $.each(json_ret.coll_list, function (index, item) {

        //        html_collocation += "<a href='wx_detail.aspx?hash=" + re_hash + "&goodsid=" + item.m_goodsid + "'><img class='goods' src='" + item.imgurl + "'/></a>";
        //    })
        //    html_collocation += "</div></div>";

        //    $("#fullpage").append(html_collocation);
        $("#fullpage").fullpage({
            navigation: true,
            navigationPosition: "left",
            navigationColor: "#a5e8f4",
            afterRender: function () {
                $(".section .fp-tableCell").css("vertical-align", "top");
                //            $(".section .fp-tableCell:last").css("vertical-align", "bottom");
            },
            onLeave: function (anchorLink, index) {
                //            if (index == $(".section").size()) {
                //                $(".detailBtn").slideUp(500);
                //                $(".matchGoods").slideDown(500);
                //            } else if (index == $(".section").size() - 1) {
                //                $(".detailBtn").slideDown(500);
                //                $(".matchGoods").slideUp(500);
                //            }
            }
        });
        //隐藏加载动画效果
        Msg.hide();

    }

    GetDetail();

    function getcolor(color, status) {  
        if (status)
            str_color = color;
        else
            str_color = "";
    }
    function getsize(size, status) {
        if (status)
            str_size = size;
        else
            str_size = "";
    }
    function getskuid(color, size, list) {  /****点击立即购买触发获取该对应颜色尺码商品的id***/
        if (color != "" && size != "" && list != "") {
            for (var i in list) {
                if (color == list[i].color && size == list[i].size) {
                    skuid = list[i].skuid;
                }
            }
            if (skuid != null)
                return skuid;
            else
                return false;
        }
        else
            return false;
    }
    //----------------------------------------
    $(".oper img.cloth").click(function () {   /****点击选择颜色*****/
        if ($(this).hasClass("kcnone")) {
            return;
        }

        var str_val = $(this).parent().find(".colorval").text();
 
        if ($(this).hasClass("selected")) {
            $(".oper img.cloth").not(".kcnone").removeClass("selected");
            getcolor(str_val, false);
            $(".sizeRow td").removeClass("kcnone");
        } else {
            $(".oper img.cloth").not(".kcnone").removeClass("selected");
            $(this).toggleClass("selected");
            getcolor(str_val, true);
            GetSizeStatus(str_val);
        }
    });
    $(".sizeRow td").click(function () {   /*****点击选择尺寸****/
        if ($(this).hasClass("kcnone")) {
            return;
        }

        var str_val = $(this).find(".sizeval").text();
        if ($(this).hasClass("selected")) {
            $(".sizeRow td").not(".kcnone").removeClass("selected");
            getsize(str_val, false);
            $(".oper img.cloth").removeClass("kcnone");
        } else {
            $(".sizeRow td").not(".kcnone").removeClass("selected");
            $(this).toggleClass("selected");
            getsize(str_val, true);
            GetColorStatus(str_val);
        }
    });
    function GetImgPreview() {
        var imgList = imglist;
        wx.ready(function () {
            wx.previewImage({
                current: imgList[index_i], // 当前显示的图片链接
                urls: imgList // 需要预览的图片链接列表
            });
        });
    }
    function GetSizeStatus(color) {   /**处理没有该尺寸的情况**/
        var str_num = 0;
        $(".sizeRow td").removeClass("kcnone");
        for (var i = 0; i < cclist.length; i++) {
            if (cclist[i].color == color) {
                if (parseInt(cclist[i].kcsl) < 1) {
                    for (var j = 0; j < sizelist.length; j++) {
                        if (sizelist[j].sizeval == cclist[i].size) {
                            //$(".sizeRow td").eq(j).css("background-color", "gray");
                            $(".sizeRow td").eq(j).addClass("kcnone");
                        }
                    }
                }
            }

        }
    }
    function GetColorStatus(size) {  /**处理没有该颜色的情况**/
        var str_num = 0;
        $(".oper img.cloth").removeClass("kcnone");
        for (var i = 0; i < cclist.length; i++) {
            if (cclist[i].size == size) {
                if (parseInt(cclist[i].kcsl) < 1) {
                    for (var j = 0; j < colorlist.length; j++) {
                        if (colorlist[j].colorval == cclist[i].color) {
                            //$(".sizeRow td").eq(j).css("background-color", "gray");
                            $(".oper img.cloth").eq(j).addClass("kcnone");
                        }
                    }
                }
            }

        }
    }
    //加入购物车或者立即购买
    $(".payBtn").click(function () {

        if ($(this).hasClass("cartBtn")) {
            getCart();
        }
        else if ($(this).hasClass("buyBtn")) {
            getBuy();
        }
        else if ($(this).hasClass("tryBtn")) {
            getTry();
        }
        else {
            Msg.show("请重试", 1);
        }
    })
   
    //立即购买
    function getBuy() {
        if (str_color == "") {
            Msg.show("请选择颜色", 1);
            return;
        }

        if (str_size == "") {
            Msg.show("请选择尺码", 1);
            return;
        }

        var str_skuid = getskuid(str_color, str_size, cclist);
        if (!str_skuid)
            return;
        var str_sl = $("#qty").val().toString();  /**购买数量**/
        var OrderItem = new Array();
        var CartItem = new Array();
        /*生成订单*/
        /*  {"RENTID":"1","WEID":"2504948039","OPENID":"oWJQDj0bKOl-EZ-s5r6_TSQRszoY","CHANNEL":"S","OrderItem":[{"CID":"1683","GOODSID":"501","SKUID":"1001","SL":"2"},{"CID":"1687","GOODSID":"502","SKUID":"1002","SL":"3"}]}*/
        var item = {  "GOODSID": re_goodsid, "SKUID": str_skuid.toString(), "SL": str_sl };
        OrderItem.push(item);
        var in_json = { "OrderItem": OrderItem };
        var cedeldata = { "jfhandler": "Order_Insert", "InOrder": JSON.stringify(in_json) };
        Msg.show("处理中", 3);
        $.ajax({
            url: "WXHandler.ashx",
            type: "post",
            data: cedeldata,
            dataType: "text",
            error : function (result) {   /***待处理****/
                Msg.hide();
				var Orderid =18774;
				var jf_ret = 1 ;/**成功 **/ 
                // var Orderid = $.parseJSON(result).Out_Orderid;   /***猜想生产的订单数目***/
               /**var jf_ret = $.parseJSON(result).ret;**/
               /** var jf_errmsg = $.parseJSON(result).errmsg;**/
                if (jf_ret == 1) {
                    // alert(jf_errmsg);
                    // location.reload();
                    location.href = "Wx_Order.html?hash=" + re_hash + "&orderid=" + Orderid ; 
                }
              /*  else if (jf_ret == -1) {
                    Msg.show(jf_errmsg, 1);
                    //location.href = "WX_Login.aspx?hash=" + re_hash;
                }
                else if (jf_ret == -1001) {
                    location.href = "WX_Login.aspx?hash=" + re_hash;
                }*/
                else if (jf_ret == -1002) {
                    Msg.show("请关注公众号", 1);
                }
                else {
                    Msg.show(jf_errmsg, 1);
                }
            }
        })
    }

    /*加入购物车*/
    function getCart() {
        if (str_color == "") {
            Msg.show("请选择颜色", 1);
            return;
        }

        if (str_size == "") {
            Msg.show("请选择尺码", 1);
            return;
        }

        var str_skuid = getskuid(str_color, str_size, cclist);
        if (!str_skuid)
            return;
        var str_sl = $("#qty").val().toString();
        var Cart_Add = new Array();
        var add = { "GOODSID": re_goodsid, "SKUID": str_skuid.toString(), "SL": str_sl };
        Cart_Add.push(add);
        var in_json = { "OPENID": re_openid, "Cart_Add": Cart_Add };
        var cedeldata = { "jfhandler": "ShoppingCart_Add", "Ininfo": JSON.stringify(in_json) };
        //alert()
        Msg.show("处理中", 3);
        $.ajax({
            url: "WXHandler.ashx",
            type: "post",
            data: cedeldata,
            dataType: "text",
            error: function (result) {
                Msg.hide();
				var result ={"ret":1,"errmsg":"添加成功"}
                var jf_ret = result.ret;
                var jf_errmsg = result.errmsg;

                if (jf_ret == 1) {
                    $(".close").click();
                    Msg.show("添加成功!", 0);
                    $("#buyNum").text(parseInt($("#buyNum").text()) + 1);
                    $("#buyNum").css("color", "red");
                }
                else {
                    Msg.show(jf_errmsg + "请再次尝试!", 1);
                }
            }
        })
    }

    //是否收藏 以及搭配信息    /**有ajaxjson数据*****/ 
    $(function () {
        var postdata = { jfhandler: "wxdetailinfo", hash: re_hash, openid: re_openid, goodsid: re_goodsid };
        $.ajax({
            type: "post",
            url: "WXHandler.ashx",
            data: postdata,
            dataType: "text",
            error: function (result) {
				var listarr={
					"info_iscollect": "N",  
					"info_component": "<table style=\"text-align:left;font-size:10px;\"><tr><td style=\"width:15%;padding-left:5%;\">成分</td><td style=\"width:75%;padding-left:5%;\">面料:棉100%</td></tr><tr><td style=\"width:15%;padding-left:5%;\"><img  src=\".//WXDATA/public/wash/11.jpg\" style=\"width:60%;\" /></td><td style=\"width:75%;padding-left:5%;\">手洗最高洗涤温度40℃</td></tr><tr><td style=\"width:15%;padding-left:5%;\"><img  src=\".//WXDATA/public/wash/13.jpg\" style=\"width:60%;\" /></td><td style=\"width:75%;padding-left:5%;\">不可漂白</td></tr><tr><td style=\"width:15%;padding-left:5%;\"><img  src=\".//WXDATA/public/wash/14.jpg\" style=\"width:60%;\" /></td><td style=\"width:75%;padding-left:5%;\">在阴凉处平摊晾干</td></tr><tr><td style=\"width:15%;padding-left:5%;\"><img  src=\".//WXDATA/public/wash/03.jpg\" style=\"width:60%;\" /></td><td style=\"width:75%;padding-left:5%;\">不可翻转干燥</td></tr><tr><td style=\"width:15%;padding-left:5%;\"><img  src=\".//WXDATA/public/wash/05.jpg\" style=\"width:60%;\" /></td><td style=\"width:75%;padding-left:5%;\">熨斗底板最高温度150℃</td></tr><tr><td style=\"width:15%;padding-left:5%;\"><img  src=\"./WXDATA/public/wash/09.jpg\" style=\"width:60%;\" /></td><td style=\"width:75%;padding-left:5%;\">不可干洗</td></tr></table>",
					"list_clothsize": [
						{
							"SKCNO": "5G461069",
							"BW": "领围",
							"SIZE01": 44,
							"SIZE02": 45,
							"SIZE03": 46,
							"SIZE04": 47,
							"SIZE05": 48
						},
						{
							"SKCNO": "5G461069",
							"BW": "横领宽",
							"SIZE01": 17.7,
							"SIZE02": 18.1,
							"SIZE03": 18.5,
							"SIZE04": 18.9,
							"SIZE05": 19.3
						},
						{
							"SKCNO": "5G461069",
							"BW": "前领深",
							"SIZE01": 11.6,
							"SIZE02": 11.8,
							"SIZE03": 12,
							"SIZE04": 12.2,
							"SIZE05": 12.4
						},
						{
							"SKCNO": "5G461069",
							"BW": "肩宽",
							"SIZE01": 36.5,
							"SIZE02": 37.5,
							"SIZE03": 38.5,
							"SIZE04": 39.5,
							"SIZE05": 40.5

						},
						{
							"SKCNO": "5G461069",
							"BW": "小肩宽",
							"SIZE01": 9.7,
							"SIZE02": 10,
							"SIZE03": 10.3,
							"SIZE04": 10.6,
							"SIZE05": 10.9
						},
						{
							"SKCNO": "5G461069",
							"BW": "袖窿",
							"SIZE01": 39.6,
							"SIZE02": 41.2,
							"SIZE03": 42.8,
							"SIZE04": 44.4,
							"SIZE05": 46
						},
						{
							"SKCNO": "5G461069",
							"BW": "胸围",
							"SIZE01": 83,
							"SIZE02": 87,
							"SIZE03": 91,
							"SIZE04": 95,
							"SIZE05": 99
						},
						{
							"SKCNO": "5G461069",
							"BW": "下摆",
							"SIZE01": 81,
							"SIZE02": 85,
							"SIZE03": 89,
							"SIZE04": 93,
							"SIZE05": 97
						},
						{
							"SKCNO": "5G461069",
							"BW": "后中长",
							"SIZE01": 54.6,
							"SIZE02": 55.8,
							"SIZE03": 57,
							"SIZE04": 58.2,
							"SIZE05": 59.4
						},
						{
							"SKCNO": "5G461069",
							"BW": "袖长",
							"SIZE01": 19.5,
							"SIZE02": 20,
							"SIZE03": 20.5,
							"SIZE04": 21,
							"SIZE05": 21.5
						},
						{
							"SKCNO": "5G461069",
							"BW": "袖肥",
							"SIZE01": 26.2,
							"SIZE02": 27.6,
							"SIZE03": 29,
							"SIZE04": 30.4,
							"SIZE05": 31.8
						},
						{
							"SKCNO": "5G461069",
							"BW": "袖口",
							"SIZE01": 25.4,
							"SIZE02": 26.7,
							"SIZE03": 28,
							"SIZE04": 29.3,
							"SIZE05": 30.6
						},
						{
							"SKCNO": "5G461069",
							"BW": "前胸宽",
							"SIZE01": 32,
							"SIZE02": 33,
							"SIZE03": 34,
							"SIZE04": 35.2,
							"SIZE05": 36.4
						},
						{
							"SKCNO": "5G461069",
							"BW": "后背宽",
							"SIZE01": 34,
							"SIZE02": 35,
							"SIZE03": 36,
							"SIZE04": 37.2,
							"SIZE05": 38.4
						}
					]
				}
               /* var listarr = eval("(" + result + ")");*/
               /*var iscollect = $.parseJSON(result).info_iscollect;*/
				var iscollect = listarr.info_iscollect;
                if (iscollect == "Y") {
                    $(".collect").html("<i class='icon-heart'></i>");
                    $(".collect").css("color", "#a5e8f4");
                }
                else {
                    $(".collect").html("<i class='icon-heart-empty'></i>");
                    $(".collect").css("color", "#676767");
                }
               /** $(".info").html($.parseJSON(result).info_component);*/
				$(".info").html(listarr.info_component);
                if (listarr.list_clothsize.length > 0)
                    $("#clothSize").closest("tr").show();
                else
                    $("#clothSize").closest("tr").hide();
                $.each(listarr.list_clothsize, function (index, item) {
                    var sizeHtml = "";
                    sizeHtml += "<tr>";
                    sizeHtml += "<td>" + item.BW + "</td>";
                    sizeHtml += "<td>" + isNullOrEmpty(item.SIZE01) + "</td>";
                    sizeHtml += "<td>" + isNullOrEmpty(item.SIZE02) + "</td>";
                    sizeHtml += "<td>" + isNullOrEmpty(item.SIZE03) + "</td>";
                    sizeHtml += "<td>" + isNullOrEmpty(item.SIZE04) + "</td>";
                    sizeHtml += "<td>" + isNullOrEmpty(item.SIZE05) + "</td>";
                    sizeHtml += "</tr>";
                    $("#clothSize").append(sizeHtml);

                });
            }

        })



    })
	
	 function isNullOrEmpty(str) {
        if (str == null)
            return "";
        else
            return str;

    }
    //关闭当前窗口
    function ClostWindows() {
        wx.ready(function () {
            wx.closeWindow();
        });
    }

});