let modal;
let map;
let markers = [];
let polyline;

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
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const timelineList = document.getElementById('timeline-list');
    timelineList.innerHTML = '';

    if (startDate && endDate) {
        let currentDate = new Date(startDate);
        const end = new Date(endDate);

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

function openModal(dayList) {
    modal.style.display = 'block';
    modal.currentDayList = dayList; // Save the reference to the current day list
}

function closeModal() {
    modal.style.display = 'none';
}

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
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    modal = document.getElementById('locationModal');

    initMap();

    fetch('tourist_spots.json')
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
    
    generateTimeline();
});
