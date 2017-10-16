
//弹出提示文字框
export function hint(html,width,height,wait){
  var o=$(".hint");
  o.html(html).css({"width":width,"height":height,"line-height":height,"opacity":1});
  o.show();
  o.delay(wait).animate({opacity:0.1},500,function(){o.hide();});
}
