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
				console.log(selectedDates);
				console.log(dateStr);
				console.log(instance);
				
                if (selectedDates.length === 2) {
                    $('#startDate').val(selectedDates[0].toISOString().slice(0, 10));
                    $('#endDate').val(selectedDates[1].toISOString().slice(0, 10));
                }else if(selectedDates.length === 1){
					 $('#startDate').val(selectedDates[0].toISOString().slice(0, 10));
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
	
    // 폼 제출 처리
    $('.tpiCalbtn').on('click', function(event) {
        event.preventDefault();
        
        const startDate = $('#startDate').val();
        const endDate = $('#endDate').val();
        
        if (!!startDate && !!endDate) {
            if (new Date(startDate) > new Date(endDate)) {
	            alert('종료 날짜는 시작 날짜보다 이후여야 합니다.');
	            return;
	        }
	        
	        var retVal   = new Object();
	        retVal.startDate  = startDate;
			retVal.endDate  = endDate;
			parent.returnValue(retVal);
        }else{
			alert('여행 일정을 선택해주세요.');
            return;
		}
        
    });
});