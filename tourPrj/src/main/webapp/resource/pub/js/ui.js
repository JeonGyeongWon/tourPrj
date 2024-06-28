$(document).ready(function(){
	$('#gnb > ul > li').mouseover(function(){
	$(this).children('ul').addClass('ul_bg')
	});
	$('#gnb > ul > li').mouseleave(function(){
	$(this).children('ul').removeClass('ul_bg')
	});
})
$(document).ready(function(){
$('.all_menu').on({'click':function(){
	$('#moGnb').show();}
	});
$('.m_gnb_close').on({'click':function(){
	$('#moGnb').hide();}
	});
})

$(document).ready(function(){
	$('.qus_ico').mouseover(function(){
		$(".qus_txt").show();
	});
	$('.qus_ico').mouseleave(function(){
		$(".qus_txt").hide();
	});
})


function adjustStyle(width) {
  width = parseInt(width);
  if (width > 768) {
    $("#moGnb").hide();
  }
}

$(function() {
  adjustStyle($(this).width());
  $(window).resize(function() {
    adjustStyle($(this).width());
  });
});


 /* gnb */
$(document).ready(function(){
	$('#gnb>ul>li').mouseover(function(){
	$('#header').css("background-color","#39ace2");
	$('#gnb>ul>li>a').css("color","#fff");
	$('.subMenu_bg').css("height","350px");
	$('.gnb_left').css("display","block");
	$("#header .logo").addClass('h1_over')
	$("#header .subtitle").addClass('h1_over')
	$('#gnb>ul>li>ul').css("height","450px");
	});
	$('#gnb>ul>li>a').focus(function(){
		$('#header').css("background-color","#39ace2");
		$('#gnb>ul>li>a').css("color","#fff");
		$('.subMenu_bg').css("height","350px");
		$('.gnb_left').css("display","block");
		$("#header .logo").addClass('h1_over')
		$("#header .subtitle").addClass('h1_over')
		$('#gnb>ul>li>ul').css("height","450px");
	});
	$('#gnb>ul>li').mouseleave(function(){
	$('#header').css("background-color","#fff");
	$('#gnb>ul>li>a').css("color","#111");
	$('.subMenu_bg').css("height","0px");
	$('.gnb_left').css("display","none");
	$("#header .logo").removeClass('h1_over')
	$('#gnb>ul>li>ul').css("height","0px");
	});
})


$(document).ready(function(){
	$('.gnb_hidden_btn').click(function() {
		$(this).toggleClass('gnb_block_btn')
		$(".main_header").toggleClass('header_tog')
		$(".map_cate").toggleClass('map_cate_tog')
		$(".lnb_show").toggleClass('lnb_show_toptog')
		$(".lnb_wrap_dp2").toggleClass('lnb_wrap_dp2_tog')
		$(".sign_area").toggleClass('sign_area_tog')
		$(".inmap").toggleClass('inmap_tog')
		$(".subMenu_bg").toggleClass('subMenu_bg_tog')
	});
})

$(document).ready(function(){
	$('.sign_on').click(function() {
	$(this).toggleClass('sign_off')
	});
})

$(document).ready(function(){
	$('.lnb_close_ico').click(function() {
		$(this).toggleClass('lnb_open_ico')
		$('.lnb_show').toggleClass('lnb_show_toggle')
	});
})



$(document).ready(function(){
	$('.inmap_sch_btn .btn').click(function() {
	$(this).toggleClass('btn_click')
	});
})
$(document).ready(function(){
	$('.map_cate a').click(function() {
	$(this).toggleClass('tog_co')
	});
})
$(document).ready(function(){
	$('.fav_ico').click(function() {
	$(this).toggleClass('fav_ico_tog')
	});
})
// LN
// LNB탭 //
$(document).ready(function(){
    $(".lnb_wrap").hide();
     $(".lnb_wrap:first").show();


    $(".L_menu a").click(function () {
        $(".L_menu a").removeClass("on");
        $(this).addClass("on");
        $(".lnb_wrap").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).show()
		$(".option_close_ico").removeClass('option_open_ico')
		$('.search_area').removeClass('option_tog_01');
		$('.sch_result').removeClass('option_tog_02');
		$('.sch_result .result_list').removeClass('option_tog_032');
    });
});
// MOBILE_GNB_TAB //
$(document).ready(function(){
    $(".depth_2_wrap").hide();
    $(".depth_2_wrap:first").show();
    $(".depth_1 li").click(function () {
        $(".depth_1 li").removeClass("hover");
        $(this).addClass("hover");
        $(".depth_2_wrap").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).show()
    });
});
// MOBILE_GNB_3depth //
$(function(){
 $(".sub_dep").hide();
	$('.depth_2 > li > a').addClass("lnb_select2")
	$('.depth_2 > li > a').on('click',function(){
		if($(this).hasClass('lnb_select2')){
			$(this).removeClass("lnb_select2")
			$(this).addClass("lnb_select")
			$(this).next("ul").slideToggle(300);
		}
		else{
			$(this).next("ul").slideToggle(300);
			$(this).addClass("lnb_select2")
		}
	});
})
// 서치박스탭 //
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

$(document).ready(function() {
		$('.area_option01 li').each(function () {
		$(this).click(function () {
			if($(this).hasClass('area_option01_tog')){
				$(this).css("border", "1px solid #ccc");
				$(this).removeClass('area_option01_tog');
			} else {
				$(this).css("border", "1px solid #00a0e9");
				$(this).addClass('area_option01_tog');
			}
			$(this).siblings().css("border", "1px solid #ccc");
			$(this).siblings().removeClass('area_option01_tog');
			});
		});
	});

$(document).ready(function(){
	$('.area_option02 .opt01').click(function() {
	$(this).toggleClass('opt01_over')
	});
})
$(document).ready(function(){
	$('.area_option02 .opt02').click(function() {
	$(this).toggleClass('opt02_over')
	});
})
$(document).ready(function(){
	$('.area_option02 .opt03').click(function() {
	$(this).toggleClass('opt03_over')
	});
})

$(document).ready(function(){
	$('.result_list .res_list').click(function() {
	$(this).toggleClass('res_list_over')
	$(this).siblings().removeClass('res_list_over')
	});
})
$(document).ready(function(){
	$('.result_list .total_res_list').click(function() {
	$(this).toggleClass('total_res_list_over')
	$(this).siblings().removeClass('total_res_list_over')
	});
})
$(document).ready(function(){
	$('.sch_option_li .option_check01').click(function() {
	$(this).toggleClass('option_check01_tog')
	$(this).siblings().removeClass('option_check01_tog')
	});
	/*$('.sch_option_li .option_check02').click(function() {
		$(this).toggleClass('option_check02_tog')
		$(this).siblings().removeClass('option_check02_tog')
	});*/
	$('.sch_option_li .option_check03').click(function() {
	$(this).toggleClass('option_check03_tog')
	$(this).siblings().removeClass('option_check03_tog')
	});
	$('.sch_option_li .option_check04').click(function() {
	$(this).toggleClass('option_check04_tog')
	$(this).siblings().removeClass('option_check04_tog')
	});
})
$(function(){
	$('.result_list').mCustomScrollbar({
		theme:'minimal-dark',
		scrollInertia: 0,
		mouseWheel: {scrollAmount : 100},
	});
	$('.dp3_content').mCustomScrollbar({
		theme:'minimal-dark',
		scrollInertia: 0,
		mouseWheel: {scrollAmount : 100},

	});
	$('.result_total_list').mCustomScrollbar({
		theme:'minimal-dark',
		scrollInertia: 0,
		mouseWheel: {scrollAmount : 100},
	});

	$('.S02_result_area .res_body').mCustomScrollbar({
		theme:'minimal-dark',
		scrollInertia: 0,
		mouseWheel: {scrollAmount : 100},
		alwaysShowScrollbar:2
	});
	$('.list_detail_wrap .detail_content').mCustomScrollbar({
		theme:'minimal-dark',
		scrollInertia: 0,
		mouseWheel: {scrollAmount : 100},
	});
});


$(document).ready(function(){
            var schHeight = $( "#schHeight" ).innerHeight();
			//$('.sch_result').css({ 'height': 'calc(100% - ' +schHeight+ 'px)' });
})

$(document).ready(function(){
	$('.close_dp3').click(function() {
	$('.lnb_wrap_dp2').hide()
	});
	$('.mapview_ico').click(function() {
		$('.lnb_wrap_dp2').hide();
		if(!$(".lnb_close_ico").hasClass('lnb_open_ico'))
			$(".lnb_close_ico").trigger('click');
	});
})


$(document).ready(function(){
	$('.res_title03  a').click(function() {
	$(this).addClass('col_tog')
	$(this).siblings().removeClass('col_tog')
	});
})

// 슬라이더 //
 $(document).ready(function() {
			$("#content-slider").lightSlider({
                loop:true,
                keyPress:true
            });
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

$(document).ready(function() {
		$('.sec04 .right_wrap .btn_wrap a').each(function () {
		$(this).click(function () {
			$(this).addClass('a_over')
			$(this).siblings().removeClass('a_over')
			});
		});
	});



$(document).ready(function(){
	$('.sub_location .select .sm').click(function(event) {
		var currentMenu = $(this).siblings('ul');
		$('.sub_location .select .sm').siblings('ul').each(function (idx,item) {
			if($(item)[0] !== currentMenu[0])
				$(item).hide();
		})
		currentMenu.fadeToggle(150)
		event.stopImmediatePropagation();
   });
});

// 2024.04.05 추가
$(document).ready(function(){
	$(document).on('click', function(e){
		var classCnt = $('.sub_location .select .sm').siblings('ul').filter(function() {
			return $(this).css('display') == 'block';
		})
		if(classCnt.length > 0){
			$('.sub_location .select .sm').siblings('ul').css('display', 'none');
		}
		e.stopPropagation();
	})
});

 $(document).ready(function(){
	$(' .sns_mo_btn').click(function() {
	$(this).toggleClass('sns_mo_btn_tog')
	$('.sns_wrap').fadeToggle(150)
   });
});


$(document).ready(function(){
	$('.map_area a').mouseenter(function(){
		if($(this).attr('class') !=='ul') {
			$(this).next('div').css("display", "block");
		}
	});
	$('.map_area a').mouseleave(function () {
		$(this).next('div').css("display", "none");
	});
})


$(document).ready(function(){
	$('.map_area02 a').mouseenter(function(){
	$(this).next('div').css("display","block");
	});
	$('.map_area02 a').mouseleave(function(){
	$(this).next('div').css("display","none");
	});
})


$(document).ready(function(){
	$('.map_area02 .data_kk').mouseenter(function(){
	$(this).prev('a').addClass('kk_over')
	$(this).css("display","block");
	});
	$('.map_area02 .data_kk').mouseleave(function(){
	$(this).prev('a').removeClass('kk_over')
	$(this).css("display","none");
	});
})
$(document).ready(function(){
	$('.map_area02 .data_gw').mouseenter(function(){
	$(this).prev('a').addClass('gw_over')
	$(this).css("display","block");
	});
	$('.map_area02 .data_gw').mouseleave(function(){
	$(this).prev('a').removeClass('gw_over')
	$(this).css("display","none");
	});
})
$(document).ready(function(){
	$('.map_area02 .data_kb').mouseenter(function(){
	$(this).prev('a').addClass('kb_over')
	$(this).css("display","block");
	});
	$('.map_area02 .data_kb').mouseleave(function(){
	$(this).prev('a').removeClass('kb_over')
	$(this).css("display","none");
	});
})
$(document).ready(function(){
	$('.map_area02 .data_kn').mouseenter(function(){
	$(this).prev('a').addClass('kn_over')
	$(this).css("display","block");
	});
	$('.map_area02 .data_kn').mouseleave(function(){
	$(this).prev('a').removeClass('kn_over')
	$(this).css("display","none");
	});
})



$( document ).ready( function() {
	$( '.S02_sch_area h4' ).click( function() {
		$( '.S02_sch_area h4' ).toggleClass( 'ab' );
	} );
} );

$(document).ready(function(){
	$('.sch_inner .peri_btn').click(function() {
	$(this).toggleClass('peri_btn_over')
	$(this).siblings().removeClass('peri_btn_over')
	});
})

$(document).ready(function(){
	$('.bd_header  a').click(function() {
	$(this).addClass('a_over')
	$(this).siblings().removeClass('a_over')
	});
})

$( '.mainPupup' ).ready(function(){
//	$( '.mainPupup' ).draggable({ scroll : false, containment : 'body', handle : '.pop_header'  });
	$('.pop_close01').click(function() {
		$(this).parent().parent().css('display','none')
	});
	$('.pop_close02').click(function() {
		$(this).parent().parent().css('display','none')
	});
} );

$(document).ready(function(){

	$(".sns04").off().on('click',function (e) {
		cfunc.common.print();
	});

	$(".sns05").off().on('click',function (e) {
		cfunc.alert.info("복사되었습니다.");
		cfunc.common.urlCopyToClipboard();
	});
});


// datepicker 한글 적용
$.datepicker.setDefaults({
	dateFormat: 'yy-mm-dd',
	prevText: '이전 달',
	nextText: '다음 달',
	monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	dayNames: ['일', '월', '화', '수', '목', '금', '토'],
	dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	showMonthAfterYear: true,
	yearSuffix: '년'
});

$(document).ready(function(){
	$('.sch_more').click(function() {
		$(this).toggleClass('sch_more_tog')
		$('.S02_sch_area .sch_toggle').toggleClass('togh371');
		$('.S02_result_area .res_body').toggleClass('togh185');
	});
})

$(document).ready(function(){
	$('.option_close_ico').click(function() {
		$(this).toggleClass('option_open_ico')
		$('.search_area').toggleClass('option_tog_01');
		$('.sch_result').toggleClass('option_tog_02');
		$('.sch_result .result_list').toggleClass('option_tog_032');
	});
})

$(document).ready(function(){
	$('.map-navigate_ico').click(function() {
		$('.navi_choice').css('display','block')
	});
})
