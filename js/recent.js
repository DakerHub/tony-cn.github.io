require(['detail','jquery'], function(detail,$){  
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
    $('.toArticle').click(function(e){
        var $this = $(this);
        e.preventDefault();
        var ahref = e.target.href;
        location.href = encodeURI('../articles/articles.html?'+'href='+ahref+'&title='+$this.text());
        $('#home',window.parent.document).removeClass('currentView');
        $('#articles',window.parent.document).addClass('currentView');
        $('#header',window.parent.document).css({'width':'20%',transition:'width .5s'});
        $('#container',window.parent.document).css({width:'80%',transition:'width .5s'});
        $('.local i,.local span',window.parent.document).css({'font-size':'14px'});
    });
})
});