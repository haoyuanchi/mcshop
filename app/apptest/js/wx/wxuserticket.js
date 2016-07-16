
$(document).ready(function () {

	$(".modal-content").css("min-height", winHeight);
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
	var postdate={user_id:9137,brand_id:18};
	http://114.55.38.119/mcshop/Public/demo/?service=Coupon.GetCouponList&user_id=2261&brand_id=18
	var url="http://114.55.38.119/mcshop/Public/demo/?service=Coupon.GetCouponList"
	$.ajax({
		type:"post",
		data:postdate,
		url:url,
		datatype:"text",
		success:function(result){
			/*$("#sl").text(listarr.ticketInfo.sl);
			$("#je").text(listarr.ticketInfo.je);*/
			//$("#ticket1_image").barcode("VXM16#200#011420_99", "code128", { barWidth: 1, barHeight: 50, bgColor: 'none' });

			var data = result.data;
			$.each(data.coupon_list,function(index,item){
				var status;
				if(item.is_used==0){
					status="未使用";
				}
				else if(item.is_used!=0){
					status="已使用"	
				}
				else if(item.is_expired!=0){
					status="已过期"	
				}
				var id1 ="ticket"+item.id;
				var id2 =id1+"_image";
				var html="<div id='"+id1+"'class='ticket_list'>"+
						"<span style='float:left'>使用状态:"+status+"</span>"+
						"<span style='float:right'>有效期:"+item.end_date+"</span>"+
						"<hr style='border:none;border-top:1px solid #626262;height:1px;margin-bottom: 5px;margin-top:25px;'></hr>"+
						"<div id='"+id2+"'class='ticket_image'></div>"+
						"<div style='text-align:center;padding-top:10px;'>条码数据:"+item.code+"</div></div>";
		
				$("#ticket_list").append(html);
				$("#"+id2).barcode(item.code, "code128", { barWidth: 1, barHeight: 50 });
			});
			
		}
		
	});
	
	
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