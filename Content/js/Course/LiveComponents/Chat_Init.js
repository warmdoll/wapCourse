export function chatinit() {
    var accountMode = 0;
    var sdkAppID = 1400005677;
    var accountType = 3020;
    var _avChatRoomId = $("#h_avChatRoomId").val(); // 'bd6024d6-140e-4c62-a88b-b0eea6c98342';//----------------------------------------后台给
    window.avChatRoomId = _avChatRoomId;
    window.selType = webim.SESSION_TYPE.GROUP;
    window.selToID = _avChatRoomId; //当前选中聊天id
    window.selSess = null; //当前聊天会话
    //默认群组头像(选填)
    window.selSessHeadUrl = 'http://static.wangxiao.cn/zhidao/images/tx.jpg';
    //当前用户身份
    var _loginInfo = {
        'sdkAppID': sdkAppID, //用户所属应用id,必填
        'appIDAt3rd': sdkAppID, //用户所属应用id，必填
        'accountType': accountType, //用户所属应用帐号类型，必填
        'identifier': "", //当前用户ID，选填
        'identifierNick': "", //当前用户昵称，选填
        'userSig': "", //当前用户身份凭证，选填
        'headurl': 'http://static.wangxiao.cn/zhidao/images/tx.jpg' //当前用户默认头像，选填
    };
    window.loginInfo = _loginInfo;
    var _onGroupSystemNotifys = {
        "5": onDestoryGroupNotify,
        "11": onRevokeGroupNotify, //群已被回收(全员接收)
        "255": onCustomGroupNotify //用户自定义通知(默认全员接收)
    };
    window.onGroupSystemNotifys = _onGroupSystemNotifys;
    //监听事件
    var _listeners = {
        "onBigGroupMsgNotify": window.onBigGroupMsgNotify, //监听新消息(大群)事件，必填
        "onGroupSystemNotifys": window.onGroupSystemNotifys //监听（多终端同步）群系统消息事件，必填
    };
    window.listeners = _listeners;

    var isAccessFormalEnv = true; //是否访问正式环境
    if (webim.Tool.getQueryString("isAccessFormalEnv") == "false") {
        isAccessFormalEnv = false; //访问测试环境
    }

    var isLogOn = false; //是否在浏览器控制台打印sdk日志
    //其他对象，选填
    var _options = {
        'isAccessFormalEnv': isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
        'isLogOn': isLogOn //是否开启控制台打印日志,默认开启，选填
    };
    window.options = _options;
    var curPlayAudio = null; //当前正在播放的audio对象
    var openEmotionFlag = false; //是否打开过表情

}
