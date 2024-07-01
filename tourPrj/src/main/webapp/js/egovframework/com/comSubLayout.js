
$(function (){
    // 자기자신 가져오기
    chkName();
    $(".dep2").css('display', 'none');
});

// 대메뉴 열고 닫히게 설정
$("#largDiv").on('click', function (){
    if($("#largeDep1").css('display') === 'none'){
        $("#largeDep1").css('display', 'block');
    }
    else if($("#largeDep1").css('display') === 'block'){
        $("#largeDep1").css('display', 'none');
    }
})

// 중메뉴 열고 닫히게 설정
$("#midDiv").on('click', function (){
    
    if($("#middleMenu").css('display') === 'none'){
        $("#middleMenu").css('display', 'block');
    }
    else if($("#middleMenu").css('display') === 'block'){
        $("#middleMenu").css('display', 'none');
    }
})

// 소메뉴 열고 닫히게 설정
$("#lastDiv").on('click', function (){
    
    if($("#lastMenu").css('display') === 'none'){
        $("#lastMenu").css('display', 'block');
    }
    else if($("#lastMenu").css('display') === 'block'){
        $("#lastMenu").css('display', 'none');
    }
})


// 상위 메뉴로 조회
function menuSelect(upperId)
{
    cfunc.common.jsonGet({url:"/sym/mnu/mpm/selectHeadMain.do", data:{menuNo :upperId}})
        .then(function (res){
            var data = parseName(res);
            var html = creatHtml(data);
            $("#largDiv").html(html);
            menuBarLargList();
        });
}

// 상단 메뉴 클릭시 중메뉴 소메뉴 조회
function menuMidSelect(menuNo){
    cfunc.common.jsonGet({url:"/sym/mnu/mpm/selectSubLayout2.do", data:{upperMenuId :menuNo}})
        .then(function (res){
            var data = parseName(res);
            var data2 = data[0].menuNm;
            var html = creatMiddleHtml(data2);
            var html2 = creatHtmlMiddle(data);
            $("#midDiv").html(html);
            $("#middleMenu").html(html2);
        })
}

// 화면번호으로 화면명 가져오기
function chkName(){
    cfunc.common.jsonGet({url:"/sym/mnu/mpm/selectSubLayoutMain.do"})
        .then(function (res){
            var data = parseName(res);
            var html = creatHtml(data);
            var midhtml = makeMidHtml(data); // 중메뉴 html로 제목 만들기
            var menuNo = data[0].menuNo;
            var upperId = data[0].upperMenuId;
            console.log("menuNo ::"+menuNo);
            console.log("upperId ::"+upperId);

            if(upperId != 0){
                // 중메뉴 제목 생성
                $("#midDiv").html(midhtml);
                // 중메뉴 목록 조회
                midSelect(upperId);
                // 상위 메뉴 조회
                menuSelect(upperId);

                // 소메뉴 목록 조회
                chkLastMenu(menuNo);
            } else{ // 상단 클릭시
                // 대메뉴 제목 생성
                $("#largDiv").html(html);
                // 대메뉴 목록 만들기
                menuBarLargList();
                // 중메뉴 제목 + 목록
                menuMidSelect(menuNo);
                // 소메뉴 제목 + 목록
                chkLastMenu(menuNo);
            }
        });
}

//  중메뉴 목록 조회
function midSelect(upperId){
    cfunc.common.jsonGet({url:"/sym/mnu/mpm/selectSubLayout2.do", data:{upperMenuId :upperId}})
        .then(function (res){
            var data = parseName(res);
            var html = creatHtmlMiddle(data);
            $("#middleMenu").html(html);
        });
}

// 데이터 파싱
function parseName(res){
    var data = _.map(res, function (menu){
        return {
            menuNo : menu.menuNo
            , upperMenuId : menu.upperMenuId
            , menuNm :menu.menuNm
        }
    })
    return data;
}

// 대메뉴 html 생성
function creatHtml(data)
{
    var html = _.map(data, function (menu) {
        return '<p class="sm">' + menu.menuNm + '</p>'
               + '<ul class="dep2" id="largeDep1" name="largeDepNm">'+'</ul>'
    });

    return html;
}

// 중메뉴 html 생성
function makeMidHtml(data)
{
    var html = _.map(data, function (menu) {
        return '<p class="sm">' + menu.menuNm + '</p>'
            + '<ul class="dep2" id="middleMenu"></ul>'
    });

    return html;
}

// 상단 메뉴 선택 후 중메뉴 제목
function creatMiddleHtml(data)
{

    var html = '<p class="sm">' + data + '</p>'
              + '<ul class="dep2" id="middleMenu"></ul>'

    return html;
}

// 중메뉴 목록 html 생성
function creatHtmlMiddle(data)
{
    var html = _.map(data, function (menu) {
        return '<li><a href="/sym/mnu/mpm/EgovMainMenuIndex.do?menuNo= '+menu.menuNo+' +&chkURL= '+menu.chkURL +'" style="display: block;">' +menu.menuNm + '</a></li>'
    });

    return html;
}

// 대메뉴 목록 조회
function menuBarLargList(){
    cfunc.common.jsonGet({url:"/sym/mnu/mpm/selectedHeadMenu.do"})
        .then(function (res){
            creatLargMenuBar(res);
        })
}

// 대메뉴 목록 파싱
function parseComLargListData(res)
{
     var data = _.map(res, function (menu) {
        return {
            menuNo: menu.menuNo
            , menuOrdr: menu.menuOrdr
            , menuNm: menu.menuNm
            , upperMenuId: menu.upperMenuId
            , relateImagePath: menu.relateImagePath
            , relateImageNm : menu.relateImageNm
            , chkURL : menu.chkURL
        }
    })
    return data;
}

// 대메뉴 목록 html 생성
function creatLargHtml(data)
{
    var html = _.map(data, function (menu) {
        return '<li><a href="/sym/mnu/mpm/EgovMainMenuIndex.do?menuNo= '+menu.menuNo+' +&chkURL= '+menu.chkURL +'" style="display: block;">' +menu.menuNm + '</a></li>'
    });

    return html;
}

//  대메뉴 목록 생성
function creatLargMenuBar(res)
{
    // 데이터파싱
    var data = parseComLargListData(res);

    //html 생성
    var html = creatLargHtml(data);

    //랜더링
    $("#largeDep1").html(html);

    return data;
}

// 소메뉴 조회
function chkLastMenu(data){
    console.log("data ::"+data);
    cfunc.common.jsonGet({url:"/sym/mnu/mpm/selectSubLayout3.do", data:{menuNo :data}})
        .then(function (res){
            // 데이터 존재하면 소메뉴 보이고 아니면 안 보이게 설정
            if(res.length > 0){
                // 소메뉴 제목 만들기
                createLastBarHtml(res);
                // 소메뉴 목록 만들기
                createLastBarListHtml(res);
                $("#lastDiv").show();
            }
            else if(res.length <= 0){
                // 값을 선택하면 상단에 표시됨
                $("#lastDiv").hide();
            }
        });
}


// 소메뉴 데이터 파싱
function parseComLastListData(res)
{
    var data = _.map(res, function (menu) {
        return {
            menuNo: menu.menuNo
            , menuOrdr: menu.menuOrdr
            , menuNm: menu.menuNm
            , upperMenuId: menu.upperMenuId
            , relateImagePath: menu.relateImagePath
            , relateImageNm : menu.relateImageNm
            , chkURL : menu.chkURL
        }
    })
    return data;
}


// 소메뉴 제목 html 생성
function creatLastHtml(data)
{
    var html = '<p class="sm">' + data + '</p>'
            + '<ul class="dep2" id="lastMenu"></ul>'

    return html;
}

// 소메뉴 목록 html 생성
function creatLastListHtml(data)
{
    var html = _.map(data, function (menu) {
        return '<li><a href="/sym/mnu/mpm/EgovMainMenuIndex.do?menuNo= '+menu.menuNo+' +&chkURL= '+menu.chkURL +'" style="display: block;">' +menu.menuNm + '</a></li>'
    });

    return html;
}

// 메뉴바 소메뉴 제목 만들기
function createLastBarHtml(res) {
    // 데이터파싱
    var data = parseComLastListData(res);
    var data2 = data[0].menuNm;

    //html 생성
    var html = creatLastHtml(data2);

    //랜더링
    $("#lastDiv").html(html);
    return data;
}

// 메뉴바 소메뉴 목록 만들기
function createLastBarListHtml(res) {
    // 데이터파싱
    var data = parseComLastListData(res);

    //html 생성
    var html = creatLastListHtml(data);

    //랜더링
    $("#lastMenu").html(html);

    return data;
}




