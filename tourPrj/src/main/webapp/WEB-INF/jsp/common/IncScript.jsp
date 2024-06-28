<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<%--전자정부 공통 (퍼블 완료 후 삭제)--%>
<script src="<c:url value="/resource/pub/js/jquery-3.1.1.min.js"/>"></script>
<%--<script src="<c:url value="/resource/libs/jquery/3.1.1/jquery-3.1.1.min.js"/>"></script>--%>
<script src="/assets/egovframework/js/tether/1.3.3/js/tether.min.js"></script>
<script src="/assets/egovframework/js/bootstrap.min.js"></script>
<script src="/assets/egovframework/extensions/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.min.js" ></script>
<script src="/assets/egovframework/extensions/bootstrap-datepicker/1.6.4/locales/bootstrap-datepicker.ko.min.js" ></script>
<script src="/assets/egovframework/js/autosize.min.js"></script>
<script src="<c:url value='/js/egovframework/common/common.js'/>"></script>
<script src="<c:url value="/js/egovframework/common/jquery.form.js" />"></script>
<script src="<c:url value="/js/egovframework/common/jquery.validate.js" />"></script>
<script src="<c:url value="/js/egovframework/common/commonlib.js" />"></script>
<script src="<c:url value="/js/egovframework/common/jquery.blockUI.js" />"></script>
<script src="<c:url value="/js/egovframework/common/bootbox.min.js" />"></script>
<c:if test="${param.pageType ne 'eb-main' }">
    <script src="<c:url value="/validator.do"/>"></script>
</c:if>
<script src="<c:url value="/js/egovframework/com/cmm/showModalDialog.js" />"></script>
<%--전자정부 공통 (퍼블 완료 후 삭제) END--%>


<!-- 서버측 메시지 출력창  -->
<script>

    //console.log(fileWhiteList);
    /* ********************************************************
     * 저장, 실행 등을 처리하기위한 메시지 출력창 호출 함수
     ******************************************************** */
    function fn_modalConfirm(msg, callFunc)
    {
        //Confirm메시지창 출력
        bootbox.confirm({
            title: "메시지",
            message: msg,
            buttons: {
                confirm: {
                    label: "저장",
                    className: 'btn-success'
                },
                cancel: {
                    label: "취소",
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    callFunc(result);
                }
            }
        });
    }

</script>





<!-- 라이브버리 -->
<script src="<c:url value="/resource/libs/jquery-ui/jquery-ui.js"/>"></script>
<script src="<c:url value="/resource/libs/jquery-ui-month-picker/jquery.mtz.monthpicker.js"/>"></script>
<script src="<c:url value="/resource/libs/lodash/lodash.min.js"/>"></script>
<script src="<c:url value="/resource/libs/sweetalert/sweetalert.min.js"/>"></script>
<script src="<c:url value="/resource/libs/html2canvas/html2canvas.js"/>"></script>
<script src="<c:url value="/resource/libs/jquery-step/js/jquery.smartWizard.min.js"/>"></script>

<!-- 퍼블 -->
<script src="<c:url value="/resource/pub/plugin/mCustomScrollbar/jquery.mCustomScrollbar.js"/>"></script>
<script src="<c:url value="/resource/pub/plugin/lightslider/src/js/lightslider.js"/>"></script>
<script src="<c:url value="/resource/pub/js/ui.js?v="/>1"></script>



<%--공통모듈--%>
<script src="<c:url value="/js/common/cfunc-alert.js?v="/>1"></script>
<script src="<c:url value="/js/common/cfunc-address.js?v="/>1"></script>
<script src="<c:url value="/js/common/cfunc-common.js?v="/>1"></script>
<script src="<c:url value="/js/common/cfunc-biz.js?v="/>1"></script>



<%--컨텍스트 패스 설정--%>
<script>
    sessionStorage.setItem("contextpath", "${pageContext.request.contextPath}");
    (function ($) {
        $.each(['show', 'hide'], function (i, ev) {
            var el = $.fn[ev];
            $.fn[ev] = function () {
                this.trigger(ev);
                return el.apply(this, arguments);
            };
        });
        
        var nowURL = location.pathname + location.search;
        if(!location.pathname + location.search == "/main/userLogin.do"){
			if("${session.getID} == null"){
				sessionStorage.setItem("requestURL", nowURL);
        	}
        }
        
    })(jQuery);
</script>


