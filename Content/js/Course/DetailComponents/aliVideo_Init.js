import {getIsPlayCourseHourId} from "./CourseHour";
import {hint} from '../BaseComponents/Hint';
//初始化阿里云播放器
window.aliplayer = new Aliplayer();

let isfirstplay = true,
    aliplayTime = 0,
    clickNumber=0;
let aliVideoInit = function() {
    //初始化播放器;
    
    $(document).on("alivideoinit", function() {
        var ww = $(window).width();
        var vu = $("#h_vu").val(); //'5c562a1dd0';//eff9d49f1e   c3826a6499
        clickNumber=0;
        //创建一个阿里播放器
        var aliplayerConf = {
                id: "player", // 容器id
                source: "http://219.238.31.46/play.videocache.lecloud.com/260/40/113/bcloud/121442/ver_00_22-1111546687-avc-199906-aac-48000-1370240-44565236-9428f64beb800cbd1cc81cb0597f448f-1501412996234.mp4?crypt=23aa7f2e292&b=260&nlh=4096&nlt=60&bf=90&p2p=1&video_type=mp4&termid=2&tss=no&platid=2&splatid=209&its=0&qos=2&fcheck=0&amltag=666888&mltag=666888&proxy=3689815911,2092994851,467476918&uid=1962122789.rp&keyitem=GOw_33YJAAbXYE-cnQwpfLlv_b2zAkYctFVqe5bsXQpaGNn3T1-vhw..&ntm=1510819200&nkey=c758db5c154ff62819d6481274396c13&nkey2=1dffb904bc7b0e31ed853403f8e89699&auth_key=1510819200-1-0-2-209-1941e29e65b69f8d54cd7bfef648a82b&geo=CN-1-12-16&mmsid=241644966&tm=1510801008&key=da448114a9b54ec3f423ab1a710d140b&payff=0&cuid=121442&vtype=21&dur=1370&p1=3&p2=31&p3=311&cf=h5-ios&p=101&playid=0&tag=mobile&sign=bcloud_121442&pay=0&ostype=ios&hwtype=un&uuid=7DD7EC793A0AEEE0A11513A508265E9B_0&vid=46738589&ajax=1&_r=jsonp&uidx=0&errc=0&gn=3083&ndtype=0&vrtmcd=106&buss=666888&cips=116.243.158.37",        // 视频url
                width: ww,       // 播放器宽度
                height: window.playerh,     // 播放器高度
                
            };
        
        window.aliplayer.init(aliplayerConf);
        hint("视频载入中，请点击播放按钮", "300px", "30px", 1000);
    });
}
let aliVideoType="";
let endcallback = function(type)
 {
    aliVideoType=type;
    if (type == "videoended") {
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

        window.aliplayer.seek(seektotime);
        FunBegin();
    }
 }
 player.on('ended',endcallback("videoended"));   //视频播放完成
 player.on('pause',endcallback("videoPause"));//视频暂停时触发
 player.on('play',endcallback("videoResume"));//视频由暂停恢复为播放时触发

export {aliVideoInit}

// 记录当前播放到多少秒，每隔一秒向服务器发送
var timeInterval;
function FunBegin() {
    timeInterval = setInterval(function() {
        if (aliplayer.getCurrentTime() > 0) {
            playTime = aliplayer.getCurrentTime();
        }
        console.log(playTime+"--11111");
        up();
    }, 30000);
}

var isUp = false;
// 正式上线需要开启
//
function up() {
    if (aliplayer && aliplayTime > 0) {
        isUp = true;
        //if (timeInterval != null) clearInterval(timeInterval);
        $.ajax({
            type: "get",
            url: "/ZhangJieKe/UpdateClassHoursHistory",
            async: false,
            data: {
                Time: aliplayTime,
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
