var re_hash = in_hash;
var re_openid = in_openid; //zgq
//var re_hash = "jnby";
//var re_openid = "oVFOhjouw6o9RjztV3ZHJQ3zrA20"; //my
var numlimit, coulimit;
var allstr_skuid = "";
var allnum = 0;
var flag = "N";
var backfill = "";

Msg.show("加载中...", 3);
$(document).ready(function () {
    var postdata = { user_id:9137};
    $.ajax({
        type: "post",
        url: "http://114.55.38.119/mcshop/Public/demo/?service=Collection.GetList",
        data: postdata,
        dataType: "json",
        success: function (result) {
            //alert(result);
           /** var listarr = eval("(" + result + ")");**/
		    var listarr1 ={
				"info_collect": [
					{
						"ROWNO": 2,
						"HASH": "jnby",
						"NAME": "皮带",
						"GOODSID": 578131,
						"CODE": "7GB10041",
						"SL": 1,
						"PRICE": 260,
						"IMGURL": "oImage/7GB10041001-1.jpg",
						"INSERTDATE": "2016-06-04T12:02:43"

					},
					{
						"ROWNO": 1,
						"HASH": "jnby",
						"NAME": "T恤(短袖)",
						"GOODSID": 577957,
						"CODE": "5G261078",
						"SL": 1,
						"PRICE": 390,
						"IMGURL": "oImage/5G261078-1.jpg",
						"INSERTDATE": "2016-06-05T20:00:17"
					}
				]
			} 
            //收藏夹列表
            var listarr= result.data;
			var html = "";
            if (listarr.good_list.length == 0) {
                //location.href = GetLocation("WX_Portal.aspx?hash=" + re_hash, re_hash);
            }

            $.each(listarr.good_list, function (index, item) {

                if (item.FLAG != "N") {
                    flag = "Y";
                }
                if ((index % 2) == 0) {
                    html += "<tr>";
                }
                    //html += "<td class='item'><div style='border-radius: 5px;background-color: #fff;overflow: hidden;border: 1px solid #ccc;'>" +
                    html += "<td class='itemes'><div style='border-radius: 5px;background-color: #fff;overflow: hidden;border: 1px solid #ccc;'>" +
                        "<div class='goodimg'><img class='bg lazy' data-original='" + item.image + "' onerror='this.src='Demo/Resources/images/Goods/error.gif';'/></div>" +
                        "<table><tr><td style='text-align: left;'><div class='name' style='margin: 0;'>" + item.name + "</div> <div style='margin-top: 5px;'>￥" + item.price + "</div></td></tr></table> " + //20150829 已预约的按钮图片换成fitted.png
                        "<div style='margin: 0 5px;padding: 5px 0;' class = 'Backfill'></div>" + //20150829 已预约的添加此行显示预约信息
                        "</div><span class='item_hash' style='display:none;'>" + item.brand_id + "</span><span class='item_goodsid' style='display:none;'>" + item.good_id + "</span></td>";
                    //alert(html);
                if (((index % 2) == 0) && (index == listarr.good_list.length - 1)) {
                    html += "<td ></td></tr>";

                } else if ((index % 2) == 1) {
                    html += "</tr>";
                }


            })

            $("#skulist tbody").append(html);
            $("img.lazy").lazyload({ effect: "fadeIn" });
            //跳转到商品详情
            $("#skulist .itemes .goodimg").click(function () {
                var goodsid = $(this).parent().parent().find(".item_goodsid").text();
                var hash = $(this).parent().parent().find(".item_hash").text();

                location.href = "../mobile/product/content.html?brandId="+hash+"&productId=" + goodsid;
            })
            //隐藏加载动画效果
            Msg.hide();


        }
    })

});
