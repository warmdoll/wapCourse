import {hint} from '../BaseComponents/Hint';
import {detail_classes} from '../ViewComponents/Detail_Classes';
//默认播放视频
export function firstplay() {
    let playnode = $("em[data-state='cur']");
    if (playnode.length == 1) {
        playnode.closest("li.class_hour").parent().siblings(".leftico[data-isopen='false']").trigger('click');
    }
}

//版本切换
export function changeVersion() {
    $("#Cnt").on("click", " [data-type='version']", function() {

        let t = $(this),
            v = t.attr("data-val");
        if (t.is(":not('.cur')")) {

            t.siblings("span").removeClass("cur");
            t.addClass("cur");
            let li = t.closest(".classes_info"),
                ul = li.parent();
            var nextlis = ul.find('li').not(":first");
            nextlis.remove();
            //ajax--取完数据append到 ul
            let courseid = t.parent().parent().attr("data-courseid");
            hint("加载中", "100px", "30px", 300);
            $.ajax({
                type: "get",
                url: "/Course/GetClassHoursList?Id=" + courseid + "&VersionFlag=" + v + "",
                success: function(data) {
                    let val = JSON.parse(data);
                    if (val.ResultCode === 0 && val.Data.ClassHours.length > 0) {
                        let jsonData = val.Data.ClassHours;
                        let allhtml = "";
                        jsonData.map(function(v, i, a) {
                            let htmltemplate = detail_classes(v);
                            allhtml += htmltemplate;
                        });

                        ul.append(allhtml);
                    }
                }

            });

        }
    })
}

//切换课时
export function changeplay() {
	
	//预约相关-----点击复制公众号
    $("#copy-publicnum").on('click', function () {
        copyPublicnum();
        //addpromptText("公众号复制成功");
    })
    //点击下载App
    $("#wex-down-app").on('click',function(){
        //$(".downapp").trigger("click");
        window.location.href='/download/index.html';
    })
    //点击取消
    $("#wex-clear").on('click',function(){
        $(".wex-ken-skip.js_skip,.wex-ken-skip .activ-box ").hide();
    })
	//点击暂不前往微信---提示框关闭
    $(".now-noattention").on('click',function(){
        $(".wex-ken-skip.js_skip,#copy-result").hide();
        $(".wex-ken-skip .activ-box ").show();

    })
    $("#Cnt").on('click', ".class_hour[data-type]", function() {
        let t = $(this),
            type = t.attr("data-type");
        switch (type) {
            //预约
            case "subscribe":
                subscribe(t);
                break;
            //取消预约
            case "subscribed":
                subscribed(t);
                break;
            //录播
            case "recorded":
                recorded(t);
                break;
            case "hourbuy":
                hourbuy(t);
                break;
            case "nosupportsinglebuy":
                hint("请先购买此课程", "120px", "30px", 500);
                break;
            case "notonline":
                hint("课时暂未上线", "120px", "30px", 500);
                break;
            case "preparevideo":
                hint("课时转码中，请下载准题库APP", "200px", "30px", 800);
                break;
            default:
        }
    });
}

//复制公众号
let copyPublicnum=function(){
	 var that=this;
     var that=this;
     if (navigator.userAgent.match(/(iPhone|iPod|iPad|Safari);?/i)) {//区分iPhone设备  
              window.getSelection().removeAllRanges();//这段代码必须放在前面否则无效  
              var Url2=document.getElementById("biaoios");//要复制文字的节点  
              var range = document.createRange();  
              // 选中需要复制的节点  
              range.selectNode(Url2);  
              // 执行选中元素  
              window.getSelection().addRange(range);  
              // 执行 copy 操作  
              var successful = document.execCommand('copy'); 
              try{
                  $("#copy-result").show();
                  if(successful){
                     $("#exame-title").html("公众号复制成功");
                  } else{
                      $("#exame-title").html("请在微信中搜索zhuntiku公众号并关注")
                  }
              } catch(err){
                  //fail info
              }
              // 移除选中的元素  
              window.getSelection().removeAllRanges();  
          }else{  
              var Url2=document.getElementById("biao1");//要复制文字的节点  
              Url2.select(); // 选择对象  
              document.execCommand("Copy"); // 执行浏览器复制命令  
               $("#copy-result").show();
               $("#exame-title").html("公众号复制成功");
          } 
          $(".activ-box ").hide(); 
}

//预约--函数体
let subscribe = function(t) {
    /*
    let url = $(".downapp:first").attr("href");
    window.location.href = url;*/
    if(isFromWeixin){
    	
    	
    	var reservationStatus=1; 
        
            var othis=$(t);
            var courseId = othis.attr("data-coursehourid");

            $.ajax({
                url: "/Live/ActivityAppointment?Id=" + courseId + "&status=" + reservationStatus + "&callback=?",
                type: 'get',
                dataType: 'jsonp',
                success: function (data) {
                    if(data.ResultCode == 0) {
                       var dataFlg=data.Data.flag;
                       switch (dataFlg){
                            case 1://未登录
                                window.location.href="/weixin/wap/usercenter";
                            break;
                            case 2://已登录未关注微信公众号
                                $(".wex-ken-skip.js_skip,.wex-ken-skip .activ-box").show();
                                othis.find(".rightoperate>em").addClass("subscribed").removeClass("subscribe");
                                othis.attr("data-type","subscribed");
                            break;
                            case 3://0                                 
                                    othis.find(".rightoperate>em").addClass("subscribed").removeClass("subscribe");
                                     othis.attr("data-type","subscribed");
                                 hint(data.Message, "120px", "30px", 500);//that.addpromptText(data.Message);
                            break;
                       }
                        
                    } else {
                       hint(data.Message, "120px", "30px", 500);
                    }
                }
            })
        
    	
    	
    }else{
        let url = $(".downapp:first").attr("href");
        window.location.href = url;
    }
}


//取消预约--函数体
let subscribed = function(t) {
 
    if(isFromWeixin){   	
    	
    	var reservationStatus=0; 
        
            var othis=$(t);
            var courseId = othis.closest(".class_hour").attr("data-coursehourid");

            $.ajax({
                url: "/Live/ActivityAppointment?Id=" + courseId + "&status=" + reservationStatus + "&callback=?",
                type: 'get',
                dataType: 'jsonp',
                success: function (data) {                  
                       hint(data.Message, "120px", "30px", 500);
                       othis.find(".rightoperate>em").removeClass("subscribed").addClass("subscribe");
                       othis.attr("data-type","subscribe");
                }
            })
    }
}

//直播--需要购买单课时
let hourbuy = function(t) {
    let warp = $(".mark-wrap"),
        hourbuywrap = $("#hourbuywrap");
    warp.show();

    let hourprice = t.attr("data-price");
    let thourid = t.attr("data-coursehourid");
    hourbuywrap.find(">.p3").html("购买本课时：￥" + hourprice + "元");

    hourbuywrap.show(0, function() {
        hourbuywrap.css({"transform": "translateY(-248px)"});
    });

    //跳转到购物车页
    $("#hourbuywrap").on("click", ">.p3", function() {
        //thourid
        window.location.href = "/Course/BuyClassHours?Id=" + thourid;
    });
    //取消
    $('#buy_cannel').on('click', function() {
        hourbuywrap.css({"transform": "translateY(248px)"});
        setTimeout(function() {
            warp.hide();
        }, 600);
    });
}

// 录播课时切换
let recorded = function(t) {
    let CourseHourId = t.attr("data-coursehourid");
    //根据课时ID去服务器验证，返回VU并返回下一节
    let ajax_resultvu = t.attr("data-vu"),
        ajax_nextHour = t.attr("data-NextClassHoursId");
    //处理下一节
    $("#h_nexthour").val(ajax_nextHour);

    if (ajax_resultvu != "") {
        //按钮
        $("em.keplay_yes").removeClass("keplay_yes").addClass("redplay");
        t.find("em.redplay").removeClass("redplay").addClass("keplay_yes");

        $("#h_vu").val(ajax_resultvu);
        //只保留黑背景
        $("#player").css("height", $("#player").height()).html("");

        $("#h_videostartseek").val(t.attr("data-times"));

        $(document).trigger("videoinit");
        $(".needbuywrap").hide();
    } else {
        //还有一种状态是转码中，需要与后台配合编写
        hint("请先购买", "120px", "30px", 500);
    }
}

//返回当前正在播放课时ID
export function getIsPlayCourseHourId() {
    var emyes = $("em.keplay_yes");
    if (emyes.length == 1) {
        return emyes.closest(".class_hour[data-coursehourid]").attr("data-coursehourid");
    }
    return "";
}

//刷新
export function refresh() {
    $(".refresh").on('click', function() {
        //ajax去读取是否开始
        let returnval = false;
        if (returnval == true) {
            $(this).parent().hide();
            $(".gotolive").show();

        } else {
            hint("直播尚未开始", "150px", "30px", 500);
        }
    });
}
