import sliderspace from './IndexComponents/sliderad';
import {clearPrice} from './IndexComponents/clear5s';
var attachFastClick = require('fastclick');

export default class Index {
    constructor() {
        this.init();
    }

    /*初始化加载、事件*/
    init() {
        $(function() {
            attachFastClick.attach(document.body);
            sliderspace(); //去掉轮播中的&nbsp;
            clearPrice(); //在6以下的手机里不显示原价
        });
    }
}
