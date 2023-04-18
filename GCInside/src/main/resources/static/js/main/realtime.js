/** 2023/04/18 // 심규영 // 실시간 베스트 스크립트 */
$(()=>{
    realtimePgGetArticle(1); // 처음 페이지 로드 될시 1페이지 불러오기
    $('.realtime_prev').click(()=>{realtimePageMove(-1);});
    $('.realtime_next').click(()=>{realtimePageMove(1);});
});

// 페이지에 따른 게시글 불러오는 함수
const realtimePgGetArticle = async (pg) => {
    // 페이지 번호에 따른 게시글 가져오기
    //const articleVOS = await realtimeGetArticleListAjax({"pg":pg});


};

// 페이지 내용 불러오는 ajax 함수
const realtimeGetArticleListAjax = (jsonData) => {
    return new Promise(function(resolve, reject){
        $.ajax({
            url:'',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            dataType:'json',
            success: function(data) {
                return resolve(data.result > 0);
            },
            error : function(request,status,error){
                reject(new Error("code = "+ request.status + " message = " + request.responseText + " error = " + error));
            },
        });
    });
};

// 페이지 이동 함수
const realtimePageMove = (mode) => {
    const pg = $('.realtimeNum')[0].innerText; // 페이지 현재 번호
    const nextPg = parseInt(pg)+mode;
    if(nextPg == '7') nextPg = '1';
    if(nextPg == '0') nextPg = '6';

    // 페이지 번호 변경
    $('.realtimeNum').text(nextPg);

    // 페이지 출력 변경
    $('.time_best .typet_list.p_'+pg).hide();
    $('.time_best .typet_list.p_'+nextPg).show();

    // 불러온 내용이 없을 경우
    if($('.time_best .typet_list.p_'+nextPg+' > li').length == 0) {
        realtimePgGetArticle(nextPg);
    }
};

const realtimePageNext = () => {
    const pg = $('.realtimeNum')[0].innerText; // 페이지 현재 번호
    const nextPg = pg == '6' ? '1' : parseInt(pg)+1;

    // 페이지 번호 변경
    $('.realtimeNum').text(nextPg);

    // 페이지 출력 변경
    $('.time_best .typet_list.p_'+pg).hide();
    $('.time_best .typet_list.p_'+nextPg).show();

    // 불러온 내용이 없을 경우
    if($('.time_best .typet_list.p_'+nextPg+' > li').length == 0) {
        realtimePgGetArticle(nextPg);
    }

};

const realtimePagePrev = () => {
    const pg = $('.realtimeNum')[0].innerText; // 페이지 현재 번호
    const prevPg = pg == '1' ? '6' : parseInt(pg)-1;

    // 페이지 번호 변경
    $('.realtimeNum').text(prevPg);

    // 페이지 출력 변경
    $('.time_best .typet_list.p_'+pg).hide();
    $('.time_best .typet_list.p_'+prevPg).show();

    // 불러온 내용이 없을 경우
    if($('.time_best .typet_list.p_'+prevPg+' > li').length == 0) {
        realtimePgGetArticle(prevPg);
    }
};