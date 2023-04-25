/** 2023/04/24 // 김재준 // 개념글 스크립트 */

var recomAjax = function(category) {
	var page = $('.concept_con .tab_comm .recomTab.on').parent().index() + 1;

	if($('section .recom'+ page).index() >= 0) {
		$('.recomSection').hide();
		$('section .recom'+ page).show();
		return false;
	}

	var recomUrl = '/mainIndex/selectHotArticlesByCategory/'+ cate;

	if(category == 'rand') {
		recomUrl = '/mainIndex/selectHotArticlesByCategory/rand';
	}

	$.ajax({
        url: recomUrl,
        dataType: "jsonp",
        jsonpCallback: 'setRecom',
        cache: true,
        jsonp: "jsoncallback",
        success: function(data){}
    });
}
var setRecom = function(data) {
	var page = $('.concept_con .tab_comm .recomTab.on').parent().index() + 1;
	var cate_name = $('.concept_con .tab_comm .recomTab.on').text();

	$('.recomSection').hide();

	array_shuffle(data[0]);
	$('#recom-tmpl').tmpl({ 'page' : page, 'cate_name' : cate_name, 'data' : data[0].slice(0, 4) }).appendTo('.concept_con');
}

// PAGE

var recomPageMove = function(is_next) {
	var nowNum = $('#recomNum').text();
	var recomTotal = $('#recomTotal').text();
	var page = '';

	//console.log(nowNum + ":" + recomTotal);

	if(is_next) {
		nowNum++;

		if (nowNum > recomTotal) {
			nowNum = 1;
			page = 0;
		} else {

			page = nowNum - 1;
		}
	}
	else {
		nowNum--;

		if (nowNum <= 0) {
			nowNum = recomTotal;
			page = recomTotal - 1;
		} else {
			page = nowNum - 1;
		}
	}

	$('#recom_prev').addClass('on');
	$('#recom_next').addClass('on');

	if (nowNum == 1)			$('#recom_prev').removeClass('on');
	if (nowNum == recomTotal)		$('#recom_next').removeClass('on');

	$('#recomNum').text(nowNum);

	$('.recomTab').removeClass('on');
	if(page > 0) $('.recomTab').eq(page-1).addClass('on');

	if($('section .recom'+ page).index() < 0) {
		var cate_id = $('.concept_con .recomTab').eq(page - 1).data('cate_id');
		recomAjax(cate_id);
	}
	else {
		$('.recomSection').hide();
	}

	$('section .recom'+page).show();
}

	//개념글 이전
	$('#recom_prev').click(function(){
		recomPageMove(false);
	});

	//개념글 이후
	$('#recom_next').click(function(){
		recomPageMove(true);
	});