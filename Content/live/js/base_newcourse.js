function zdconsole(message) {
    if (!console) {

    }
    else {
        console.log(message);
    }
}
js.lang.String.call(String.prototype);
var exp = {
    "[礼物]": "http://static.gensee.com/webcast/static/emotion/chat.gift.png",
    "[愤怒]": "http://static.gensee.com/webcast/static/emotion/emotion.angerly.gif",
    "[鄙视]": "http://static.gensee.com/webcast/static/emotion/emotion.bs.gif",
    "[伤心]": "http://static.gensee.com/webcast/static/emotion/emotion.cry.gif",
    "[再见]": "http://static.gensee.com/webcast/static/emotion/emotion.goodbye.gif",
    "[高兴]": "http://static.gensee.com/webcast/static/emotion/emotion.laugh.gif",
    "[流汗]": "http://static.gensee.com/webcast/static/emotion/emotion.lh.gif",
    "[无聊]": "http://static.gensee.com/webcast/static/emotion/emotion.nod.gif",
    "[疑问]": "http://static.gensee.com/webcast/static/emotion/emotion.question.gif",
    "[你好]": "http://static.gensee.com/webcast/static/emotion/emotion.smile.gif",
    "[反对]": "http://static.gensee.com/webcast/static/emotion/feedback.against.gif",
    "[赞同]": "http://static.gensee.com/webcast/static/emotion/feedback.agreed.png",
    "[鼓掌]": "http://static.gensee.com/webcast/static/emotion/feedback.applaud.png",
    "[太快了]": "http://static.gensee.com/webcast/static/emotion/feedback.quickly.png",
    "[太慢了]": "http://static.gensee.com/webcast/static/emotion/feedback.slowly.png",
    "[值得思考]": "http://static.gensee.com/webcast/static/emotion/feedback.think.png",
    "[凋谢]": "http://static.gensee.com/webcast/static/emotion/rose.down.png",
    "[鲜花]": "http://static.gensee.com/webcast/static/emotion/rose.up.png"
};


function toImg(str) {
    console.log(exp[str]);
    var str = "<img src=" + exp[str] + " class='express' >";
    return str;
}
window.openEmotionFlag = false;
function showMessage(mes,level) {
    if (!level) { level = 0; }
    var str = "";
    //老师发链接单独标记
    return level==0?expressToHtml(mes):urlToHtml(mes);
}


//url消息转html
function urlToHtml(messageString) {

    var start = 0;
    var str="";
//    var urlReg=/((http|ftp|https)\:\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9\&%#_\./-~-]*)?/g;
    var urlReg = /(http|https):\/\/\S*/g;
    var urlMatched=messageString.match(urlReg);
    if(urlMatched==null)
    {
       str+=expressToHtml(messageString);
    }
    //url加a标签2016-07-26 13:24:51 说明：发几个连接、表情，可能在连接前后出现聊天内容，不匹配汉字，如果需要发汉字url，请使用url转码后的URL
    else {
         for (var i = 0; i < urlMatched.length; ++i) {
            var index = messageString.indexOf(urlMatched[i], start);
            if (index != start) {
                str += expressToHtml(messageString.substring(start, index));
            }
            str += "<a href='"+urlMatched[i]+"' target='_blank'>"+urlMatched[i]+"</a>";
            start = index + urlMatched[i].length;
        }
        if (start < messageString.length - 1) {
            str += expressToHtml(messageString.substring(start));
        }
    }
    return str;
}


function msgappendtodom(mes,name,level,isSelfSend){
  //判断dom样式
  var cls="username";
  if(level==1)    {      cls="username_teacher";    }
  if(isSelfSend){      cls="username_my";    }
  var li="<li><span><label class="+cls+">"+name+"：</label><label class=\"usercnt\">"+mes+"</label></span></li>";

  if(level==3)
  {
    li="<li class=\"licenter\"><label class=\"welcomeelse\">"+mes+"</label></li>";
  }

  $("#video_sms_list").append(li);

  $("#video_sms_list")[0].scrollTop = $("#video_sms_list")[0].scrollHeight;
}

//表情消息转html
function expressToHtml(mes){
  //    var mes = mes.replace(/</g, "&lt").replace(/>/g, "&gt");
    var start = 0;
    var str = "";
    var reg = /\[.*?\]/g;
    var matched = mes.match(reg);
    var text = mes.split(reg);
    if (matched != null) {
        for (var i = 0; i < matched.length; ++i) {
            if (matched[i] in exp) {
                var index = mes.indexOf(matched[i], start);
                if (index != start) {
                    str +=  mes.substring(start, index);
                }
                str += toImg(matched[i]);
                start = index + matched[i].length;
            }
        }
        if (start < mes.length - 1) {
            str += mes.substring(start) ;
        }
    }
    else {
        str = mes;
    }
    return str;



}
//IE9(含)以下浏览器用到的jsonp回调函数
function jsonpCallback(rspData) {
    //设置接口返回的数据
    webim.setJsonpLastRspData(rspData);
}

//监听大群新消息（普通，点赞，提示，红包）
function onBigGroupMsgNotify(msgList) {
    for (var i = msgList.length - 1; i >= 0; i--) {//遍历消息，按照时间从后往前
        var msg = msgList[i];
        webim.Log.warn('receive a new group msg: ' + msg.getFromAccountNick());
        //显示收到的消息
        showMsg(msg);
    }
}

//进入大群
function applyJoinBigGroup(groupId) {
    var options = {
        'GroupId': groupId//群id
    };
    webim.applyJoinBigGroup(
            options,
            function (resp) {
                //JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
                if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
                    webim.Log.info('进群成功');

                    window.selfjoin();
                } else {
                    console.log('进群失败');
                }
            },
            function (err) {
                console.log(err.ErrorInfo);
            }
    );
}

//sdk登录
function sdkLogin() {
    //web sdk 登录
    webim.login(window.loginInfo,window.listeners, options,
            function (identifierNick) {
                //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
                webim.Log.info('webim登录成功');
                applyJoinBigGroup(avChatRoomId);//加入大群
                hideDiscussForm();//隐藏评论表单
                initEmotionUL();//初始化表情
            },
            function (err) {
                console.log(err.ErrorInfo);
            }
    );//
}


//显示消息（群普通+点赞+提示+红包）
function showMsg(msg) {
    var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
    var ul, li, paneDiv, textDiv, nickNameSpan, contentSpan;

    fromAccount = msg.getFromAccount();
    if (!fromAccount) {
        fromAccount = '';
    }
    fromAccountNick = msg.getFromAccountNick();
    if (!fromAccountNick) {
        fromAccountNick = '未知用户';
    }

    //解析消息
    //获取会话类型，目前只支持群聊
    //webim.SESSION_TYPE.GROUP-群聊，
    //webim.SESSION_TYPE.C2C-私聊，
    sessType = msg.getSession().type();
    //获取消息子类型
    //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
    subType = msg.getSubType();

    isSelfSend = msg.getIsSend(); //消息是否为自己发的

    switch (subType) {

        case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
            var msgstring = convertMsgtoHtml(msg).decodeHtml();

            if (msg.elems[0].type == webim.MSG_ELEMENT_TYPE.IMAGE) {
                msgappendtodom(msgstring, msg.fromAccountNick, 1,isSelfSend);
            }
            else {
              try {
                var msgobj = JSON.parse(msgstring);
                var tempstr=showMessage(msgobj.content,msgobj.level);
                msgappendtodom(tempstr,msgobj.name, msgobj.level,isSelfSend);
              } catch (e) {
                console.log('接收错误的格式');
              }
            }
            break;
        case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
            //            contentSpan.innerHTML = "[群红包消息]" + convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
            //业务自己可以增加逻辑，比如展示点赞动画效果
            //            contentSpan.innerHTML = "[群点赞消息]" + convertMsgtoHtml(msg);
            //展示点赞动画
            //            showLoveMsgAnimation();
            break;
        case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
            //            contentSpan.innerHTML = "[群提示消息]" + convertMsgtoHtml(msg);
            break;
    }
}

//把消息转换成Html
function convertMsgtoHtml(msg) {
    var html = "", elems, elem, type, content;
    elems = msg.getElems();//获取消息包含的元素数组
    for (var i in elems) {
        elem = elems[i];
        type = elem.getType();//获取元素类型
        content = elem.getContent();//获取元素对象
        switch (type) {
            case webim.MSG_ELEMENT_TYPE.TEXT:
                html += convertTextMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.FACE:
                html += convertFaceMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.IMAGE:
                html += convertImageMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.SOUND:
                html += convertSoundMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.FILE:
                html += convertFileMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.LOCATION://暂不支持地理位置
                //html += convertLocationMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.CUSTOM:
                html += convertCustomMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
                html += convertGroupTipMsgToHtml(content);
                break;
            default:
                webim.Log.error('未知消息元素类型: elemType=' + type);
                break;
        }
    }
    return html;
}

//解析文本消息元素
function convertTextMsgToHtml(content) {
    return content.getText();
}
//解析表情消息元素
function convertFaceMsgToHtml(content) {
    var index = content.getIndex();
    var data = content.getData();
    var faceUrl = null;
    var emotion = webim.Emotions[index];
    if (emotion && emotion[1]) {
        faceUrl = emotion[1];
    }
    if (faceUrl) {
        return	"<img src='" + faceUrl + "'/>";
    } else {
        return data;
    }
}
//解析图片消息元素
function convertImageMsgToHtml(content) {
    var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL);//小图
    var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE);//大图
    var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN);//原图
    if (!bigImage) {
        bigImage = smallImage;
    }
    if (!oriImage) {
        oriImage = smallImage;
    }
    return	"<img src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand;width:100%;' id='" + content.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onclick='imageClick(this)' />";
}
//解析语音消息元素
function convertSoundMsgToHtml(content) {
    var second = content.getSecond();//获取语音时长
    var downUrl = content.getDownUrl();
    if (webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 8) {
        return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + downUrl;
    }
    return '<audio src="' + downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
}
//解析文件消息元素
function convertFileMsgToHtml(content) {
    var fileSize = Math.round(content.getSize() / 1024);
    return '<a href="' + content.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.getName() + '(' + fileSize + 'KB)</i></a>';

}
//解析位置消息元素
function convertLocationMsgToHtml(content) {
    return '经度=' + content.getLongitude() + ',纬度=' + content.getLatitude() + ',描述=' + content.getDesc();
}
//解析自定义消息元素
function convertCustomMsgToHtml(content) {
    var data = content.getData();
    var desc = content.getDesc();
    var ext = content.getExt();
    return "data=" + data + ", desc=" + desc + ", ext=" + ext;
}
//解析群提示消息元素
function convertGroupTipMsgToHtml(content) {
    var WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10;
    var text = "";
    var maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1;
    var opType, opUserId, userIdList;
    var memberCount;
    opType = content.getOpType();//群提示消息类型（操作类型）
    opUserId = content.getOpUserId();//操作人id
    switch (opType) {
        case webim.GROUP_TIP_TYPE.JOIN://加入群
            userIdList = content.getUserIdList();
            //text += opUserId + "邀请了";
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text = text.substring(0, text.length - 1);
            text += "进入房间";
            //房间成员数加1
            memberCount = $('#user-icon-fans').html();
            $('#user-icon-fans').html(parseInt(memberCount) + 1);
            break;
        case webim.GROUP_TIP_TYPE.QUIT://退出群
            text += opUserId + "离开房间";
            //房间成员数减1
            memberCount = parseInt($('#user-icon-fans').html());
            if (memberCount > 0) {
                $('#user-icon-fans').html(memberCount - 1);
            }
            break;
        case webim.GROUP_TIP_TYPE.KICK://踢出群
            text += opUserId + "将";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "踢出该群";
            break;
        case webim.GROUP_TIP_TYPE.SET_ADMIN://设置管理员
            text += opUserId + "将";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "设为管理员";
            break;
        case webim.GROUP_TIP_TYPE.CANCEL_ADMIN://取消管理员
            text += opUserId + "取消";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "的管理员资格";
            break;

        case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO://群资料变更
            text += opUserId + "修改了群资料：";
            var groupInfoList = content.getGroupInfoList();
            var type, value;
            for (var m in groupInfoList) {
                type = groupInfoList[m].getType();
                value = groupInfoList[m].getValue();
                switch (type) {
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
                        text += "群头像为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
                        text += "群名称为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
                        text += "群主为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
                        text += "群公告为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
                        text += "群简介为" + value + "; ";
                        break;
                    default:
                        text += "未知信息为:type=" + type + ",value=" + value + "; ";
                        break;
                }
            }
            break;

        case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO://群成员资料变更(禁言时间)
            text += opUserId + "修改了群成员资料:";
            var memberInfoList = content.getMemberInfoList();
            var userId, shutupTime;
            for (var m in memberInfoList) {
                userId = memberInfoList[m].getUserId();
                shutupTime = memberInfoList[m].getShutupTime();
                text += userId + ": ";
                if (shutupTime != null && shutupTime !== undefined) {
                    if (shutupTime == 0) {
                        text += "取消禁言; ";
                    } else {
                        text += "禁言" + shutupTime + "秒; ";
                    }
                } else {
                    text += " shutupTime为空";
                }
                if (memberInfoList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + memberInfoList.length + "人";
                    break;
                }
            }
            break;
        default:
            text += "未知群提示消息类型：type=" + opType;
            break;
    }
    return text;
}

//tls登录
function tlsLogin() {
    //跳转到TLS登录页面
    TLSHelper.goLogin({
        sdkappid: loginInfo.sdkAppID,
        acctype: loginInfo.accountType,
        url: window.location.href
    });
}
//第三方应用需要实现这个函数，并在这里拿到UserSig
function tlsGetUserSig(res) {
    //成功拿到凭证
    if (res.ErrorCode == webim.TLS_ERROR_CODE.OK) {
        //从当前URL中获取参数为identifier的值
        loginInfo.identifier = webim.Tool.getQueryString("identifier");
        //拿到正式身份凭证
        loginInfo.userSig = res.UserSig;
        //从当前URL中获取参数为sdkappid的值
        loginInfo.sdkAppID = loginInfo.appIDAt3rd = Number(webim.Tool.getQueryString("sdkappid"));
        //从cookie获取accountType
        var accountType = webim.Tool.getCookie('accountType');
        if (accountType) {
            loginInfo.accountType = accountType;
            sdkLogin();//sdk登录
        } else {
            console.log('accountType非法');
        }
    } else {
        //签名过期，需要重新登录
        if (res.ErrorCode == webim.TLS_ERROR_CODE.SIGNATURE_EXPIRATION) {
            tlsLogin();
        } else {
            console.log("[" + res.ErrorCode + "]" + res.ErrorInfo);
        }
    }
}

//单击图片事件
function imageClick(imgObj) {
    var imgUrls = imgObj.src;
    var imgUrlArr = imgUrls.split("#"); //字符分割
    var smallImgUrl = imgUrlArr[0];//小图
    var bigImgUrl = imgUrlArr[1];//大图
    var oriImgUrl = imgUrlArr[2];//原图
    webim.Log.info("小图url:" + smallImgUrl);
    webim.Log.info("大图url:" + bigImgUrl);
    webim.Log.info("原图url:" + oriImgUrl);
}


//切换播放audio对象
function onChangePlayAudio(obj) {
    if (curPlayAudio) {//如果正在播放语音
        if (curPlayAudio != obj) {//要播放的语音跟当前播放的语音不一样
            curPlayAudio.currentTime = 0;
            curPlayAudio.pause();
            curPlayAudio = obj;
        }
    } else {
        curPlayAudio = obj;//记录当前播放的语音
    }
}

//单击评论图片
function smsPicClick() {
    if (!loginInfo.identifier) {//未登录
        if (accountMode == 1) {//托管模式
            //将account_type保存到cookie中,有效期是1天
            webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
            //调用tls登录服务
            tlsLogin();
        } else {//独立模式
            console.log('请填写帐号和票据');
        }
        return;
    } else {
        hideDiscussTool();//隐藏评论工具栏
        showDiscussForm();//显示评论表单
    }
}

//发送消息(普通消息)
//发送消息(普通消息)
function onSendMsg(levelNum,message) {
    if (!loginInfo.identifier) {//未登录
        if (accountMode == 1) {//托管模式
            //将account_type保存到cookie中,有效期是1天
            webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
            //调用tls登录服务
            tlsLogin();
        } else {//独立模式
            zdconsole('请填写帐号和票据');
        }
        return;
    }

    if (!selToID) {
        zdconsole("您还没有进入房间，暂不能聊天");
        $("#edit").val('');
        return;
    }
    //获取消息内容
      var msgtosend ="";
      if(message){msgtosend=message;}
      else {
        msgtosend = $("#send_msg_text_input").val();
      }
    var msgLen = webim.Tool.getStrBytes(msgtosend);

    if (msgtosend.length < 1) {
        zdconsole("发送的消息不能为空!");
        return;
    }

    var maxLen, errInfo;
    if (selType == webim.SESSION_TYPE.GROUP) {
        maxLen = webim.MSG_MAX_LENGTH.GROUP;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
    } else {
        maxLen = webim.MSG_MAX_LENGTH.C2C;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
    }
    if (msgLen > maxLen) {
        zdconsole(errInfo);
        return;
    }

    if (!selSess) {
        selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
    }
    var isSend = true; //是否为自己发送
    var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
    var subType; //消息子类型
    if (selType == webim.SESSION_TYPE.GROUP) {
        //群消息子类型如下：
        //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
        //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
        //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
        //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
        subType = webim.GROUP_MSG_SUB_TYPE.COMMON;

    } else {
        //C2C消息子类型如下：
        //webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
        subType = webim.C2C_MSG_SUB_TYPE.COMMON;
    }
    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    var txtobject = { level: levelNum, content: msgtosend, name: loginInfo.identifierNick };
    msgtosend = JSON.stringify(txtobject); //'{level:0,content:\\\"' + msgtosend + '\\\"}'; //JSON.stringify(txtobject); //
    text_obj = new webim.Msg.Elem.Text(msgtosend);
    msg.addText(text_obj);
    webim.sendMsg(msg, function (resp) {
        webim.Log.info("发消息成功");
        $("#send_msg_text").val('');
        if ($("#send_msg_text_input").length > 0) $("#send_msg_text_input").val('');
    }, function (err) {
      console.log('失败'+err.ErrorInfo);
        webim.Log.error("发消息失败:" + err.ErrorInfo);

    });
}

//发送消息(群点赞消息)
function sendGroupLoveMsg() {

    if (!loginInfo.identifier) {//未登录
        if (accountMode == 1) {//托管模式
            //将account_type保存到cookie中,有效期是1天
            webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
            //调用tls登录服务
            tlsLogin();
        } else {//独立模式
            console.log('请填写帐号和票据');
        }
        return;
    }

    if (!selToID) {
        console.log("您还没有进入房间，暂不能点赞");
        return;
    }

    if (!selSess) {
        selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
    }
    var isSend = true;//是否为自己发送
    var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
    //群消息子类型如下：
    //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
    //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
    //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
    //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
    var subType = webim.GROUP_MSG_SUB_TYPE.LOVEMSG;

    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
    var msgtosend = 'love_msg';
    var text_obj = new webim.Msg.Elem.Text(msgtosend);
    msg.addText(text_obj);

    webim.sendMsg(msg, function (resp) {
        if (selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
            showMsg(msg);
        }
        webim.Log.info("点赞成功");
    }, function (err) {
        webim.Log.error("发送点赞消息失败:" + err.ErrorInfo);
        console.log("发送点赞消息失败:" + err.ErrorInfo);
    });
}
//隐藏评论文本框
function hideDiscussForm() {
    $(".video-discuss-form").hide();
}
//显示评论文本框
function showDiscussForm() {
    $(".video-discuss-form").show();
}
//隐藏评论工具栏
function hideDiscussTool() {
    $(".video-discuss-tool").hide();
}
//显示评论工具栏
function showDiscussTool() {
    $(".video-discuss-tool").show();
}
//隐藏表情框
function hideDiscussEmotion() {
    //$(".video-discuss-emotion").hide();
    $(".video-discuss-emotion").fadeOut("slow");
}
//显示表情框
function showDiscussEmotion() {
    //$(".video-discuss-emotion").show();
    $(".video-discuss-emotion").fadeIn("slow");

}
//展示点赞动画
function showLoveMsgAnimation() {
    //点赞数加1
    var loveCount = $('#user-icon-like').html();
    $('#user-icon-like').html(parseInt(loveCount) + 1);
    var toolDiv = document.getElementById("video-discuss-tool");
    var loveSpan = document.createElement("span");
    var colorList = ['red', 'green', 'blue'];
    var max = colorList.length - 1;
    var min = 0;
    var index = parseInt(Math.random() * (max - min + 1) + min, max + 1);
    var color = colorList[index];
    loveSpan.setAttribute('class', 'like-icon zoomIn ' + color);
    toolDiv.appendChild(loveSpan);
}

//初始化表情
function initEmotionUL() {
    for (var index in exp) {
        var emotions = $('<img>').attr({
            "id": index,
            "src": exp[index],
            "style": "cursor:pointer;"
        }).click(function () {
            selectEmotionImg(this);
        });
        $('<li>').append(emotions).appendTo($('#emotionUL'));
    }
}

//打开或显示表情
function showEmotionDialog() {
    if (openEmotionFlag) {//如果已经打开
        openEmotionFlag = false;
       hideDiscussEmotion(); //关闭
    } else {//如果未打开
        openEmotionFlag = true;

      showDiscussEmotion(); //打开
    }
}
//选中表情
function selectEmotionImg(selImg) {
  var t=$("#send_msg_text_input");
  var inputtext=t.val();
  var selectionNum=getCursortPosition(t.get(0));
  var previous = inputtext.substring(0,selectionNum );
	var after = inputtext.substring(selectionNum);
	var lastvalue = previous + selImg.id + after;

/*点击表情后input的默认值去掉*/
    $("#send_msg_text_input").val(lastvalue);

    $("#p_flower").hide();
    $("#p_send").show();
    $("#p_edit").removeClass("p2").addClass("p2click");
    hideDiscussEmotion();
}


// 获取光标位置
function getCursortPosition (ctrl) {
//获取光标位置函数
var CaretPos = 0; // IE Support
if (document.selection) {
ctrl.focus ();
var Sel = document.selection.createRange ();
Sel.moveStart ('character', -ctrl.value.length);
CaretPos = Sel.text.length; }
 // Firefox support
else if (ctrl.selectionStart || ctrl.selectionStart == '0')
CaretPos =ctrl.selectionStart;
return (CaretPos);
}




//退出大群
function quitBigGroup() {
    var options = {
        'GroupId': avChatRoomId//群id
    };
    webim.quitBigGroup(
            options,
            function (resp) {

                webim.Log.info('退群成功');
                $("#video_sms_list").find("li").remove();
            },
            function (err) {
                console.log(err.ErrorInfo);
            }
    );
}

//登出
function logout() {
    //登出
    webim.logout(
            function (resp) {
                webim.Log.info('登出成功');
                loginInfo.identifier = null;
                loginInfo.userSig = null;
                $("#video_sms_list").find("li").remove();
                var indexUrl = window.location.href;
                var pos = indexUrl.indexOf('?');
                if (pos >= 0) {
                    indexUrl = indexUrl.substring(0, pos);
                }
                window.location.href = indexUrl;
            }
    );
}
