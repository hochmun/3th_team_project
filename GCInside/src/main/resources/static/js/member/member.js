
/* 약관동의 페이지*/
let agreeInit = function(){
    $('#policy_agree').click(function(){
        if(!$('input:checkbox[id="service_agree"]').is(":checked")){
            alert('서비스 이용약관에 동의해주세요.');
            return false;
        }
        if(!$('input:checkbox[id="personal_agree"]').is(":checked")){
            alert('개인정보처리방침에 동의해주세요.');
            return false;
        }
    });
}
/* 회원가입 폼 */
let formInit = function(){
	$('#member_uid').focus();	//처음 focus
	//input창 초기화
	$('#gc_pw').val('');
	$('#gc_pwc').val('');
	$('#user_nick').val('');
	$('#email1').val('');
	$('#email2').val('');
	$('#email_list').val('');

    // 비밀번호 체크
    $('#gc_pw').keyup(function(){
        isCheckPw();
    });

    // 비밀번호 재확인체크
    $('#gc_pwc').keyup(function(){
        isCheckPwc();
    });

    //닉네임체크
    $('#user_nick').keyup(function(e){
        let keyCode = e.keyCode;
        if(keyCode == '18' || keyCode == '220'){
            $('#user_nick').val('');
        }else{
            isCheckNick();
        }
    });

	//이메일 검사
	$("#email_host_lyr").click(function(e){
		let target = e.target;
		let email_host = $(target).attr('value');

		$("#email_list").val(email_host);

		if(email_host == 'self') {
			$("#email_sel_txt").text('이메일 선택');
		} else if(email_host == 'inst') {
			$("#email_sel_txt").text('직접 입력');
		} else {
			$("#email_sel_txt").text(email_host);
		}
		mailList();
	});
};
// 회원가입 폼 전송
let check = function(){
    e.preventDefault();
    let member_uid = $('#member_uid').val();
    let gc_pw = $('#gc_pw').val();
    let gc_pwc = $('#gc_pwc').val();
    let user_nick = $('#user_nick').val();
    let email1 = $('#email1').val();
    let email2 = $('#email2').val();

    // 모든 필드가 채워져 있는지 확인
    if(!member_uid || !gc_pw || !gc_pwc || !user_nick || !email1 || !email2){
        alert('입력하지않은 데이터가 없는지 확인해주세요.');
        return false;
    }

    // 비밀번호 확인
    if(gc_pw != gc_pwc){
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return false;
    }

    // 닉네임 유효성 검사
    if(user_nick.includes(' ')){
        alert('닉네임은 띄어쓰기를 할 수 없습니다.');
        return false;
    }

    // reCAPTCHA 검사
    if(!check_recaptcha()){
        return false;
    }

    // 모든 검사를 통과했다면 데이터베이스에 insert
    $.ajax({
        url: '/GCInside/member/register',
        type: 'post',
        data: {
            member_uid: member_uid,
            member_pass: gc_pw,
            member_nick: user_nick,
            member_email: email1 + '@' + email2,
        },
        success: function(response){
            // insert 성공시 처리
            alert('회원가입이 완료되었습니다.');
        },
        error: function(xhr, status, error){
            // insert 실패시 처리
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    });
};