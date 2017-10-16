import {ajax_data} from "./AjaxData"
export function effect() {
    // 禁止头部的滑动

    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);
    $("#search_box").on("touchmove", function(e) {
        e.stopPropagation();
    });

    $(".listcnt").height($(window).height() - $(".listcnt").offset().top);

    //tab搜索选择
    $(".choice-box").on('click', '.choice', function() {
        var t = $(this);

        if (!t.hasClass("slide-btn")) {
            t.siblings(".cur").removeClass("cur").end().addClass("cur");
        }
        if (t.hasClass("choiceprice")) {
            if (t.find(".pcur").hasClass("choicetypebox-up")) {
                t.find(".choicetypebox-down").attr("src", "/content/keimg/down-2.png");
                t.find(".choicetypebox-down").addClass("pcur");
                t.find(".choicetypebox-up").attr("src", "/content/keimg/up-1.png");
                t.find(".choicetypebox-up").removeClass("pcur");
            } else {
                t.find(".choicetypebox-up").attr("src", "/content/keimg/up-2.png");
                t.find(".choicetypebox-up").addClass("pcur");
                t.find(".choicetypebox-down").removeClass("pcur");
                t.find(".choicetypebox-down").attr("src", "/content/keimg/down-1.png");
            }
        } else if (t.hasClass("slide-btn")) {
            $(".mark-wrap").show();
            $("#search_box").css({"transform": "translateX(-100%)"});
        } else {
            $(".choiceprice").find(".pcur").removeClass("pcur");
            $(".choiceprice").find(".choicetypebox-up").attr("src", "/content/keimg/up-1.png");
            $(".choiceprice").find(".choicetypebox-down").attr("src", "/content/keimg/down-1.png");
        }
        if (!t.hasClass("slide-btn")) {
            ajax_data(true);
        }
    });
    //关闭筛选
    $("#search_box").on('click', '>.top>i', function() {
        $("#search_box").css({"transform": "translateX(0%)"});
        setTimeout(function() {
            $(".mark-wrap").hide();
        }, 600);
    });
    // 筛选特效
    $("#search_box").on('click', ' .rowli span, .subjects>li', function() {
        let t = $(this);
        if (!t.hasClass("cur")) {
            let rowli;

            if (t.is("span")) {
                rowli = t.parent().parent();
            } else if (t.is("li")) {
                rowli = t.parent();
            }

            let curi = rowli.find("i:first");
            rowli.find(".cur").removeClass("cur");
            t.addClass("cur");
            curi.appendTo(t);
        }
    });
    // 重置
    $("#search_box").on('click', '.reset', function() {
        $("#search_box .rowli").each(function() {
            $(this).find("span:first").trigger('click');
        });

        $("#search_box .subjects>li:first").trigger('click');
    });
    // 确认
    $("#search_box").on('click', '.ok', function() {
        $("#search_box>.top>i").trigger('click');
        ajax_data(true);
    });
}
