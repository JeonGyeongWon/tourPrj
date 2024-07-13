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
	<script src="<c:url value='/'/>js/main.js"></script>
	
<title>트레넥트! 여행의 시작 ~! 문구</title>
</head>
<body>
<noscript>트레넥트! 여행의 시작 ~! 문구</noscript>	
<!-- 전체 레이어 시작 -->

<body>

    <!-- Skip navigation -->
    <a href="#contents" class="skip_navi">본문 바로가기</a>

    <div class="wrap">
        <!-- Header -->
        <c:import url="/sym/mms/EgovHeader.do" />
        <!--// Header -->

        <div class="container main">
            <div class="P_MAIN">
<!--                 <div class="inner" style="border: 1px solid red;"> -->
<!--                     <p class="visual"> -->
<!--                         <span class="t_1">표준프레임워크</span> -->
<!--                         <span class="t_2">경량환경 내부업무</span> -->
<!--                         <span class="t_3">표준프레임워크 경량환경 내부업무에 대한 전반적인 지원을 약속합니다.</span> -->
<!--                     </p> -->
<!--                 </div> -->

                <div class="bot">
                    <div class="col">
                        <div class="left_col">
                            <div class="box" style="border: 1px solid red;">
                            	<div class="head">
                                	<h2>지역정보</h2>
                                </div>
                                <div class="list">
                                	<div class="slide-container">
								        <h2>Slide Show 1</h2>
								        <div class="slideshow" id="slideshow1">
								            <div class="slides">
								                <div class="slide" style="background-color: red;">Slide 1</div>
								                <div class="slide" style="background-color: green;">Slide 2</div>
								                <div class="slide" style="background-color: blue;">Slide 3</div>
								            </div>
								            <div class="controls">
								                <div class="control" onclick="prevSlide('slideshow1')">❮</div>
								                <div class="control" onclick="nextSlide('slideshow1')">❯</div>
								            </div>
								        </div>
								    </div>
								    <div class="slide-container">
								        <h2>Slide Show 2</h2>
								        <div class="slideshow" id="slideshow2">
								            <div class="slides">
								                <div class="slide" style="background-color: purple;">Slide 1</div>
								                <div class="slide" style="background-color: yellow;">Slide 2</div>
								                <div class="slide" style="background-color: orange;">Slide 3</div>
								            </div>
								            <div class="controls">
								                <div class="control" onclick="prevSlide('slideshow2')">❮</div>
								                <div class="control" onclick="nextSlide('slideshow2')">❯</div>
								            </div>
								        </div>
								    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right_col">
                            <div class="box" style="border: 1px solid red;">
                                <div class="head">
                                	<h2>지역축제현황</h2>
                                </div>
                                <div class="list">
                                
                                
        						<div class="sec05">
						          <div id="mapArea" class="map_area">
						            <a class="su" title="서울">서울</a>
						            <div class="data_map data_su">
						              <p class="txt01">서울</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#" class="kk" title="경기">경기</a>
						            <div class="data_map data_kk">
						              <p class="txt01">경기</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="ic" title="인천">인천</a>
						            <div class="data_map data_ic">
						              <p class="txt01">인천</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="gw" title="강원">강원</a>
						            <div class="data_map data_gw">
						              <p class="txt01">강원</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="cb" title="충북">충북</a>
						            <div class="data_map data_cb">
						              <p class="txt01">충북</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="sj" title="세종">세종</a>
						            <div class="data_map data_sj">
						              <p class="txt01">세종</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="dj" title="대전">대전</a>
						            <div class="data_map data_dj">
						              <p class="txt01">대전</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="cn" title="충남">충남</a>
						            <div class="data_map data_cn">
						              <p class="txt01">충남</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="jb" title="전북">전북</a>
						            <div class="data_map data_jb">
						              <p class="txt01">전북</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="jn" title="전남">전남</a>
						            <div class="data_map data_jn">
						              <p class="txt01">전남</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="kj" title="광주">광주</a>
						            <div class="data_map data_kj">
						              <p class="txt01">광주</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="kb" title="경북">경북</a>
						            <div class="data_map data_kb">
						              <p class="txt01">경북</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="tg" title="대구">대구</a>
						            <div class="data_map data_tg">
						              <p class="txt01">대구</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a  href="#"  class="us" title="울산">울산</a>
						            <div class="data_map data_us">
						              <p class="txt01">울산</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="kn" title="경남">경남</a>
						            <div class="data_map data_kn">
						              <p class="txt01">경남</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="bs" title="부산">부산</a>
						            <div class="data_map data_bs">
						              <p class="txt01">부산</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="ul" title="울릉도,독도">울릉도,독도</a>
						            <div class="data_map data_ul">
						              <p class="txt01">울릉도,독도</p>
						              <p class="txt02"></p>
						              <p class="txt03"></p>
						            </div>
						            <a href="#"  class="jj" title="제주">제주</a>
						            <div class="data_map data_jj">
						              <p class="txt01">제주</p>
						              <p class="txt02">(0개소)</p>
						              <p class="txt03">0원</p>
						            </div>
						          </div><!--map_area-->
						      </div>
                                </div>
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