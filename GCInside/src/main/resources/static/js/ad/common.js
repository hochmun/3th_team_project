$(function(){
    $(".gmenu_list li").eq(gMenu).addClass('on');
  });
  
  $(function(){
    $(".left_menu .one_depth").eq(lnbMenu).addClass('on').find('.two_depth li').eq(lnbSubMenu).addClass('on');
  });
  

  
  function toggleLyr(type){
      if($('.'+type+'_lyr').css('display') == 'none') {
          $('.'+type+'_lyr').show();
      }else{
          $('.'+type+'_lyr').hide();
      }
  }
  $(document).on('mouseup', function(e){
      if(!$(e.target).hasClass('company_box') && !$(e.target).parents().hasClass('company_box') ) $('.business_lyr').hide();  	
  });
  