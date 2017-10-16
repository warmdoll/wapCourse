//在6以下的手机里不显示原价
let clearPrice = function() {
    var sreenwidth = $(window).width();
    if (sreenwidth < 370) {
        $("span.price").remove();
    }
}
export {clearPrice}
