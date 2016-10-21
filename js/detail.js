/*
{
                        title:"",
                        sketch:"",
                        time:"",
                        tags:[],
                        src:"../articles/"
                    }
*/                     
define(function(){
    return {
        articles : [{
                        title:"Vue官网教程学习-2",
                        sketch:"vue是一个github开源的JS框架，作为一个轻量级的MVVM框架，上手容易，学习周期不长。",
                        time:"2016/10/10",
                        tags:["前端","技术","vue"],
                        src:"../articles/2016/10/10/vue-course-2.html"
                    },
                    {
                        title:"Vue官网教程学习-1",
                        sketch:"vue是一个github开源的JS框架，作为一个轻量级的MVVM框架，上手容易，学习周期不长。",
                        time:"2016/10/9",
                        tags:["前端","技术","vue"],
                        src:"../articles/2016/10/9/vue-course-1.html"
                    },
                    {
                        title:"设计模式初学",
                        sketch:"Javascript设计模式入门读书笔记...",
                        time:"2016/9/20",
                        tags:["设计模式","技术"],
                        src:"../articles/2016/9/20/design-mode-1.html"
                    }
                ],
        methods : {
            composeArticle :　function($articles,title,sketch,time,src,tags){
                var str = '';
                var $article = $('<div class="article"></article>');
                str = '<div class="title_wrapper"><h3 class="title"><a href="'+src+'" class="toArticle">'+ title +'</a></h1></div>'
                var $title = $(str);
                str = '<div class="crossline"></div><div class="sketch_wrapper">\
                        <p class="sketch">'+ sketch +'</p></div><div class="crossline"></div>';
                var $sketch = $(str);
                str = '<div class="time_wrapper">\
                        <i class="iconfont">&#xe65e</i>\
                        <span class="time">'+ time +'</span></div>';
                var $time = $(str);
                str = '<div class="tags_wrapper"></div>';
                var $tags = $(str);
                // str = '<div class="link"><a href="'+src+'">阅读全文&gt;&gt;&gt;</a></div> <div class="clearfloat"></div>';
                // var $link = $(str);
                $.each(tags,function(i,n){
                    str = '<div class="tag_wrapper">\
                            <i class="iconfont">&#xe751</i>\
                            <span class="tag">'+ n +'</span></div>'
                    var $tag = $(str);
                    $tags.append($tag);
                })
                $article.append($title).append($sketch).append($time).append($tags);
                $articles.append($article);
            },
            composeTag : function($tag_wrapper,tags){
                var str = '';
                for(let i=0;i < tags.length;i++){
                    str = '<div class="sort-tag">\
                                <i class="iconfont">&#xe751</i>\
                                <span class="sort-tag-name">'+tags[i]+'</span>\
                           </div>';
                    $tag_wrapper.append($(str));
                }
            },
            isInclude : function(targetArr,keyArr){
                for(let i = 0;i<keyArr.length;i++){
                    if(targetArr.indexOf(keyArr[i]) == -1){
                        return false;
                    }
                }
                return true;
            },
            filterByDate : function(atcArr,range){
                var maxDate = new Date();
                maxDate.setTime(Date.now()-range*24*60*60*1000);
                atcArr = atcArr.filter(function(item,index,arr){
                    var publishDate = Date.parse(item.time.replace('/','-'));
                    return (maxDate.getTime() < publishDate)? true : false;
                });
                return atcArr;
            },
            filterByOrder : function(atcArr,order){
                atcArr.sort(function(before,after){
                    var beforeTime = Date.parse(before.time.replace('/','-'));
                    var afterTime = Date.parse(after.time.replace('/','-'));
                    return order == 'upOrder'? beforeTime - afterTime :　afterTime - beforeTime;
                })
                return atcArr;
            },
            filterByTag : function(atcArr,tags){
                var $this = this;
                atcArr = atcArr.filter(function(item,index,arr){
                    return $this.isInclude(item.tags,tags);
                });
                return atcArr;
            },
            articleFilter : function(atcArr,sortObj){
                if(sortObj.range){
                    var range;
                    switch(sortObj.range){
                        case '1Y' : range = 365;
                            break;
                        case '3M' : range = 90;
                            break;
                        case '1M' : range = 30;
                            break;
                        case '1W' : range = 7;
                    }
                    var atcArr = this.filterByDate(atcArr,range);
                }
                if(sortObj.tags.length > 0){
                    var atcArr = this.filterByTag(atcArr,sortObj.tags);
                }
                if(sortObj.order){
                    this.filterByOrder(atcArr,sortObj.order);
                }
                return atcArr;
            }
        },
        tags : ['前端','技术','nodeJS','git','vue','github','设计模式']
    };
});