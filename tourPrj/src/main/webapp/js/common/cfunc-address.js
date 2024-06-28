window.cfunc = window.cfunc || {};

cfunc.address = (function() {

    /**
     * 주소로부터 포인트 가져오기
     * @param address{string}
     * @returns info
     */
    // var getPointFromAddress = function (address) {
    //     var deferred = $.Deferred();
    //
    //     $.ajax({
    //         url: 'https://dapi.kakao.com/v2/local/search/address.json',
    //         headers: {
    //             'Authorization': window.app.kakaoRestApiKey
    //         },
    //         type: 'GET',
    //         data: {
    //             query: address
    //             ,x: '128.741819691839'
    //             ,y: '35.825303450468'
    //             ,radius: "20000" // 경산시청 중심으로
    //         }
    //     }).done(function (data) {
    //         deferred.resolve(data);
    //     });
    //
    //
    //     return deferred;
    // }
    //F

    /**
     * 포인트로부터 주소 가져오기
     * @param point{{x: (string|number|*), y: (string|number|*)}}
     * @returns address
     */
    var getAddressFromPoint = function (point) {
        var deferred = $.Deferred();
        cfunc.common.jsonGet({url: "/api/getAddressFromPoint.do", data : {x : point.x,y : point.y}}).then(function (res){
            deferred.resolve(res);
        });

        return deferred;
    }


    var getPointFromAddress = function (addr) {
        var deferred = $.Deferred();
        // cfunc.common.jsonGet({url: "/api/getPointFromAddress.do", data : {addr:addr}}).then(function (res){
        cfunc.common.jsonGet({url: cfunc.common.getContextPath()+"/api/getPointFromAddressKakao.do", data : {query:addr,page:1,size:30}}).then(function (res){
            deferred.resolve(res);
        });

        return deferred
    }

    var module = {
        getPointFromAddress : getPointFromAddress,
        getAddressFromPoint : getAddressFromPoint,
    }
    return module;
})();
