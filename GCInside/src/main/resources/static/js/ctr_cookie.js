// 쿠키생성
function set_cookie(name, value, expirehours, domain) {

    var today = new Date();
    today.setTime(today.getTime() + (60*60*1000*expirehours));
    document.cookie = name + "=" + escape( value ) + "; path=/; domain=" + domain  +"; expires=" + today.toGMTString() + ";";
}

