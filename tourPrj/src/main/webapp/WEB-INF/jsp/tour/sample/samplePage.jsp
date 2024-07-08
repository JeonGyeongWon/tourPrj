<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
	<script src="<c:url value='/'/>js/jquery-1.11.2.min.js"></script>
	<script src="<c:url value='/'/>js/ui.js"></script>

<title>샘플페이지</title>
<script type="text/javaScript" language="javascript" defer="defer">

$(document).ready(function(){
	
	$("#chkUrl").on("change",function(){
		
		fn_apiSample($(this).val());
		
	});
	
});

function fn_apiSample(chkUrl){
	
	var url = "<c:url value='/api/test.do'/>";
	$.ajax({
	        url: url,
	        type: "post",
	        dataType: "json",
// 	        contentType: 'application/json; charset=utf-8',         
	        async : false,
	        data: {
	        	chkUrl : chkUrl,
	        },
// 	        data: JSON.stringify({
// 	        	chkUrl : url,
// 	        }),
	        success: function (data) {
	        	
	        	//console 참고하시면 됩니다.! 
	        	$(".board_list").html(JSON.stringify(data));
	        	
	        	//실제 데이터입니다~
// 	        	var items = data.response.body.items.item;
	        	
// 	        	for(var i = 0; i < items.length; i++){
// 	        		$(".board_list").append(items[i]);
// 	        	}
	        	
	        	
	        	
	        },
	        error: function(error){
// 	        	loadingHide();dd
	        	console.log("error : " + error);
	        	
	        }
	    });
	
}

</script>

</head>
<body>
<noscript class="noScriptTitle">자바스크립트를 지원하지 않는 브라우저에서는 일부 기능을 사용하실 수 없습니다.</noscript>

    <!-- Skip navigation -->
    <a href="#contents" class="skip_navi">본문 바로가기</a>

    <div class="wrap">
        <!-- Header -->
		<c:import url="/sym/mms/EgovHeader.do" />
		<!--// Header -->

        <div class="container">
            <div class="sub_layout">
                <div class="sub_in">
                    <div class="layout">
                        <!-- Left menu -->
<%-- 						<c:import url="/sym/mms/EgovMenuLeft.do" /> --%>
						<!--// Left menu -->
        
                        <div class="content_wrap">
                            <div id="contents" class="content">
                                 <!-- Location -->
                                <div class="location">
                                    <ul>
                                        <li><a class="home" href="">샘플페이지</a></li>
                                    </ul>
                                </div>
                                <!--// Location -->

<%-- 								<form name="listForm" action="<c:url value='/uss/umt/user/EgovUserManage.do'/>" method="post"> --%>
								
								<input name="selectedId" type="hidden" />
								<input name="checkedIdForDel" type="hidden" />
								 <!-- 검색조건 -->
                                <div class="condition">
                                    <label class="item f_select" for="chkUrl">
                                        <select name="chkUrl" id="chkUrl" title="피카츄돈가스 먹고싶다.">
	                                        <option value="/locationBasedList1">1. 위치기반 관광정보 조회</option>
	                                        <option value="/searchKeyword1">2. 키워드 검색 조회</option>
	                                        <option value="/searchFestival1">3. 행사정보 조회</option>
	                                        <option value="/searchStay1">4. 숙박정보 조회</option>
	                                        <option value="/detailCommon1">5. 공통정보 조회</option>
	                                        <option value="/detailIntro1">6. 소개정보조회</option>
	                                        <option value="/detailInfo1">7. 반복정보조회</option>
	                                        <option value="/detailImage1">8. 이미지 정보 조회</option>
	                                        <option value="/areaBasedSyncList1">9 관광정보 동기화 목록 조회</option>
	                                        <option value="/areaCode1">10. 지역코드조회</option>
	                                        <option value="/detailPetTour1">11. 반려동물 동반 여행 정보</option>
	                                        <option value="/categoryCode1">12. 서비스 분류 코드 조회</option>
	                                        <option value="/areaBasedList1">13. 지역기반 관광정보조회</option>
                                        </select>
                                    </label>
                                </div>
                                <!--// 검색조건 -->

                                <h1 class="tit_1">샘플페이지</h1>
<!-- 								<div class="board_list_top"> -->
<!-- 									<div class="left_col"> -->
<!-- 	                                	<div class="list_count"> -->
<!-- 	                                 	</div> -->
<!-- 	                            	</div> -->
<!--                                 </div> -->
								
                                <!-- 게시판 -->
                                <div class="board_list">
                                </div>

                                <!--// 게시판 -->
                                
<!--                                 </form> -->
                                
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