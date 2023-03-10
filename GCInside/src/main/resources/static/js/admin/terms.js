$(()=>{
    // 수정 하기 클릭시 미리보기, 수정 완료 버튼 공개
    $('.admin_term_btn #modify').click(function(){
        $(this).hide(); // 수정하기 버튼 숨기기
        $('#term_content').attr('readonly', false).show(); // 약관 내용 수정 가능 하게 변경
        $('#term_preview').hide(); // 미리보기 숨기기
        $('#preview').show(); // 미리보기 버튼 표시
        $('#complete').show(); // 완료 버튼 표시
    })

    // 미리 보기 클릭시 수정 하기로 버튼 변경
    $('#preview').click(function(){
        $(this).hide(); // 미리보기 버튼 숨기기
        $('#term_content').hide(); // textarea 숨기기
        $('#term_preview').html($('#term_content').val()).show(); // 수정 된 약관 내용 불러와서 표시
        $('#modify').show(); // 수정 하기 버튼 다시 표시
    })
    
    // 자세히 보기 클릭
    $('.admin_detail').click(function(){
        const result = $(this).data('result'); // 약관 내용
        const term_name = $(this).parent().parent().find('.term_ori_name').text(); // 약관 이름
        const term_type = $(this).parent().parent().find('.term_ori_type').text(); // 약관 번호
        $('#term_type').val(term_type); // 약관 번호 기록
        $('#term_name').text(term_name); // 약관 이름 상단 표시
        $('#term_content').val(result).attr('readonly',true).show(); // 약관 내용 불러오기
        $('#term_preview').hide(); // 약관 미리 보기 숨기기
        $('.admin.pop_back').show(); // 팝업 창 띄우기
        $('#modify').show(); // 수정 하기 버튼 표시
        $('#preview').show(); // 미리 보기 버튼 표시
        $('#complete').hide(); // 완료 버튼 숨기기
    })

    // 닫기 클릭
    $('#close').click(function(){
        $('.admin.pop_back').hide();
    })

    // 수정 완료 버튼 클릭
    $('#complete').click(function(){

        const content = $('#term_content').val(); // term 수정 내용
        const type = $('#term_type').val(); // term 번호

        const jsonContent = {"content":content,"type":type};

        $.ajax({
            url: '/GCInside/admin/config/updateTerm',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonContent),
            dataType: 'json',
            success: (data) => {
                if(data.result > 0) {
                    // 성공
                    alert('약관을 수정 하였습니다.');
                    // 수정 완료 후 새로 고침
                    location.reload();
                } else {
                    // 실패
                    alert('약관 수정에 실패 하였습니다.');
                }
            }
        });
    })
})