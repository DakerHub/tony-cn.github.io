define([
    'jquery',
    'rAF'
], function($,raf) {
    $(document).on('click','a',function(e){
        e.preventDefault();
    });
    var lock = false;
    var containerHeight = parseInt($('#container',window.parent.document).height());
    var containerWidth = parseInt($('#container',window.parent.document).width());
    $(document).ready(function(){
        $(document).on('click','.pic-wrapper',function(e){
            var $this = $(this);
            if($('#modal')){
                //如果存在，直接赋值显示。
                lock = true;
                var img = new Image();
                img.src = $this.find('.pic-href').attr('href');
                //由于获取图片高度、长度需要等图片加载完成，因此需要使用到Image对象的onload属性。
                img.onload = function(){
                // 加载完成 
                    if(lock){
                       $('#load').removeClass('load');
                        var imgHeight = parseInt(img.height);
                        var imgWidth = parseInt(img.width);
                        if(imgHeight > containerHeight){
                            imgWidth = containerHeight/imgHeight*imgWidth;
                            imgHeight = containerHeight;
                        }
                        if(imgWidth > containerWidth){
                            imgHeight = containerWidth/imgWidth*imgHeight;
                            imgWidth = containerWidth;
                        }
                        $('#modal').css({height:imgHeight,
                            width:imgWidth,
                            left:containerWidth/2-imgWidth/2,
                            top:containerHeight/2-imgHeight/2,
                        }).fadeIn();
                        $('#pic-full-wrapper').empty().append($(img).attr({class:'pic-full'})); 
                    }
                };
                $('body').css({overflow:'hidden'});
                $('#masking').css({width:containerWidth,height:containerHeight}).show()
                            .click(function(){
                                $(this).hide();
                                $('body').css({overflow:'auto'});
                                $('#modal').hide();
                                $('#load').addClass('load');
                                lock = false;
                });
            }
        })
        // 设置时间线动态
        var years = $('.year');
        var offsetArr = [];
        years.each(function(){
            offsetArr.push($(this).offset().top);
        });
        var timeLine = $('<ul class="time-line"></ul>');
        for(let i=0;i<offsetArr.length;i++){
            timeLine.append($('<li style="margin-top:'+(offsetArr[i]-(offsetArr[i-1]?offsetArr[i-1]+20:offsetArr[i]))+'px"></li>'));
        }
        $('#gallery').prepend(timeLine);
        setTimeout(slide,300);
        function slide(){
            timeLine.slideDown()
        }
        // 背景canvas动画
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            canvas.height = $('body').height();
            canvas.width = $('body').width();
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
            //获取对象
            var bgObj = getBgObj();
            bgObj.addBubble();
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
            })()
    })
});