export function listview(o) {

    Date.prototype.Format = function(fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                    ? (o[k])
                    : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    let obj = {
        html: ""
    };

    let tags = "",
        buttomleft = "",
        cssval = "ken_have_buy";
    if (o.Tags.length > 0) {
        o.Tags.map(function(v, i) {
            tags += "<span style=\"color:" + v.Color + "\;margin-left:3px\;border:1px solid " + v.Color + "\">" + v.Title + "</span>";
        });
    }

    if (o.LimitSaleCount > 0) {
        buttomleft = "剩余<i class=\"remain_c js_remai_number\">" + o.CanSaleCount + "</i> 席 &nbsp;限售<i class=\"limit_c js_limit_number\">" + o.LimitSaleCount + "</i> 席  ";
    }
    if (o.StopSaleDate != "") {
        var time1 = new Date(Date.parse(o.StopSaleDate.replace(/-/g, "/"))).Format("yyyy-MM-dd");
        buttomleft += "<i class=\"js_stop_date\">" + time1 + "停售</i>";
    }

    if (o.data_val == 1) {
        cssval = "ken_goto_buy";
    }

    obj.html = `<li class="clearfix">
  <div class="ken_pull-box clearfix">
      <div class="pull-left leftpic">
        <a href="${o.DetailUrl}`+fromwchat+`">
          <p><img src="${o.Img}"><span>${o.ClassHoursCount}课时</span></p>
        </a>
      </div>
      <div class="pull-right rightcnt">
          <a href="${o.DetailUrl}`+fromwchat+`">
              <p class="ptitle ellipsis">${o.Title}</p>
          </a>
          <p class="ptitleinfo">
              <span class="pull-left">￥${o.CurrentPrice}</span>
              <span class="pull-right">${tags}</span>
          </p>
      </div>

      </div>
      <div class="ken_pull_bottom clearfix">
        <span class="ken_recommend_text">
          ${buttomleft}
          <i class="ken_list_goto ${cssval} js_click_cart" data-productsId="${o.ProductsId}" data-val="${o.data_val}" data-status="${o.data_status}"></i>
        </span>

  </div>
  </li>`;
    return obj.html;

}
