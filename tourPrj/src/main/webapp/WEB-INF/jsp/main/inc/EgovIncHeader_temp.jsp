<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%--<html lang="ko" >
<head>
	<title>수소유통정보시스템</title>
	<meta charset="utf-8">
	<meta name="description" content="수소유통정보시스템">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=yes">

</head>
<body>--%>
<!-- 헤더 -->
<%@ include file="/WEB-INF/jsp/common/IncScriptCss.jsp"%>
<script>
	if(/MSIE \d |Trident.*rv:/.test(navigator.userAgent)) {
		window.location = 'microsoft-edge:' +window.location.href
		 window.open('','_self')
		setTimeout(function () {
			window.close();
		},100);
	} else if (navigator.userAgent.indexOf("Trident") > 0) {
		window.location = 'microsoft-edge:' +window.location.href;
		window.open('','_self')
		setTimeout(function () {
			window.close();
		},100);
	}
	
	function postLink(url, params) {
        var form = document.createElement('form');
        form.method = 'POST';
        form.action = url;

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = key;
                hiddenField.value = params[key];

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }
	
</script>
<div id="accessibility">
	<a href="#gnb">주메뉴 바로가기</a>
	<a href="#sub_container">본문 바로가기</a>
</div>
<div id="header" class="main_header">
	<div class="main_header_wrap">
		<a  href="/cmm/main/mainPage.do" class="logo"><span class="hidden">수소유통정보시스템</span></a>
		<!--gnb-->
		<div id="gnb" class="main_gnb">
			<div class="gnb_head">
				<h1 class="logo"><span class="hidden">수소유통정보시스템</span></h1>
			</div>
			<ul>
				<!-- 1 depth -->
				<c:forEach var="head" items="${list_headmenu}" varStatus="status">
					<li class=""><a href="<c:out value="${head.chkURL}" />"><c:out value="${head.menuNm}" /></a>
						<ul>
							<!-- 2 depth -->
							<c:forEach var="sub" items="${list_submenu}" varStatus="status">
								<c:if test="${head.menuNo == sub.upperMenuId}">
									
								<c:choose>
									<c:when test="${sub.menuNo eq 6010000 or sub.menuNo eq '6000000'}">
			                    		<li>
			                    		
			                    		 <a href="javascript:void(0);" onclick="postLink('${sub.chkURL}', {tmp_menuNm: '${sub.menuNo}|${sub.upperMenuId}|${sub.menuNm}|${sub.relateImagePath}|${sub.relateImageNm}|${sub.chkURL}|'});">${sub.menuNm}</a>
			                    		
			                    		</li>
			                    		
<%-- 			                    		<a href="<c:out value="${sub.chkURL}" />?tmp_menuNm=<c:out value='${sub.menuNo}'/>|<c:out value='${sub.upperMenuId}'/>|<c:out value='${sub.menuNm}'/>|<c:out value='${sub.relateImagePath}'/>|<c:out value='${sub.relateImageNm}'/>|<c:out value='${sub.chkURL}'/>|"><c:out value="${sub.menuNm}" /></a></li> --%>
			                    	</c:when>
			                    	<c:otherwise>
			                    		<li><a href="<c:out value="${sub.chkURL}" />"><c:out value="${sub.menuNm}" /></a></li>
			                    	</c:otherwise>
								
								</c:choose>
<%-- 									${sub} <br> --%>
<%-- 									<li class="head"><a href="<c:out value="${sub.chkURL}" />"><c:out value="${sub.menuNm}" /></a></li> --%>
								</c:if>
							</c:forEach>
						</ul>
					</li>
				</c:forEach>
			</ul>
		</div>
		<!--//gnb-->

		<div class="search_wrap">
			<c:if test="${LoginVO == null}">
				<a href="<c:url value="/uat/uia/egovLoginUsr.do"/>" class="login_btn">로그인</a>
			</c:if>
			<c:if test="${LoginVO != null}" >
				<a href="<c:url value="/main/myPageVw.do"/>"><div style="margin-top: 10px;" class="my_icon"><span class="hidden">수소유통정보시스템</span></div></a>
				<a href="<c:url value="/uat/uia/actionLogout.do"/>" class="login_btn">로그아웃</a>
			</c:if>
			<a href="#" class="all_menu"></a>
		</div>
	</div>
</div>
<!--mobile_gnb-->
<div id="moGnb">
	<div class="m_gnb_wrap">
		<div class="m_gnb_header">
			<h3>전체메뉴</h3>
			<a href="#" class="m_gnb_close">창닫기</a>
			<a href="#" class="m_gnb_mypage">마이페이지</a>
			<c:if test="${LoginVO == null}">
				<a href="<c:url value="/uat/uia/egovLoginUsr.do"/>" class="login_btn">로그인</a>
			</c:if>
			<c:if test="${LoginVO != null}" >
				<a href="<c:url value="/main/myPageVw.do"/>"><div style="margin-top: 10px;" class="my_icon"><span class="hidden">수소유통정보시스템</span></div></a>
				<a href="<c:url value="/uat/uia/actionLogout.do"/>" class="login_btn">로그아웃</a>
			</c:if>
		</div>
		<div class="m_menu_wrap">
			<ul class="depth_1">
				<c:forEach var="head" items="${list_headmenu}" varStatus="status">
					<c:if test="${status.count == 1}">
						<li style="cursor: pointer" rel="mo_tab${status.count}" class="hover">
					</c:if>
					<c:if test="${status.count != 1}">
						<li style="cursor: pointer" rel="mo_tab${status.count}">
					</c:if>
					<c:out value="${head.menuNm}" />
					</li>
				</c:forEach>
			</ul>
			<c:forEach var="head" items="${list_headmenu}" varStatus="status">
				<div class="depth_2_wrap" id="mo_tab${status.count}">
					<h4><c:out value="${head.menuNm}" /></h4>
					<ul class="depth_2">
						<c:forEach var="sub" items="${list_submenu}" varStatus="status">
							<c:if test="${head.menuNo == sub.upperMenuId}">
							
								<c:choose>
									<c:when test="${sub.menuNo eq '6010000' or sub.menuNo eq '6000000'}">
			                    		<span><c:out value="${checkId}"/></span> 는 사용가능한 아이디입니다.
			                    		<li><a href="<c:out value="${sub.chkURL}" />?tmp_menuNm=<c:out value='${result.menuNo}'/>|<c:out value='${result.upperMenuId}'/>|<c:out value='${result.menuNm}'/>|<c:out value='${result.relateImagePath}'/>|<c:out value='${result.relateImageNm}'/>|<c:out value='${result.chkURL}'/>|"><c:out value="${sub.menuNm}" /></a></li>
			                    	</c:when>
			                    	<c:otherwise>
			                    		<li><a href="<c:out value="${sub.chkURL}" />"><c:out value="${sub.menuNm}" /></a></li>
			                    	</c:otherwise>
								
								</c:choose>
							
							</c:if>
						</c:forEach>
					</ul>
				</div>
			</c:forEach>
		</div>
	</div>
</div><!--//mobile_gnb-->
<div class="subMenu_bg">
	<div class="gnb_left">
		<p class="txt1">수소유통정보시스템은</p>
		<p class="txt2">
			충전소 이용정보를 실시간으로 제공하여<br>
			수소차 이용자의 편리한 이용환경을<br>
			제공합니다
		</p>
	</div>
</div>
<!--헤더끝-->
<%@ include file="/WEB-INF/jsp/common/IncScript.jsp" %>
<%--</body>--%>

<!-- 서버측 메시지 출력창  -->
<script>
	/* ********************************************************
 	* 메시지 확인창 호출 함수
 	******************************************************** */
	function fn_modalAlert(msg, callFunc)
	{
		cfunc.alert.error('경고',msg,callFunc);
	}

	/* ********************************************************
 	* 저장, 실행 등을 처리하기위한 메시지 출력창 호출 함수
 	******************************************************** */
	function fn_modalConfirm(msg, callFunc)
	{
		//Confirm메시지창 출력
		cfunc.alert.warn('확인',msg,callFunc);
	}


</script>

<%--</html>--%>
