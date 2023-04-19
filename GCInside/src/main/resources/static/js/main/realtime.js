/** 2023/04/18 // 심규영 // 실시간 베스트 스크립트 */
$(()=>{
    realtimePgGetArticle(1); // 처음 페이지 로드 될시 1페이지 불러오기
    $('.realtime_prev').click(()=>{realtimePagePrev();});
    $('.realtime_next').click(()=>{realtimePageNext();});
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

/* 2023-04-19 // 전인준 // hit갤러리 */
const hitpage = 4; // 한 페이지에 보여줄 게시물 수
let currentPg = 1; // 현재 페이지 번호

//pageNum에 따라 페이지 출력
function showPg(pageNum){
    const start = (pageNum - 1) * hitpage; // 시작 인덱스
    const end = start + hitpage;           // 끝 인덱스
    // 모든리스트 숨김,start에서 end까지만 출력
    $('.con_list li').hide().slice(start,end).show();
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

