    var re_hash = request("hash");
    var re_openid = in_openid;
	var htmlprovince;
	var htmlcity;
$(document).ready(function () {

	$(".modal-content").css("min-height", winHeight);
	 getProvince();
	$("#province").change(function () {
		getCity();
	});
	$("#city").change(function () {
		getStore()
	});
	getTicket();
	$("#suit_store").click(function () {
		$(".nav-tabs a").eq(1).click();
		$(".modal-content").css("min-height", winHeight);
	})
	$("#use_rules").click(function () {
		$(".nav-tabs a").eq(2).click();
		$(".modal-content").css("min-height", winHeight);
	})
	$("#butclose1").click(function () {
		$(".nav-tabs a").eq(0).click();
		$(".modal-content").css("min-height", winHeight);
	})
	$("#butclose2").click(function () {
		$(".nav-tabs a").eq(0).click();
		$(".modal-content").css("min-height", winHeight);
	})
});

function getTicket(){
	var postdate={jfhandler: "Get_Province", hash:re_hash, openid: re_openid};
	$.ajax({
		type:"post",
		data:postdate,
		url:"WXHandler.ashx",
		datatype:"text",
		error:function(result){
			var listarr={
				"ticketInfo": {
					"sl": 3,
					"je": 300
				},
				"tickeList": [
					{
						"no":1,
						"code": "VXM16#200#011420_97",
						"status": "未消费",
						"endTime": "2016-08-13"
					},
					{
						"no":2,
						"code": "VXM16#200#011420_98",
						"status": "未消费",
						"endTime": "2016-08-14"
					},
					{
						"no":3,
						"code": "VXM16#200#011420_99",
						"status": "未消费",
						"endTime": "2016-08-15"
					}
				]
			};
			$("#sl").text(listarr.ticketInfo.sl);
			$("#je").text(listarr.ticketInfo.je);
			$("#ticket1_image").barcode("VXM16#200#011420_99", "code128", { barWidth: 1, barHeight: 50, bgColor: 'none' });
			$.each(listarr.tickeList,function(index,item){
				var id1 ="ticket"+item.no;
				var id2 =id1+"_image";
				var html="<div id='"+id1+"'class='ticket_list'>"+
						"<span style='float:left'>使用状态:"+item.status+"</span>"+
						"<span style='float:right'>有效期:"+item.endTime+"</span>"+
						"<hr style='border:none;border-top:1px solid #626262;height:1px;margin-bottom: 5px;margin-top:25px;'></hr>"+
						"<div id='"+id2+"'class='ticket_image'></div>"+
						"<div style='text-align:center;padding-top:10px;'>条码数据:"+item.code+"</div></div>";
		
				$("#ticket_list").append(html);
				$("#"+id2).barcode(item.code, "code128", { barWidth: 1, barHeight: 50 });
			});
			
		}
		
	});
	
	
}

// 省份
function getProvince() {
    var postdate = { jfhandler: "Get_Province", hash:re_hash, openid: re_openid};
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
        }
    })
}

//select 城市
function getCity() {
    var postdate = { jfhandler: "Get_City", province: $("#province option:selected").val(), hash: re_hash, openid: re_openid };
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
        }
    })
}
//select 店铺 
function getStore() {
    var postdate = { jfhandler: "Get_Store", city: $("#city option:selected").val(), hash: re_hash, openid: re_openid};
    $.ajax({
        type: "post",
        url: "WXHandler.ashx",
        data: postdate,
        datatype: "text",
        error: function (result) {
           /** var listarr = eval("(" + result + ")"); **/
			
			var listarr = {"info_store":[{"ID":412412.0,"NAME":"安阳JNBY万达店1584184848"},{"ID":404974.0,"NAME":"JNBY安阳丹尼斯店"},{"ID":404975.0,"NAME":"JNBY安阳嘉信茂专柜"},{"ID":404975.0,"NAME":"JNBY安阳嘉信茂专柜11111111"}]};
            var html = "";
			var count=0;
          
            $.each(listarr.info_store, function (index, item) {
				if(count==0){
					html+="<li style='float:left;text-align:left;width:50%;clear:both'>"+ item.NAME + "</li>";
					count=1;
				}
				else{
					html+="<li style='float:left;text-align:left;width:50%'>" +item.NAME + "</li>";
					count=0;
				}
            })
            $("#store").html(html);
		
        }
    })
}