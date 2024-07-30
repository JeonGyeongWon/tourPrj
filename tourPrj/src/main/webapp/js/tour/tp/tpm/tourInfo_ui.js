$(function() {
    //event.preventDefault();
    //$(".pop_bg, #tourInfoPop").show();
    
    resetModal(); // 모달창 초기화
    getAreaCode(); // 지역코드 가져오기
 
    $("#srchBtn").click(function() {
        var areaCd = $("#region").val();
        var contentType = $("#contTYpe").val();
        getTourInfo(areaCd, contentType, "1");
    });
    
    $('#pickBtn').click(function() {
        putCheckedItems();
    });
});

function closePop() {
    //$("#modalPan").dialog('close');
    //$("#modalPan").remove();
    parent.$("#modalPan").dialog('close');
    parent.$("#modalPan").remove();
}

// 모달창 초기화
function resetModal() {
    $("#tourListContainer").empty();
    $("#totalCnt").empty();
    $(".pagination").empty();

    $("#region").val("");
    $("#contTYpe").val("12");
    $("#pickBtn").hide();
}

// 지역코드 가져오기
function getAreaCode(){
    var chkUrl = "/areaCode1";
    var url = "/api/test.do";
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: { chkUrl: chkUrl },
        success: function (data) {
			var $regionSelect = $("#region");
			$regionSelect.empty();
			var items = data.response.body.items.item;
            $.each(items, function(index, item) {
				$regionSelect.append($('<option>', { value: item.code, text: item.name }));
            });
        },
        error: function(error){
            console.log("error : " + error);
        }
    });
}

// 관광정보 가져오기
/*contentType (12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) */
function getTourInfo(areaCd, contentType, pageNo){
    var chkUrl = "/areaBasedList1"; // 지역기반 관광정보
    var url = "/api/test.do";
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
			chkUrl: chkUrl,
			listYn: 'Y',
			arrange: 'O',
			contentTypeId: contentType,
			areaCode: areaCd,
			pageNo: pageNo,
		},
        success: function (data) {
			drawTourList(data, areaCd, contentType, pageNo);
        },
        error: function(error){
            console.log("error : " + error);
        }
    });
}

// 목록 그리기
function drawTourList(data, areaCd, contentType, currentPage) {
	var totalCount = data.response.body.totalCount; // 검색결과 수
	var items = data.response.body.items.item; // 관광정보
	
	var cnthtml = `<span>총 ${totalCount} 건</span>`
	$("#totalCnt").html(cnthtml);
	
	var $listContainer = $("#tourListContainer");
	$listContainer.empty();
	
	$.each(items, function(index, item){
		var name = item.title; // 이름
		var address = item.addr1; // 주소
		var areaCd = item.areacode; // 지역코드
		var telNo = item.tel ? item.tel : '-'; // 전화번호
		var contentId = item.contentid; // 컨텐츠ID
		var sigunguCd= item.sigungucode; // 신군구코드
		var mapx = item.mapx; // 위도값
		var mapy = item.mapy; // 경도값
		var image = item.firstimage2; // 이미지
		var image = item.firstimage2; // 이미지
		
        var listhtml = `
            <div class="tour_item">
            	<div class="info">
	                <input type="checkbox" class="checkbox" 
	                	data-name="${name}" data-address="${address}" data-telNo="${telNo}" data-contentId="${contentId}"
	                	data-areaCd="${areaCd}" data-sigunguCd="${sigunguCd}" data-mapx="${mapx}" data-mapy="${mapy}">
	                <div>
	                    <span class="title_txt">${name}</span>
	                    <span class="txt01">주소: ${address}</span>
	                    <span class="txt01">전화번호: ${telNo}</span>
	                    <span style="display:none;">컨텐츠ID: ${contentId}</span>
	                    <span style="display:none;">지역코드: ${areaCd}</span>
	                    <span style="display:none;">시군구코드: ${sigunguCd}</span>
	                    <span style="display:none;">위도: ${mapx}, 경도: ${mapy}</span>
	                </div>
                </div>
                ${image ? `<img src="${image}" alt="${name} 이미지">` : ''}                
            </div>
        `;
		
		$listContainer.append(listhtml);
		$("#pickBtn").show();
	})

    // 페이지네이션 생성
    var $pagination = $(".pagination");
    $pagination.empty(); // 기존 페이지네이션 제거

    var totalPages = Math.ceil(totalCount / 10); // 총 페이지 수 계산
    var pageGroup = Math.ceil(currentPage / 10); // 페이지 그풉
    var lastPage = pageGroup * 10; // 현재 페이지 그룹의 마지막 페이지
    var firstPage = lastPage - 9; // 현재 페이지 그룹의 첫 페이지
    
    if (firstPage > 1) {
        $pagination.append('<a href="#" class="page_link" data-page="' + (firstPage - 1) + '">&lt;</a>');
    }
    
    for (var i=firstPage; i<=lastPage && i<=totalPages; i++) {
        var pagehtml = '<a href="#" class="page_link" data-page="' + i + '">' + i + '</a>';
        $pagination.append(pagehtml);
    }
    
    if (lastPage < totalPages) {
        $pagination.append('<a href="#" class="page_link" data-page="' + (lastPage + 1) + '">&gt;</a>');
    }
    
    // 페이지번호 클릭 이벤트
    $(".page_link").click(function(event) {
        event.preventDefault();
        var pageNo = $(this).data("page").toString();
        
        getTourInfo(areaCd, contentType, pageNo);
    });
}

// 담기 버튼 클릭 이벤트
function putCheckedItems() {
    var retVal = [];
    
    $("#tourListContainer .checkbox:checked").each(function() {
        var item = {
            name: $(this).attr("data-name"),
            address: $(this).attr("data-address"),
            telNo: $(this).attr("data-telNo"),
            areaCd: $(this).attr("data-areaCd"),
            contentId: $(this).attr("data-contentId"),
            sigunguCd: $(this).attr("data-sigunguCd"),
            mapx: $(this).attr("data-mapx"),
            mapy: $(this).attr("data-mapy")
        };
        retVal.push(item);
    });
    
    if (retVal.length > 0) {
        parent.returnValue(retVal);
        closePop();
    } else {
        alert("항목을 선택해주세요.");
    }
}	