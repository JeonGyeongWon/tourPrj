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

function returnValue(retVal){
	
	if (retVal) {
		document.getElementById("startDate").value  = retVal.startDate;
		document.getElementById("endDate").value  = retVal.endDate;
	}
	
	$('#dateForm').submit();
}