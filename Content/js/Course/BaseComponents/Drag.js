export function Drag(options,jqdom) {
  (function($){
    $.fn.DragOp = function(options) {
      var Defaults={toprange:0,leftrange:0,rightrange:0,bottomrange:0}
      var o=$.extend(Defaults,options);

      var obj={
        around:function(left,top){
          var retobj={left:left,top:top}
          obj.left=left<=o.leftrange?o.leftrange:left;
          //let ketopheight=//$(".ke_top:first").height();
          obj.top=top<=o.toprange?o.toprange:top;
          //最右侧或底部
          //let maxleft=$(window).width()-$("#buy_tag").width();
          obj.left=left>=o.rightrange?o.rightrange:obj.left;
          //let footerheight=o.bottomrange;
          //if($(".footer:last").length>0){footerheight=$(".footer:last").height()}
          //let maxtop=$(window).height()-footerheight-$("#buy_tag").height();
          obj.top=top>o.bottomrange?o.bottomrange:obj.top;

          return obj;
        }
      }

      $(this).on("touchstart",function(e){
        e.stopPropagation();
        let t=$(this),toffset=t.offset(),ttop=toffset.top-$(document).scrollTop(),tleft=toffset.left;


        var touchstart = event.targetTouches[0];
        let startleft=touchstart.screenX;
        let starttop=touchstart.screenY;

        $(this).on("touchmove",function(ev){
          ev.preventDefault();
            ev.stopPropagation();
            var touch = event.targetTouches[0];
            let diffleft=touch.screenX - startleft;
            let difftop=touch.screenY - starttop;

            let overt=parseInt(ttop+difftop);
            let overl=parseInt(tleft+diffleft);

            let objval=obj.around(overl,overt);//处理四周边界

            t.css({top:objval.top+"px",left:objval.left+"px",bottom:"auto",right:"auto"});
        });

        $(this).on("touchend",function(e){
          $(document).on("touchmove",function(e){});
        });


      });
    }

  })(jQuery);

  jqdom.DragOp(options);
}
