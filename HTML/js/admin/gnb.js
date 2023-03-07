$(document).ready(function(){
    const gnb = $("#admin_gnb > li > a");

    gnb.click(function(e){
        e.preventDefault();

        const isOpen = $(this).next().is(':visible');

        if(isOpen) $(this).next().slideUp(200);
        else $(this).next().slideDown(200);
    })
})