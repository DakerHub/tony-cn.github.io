require(['jquery'],function($){
$(document).ready(function(){
    var $nav = $('#nav');
    $nav.on('click','li',function(e){
        var $this = $(this);
        if(!$this.hasClass('currentView')){
            $('.currentView').removeClass('currentView');
            $this.addClass('currentView');
        }
    });
    $('#nav a').click(function(e){
        e.preventDefault();
    })
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