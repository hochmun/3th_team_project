/** 2023/04/18 // 심규영 // 실시간 베스트 스크립트 */
$(()=>{
    realtimeFunction(0); // 처음 페이지 로드 될시 1페이지 불러오기
    $('.realtime_prev').click(()=>{realtimeFunction(-1);});
    $('.realtime_next').click(()=>{realtimeFunction(1);});
});

/** 2023/04/18 // 심규영 // 중첩 함수 생성 */
const realtimeFunction = (mode) => {

    // 해당하는 장소에 데이터 집어 넣는 함수
    // 2023/05/17 // 심규영 // loading=lazy 추가
    const insertArticles = (articleVOS, pg) => {
        articleVOS.forEach((articleVO)=>{
            $('<li>').append(
                $('<a>').attr('href','/GCInside/m/board/view/?id=gcbest&no='+articleVO.article_num)
                .attr('class','main_log').append(
                    $('<div>').attr('class','box bestimg').append(
                        articleVO.article_file > 0 ? $('<img>').attr('src',articleVO.file_url.substring(articleVO.file_url.indexOf('/GCInside'))).attr('style','position: relative;').attr('loading','lazy') : ''
                    )
                ).append(
                    $('<div>').attr('class','box besttxt').append(
                        $('<p>').text(articleVO.article_title)
                    ).append(
                        $('<span>').attr('class','num').text('['+articleVO.article_comment_count+']')
                    )
                ).append(
                    $('<div>').attr('class','box best_info').append(
                        $('<span>').attr('class','name').text(articleVO.article_login_status == 0 ? articleVO.article_uid : articleVO.article_nonmember_uid)
                    ).append(
                        $('<span>').attr('class','time').text(
                            new Date(articleVO.article_rdate) > new Date(new Date().toLocaleDateString()) ? articleVO.article_rdate.substring(11,16) : articleVO.article_rdate.substring(5,10)
                        )
                    )
                )
            ).appendTo('.time_best .typet_list.p_'+pg);
        });
    };

    // 페이지에 따른 게시글 불러오는 함수
    const PgGetArticle = async (pg) => {
        // 페이지 번호에 따른 게시글 가져오기
        const articleVOS = await GetArticleListAjax({"pg":pg});

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

    // 버튼 체크 함수
    const btnCheck = (pg) => {
        if(pg > 1) $('.realtime_prev').addClass('on');
        else $('.realtime_prev').removeClass('on');

        if(pg < 6) $('.realtime_next').addClass('on');
        else $('.realtime_next').removeClass('on');
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

        // 버튼 체크
        btnCheck(nextPg);
    };

    // 외부 출력 함수 리턴
    return pageMove(mode);
};

/* 2023-04-19 // 전인준 // hit갤러리 */
const hitpage = 4; // 한 페이지에 보여줄 게시물 수
let currentPg = 1; // 현재 페이지 번호

//pageNum에 따라 페이지 출력
function showPg(pageNum){
    const start = (pageNum - 1) * hitpage; // 시작 인덱스
    const end = start + hitpage;           // 끝 인덱스
    // 모든리스트 숨김,start에서 end까지만 출력
    $('.con_list li.hitL').hide().slice(start,end).show(); // 출력 에러 수정
}
$(document).ready(function(){
    showPg(currentPg); // 초기에 첫번째 페이지 출력
    // 이전 버튼 클릭 이벤트
    $('#hit_prev').click(function(){
        if(currentPg > 1){
            currentPg--;
            showPg(currentPg);
            updatebtn();
        }
    });
    // 다음 버튼 클릭 이벤트
    $('#hit_next').click(function(){
        if(currentPg < 3){
            currentPg++;
            showPg(currentPg);
            updatebtn();
        }
    });
});
// 버튼상태 갱신하는 함수
function updatebtn(){
    $('#hitNum').text(currentPg); // 페이지 번호 갱신
    // 페이지 1일때 이전버튼 비활성화 나머진 다 활성화
    $('#hit_prev').toggleClass('on',currentPg !== 1);
    // 페이지 3일때 다음버튼 비활성화 ""
    $('#hit_next').toggleClass('on',currentPg !== 3);
}
