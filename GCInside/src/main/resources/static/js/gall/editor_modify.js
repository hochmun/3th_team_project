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

/*
2023/03/22 // 심규영 // 에디터 컨테이너 동적 높이 조절 위치 옮김
*/
window.addEventListener('load',function(){
    const target = document.getElementById('editor_iframe')
    .contentWindow.document.querySelector('.codex-editor__redactor');

    const $editor_html = $('#editor_iframe').contents().find('html');
    const $editor_iframe = $('#editor_iframe');

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            $editor_iframe.css('height',$editor_html.height()+'px')
        })
    })

    const config = {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false
    };

    observer.observe(target, config);
})

// 글 작성
function article_make(content) {
    console.log("content : ",content);
}
