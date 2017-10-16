export function detail_classes(o) {

    let obj = {
            html: ""
        },
        ahrefstart = "",
        ahrefover = "",
        liveico = "",
        videoinfocolor = "",
        m_right5 = "",
        keicostate = "keplay_no",
        livestyle="width:95%;";

if (o.DataType == "recorded") {keicostate="redplay";}

    if (o.DataType == "beingLive") {
        ahrefstart = "<a href=\"/Course/nlive?ProductsId=" + $("#h_taocan").val() + "&Id=" + o.Id + ")\">";
        ahrefover = "</a>";
        videoinfocolor = "colorgreen";
        keicostate = "liveplay";
    }

    if (o.DataType == "subscribe" || o.DataType == "subscribed") {
        videoinfocolor = "colororange";
        m_right5 = "m_right5";
        keicostate = "subscribe";
    }

    if (o.DataType == "beingLive" || o.DataType == "subscribe") {
        liveico = "liveico";
        livestyle="max-width:80%;";
    }
    
    if(o.DataType=="subscribed"){
    	 keicostate = "subscribed";
    }

    if (o.DataType == "hourbuy") {
        keicostate = "hourneedbuy";
    }

    obj.html = `
    <li class="class_hour clearfix" data-type="${o.DataType}" data-NextClassHoursId="${o.NextClassHoursId}" data-vu="${o.VideoUnique}"  data-Price="${o.Price}" data-times="${o.Times}" data-coursehourid="${o.Id}">
    <div class="leftico pull-left">
        <i></i>
    </div>

    ${ahrefstart}
    <div class="rightcnt coursehourp pull-right">
      <p class="title">
        <span class="ellipsis_s" style="${livestyle}float:left;">
          ${o.Title}
        </span>
        <em class="ke_icon ${liveico}"></em>
      </p>
       <p class="${videoinfocolor}">${o.VideoLength}</p>
       <p class="progress">
          <span style="width:${o.Progress}%;"></span>
      </p>
      <p class="rightoperate ${m_right5}">
        <em class="ke_icon ${keicostate}"></em>
      </p>
    </div>
    ${ahrefover}
  `;

    return obj.html;

}
