$(()=>{

    // 게시글 갯수 선택 창 열기, 닫기
    $('.select_area').click(function(){
        const $layer = $('#listSizeLayer');

        if($layer.css('display') == 'none') $layer.show();
        else $layer.hide();

    })
})

// 상단 설정 열기
function setting_layer() {
	if($('#setting_list').css('display') != 'none') {
		$('#setting_list').hide();
		return false;
	}
	
	top_layer_all_hide();
	$('#setting_list').show();
	
}

// 갤러리 상단 레이어 전체 hide
function top_layer_all_hide() {
	if($('#gallery_info').length > 0) {
		$('#gallery_info').hide();
	}	
	$('#setting_list').hide();
	$('#user_block').hide();
	$('#headTail_lay').hide();
}

// 연관 갤러리
var open_relation = function(gall_no) {
	if($('#relation_popup').css('display') != 'none') {
		$('#relation_popup').hide();								// 레이어 팝업
		$('.gall_issuebox button.relate').removeClass('hide');		// 연관 갤러리 버튼
		return false;
	}
	
	if($('#relation_popup').attr('loaded')) {
		// 차단 설정 레이어 팝업 겹침
		if($('#user_block').index() >= 0 && $('#user_block').css('display') != 'none') {
			if(typeof(close_user_block) == 'function') {
				close_user_block();
			}
			else {
				$('#user_block').hide();
			}
		}
		
		$('#relation_popup').show();
		$('.gall_issuebox button.relate').addClass('hide');
		return false;
	}
	
}