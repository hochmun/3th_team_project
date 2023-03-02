$(document).ready(function(){
    var navi_btn = $('.hover_gnb');
    var navi_btn2 = $('.gnb_area');

    var children_menu_layer = $('.depth2').index() > -1 ? $('.depth2') : $('.depth2', parent.document);

    navi_btn.hover(function() {
            if(children_menu_layer.css('display') == 'none') {
                children_menu_layer.css('opacity', '0').show();

            }
            
            children_menu_layer.stop().animate({ opacity:1 }, 200);
        },
        function() {
            children_menu_layer.stop().animate({ opacity:0 }, 200, function() { $(this).hide();});

            
        }
    );

    navi_btn2.hover(function(){
            if(children_menu_layer.css('opacity') > 0.8){
                children_menu_layer.stop().animate({ opacity:1 }, 200);
            }
        },
        function() {
            
            children_menu_layer.stop().animate({ opacity:0 }, 200, function() { $(this).hide();});
            
        }
    );

    children_menu_layer.hover(function() {
            if($(this).css('opacity') > 0.8) {
                $(this).stop().animate({ opacity:1 }, 200);
            
            }
        },
        function() {
            $(this).stop().animate({ opacity:0 }, 200, function() { $(this).hide();});
            
        }
    );
})