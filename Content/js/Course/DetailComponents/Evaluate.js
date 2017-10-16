window.page = 1;
import {detail_evaluate} from '../ViewComponents/Detail_evaluate';
// 异步取数据
export function evaluate(b = false) {
console.log(123);
    var obj = {
        url: "/Course/GetComments?pagesize=5",
        // 获取所有搜索条件
        getSearch: function() {
            let o = {
                "PageIndex": window.page, //当前页
                "proId": "" //套餐ID
            }
            o.proId = $("#h_taocan").val();
            return o;
        },
        // 处理返回的JSON渲染到DOM
        htmlopreate: function(jsonstr) {
            let val = JSON.parse(jsonstr);

            if (val.ResultCode === 0 && val.Data.length > 0) {
                let jsonData = val.Data;
                let allhtml = "";
                jsonData.map(function(v, i, a) {
                    let htmltemplate = detail_evaluate(v);
                    allhtml += htmltemplate;
                });
                $("#warplist").append(allhtml);

                window.page += 1;
            }
        },
        //上滑
        getMore: function() {
            let dompagecount = $("#h_Comment_PageCount").val();
            if (window.page <= dompagecount && dompagecount != 1) {
                if (window.page === 1) {
                    window.page = 2;
                }
                let search = obj.getSearch();
                $.ajax({
                    data: search,
                    type: "get",
                    url: obj.url,
                    success: function(data) {
                        obj.htmlopreate(data);
                        window.myScroll.refresh();
                    }
                });

            } else {
                $("#pullUp>.pullUpLabel").removeClass("pullUpLabel").html("没有更多了...");
                window.myScroll.refresh();
            }
        },
        //下拉
        pulldownCallback: function() {
            obj.changeinit();
            window.myScroll.refresh();
            window.page = 1;
            $("#pullUp>span:eq(1):not('.pullUpLabel')").addClass("pullUpLabel").html("上拉加载更多...");
        },
        //无数据
        hasnulllist: function() {
            $("#pullDown").hide();
            $("#pullUp>.pullUpLabel").html("没有评论了...");
            setTimeout(function() {
                $("#scroller").removeAttr("style");
            }, 600);
            $("#wrapper").on("touchmove", function(e) {
                e.stopPropagation()
            });
        },
        //初始化myiscroll
        init: function() {
            if (window.page <= $("#h_Comment_PageCount").val() && $("#h_Comment_PageCount").val() > 1) {
                myiscroll(obj.getMore, obj.pulldownCallback);
            } else {
                obj.hasnulllist();
            }
        },
        // 更新状态（数据发变化）
        changeinit: function() {
            $("#warplist").html("");
            window.page = 1;
            let search = obj.getSearch();
            $("#pullUp>span:eq(1):not('.pullUpLabel')").addClass("pullUpLabel").html("上拉加载更多...");
            $.ajax({
                data: search,
                type: "get",
                url: obj.url,
                async: false,
                success: function(jsonstr) {
                    obj.htmlopreate(jsonstr);
                    let val = JSON.parse(jsonstr);
                    $("#h_Comment_PageCount").val(val.PageInfo.PageCount);
                    window.page = 1;
                    // window.myScroll.destroy();
                    // window.myScroll = null;
                    if(window.myScroll){window.myScroll.refresh();}  
                    //obj.init();
                }
            });
        }
    }

    if (b) {
        obj.changeinit();
    } else {
        obj.init();
    }

}
