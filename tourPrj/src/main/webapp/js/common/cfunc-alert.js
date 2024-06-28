/**
 * common function alert
 * 얼럿창 호출 모듈
 *
 *
 */

window.cfunc = window.cfunc || {};

cfunc.alert = (function () {

    /**
     *
     * @param msg1 : 타이틀
     * @param msg2 : 서브
     * @param callback : 콜백
     */
    var alert = function (msg1,msg2,callback) {
        if(!msg2) msg2 = "";
        swal({
                title: msg1,
                text: msg2,
                confirmButtonColor: '#269c83',
                confirmButtonText: "확인"
            },
            function(isConfirm){
                if (callback && typeof callback === "function") {
                    callback(isConfirm);
                }
            });
    }

    /**
     * 정보 알람
     * @param msg1 : 타이틀
     * @param msg2 : 서브
     * @param callback : 콜백
     */
    var info = function (msg1, msg2, callback) {
        if (!msg2) {
            msg2 = "";
        }
        var btnOption = callbackCheck(callback);
        swal({
                title: msg1,
                text: msg2,
                type: "info",
                confirmButtonColor: '#269c83',
                confirmButtonText: "확인",
                cancelButtonText: "취소",
                showCancelButton: btnOption.showCancelButton,
                closeOnConfirm: btnOption.closeOnConfirm,
            },
            function(isConfirm){
                if(callback && typeof callback ==="function") {
                    callback(isConfirm);
                }
            });
    }


    /**
     *  성공 알람
     * @param msg1 : 타이틀
     * @param msg2 : 서브
     * @param callback : 콜백
     */
    var success = function (msg1 ,msg2 ,callback) {
        if(!msg2) msg2 = "";
        swal({
                title: msg1,
                text: msg2,
                type: "success",
                confirmButtonColor: '#269c83',
                confirmButtonText: "확인",
                animation: false
            },
            function(isConfirm){
                if(callback && typeof callback ==="function") {
                    callback(isConfirm);
                }
            });

    }

    /**
     * 경고 알람
     * @param msg1 : 타이틀
     * @param msg2 : 서브
     * @param callback  파라미터로  ture false 반환
     */
    var warn = function (msg1, msg2, callback) {
        if(!msg2) msg2 = "";
        var btnOption = callbackCheck(callback);
        swal({
                title: msg1,
                text: msg2,
                type: "warning",
                confirmButtonColor: '#269c83',
                confirmButtonText: "예",
                cancelButtonText: "아니요",
                showCancelButton: btnOption.showCancelButton
                // ,closeOnConfirm: btnOption.closeOnConfirm
            },
            function(isConfirm){
                if(callback && typeof callback ==="function") {
                    callback(isConfirm);
                }
            });
    }
    /**
     * 경고 알람
     * @param msg1 : 타이틀
     * @param msg2 : 서브
     * @param callback  파라미터로  ture false 반환
     */
    var error = function (msg1, msg2, callback) {
        if(!msg2) msg2 = "";
        var btnOption = callbackCheck(callback);
        swal({
                title: msg1,
                text: msg2,
                type: "error",
                confirmButtonColor: '#eb7657',
                confirmButtonText: "확인",
            },
            function(isConfirm){
                if(callback && typeof callback ==="function") {
                    callback(isConfirm);
                }
            });

        $(".sa-confirm-button-container button.confirm").css("background-color", "#eb7657 !importent");
    }

    /**
     * input 입력 창 이 있는 알람
     * @param msg1 : 타이틀 텍스트
     * @param msg2 : 서브 텍스트
     * @param callback : 콜백 : input에 입력한 값 반환
     */

    var prompt = function (msg1, msg2, callback) {
        if(!msg2) msg2 = "";
        var btnOption = callbackCheck(callback);
        swal({
                title: msg1,
                text: msg2,
                type: "input",
                inputType: "password",
                confirmButtonText: "확인",
                cancelButtonText: "취소",
                confirmButtonColor: '#269c83',
                showCancelButton: btnOption.showCancelButton,
                closeOnConfirm: btnOption.closeOnConfirm,
                inputPlaceholder: "입력하세요."
            },
            function(inputValue){
                if(callback && typeof callback ==="function") {
                    callback(inputValue);
                }
            });
    }

    var promptInputText = function (msg1, msg2, callback, placeHolder) {
        if (!msg2) msg2 = "";
        var btnOption = callbackCheck(callback);
        swal({
                title: msg1,
                text: msg2,
                type: "input",
                inputType: "text",
                confirmButtonText: "확인",
                cancelButtonText: "취소",
                confirmButtonColor: '#269c83',
                showCancelButton: btnOption.showCancelButton,
                closeOnConfirm: btnOption.closeOnConfirm,
                inputPlaceholder: placeHolder || "입력하세요."
            },
            function(inputValue){
                if(callback && typeof callback ==="function") {
                    callback(inputValue);
                }
            });
    }

    /**
     * 비동기 알람
     * @param msg1
     * @param msg2
     * @param callback 콜백 함수 내에서 비동기 작업 이 이뤄져야함
     */
    var alertAsync = function (msg1, msg2, callback) {
        if(!msg2) msg2 = "";
        var btnOption = callbackCheck(callback);
        swal({
                title: msg1,
                text: msg2,
                type: "info",
                confirmButtonText: "확인",
                cancelButtonText: "취소",
                confirmButtonColor: '#269c83',
                showCancelButton: btnOption.showCancelButton,
                closeOnConfirm: btnOption.closeOnConfirm,
                showLoaderOnConfirm: true,
            },
            function(){
                if(callback && typeof callback ==="function") {
                    callback();
                }
            });
    }

    var callbackCheck = function (c) {
        var option = {};
        if(!c || typeof c !== 'function') {
            option.showCancelButton = false;
            option.closeOnConfirm = true;
        } else {
            option.showCancelButton = true;
            option.closeOnConfirm = false;
        }
        return option;
    };


    var module = {
        alert : alert
        ,success : success
        ,info : info
        ,warn : warn
        ,error : error
        ,prompt : prompt
        ,promptInputText : promptInputText
        ,alertAsync : alertAsync
    }

    return module;

})();