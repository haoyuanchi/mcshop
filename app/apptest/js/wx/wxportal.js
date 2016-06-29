var re_hash =in_hash;
var re_openid = in_openid;


$(document).ready(function () {
    var postdata = { jfhandler: "wxindexinfo", hash: re_hash, openid: re_openid };
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdata,
        dataType: "text",
        error: function (result1) {
			 var listarr={
				"info_banner": [
					{
						"NAME": "编辑精选",
						"MENUNAME": "入夏新品尝鲜",
						"ORDERINDEX": 1,
						"CONTENT": "./oImage/c-1.jpg",
						"SUBCONTENT": "./wx_goodlist.html?hash=croquis&typeid=3&typeval=7050"
					}
				],
				"info_theme": [
					{
						"NAME": "主题分类",
						"MENUNAME": "春季必备单品",
						"ORDERINDEX": 1,
						"CONTENT": "./oImage/2.%E6%98%A5%E5%AD%A3%E5%BF%85%E5%A4%87%E5%8D%95%E5%93%81.jpg",
						"SUBCONTENT": "./wx_goodlist.html?hash=jnby&typeid=3&typeval=9073"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "连衣裙专区",
						"ORDERINDEX": 2,
						"CONTENT": "./oImage/j-10.jpg",
						"SUBCONTENT": "./wx_goodlist.html?hash=jnby&typeid=3&typeval=9075"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "T恤专区",
						"ORDERINDEX": 3,
						"CONTENT": "./oImage/j-9.jpg",
						"SUBCONTENT": "./wx_goodlist.html?hash=jnby&typeid=3&typeval=9074"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "衬衣&背心专区",
						"ORDERINDEX": 4,
						"CONTENT": "./oImage/j-11.jpg",
						"SUBCONTENT": "./wx_goodlist.html?hash=jnby&typeid=3&typeval=9076"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "裤子专区",
						"ORDERINDEX": 5,
						"CONTENT": "./oImage/j-16%E8%A3%A4%E5%AD%90%E4%B8%93%E5%8C%BA.jpg",
						"SUBCONTENT": "./wx_goodlist.html?hash=jnby&typeid=3&typeval=9077"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "腰裙专区",
						"ORDERINDEX": 6,
						"CONTENT": "./oImage/j-17%E8%85%B0%E8%A3%99%E4%B8%93%E5%8C%BA.jpg",
						"SUBCONTENT": "./wx_goodlist.html?hash=jnby&typeid=3&typeval=9078"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "上装精选（外套&毛衫）",
						"ORDERINDEX": 7,
						"CONTENT": "./oImage/j-13.jpg",
						"SUBCONTENT": "./wx_goodlist.html?hash=jnby&typeid=3&typeval=9079"
					},
					{
						"NAME": "主题分类",
						"MENUNAME": "饰品专区",
						"ORDERINDEX": 8,
						"CONTENT": "./oImage/f-3.gif",
						"SUBCONTENT": "./wx_goodlist.html?hash=jnby&typeid=3&typeval=9080"
					}
				],
				"info_brand": [

					{
						"NAME": "集团品牌",
						"ORDERINDEX": 1,
						"CONTENT": "./WXDATA/public/brand/6.jpg",
						"SUBCONTENT": "./wx_portal.html?hash=Editon10"
					}
				]
			};  
		   // var listarr = eval("(" + result + ")");
			var b ="n";
            //编辑精选
            $.each(listarr.info_banner, function (index, item) {
				var banner_ct = "<a href='" + item.SUBCONTENT + "'> <img class='mainImg lazy' data-original='" + item.CONTENT+ "' /></a>";
                $("#main").append(banner_ct);
            })
            $("#main").append("<div class='splitLine'><span>产品分类</span></div>");
            //分类推广
            $.each(listarr.info_theme, function (index, item) {
				var banner_ct = "<a href='" + item.SUBCONTENT + "'> <img class='mainImg lazy' data-original='" + item.CONTENT+ "' /></a>";
                $("#main").append(banner_ct);
            })
            $("#main").append("<div class='splitLine'><span>品牌</span></div>");
            //品牌推广
            $.each(listarr.info_brand, function (index, item) {
				var banner_ct = "<a href='" + item.SUBCONTENT + "'> <img class='mainImg lazy' data-original='" + item.CONTENT+ "' /></a>";
                $("#main").append(banner_ct);
            })
            $("#main").append("<div class='splitLine'><span>END</span></div>");
            $("img.lazy").lazyload({ effect: "fadeIn", threshold: 200 });
        },
       success: function (e) {
            Msg.show("加载失败,请重新尝试!", 1);
        }
    })
})

/*function GetTitle() {  
    var brand_title = "首页";
    switch (re_hash) {
        case "jnby": brand_title = "MO&Co";
            break;
        case "croquis": brand_title = "Edition10";
            break;
        default: break;
    }    
    $(document).attr("title", brand_title);
}
GetTitle();*/

//alert(GetLocation(url, re_hash));地址重定向





