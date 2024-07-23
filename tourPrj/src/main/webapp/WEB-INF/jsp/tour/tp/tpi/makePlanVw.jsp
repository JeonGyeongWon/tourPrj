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
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="<c:url value='/'/>js/jquery-1.11.2.min.js"></script>
    <script src="<c:url value='/'/>js/ui.js"></script>
    <script src="<c:url value='/'/>js/main.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">

    <style>
        .ui-timepicker-container {
            z-index: 99999;
        }
        .modal_content {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 25px;
            border: 1px solid #888;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            width: 50%;
            height: 80%;
            overflow: hidden;
        }
        .pop_bg {
            display: none;
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 9998;
        }
        .close_button {
            float: right;
            cursor: pointer;
        }
        .tour_item {
            border-bottom: 1px solid #ddd;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .tour_item .info {
            display: flex;
            align-items: center;
        }
        .tour_item .checkbox {
        	display: block !important;
        	width: 15px !important;
        	height: 15px !important;
            margin-right: 30px;
        }
        .tour_item img {
            min-width: 100px;
            max-width: 150px;
            min-height: 100px;
            max-height: 150px;
            margin-left: auto;
        }
        .pagination {
            margin-top: 20px !important;
            text-align: center;
            display: flex !important;
            justify-content: center;
        }
        .pagination a {
            margin: 0 5px;
            cursor: pointer;
            text-decoration: none;
        }
        .title_txt {
        	display: flex;
        	font-family: Sp_r;
        	font-size: 18px;
        	margin-bottom: 20px;
        }
        .txt01 {
        	display: flex;
        	font-family: Sp_l;
        	font-size: 16px;
        }
        .modal_content h2 {
        	margin-bottom: 15px;
        }
        .modal_content select {
        	margin-right: 20px;
        }
        .modal_content label {
            font-family: Sp_r;
        	font-size: 15px;
        }
        .list_container {
            height: calc(100% - 180px);
            overflow-y: auto;
        }
        .src_btn {
            padding: 10px 20px;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background-color: #999;
        }
        .pick_btn {
            padding: 10px 20px;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        	background-color: #0044cc;
        }
        .search_container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .search_container select,
        .search_container button {
            margin-right: 10px;
        }
    </style>
    <script src="<c:url value='/js/tour/tp/tpi/tourInfo_ui.js'/>"></script>
</head>
<body>
    <!-- Skip navigation -->
    <a href="#contents" class="skip_navi">본문 바로가기</a>

    <div class="wrap">
        <!-- Header -->
        <c:import url="/sym/mms/EgovHeader.do" />
        <!--// Header -->

        <div class="container main">
            <span>#혼자 떠나기 좋은 여행</span>
            <div>
                <label for="startDate">시작일</label>
                <input type="text" id="startDate" name="startDate"> ~ 
                <label for="endDate">종료일</label>
                <input type="text" id="endDate" name="endDate">
            </div>
            <a href="#" id="tourInfoModal">관광지 찾기</a>
        </div>
        <!-- 모달창 -->
        <div class="pop_bg"></div>
        <div id="tourInfoPop" class="modal_content">
            <span class="close_button">X</span>
            <h2>관광지 찾기</h2>
            <form id="searchForm" method="post" action="<c:url value='/tpi/searchTourInfo.do'/>">
            	<div class="search_container">
            		<div>
		                <label for="region">지역 선택:</label>
		                <select id="region" name="region">
		                    <option value="서울">서울</option>
		                    <option value="부산">부산</option>
		                    <option value="대구">대구</option>
		                </select>
		                
		                <label for="contTYpe">관광 유형:</label>
		                <select id="contTYpe" name="contTYpe">
		                    <option value="12">관광지</option>
		                    <option value="14">문화시설</option>
		                    <option value="15">축제공연행사</option>
		                    <option value="28">레포츠</option>
		                    <option value="32">숙박</option>
		                    <option value="38">쇼핑</option>
		                    <option value="39">음식점</option>
		                </select>
		                <button type="button" id="searchButton" class="src_btn">검색</button>
                	</div>
                	<button type="button" id="pickBtn" class="pick_btn" style="display:none;">담기</button>
                </div>
            </form>
            <!-- 검색 결과 -->
            <div style="margin: 20px 0;" id="totalCnt"></div>
            <div id="tourListContainer" class="list_container"></div>
            <div class="pagination"></div>
        </div>

        <!-- Footer -->
        <c:import url="/sym/mms/EgovFooter.do" />
        <!--// Footer -->
    </div>
</body>
</html>
