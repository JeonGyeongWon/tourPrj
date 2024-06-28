/**
 * 공통 함수
 *
 */

window.cfunc = window.cfunc || {};

cfunc.common = (function () {

    var COORDS = "coords";
    var defaultDateFormat = 'yymmdd';
    var addrCallback = null;
    var mappoiCallback = null;
    var bizCallback = null;
    var addBizCall = null;
    /**
     *  카멜케이스 변경
     * @param {String} str : 변경할 문자열
     * @param {String} delimiters : 구분자 defalult : _
     */
    var camelCase = (function () {
        var DEFAULT_REGEX = /[-_]+(.)?/g;

        function toUpper(match, group1) {
            return group1 ? group1.toUpperCase() : '';
        }

        return function (str, delimiters) {
            str = str.toLowerCase();
            return str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)?', 'g') : DEFAULT_REGEX, toUpper);
        };
    })();

    /**
     *  데이트폼
     * @param {String} format
     * @param {Date} date
     * @return {String} 폼으로 변경된 날짜
     */
    function formatDate(format, date) {
        date = date || new Date();
        format = format || defaultDateFormat;

        return $.datepicker.formatDate(format, date);
    }

    /**
     * 현재시간 가져오기
     * @return {string} 현재시간
     */
    function timestamp() {
        var d = new Date();
        return formatDate()
            + right('0' + d.getHours(), 2)
            + right('0' + d.getMinutes(), 2)
            + right('0' + d.getSeconds(), 2);
    }

    /**
     * 문자열 자르기(왼쪽기준)
     * @param {string} str : 대상문자열
     * @param {Number} n : 위치
     * @return {string} : 자르기 완료된 문자열
     */
    function left(str, n) {
        if (n <= 0)
            return "";
        else if (_.isUndefined(str))
            return "";
        else if (n > String(str).length)
            return str;
        else
            return String(str).substring(0, n);
    }

    /**
     * 문자열 자르기 (오른쪽 기준)
     * @param {String} str : 대상문자열
     * @param {Number} n : 위치
     * @return {string} : 자르기 완료된 문자열
     */
    function right(str, n) {
        if (n <= 0)
            return "";
        else if (_.isUndefined(str))
            return "";
        else if (n > String(str).length)
            return str;
        else {
            var iLen = String(str).length;
            return String(str).substring(iLen, iLen - n);
        }
    }

    /**
     * 숫자 여부 확인
     * @param {*} n
     * @return {boolean}
     */
    function isNumber(n) {
        if (n) {
            return !!!_.isNaN(Number(n));
        }

        return false;
    }


    /**
     * Ajax 통신 공통 함수
     * @param param
     * @param {String} param.url                      url
     * @param {String} param.requestType              get, post, default : get
     * @param {String} param.contentType              default : application/x-www-form-urlencoded; charset=UTF-8
     * @param {String} param.dataType                 default : json
     * @param {Object} param.data                     data
     * @param {function} param.beforeSendCallback       통신전 콜백
     * @param {function} param.successCallback          통신 성공 콜백
     * @param {function} param.completeCallback         통신 완료 콜백
     * @param {function} param.errorCallBack            통신 실패 콜백
     */
    var doAjax = function (param) {

        var deferred = $.Deferred();

        var url = getContextPath() + param.url || null;
        var requestType = param.requestType || "GET";
        var contentType = param.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
        var dataType = param.dataType || 'json';
        var data = param.data || {};
        var beforeSendCallback = param.beforeSendCallback || null;
        var successCallback = param.successCallback || null;
        var completeCallback = param.completeCallback || null;
        var errorCallBack = param.errorCallBack || null;

        $.ajax({
            url: url,
            type: requestType,
            contentType: contentType,
            dataType: dataType,
            data: data,
            beforeSend: function (jqXHR, settings) {
                if (typeof beforeSendCallback === "function") {
                    beforeSendCallback();
                }
            },
            success: function (data, textStatus, jqXHR) {
                if (typeof successCallback === "function") {
                    successCallback(data);
                }
                deferred.resolve(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (typeof errorCallBack === "function") {
                    errorCallBack(errorThrown);
                }
                deferred.reject(new Error("Error occurred!"));

            },
            complete: function (jqXHR, textStatus) {
                if (typeof completeCallback === "function") {
                    completeCallback();
                }
                deferred.resolve(textStatus);
            }
        });

        return deferred;

    }

    /**
     * Post 통신
     * @Async
     * @param {Object} param.data                     data
     * @param {function} param.beforeSendCallback       통신전 콜백
     * @param {function} param.successCallback          통신 성공 콜백
     * @param {function} param.completeCallback         통신 완료 콜백
     * @param {function} param.errorCallBack            통신 실패 콜백
     *
     * @return {Promise}
     */
    function jsonPost(param) {
        param.requestType = 'POST';
        param.contentType = 'application/json';
        param.data = JSON.stringify(param.data);

        return doAjax(param);
    }

    /**
     * Post 통신
     * @Async
     * @param {Object} param.data                     data
     * @param {function} param.beforeSendCallback       통신전 콜백
     * @param {function} param.successCallback          통신 성공 콜백
     * @param {function} param.completeCallback         통신 완료 콜백
     * @param {function} param.errorCallBack            통신 실패 콜백
     *
     * @return {Promise}
     */
    function jsonGet(param) {
        param.requestType = 'GET';
        param.contentType = 'application/json';
        return doAjax(param);
    }


    /**
     * 변수의 널값 체크
     * @param value
     * @return {boolean}
     */
    function isEmpty(value) {
        return value === "" || value == null || (typeof value == "object" && !Object.keys(value).length);
    }

    function emptythenMinus (value) {
        return isEmpty(value) ? '-' : value;
    }


    /**
     * 공백을 0으로 체우는 메소드
     * @param {String|Number} value 타겟 문자열
     * @param {Number} len 표현할 자리수
     * @return {*}
     */
    function prependZero(value, len) {
        while (value.toString().length < len) {
            value = "0" + value
        }
        return value;
    }

    /**
     *  천단위 콤마 생성
     * @param {String|Number} x
     * @return {string}
     */
    function comma(x) {
        if(!isNumber(x)) return x;
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * 콤마 지우기
     * @param {String|Number} str
     * @return {*}
     */
    function removeCommas(str) {
        return (str.replace(/,/g, ''));
    }




    /**
     * url(get 방식) 파라미터를 json 으로 변환 하는 메소드
     * @param {String} url
     * @return {Object}
     */
    function queryStringToJson(url) {
        var urls = url.split('?');
        var str = urls[1];
        var pairs = str.split('&');
        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            var name = pair[0];
            var value = pair[1];
            if (name.length)
                if (result[name] !== undefined) {
                    if (!result[name].push) {
                        result[name] = [result[name]];
                    }
                    result[name].push(value || '');
                } else {
                    result[name] = value || '';
                }
        });
        return (result);
    }

    /**
     * 문자열에서 해당 문자 모두 변환
     * @param {String} str 타겟 문자열
     * @param {String} searchStr 찾을 문자열
     * @param {String} replaceStr 변경할 문자열
     * @return {*}
     */
    function replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    function newFormatDate(date) {
        if(!date)  return '-';
        var year = date.substring(0,4);
        var month = date.substring(4,6);
        var day = date.substring(6,8);

        var newDate = year + "-" + month + "-" + day;

        return newDate;
    }

    function newFormatTimestamp(date) {
        if(!date)  return '-';
        var year = date.substring(0,4);
        var month = date.substring(4,6);
        var day = date.substring(6,8);
        var hour = date.substring(8,10);
        var minute = date.substring(10,12);

        var newDate = year + "." + month + "." + day + " " + hour + ":" + minute;

        return newDate;
    }

    function removeHyphen(str) {
        return str.replace(/-/g,'');
    }

    /**
     * 컨텍스트패스 가져오기
     * @return {string}
     */
    function getContextPath() {
        return sessionStorage.getItem("contextpath");
    }

    /**
     * 폼 객체를 Object 로 변환
     * @param formArray
     * @return {Object}
     */
    function objectifyForm(formArray) {
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++) {
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }

    /////////// 현재 위치 관련 함수 ///////////////
    function loadCoords() {
        var deferred = $.Deferred();
        //var loadedCoords = localStorage.getItem(COORDS);
        navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var coordsObj = {
                    latitude : latitude,
                    longitude : longitude,
                };
                localStorage.setItem(COORDS, JSON.stringify(coordsObj));
                deferred.resolve();
            },
            function () {
                //서울 시청 좌표
                var coordsObj = {
                    latitude : "37.56682420267543",
                    longitude : "126.978652258823",
                };
                localStorage.setItem(COORDS, JSON.stringify(coordsObj));
                console.log("Can't access geo location");
                deferred.resolve();
            }
        );
        return deferred;
    }
    function getCoord() {
        if (!localStorage.getItem(COORDS)){
            return JSON.stringify({
                //서울 시청 좌표
                latitude : "37.56682420267543",
                longitude : "126.978652258823",
            });
        } else {
            return localStorage.getItem(COORDS);
        }
    }
    //////////////////////////

    /**
     * 현재 접속기기가 모바일인지 체크
     */
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function checkMobile(){
        var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
        if ( varUA.indexOf('android') > -1) {
            //안드로이드
            return "android";
        } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
            //IOS
            return "ios";
        } else {
            //아이폰, 안드로이드 외
            return "other";
        }
    }
    /**
     * 클립보드에 값을 복사함
     * @param val
     */
    function copyToClipboard(val) {
        var t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = val;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
    }

    /**
     * 클립보드에 현재 url 값을 복사함
     */
    function urlCopyToClipboard() {
        copyToClipboard(location.href);
    }

    function getCurrentWeek(){
        var weekArray = [
            {cd : 'Sun',    nm : '일'},
            {cd : 'Mon',    nm : '월'},
            {cd : 'Tues',   nm : '화'},
            {cd : 'Wed',    nm : '수'},
            {cd : 'Thur',   nm : '목'},
            {cd : 'Fri',    nm : '금'},
            {cd : 'Sat',    nm : '토'}
        ];
        var d = new Date();
        return weekArray[d.getDay()];
    }
    /**
     *  오늘이 공휴일인지 확인
     */
    function getTodayIsHoliDay() {
        var deferred = $.Deferred();
        $.ajax({
            url : cfunc.common.getContextPath() + "/rt/sts/inf/getTodayIsHoliDay.do",
            type: "get",
            dataType: "json",
            success : function (res) {
                deferred.resolve(res);
            }
        });
        return deferred;
    }
    /**
     *  현재시간과 시간 비교
     */
    function currentTimeCompere(time) {
        var now = new Date(Date.now());
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();
        var hours = now.getHours();
        var minutes = now.getMinutes();

        var cHours = time.split(':')[0];
        var cMinutes  = time.split(':')[1];

        var curDate = new Date(year, month, day, hours, minutes);
        var cDate = new Date(year, month, day, cHours, cMinutes);

        var elapsedMSec = cDate.getTime() - curDate.getTime();
        var elapsedMin = elapsedMSec / 1000 / 60;

        return parseInt(elapsedMin);
    }
    /**
     *  현재시간이 종료시간인지 비교
     */
    function isCurCloseTime(sTime, eTime) {
        var start = currentTimeCompere(sTime);
        var end = currentTimeCompere(eTime);
        if(start <= 0 && 0 < end){
            return false;
        } else {
            return true;
        }
    }
    /**
     * 시도 목록 가져오기
     */
    function getBrtcList() {
        var deferred = $.Deferred();
        $.ajax({
            url : cfunc.common.getContextPath() + "/cmm/area/getBrtcMList.do",
            type: "get",
            dataType: "json",
            success : function (res) {
                deferred.resolve(res);
            }
        });
        return deferred;
    }
    /**
     * 시군구 목록 가져오기
     */
    function getSggList(ctpvCd) {
        var deferred = $.Deferred();
        $.ajax({
            url : cfunc.common.getContextPath() + "/cmm/area/getSggMList.do",
            data :{ctpvCd : ctpvCd},
            type: "get",
            dataType: "json",
            success : function (res) {
                deferred.resolve(res);
            }
        });
        return deferred;
    }

    /**
     * 업종코드 가져오기 
     */
    function getSectorList() {
        var deferred = $.Deferred();
        $.ajax({
            url : cfunc.common.getContextPath() + "/rt/spldmd/prd/getSectorList.do",
            type: "get",
            dataType: "json",
            success : function (res) {
                deferred.resolve(res);
            }
        });
        return deferred;
    }

    //print
    function print () {

        $(".sub_header").css('margin-top','60px');
        $(".intro_inner").css('margin-top','60px');
        $(".intro_wrap h4").css('margin-top','95px');
        $(".footer").hide();
        $("#header").hide();
        $("body").css("width","1000px");
        // html 2 canvas
        html2canvas($("body")[0] ,{
            useCORS: true,
            allowTaint: false,
            ignoreElements: function (node) {
                return node.nodeName === 'IFRAME';
            }
        }).then(function(canvas) {
            $('body').html('<img src="' + canvas.toDataURL("image/jpeg") + '" style=" object-fit: cover;"/>');
            window.onbeforeprint = function(){
                document.body.innerHTML = $("body").html();
            }
            window.onafterprint = function(){
                location.reload();
            }
            setTimeout(function() {
                window.print();
                window.close();
            },100)
        });
    }
    function tmapNavi(name, lon, lat) {
        var temp = encodeURIComponent(name);
        var url = tmapRoutesUrl.format(tmapProjectKey, temp, lon, lat);
        window.location.href = url;
    }
    function kakaoNavi(name, lon, lat) {
        window.location.href = 'kakao://map.kakao.com/link/to/'+name+','+lat+','+lon
        // Kakao.Navi.start({
        //     name: name,
        //     x: Number(lon),
        //     y: Number(lat),
        //     coordType: 'wgs84',
        // })
    }
    function naverNavi(param) {
        if(checkMobile() === 'android'){
            openAndroidNaverMapApp(param);
        } else if(checkMobile() === 'ios'){
            openNaverMapApp(param);
        } else {
            openNaverMapApp(param);
        }
        // openNaverMapApp(param);
    }
    function getNaviUrl(param) {
        var start = '';
        var v1 = '';
        var end = '';
        if(!!param.slat && !!param.slng && !!param.sname){
            start = 'slat=' + param.slat + '&slng=' + param.slng + '&sname=' + param.sname
        }
        if(!!param.v1lat && !!param.v1lng && !!param.v1name){
            v1 = 'v1lat=' + param.v1lat + '&v1lng=' + param.v1lng + '&v1name=' + param.v1name
        }
        if(!!param.dlat && !!param.dlng && !!param.dname){
            end = 'dlat=' + param.dlat + '&dlng=' + param.dlng + '&dname=' + param.dname
        }
        var parameter;
        if(!v1){
            parameter = start+'&'+end;
        } else if(!start){
            parameter = v1 + '&' +end;
        } else if(!v1 && start){
            parameter = end;
        } else {
            parameter = start + '&' +v1 + '&' +end;
        }
        if(!parameter){
            return '';
        }
        return encodeURI('navigation?'+parameter+'&appname=www.h2nbiz.or.kr')
    }
    function getNaviUrl2(param) {
        var start = '';
        var v1 = '';
        var end = '';
        if(!!param.slat && !!param.slng && !!param.sname){
            start = 'slat=' + param.slat + '&slng=' + param.slng + '&stitle=' + param.sname
        }
        if(!!param.dlat && !!param.dlng && !!param.dname){
            end = 'elat=' + param.dlat + '&elng=' + param.dlng + '&etitle=' + param.dname
        }
        var parameter;
        if(!v1){
            parameter = start+'&'+end;
        } else if(!start){
            parameter = v1 + '&' +end;
        } else if(!v1 && start){
            parameter = end;
        } else {
            parameter = start + '&' +v1 + '&' +end;
        }
        if(!parameter){
            return '';
        }
        return parameter
    }
    function openIOSNaverMapApp(param) {
        //var url = 'intent://'+ getNaviUrl2(param);
        var url = "http://app.map.naver.com/launchApp/?version=11&menu=navigation&" + getNaviUrl2(param);
        var clickedAt = +new Date();
        location.href = url;
        setTimeout(function() {
            if (+new Date() - clickedAt < 2000) {
                location.href = 'http://itunes.apple.com/app/id311867728?mt=8';
            }
        }, 1500);
    }
    function openAndroidNaverMapApp(param) {
        // location.href = 'intent://'+ getNaviUrl(param) +'#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end'
        location.href = 'nmap://' + getNaviUrl(param);
    }
    function openNaverMapApp(param) {
        location.href = "nnmap://app.map.naver.com/launchApp/?version=11&menu=navigation&" + getNaviUrl2(param);
    }


    /**
     *
     * @param option 1 = 지도버전, 2= 주
     * @param callback 콜백
     */
    function openFinderOfAddress(option,callback) {
        if(option === 1) {
            window.open("/cmm/getAddressSearchVw.do?option=1", "주소찾기", "toolbar=no, scrollbars=no, location=no, top=100px, left=100px, height=800px, width=1200px");
        } else if (option === 2) {
            window.open("/cmm/getAddressSearchVw.do?option=2", "주소찾기", "toolbar=no, scrollbars=no, location=no, top=100px, left=100px, height=720px, width=360px");
        }
        addrCallback = callback;
    }

    // 팝업
    var openUpTaePop = function (callback) {
        addrCallback = callback;
        window.open("/cmm/biz/openUpTaeVw.do", "업태찾기", "toolbar=no, scrollbars=no, location=no, top=100px, left=100px, height=630px, width=600px");
    }

    //본인인증 팝업
    var openSelfCertifPop = function (callback) {
        addrCallback = callback;
        window.open("/cmm/nice/certificationVw.do", "본인인증", "toolbar=no, scrollbars=no, location=no, top=100px, left=100px, height=630px, width=600px");
    }

    function selectedAddress(data) {
        console.log(data);
        if (typeof addrCallback === "function") {
            addrCallback(data);
        }
    }

    /**
     *
     * @param datas
     * @param callback 콜백
     */
    function openPoiMap(datas1,datas2,datas3,datas4,callback) {
        var url = "/cmm/poiMapVw.do"
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", url);
        form.setAttribute("target", "poiMap");
        var input1 = document.createElement('input');
        input1.type = 'hidden';
        input1.name = "poiList1";
        input1.value = JSON.stringify(datas1);
        form.appendChild(input1);
        var input2 = document.createElement('input');
        input2.type = 'hidden';
        input2.name = "poiList2";
        if(!!datas2){
            input2.value = JSON.stringify(datas2);
        } else {
            input2.value = '[]';
        }
        form.appendChild(input2);
        var input3 = document.createElement('input');
        input3.type = 'hidden';
        input3.name = "poiList3";
        if(!!datas3){
            input3.value = JSON.stringify(datas3);
        } else {
            input3.value = '[]';
        }
        form.appendChild(input3);
        var input4 = document.createElement('input');
        input4.type = 'hidden';
        input4.name = "poiList4";
        if(!!datas4){
            input4.value = JSON.stringify(datas4);
        } else {
            input4.value = '[]';
        }
        form.appendChild(input4);
        document.body.appendChild(form);
        /*if( /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) ){
            window.open(url, "poiMap");
        }else{
            window.open(url, "poiMap", "resizable=yes,toolbar=yes,menubar=yes,location=yes");
        }*/
        //window.open(url, "poiMap", "resizable=yes,toolbar=yes,menubar=yes,location=yes");
        window.open(url, "poiMap", "toolbar=no, scrollbars=no, location=no, top=100px, left=100px, height=700PX, width=1000PX");
        form.submit();
        document.body.removeChild(form);
        mappoiCallback = callback;
    }

    function selectedMapPoi(feature) {
        if (typeof mappoiCallback === "function") {
            mappoiCallback(feature);
        }
    }

    function openPrdfctryMap(param, callback, datas2Param) {
        cfunc.common.jsonGet({url:"/rt/colct/prd/getRcoPrdfctryM.do", data : param}).then(function (prdFctrys){
            _.each(prdFctrys.listFctry, function (prdFctry) {
                prdFctry.id = prdFctry.prdctnfctrymno;
                prdFctry.name = prdFctry.prdctnfctrynm;
            })
            var datas2 = [
                {id : '1', name: 'name1', geom: 'POINT(127.05743404850367 37.32233870485544)'},
                {id : '2', name: 'name2', geom: 'POINT(127.28540025651456 37.38150679839404)'}
            ];
            if(!!datas2Param){
              datas2 = datas2Param;
            }
            openPoiMap(prdFctrys.listFctry, datas2, callback);
        });
    }

    function getCenterPoint(jqObject) {
        var $div = jqObject;
        var width = $div.width();
        var height = $div.height();
        var w = width/2-14;
        var h = height/2-17;
        $div.append('<img src="/resource/pub_m/images/s06_ico03.png" style="position: absolute; top:'+h+'px; left: '+w+'px;">');
    }

    function ttPressrCalcu(value) {
        var pressrConfig = {
            ttPressrMin: 60,
            ttPressrMax: 200,
            ttPressrBaseUnit: 0.1,
            carFullCharge: undefined,
            ttPressrCntUnit: 20,
            nexoFullchargeKg : 5,
            kgToBarUnit : 1.7
        }
        pressrConfig.carFullCharge = pressrConfig.nexoFullchargeKg / pressrConfig.kgToBarUnit;
        var ttPressr = Math.floor(Number(value) * pressrConfig.ttPressrBaseUnit);
        var ttPressrFullValue = pressrConfig.ttPressrMax - pressrConfig.ttPressrMin;
        var ttPressrPencent = ((ttPressr - pressrConfig.ttPressrMin) * 100) / ttPressrFullValue;
        var ttPressrUnit = Math.floor(ttPressrPencent / pressrConfig.ttPressrCntUnit) + 1
        var chargeCarCnt = Math.round((ttPressr - pressrConfig.ttPressrMin) / pressrConfig.carFullCharge) + 1;
        var isCarFullChrge = false;
        if(ttPressr >= pressrConfig.carFullCharge){
            isCarFullChrge = true;
        }
        if(ttPressrUnit <= 0){
            ttPressrUnit = 1;
        }
        if(ttPressrUnit > 5){
            ttPressrUnit = 5;
        }
        if(chargeCarCnt < 0) {
            chargeCarCnt = 1;
        }
        return {
            ttPressr : ttPressr,
            ttPressrFullValue : ttPressrFullValue,
            ttPressrPencent : ttPressrPencent,
            ttPressrUnit : ttPressrUnit,
            chargeCarCnt : chargeCarCnt,
            isCarFullChrge : isCarFullChrge,
        }
    }

    //----------------------------------------------------------------------------
//문자열(str)에서 특수문자 제거.
//----------------------------------------------------------------------------
    function regExp(str) {
        // 특수문자 검증 start
        var regExpStr = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
        if (regExpStr.test(str)) {
            // 특수문자 제거
            str = str.replace(regExpStr, "")
        }
        return str;
    }


    /**
     * 정규식 반환
     * param  : gubun id
     * return  : regExp - 정규식
     */
    var getRegExp = function (gubun) {
        var regExp;

        //ip형식
        if (gubun == "ip") {
            regExp = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;
        }
        //공백여부
        else if (gubun == "empty") {
            regExp = /\s/g;
        }
        //숫자만
        else if (gubun == "num") {
            regExp = /^[0-9]+$/;
        }
        //이메일 체크 정규식
        else if (gubun == "email") {
            regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        }
        //핸드폰번호 정규식
        else if (gubun == "mbtl") {
            regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
        }
        //일반 전화번호 정규식
        else if (gubun == "tel") {
            regExp = /^\d{2,3}-?\d{3,4}-?\d{4}$/;
        }
        //특수문자(공백포함) 정규식
        else if (gubun == "notText") {
            regExp = /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/;
        }
        //아이디 정규식 (4~20자리, 영문/숫자 조합, 특수문자 -_만 허용, 첫글자 영문)
        else if (gubun == "id") {
            regExp = /^[a-z]+[a-z0-9_-]{3,19}$/g;
        }
        //비밀번호 정규식 (9~20자리, 영문/숫자/특수문자 필수 포함)
        else if (gubun == "password") {
            regExp = /^.*(?=^.{9,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=*]).*$/;
            //특수문자 불가능
        } else if (gubun == "notSc") {
            regExp = /[\{\}\[\]\/?;:|\)*~`^\-_+<>@\#$%&\\\=\(\'\"]/gi
            //생년월일 체크 정규식
        } else if (gubun == "birthday") {
            regExp = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
            //YYYY-MM-DD 날짜 형식(하이픈 포함)
        } else if (gubun == "hyphenYYYYMMDD") {
            regExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
        }

        return regExp;
    }

    /**
     * 파일명에서 확장자명 추출
     * @param filename   파일명
     * @returns _fileExt 확장자명
     */
    function getExtensionOfFilename(filename) {
        var _fileLen = filename.length;
        var _result;
        var _lastDot = filename.lastIndexOf('.');

        // 확장자 명만 추출한 후 소문자로 변경
        var _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();
        var _arrExt = new Array(".hwp", ".xls", ".xlsx", ".ppt", ".pptx", ".doc", ".docx", ".pdf", ".jpg", ".png", ".zip", ".jpeg");

        // 배열 요소를 검사하여 체크
        for(var i=0; i<_arrExt.length; i++) {
            if(_arrExt[i] == _fileExt) {
                _result = true;
                break;
            } else {
                _result = false;
            }
        }

        return _result;
    }

    /**
     * 전화번호 하이픈(-) 자동입력
     * @param str
     * @returns
     */
    function autoHypenPhone(str){
        var smartCall = str.substr(0,4);
        str += '';
        str = str.replace(/[^0-9]/g, '');
        var tmp = '';
        if( str.length < 4){
            return str;
        }else if(str.length < 7){
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3);
            return tmp;
        }else if(str.length < 11){
            if(str.indexOf('02') == 0){
                tmp += str.substr(0, 2);
                tmp += '-';
                if(str.length == 10){
                    tmp += str.substr(2, 4);
                    tmp += '-';
                    tmp += str.substr(6);
                }else{
                    tmp += str.substr(2, 3);
                    tmp += '-';
                    tmp += str.substr(5);
                }
            }else{
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 3);
                tmp += '-';
                tmp += str.substr(6);
            }
            return tmp;
        } else if(smartCall == '0507'){ // 스마트콜 전용 생성(20221029)
            tmp += str.substr(0, 4);
            tmp += '-';
            tmp += str.substr(4, 4);
            tmp += '-';
            tmp += str.substr(8);
            return tmp;
        } else{
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 4);
            tmp += '-';
            tmp += str.substr(7);
            return tmp;
        }
        return str;
    };

    function selectBizItem(jurirno,entNm,bzmnMno) {
        if(typeof bizCallback === 'function') {
            bizCallback( {
                jurirno : jurirno ,
                entNm : entNm,
                bzmnMno: bzmnMno
            })
        }
    }

    function fnaddBizCall() {
        if(typeof bizAddCallback === 'function') {
           bizAddCallback();
        }
    }

    function openFinderOFBiz(selectCallback,addCallback) {
        bizCallback = selectCallback;
        bizAddCallback = addCallback
        window.open("/cmm/biz/searchCompanyVw.do",'','width=700, height=730');
    }

    function getCmaFileName(obj,stype) {
        var fileObj, pathHeader , pathMiddle, pathEnd, allFilename, fileName, extName;
        if(obj == "[object HTMLInputElement]") {
            fileObj = obj.value;
        }

        var getExtname = cfunc.common.getExtensionOfFilename(fileObj);
        if(getExtname == false){
            cfunc.alert.error("경고", "지정하신 파일의 확장자를 변경 또는 다른 파일을 올려주십시오.", function () {
                $("#orginlFileNm").val(""); // 첨부파일 입력창 초기화
                $("#uploadFile").val(""); // 파일업로드 초기화
                return false;
            });
        }

        if (fileObj != "") {
            pathHeader = fileObj.lastIndexOf("\\");
            pathMiddle = fileObj.lastIndexOf(".");
            pathEnd = fileObj.length;
            fileName = fileObj.substring(pathHeader+1, pathMiddle);
            extName = fileObj.substring(pathMiddle+1, pathEnd);
            allFilename = fileName+"."+extName;

            if(stype == "all") {
                return allFilename; // 확장자 포함 파일명
            } else if(stype == "name") {
                return fileName; // 순수 파일명만(확장자 제외)
            } else if(stype == "ext") {
                return extName; // 확장자
            } else {
                return fileName; // 순수 파일명만(확장자 제외)
            }
        }
    }



    return {
        camelCase: camelCase,
        formatDate: formatDate,

        left: left,
        right: right,

        isNumber: isNumber,

        doAjax: doAjax,

        jsonPost: jsonPost,
        jsonGet: jsonGet,

        timestamp: timestamp,

        isEmpty: isEmpty,
        prependZero: prependZero,

        queryStringToJson: queryStringToJson,

        replaceAll: replaceAll,

        comma: comma,
        removeCommas: removeCommas,
        getContextPath: getContextPath,

        objectifyForm: objectifyForm,

        loadCoords: loadCoords,
        getCoord: getCoord,

        isMobile : isMobile,
        checkMobile : checkMobile,
        copyToClipboard : copyToClipboard,

        getCurrentWeek : getCurrentWeek,
        getTodayIsHoliDay : getTodayIsHoliDay,
        currentTimeCompere : currentTimeCompere,
        isCurCloseTime : isCurCloseTime,

        getBrtcList : getBrtcList,
        getSggList : getSggList,
        urlCopyToClipboard : urlCopyToClipboard,
        print : print,
        naverNavi : naverNavi,
        tmapNavi : tmapNavi,
        kakaoNavi : kakaoNavi,
        getNaviUrl : getNaviUrl,
        openFinderOfAddress :  openFinderOfAddress,
        selectedAddress : selectedAddress,
        getRegExp : getRegExp,
        openPoiMap : openPoiMap,
        selectedMapPoi : selectedMapPoi,
        openPrdfctryMap : openPrdfctryMap,
        getCenterPoint : getCenterPoint,
        ttPressrCalcu : ttPressrCalcu,
        openUpTaePop : openUpTaePop,
        openSelfCertifPop : openSelfCertifPop,
		getSectorList : getSectorList,
        newFormatDate : newFormatDate,
        newFormatTimestamp : newFormatTimestamp,
        emptythenMinus : emptythenMinus,
        removeHyphen : removeHyphen,
        regExp : regExp,
        autoHypenPhone : autoHypenPhone,
        getExtensionOfFilename:getExtensionOfFilename,
        selectBizItem:selectBizItem,
        openFinderOFBiz:openFinderOFBiz,
        fnaddBizCall : fnaddBizCall,
        getCmaFileName:getCmaFileName,
    };

})();

String.prototype.format = function() {
    var formatted = this, i = 0;
    while (/%s/.test(formatted))
        formatted = formatted.replace("%s", arguments[i++]);
    return formatted;
}

if(!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        if(this.length >= targetLength) {
            return String(this);
        } else {
            if(padString == null || padString == " ") {
                padString = " ";
            } else if(padString.length > 1) {
                padString = padString.substring(0,1);
            }
            targetLength = targetLength - this.length;
            var prefix = "";
            for(var i = 0; i < targetLength; i++) {
                prefix += padString;
            }
            return prefix + String(this);
        }
    };
}


function getChartExportMenu() {
    var exportMenu = new  am4core.ExportMenu();
    exportMenu.align = "right";
    exportMenu.verticalAlign = "top";
    exportMenu.items = [
        {
            "label": "...",
            "menu": [
                {
                    "label": "image",
                    "menu": [
                        { "type": "png", "label": "PNG" },
                        { "type": "jpg", "label": "JPG" },
                        // { "type": "gif", "label": "GIF" },
                    ]
                }/*, {
                    "label": "Print", "type": "print"
                }*/
            ]
        }
    ];
    return exportMenu;
}

function getExportingConfig(exportingConfig, exportFileName) {
    exportingConfig.useWebFonts = false;
    exportingConfig.useRetina = false;
    //var date = new Date();
    //var month = date.getMonth().toString().length == 1 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    //exportingConfig.filePrefix = exportFileName + date.getFullYear().toString() + month + date.getDate().toString();
    exportingConfig.menu = getChartExportMenu();
    exportingConfig.timeoutDelay = 20000;
    return exportingConfig;
}