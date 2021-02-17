/**
 * 这里开始写业务逻辑代码
 */
var app = {
    mapData: null,
    init: function () {
        var that = this;
        // 这里开始写业务逻辑代码

        // 向平台订阅的变量
        this.subscribe(['x1']);
        // 向平台提供变量
        this.publish(['v1']);

        this.on('eventChange', ['x1'], function (data) {
            // 获取平台变量联动的数据
            console.log('我是变量联动的数据', data);
        });
        if(!this.mapData){
            this.initMap();
        }
    },

    initMap: function (data) {
        var that = this;
        var cityName = "chongqing";
        var myChart = echarts.init(document.getElementById('main'));
        // JSON文件(地图数据)路径
        var uploadedDataURL = "<%ctxPath%>/myResource/SHNMOGloMWdlTjQ9/import/foshan.json";
        // 引入JSON文件
        $.getJSON(uploadedDataURL, function (geoJson) {
            var mapData = [];
            var valueData = data || {};
            for (var i = 0; i < geoJson.features.length; i++) {
                var id = geoJson.features[i].id;
                var areaName = geoJson.features[i].properties.name
                mapData.push({
                    id: id,
                    name: areaName,
                    value: valueData[id] || 0
                });
            }

            // 注册地图名字(xinjiang)和数据(geoJson)
            echarts.registerMap(cityName, geoJson);
            // 图表配置项
            var option = {
                "legend": {
                    // "formatter": "",
                    "itemHeight": 14,
                    // "show": false,
                    "icon": "circle",
                    "itemWidth": 25,
                    "textStyle": {
                        "color": "#9ca1a4"
                    }
                },

                "series": [{
                    "selectedMode": "single",
                    "layoutSize": "100%",
                    "left": '2%',
                    "top": '1%',
                    "right": '2%',
                    "bottom": '1%',
                    "name": "人口分布",
                    "emphasis": {
                        "itemStyle": {
                            "areaColor": "#aaaaaa",
                            "borderColor": "#0a0b1a",
                            "shadowBlur": 0,
                            "borderWidth": 1,
                            "shadowColor": "#0a0b1a"
                        },
                        "label": {
                            "color": "#e37703",
                            "show": true
                        }
                    },
                    "itemStyle": {
                        "normal": {
                            "opacity": 1,
                            "borderType": "solid",
                            "areaColor": "rgba(39, 60, 131, 0.8)",
                            "borderWidth": 1,
                            "borderColor": "#0a0b1a",
                            "shadowBlur": 0,
                            "shadowColor": "#0a0b1a",
                        }
                    },
                    "label": {
                        "color": "#ffffff",
                        "show": true,
                        "fontSize": 14,
                        "normal": {
                            "show": true
                        }
                    },
                    "type": "map",
                    "map": cityName,
                    "data": mapData,
                    "zoom": 1, //当前视角的缩放比例
                    "roam": true, //是否开启平游或缩放
                    "scaleLimit": { //滚轮缩放的极限控制
                        "min": 1,
                        "max": 8
                    },
                    "showLegendSymbol": true,
                    "layoutCenter": {
                        "x": "50%",
                        "y": "50%"
                    }
                }],
                "tooltip": {
                    "formatter": function (params, ticket, callback) {
                        var showHtm = params.seriesName + '<br/>' + params.data.name + ":" + params.value * 100 + "%";
                        return showHtm;
                    },
                    "backgroundColor": "rgba(14,16,17,0.8)",
                    "show": true,
                    "textStyle": {
                        "color": "#b9d5e5"
                    }
                },
                "global": {
                    "mainColor": {
                        "color1": "#e08d32"
                    },
                    "textStyle": {
                        "fontFamily": "Microsoft Yahei",
                        "fontSize": 12,
                        "fontWeight": "normal"
                    }
                },
                "visualMap": {
                    "orient": "vertical",
                    "type": "piecewise",
                    // "color": ["#ee2222", "#f75151", "#f29e15", "#f7c064", "#f4b578", "#aaaaaa"],
                    "calculable": true,
                    "left": "left",
                    "top": 14,
                    "text1": "",
                    "itemHeight": 20,
                    "text2": "",
                    "itemWidth": 20,
                    "min": 0,
                    "max": 100000,
                    // "x": 'left',
                    // "y": 'bottom',
                    "color": ["#ee2222", "#f75151", "#f29e15", "#f7c064", "#f4b578", "#aaaaaa"],
                    "splitList": [{
                        start: 10001,
                        label: ">10000",
                    },
                        {
                            start: 5000,
                            end: 10000,
                            label: "10000-5000",
                        },
                        {
                            start: 1000,
                            end: 4999,
                            label: "4999-1000",
                        },
                        {
                            start: 100,
                            end: 999,
                            label: "999-100",
                        },
                        {
                            start: 1,
                            end: 99,
                            label: "99-1",
                        },
                        {
                            start: 0,
                            end: 0,
                            label: "无",
                            color:"#aaa"
                        }
                    ],
                    "textStyle": {
                        "color": "#9ca1a4"
                    }
                }
            };

            myChart.setOption(option);

            myChart.on('click', function (obj) {
                myChart.setOption(option);
                that.openDialog(obj.data.id);
            });
        });
    },

    openDialog: function (id) {
        var dialogUrl = "http://106.75.232.26:7777/boss/release/100213?" + id;
        var dialogWith = "1160px";
        var dialogHeight = "980px";
        var body = window.parent.document.body;

        var dialogModal = document.createElement('div');
        dialogModal.setAttribute('id', 'dialogModal');
        dialogModal.setAttribute("style",
            'position:absolute;z-index:999;width:100%;height:100%;left: 50%;top: 50%;transform: translate(-50%,-50%); background: rgba(0,0,0,0.6);'
        );
        body.appendChild(dialogModal).innerHTML =
            `<div id="dialogDiv" style="position:absolute;width:${dialogWith};height:${dialogHeight};left: 50%;top: 50%;transform: translate(-50%,-50%); background: transparent;">
          <div style="position:absolute;right:20px;top:20px;cursor: pointer; width:24px;height:24px;line-height: 24px;text-align: center; color: rgb(255, 255, 255); font-size: 20px; font-weight: normal;" onclick="document.getElementById('dialogModal').remove();"></div>
          <iframe id="dialogIframe" src="${dialogUrl}" width="100%" height="${dialogHeight}"  frameborder="0"></iframe>
          </div>`;

    },

    // 平台提供的组件数据
    dataChange: function (data) {
        console.log('我是平台提供的组件数据', data);
        this.mapData = data;
        this.initMap(data);
    },

    // 以下为建立通信代码
    subscribe: function (list) {
        window.top.postMessage({
            actionType: 'connect',
            id: this.id,
            subscribers: list,
            publishers: []
        }, '*');
    },

    publish: function (list) {
        window.top.postMessage({
            actionType: 'connect',
            id: this.id,
            subscribers: [],
            publishers: list
        }, '*');
    },

    emit: function (o) {
        window.top.postMessage({
            actionType: 'update',
            id: this.id,
            publishers: o
        }, '*')
    },

    _initWork: function () {
        const that = this;
        window.addEventListener('message', function (e) {
            const data = e.data || {};
            const {
                actionType
            } = data;
            if (data.id) {
                that.id = data.id;
            }
            that.origin = e.origin;
            if (data.actionType === 'connect') {
                that.init();
            }
            if (data.actionType === 'dataChange') {
                that.dataChange(data.data);
            }
        }, false);
    },

    on: function (event, list, fn) {
        window.addEventListener('message', function (e) {
            const data = e.data || {};
            const {
                actionType
            } = data;
            // 平台组件联动
            if (event === 'eventChange' && data.actionType === 'eventChange') {
                var obj = data.data && JSON.parse(data.data);
                var opts = {};
                obj && list.forEach(function (name) {
                    opts[name] = obj[name]
                })
                fn && fn(opts)
            }
        }, false);
    }
};

app._initWork();