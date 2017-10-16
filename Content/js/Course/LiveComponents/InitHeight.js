export function initHeight() {

    //设置播放器的高;
    var windowWidth = $(window).width();
    let playerh = windowWidth * 9 / 16;
    $(".ke_detail_header").css({
        'height': playerh + 'px'
    });
    $("#player").height(function() {
        return playerh;
    });

    var fixedall = $(".ke_downapp").outerHeight() + $(".tabsCnt").outerHeight() + playerh;
    $("#Cnt").css({
        'margin-top': fixedall + 'px'
    });

    setTimeout(function() {
      //  $("#Cnt").height($(window).height() - $("#Cnt").offset().top);
        $("#chatwrap").height($(document).height() - $("#chatwrap").offset().top);
        $("#video_sms_list").height($("#chatwrap").height() - $(".chatbox").height() - 16);
    }, 500);

}
