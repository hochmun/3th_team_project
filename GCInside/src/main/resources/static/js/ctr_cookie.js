$(document).ready(function(){
    // 저장된 쿠키값을 가져와서 member_uid 칸에 넣어준다. 쿠키값 없으면 공백.
    var userLoginId = getCookie("userLoginId");
    $("input[name='member_uid']").val(userLoginId);

    // member_uid가 있는경우 아이디 저장 체크박스 체크
    if($("input[name='member_uid']").val() != ""){
    	$("#checksaveid").attr("checked", true);
    }

    // 아이디 저장하기 체크박스 onchange
    $("#checksaveid").change(function(){
    	if($("#checksaveid").is(":checked")){  //checked true
        	var userLoginId = $("input[name='member_uid']").val();
            setCookie("userLoginId", userLoginId, 7); // 7일 동안 쿠키 보관
         }else{ //checked false
         	deleteCookie("userLoginId");
        }
    });

     // 아이디 저장하기가  눌린상태에서, member_uid를 입력한 경우
     $("input[name='member_uid']").keyup(function(){
     	if($("#checksaveid").is(":checked")){  //checked true
            var userLoginId = $("input[name='member_uid']").val();
            setCookie("userLoginId", userLoginId, 7); // 7일 동안 쿠키 보관
        }
    });

})
// 쿠키 생성
function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

// 쿠키 삭제
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
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
    return decodeURI(cookieValue);
}

