function tpiCalModal(){
 var $dialog = $('<div id="modalPan"></div>')
	.html('<iframe style="border: 0px; " src="/tpi/tpiCalModal.do" width="100%" height="100%"></iframe>')
	.dialog({
 	autoOpen: false,
     modal: true,
     width: 1500,
     height: 800
	});
 $(".ui-dialog-titlebar").hide();
	$dialog.dialog('open');
}

/*function returnValue(retVal){
	
	if (retVal) {
		document.getElementById("startDate").value  = retVal.startDate;
		document.getElementById("endDate").value  = retVal.endDate;
	}
	
	$('#dateForm').submit();
}*/

function fn_egov_modal_remove() {
	$('#modalPan').remove();
}

function returnValue(retVal){
	
	if (retVal) {
		var url = "/tpi/insertTourPlan.do";
		$.ajax({
	        url: url,
	        type: "post",
	        dataType: "json",    
	        async : false,
	        data: {
	        	tourStart : retVal.startDate,
	        	tourEnd : retVal.endDate,
	        },
	        success: function (data) {
				console.log(data);
	        },
	        error: function(error){
	        	console.log(error);
	        	
	        }
	    });
	}
	
}