$(()=>{
    /** 2023/03/29 // 심규영 // 대댓글 등록 팝업창 띄우기 */
    $('.btn_reply_write_all').click(function(){
        const no = $(this).data("no"); // 대댓글 팝업 창을 여는 댓글 번호
        const $parent = $('#comment_li_'+no); // 부모 요소 가져오기

        // 대댓글이 없을 경우 대댓글 li 붙이기
        if($parent.data("rcnt") == 0) { // 대댓글 갯수가 0 일 경우
            const $non_comment = $('#re_comment_none_sample').clone(); // 샘플 복사
            $non_comment.attr('id','reply_empty_last_li_'+no); // id 변경
            $non_comment.find('.reply_list').attr('id','reply_list_'+no); // no 추가
            $non_comment.show();// display:none; 지우기
            $parent.after($non_comment); // 샘플 붙여 넣기
            $parent.data("rcnt", 1); // 대댓글 갯수 늘리기
        }

        if($('#reply_empty_'+no).length > 0) { // 대댓글 창이 있을 경우
            if($parent.data("rcnt") == 1) { // 대댓글 개수가 대댓글 작성 박스 하나 일 경우
                $('#reply_empty_last_li_'+no).remove();
                $parent.data("rcnt", 0); // 대댓글 갯수 줄이기
            } else { // 다른 대댓글이 있을 경우
                $('#reply_empty_'+no).remove(); // 대댓글 팝업 창만 지우기
            }
        } else { // 대댓글 창이 없을 경우

            const last_no = $('.reply_write_box').find('#cmt_write_box').data("no");
            if($('#comment_li_'+last_no).data("rcnt") == 1) {
                $('#reply_empty_last_li_'+last_no).remove();
                $('#comment_li_'+last_no).data("rcnt",0);
            } else {
                $('.reply_write_box').remove(); // 대댓글 작성 상자 만 닫기
            }

            // 대댓글 작성 박스 복사해서 붙이기
            const $reply_box = $('#reply_box_sample').clone(); // 대댓글 작성 박스 복사
            $reply_box.attr('id','reply_empty_'+no); // id 변경
            $reply_box.addClass('reply_write_box'); // 조작용 class 추가
            $reply_box.find('#cmt_write_box').data("no",no); // 대댓글을 작성하는 글번호 정보 남기기
            $reply_box.find('.reply_add').data("no", no);
            $reply_box.show(); // display:none; 지우기
            $('#reply_list_'+no).prepend($reply_box); // 대댓글 리스트 맨 앞에 대댓글 작성 박스 붙이기
        }

    });
});

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
                    $comment_li.find('.nickname').attr('title', data.commentVO.member_nick);
                    $comment_li.find('.nickname > em').text(data.commentVO.member_nick);
                    $comment_li.find('.ip').hide();
                    $comment_li.find('.writer_nikcon > img').attr('title', data.commentVO.comment_uid_sub+' : 갤로그로 이동합니다.');
                } else {
                    $comment_li.find('.nickname').attr('title', data.commentVO.comment_nonmember_name);
                    $comment_li.find('.nickname > em').text(data.commentVO.comment_nonmember_name);
                    $comment_li.find('.nickname > span.ip').text('('+data.commentVO.comment_regip_sub+')');
                    $comment_li.find('.writer_nikcon').html('');

                    $('#comment_name').val('');
                    $('#comment_password').val('');
                }

                $comment_li.find('.usertxt').text(data.commentVO.comment_content);
                $comment_li.find('.date_time').text(new Date(new Date().getTime() + (9*60*60*1000)).toISOString().replace('T',' ').slice(0, -5));

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

/** 2023/03/29 // 심규영 // 대댓글 등록 함수 */
const re_comment_write = function($this) {
    const no = $this.data("no"); // 댓글 번호
    const login_info = $this.data("login_info"); // 로그인 정보
    const article_num = $this.data("article_num"); // 게시물 번호

    const $parent = $('#reply_empty_'+no); // 대댓글 박스

    const re_comment_content = $parent.find('#reply_content').val(); // 대댓글 내용
    const re_comment_uid = $parent.find('#reply_uid').val();
    const re_comment_nonmember_name = $parent.find('#reply_name').val();
    const re_comment_nonmember_password = $parent.find('#reply_password').val();

    // 유효성 검사
    if(login_info && re_comment_uid == "") { // 로그인 되어 있는데 uid 정보가 없을 경우
        return;
    }

    if(!login_info && (re_comment_nonmember_name == "" || re_comment_nonmember_password == "")) { // 로그인이 되어 있지 않을 때
        alert("닉네임 또는 비밀번호를 입력 하십시오.");
        return;
    }

    if(re_comment_content == "") { // 작성하는 댓글 내용이 없을 경우
        alert("내용을 작성 하십시오.");
        return;
    }

    if(no == "" || typeof no == 'undefined' || no == null) {
        return;
    }

    // jsonData 작성
    const jsonData = {
        "re_comment_ori_num"            : no,
        "re_comment_article_num"        : article_num,
        "re_comment_content"            : re_comment_content,
        "login_info"                    : login_info,
        "re_comment_uid"                : re_comment_uid,
        "re_comment_nonmember_name"     : re_comment_nonmember_name,
        "re_comment_nonmember_password" : re_comment_nonmember_password
    }

    // ajax 전송
        $.ajax({
            url:'/GCInside/gall/board/reCommentWrite',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            dataType:'json',
            success: function(data) {
                if(data.result > 0) {
                    // 성공
                    alert('성공');
                } else {
                    // 실패
                    alert('실패!');
                }
            }
        });
}