//点击显示/隐藏标题和返回
export function ClickToggle() {
    if ($("#h_showVideo").val() != "0") {
        $("#player>div:first>div:first>div:last").add("#player").on('click', function() {
            $("#playertitle").toggle(200);
        });
    }
}

//是否显示视频
export function IsShowVideo() {
    let showVideo = $("#h_showVideo").val();
    if (showVideo != 0) {
        $(document).trigger("videoinit");
    } else {
        $("#player").find(">div").remove();
    }
}

//初始化背景的高以及下面与视频的间距
export function InitHieght() {
    var ww = $(window).width();
    window.playerh = ww * 9 / 16;
    $(".ke_detail_header").css({
        'height': playerh + 'px'
    });
    $("#player").css({
        'height': playerh + 'px'
    });

    var fixedall = $(".ke_downapp").outerHeight() + $(".tabsCnt").outerHeight() + playerh;
    $(".Cnt").css({
        'margin-top': fixedall + 'px'
    });
}
