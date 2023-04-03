
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
/* 약관 스크롤 /////////////////////////
const scroll1 = document.querySelectorAll('#scroll1'); <!--이용약관 스크롤-->
const scroll2 = document.querySelectorAll('#scroll2'); <!--개인정보처리방침 스크롤-->
const serviceAgreeCheckbox = document.getElementById('service_agree');
const personalAgreeCheckbox = document.getElementById('personal_agree');
scroll1.forEach((scroll) => {
  scroll.addEventListener('scroll', () => {
    // 스크롤바 위치가 맨 아래인 경우에만 체크박스를 클릭할 수 있도록 처리
    if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight) {
      serviceAgreeCheckbox.disabled = false; // 체크박스 활성화
    } else {
      serviceAgreeCheckbox.disabled = true; // 체크박스 비활성화
    }
  });
});
scroll2.forEach((scroll) => {
  scroll.addEventListener('scroll', () => {
    // 스크롤바 위치가 맨 아래인 경우에만 체크박스를 클릭할 수 있도록 처리
    if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight) {
      personalAgreeCheckbox.disabled = false; // 체크박스 활성화
    } else {
      personalAgreeCheckbox.disabled = true; // 체크박스 비활성화
    }
  });
});
*/

