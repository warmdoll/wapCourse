import {hint} from '../BaseComponents/Hint';
// 播放器
window.player = null;

function player1() {

    hint("如未自动播放，请点击播放按钮", "250px", "30px", 2000);

    if ($("#h_kestate").val() == 0) {
        window.player = new CloudVodPlayer();
    } else {
        window.player = new CloudLivePlayer();
    }

    //去后台获取直播的id
    let liveIds = $("#hiddenActivityId").val();
    let vu = $("#h_kevu").val();

    var playerConf = {
        "uu": "a91d451d26",
        "vu": vu,
        "pu": "89b355ae8c",
        activityId: liveIds,
        mustAutoplay: 0,
        callbackJs: "playerCallBack",
        type: "video"
    };
    window.player.init(playerConf, "player");
}

function pcb(type, data) {
    //改成用结束时间来判断
    switch (type) {
            // case "videoError" || "videoLiveInterupt" || "errorInKernel" || "errorInConfig" || "errorInLoadPlugins" || "videoLiveStop" || "videoStop":
            //   let overtime=$("#hidovertime").val();//.replace(//-/g, "//")
            //   var nowtime=new Date().getTime();
            //   var comdate=new Date(overtime.replace(/\s+/g, 'T').concat('.000+08:00')).getTime();
            //
            //   if(nowtime>comdate){
            //     $("#playover").show();
            //   }
            //   else {
            //       $("#breakoff").show();
            //   }
            //     break;
        case "videoStart":
            player.sdk.resumeVideo();
            break;
        default:
    }
}

window.playerCallBack = pcb;
export {player1}
