<%--
  Class Name : EgovIncHeader.jsp
  Description : 화면상단 Header(include)
  Modification Information

       수정일      수정자         수정내용
    ----------  --------  ---------------------------
    2011.08.31  JJY       경량환경 버전 생성
    2021.08.12  신용호      신규 디자인 적용
    2023.06.09  이택진      NSR 보안조치 (크로스사이트 스크립트 방지를 위한 출력 코드 수정)

    author   : 실행환경개발팀 JJY
    since    : 2011.08.31
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- <%@ page import ="pnuhPotal.com.cmm.LoginVO" %> --%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<html>
<head>

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="stylesheet" href="<c:url value='/'/>css/base.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/layout.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/component.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/page.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/timeLine.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/typark_header.css">	
	<link rel="stylesheet" href="<c:url value='/'/>css/typark_main_visual.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/typark_layout.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/typark_component.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/p_base.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/p_mobile.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/p_tablet.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/jqueryui.css">
	<link rel="stylesheet" href="<c:url value='/'/>css/monthpicker.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"/>
	
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script src="<c:url value='/'/>js/jqueryui.js"></script>
	<script src="<c:url value='/'/>js/ui.js"></script>
	<script src="<c:url value='/'/>js/jquery.monthpicker.js"></script>
	<script src="<c:url value='/'/>js/common.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>



	
<%-- <link rel="stylesheet" href="<c:url value='/'/>css/bootstrap.min.css">	 --%>


<%-- <link rel="stylesheet" href="<c:url value='/'/>css/bootstrap.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap.min.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap.rtl.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap.rtl.min.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-grid.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-grid.min.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-grid.rtl.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-grid.rtl.min.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-reboot.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-reboot.min.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-reboot.rtl.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-reboot.rtl.min.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-utilities.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-utilities.min.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-utilities.rtl.css">
<link rel="stylesheet" href="<c:url value='/'/>css/bootstrap-utilities.rtl.min.css">
<link rel="stylesheet" href="<c:url value='/'/>css/component.css">
<link rel="stylesheet" href="<c:url value='/'/>css/layout.css">
<link rel="stylesheet" href="<c:url value='/'/>css/page.css">
<link rel="stylesheet" href="<c:url value='/'/>css/timeLine.css"> --%>









<script type="text/javaScript" language="javascript">


function fn_egov_modal_create(){
	
    var $dialog = $('<div id="modalPan"></div>')
	.html('<iframe style="border: 0px;" src="' + "<c:url value='/EgovPageLink.do'/>?" + "linkIndex=" + 7 +'" width="100%" height="100%"></iframe>')
	.dialog({
    	autoOpen: false,
        modal: true,
        width: 1200,
        height: 940
	});
    $(".ui-dialog-titlebar").hide();
	$dialog.dialog('open');
}

/**********************************************************
 * 모달 종료 버튼
 ******************************************************** */
function fn_egov_modal_remove() {
	$('#modalPan').remove();
}

// function getCurrentDate()
// {
//     var date = new Date();
//     var year = date.getFullYear().toString();
//     var month = date.getMonth() + 1;
//     month = month < 10 ? '0' + month.toString() : month.toString();
//     var day = date.getDate();
//     day = day < 10 ? '0' + day.toString() : day.toString();
//     var hour = date.getHours();
//     hour = hour < 10 ? '0' + hour.toString() : hour.toString();
//     var minites = date.getMinutes();
//     minites = minites < 10 ? '0' + minites.toString() : minites.toString();
//     var seconds = date.getSeconds();
//     seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
//     document.getElementById("currentDate").innerHTML = year + "-" + month + "-" + day + " " + hour + ":" + minites + ":" + seconds;
// }
$(document).ready(function(){
//     getCurrentDate();
});
</script>

</head>




<style>
    .modal-body.accordion{
  width: 30%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  top:0px;
  right:-20%;
  color:#505050;
  z-index: 20;
  opacity: 0;
}





.modal-body.accordion .bi-search, .modal-body.accordion2 .bi-search{
  width:50px;
  font-size:25px;
  line-height: 35px;
  text-align:center;
  color: #777;
  background-color: whitesmoke;
  padding: 5px;
  border:1px solid #444;
  border-left:0px;
  
}

.modal-body.accordion .bi-caret-up-fill, .modal-body.accordion .bi-caret-down-fill{
	color:#666;
}

/* 햄버거 버튼  스타일*/


.menu-trigger:hover span:nth-of-type(1), .menu-trigger2:hover span:nth-of-type(1) {
  background-color: #000;
}

.menu-trigger:hover span:nth-of-type(2), .menu-trigger2:hover span:nth-of-type(2) {
  background-color: #000;
}

.menu-trigger:hover span:nth-of-type(3), .menu-trigger2:hover span:nth-of-type(3) {
  background-color: #000;
}

.menu-trigger, .menu-trigger span, .menu-trigger2, .menu-trigger2 span {
  display: inline-block;
  transition: all .4s;
  box-sizing: border-box;
}

.menu-trigger, .menu-trigger2 {
  						/* position: absolute; */
  width: 24px;
  /* height: 24px; */
					  /* right: 24px;
					    top: 28px; */
  z-index: 30;
  position: relative;
  top:5px;
}

.menu-trigger span, .menu-trigger2 span {
							  /*  position: absolute;
							  		left: 0; 
  									width: 100%; */
  									width:24px;
  									margin-bottom: 5px;
  height: 2px;
      background-color: var(--sub_txt_color);
  border-radius: 4px;
}

.menu-trigger span:nth-of-type(1), .menu-trigger2 span:nth-of-type(1) {
  top: 0;
}

.menu-trigger span:nth-of-type(2), .menu-trigger2 span:nth-of-type(2) {
  top: 11px;
}

.menu-trigger span:nth-of-type(3), .menu-trigger2 span:nth-of-type(3) {
  bottom: 0;
}


/* 햄버거 버튼 이벤트 */
 .menu-trigger.active-1 span:nth-of-type(1) {
  -webkit-transform: translateY (11px) rotate (-45deg);
  transform: translateY(11px) rotate(-45deg);
}

.menu-trigger.active-1 span:nth-of-type(2){
  opacity: 0;
}

.menu-trigger.active-1 span:nth-of-type(3) {
  -webkit-transform: translateY(-3px) rotate(45deg);
  transform: translateY(-3px) rotate(45deg);
}
 
 
/* 웹 탭버튼 이벤트 */
.teb-ham-btn2 .menu-trigger2.active-0 span:nth-child(1) {
  transform: translateY(11px) rotate(-45deg);
}

.teb-ham-btn2 .menu-trigger2.active-0 span:nth-child(2) {
  opacity: 0;
}

.teb-ham-btn2 .menu-trigger2.active-0 span:nth-child(3) {
  transform: translateY(-3px) rotate(45deg);
}

</style>



<body>

	<!-- Skip navigation -->
	 <a href="#contents" class="skip_nav">본문으로 가기</a>
    


<%-- 	<script src="<c:url value='/'/>bootstrap.bundle.min.js"></script> --%>


	        	

<div class="modal-backdrop fade in">
	
<div class="modal-body accordion">

		

				<div class="utile_p">
					<ul>
						<li><a href="/cop/bbs/addBoardArticle.do?bbsId=BBSMSTR_AAAAAAAAAAAA/">로그인</a></li>
						<li><a href="<c:url value='/hd/grp/linkSignUp.do'/>">회원가입</a></li>
						
                                                             
					</ul>
					
				</div>
				<ul class="depth1_ul">

					
					

					

						
							<li class="n1">

								<div class="th_1st" style="cursor: pointer;">
									<span>의료 마이데이터M</span>
								</div>
									
								
								
									<ul class="depth2_ul depth2_1">

										
											
												
													<li class="n1_1">
														<div class="large_menu" style="cursor: pointer;" data-menu="depth2">
															<span>내 의료데이터</span>
														</div>
														<ul class="depth3_ul">
															
                                                            <li>
                                                                <a href="<c:url value='/md/ph/medidataPrcthist.do'/>" data-menu="depth3">
                                                                <span>진료이력</span>
                                                              </a>
                                                            </li>
                                    
                                                            <li>
                                                              <a href="<c:url value='/md/rh/medidtaRxhistList.do'/>" data-menu="depth3">
                                                                <span>처방이력</span>
                                                              </a>
                                                            </li>
														</ul>
													</li>
												
												
												
											
										
											
												
													<li class="n1_2">
														<div class="large_menu" style="cursor: pointer;" data-menu="depth2">
															<span>내건강데이터</span>
														</div>
														<ul class="depth3_ul">
															
                                                            <li>
                                                                <a href="<c:url value='/hd/grp/linkLatestRecord.do'/>" data-menu="depth3"> 
                                                             
                                                                  <span>최신기록</span>
                                                                </a>
                                                              </li>
                                      
                                                              <li>
                                                                <a href="<c:url value='/hd/grp/selectGrphMainView.do'/>" data-menu="depth3">
                                                                
                                                                  <span>건강그래프</span>
                                                                </a>
                                                              </li>
                                      
                                                              <li>
                                                                <a href="<c:url value='/hd/grp/linkDeviceStatus.do'/>" data-menu="depth3">
                                                                  <span>기기등록현황</span>
                                                                </a>
                                                              </li>
															
														</ul>
													</li>
												
												
												
											
										
											
												
													<li class="n1_3">
														<div class="large_menu" style="cursor: pointer;" data-menu="depth2">
															<span>내영상데이터</span>
														</div>
														<ul class="depth3_ul">
															
                                                            <li>
                                                                <a href="<c:url value='/hd/grp/linkVideoRecord.do'/>" data-menu="depth3">
                                                                  <span>영상검사 이력</span>
                                                                </a>
                                                              </li>
															
														</ul>
													</li>
												
												
												
											
										
											
												
												

													<li class="n1_4">
														<div class="large_menu" style="cursor: pointer;" data-menu="depth2">
															<span>내응급데이터</span>
														</div>

                                                        <ul class="depth3_ul">
															
                                                            <li>
                                                                <a href="<c:url value='/hd/grp/linkEmergencyInfo.do'/>" data-menu="depth3">
                                                                  <span>응급정보</span>
                                                                </a>
                                                              </li>
															
														</ul>    

													</li>

		
									</ul>
								
								
							</li>
						
                            












                            

                            <li class="n2">
                                <div class="th_1st" style="cursor: pointer;">
                                    <span>제증명 발급M</span>
                                </div>                                
                                    
                                        <ul class="depth2_ul depth2_2">
                                            
                                                
                                                    
                                                        <li class="n2_1">
                                                            <a href="/si/si/selectSiAplyView.do">
                                                                <span>제증명 발급하기</span>
                                                            </a>
                                                        </li>
                                                    
                                                    
                                                    
                                                
                                            
                                                
                                                    
                                                        <li class="n2_2">
                                                            <a href="/si/his/selectSiHisList.do">
                                                                <span>제증명발급 이력</span>
                                                            </a>                                           
                                                        </li>
                                                                                                                                       
                                        </ul>

                            </li>

						
							















                            <li class="n3">

								<div class="th_1st" style="cursor: pointer;">
									<span>데이터 공유M</span>
								</div>
								
									<ul class="depth2_ul depth2_3">

													<li class="n3_1">
														<a href="<c:url value='/hd/grp/linkDataSharing.do'/>" data-menu="depth3">
                                                            <span>데이터 공유하기</span>
                                                        </a>
														
													</li>
												
												
												
											
										
											
												
													<li class="n3_2">
														<a href="<c:url value='/hd/grp/linkDataSharList.do'/>" data-menu="depth3">                  
                                                            <span>데이터공유 이력</span>
                                                        </a>
														
													</li>

									</ul>

							</li>














        



                            <li class="n4">

								<div class="th_1st" style="cursor: pointer;">
									<span>건강문진M</span>
								</div>
								
									<ul class="depth2_ul depth2_4">

										
											
												
													<li class="n4_1">
														<a href="#" data-menu="depth2">
															<span>건강문진a</span>
														</a>
														
													</li>
												
												

									</ul>
								
								
							</li>   














                            <li class="n5">

								<div class="th_1st" style="cursor: pointer;">
									<span>소개/알림M</span>
								</div>
								
									<ul class="depth2_ul depth2_5">

										
                                        

													<li class="n5_1">
														<a class="large_menu" href="<c:url value='/cop/bbs/selectBoardList.do?bbsId=BBSMSTR_AAAAAAAAAAAA'/>" data-menu="depth2">
															<span>공지사항</span>
														</a>

                                                        <%-- <ul class="depth3_ul">
                                                
                                                     		<li>
                                                                <a href="<c:url value='/cop/bbs/selectBoardList.do?bbsId=BBSMSTR_AAAAAAAAAAAA'/>" data-menu="depth3">
                                                                  <span>공지사항</span>
                                                                </a>
                                                              </li>
                                        
                                                              <li>
                                                                <a href="<c:url value='/cop/bbs/selectBoardList.do?bbsId=BBSMSTR_CCCCCCCCCCCC'/>" data-menu="depth3">
                                                                  <span>자료실(삭제)</span>
                                                                </a>
                                                              </li>
                                                           
                                                                
                                                        </ul> --%>


													</li>

												
												
											
										
											
												
												

													<li class="n5_2">
														<div class="large_menu" style="cursor: pointer;" data-menu="depth2">
															<span>자주찾는 질문a</span>
														</div>

                                                        <ul class="depth3_ul">
                                                
                                                            <li>
                                                                <a href="<c:url value='/uss/olh/faq/FaqListInqire.do'/>" data-menu="depth3">
                                                                  <span>FAQ</span>
                                                                </a>
                                                              </li>
                                        
                                                              <li>
                                                                  <!-- 임시 수정  -->
                                                                <a href="<c:url value='/uss/olh/qna/QnaListInqire.do'/>" data-menu="depth3">
                                                                  <span>1:1문의 내역</span>
                                                                </a>
                                                              </li>
                                                            
                                                                
                                                        </ul>


													</li>

												
												
											
										
											
												
												

													<li class="n5_3">
														<div class="large_menu" style="cursor: pointer;" data-menu="depth2">
															<span>이용안내</span>
														</div>


                                                        <ul class="depth3_ul">
                                                
                                                            <li>
                                                                <a href="<c:url value='/EgovPageLink.do?linkIndex=3'/>" data-menu="depth3">
                                                                  <span>서비스소개 및 이용안내</span>
                                                                </a>
                                                              </li>
                                        
                                                              <li>
                                                                <a href="<c:url value='/EgovPageLink.do?linkIndex=4'/>" data-menu="depth3">
                                                                  <span>실증사업 소개</span>
                                                                </a>
                                                              </li>
                                                        </ul>
                                                            
                                                                
                                                       

													</li>

												
												
											
										
											
												
												

													<li class="n5_4">
                                                        <a href="<c:url value='/EgovPageLink.do?linkIndex=5'/>">
                                                            <span>슈퍼앱다운로드</span>
                                                        </a>
													</li>
	
	
									</ul>
								
								
							</li>









                            <li class="n6">

								<div class="th_1st" style="cursor: pointer;">
									<span>마이페이지M</span>
								</div>
								
									<ul class="depth2_ul depth2_6">

										
                                        

													<li class="n6_1">
														<a href="#" data-menu="depth2">
															<span>개인정보관리a</span>
														</a>

                                                        


													</li>

												
												
											
										
											
												
												

													<!-- <li class="n6_2">
														<a class="large_menu" href="#" data-menu="depth2">
															<span>이용동의 현황</span>
														</a>

                                                        <ul class="depth3_ul">
                                                
                                                            <li>
                                                                <a href="#" data-menu="depth3">
                                                                  <span>포털서비스이용 동의</span>
                                                                </a>
                                                              </li>
                                        
                                                              <li>
                                                                <a href="#" data-menu="depth3">
                                                                  <span>의료기관 제공<br>데이터요청 동의</span>
                                                                </a>
                                                              </li>
                                        
                                                              <li>
                                                                <a href="#" data-menu="depth3">
                                                                  <span>공공기관 제공<br>데이터요청 동의</span>
                                                                </a>
                                                              </li>
                                        
                                                              <li>
                                                                <a href="#" data-menu="depth3">
                                                                  <span>데이터활용 동의</span>
                                                                </a>
                                                              </li>
                                        
                                                              <li>
                                                                <a href="#" data-menu="depth3">
                                                                  <span>개인정보 처리방침</span>
                                                                </a>
                                                              </li>
                                                            
                                                                
                                                        </ul>


													</li> -->

												
												
											
										
											
												
												

													<li class="n6_3">
														<div class="large_menu" style="cursor: pointer;" data-menu="depth2">
															<span>데이터활용 현황</span>
														</div>


                                                        <ul class="depth3_ul">
                                                
                                                            <li>
                                                                <a href="<c:url value='/api/selectApiDtapvsnHistList.do'/>" data-menu="depth3">
                                                                  <span>데이터공유 이력</span>
                                                                </a>
                                                              </li>
                                        
                                                              <li>
                                                                <a href="<c:url value='/si/his/selectSiHisList.do'/>" data-menu="depth3">
                                                                  <span>제증명발급 이력</span>
                                                                </a>
                                                              </li>
                                                        </ul>
                                                            
                                                                
                                                       

													</li>

												

	
									</ul>
								
								
							</li>


                                












						
					

				</ul>
			</div>
	</div>		
			
			
	<!-- 모바일탭메뉴  end -->















<!-- Header -->
		
		 <div id="wrap">
		 

  
		 
    <header id="headerWrap">
    
   				 <!-- 로그인회원가입 -->
						    	
						    	
						    		<div class="header_top">
						    			<div class="inner_header_top">
						    				<ul class="gap8">
						    					<li>
						    						<a href="/cop/bbs/addBoardArticle.do?bbsId=BBSMSTR_AAAAAAAAAAAA/>">로그인</a>
						    					
						    					</li>
						    					
						    					<li>
						    						<a href="<c:url value='/hd/grp/linkSignUp.do'/>">회원가입</a>
						    					</li>
						    				</ul>
						    				
						    				
						    				
						    			</div>
						    				
						    			
						    		</div>						    
						    	
						    	
						    	
						    	
						    	<!-- <li class="header_top">
						    		<div class="header_top">
						    			<ul>
						    				<li><a href="#">로그인</a></li>
						    				<li><a href="#">회원가입</a></li>
						    			</ul>
						    		</div>						    
						    	</li> -->
						    	
						    	
						    	
    				<!-- 로그인회원가입end -->
    
      <nav id="gnbWrap">
        
		<div class="menuWrap">
		

			<h1 class="logoArea">
				
	        	<a href="<c:url value='/'/>cmm/main/mainPage.do" tabindex="0">
	        		<img src="<c:url value='/'/>images/tour.png" alt="로고명" title="사이트 메인으로 이동">
	        	</a>
	        		
	        </h1>
				
          <ul class="gnb_p">
			
            <li class="gnb_depth">
              <a href="#"><span>축제정보</span></a>

              
                  <div class="sub-wrap">
                  

                  <ul class="sub_area">
	                  	<li>
		                    <div class="gnb-title">
		                      <strong>의료<br>마이데이터</strong>
		                      <!-- <p>진료기록들을 <br>확인할 수 있습니다. </p> -->
		<!--                       <div style=""> -->
								</div>
						</li>	
						
						
                      	<li class="sub_title">
                     		 <div><span>내의료데이터</span></div>


                      <ul class="sub_menu">
                        <li>
                        	<a href="<c:url value='/md/ph/medidataPrcthist.do'/>" data-menu="depth3">
                            <span>진료이력</span>
                          </a>
                        </li>

                        <li>
                          <a href="<c:url value='/md/rh/medidtaRxhistList.do'/>" data-menu="depth3">
                            <span>처방이력</span>
                          </a>
                        </li>
						<li>
                          <a href="<c:url value='/md/ph/linkCommonComponent.do'/>" data-menu="depth3">
                            <span>****공통 컴포넌트**** </span>
                          </a>
                        </li>
						
                        
                      </ul>



                    </li>

                   

                    



                    <li class="sub_title">
                     <div> <span>내건강데이터</span></div>


                      <ul class="sub_menu">
                        <li>
                          <a href="<c:url value='/hd/grp/linkLatestRecord.do'/>" data-menu="depth3"> 
                       
                            <span>최신기록</span>
                          </a>
                        </li>

                        <li>
                          <a href="<c:url value='/hd/grp/selectGrphMainView.do'/>" data-menu="depth3">
                          
                            <span>건강그래프</span>
                          </a>
                        </li>

                        <li>
                          <a href="<c:url value='/hd/grp/linkDeviceStatus.do'/>" data-menu="depth3">
                            <span>기기등록현황</span>
                          </a>
                        </li>
                      </ul>


                    </li>






                    <li class="sub_title">
                    
                    
                      <div><span>내영상데이터</span></div>


                      <ul class="sub_menu">
                        <li>
                          <a href="<c:url value='/hd/grp/linkVideoRecord.do'/>" data-menu="depth3">
                            <span>영상검사 이력</span>
                          </a>
                        </li>

                      </ul>

                    </li>



                    <li class="sub_title">
                      <div><span>내응급데이터</span> </div>


                      <ul class="sub_menu">
                        <li>
                          <a href="<c:url value='/hd/grp/linkEmergencyInfo.do'/>" data-menu="depth3">
                            <span>응급정보</span>
                          </a>
                        </li>

                      </ul>
					</li>

                   


                  </ul>
                 
                </div>
               

              
            </li>
<!-- 	
<LI>
<div class="gnb_background"></div>
</LI> -->




            <li class="gnb_depth">
              <a href="#"><span>지역정보</span></a>

			<div class="sub-wrap">
                

                <ul class="sub_area">
                	<li>	
	                  <div class="gnb-title">
	                    <strong>제증명발급<br>서비스</strong>
	                    <!-- <p>ㅁㄴㅇㄹㅁ </p> -->
	                  </div>
					</li>
                  <li class="sub_title">
                    <a href="<c:url value='/si/si/selectSiAplyView.do'/>" data-menu="depth3">
                    	<span>제증명 발급하기</span>
                    </a> 
                  </li>

                  <li class="sub_title">
                     <a href="<c:url value='/si/his/selectSiHisList.do'/>" data-menu="depth3"><span>제증명 이력</span></a>
                  </li>

                  <!-- <li class="sub_title">
                    <span>서류보관함(삭제)</span>
                  </li> -->

                </ul>
              </div>
              

            </li>
<!-- 
<LI>
<div class="gnb_background"></div>
</LI>

 -->
            





            <li class="gnb_depth">
              <a href="#"><span>숙박정보</span></a>
	

              <div class="sub-wrap">
               

                <ul class="sub_area">
	                <li>
	                  <div class="gnb-title">
	                    <strong>데이터공유<br>서비스</strong>
	                    <!-- <p>ㅁㄴㅇㄹㅁ </p> -->
	                  </div>
					</li>
					
	                  <li class="sub_title">
	                  	
	                  	<a href="<c:url value='/hd/grp/linkDataSharing.do'/>" data-menu="depth3">
	                    	<span>데이터 공유하기</span>
	                    </a>
	                    
	                  </li>
	                  
						<li class="sub_title">
	                  
	                  <a href="<c:url value='/hd/grp/linkDataSharList.do'/>" data-menu="depth3">                  
	                   	<span>데이터공유 이력</span>
						 </a>
	                   
	                  </li>
	                  


                </ul>
              </div>

            </li>
<!-- 
<LI>
<div class="gnb_background"></div>
</LI>


       -->      


            <li class="gnb_depth">
              <a href="#"><span>지도</span></a>


              <div class="sub-wrap">
                

                <ul class="sub_area">
	                <li>
	                  <div class="gnb-title">
	                    <strong>건강문진<br>서비스</strong>
	                  </div>
					</li>
                  <li class="sub_title">
                    <a href="#"><span>건강문진</span></a>
                  </li>
				
				  
				<li class="sub_title">
                   <a href="#"><span>보건소 연계</span></a>
                  </li>	
               

                </ul>
              </div>

            </li>

<!-- 
<LI>
<div class="gnb_background"></div>

</LI>

 -->




            <li class="gnb_depth">
              <a href="#"><span>소개/알림</span></a>


              <div class="sub-wrap">
                

                <ul class="sub_area">
                <li>
                  <div class="gnb-title">
                    <strong>소개 및 알림</strong>
                    <!-- <p>ㅁㄴㅇㄹㅁ </p> -->
                  </div>
				</li>
                  <li class="sub_title">
                    <a href="<c:url value='/cop/bbs/selectBoardList.do?bbsId=BBSMSTR_AAAAAAAAAAAA'/>"><span>공지사항</span></a>


                    <%-- <ul class="sub_menu">
                      <li>
                        <a href="<c:url value='/cop/bbs/selectBoardList.do?bbsId=BBSMSTR_AAAAAAAAAAAA'/>" data-menu="depth3">
                          <span>공지사항</span>
                        </a>
                      </li>

                      <li>
                        <a href="<c:url value='/cop/bbs/selectBoardList.do?bbsId=BBSMSTR_CCCCCCCCCCCC'/>" data-menu="depth3">
                          <span>자료실(삭제)</span>
                        </a>
                      </li>
				
                     
                    </ul> --%>
                  </li>


                  <li class="sub_title">
                    <div><span>자주찾는 질문</span></div>  


                    <ul class="sub_menu">
                      <li>
                        <a href="<c:url value='/uss/olh/faq/FaqListInqire.do'/>" data-menu="depth3">
                          <span>FAQ</span>
                        </a>
                      </li>

                      <li>
                      	<!-- 임시 수정  -->
                        <a href="<c:url value='/uss/olh/qna/QnaListInqire.do'/>" data-menu="depth3">
                          <span>1:1문의 내역</span>
                        </a>
                      </li>
                    </ul>

                  </li>


                  <li class="sub_title">
                    <div>  <span>이용안내</span></div>


                    <ul class="sub_menu">
                      <li>
                        <a href="<c:url value='/EgovPageLink.do?linkIndex=3'/>" data-menu="depth3">
                          <span>서비스소개 및 이용안내</span>
                        </a>
                      </li>

                      <li>
                        <a href="<c:url value='/EgovPageLink.do?linkIndex=4'/>" data-menu="depth3">
                          <span>실증사업 소개</span>
                        </a>
                      </li>

                    </ul>
                  </li>



                  <li class="sub_title">
                    <a href="<c:url value='/EgovPageLink.do?linkIndex=5'/>"><span>슈퍼앱다운로드</span></a>
                  </li>

                </ul>
              </div>

            </li>

<!-- 
<LI>
<div class="gnb_background"></div>
</LI>



 -->


            <li class="gnb_depth">
              <a href="#"><span>마이페이지</span></a>


              <div class="sub-wrap">
                

                <ul class="sub_area">
	                <li>
	                  <div class="gnb-title">
	                    <strong>마이페이지</strong>
	                    <!-- <p>ㅁㄴㅇㄹㅁ </p> -->
	                  </div>
	                </li>  
	                
	                  <li class="sub_title">
	                  	
	                  	<div> <span>개인정보</span> </div>
	                    
	                    <ul class="sub_menu">
	                    
                      <li>
                        <a href="<c:url value='/mp/pi/selectMypagePsnlinfoView.do'/>" data-menu="depth3">
                          <span>개인정보 관리</span>
                        </a>
                      </li>

                      
                      
                      <li>
                        <a href="<c:url value='/hd/grp/linkMemberInfoManage.do'/>" data-menu="depth3">
                          <span>개인정보 관리(구) </span>
                        </a>
                      </li>
                      
                    </ul>
	                    
	                  </li>



                  <!-- <li class="sub_title">
                    <a href="#"><span>이용동의 현황</span></a>


                    <ul class="sub_menu">
                      <li>
                        <a href="#" data-menu="depth3">
                          <span>포털서비스이용 동의</span>
                        </a>
                      </li>

                      <li>
                        <a href="#" data-menu="depth3">
                          <span>의료기관 제공<br>데이터요청 동의</span>
                        </a>
                      </li>

                      <li>
                        <a href="#" data-menu="depth3">
                          <span>공공기관 제공<br>데이터요청 동의</span>
                        </a>
                      </li>

                      <li>
                        <a href="#" data-menu="depth3">
                          <span>데이터활용 동의</span>
                        </a>
                      </li>

                      <li>
                        <a href="#" data-menu="depth3">
                          <span>개인정보 처리방침</span>
                        </a>
                      </li>

                    </ul>
                  </li> -->


                  <li class="sub_title">
                    <div> <span>데이터활용 현황</span> </div>


                    <ul class="sub_menu">
                      <li>
                        <a href="<c:url value='/api/selectApiDtapvsnHistList.do'/>" data-menu="depth3">
                          <span>데이터공유 이력</span>
                        </a>
                      </li>

                      <li>
                        <a href="<c:url value='/api/selectApiDtautilHistList.do'/>" data-menu="depth3">
                          <span>제증명발급 이력</span>
                        </a>
                      </li>
                    </ul>

                  </li>
                </ul>
              </div>

            </li>
            
     <!--        
<LI>
<div class="gnb_background"></div>
</LI>
 -->


				
          </ul>
         
         
         
         <!-- 웹 해더 유틸 버튼 -->
				<div class="header_utill">
					<ul style="display: flex; gap: 8px;">
						   <li class="shop_cart">
						   		<span class="cart_count">0</span>
						   </li> 
    						
					
					
						<li class="search_magnifier">
							<div tabindex="-1">
							
								
								<button class="search_i" style="opacity:1;">통합검색 열림버튼</button>
								
								<button class="clickClose" style="opacity:1; position: relative; left:-9px; top:2px; font-size:0;">
									통합검색 닫기버튼
									<span></span>
									<span></span>
								</button>
							
							</div>
								
							
							<div class="magnifier_depth_2">
								<div class="magnifier_search_area">
									
									
									<form>
										<fieldset>
											<legend>통합검색</legend>
											<strong><span></span>부산OOO 통합검색</strong>
											<div class="form_inner f_search gap8">
												<label class="skip" for="id">검색어를 입력해주세요</label>
												<input id="id" style="width: calc(100% - 113px);" type="text" name="searchKeyword" placeholder="검색어를 입력해주세요"  tabindex="1">
												<div class="submit"><input type="submit" value="검색" id=""><label for="" class="skip"  tabindex="0">검색</label></div>
											</div>
										</fieldset>
									</form>
									
									
									
								</div>
								
							
							
							
							
							</div>
						 </li>
						
						
						<!-- 모바일 햄버거 버튼 -->
					<li>	
						<div class="teb-ham-btn" style="display:none;">
						    <ul>
						        
						        <li class="ham-btn">
						            <div class="menu-trigger" style="cursor: pointer;">
						                <span></span>
						                <span></span>
						                <span></span>
						            </div>
						        </li>
						    </ul>
						</div>
					</li>		
					<!-- 모바일 탭메뉴 -->
						
						
						
						
						
						<!-- 웹 햄버거 버튼 -->
							<li>
								<div class="teb-ham-btn2" tabindex="0">
								    <ul>
								        
								        <li class="ham-btn2">
								            <div class="menu-trigger2" style="cursor: pointer;">
								                <span></span>
								                <span></span>
								                <span></span>
								            </div>
								        </li>
								      </ul> 
								  </div>
								    
								    
								    <!-- 웹탭메뉴  start-->
	<div class="modal-backdrop fade in2" style="display:none;">
	
		<div class="modal-body accordion2">
					
				
			<div>		
				<div class="title40">
						<span>Site Map</span>					
				</div>	
				
				<div class="all_depth_box">	
					<ul class="all_depth1">
						<li>
							<div>
                      			<span>의료 마이데이터</span> 
                      			
                      			<ul class="all_depth2">
                      				<li>
                      					<div>
                      						내 의료데이터 TEB
                      					</div>
                      					<ul class="all_depth3">
                      						
                      						<li><a href="<c:url value='/md/ph/medidataPrcthist.do'/>"> 진료이력 </a></li>
                      						<li><a href="<c:url value='/md/rh/medidtaRxhistList.do'/>"> 처방이력 </a></li>
                      					</ul>
                      				</li>
                      				
                      				
                      				
                      				<li>
                      					<div>
                      						내 건강데이터
                      					</div>
                      					<ul class="all_depth3">
                      					
                      						<li><a href="<c:url value='/hd/grp/linkLatestRecord.do'/>"> 최신기록 </a></li>
                      						<li><a href="<c:url value='/hd/grp/selectGrphMainView.do'/>">건강그래프 </a></li>
                      						<li><a href="<c:url value='/hd/grp/linkDeviceStatus.do'/>"> 기기등록 현황 </a></li>
                      					</ul>
                      				</li>
                      				
                      				
                      				
                      				<li>
                      					<div>
                      						 내 영상데이터
                      					</div>
                      					<ul class="all_depth3">                     						
                      						<li><a href="<c:url value='/hd/grp/linkVideoRecord.do'/>"> 영상검사 이력 </a></li>
                      						
                      					</ul>
                      				</li>
                      				
                      				
                      				
                      				<li>
                      					<div>
                      						내 응급데이터 
                      					</div>
                      					<ul class="all_depth3">
                      					
                      						<li><a href="<c:url value='/hd/grp/linkEmergencyInfo.do'/>">  응급정보 </a></li>
                      						<li><a href="<c:url value='/hd/grp/.do'/>">  응급정보 관리 </a></li>
                      					</ul>
                      				</li>
                      				
                      				
                      			</ul>
                      			
                      			                    
							</div>
						</li>
                  </ul>
                  
                  
                  
                  
                  
                  
                  
                  
                  <ul class="all_depth1">
						<li>
							<div>
                      			<span>제증명발급 서비스</span> 
                      			
                      			<ul class="all_depth2">
                      				<li>
                      					<div>
                      						<a href="<c:url value='/si/si/selectSiAplyView.do'/>"> 제증명 발급하기 </a>
                      					</div>
                      					
                      				</li>
                      				
                      				
                      				
                      				<li>
                      					<div>
                      						<a href="/si/his/selectSiHisList.do"> 제증명 발급이력teb </a>
                      					</div>                     				
                      				</li>                   				
                      			</ul>
                      			
                      			                    
							</div>
						</li>
                  </ul>
                  
                  
                  
                  
                  
                  
                  
                  <ul class="all_depth1">
						<li>
							<div>
                      			<span>데이터공유 서비스</span> 
                      			
                      			<ul class="all_depth2">
                      				<li>
                      					<div>
                      						<a href="<c:url value='/hd/grp/linkDataSharing.do '/>">데이터 공유하기 </a>
                      					</div>
                      					
                      				</li>
                      				
                      				
                      				
                      				<li>
                      					<div>
                      						<a href="<c:url value='/hd/grp/linkDataSharList.do '/>"> 데이터공유 이력 </a>
                      					</div>                     				
                      				</li>                   				
                      			</ul>
                      			
                      			                    
							</div>
						</li>
                  </ul>
                  
                  
                  
                  
                  
                  
                  
                  <ul class="all_depth1">
						<li>
							<div>
                      			<span>건강문진 서비스</span> 
                      			
                      			<ul class="all_depth2">
                      				<li>
                      					<div>
                      						<a href="#"> 건강문진 teb </a>
                      					</div>
                      					
                      				</li>
                      				
                      				
                      				
                      				<li>
                      					<div>
                      						<a href="#"> 보건소 연계 teb </a>
                      					</div>                     				
                      				</li>                   				
                      			</ul>
                      			
                      			                    
							</div>
						</li>
                  </ul>
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  <ul class="all_depth1">
						<li>
							<div>
                      			<span>소개 및 알림</span> 
                      			
                      			<ul class="all_depth2">
                      				<li>
                      					<div>
                      						<a href="<c:url value='/cop/bbs/selectBoardList.do?bbsId=BBSMSTR_AAAAAAAAAAAA '/>"> 공지사항 </a>
                      					</div>
                      					
                      				</li>
                      				
                      				
                      				
                      				<li>
                      					<div>
                      						 자주찾는 질문 
                      					</div>
                      					<ul class="all_depth3">
                      						<li><a href="<c:url value='/uss/olh/faq/FaqListInqire.do'/>"> FAQ </a></li>
                      						<li><a href="<c:url value='/uss/olh/qna/QnaListInqire.do'/>"> 1:1 문의내역 </a></li>
                      						
                      					</ul>
                      				</li>
                      				
                      				
                      				
                      				<li>
                      					<div>
                      						 이용안내
                      					</div>
                      					<ul class="all_depth3">
                      						<li><a href="<c:url value='/EgovPageLink.do?linkIndex=3'/>"> 서비스소개 및 이용안내 </a></li>
                      						<li><a href="<c:url value='/EgovPageLink.do?linkIndex=4'/>"> 실증사업 소개 </a></li>
                      					</ul>
                      				</li>
                      				
                      				
                      				
                      				<li>
                      					<div>
                      						<a href="<c:url value='/EgovPageLink.do?linkIndex=5'/>">슈퍼앱 다운로드 </a>
                      					</div>
                      					
                      				</li>
                      				
                      				
                      			</ul>
                      			
                      			                    
							</div>
						</li>
                  </ul>
                  
                  
                  
                  
                  
                  
                  
                  
                  <ul class="all_depth1">
						<li>
							<div>
                      			<span>마이페이지</span> 
                      			
                      			<ul class="all_depth2">
                      				<li>
                      					<div>
                      						<a href="<c:url value='/hd/grp/linkMemberInfoManage.do'/>">개인정보 관리</a>
                      					</div>
                      					
                      				</li>
                      				
                      				
                      				
                      				<li>
                      					<div>
                      						 데이터활용 현황
                      					</div>
                      					<ul class="all_depth3">
                      						<li><a href="<c:url value='/api/selectApiDtapvsnHistList.do'/>"> 데이터공유 이력 </a></li>
                      						<li><a href="<c:url value='/api/selectApiDtautilHistList.do'/>"> 제증명발급 이력 </a></li>
                      						
                      					</ul>
                      				</li>

                      			</ul>
                      			
                      			                    
							</div>
						</li>
                  </ul>
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
			</div>	
		</div>










						
					

		</div>
	</div>		
			
			
	<!-- 웹탭메뉴  end -->
								    
								    
				
         
         </li>
         </ul>
        </div>
        
        
		
        
        

					
      </nav>
      		
      	
      	
      	<!-- locationNavi start -->
		<c:import url="/sym/mms/LinkLocationNavi.do" />
		<!-- locationNavi end -->
    	
    </header>
	
	
		<div class="gnb_background"></div>	
         <div class="gnb_background2"></div>	
         
	
 
		
	<!-- 돋보기 검색   -->	
	
	
	<script>
	document.addEventListener("DOMContentLoaded", function() {
	    var openButton = document.querySelector(".search_magnifier div button");
	    var closeButton = document.querySelector(".clickClose");
	    var modal = document.querySelector(".magnifier_depth_2");
	    var background = document.querySelector(".gnb_background2");

	    openButton.addEventListener("click", function() {
	        modal.style.display = "block";
	        background.style.display = "block";
	        closeButton.style.display = "inline-block"; // 닫기 버튼 보이게 하기
	        openButton.style.display = "none"; // 열림 버튼 숨기기
	    });

	    closeButton.addEventListener("click", function() {
	        modal.style.display = "none";
	        background.style.display = "none";
	        closeButton.style.display = "none"; // 닫기 버튼 숨기기
	        openButton.style.display = "inline-block"; // 열림 버튼 보이게 하기
	    });

	    background.addEventListener("click", function(event) {
	        if (event.target === background) { // 배경 클릭 시에만 모달 닫기
	            modal.style.display = "none";
	            background.style.display = "none";
	            closeButton.style.display = "none"; // 닫기 버튼 숨기기
	            openButton.style.display = "inline-block"; // 열림 버튼 보이게 하기
	        }
	    });
	});
	
	
	</script>
	
	<!-- <script>
    document.addEventListener("DOMContentLoaded", function() {
        var openButton = document.querySelector(".search_magnifier button");
        var closeButton = document.querySelector(".clickClose");
        var modal = document.querySelector(".magnifier_depth_2");
        var background = document.querySelector(".gnb_background2");

        openButton.addEventListener("click", function() {
            modal.style.display = "block";
            background.style.display = "block";
        });

        closeButton.addEventListener("click", function() {
            modal.style.display = "none";
            background.style.display = "none";
        });

        background.addEventListener("click", function(event) {
            if (event.target === background) { // 배경 클릭 시에만 모달 닫기
                modal.style.display = "none";
                background.style.display = "none";
            }
        });
    });
</script> -->
		
		
	
	
	
	
	
	
	
		
		
		
	
		
	
	
	
	
	
	
	
	
	<!-- 웹탭메뉴 스크립트 -->
	<script>
$(document).ready(function () {
    const burger2 = $('.menu-trigger2');
    const hamCon2 = $('.modal-body.accordion2');
    const backdrop2 = $('.modal-backdrop.fade.in2'); // 모달 배경
    const body2 = $('body'); // 바디 태그 선택

    let h = 0;

    // 메뉴 토글 함수
    function toggleMenu() {
        h = 1 - h;

        // 오른쪽으로 이동하는 애니메이션
        if (h === 1) {
            hamCon2.animate({
                top: '0px',
                opacity: 1
            }, 300);

            // 모달 배경 표시
            backdrop2.css('display', 'block');
            
            // 바디 태그의 스크롤을 비활성화
            disableBodyScroll();
        } else { // 왼쪽으로 이동하는 애니메이션
            hamCon2.animate({
                top: '-300px', // -300px는 예시입니다. 원하는 값으로 변경하세요.
                opacity: 0
            }, 200);

            // 모달 배경 숨김
            backdrop2.css('display', 'none');
            
            // 바디 태그의 스크롤을 활성화
            enableBodyScroll();
        }

        burger2.toggleClass('active-0', h);

        /* if (h === 0) {
            $(window).off('scroll.hamMenu');
        } */
    }

    // 메뉴 토글 이벤트 설정
    burger2.on('click', function (e) {
        e.preventDefault();
        toggleMenu();
    });

    // 모달 배경 클릭 이벤트 설정
    backdrop2.on('click', function () {
        if (h === 1) {
            toggleMenu();
        }
    });

    // 모달 내부 클릭 이벤트 설정
    hamCon2.on('click', function (e) {
        e.stopPropagation(); // 이벤트 버블링 중지
    });

    // 모달이 열릴 때 body의 스크롤을 비활성화합니다.
    function disableBodyScroll() {
        body2.css('overflow', 'hidden');
    }

    // 모달이 닫힐 때 body의 스크롤을 활성화합니다.
    function enableBodyScroll() {
        body2.css('overflow', 'auto');
    }
});


</script>
	<!-- 웹탭메뉴 스크립트 end -->
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

  </div>


<!-- 
<script>
  const gnbLi = document.querySelectorAll('.gnb_depth');
  const subMenu = document.querySelectorAll('.sub-wrap');
  const subBg = document.querySelectorAll('.gnb_background');

  for (let i = 0; i < gnbLi.length; i++) {
    gnbLi[i].addEventListener('mouseover', function () {
      subMenu[i].classList.add('active');
  
      subBg[i].classList.add('active');
    });
  }

  for (let i = 0; i < gnbLi.length; i++) {
    gnbLi[i].addEventListener('mouseleave', function () {
      subMenu[i].classList.remove('active');
   
      subBg[i].classList.remove('active');
    });
  }
</script>
 -->

<!-- <script>

document.addEventListener("DOMContentLoaded", function () {
	  const gnbLi = document.querySelectorAll('.gnb_depth');
	  const subBg = document.querySelector('.gnb_background');

	  gnbLi.forEach(li => {
	    li.addEventListener('mouseover', function () {
	      const subMenu = li.querySelector('.sub-wrap');
	      subMenu.classList.add('active');
	      subBg.style.display = 'block';
	    });

	    li.addEventListener('mouseleave', function () {
	      const subMenu = li.querySelector('.sub-wrap');
	      subMenu.classList.remove('active');
	      subBg.style.display = 'none';
	    });
	  });

	  subBg.addEventListener('mouseover', function () {
	    subBg.style.display = 'block';
	  });

	  subBg.addEventListener('mouseleave', function () {
	    document.querySelectorAll('.sub-wrap.active').forEach(menu => {
	      menu.classList.remove('active');
	    });
	    subBg.style.display = 'none';
	  });
	});

</script> -->

<script>
document.addEventListener("DOMContentLoaded", function () {
	  const gnbLi = document.querySelectorAll('.gnb_depth');
	  const subBg = document.querySelector('.gnb_background');
	  const header = document.getElementById('headerWrap');

	  gnbLi.forEach(li => {
	    li.addEventListener('mouseover', function () {
	      const subMenu = li.querySelector('.sub-wrap');
	      subMenu.classList.add('active');
	      subBg.style.display = 'block';
	    });

	    li.addEventListener('mouseleave', function () {
	      const subMenu = li.querySelector('.sub-wrap');
	      subMenu.classList.remove('active');
	      subBg.style.display = 'none';
	    });
	  });

	  header.addEventListener('mouseleave', function () {
	    document.querySelectorAll('.sub-wrap.active').forEach(menu => {
	      menu.classList.remove('active');
	    });
	    subBg.style.display = 'none';
	  });
	});


</script>




<script>
$(document).ready(function () {
    const burger1 = $('.menu-trigger');
    const hamCon1 = $('.modal-body.accordion');
    const backdrop = $('.modal-backdrop.fade.in'); // 모달 배경
    const body = $('body'); // 바디 태그 선택

    let h = 0;

    // 메뉴 토글 함수
    function toggleMenu() {
        h = 1 - h;

        // 오른쪽으로 이동하는 애니메이션
        if (h === 1) {
            hamCon1.animate({
                right: '0px',
                opacity: 1
            }, 300);

            // 모달 배경 표시
            backdrop.css('display', 'block');
            
            // 바디 태그의 스크롤을 비활성화
            disableBodyScroll();
        } else { // 왼쪽으로 이동하는 애니메이션
            hamCon1.animate({
                right: '-300px', // -300px는 예시입니다. 원하는 값으로 변경하세요.
                opacity: 0
            }, 200);

            // 모달 배경 숨김
            backdrop.css('display', 'none');
            
            // 바디 태그의 스크롤을 활성화
            enableBodyScroll();
        }

        burger1.toggleClass('active-1', h);

        /* if (h === 0) {
            $(window).off('scroll.hamMenu');
        } */
    }

    // 메뉴 토글 이벤트 설정
    burger1.on('click', function (e) {
        e.preventDefault();
        toggleMenu();
    });

    // 모달 배경 클릭 이벤트 설정
    backdrop.on('click', function () {
        if (h === 1) {
            toggleMenu();
        }
    });

    // 모달 내부 클릭 이벤트 설정
    hamCon1.on('click', function (e) {
        e.stopPropagation(); // 이벤트 버블링 중지
    });

    // 모달이 열릴 때 body의 스크롤을 비활성화합니다.
    function disableBodyScroll() {
        body.css('overflow', 'hidden');
    }

    // 모달이 닫힐 때 body의 스크롤을 활성화합니다.
    function enableBodyScroll() {
        body.css('overflow', 'auto');
    }
});


</script>






 
 






   
   
<script>
 
 

 
 
 $(document).ready(function() {
	    // 최초에는 모든 하위 메뉴를 숨김
	    $('.depth2_ul, .depth3_ul').hide();

	    // 대메뉴를 클릭했을 때의 이벤트 핸들러
	    $('.th_1st').click(function(e) {
	        // 클릭한 대메뉴의 하위 메뉴 요소를 찾음
	        var submenu = $(this).next('.depth2_ul');

	        // 다른 모든 하위 메뉴를 숨김
	        $('.depth2_ul').not(submenu).slideUp();

	        // 클릭한 대메뉴의 하위 메뉴가 보이는지 여부를 확인하여 토글
	        submenu.slideToggle();

	        // 클릭된 요소가 'a' 태그인지 확인
	        if ($(e.target).is('a')) {
	            // 'a' 태그일 경우 기본 동작을 막음
	            e.preventDefault();
	        }
	    });

	    // 서브메뉴를 클릭했을 때의 이벤트 핸들러
	    $('.depth2_ul div').click(function(e) {
	        // 클릭한 서브메뉴의 하위 메뉴 요소를 찾음
	        var submenu = $(this).next('.depth3_ul');

	        // 다른 모든 하위 메뉴를 숨김
	        $('.depth3_ul').not(submenu).slideUp();

	        // 클릭한 서브메뉴의 하위 메뉴가 보이는지 여부를 확인하여 토글
	        submenu.slideToggle();

	        // 클릭된 요소가 'a' 태그인지 확인
	        if ($(e.target).is('a')) {
	            // 'a' 태그일 경우 기본 동작을 막음
	            e.preventDefault();
	        }
	    });
	});
 
</script>




<script><!-- 화살표 이벤트 -->
var arrows = document.querySelectorAll('.modal-backdrop .modal-body .depth1_ul > li > div');

var activeArrow = null; // 현재 활성화된 화살표를 추적하는 변수

arrows.forEach(function(arrow) {
  arrow.addEventListener('click', function() {
    if (activeArrow !== this) {
      // 현재 클릭된 화살표가 활성화되어 있지 않은 경우
      if (activeArrow) {
        // 다른 화살표가 이미 활성화되어 있는 경우 초기 상태로 되돌림
        activeArrow.classList.remove('active-2');
      }
      // 현재 활성화된 화살표 갱신
      activeArrow = this;
      // 현재 클릭된 화살표를 활성화 상태로 변경
      this.classList.add('active-2');
    } else {
      // 현재 클릭된 화살표가 이미 활성화된 경우
      // 활성화 상태를 해제하고 activeArrow를 null로 초기화하여 초기 상태로 되돌림
      this.classList.remove('active-2');
      activeArrow = null;
    }
  });
});

</script>





<script>
var links = document.querySelectorAll('.depth1_ul .depth2_ul > li > div.large_menu');

var activeLink = null; // 현재 활성화된 링크를 추적하는 변수

links.forEach(function(link) {
    link.addEventListener('click', function() {
        // 현재 클릭된 링크가 이전에 클릭된 링크와 다른 경우
        if (activeLink !== this) {
            // 이전에 클릭된 링크가 존재하는 경우
            if (activeLink) {
                // 이전에 클릭된 링크의 활성화 상태를 제거하여 초기 상태로 되돌림
                activeLink.classList.remove('active-3');
            }
            // 현재 클릭된 링크를 활성화 상태로 변경
            this.classList.add('active-3');
            // 현재 클릭된 링크를 activeLink에 저장
            activeLink = this;
        } else {
            // 현재 클릭된 링크가 이미 활성화된 경우, 활성화 상태를 해제하여 초기 상태로 되돌림
            this.classList.remove('active-3');
            activeLink = null;
        }
    });
});

</script>




<script>
document.addEventListener("DOMContentLoaded", function () {
    const gnbLi = document.querySelectorAll('.gnb_depth');
    const subBg = document.querySelector('.gnb_background');
    const header = document.getElementById('headerWrap');
    const skipNavLink = document.querySelector('.skip-nav');
    const mainContent = document.querySelector('#contents');

    gnbLi.forEach(li => {
      const subMenu = li.querySelector('.sub-wrap');

      li.addEventListener('mouseover', function () {
        subMenu.classList.add('active');
        subBg.style.display = 'block';
      });

      li.addEventListener('mouseleave', function () {
        subMenu.classList.remove('active');
        subBg.style.display = 'none';
      });

      li.addEventListener('focusin', function () {
        subMenu.classList.add('active');
        subBg.style.display = 'block';
      });

      li.addEventListener('focusout', function () {
        subMenu.classList.remove('active');
        subBg.style.display = 'none';
      });
    });

    header.addEventListener('mouseleave', function () {
      document.querySelectorAll('.sub-wrap.active').forEach(menu => {
        menu.classList.remove('active');
      });
      subBg.style.display = 'none';
    });

    skipNavLink.addEventListener('click', function(event) {
      event.preventDefault();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
    });

   
  });



</script>


<!-- 카트 장바구니 카운트 -->

<!-- 카트기능 데모 <script>
        function updateCartCount() {
            const cartCount = localStorage.getItem('cartCount') || 0;
            const cartCountElement = document.querySelector('.cart_count');
            cartCountElement.textContent = cartCount;
            if (cartCount > 0) {
                cartCountElement.style.display = 'flex'; // 장바구니에 아이템이 추가된 후 표시
            }
        }

        document.addEventListener('DOMContentLoaded', updateCartCount);
    </script> -->


 <script>
        let cartCount = 0; // 장바구니 아이템의 초기 개수
        function addToCart(item, cnt) {
        	$(item).attr("id") == "addCartAll" ? cartCount = cartCount + Number(cnt) : cartCount++;
            updateCartCount();
        }

        function updateCartCount() {
            const cartCountElement = document.querySelector('.cart_count');
            cartCountElement.textContent = cartCount;
            if (cartCount > 0) {
                cartCountElement.style.display = 'flex'; // 장바구니에 아이템이 추가된 후 표시
            }
        }

//         // 장바구니에 아이템 추가 버튼 클릭 시
//         document.querySelector('.shop_cart').addEventListener('click', function() {
//             addToCart(this.dataset.item);
//         });
    </script> 







<!-- <script> //탭접근성

document.addEventListener('DOMContentLoaded', function() {
    const skipNavLink = document.querySelector('.skip_nav');
    const mainContent = document.querySelector('#contents');

    skipNavLink.addEventListener('click', function(event) {
      event.preventDefault();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
    });
  });

</script> -->
<!-- <script>

document.addEventListener('DOMContentLoaded', function () {
  const menuTrigger = document.querySelector('.menu-trigger');
  const menuTrigger2 = document.querySelector('.menu-trigger2');

  menuTrigger.addEventListener('click', function () {
    this.classList.toggle('active-1');
  });

  menuTrigger2.addEventListener('click', function () {
    this.classList.toggle('active-0');
  });
});


</script> -->


<form name="menuListForm" action ="" method="post">
    <input type="hidden" id="menuNo" name="menuNo" value="<%=session.getAttribute("menuNo")%>" />
    <input type="hidden" id="link" name="link" value="" />
    <div style="width:0px; height:0px;">
    <c:forEach var="result" items="${list_menulist}" varStatus="status" >
    	<input type="hidden" name="tmp_menuNm" value="<c:out value='${result.menuNo}'/>|<c:out value='${result.upperMenuId}'/>|<c:out value='${result.menuNm}'/>|<c:out value='${result.relateImagePath}'/>|<c:out value='${result.relateImageNm}'/>|<c:out value='${result.chkURL}'/>|" />
    </c:forEach>
    </div>
</form>

</body>



</html>

