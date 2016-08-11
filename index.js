<<<<<<< HEAD
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

 

          
=======
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

 

          
>>>>>>> 08b4e49015a4fe54a1ca22d5a5ed9af1059c0897
});