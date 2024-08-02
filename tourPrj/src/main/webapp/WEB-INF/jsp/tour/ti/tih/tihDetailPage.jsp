<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="<c:url value='/'/>css/base.css">
<link rel="stylesheet" href="<c:url value='/'/>css/layout.css">
<link rel="stylesheet" href="<c:url value='/'/>css/component.css">
<link rel="stylesheet" href="<c:url value='/'/>css/page.css">
<link rel="stylesheet" href="<c:url value='/'/>css/main.css">
<link rel="stylesheet" href="<c:url value='/'/>css/tour/ti/tih/tihDetailPage.css">
<script src="<c:url value='/'/>js/jquery-1.11.2.min.js"></script>
<script src="<c:url value='/'/>js/ui.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d20b2ce38e0a6cdfdd3f269a8c89dbd6&libraries=services"></script>
<script src="<c:url value='/js/tour/ti/tih/tihDetailPage.js'/>"></script>
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
							<div id="contents" class="content" style="overflow: auto;">


								<!-- Location -->
								<div class="location">
									<ul>
										<li><a class="home" href="/cmm/main/mainPage.do">Home</a></li>
										<li><a href="">관광정보</a></li>
										<li>숙박정보</li>
									</ul>
								</div>
								<!--// Location -->

								<div class="gallery"></div>
								<div class="detail-info">
									<div class="detail-left"></div>
									<div class="detail-right"></div>
								</div>
							</div>

							<input id="contentId" name="contentId" type="hidden"
								value="<c:out value='${contentId}'/>">
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