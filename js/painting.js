define([
    'jquery'
], function($) {
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
    })
});