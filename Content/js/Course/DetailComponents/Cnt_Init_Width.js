//初始化需要滑动的宽度
let init_width_cnt = function() {
    var sreenwidth = $(window).width();
    $("#Cnt>div").css({"width": sreenwidth});
}
export {init_width_cnt}
