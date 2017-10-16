import {VideoInit} from './DetailComponents/Video_Init';
import {init_width_cnt} from './DetailComponents/Cnt_Init_Width';
import {ClickToggle, IsShowVideo, InitHieght} from './DetailComponents/Video_Operate';
import {downapp} from './BaseComponents/Down';
import {touchfixed} from './DetailComponents/ScrollTap';
import {treejs} from './DetailComponents/TreeJs';
import {tab} from './DetailComponents/Tab';
import {firstplay, changeplay, changeVersion, refresh} from './DetailComponents/CourseHour';
import {playover_down, playover_next} from './DetailComponents/PlayOver';

import {comment} from './DetailComponents/Comment';
import {classes} from './DetailComponents/Classes';
import {swipercnt} from './DetailComponents/SwiperCnt';
import {taocanbuy} from './DetailComponents/Buy';

import {Drag} from "./BaseComponents/Drag"

var attachFastClick = require('fastclick');

export default class Detail {
    constructor() {
        this.init();
    }

    /*初始化加载、事件*/
    init() {
        $(function() {
            attachFastClick.attach(document.body);
            classes(); //班次相关事件
            InitHieght(); //初始化高度
            VideoInit(); //初始化
            ClickToggle(); //切换是否显示
            IsShowVideo(); //有没有观看播放的权限
            downapp(); //下载APP
            touchfixed(); //滑动触发监听--目录是否显示
            treejs(); //树菜单的特效
            firstplay(); //默认播放视频
            changeplay(); //改变播放课时
            changeVersion(); //版本切换
            playover_down(); //播放结束--下载
            playover_next(); //播放结束--下一节
            tab(); //切换选项卡
            refresh(); //刷新试一下
            comment(); //添加评价
            swipercnt(); //滑动事件
            taocanbuy(); //套餐购买层


            //拖拽
            let footerheight=0;
            if($(".footer:last").length>0){footerheight=$(".footer:last").height()}
            let options={
              toprange:$(".ke_detail_header:first").height(),
              leftrange:0,
              rightrange:$(window).width()-$(".fixedico").width(),
              bottomrange:$(window).height()-footerheight-$(".fixedico").height()
            }
            Drag(options,$(".fixedico"));

        });

    }
}
