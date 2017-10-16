import {ajax_data} from "./ListComponents/AjaxData"
import {effect} from "./ListComponents/Effect"
import {cart} from "./BaseComponents/Cart"
import {Drag} from "./BaseComponents/Drag"
var attachFastClick = require('fastclick');

export default class Index {
    constructor() {
        this.init();
    }

    /*初始化加载、事件*/
    init() {

        $(function() {

            attachFastClick.attach(document.body);
            effect(); //特效相关
            ajax_data(); //数据相关
            cart({p_node:"#warplist",isfly:true}); //购物车飞的效果

            //拖拽
            let footerheight=0;
            if($(".footer:last").length>0){footerheight=$(".footer:last").height()}
            let options={
              toprange:$(".ke_top:first").height(),
              leftrange:0,
              rightrange:$(window).width()-$("#buy_tag1").width(),
              bottomrange:$(window).height()-footerheight-$("#buy_tag1").height()
            }
            Drag(options,$("#buy_tag1"));
        });

    }
}
