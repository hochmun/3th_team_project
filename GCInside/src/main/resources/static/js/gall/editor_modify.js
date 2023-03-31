$(()=>{
    //레이어 show
    $('.layer_show').click(function(){
        var cur_id = $(this).attr('layer');
        var copy_lyr = 'copyright_law';
        var other_lyr = 'post_guide';
        var other_lyr2 = 'hitg_guide';

        if(cur_id == 'post_guide') {
            copy_lyr = 'post_guide';
            other_lyr = 'copyright_law';
            other_lyr2 = 'hitg_guide';
        }else if(cur_id == 'hitg_guide') {
            copy_lyr = 'hitg_guide';
            other_lyr = 'copyright_law';
            other_lyr2 = 'post_guide';
        }

        if($('#'+other_lyr).css('display') != 'none') $('#'+other_lyr).hide();
        if($('#'+other_lyr2).css('display') != 'none') $('#'+other_lyr2).hide();

        if($('#'+copy_lyr).css('display') == 'none') {
            $('#'+copy_lyr).show();
        } else {
            $('#'+copy_lyr).hide();
        }

    });

    // 레이어닫기
    $('.poply_close').click(function(){
        $(this).parents('.pop_wrap').hide();
    });

});

/*
2023/03/22 // 심규영 // 에디터 컨테이너 동적 높이 조절 위치 옮김
*/
/*
window.addEventListener('load',function(){
    const target = document.getElementById('editor_iframe');
    .contentWindow.document.querySelector('.codex-editor__redactor');

    const $editor_html = $('#editor_iframe').contents().find('html');

    const $editor_iframe = $('#editor_iframe');

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            $editor_iframe.css('height',$editor_html.height()+'px');
        })
    })

    const config = {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false
    };

    observer.observe(target, config);
});
*/

// 글 작성
function article_make(content) {
    // 페이지 이동 용
    const grade = $('#grade').val();
    const id = $('#id').val();

    // 작성 정보 가져오기
    const article_gell_num = $('#article_gell_num').val();  // 갤러리 번호
    const userLogin = $('#userLogin').val(); // 유저 로그인 정보
    const sub_cate_info = $('#sub_cate_info').val(); // 말머리 사용 정보
    const article_title = $('#article_title').val(); // 제목

    // 비로그인시 아이디 비번 가져오기
    let article_uid;
    let nonmember_uid;
    let nonmember_pass;
    if(userLogin == '1') {
        nonmember_uid = $('#name').val();
        nonmember_pass = $('#password').val();
    } else if(userLogin == '0') {
        article_uid = $('#article_uid').val();
    }

    // 말머리 사용 시 말머리 번호 가져오기
    let sub_cate;
    if(sub_cate_info > 0) sub_cate = $('.sel').data('no');

    // 유효성 검사
    // 갤러리 번호 검사
    if(article_gell_num == '' || typeof article_gell_num == 'undefined') {
        alert('갤러리 번호 오류!');
        return;
    }

    // 유저 로그인 검사
    if(!(userLogin == '0' || userLogin == '1')) {
        alert('유저 로그인 상태 오류!');
        return;
    }
    if(userLogin == '0' && (article_uid == '' || typeof article_uid == 'undefined')) {
        alert('유저 로그인 정보 오류!');
        return;
    }
    if (userLogin == '1' && (nonmember_uid == '' || typeof nonmember_uid == 'undefined')) {
        alert('비유저 아이디 입력 오류!');
        return;
    }
    if (userLogin == '1' && (nonmember_pass == '' || typeof nonmember_pass == 'undefined')) {
        alert('비유저 비밀번호 입력 오류!');
        return;
    }

    // 말머리 선택 검사
    if(sub_cate_info > 0 && (sub_cate == '' || typeof sub_cate == 'undefined') ) {
        alert('말머리를 선택 하십시오');
        return;
    }

    // 제목 검사
    if(article_title == '' || typeof article_title == 'undefined') {
        alert('제목을 입력 하십시오.');
        return;
    }

    // 내용 검사
    if(content.blocks.length == 0) {
        alert('내용을 입력 하십시오.');
        return;
    }

    // JSON 작성
    const jsonData = {
        'article_gell_num':article_gell_num,
        'userLogin':userLogin,
        'sub_cate_info':sub_cate_info,
        'article_title':article_title,
        'article_content':JSON.stringify(content)
    }

    if(userLogin == '1') { // 로그인에 따라 값 입력
        jsonData.nonmember_uid = nonmember_uid;
        jsonData.nonmember_pass = nonmember_pass;
    } else if (userLogin == '0') jsonData.article_uid = article_uid;

    if(sub_cate_info > 0) jsonData.sub_cate = sub_cate; // 말머리 번호

    // ajax 전송
    $.ajax({
        url:'/GCInside/gall/board/articleWrite',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        dataType:'json',
        success: function(data) {
            if(data.result > 0) {
                // 성공
                location.href = '/GCInside/'+grade+'/board/lists?id='+id;
            } else if (data.result == -1) {
                // 유효성 검사 실패
                alert('유효성 검사에 실패 하였습니다.');
                return;
            } else {
                // 실패
                alert('글 작성에 실패 하였습니다.');
                return;
            }
        }
    })

}

// 글 수정
function article_modify(content) {
    const id = $('#id').val(); // 갤러리 주소, 페이지 이동 용
    const grade = $('#grade').val(); // 갤러리 종류, 페이지 이동 용

    const gell_num = $('#article_gell_num').val(); // 겔러리 번호
    const sub_cate_info = $('#sub_cate_info').val(); // 말머리 사용 정보
    const modify_no = $('#modify_no').val(); // 게시물 번호
    const modify_uid = $('#modify_uid').val(); // 게시물 작성자 uid
    const article_title = $('#article_title').val();

    // 말머리 사용 시 말머리 번호 가져오기
    let sub_cate;
    if(sub_cate_info > 0) sub_cate = $('.sel').data('no');

    // 제목 검사
    if(article_title == '' || typeof article_title == 'undefined') {
        alert('제목을 입력 하십시오.');
        return;
    }

    // 내용 검사
    if(content.blocks.length == 0) {
        alert('내용을 입력 하십시오.');
        return;
    }

    // jsonData 작성
    const jsonData = {
        "gell_num":gell_num,
        "modify_no":modify_no,
        "modify_uid":modify_uid,
        "article_title":article_title,
        "content":JSON.stringify(content),
        "sub_cate":sub_cate
    }

    // ajax 전송
    $.ajax({
        url:'/GCInside/gall/board/articleModify',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        dataType:'json',
        success: function(data) {
            if(data.result > 0) {
                // 성공
                location.href = '/GCInside/'+grade+'/board/view/?id='+id+'&no='+modify_no;
                return;
            } else if (data.result == -1) {
                // 유저 확인 오류
                alert('게시글 작성자가 아닙니다.');
                location.href = '/GCInside/index';
                return;
            } else {
                // 실패
                alert('글 작성에 실패 하였습니다.');
                return;
            }
        }
    });

}
