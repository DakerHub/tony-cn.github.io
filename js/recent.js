require(['detail','jquery','rAF'], function(detail,$){  
$(document).on('click','a',function(e){
        e.preventDefault();
})
$(document).ready(function(){
    /*
    //由于js解析加载首页的方法用在移动端十分吃力，所以手动添加最近的4篇博文
    var articles = $('#articles');
    var atcArr = detail.articles;
    if(atcArr.length > 4){
        atcArr.length = 4;
    }
    $.each(atcArr,function(index,item){
        detail.methods.composeArticle(articles,item.title,item.sketch,item.time,item.src,item.tags);
    });*/
    
    $('.article').click(function(e){
        var $title = $(this).find('.toArticle');
        var ahref = $title.attr('href');
        location.href = encodeURI('../articles/articles.html?'+'href='+ahref+'&title='+$title.text());
        $('#home',window.parent.document).removeClass('currentView');
        $('#articles',window.parent.document).addClass('currentView');
        $('#header',window.parent.document).css({'width':'20%',transition:'width .5s'});
        $('#container',window.parent.document).css({width:'80%',transition:'width .5s'});
        $('.local i,.local span',window.parent.document).css({'font-size':'14px'});
    });
    // 背景canvas动画
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            canvas.height = $('#articles').height();
            canvas.width = $('#articles').width();
            var ctxH = canvas.height,ctxW = canvas.width;
            //tool function
            function randomRange(min,max,dec){
                return parseFloat(((max-min)*Math.random()+min).toFixed(dec || 2));
            }
            function getStyle(node,attr){
                var style = null;
                if(window.getComputedStyle){
                    style = window.getComputedStyle(node,null)
                }else{
                    style = node.currentStyle;
                }
                return style[attr];
            }

            //背景效果绘图对象
            function getBgObj(){
                var bubbles = [],count = 0,colors = ['rgba(18,53,85,','rgba(209,73,78,','rgba(230,73,78,','rgba(219,208,167,','rgba(225,238,210,'];
                function render(){
                    
                    for(let i=0;i<bubbles.length;i++){
                        var bubble = bubbles[i];
                        ctx.fillStyle = bubble.color;
                        ctx.beginPath();
                        ctx.arc(bubble.x,bubble.y,bubble.r,0,Math.PI*2,true);
                        ctx.fill();
                        bubble.v -= 0.02;
                        if(bubble.r < 1){
                            bubbles.splice(i,1);
                        }else{
                            bubble.r += bubble.v;
                        }
                    }
                }
                function addBubble(){
                    var n = randomRange(5,10,0);
                    for(let i=0;i<n;i++){
                        bubbles.push({
                            x : randomRange(0,ctxW,0),
                            y : randomRange(0,ctxH,0),
                            r : randomRange(2,5),
                            v : randomRange(0.8,0.6),
                            color : colors[Math.floor(Math.random()*colors.length)]+randomRange(0.5,1)+')'
                        })
                    }
                };
                return {
                    render : render,
                    addBubble : addBubble,
                    count : count
                }
            }
            //hover效果绘图对象
            function getHoverObj(){
                var context = null,isEnter = false,isLeave=true,bubbles = [],colors = ['rgba(18,53,85,','rgba(209,73,78,','rgba(230,73,78,','rgba(219,208,167,','rgba(225,238,210,'];
                function setIsEnter(val){
                    isEnter = val;
                }
                function getIsEnter(){
                    return isEnter;
                }
                function setIsLeave(val){
                    isLeave = val;
                }
                function getIsLeave(){
                    return isLeave;
                }
                function setContext(val){
                    context = val;
                }
                function getContext(){
                    return context;
                }
                function setVNegative(){
                    for(let i=0;i<bubbles.length;i++){
                        bubbles[i].v = -0.05;
                    }
                }
                function hoverEffect(context){
                    if(context == null){
                    }else{
                        var l_right = context.offsetLeft
                        var r_left = parseInt(getStyle(context,'width'))
                        +parseInt(getStyle(context,'paddingLeft'))
                        +parseInt(getStyle(context,'paddingRight'))
                        +parseInt(getStyle(context,'borderLeftWidth'))
                        +parseInt(getStyle(context,'borderRightWidth'))
                        +l_right;
                        var width = context.scrollWidth
                        +parseInt(getStyle(context,'borderTopWidth'))
                        +parseInt(getStyle(context,'borderBottomWidth'));
                        var top = context.offsetTop;
                        var scroll = $('body').scrollTop();
                        console.log(scroll);
                        var height = context.scrollHeight
                        +parseInt(getStyle(context,'borderTopWidth'))
                        +parseInt(getStyle(context,'borderBottomWidth'));
                        drawArc(l_right,r_left,top,width,height,scroll);
                    }
                }
                function drawArc(l_right,r_left,top,width,height,scroll){
                    if(bubbles.length == 0){
                        var leftNum = randomRange(3,6,0);
                        var rightNum = randomRange(3,6,0);
                        for(let i=0;i<leftNum;i++){
                            bubbles.push({
                                x : randomRange(l_right-70,l_right-10),
                                y : randomRange(top,top + height),
                                r : randomRange(3,8),
                                v : randomRange(0.6,0.8),
                                color : colors[Math.floor(Math.random()*colors.length)]+randomRange(0.5,1)+')' 
                            })
                        }
                        for(let i=0;i<rightNum;i++){
                            bubbles.push({
                                x : randomRange(l_right+width+10,l_right+width+70),
                                y : randomRange(top,top + height),
                                r : randomRange(3,8),
                                v : randomRange(0.6,0.8),
                                color : colors[Math.floor(Math.random()*colors.length)]+randomRange(0.5,1)+')' 
                            })
                        }
                    }
                    for(let i=0;i<bubbles.length;i++){
                        var bubble = bubbles[i];
                        if(bubble.v >=0 ){
                            bubble.v = bubble.v - 0.05 < 0 ? 0 :  bubble.v - 0.05;
                            ctx.fillStyle = bubble.color;
                            ctx.beginPath();
                            ctx.arc(bubble.x,bubble.y-scroll,bubble.r,0,Math.PI*2,true);
                            ctx.fill();
                            bubble.r += bubble.v;
                        }else{
                            if(bubble.r > 1){
                                ctx.fillStyle = bubble.color;
                                ctx.beginPath();
                                ctx.arc(bubble.x,bubble.y,bubble.r,0,Math.PI*2,true);
                                ctx.fill();
                                bubble.r += bubble.v;
                                bubble.v = bubble.v - 0.1;
                            }else{
                                bubbles.splice(i,1);
                            }
                        }
                    }
                }
                function cancelEffect(){
                    for(let i=0;i<bubbles.length;i++){
                        var bubble = bubbles[i];
                        if(bubble.v > 0){
                            bubble.v = 0;
                        }else{
                            bubble.v = bubble.v - 0.1;
                            if(bubble.r > 1){
                                ctx.fillStyle = bubble.color;
                                ctx.beginPath();
                                ctx.arc(bubble.x,bubble.y,bubble.r,0,Math.PI*2,true);
                                ctx.fill();
                                bubble.r += bubble.v;
                            }else{
                                bubbles.splice(i,1);
                            }
                        }
                    }
                }
                return {
                    hoverEffect : hoverEffect,
                    getIsEnter : getIsEnter,
                    setIsEnter : setIsEnter,
                    getIsLeave : getIsLeave,
                    setIsLeave : setIsLeave,
                    getContext : getContext,
                    setContext : setContext,
                    cancelEffect : cancelEffect,
                    setVNegative : setVNegative
                    
                }
            }
            //获取对象
            var hoverObj = getHoverObj();
            var bgObj = getBgObj();
            bgObj.addBubble();
            //绑定hover事件
            $(document).on('mouseenter','.article',function(){
                hoverObj.setIsEnter(true);
                hoverObj.setIsLeave(false);
                hoverObj.setContext(this);
            });
            $(document).on('mouseleave','.article',function(){
                hoverObj.setIsEnter(false);
                hoverObj.setIsLeave(true);
                hoverObj.setContext(null);
                hoverObj.setVNegative();
            });
            //执行绘图
            (function animate(){
                    ctx.clearRect(0,0,ctxW,ctxH);
                    requestAnimationFrame(animate);
                    if(bgObj.count == 60){
                        bgObj.addBubble();
                        bgObj.count = 0;
                    }
                    bgObj.count++;
                    bgObj.render();
                    if(hoverObj.getIsEnter()){
                        hoverObj.hoverEffect(hoverObj.getContext());
                    }
                    if(hoverObj.getIsLeave()){
                        hoverObj.cancelEffect();
                    }
            })()
})
});