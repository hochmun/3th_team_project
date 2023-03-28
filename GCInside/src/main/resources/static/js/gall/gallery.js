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

/** 2023/03/28 // 심규영 // 댓글 등록 함수 */
// 댓글 등록 함수
const commentWrite = function($this) {
    const no = $this.data("no"); // 게시물 번호
    const login_info = $this.data("login_info"); // 로그인 정보

    const comment_uid = $('#comment_uid').val(); // 회원 uid , 비회원 일 경우 undefined
    const comment_name = $('#comment_name').val(); // 비회원 uid, 회원 일 경우 undefined
    const comment_password = $('#comment_password').val(); // 비회원 pass, 회원 일 경우 undefined

    const comment_content = $('#comment_content').val(); // 댓글 내용

    // 유효성 검사
    if(login_info && comment_uid == "") { // 로그인 되어 있는데 uid 정보가 없을 경우
        return;
    }

    if(!login_info && (comment_name == "" || comment_password == "")) { // 로그인이 되어 있지 않을 때
        alert("닉네임 또는 비밀번호를 입력 하십시오.");
        return;
    }

    if(comment_content == "") { // 작성하는 댓글 내용이 없을 경우
        alert("내용을 작성 하십시오.");
        return;
    }

    if(no == "" || typeof no == 'undefined' || no == null) {
        return;
    }

    // jsonData 생성
    const jsonData = {
        "no":no,
        "login_info":login_info,
        "comment_uid":comment_uid,
        "comment_name":comment_name,
        "comment_password":comment_password,
        "comment_content":comment_content
    }

    // ajax 전송
    $.ajax({
        url:'/GCInside/gall/board/commentWrite',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        dataType:'json',
        success: function(data) {

        }
    })

}

// 페이지 리스트 이동 함수
const writeAndModifyPageHref = function($this) {
    const grade = $this.data("grade");
    const id = $this.data("id");
    location.href='/GCInside/'+grade+'/board/lists?id='+id;
}

const goWrite = function($this) {
    const grade = $this.data("grade");
    const id = $this.data("id");
    location.href = '/GCInside/'+grade+'/board/write/?id='+id;
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