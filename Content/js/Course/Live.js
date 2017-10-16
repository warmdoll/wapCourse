import {downapp} from './BaseComponents/Down';
import {initHeight} from "./Livecomponents/InitHeight"
import {player1} from "./Livecomponents/Player"
import {touchfixed} from './DetailComponents/ScrollTap';
import {chatinit} from "./Livecomponents/Chat_Init"
import {logininfo} from "./Livecomponents/loginInfo"
import {loginform} from "./Livecomponents/Login_FromChk"
import {chat_operate} from "./Livecomponents/Chat_Operate"
import {tab} from './DetailComponents/Tab';
import {treejs} from './DetailComponents/TreeJs';
import {firstplay, changeplay, changeVersion} from './DetailComponents/CourseHour';
var attachFastClick = require('fastclick');
import {classes} from './DetailComponents/Classes';
import {swipercnt} from './DetailComponents/SwiperCnt';

export default class Index {
    constructor() {

        this.init();
    }

    /*初始化加载、事件*/
    init() {

        $(function() {
            attachFastClick.attach(document.body);
            classes(); //班次相关事件
            player1(); //加载直播播放器
            initHeight(); //初始化高度
            touchfixed(); //滑动触发监听--目录是否显示
            downapp(); //下载APP
            chatinit(); //初始化聊天
            logininfo(); //获取用户信息(userSig等)
            loginform(); //登陆提交
            chat_operate(); //聊天相关，发送，接收等
            tab(); //切换选项卡
            treejs(); //树菜单的特效
            firstplay(); //默认播放视频
            changeplay(); //改变播放课时
            changeVersion(); //版本切换
            swipercnt(); //滑动事件
        });

    }
}
