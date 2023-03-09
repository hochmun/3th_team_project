$(document).ready(function(){
    const gnb = $("#admin_gnb > li > a");

    gnb.click(function(e){
        e.preventDefault();

        const isOpen = $(this).next().is(':visible');

        if(isOpen) $(this).next().slideUp(200);
        else $(this).next().slideDown(200);
    })

    // 외부영역 클릭 시 팝업 닫기
    $(document).mouseup(function (e){
        var LayerPopup = $(".admin.pop_back");
        if(LayerPopup.has(e.target).length === 0){
            LayerPopup.hide();
        }
    });

})