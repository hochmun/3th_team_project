/* 회원가입 이메일 리스트 클릭 */
let showLayer = function(obj, layerName){
	if($("#"+layerName).css("display") == "none"){
		$("#"+layerName).show();
	} else {
		$("#"+layerName).hide();
	}
}
/* 유효성 검사 */
//아이디
let id_check = false; //검증결과 상태변수 초기값
$(function(){
    let isID = /^(?=.*[a-z])[a-zA-Z0-9]{3,20}$/; // 대문자와 숫자는 단일로는 못쓰게 방지
    let member_uid = $('#member_uid').val();

    $("input[name='member_uid']").on('input', function(){
        id_check = false; // 아이디 입력중에는 검증결과 초기화
    });

    $("input[name='member_uid']").focusout(function(){
        let member_uid = $("input[name='member_uid']").val();

        if(!member_uid.match(isID)){
            id_check = false;
            $('#id_unable').text('사용할 수 없는 아이디 입니다.');
            $('#id_able').css('display','none');
            $("#id_tip_msg").css('display','none');
            $('#id_unable').css('display','block');
        }else if(member_uid.search(/\s/) != -1){ // 공백 허용 X
            id_check = false;
            $('#id_unable').text('사용할 수 없는 아이디 입니다.');
            $('#id_able').css('display','none');
            $("#id_tip_msg").css('display','none');
            $('#id_unable').css('display','block');
        } else {
            let jsonData = {"member_uid":member_uid};
            $.ajax({
                type : "GET",
                url : "/GCInside/member/checkUid",
                data : jsonData,
                success : function(data){
                    if(data.result === "success"){
                        id_check = true;
                        $('#id_able').text('사용가능합니다.');
                        $('#id_able').css('display','block');
                        $('#id_unable').css('display','none');
                        $("#id_tip_msg").css('display','none');
                    } else {
                        id_check = false;
                        $('#id_unable').text('사용할 수 없는 아이디 입니다.');
                        $('#id_able').css('display','none');
                        $("#id_tip_msg").css('display','none');
                        $('#id_unable').css('display','block');
                    }
                }
            });
        }
    });
});

//비밀번호
pw_check = false; //비밀번호체크
let isCheckPw= function(){
	let gc_pw = $('#gc_pw').val();
	let gc_pwc = $('#gc_pwc').val();
	let member_uid = $('#member_uid').val();
	let user_nick = $('#user_nick').val();
	let gc_pre = $('#pw_pre').val();

	let pattern = /^[^ ].*[^ ]$/;
	let pattern1 = /[0-9]/;
	let pattern2 = /[a-z]/;
	let pattern3 = /[~`!@#$%^&*()_+|=\-{}<>[\]?;:'",./]/;
	let pattern4 = /[A-Z]/; //대문자

	$('.step_box').removeClass('normal')
	$('.step_box').removeClass('safe')
	$('.step_box').removeClass('impossible')
	$('.tip3').css('display','none');
	$('.tip2').css('display','none');
	$('.tip4').css('display','none');
	$('.pw_tip .chkStr').removeClass('on')
	$('.pw_tip .chkLen').removeClass('on')
	$('.step_box .step_txt').html('');

    if(gc_pw == ''){
        return false;
    }
    if(gc_pre && gc_pre == gc_pw){
        $('.step_box').addClass('impossible')
        $('.step_box .step_txt').html('사용 불가');
        $('.tip4').css('display','block');
        pw_check = false;
        return false;
    }

    if(gc_pwc && gc_pw == gc_pwc)	$('.tip1').css('display','none')

    if(gc_pw == member_uid || gc_pw == user_nick){
        $('.step_box').addClass('impossible')
        $('.step_box .step_txt').html('사용 불가');
        $('.tip2').css('display','block');
        pw_check = false;
        return false;
    }

    if(!pattern1.test(gc_pw) || !pattern2.test(gc_pw) || !pattern3.test(gc_pw)){
        $('.pw_tip .chkStr').removeClass('on')
    }else{
        $('.pw_tip .chkStr').addClass('on')
    }
    if(gc_pw.length < 8 || gc_pw.length > 20){
        $('.pw_tip .chkLen').removeClass('on')
    }else{
        $('.pw_tip .chkLen').addClass('on')
    }

    if(!pattern1.test(gc_pw) || !pattern2.test(gc_pw) || !pattern3.test(gc_pw) || !pattern.test(gc_pw) || gc_pw.length < 8 || gc_pw.length > 20){

        $('.step_box').addClass('impossible')
        $('.step_box .step_txt').html('사용 불가');

        if(chkContinue(gc_pw))	$('.tip3').css('display','block');
        pw_check = false;

    }else{

        if(chkContinue(gc_pw)){

            $('.tip3').css('display','block');
            $('.step_box').addClass('impossible')
            $('.step_box .step_txt').html('사용 불가');
            pw_check = false;

        }else if(pattern4.test(gc_pw)){

            $('.step_box').addClass('safe')
            $('.step_box .step_txt').html('안전');
            pw_check = true;
        }else{

            $('.step_box').addClass('normal')
            $('.step_box .step_txt').html('보통');
            pw_check = true;
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//비밀번호확인체크
//////////////////////////////////////////////////////////////////////////////////////////////////////////
let isCheckPwc= function() {
	let gc_pwc = $('#gc_pwc').val();
	let gc_pw = $('#gc_pw').val();

	if(gc_pw == gc_pwc){
		$('.tip1').css('display','none')
	}else{
		$('.tip1').css('display','block')
	}
	if(gc_pwc == ''){
		$('.tip5').css('display','block')
		$('.tip1').css('display','none')
	}else{
		$('.tip5').css('display','none')
	}
};
function chkContinue(gc_pw){   //연속된 문자, 숫자 체크(3자리)
	 let cnt = 0;
	 let cnt2 = 0;
	 let tmp = "";
	 let tmp2 = "";
	 let tmp3 = "";
	 let same_str = 'N';

	 for(i=0; i<gc_pw.length; i++){
		 tmp = gc_pw.charAt(i);
		 tmp2 = gc_pw.charAt(i+1);
		 tmp3 = gc_pw.charAt(i+2);

		  if(tmp.charCodeAt(0) - tmp2.charCodeAt(0) == 1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) == 1){
			  cnt = cnt + 1;
		  }
		  if(tmp.charCodeAt(0) - tmp2.charCodeAt(0) == -1 && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) == -1){
			  cnt2 = cnt2 + 1;
		  }

		  if(tmp.charCodeAt(0) == tmp2.charCodeAt(0) && tmp2.charCodeAt(0) == tmp3.charCodeAt(0)){
			  same_str = 'Y';
		  }
	 }
	 if(cnt > 0 || cnt2 > 0 || same_str == 'Y'){//사용불가
		 return true;
	 }else{
		 return false;
	 }
}
// 닉네임
let nick_db = "";
let nick_check = false; //닉네임체크변수
let is_char = 1; // 공백유무
let isCheckNick = function(){
	let user_nick = $('#user_nick').val();
    if (nick_db != $('input[name=user_nick]').val()) {
        nick_db = $('input[name=user_nick').val();
        $('#nick_info').css('display','none');
        if(user_nick.length < 2 || user_nick.length > 20 ){ // 닉네임 글자수
            nick_check = false;
            // 길이 체크
            $('#nick_able').css('display','none');
            $('#nick_unable').css('display','block');
        }else if(user_nick.substr((user_nick.length-1),1) == '\\'){
            nick_check = false;
            //역슬러시 제한
            $('#nick_able').css('display','none');
            $('#nick_unable').css('display','block');
        }else{
            len = user_nick.length;
            for(let i=0; i<len; i++) {
                // 한문공백문자의 charCode값은 32
                if(user_nick.charCodeAt(i) == 32){
                    $('#nick_able').css('display','none');
                    $('#nick_unable').css('display','block');
                    is_char = 0;
                    break;
                }else{
                    is_char = 1;
                }
            }
            if(user_nick && is_char){
                nick_check = true
                $('#nick_able').css('display','block');
                $('#nick_unable').css('display','none');
            }
        }
    }
}
//
let mailList = function(){
	let email_list = $('#email_list').val();
	if (email_list!="" && email_list =="self") {
		$('#email2').val('');
	}else if(email_list!="" && email_list=="inst") {	//직접입력
		$('#email2').val('');
		$('#email2').attr('readOnly',false);
		$('#email2').focus();
		//이메일 직접입력 체크
		$("#email2").keyup(function(){});
	}else{
		$('#email2').attr('readOnly',true);
		$('#email2').val(email_list);
	}
}
// 이메일 인증코드 전송
let codeSend = function() {
    let email1 = jQuery.trim($('#email1').val());			//이메일
	if(typeof(email1) == 'undefined' || email1 == '') {
		alert('이메일을 입력해 주세요.');
		$('#email1').focus();
		return false;
	}
	let email2 = jQuery.trim($('#email2').val());			//이메일
	if(typeof(email2) == 'undefined' || email2 == '') {
		alert('이메일을 입력해 주세요.');
		$('#email2').focus();
		return false;
	}
	let email = email1 + "@" + email2;
	$.ajax({
        url: '/GCInside/member/sendEmailCode',
        type: 'POST',
        data: {email: email},
        success: function(response) {
            alert('인증코드가 전송되었습니다.');
        },
        error: function(error) {
            alert('인증코드 전송에 실패했습니다.');
        }
    });
}
// 이메일 인증코드값 확인
let AuthCode = function() {
    let code = jQuery.trim($('#code').val());  // 입력한 인증코드
    if(typeof(code) == 'undefined' || code == '') {
        alert('인증코드를 입력해 주세요.');
        $('#code').focus();
        return false;
    }
    $.ajax({
        url : '/GCInside/member/AuthCode',
        type : 'POST',
        data : {code : code},// 인증코드 값
        success : function(result) {
            if(result == 'success') {
                alert('인증되었습니다.'); // 인증 성공 시 처리할 코드 작성
            } else {
                alert('인증코드가 일치하지 않습니다.');
            }
        },
        error : function(xhr) {
            if(xhr.responseText == 'fail'){
                alert('인증코드가 일치하지 않습니다.');
            }else{
                alert('오류가 발생하였습니다.');
            }
        }
    });
}
// 폼 전송
function Recheck(){
    // 모든 필드가 채워져 있는지 확인
    let member_uid = $('#member_uid').val();
    let gc_pw = $('#gc_pw').val();
    let gc_pwc = $('#gc_pwc').val();
    let user_nick = $('#user_nick').val();
    let email1 = $('#email1').val();
    let email2 = $('#email2').val();
    let code = $('#code').val();

    if(member_uid == ""){alert('아이디를 입력해주세요.');return false;}
    if(gc_pw == ""){alert('비밀번호를 입력해주세요.');return false;}
    if(gc_pwc == ""){alert('비밀번호를 재입력해주세요.');return false;}
    if(user_nick == ""){alert('닉네임을 입력해주세요.');return false;}
    if(email1 == ""){alert('이메일을 입력해주세요.');return false;}
    if(email2 == ""){alert('이메일을 입력해주세요.');return false;}
    if(code == ""){alert('인증코드를 입력해주세요.');return false;}
    if(gc_pw != gc_pwc){alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');return false;}
    return true;
};

