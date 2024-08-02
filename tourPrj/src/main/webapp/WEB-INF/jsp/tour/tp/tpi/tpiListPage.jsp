<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="<c:url value='/'/>css/layout.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/component.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/page.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/main.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/tour/tp/tpi/tpi.css">
	<script src="<c:url value='/js/tour/tp/tpi/tpiListPage.js'/>"></script>
</head>
<body>
    <!-- Skip navigation -->
    <a href="#contents" class="skip_navi">본문 바로가기</a>

    <div class="wrap">
        <!-- Header -->
        <c:import url="/sym/mms/EgovHeader.do" />
        <!--// Header -->

        <div class="container">
       		<div class="sub_layout">
                <div>
					<div class="layout">
						<div class="content_wrap">
							<div id="contents" class="content">
						        <!-- Location -->
								<div class="location">
									<ul>
										<li><a class="home" href="/cmm/main/mainPage.do">Home</a></li>
										<li><a href="">계획</a></li>
										<li>여행계획</li>
									</ul>
								</div>
								<!--// Location -->
								<h1 class="tit_1">여행계획</h1>
						        <button type="button" class="tpi-button" onclick="tpiCalModal();">여행 추가</button>
						        <hr class="tit_hr">
								<form id="dateForm" action="/tpi/tpiPlan.do">
						            <input type="hidden" id="startDate" name="tourStart">
						            <input type="hidden" id="endDate" name="tourEnd">
						        </form>
								<div class="tpiList"></div>
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>

        <!-- Footer -->
        <c:import url="/sym/mms/EgovFooter.do" />
        <!--// Footer -->
    </div>
</body>
</html>