// 팝업 게시 번호
var getNttNo = [];

$(function() {
    // 팝업화면
    //  getPopup01();

	// 23.09.11 다중 도메인으로 인한 국가도메인 통일 지정
	var url = window.location.host;
	
	if(url == 'www.h2nbiz.co.kr' || url == 'www.h2nbiz.com'){
		location.href = 'https://www.h2nbiz.or.kr';
	}

    // 팝업화면
    getPopup();

    // 수소가격
    getHydrogenPrice();

    // 청정수소 친환경 기여도
    getEcoEffect();

    // 우리지역 충전소
    getChrestnByOurArea();

    // 공지사항
    getMainNotice();

    // 충전소 운영현황
    chrstnAreaStatus();

    // 메인페이지 slide 추가. (에러나서 뺌)
    // mainSlide();
});

// $(window).resize(function (){
//     // width값을 가져오기
//     var width_size = window.outerWidth;
//
//     // 800 이하인지 if문으로 확인
//     if (width_size <= 800) {
//         alert('현재 브라우저 크기가 <= 800px');
//     }
// })

/* 팝업화면 시작 */
getPopup = function() {
    cfunc.common.jsonGet({url: "/rt/uif/yard/bbs/selectPopup.do"})
        .then(function (res) {
            if(!cfunc.common.isEmpty(res)) {
                createPopup(res);
            } else {}
        });
}

// 팝업 생성
function createPopup(res) {
    // 데이터 파싱
    var data = parsePopupData(res);

    // 메인화면 공지사항 팝업 생성 & 렌더링
    createMainBoardPopup(data);
}

parsePopupData = function(res) {
    var data = _.map(res, function(item) {
        var newDate = newFormatDate(item.frstRegDt);
        var newBgng = newFormatDate(item.popupBgngYmd);
        var newEnd = newFormatDate(item.popupEndYmd);
        return {
            rNum: item.rNum
            , bbsNo: item.bbsNo
            , nttNo: item.nttNo
            , nttSj: item.nttSj
            , nttCn: item.nttCn
            , frstRegDt: newDate
            , popupBgngYmd: newBgng
            , popupEndYmd: newEnd
            , urlNm : item.urlNm
            , strgFileNm : item.strgFileNm
            , fileStrgPathNm : item.fileStrgPathNm
            , fileExtnNm : item.fileExtnNm
            , orginlFileNm : item.orginlFileNm
            , rlsScopeCd : item.rlsScopeCd
        }
    })
    return data;
}

getPopup01 = function() {

    var ids = _.map( $(".mainPupup"),function (item) {
        $(item).draggable({ scroll : false, containment : 'body', handle : '.pop_header'  });
        return $(item).attr('id');
    });

    //최초 레이어팝업 노출 (popupCookie라는 이름의 쿠키가 존재하지 않으면 레이어 노출)
    _.each(ids,function (item){
        showPopup(item);
    });

}

// 팝업 닫기 버튼 클릭시
closePopup = function(id) {
    // 오늘하루보지않음 체크되어있으면
    if($("#"+id).find('input').is(':checked')) {
        hidePopup(1,id);
    } else {
        // 일반 닫기
        hidePopup(0,id);
    }
    // 게시판 조회수 증가
    if(id == "popup01"){
        inqCoUp1(); // 게시판 조회수 증가
    }
    else {
        inqCoUp2(); // 게시판 조회수 증가
    }
}
// 팝업 보이게
showPopup = function(obj) {

    if(!$.cookie(obj)) {
        $("#"+obj).show();
        return ;
    }

    var cookiy = JSON.parse($.cookie(obj));
    var id = cookiy.id;
    $('#'+id).hide();
}

// 팝업 안보이게
hidePopup = function(state,id) {
    //닫기, 오늘하루보지않기 무관하게 레이어팝업은 닫는다.
    // $('#popup01').hide();

    // 오늘하루보지않음을 체크한 경우
    if(state === 1) {
        // 'popupCookie' 이름의 쿠키가 있는지 체크한다.
        if($.cookie(id) == undefined) {
            // var date = new Date();
            // date.setDate(date.getDate() + 1);
            // date.setHours(0, 0, 0, 0);


            // 쿠키가 없는 경우 popupCookie 쿠키를 추가
            $.cookie(id,JSON.stringify({pop:'N',id:id}), { expires: 1, path: '/'});

            /**
             설명 :
             임의로 popupCookie라는 이름에 Y라는 값을 넣어주었고,
             expires값으로 1을 주어 1일 후 쿠키가 삭제되도록 하였다.
             path값을 '/'로 주면 해당사이트 모든페이지에서 유효한 쿠키를 생성한다.
             특정페이지에서만 작동하려면 페이지 경로를 작성하면 된다.
             **/
        }
    }
}



/* 팝업화면 끝 */


/* 공지사항 시작 */

// 메인화면에 게시판(공지사항) 띄우기
function getMainNotice() {
    cfunc.common.jsonGet({url: "/rt/uif/yard/bbs/selectMainBoard.do"})
        .then(function (res) {
            if(!cfunc.common.isEmpty(res)) {
                createMainBoard(res);
            } else {}
        });
}

// 공지사항 목록 생성
function createMainBoard(res) {
    // 데이터 파싱
    var data = parseMainBoardData(res);

    // 메인화면 공지사항 html 생성
    var html = createMainBoardHtml(data);
    
    // 랜더링
    $('#notice_wrap').html(html);
    
    // 메인화면 공지사항 팝업 생성 & 렌더링
    // createMainBoardPopup(data);
    
    // 이벤트 바인딩
    bindMainBoardEvent(data);

    // 공지사항 slide
    slideNotice();
}

// 공지사항 목록 테이블 데이터 파싱
function parseMainBoardData(res) {
    var data = _.map(res, function(item) {
            var newDate = newFormatDate(item.frstRegDt);
            // var newBgng = newFormatDate(item.popupBgngYmd);
            // var newEnd = newFormatDate(item.popupEndYmd);
            return {
                rNum: item.rNum
                , bbsNo: item.bbsNo
                , nttNo: item.nttNo
                , nttSj: item.nttSj
                , nttCn: item.nttCn
                , frstRegDt: newDate
                , rlsScopeCd: item.rlsScopeCd
                // , popupBgngYmd: newBgng
                // , popupEndYmd: newEnd
                // , urlNm : item.urlNm
                // , strgFileNm : item.strgFileNm
                // , fileStrgPathNm : item.fileStrgPathNm
                // , fileExtnNm : item.fileExtnNm
                // , orginlFileNm : item.orginlFileNm
            }
    })
    return data;
}

// 날짜 형식 변환(YYYYMMDDHHMMSS -> YYYY.MM.DD)
function newFormatDate(date) {
    var year = date.substring(0,4);
    var month = date.substring(4,6);
    var day = date.substring(6,8);

    var newDate = year + "-" + month + "-" + day;

    return newDate;
}
// 공지사항 팝업 생성
function createMainBoardPopup(data) {

    var newData = [];
    var now = new Date();
    var today = now.getFullYear() + "-" + (("00" + (now.getMonth()+1).toString()).slice(-2)) + "-" + (("00" + now.getDate().toString()).slice(-2));

    _.map(data, function (item){ // 날짜 조건 체크
            if((item.popupBgngYmd <= today && item.popupEndYmd >= today)) {
                // 홈페이지, 전체 일 경우에만 팝업 표시
                if(item.rlsScopeCd  == "00" || item.rlsScopeCd == "01"){
                    newData.push(item);
                }
        }
    });

    if (newData.length === 1) {
        $('#popup02').removeClass('mainPupup');

    } else if (newData == null || newData.length == 0){
        $('#popup01').removeClass('mainPupup');
        $('#popup02').removeClass('mainPupup');
    }

    createPopupContext(newData, newData.length);
}

// 팝업창 내용 채우기
function createPopupContext (data, code) { // 번호 파라마터 추가하고 아이디들에 번호 줘서 팝업 1 팝업 2 분기 나누기ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ

    getPopup01();

    if(code >=3) { // 조건에 부합하는 결과가 3개 이상이어도 당장 팝업 2개만 띄우기
        code = 2;
    }

    for (var i = 0; i < code; i++) {
        var item = data[i];
        var j = i + 1;
        getNttNo.push(item.nttNo);
        // 확장자 명만 추출한 후 소문자로 변경
        var _arrExt = new Array("jpg", "png", "jpeg");

        if (!!item.fileExtnNm && _arrExt.includes(item.fileExtnNm.toLowerCase())) { // + 확장자체크
            $('#popup0' + j + 'Img').attr('style', 'display: block; width: 100%;');
            $('#popup0' + j + 'Img').attr('src', '/rt/uif/yard/bbs/downloadImg.do?imageFileName=' + item.strgFileNm);
            if(!cfunc.common.isEmpty(item.urlNm)){
                $('#popup0' + j + 'Url').attr('href', 'https://' + item.urlNm);
                $('#popup0' + j + 'Url').attr('style', '');
            }
            else {
                $('#popup0' + j + 'Url').attr('style', 'pointer-events : none');
            }

        } else {
            var res = "";
            res += '        <div class="pop_body" id="pop_body_test" style="padding-left: 20px;padding-right: 20px;">';
            res += '            <br><br>';
            res += '            <p style="white-space:break-spaces;">' + item.nttCn + '</p>';
            res += '            <br>';
            if (!!item.urlNm) {
                res += '            <br>';
                res += '            <a href="https://' + item.urlNm + '"> 상세 페이지로 이동하기 </a>';
                res += '            <br><br>';
            }
                res += '        </div>';
            $('#popup0' + j + 'Cnt').html(res);
        }
        $('#popup0' + j).children('div.pop_header').prepend(item.nttSj);
    }
}

// 공지사항 HTML 생성
function createMainBoardHtml(data) {
    // nttNo 오름차순으로 sort
    // console.log(_.sortBy(data, 'nttNo'));

    // 2개씩 잘라서.
    data = _.chunk(data, 2);

    var html = _.map(data, function(item) {
        var res = "";

        res += '<div>';

        res +=      '<div class="notice01" style="cursor: pointer">';
        // 제목 두줄 ex
        // res +=          '<h5 style="height: 60px; width: 285px; line-height: 140%; overflow: hidden;">' + item.nttSj + '</h5>'
        // 제목 한줄 --
        res +=          '<h5>' + item[0].nttSj + '</h5>'
            +           '<div class="date">' + item[0].frstRegDt + '</div>'
            +           '<div class="content">' + item[0].nttCn + '</div>'
            +       '</div>';

        if(item[1] != null) {
            res +=  '<div class="notice02" style="cursor: pointer">';
            res +=      '<h5>' + item[1].nttSj + '</h5>'
                +       '<div class="date">' + item[1].frstRegDt + '</div>'
                +       '<div class="content">' + item[1].nttCn + '</div>'
                +   '</div>';
        }

        res += '</div>';

        return res;
    });
    return html;
}

// 메인화면 공지사항 클릭 이벤트
function bindMainBoardEvent(data) {
    // 공지사항 클릭시
    var $item = $('#notice_wrap .notice01, #notice_wrap .notice02').click(function (evt) {
        var idx = $item.index(this);
        window.location = '/rt/uif/yard/bbs/selectBoardVw.do?bbsNo=' + data[idx].bbsNo + '&rNum=' +data[idx].rNum + '&nttNo=' +data[idx].nttNo
    });

    // (+)버튼 클릭. 공지사항 목록조회
    // $('.sec06 .left_header .btn03').click(function (evt) {
    //     window.location = '/rt/bbs/selectBoardListPageVw.do?bbsNo=1';
    // });
}

// 공지사항 slide
function slideNotice() {
    // 공지사항 slide
    $(".notice_slide").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        accessibility: false,
        autoplay: false,
        autoplaySpeed: 5000
    });
}

/* 공지사항 끝 */


/* 수소가격 시작 */

// 메인화면에 수소가격 띄우기
function getHydrogenPrice() {
    cfunc.common.jsonGet({url:"/main/selectHydrogenPrice.do"})
        .then(function (res){

            // ajax 반환값이 null일때,
            if(!res || !res.areaPriceList) return ;

            createHydrogenPrice(res);
        });
}

// 수소가격 목록 생성
function createHydrogenPrice(res) {

    // 수소가격 오늘 날짜(년,월,일) 설정
    $('.sec01 .price_date .year').text(cfunc.common.formatDate('yy.', new Date()));
    $('.sec01 .price_date .day').text(cfunc.common.formatDate('mm.dd', new Date()));

    // 전국평균 데이터 파싱
    var allPriceData = parseAllPriceData(res.allPriceVo);
    // 지역별 데이터 파싱
    var areaPriceData = parseAreaPriceData(res.areaPriceList);

    // 전국평균 html 생성
    var allPriceHtml = createAllPriceHtml(allPriceData);
    // 지역별 html 생성
    var areaPriceHtml = createAreaPriceHtml(areaPriceData);

    /* 랜더링 */
    // 전국평균 랜더링
    $('#allHydrogenPrice').html(allPriceHtml);
    // 지역별 랜더링
    $('#areaHydrogenPrice').html(areaPriceHtml);
    /* 랜더링 */

    // 이벤트 바인딩
    bindHydrogenPriceEvent();

    // 수소가격(지역별) slide
    slideHydrogenPrice();

}

// 수소가격 전국평균 데이터 파싱
function parseAllPriceData(res) {
    return {
        avgPrice: res.avgPrice,
        avgDtd: res.avgDtd,
        minPrice: res.minPrice,
        maxPrice: res.maxPrice
    }
}

// 수소가격 지역별 데이터 파싱
function parseAreaPriceData(data) {
    // sidocd 정렬
    var sortData = _.sortBy(data, 'ctpvCd');
    var i = 0;
    var res = _.map(sortData, function(item) {
        return {
            num: i++,
            ctpvCd: item.ctpvCd,
            areaNm: item.areaNm,
            avgPrice: item.avgPrice,
            avgDtd: item.avgDtd,
            minPrice: item.minPrice,
            maxPrice: item.maxPrice
        }
    })
    return res;
}

// 수소가격 전국평균 HTML 생성
function createAllPriceHtml(data) {
    var res = "";

    var strAvgDtd = data.avgDtd;
    var color = 'price_un_bl';
    // 증가량이 양수이면
    if(data.avgDtd >= 0) {
        strAvgDtd = '+' + cfunc.common.comma(data.avgDtd);
        color = 'price_un';
    }

    res = '<h4>전국평균</h4>'
     res += '<span class="txt_tt">(원/1kg)</span>'
          + '<div class="price">' + cfunc.common.comma(Number(data.avgPrice)) + '<span>원</span></div>'
          + '<div style="left: 40px; width: 150px;" class=' + color + '>'
          + '<span style="color: #666; display: inline-block; font-size: 16px; margin: 0 7px 0 0; font-family: Sp_r">전일대비</span>'
          + '<span>' + strAvgDtd + '</span>'
          + '</div>'
          + '<ul>'
            + '<li><span>최고가</span><span class="txt_red">' + cfunc.common.comma(Number(data.maxPrice)) + '</span><span>원</span></li>'
            + '<li><span>최저가</span><span class="txt_blue">' + cfunc.common.comma(Number(data.minPrice)) + '</span><span>원</span></li>'
          + '</ul>'

    return res;
}
// 수소가격 지역별 HTML 생성
function createAreaPriceHtml(data) {
    var res = "";
    var html = _.map(data, function(item) {
        var strAvgDtd = item.avgDtd;
        var color = 'txt02_bl';
        // 증가량이 양수이면
        if(item.avgDtd >= 0) {
            strAvgDtd = '+' + item.avgDtd;
            color = 'txt02';
        }

        res = '<div onclick="location.href=\'/rt/sts/pce/rtAmountInfo.do?ctpvCd=' + item.ctpvCd + '\'" style="cursor:pointer;">'
            +   '<span class="txt_ttx">(원/1kg)</span>'
            +   '<div class="left_sc_01">'
            +       '<h5>' + item.areaNm + '</h5>'
            +       '<div class="txt05_wrap">'
            +           '<div class="txt01">' + cfunc.common.comma(Number(item.avgPrice)) + '<span>원</span></div>'
            +           '<div class=' + color + '>' + strAvgDtd + '</div>'
            +       '</div>'
            +   '</div>'
            +   '<div class="right_sc_03">'
            +       '<ul>'
            +           '<li><div class="Mr5">최고가</div><div class="txt_red">' + cfunc.common.comma(Number(item.maxPrice)) + '</div><div>원</div></li>'
            +           '<li><div class="Mr5">최저가</div><div class="txt_blue">' + cfunc.common.comma(Number(item.minPrice)) + '</div><div>원</div></li>'
            +       '</ul>'
            +   '</div>'
            + '</div>';

        return res;
    });
    return html;
}

// 수소가격 이벤트
function bindHydrogenPriceEvent() {
    // 전국평균 클릭시
    $('#allHydrogenPrice').click(function (evt) {
        window.location = '/rt/sts/pce/rtAmountInfo.do';
    });

    // // 지역 클릭시
    // $('.price_info .areaHydrogenPrice').click(function (evt) {
    //     window.location = '/rt/sts/pce/rtAmountInfo.do';
    //     // alert($(this).index());
    // });
}

// 수소가격 slide
function slideHydrogenPrice() {
    $(".areaPlace").slick({
        infinite:true,
        slidesToShow:1,
        slidesToScroll:1,
        arrows:false,
        pauseOnFocus: true,
        pauseOnHover: true,
        accessibility:false,
        autoplay:true,
        autoplaySpeed:5000
    });
}
/* 수소가격 끝 */

/* 청정수소 친환경 기여도 시작 */

// 수소차량(승용,승합) 조회
function getEcoEffect() {
    cfunc.common.jsonGet({url:"/main/selectEcoEffect.do"})
        .then(function (res){
            //
            createEcoEffect(res);
        });
}


function createEcoEffect(res) {

    /* 데이터 파싱 시작 */
    // 차종별 데이터
    var carTypeVo = parseCarTypeData(res.carTypeCountVo);
    // 지역별 데이터
    var regionList = parseRegionData(res.regionChrstnList);

    /* 데이터 파싱 끝 */

    /* html 생성 시작 */
    // 차종별 html 생성
    var carTypeCountHtml = createCarTypeHtml(carTypeVo);

    // 지역별 html 생성
    // var regionHtml = createRegionCountHtml(regionList);

    // 공기정화(지역별) html 생성
    var purifyAirHtml = createPurifyAirHtml(regionList);
    // 탄소저감(지역별) html 생성
    var reduceCarbonHtml = createReduceCarbonHtml(regionList);
    /* html 생성 끝 */

    /* 랜더링 시작 */
    // 차종별
    if(res.carTypeCountVo != null) {
        // $('#rdngCount').text(cfunc.common.comma(carTypeCountVo.rdngCount));
        // $('#momRdngCount').text(cfunc.common.comma(carTypeCountVo.momRdngCount));
        // $('#ritgCount').text(cfunc.common.comma(carTypeCountVo.ritgCount));
        // $('#momRitgCount').text(cfunc.common.comma(carTypeCountVo.momRitgCount));

        $('#divCarType').html(carTypeCountHtml);
    }

    if(res.regionCountList.length != 0) {
        // 지역별
        // $('#regionDiv').html(regionHtml);

        // 공기정화(지역별)
        $('#purifyAirDiv').html(purifyAirHtml);

        // 탄소저감(지역별)
        $('#reduceCarbonDiv').html(reduceCarbonHtml);
    }
    /* 랜더링 끝 */

    // 친환경 slide
    slideEcoEffect();

}

// 차종별 데이터 파싱.
function parseCarTypeData(data) {
    return {
        rdngCount: data.rdngCount
        , ritgCount: data.ritgCount
        , momRdngCount: data.momRdngCount
        , momRitgCount: data.momRitgCount
    }
}

// 지역별 데이터 파싱.
function parseRegionData(data) {
    var data = _.map(data, function(item) {
        return {
            ctpvCd: item.ctpvCd                             // 지역코드
            , areaNm: item.areaNm                           // 지역이름
            // , areaCount: item.areaCount                     // 지역별 차량 대수
            , smSetleVolm: item.smSetleVolm                 // 지역별(충전소)_집계결제물량
            , countTree: getTree(item.smSetleVolm)            // 그루
            , countO2: getO2(item.smSetleVolm)                // 산소
            , countFineDust: getFineDust(item.smSetleVolm)    // 미세먼지
            , countCo2: getCo2(item.smSetleVolm)              // 이산화탄소

            , momCountTree: getTree(item.momAreaCount)      //
        }
    })
    return data;
}

// 전국평균 데이터 파싱.
function parseNationData(data) {
    return {
        countCo2: getCo2(data.nationAvg)
        , countTree: getTree(data.nationAvg)
    }
}

// 임시(차량대수)로 나무(그루) 구하기.
function getTree(data) {
    // // (1대/1년) : 62그루
    // tree = data * 62;

    // 1kg => 0.31 그루
    tree = data * 0.31;

    // 단위 : 10000 (1만) 그루
    tree = tree/10000;

    // 소수 둘째자리에서 올림 (소수 첫째자리까지)
    tree = Math.ceil(tree * 10) / 10;

    return tree;
}

// 임시(차량대수)로 산소증감(톤) 구하기.
function getO2(data) {
    // (1대/1년) : 19.4(톤)
    // var o2 = round(data * 19.4);

    // 1kg => 0.097톤(97kg)
    var o2 = round(data * 0.097);

    return o2;
}

// 임시(차량대수)로 미세먼지(톤) 구하기.
function getFineDust(data) {
    // (1대/1년) : 0.28 kg
    // var fineDust = round(data * 0.28);

    // 1kg => 0.014kg
    var fineDust = round(data * 0.0014);

    return fineDust;
}

// 임시(차량대수)로 CO2(톤) 구하기.
function getCo2(data) {
    // // (1대/1년) : 2.2(톤)
    // var co2 = round(data * 2.2);

    // 1kg => 0.011톤(11kg)
    var co2 = round(data * 0.011);

    return co2;
}


// 반올림, 콤마
function round(data) {
    return cfunc.common.comma(Math.round(data));
}

// 차종별 html 생성.
function createCarTypeHtml(data) {
    var res = "";

    res +=  '<div>'
        +       '<div class="left_sc_01">'
        +           '<h5>승용차</h5>'
        +           '<div class="ico01"></div>'
        +       '</div>'
        +       '<div class="right_sc_01-1" style="margin-top: 8px;">'
        +           '<span class="txt01">총</span><span id="rdngCount" class="txt02">' + round(data.rdngCount) + '</span><span class="txt01">대</span>'
        +           '<div class="li_bkr">'
        +               '<span class="txt03">전월대비</span>'
        +               '<span id="momRdngCount" class="txt04_up">' + round(data.momRdngCount) + '</span>'
        +           '</div>'
        +       '</div>'
        +    '</div>';

    res +=  '<div>'
        +       '<div class="left_sc_01">'
        +           '<h5>버스</h5>'
        +           '<div class="ico01"></div>'
        +       '</div>'
        +       '<div class="right_sc_01-1" style="margin-top: 8px;">'
        +           '<span class="txt01">총</span><span id="rdngCount" class="txt02">' + round(data.ritgCount) + '</span><span class="txt01">대</span>'
        +           '<div class="li_bkr">'
        +               '<span class="txt03">전월대비</span>'
        +               '<span id="momRdngCount" class="txt04_up">' + round(data.momRitgCount) + '</span>'
        +           '</div>'
        +       '</div>'
        +    '</div>';
    return res;
}

// 공기정화(지역별) html 생성
function createPurifyAirHtml(data) {
    // sidocd 정렬
    var sortData = _.sortBy(data, 'ctpvCd');
    var res = "";
    var html = _.map(sortData, function(item) {
        res = '<div>'
            +       '<div class="left_sc_01">'
            +           '<h5>'+ item.areaNm +'</h5>'
            +           '<div class="ico02"></div>'
            +       '</div>'
            // +       '<div class="right_sc_01-1">'
            +       '<div class="right_sc_01-1" style="margin-top: 8px;">'
            +           '<span class="txt01">총</span><span class="txt02">'+ item.countTree +'</span><span class="txt01">만 그루</span>'
            +           '<div class="li_bkr">'
            +               '<span class="txt03">O₂</span>'
            +               '<span class="txt04_up">'+ item.countO2 +'(톤)</span>'
            +           '</div>'
            +       '</div>'
            +     '</div>';
        return res;
    });
    return html;
}

// 탄소저감(지역별) html 생성
function createReduceCarbonHtml(data) {
    // sidocd 정렬
    var sortData = _.sortBy(data, 'ctpvCd');
    var res = "";
    var html = _.map(sortData, function(item) {
        res = '<div>'
            +       '<div class="left_sc_01-1">'
            +           '<h5>'+ item.areaNm +'</h5>'
            +           '<div class="ico03"></div>'
            +       '</div>'
            +       '<div class="right_sc_01-1" style="margin-top: 8px;">'
            // +           '<div class="txt01_2">미세먼지</div>'
            +           '<span class="txt01_2">미세먼지 </span>'
            +           '<span class="txt02">' + item.countFineDust + '</span><span class="txt01">(kg)</span>'
            +           '<div class="li_bkr">'
            +               '<span class="txt03">CO₂</span>'
            +               '<span class="txt04_down">'+ item.countCo2 +'(톤)</span>'
            +           '</div>'
            +       '</div>'
            +     '</div>';
        return res;
    });
    return html;
}

// 친환경 slide
function slideEcoEffect() {
    /* 청정수소 친환경 기여도 slick 시작 */
    // 차종별
    $(".car").slick({
        infinite:true,
        slidesToShow:1,
        pauseOnHover : true,
        pauseOnFocus: true,
        slidesToScroll:1,
        arrows:false,
        accessibility:false,
        autoplay:true,
        autoplaySpeed:5000
    });
    // 공기정화(지역별)
    $(".area").slick({
        infinite:true,
        slidesToShow:1,
        pauseOnHover : true,
        pauseOnFocus: true,
        slidesToScroll:1,
        arrows:false,
        accessibility:false,
        autoplay:true,
        autoplaySpeed:5000
    });
    // 탄소저감(지역별)
    $(".tan").slick({
        infinite:true,
        slidesToShow:1,
        pauseOnHover : true,
        pauseOnFocus: true,
        slidesToScroll:1,
        arrows:false,
        accessibility:false,
        autoplay:true,
        autoplaySpeed:5000
    });
    /* 청정수소 친환경 기여도 slick 끝. */
}
/* 청정수소 친환경 기여도 끝 */


// 전국 충전소 현황
function chrstnAreaStatus() {

    cfunc.common.jsonGet({url: '/cmm/getChrstnAreaStatus.do'})
        .then(function (res) {
            var num = 0;
            // 클릭시 충전소현황_기초정보로 이동 추가.
            // _.each($("#mapArea").children("a")
            //     , function (item, idx) {
            //         if (!!res[num]) {
            //             $(item).attr("onclick", 'location.href=\'/rt/sts/inf/rtBsisInfo.do?ctpvCd=' + res[num].ctpvCd + '\'');
            //             num++;
            //             return;
            //         }
            //     })
            // // 웹
             if(matchMedia("screen and (min-width: 768px").matches) {
                 // [지도영역] 클릭시 충전소현황_기초정보로 이동 추가.
                 _.each($("#mapArea").children("a")
                     , function (item, idx) {
                         if (!!res[num]) {
                             $(item).attr("onclick", 'location.href=\'/rt/sts/inf/rtBsisInfo.do?ctpvCd=' + res[num].ctpvCd + '\'');
                             num++;
                             return;
                         }
                     })
             } else { // 모바일
                 // [풍선] 클릭시 충전소현황_기초정보로 이동 추가.

             }

            num = 0;
            _.each($("#mapArea").children("div")
                , function (item, idx) {
                    if (!!res[num]) {
                        if ($(item).find(".txt01").text() === res[num].areaNm) {
                            var count = res[num].count;
                            var avg = res[num].avg;
                            if (!count) count = 0;
                            if (!avg) avg = 0;
                            $(item).find(".txt02").text("(" + count + "개소)")
                            $(item).find(".txt03").text(cfunc.common.comma(avg,3) + "원")

                            // [풍선] 클릭시 충전소현황_기초정보로 이동 추가.
                            $(item).attr("ontouchstart", 'location.href=\'/rt/sts/inf/rtBsisInfo.do?ctpvCd=' + res[num].ctpvCd + '\'');
                            $(item).attr('ctpvCd', res[num].ctpvCd);
                            $(item).css('zIndex', 100);

                            num++;
                            return;
                        }
                        $(item).find(".txt02").text("(" + 0 + "개소)")
                        $(item).find(".txt03").text(0 + "원")
                    }
                })
        })
}

function getChrestnByOurArea() {
    cfunc.common.loadCoords().then(function () {
        // 좌표 가져오기
        var coordi  = JSON.parse(cfunc.common.getCoord());
        if(coordi) {
            //좌표로 주소 찾기
            cfunc.address.getAddressFromPoint({x: coordi.latitude, y: coordi.longitude})
                .then(function (res) {
                    // 셀렉터 값 썰정
                    $("#selectourArea").val(res.ctpvCd)

                    //목록 view 생성
                    createOurAreaView(res.ctpvCd);
                })
        } else {
            $("#selectourArea").val("11");
            $("#selectourArea").trigger('change');
        }
    });
}

// 셀렉트박스 이벤트
$("#selectourArea").change(function (e) {
    var option = "name_1"
    var ctpvCd = $(this).val();
    createOurAreaView(ctpvCd,option);
})


$("#searchPrice").click(function (e) {
    var option ="price_2";
    var ctpvCd = $("#selectourArea").val();
    createOurAreaView(ctpvCd,option);
})

$("#searchWait").click(function (e) {
    var option ="wait_2";
    var ctpvCd = $("#selectourArea").val();
    createOurAreaView(ctpvCd,option);
})
function createOurAreaView(ctpvCd,option){
    var param = {
        ctpvCd: ctpvCd,
        order: option || null,
        searchStandard: "1"
    }

    // m스크롤 제거
    if($("#searchOurArea").hasClass('mCustomScrollbar'))
        $('.sec04_right_result').mCustomScrollbar('destroy');

    //충전소 목록가져오기
    cfunc.common.loadCoords().then(function () {
        getChresList(param).then(function (list) {
            // html 생성
            var html = createOurAreaHtml(list);
            $("#searchOurArea").html(html);

            _.each(list.data, function (item) {
                var curCoord = JSON.parse(cfunc.common.getCoord());
                var sWkt = 'POINT(' + curCoord.longitude +' '+ curCoord.latitude +')'
                var dWkt = item.geom;
                getGeomDistance(sWkt,dWkt).then(function (data) {
                    if(!!data.Distance){
                        try{
                            $('#span-main-area-distance-'+item.chrstnMno).html( Math.round(data.Distance / 1000)+ 'Km');
                        } catch (e){}
                    }
                });
            });

            if (cfunc.common.isMobile()) {
                $('.MainisWeb').css('display', 'none');
                $('.MainIsMobile').css('display', 'block');
                $('.MainIsMobile').on('click', function (event) {
                    event.stopPropagation();
                    naviUrl(this);
                });
            } else {
                $('.MainisWeb').css('display', 'block');
                $('.MainIsMobile').css('display', 'none');
            }
            // m스크롤 생성
            $('.sec04_right_result').mCustomScrollbar({
                theme: 'minimal-dark',
                scrollInertia: 0,
                mouseWheel: {scrollAmount: 10},
            });
        });
    });
}

function createOurAreaHtml(list) {
    return _.map(list.data,function (item) {
        var param = {
            dlng : item.geom.replace('POINT(', '').replace(')', '').split(' ')[0],
            dlat : item.geom.replace('POINT(', '').replace(')', '').split(' ')[1],
            dname : item.chrstnNm
        }
        var url1 = cfunc.common.getContextPath() + '/rt/sch/rtSearch.do?tabNo=1&mno='+item.chrstnMno+'&type=D'
        var url2 = cfunc.common.getContextPath() + '/rt/sch/rtSearch.do?tabNo=1&mno='+item.chrstnMno+'&type=R'
        var cnt = !!item.waitVhcleAlgeCnt && item.waitVhcleAlgeCnt > 0 ? cfunc.common.comma(item.waitVhcleAlgeCnt) : '0';
        var waitTime = cfunc.common.isNumber(cnt) ? cnt * 7+"분" : "없음";
        var price = !item.ntslPc ? 0 : item.ntslPc;
        var waitVhcleAlge = createWaitVhcleAlgeHtml(item.operSttusCd, item.waitVhcleAlge, item.vhcleKndCd);
        return '<div class="result_wrap" onclick="location.href =\''+url1+'\' " style="cursor: pointer">\n' +
            '              <h4 style="max-width: 218px;">'+item.chrstnNm+'</h4>\n' +
                           waitVhcleAlge +
            '              <div class="ico_wrap">\n' +
            // '                <a href="'+url1+'" title="지도이동" class="ico01"></a>\n' +
            '                <a href="'+url2+'"  class="ico02 MainisWeb" title="지도이동"></a>\n' +
            '                <div class="ico02 MainIsMobile" dlng='+param.dlng+' dlat='+param.dlat+' dname='+param.dname+'"></div>\n' +
            '              </div>\n' +
            '              <ul>\n' +
            '                <li>대기차량 : '+cnt+'대 (현재 대기 예상시간 '+ waitTime+')</li>\n' +
            '                <li>충전비용(1kg) : <span>'+cfunc.common.comma(price,3)+'원</span> <span id="span-main-area-distance-'+item.chrstnMno+'" style="color: #777;padding-left: 10px;font-family: Sp_l;font-size:16px;"></span></li>\n' +
            '              </ul>\n' +
            '            </div>'
    })
}
/*
function createWaitVhcleAlgeHtml(operSttusCd, waitVhcleAlge) {
    var classNm = '';
    // 운영상태코드
    if(operSttusCd == null || operSttusCd == 0) {
        switch(waitVhcleAlge) {
            case '보통' :
                classNm = 'con_c01'
                break;
            case '영업정지' :
                classNm = 'con_c02'
                break;
            case '영업마감' :
                classNm = 'con_c03'
                break;
            case '여유' :
                classNm = 'con_c04'
                break;
            case '혼잡' :
                classNm = 'con_c05'
                break;
            case '운영중' :
                classNm = 'con_c06'
                // waitVhcleAlge = '운영중';
                break;
            case '영업중' :
                classNm = 'con_c06'
                // waitVhcleAlge = '영업중';
                break;
            case null :
                classNm = 'con_c06'
                waitVhcleAlge = '운영중';
                break;
        }
    } else {
        classNm = 'con_c03'
        waitVhcleAlge = '영업마감';
    }

    return '<div class=' + classNm + '>' + waitVhcleAlge + '</div>';
}
*/

   function createWaitVhcleAlgeHtml(operSttusCd, waitVhcleAlge, vhcleKndCd) {
	    var classNm = '';
        if(waitVhcleAlge != '영업마감' && waitVhcleAlge != '휴무' && waitVhcleAlge != '영업정지' && vhcleKndCd == '03'){
        	waitVhcleAlge = "버스전용";
        };
	    
        switch(waitVhcleAlge) {
            case '보통' :
                classNm = 'con_c01'
                break;
            case '영업정지' :
                classNm = 'con_c02'
                break;
            case '영업마감' :
                classNm = 'con_c03'
                break;
            case '여유' :
                classNm = 'con_c04'
                break;
            case '혼잡' :
                classNm = 'con_c05'
                break;
            case '운영중' :
                classNm = 'con_c06'
                waitVhcleAlge = '영업중';
                break;
            case '영업중' :
                classNm = 'con_c06'
                waitVhcleAlge = '영업중';
                break;
            case '' :
                classNm = 'con_c06';
                waitVhcleAlge = "영업중";
                break;
             case '휴무' :
                 classNm ='con_c08';
                 waitVhcleAlge = "휴무";
                 break;
             case '버스전용' :
                 classNm ='con_c09';
                 break;
        }
	     
        if(waitVhcleAlge != "휴무" && operSttusCd == '2'){ // 휴무가 우선
        	waitVhcleAlge = '설비점검';
        	classNm ='con_c08';
        };  

	    return '<div class=' + classNm + '>' + waitVhcleAlge + '</div>';
	}
	
function naviUrl(obj) {
    var param = {
        dlng : $(obj).attr('dlng'),
        dlat : $(obj).attr('dlat'),
        dname : $(obj).attr('dname')
    }
    cfunc.common.naverNavi(param);
}

function getChresList(param) {
    var deferred = $.Deferred();
    cfunc.common.jsonPost({
        url: '/rt/sts/inf/getAjaxCh' +
            'rstnList.do'
        , data: param
    }).then(function (res) {
        deferred.resolve(res);
    })
    return deferred;
}

function getGeomDistance (sWkt, dWkt) {
    var deferred = $.Deferred();
    $.ajax({
        url : cfunc.common.getContextPath() + "/api/getGeomDistance.do",
        type: "post",
        dataType: "json",
        data: JSON.stringify({
            sWkt: sWkt,
            dWkt: dWkt
        }),
        contentType : 'application/json',
        success : function (res) {
            deferred.resolve(res);
        }
    });
    return deferred;
}

// 팝업1 닫기, 오늘하루 보이지 않음, X표시를 누르면 조회수 증가
function inqCoUp1(){
    var deferred = $.Deferred();
    $.ajax({
        url : cfunc.common.getContextPath() + '/rt/uif/yard/bbs/updateViewCount.do'
        ,type : "post"
        ,data : {
            nttNo:getNttNo[0],
        }
        ,datatype : "json"
        ,success : function (data) {
            deferred.resolve(data);
        }
    });
    return deferred;
}

// 팝업2 닫기, 오늘하루 보이지 않음, X표시를 누르면 조회수 증가
function inqCoUp2(){
    var deferred = $.Deferred();
    $.ajax({
        url : cfunc.common.getContextPath() + '/rt/uif/yard/bbs/updateViewCount.do'
        ,type : "post"
        ,data : {
            nttNo:getNttNo[1],
        }
        ,datatype : "json"
        ,success : function (data) {
            deferred.resolve(data);
        }
    });
    return deferred;
}


// // 메인페이지 slide 추가.
// function mainSlide() {
//
//     // 수소가격(지역별) slide
//     $(".areaPlace").slick({
//         infinite:true,
//         slidesToShow:1,
//         slidesToScroll:1,
//         arrows:false,
//         accessibility:false,
//         autoplay:true,
//         autoplaySpeed:5000
//     });
//
//     /* 청정수소 친환경 기여도 slick 시작 */
//     // 차종별
//     $(".car").slick({
//         infinite:true,
//         slidesToShow:1,
//         slidesToScroll:1,
//         arrows:false,
//         accessibility:false,
//         autoplay:true,
//         autoplaySpeed:5000
//     });
//
//     // 지역별
//     $(".area").slick({
//         infinite:true,
//         slidesToShow:1,
//         slidesToScroll:1,
//         arrows:false,
//         accessibility:false,
//         autoplay:true,
//         autoplaySpeed:5000
//     });
//     /* 청정수소 친환경 기여도 slick 끝. */
//
//     // 공지사항 slide
//     $(".notice_slide").slick({
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false,
//         accessibility: false,
//         autoplay: false,
//         autoplaySpeed: 5000
//     });
//
// }