import {hint} from '../BaseComponents/Hint';
export function cart(options) {
    let defaults = {
        node: ".js_click_cart",
        p_node: "",
        ispay: false,
        isfly: false
    }
    let ob = $.extend({}, defaults, options);

    if (ob.p_node != "") {
        $(ob.p_node).on("click", ob.node,ob ,cartfn);
    } else {
        $(ob.node).on("click", ob,cartfn);
    }

    function cartfn(event) {
      let o=event.data;
        var t = $(this),
            b = false;
        $(o.p_node).off("click", o.node);
        var cartNumber = 0;

        if (o.isfly) {
            cartNumber = parseInt($(".add_cart_number").text());
        }

        var cartflag = t.attr("data-val"),
            productId = t.attr("data-productsid"),
            dataStatus = t.attr("data-status");

        /*剩余商品不为0时请求接口，为0时不请求*/
        if (dataStatus == 0) {
            $.getJSON("/Course/ProductsCarts?productsId=" + productId + "&flag=" + cartflag + "&callback=?", function(result) {
                if (result.ResultCode == 0) { //成功
                    /*提示信息*/
                    if (cartflag == 1) { //当前是购物车图标 加入购物车成功
                        extendFn("商品已经加入购物车");
                        // 如果需要飞的效果并且改变数字
                        if (o.isfly) {
                            flyfn(t);
                        }
                    } else {
                        extendFn("商品已经移出购物车");
                        if (o.isfly) {
                            t.parents("li").find(".leftpic p .bottom_img").remove();
                            if(cartNumber>0){
                                $(".add_cart_number").text(--cartNumber);
                            }else{
                                $(".add_cart_number").text("0");
                            }
                            
                        }
                    }

                    //如果页面需要去加入购物车数量变化并且跳转事件
                    if (o.ispay) {
                        $("#course_number").html(result.Data.Count);
                        $("#all_price").html(result.Data.TotalPrice);
                        /*$("#go_buy_btn").on("click", function() {
                            window.location.href = "/Book/ShoppingCart";
                        });*/
                    }
                    $(ob.p_node).on("click", ob.node,ob ,cartfn);

                } else if (result.ResultCode != 0 && result.IsLogin == false) {
                    if(isFromweixin){
                        window.location.href = "/weixin/wap/Login?url="+encodeURIComponent(window.location.href)+"&fromwap=1"
                    }else{
                        window.location.href = "/User/login";
                    }
                    
                }
                /*更换图标*/
                if (result.Data.Status == 1) { //当前的状态1是已经在购物车  变成减号   0 变成购物车

                    t.removeClass("ken_goto_buy").addClass("ken_have_buy");
                    t.attr("data-val", "0");

                } else {
                    t.removeClass("ken_have_buy").addClass("ken_goto_buy");
                    t.attr("data-val", "1");
                }


            });
        } else {
            if (dataStatus == 1) {
                extendFn("商品已售馨");
                $(ob.p_node).on("click", ob.node,ob ,cartfn);
            } else if (dataStatus == 2) {
                extendFn("商品已停售");
                $(ob.p_node).on("click", ob.node,ob ,cartfn);
            }

        }

    }

    function extendFn(mes) {
        hint(mes, "150px", "30px", 400);
    }

    function flyfn(t) {
        let changeImg = t.closest("li").find(".leftpic img").attr("src");
        let cartNumber = parseInt($(".add_cart_number").text());
        t.closest("li").find(".leftpic p").append("<img class='bottom_img' src=" + changeImg + " />");
        //添加商品图片的坐标
        var startOffset = t.closest("li").find(".bottom_img").offset();
        //购物车坐标
        var endOffset = $(".buy_tag").offset();
        //购物车数量
        $(".add_cart_number").text(++cartNumber);
        $(".bottom_img").animate({
            position: "absolute",
            top: endOffset.top - startOffset.top + 50 + "px",
            left: endOffset.left - startOffset.left + 50 + "px",
            width: "0%"
        }, 1500);
      }


}
