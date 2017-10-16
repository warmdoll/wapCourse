//使用该方法需要在页面内引入iscroll.js
//callback：ajax加载数据的方法
function myiscroll(pullUpCallback, pullDownCallback) {
	var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
    /**
    * 下拉刷新 （自定义实现此方法）
    * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
    */
	function pullDownAction() {
	    if (pullDownCallback) {
	        pullDownCallback();
        }
	    else {
	        window.location.href = window.location;
        }

    }

    /**
    * 滚动翻页 （自定义实现此方法）
    * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
    */
    function pullUpAction() {
        pullUpCallback();
        //callback();
        //调用完后执行下这个方法  window.myScroll.refresh();方法
//        setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!

//

//           // myScroll.refresh(); 	// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
//        }, 1000);     // <-- Simulate network congestion, remove setTimeout from production!
    }

    /**
    * 初始化iScroll控件
    */
    function loaded() {
        pullDownEl = document.getElementById('pullDown');
        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;

        myScroll = new iScroll('wrapper', {
            scrollbarClass: 'myScrollbar', /* 重要样式 */
            useTransition: false, /* 此属性不知用意，本人从true改为false */
            topOffset: pullDownOffset,
            onRefresh: function () {
                if (pullDownEl.className.match('loading')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                } else if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
										if(pullUpEl.querySelector('.pullUpLabel')!=null){
                    	pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
										}
                }
            },
            onScrollMove: function () {
                if (this.y > 5 && !pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'flip';
                    setTimeout((function () { pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手重新加载...'; }), 500);

                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                    pullDownEl.className = '';
                    setTimeout((function () { pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...'; }), 500);

                    this.minScrollY = -pullDownOffset;
                } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    setTimeout((function () {
											if(pullUpEl.querySelector('.pullUpLabel')!=null){
											pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手加载...';
											}
										})
											, 500);

                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    setTimeout((function () {
											if(pullUpEl.querySelector('.pullUpLabel')!=null){
											pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
										}
										}), 500);

                    this.maxScrollY = pullUpOffset;
                }
            },
            onScrollEnd: function () {
                if (pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'loading';
                    setTimeout((function () { pullDownEl.querySelector('.pullDownLabel').innerHTML = '刷新中...'; }), 500);
                    pullDownAction(); // Execute custom function (ajax call?)
                } else if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'loading';
                    setTimeout((function () {
											if(pullUpEl.querySelector('.pullUpLabel')!=null){
											pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
										} }), 500);
                    pullUpAction(); // Execute custom function (ajax call?)
                }
            }
        });
        window.myScroll = myScroll;

        //	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 1000);
    }

    //初始化绑定iScroll控件
    document.getElementById("wrapper").addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		loaded();
    //window.addEventListener('DOMContentLoaded', loaded, false);
};
