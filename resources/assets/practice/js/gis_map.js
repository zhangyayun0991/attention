
/**
 * 这里开始写业务逻辑代码
 */

var app = {
    init: function () {
        var that = this;
        // 这里开始写业务逻辑代码
        that.initGis();
        // 向平台订阅的变量
        this.subscribe(['x1']);
        // 向平台提供变量
        this.publish(['v1']);

        this.on('eventChange', ['x1'], function (data) {
            // 获取平台变量联动的数据
            console.log('我是变量联动的数据', data);
        });

        $(document).on('click', '#button', function () {
            var number = Math.floor(Math.random() * 100);
            // 往平台通信
            that.emit({ "v1": "我是来自组件的数据" + number });
        })
    },

    initGis: function () {
        var map;

        function init() {
            map = new FHMap.Map('map', {zoom: 7, selected: "baidu.map", template: "midnight"});
            var lonLat = new FHMap.LonLat(118.79056, 32.057);
            map.setCenter(lonLat);
            operation('addToolBar');

        }

        function operation(name) {
            switch (name) {
                //设置地图中心
                case 'bdmap':
                    map.destroy();
                    map = new FHMap.Map('map', {
                        center: new FHMap.LonLat(114.19, 23.31),
                        zoom: 11,
                        selected: "baidu.map"
                    });
                    break;
                //设置地图中心
                case 'bdsate':
                    map.destroy();
                    map = new FHMap.Map('map', {
                        center: new FHMap.LonLat(114.19, 23.31),
                        zoom: 11,
                        selected: "baidu.sate"
                    });
                    break;
                case 'bdsate_road':
                    map.destroy();
                    map = new FHMap.Map('map', {
                        center: new FHMap.LonLat(114.19, 23.31),
                        zoom: 11,
                        selected: "baidu.sate_road"
                    });
                    break;
                //设置地图中心
                case 'setCenter':
                    var lonLat = new FHMap.LonLat(118.68, 31.05);
                    map.setCenter(lonLat, 12);
                    break;
                //移动到坐标
                case 'moveTo':
                    var lonLat = new FHMap.LonLat(118.68, 31.05);
                    map.moveTo(lonLat);
                    break;
                //添加html标记
                case 'panTo':
                    var lonLat = new FHMap.LonLat(118.77, 32.00);
                    map.panTo(lonLat);
                    break;
                //添加图层
                case 'addLayer':
                    var layer = new FHMap.Layer("test");
                    map.addLayer(layer);
                    break;
                //清除工具栏
                case 'addToolBar':
                    var layer = new FHMap.Layer.Vector("test");
                    map.addLayer(layer);
                    //绑定工具栏到指定图层
                    toolBar = new FHMap.Control.Toolbar(layer,
                        ['Navigation', 'point', 'Line', 'Rectangle', 'Circle', 'Polygon', 'Select', 'Clear', 'MeasureLength', 'MeasureArea'],
                        {
                            finishDraw: function (msg) {
                                //alert(msg.geometry)
                            },
                            featureSelect: function (msg) {
                                //alert(msg.geometry)
                            }
                        }
                    );
                    var handler = toolBar.getCircleTool().handler;
                    handler.setMaxRadius(100000);
                    handler.callbacks.move = function (evt) {
                        var r = handler.getRadius();
                    }

                    var div = toolBar.getMeasurelengthTool().panel_div;
                    var checked = false;
                    div.onclick = function () {
                        if (checked) {
                            toolBar.getMeasurelengthTool().deactivate();
                        }
                        checked = !checked;
                    }

                    break;
                //添加自定义按钮
                case 'addMyBtn':
                    var btn = new FHMap.Control.Button({
                        //按钮class:
                        displayClass: 'myBtn',
                        trigger: function () {
                            alert('谁点我！');
                        }
                    });
                    if (toolBar) {
                        toolBar.addControl(btn);
                    }
                    break;
                //添加Popup
                case 'addPopup':
                    var html = [];
                    html.push("<div style='width:200px;padding: 20px; " +
                        "background-color: rgba(100, 100, 200, 0.1)'>");
                    html.push("<div class='oas-title'>地点：乌龙谭公园</div>");
                    html.push("<div class='oas-title'>经度：118.77247</div>");
                    html.push("<div class='oas-title'>纬度：32.0519</div>");
                    html.push("</div>");
                    var popup = new FHMap.Popup({
                        contentHTML: html.join(""),
                        lonlat: new FHMap.LonLat(118.77247, 32.0519),
                        autoSize: true,
                        closeBox: true
                    });
                    map.addPopup(popup);
                    break;
                //可视范围
                case 'getViewExtent':
                    alert(map.getViewExtent());
                    break;
                //可视范围内城市
                case 'getViewCity':
                    map.getViewCity(function (data) {
                        alert(JSON.stringify(data));
                    });
                    break;
                //可视范围内城市
                case 'showCityGeometry':
                    var layer = new FHMap.Layer.Vector('city');
                    map.addLayer(layer);
                    var colors = ['red', 'yellow'];
                    var citys = ['南京市建邺区', '南京市江宁区'];
                    for (var i = 0; i < 2; i++) {
                        var color = colors[i];
                        FHMap.Query.getCityBorder(citys[i], (function (color) {
                            return function (feature) {
                                feature.style = new FHMap.Style({
                                    fill: new FHMap.Style.Fill(color, 0.3)
                                });
                                layer.addFeatures(feature);
                            }
                        })(color));
                    }

                    break;
                case 'rightMenu':
                    var menus = [{ splitLine: true }, { name: '自定义' }, {
                        name: '自定义2', click: function () {
                            alert('做自己想做的事')
                        }
                    }];
                    var rightMenu = new FHMap.Control.RightMenu(menus);
                    map.addControl(rightMenu);
                    rightMenu.addMenu({ splitLine: true });
                    rightMenu.addMenu({
                        name: '移动到...',
                        sub: [{ name: '本地磁盘(C:)' }, { name: '本地磁盘(D:)' }, { name: '本地磁盘(E:)' }]
                    });
                    rightMenu.addMenus([{ splitLine: true }, { name: '自定义3' }, { name: '自定义4' }]);
                    break;
            }
        }
        init();
    },
    // 平台提供的组件数据
    dataChange: function (data) {
        console.log('我是平台提供的组件数据', data);
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
            const { actionType } = data;
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
            const { actionType } = data;
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
app.init();
