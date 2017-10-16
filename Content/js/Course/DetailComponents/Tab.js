import {evaluate} from './Evaluate';
import {imgwidth} from '../BaseComponents/ImgBigWidth';
import {clearfont} from './clear5s';
import {cart} from "../BaseComponents/Cart"
//切换选项卡
export function tab() {
    //window.myScroll=null;
    $("#Cnt").parent().height($(window).height());
    setTimeout(function() {
        $("#Cnt>div:first").height($(window).height() - $("#Cnt>div:first").offset().top);
        $("#Cnt>div").height($(window).height() - $("#Cnt>div").offset().top);
    }, 500);

    $('#Cnt>div[data-index!=1]>*').css({"display": "none"});
    $('#Cnt>div[data-index!=1]').css({"height": "10px"});

    $("[data-type='tab']").on("click", function() {

        //var cur_li_index=$(".tabsCnt span.cur").parent().index();
        var t = $(this),
            t_index = $(this).index();
        var translateX = -(t_index * $(document).width());

        let index = parseInt(t.index() + 1);
        let indexCnt = $("#Cnt>div[data-index=" + index + "]");

        // 开启
        $('#Cnt>div>:not("script")').css({"display": "block"});
        $('#Cnt>div').css({"height": "inherit"});

        $("#Cnt").stop(true, true).animate({
            "margin-left": "" + translateX + "px"
        }, 200, function() {
            $('#Cnt>div[data-index!=' + index + ']>*').css({"display": "none"});
            $('#Cnt>div[data-index!=' + index + ']').css({"height": "10px"});
            indexCnt.height($(window).height() - $("#Cnt").offset().top);
        });

        if (index == 5) {
            evaluate();
            clearfont();
        } else {
            window.myScroll = null;
        }
        if (index == 2) {
            imgwidth($(".Cnt2"), true);
        }
        if (indexCnt.hasClass("Cnt4")) {
            $("#detail_buy_goto").show();
            cart({ispay:true}); //购物车
        }
        else {
          $("#detail_buy_goto").hide();
        }

        t.parent().find("span.cur").removeClass("cur");
        t.find("span").addClass("cur");

        $("#Cnt>div[data-index!=' + index + ']").height($(window).height() - $("#Cnt>div:first").offset().top);
    });

    $(".tabsCnt").on('goto', " span.cur", function(e, action) {
        var t = $(".tabsCnt span.cur"),
            li = t.parent();
        //左侧手势
        if (action === "left") {
            // 不是最后一个
            if (li.is(".tabs>li:last") == false) {
                li.next().trigger('click');
            }
        } else {
            // 不是第一个
            if (li.is(".tabs>li:first") == false) {
                li.prev().trigger('click');
            }
        }
    });
}
