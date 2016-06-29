$(document).ready(function () {
    var re_hash = in_hash;
    var re_openid = in_openid;
    var re_typeid = request("typeid");
    var re_typeval = request("typeval");

    var member_zk;
    //显示动画加载效果
    Msg.show("加载中...", 3);
    //内部标题栏显示
    GetSearchInfo(re_typeid, re_typeval); 
	
    if (re_typeid!="1")  //非搜索
    {
        InitSelectVal();  
    }
    
    //获取商品信息----|目前为测试传入参数|---
    var postdata = { jfhandler: "wxlistinfo", hash: re_hash, openid: re_openid, typeid: re_typeid, typeval: re_typeval };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdata,
        dataType: "text",
        error: function (result) {
			var listarr = {
				"info_goods": [
					{
						"ROWNO": 1,
						"GOODSID": 577953,  
						"CODE": "5G461001",
						"NAME": "T恤(短袖)",
						"IMG": "./WXDATA/JNBY/image/goodlist/6D204-1.jpg",
						"PRICE": 500,
						"LISTINFO": "会员,500"
					},
					{
						"ROWNO": 2,
						"GOODSID": 577951,
						"CODE": "5G461004",
						"NAME": "T恤(短袖)",
						"IMG": "./WXDATA/JNBY/image/goodlist/6D439-1.jpg",
						"PRICE": 390,
						"LISTINFO": "会员,290"
					}
				],
				"info_theme": [
					{
						"NAME": "主题分类",
						"MENUNAME": "春季必备单品",
						"ORDERINDEX": 1,
						"CONTENT": "./oImage/2.%E6%98%A5%E5%AD%A3%E5%BF%85%E5%A4%87%E5%8D%95%E5%93%81.jpg",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=9073"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "连衣裙专区",
						"ORDERINDEX": 2,
						"CONTENT": "./oImage/j-10.jpg",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=9075"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "T恤专区",
						"ORDERINDEX": 3,
						"CONTENT": "./oImage/j-9.jpg",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=9074"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "衬衣&背心专区",
						"ORDERINDEX": 4,
						"CONTENT": "./oImage/j-11.jpg",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=9076"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "裤子专区",
						"ORDERINDEX": 5,
						"CONTENT": "./oImage/j-16%E8%A3%A4%E5%AD%90%E4%B8%93%E5%8C%BA.jpg",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=9077"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "腰裙专区",
						"ORDERINDEX": 6,
						"CONTENT": "./oImage/j-17%E8%85%B0%E8%A3%99%E4%B8%93%E5%8C%BA.jpg",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=9078"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "上装精选（外套&毛衫）",
						"ORDERINDEX": 7,
						"CONTENT": "./oImage/j-13.jpg",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=9079"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "饰品专区",
						"ORDERINDEX": 8,
						"CONTENT": "./oImage/f-3.gif",
						"SUBCONTENT": "../apptest/wx_goodlist.html?hash=jnby&typeid=3&typeval=9080"
					}
				]
			};

            //分类推广
            if (listarr.info_theme != null) {
                $.each(listarr.info_theme, function (index, item) {
                  //  var theme_ct = "<li><a href='" + item.SUBCONTENT + "'><img class='mainImg' src='" + item.CONTENT.replace('~', 'http://wx.jnby.com') + "' /></a></li>"
					  var theme_ct = "<li><a href='" + item.SUBCONTENT + "'><img class='mainImg' src='" + item.CONTENT+ "' /></a></li>";
                    $(".banner ul").append(theme_ct);
                })
                //底部滚动栏
                $(".banner").unslider({
                    speed: 500,               //  The speed to animate each slide (in milliseconds)
                    delay: 3000,              //  The delay between slide animations (in milliseconds), false for no autoplay
                    complete: function () { },  //  A function that gets called after every slide animation
                    keys: true,               //  Enable keyboard (left, right) arrow shortcuts
                    dots: true,               //  Display dot navigation
                    fluid: false              //  Support responsive design. May break non-responsive designs
                });
            }
            else {
                $(".banner").hide();
            }
            var html = "";
            $.each(listarr.info_goods, function (index, item) {
                html += "<td class='item'><div style='border:1px solid #ccc;position: relative;'>";
                html += "<div><img class='bg lazy' data-original='" + item.IMG + "' onerror='this.src='Demo/Resources/images/Goods/error.gif';'/></div>" +
                        "  <div class='name'>" + item.NAME + "</div> <div style='margin: 5px;'>" + "款号：" + "(" + item.CODE + ")" + "</div><div style='margin: 5px;'>￥<span class='item_price'";

                var listinfo = item.LISTINFO;
                var isFullPrice = true;//是否正价
                var arrinfo = new Array();
                if (listinfo == null || listinfo == "") {
                       
                }
                else {                       
                    arrinfo = listinfo.split(",");
                    //不等于吊牌价
                    if (parseFloat(arrinfo[1]) != parseFloat(item.PRICE)) {
                        html += "style='text-decoration:line-through;'"; //会员价增加这个样式
                        isFullPrice = false;
                    }
                }
                html += ">" + item.PRICE + "</span>";
                if (!isFullPrice)
                    html += "<span style='color:red;margin-left:10px;'>"+arrinfo[0]+"￥" + arrinfo[1] + "</span>"; //会员价增加这个样式
                html += "</div>  </div><span class='item_goodsid' style='display:none;'>" + item.GOODSID + "</span>  </div>";                                            
                });
            html += "<div style='clear:both;'></div>";
            $("#skulist #skubody").html(html);
            $("img.lazy").lazyload({ effect: "fadeIn" });
            //跳转到商品详情
            $("#skulist .item").click(function () {
                var goodsid = $(this).find(".item_goodsid").text();
                location.href = "wx_detail.html?hash=" + re_hash + "&goodsid=" + goodsid;
            })

            SetCurrentHeight(re_typeid, re_typeval);
            //隐藏加载动画效果
            Msg.hide();
        }
    })
    $("#sort").change(function () {  //重新排序
        RGetGoodsInfo();
    });
    $("#screen").change(function () {  //重新排序
        RGetGoodsInfo();
    });

    //字符解码
    function UrlDecode(zipStr) {
        var uzipStr = "";
        for (var i = 0; i < zipStr.length; i++) {
            var chr = zipStr.charAt(i);
            if (chr == "+") {
                uzipStr += " ";
            } else if (chr == "%") {
                var asc = zipStr.substring(i + 1, i + 3);
                if (parseInt("0x" + asc) > 0x7f) {
                    uzipStr += decodeURI("%" + asc.toString() + zipStr.substring(i + 3, i + 9).toString());
                    i += 8;
                } else {
                    uzipStr += AsciiToString(parseInt("0x" + asc));
                    i += 2;
                }
            } else {
                uzipStr += chr;
            }
        }

        return uzipStr;
    }
    //获取搜索内容
    function GetSearchInfo(typeid, typeval) {
        var str_title;
        if (typeid == "1") {
            re_typeval = UrlDecode(re_typeval);
            str_title = "搜索的内容:'" + re_typeval.substr(0, 8) + "'";
            $(".subtitle").text(str_title);
        }
        else if (typeid == "2") {
            GetSearchTitle(re_hash, typeval);
        }
        else if (typeid == "3") {
            GetSearchTitle(re_hash, typeval);
        }
        else { 
            $(".subtitle").text("商品列表");
        }

    }
    function GetSearchTitle(hash, typeval) {

        var postdata = { jfhandler: "wxsearchinfo", hash: hash, menuid: typeval };
        $.ajax({
            type: "post",
            url: "WXHandler.ashx",
            data: postdata,
            dataType: "text",
            error: function (result) {
				var result="T恤专区"  //实际根据typeval值取得相关内容
                $(".subtitle").text(result);
            }, success: function (e) {
                $(".subtitle").text("商品列表");
            }
        })
    }

    function RGetGoodsInfo() {

        var p_sort = $("#sort  option:selected").val();
        var p_screen = $("#screen  option:selected").text();
        if (p_sort == 0 && p_screen == 0) {
            return;
        }
        //$("#skubody").empty();
        RFlashSkubody(p_sort, p_screen)
    }

    function InitSelectVal() {  /***选择排序列表  全部分类***/
        var postdata = { jfhandler: "wxinitselect", hash: re_hash, typeval: re_typeval };
        $.ajax({
            type: "post",
            url: "WXHandler.ashx",
            data: postdata,
            dataType: "text",
            error: function (result) {
               // var listarr = eval("(" + result + ")");
			    var listarr = {
						"list_sort": [
						{
							"CODENAME": "请选择排序方式",
							"CODEVALUE": 0
						},
						{
							"CODENAME": "按时间排序",
							"CODEVALUE": 1
						},
						{
							"CODENAME": "按价格排序",
							"CODEVALUE": 2
						},
						{
							"CODENAME": "按销量排序",
							"CODEVALUE": 3
						}
						],
						"list_screen": [
						{
							"STYLE": "T恤"
						}
						]
				};
                var sort;
                var screen;
                $.each(listarr.list_sort, function (index, item) {
                    sort += "<option value='" + item.CODEVALUE + "'>" + item.CODENAME + "</option>";

                });
                screen += "<option value='" + "全部分类" + "'>" + "全部分类" + "</option>";
                $.each(listarr.list_screen, function (index, item) {
                    screen += "<option value='" + item.STYLE + "'>" + item.STYLE + "</option>";

                });
                $("#sort").html(sort);
                $("#screen").html(screen);
            }
        })
    }

    function RFlashSkubody(sort, screen) {  //重新排序  
        var postdata = { jfhandler: "rflashskubody", hash: re_hash, openid: re_openid, typeid: re_typeid, typeval: re_typeval, sort: sort, screen: screen };
        $.ajax({
            type: "post",
            url: "WXHandler.ashx",
            data: postdata,
            dataType: "text",
            error: function (result) {
				
              //  var listarr = eval("(" + result + ")");
			    var listarr ={
					"list": [
						{
							"ROWNO": 1,
							"GOODSID": 577953,
							"CODE": "5G461001",
							"NAME": "T恤(短袖)",
							"IMG": "./WXDATA/JNBY/image/goodlist/6D204-1.jpg",
							"PRICE": 490,   
							"LISTINFO": "会员,490",
							"LIFESTART": "2016-05-05T00:00:00",  
							"GOODS.F_GETGOODSSALES(A.GOODSID)": 18  
						},
						{
							"ROWNO": 2,
							"GOODSID": 577951,
							"CODE": "5G461002",
							"NAME": "T恤(短袖)",
							"IMG": "./WXDATA/JNBY/image/goodlist/6D439-1.jpg",
							"PRICE": 390,
							"LISTINFO": "会员,200",
							"LIFESTART": "2016-05-05T00:00:00",
							"GOODS.F_GETGOODSSALES(A.GOODSID)": 23
						}
					]
				};
                var html = "";			
				$.each(listarr.list, function (index, item) {
					html += "<td class='item'><div style='border:1px solid #ccc;position: relative;'>";
					html += "<div><img class='bg lazy' data-original='" + item.IMG + "' onerror='this.src='Demo/Resources/images/Goods/error.gif';'/></div>" +
							"  <div class='name'>" + item.NAME + "</div> <div style='margin: 5px;'>" + "款号：" + "(" + item.CODE + ")" + "</div><div style='margin: 5px;'>￥<span class='item_price'";

					var listinfo = item.LISTINFO;
					var isFullPrice = true;//是否正价
					var arrinfo = new Array();
					if (listinfo == null || listinfo == "") {
						   
					}
					else {                       
						arrinfo = listinfo.split(",");
						//不等于吊牌价
						if (parseFloat(arrinfo[1]) != parseFloat(item.PRICE)) {
							html += "style='text-decoration:line-through;'"; //会员价增加这个样式
							isFullPrice = false;
						}
					}
					html += ">" + item.PRICE + "</span>";
					if (!isFullPrice)
						html += "<span style='color:red;margin-left:10px;'>"+arrinfo[0]+"￥" + arrinfo[1] + "</span>"; //会员价增加这个样式
					html += "</div>  </div><span class='item_goodsid' style='display:none;'>" + item.GOODSID + "</span>  </div>";                                            
					});
				html += "<div style='clear:both;'></div>";
                $("#skulist #skubody").html(html);
                $("img.lazy").lazyload({ effect: "fadeIn" });
                //跳转到商品详情
                $("#skulist .item").click(function () {
                    var goodsid = $(this).find(".item_goodsid").text();
                    location.href = "wx_detail.html?hash=" + re_hash + "&goodsid=" + goodsid;
                })

                //隐藏加载动画效果
                Msg.hide();

            }
        })
    }


});
//获取当前类型高度并设置
function SetCurrentHeight(typeid,typeval) {
     var currentTypeId=  getCookie("wxGoodListTypeId")||0;
     var currentTypeVal = getCookie("wxGoodListTypeVal")||0;
     if (currentTypeId.toString() != typeid.toString() || currentTypeVal.toString() != typeval.toString()) {       
         var paramesList = new Array();
         var paramesItemTypeId = { name: "wxGoodListTypeId", value: typeid };
         var paramesItemTypeVal = { name: "wxGoodListTypeVal", value: typeval };
         var paramesItemHeight = { name: "wxGoodList_scrHeight", value: "0" };
         paramesList.push(paramesItemTypeId);
         paramesList.push(paramesItemTypeVal);
         paramesList.push(paramesItemHeight);
         var jsonStr = { PageParames: paramesList };
         var time = 1;//1天
         SetPageParameter(JSON.stringify(jsonStr), time)
     }
     isPageAnchor("wxGoodList");
}









