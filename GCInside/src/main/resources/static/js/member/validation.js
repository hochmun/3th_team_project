/* 유효성 검사 */
let id_db = "";
let id_check = false; //검증결과 상태변수
$(function(){
    let isID = /^[a-z0-9]{3,20}$/;
    let member_uid = $('#member_uid').val();

    $("input[name='member_uid']").keydown(function(){
        id_check = false;
    });

    $("input[name='member_uid']").focusout(function(){
        let member_uid = $("input[name='member_uid']").val();

        if(id_check) {
            return;
        }

        let jsonData = {"member_uid":member_uid};
        if(!member_uid.match(isID)){
            id_check = false;
            $('#id_unable').text('사용할 수 없는 아이디 입니다.');
            $('#id_able').css('display','none');
            $("#id_tip_msg").css('display','none');
            $('#id_unable').css('display','block');
        } else {
            $.ajax({
                type : "GET",
                url : "/GCInside/member/checkUid",
                data : jsonData,
                success : function(data){
                    if(data === "available"){
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
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    console.log("AJAX ERROR : ", jqXHR.responseText);
                }
            });
        }
    });
});
