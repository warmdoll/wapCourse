//滑动触发监听--目录是否显示
export function touchfixed() {
    var Top = 0;

    $(window).on('scroll', function() {
        Top = $(window).scrollTop();
        let downappheight = $(".downapp").outerHeight();
        if ($("#tab_cur_1").hasClass("cur") == false) {
            if (Top > 50) {
                $(".ke_downapp").hide();
            } else {
                $(".ke_downapp").show();
            }
        }
    });
}
