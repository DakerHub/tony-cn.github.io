require(['detail','jquery'], function(detail,$){  
$(document).ready(function(){
    // 初始化页面
    var $articles = $('#articles');
    var atcArr = detail.articles;
    var $tag_wrapper = $('#sort_tag_body');
    var sortObj = {
            order : '',
            range : '',
            tags : []
        }
    $.each(atcArr,function(index,item){
        detail.methods.composeArticle($articles,item.title,item.sketch,item.time,item.src,item.tags);
    })

    detail.methods.composeTag($tag_wrapper,detail.tags);
    // 绑定标签切换事件
    $('.sort_head').on('click','.sort_title',function(){
        var $this = $(this);
        if(!$this.hasClass('currentSort')){
            $('.currentSort').removeClass('currentSort');
            $this.addClass('currentSort');
            if($this.attr('id')==='sort_time'){
                $('#sort_time_body').css({left:0,transition:'left 0.5s'});
                $('#sort_tag_body').css({left:'105%',transition:'left 0.5s'})
            }else{
                $('#sort_tag_body').css({left:0,transition:'left 0.5s'});
                $('#sort_time_body').css({left:'-105%',transition:'left 0.5s'})
            }
        };
    });
    $('.sort_tag_body').on('click','.sort-tag',function(){
        $(this).toggleClass('sort-tag-active');
    });
    $('#chase').click(function(){
        var sortBody = $('#sort_body');
        sortObj.order = sortBody.find('[name="order"]:checked').attr('class');
        sortObj.range = sortBody.find('[name="recent"]:checked').attr('class');
        var $activeTags = sortBody.find('.sort-tag-active');
        $activeTags.each(function(){
            sortObj.tags.push($(this).find('.sort-tag-name').text());  
        });
        var newArticle = detail.methods.articleFilter(atcArr,sortObj);
        $articles.empty();
        if(newArticle.length == 0){
            $articles.append($('<p calss="warn">没有匹配项，请重新进行选择！</p>'))
        }else{
            $.each(newArticle,function(index,item){
                detail.methods.composeArticle($articles,item.title,item.sketch,item.time,item.src,item.tags);
            })
        }
        sortObj = {
                order : '',
                range : '',
                tags : []
            };
    });
    $('#chaseAll').click(function(){
        $('.sort-tag-active').removeClass('sort-tag-active');
        $('[name="order"]:checked').prop({checked:false})
        $('[name="recent"]:checked').prop({checked:false})
        $.each(atcArr,function(index,item){
            detail.methods.composeArticle($articles,item.title,item.sketch,item.time,item.src,item.tags);
        })
    })
})
});