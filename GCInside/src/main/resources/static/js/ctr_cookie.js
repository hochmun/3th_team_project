/* 기존에 있던 쿠키 생성 */
/* 이걸 지워서 콘솔에 set_cookie오류 발생해서 다시 복구 */
function set_cookie(name, value, expirehours, domain) {

    var today = new Date();
    today.setTime(today.getTime() + (60*60*1000*expirehours));
    document.cookie = name + "=" + escape( value ) + "; path=/; domain=" + domain  +"; expires=" + today.toGMTString() + ";";
}

$(document).ready(function(){
    // 저장된 쿠키값을 가져와서 member_uid 칸에 넣어준다. 쿠키값 없으면 공백.
    var userLoginId = getCookie("userLoginId");
    $("input[name='member_uid']").val(userLoginId);

    // member_uid가 있는경우 아이디 저장 체크박스 체크
    if(userLoginId !== ""){
    	$("#checksaveid").prop("checked", true);
    }

    // 아이디 저장하기 체크박스 변경 이벤트
    $("#checksaveid").change(function() {
        if($(this).is(":checked")) { // 체크박스 체크됨
            var userLoginId = $("input[name='member_uid']").val();
            setCookie("userLoginId", userLoginId, 7); // 7일 동안 쿠키 보관
        } else { // 체크박스 해제됨
            deleteCookie("userLoginId"); // 쿠키 삭제
        }
    });
    // 체크박스 해제시 쿠키 삭제
    $("#checksaveid").click(function() {
      if(!$(this).is(":checked")){  // 체크 해제시
        deleteCookie("userLoginId");  // 쿠키 삭제
        $("input[name='member_uid']").val("");  // member_uid 값 공백 처리
      }
    });
    // 아이디 저장하기가 체크 된 상태에서, member_uid를 입력한 경우
    $("input[name='member_uid']").keyup(function(){
    	if($("#checksaveid").is(":checked")){  //checked true
            var userLoginId = $(this).val();
            setCookie("userLoginId", userLoginId, 7); // 7일 동안 쿠키 보관
        }else{
            deleteCookie("userLoginId");
            $("#checksaveid").prop("checked", false);
        }
    });

    if (getCookie("userLoginId")) {
        $("input[name='member_uid']").val(getCookie("userLoginId"));
        $("input[name='member_pass']").focus();
    }
});
// 쿠키 생성
function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString()) + "; path=/";
    document.cookie = cookieName + "=" + cookieValue;
}

// 쿠키 삭제
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString(); + "; path=/";
}

// 쿠키 가져오기
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

