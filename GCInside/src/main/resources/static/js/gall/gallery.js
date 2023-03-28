$(()=>{

    // 게시글 갯수 선택 창 열기, 닫기
    $('.select_area').click(function(){
        const $layer = $('#listSizeLayer');

        if($layer.css('display') == 'none') $layer.show();
        else $layer.hide();

    })

    // 비밀 번호 입력 확인 버튼 클릭시
    $('#btn_ok').click(function(e){
		e.preventDefault();

        const id = $('#nm_id').val();
        const no = $('#nm_no').val();
        const pass = $('#nm_password').val();

        // json
        const jsonData = {"id":id,"no":no,"pass":pass}

        // ajax 전송
        $.ajax({
            url:'/GCInside/gall/board/nonmemberPassCheck',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            dataType:'json',
            success: function(data) {
                if(data.result > 0) {
                    // 성공
                    location.reload();
                } else {
                    // 실패
                    alert('비밀번호가 틀렸습니다.');
                }
            }
        })
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
var open_relation = function($this) {
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

// 상단 갤러리 정보 토글
const gt_toggle_issue = function(btn_elm) {
	if($('.issue_wrap .issuebox').hasClass('open')) {
		$('.issue_wrap .issuebox').removeClass('open');
		$(btn_elm).removeClass('open');
	}
	else {
		$('.issue_wrap .issuebox').addClass('open');
		$(btn_elm).addClass('open');
		
		//gt_recomAjax($.getURLParam("id"));
	}
}

// 페이지 리스트 이동 함수
const writeAndModifyPageHref = function($this) {
    const grade = $this.data("grade");
    const id = $this.data("id");
    location.href='/GCInside/'+grade+'/board/lists?id='+id;
}

// 페이지 이동 함수
const goModify = function($this) {
    const grade = $this.data("grade");
    const id = $this.data("id");
    const no = $this.data("no");
    location.href = '/GCInside/'+grade+'/board/modify/?id='+id+'&no='+no;
}

// 페이지 이동 함수
const goDelete = function($this) {
    const grade = $this.data("grade");
    const id = $this.data("id");
    const no = $this.data("no");
    location.href = '/GCInside/'+grade+'/board/delete/?id='+id+'&no='+no;
}