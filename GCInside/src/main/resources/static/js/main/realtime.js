/** 2023/04/18 // 심규영 // 실시간 베스트 스크립트 */
$(()=>{
    realtimeFunction().pageMove(0); // 처음 페이지 로드 될시 1페이지 불러오기
    $('.realtime_prev').click(()=>{realtimeFunction().pageMove(-1);});
    $('.realtime_next').click(()=>{realtimeFunction().pageMove(1);});
});

// 중첩 함수 생성
const realtimeFunction = () => {

    // 해당하는 장소에 데이터 집어 넣는 함수
    const insertArticles = (articleVOS, pg) => {
        articleVOS.forEach((articleVO)=>{
            console.log("articleVO : ",articleVO);
            $('<li>').append(
                $('<a>').attr('href','/GCInside/m/board/view/?id=gcbest&no='+articleVO.article_num)
                .attr('class','main_log').append(
                    $('<div>').attr('class','box bestimg').append(
                        articleVO.article_file > 0 ? $('<img>').attr('src',articleVO.file_url).attr('style','position: relative;') : ''
                    )
                ).append(
                    $('<div>').attr('class','box besttxt').append(
                        $('<p>').text(articleVO.article_title)
                    ).append(
                        $('<span>').attr('class','num').text('['+articleVO.article_comment_count+'}')
                    )
                ).append(
                    $('<div>').attr('class','box best_info').append(
                        $('<span>').attr('class','name').text(articleVO.article_login_status == 0 ? articleVO.article_uid : articleVO.article_nonmember_uid)
                    ).append(
                        $('<span>').attr('class','time').text(articleVO.article_rdate)
                    )
                )
            ).appendTo('.time_best .typet_list.p_'+pg);
        });
    };

    // 페이지에 따른 게시글 불러오는 함수
    const PgGetArticle = async (pg) => {
        // 페이지 번호에 따른 게시글 가져오기
        const articleVOS = await GetArticleListAjax({"pg":pg});
        console.log("articleVOS : ",articleVOS);

        insertArticles(articleVOS, pg);
    };

    // 페이지 내용 불러오는 ajax 함수
    const GetArticleListAjax = (jsonData) => {
        return new Promise(function(resolve, reject){
            $.ajax({
                url:'/GCInside/mainIndex/realtimeGetArticleList',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(jsonData),
                dataType:'json',
                success: function(data) {
                    return resolve(data.articleVOS);
                },
                error : function(request,status,error){
                    reject(new Error("code = "+ request.status + " message = " + request.responseText + " error = " + error));
                },
            });
        });
    };

    // 페이지 이동 함수
    const pageMove = (mode) => {
        const pg = $('.realtimeNum')[0].innerText; // 페이지 현재 번호
        let nextPg = parseInt(pg)+mode;
        if(nextPg == 7) nextPg = 1;
        if(nextPg == 0) nextPg = 6;

        // 페이지 번호 변경
        $('.realtimeNum').text(nextPg);

        // 페이지 출력 변경
        $('.time_best .typet_list.p_'+pg).hide();
        $('.time_best .typet_list.p_'+nextPg).show();

        // 불러온 내용이 없을 경우
        if($('.time_best .typet_list.p_'+nextPg+' > li').length == 0) {
            PgGetArticle(nextPg);
        }
    };

    // 외부 출력 함수 리턴
    return {
        "pageMove":pageMove,
    };
};

