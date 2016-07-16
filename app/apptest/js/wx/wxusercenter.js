
$(document).ready(function () {
	Msg.show("加载中...", 3);
	var postdata={user_id:9137};
	var url="http://114.55.38.119/mcshop/Public/demo/?service=User.GetBaseInfo";
	$.ajax({
		type:"post",
		data:postdata,
		dataType:"json",
		url:url,
		success:function(result){
			var data = result.data.info;
			if(data.wx_head_img_url!=null){
				$("#wx_img").attr("src",data.wx_head_img_url);
			}
			$("#member_rank_scale").text("("+10*data.member_rank_scale+"折)");
			$("#integral").text(data.integral)
			Msg.hide();
			
		}
	});
	
	$("#help").click(function () {
		  $("#usercenter_help").removeClass("hidden");      
			$("#maincontent").css("opacity","0.3")		  
	})
	$("#help_btn").click(function () {
		  $("#usercenter_help").addClass("hidden"); 
		$("#maincontent").css("opacity","1.0")			  
	})		
            //品牌点亮信息
	$("#brand_ED").click(function(){
		if($("#ewm").hasClass("hidden")){
			$("#ewm").removeClass("hidden"); 
			//var height =$("#panelList").height()+4;
			var height =$("#btn_div").height()+4;
			$("#ewm").height(height);	
		}
		else{
			$("#ewm").addClass("hidden"); 
		}
		
	})
});




