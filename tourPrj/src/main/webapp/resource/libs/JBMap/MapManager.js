var MapManager = function(options) {

    if(!options) options = {};
    var jbMap = null;
    var mapDiv = typeof options.mapDiv === "undefined" ? "map" : options.mapDiv;
    var bgMapDiv = typeof options.bgMapDiv === "undefined" ? "bgmap" : options.bgMapDiv;
    var mapType = !options.mapType ? MapManager.CODE.MAP_TYPE.VWORLD : options.mapType;
    var center = typeof options.center === "undefined" ? [126.7528832672847, 36.23307548960749] : options.center;
    /*var zoom = getOlZoom(typeof options.zoom === "undefined" ? 7 : options.zoom);*/
    var zoom = typeof options.zoom === "undefined" ? 7 : options.zoom;
    var minZoom = typeof options.minZoom === "undefined" ? 7 : options.minZoom;
    var maxZoom = typeof options.maxZoom === "undefined" ? 19 : options.maxZoom;
    var apiKey = typeof options.apiKey === "undefined" ? null : options.apiKey;
    var resolutions = null;
    var projection = null;
    var maxExtent = null;
    var bgMap = null;

    function getBaseLayer() {
        var baseLayers = {};
        //124.29218990790724, 32.8125437173443, 131.86176998603767, 38.58884945563426
        //124.29218990790724, 36.044148888141484, 127.6998832672847, 38.58884945563426
        // 왼 아래 오른 위
        maxExtent = [124.29218990790724, 33.044148888141484, 130.9998832672847, 38.58884945563426];

        if(mapType === MapManager.CODE.MAP_TYPE.VWORLD) {
            projection = "EPSG:3857";
            baseLayers[MapManager.CODE.CHANGE_TYPE.BASE] = {
                layer : [
                    new ol.layer.Tile({
                        name : 'BASE',
                        source : new ol.custom.source.Vworld({
                            key : apiKey,
                            type : "BASE"
                        })
                    })
                ]
            };

            baseLayers[MapManager.CODE.CHANGE_TYPE.SATELLITE] = {
                layer : [
                    new ol.layer.Tile({
                        name : 'SATELLITE',
                        source : new ol.custom.source.Vworld({
                            key : apiKey,
                            type : "SATELLITE"
                        })
                    }),
                    new ol.layer.Tile({
                        name : 'HYBRID',
                        source : new ol.custom.source.Vworld({
                            key : apiKey,
                            type : "HYBRID"
                        })
                    })
                ]
            }
        }else if(mapType === MapManager.CODE.MAP_TYPE.EMAP) {
            projection = "EPSG:5179";
            //resolutions = ol.custom.source.NGII.INFO.resolution;

            baseLayers[MapManager.CODE.CHANGE_TYPE.BASE] = {
                layer : [
                    new ol.layer.Tile({
                        name : 'BASE',
                        source : new ol.custom.source.NGII.BASE({
                            url : "http://mapapi.ngii.go.kr:8013",
                            key : apiKey,
                            type : ol.custom.source.NGII.BASE.code.layers_id.KOREAN
                        })
                    })
                ]
            };
        }else if(mapType === MapManager.CODE.MAP_TYPE.NAVER) {
            projection = "EPSG:3857";
            //minZoom = 1;
            //maxZoom = 14;
            //resolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
            //maxExtent = [124.29218990790724, 32.8125437173443, 131.86176998603767, 38.58884945563426];

            bgMap = new naver.maps.Map(bgMapDiv, {
                center: new naver.maps.LatLng(center[1], center[0]),
                zoom: zoom,
                scaleControl: false,
                logoControl: false,
                mapDataControl: false,
                zoomControl: false,
                mapTypeControl: false
            });
        }else if(mapType === MapManager.CODE.MAP_TYPE.KAKAO) {
            projection = new ol.proj.Projection({
                code: "EPSG:5181",
                extent: [-30000,-60000, 1018576, 988576],
                units: 'm'
            });
            //minZoom = 1;
            //maxZoom = 14;
            resolutions = [131072, 65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5];
            //maxExtent = [124.29218990790724, 32.8125437173443, 131.86176998603767, 38.58884945563426];

            var bgDiv = bgMapDiv;

            if(typeof bgDiv === "string") {
                bgDiv = document.getElementById(bgDiv);
            }

            bgMap = new kakao.maps.Map(bgDiv, {
                center: new kakao.maps.LatLng(center[1], center[0]),
                level: getBgZoom(zoom)
            });

            bgMap.setCopyrightPosition(kakao.maps.CopyrightPosition.BOTTOMRIGHT, true);
        }

        return baseLayers;
    }

    /*function getOlZoom(zm) {
        var output = zm;

        if(mapType === MapManager.CODE.MAP_TYPE.KAKAO) {
            output = zm - 5;
        }

        return output;
    }*/

    function getBgZoom(zm) {
        var output = zm;

        if(mapType === MapManager.CODE.MAP_TYPE.KAKAO) {
            output = 20 - zm;
        }

        return output;
    }


    function init() {
        var baseLayers = getBaseLayer();

        jbMap = new JBMap({
            mapDiv : mapDiv,
            minZoom : minZoom,
            maxZoom : maxZoom,
            zoom : zoom,
            isScaleLine : true,
            isGeoDesic : true,
            isHideZoomControl : true,
            center : center,
            resolutions : resolutions,
            showBaseLayer : MapManager.CODE.CHANGE_TYPE.BASE,
            baseLayers : baseLayers,
            projection : projection,
            extent : maxExtent,
            displayProjection : "EPSG:4326"
        });

        new ResizeSensor($("#" + mapDiv), function(size) {
            //console.log("update Size");
            if(jbMap != null) {
                jbMap.resize();
                var ctr = jbMap.getCenter();
                if(mapType === MapManager.CODE.MAP_TYPE.NAVER) {
                    bgMap.setCenter(new naver.maps.LatLng(ctr[1], ctr[0]));
                }else if(mapType === MapManager.CODE.MAP_TYPE.KAKAO) {
                    bgMap.setCenter(new kakao.maps.LatLng(ctr[1], ctr[0]));
                }
            }
        });

        if(mapType === MapManager.CODE.MAP_TYPE.NAVER) {
            jbMap.setEvent(JBMap.CODE.EVENT.MOVE, "bgMapMove", function(ctr) {
                bgMap.setCenter(new naver.maps.LatLng(ctr[1], ctr[0]));
            });

            jbMap.setEvent(JBMap.CODE.EVENT.ZOOM_END, "bgMapZoomEnd", function(zm) {
                bgMap.setZoom(getBgZoom(zm));
            });
        }else if(mapType === MapManager.CODE.MAP_TYPE.KAKAO) {
            jbMap.setEvent(JBMap.CODE.EVENT.MOVE, "bgMapMove", function(ctr) {
                bgMap.setCenter(new kakao.maps.LatLng(ctr[1], ctr[0]));
            });

            jbMap.setEvent(JBMap.CODE.EVENT.ZOOM_END, "bgMapZoomEnd", function(zm) {
                bgMap.setLevel(getBgZoom(zm));
            });
        }
    }

    function changeBaseLayer(type) {
        if(mapType === MapManager.CODE.MAP_TYPE.VWORLD || mapType === MapManager.CODE.MAP_TYPE.EMAP) {
            map.changeBaseLayer(type);
        }else if(mapType === MapManager.CODE.MAP_TYPE.NAVER) {
            if(type === MapManager.CODE.CHANGE_TYPE.BASE) {
                bgMap.setMapTypeId(naver.maps.MapTypeId.NORMAL);
            }else{
                bgMap.setMapTypeId(naver.maps.MapTypeId.HYBRID);
            }
        }else if(mapType === MapManager.CODE.MAP_TYPE.KAKAO) {
            if(type === MapManager.CODE.CHANGE_TYPE.BASE) {
                bgMap.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
            }else{
                bgMap.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
            }
        }
    }

    init();

    return {
        getJBMap : function() {
            return jbMap;
        },

        getMapProjection : function() {
            return projection;
        },

        getOLMap : function() {
            return jbMap.getMap();
        },

        getBackgroundMap : function() {
            return bgMap;
        },

        /*setZoom : function(zm) {
          map.setZoom(getOlZoom(zm));
        },*/

        changeBaseLayer : function(type) {
            changeBaseLayer(type);
        }
    };
}

MapManager.CODE = {
    MAP_TYPE : {
        EMAP : "emap",
        VWORLD : "vworld",
        NAVER : "naver",
        KAKAO : "kakao"
    },
    CHANGE_TYPE : {
        BASE : "BASE",
        SATELLITE : "SAT"
    }
}