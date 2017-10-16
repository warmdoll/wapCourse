// 滑动
export function swipercnt() {
    var oslider = {
        touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
        slider: document.getElementById('Cnt'),
        //初始化
        init: function() {

            var self = this; //this指slider对象
            if (!!self.touch)
                self.slider.addEventListener('touchstart', self.events, false);
            }
        ,
        events: {
            pointcompare: {
                x: 50,
                y: 10
            },
            startPos: {
                x: 0,
                y: 0
            },
            endPos: {
                x: 0,
                y: 0
            },
            slider: {},
            handleEvent: function(event) {
                this.slider = oslider.slider;
                var self = this; //this指events对象
                if (event.type == 'touchstart') {
                    self.start(event, self);
                } else if (event.type == 'touchend') {
                    self.end(event, self);
                }
            },
            //滑动开始
            start: function(event, self) {
                var touch = event.targetTouches[0];
                self.startPos = {
                    x: touch.pageX,
                    y: touch.pageY
                };
                // //console.log(event.target.tagName);
                // if(event.target.tagName==="a" || event.target.tagName==="A"){
                //   var ahref=$(event.target).attr("href");
                //   window.location.href=ahref;
                // }
                  this.slider.addEventListener('touchend', this, false);
            },
            //滑动释放
            end: function(event, self) {

                if (event.targetTouches.length > 1 || event.scale && event.scale !== 1)
                    return;
                var touch = event.changedTouches[0];
                self.endPos = {
                    x: touch.pageX - self.startPos.x,
                    y: touch.pageY - self.startPos.y
                };

                let compare_x = self.endPos.x,
                    compare_y = Math.abs(self.endPos.y);

                if (Math.abs(compare_x) > self.pointcompare.x && compare_y < self.pointcompare.y) {
                    let gotoaction = compare_x < 0
                        ? "left"
                        : "right";
                    $(".tabsCnt span.cur").trigger("goto", [gotoaction]);
                }

                if(Math.abs(compare_x)<5 && compare_y<5){
                  var et=$(event.target);
                  let eta="";
                  if(et.is("a")){eta=et;}
                  var parenta=et.parents("a").first();
                  if(parenta.length==1){
                    eta=parenta;
                  }


                  if(eta!=""){
                    console.log(eta);
                    var ahref=eta.attr("href");
                    window.location.href=ahref;
                  }
                }
                /*else {

                }*/
                //解绑事件
                this.slider.removeEventListener('touchend', this, false);
            }
        }
    }

    oslider.init();

}
