$(()=>{
    //레이어 show
    $('.layer_show').click(function(){
        var cur_id = $(this).attr('layer');
        var copy_lyr = 'copyright_law';
        var other_lyr = 'post_guide';
        var other_lyr2 = 'hitg_guide';

        if(cur_id == 'post_guide') {
            copy_lyr = 'post_guide';
            other_lyr = 'copyright_law';
            other_lyr2 = 'hitg_guide';
        }else if(cur_id == 'hitg_guide') {
            copy_lyr = 'hitg_guide';
            other_lyr = 'copyright_law';
            other_lyr2 = 'post_guide';
        }

        if($('#'+other_lyr).css('display') != 'none') $('#'+other_lyr).hide();
        if($('#'+other_lyr2).css('display') != 'none') $('#'+other_lyr2).hide();

        if($('#'+copy_lyr).css('display') == 'none') {
            $('#'+copy_lyr).show();
        } else {
            $('#'+copy_lyr).hide();
        }

    });

    // 레이어닫기
    $('.poply_close').click(function(){
        $(this).parents('.pop_wrap').hide();
    });

});

