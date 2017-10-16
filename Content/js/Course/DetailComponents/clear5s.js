//在6以下的手机里不显示原价
let clearfont=function(){
  var sreenwidth=$(window).width();
  if(sreenwidth<370){
    $(".evaluate-right").css({"font-size":"1rem"});
    $(".evaluate-left .p1").css({"font-size":"1rem"});
    $(".evaluate-right p").css({"margin-right":"2%"});
  }
}
export  {clearfont}
