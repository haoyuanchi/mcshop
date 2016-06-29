    var re_hash = request("hash");
    var re_openid = in_openid;
$(document).ready(function () {

	$(".modal-content").css("min-height", winHeight);
		$(".nav-tabs a").eq(1).click();
				$(".modal-content").css("min-height", winHeight);
	getVipLevel();

});
function getVipLevel(){
	var postdate={jfhandler: "getVipLevel", hash:re_hash, openid: re_openid};
	$.ajax({
		type:"post",
		data:postdate,
		url:"WXHandler.ashx",
		datatype:"text",
		error:function(result){
			var listarr={
				"hash": "MO&Co",
				"otherHash": {
					"hash": "Edition10",
					"level": 8.8
				},
				"userInfo": {
					"name": "徐灵",
					"tel": "18664537767",
					"birthday": "2016-08-13",
					"district": "中国区域"
				},
				"cartInfo": {
					"number": "MA1280361-01S",
					"store": "爱皂公司营销CRM部",
					"level": 8.8,
					"integral": 50000,
					"cIntegral": 1000,
					"consume": 50
				}
			}
			/*if(listarr.cartInfo.level==8.8){
				$(".nav-tabs a").eq(1).click();
				$(".modal-content").css("min-height", winHeight);
			}
			else if(istarr.cartInfo.level==5.0){
				$(".nav-tabs a").eq(1).click();
				$(".modal-content").css("min-height", winHeight);
			}
			else{
				
			}*/
		
		}
	});
}



