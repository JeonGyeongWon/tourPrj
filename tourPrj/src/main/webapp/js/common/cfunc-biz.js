window.cfunc = window.cfunc || {};

cfunc.biz = (function() {

    var ids = {

    }


    var ajax = {
        //업태목록 가져오기
         getAjaxUpTaeList : function () {
            var deferred = $.Deferred();
            cfunc.common.jsonGet({url:'/cmm/biz/getUpTaeList.do'})
                .then(function (res) {
                    
                    //데이터 정렬
                    var sorted = sortData(res);
                    // html 생성
                    var html = createHtml(sorted);
                    
                    // tree만들기
                    $("#jstree").html(html);
                    $('#jstree').jstree({
                        "plugins": ["search"],
                        "search": {
                            "case_sensitive": false,
                            "show_only_matches": true
                        }
                    });

                    // 검색
                    $("#searchTree").keyup(function () {
                        var searchString = $(this).val();
                        $('#jstree').jstree('search', searchString);
                    });

                    $('#jstree').on("changed.jstree", function (e, data) {
                        var ksiccd = data.node.li_attr.ksiccd;
                        if(!!ksiccd) {
                            selectedTree = {"ksiccd" : ksiccd, text: data.node.text};
                        } else {
                            selectedTree = null;
                        }
                    });

                });
        },
    }

    // html 생성
    var createHtml =function (data) {
        console.log(data);
        var html = '<ul>';
        _.map(data,function (depth1,key1) {
            html += '<li>';
            html += key1;
            html += '<ul>';
                _.each(depth1,function (depth2,key2) {
                    html += '<li>';
                    html += key2;
                    html += '<ul>';
                    _.each(depth2,function (depth3,key3) {
                        html += '<li ksicCd="'+depth3.ksicCd+'">'
                        html += depth3.ddtlclfcNm;
                        html += '</li>'
                    });
                    html += '</ul>';
                    html += '</li>';
                })

            html += '</ul>';
            html += '</li>';
        })

        html += '</ul>';

        return html;
    }


    var choiceItem = function () {
      window.opener.cfunc.common.selectedAddress(selectedTree);
      window.close();
    }


    // 데이터 정렬
    var sortData = function (data) {
        var ordered = {};
        Object.keys(data).sort().forEach(function(key) {
            ordered[key] = data[key];
        });
        return ordered;
    }


    return {
        choiceItem : choiceItem,
        ajax : ajax
    };
})();


