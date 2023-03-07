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
	//$('#user_id').val('');
	$('#user_nick').val('');
	$('#dc_pw').val('');
	$('#dc_pwc').val('');
	$('#dc_name').val('');
	$('#birth_year').val('');
	$('#birth_month').val('');
	$('#birth_day').val('');
	$('#email1').val('');
	$('#email2').val('');
	$('#email_list').val('');

	id_check = true;

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
