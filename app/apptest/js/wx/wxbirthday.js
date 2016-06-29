    var re_hash = request("hash");
    var re_openid = in_openid;

$(document).ready(function () {
	//$(".modal-content").css("min-height", winHeight);

	//$(".modal-dialog").css("width", "auto");
	$(".modal-content").css("min-height", winHeight);
	$("#btn1").click(function(){
		$(".nav-tabs a").eq(1).click();
		$(".modal-content").css("min-height", winHeight);

	})
	$("#btn2").click(function(){
		$(".nav-tabs a").eq(2).click();
		$(".modal-content").css("min-height", winHeight);

	})
	$("#btn3").click(function(){
		$(".nav-tabs a").eq(3).click();
		$(".modal-content").css("min-height", winHeight);

	})
	$("#btn4").click(function(){
		$(".nav-tabs a").eq(0).click();
		$(".modal-content").css("min-height", winHeight);

	})


});

function getCompetency(){
	var postdate={jfhandler: "Get_Competency", hash:re_hash, openid: re_openid};
	$.ajax({
		type:"post",
		data:postdate,
		url:"WXHandler.ashx",
		datatype:"text",
		error:function(result){
			var listarr={"ret":1,"errmsg":"积分兑换成功",integral:25000};
			
		}
	});
}
function sendGift(){
	var postdate={jfhandler: "Get_Competency", hash:re_hash, openid: re_openid,};  //差地址和电话及？
	
}
