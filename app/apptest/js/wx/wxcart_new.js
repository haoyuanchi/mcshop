
var re_hash = request("hash");
var re_openid = in_openid;


var c_cid;
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

function deleteclick() {/*****购物车中删除商品  待处理******/
	var postdata ={
			" Method ": " Shoppingcart_Del r",
			"Deinfo": {
				"OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
				"Cart_Del": [
					{
						"CID": "186406",
						"SKUID": "1154341",
						"SL": "4"
					}
				]
			}
		};
	$.ajax({
			url: "wxhandler.ashx",
			type: "post",
			data: postdata,
			dataType: "text",
			error: function (result) {
				var result={"ret":1,"errmsg":"删除成功"}
				for (var key in result) {

					if (key == "ret") {
						var jf_ret = result[key];

					}
					if (key == "errmsg") {
						var jf_errmsg = result[key];
					}

				}
				if (jf_ret == 1) {
					var url = "WX_Cart.html?hash=" + re_hash;
					location.href = GetLocation(url,re_hash);
					alert(jf_errmsg);
				}
				else {
					alert(jf_errmsg + "请再次尝试!");
				}
			}
	});
	
  /*  $.post("WXShelf.ashx", {
        Method: "Shoppingcart_Del",
        Deinfo: deinfo  
    },
		function (result) {
		var result={"ret":1,}
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
	);*/
}
$(document).ready(function () {
	var postdata = {Method: "Select_CartItem",hash: re_hash,openid: re_openid};
	$.ajax({
			url: "wxhandler.ashx",
			type: "post",
			data: postdata,
			dataType: "text",
			error: function (result) {
				var prices = 0;
              /** var listarr = result;**/
			   var listarr ={
					"list1": [
						{
							"PRICE": 890, //会员价 实际售价
							"ID": 186406,
							"OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
							"SKUID": 1154341,
							"SL": 4,
							"PRICE1": 3560,//标价
							"GOODSID": 577948,
							"NAME": "T恤(短袖)",
							"COLORNAME": "艳红色",
							"COLORCODE": "623",
							"CODE": "5G461136",
							"SIZENAME": "XS",
							"ICON_URL": "WXDATA/JNBY/image/gooddetail/5G461136623-9_1.jpg",
							"GSNAME": "JNBY",
							"HASH": "jnby"
						},
						{
							"PRICE": 490,
							"ID": 186405,
							"OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
							"SKUID": 1148449,
							"SL": 1,
							"PRICE1": 490,
							"GOODSID": 577953,
							"NAME": "T恤(短袖)",
							"COLORNAME": "本黑",
							"COLORCODE": "001",
							"CODE": "5G461001",
							"SIZENAME": "XS",
							"ICON_URL": "WXDATA/JNBY/image/gooddetail/5G461001001-6_1.jpg",
							"GSNAME": "JNBY",
							"HASH": "jnby"
						},
						{
							"PRICE": 390,
							"ID": 186283,
							"OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
							"SKUID": 1148328,
							"SL": 1,
							"PRICE1": 390,
							"GOODSID": 577957,
							"NAME": "T恤(短袖)",
							"COLORNAME": "本黑",
							"COLORCODE": "001",
							"CODE": "5G261078",
							"SIZENAME": "S",
							"ICON_URL": "WXDATA/JNBY/image/gooddetail/5G261078001-6_1.jpg",
							"GSNAME": "JNBY",
							"HASH": "jnby"
						},
						{
							"PRICE": 990,
							"ID": 185806,
							"OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
							"SKUID": 1151795,
							"SL": 1,
							"PRICE1": 990,
							"GOODSID": 577680,
							"NAME": "连衣裙(长连衣裙)",
							"COLORNAME": "中卡其",
							"COLORCODE": "251",
							"CODE": "5G250123",
							"SIZENAME": "XS",
							"ICON_URL": "WXDATA/JNBY/image/gooddetail/5G250123251-14_1.jpg",
							"GSNAME": "JNBY",
							"HASH": "jnby"
						},
						{
							"PRICE": 290,
							"ID": 184236,
							"OPENID": "oVFOhjjd8F5vT2TJiFj_bVa0lbE4",
							"SKUID": 1149276,
							"SL": 1,
							"PRICE1": 290,
							"GOODSID": 577622,
							"NAME": "皮带",
							"COLORNAME": "本黑",
							"COLORCODE": "001",
							"CODE": "7G110033",
							"SIZENAME": "M",
							"ICON_URL": "WXDATA/JNBY/image/gooddetail/7G110033001-1_1.jpg",
							"GSNAME": "JNBY",
							"HASH": "jnby"
						}
					],
					"list2": [],
					"list3": [],
					"list4": [
						{
							"PRICE": 1190,
							"ID": 186624,
							"OPENID": "oWJQDj1BfLE0Oo9XcB67icDpp0XI",
							"SKUID": 1140448,
							"SL": 1,
							"PRICE1": 1190,
							"GOODSID": 576230,
							"NAME": "衬衣(长袖)",
							"COLORNAME": "深藏青",
							"COLORCODE": "410",
							"CODE": "9G110230",
							"SIZENAME": "XS",
							"ICON_URL": "WXDATA/JNBY/image/gooddetail/9G110230410-1_1.jpg",
							"GSNAME": "速写",
							"HASH": "croquis"
						}
					]
				}
               var arrayObj = new Array();
               var totallist;
               var a = 0;
               for (i = 1; i <= 4; i++) {   /**每个品牌的商品都循环出来********/
                   var li = "list" + i;
                   if (listarr[li].length == 0) { }
                   else {
                       $.each(listarr[li], function (index, item) {
                           totallist = "";
                           if (index == 0) {/***** 第一个商品出现 该品牌的全选行 ******/
                               totallist = "<table style='background-color: #141414;height:45px;line-height: 45px;'>" +
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
                                    "<div class = 'goodsid'>" + item.GOODSID + "</div>" +
                                    "<div class = 'cid'>" + item.ID + "</div>" +
                                    "<div class = 'sl'>" + item.SL + "</div>" +
                                    "<div class = 'price'>" + item.PRICE + "</div>" +
                                    "<div class = 'openid'>" + item.OPENID + "</div>" +
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
               $(".goodlist").click(function () {   /**点击商品图片*********/
                   var goodsid = $(this).parent().find(".goodsid").text();
                   var hash = $(this).parent().find(".hash").text();
                   var url = "wx_detail.html?hash=" + hash + "&goodsid=" + goodsid;
                   location.href = GetLocation(url, hash);

               })
               $(".checkArea").click(function () { /**点击选择按钮  全选******/
                   $(this).find("input").click();
               })

               $(".checkArea input").click(function (e) {  /**点击选择按钮  单选******/
                   //取消冒泡
                   e.stopPropagation();
               })
               $(".HJ").append(prices);
               // alert("1");
               var i = 0;
               var j = 0;

               $(".edit1").click(function () {  /***四个品牌点击编辑*********/
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
               $(".del").click(function () {  /***点击删除按钮*********/
                   deinfo = "";
                   c_cid = "";
      
                   c_skuid = "";
                   sl = "";
                   del = "";
                   in_json = "";
                   Delarr = new Array();
                   // alert(c_cid);
                   c_cid = $(this).attr("ID");
                   // alert(c_cid);


                   c_skuid = $(this).parent().find(".skuid").text();
                   sl = $(this).parent().find(".sl").text();
                   del = { "CID": c_cid, "SKUID": c_skuid, "SL": sl };
                   c_openid = re_openid;
                   Delarr.push(del);
                   in_json = { "OPENID": c_openid, "Cart_Del": Delarr };
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

               $("#checkArea1").click(function () {   /** 选择后计算价格  品牌商品全选**********/
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
               $(".check2").click(function () {   /***** 选择后计算价格  品牌商品单选*********/
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


               $("#set").click(function () {   /****点击结算***/
                   // alert(1);
                   var rusult = 0; var c_cid;  var c_goodid; var c_skuid; var del; var sl; var c_id;
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
                               c_goodid = $(this).find(".goodsid").text();
                               c_skuid = $(this).find(".skuid").text();
                               c_hash = $(this).find(".hash").text();
                               del = { "CID": c_id, "GOODSID": c_goodid, "SKUID": c_skuid, "SL": sl };
                               c_openid = $(this).find(".openid").text();
                               Delarr.push(del);
                           }
                       })
                   }
                   var in_json = {  "OPENID": c_openid,  "OrderItem": Delarr };
                   var deinfo = JSON.stringify(in_json);
                       Msg.show("处理中", 3);
					   var postdata1 ={ Method: "Order_Insert",Deinfo: deinfo};
						$.ajax({
								url: "wxhandler.ashx",
								type: "post",
								data: postdata1,
								dataType: "text",
								error: function (result) {
									   Msg.hide();
									 var jf_ret=1; 
									 var jf_orderid=121212;
									 /**for (var key in result) {

										  if (key == "ret") {
											  var jf_ret = result[key];
										  }
										  if (key == "Out_Orderid") {
											  var jf_orderid = result[key];
										  }
										  if (key == "errmsg") {
											  var jf_errmsg = result[key];
										  }
									  }*/
									  if (jf_ret == 1) {   /*** 订单确认****/
										  var url = "WX_Order.html?hash=" + c_hash + "&orderid=" + jf_orderid;
										  location.href = GetLocation(url, c_hash);
									  }
									  else if (jf_ret == -1002) {
										  Msg.show("您未关注我们的品牌，请您先到个人中心进行品牌点亮", 1);
										  var url = "WX_UserCenter.html?hash=" + c_hash;
										  location.href = GetLocation(url, c_hash);
									  }
									  else {
										  Msg.show(jf_errmsg + "请再次尝试!", 1);
										  setTimeout(function(){location.reload();},1300);
									  }		
								}
						});
               })
			}
	});

})