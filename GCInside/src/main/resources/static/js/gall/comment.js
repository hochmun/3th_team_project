/** 2023/03/28 // 심규영 // 댓글 등록 함수 */
// 댓글 등록 함수
const commentWrite = function($this) {
    const no = $this.data("no"); // 게시물 번호
    const login_info = $this.data("login_info"); // 로그인 정보

    const comment_uid = $('#comment_uid').val(); // 회원 uid , 비회원 일 경우 undefined
    const comment_name = $('#comment_name').val(); // 비회원 uid, 회원 일 경우 undefined
    const comment_password = $('#comment_password').val(); // 비회원 pass, 회원 일 경우 undefined

    const comment_content = $('#comment_content').val(); // 댓글 내용

    // 유효성 검사
    if(login_info && comment_uid == "") { // 로그인 되어 있는데 uid 정보가 없을 경우
        return;
    }

    if(!login_info && (comment_name == "" || comment_password == "")) { // 로그인이 되어 있지 않을 때
        alert("닉네임 또는 비밀번호를 입력 하십시오.");
        return;
    }

    if(comment_content == "") { // 작성하는 댓글 내용이 없을 경우
        alert("내용을 작성 하십시오.");
        return;
    }

    if(no == "" || typeof no == 'undefined' || no == null) {
        return;
    }

    // jsonData 생성
    const jsonData = {
        "no":no,
        "login_info":login_info,
        "comment_uid":comment_uid,
        "comment_name":comment_name,
        "comment_password":comment_password,
        "comment_content":comment_content
    }

    // ajax 전송
    $.ajax({
        url:'/GCInside/gall/board/commentWrite',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        dataType:'json',
        success: function(data) {
            if(data.result > 0) {
                // 성공
                const $comment_li = $('#comment_sample').clone();

                $comment_li.attr('id','comment_li_'+data.commentVO.comment_num);

                if(data.commentVO.comment_login_status == 0) {
                    $comment_li.find('.nickname').attr('title', data.commentVO.comment_uid);
                    $comment_li.find('.nickname > em').text(data.commentVO.comment_uid);
                } else {
                    $comment_li.find('.nickname').attr('title', data.commentVO.comment_nonmember_name);
                    $comment_li.find('.nickname > em').text(data.commentVO.comment_nonmember_name);
                    $comment_li.find('.nickname > span.ip').text('('+data.commentVO.comment_regip_sub+')');
                    $comment_li.find('.writer_nikcon').html('');

                    $('#comment_name').val('');
                    $('#comment_password').val('');
                }

                $comment_li.find('.usertxt').text(data.commentVO.comment_content);
                $comment_li.find('.date_time').text(new Date().toISOString().replace('T',' ').slice(0, -5));

                $comment_li.show();

                $('.cmt_list').append($comment_li);

                $('#comment_content').val('');
            } else {
                // 실패
                alert('댓글 작성 실패');
            }
        }
    })
}