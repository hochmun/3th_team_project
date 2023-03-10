/* 유효성 검사 */
let id_db = "";
let id_check = false; //아이디  체크 변수
let isCheckId = function(){
	let isID = /^[a-z0-9]{3,20}$/;
	let user_id = $('#user_id').val();

	if (id_db != $('input[name=user_id]').val()) {
		id_db = $('input[name=user_id').val();
		$('#id_info').css('display','none');
		if(!isID.test(user_id)){
			id_check = false;
			// 길이와 허용 문자를 체크한다.
			$('#id_unable').text('사용할 수 없는 아이디 입니다.');
			$('#id_able').css('display','none');
			$("#id_tip_msg").css('display','none');
			$('#id_unable').css('display','block');
		}else if(user_id.search(/\s/) != -1){
			id_check = false;
			//공백
			$('#id_unable').text('사용할 수 없는 아이디 입니다.');
			$('#id_able').css('display','none');
			$("#id_tip_msg").css('display','none');
			$('#id_unable').css('display','block');
		}else{
			/* //중복확인
			$.post('/member/registerAjax?action=checkId',{'user_id' : user_id},function(data){
				let obj = jQuery.parseJSON(data);
				if(obj.resultCode == '0'){
					if(obj.memberCount > 0 ){
						id_check = false;
						//중복
						$('#id_unable').text('이미 사용중인 아이디 입니다.');
						$('#id_able').css('display','none');
						$("#id_tip_msg").css('display','none');
						$('#id_unable').css('display','block');
					}else{
						id_check = true;
						//성공
						$('#id_unable').css('display','none');
						$("#id_tip_msg").css('display','none');
						$('#id_able').css('display','block');
					}
				}else{
					id_check = false;
					$('#id_unable').text(obj.resultMsg);
					$('#id_able').css('display','none');
					$("#id_tip_msg").css('display','none');
					$('#id_unable').css('display','block');
				}
			});
		}
		id_db = user_id;
	} else {

	}
	setTimeout("isCheckId()", 2000);
	*/
}
