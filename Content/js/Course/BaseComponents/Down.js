//下载准题库
export function downapp(){
  //去什么商店,默认是应用宝0,苹果商店是1
  var ua = navigator.userAgent;
  //判断手机类型,默认为0是安卓手机
	var phonetype=0;
  var shoptype=0;
  //alert("微信浏览器")
  if(ua.indexOf('MicroMessenger') >-1){
  			shoptype=10;
  }
  else{
    if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
      //安卓手机
      shoptype=0;
    }
    else if (ua.indexOf('iPhone') > -1) {
      //苹果手机
      phonetype=1;
      if(ua.indexOf("Safari")> -1){
        //safari
        shoptype=11;
      }else{
        //其他浏览器
        shoptype=1;
      }
    }
  }

	var sign = GetQueryString("sign");
  //业务处理逻辑
    let appurl="";
    //安卓的商店
	   $.ajax({
  		url:'http://appconfig.wangxiao.cn/Service/GetAdviertisement?sign='+sign+'&DeviceType='+phonetype,
  		dataType:'jsonp',
  		async:true,
  		success:function(result){
        if(result.ResultCode==0){
          appurl=result.Data.AppUrl;
          scheme(phonetype,sign,shoptype,appurl);
        }
      },
      error:function(result){
        appurl="http://a.app.qq.com/o/simple.jsp?pkgname=cn.wangxiao.zhuntiku";
        scheme(phonetype,sign,shoptype,appurl);
      }
    });

}


//主处理函数，存放到localStorage
function scheme(phonetype,sign,shoptype,appurl){

	//初始化url scheme变量
	var schemeurl="";
	//默认0是安卓手机
	if(phonetype==0){
		//如果是大的准题库就清空
		if(sign=="ztk"){
			sign="";
		}
		//安卓唤起的本地app的地址'+sign+'
		schemeurl='cn.wangxiao.'+sign+'zhuntiku://zdwx';
	}else if(phonetype==1){
		//如果是苹果手机
		schemeurl=sign+"zhuntiku://";
	}



  /*1107*/
  if(window.location.href.indexOf("/TikuPaper/EnterUniformPractice")!==-1){
             /*考点练习*/
             schemeurl=schemeurl+"?type=2&typeAction=1";

  }else if(window.location.href.indexOf("/TikuPaper/UniformPractice")!==-1){
                     if(window.location.href.indexOf("TikuPracticeType=2")!==-1){
                     /*错题练习*/
                     schemeurl=schemeurl+"?type=2&typeAction=5";
                     }else{
                     /*每日一练*/
                     schemeurl=schemeurl+"?type=2&typeAction=0";
                     }

         }else if(window.location.href.indexOf("/TikuPaper/Paper")!==-1){
                if( window.location.href.indexOf("paperType=0")!==-1){
                  schemeurl=schemeurl+"?type=2&typeAction=2";
                }else{
                 schemeurl=schemeurl+"?type=2&typeAction=3";
                }

       }else if(window.location.href.indexOf("/TikuPractice/OnePractice")!==-1){
         /*分享页面*/
         schemeurl=schemeurl+"?type=1&typeAction=0";
       }else if(window.location.href.indexOf("/Live/Play/")!==-1){
       /*播放首页*/
         schemeurl=schemeurl+'?type=3&typeAction=0';
       }
 /*1107end*/
//取appid


	//取appid
	// var reg=/\d+/g
	// var str=appurl.match(reg)[0];
  //
	// localStorage.setItem("appid",str);

	//商店地址保存
	localStorage.setItem("androidshophref",appurl);




	localStorage.setItem("iosshophref",appurl);
	//url scheme地址保存
	localStorage.setItem("schemeurl",schemeurl);

	//手机类型
	localStorage.setItem("phonetype",phonetype);
	//商店地址类型
	localStorage.setItem("shoptype",shoptype);
}


//取地址栏
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	} else {
		return getCookie(name);
	}
}

//取cookie
function getCookie(name){
  var arr=document.cookie.split(';');
  var reg=new RegExp(name);
  var sign="ztk";
  for (var i = 0; i < arr.length; i++) {
    if(arr[i].match(reg)){
      var arr1=arr[i].split("=");
      sign=arr1[1];
    }
  };
  return sign;
}
