import {hint} from '../BaseComponents/Hint';
//购买套餐
export function taocanbuy() {



    let taocanheight = $("#taocanbuywrap").height();
    $("#taocanbuywrap").css("bottom", "-" + taocanheight + "px").show();

    $(".fixedbuy").on("click", function() {

        let h_BuyType = $("#h_BuyType").val();

        switch (h_BuyType) {
            case "1":
                obj.case1();
                break;
            case "2":
                obj.case2();
                break;
            case "3":
                obj.case3();
                break;
            case "4":
                obj.case4();
                break;
            case "5":
                obj.case5();
                break;
            default:

        }

    });


    $("#course_need_buy").on("click",function(){
      $(".fixedbuy").trigger("click");
    });

    // 处理弹出框所有逻辑
    function fixedbuyopreate() {
        let warp = $(".mark-wrap"),
            buywrap = $("#taocanbuywrap");
        warp.show();

        buywrap.show(0, function() {
            buywrap.css({
                "transform": "translateY(-" + taocanheight + "px)"
            });

            $("#selectgroup").on("click", ">li", groupfn); //单科全科选择

            $("#selectsubjects_0").on("click", ">li", function() {
                subjectliclick($(this), 0);
            });
            $("#selectsubjects_1").on("click", ">li", function() {
                subjectliclick($(this), 1);
            });

            //关闭购买浮层
            $(".mark-wrap").on('click', function() {
                buywrap.css({
                    "transform": "translateY(" + taocanheight + "px)"
                });
                setTimeout(function() {
                    warp.hide();
                    buywrap.hide();
                    $("#selectsubjects_0").off("click");
                    $("#selectsubjects_1").off("click");
                }, 300);
            });

            // 立即报名
            $("#buy_atonce").on("click", function() {
                let groupv = $("#selectgroup>li.cur").attr("data-group");
                let taocanids = "";
                $("#selectsubjects_" + groupv + ">li.cur").each(function() {
                    taocanids += $(this).attr("data-proid") + ",";
                });
                taocanids = taocanids.substring(0, taocanids.length - 1);

                $.ajax({
                    data: {
                        "productsId": taocanids
                    },
                    type: "post",
                    url: "/Course/ProductsCarts?flag=1",
                    success: function(data) {
                        let jsondata = JSON.parse(data);
                        if (jsondata.ResultCode == 0) {
                            // 成功
                            if (typeof isFromWeixin !== "undefined"&&isFromWeixin) {
                                //如果是微信公众号中跳转到新的登陆页面
                                window.location.href = "/Book/ShoppingCart?fromwchat=1";
                            }else{
                                window.location.href = "/Book/ShoppingCart";
                            }
                            
                        } else {
                            if (jsondata.IsLogin == false) {
                                // 去登陆
                                if (typeof isFromWeixin !== "undefined"&&isFromWeixin) {
                                    //如果是微信公众号中跳转到新的登陆页面
                                    window.location.href = "/weixin/wap/Login?url="+encodeURIComponent(window.location.href)+"&fromwap=1"
                                    
                                }else{
                                    window.location.href = "/User/login";
                                }
                            } else {
                                hint(jsondata.message, "200px", "30px", 300);
                            }
                        }
                    }
                });
            });

        });
    }

    //课程组合函数
    function groupfn() {
        let t = $(this),
            groupval = t.attr("data-group");
        if (!t.hasClass("cur")) {
            let rowul = t.parent();

            let curi = rowul.find("i:first");
            rowul.find(".cur").removeClass("cur");
            t.addClass("cur");
            curi.appendTo(t);

            if (groupval == 0) {
                $("#taocanbuywrap").find("#selectsubjects_0").show();
                $("#taocanbuywrap").find("#selectsubjects_1").hide();
            } else {
                $("#taocanbuywrap").find("#selectsubjects_1").show();
                $("#taocanbuywrap").find("#selectsubjects_0").hide();
            }

            if ($("#selectsubjects_0>li.cur").length == 0) {
                let t1 = $("#selectsubjects_0>li:first");
                $("<i class=\"ke_icon\"></i>").appendTo(t1);
                t1.addClass("cur");
            }
            if ($("#selectsubjects_1>li.cur").length == 0) {
                let t1 = $("#selectsubjects_1>li:first");
                $("<i class=\"ke_icon\"></i>").appendTo(t1);
                t1.addClass("cur");
            }

            opreateprice(groupval); //改变价格

        }
    }

    //计算价格主函数
    function opreateprice(groupval) {
      console.log(groupval);
        let curpriceall = 0,
            priceall = 0;
        let curcount = $("#taocanbuywrap #selectsubjects_" + groupval + ">li.cur").length;
        console.log(curcount);
        $("#taocanbuywrap #selectsubjects_" + groupval + ">li.cur").each(function() {
            let t = $(this),
                curprice = parseInt(t.attr("data-curprice")),
                price = parseInt(t.attr("data-price"));

            curpriceall = parseInt(curpriceall) + parseInt(curprice);
            priceall = parseInt(price) + parseInt(priceall);
            console.log(priceall);
        });

        $("#span_curprice").html("￥" + curpriceall);
        $("#span_price").html("￥" + priceall);

        $("#hasselectedcount").html(curcount);
    }

    //科目商品选择
    function subjectliclick(o, groupval) {
        let t = o,
            ul = t.parent(),
            curi = ul.find("i:first").clone();

        if (!t.hasClass("cur")) {

          //如果未选中
          curi.appendTo(t);
          t.addClass("cur");

            if(groupval==1){

              let subtype1count=ul.find(">li[data-subjecttype=1]").length;//取出专业的数目
              //没有专业课
              if(subtype1count==0){
                let cur1length=$("#selectsubjects_1").find(">li:not('.cur')").length;
                let lilength= ul.find(">li").length;
                if(cur1length==0 && lilength==$("#selectsubjects_0>li:first").attr("data-subjectcount")){
                  $("#selectgroup>li[data-group=0]").trigger("click");
                  groupval=0;
                }
              }
              else {
                let sub0Count=ul.find(">li[data-subjecttype=0]:not('.cur')").length;
                let sub1curCount=ul.find(">li[data-subjecttype=1].cur").length;

                if(sub0Count==0 && sub1curCount==1){
                  let subidval=ul.find(">li[data-subjecttype=1].cur:first").attr("data-subjectid");
                  let sub0id=$("#selectsubjects_0>li[data-subjectid="+subidval+"]");
                  let sub0idcount=sub0id.attr("data-subjectcount");
                  let sub0curCount=parseInt(ul.find(">li[data-subjecttype=0].cur").length)+1;

                  if(sub0curCount==sub0idcount){
                    let t1 = $("#selectgroup>li:first");
                    $("<i class=\"ke_icon\"></i>").appendTo(t1);
                    t1.addClass("cur");

                    let t2=$("#selectgroup>li[data-group=1]").removeClass("cur").find("i").remove();

                    $("#taocanbuywrap").find("#selectsubjects_0").show();
                    $("#taocanbuywrap").find("#selectsubjects_1").hide();

                    if(!sub0id.hasClass("cur")){
                        $("#selectsubjects_0>.cur").removeClass("cur").find("i").remove();
                        sub0id.addClass("cur");
                        $("<i class=\"ke_icon\"></i>").appendTo(sub0id);
                    }
                    groupval=0;

                  }
                }
              }






            }

        } else {
            if (ul.find(">li.cur").length <= 1) {
                hint("至少选择一个课程", "150px", "30px", 300);
            } else {
                t.removeClass("cur");
                t.find(">i").remove();
            }
        }

        opreateprice(groupval); //改变价格
    }

    let obj = {
        case1: function() {
            let taocanid = $("#h_taocan").val();
            $.ajax({
                data: {
                    "productsId": taocanid
                },
                type: "post",
                url: "/Course/BuyProducts",
                success: function(data) {
                    let jsondata = JSON.parse(data);
                    if (jsondata.ResultCode == 0) {
                        // 成功
                        hint("报名成功", "200px", "30px", 200);
                        setTimeout(function() {
                            window.location.reload();
                        }, 200);
                    } else {
                        if (jsondata.IsLogin == false) {
                            // 去登陆
                             // 去登陆
                             if (typeof isFromWeixin !== "undefined"&&isFromWeixin) {
                                //如果是微信公众号中跳转到新的登陆页面
                                window.location.href = "/weixin/wap/Login?url="+encodeURIComponent(window.location.href)+"&fromwap=1"
                                
                            }else{
                                window.location.href = "/User/login";
                            }
                           
                        } else {
                            hint(jsondata.message, "200px", "30px", 300);
                        }
                    }
                }
            });
        },
        case2: function() {
            fixedbuyopreate();
        },
        case3: function() {
          let taocanid = $("#h_taocan").val();
            $.ajax({
                data: {
                    "productsId": taocanid
                },
                type: "post",
                url: "/Course/ProductsCarts?flag=1",
                success: function(data) {
                    let jsondata = JSON.parse(data);
                    if (jsondata.ResultCode == 0) {
                        // 成功
                        window.location.href = "/Book/ShoppingCart";
                    } else {
                        if (jsondata.IsLogin == false) {
                            // 去登陆
                             // 去登陆
                             if (typeof isFromWeixin !== "undefined"&&isFromWeixin) {
                                //如果是微信公众号中跳转到新的登陆页面
                                window.location.href = "/weixin/wap/Login?url="+encodeURIComponent(window.location.href)+"&fromwap=1"
                                
                            }else{
                                window.location.href = "/User/login";
                            }
                        } else {
                            hint(jsondata.message, "200px", "30px", 300);
                        }
                    }
                }
            });
        },
        case4: function() {
            hint("商品已售罄", "200px", "30px", 300);
        },
        case5: function() {
            hint("商品已停售", "200px", "30px", 300);
        }
    }
}
