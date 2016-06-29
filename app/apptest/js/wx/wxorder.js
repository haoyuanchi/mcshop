//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以 arg2的精确结果
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}


var re_hash = request("hash");
var re_openid = in_openid;
var re_orderid = request("orderid");
var re_longitude = "";   //经度
var re_latitude = "";   //纬度

select_address();   /**选择地址列表**/
Select_cardmain();  /**获取服务门店**/  

var flg = false; //全局状态变量
var ems = 0;    //邮费
var Postage = 0;
var htmlprovince;
var htmlcity;
var htmldistrict;
var htmladdress_1;
var htmladdress_2;

    //温馨提醒弹出框
    $("#warning").modal("show");

//$("#warning").modal("show");

//var isactivity;
$(document).ready(function () {
    //alert(re_orderid);
    /////////////////////////////////////////////
    //var dtllist = new Array();
    $(".modal-content").css("min-height", 149, "max-height", 150);

    var postdate = { jfhandler: "Select_OrderItem", hash: re_hash, openid: re_openid, orderid: re_orderid,};
    $.ajax({   /***获取订单信息****/
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        error: function (result) {
			 /** var listarr = result;*/
		var listarr ={
    "list": [
        {
            "OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
            "ID": 189915,
            "NO": "WX1606081338189915",
            "NAME": "衬衣(无袖套头)",
            "IMG": "./WXDATA/JNBY/image/order/5G261076100-10_1.jpg",
            "GOODSID": 577887,
            "SKUID": 1148072,
            "CODE": "5G416144",
            "PRICE": 890,
            "YHPRICE": 790,
            "SL": 2,
            "COLORNAME": "本黑",
            "SIZENAME": "S",
            "EXPRESSPRICE":0,
            "FLAG": "R",
            "ADNAME": "梅显明",
            "ADDRESS": "hehheheh",
            "ADPHONE": "15180119848",
            "C_PROVINCE_ID": 3,
            "C_CITY_ID": 12,
            "C_DISTRICT_ID": 894,
            "C_ADDRESS": "河南省安阳市安阳县hehheheh",
            "DESCTION": "会员价"
        }
    ]
}
		
         
            //alert(listarr.list.length);
            if (listarr.list.length == 0) {
                //  location.href = "wxstoreindex.aspx?hash=" + re_hash;
                //alert("订单状态错误");
            }
            else {
                //alert(listarr.list);
                if (listarr.list == null || listarr.list == "") {
                    Msg.show("订单不存在", 1);
                    location.href = "WX_Portal.aspx?hash=" + re_hash;
                    return;
                }
                $.each(listarr.list, function (index, item) {//输出收货地址
                    if (item.FLAG.trim() != "R") { 
                        Msg.show("订单已经确认，请在我的订单查看", 1);
                        location.href = "WX_UserOrder.aspx?hash=" + re_hash + "&flag=N";
                        return;
                    }
                    var addresslist;
                    if (index == 0) {
                        if (item.ADNAME == null) {
                            addresslist = "<table style='font-size:1em;'><tr>" + // "<table  data-toggle='modal' data-target='#addAddress'><tr>" +
                                        "<td rowspan='2' style='width: 10%;'><img id='map' src='Demo/Resources/images/Mall/map.png' /></td>" +
                                        "<td style='text-align:left;width:15%;' class='td_name'></td><td style='text-align:center;'><span class='SP_ADNAME'>新增地址</span></td>" +
                                        "<td style='text-align:right;style='display:none;'' class='SP_ADPHONE'></td>" +
                                        "<td rowspan='2' style='width: 10%;' class='uesr'><i class='icon-angle-right icon-2x'></i></td>" +
                                    "</tr>" +
                                    "<tr style='display:none;font-size: 0.8em;'>" +
                                        "<td style='text-align:left;vertical-align: top;' class='td_address'></td><td  style='text-align:left;'><span class='SP_ADDRESS'></span>" +
                                        "<span style='display:none;'><span class='out_Province'></span><span class='out_City'></span><span class='out_District'></span><span class='out_RECEIVER_ADDRESS'></span></span></td>" +
                                    "</tr></table>";
                        }
                        else {
                            addresslist = "<table  style='font-size:1em;' id='select_ress'><tr>" +
                                        "<td rowspan='2' style='width: 10%;'><img id='map' src='Demo/Resources/images/Mall/map.png' /></td>" +
                                        "<td style='text-align:left;width:15%;' class='td_name'>收货人:</td><td style='text-align:left;'><span class='SP_ADNAME'>" + item.ADNAME + "</span></td>" +
                                        "<td style='text-align:right;' class='SP_ADPHONE'>" + item.ADPHONE + "</td>" +
                                        "<td rowspan='2' style='width: 10%;' class='uesr'><i class='icon-angle-right icon-2x'></i></td>" +
                                    "</tr>" +
                                    "<tr style='font-size: 0.8em;'>" +
                                        "<td style='text-align:left;vertical-align: top;'class='td_address'>收货地址:</td><td colspan='2' style='text-align:left;'><span class='SP_ADDRESS'>" + item.C_ADDRESS + "</span>" +
                                        "<span  style='display:none;'><span class='out_Province'>" + item.C_PROVINCE_ID + "</span><span class='out_City'>" + item.C_CITY_ID + "</span><span class='out_District'>" + item.C_DISTRICT_ID + "</span><span class='out_RECEIVER_ADDRESS'>" + item.ADDRESS + "</span></span></td>" +
                                    "</tr></table>";
                        }
                    }

                    $(".orderInfo").append(addresslist);
                })

                $.each(listarr.list, function (index, item) {//输出订单明细
                    //alert(item.FLAG);
                    if (item.FLAG.trim() != "R") {
                        Msg.show("订单已经确认，请在我的订单查看", 1);
                        location.href = "WX_UserOrder.aspx?hash=" + re_hash + "&flag=N";
                    }
                    else {
                        var totallist;
                        if (index == 0) {  /***订单列表第一个***/
                            totallist = "<table ><tr>" +
                                        "<td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;text-align:left;'><span>订单编号：</span>" + item.NO + 
                                    "</tr>" +
                                    "<tr class='orderlist'>" +
                                        "<td style='width: 25%;border-width: 0 1px 0 0;border-color:#e1e1e1;border-style:solid;' class='goodlist'><img class='goods lazy'  data-original='" + item.IMG + "' /></td>" +
                                        "<td style='width: 35%;border-width: 0 1px 0 0;border-color:#e1e1e1;border-style:solid;text-align: left;'>" +
                                            "<span style='font-weight:bold;display:none;'class='GOODSID'>" + item.GOODSID + "</span>" +
                                            "<span style='font-weight:bold;display:none;'class='SKUID'>" + item.SKUID + "</span>" +
                                            "<span style='font-weight:bold;'>" + item.NAME + "</span><br />" +
                                            "<span>货号:&nbsp;&nbsp;" + item.CODE + "</span><br />" +
                                             "<span>价格:&nbsp;&nbsp;￥</span><span class='item_price'>" + item.PRICE + "</span><br />"+
											 "<span  style='color:Red' class='A_PRICE_STATE' >" + item.DESCTION + ":&nbsp;￥" + item.YHPRICE + "</span><br />";
                    
                            totallist += "<span>颜色:&nbsp;&nbsp;" + item.COLORNAME + "</span><br />" +
                                         "<span>尺码:&nbsp;&nbsp;" + item.SIZENAME + "</span><br />" +
                                        "</td>" +
                                        "<td style='width: 40%;'>";
							totallist += "<div class='input-group' style='width: 100%;'>" +
								"<span class='input-group-btn'>" +
									"<div class='Reduction'><button class='btn btn-default' type='button' class='oMin' >-</button></div>" +
								"</span>" +
								"<input style='text-align: center;' type='text' readonly='' class='form-control' value='" + item.SL + "'>" +
								"<span class='input-group-btn'>" +
									"<div class='ADD'><button class='btn btn-default' type='button' class='oPlus'>+</button></div>" +
								"</span>" +
							"</div>";
                            totallist + "</td>" +
                                    "</tr></table>";
                        }
                        else {
                            totallist = "<table><tr>" +
                                        "<td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;text-align:left;'></td>" +
                                    "</tr>" +
                                    "<tr class='orderlist'>" +
                                        "<td style='width: 25%;border-width: 0 1px 0 0;border-color:#e1e1e1;border-style:solid;' class='goodlist'><img class='goods lazy'  data-original='" + item.IMG.replace('~', 'http://wx.jnby.com') + "' /></td>" +
                                        "<td style='width: 35%;border-width: 0 1px 0 0;border-color:#e1e1e1;border-style:solid;text-align:left;'>" +
                                             "<span style='font-weight:bold;display:none;'class='GOODSID'>" + item.GOODSID + "</span>" +
                                             "<span style='font-weight:bold;display:none;'class='SKUID'>" + item.SKUID + "</span>" +
                                            "<span style='font-weight:bold;'>" + item.NAME + "</span><br />" +
                                            "<span>货号:&nbsp;&nbsp;" + item.CODE + "</span><br />" +
                                            "<span>价格:&nbsp;&nbsp;￥</span><span class='item_price'>" + item.PRICE + "</span><br />";

                            totallist += "<span>颜色:&nbsp;&nbsp;" + item.COLORNAME + "</span><br />" +
                                            "<span>尺码:&nbsp;&nbsp;" + item.SIZENAME + "</span><br />" +
                                        "</td>" +
                                        "<td style='width: 40%;'>";
   
                                totallist += "<div class='input-group' style='width: 100%;'>" +
                                    "<span class='input-group-btn'>" +
                                        "<div class='Reduction'><button class='btn btn-default' type='button' class='oMin' >-</button></div>" +
                                    "</span>" +
                                    "<input style='text-align: center;' type='text' readonly='' class='form-control' value='" + item.SL + "'>" +
                                    "<span class='input-group-btn'>" +
                                        "<div class='ADD'><button class='btn btn-default' type='button' class='oPlus'>+</button></div>" +
                                    "</span>" +
                                "</div>";
                            totallist += "</td>" +
                                    "</tr></table>";
                        }
                        ems = item.EXPRESSPRICE;
                        var dtlarr = { "orderid": item.ID };
            
                        $(".orderitem").append(totallist);

                        $("img.lazy").lazyload({ effect: "fadeIn" });

                        $(".goodlist").click(function () {
                            var goodsid = $(this).parent().find(".GOODSID").text();
                            //location.href = "wx_detail.aspx?hash=" + re_hash + "&goodsid=" + goodsid;
                        })
                    }
                })
                //输出邮费
                var SF = "<table style='text-align:left;'><tr >" +
                        "<td colspan='2'  style='border-width: 1px 0px 1px 0;border-color:#e1e1e1;border-style:solid;'>配送方式&nbsp;&nbsp;快递</td>" +
                        "<td colspan='1'  style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;' class='ems'></td>" +
                        "</tr></table>";

                $(".orderitem").append(SF);
                if (ems == 0 || ems == "" || ems == null) {
                    $(".ems").text("免邮");
                }
                else {
                    $(".ems").text(ems);
                }
                //公式更新
                reckon();

                //减
                $(".Reduction").click(function () {
                        if (parseInt($(this).parent().parent().find("input").val()) == 0) {
                            $(this).parent().parent().find("input").val("0");

                        } else {
                            $(this).parent().parent().find("input").val(parseInt($(this).parent().parent().find("input").val()) - 1);
                            reckon(); 
                        }
                });
                //加
                $(".ADD").click(function () {
                        if ($.trim($(this).parent().parent().find("input").val()) == "") {
                            $(this).parent().parent().find("input").val("1");
                        } else {
                             $(this).parent().parent().find("input").val(parseInt($(this).parent().parent().find("input").val()) + 1); 
                            reckon(); //select_vouchers();
                        }
                });
            }
        }
    })
})

$(".reload_address").click(function () {    /****新增地址中刷新按钮点击****/

    getProvince();
});

/*计算方法*/
function reckon() {
    var goodsprice = 0;             //商品总金额

    var is_vouflag = "Y";
    var YHSUMPRICE = 0; //优惠总金额
	$(".orderlist").each(function () {
		 var price = $(this).find(".item_price").text();     //吊牌价
		 var sl = $(this).find("input").val();               //数量
        goodsprice = goodsprice + (price * sl);
	});
   
    var postdate = { jfhandler: "Select_Postage", hash: re_hash, P_Postage: goodsprice };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        error: function (result) {
			var result =26;

            if (result == "0" || result == "" || result == null) {
                $(".ems").text("免邮");
                result = 0;
            }
            else {
                $(".ems").text(result);
            }
            var sumje =goodsprice;

            if (sumje < 0) {
                sumje = 0;
            }
            sumje += parseFloat(result);
            $("#HJ").text(sumje.toFixed(0));   /** 结算合计**/

        }

    })

}


//获取服务门店
function Select_cardmain() {
    var postdate = { jfhandler: "Select_cardmain", hash: re_hash, openid: re_openid };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        error: function (result) {
            /** var listarr = result;**/
			//var listarr = {"list":[{"USERNAME":"梅显明","PHONE":null,"KKSTORE":null,"NAME":null}]};  为空情况
			var listarr ={"list":[{"USERNAME":"梅显明","PHONE":null,"KKSTORE":"412412","NAME":"安阳JNBY万达店"}]}  
            if (listarr.list.length == 0) {
            }
            else {

                var storeval;
                var username;
                var usertel;
                var state = 0;
                var html;
                $.each(listarr.list, function (index, item) {
                    if (item.KKSTORE != "" && item.KKSTORE != null) {
                        state = 1;
                        html = "<option value='" + item.KKSTORE + "'>" + item.NAME + "</option>";
                        storeval = item.NAME;
                    }
                    else {
                        //html = "<option value='-1'>请选择</option>";
                    }

                    username = item.USERNAME;
                    usertel = item.PHONE;
                })
                $("#store").html(html);
                if (state == 1) {
                    $("#store").attr("disabled", "disabled");
                    $("#cardstore").text(storeval);
                    flg = true;
                }
                else {
                    $("#cardstore").text("");
                    flg = false;
                }
                $("#name").val(username);
                $("#tel").val(usertel);
                $("#textarea").val("");
                $("#address").val("");

            }
            getProvince();
        }
    })
}

//select 省份
function getProvince() {
    var postdate = { jfhandler: "Get_Province", hash: re_hash, openid: re_openid, orderid: re_orderid };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        error: function (result) {
            /**var listarr = eval("(" + result + ")");**/
			var listarr = {"info_province":[{"ID":1.0,"NAME":"重庆"},{"ID":2.0,"NAME":"安徽省"},{"ID":3.0,"NAME":"河南省"},{"ID":4.0,"NAME":"湖北省"},{"ID":5.0,"NAME":"陕西省"},{"ID":6.0,"NAME":"青海省"},{"ID":7.0,"NAME":"黑龙江省"},{"ID":8.0,"NAME":"山东省"},{"ID":9.0,"NAME":"海南省"},{"ID":10.0,"NAME":"贵州省"},{"ID":11.0,"NAME":"北京"},{"ID":12.0,"NAME":"吉林省"},{"ID":13.0,"NAME":"福建省"},{"ID":14.0,"NAME":"上海"},{"ID":15.0,"NAME":"浙江省"},{"ID":16.0,"NAME":"四川省"},{"ID":17.0,"NAME":"云南省"},{"ID":18.0,"NAME":"河北省"},{"ID":19.0,"NAME":"江苏省"},{"ID":20.0,"NAME":"江西省"},{"ID":21.0,"NAME":"广东省"},{"ID":22.0,"NAME":"新疆维吾尔自治区"},{"ID":23.0,"NAME":"内蒙古自治区"},{"ID":24.0,"NAME":"辽宁省"},{"ID":25.0,"NAME":"湖南省"},{"ID":26.0,"NAME":"广西壮族自治区"},{"ID":27.0,"NAME":"西藏自治区"},{"ID":28.0,"NAME":"甘肃省"},{"ID":29.0,"NAME":"天津"},{"ID":30.0,"NAME":"山西省"},{"ID":31.0,"NAME":"宁夏回族自治区"},{"ID":32.0,"NAME":"香港特别行政区"},{"ID":37.0,"NAME":"澳门特别行政区"},{"ID":38.0,"NAME":"台湾省"}]};
            if (htmlprovince == "" || htmlprovince == null) {
                var html = "<option value='-1'>请选择</option>";
                $.each(listarr.info_province, function (index, item) {

                    html += "<option value='" + item.ID + "'>" + item.NAME + "</option>";
                })
            }
            else {
                var html = htmlprovince;
                $.each(listarr.info_province, function (index, item) {

                    html += "<option value='" + item.ID + "'>" + item.NAME + "</option>";
                })

            }
            $("#province").html(html);
            getCity();
        }
    })
}

//select 城市
function getCity() {
    var postdate = { jfhandler: "Get_City", province: $("#province option:selected").val(), hash: re_hash, openid: re_openid, orderid: re_orderid };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        error: function (result) {
           /** var listarr = eval("(" + result + ")");  **/
			 var listarr = {"info_city":[{"ID":12.0,"NAME":"安阳市"},{"ID":13.0,"NAME":"濮阳市"},{"ID":14.0,"NAME":"南阳市"},{"ID":55.0,"NAME":"郑州市"},{"ID":103.0,"NAME":"鹤壁市"},{"ID":147.0,"NAME":"开封市"},{"ID":148.0,"NAME":"许昌市"},{"ID":149.0,"NAME":"漯河市"},{"ID":150.0,"NAME":"周口市"},{"ID":188.0,"NAME":"三门峡市"},{"ID":241.0,"NAME":"洛阳市"},{"ID":242.0,"NAME":"平顶山市"},{"ID":243.0,"NAME":"新乡市"},{"ID":277.0,"NAME":"驻马店市"},{"ID":320.0,"NAME":"焦作市"},{"ID":321.0,"NAME":"商丘市"},{"ID":322.0,"NAME":"信阳市"},{"ID":323.0,"NAME":"省直辖县级行政区划"}]}
            if (htmlcity == "" || htmlcity == null) {
                var html = "<option value='-1'>请选择</option>";
                $.each(listarr.info_city, function (index, item) {
                    html += "<option value='" + item.ID + "'>" + item.NAME + "</option>";
                })
            }
            else {
                var html = htmlcity;
                $.each(listarr.info_city, function (index, item) {
                    html += "<option value='" + item.ID + "'>" + item.NAME + "</option>";
                })
            }
            $("#city").html(html);
            getDistrict();
            if (!flg) { /****????****/
                getStore();
            }
        }
    })
}


//select 区域
function getDistrict() {
    var postdate = { jfhandler: "Get_District", city: $("#city option:selected").val(), hash: re_hash, openid: re_openid, orderid: re_orderid };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        error: function (result) {
            /**var listarr = eval("(" + result + ")");**/
			var listarr ={"info_district":[{"ID":894.0,"NAME":"安阳县"},{"ID":895.0,"NAME":"北关区"},{"ID":896.0,"NAME":"滑县"},{"ID":897.0,"NAME":"林州市"},{"ID":898.0,"NAME":"龙安区"},{"ID":899.0,"NAME":"内黄县"},{"ID":901.0,"NAME":"汤阴县"},{"ID":902.0,"NAME":"文峰区"},{"ID":903.0,"NAME":"殷都区"},{"ID":10314.0,"NAME":"市辖区"}]}
            if (htmldistrict == "" || htmldistrict == null) {
                var html = "<option value='-1'>请选择</option>";
                $.each(listarr.info_district, function (index, item) {
                    html += "<option value='" + item.ID + "'>" + item.NAME + "</option>";
                })
            }
            else {
                var html = htmldistrict;
                $.each(listarr.info_district, function (index, item) {
                    html += "<option value='" + item.ID + "'>" + item.NAME + "</option>";
                })
            }
            $("#district").html(html);
        }
    })

}


//select 店铺 
function getStore() {
    var postdate = { jfhandler: "Get_Store", city: $("#city option:selected").val(), hash: re_hash, openid: re_openid, orderid: re_orderid };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        error: function (result) {
           /** var listarr = eval("(" + result + ")"); **/
			
			var listarr = {"info_store":[{"ID":412412.0,"NAME":"安阳JNBY万达店"},{"ID":404974.0,"NAME":"JNBY安阳丹尼斯店"},{"ID":404975.0,"NAME":"JNBY安阳嘉信茂专柜"}]};
            //var html = "";
            var html = "<option value='-1'>请选择</option>";
            $.each(listarr.info_store, function (index, item) {
                html += "<option value='" + item.ID + "'>" + item.NAME + "</option>";
            })
            $("#store").html(html);
        }
    })
}

//结算提交订单
var hidden_Save = false;
$("#paysure").click(function () {    /****待处理******/
    if (hidden_Save) {
        return;
    }
    hidden_Save = true;

    var HJ = $("#HJ").text();
    if (HJ < 0) {
        Msg.show("结算金额不能小于0", 1);
        hidden_Save = false;
    }
    else {
        /*{ "RENTID": "1", "WEID": "2504948039", "OPENID": "oWJQDj0bKOl-EZ-s5r6_TSQRszoY","ID": "3845","IS_VOUCHER":"Y" ,"VOU_NO":"1,2","CHANNEL":"S", "Order_Up": [ { "ODLID":"3845","GOODSID": "503", "SKUID": "1003", "SL": "2" }]}*/
        /* {"ADNAME":"地址1","ADDRESS":"浙江省杭州市西湖区益乐路39号蓝海时代国际大厦","ADPHONE":"13732261456"}*/
        var OrderItem = new Array();
        var AddRess = new Array();
        var orderid = re_orderid;
        var odl = "";
        var Zsl = 0;
        var VoucherID = "";
        var IS_VOUCHER = "";
        //订单明细
        $(".orderlist").each(function () {
            var GOODSID = $(this).find(".GOODSID").text();
            var SKUID = $(this).find(".SKUID").text();
            var sl = $(this).find("input").val();

            odl = { "GOODSID": GOODSID, "SKUID": SKUID, "SL": sl };
            OrderItem.push(odl);
            Zsl = Zsl + sl;
        })
        /*总数量>0*/
        if (Zsl > 0) {
            //判断券数量
            var vsl = $("#V_cun").text();
            // VoucherID = $("#VoucherID").text();
            // alert(VoucherID);
            if (vsl > 0) {
                IS_VOUCHER = "Y";
                /*获取券ID*/
                VoucherID = $("#VoucherID").text();
                if (VoucherID == "" || VoucherID == null) {
                    Msg.show("获取券信息错误，请重新选择", 1);
                    hidden_Save = false;
                    return;
                }
            }
            else {
                IS_VOUCHER = "N";
            }
            //地址
            var name = $(".SP_ADNAME").text();
            var address = $(".SP_ADDRESS").text();
            var phone = $(".SP_ADPHONE").text();

            var Province = $(".out_Province").text();
            var City = $(".out_City").text();
            var District = $(".out_District").text();
            var RECEIVER_ADDRESS = $(".out_RECEIVER_ADDRESS").text();

            if (name != null && address != null && phone != null && name != "" && address != "" && phone != "") {
                //金额校验
                var Page_Price = $("#HJ").text();
                var Add_Ress = { "ADNAME": name, "ADDRESS": RECEIVER_ADDRESS, "ADPHONE": phone, "C_PROVINCE_ID": Province, "C_CITY_ID": City, "C_DISTRICT_ID": District, "C_ADDRESS": address };
                var in_json = {  "OPENID": re_openid, "ID": re_orderid, "Page_Check": "Y", "Page_Price": Page_Price, "CHANNEL": "S", "IS_VOUCHER": IS_VOUCHER, "VOU_NO": VoucherID, "Order_Up": OrderItem };
                var cedeldata = { "jfhandler": "Order_Save", "Sa_Order": JSON.stringify(in_json), "Add_Ress": JSON.stringify(Add_Ress) };
                //alert("订单提交中....");
                Msg.show("处理中", 3);
                $.ajax({
                    url: "WXHandler.ashx",
                    type: "post",
                    data: cedeldata,
                    dataType: "text",
                    success: function (result) {
                        Msg.hide();
                        var ret = $.parseJSON(result).ret;
                        var errmsg = $.parseJSON(result).errmsg;
                        if (ret == 1) {
                            Msg.show(errmsg, 0);
                            hidden_Save = false;
                            location.href = "wxtotal_pay.aspx?hash=" + re_hash + "&oid=" + re_orderid + "&pid=1";
                        }
                        else {
                            if (errmsg == "请勿重复提交订单") {
                                hidden_Save = false;
                                location.href = "WX_UserOrder.aspx?hash=" + re_hash + "&flag=N";
                            }
                            else if (ret == " -3004" || errmsg == "订单不存在") {
                                hidden_Save = false;
                                location.href = "WX_Portal.aspx?hash=" + re_hash;
                            }
                            Msg.show(errmsg, 1);
                            hidden_Save = false;
                        }
                        hidden_Save = false;
                    }
                })
            }
            else {
                Msg.show("地址不能为空", 1);
                hidden_Save = false;
            }
        }
        else {
            Msg.show("订单总数量不能为0", 1);
            hidden_Save = false;
        }
    }
})
//获取当前位置信息(经纬度)
function GetLocaltion() { 
    //获取用户地理位置(经纬度)
    wx.ready(function () {
        wx.getLocation({
            success: function (res) {
                re_latitude = res.latitude - 0.00227315; // 纬度，浮点数，范围为90 ~ -90
                re_longitude = res.longitude + 0.00479854; // 经度，浮点数，范围为180 ~ -180。                    
               
                if (re_openid == "oVFOhjmjzjKf_rjqu0SobODXb9r8") {
                    alert(re_latitude);
                }
              
            }
        });
    });

};

function SetLocaltion() {   /****待处理******/
    if (re_openid == "oVFOhjmjzjKf_rjqu0SobODXb9r8" || re_openid == "oB7r0t8yfsl0_bUy4S_4lscOajOs" || re_openid == "oWJQDj-NrEtcVDExulGTOvVJo9oU") {
        alert(re_longitude);
        alert(re_latitude);
    }

    if (re_latitude != "" && re_latitude != null && re_longitude != null && re_longitude != "") {
        re_latitude = parseFloat(re_latitude.toString().substr(0, 9)); //安卓系统长度转换出错、须截短字符串
        re_longitude = parseFloat(re_longitude.toString().substr(0, 9));

        var postdate = { jfhandler: "get_googleaddress", latitude: re_latitude, longitude: re_longitude };
        $.ajax({
            type: "post",
            url: "WXHandler.ashx",
            data: postdate,
            datatype: "text",
            success: function (result) {

                var listarr = result;
                // alert(listarr.list["c_province_id"]);
                var province = listarr.list["c_province_id"];
                var province_id = listarr.list["c_provinceid"];
                var city = listarr.list["c_city_id"];
                var city_id = listarr.list["c_cityid"];
                var district = listarr.list["c_district_id"];
                var district_id = listarr.list["c_districtid"];
                htmlprovince = "<option value='" + province_id + "'>" + province + "</option>";
                htmlcity = "<option value='" + city_id + "'>" + city + "</option>";
                htmldistrict = "<option value='" + district_id + "'>" + district + "</option>";
                htmladdress_1 = province + city + district;
                //htmladdress_2 = o.address.peceiver_address;
                $("#address").val(htmladdress_1);
                //$("#textarea").val(htmladdress_2);
                getProvince();


            }, error: function (res) {
                alert(res);
            }
        })

    }
    else {

        getProvince();
    }
    $(".nav-tabs a").eq(2).click();
    $(".modal-content").css("min-height", winHeight);
}

$("#clearPay").click(function () {
    //GetLocaltion();
    SetLocaltion();
    //$("#addAddress").modal("show");
})
$("#lock").click(function () {
    location.href = "WX_Cart.html";
})
$(".uesr").click(function () {

    location.href = "UserAddress.html";
})

$("#province").change(function () {
    htmlprovince = "";
    htmlcity = "";
    htmldistrict = "";
    getCity();

})

$("#city").change(function () {
    htmlprovince = "";
    htmlcity = "";
    htmldistrict = "";
    getDistrict();
    if (!flg) {
        getStore();
    }
})
$("#district").change(function () {
    htmlprovince = "";
    htmlcity = "";
    htmldistrict = "";
    //        var district = $("#district  option:selected").text();
    //        var address = $("#address").val(district);

})


//新增收货地址
var hidden_address = false;
$(".payBtn_address").click(function () {
    if (hidden_address) {
        return;
    }
    hidden_address = true;

    var name = $("#name").val();
    var tel = $("#tel").val();
    //  var address = $("#address").val();
    var province = $("#province  option:selected").text();
    var city = $("#city  option:selected").text();
    var district = $("#district  option:selected").text();
    var store = $("#store  option:selected").text();
    var textarea = $("#textarea").val();
    /*获取ID*/
    var shen = $("#province  option:selected").val();
    var shi = $("#city  option:selected").val();
    var qu = $("#district  option:selected").val();
    var dian = $("#store  option:selected").val();
    //必选项判断
    $("#address").val(province + city + district + textarea);
    if (name == "" || name == null) {
        $("#name").css("border", "1px solid red");
        $("select").css("border", "none");
        $("#address").val("");
        hidden_address = false;
        return;
    }
    if (tel == "" || tel == null) {
        $("select").css("border", "none");
        $("input").css("border", "none");
        $("#tel").css("border", "1px solid red");
        $("#address").val("");
        hidden_address = false;
        return;
    }
    if (shen <= 0) {
        $("select").css("border", "none");
        $("#province").css("border", "1px solid red");
        $("#address").val("");
        hidden_address = false;
        return;
    }
    if (shi <= 0) {
        $("select").css("border", "none");
        $("#city").css("border", "1px solid red");
        $("#address").val("");
        hidden_address = false;
        return;
    }
    if (qu <= 0) {
        $("select").css("border", "none");
        $("#district").css("border", "1px solid red");
        $("#address").val("");
        hidden_address = false;
        return;
    }
    if (textarea == "" || textarea == null) {
        $("select").css("border", "none");
        $("input").css("border", "none");
        $("#textarea").css("border", "1px solid red");
        $("#address").val("");
        hidden_address = false;
        return;
    }
    if (dian <= 0) {
        $("select").css("border", "none");
        $("input").css("border", "none");
        $("#textarea").css("border", "none");
        $("#store").css("border", "1px solid red");
        $("#address").val("");
        hidden_address = false;
        return;
    }
    if (shen > 0 && shi > 0 && qu > 0 && dian > 0) {

        if (name != "" && tel != "" && textarea != "") {
            /*{"RENTID":"1","WEID":"2504948039","OPENID":"oWJQDj0bKOl-EZ-s5r6_TSQRszoY","IN_TYPE":"ADD","ID":"",
            "RECEIVER_NAME":"沈强","C_PROVINCE_ID":"浙江省","C_CITY_ID":"杭州市","C_DISTRICT_ID":"西湖区","RECEIVER_ZIP":"4333300","RECEIVER_ADDRESS":"蓝海时代国际大厦","RECEIVER_MOBILE":"0571-1023456","RECEIVER_PHONE":"13732261456"}*/
            var in_json = { "OPENID": re_openid, "IN_TYPE": "ADD", "RECEIVER_NAME": name, "C_PROVINCE_ID": province, "C_CITY_ID": city, "C_DISTRICT_ID": district, "RECEIVER_ADDRESS": textarea,  "RECEIVER_PHONE": tel, "STOREID": dian, "C_PROVINCEID": shen, "C_CITYID": shi, "C_DISTRICTID": qu };
            var cedeldata = { "jfhandler": "edit_address_order", "address_order": JSON.stringify(in_json) };
            Msg.show("处理中", 3);
            $.ajax({
                url: "WXHandler.ashx",
                type: "post",
                data: cedeldata,
                dataType: "text",
                error: function (result) { /**待处理**/
                    Msg.hide();
		            var result ={"ret":"1","errmsg":"insert address ok"};  /****模拟数据***/
					/**var jf_ret = $.parseJSON(result).ret;**/
                    /**var jf_errmsg = $.parseJSON(result).errmsg;**/
					var jf_ret = result.ret;
					var jf_errmsg =result.errmsg;
                    if (jf_ret == 1) {
                        //alert(jf_errmsg);
                        //$("#cardstore").text($("#store  option:selected").text());
                        var store = $("#store  option:selected").text();
                        $("#cardstore").text(store);  /**绑定为  您的服务门店***/
                        select_address();
                        Select_cardmain();
                        hidden_address = false;
                        $("#butclose2").click();
                    }
                    else {
                        Msg.show(jf_errmsg, 1);
                        $("#address").val("");
                        hidden_address = false;
                    }
                }
            })
        }
        else {
            Msg.show("请完善收货地址", 1);
            $("#address").val("");
            hidden_address = false;
        }
    }
    else {
        Msg.show("请选择正确的收货地址", 1);
        $("#address").val("");
        hidden_address = false;
    }

})

//选择地址事件
function click_address(orderid, name, phone, address, c_provinceid, c_cityid, c_districtid, c_address) {  
    /*{
    "RENTID": "1",
    "WEID": "2504948039",
    "OPENID": "oWJQDj0bKOl-EZ-s5r6_TSQRszoY",
    "CHANNEL": "S",
    "ID": "4007",
    "ADNAME": "测试",
    "ADDRESS": "浙江省杭州市西湖区益乐路39号蓝海时代国际大厦",
    "ADPHONE": "13732261456"
    }*/
    var in_json = {  "OPENID": re_openid,"ORDERID": orderid, "ADNAME": name, "ADDRESS": address, "ADPHONE": phone, "C_PROVINCEID": c_provinceid, "C_CITYID": c_cityid, "C_DISTRICTID": c_districtid, "C_ADDRESS": c_address };
    var cedeldata = { "jfhandler": "click_address_order", "click_address": JSON.stringify(in_json) };
    $.ajax({
        url: "WXHandler.ashx",
        type: "post",
        data: cedeldata,
        dataType: "text",
        error: function (result) {
			var jf_ret=1;
           /* var jf_ret = $.parseJSON(result).ret;
            var jf_errmsg = $.parseJSON(result).errmsg;
			*/
            if (jf_ret == 1) {

            }
            else {
                Msg.show(jf_errmsg, 1);
            }
        }
    })

}

//地址列表
function select_address() { 
    GetLocaltion();   /** /获取当前位置信息(经纬度)**/
    var postdate = { jfhandler: "Select_address_order", hash: re_hash, openid: re_openid };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        error: function (result) {
           /** var listarr = result; **/
			/**var listarr = {"list":[]} ;**/
			var listarr ={
				"list": [
					{
						"C_PROVINCEID": 3,
						"C_CITYID": 12,
						"C_DISTRICTID": 894,
						"ADNAME": "梅显明",
						"C_PROVINCE_ID": "河南省",
						"C_CITY_ID": "安阳市",
						"C_DISTRICT_ID": "安阳县",
						"RECEIVER_ADDRESS": "hehheheh",
						"TEL_PHONE": "15180119848"
					},
					{
						"C_PROVINCEID": 3,
						"C_CITYID": 12,
						"C_DISTRICTID": 894,
						"ADNAME": "梅显明",
						"C_PROVINCE_ID": "河南省1",
						"C_CITY_ID": "安阳市1",
						"C_DISTRICT_ID": "安阳县1",
						"RECEIVER_ADDRESS": "zezezeze",
						"TEL_PHONE": "15180119848"
					},
				]
			}
			
            if (listarr.list.length == 0) {   /** 如果默认地址为空**/
            }
            else {  /****已存地址*****待处理分析**/ 
                $("#selecr_address").html("");
                $.each(listarr.list, function (index, item) {
                    var list = "<table class='addressItem'>" +
                                        "<tr>" +
                                            "<td style='text-align:left;font-size:1.2em;'>收货人:<span class='p_name'>" + item.ADNAME + "</span></td>" +
                                            "<td style='text-align:right;font-size:1.2em;'><span class='p_phone'>" + item.TEL_PHONE + "</span></td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td style='display:none;'><span class='in_Province'>" + item.C_PROVINCEID + "</span><span class='in_City'>" + item.C_CITYID + "</span><span class='in_District'>" + item.C_DISTRICTID + "</span><span class='in_RECEIVER_ADDRESS'>" + item.RECEIVER_ADDRESS + "</span></td>" +
                                            "<td colspan='2' style='text-align:left;'>收货地址:" + "<span class='p_address'>" + item.C_PROVINCE_ID + item.C_CITY_ID + item.C_DISTRICT_ID + item.RECEIVER_ADDRESS + "</span></td>" +
                                        "</tr>" +
                                    "</table>";


                    $("#selecr_address").append(list);
                })
                $(".addressItem").click(function () {
                    var name = $(this).find(".p_name").text();
                    var phone = $(this).find(".p_phone").text();
                    var address = $(this).find(".p_address").text();
                    var Province = $(this).find(".in_Province").text();
                    var City = $(this).find(".in_City").text();
                    var District = $(this).find(".in_District").text();
                    var RECEIVER_ADDRESS = $(this).find(".in_RECEIVER_ADDRESS").text();

                    $(".SP_ADNAME").text(name);
                    $(".SP_ADPHONE").text(phone);
                    $(".SP_ADDRESS").text(address); /*完整地址*/
                    $(".SP_ADDRESS").parent().parent().show();
                    $(".SP_ADPHONE").show();
                    $(".SP_ADNAME").parent().css("text-align", "left");
                    $(".out_Province").text(Province);
                    $(".out_City").text(City);
                    $(".out_District").text(District);
                    $(".out_RECEIVER_ADDRESS").text(RECEIVER_ADDRESS);
                    $(".td_address").text("收货地址:");
                    $(".td_name").text("收货人:");
                    click_address(re_orderid, name, phone, RECEIVER_ADDRESS, Province, City, District, address);
                    $("#butclose1").click();
                })
            }
        }
        //   })
    })
}
