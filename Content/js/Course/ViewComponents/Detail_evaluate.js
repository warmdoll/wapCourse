export function detail_evaluate(o) {

    let obj = {
        html: ""
    };

    obj.html = `<li class="clearfix">
      <div class="row">
          <div class="col-xs-2">
              <div class="picwarp">
                  <img class="picimg" src="${o.HeadPic}">
              </div>
          </div>
          <div class="col-xs-10">
              <p class="p1">${o.UserName}</p>
              <p class="p2">${o.CommentContent}</p>
          </div>
      </div>
  </li>`;

    return obj.html;

}
