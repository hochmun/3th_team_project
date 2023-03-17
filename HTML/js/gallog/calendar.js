$(function() {
	$('.btn_calendar').click(function() {
		if($('#calendar_layer').css('display') != 'none') {
			toggle_layer($('#calendar_layer'));
			return false;
		}
		
		print_history();

		$('#gallog_config_layer').hide();
		
		toggle_layer($('#calendar_layer'));
	});
});

// 일변 기록 팝업
function set_day_popup(day, jsondata) {
	$('#day_popup-tmpl').tmpl(jsondata).appendTo('.calendar_box .day.'+ day);
}

// 한달 기록 출력
function print_history(year, month) {
	var html = null;
	var csrf_token = get_cookie('ci_c');
	var gallog_id = location.pathname.split('/').slice(1,2).join();
	var d = new Date();
	
	year = typeof(year) == 'undefined' ? d.getFullYear() : year;
	month = typeof(month) == 'undefined' ? d.getMonth() + 1 : month;
	
	$.ajax({
		type: "GET",
		url: '/'+ gallog_id +'/ajax/calendar_ajax/get_history',
		data: { 'ci_t' : csrf_token, 'y' : year, 'm' : month },
		dataType :	'html',
		cache : false,
		async : false,
		success: function(htmlData) {
			html = htmlData;
		}
	});
	
	$('#calendar_layer').html(html);

	// 년, 월 이동
	$('#calendar_layer .cal_topbox button.btn_prev_years').click(function() {
		print_history(year - 1, month);
	});
	$('#calendar_layer .cal_topbox button.btn_prev_month').click(function() {
		month--;
		
		if(month < 1) {
			year--;
			month = 12;
		} 
		print_history(year, month);
	});
	$('#calendar_layer .cal_topbox button.btn_next_years').click(function() {
		print_history(year + 1, month);
	});
	$('#calendar_layer .cal_topbox button.btn_next_month').click(function() {
		month++;
		
		if(month > 12) {
			year++;
			month = 1;
		} 
		print_history(year, month);
	});
}