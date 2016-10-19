require(['detail','jquery'], function(detail,$){  
$(document).ready(function(){
    var articles = $('#articles');
    var atcArr = detail.articles;
    if(atcArr.length > 4){
        atcArr.length = 4;
    }
    $.each(atcArr,function(index,item){
        detail.methods.composeArticle(articles,item.title,item.sketch,item.time,item.src,item.tags);
    });
})
});