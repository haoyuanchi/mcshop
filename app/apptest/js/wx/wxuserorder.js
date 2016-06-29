var re_hash = in_hash;
var re_openid = in_openid;
var re_rentid = in_rentid;
var re_weid = in_weid;
var status;
var orderid;
var Goodsid;
var SL;
var skuid;
//var re_hash = "jnby";
//var re_openid = "oVFOhjgh9JRFbTrTSBhgde6JnsYQ";
//var re_rentid = "1";
//var re_weid = "2738574294";
var hidden = false;
var hidden_back = false;
var hidden_pay = false;
var hidden_back = false;
var hidden_Escback = false;
var hidden_schedule = false;
var refund_type = "";
$(function () {
    //All:全部 N:未付款 P:已付款待发货 S:已发货 T退款 ESC 取消
    //            $(this).css("border-bottom", '2px solid #000');
    //            $(".DFK").css("color", 'Black');
    //            $(".DFH").css("color", 'Black');
    //            $(".YFH").css("color", 'Black');
    //            $(".TK").css("color", 'Black');trew
    //    hidden_back = true;
    //    status = "back";
    //    orderid = "8403";
    //    CardDialog.refund("确定是否申请退款", true);
   user_flag();
   
})

function user_flag() { /***标题颜色变化**/
    var re_flag = request("flag");
    var in_FLAG = re_flag;
    
    if (in_FLAG == 'N') {
        $(".DFK").css("border-bottom", '2px solid #000');
        User_OrderItem("'N'");
    }
    else if (in_FLAG == 'P') {
        $(".DFH").css("border-bottom", '2px solid #000');
        User_OrderItem("'P'");
    }
    else if (in_FLAG == 'S') {
        $(".YFH").css("border-bottom", '2px solid #000');
        User_OrderItem("'S'");
    }
    else if (in_FLAG == 'T') {
        $(".TK").css("border-bottom", '2px solid #000');
        User_OrderItem("'T','A','F'");
    }
    else if (in_FLAG == 'ESC') {
        User_OrderItem("'ESC'");
    }
    else if (in_FLAG == 'ALL') {
        $(".AllOrder").css("border-bottom", '2px solid #000');
        var flagAll = "'N','P','S','T','ESC'";
        User_OrderItem(flagAll);
        user_bojunItem();
    }
    else {
        $(".DFK").css("color", '#a5e8f4');
        User_OrderItem("'N'");
    }
}

//R:未确认 N:未付款 P:已付款待发货 S:已发货  T退款 ESC 取消
$(".AllOrder").click(function () {  //text-decoration:underline
    $(this).css("border-bottom", '2px solid #000');
    $(".DFK").css("border-bottom", '0px solid #000');
    $(".DFH").css("border-bottom", '0px solid #000');
    $(".YFH").css("border-bottom", '0px solid #000');
    $(".TK").css("border-bottom", '0px solid #000');
    var flag = "'N','P','S','T','ESC'";
    $(".mybojunOrderList").html("");
    User_OrderItem(flag);
    user_bojunItem();

});
$(".DFK").click(function () {
    $(".AllOrder").css("border-bottom", '0px solid #000');
    $(this).css("border-bottom", '2px solid #000');
    $(".DFH").css("border-bottom", '0px solid #000');
    $(".YFH").css("border-bottom", '0px solid #000');
    $(".TK").css("border-bottom", '0px solid #000');
    $(".mybojunOrderList").html("");
    User_OrderItem("'N'");
});
$(".DFH").click(function () {
    $(".AllOrder").css("border-bottom", '0px solid #000');
    $(".DFK").css("border-bottom", '0px solid #000');
    $(this).css("border-bottom", '2px solid #000');
    $(".YFH").css("border-bottom", '0px solid #000');
    $(".TK").css("border-bottom", '0px solid #000');
    $(".mybojunOrderList").html("");
    User_OrderItem("'P'");

});
$(".YFH").click(function () {
    $(".AllOrder").css("color", 'Black');
    $(".DFK").css("border-bottom", '0px solid #000');
    $(".DFH").css("border-bottom", '0px solid #000');
    $(this).css("border-bottom", '2px solid #000');
    $(".TK").css("border-bottom", '0px solid #000');
    $(".mybojunOrderList").html("");
    User_OrderItem("'S'");
 
});
$(".TK").click(function () {
    $(".AllOrder").css("border-bottom", '0px solid #000');
    $(".DFK").css("border-bottom", '0px solid #000');
    $(".DFH").css("border-bottom", '0px solid #000');
    $(".YFH").css("border-bottom", '0px solid #000');
    $(this).css("border-bottom", '2px solid #000');
    $(".mybojunOrderList").html("");
    User_OrderItem("'T','A','F'");  
});


function user_bojunItem() {
    var order_no = "";
    var dtllist = new Array();
    var vipzk = 0;
    var ems = 0;
    var postdate = { jfhandler: "Select_bojunonline_order", hash: re_hash, openid: re_openid};
    Msg.show("处理中", 3);
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        success: function (result) {
            var listarr = result;
            var sumsl = 0;
            var sumprice = 0;

            var mxsl = 0;
            var mxje = 0;
            var cunhj;
            if (listarr.list.length == 0) {
                //alert("ccc");
                $(".mybojunOrderList").html("");
            }
            else {
                var Orderlist = "";
                $(".mybojunOrderList").html("");
                //alert("bb");
                $.each(listarr.list, function (index, item) {

                    if (item.NO != order_no) {
                        //sumprice += item.SUMCJJE;
                        // alert(item.SUMCJJE);
                        mxsl = 0;
                        mxje = 0;
                        //开始新的订单，把上一单的合计与table尾加上
                        if (index != 0) {
                            Orderlist += cunhj;
                            Orderlist += "</table>";
                        }
                        //订单起始，添加table头
                        Orderlist += "<table style='text-align:left;' class='orderitem'>" +
                            "<tr>" +
                                "<td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'>" + item.PP + "<span class='wayBill'>订单编号:" + item.NO + "</span><span class='NO' style='display:none;'>" + item.NO + "</span><span class='LX' style='display:none;'>" + item.LY + "</span></td>" +
                            "</tr>" +
                           "<tr>" +
                                "<td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'>" +

                                "<span style='font-weight:bold;'>服务店仓:&nbsp;&nbsp;" + item.STORENAME + "</span>" +
                                "<span class='wayBill' >" + item.RQ + "</span><br/>" +
                                "<span style='font-weight:bold;'>订单类型:&nbsp;&nbsp;" + item.TYPE + "</span>" +
                                "<span class='wayBill'>" + item.LY + "</span></td>" +
                            "</tr>";
                    }

                    //添加订单项内容
                    Orderlist += "<tr class='subItem'>" +
                         "<td style='width: 5%;border-width: 0 1px 0 0;border-color:#e1e1e1;border-style:solid;' class='goodlist'>" +
                    "</td>" +
                                "<td style='width: 75%;border-width: 0 1px 0 0;border-color:#e1e1e1;border-style:solid;'>" +
                                    "<span>品名:&nbsp;&nbsp;</span><span>" + item.GOODSNAME + "</span><br />" +
                                    "<span>货号:&nbsp;&nbsp;</span><span>" + item.CODE + "</span><br />" +
                                    "<span>价格:&nbsp;&nbsp;</span><span>" + item.SJ + "元</span><br />" +
                                    "<span>颜色:&nbsp;&nbsp;</span><span>" + item.COLORNAME + "</span>&nbsp;&nbsp;" +
                                    "<span>尺码:&nbsp;&nbsp;</span><span>" + item.SIZENAME + "</span><br />" +
                    //          "<div style='display:none;'>" +
                    //          "<div class = 'hash'>" + item.HASH + "</div>" +
                    //          "</div>" +
                                "</td>" +
                                "<td style='width: 20%;text-align: center;'><span class='P_SL'>" + item.SL + "</span>";
                    //                    if (item.FLAG == "S") {
                    //                        Orderlist += "</br ><span class='orderBtn single'>退款</span>";
                    //                    }

                    Orderlist += "</td>" +
                            "</tr>";

                    //累计订单数量与金额
                    mxsl += item.SL;
                    mxje += item.CJJE;
                    //合计信息
                    cunhj = "<tr><td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span>共" + mxsl + "件商品&nbsp;实付:" + mxje + "元</span>";
                    cunhj += "</td></tr>";

                    if (item.LY == "内淘宝") {
                        cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn eproute'>物流查询</span>" +
                         "<div style='display:none;'>" +
                         "<div class = 'hash'>" + item.HASH + "</div>" +
                         "</div>" +
                         "</td></tr>";
                    }

                    order_no = item.NO;
                    //累计总数量与金额
                    sumsl += item.SL;
                    sumprice += item.CJJE;

                    //最后一个订单项，添加合计与table尾
                    if (index == listarr.list.length - 1) {
                        Orderlist += cunhj;
                        Orderlist += "</table>";
                    }
                })
                // alert(Orderlist);
                $(".mybojunOrderList").append(Orderlist);
                var orderHZ = "<table class='orderitem'><tr>" +
                                    "<td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'>" +
                                        "<span>线下订单共" + sumsl + "件商品&nbsp;实付:" + sumprice + "元</span>" +
                                    "</td>" +
                                "</table></tr>";
                //alert(Orderlist);
                $(".mybojunOrderList").append(orderHZ);


                //物流查询
                $(".eproute").click(function () {
                    //var IN_OPERTYPE = "MART";
                    //var IN_DOCNO = "WX150610105210450";
                    //alert(IN_OPERTYPE);
                    var IN_OPERTYPE = "NTB";    //$(this).parent().parent().parent().find(".LX").text();
                    var IN_DOCNO = $(this).parent().parent().parent().find(".NO").text();
                    var hash = $(this).parent().find(".hash").text();

//                    alert(IN_DOCNO);
//                    alert(hash);
                    //location.href = "WX_EPRoute.html?hash=" + hash + "&c=" + IN_OPERTYPE + "&o=" + IN_DOCNO;
                    var url = "WX_EPRoute.html?hash=" + hash + "&c=" + IN_OPERTYPE + "&o=" + IN_DOCNO;
                    location.href = GetLocation(url, hash);

                });

            }
        }


    })
}



function User_OrderItem(flag) {
    //alert(flag);
    var re_flag = flag;
   
    var order_no = "";
    var dtllist = new Array();
    var vipzk = 0;
    var ems = 0;
    var postdate = { jfhandler: "Select_User_OrderItem", hash: re_hash, openid: re_openid, flag: re_flag };
    Msg.show("处理中", 3);
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        error: function (result) {
            //alert("bbb");
            Msg.hide();
            var listarr={
    "list": [
        {
            "ID": 195662,
            "LX": "MART",  /***查询物流相关***/
            "STORENAME": "安阳JNBY万达店",
            "TEL": "13323728016",
            "ORDERAPPLY": "N",  /***flag为S 已发货情况**Y：处理中 END：完成 N：退货  ****/
            "REFUNDGOODS": "N", /***flag为S 已发货情况**Y：退货申请中 END：退款完成 N：整单退货  ****/
            "NO": "WX1606161244195662",
            "NAME": "T恤(短袖)",
            "IMG": "http://wx.jnby.com/WXDATA/JNBY/image/4/5G461136623-9_1.jpg",
            "GOODSID": 577948,
            "SKUID": 1154341,
            "CODE": "5G461136",
            "PRICE": 890,
            "SL": 4,
            "ZZJE": 5720,  /****当个品牌单项状态总价*******/
            "COLORNAME": "艳红色",
            "SIZENAME": "XS",
            "PAYUNIT": null, /*****零售单号*****/
            "EXPRESSPRICE": 0.5,
            "FLAG": "N",
            "ADNAME": "梅显明",
            "ADDRESS": "啧啧\n",
            "ADPHONE": "15180119848",
            "HASH": "jnby",
            "OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
            "PP": "JNBY"
        },
        {
            "ID": 195662,
            "LX": "MART",
            "STORENAME": "安阳JNBY万达店",
            "TEL": "13323728016",
            "ORDERAPPLY": "N",
            "REFUNDGOODS": "N",
            "NO": "WX1606161244195662",
            "NAME": "连衣裙(长连衣裙)",
            "IMG": "http://wx.jnby.com/WXDATA/JNBY/image/4/5G250123251-14_1.jpg",
            "GOODSID": 577680,
            "SKUID": 1151795,
            "CODE": "5G250123",
            "PRICE": 990,
            "SL": 1,
            "ZZJE": 5720,
            "COLORNAME": "中卡其",
            "SIZENAME": "XS",
            "PAYUNIT": null,
            "EXPRESSPRICE": 0,
            "FLAG": "N",
            "ADNAME": "梅显明",
            "ADDRESS": "啧啧\n",
            "ADPHONE": "15180119848",
            "HASH": "jnby",
            "OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
            "PP": "JNBY"
        },
        {
            "ID": 195662,
            "LX": "MART",
            "STORENAME": "安阳JNBY万达店",
            "TEL": "13323728016",
            "ORDERAPPLY": "N",
            "REFUNDGOODS": "N",
            "NO": "WX1606161244195662",
            "NAME": "T恤(短袖)",
            "IMG": "http://wx.jnby.com/WXDATA/JNBY/image/4/5G461001001-6_1.jpg",
            "GOODSID": 577953,
            "SKUID": 1148449,
            "CODE": "5G461001",
            "PRICE": 490,
            "SL": 1,
            "ZZJE": 5720,
            "COLORNAME": "本黑",
            "SIZENAME": "XS",
            "PAYUNIT": null,
            "EXPRESSPRICE": 0,
            "FLAG": "N",
            "ADNAME": "梅显明",
            "ADDRESS": "啧啧\n",
            "ADPHONE": "15180119848",
            "HASH": "jnby",
            "OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
            "PP": "JNBY"
        },
        {
            "ID": 195662,
            "LX": "MART",
            "STORENAME": "安阳JNBY万达店",
            "TEL": "13323728016",
            "ORDERAPPLY": "N",
            "REFUNDGOODS": "N",
            "NO": "WX1606161244195662",
            "NAME": "T恤(短袖)",
            "IMG": "http://wx.jnby.com/WXDATA/JNBY/image/4/5G261078001-6_1.jpg",
            "GOODSID": 577957,
            "SKUID": 1148328,
            "CODE": "5G261078",
            "PRICE": 390,
            "SL": 1,
            "ZZJE": 5720,
            "COLORNAME": "本黑",
            "SIZENAME": "S",
            "PAYUNIT": null,
            "EXPRESSPRICE": 0,
            "FLAG": "N",
            "ADNAME": "梅显明",
            "ADDRESS": "啧啧\n",
            "ADPHONE": "15180119848",
            "HASH": "jnby",
            "OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
            "PP": "JNBY"
        },
        {
            "ID": 195662,
            "LX": "MART",
            "STORENAME": "安阳JNBY万达店",
            "TEL": "13323728016",
            "ORDERAPPLY": "N",
            "REFUNDGOODS": "N",
            "NO": "WX1606161244195662",
            "NAME": "皮带",
            "IMG": "http://wx.jnby.com/WXDATA/JNBY/image/4/7G110033001-1_1.jpg",
            "GOODSID": 577622,
            "SKUID": 1149276,
            "CODE": "7G110033",
            "PRICE": 290,
            "SL": 1,
            "ZZJE": 5720,
            "COLORNAME": "本黑",
            "SIZENAME": "M",
            "PAYUNIT": null,
            "EXPRESSPRICE": 0,
            "FLAG": "N",
            "ADNAME": "梅显明",
            "ADDRESS": "啧啧\n",
            "ADPHONE": "15180119848",
            "HASH": "jnby",
            "OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
            "PP": "JNBY"
        },
        {
            "ID": 195877,
            "LX": "MART",
            "STORENAME": "速写合肥百盛店",
            "TEL": "0551-65733889",
            "ORDERAPPLY": "N",
            "REFUNDGOODS": "N",
            "NO": "WX1606161700195877",
            "NAME": "衬衣(长袖)",
            "IMG": "http://wx.jnby.com/WXDATA/croquis/image/4/9G110230410-1_1.jpg",
            "GOODSID": 576230,
            "SKUID": 1140448,
            "CODE": "9G110230",
            "PRICE": 1190,
            "SL": 1,
            "ZZJE": 1190,
            "COLORNAME": "深藏青",
            "SIZENAME": "XS",
            "PAYUNIT": null,
            "EXPRESSPRICE": 0,
            "FLAG": "N",
            "ADNAME": "梅显明",
            "ADDRESS": "啧啧\n",
            "ADPHONE": "15180119848",
            "HASH": "croquis",
            "OPENID": "oWJQDj1BfLE0Oo9XcB67icDpp0XI",
            "PP": "速写"
        }
    ]
} ;
            var sumsl = 0;
            var sumprice = 0;

            var mxsl = 0;
            var mxje = 0;
            var cunhj;
          
            if (listarr.list.length == 0) {
                //alert("ccc");
                $(".myOrderList").html("");
            }
            else {
                var Orderlist = "";
                $(".myOrderList").html("");
                //alert("bb");
                $.each(listarr.list, function (index, item) {

                    if (item.NO != order_no) {
                        sumprice += item.ZZJE; ;  /*******5720 当个品牌总价****/  
                        mxsl = 0;
                        mxje = 0;
                        //开始新的订单，把上一单的合计与table尾加上
                        if (index != 0) {
                            Orderlist += cunhj;
                            Orderlist += "</table>";
                        }
                        //订单起始，添加table头
                        Orderlist += "<table style='text-align:left;' class='orderitem' id='" + item.ID + "'>" +
                            "<tr>" +
                                "<td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'>" + item.PP + "<span class='wayBill'>订单编号:" + item.NO + "</span><span class='NO' style='display:none;'>" + item.NO + "</span><span class='LX' style='display:none;'>" + item.LX + "</span></td>" +
                            "</tr>";
                    }

                    //添加订单项内容
                    Orderlist += "<tr class='subItem'>" +
                            "<td style='width: 35%;border-width: 0 1px 0 0;border-color:#e1e1e1;border-style:solid;' class='goodlist'>" +
                            "<img class='goods lazy'  data-original='" + item.IMG.replace('~', 'http://wx.jnby.com') + "' /></td>" +
                                "<td style='width: 45%;border-width: 0 1px 0 0;border-color:#e1e1e1;border-style:solid;'>" +
                                "<span style='display:none;' class='P_GoodSID'>" + item.GOODSID + "</span><br />" +
                                 "<span style='display:none;' class='P_skuid'>" + item.SKUID + "</span><br />" +
                                  "<span style='display:none;' class='P_Hash'>" + item.HASH + "</span><br />" +
                                    "<span style='font-weight:bold;'>" + item.NAME + "</span><br />" +
                                    "<span>货号:&nbsp;&nbsp;</span><span>" + item.CODE + "</span><br />" +
                                    "<span>价格:&nbsp;&nbsp;</span><span>" + item.PRICE + "元</span><br />" +
                                    "<span>颜色:&nbsp;&nbsp;</span><span>" + item.COLORNAME + "</span><br />" +
                                    "<span>尺码:&nbsp;&nbsp;</span><span>" + item.SIZENAME + "</span><br />" +
                                    "<div style='display:none;'>" +
                                    "<div class = 'hash'>" + item.HASH + "</div>" +
                                    "</div>" +
                                "</td>" +
                                "<td style='width: 20%;text-align: center;'><span class='P_SL'>" + item.SL + "</span>";
                    if (item.FLAG == "S") {   /****已发货***/
                        // Orderlist += "</br ><span class='orderBtn single'>退款</span>";
                        if (item.REFUNDGOODS == "Y") {
                            Orderlist += "</br ><span class='orderBtn retun'>处理中</span>";
                        }
                        else if (item.REFUNDGOODS == "END") {
                            Orderlist += "</br ><span class='orderBtn retun'>完成</span>";
                        }
                        else {
                            Orderlist += "</br ><span class='orderBtn single'>退货</span>";
                        }
                    }

                    Orderlist += "</td>" +
                            "</tr>";

                    //累计订单数量与金额
                    mxsl += item.SL;
                    mxje = item.ZZJE;
                    //合计信息
                    cunhj = "<tr><td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span>共" + mxsl + "件商品&nbsp;实付:" + mxje + "元</span>";

                    if (item.EXPRESSPRICE != "" && item.EXPRESSPRICE != null && item.EXPRESSPRICE != 0) {
                        cunhj += "<span>&nbsp;邮费:" + item.EXPRESSPRICE + "元</span>";
                    }

                    cunhj += "</td></tr>";

                    if (item.STORENAME == "" && item.STORENAME == null) { item.STORENAME = "-"; } if (item.STORENAME == "" && item.TEL == null) { item.TEL = "-"; }  /***实体店缺失情况*********/
                    /*添加退货信息*/
                    if (item.PAYUNIT==null) {
                        item.PAYUNIT = "";
                    }
                    cunhj += "<tr><td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'>" +
                     "<div style='float:left; display:inline'><span>零售单号：&nbsp;&nbsp;"+ item.PAYUNIT +"</span><br/><span>店铺:&nbsp;&nbsp;" + item.STORENAME + "</span><br/><span>电话:&nbsp;&nbsp;" + item.TEL + "</span></div></td></tr>";

                    if (item.FLAG == "N") { /*****未付款****/
                        cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn pay'>立即支付</span><span class='orderBtn cancel'>取消订单</span>" +
                         "<div style='display:none;'>" +
                         "<div class = 'hash'>" + item.HASH + "</div>" +
                         "</div>" +
                        "</td></tr>";
                    }
                    else if (item.FLAG == "P") {   /****已付款待发货*******/
                        cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn back'>申请退款</span></td></tr>";
                    }
//                    else if (item.FLAG == "S") {
//                        cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn back'>申请退款</span><span class='orderBtn eproute'>物流查询</span></td></tr>";
//                    }
                    else if (item.FLAG == "S") {  /*****已发货********/
                        if (item.ORDERAPPLY == "Y") {
                            cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn retun'>退货申请中</span><span class='orderBtn eproute'>物流查询</span>" +
                         "<div style='display:none;'>" +
                         "<div class = 'hash'>" + item.HASH + "</div>" +
                         "</div>" +
                            "</td></tr>";
                        }
                        else if (item.ORDERAPPLY == "END") {
                            cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn retun'>退款完成</span><span class='orderBtn eproute'>物流查询</span>" +
                         "<div style='display:none;'>" +
                         "<div class = 'hash'>" + item.HASH + "</div>" +
                         "</div>" +
                            "</td></tr>";
                        }
                        else {
                            cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn back'>整单退货</span><span class='orderBtn eproute'>物流查询</span>" +
                         "<div style='display:none;'>" +
                         "<div class = 'hash'>" + item.HASH + "</div>" +
                         "</div>" +
                            "</td></tr>";
                        }
//                        cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn back'>申请退款</span><span class='orderBtn eproute'>物流查询</span>"+
//                         "<div style='display:none;'>" +
//                         "<div class = 'hash'>" + item.HASH + "</div>" +
//                         "</div>" +
//                            "</td></tr>";
                    }

                    else if (item.FLAG == "T") {  /******退款****/
                            cunhj = "<tr><td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span>共" + mxsl + "件商品&nbsp;实付:" + mxje + "元&nbsp;&nbsp;退款:微支付" + item.ZZJE + "</span>";


                        cunhj += "<tr><td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'>" +
                     "<div style='float:left; display:inline'><span>零售单号：&nbsp;&nbsp;" + item.PAYUNIT + "</span><br/><span>店铺:&nbsp;&nbsp;" + item.STORENAME + "</span><br/><span>电话:&nbsp;&nbsp;" + item.TEL + "</span></div></td></tr>";
                        cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn retun'>退货申请中</span><span class='orderBtn Escback'>取消退货</span><span class='orderBtn schedule' id = 'schedule' style='background-color:#ff4040;color: #fff;'>退货进度查询</span></td></tr>";

                    }
                    else if (item.FLAG == "A") { /****退款申请中*****/

                        cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn retun'>退款申请中</span></td></tr>";
                    }
                    else if (item.FLAG == "F") { /*******退款完成******/
                            cunhj = "<tr><td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span>共" + mxsl + "件商品&nbsp;实付:" + mxje + "元&nbsp;&nbsp;退款:微支付" + item.ZZJE + "</span>";
                        cunhj += "<tr><td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'>" +
                     "<div style='float:left; display:inline'><span>零售单号：&nbsp;&nbsp;" + item.PAYUNIT + "</span><br/><span>店铺:&nbsp;&nbsp;" + item.STORENAME + "</span><br/><span>电话:&nbsp;&nbsp;" + item.TEL + "</span></div></td></tr>";
                        cunhj += "<tr><td colspan='3' style='border-width: 0 0 1px 0;border-color:#e1e1e1;border-style:solid;'><span class='orderBtn retun'>退款完成</span><span class='orderBtn schedule' id = 'schedule' style='background-color:#ff4040;color: #fff;'>退货进度查询</span></td></tr>";
                    }


                    order_no = item.NO;
                    //累计总数量与金额
                    sumsl += item.SL;
                    //sumprice += item.JE;

                    //最后一个订单项，添加合计与table尾
                    if (index == listarr.list.length - 1) {
                        Orderlist += cunhj;
                        Orderlist += "</table>";
                    }

                })
                // alert(Orderlist);
                $(".myOrderList").append(Orderlist);
                var orderHZ = "<table class='orderitem'><tr>" +
                                    "<td colspan='3' style='border-width: 1px 0 1px 0;border-color:#e1e1e1;border-style:solid;'>" +
                                        "<span>共" + sumsl + "件商品&nbsp;实付:" + sumprice + "元</span>" +
                                    "</td>" +
                                "</table></tr>";
                //alert(Orderlist);
                $(".myOrderList").append(orderHZ);

                $("img.lazy").lazyload({ effect: "fadeIn" });

                $(".goodlist").click(function () {
                    var goodsid = $(this).parent().find(".P_GoodSID").text();
                    var P_Hash = $(this).parent().find(".P_Hash").text();
                    var url = "wx_detail.html?hash=" + P_Hash + "&goodsid=" + goodsid;
                    location.href = GetLocation(url, P_Hash);
                    
                })

                $("table.orderitem").has("tr.subItem").each(function (i) {
                    if ($(this).find("tr.subItem").size() == 1) {
                        $(this).find("tr.subItem .single").hide();
                    }
                })
                //取消订单

                $(".cancel").click(function () {
                    status = "cancel";


                    if (hidden) {
                        return;
                    }
                    hidden = true;

                    orderid = $(this).parent().parent().parent().parent().attr("id");
                    CardDialog.confirm("确定是否取消订单", true);

                });

                
                $(".pay").click(function () {
                    //alert(hidden_pay);
                    if (hidden_pay) {
                        return;
                    }
                    hidden_pay = true;
                    // alert(1);
                    var orderid = $(this).parent().parent().parent().parent().attr("id");
                    // alert(orderid);
                    var hash = $(this).parent().find(".hash").text();
                    // alert(hash);
                    if (orderid != "" && orderid != null) {
                        hidden_pay = false;
                        var url = "wxtotal_pay.html?hash=" + hash + "&oid=" + orderid + "&pid=1";  /****支付页面**/
                        location.href = GetLocation(url, hash);

                    }
                    else {
                        Msg.show("订单信息未能获取", 1);
                        hidden_pay = false;
                    }
                });


                //申请退款

                $(".back").click(function () {
                    if (hidden_back) {
                        return;
                    }
                    hidden_back = true;
                    status = "back";
                    orderid = $(this).parent().parent().parent().parent().attr("id");
                    //CardDialog.confirm("确定是否申请退款", true);
                    if (refund_type != "" && refund_type != null) {
                        Msg.show("提交中...", 3);
                        setInterval(function () { Msg.hide(); }, 2000);
                    }
                    else {
                        CardDialog.refund("确定是否申请退款", true);
                    }
                });

                //单个退款

                $(".single").click(function () {
                    if (hidden_back) {
                        return;
                    }
                    hidden_back = true;
                    status = "single";
                    orderid = $(this).parent().parent().parent().parent().attr("id");
                    skuid = $(this).parent().parent().find(".P_skuid").text();
                    SL = $(this).parent().find(".P_SL").text();
                    //                    alert(orderid);
                    //                    alert(Goodsid);
                    //                    alert(SL);
                    //CardDialog.confirm("确定是否退款", true);
                    if (refund_type != "" && refund_type != null) {
                        Msg.show("提交中...", 3);
                        setInterval(function () { Msg.hide(); }, 2000);
                    }
                    else {
                        CardDialog.refund("确定是否退款", true);
                    }
                });
          
                //取消退货
                $(".Escback").click(function () {
                    if (hidden_Escback) {
                        return;
                    }
                    hidden_Escback = true;
                    status = "Escback";
                    orderid = $(this).parent().parent().parent().parent().attr("id");
                    //Goodsid = $(this).parent().parent().find(".P_GoodSID").text();
                    CardDialog.confirm("确定是否取消退货", true);

                });
                //退货进度查询
                $(".schedule").click(function () {
                    if (hidden_schedule) {
                        return;
                    }
                    hidden_schedule = true;
                    status = "schedule";
                    orderid = $(this).parent().parent().parent().parent().attr("id");
                    //Goodsid = $(this).parent().parent().find(".P_GoodSID").text();
                    CardDialog.confirm("确定是否查看进度", true);

                });

                //物流查询
                $(".eproute").click(function () {
                    //var IN_OPERTYPE = "MART";
                    //var IN_DOCNO = "WX150610105210450";
                    //alert(IN_OPERTYPE);
                    var IN_OPERTYPE = $(this).parent().parent().parent().find(".LX").text(); 
                    var IN_DOCNO = $(this).parent().parent().parent().find(".NO").text();
                    var hash = $(this).parent().find(".hash").text();
                    //location.href = "WX_EPRoute.html?hash=" + hash + "&c=" + IN_OPERTYPE + "&o=" + IN_DOCNO;
                    var url = "WX_EPRoute.html?hash=" + hash + "&c=" + IN_OPERTYPE + "&o=" + IN_DOCNO;
                    location.href = GetLocation(url, hash);

                });

            }
        }
    })
}

//取消退货
function Escbackclick(orderid) {
    status = "";
    if (orderid != "" && orderid != null) {
        /*{"RENTID":"1","WEID":"2504948039","OPENID":"oWJQDj0bKOl-EZ-s5r6_TSQRszoY","CHANNEL":"S","ORDERID":"3906"}*/
        var in_json = {  "OPENID": re_openid, "CHANNEL": "S", "ORDERID": orderid };
        var cedeldata = { "jfhandler": "Order_Cancel", "Cancel": JSON.stringify(in_json) };
        Msg.show("处理中", 3);
        $.ajax({
            url: "WXHandler.ashx",
            type: "post",
            data: cedeldata,
            dataType: "text",
            success: function (result) {
                Msg.hide();
                var jf_ret = $.parseJSON(result).ret;
                var jf_errmsg = $.parseJSON(result).errmsg;
                if (jf_ret == 1) {
                    Msg.show(jf_errmsg, 0);
                    //alert(jf_errmsg);
                    $(".YFH").click();
                }
                else {
                    //  alert(jf_errmsg);
                    Msg.show(jf_errmsg, 1);
                }
                hidden = false;
            }
        })
    }
    else {
        Msg.show("订单信息未能获取", 1);
        hidden = false;

    }
}


function backclick(orderid,in_refundtype) {
    status = "";
    refund_type = "";
    if (orderid != "" && orderid != null) {
        /*{"RENTID":"1","WEID":"2504948039","OPENID":"oWJQDj0bKOl-EZ-s5r6_TSQRszoY","CHANNEL":"S","ORDERID":"3906"}*/
        //var in_json = { "RENTID": re_rentid, "WEID": re_weid, "OPENID": re_openid, "CHANNEL": "S", "ORDERID": orderid };
        var cedeldata = { "jfhandler": "Order_Apply", "P_Refundid": orderid,refundtype: in_refundtype };
        Msg.show("处理中", 3);
        $.ajax({
            url: "WXHandler.ashx",
            type: "post",
            data: cedeldata,
            dataType: "text",
            success: function (result) {
                Msg.hide();
                var jf_ret = $.parseJSON(result).ret;
                var jf_errmsg = $.parseJSON(result).errmsg;
                if (jf_ret == 1) {
                    if (jf_errmsg != "" && jf_errmsg != null)
                        alert(jf_errmsg);

                    //  Msg.show(jf_errmsg, 0);
                    $(".TK").click();
                }
                else {
                    alert(jf_errmsg);
                    //Msg.show(jf_errmsg, 1);
                }
                hidden_back = false;
            }
        })
    }
    else {
        Msg.show("订单信息未能获取", 1);
        hidden = false;
    }
}

function cancelclick(orderid) {
    status = "";
    if (orderid != "" && orderid != null) {
        /*{"RENTID":"1","WEID":"2504948039","OPENID":"oWJQDj0bKOl-EZ-s5r6_TSQRszoY","CHANNEL":"S","ORDERID":"3906"}*/
        var in_json = { "OPENID": re_openid, "CHANNEL": "S", "ORDERID": orderid };
        var cedeldata = { "jfhandler": "Order_Delete", "DeOrder": JSON.stringify(in_json) };
        Msg.show("处理中", 3);
        $.ajax({
            url: "WXHandler.ashx",
            type: "post",
            data: cedeldata,
            dataType: "text",
            success: function (result) {
                Msg.hide();
                var jf_ret = $.parseJSON(result).ret;
                var jf_errmsg = $.parseJSON(result).errmsg;
                if (jf_ret == 1) {
                    Msg.show(jf_errmsg, 0);
                    //alert(jf_errmsg);
                    $(".DFK").click();
                }
                else {
                    //  alert(jf_errmsg);
                    Msg.show(jf_errmsg, 1);
                }
                hidden = false;
            }
        })
    }
    else {
        Msg.show("订单信息未能获取", 1);
        hidden = false;

    }
}
function singleclick(orderid, skuid, SL,in_refundtype) {
    status = "";
    refund_type = "";
    if (orderid != "" && orderid != null) {
        /*{"RENTID":"1","WEID":"2504948039","OPENID":"oWJQDj0bKOl-EZ-s5r6_TSQRszoY","CHANNEL":"S","ORDERID":"3906"}*/
        //var in_json = { "RENTID": re_rentid, "WEID": re_weid, "OPENID": re_openid, "CHANNEL": "S", "ORDERID": orderid };
        var cedeldata = { "jfhandler": "Order_RefundgoodsBySku", "P_Refundid": orderid, "P_skuid": skuid, "P_amount": SL, refundtype: in_refundtype };
        Msg.show("处理中", 3);
        $.ajax({
            url: "WXHandler.ashx",
            type: "post",
            data: cedeldata,
            dataType: "text",
            success: function (result) {
                Msg.hide();
                var jf_ret = $.parseJSON(result).ret;
                var jf_errmsg = $.parseJSON(result).errmsg;
                if (jf_ret == 1) {
                    if (jf_errmsg != "" && jf_errmsg != null)
                        alert(jf_errmsg);
                    //Msg.show(jf_errmsg, 0);
                    $(".TK").click();
                }
                else {
                    alert(jf_errmsg);
                    // Msg.show(jf_errmsg, 1);
                }
                hidden_back = false;
            }
        })
    }
    else {
        Msg.show("订单信息未能获取", 1);
        hidden = false;
    } 

}

//进度查询
function scheduleclick(orderid) {
    status = "";
    refund_type = "";
    if (orderid != "" && orderid != null) {
        var cedeldata = { "jfhandler": "Order_schedule", "p_orderid": orderid };
        Msg.show("处理中", 3);
        $.ajax({
            url: "WXHandler.ashx",
            type: "post",
            data: cedeldata,
            dataType: "text",
            success: function (result) {
                Msg.hide();
                var jf_ret = $.parseJSON(result).ret;
                var jf_errmsg = $.parseJSON(result).errmsg;
                if (jf_ret == 1) {
                    alert(jf_errmsg);

                    //Msg.show(jf_errmsg, 0);
                }
                else {
                    alert(jf_errmsg);
                    // Msg.show(jf_errmsg, 1);
                }
                hidden_schedule = false;
            }
        })
    }
    else {
        Msg.show("订单信息未能获取", 1);
        hidden = false;
    }

}
CardDialog = {
    confirm: function (content, okFn) {
        $("#confirm_content").html(content);
        $("#confirm_dialog").show();
        $("#confirm_dialog_cancel").click(function () {
            $("#confirm_dialog").hide();
            //location.reload();
            refund_type = "";
            $('input:radio[name="refund_addr"]').attr("checked", false);
            hidden = false;
            hidden_back = false;
            hidden_pay = false;
            hidden_back = false;
            hidden_Escback = false;
            hidden_schedule = false;
        });
        $("#confirm_dialog_submit").click(function () {
            if (okFn) {
                $("#confirm_dialog").hide();
                if (status == "cancel") { /****取消订单***/
                    cancelclick(orderid);
                }
                if (status == "single") {
                    // CardDialog.refund("refund", true);                    
                    singleclick(orderid, skuid, SL, refund_type);
                }
                if (status == "schedule") {  /****退货进度查询*****/
                    // CardDialog.refund("refund", true);                    
                    scheduleclick(orderid);
                }
                if (status == "back") {  /***申请退款**/
                    // CardDialog.refund("refund", true);
                    backclick(orderid, refund_type);
                }
                if (status == "Escback") { /***取消退货****/
                    //alert(orderid);
                    Escbackclick(orderid);
                }
            }
        });
    },
    refund: function (content, okFn) {  /****确认是否退款***/
        $("#confirm_refund").show();
        $(".confirm_content_error").hide();
        refund_type = "";
        $("#confirm_refund_cancel").click(function () {
            refund_type = "";
            hidden = false;
            hidden_back = false;
            hidden_pay = false;
            hidden_back = false;
            $('input:radio[name="refund_addr"]').attr("checked", false);
            $("#confirm_refund").hide();
        });
        $("#confirm_refund_submit").click(function () {
            var boolCheck = $('input:radio[name="refund_addr"]').is(":checked");
            if (boolCheck) {
                $("#confirm_refund").hide();
                if (refund_type != "" && refund_type != null) {
                    CardDialog.confirm(content, okFn);
                } else {
                    Msg.show("请重试", 1);
                    $('input:radio[name="refund_addr"]').attr("checked", false);
                    hidden = false;
                    hidden_back = false;
                    hidden_pay = false;
                    hidden_back = false;
                }
            } else {
                $(".confirm_content_error").text("请选择退货方式");
                $(".confirm_content_error").show();
            }

        });
        $('input:radio[name="refund_addr"]').click(function () {
            if ($(this).is(":checked")) {
                $(".confirm_content_error").hide();
                refund_type = $(this).val();
                //alert(refund_type);
            }
        })
    }
};


