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

document.addEventListener("DOMContentLoaded", function() {
    const darkModeCookie = getCookie("darkmode");
    if (darkModeCookie !== null && darkModeCookie === "1") {
        const body = document.querySelector('html');
        body.classList.add('darkmode');
        /* 페이지이동시 콘솔창 오류가 계속떠서 주석처리
        const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'dark.css';
          document.body.appendChild(link);*/
    }
});

function toggleDarkMode() {
    const body = document.querySelector('html');
    if (body.classList.contains('darkmode')) {
        body.classList.remove('darkmode');
        setCookie("darkmode", "0", 7);
    } else {
        body.classList.add('darkmode');
        setCookie("darkmode", "1", 7);
        // 기본 스타일시트보다 dark.css를 먼저 적용시키는 코드
        const linkEl = document.querySelector('link[href="dark.css"]');
        if (linkEl) {
            linkEl.parentNode.insertBefore(linkEl, linkEl.parentNode.firstChild);
        }
    }
}

function get_cookie(e) {
    for (var t = e + "=", o = document.cookie.split(";"), i = 0; i < o.length; i++) {
        for (var n = o[i]; " " == n.charAt(0); )
            n = n.substring(1);
        if (0 == n.indexOf(t))
            return n.substring(t.length, n.length)
    }
    return ""
}
