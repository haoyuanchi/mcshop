var init_width=0;
var $Cookies = {};
//initViewport();	
 window.addEventListener("orientationchange", function() {
	initViewport();
}, false);
function initViewport(){
	var ua=navigator.userAgent.toLowerCase();
	if(ua.match(/android/i)){
		if(ua.match(/android 2/i)){
			
		var mvp = document.getElementById('androidViewport');
		var screen_w=window.screen.width;
		var scale=screen_w/640;
		if(screen_w==640 || (window.orientation==0 && init_width==screen_w)){
			window.location.reload();
			return;
		}
		 try{
			 mvp.setAttribute('content','width='+screen_w+',initial-scale='+scale+',maximum-scale='+scale+',minimum-scale='+scale+',user-scalable=yes ,target-densitydpi=device-dpi'); 
			init_width=screen_w; 
		 }catch(e){
				 
		}
		}
	}
	$("body").css("visibility","visible");
	$("body").hide();
	$("body").fadeIn('fast');
	var tips=$Cookies.get("toptips");    
	if(tips!="" && tips!=undefined && tips!=null){ 
		alert(tips);
		$Cookies.clear('toptips')
	}
}
$(document).ready(function(){
		initViewport();
		initComponent();	
})
function initComponent(){
	//input
	$(".custom_input input,.custom_select select").bind("focus",function(){
		$(this).parent().parent().addClass("focus");	
		$(this).parent().find(".place_holder").hide();	
	})
	$(".custom_input input").bind("mousedown",function(){
		$(this).parent().find(".place_holder").hide();	
	})
	$(".custom_input input,.custom_select select").bind("blur",function(){
		$(this).parent().parent().removeClass("focus");
		if($.trim($(this).val())==''){
			$(this).parent().find(".place_holder").show();	
		}
	})
	$(".custom_input input,.custom_checkbox input,.custom_switch input,.custom_radio input").bind("focus",function(){
		$(this).parent().addClass("focus");							   
	})
	$(".custom_input input,.custom_checkbox input,.custom_switch input,.custom_radio input").bind("blur",function(){
		$(this).parent().removeClass("focus");							   
	})
	
	//checkbox
	$(".custom_checkbox input").on("change",function(){
		if($(this).attr("checked")){
			$(this).parent().addClass("checked")
		}else{
			$(this).parent().removeClass("checked")
		}
	})
	$(".custom_checkbox input").each(function(i){
		if($(this).attr("disabled")==true || $(this).attr("disabled")=='disabled'){
			$(this).parent(".custom_checkbox").css("opacity",0.5);
		}
	})
	//switch
	$(".custom_switch input").on("change",function(){
		if($(this).attr("checked")){
			$(this).parent().addClass("checked")
		}else{
			$(this).parent().removeClass("checked")
		}
	})
	//fixed a bug of event losting in IE7-----
	$(".custom_checkbox input").bind("change",function(){
		if($(this).attr("checked")){
			$(this).parent().addClass("checked")
		}else{
			$(this).parent().removeClass("checked")
		}
	})
	//radio
	$(".custom_radio input").on("change",function(){
		var selectedValue=($(this).val());
		tickCustomRadio($(this).attr('name'),selectedValue)
	})
	$(".custom_radio input").bind("focus",function(){
		var selectedValue=($(this).val());
		tickCustomRadio($(this).attr('name'),selectedValue)
	})
	$(".custom_radio").next("label").bind("click",function(){
		var $radio=$(this).prev(".custom_radio:first").find("input");
		var selectedValue=$radio.val();
		$radio.attr("checked",true)
		tickCustomRadio($radio.attr('name'),selectedValue)
	})
	//select
	$(".custom_select select:visible").each(function(i){
		initCustomSelect($(this))
	})
	//dropDownList
	$(".ui_dropDownList").each(function(i){
		if($(this).attr("openEvent")==undefined)
		$(this).attr("openEvent","dropDownListFocus");	
		if($(this).attr("closeEvent")==undefined)
		$(this).attr("closeEvent","dropDownListBlur");	
	})
	$(window).resize(function(){
		resizeComponent();					  
	})
	resizeComponent();
}
function resizeComponent(){
	//input
	$(".custom_input").each(function(i){
		var style_w=$(this).width();
		var paddingLeft=parseInt($(this).css("paddingLeft").replace("px",""))
		$(this).find("input").not(".fixed").width(style_w-40);
	})	
	$(".custom_select").each(function(i){
		var style_w=$(this).width();
		$(this).find("select").not(".fixed").width(style_w);
	})
}
function initCustomSelect(obj){
		var label=(obj.find("option:selected").text());
		var txt=obj.parent().find(".text");
		if(txt.text()=='')
		txt.text(label);
		var style_w=parseInt(obj.parent().width());
		obj.width(style_w);
		var label="请选择"
		obj.bind("change",function(){
		if($(this).attr("multiple")=='multiple'){
			var temp=new Array();
			$(this).find("option:selected").each(function(i){
				if($(this).attr("value")!="")
				temp.push($(this).text());
			})
			if(temp.length>0){
				label=temp.join(",");
			}
		}else{
			label=($(this).find("option:selected").text());
		}
		$(this).parent().find(".text").text(label);
	})
}
function tickCustomRadio(radioName,selectedValue){
	$(".custom_radio input[name='"+radioName+"']").each(function(i){
			if($(this).val()==selectedValue){
				$(this).parent().addClass("checked")
			}else{
				$(this).parent().removeClass("checked")
			}
		})
}
function loading(display){
	if(display==undefined){
		var mask=$("<div class='loading_mask'></div>");
		$('body').append(mask);
	}else{
		$('.loading_mask').remove();
	}
}
function isWechat(){
	try{
	WeixinJSBridge.invoke('getNetworkType',{},
			function(e){
				WeixinJSBridge.log(e.err_msg);
			});
	}catch(err){
			//window.location.href="/invalid.html";
	}
}
/**
 * set Cookies
 */
$Cookies.set = function(name, value,expires_hours,expires_time){
     var temp_expires = (expires_hours != undefined) ? expires_hours : null;
     var path =  '/';     
     var domain =  document.domain;    
	 if(domain=='localhost'){
	 	domain = null;
	 }
     var secure =  false;
	 var date = new Date();
	 if(temp_expires!=null){
		 date.setTime(date.getTime() + temp_expires*3600*1000); 
	 } 
	if(expires_time != undefined){
		date.setTime(expires_time); 
	}
     document.cookie = name + "=" + escape (value) +
       ((temp_expires == null) ? "" : ("; expires=" + date.toGMTString())) +
       ((path == null) ? "" : ("; path=" + path)) +
       ((domain == null) ? "" : ("; domain=" + domain)) +
       ((secure == true) ? "; secure" : "");
};
/**
 * read Cookies
 */
$Cookies.get = function(name){
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while(i < clen){
        j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return $Cookies.getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if(i == 0)
            break;
    }
    return null;
};
/**
 * clear Cookies
 */
$Cookies.clear = function(name) {
  if($Cookies.get(name)){
    var expdate = new Date(); 
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1)); 
    $Cookies.set(name, "", expdate); 
  }
};

$Cookies.getCookieVal = function(offset){
   var endstr = document.cookie.indexOf(";", offset);
   if(endstr == -1){
       endstr = document.cookie.length;
   }
   return unescape(document.cookie.substring(offset, endstr));
};
function showLoading(show){
	if(show){
		if($("#loading_mask").length>0){
			return false;
		}
		var mask=$("<div id='loading_mask'></div>");
		mask.height($("body").height());
		mask.width($("body").width());
		$("body").append(mask);
	}else{
		$("#loading_mask").remove();
	}
}
function removeMsg(){
        if($(".ui-page-active").length>0){
	$(".ui-page-active #alert").popup("close")
    }else{
        $("#alert").popup("close")
    }
}
function alertMsg(content,label,callback){
	if($("#alert").length==0){
		alert(content);
		return;
	}
        var alert_win=$("#alert");
        if($(".ui-page-active").length>0){
            alert_win=$(".ui-page-active #alert");
        }
        alert_win.find("#alert_content").html(content);
        
        if(label!=undefined){
            alert_win.find(".ui-btn-text").text(label)
        }else{
            alert_win.find(".ui-btn-text").text("确定")
        }
	if(callback!=undefined){
            alert_win.find(".ui-btn").attr("href","javascript:"+callback+"()");
        }else{
            alert_win.find(".ui-btn").attr("href","javascript:removeMsg()");
        }
        alert_win.popup("open",{transition: "pop"});
}
 function closeWindow(){
	try{
		WeixinJSBridge.invoke('closeWindow',{},function(res){


     });
	}catch(e){
		window.close();
	}
     
 }