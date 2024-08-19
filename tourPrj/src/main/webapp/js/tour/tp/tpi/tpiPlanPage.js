let map;
let tourPlanNo;
let plan;
let planCss;
let dayList;
let markers=[];
let polylines=[];

function initPlan() {
   let url = "/tpi/selectTourPlan.do";
	$.ajax({
        url: url,
        type: "post",
        async : false,
        data: {
			tourPlanNo : tourPlanNo,
        },
        success: function (data) {
			console.log(data);
			let res = data.result;
			if(res == "-1"){
				location.href = "/uat/uia/egovLoginUsr.do";
			}else if(res == "000"){
				alert("여행을 찾을 수 없습니다");
				//location.href = "/tpi/tpiList.do";
			}else {
				plan = data.plan;
				planCss = data.planCss;
				document.querySelector('.tourNm').innerHTML = plan.tourNm;
				document.querySelector('.tourDt').innerHTML = plan.tourStart + " ~ " + plan.tourEnd;
				initTimeline();
			}
        },
        error: function(error){
        	console.log(error);
        }
     });
}

function initMap() {
    var mapContainer = document.getElementById('planMap'),
        mapOption = { 
            center: new kakao.maps.LatLng(37.5665, 126.9780), // 지도의 중심 좌표
            level: 3 // 지도의 확대 레벨
        };

    map = new kakao.maps.Map(mapContainer, mapOption);
    
}

function initTimeline() {
    const startDate =  new Date(plan.tourStart);
    const endDate = new Date(plan.tourEnd);
    const timelineList = document.getElementById('timeline-list');
    timelineList.innerHTML = '';

    if (startDate && endDate) {
		let offset = new Date().getTimezoneOffset() * 60000;
        let currentDate = new Date(startDate - offset);
        const end = new Date(endDate - offset);
        while (currentDate <= end) {
            const dayContainer = document.createElement('div');
            dayContainer.className = 'timeline-day';
			dayContainer.setAttribute('date', currentDate.toISOString().split('T')[0]);
			const timelineheader = document.createElement('div');
            timelineheader.className = 'timeline-head';
            const dayHeader = document.createElement('h4');
            dayHeader.textContent = `${currentDate.toISOString().split('T')[0]} (${['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()]})`;
            timelineheader.appendChild(dayHeader);

            const addButton = document.createElement('button');
            addButton.className = 'add-button';
            addButton.innerText = '+';
            addButton.onclick = function() {
                openModal(dayList);
            };
            timelineheader.appendChild(addButton);
            dayContainer.appendChild(timelineheader);

            const dayList = document.createElement('div');
            dayList.className = 'item-List';
            dayContainer.appendChild(dayList);

            timelineList.appendChild(dayContainer);

            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        initLine();
        
        initInfoList();
    }
}

function initLine() {
	
	if(document.querySelector('.tLine-svg')){
		document.querySelector('.tLine-svg').remove();
	}
	
	let timelineList = document.getElementById('timeline-list');
	let tourDt = document.querySelector('.tourDt');
    let dayRect = timelineList.firstChild.getBoundingClientRect();
	let timelineCss = getComputedStyle(document.querySelector('.timeline'));
    
	let days = timelineList.querySelectorAll(".timeline-day");
	let dayH = 0;
	let tSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	tSvg.setAttribute('class', 'tLine-svg');
	tSvg.setAttribute('style', `width: ${dayRect.width}px; height: -webkit-fill-available;`);
	days.forEach (function (el, index) {
		let dayHead = el.querySelector('.timeline-head');
		let dayHeadRect = dayHead.getBoundingClientRect();
		let dayCss = getComputedStyle(el);
		
		let startX = 0;
	    let startY = tourDt.scrollHeight + dayHead.scrollHeight/2 + dayH;
	    let endX = Number(timelineCss.paddingLeft.replace('px', '')) + dayHeadRect.x;
	    let endY = tourDt.scrollHeight + dayHead.scrollHeight/2 + dayH;
	    let tLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	    tLine.setAttribute('class', 'tLine');
	    tLine.setAttribute('x1', startX);
	    tLine.setAttribute('y1', startY);
	    tLine.setAttribute('x2', endX);
	    tLine.setAttribute('y2', endY);
	    tSvg.appendChild(tLine);
	    
	    dayH += el.scrollHeight + Number(dayCss.marginBottom.replace('px', ''));
	});
	
	timelineList.appendChild(tSvg);
	
}

function initInfoList() {
	let url = "/tpi/selectPlanInfoList.do";
	$.ajax({
        url: url,
        type: "post",
        async : false,
        data: {
			tourPlanNo : tourPlanNo,
        },
        success: function (data) {
			let res = data.result;
			if(res == "-1"){
				location.href = "/uat/uia/egovLoginUsr.do";
			}else {
				console.log(data);
				data.infoList.forEach (function (el, index) {
					
					let listItem = document.createElement('div');
				    listItem.className = 'timeline-item';
				    listItem.innerHTML = `
				    	<div class="item-head" name="${el.name}" mapx="${el.mapx}" mapy="${el.mapy}">
				    		<span>${el.name}</span>
				    		<div class="buttons">
				    			<button class="marker-btn" onclick="panTo(this)">
					            	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
										<path d="M12 2C8.13 2 5 5.13 5 9c0 3.88 3.09 7 7 11.25C15.91 16 19 12.88 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
									</svg>
				            	</button>
				    			<button class="delete-btn">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
										<path d="M9 3v1H4v2h16V4h-5V3h-6zm-3 5v13a2 2 0 002 2h8a2 2 0 002-2V8H6zm2 2h2v9H8v-9zm4 0h2v9h-2v-9z"/>
									</svg>
								</button>
				        	</div>
				    	</div>
				        <div class="item-time">
					        <input type="time" name="planStart">
					        <span> - </span>
					        <input type="time" name="planEnd">
				        </div>
				        <textarea placeholder="세부 정보"></textarea>
				    `;
				    
				    listItem.querySelector(`.delete-btn`).addEventListener("click",function(){
						deleteItem(el);
					})
					document.querySelector(`.timeline-day[date='${el.planDt}'] .item-List`).appendChild(listItem);
				});
				initLine();
				makeMaker();
			}
        },
        error: function(error){
        	console.log(error);
        }
     });
}

function openModal(dList) {
	dayList = dList.parentNode.getAttribute('date');
   var $dialog = $('<div id="modalPan"></div>')
        .html('<iframe id="modalIframe" style="border: 0px;" src="/tpm/tourInfoModal.do" width="100%" height="100%"></iframe>')
        .dialog({
            autoOpen: false,
            modal: true,
            width: 1600,
            height: 800
        });

    $(".ui-dialog-titlebar").hide();
    $dialog.dialog('open');
    
    $('#modalIframe').on('load', function() {
        var iframeContent = $(this).contents();

        iframeContent.find('.close').click(function() {
            $("#modalPan").dialog('close');
            $("#modalPan").remove();
        });
    });
}

function returnValue(retVal) {
    
    if (retVal) {
		var url = "/tpi/insertPlanInfo.do";
		$.ajax({
	        url: url,
	        type: "post",
	        async : false,
	        traditional: true,
	        data: {
	        	infoList : JSON.stringify(retVal),
	        	tourPlanNo : tourPlanNo,
	        	planDt : dayList,
	        },
	        success: function (data) {
				let res = data.result;
				if(res == "000"){
					alert("계획 등록 실패");
				}else if(res == "001"){
					initPlan();
				}else if(res == "-1"){
					location.href = "/uat/uia/egovLoginUsr.do";
				}
	        },
	        error: function(error){
	        	console.log(error);
	        }
	    });
	}
}

function makeMaker(){
	removeMaker();
	let makerImg = "/images/tour/tp/tpi/285659_marker_map_icon.png"; 
	
	let dayList = document.querySelectorAll(".timeline-day");
	dayList.forEach (function (day, i) {
		let spotList = day.querySelectorAll(".item-head");
		spotList.forEach (function (el, index) {
			// 마커 이미지의 이미지 크기 입니다
		    let imgSize = new kakao.maps.Size(35, 35); 
		    
		    // 마커 이미지를 생성합니다    
		    let markerImage = new kakao.maps.MarkerImage(makerImg, imgSize);
		    let position = new kakao.maps.LatLng(el.getAttribute("mapy"), el.getAttribute("mapx"))
			let marker = new kakao.maps.Marker({
		        map: map, // 마커를 표시할 지도
		        position: position, // 마커를 표시할 위치
		        title : el.getAttribute("name"), // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
		        image : markerImage // 마커 이미지 
		    });
		    
		    marker.setMap(map);
		    
		    if(i == 0 && index == 0){
				map.panTo(position);    
			}
			
			markers.push(marker);
		});
	});
	
    getNavi();

}

function removeMaker(){
	markers.forEach (function (el, index) {
		el.setMap(null);
	});
	markers = [];
}

function removepath(){
	polylines.forEach (function (el, index) {
		   el.setMap(null);
	});
   	polylines=[];
}

function getNavi(){
	
   	let url = "https://apis-navi.kakaomobility.com/v1/waypoints/directions";
   	removepath();
   	let paths=[];
   	let dayList = document.querySelectorAll(".timeline-day");
	dayList.forEach (function (day, i) {
		let spotList = day.querySelectorAll(".item-head");
		if(spotList.length > 0){
			let path = {
				priority: "RECOMMEND",
			    car_fuel: "GASOLINE",
			    car_hipass: false,
			    alternatives: false,
			    road_details: false
			};
			let waypoints = [];
			spotList.forEach (function (el, index) {
				
				if(index == 0){
					let origin = {
						x : el.getAttribute("mapx")
						,y : el.getAttribute("mapy")
					};
					path.origin = origin;
				}else if(index == spotList.length - 1){
					let destination = {
						x : el.getAttribute("mapx")
						,y : el.getAttribute("mapy")
					};
					path.destination = destination;
				}else{
					let waypoint = {
						x : el.getAttribute("mapx")
						,y : el.getAttribute("mapy")
					};
					waypoints.push(waypoint);
				}
				
			});
			if(waypoints.length > 0){
				path.waypoints = waypoints;
			}
			let obj = {
				index : i,
				path : path
				};
			paths.push(obj);
		}
	});
	
   paths.forEach (function (el, index) {
		   $.ajax({
	        url: url,
	        type: "post",
	        async : false,
	        beforeSend: function (xhr) {
		        xhr.setRequestHeader("Authorization", "KakaoAK e377707180c8f707d97f83ef3cedc515");
		        xhr.setRequestHeader("Content-Type", "application/json");
		    },
	        data: JSON.stringify(el.path),
	        success: function (data) {
				console.log(data);
				makePath(data.routes[0].sections, el.index);
	        },
	        error: function(error){
	        	console.log(error);
	        }
	    });
	});
	
}

function makePath(e, ei){
	
	let linePath = [];
	e.forEach (function (el, i) {
		el.roads.forEach (function (road, j) {
			road.vertexes.forEach (function (vertex, index) {
				if(index%2===0){
					linePath.push(new kakao.maps.LatLng(road.vertexes[index + 1], vertex));
				}
			});
		});
	});
	
	// 지도에 표시할 선을 생성합니다
	var polyline = new kakao.maps.Polyline({
	    path: linePath, // 선을 구성하는 좌표배열 입니다
	    strokeWeight: 6, // 선의 두께 입니다
	    strokeColor: planCss[ei].colorCd, // 선의 색깔입니다
	    strokeOpacity: 0.9, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
	    strokeStyle: 'solid' // 선의 스타일입니다
	});
	
	// 지도에 선을 표시합니다 
	polyline.setMap(map);
	polylines.push(polyline);
}

function panTo(e) {
	
	let el = e.closest(".item-head");
   
    let moveLatLon = new kakao.maps.LatLng(el.getAttribute("mapy"), el.getAttribute("mapx"));

    map.panTo(moveLatLon);            
}      


function deleteItem(ev) {
    if (ev) {
		var url = "/tpi/deletePlanInfo.do";
		$.ajax({
	        url: url,
	        type: "post",
	        async : false,
	        traditional: true,
	        data: {
	        	tourPlanNo : ev.tourPlanNo,
	        	infoNo : ev.infoNo,
	        },
	        success: function (data) {
				console.log(data);
				let res = data.result;
				if(res == "000"){
					alert("삭제 실패");
				}else if(res == "001"){
					initPlan();
				}else if(res == "-1"){
					location.href = "/uat/uia/egovLoginUsr.do";
				}
	        },
	        error: function(error){
	        	console.log(error);
	        }
	    });
	}
}

document.addEventListener('DOMContentLoaded', () => {
	Kakao.init('d20b2ce38e0a6cdfdd3f269a8c89dbd6');
	
    modal = document.getElementById('locationModal');
    tourPlanNo = document.getElementById('tourPlanNo').value;
	initMap();
	initPlan();

/*
    const timelineList = document.getElementById('timeline-list');
    timelineList.addEventListener('dragover', dragOver);
    timelineList.addEventListener('drop', drop);

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const listItem = document.createElement('div');
        listItem.className = 'timeline-item';
        listItem.innerHTML = `
            <span>${data}</span>
            <input type="time" placeholder="시간">
            <textarea placeholder="세부 정보"></textarea>
            <div class="buttons">
                <button class="map-button" onclick="moveToLocation(${touristSpot.coordinates})"><span class="map-icon"></span>지도에서 보기</button>
                <button class="delete-btn" onclick="deleteItem(this)">삭제</button>
            </div>
        `;
        event.target.closest('.timeline-day').querySelector('.timeline-list').appendChild(listItem);
    }
*/
});
