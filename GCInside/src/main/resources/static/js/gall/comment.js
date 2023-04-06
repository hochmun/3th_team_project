$(()=>{
    /** 2023/04/05 // 심규영 // 글 보기 처음 로딩시 댓글 목록 처리 */
    commentPageMove(1);
});

/** 2023/04/06 // 심규영 // 게시글 추천 및 비추천 클릭 함수 */
const reCommendClick = ($this, type) => {
    const article_num = $('#no').val();
    const articlel_gell_num = $('#gell_num').val();

    // jsonData
    const jsonData = {
        "article_num":article_num,
        "articlel_gell_num":articlel_gell_num,
        "type":type
    }

    //ajax
    $.ajax({
            url:'/GCInside/gall/board/setRecommendArticle',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            dataType:'json',
            success: function(data) {
                console.log(data);
                console.log(data.result2);

                if(data.result1 > 0) {
                    if(type == 0) alert('추천은 1일 1회만 가능합니다.');
                    if(type == 1) alert('비추천은 1일 1회만 가능합니다.');
                }

                if(data.result2 != 'undefined' && data.result2 > 0) { // 추천, 비추천 성공
                    if(type == 0){ // 추천 일 경우
                        // 추천 값 동적 증가
                        $('#recommend_view_up').text(parseInt($('#recommend_view_up').text())+1); // 추천 수 증가
                        $('.gall_reply_num').text('추천 ' + $('#recommend_view_up').text()); // 페이지 상단 추천 수 증가
                        if(data.login_type == '0') $('#recommend_view_up_fix').text(parseInt($('#recommend_view_up_fix').text())+1); // 회원 추천 수 증가
                    } else { // 비추천 일 경우
                        // 비추천 값 동적 증가
                        $('#recommend_view_down').text(parseInt($('#recommend_view_down').text())+1); // 추천 수 증가
                    }
                }

                if(data.result2 != 'undefined' && data.result2 == 0) { // 실패
                    alert('오류!');
                }
            }
        })
}

/** 2023/04/05 // 심규영 // 글 순서 선택 함수 */
function comment_type_select($this) {
    const sort = $this.data('sort'); // 정렬 값 가져오기
    const sortName = $this.text(); // 정렬 이름 가져오기

    $('#commentSortLayer').hide(); // 정렬 선택창 닫기

    $('#comment_sort_txt').data('sort',sort).text(sortName); // 선택 값 변경

    commentPageMove(1); // 1 페이지 로 새로고침
}

/** 2023/03/29 // 심규영 // 대댓글 등록 팝업창 띄우기 */
/** 2023/04/02 // 심규영 // 대댓글 작성창 오류 fix */
const recommentWriteBoxOpen = function($this) {
    const no = $this.data("no"); // 대댓글 팝업 창을 여는 댓글 번호
    const $parent = $('#comment_li_'+no); // 부모 요소 가져오기

    // 대댓글이 없을 경우 대댓글 li 붙이기
    if($parent.data("rcnt") == 0) { // 대댓글 갯수가 0 일 경우
        const $non_comment = $('#re_comment_none_sample').clone(); // 샘플 복사
        $non_comment.attr('id','reply_empty_last_li_'+no); // id 변경
        $non_comment.find('.reply_list').attr('id','reply_list_'+no); // no 추가
        $non_comment.show();// display:none; 지우기
        $parent.after($non_comment); // 샘플 붙여 넣기
        //$parent.data("rcnt", 1); // 대댓글 갯수 늘리기
    }

    if($('.reply_write_box').length > 0) { // 대댓글 창이 있을 경우
        const last_no = $('.reply_write_box').find('#cmt_write_box').data("no"); // 대댓글 창이 있는 댓글 번호 가져오기

        if($('#comment_li_'+last_no).data("rcnt") == 1) { // 해당 댓글의 대댓글이 대댓글 입력 참 뿐일 경우
            $('#reply_empty_last_li_'+last_no).remove();
            $('#comment_li_'+last_no).data("rcnt",0);
        } else { // 다른 댓글이 있을 경우
            $('.reply_write_box').remove(); // 대댓글 작성 상자 만 닫기
            $('#comment_li_'+last_no).data("rcnt",$('#comment_li_'+last_no).data("rcnt") - 1); // 대댓글 갯수 빼기
        }

        if(last_no == no) { // 대댓글 창 번호가 댓글 번호가 같을 경우
            return; // 대댓글 작성 박스 생성 안함
        }

    }

    // 대댓글 작성 박스 복사해서 붙이기
    const $reply_box = $('#reply_box_sample').clone(); // 대댓글 작성 박스 복사
    $reply_box.attr('id','reply_empty_'+no); // id 변경
    $reply_box.addClass('reply_write_box'); // 조작용 class 추가
    $reply_box.find('#cmt_write_box').data("no",no); // 대댓글을 작성하는 글번호 정보 남기기
    $reply_box.find('.reply_add').data("no", no);
    $reply_box.show(); // display:none; 지우기
    $('#reply_list_'+no).prepend($reply_box); // 대댓글 리스트 맨 앞에 대댓글 작성 박스 붙이기
    $('#comment_li_'+no).data("rcnt",$('#comment_li_'+no).data("rcnt") + 1); // 대댓글 갯수 증가
}

/** 2023/03/28 // 심규영 // 댓글 등록 함수 */
/** 2023/04/04 // 심규영 // 댓글 동적 등록시 이벤트 실행 에러 해결 */
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
                const $comment_li = setComment_box(data.commentVO);

                // 댓글 동적 등록
                $('.cmt_list').append($comment_li);

                // 동적 댓글 등록 전 현제 페이지가 1이 아닐 경우 1페이지로 돌아가기
                if($('#cmt_paging > em').text != '1') commentPageMove(1);

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
                // 댓글 작성 창 닫기
                $('#comment_li_'+no+' .btn_reply_write_all').click();

                //대댓글 리스트 있는지 확인
                if($('#reply_list_'+no).length == 0) { // 대댓글을 담을 li가 있는지 확인
                    // 없을 경우 li 만들기
                    const $re_comment_li = $('#re_comment_none_sample').clone();
                    $re_comment_li.attr('id',''); // id 지우기
                    $re_comment_li.attr('style',''); // display 지우기
                    $re_comment_li.find('.reply_list').attr('id','reply_list_'+no); // reply_list Class 에 id 생성
                    $('#comment_li_'+no).after($re_comment_li); // 해당 댓글의 뒤쪽에 붙이기
                }

                // 존재하는 li에 또는 만들어진 li에 댓글 동적 등록 하기
                const $re_comment = $('#re_comment_sample').clone(); // 샘플 복사
                $re_comment.attr('id','reply_li_'+data.commentVO.re_comment_num); // id 변경
                $re_comment.attr('style',''); // display:none; 지우기

                // 데이터 채우기
                $re_comment.find('.reply_info').data('no',data.commentVO.re_comment_num);

                if(data.commentVO.re_comment_login_status == 0) {// 회원일 경우
                    $re_comment.find('.gall_writer').data('nick',data.commentVO.member_nick); // 회원 일 경우 닉네임
                    $re_comment.find('.gall_writer').data('uid',data.commentVO.re_comment_uid); // 회원 uid
                    $re_comment.find('.nickname').attr('title',data.commentVO.member_nick);
                    $re_comment.find('.nickname > em').text(data.commentVO.member_nick);
                } else { // 비회원
                    $re_comment.find('.gall_writer').data('name',data.commentVO.re_comment_nonmember_name); // 비회원 name
                    $re_comment.find('.gall_writer').data('ip',data.commentVO.re_comment_regip); // 비회원 ip
                    $re_comment.find('.nickname').attr('title',data.commentVO.re_comment_nonmember_name);
                    $re_comment.find('.nickname > em').text(data.commentVO.re_comment_nonmember_name);
                    $re_comment.find('.ip').text('('+data.commentVO.re_comment_regip_sub+')');
                }

                $re_comment.find('.usertxt').text(data.commentVO.re_comment_content);// 대댓글 내용
                $re_comment.find('.date_time').text(new Date(new Date().getTime() + (9*60*60*1000)).toISOString().replace('T',' ').slice(0, -5));// 대댓글 작성 시간

                // 대댓글 동적 입력
                $('#reply_list_'+no).append($re_comment);
            } else {
                // 실패
                alert('실패!');
            }
        }
    });
}

/** 2023/04/05 // 심규영 // 댓글 목록 페이지 이동시 댓글 및 대댓글 출력 */
const commentPageMove = async function(pg){
    // 댓글 목록 지우기
    $('#cmt_list').html('');
    const article_num = $('#cmt_list').data('article_no');
    const type = $('#comment_sort_txt').data('sort');

    // 댓글 페이징 처리
    const pagingDTO = await comment_papging(pg);

    // 댓글 받아오기
    const data = await getCommentLists(pagingDTO.start,article_num,type);

    // 댓글 출력
    await setCommentLists(data);

    // 댓글 맨 위로 이동
    //location.href = '#focus_cmt';
}

/** 2023/04/04 // 심규영 // 댓글 리스트 출력 함수 */
async function setCommentLists(data){
    for(const commentVO of data.commentLists.commentVOS){ // 댓글 반복 출력
        if(commentVO.comment_type == 0) { // 댓글 타입이 댓글 일때
            // 댓글 붙이기
            const $comment_li = setComment_box(commentVO);

            $('#cmt_list').append($comment_li); // 댓글 추가

            // 대댓글이 있을 경우
            if(commentVO.comment_re_count > 0) {
                const $re_comment_none = $('#re_comment_none_sample').clone(); // 대댓글 커버 샘플 복사

                $re_comment_none.attr('id',''); // id 지우기
                $re_comment_none.show(); // display:none; 지우기
                $re_comment_none.find('.reply_list').attr('id','reply_list_'+commentVO.comment_num);

                for(const reCommentVO of data.commentLists.reCommentVOS){ // 대댓글 반복
                    if(reCommentVO.comment_num == commentVO.comment_num) { // 대댓글의 부모 번호와 댓글의 번호가 같을 경우에만 출력
                        const $re_comment_box = setRe_comment_box(reCommentVO);

                        $re_comment_none.find('.reply_list').append($re_comment_box); // 대댓글 입력
                    }
                }
                $('#cmt_list').append($re_comment_none); // 대댓글 리스트 입력
            }
        } else { // 댓글 타입이 대댓글 일때
            const $re_comment_none = $('#re_comment_none_sample').clone(); // 대댓글 커버 샘플 복사

            $re_comment_none.attr('id',''); // id 지우기
            $re_comment_none.show(); // display:none; 지우기
            $re_comment_none.find('.reply_list').attr('id','reply_list_'+commentVO.comment_num);

            for(const reCommentVO of data.commentLists.reCommentVOS) {
                if(reCommentVO.comment_num == commentVO.comment_num) {
                    const $re_comment_box = setRe_comment_box(reCommentVO);
                    $re_comment_none.find('.reply_list').append($re_comment_box);
                }
            }

            $('#cmt_list').append($re_comment_none);
        }
    }
}

/** 2023/04/05 // 심규영 // 댓글 추가 함수 */
function setComment_box(commentVO){
    const $comment_li = $('#comment_sample').clone(); // 댓글 샘플 복제
    $comment_li.attr('id','comment_li_'+commentVO.comment_num); // 아이디 입력
    $comment_li.data('rcnt',commentVO.comment_re_count); // 대댓글 갯수 입력
    $comment_li.show(); // display:none; 제거
    $comment_li.find('.btn_reply_write_all').click(function(){recommentWriteBoxOpen($(this));}); // 클릭 이벤트 함수 등록

    $comment_li.find('.cmt_info').data('no', commentVO.comment_num);
    $comment_li.find('.cmt_info').data('article-no', commentVO.comment_article_num);

    if(commentVO.comment_login_status == 1) { // 댓글 작성자가 비회원 일 경우
        $comment_li.find('.gall_writer').data('name',commentVO.comment_nonmember_name);
        $comment_li.find('.gall_writer').data('ip',commentVO.comment_regip);
        $comment_li.find('.nickname').attr('title',commentVO.comment_nonmember_name);
        $comment_li.find('.nickname > em').text(commentVO.comment_nonmember_name);
        $comment_li.find('.ip').text('('+commentVO.comment_regip_sub+')');
        $comment_li.find('.writer_nikcon').remove(); // 아이콘 삭제
    } else { // 댓글 작성자가 회원 일 경우
        $comment_li.find('.gall_writer').data('nick',commentVO.member_nick);
        $comment_li.find('.gall_writer').data('uid',commentVO.comment_uid);
        $comment_li.find('.nickname').attr('title',commentVO.member_nick);
        $comment_li.find('.nickname > em').text(commentVO.member_nick);
        $comment_li.find('.writer_nikcon > img').attr('title',commentVO.comment_uid_sub+" : 갤로그로 이동합니다.")
    }

    $comment_li.find('.cmt_txtbox').data('no', commentVO.comment_num);
    $comment_li.find('.usertxt').text(commentVO.comment_content); // 댓글 내용 입력

    $comment_li.find('.date_time').text(commentVO.comment_rdate); // 작성 날짜 입력

    $comment_li.find('.cmt_mdf_del').data('comment_no',commentVO.comment_num);
    $comment_li.find('.cmt_mdf_del').data('article-no',commentVO.comment_article_num);

    return $comment_li;
}

/** 2023/04/05 // 심규영 // 대댓글 입력 함수 */
function setRe_comment_box(reCommentVO){
    const $re_comment_box = $('#re_comment_sample').clone(); // 대댓글 샘플 복사
    $re_comment_box.attr('id','reply_li_'+reCommentVO.re_comment_num); // id 변경
    $re_comment_box.show(); // display:none; 제거
    $re_comment_box.find('.reply_info').data('no',reCommentVO.re_comment_num);

    if(reCommentVO.comment_login_status == 1) { // 비회원
        $re_comment_box.find('.gall_writer').data('name',reCommentVO.comment_nonmember_name);
        $re_comment_box.find('.gall_writer').data('ip',reCommentVO.comment_regip);
        $re_comment_box.find('.nickname').attr('title',reCommentVO.comment_nonmember_name);
        $re_comment_box.find('.nickname > em').text(reCommentVO.comment_nonmember_name);
        $re_comment_box.find('.ip').text('('+reCommentVO.comment_regip_sub+')');
        $re_comment_box.find('.writer_nikcon').remove();
    } else { // 회원
        $re_comment_box.find('.gall_writer').data('nick',reCommentVO.member_nick);
        $re_comment_box.find('.gall_writer').data('uid',reCommentVO.comment_uid);
        $re_comment_box.find('.nickname').attr('title',reCommentVO.member_nick);
        $re_comment_box.find('.nickname > em').text(reCommentVO.member_nick);
        $re_comment_box.find('.ip').remove();
        $re_comment_box.find('.writer_nikcon').show();
        $re_comment_box.find('.writer_nikcon > img').attr('title', reCommentVO.comment_uid_sub+' : 갤로그로 이동합니다.');
    }

    $re_comment_box.find('.usertxt').text(reCommentVO.comment_content); // 대댓글 내용 입력
    $re_comment_box.find('.date_time').text(reCommentVO.comment_rdate); // 대댓글 작성 날짜 입력

    return $re_comment_box;
}

/** 2023/04/04 // 심규영 // 댓글 리스트 가져오는 ajax */
function getCommentLists(start,article_num,type){
    return new Promise(function(resolve, reject){
        const jsonData = {"start":start,"article_num":article_num,"type":type}

        $.ajax({
            url:'/GCInside/gall/board/getCommentList',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            dataType:'json',
            success: function(data) {
                return resolve(data);
            },
            error : function(request,status,error){
                reject(new Error("code = "+ request.status + " message = " + request.responseText + " error = " + error));
            },
        });
    });
}

/** 2023/04/03 // 심규영 // 페이지 로드 될시 페이징 처리 */
const comment_papging = async function(pg) {
    const totalCommentNum = parseInt($('#comment_total').text()); // 전체 댓글 개수

    const pagingDTO = await PostPaging(pg,totalCommentNum,100); // 페이징 처리

    $('#cmt_paging').html(''); // 페이징 내부 지우기

    if(pagingDTO.groupStart > 1) {} // 이전 페이지가 있을 경우
    if(pagingDTO.groupStart > 15) {} // 현제 페이지가 15 보다 클 경우

    for(let i = pagingDTO.groupStart; i <= pagingDTO.groupEnd; i++){
        if(pagingDTO.currentPage == i) $('<em>').text(i).appendTo('#cmt_paging');
        else $('<a>').attr('href','#focus_cmt').attr('onclick','commentPageMove('+i+')').text(i).appendTo('#cmt_paging');
    }

    if(pagingDTO.groupEnd < pagingDTO.lastPage) { // 다음 페이지가 있을 경우
        if(pagingDTO.lastPage > 15) {} // 페이지 끝이 15보다 클 경우
    }

    return pagingDTO;
}

/** 2023/04/03 // 심규영 // 페이징 Post 처리 */
function PostPaging(pg,total,count) {
    return new Promise(function(resolve, reject){
        const jsonData = {
            "pg":pg,
            "total":total,
            "count":count,
            "groupCount":15
        }

        $.ajax({
            url:'/GCInside/utils/pagingPage',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            dataType:'json',
            success: function(data) {
                return resolve(data.pagingDTO);
            },
            error : function(request,status,error){
                reject(new Error("code = "+ request.status + " message = " + request.responseText + " error = " + error));
            },
        });
    })
}