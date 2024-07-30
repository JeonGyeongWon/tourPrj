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
	<link rel="stylesheet" href="<c:url value='/'/>css/base.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/layout.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/component.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/page.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/main.css">
	<script src="<c:url value='/'/>js/jquery-1.11.2.min.js"></script>
	<script src="<c:url value='/'/>js/ui.js"></script>
	<script src="<c:url value='/js/tour/ti/tih/tihDetailPage.js'/>"></script>
		<style>
        .tih_list_ui {
            list-style-type: none;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin: 0; /* Add this if needed to remove default ul margin */
        }
        .tih_list_li {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            box-sizing: border-box;
        }
        .image {
            margin-bottom: 10px;
            width: 150px;
            height: 150px;
            overflow: hidden;
        }
        .image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
        .details {
            flex: 1;
        }
        .title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .addr1, .tel {
            margin-bottom: 5px;
        }
    </style>
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
								<h1 class="tit_1">관광정보</h1>

								<h2 class="tit_2">숙박정보</h2>
								<div class="board_list"></div>
							</div>
							<input id="contentId" name="contentId" type="hidden" value="<c:out value='${contentId}'/>">
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