
//var CardUrl = "../../App/Card/CardHandler.ashx";
var CardUrl = "../App/Card/CardHandler.ashx";

// type = success , warning
CardDialog = {
    tips: function (type, content) {
        if ("success" == type) {
            $("#suc_msg").html(content);
            $("#success").show();
            setTimeout(function () {
                $("#success").hide()
            }, 2000);
        }
        else {
            $("#war_msg").html(content);
            $("#warning").show();
            setTimeout(function () {
                $("#warning").hide()
            }, 2000);
        }
    },
    confirm: function (content, okFn) {
        $("#confirm_content").html(content);
        $("#confirm_dialog").show();
        $("#confirm_dialog_cancel").click(function () {
            $("#confirm_dialog").hide();
        });
        $("#confirm_dialog_submit").click(function () {
            if (okFn && okFn()) {
                $("#confirm_dialog").hide();
            }
        });
    }
};

function telInputValid() {
    if (!$("#teltxt").val())
        $("#cleartel").hide();
    else
        $("#cleartel").show();

    if (checkMobile($("#teltxt").val())) {
        telok = true;
        if (!timerStarted) {
            $('#recaptchaBtn').removeClass('mod-vip-card-info-v2__code_disabled');
        }
    } else {
        telok = false;
        $('#recaptchaBtn').addClass('mod-vip-card-info-v2__code_disabled');
    }
    refleshSubmitBtn();
}

function idInputValid() {
    if (!$("#idtxt").val())
        $("#clearid").hide();
    else
        $("#clearid").show();
    if (isIdCardNo($("#idtxt").val())) {
        idok = true;
    } else {
        idok = false;
    }
    refleshSubmitBtn();
}



function codeInputValid() {
    if (!$("#codetxt").val())
        $("#clearcode").hide();
    else
        $("#clearcode").show();

    if (!$("#codetxt").val() || isNaN($("#codetxt").val())) {
        codeok = false;
    } else {
        codeok = true;
    }
    refleshSubmitBtn();
}
function nameInputValid() {
    if (!$("#nametxt").val()) {
        nameok = false;
        $("#clearname").hide();
    } else {
        nameok = true;
        $("#clearname").show();
    }
    refleshSubmitBtn();
}

function checkAndTips(id) {
    if (id == 'nametxt' && !nameok) {
        CardDialog.tips("warn", "您输入的姓名不能为空");
        return;
    }
    if (id == 'idtxt' && !idok) {
        CardDialog.tips("warn", "您输入的身份证号有误");
        return;
    }
    if (id == 'teltxt' && !telok) {
        CardDialog.tips("warn", "您输入的手机号码有误");
        return;
    }
    if (id == 'codetxt' && !codeok) {
        CardDialog.tips("warn", "您输入的验证码有误");
        return;
    }
}

var clearXs = document.getElementsByClassName("ui-icon mod-vip-card-info-v2__icon-delete");
for (var i = 0; i < clearXs.length; i++) {
    var clearXsObj = clearXs[i];
    if (clearXsObj) {
        clearXsObj.onclick = function () {
            document.getElementById(this.title).value = "";
            if (this.title == "teltxt")
                telInputValid();
            if (this.title == "nametxt")
                nameInputValid();
            if (this.title == "emailtxt")
                emailInputValid();
            if (this.title == "idtxt")
                idInputValid();
            if (this.title == "codetxt")
                codeInputValid();
        }
    }
}

function isLeapYear(year) {
    return year % 100 == 0 ? year % 400 == 0 : year % 4 == 0;
}

function checkMobile(sMobile) {
    if (!sMobile || isNaN(sMobile) || sMobile.length != 11) {
        return false;
    }
    if (!isMobile(sMobile)) {
        return false;
    }
    return true;
};


function isIdCardNo(num) {
    var len = num.length, re;
    if (len == 15)
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
    else if (len == 18)
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d|X|x)$/);
    else {
        return false;
    }

    var a = num.match(re);
    if (a != null) {
        if (len == 15) {
            var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];

        } else {
            var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        if (B)
            return true;
    }
    return false;
}

function isEmail(email) {
    var re = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return re.test(email);
}


function isMobile(v) {
    /*
    * 中国移动号段 1340-1348 135 136 137 138 139 150 151 152 157 158 159 187 188 147
    * 182 中国联通号段 130 131 132 155 156 185 186 145 中国电信号段 133 1349 153 180 181
    * 189
    */
    var cm = "134,135,136,137,138,139,150,151,152,157,158,159,187,188,147,182,183", cu = "130,131,132,155,156,185,186,145", ct = "133,153,180,181,189", v = v
			|| "", h1 = v.substring(0, 3), h2 = v.substring(0, 4), v = (/^1\d{10}$/)
			.test(v) ? (cu.indexOf(h1) >= 0 ? "联通"
			: (ct.indexOf(h1) >= 0 ? "电信" : (h2 == "1349" ? "电信" : (cm
					.indexOf(h1) >= 0 ? "移动" : "未知")))) : false;
    // 首先找是否联通，然后查找是否电信，然后在移动中查找‘1349’为电信，最后在移动中查找
    return v;
}

$('.mod-bind-from__radio-outter').click(function () {
    $('.mod-bind-from__radio-outter').removeClass('mod-bind-from__radio-outter_checked');
    $(this).addClass('mod-bind-from__radio-outter_checked');
});
