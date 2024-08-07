let modal;
let map;
let markers = [];
let polyline;
let tourPlanNo;
let plan;
let dayList;

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
			let res = data.result;
			if(res == "-1"){
				location.href = "/uat/uia/egovLoginUsr.do";
			}else if(res == "000"){
				alert("여행을 찾을 수 없습니다");
				location.href = "/tpi/tpiList.do";
			}else {
				plan = data.plan;
				document.querySelector('.tourNm').innerHTML = plan.tourNm;
				document.querySelector('.tourDt').innerHTML = plan.tourStart + " ~ " + plan.tourEnd;
				generateTimeline();
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
    polyline = new kakao.maps.Polyline({
        map: map,
        path: [],
        strokeWeight: 5,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeStyle: 'solid'
    });
}

function generateTimeline() {
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

            const dayHeader = document.createElement('h4');
            dayHeader.textContent = `${currentDate.toISOString().split('T')[0]} (${['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()]})`;
            dayContainer.appendChild(dayHeader);

            const addButton = document.createElement('button');
            addButton.className = 'add-button';
            addButton.innerText = '+';
            addButton.onclick = function() {
                openModal(dayList);
            };
            dayContainer.appendChild(addButton);

            const dayList = document.createElement('div');
            dayList.className = 'timeline-list';
            dayContainer.appendChild(dayList);

            timelineList.appendChild(dayContainer);

            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
}

function openModal(dList) {
	dayList = dList;
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
    console.log(retVal);
    
    if (retVal) {
		var url = "/tpi/insertPlanInfo.do";
		$.ajax({
	        url: url,
	        type: "post",
	        async : false,
	        data: {
	        	infoList : JSON.stringify(retVal),
	        	tourPlanNo : tourPlanNo,
	        	planDt : dayList,
	        },
	        success: function (data) {
				console.log(data);
				let res = data.result;
				if(res == "000"){
					alert("계획 등록 실패");
				}else if(res == "001"){
					
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
/*
function addTouristSpotToDay(touristSpot) {
    const listItem = document.createElement('div');
    listItem.className = 'timeline-item';
    listItem.innerHTML = `
        <span>${touristSpot.name}</span>
        <input type="time" placeholder="시간">
        <textarea placeholder="세부 정보"></textarea>
        <div class="buttons">
            <button class="map-button" onclick="moveToLocation(${touristSpot.coordinates})"><span class="map-icon"></span>지도에서 보기</button>
            <button class="delete-button" onclick="deleteItem(this)">삭제</button>
        </div>
    `;
    listItem.dataset.coordinates = touristSpot.coordinates;  // Store coordinates
    modal.currentDayList.appendChild(listItem);

    // Add marker to map
    const coordinates = touristSpot.coordinates.split(', ');
    const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(coordinates[0], coordinates[1])
    });
    marker.setMap(map);
    markers.push({ marker, coordinates: coordinates.map(Number) });

    updatePolyline();

    closeModal();
}

function deleteItem(button) {
    const listItem = button.parentElement.parentElement; // Updated to get the correct parent element
    const coordinates = listItem.dataset.coordinates.split(', ').map(Number);
    const markerIndex = markers.findIndex(m => m.coordinates[0] === coordinates[0] && m.coordinates[1] === coordinates[1]);

    if (markerIndex !== -1) {
        markers[markerIndex].marker.setMap(null);
        markers.splice(markerIndex, 1);
        updatePolyline();
    }

    listItem.remove();
}

function moveToLocation(lat, lng) {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.setCenter(moveLatLon);
}

function updatePolyline() {
    const path = markers.map(m => m.marker.getPosition());
    polyline.setPath(path);
}*/

document.addEventListener('DOMContentLoaded', () => {
    modal = document.getElementById('locationModal');
    tourPlanNo = document.getElementById('tourPlanNo').value;

	initPlan();
    initMap();

/*    fetch('tourist_spots.json')
        .then(response => response.json())
        .then(data => {
            const locationList = document.getElementById('location-list');
            data.forEach(spot => {
                const listItem = document.createElement('li');
                listItem.textContent = spot.name;  // Coordinates removed from display
                listItem.addEventListener('click', () => addTouristSpotToDay(spot));
                locationList.appendChild(listItem);
            });
        });

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
                <button class="delete-button" onclick="deleteItem(this)">삭제</button>
            </div>
        `;
        event.target.closest('.timeline-day').querySelector('.timeline-list').appendChild(listItem);
    }
    
    generateTimeline();*/
});
