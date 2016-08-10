$(document).ready(function(){
	var pageNum = 1;
    $('#more-pics').click(function(e){
          e.preventDefault();
          console.log(1);
          var $this = $(this);
          var url = $(this).attr('href');
          if(url){
              $.get(url,function(data){
                  $('#gallery').append(data);
              });
              pageNum++;
              $this.attr({href:'pages/'+pageNum+'.html'});
          }
    });

 

          
});