// 페이지 로드 될시 전날 게시글 및 댓글 개수 가져오는 함수 실행
$(()=>{yesterdayCount();});

// 페이지 로드 될시 전날 게시글 및 댓글 개수 가져오는 함수
const yesterdayCount = async () => {
    $.ajax({
        url:'/GCInside/mainIndex/yesterdayCount',
        method: 'POST',
        contentType: 'application/json',
        success: function(data) {
            $('.gall_exposure > .posts').find('em').text(data.article_count + '개');
            $('.gall_exposure > .reply').find('em').text(data.comment_count + '개');
        },
    });
};