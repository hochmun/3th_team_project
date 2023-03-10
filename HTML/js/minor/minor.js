function showLayer(layerName){
	if($("#"+layerName).css("display") == "none"){
		$("#"+layerName).show();
	} else {
		$("#"+layerName).hide();
	}
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