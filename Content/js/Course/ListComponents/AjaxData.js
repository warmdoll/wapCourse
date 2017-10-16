window.page = 1;
import {listview} from '../ViewComponents/List';
// 异步取数据
export function ajax_data(b = false) {

    var obj = {
        url: "/Course/nListAjax?sign=" + $("#h_sign").val(),
        // 获取所有搜索条件
        getSearch: function() {
            let o = {
                    "PageIndex": window.page, //当前页
                    "proorder": "-1", //排序
                    "productscoursetype": "-1", //类型  录播、直播
                    "taocantype": "-1", //套餐类型
                    "subjecttype": "-1", //组合类型
                    "coursepricerange": "-1", //价格
                    "sysclassids": "" //科目
                }
                // 排序
                let sort_pcur = $(".choice-box .pcur").first(),
                    sort_cur = $(".choice-box .cur").first();
                if (sort_pcur.length == 1) {
                    o.proorder = sort_pcur.attr("data-proorder");
                } else {
                    o.proorder = sort_cur.attr("data-proorder");
                }
                // 选中获取值
                o.productscoursetype = $("#search_box [data-productscoursetype].cur").first().attr("data-productscoursetype");
                o.taocantype = $("#search_box [data-taocantype].cur").first().attr("data-taocantype");
                o.subjecttype = $("#search_box [data-subjecttype].cur").first().attr("data-subjecttype");
                let dataprice = $("#search_box [data-coursepricerange].cur").first();
                o.coursepricerange = dataprice.attr("data-coursepricerange");
                o.sysclassids = $("#search_box [data-sysclassids].cur").first().attr("data-sysclassids");
                return o;
            },
            // 处理返回的JSON渲染到DOM
            htmlopreate: function(jsonstr) {
                let val = JSON.parse(jsonstr);

                if (val.ResultCode === 0 && val.Data.length > 0) {
                    let jsonData = val.Data;
                    let allhtml = "";
                    jsonData.map(function(v, i, a) {
                        let htmltemplate = listview(v);
                        allhtml += htmltemplate;
                    });
                    $("#warplist").append(allhtml);

                    window.page += 1;
                }
            },
            //上滑
            getMore: function() {
                let dompagecount = $("#PageCount").val();
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
                $("#pullUp>.pullUpLabel").html("没有课程了...");
                setTimeout(function() {
                    $("#scroller").removeAttr("style");
                }, 600);
                $("#wrapper").on("touchmove", function(e) {
                    e.stopPropagation()
                });
            },
            //初始化myiscroll
            init: function() {
                if (window.page <= $("#PageCount").val() && $("#PageCount").val() > 1) {
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
                        $("#PageCount").val(val.PageInfo.PageCount);
                        window.page = 1;
                        // window.myScroll.destroy();
                        // window.myScroll = null;
                        if(window.myScroll!=null){window.myScroll.refresh();}                        
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
