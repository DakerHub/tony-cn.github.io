require(['detail','jquery'], function(detail,$){  
$(document).ready(function(){
    // 初始化页面
    var search = location.search;
    if(search){
        var src = search.substring(search.indexOf('=')+1);
        $('#content').attr({src:src});
        $('#contentWrapper').css({display:'block'}).addClass('show').removeClass('hidden');
        $('#goBack').css({display:'inline-block'});
        $('#list').css({display:'none'}).addClass('hidden').removeClass('show');
    }
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
    //绑定分类逻辑
    $('#chase').click(function(){
        var sortBody = $('#sort_body');
        var sortArr = [] , htmlStr = '';
        //解析分类选项begin
        var $order = sortBody.find('[name="order"]:checked');
        var $range = sortBody.find('[name="recent"]:checked');
        var $activeTags = sortBody.find('.sort-tag-active');
        var $tagListWrapper = $('#tag-list-wrapper');
        sortObj.order = $order.attr('class');
        sortObj.range = $range.attr('class');
        $activeTags.each(function(){
            sortObj.tags.push($(this).find('.sort-tag-name').text());  
        });
        //解析分类选项end

        //根据分类选项渲染begin
        var newArticle = detail.methods.articleFilter(atcArr,sortObj);
        $articles.empty();
        $tagListWrapper.empty();
        if(newArticle.length == 0){
            $articles.append($('<p calss="warn">没有匹配项，请重新进行选择！</p>'))
        }else{
            $.each(newArticle,function(index,item){
                detail.methods.composeArticle($articles,item.title,item.sketch,item.time,item.src,item.tags);
            })
        }
        if($('#list').hasClass('hidden')){
            $('#contentWrapper').css({display:'none'});
            $('#list').css({display:'block'});
        }
        if($order.next().text()){
            sortArr.push($order.next().text());
        }
        if($range.next().text()){
            sortArr.push($range.next().text());
        }
        if(sortObj.tags){
            sortArr = sortArr.concat(sortObj.tags);
        }
        for(let i = 0;i<sortArr.length;i++){
            htmlStr += '<div class="tag-list"><i class="iconfont">&#xe751</i><span>'+ sortArr[i] +'</span></div>'; 
        }
        $tagListWrapper.append($(htmlStr));
        //根据分类选项渲染end
        sortObj = {
                order : '',
                range : '',
                tags : []
            };
    });
    $('#chaseAll').click(function(){
        $articles.empty();
        $('#tag-list-wrapper').empty().append($('<div class="tag-list"><i class="iconfont">&#xe751</i><span>全部</span></div>'));
        $('.sort-tag-active').removeClass('sort-tag-active');
        $('[name="order"]:checked').prop({checked:false})
        $('[name="recent"]:checked').prop({checked:false})
        $.each(atcArr,function(index,item){
            detail.methods.composeArticle($articles,item.title,item.sketch,item.time,item.src,item.tags);
        })
        if($('#list').hasClass('hidden')){
            $('#contentWrapper').css({display:'none'});
            $('#list').css({display:'block'});
        }
    })
    //文章链接的渐进增强
    $(document).on('click','.toArticle',function(e){
        e.preventDefault();
        var src = e.target.href;
        $('#content').attr({src:src});
        $('#contentWrapper').css({display:'block'}).addClass('show').removeClass('hidden');
        $('#goBack').css({display:'inline-block'});
        $('#list').css({display:'none'}).addClass('hidden').removeClass('show');
    });
    $('#goBack').click(function(e){
        $(this).css({display:'none'});
        $('#contentWrapper').css({display:'none'}).addClass('hidden').removeClass('show')
        $('#list').css({display:'block'}).addClass('show').removeClass('hidden');
        document.getElementById("content").height = 0;
    })
})
});