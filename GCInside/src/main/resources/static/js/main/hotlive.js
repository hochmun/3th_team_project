/** 2023/04/21 // 심규영 // 실북갤 스크립트 */
$(()=>{
    hotLiveFunction().p();
    $('.hotlive .rank_more').click(()=>{hotLiveFunction().p()});
    $('.hotlive .gallRankTab').click(()=>{hotLiveFunction().g('g')});
    $('.hotlive .mgallRankTab').click(()=>{hotLiveFunction().g('m')});
    $('.hotlive .minigallRankTab').click(()=>{hotLiveFunction().g('mi')});
});

/** 2023/04/21 // 심규영 // 실북갤 함수 생성 */
const hotLiveFunction = () => {

    // 갤러리 리스트 호출 함수
    const pageLoadAjax = (jsonData) => {
        return new Promise(function(resolve, reject){
            $.ajax({
                url:'/GCInside/mainIndex/hotLiveGetList',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(jsonData),
                dataType:'json',
                success: function(data) {
                    return resolve(data.RankList);
                },
                error : function(request,status,error){
                    reject(new Error("code = "+ request.status + " message = " + request.responseText + " error = " + error));
                },
            });
        });
    }

    // 페이지 빌드 함수
    const pageBuild = (RankList, gall_type, page) => {
        // 불러온 리스트 가 없을 경우
        if(RankList.length == 0) {
            $('<li>').append(
                $('<a>').append(
                    $('<span>').attr('class', 'rank_txt').text('갤러리가 없습니다.')
                )
            ).appendTo('.hotlive .'+gall_type+'_'+page);
            return false;
        }

        RankList.forEach((vo)=>{
            $('<li>').append(
                $('<a>').attr('href', '/GCInside/'+(gall_type == 'g' ? 'm' : gall_type == 'm' ? 'mgall' : 'mini')+'/board/lists?id='+vo.gell_address)
                .attr('class','busygall').append(
                    $('<span>').attr('class', 'rank_num').append(
                        $('<em>').text(vo.rank)
                    )
                ).append(
                    $('<span>').attr('class','rank_txt').text(vo.gell_name)
                ).append(
                    $('<span>').attr('class','rank_state').text(
                        vo.preRank - vo.rank == 0 ? ' ' : vo.preRank - vo.rank
                    )
                ).append(
                    $('<span>').attr('class','sp_img ico_ranking').addClass(
                        vo.preRank - vo.rank == 0 ? 'same' : vo.preRank - vo.rank > 0 ? 'up' : 'down'
                    )
                )
            ).appendTo('.hotlive .'+gall_type+'_'+page);
        });
    }


    // 페이지 출력 시작 함수
    const pageLoad = async (gall_type, page) => {
        // 페이지 리스트가 있을 경우 중지
        if($('.hotlive .'+gall_type+'_'+page+' li').length > 0) return;

        // 해당 페이지 정보를 받아오는 ajax 함수 실행
        const RankList = await pageLoadAjax({"gall_type":gall_type, "page":page});

        // 페이지 빌드 함수
        pageBuild(RankList, gall_type, page);
    };

    // 버튼 변경 함수
    const btnChange = (gall_type, page) => {
        // box_menu 내부의 a 태그 on class 제거
        $('.hotlive .box_menu > a').removeClass('on');

        // gall_type 에 따른 버튼 on 변경
        $('.hotlive .rank_'+ (gall_type == 'g' ? 'gall' : gall_type == 'm' ? 'mgall' : 'mini')).addClass('on');

        // page에 따른 값 변경 및 버튼 이름 변경
        $('.hotlive .rank_more').data('gall_type', gall_type).data('page', page).text(
            page == 1 ? '11위 - 20위' : page == 2 ? '21위 - 30위' : page == 3 ? '31위 - 40위' : page == 4 ? '41위 - 50위' : '1위 - 10위'
        );
    };

    // 페이지 출력 함수
    const pageOn = (gall_type, page) => {
        // 전체 페이지 숨기기
        $('.hotlive .rank_list').hide();

        // 해당 페이지 열기
        $('.hotlive .'+gall_type+'_'+page).toggle();
    };

    // 페이지 이동 및 로드 함수
    // mode -> 이동 하는 페이지 숫자 : {0: 현제 페이지 로드, 1: 페이지 앞으로 이동}
    const pageMove = () => {
        const gall_type = $('.hotlive .rank_more').data("gall_type"); // 갤러리 타입
        const page = $('.hotlive .rank_more').data("page"); // 현재 페이지

        // 현제 페이지 번호가 5일 경우 다음 번호를 1로 변경
        const nextPage = page == 5 ? 1 : parseInt(page)+1;

        // 갤러리 타입과 페이지 에 따른 출력 함수 실행
        pageLoad(gall_type, nextPage);

        // 페이지 출력
        pageOn(gall_type, nextPage);

        // 페이지 번호 변경 함수 실행
        btnChange(gall_type, nextPage);

    };

    // 갤러리 표시 전환
    // gall -> 전환 하는 갤러리 타입
    const gallMove = (gall_type) => {
        event.preventDefault();

        $('.hotlive .rank_more').data("gall_type", gall_type);
        $('.hotlive .rank_more').data("page", 0);

        pageMove();
    }

    // 외부 출력 함수
    return {
        p : pageMove,
        g : gallMove
    };
}