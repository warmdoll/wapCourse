export function chat_operate() {

    window.Wheight = $(window).height();

    $(".welcome").delay(200).slideDown(200);

    window.onkeydown = function(event) {
        var e = e
            ? e
            : window.event;
        var currKey = e.keyCode || e.which || e.charCode;
        if (currKey == 13) {
            if ($("#send_msg_text_input").val().trim().length > 0) {
                //window.onSendMsg(0);
                $("#p_send").trigger("click");
            }
        }
    }

    window.onclick = function() {
        $(".video-discuss-emotion").hide();
    }

    $(window).on("resize", function() {
        var ua = navigator.userAgent;
        if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
            if ($("#send_msg_text_input").is(":focus") && $(window).height() == window.Wheight) { //
                $("#send_msg_text_input").trigger("blur");
            }
        }
    });

    //点开表情
    $("#iface").on('click', function(e) {
        e.stopPropagation();
        $("#video-discuss-emotion").show();
    });
    document.getElementById("p_send").addEventListener("click", function(e) {
        e.stopPropagation();
        $("#send_msg_text_input").trigger("blur");
        window.onSendMsg(0);
    }, false)

    // 直接发花
    $("#p_flower").on('click', function() {
        window.onSendMsg(0, "[鲜花]");
    })

    // 聊天信息焦点
    $("#send_msg_text_input").on("focus", function(e) {
        //$(window).scrollTop($(window).height());

        //去什么商店,默认是应用宝0,苹果商店是1

        $(".chatbox").css({"position": "absolute"});
        $("#Cnt").css({"overflow-y": "visible"});
        $(".chatbox").css("bottom", "0px");
        var ua = navigator.userAgent;
        if (ua.indexOf('iPhone') > -1) {
            $(".chatbox").css({"bottom": "1px", "height": "100px"});
            $("#chatdetail").show();
            if (ua.indexOf("Safari") > -1) {
                setTimeout(function() {
                    $(".chatbox").css({"position": "absolute"});
                    $(".chatbox").css("bottom", "-40px");
                }, 100);

            }

        } else {
            $(".chatbox").css({"position": "fixed", "bottom": "0"});
        }

        //未登陆
        // if(!window.islogin){
        //   window.player.sdk.shutDown();
        //   $("#login_box").show();
        //   $(".closeicon").show();
        //   e.stopPropagation();
        //   return;
        // }

        $("#p_flower").hide();
        $("#p_send").show();
        $("#p_edit").removeClass("p2").addClass("p2click");
    }).on("blur", function() {
        setTimeout(function() {

            //$(".chatbox").css({"position":"fixed"});
            $("#Cnt").css({"overflow-y": "auto"});
            $(".chatbox").css({"position": "static", "height": "50px"});
            $("#chatdetail").hide();
            var ua = navigator.userAgent;
            if (ua.indexOf('iPhone') > -1) {
                if (ua.indexOf("Safari") > -1) {
                    $(".chatbox").css("bottom", "0");
                }
            } else {
                $(".chatbox").css({"position": "static", "bottom": "0"});

            }
            //

            $("#p_send").hide();
            $("#p_flower").show();
            $("#p_edit").removeClass("p2click").addClass("p2");

        }, 300);

    });
    $(".closeicon").on('click', function() {
        $("#login_box").hide();
        $(".closeicon").hide();
    });

    //单击图片事件
    function
    _imageClick(imgObj) {
        var imgUrls = imgObj.src;
        var imgUrlArr = imgUrls.split("#"); //字符分割
        var smallImgUrl = imgUrlArr[0]; //小图
        var bigImgUrl = imgUrlArr[1]; //大图
        var oriImgUrl = imgUrlArr[2]; //原图
        var bigPicDiv = document.getElementById('bigPicDiv');
        bigPicDiv.innerHTML = '';
        var span = document.createElement('span');
        span.innerHTML = "<img class=\"img-thumbnail\" src=\"" + bigImgUrl + "\" />";
        bigPicDiv.insertBefore(span, null);
        $('#click_pic_dialog').modal('show');
    }

    window.imageClick = _imageClick;
}
