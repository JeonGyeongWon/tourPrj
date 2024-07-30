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
    <link rel="stylesheet" href="<c:url value='/'/>css/tour/tp/tpm/tpmModal.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="<c:url value='/'/>js/jquery-1.11.2.min.js"></script>
    <script src="<c:url value='/'/>js/ui.js"></script>
    <script src="<c:url value='/'/>js/main.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">

    <style>
    </style>
    <script src="<c:url value='/js/tour/tp/tpm/tourInfo_ui.js'/>"></script>
</head>
<body onload="parent.iframeLoaded();">
    <div class="popup">
        <div class="pop_inner">
            <div class="pop_header">
                <h1>관광지 찾기</h1>
                <button type="button" class="close" onclick="closePop(); return false;">닫기</button>
            </div>

            <div class="pop_container">
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
                            <button type="button" id="srchBtn" class="srchBtn">검색</button>
                        </div>
                        <button type="button" id="pickBtn" class="pickBtn">담기</button>
                    </div>         
                </form>
                <div style="margin: 10px 0;" id="totalCnt"></div>
                <div id="tourListContainer" class="list_container"></div>
                <div class="pagination"></div>
            </div>
        </div>
    </div>
</body>
</html>
