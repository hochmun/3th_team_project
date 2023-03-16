
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


