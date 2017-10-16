//左侧树形菜单
export function treejs() {
    $('.leftico[data-event="tree"]').on('click', function(e, isopenchild = false) {
        let t = $(this),
            isopen = t.attr("data-isopen");
        //如果是打开状态
        if (isopen == "true") {
            t.attr("data-isopen", "false");
            t.find(">i").removeClass("open").addClass("closed");
            t.parent().find(">ul").hide();
        } else {
            t.attr("data-isopen", "true");
            t.find(">i").removeClass("closed").addClass("open");
            t.parent().find(">ul").stop(true, true).show();//.slideDown(100);
            
            if($("em[data-state='cur']").length>0){t.parents("ul").siblings(".leftico[data-isopen='false']").trigger("click");}


            if (isopenchild) {
                t.parent().find("ul>li>.leftico").trigger("click");
            }
        }
    });

    $(".rightcnt").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).prev().trigger('click');
    });
}
