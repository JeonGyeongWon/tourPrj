$(document).ready(function(){
$('.all_menu').on({'click':function(){
	$('#moGnb').show();}
	});
$('.m_gnb_close').on({'click':function(){
	$('#moGnb').hide();}
	});
})

$(document).ready(function(){
	$('.res_title03  a').click(function() {
	$(this).addClass('col_tog')
	$(this).siblings().removeClass('col_tog')
	});
})

$(document).ready(function(){
    $(".sch_tab").hide(); 
    $(".sch_tab:first").show(); 
    $("ul.sch_tab_menu li").click(function () {
        $("ul.sch_tab_menu li").removeClass("sch_menu_on").css("color", "#777777");
        $(this).addClass("sch_menu_on").css("color", "#00a0e9","backgeround","#fff");
        $(".sch_tab").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
});

$(document).ready(function(){
	$(".rep_tab").hide(); 
	$(".rep_tab:first").show(); 
	$("ul.rep_tab_menu li").click(function () {
		$("ul.rep_tab_menu li").removeClass("rep_menu_on").css("color", "#777777");
		$(this).addClass("rep_menu_on").css("color", "#00a0e9","backgeround","#fff");
		$(".rep_tab").hide()
		var activeTab = $(this).attr("rel");
		$("#" + activeTab).fadeIn()
	});
});
$(document).ready(function(){
	$('.con_btn').click(function() {

	$(this).next(".rep_content").slideToggle(300);
	});
})

// 슬라이더 //
 $(document).ready(function() {

 $('#image-gallery').lightSlider({
     gallery:true,
     item:1,
     thumbItem:5,
     slideMargin: 0,
     speed:700,
     auto:true,
     loop:true,
     onSliderLoad: function() {
         $('#image-gallery').removeClass('cS-hidden');
     }  
 });
});

$(document).ready(function(){
	$('.detail_btn').click(function() {
	$(this).next('.navi_wrap02').slideToggle()
	});

})



$(document).ready(function(){
	$('.area_option01 li').click(function() {
	$(this).toggleClass('li_click')
	});
})

$(document).ready(function(){
	$('.navi_wrap .nav_btn01').click(function() {
	$(this).toggleClass('nav_btn01_click')
	});
})