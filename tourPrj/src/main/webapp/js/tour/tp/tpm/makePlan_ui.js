function tourInfoModal() {
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
		console.log("<<<<<선택한 관광지 정보>>>>>");
		console.log(retVal);
        $("#selectedSights").empty();
        
        $.each(retVal, function(index, item) {
			var sightHtml = `
				<div class="sight_item">
					<h3>${item.name}</h3>
					<h4>-주소 : ${item.address}</h4>
					<h4>-전화번호 : ${item.telNo}</h4>
					<h4>-컨텐츠ID : ${item.contentId}</h4>
					<h4>-시군구코드 : ${item.sigunguCd}</h4>
					<h4>-지역코드 : ${item.areaCd}</h4>
					<h4>-좌표x : ${item.mapx}</h4>
					<h4>-좌표y : ${item.mapy}</h4>
				</div>
			`;
			$("#selectedSights").append(sightHtml);
		});
		
		$("#selectedSights").show();
    }
}

