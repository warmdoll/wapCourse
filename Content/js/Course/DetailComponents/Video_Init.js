import {getIsPlayCourseHourId} from "./CourseHour";
import {hint} from '../BaseComponents/Hint';

window.player = new CloudVodPlayer();

let isfirstplay = true,
    playTime = 0,
    clickNumber=0;
let VideoInit = function() {
    //初始化播放器;
    
    $(document).on("videoinit", function() {
        var ww = $(window).width();
        var vu = $("#h_vu").val(); //'5c562a1dd0';//eff9d49f1e   c3826a6499
        clickNumber=0;
        //创建一个播放器
        var playerConf = {
            "uu": "a91d451d26",
            "vu": vu,
            "pu": "89b355ae8c",
            "gpcflag": 1,
            "width": ww,
            "height": window.playerh,
            callbackJs: "playerCallBack",
            activityId: "player",
            autoplay: 0,
            mustautoplay: 1,
            type: "video"
        };
        window.player.init(playerConf, "player");
        hint("视频载入中，请点击播放按钮", "300px", "30px", 1000);
    });
}

//回调
function pcb(type, data) {
    //视频播放完毕
    console.log(type);
    
    if (type == "videoStop") {
        if (!isfirstplay) {
            //视频播放完成
            let playerwrap = $("video:first").closest("#player").find("div:first");
            playerwrap.hide();
            $(".playover").show();
        }
        isfirstplay =//视频准备就绪
        false;
    } else if (type == "playerInit") {
        //  window.player.sdk.startUp();
        //让播放器显示
        let playerwrap = $("video:first").closest("#player").find("div:first");
        playerwrap.show();
        //去除播放结束
        $(".playover").hide(// 开始播放，跳转seekto
        );
        
    } else if(type == "videoResume"){
        if(clickNumber==0){
            console.log(clickNumber)
            $(".add-loading-box").show();
            clickNumber=1;
        }
       
    }else if(type=="videoPause"){
        $(".add-loading-box").hide();
    }else if (type == "videoStart") {
        $(".add-loading-box").hide();
        let seektotime = $("#h_videostartseek").val();

        window.player.sdk.seekTo(seektotime);
        FunBegin();
    }
}

window.playerCallBack = pcb;
export {VideoInit}

// 记录当前播放到多少秒，每隔一秒向服务器发送
var timeInterval;
function FunBegin() {
    timeInterval = setInterval(function() {
        if (player.sdk.getVideoTime() > 0) {
            playTime = player.sdk.getVideoTime();
        }
        console.log(playTime+"--11111");
        up();
    }, 30000);
}

var isUp = false;
// 正式上线需要开启
//
function up() {
    if (player && playTime > 0) {
        isUp = true;
        //if (timeInterval != null) clearInterval(timeInterval);
        $.ajax({
            type: "get",
            url: "/ZhangJieKe/UpdateClassHoursHistory",
            async: false,
            data: {
                Time: playTime,
                ClassHoursId: getIsPlayCourseHourId()//"f5e99d73-c51f-4881-8677-f8e06521b308"
            }
        });
    }
}

window.onpagehide = function (e) {
    if (!isUp) {
        up(); //Ajax请求
    }
}
