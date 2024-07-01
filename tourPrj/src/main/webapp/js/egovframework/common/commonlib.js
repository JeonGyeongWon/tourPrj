
(function($){
	$.commonlib = {
			options : {
				
			},
			
			_showLoadingMessage : function(obj){
				if(obj == undefined){
					$.isLoading({ text: "Loading" ,position:   "overlay"});
				}else{
					$(obj).isLoading({ text: "Loading" ,position:   "overlay"});
				}
			},

		    _showClosingMessage : function(obj){
		    	if(obj == undefined){
		    		$.isLoading('hide');
		    	}else{
		    		$(obj).isLoading('hide');
		    	}
		    },
		    
		    _openErrorWindow : function(data){
		    	$("#errorMessage").html(data["message"]);
		    	$("#errorTrace").html(data["trace"]);
		    	$("#errorLayer").data("kendoWindow").open().center();
		    },
		    
		    _replaceAll : function(str,orgStr,newStr){
				return str.split(orgStr).join(newStr);
			},

			_isObjectExist : function(obj){
				if($(obj).length > 0){
					return true;
				}else{
					return false;
				}
			},
			
			/*_objectToJSONString : function(object){
				var isArray = (object.join && object.pop && object.push
	                    && object.reverse && object.shift && object.slice && object.splice);
			    var results = [];
			 
			    for (var i in object) {
			        var value = object[i];
			         
			        if (typeof value == "object") 
			            results.push((isArray ? "" : "\"" + i.toString() + "\" : ")
			                             + this(value));
			        else if (value)
			            results.push((isArray ? "" : "\"" + i.toString() + "\" : ") 
			                            + (typeof value == "string" ? "\"" + value + "\"" : value));
			    }
			     
			    return (isArray ? "[" : "{") + results.join(", ") + (isArray ? "]" : "}");
			},*/
			
			_initValidator : function(){
				/* $.validator.addMethod("required", function(value, element, params) {
					// Check if dependency is met
					if ( !this.depend( params, element ) ) {
						return "dependency-mismatch";
					}
					if ( element.nodeName.toLowerCase() === "select" ) {

						// Could be an array for select-multiple or a string, both are fine this way
						var val = $( element ).val();
						return val && val.length > 0;
					}
					if ( this.checkable( element ) ) {
						return this.getLength( value, element ) > 0;
					}
					return value.length > 0;
				});
				
				$.validator.addMethod("maxlength", function(value, element, params) {
					var length = $.isArray( value ) ? value.length : this.getLength( value, element );
					return this.optional( element ) || length <= params[1];
				}); */
				
				jQuery.extend(jQuery.validator.messages, {
					required : jQuery.validator.format($.commonlib.options.requriedMessage),
					maxlength : jQuery.validator.format($.commonlib.options.maxlengthMessage),
					minlength : jQuery.validator.format($.commonlib.options.minlengthMessage),
					url : jQuery.validator.format($.commonlib.options.urlMessage),
					email : jQuery.validator.format($.commonlib.options.emailMessage),
					number : jQuery.validator.format($.commonlib.options.numberMessage),
					range : jQuery.validator.format($.commonlib.options.rangeMessage),
					photoJPG : jQuery.validator.format($.commonlib.options.photoJPGMessage)
				});
			},
			
			_initErrorLayer : function(){
				/*$("#errorLayer").kendoWindow({
			        width: "1020px",
			        //height: "420px",
			        modal: true,
			        animation : {open :{effects:"expand:vertical fadeIn"},close :{effects:"expand:vertical fadeIn", reverse: true}},
			        visible : false,
			        actions: ["Minimize", "Maximize", "Close"],
			        title: "오류 메시지"
			   	});
				
				$('.btnError button').click(function(){
					console.log('test');
					if($(this).parent().hasClass('blue')){
						$(this).parent().removeClass('blue');
						$(this).text('Close');
						$(this).parent().parent().parent().find('.detailView').show();
					}else{
						$(this).parent().addClass('blue');
						$(this).text('Detail View');
						$(this).parent().parent().parent().find('.detailView').hide();
					}
				});*/
			},
			
			_openIpinAuthPopup : function(obj){
				window.open('', 'popupIPIN2', 'width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
				$(obj).attr("target","popupIPIN2");
				$(obj).attr("action","https://cert.vno.co.kr/ipin.cb");
				$(obj).submit();
			},
			
			_openHpAuthPopup : function(obj){
				window.open('', 'popupChk', 'width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
				$(obj).attr("target","popupChk");
				$(obj).attr("action","https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb");
				$(obj).submit();
			},
			
			_getIpinAuthInfo : function(obj,authObj,returnUrl){
				$.ajax({
					url: "/join/getIpinAuthInfo.do",
					type:'POST',
					dataType:'json',
					data : {returnUrl : returnUrl},
					success:function(data, statusText, xhr){
						//$.showClosingMessage();
						$(authObj).val(data["sEncData"]);
						$(obj).openIpinAuthPopup();
					}
				});
			},
			
			_getHpAuthInfo : function(obj,authObj,returnUrl){
				$.ajax({
					url: "/join/getHpAuthInfo.do",
					type:'POST',
					dataType:'json',
					data : {returnUrl : returnUrl},
					success:function(data, statusText, xhr){
						//$.showClosingMessage();
						$(authObj).val(data["sEncData"]);
						$(obj).openHpAuthPopup();
					}
				});
			},
			
			_isValidPassword : function (str){
				var pw = str;
				var num = pw.search(/[0-9]/g);
				var eng = pw.search(/[a-z]/ig);
				var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

				if(pw.length < 10 || pw.length > 20){
					alert("10자리 ~ 20자리 이내로 입력해주세요.");
					return false;
				}

				if(pw.search(/₩s/) != -1){
					alert("비밀번호는 공백업이 입력해주세요.");
					return false;
				}

				if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ){
					alert("영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.");
					return false;
				}

				return true;
			},
			
			_addCommas : function (nStr){
			    nStr += '';
			    x = nStr.split('.');
			    x1 = x[0];
			    x2 = x.length > 1 ? '.' + x[1] : '';
			    var rgx = /(\d+)(\d{3})/;
			    while (rgx.test(x1)) {
			        x1 = x1.replace(rgx, '$1' + ',' + '$2');
			    }
			    return x1 + x2;
			},
			
			init : function(settings){
				$.commonlib.options 	= $.extend(true,$.commonlib.defaultOptions, settings);
				
				$.commonlib._initErrorLayer();
				$.commonlib._initValidator();
				
				/*$.validator.addMethod("password", function(value, element) {
					return this.optional(element) || /^[a-zA-Z0-9]{10,15}$/.test(value);
		        }); */
				
				$.ajaxSetup({
					type:'POST',
					dataType:'json',
					async: true,					
					beforeSend :function(XMLHttpRequest){
//						$.showLoadingMessage();
					},
					complete : function(){
//						$.showClosingMessage();
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						if(XMLHttpRequest.status == 403){
							location.href="/uat/uia/egovLoginUsr.do";
						}else{
							$.showClosingMessage();
							var result = $.parseJSON(XMLHttpRequest.responseText);
							alert(result["msg"]);
						}
					}
				});
			}
		};
	
	$.commonlib.defaultOptions = {
		contextPath: "",
		requriedMessage : "",
		maxlengthMessage : "",
		minlengthMessage : "",
		emailMessage : "",
		numberMessage : "",
		rangeMessage : "",
		urlMessage : "",
		photoJPGMessage : ""
	};
	
	$.fn.extend({
		openIpinAuthPopup : function(){
			return this.each(function(){
				(new $.commonlib._openIpinAuthPopup(this));
			});
		},
		openHpAuthPopup : function(){
			return this.each(function(){
				(new $.commonlib._openHpAuthPopup(this));
			});
		},
		getIpinAuthInfo : function(authObj,returnUrl){
			return this.each(function(){
				(new $.commonlib._getIpinAuthInfo(this,authObj,returnUrl));
			});
		},
		getHpAuthInfo : function(authObj,returnUrl){
			return this.each(function(){
				(new $.commonlib._getHpAuthInfo(this,authObj,returnUrl));
			});
		}
	});
	
	$.openErrorWindow				= $.commonlib._openErrorWindow;
	$.showLoadingMessage    		= $.commonlib._showLoadingMessage;
	$.showClosingMessage    		= $.commonlib._showClosingMessage;
	$.objectToJSONString			= $.commonlib._objectToJSONString;
	$.isValidPassword				= $.commonlib._isValidPassword;
	$.addCommas						= $.commonlib._addCommas;
})(jQuery);