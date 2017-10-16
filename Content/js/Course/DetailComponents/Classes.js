import {detail_classes} from '../ViewComponents/Detail_Classes';
import {hint} from '../BaseComponents/Hint';
//班次事件
export function classes() {

    $('ol>li>ul>li>.leftico[data-event="tree"]').on('click', function(e) {
        let t = $(this),
            isopen = t.attr("data-isopen");
        //打开状态，判断班次相关
        if (isopen == "false") {
            let classesinfoul = t.next().next(),
                classesinfoli = classesinfoul.find(">li:first");
            if (classesinfoli.hasClass("classes_info")) {
                let courseid = classesinfoli.attr("data-courseid");
                //如果大于1，表示加载过，直接显示就可以
                if (classesinfoul.find(">li").length == 1) {

                    var nextlis = classesinfoul.find('li').not(":first");
                    nextlis.remove();

                    hint("加载中", "100px", "30px", 300);
                    $.ajax({
                        type: "get",
                        url: "/Course/GetClassHoursList?Id=" + courseid + "&VersionFlag=0",
                        success: function(data) {
                            let val = JSON.parse(data);
                            if (val.ResultCode === 0 && val.Data.ClassHours.length > 0) {
                                let jsonData = val.Data.ClassHours;
                                let allhtml = "";
                                jsonData.map(function(v, i, a) {
                                    let htmltemplate = detail_classes(v);
                                    allhtml += htmltemplate;
                                });

                                classesinfoul.append(allhtml);
                                //如果有上一版本就显示选项卡
                                if (val.Data.OtherVersionIsHasClassHours > 0) {
                                    classesinfoli.find(">.pull-right").html("<span data-type=\"version\" data-val=\"1\">上期版本</span><span data-type=\"version\" data-val=\"0\" class=\"cur\">最新版本</span>");
                                }
                                else {
                                  classesinfoli.find(">.pull-right").html("<span data-type=\"version\" data-val=\"0\" class=\"cur\">最新版本</span>");
                                }
                            }
                            else {
                              hint("暂无课程", "120px", "30px", 300);
                            }
                        }

                    });
                }
            }
        }
    });

}
