var prevInput = ""
	
/**
 * DatePicker 이벤트 연결 초기화 루틴
 */
function initDatePicker(){
	prevInput = ""
	// https://bootstrap-datepicker.readthedocs.io/en/latest/
	$('.date.input-group').datepicker({
	  format: 'yyyy-mm-dd',
	  todayHighlight: true,
	  language: 'ko',
	  autoclose: true
	});
	
	$('.date.input-group input').keydown(function(){
		if(this.value.length < 11)	prevInput = this.value;
	});
	
	$('.date.input-group input').keyup(function(){	
		var src = this.value.replace(/-/g, '');
		
		if(src.length > 4){
			temp = src.substring(0,4) + "-" + src.substring(4, src.length+1);
			if(this.value.length > 7)
				temp = src.substring(0,4) + "-" + src.substring(4,6) + "-" + src.substring(6, src.length+1);
			this.value = temp;
		}
		if(this.value.length > 10)	
			this.value = prevInput;
	});
	
	$('.month.input-group input').keydown(function(){
		if(this.value.length < 8)	prevInput = this.value;
	});
	
	$('.month.input-group input').keyup(function(){	
		var src = this.value.replace(/-/g, '');
		
		if(src.length > 4){
			temp = src.substring(0,4) + "-" + src.substring(4, src.length+1);
			if(this.value.length > 7)
				temp = src.substring(0,4) + "-" + src.substring(4,6) + "-" + src.substring(6, src.length+1);
			this.value = temp;
		}
		if(this.value.length > 7)	
			this.value = prevInput;
	});
	
}

/**
 * DatePicker 이벤트 연결 초기화 루틴
 * 기간 설정용
 */
function initDatePickerRange(){
	prevInput = ""
	$('.input-daterange.input-group').datepicker({
	  format: 'yyyy-mm-dd',
	  todayHighlight: true,
	  language: 'ko',
	  autoclose: true
	});
	
	$('.input-daterange.input-group input').keydown(function(){
		if(this.value.length < 11)	prevInput = this.value;
	});
	
	$('.input-daterange.input-group input').keyup(function(){	
		var src = this.value.replace(/-/g, '');
		
		if(src.length > 4){
			temp = src.substring(0,4) + "-" + src.substring(4, src.length+1);
			if(this.value.length > 7)
				temp = src.substring(0,4) + "-" + src.substring(4,6) + "-" + src.substring(6, src.length+1);
			this.value = temp;
		}
		if(this.value.length > 10)	
			this.value = prevInput;
	});
}
initDatePicker();
initDatePickerRange();

$('[data-href]').on("click", function() {
    document.location = $(this).data('href');
});
