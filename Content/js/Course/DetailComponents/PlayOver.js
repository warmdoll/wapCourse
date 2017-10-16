import {hint} from '../BaseComponents/Hint';
//播放结束--下载
export function playover_down() {
    $(".playover .download").on('click', function() {
        let url = $(".downapp:first").attr("href");
        window.location.href = url;
    });
}

//播放结束--下一节
export function playover_next() {
    $(".playover .nexthour").on('click', function() {
        let nexthourid = $("#h_nexthour").val();
        let curplayli = $(".keplay_yes").closest("li.class_hour");
        if (nexthourid != "") {
            let nextnode = curplayli.siblings("[data-coursehourid=" + nexthourid + "]");
            if (nextnode.length > 0) {
                nextnode.trigger('click');
            }
        } else {
            hint("已是最后一节", "150px", "30px", 500);
        }
    });
}
