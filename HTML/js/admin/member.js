$(()=>{
    // 멤버 리스트 검색 타입 변경시
    $('#member_search_select_box').change(function(){
        // 입력 타입 이름 가져오기
        const value = $(this).children("option:selected").text();

        // 입력칸 비우기
        $('#input-box').val('');

        // 입력 가이드 변경
        if(value == '포인트' || value == '가입날짜'){
            $('#input-box').attr('placeholder',value+' 이상 검색');
        } else {
            $('#input-box').attr('placeholder',value+' 검색');
        }
    });

    $('.admin_member.pop_content ul > li').click(function(){
        const value = $(this).data("value");
        $('.admin_member.main_content').hide();
        $('.admin_member.pop_content ul > li.on').removeClass('on');
        $(this).addClass('on');
        $('.admin_member.main_content.'+value).show();
    })
})

const popup_open = function(){
    $(".admin.pop_back").show();
}

const popup_close = function(){
    $(".admin.pop_back").hide();
}