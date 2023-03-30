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
    var currentRankList = 1; // 현재 보이는 리스트 번호

    $('.rank_more').click(function() {
      // 현재 보이는 리스트 숨김
      $(".rank_high" + currentRankList).css('display', 'none');

      // 다음 리스트 번호 계산
      currentRankList = currentRankList + 1;
      if (currentRankList > 3) { // 리스트가 3개까지이므로 3을 초과하면 1로 되돌림
        currentRankList = 1;
      }

      // 다음 리스트 보이기
      while ($(".rank_high" + currentRankList + " li").length === 0) {
        // li 태그가 없는 경우 다음 리스트를 보여줌
        currentRankList = currentRankList + 1;
        if (currentRankList > 3) { // 리스트가 3개까지이므로 3을 초과하면 1로 되돌림
          currentRankList = 1;
        }
      }
      $(".rank_high" + currentRankList).css('display', 'block');
    });
});


/*function thumb_view(e, src) {
    if (!e) {
    e = window.event; // fallback for older browsers
    }
  if (src == "" || src == "null") {
    src = "https://via.placeholder.com/50x50.png";
  }
  src = src.replace('http://', 'https://');

  $("#gallery_thumb_img").attr("src", src);
  var ex_obj = document.getElementById('gallery_thumb_div');
  if (!e) e = window.event;
  pos = abspos(e);
  ex_obj.style.left = pos.x + "px";
  ex_obj.style.top = (pos.y + 10) + "px";
  ex_obj.style.display = ex_obj.style.display == 'none' ? 'block' : 'none';
}

function thumb_hide(e) {
  var ex_obj = document.getElementById('gallery_thumb_div');
  ex_obj.style.display = 'none';
}
*/
$(document).ready(function() {
  var mLength = $(".cate li").length;
  var cateCount = 1;
  var cateLimit = 7; // 제한할 .cate 개수

  $(".cate").each(function() {
    if ($(this).find("li").length > 10) {
      // .cate가 제한 개수 이상인 경우에는 생성하지 않음
      if(cateCount >= cateLimit) {
        return;
      }

      $(this).after('<div class="cate cate-' + cateCount + '"><ul></ul></div>');
      cateCount = cateCount + 1;

      var mIndex = 0;
      while ($(this).find("li").length > 10) {
        var li = $(this).find("li:eq(10)");
        $(".cate-" + (cateCount - 1) + " ul").append(li);
        mIndex = mIndex + 1;
      }

      $(".cate-" + (cateCount - 1) + " li a").on("mouseout", thumb_hide)
           .on("mouseover", function(event) {
              thumb_view(event, 'https://via.placeholder.com/50x50');
            });
    }
  });
});