/* 유효성 검사 */
let uid = "";
let id_check = false;
let isCheckId = function(){
    let isId = /^[a-z0-9]{3,20}$/;
    let user_id = $('#user_id').val();

    if(uid != $('input[name=user_id]').val()){
        uid = $('input[name=user_id]').val();
        $('#id_info').css('display', 'none');
        if(!isId.test(user_id)){
        id_check = false;
        //길이와 허용문자 체크
        $('#id_unable').text('사용할 수 없는 아이디 입니다.');
        $('#id_able').css('display', 'none');
        $('#id_tip_msg').css('display', 'none');
        $('#id_unable').css('display', 'block');
    }else if(user_id.search(\/s/) != -1){
        id_check = false;
        //공백
        $('#id_unable').text('사용할 수 없는 아이디 입니다.');
        $('#id_able').css('display', 'none');
        $('#id_tip_msg').css('display', 'none');
        $('#id_unable').css('display', 'block');
    }else{
        //중복확인
        let jsonData = {"user_id":user_id};
        $.ajax({
            url: '/GCInside/member/Check_id',
            method: 'get',
            data: jsonData,
            dataType: 'json',
            success: function(data){
                if(data.result==0){
                    id_check = true;
                    //중복
                    $('#id_unable').text('이미 사용중인 아이디 입니다.');
                    $('#id_able').css('display','none');
                    $("#id_tip_msg").css('display','none');
                    $('#id_unable').css('display','block');
                }else{
                    id_check = false;
                    //성공
                    $('#id_able').css('display','none');
                    $("#id_tip_msg").css('display','none');
                    $('#id_unable').css('display','block');
                }
            }
        });
    }
    }
}