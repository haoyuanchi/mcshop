

var re_rentid = in_rentid;
var re_weid = in_weid;
var re_hash = request("hash");
var re_openid = in_openid;


var c_cid;
var c_rentid;
var c_weid;
var channel;
var c_goodid;
var c_skuid;
var Delarr = new Array();
var del;
var c_openid;
var sl;
var in_json;
var deinfo = "";
var price = 0;
var price1 = 0;
var price2 = 0;
var price3 = 0;
var price4 = 0;
var c_id;
var pri;
var c_hash;
//配置主题颜色
//var theme_color = "bg_" + re_hash;
//$(".fixedBtn").addClass(theme_color);

function deleteclick() {
   // alert(deinfo);
    $.post("WXShelf.ashx", {
        Method: "Shoppingcart_Del",
        Deinfo: deinfo
    },
                            function (result) {
                               for (var key in result) {

                                    if (key == "ret") {
                                        var jf_ret = result[key];

                                    }
                                    if (key == "errmsg") {
                                        var jf_errmsg = result[key];
                                    }

                                }

                                if (jf_ret == 1) {
                                    var url = "WX_Cart.aspx?hash=" + re_hash;
                                    location.href = GetLocation(url,re_hash);
                                    alert(jf_errmsg);
                                }
                                else {
                                    alert(jf_errmsg + "请再次尝试!");
                                }

                            }
                        );
}
$(document).ready(function () {

    $.post("WXShelf.ashx", {
        Method: "Select_CartItem",
        hash: re_hash,
        openid: re_openid
    },
           function (result) {
               var prices = 0;
               var listarr = result;
               var arrayObj = new Array();
               var totallist;
               //alert(JSON.stringify(listarr)); 
               var a = 0;
               for (i = 1; i <= 4; i++) {
                   var li = "list" + i;
                   if (listarr[li].length == 0) { }
                   else {
                       $.each(listarr[li], function (index, item) {
                           totallist = "";
                           if (index == 0) {
                               totallist = "<table style='background-color:#e4fbff;height:45px;line-height: 45px;'>" +
                                    "<tr class='orderlist' >" +
                                    "<td class='checkArea' id='checkArea" + i + "' rowspan='2' style='width: 20%;'>" +
                                    "<div class='checkbox' id='ch" + i + "'>" +
                         		        "<input class='check' type='checkbox'  value='1'  id='checkbox" + i + "' name='newsletter' />" +
                       	  	        "<label></label> " +
                         	            "</div>" +
                                    "</td>" +
                                    "<td style='width: 35%;'>" + item.GSNAME + "品牌</td>" +
                                    "<td style='width: 45%;text-align:right;padding-right:20px;' class='edit" + i + "'> 编辑" +
                                    " </td> " +
                                    " </tr> " +
                                    " </table>";
                               $(".cartList").append(totallist);
                               // alert(totallist);
                               totallist = "";
                           }
                           else { }

                           totallist = "<table>" +
                                     " <tr class='orderlist" + i + "'>" +
                                     "<td class='checkArea' rowspan='2' style='width: 20%;'>" +
                                     " <div class='checkbox'>" +
  		                             "<input class='check" + i + "' type='checkbox'  value=" + item.ID + " id='" + item.ID + "' name='newsletter' />" +
	  	                             " <label></label> " +
  	                                 "</div>" +
                                     "</td>" +
                                     " <td style='width: 35%;' class='goodlist'><img class='goods lazy' src='" + item.ICON_URL + "' /></td>" +
                                     " <td style='width: 45%;' class='goodlist1'>" +
                                     "<span style='font-weight:bold;'>" + item.NAME + "</span><span class='del' id=" + item.ID + ">删除</span><br /><br />" +
                                     "<span>货号&nbsp;&nbsp;" + item.CODE + "</span><br />" +
                                     "<span>价格&nbsp;&nbsp;" + item.PRICE + "</span><br />" +
                                     "<span>颜色&nbsp;&nbsp;" + item.COLORNAME + "</span><br />" +
                                      "<span>色号&nbsp;&nbsp;" + item.COLORCODE + "</span><br />" +
                                     "<span>尺码&nbsp;&nbsp;" + item.SIZENAME + "</span><br />" +
                                     "<span>数量&nbsp;&nbsp;" + item.SL + "</span><br />" +
                                     "<div style='display:none;'>" +
                                    "<div class = 'skuid'>" + item.SKUID + "</div>" +
                                    "<div class = 'channel'>" + item.CHANNEL + "</div>" +
                                    "<div class = 'goodsid'>" + item.GOODSID + "</div>" +
                                    "<div class = 'cid'>" + item.ID + "</div>" +
                                    "<div class = 'sl'>" + item.SL + "</div>" +
                                    "<div class = 'price'>" + item.PRICE + "</div>" +
                                    "<div class = 'rentid'>" + item.RENTID + "</div>" +
                                    "<div class = 'openid'>" + item.OPENID + "</div>" +
                                    "<div class = 'weid'>" + item.WEID + "</div>" +
                                    "<div class = 'hash'>" + item.HASH + "</div>" +
                                    "</div>" +
                                     "</td> " +
                                     " </tr> " +
                                     "</table>";
                           $(".cartList").append(totallist);
                       })
                   }
               }

               $("img.lazy").lazyload({ effect: "fadeIn" });
               $(".goodlist").click(function () {
                   var goodsid = $(this).parent().find(".goodsid").text();
                   var hash = $(this).parent().find(".hash").text();
                   var url = "wx_detail.aspx?hash=" + hash + "&goodsid=" + goodsid;
                   location.href = GetLocation(url, hash);
                   //                   if (hash == "less") {
                   //                       location.href = "http://wx.jnby.com/apptest/wx_detail.aspx?hash=" + hash + "&goodsid=" + goodsid;
                   //                   }
                   //                   else if (hash == "tjnby") {
                   //                       location.href = "http://wx.jnby.com/apptest/wx_detail.aspx?hash=" + hash + "&goodsid=" + goodsid;
                   //                   }
                   //                   else {
                   //                       location.href = "http://wx.jnby.com/apptest/wx_detail.aspx?hash=" + hash + "&goodsid=" + goodsid;
                   //                   }
               })
               $(".checkArea").click(function () {
                   $(this).find("input").click();
               })

               $(".checkArea input").click(function (e) {
                   //取消冒泡
                   e.stopPropagation();
               })
               $(".HJ").append(prices);
               // alert("1");
               var i = 0;
               var j = 0;

               $(".edit1").click(function () {
                   if ($(this).text().trim() == "编辑") {
                       $(".orderlist1").find(".del").show();
                       $(this).text("完成");
                   }
                   else {
                       $(".orderlist1").find(".del").hide();
                       $(this).text("编辑");
                   }
               })
               $(".edit2").click(function () {
                   if ($(this).text().trim() == "编辑") {
                       $(".orderlist2").find(".del").show();
                       $(this).text("完成");
                   }
                   else {
                       $(".orderlist2").find(".del").hide();
                       $(this).text("编辑");
                   }
               })
               $(".edit3").click(function () {
                   if ($(this).text().trim() == "编辑") {
                       $(".orderlist3").find(".del").show();
                       $(this).text("完成");
                   }
                   else {
                       $(".orderlist3").find(".del").hide();
                       $(this).text("编辑");
                   }
               })
               $(".edit4").click(function () {
                   if ($(this).text().trim() == "编辑") {
                       $(".orderlist4").find(".del").show();
                       $(this).text("完成");
                   }
                   else {
                       $(".orderlist4").find(".del").hide();
                       $(this).text("编辑");
                   }
               })
               $(".del").click(function () {
                   deinfo = "";
                   c_cid = "";
                   channel = "";
                   c_skuid = "";
                   sl = "";
                   del = "";
                   in_json = "";
                   Delarr = new Array();
                   // alert(c_cid);
                   c_cid = $(this).attr("ID");
                   // alert(c_cid);
                   c_rentid = re_rentid;
                   c_weid = re_weid;
                   channel = $(this).parent().find(".channel").text();
                   c_skuid = $(this).parent().find(".skuid").text();
                   sl = $(this).parent().find(".sl").text();
                   del = { "CID": c_cid, "SKUID": c_skuid, "SL": sl };
                   c_openid = re_openid;
                   Delarr.push(del);
                   in_json = { "RENTID": c_rentid, "WEID": c_weid, "OPENID": c_openid, "CHANNEL": channel, "Cart_Del": Delarr };
                   deinfo = JSON.stringify(in_json);
                   // alert(deinfo);
                   CardDialog.confirm("确定是否删除", true);
               })

               CardDialog = {
                   confirm: function (content, okFn) {
                       $("#confirm_content").html(content);
                       $("#confirm_dialog").show();
                       $("#confirm_dialog_cancel").click(function () {
                           $("#confirm_dialog").hide();
                           //location.reload();
                       });
                       $("#confirm_dialog_submit").click(function () {
                           if (okFn) {
                               $("#confirm_dialog").hide();
                               deleteclick();
                               // alert(deinfo);
                           }
                       });
                   }
               };

               $("#checkArea1").click(function () {
                   price1 = 0;
                   if ($("#checkbox1").is(":checked")) {
                       $(".check1").each(function (index, obj) {
                           obj.checked = true;
                       });
                       $(".check3").removeAttr('checked');
                       $(".check2").removeAttr('checked');
                       $(".check4").removeAttr('checked');
                       if ($("#checkbox3").is(":checked")) {
                           document.getElementById("checkbox3").checked = false;
                       }
                       if ($("#checkbox2").is(":checked")) {
                           document.getElementById("checkbox2").checked = false;
                       }
                       if ($("#checkbox4").is(":checked")) {
                           document.getElementById("checkbox4").checked = false;
                       }
                       $(".orderlist1").each(function () {
                           c_id = $(this).find(".cid").text();
                           if ($("#" + c_id).is(":checked")) {
                               c_id = $(this).find(".cid").text();
                               sl = $(this).find(".sl").text();
                               pri = $(this).find(".price").text();
                               price1 = price1 + pri * sl;

                           }
                       })
                   }
                   else {
                       $(".check1").each(function (index, obj) {
                           obj.checked = false;
                       });

                   }

                   price = price1;
                   $(".HJ").text(price);
               });
               $("#checkArea2").click(function () {
                   price2 = 0;
                   if ($("#checkbox2").is(":checked")) {
                       $(".check2").each(function (index, obj) {
                           obj.checked = true;
                       });
                       $(".check3").removeAttr('checked');
                       $(".check1").removeAttr('checked');
                       $(".check4").removeAttr('checked');
                       if ($("#checkbox4").is(":checked")) {
                           document.getElementById("checkbox4").checked = false;
                       }
                       if ($("#checkbox3").is(":checked")) {
                           document.getElementById("checkbox3").checked = false;
                       }
                       if ($("#checkbox1").is(":checked")) {
                           document.getElementById("checkbox1").checked = false;
                       }

                       $(".orderlist2").each(function () {
                           c_id = $(this).find(".cid").text();
                           if ($("#" + c_id).is(":checked")) {
                               sl = $(this).find(".sl").text();
                               pri = $(this).find(".price").text();
                               price2 = price2 + pri * sl;
                           }
                       })
                   }
                   else {
                       //  $(".check1").prop("disabled", true);
                       $(".check2").each(function (index, obj) {
                           obj.checked = false;
                       });

                   }

                   price = price2;
                   $(".HJ").text(price);
               });
               $("#checkArea3").click(function () {
                   price3 = 0;
                   if ($("#checkbox3").is(":checked")) {
                       $(".check3").each(function (index, obj) {
                           obj.checked = true;
                       });
                       $(".check2").removeAttr('checked');
                       $(".check1").removeAttr('checked');
                       $(".check4").removeAttr('checked');
                       if ($("#checkbox2").is(":checked")) {
                           document.getElementById("checkbox2").checked = false;
                       }
                       if ($("#checkbox1").is(":checked")) {
                           document.getElementById("checkbox1").checked = false;
                       }
                       if ($("#checkbox4").is(":checked")) {
                           document.getElementById("checkbox4").checked = false;
                       }

                       $(".orderlist3").each(function () {
                           c_id = $(this).find(".cid").text();
                           if ($("#" + c_id).is(":checked")) {
                               sl = $(this).find(".sl").text();
                               pri = $(this).find(".price").text();
                               price3 = price3 + pri * sl;

                           }
                       })
                   }
                   else {
                       $(".check3").each(function (index, obj) {
                           obj.checked = false;
                       });

                   }
                   price = price3;
                   $(".HJ").text(price3);
               });
               $("#checkArea4").click(function () {
                   price4 = 0;
                   if ($("#checkbox4").is(":checked")) {
                       $(".check4").each(function (index, obj) {
                           obj.checked = true;
                       });
                       $(".check3").removeAttr('checked');
                       $(".check1").removeAttr('checked');
                       $(".check2").removeAttr('checked');
                       if ($("#checkbox3").is(":checked")) {
                           document.getElementById("checkbox3").checked = false;
                       }
                       if ($("#checkbox1").is(":checked")) {
                           document.getElementById("checkbox1").checked = false;
                       }
                       if ($("#checkbox2").is(":checked")) {
                           document.getElementById("checkbox2").checked = false;
                       }
                       $(".orderlist4").each(function () {
                           c_id = $(this).find(".cid").text();
                           if ($("#" + c_id).is(":checked")) {
                               sl = $(this).find(".sl").text();
                               pri = $(this).find(".price").text();
                               price4 = price4 + pri * sl;

                           }
                       })
                   }
                   else {
                       $(".check4").each(function (index, obj) {
                           obj.checked = false;
                       });

                   }
                   price = price4;
                   $(".HJ").text(price);
               });
               var m = 0;
               var n = 0;
               $(".check2").click(function () {
                   if ($(".check2").is(":checked")) {
                       $(".check3").removeAttr('checked');
                       $(".check1").removeAttr('checked');
                       $(".check4").removeAttr('checked');
                       if ($("#checkbox4").is(":checked")) {
                           document.getElementById("checkbox4").checked = false;
                       }
                       if ($("#checkbox3").is(":checked")) {
                           document.getElementById("checkbox3").checked = false;
                       }
                       if ($("#checkbox1").is(":checked")) {
                           document.getElementById("checkbox1").checked = false;
                       }

                   }
                   price2 = 0;
                   m = $(".check2:checked").length;
                   $(".check2").each(function (index, obj) {

                       n = index + 1;

                   });
                   if (m == parseInt(n)) {
                       document.getElementById("checkbox2").checked = true;
                   }
                   else {
                       document.getElementById("checkbox2").checked = false;
                   }
                   $(".orderlist2").each(function () {
                       c_id = $(this).find(".cid").text();
                       if ($("#" + c_id).is(":checked")) {
                           sl = $(this).find(".sl").text();
                           pri = $(this).find(".price").text();
                           price2 = price2 + pri * sl;

                       }
                       price = price2;
                       $(".HJ").text(price);
                   })
               })

               $(".check1").click(function () {
                   price1 = 0;
                   if ($(".check1").is(":checked")) {
                       $(".check3").removeAttr('checked');
                       $(".check2").removeAttr('checked');
                       $(".check4").removeAttr('checked');
                       if ($("#checkbox3").is(":checked")) {
                           document.getElementById("checkbox3").checked = false;
                       }
                       if ($("#checkbox2").is(":checked")) {
                           document.getElementById("checkbox2").checked = false;
                       }
                       if ($("#checkbox4").is(":checked")) {
                           document.getElementById("checkbox4").checked = false;
                       }
                   }
                   m = $(".check1:checked").length;
                   $(".check1").each(function (index, obj) {

                       n = index + 1;
                       // alert(n);
                   });
                   if (m == parseInt(n)) {
                       document.getElementById("checkbox1").checked = true;
                   }
                   else {
                       document.getElementById("checkbox1").checked = false;
                   }
                   $(".orderlist1").each(function () {
                       c_id = $(this).find(".cid").text();
                       if ($("#" + c_id).is(":checked")) {
                           c_id = $(this).find(".cid").text();
                           sl = $(this).find(".sl").text();
                           pri = $(this).find(".price").text();
                           price1 = price1 + pri * sl;

                       }
                       price = price1;
                       $(".HJ").text(price);
                   })
               })
               $(".check3").click(function () {
                   if ($(".check3").is(":checked")) {
                       //  $(".check1").prop("disabled", true);
                       $(".check2").removeAttr('checked');
                       $(".check1").removeAttr('checked');
                       $(".check4").removeAttr('checked');
                       if ($("#checkbox2").is(":checked")) {
                           document.getElementById("checkbox2").checked = false;
                       }
                       if ($("#checkbox1").is(":checked")) {
                           document.getElementById("checkbox1").checked = false;
                       }
                       if ($("#checkbox4").is(":checked")) {
                           document.getElementById("checkbox4").checked = false;
                       }
                   }
                   price3 = 0;
                   m = $(".check3:checked").length;
                   $(".check3").each(function (index, obj) {

                       n = index + 1;

                   });
                   if (m == parseInt(n)) {
                       document.getElementById("checkbox3").checked = true;
                   }
                   else {
                       document.getElementById("checkbox3").checked = false;
                   }
                   $(".orderlist3").each(function () {
                       c_id = $(this).find(".cid").text();
                       if ($("#" + c_id).is(":checked")) {
                           c_id = $(this).find(".cid").text();
                           sl = $(this).find(".sl").text();
                           pri = $(this).find(".price").text();
                           price3 = price3 + pri * sl;

                       }
                       price = price3;
                       $(".HJ").text(price);
                   })
               })
               $(".check4").click(function () {
                   price4 = 0;
                   if ($(".check4").is(":checked")) {
                       $(".check3").removeAttr('checked');
                       $(".check1").removeAttr('checked');
                       $(".check2").removeAttr('checked');
                       if ($("#checkbox3").is(":checked")) {
                           document.getElementById("checkbox3").checked = false;
                       }
                       if ($("#checkbox1").is(":checked")) {
                           document.getElementById("checkbox1").checked = false;
                       }
                       if ($("#checkbox2").is(":checked")) {
                           document.getElementById("checkbox2").checked = false;
                       }
                   }
                   m = $(".check4:checked").length;
                   $(".check4").each(function (index, obj) {

                       n = index + 1;

                   });
                   if (m == parseInt(n)) {
                       document.getElementById("checkbox4").checked = true;
                   }
                   else {
                       document.getElementById("checkbox4").checked = false;
                   }
                   $(".orderlist4").each(function () {
                       c_id = $(this).find(".cid").text();
                       if ($("#" + c_id).is(":checked")) {
                           c_id = $(this).find(".cid").text();
                           sl = $(this).find(".sl").text();
                           pri = $(this).find(".price").text();
                           price4 = price4 + pri * sl;

                       }
                       price = price4;
                       $(".HJ").text(price);
                   })
               })


               $("#set").click(function () {
                   // alert(1);
                   var rusult = 0; var c_cid; var channel; var c_goodid; var c_skuid; var del; var sl; var c_id;
                   var Delarr = new Array();
                   if ($(".orderlist1 .check1:checked").size() == 0 && $(".orderlist2 .check2:checked").size() == 0 && $(".orderlist3 .check3:checked").size() == 0 && $(".orderlist4 .check4:checked").size() == 0) {
                       Msg.show("你没有选择商品", 1);
                       return;
                   }
                   // alert()
                   for (q = 1; q <= 4; q++) {
                       //alert(q);
                       $(".orderlist" + q).each(function () {
                           var cid = $(this).find(".check" + q).val(); ;
                           if ($("#" + cid).is(":checked")) {
                               //  alert(cid);
                               sl = $(this).find(".sl").text();
                               c_id = $(this).find(".cid").text();
                               c_rentid = $(this).find(".rentid").text(); ;
                               c_weid = $(this).find(".weid").text(); ;
                               channel = $(this).find(".channel").text();
                               c_goodid = $(this).find(".goodsid").text();
                               c_skuid = $(this).find(".skuid").text();
                               c_hash = $(this).find(".hash").text();
                               del = { "CID": c_id, "GOODSID": c_goodid, "SKUID": c_skuid, "SL": sl };
                               c_openid = $(this).find(".openid").text();
                               Delarr.push(del);
                           }
                       })
                   }
                   var in_json = { "RENTID": c_rentid, "WEID": c_weid, "OPENID": c_openid, "CHANNEL": channel, "OrderItem": Delarr };
                   var deinfo = JSON.stringify(in_json);
                   if (c_rentid != null && c_weid != null && c_openid) {
                       Msg.show("处理中", 3);
                       $.post("WXShelf.ashx", {
                           Method: "Order_Insert",
                           Deinfo: deinfo
                       },
                  function (result) {
                      Msg.hide();
                      for (var key in result) {

                          if (key == "ret") {
                              var jf_ret = result[key];
                          }
                          if (key == "Out_Orderid") {
                              var jf_orderid = result[key];
                          }
                          if (key == "errmsg") {
                              var jf_errmsg = result[key];
                          }
                      }
                      if (jf_ret == 1) {
                          // var re_hash = request("hash");
                          // var re_hash = less;
                          var url = "WX_Order.aspx?hash=" + c_hash + "&orderid=" + jf_orderid;
                          location.href = GetLocation(url, c_hash);
//                          if (c_hash == "less") {
//                              location.href = "http://wx.jnby.com/apptest/WX_Order.aspx?hash=" + c_hash + "&orderid=" + jf_orderid;
//                          }
//                          else if (c_hash == "tjnby") {
//                              location.href = "http://wx.jnby.com/apptest/WX_Order.aspx?hash=" + c_hash + "&orderid=" + jf_orderid;
//                          }
//                          else {
//                              location.href = "http://wx.jnby.com/apptest/WX_Order.aspx?hash=" + c_hash + "&orderid=" + jf_orderid;
//                          }

                      }
                      else if (jf_ret == -1001) {
                          Msg.show("请开卡", 1);
                          // var re_hash = request("hash");
                          //var re_hash = less;
                          var url = "WX_Login.aspx?hash=" + c_hash;
                          location.href = GetLocation(url, c_hash);
//                          if (c_hash == "less") {
//                              location.href = "http://wx.jnby.com/apptest/WX_Login.aspx?hash=" + c_hash;
//                          }
//                          else if (c_hash == "tjnby") {
//                              location.href = "http://wx.jnby.com/apptest/WX_Login.aspx?hash=" + c_hash;
//                          }
//                          else {
//                              location.href = "http://wx.jnby.com/apptest/WX_Login.aspx?hash=" + c_hash;
//                          }

                      }
                      else if (jf_ret == -1002) {
                          Msg.show("您未关注我们的品牌，请您先到个人中心进行品牌点亮", 1);
                          //var re_hash = request("hash");
                          //var re_hash = less;
                          var url = "WX_UserCenter.aspx?hash=" + c_hash;
                          location.href = GetLocation(url, c_hash);
//                          if (c_hash == "less") {
//                              location.href = "http://wx.jnby.com/apptest/WX_UserCenter.aspx?hash=" + c_hash;
//                          }
//                          else if (c_hash == "tjnby") {
//                              location.href = "http://wx.jnby.com/apptest/WX_UserCenter.aspx?hash=" + c_hash;
//                          }
//                          else {
//                              location.href = "http://wx.jnby.com/apptest/WX_UserCenter.aspx?hash=" + c_hash;
//                          }

                      }
                      else {

                          Msg.show(jf_errmsg + "请再次尝试!", 1);
                          setTimeout(function(){location.reload();},1300);
                         
                      }
                  }
                  );
                   }
               })




           }

            )

})