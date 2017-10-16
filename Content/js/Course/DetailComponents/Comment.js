import {hint} from '../BaseComponents/Hint';
import {evaluate} from "./Evaluate"
//评价相关
var ua = navigator.userAgent;
export function comment() {
    // 点击滑出评价
    $(".fixedwrite").on('click', function() {
        $(".ke_comment_wrap").css({"transform": "translateX(-100%)"});
        if(window.player.sdk){window.player.sdk.pauseVideo();}
        if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
            let playerwrap = $("video:first").closest("#player").find("div:first");
            playerwrap.hide();
        }
    });
    // 点击关闭评价
    $("#closecomment").on('click', () => {
        $(".ke_comment_wrap").css({"transform": "translateX(0%)"});

        if(window.player.sdk){window.player.sdk.resumeVideo();}
        if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
            let playerwrap = $("video:first").closest("#player").find("div:first");
            playerwrap.show();
        }
    });

    var arrRemak = [
        "评价",
        "很差",
        "较差",
        "还行",
        "推荐",
        "力荐"
    ];
    //点击详情
    $(".Ievaluate-button").on('click', function() {
        $(this).closest(".Ievaluatebox-fraction").next(".Ievaluatebox-more").toggle();
    });

    $(".ke_comment_wrap .star-box").each(function(index, element) {
        element.onclick = function(e) {
            var i = e || event;
            var widtha = i.clientX;
            var widthb = $(element).offset().left;
            var num = Math.ceil((widtha - widthb) / 10);
            $(this).find(".star").css({width: num*10});
            var fen = Math.round(num * 5 / 6);
            $(this).parent().siblings(".fraction").find("span").text(fen + "分");
            $(this).parent().siblings(".right").find(".remarkLevel").text(arrRemak[fen]);
            var dataId = $(this).attr("tagertid");
            if (dataId && fen) {
                $("#" + dataId).val(fen);
            } else {
                $("#" + dataId).val("");
            }
        }
    });

    function ShowMessage(s) {
        hint(s, "250px", "30px", 500);
    }

    $("#fmaddcomment").on("submit", checkform);

    function checkform() {
        if (!$("#ScoreItemId1").val() || !$("#ScoreItemId2").val() || !$("#ScoreItemId3").val()) {
            ShowMessage("请评分后，再提交");
            return false;
        }
        if (!$("#CommentContent").val()) {
            ShowMessage("请填写评论内容，再提交!");
            return false;
        }
        if ($("#CommentContent").val().length > 100) {
            ShowMessage("评论内容过长，请减少后再提交!!");
            return false;
        }

        var Comment = {
            ProductsId: $("#h_taocan").val(),
            CommentContent: $("#CommentContent").val(),
            CommentItemDetails: [
                {
                    ScoreItemID: 4,
                    Score: $("#ScoreItemId1").val()
                }, {
                    ScoreItemID: 5,
                    Score: $("#ScoreItemId2").val()
                }, {
                    ScoreItemID: 6,
                    Score: $("#ScoreItemId3").val()
                }
            ]
        };
        $.post("/Course/Comment", {
            Data: JSON.stringify(Comment)
        }, function(msg) {
            var result = JSON.parse(msg);
            if (result.ResultCode == 0) {
                ShowMessage("评论成功，谢谢参与!!");
                $("#fmaddcomment")[0].reset();
                $("#closecomment").trigger("click");
            } else {
                ShowMessage(result.Message);
            }
        });

        return false;
    }
}
