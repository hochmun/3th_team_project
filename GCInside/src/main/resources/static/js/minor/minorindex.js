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


    });

