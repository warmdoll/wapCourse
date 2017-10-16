import {imgzoomplus} from './ImgZoom';
//处理大图
export function imgwidth(jqdom,isinitplus=false){
  if(isinitplus) {imgzoomplus();}//引用插件
  let dom=$(jqdom);
  setTimeout(function(){
    dom.find("img").each(function(){
      let i=$(this),iimgwidth=i.outerWidth(),screenwidth=$(window).outerWidth();
      if(iimgwidth>screenwidth){
        i.css({"width":"100%","height":"auto"});
        let src=i.attr("src");

        i.on("click",function(){
          let ua = navigator.userAgent;
          if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
            $("#player>div:first").hide();
          }
          $(document).trigger("bigimgwrapwhow",[src]);
        });

      }
    });
  },500);

  $(document).on("bigimgwrapwhow",function(e,src){
    $(".mark-wrap").show();
    $("<div class=\"bigimgwrap\"><img class=\"bigimgshow\" src=\""+src+"\"></div>").appendTo($("body"));
    new window.IMGBASE.Imgzoom($(".bigimgshow"), {});
    $(".bigimgwrap").on("touchmove",function(e){
      e.stopPropagation();
    });

    $(".mark-wrap").on("click",function(){
      let ua = navigator.userAgent;
      if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
        $("#player>div:first").show();
      }
      $(".bigimgwrap").remove();
      $(this).hide();
    });
  })

}
