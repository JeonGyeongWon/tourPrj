document.addEventListener('DOMContentLoaded', () => {
	
	var url = "/tpi/selectTourPlanList.do";
	$.ajax({
        url: url,
        type: "post",
        async : false,
        data: {
        },
        success: function (data) {
			let res = data.result;
			if(res == "-1"){
				location.href = "/uat/uia/egovLoginUsr.do";
			}else {
				data.planList.forEach (function (el, index) {
					let plan = $('<div class="planDiv"></div>');
					let planImg = $('<img src="https://loremflickr.com/300/200/korea,travel/all?random=' + index + '"/>');
					let planNm = $('<div class="planNm"></div>').text(el.tourNm);
					let planDt = $('<div class="planDt"></div>').text(el.tourStart + " - " + el.tourEnd);
					plan.append(planImg,planNm,planDt);
					
					plan.on('click',function(){
						location.href = "/tpi/" +  el.tourPlanNo +"/tpiPlan.do";
					})
					
					$('.tpiList').append(plan);
				});
			}
        },
        error: function(error){
        	console.log(error);
        }
     });
	
});


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

function modal_remove() {
	$('#modalPan').remove();
}

function returnValue(retVal){

	if (retVal) {
		var url = "/tpi/insertTourPlan.do";
		$.ajax({
	        url: url,
	        type: "post",
	        async : false,
	        data: {
	        	tourStart : retVal.startDate,
	        	tourEnd : retVal.endDate,
	        	tourNm : retVal.tourNm,
	        },
	        success: function (data) {
				let res = data.result;
				if(res == "000"){
					alert("계획 등록 실패");
				}else if(res == "001"){
					location.href = "/tpi/" + data.plan.tourPlanNo +"/tpiPlan.do";
				}else if(res == "-1"){
					location.href = "/uat/uia/egovLoginUsr.do";
				}
	        },
	        error: function(error){
	        	console.log(error);
	        }
	    });
	}
	
}