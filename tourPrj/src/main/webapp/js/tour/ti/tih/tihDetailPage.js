$(document).ready(function() {
	var url = "/api/test.do";
	var contentId = $("#contentId").val();
	var contentTypeId = 32;
	
	getDetailCommon(url, contentId, contentTypeId);
	getDetailImage(url, contentId, contentTypeId);
});

function getDetailCommon(url, contentId, contentTypeId){
	var chkUrl = "/detailCommon1";
	$.ajax({
		url: url,
		type: "post",
		dataType: "json",
		async: false,
		data: {
			chkUrl: chkUrl,
			contentId: contentId,
			contentTypeId: contentTypeId,
		},
		success: function(data) {
			var item = data.response.body.items.item[0];
			var gallery = $(".gallery");
			var firstImage = $("<img class='main-image'></img>");

			firstImage.attr("src", item.firstimage || "/resource/images/sample/no_image.png")
				.attr("alt", item.title)
				.on("error", function() {
					this.onerror = null;
					this.src = "/resource/images/sample/no_image.png";
				});
			gallery.append(firstImage);

			var detailInfo = $(".detail-info");
			var titleDiv = $("<div class='title'></div>").text(item.title);
			var addrDiv = $("<div class='addr1'></div>").text(item.addr1);
			var telDiv = $("<div class='tel'></div>").text("전화: " + (item.tel || "정보 없음"));
			var overviewDiv = $("<div class='overview'></div>").text(item.overview);
			// 예제 데이터 (JSP에서 동적으로 전달된 값으로 대체될 수 있음)
			var homepageUrl = item.homepage; // 올바른 URL을 설정
			// 홈페이지 링크 생성
			detailInfo.append(titleDiv).append(addrDiv).append(telDiv).append(homepageUrl).append(overviewDiv);

		},
		error: function(error) {
			console.log("error: " + error);
		}
	});
}

function getDetailImage(url, contentId, contentTypeId){
	var chkUrl = "/detailImage1";
	$.ajax({
		url: url,
		type: "post",
		dataType: "json",
		async: false,
		data: {
			chkUrl: chkUrl,
			contentId: contentId,
			contentTypeId: contentTypeId,
		},
		success: function(data) {
			$(".board_list").html(JSON.stringify(data));
			var item = data.response.body.items.item;
			var numOfRows = data.response.body.numOfRows;
			var gallery = $(".gallery");
			var gridContainer = $("<div class='grid-container'></div>");
			if (numOfRows < 1) {
				var mainImage = $(".main-image");
				mainImage.css("border-radius", "15px");
				return;
			} else if(numOfRows > 4) {
				for (var i = 0; i < 4; i++) {
					var gridItem = $("<div class='grid-item'></div>");
					var img = $("<img>")
						.attr("src", item[i].originimgurl)
						.attr("alt", item[i].imgname)
						.on("error", function() {
							this.onerror = null;
							this.src = "/resource/images/sample/no_image.png";
						});
					gridItem.append(img);

					if (i === 3) { // 올바른 비교 연산자 사용
						var moreButton = $("<button class='more-button' type='button'>");
						var span = $("<span class='css-122rql6'>").text("사진 모두보기");
						moreButton.append(span);
						gridItem.append(moreButton); // gridItem에 더보기 버튼 추가
					}

					gridContainer.append(gridItem);
				}
				gallery.append(gridContainer);
			}else{
				for (var i = 0; i < numOfRows; i++) {
					var gridItem = $("<div class='grid-item'></div>")
					var img = $("<img>")
						.attr("src", item[i].originimgurl || "/resource/images/sample/no_image.png")
						.attr("alt", item[i].imgname)
						.on("error", function() {
							this.onerror = null;
							this.src = "/resource/images/sample/no_image.png";
						});
					gridItem.append(img);
					gridContainer.append(gridItem);
				}
				gallery.append(gridContainer);
			}
		},
		error: function(error) {
			console.log("error: " + error);
		}
	});
}