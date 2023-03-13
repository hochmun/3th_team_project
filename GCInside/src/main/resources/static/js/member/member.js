
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
/* 회원가입 이메일 리스트 클릭 */
let showLayer = function(obj, layerName){
	if($("#"+layerName).css("display") == "none"){
		$("#"+layerName).show();
	} else {
		$("#"+layerName).hide();
	}
}
/* 이메일 리스트 선택시 자동입력 */
let mailList = function(){
	let email_list = $('#email_list').val();
	if (email_list!="" && email_list =="self") {
		$('#email2').val('');
	}else if(email_list!="" && email_list=="inst") {	//직접입력
		$('#email2').val('');
		$('#email2').attr('readOnly',false);
		$('#email2').focus();
		//이메일 직접입력 체크
		$("#email2").keyup(function(){
		});
	}else{
		$('#email2').attr('readOnly',true);
		$('#email2').val(email_list);
	}
}

/* 회원가입 폼 */
let formInit = function(){
	$('#user_id').focus();	//처음 focus
	//input창 초기화
	$('#gc_pw').val('');
	$('#gc_pwc').val('');
	$('#user_nick').val('');
	$('#email1').val('');
	$('#email2').val('');
	$('#email_list').val('');
    id_check = true;


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

