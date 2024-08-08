$(function() {
    let currentSlide = {
        slideshow1: 0,
        slideshow2: 0,
        localPestival: 0
    };

    function showSlide(slideshowId, slideIndex) {
        const slideshow = document.getElementById(slideshowId);
        const slides = slideshow.querySelector('.slides');
        const totalSlides = slides.children.length;

        if (slideIndex >= totalSlides) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = totalSlides - 1;
        }

        slides.style.transform = `translateX(${-slideIndex * 100}%)`;
        currentSlide[slideshowId] = slideIndex;
    }

    window.nextSlide = function(slideshowId) {
        showSlide(slideshowId, currentSlide[slideshowId] + 1);
    }

    window.prevSlide = function(slideshowId) {
        showSlide(slideshowId, currentSlide[slideshowId] - 1);
    }
    
	fn_useMainfetchSearchFestival('서울');
    // Initialize slideshows
    showSlide('slideshow1', 0);
    showSlide('slideshow2', 0);
    showSlide('localPestival', 0);
    
    $('.data_map').on("mouseover",function(){       
    
    	fn_useMainfetchSearchFestival($(this).prev().attr("title"));
    });
    
});

/*세훈선임 만든거 메인에서 사용*/
function fn_useMainfetchSearchFestival(text){
	var url = "/api/test.do";
	var chkUrl = "/searchFestival1";
	var numOfRows = 5;
	$.ajax({
		url: url,
		type: "post",
		dataType: "json",
		async: false,
		data: {
			chkUrl: chkUrl,
			numOfRows: numOfRows,
		},
		success: function(data) {
			const tmpItems = data.response.body.items.item;
			var ul = $("<ul class='tif_list_ui'></ul>");
				
			const items = tmpItems.filter(info => {
			    // student 배열의 두 번째 요소(나이)가 30 이상인 경우만 true 반환
			    return info.addr1.indexOf(text) != -1;
			  });	
			  
			  console.log("dd");
			let i = 0;
			$("#localPestival .slides").html("");
			$(".info-card-header").text(text);
			items.forEach(function(item) {
				
				
				
				
				var img = $("<img>")
					.attr("src", item.firstimage2 || "/resource/images/sample/no_image.png")
					.attr("alt", item.title)
					.attr("style","width:90%")
					.on("error", function() {
						this.onerror = null;
						this.src = "/resource/images/sample/no_image.png";
					});
				
				
				
				
				
				$("#localPestival .slides").append("<div style='width : 250px;' class='slide info-icon'></div>");
				//$("#localPestival .slides").append("<div class='info-text'></div>");
				
				var detailsDiv = $("<div class='details'></div>");
				var titleDiv = $("<div class='title'></div>").text(item.title);
				//var addrDiv = $("<div class='addr1'></div>").text(item.addr1);
				//var telDiv = $("<div class='tel'></div>").text("전화: " + (item.tel || "정보 없음"));
				detailsDiv.append(titleDiv);//.append(addrDiv).append(telDiv);
				
				$("#localPestival .slides .info-icon").eq(i).append(img);
				//$("#localPestival .slides .info-icon").eq(i).append("<h2>"+item.title+"</h2>");
				//li.append(imageDiv).append(detailsDiv);
				//ul.append(li);
				i++;
			});
		
			//$(".board_list").html(ul);
		},
		error: function(error) {
			console.log("error: " + error);
		}
	});
}