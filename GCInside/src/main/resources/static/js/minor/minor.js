function showLayer(layerName){
	if($("#"+layerName).css("display") == "none"){
		$("#"+layerName).show();
	} else {
		$("#"+layerName).hide();
	}
}

//카테고리 펼치기
function showOptions() {
  var selectArea = document.getElementById("gell_create_cate");
  var options = document.getElementById("options");
  options.style.display = "block";
  selectArea.style.display = "none";
  options.addEventListener("change", function() {
    var selectedValue = options.options[options.selectedIndex].value;
    selectArea.innerHTML = selectedoptions + "<em class='sp_img icon_option_more'></em>";
    options.style.display = "none";
    selectArea.style.display = "block";
  });
}
//폼 전송
function submitForm() {
  var form = document.getElementById("frmCreate");
  form.submit();
}


// function thumb_view(e,src) {
// 	$("#gallery_thumb_img").attr("src",src);
// 	var ex_obj = document.getElementById('gallery_thumb_div');
//     if(!e) e = window.Event;
//     pos = abspos(e);
//     ex_obj.style.left = pos.x+"px";
//     ex_obj.style.top = (pos.y+10)+"px";
//     ex_obj.style.display = ex_obj.style.display=='none'?'block':'none';
    
// }

// function thumb_hide(e,src) {
// 	var ex_obj = document.getElementById('gallery_thumb_div');
//     ex_obj.style.display = 'none';
// }