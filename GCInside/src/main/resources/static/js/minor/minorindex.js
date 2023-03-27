function showLayer(layerName){
	if($("#"+layerName).css("display") == "none"){
		$("#"+layerName).show();
	} else {
		$("#"+layerName).hide();
	}
}

function rollingView() {
  var currentRank = $(".one_ranklist li:first-child");
  currentRank.slideUp(100, function() {
    currentRank
      .detach()
      .appendTo(".one_ranklist ol")
      .show();
  });
}

setInterval(function() {
  rollingView();
}, 2000);

$(window).on("load", function() {
  setInterval(function() {
    if($(".one_ranklist li:last-child").is(":visible")) {
      $(".one_ranklist li:first-child").show();
    }
  }, 3000);
});



$(function() {
    $(".rank_listwrap").mouseenter(function() {
        $('.all_ranklist').css('display','block');
    });
    $(".rank_listwrap").mouseleave(function() {
        $('.all_ranklist').css('display','none');
    });

    // 실북갤 1위-10위/11위-20위 클릭
    $('.rank_more').click(function(){
        var type = $(this).attr('rank_type'); // 현재 타입
        if(type == 'high') type = 1;
        else type = parseInt(type);

        // 기존 1~10위 숨기기
        $('.rank_high li').each(function() {
            var rank = $(this).find('.rank_num em').text();
            if (rank <= 10) {
                $(this).hide();
            }
        });

        // 11위부터 보여주기
        $('.rank_high li').each(function() {
            var rank = $(this).find('.rank_num em').text();
            if (rank > 10) {
                $(this).show();
            }
        });

        // 버튼 텍스트 변경 및 rank_type 속성 변경
        var rank_txt = ['1위 - 10위', '11위 - 20위', '21위 - 30위', '31위 - 40위', '41위 - 50위', '1위 - 10위'];
        var rank_txt_num = type + 1;
        if(type >= 5) {
            type = 0;
            rank_txt_num = 1;
        }
        $('.rank_more').text(rank_txt[rank_txt_num]);
        $('.rank_more').attr('rank_type',type+1);
    });
});
var hotTotalPage = 30;
	$('#btn_hotminor_prev').click(function(){

		var page = $('.hot_mgall_box .btn_paging').data('page')
		if(page <= 1) page = hotTotalPage;
		else page = page - 1;
		getHotMgallList(page)
	});
	$('#btn_hotminor_next').click(function(){

		var page = $('.hot_mgall_box .btn_paging').data('page')
		if(page >= hotTotalPage) page = 1;
		else page = page + 1;
		getHotMgallList(page)
	});