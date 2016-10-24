
require(['jquery','rAF'],function($,raf){
    $(document).on('click','a',function(e){
            e.preventDefault();
    })
    $(document).ready(function(){
        // canvas动画begin
                var canvas = document.getElementById('bgAnimation');
                var header = $('#header');
                var ctx = canvas.getContext('2d');
                var bubbles = [],n = 0;
                var ctxH = header.height();
                var ctxW = header.width();
                canvas.height = ctxH;
                canvas.width = ctxW;
                function randomRange(min,max,dec){
                    return parseFloat(((max-min)*Math.random()+min).toFixed(dec || 2));
                }        
                function drawArc(){
                        ctx.clearRect(0,0,ctxW,ctxH);
                        for(let i = 0;i<bubbles.length;i++){
                            var bubble = bubbles[i];
                            if(bubble.y > ctxH*0.7){
                                var color = bubble.color;
                                var temp = color.slice(0,color.lastIndexOf(',')+1);
                                color = temp + bubble.opacity + ')';
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.arc(bubble.x,bubble.y,bubble.r,0,Math.PI*2,true);
                                ctx.fill();
                                bubble.y = bubble.y + bubble.v;
                                bubble.r = bubble.r < 2 ? 2 : bubble.r*randomRange(0.998,0.9998,5);
                                bubble.opacity = bubble.opacity*0.988;
                            }else{
                                bubbles.splice(i,1);
                            }
                        }
                }
                function creatArc(){
                    var count = randomRange(0,10,0)
                    for(let i = 0;i < count;i++){
                        bubbles.push({
                            x : randomRange(0,ctxW,0),
                            y : ctxH+10,
                            r : randomRange(2,8),
                            v : randomRange(-0.6,-0.1,3),
                            color :　'rgba(200,200,200,1)',
                            opacity : randomRange(0.8,1)
                        });
                    }
                }
                creatArc();
                (function animate(){
                    requestAnimationFrame(animate);
                    if(n == 25){
                        creatArc();
                        n = 0;
                    }
                    n++;
                    drawArc();
                })()
                
        // canvas动画end
        var $nav = $('#nav');
        $nav.on('click','li',function(e){
            var $this = $(this);
            if(!$this.hasClass('currentView')){
                $('.currentView').removeClass('currentView');
                $this.addClass('currentView');
            }
        });
        
        $nav.on('click','.link',function(e){
            var src = $(this).find('a').attr('href');
            $('#content').attr({src:src});
            $('#header').css({'width':'20%',transition:'width .5s'});
            $('#container').css({width:'80%',transition:'width .5s'});
            $('.local i,.local span').css({'font-size':'14px'});
        });
        $('.home').click(function(e){
            if(!$(this).hasClass('currentView')){
                e.preventDefault();
                $('#content').attr({src:'articles/recent.html'});
                $('#header').css({'width':'25%',transition:'width .5s'});
                $('#container').css({width:'75%',transition:'width .5s'});
                $('.local i,.local span').css({'font-size':'18px'});
            }
        });
    })
})