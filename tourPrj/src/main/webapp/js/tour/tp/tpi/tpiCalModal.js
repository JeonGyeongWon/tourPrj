let datePicker;

$(function() {
    if (!datePicker) {
        datePicker = flatpickr("#datePicker", {
            locale: "ko",
            inline: true,
            dateFormat: "Y-m-d",
            mode: "range",
            showMonths: 2,
            minDate: "today",
            onChange: function(selectedDates, dateStr, instance) {
				let offset = new Date().getTimezoneOffset() * 60000;
                if (selectedDates.length === 2) {
					let startDate = new Date(selectedDates[0] - offset);
					let endDate = new Date(selectedDates[1] - offset);
                    $('#startDate').val(startDate.toISOString().slice(0, 10));
                    $('#endDate').val(endDate.toISOString().slice(0, 10));
                }else if(selectedDates.length === 1){
					 let startDate = new Date(selectedDates[0] - offset);
					 $('#startDate').val(startDate.toISOString().slice(0, 10));
					 $('#endDate').val("");
				}else{
					$('#startDate').val("");
                    $('#endDate').val("");
				}
            },
        });
    } else {
        datePicker.clear();
    }
    
    $('.close').on('click', function(event) {
        parent.modal_remove();
    });
	
    // 폼 제출 처리
    $('.tpiCalbtn').on('click', function(event) {
        event.preventDefault();
        
        const startDate = $('#startDate').val();
        const endDate = $('#endDate').val();
        const tourNm = $('#tourNm').val();
        
        if(!!tourNm){
			if (!!startDate && !!endDate) {
	            if (new Date(startDate) > new Date(endDate)) {
		            alert('종료 날짜는 시작 날짜보다 이후여야 합니다.');
		            return;
		        }
		        
		        var retVal   = new Object();
		        retVal.startDate  = startDate;
				retVal.endDate  = endDate;
				retVal.tourNm  = tourNm;
				
				console.log(retVal);
				
				parent.returnValue(retVal);
	        }else{
				alert('여행 일정을 선택해주세요.');
	            return;
			}
		}else{
			alert('여행 이름을 입력해주세요.');
	        return;
		}
        
        
    });
});