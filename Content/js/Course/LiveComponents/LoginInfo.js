export function logininfo() {

    (function($) {
        $.GetQueryString = function(name) {
            var currenthref = window.location.href;
            var regkey = new RegExp(name + "=([^&\r\n]*)", "i");
            if (regkey.test(currenthref) && RegExp.$1) {
                var regvalue = RegExp.$1;
                return unescape(regvalue);
            }
            return "";
        }
    })(jQuery);

    //自己加入聊天室
    function _selfjoin() {
        //  自己发送一条加入直播间信息
        window.onSendMsg(3, loginInfo.identifierNick + "加入聊天室");
    }
    window.selfjoin = _selfjoin;

    $.getJSON("http://users.wangxiao.cn/Passport/GetLoginInfo.ashx?callback=?", function(data) {
        if (data != null) {

            loginInfo.identifier = data.Username; //"[962142]";//
            loginInfo.identifierNick = $("#h_usernickname").val();  //"[962142]";//

            $.ajax({
                async: false,
                url: "http://coreapi.wangxiao.cn/api/TencentIM/GetSignature?username=" + loginInfo.identifier + "&callback=?",
                dataType: "jsonp",
                success: function(result) {
                    loginInfo.userSig = result.Data;
                    window.sdkLogin();
                }
            });

        } else {

            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://coreapi.wangxiao.cn/api/TencentIM/GetGuestSignature",
                async: false,
                success: function(result) {
                    loginInfo.userSig = result.Data.Signature;
                    loginInfo.identifier = result.Data.GuestName; //"[962142]";//
                    loginInfo.identifierNick = $("#h_usernickname").val(); // result.Data.GuestName;//"[962142]";//
                    window.sdkLogin();
                }
            });

            //setTimeLogin();//3分钟后弹出登陆
            //  发言弹登陆
            UserLimit();

        }

    });

}

var sh;
function UserLimit() {
    sh = setInterval(showopreate, 180000);
}

function showopreate() {
    $("#player>div:first").hide();
    $(".mark-wrap").show();
    $("#userlimit").show();
    clearInterval(sh);

    // 去下载
    $("#userlimit .downnow").on("click", function() {
        $("#userlimit").hide();
        $("#player>div:first").show();
        $(".mark-wrap").hide();

        let url = $(".downapp:first").attr("href");
        window.location.href = url;

    });
    //关闭
    $("#userlimit .notdown").on("click", function() {

        UserLimit();
        $(".mark-wrap").hide();
        $("#userlimit").hide();
        $("#player>div:first").show();
    });
}

//如果未登陆，过一会显示登陆
function setTimeLogin() {
    var watchover = $.GetQueryString("activityId");
    if (localStorage[watchover] == "true") {
        showArtDialog();
    } else {
        setTimeout(function() {
            localStorage[watchover] = "true";
            window.player.sdk.shutDown();
            showArtDialog();
        }, 13000);
    }
}

// 显示登陆
function showArtDialog() {
    $("#login_box").show();
}
