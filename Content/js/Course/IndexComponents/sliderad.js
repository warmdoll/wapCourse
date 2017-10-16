export default function sliderspace() {
    //去掉轮播中的&nbsp;
    $(document).on("initspace", ".carousel", function() {
        var t = $(this),
            html = t.html();
        var reg = new RegExp("&nbsp;", "ig");
        var newhtml = html.replace(reg, "");
        t.html(newhtml);
    });

    $(".carousel").trigger("initspace");
}
