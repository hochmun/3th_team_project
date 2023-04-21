/** 2023/04/21 // 심규영 // 실북갤 스크립트 */
$(()=>{
    $('.hotlive .rank_more').click(()=>{hotLiveFunction.p(1)});
});

/** 2023/04/21 // 심규영 // 실북갤 함수 생성 */
const hotLiveFunction = () => {

    const pageLoadAjax = (jsonData) => {
        return new Promise(function(resolve, reject){
            $.ajax({
                url:'/GCInside/',
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

    // 페이지 출력 시작 함수
    const pageLoad = (gall_type, page) => {
        // 해당 페이지 정보를 받아오는 ajax 함수 실행
        pageLoadAjax({"gall_type":gall_type, "page":page});

        // 페이지 빌드 함수
    };

    // 페이지 이동 및 로드 함수
    // mode -> 이동 하는 페이지 숫자 : {0: 현제 페이지 로드, 1: 페이지 앞으로 이동}
    const pageMove = () => {
        const gall_type = $('.hotlive .rank_more').data("gall_type"); // 갤러리 타입
        const page = $('.hotlive .rank_more').data("page"); // 현재 페이지

        // 갤러리 타입과 페이지 에 따른 출력 함수 실행
        pageLoad(gall_type, parseInt(page)+1);
    };

    // 갤러리 표시 전환
    // gall -> 전환 하는 갤러리 타입
    const gallMove = (gall_type) => {
        $('.hotlive .rank_more').data("gall_type", gall_type);
        $('.hotlive .renk_more').data("page", 0);

        pageMove();
    }

    // 외부 출력 함수
    return {
        p : pageMove,
        g : gallMove
    };
}