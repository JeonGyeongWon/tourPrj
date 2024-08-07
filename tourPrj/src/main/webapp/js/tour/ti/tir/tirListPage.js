$(document).ready(function() {
	getSearchStay();
});

function getSearchStay(){
	var url = "/api/test.do";
	var chkUrl = "/areaBasedList1";
	var numOfRows = 50;
	$.ajax({
		url: url,
		type: "post",
		dataType: "json",
		async: false,
		data: {
			listYN: "Y",
			pageNo: 1,
			arrange: "A",
			chkUrl: chkUrl,
			numOfRows: numOfRows,
			contentTypeId: 39,
			areaCode: 1,
		},
		success: function(data) {
			var items = data.response.body.items.item;
			var ul = $("<ul class='tir_list_ui'></ul>");

			items.forEach(function(item) {
				var li = $("<li class='tir_list_li' onclick='movetirDetail(" + item.contentid + ")'></li>");

				var imageDiv = $("<div class='image'></div>");
				var img = $("<img>")
					.attr("src", item.firstimage2 || "/resource/images/sample/no_image.png")
					.attr("alt", item.title)
					.on("error", function() {
						this.onerror = null;
						this.src = "/resource/images/sample/no_image.png";
					});

				imageDiv.append(img);

				var detailsDiv = $("<div class='details'></div>");
				var titleDiv = $("<div class='title'></div>").text(item.title);
				var addrDiv = $("<div class='addr1'></div>").text(item.addr1);
				var telDiv = $("<div class='tel'></div>").text("전화: " + (item.tel || "정보 없음"));
				detailsDiv.append(titleDiv).append(addrDiv).append(telDiv);

				li.append(imageDiv).append(detailsDiv);
				ul.append(li);
			});

			$(".board_list").html(ul);
		},
		error: function(error) {
			console.log("error: " + error);
		}
	});
}


function movetirDetail(contentId) {
	var contentId = contentId;
	window.location.href = '/tir/tirDetail.do?contentId=' + contentId;
}
