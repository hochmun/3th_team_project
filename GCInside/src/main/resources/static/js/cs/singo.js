$(function(){
    //신고 faq
	$('#singo_faq').click(function () {
		if($('#singo_faq_txt').css('display') == 'none'){
			$('#singo_info_txt').hide();
			$('#singo_faq_txt').show();
			$('#singo_faq').addClass('on');
			$('#singo_info_box').addClass('faq');
		}else{
			$('#singo_faq_txt').hide();
			$('#singo_info_txt').show();
			$('#singo_faq').removeClass('on');
			$('#singo_info_box').removeClass('faq');
		}
		
	});

	$('.opt_list > li > a').click(function(){
	    const idx = $(this).data('idx');
	    alert('click!'+idx);
	})
});