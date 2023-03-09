$(()=>{
    // 수정 하기 클릭시 미리보기, 수정 완료 버튼 공개
    $('.admin_term_btn #modify').click(function(){
        $(this).hide();
        $('#preview').show();
        $('#complete').show();
    })

    // 미리 보기 클릭시 수정 하기로 버튼 변경
    $('#preview').click(function(){
        $(this).hide();
        $('#modify').show();
    })
    
    // 자세히 보기 클릭
    $('#detail').click(function(){
        $('.admin.pop_back').show();
        $('#modify').show();
        $('#preview').hide();
        $('#complete').hide();
    })

    // 닫기 클릭
    $('#close').click(function(){
        $('.admin.pop_back').hide();
    })
})