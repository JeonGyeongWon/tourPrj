$(document).ready(function(){
	
	var url = "/api/test.do";
	
	var chkUrl = "/searchFestival1";
	$.ajax({
	        url: url,
	        type: "post",
	        dataType: "json",
// 	        contentType: 'application/json; charset=utf-8',         
	        async : false,
	        data: {
	        	chkUrl : chkUrl,
	        },
// 	        data: JSON.stringify({
// 	        	chkUrl : url,
// 	        }),
	        success: function (data) {
	        	
	        	//console 참고하시면 됩니다.! 
	        	$(".board_list").html(JSON.stringify(data));
	        	
	        	//실제 데이터입니다~
// 	        	var items = data.response.body.items.item;
	        	
// 	        	for(var i = 0; i < items.length; i++){
// 	        		$(".board_list").append(items[i]);
// 	        	}
	        	
	        	
	        	
	        },
	        error: function(error){
// 	        	loadingHide();dd
	        	console.log("error : " + error);
	        	
	        }
	    });
	
});