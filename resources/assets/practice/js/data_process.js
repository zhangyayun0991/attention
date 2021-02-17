
/**
 * 这里开始写业务逻辑代码
 */

var app = {
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

        $(document).on('click', '#button', function () {
            var number = Math.floor(Math.random() * 100);
            // 往平台通信
            that.emit({ "v1": "我是来自组件的数据" + number });
        })
        indexApp.init();
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

var indexApp = {
    init: function () {
        this.slideCard();
        this.render();
        this.event();
    },

    render: function () {
        var showcase = $("#showcase")

        showcase.Cloud9Carousel({
            yPos: 42,
            yRadius: 420,
            farScale: 0.35,
            mirrorOptions: {
                gap: 12,
                height: 0.2
            },
            buttonLeft: $(".nav > .left"),
            buttonRight: $(".nav > .right"),
            autoPlay: true,
            bringToFront: true,
            onRendered: showcaseUpdated,
            onLoaded: function () {
                $('.cloud9-item').show();
                showcase.css('visibility', 'visible')
                showcase.css('display', 'none')
                showcase.fadeIn(1500)
            }
        })

        function showcaseUpdated(showcase) {
            var title = $('#item-title').html(
                $(showcase.nearestItem()).attr('alt')
            )

            var c = Math.cos((showcase.floatIndex() % 1) * 2 * Math.PI)
            title.css('opacity', 0.5 + (0.5 * c))
        }

        // Simulate physical button click effect
        $('.nav > button').click(function (e) {
            var b = $(e.target).addClass('down')
            setTimeout(function () { b.removeClass('down') }, 80)
        })

        $(document).keydown(function (e) {
            switch (e.keyCode) {
                /* left arrow */
                case 37:
                    $('.nav > .left').click()
                    break

                /* right arrow */
                case 39:
                    $('.nav > .right').click()
            }
        });

        this.renderCharts();
    },

    renderCharts: function () {
        function initBasicLine1() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-basic-line1'));

            // 指定图表的配置项和数据
            var lineData = [30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000];
            var barData = [4600, 5000, 5500, 6500, 7500
                , 8500, 9900, 12500, 14000, 21500
                , 23200, 24450, 25250];
            var rateData = [];

            for (var i = 0; i < 33; i++) {
                // var date = i+2001;
                // category.push(date)
                var rate = barData[i] / lineData[i];
                rateData[i] = rate.toFixed(2);
            }


            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    show: false,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35']
                }],
                yAxis: [{
                    show: false,
                    type: 'value',
                    name: '单位（%）',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
                series: [{
                    name: '出京',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#478eff'
                            }, {
                                offset: 0.1,
                                color: 'rgba(73,242,254, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        },
                    },
                    itemStyle: {
                        normal: {

                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#478eff'
                            }, {
                                offset: 1,
                                color: '#49f2fe'
                            }])
                        },
                        emphasis: {
                            color: 'rgb(99,250,235)',
                            borderColor: 'rgba(99,250,235,0.2)',
                            extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                            borderWidth: 10
                        }
                    },
                    data: [120, 130, 215, 155, 122, 165, 122, 110]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initBasicLine2() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-basic-line2'));

            // 指定图表的配置项和数据
            var lineData = [30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000];
            var barData = [4600, 5000, 5500, 6500, 7500
                , 8500, 9900, 12500, 14000, 21500
                , 23200, 24450, 25250];
            var rateData = [];

            for (var i = 0; i < 33; i++) {
                // var date = i+2001;
                // category.push(date)
                var rate = barData[i] / lineData[i];
                rateData[i] = rate.toFixed(2);
            }


            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    show: false,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35']
                }],
                yAxis: [{
                    show: false,
                    type: 'value',
                    name: '单位（%）',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
                series: [{
                    name: '出京',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#478eff'
                            }, {
                                offset: 0.1,
                                color: 'rgba(73,242,254, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        },
                    },
                    itemStyle: {
                        normal: {

                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#478eff'
                            }, {
                                offset: 1,
                                color: '#49f2fe'
                            }])
                        },
                        emphasis: {
                            color: 'rgb(99,250,235)',
                            borderColor: 'rgba(99,250,235,0.2)',
                            extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                            borderWidth: 10
                        }
                    },
                    data: [120, 130, 215, 155, 122, 165, 122, 110]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initBasicLine3() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-basic-line3'));

            // 指定图表的配置项和数据
            var lineData = [30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000];
            var barData = [4600, 5000, 5500, 6500, 7500
                , 8500, 9900, 12500, 14000, 21500
                , 23200, 24450, 25250];
            var rateData = [];

            for (var i = 0; i < 33; i++) {
                // var date = i+2001;
                // category.push(date)
                var rate = barData[i] / lineData[i];
                rateData[i] = rate.toFixed(2);
            }


            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    show: false,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35']
                }],
                yAxis: [{
                    show: false,
                    type: 'value',
                    name: '单位（%）',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
                series: [{
                    name: '出京',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#478eff'
                            }, {
                                offset: 0.1,
                                color: 'rgba(73,242,254, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        },
                    },
                    itemStyle: {
                        normal: {

                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#478eff'
                            }, {
                                offset: 1,
                                color: '#49f2fe'
                            }])
                        },
                        emphasis: {
                            color: 'rgb(99,250,235)',
                            borderColor: 'rgba(99,250,235,0.2)',
                            extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                            borderWidth: 10
                        }
                    },
                    data: [120, 130, 215, 155, 122, 165, 122, 110]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initBasicLine4() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-basic-line4'));

            // 指定图表的配置项和数据
            var lineData = [30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000];
            var barData = [4600, 5000, 5500, 6500, 7500
                , 8500, 9900, 12500, 14000, 21500
                , 23200, 24450, 25250];
            var rateData = [];

            for (var i = 0; i < 33; i++) {
                // var date = i+2001;
                // category.push(date)
                var rate = barData[i] / lineData[i];
                rateData[i] = rate.toFixed(2);
            }


            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    show: false,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35']
                }],
                yAxis: [{
                    show: false,
                    type: 'value',
                    name: '单位（%）',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
                series: [{
                    name: '出京',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#478eff'
                            }, {
                                offset: 0.1,
                                color: 'rgba(73,242,254, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        },
                    },
                    itemStyle: {
                        normal: {

                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#478eff'
                            }, {
                                offset: 1,
                                color: '#49f2fe'
                            }])
                        },
                        emphasis: {
                            color: 'rgb(99,250,235)',
                            borderColor: 'rgba(99,250,235,0.2)',
                            extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                            borderWidth: 10
                        }
                    },
                    data: [120, 130, 215, 155, 122, 165, 122, 110]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initBasicLine5() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-basic-line5'));

            // 指定图表的配置项和数据
            var lineData = [30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000];
            var barData = [4600, 5000, 5500, 6500, 7500
                , 8500, 9900, 12500, 14000, 21500
                , 23200, 24450, 25250];
            var rateData = [];

            for (var i = 0; i < 33; i++) {
                // var date = i+2001;
                // category.push(date)
                var rate = barData[i] / lineData[i];
                rateData[i] = rate.toFixed(2);
            }


            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    show: false,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35']
                }],
                yAxis: [{
                    show: false,
                    type: 'value',
                    name: '单位（%）',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
                series: [{
                    name: '出京',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#478eff'
                            }, {
                                offset: 0.1,
                                color: 'rgba(73,242,254, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        },
                    },
                    itemStyle: {
                        normal: {

                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#478eff'
                            }, {
                                offset: 1,
                                color: '#49f2fe'
                            }])
                        },
                        emphasis: {
                            color: 'rgb(99,250,235)',
                            borderColor: 'rgba(99,250,235,0.2)',
                            extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                            borderWidth: 10
                        }
                    },
                    data: [120, 130, 215, 155, 122, 165, 122, 110]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initBasicBar1() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-basic-bar1'));

            // 指定图表的配置项和数据
            // Generate data
            var category = ['04-12', '04-13', '04-14', '04-15', '04-16', '04-17', '04-18', '04-19', '04-20', '04-21', '04-22', '04-23', '04-24'];
            // var dottedBase = [];
            var lineData = [30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000];
            var barData = [4600, 5000, 5500, 6500, 7500
                , 8500, 9900, 12500, 14000, 21500
                , 23200, 24450, 25250];
            var rateData = [];

            for (var i = 0; i < 33; i++) {
                // var date = i+2001;
                // category.push(date)
                var rate = barData[i] / lineData[i];
                rateData[i] = rate.toFixed(2);
            }


            // option
            var option = {
                title: {
                    text: '',
                    x: 'center',
                    y: 0,
                    textStyle: {
                        color: '#B4B4B4',
                        fontSize: 12,
                        fontWeight: 'normal',
                    },

                },
                // backgroundColor: '#191E40',
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true,
                            backgroundColor: '#7B7DDC'
                        }
                    }
                },
                // legend: {
                // data: ['已贯通', '计划贯通','贯通率',],
                // textStyle: {
                // color: '#B4B4B4'
                // },
                // top:'7%',
                // },
                grid: {
                    x: '12%',
                    width: '82%',
                    y: '12%',
                },
                xAxis: {
                    show: false,
                    data: category,
                    axisLine: {
                        lineStyle: {
                            color: '#B4B4B4'
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
                yAxis: [{
                    show: false,
                    splitLine: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: '#B4B4B4',
                        }
                    },

                    axisLabel: {
                        formatter: '{value} ',
                    }
                },
                    {
                        show: false,
                        splitLine: { show: false },
                        axisLine: {
                            lineStyle: {
                                color: '#B4B4B4',
                            }
                        },
                        axisLabel: {
                            formatter: '{value} ',
                        }
                    }],

                series: [

                    {
                        name: '已贯通',
                        type: 'bar',
                        barWidth: 8,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#956FD4' },
                                        { offset: 1, color: '#3EACE5' }
                                    ]
                                )
                            }
                        },
                        data: barData
                    },

                    {
                        name: '计划贯通',
                        type: 'bar',
                        barGap: '-100%',
                        barWidth: 8,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: 'rgba(156,107,211,0.5)' },
                                        { offset: 0.2, color: 'rgba(156,107,211,0.3)' },
                                        { offset: 1, color: 'rgba(156,107,211,0)' }
                                    ]
                                )
                            }
                        },
                        z: -12,

                        data: lineData
                    },
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initBasicBar2() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-basic-bar2'));

            // 指定图表的配置项和数据
            // Generate data
            var category = ['04-12', '04-13', '04-14', '04-15', '04-16', '04-17', '04-18', '04-19', '04-20', '04-21', '04-22', '04-23', '04-24'];
            // var dottedBase = [];
            var lineData = [30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000, 30000, 30000
                , 30000, 30000, 30000];
            var barData = [4600, 5000, 5500, 6500, 7500
                , 8500, 9900, 12500, 14000, 21500
                , 23200, 24450, 25250];
            var rateData = [];

            for (var i = 0; i < 33; i++) {
                // var date = i+2001;
                // category.push(date)
                var rate = barData[i] / lineData[i];
                rateData[i] = rate.toFixed(2);
            }


            // option
            var option = {
                title: {
                    text: '',
                    x: 'center',
                    y: 0,
                    textStyle: {
                        color: '#B4B4B4',
                        fontSize: 12,
                        fontWeight: 'normal',
                    },

                },
                // backgroundColor: '#191E40',
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true,
                            backgroundColor: '#7B7DDC'
                        }
                    }
                },
                grid: {
                    x: '12%',
                    width: '82%',
                    y: '12%',
                },
                xAxis: {
                    show: false,
                    data: category,
                    axisLine: {
                        lineStyle: {
                            color: '#B4B4B4'
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
                yAxis: [{
                    show: false,
                    splitLine: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: '#B4B4B4',
                        }
                    },

                    axisLabel: {
                        formatter: '{value} ',
                    }
                },
                    {
                        show: false,
                        splitLine: { show: false },
                        axisLine: {
                            lineStyle: {
                                color: '#B4B4B4',
                            }
                        },
                        axisLabel: {
                            formatter: '{value} ',
                        }
                    }],

                series: [

                    {
                        name: '已贯通',
                        type: 'bar',
                        barWidth: 8,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#956FD4' },
                                        { offset: 1, color: '#3EACE5' }
                                    ]
                                )
                            }
                        },
                        data: barData
                    },

                    {
                        name: '计划贯通',
                        type: 'bar',
                        barGap: '-100%',
                        barWidth: 8,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: 'rgba(156,107,211,0.5)' },
                                        { offset: 0.2, color: 'rgba(156,107,211,0.3)' },
                                        { offset: 1, color: 'rgba(156,107,211,0)' }
                                    ]
                                )
                            }
                        },
                        z: -12,

                        data: lineData
                    },
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initBasicBar3() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-basic-bar3'));

            var option = {
                // backgroundColor: '#0e202d',
                tooltip: {},
                xAxis: {
                    data: ["企业", "农专", "个体", "企业1", "农专1", "个体1"],
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: '#e54035'
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }
                },
                series: [{
                    name: '柱图3',
                    type: 'pictorialBar',
                    symbolSize: [40, 20],
                    symbolOffset: [0, -10],
                    z: 12,
                    itemStyle: {
                        normal: {
                            color: '#14b1eb'
                        }
                    },
                    data: [{
                        value: 100,
                        symbolPosition: 'end'
                    }, {
                        value: 36,
                        symbolPosition: 'end'
                    }, {
                        value: 47,
                        symbolPosition: 'end'
                    }, {
                        value: 58,
                        symbolPosition: 'end'
                    }, {
                        value: 50,
                        symbolPosition: 'end'
                    }, {
                        value: 20,
                        symbolPosition: 'end'
                    }]
                }, {
                    name: '柱图2',
                    type: 'pictorialBar',
                    symbolSize: [40, 20],
                    symbolOffset: [0, 10],
                    z: 12,
                    itemStyle: {
                        normal: {
                            color: '#14b1eb'
                        }
                    },
                    data: [100, 36, 47, 58, 50, 20]
                }, {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#14b1eb',
                            opacity: .7
                        }
                    },
                    silent: true,
                    barWidth: 40,
                    barGap: '-100%', // Make series be overlap
                    data: [100, 36, 47, 58, 50, 20]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initBasicBar4() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-basic-bar4'));

            var option = {
                // backgroundColor: '#0e202d',
                tooltip: {},
                xAxis: {
                    data: ["企业", "农专", "个体", "企业1", "农专1", "个体1"],
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: '#e54035'
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }
                },
                series: [{
                    name: '柱图3',
                    type: 'pictorialBar',
                    symbolSize: [40, 20],
                    symbolOffset: [0, -10],
                    z: 12,
                    itemStyle: {
                        normal: {
                            color: '#14b1eb'
                        }
                    },
                    data: [{
                        value: 100,
                        symbolPosition: 'end'
                    }, {
                        value: 36,
                        symbolPosition: 'end'
                    }, {
                        value: 47,
                        symbolPosition: 'end'
                    }, {
                        value: 58,
                        symbolPosition: 'end'
                    }, {
                        value: 50,
                        symbolPosition: 'end'
                    }, {
                        value: 20,
                        symbolPosition: 'end'
                    }]
                }, {
                    name: '柱图2',
                    type: 'pictorialBar',
                    symbolSize: [40, 20],
                    symbolOffset: [0, 10],
                    z: 12,
                    itemStyle: {
                        normal: {
                            color: '#14b1eb'
                        }
                    },
                    data: [100, 36, 47, 58, 50, 20]
                }, {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#14b1eb',
                            opacity: .7
                        }
                    },
                    silent: true,
                    barWidth: 40,
                    barGap: '-100%', // Make series be overlap
                    data: [100, 36, 47, 58, 50, 20]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initBasicBar5() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-basic-bar5'));

            var option = {
                // backgroundColor: '#0e202d',
                tooltip: {},
                xAxis: {
                    data: ["企业", "农专", "个体", "企业1", "农专1", "个体1"],
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: '#e54035'
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }
                },
                series: [{
                    name: '柱图3',
                    type: 'pictorialBar',
                    symbolSize: [40, 20],
                    symbolOffset: [0, -10],
                    z: 12,
                    itemStyle: {
                        normal: {
                            color: '#14b1eb'
                        }
                    },
                    data: [{
                        value: 100,
                        symbolPosition: 'end'
                    }, {
                        value: 36,
                        symbolPosition: 'end'
                    }, {
                        value: 47,
                        symbolPosition: 'end'
                    }, {
                        value: 58,
                        symbolPosition: 'end'
                    }, {
                        value: 50,
                        symbolPosition: 'end'
                    }, {
                        value: 20,
                        symbolPosition: 'end'
                    }]
                }, {
                    name: '柱图2',
                    type: 'pictorialBar',
                    symbolSize: [40, 20],
                    symbolOffset: [0, 10],
                    z: 12,
                    itemStyle: {
                        normal: {
                            color: '#14b1eb'
                        }
                    },
                    data: [100, 36, 47, 58, 50, 20]
                }, {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#14b1eb',
                            opacity: .7
                        }
                    },
                    silent: true,
                    barWidth: 40,
                    barGap: '-100%', // Make series be overlap
                    data: [100, 36, 47, 58, 50, 20]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initLiquidFill1() {
            // ECharts 水球图插件


            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-liquid-fill1'));


            var data = [[5, 5, 0], [1.5, 1.6, 15], [2, 2, 31], [2.6, 1.7, 35], [2.6, 1, 22], [3.2, 1.5, 10], [3.9, 1.7, 24], [2.2, 3.2, 20]]
            var option = {
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false
                },
                series: [{
                    type: 'liquidFill',
                    data: [0.6, 0.55],
                    color: ['#3ab2cb', '#3ab2cb'],
                    radius: '80%',
                    itemStyle: {
                        shadowBlur: 0
                    },
                    outline: {
                        show: false,
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 0,
                            borderColor: '#92d4c5',
                            shadowBlur: 20,
                            shadowColor: 'rgba(146, 212, 197, 0)'
                        }
                    },
                    backgroundStyle: {
                        // borderColor: '#156ACF',
                        // borderWidth: 1,
                        // shadowColor: 'rgba(0, 0, 0, 0.4)',
                        // shadowBlur: 20
                        borderWidth: 0,
                        // borderColor: 'rgb(255,0,255,0.9)',
                        color: 'rgb(255,0,255,0.01)',
                        borderColor: 'rgb(255,0,255,0.01)',
                        // color: '#007eff'

                    },
                    // shape: 'path://M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z',
                    shape: '123',

                    label: {
                        normal: {
                            position: ['50%', '40%'],
                            formatter: function () {
                                var PM25 = '25%';
                                // var html ='<span style="fontSize:15px;">'+PM25+'<span>';
                                // html +='<span style="fontSize:15px;">47μg/m³<span>';
                                return PM25;
                            },
                            textStyle: {
                                fontSize: 32,
                                color: '#fff'
                            }
                        }
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initLiquidFill2() {
            // ECharts 水球图插件


            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-liquid-fill2'));


            var data = [[5, 5, 0], [1.5, 1.6, 15], [2, 2, 31], [2.6, 1.7, 35], [2.6, 1, 22], [3.2, 1.5, 10], [3.9, 1.7, 24], [2.2, 3.2, 20]]
            var option = {
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false
                },
                series: [{
                    type: 'liquidFill',
                    data: [0.6, 0.55],
                    color: ['#e146ba', '#e146ba'],
                    radius: '80%',
                    itemStyle: {
                        shadowBlur: 0
                    },
                    outline: {
                        show: false,
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 0,
                            borderColor: '#92d4c5',
                            shadowBlur: 20,
                            shadowColor: 'rgba(146, 212, 197, 0)'
                        }
                    },
                    backgroundStyle: {
                        // borderColor: '#156ACF',
                        // borderWidth: 1,
                        // shadowColor: 'rgba(0, 0, 0, 0.4)',
                        // shadowBlur: 20
                        borderWidth: 0,
                        // borderColor: 'rgb(255,0,255,0.9)',
                        color: 'rgb(255,0,255,0.01)',
                        borderColor: 'rgb(255,0,255,0.01)',
                        // color: '#007eff'

                    },
                    shape: '123',

                    label: {
                        normal: {
                            position: ['50%', '40%'],
                            formatter: function () {
                                var PM25 = '63%';
                                // var html ='<span style="fontSize:15px;">'+PM25+'<span>';
                                // html +='<span style="fontSize:15px;">47μg/m³<span>';
                                return PM25;
                            },
                            textStyle: {
                                fontSize: 32,
                                color: '#fff'
                            }
                        }
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initLiquidFill3() {
            // ECharts 水球图插件


            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-liquid-fill3'));


            var data = [[5, 5, 0], [1.5, 1.6, 15], [2, 2, 31], [2.6, 1.7, 35], [2.6, 1, 22], [3.2, 1.5, 10], [3.9, 1.7, 24], [2.2, 3.2, 20]]
            var option = {
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false
                },
                series: [{
                    type: 'liquidFill',
                    data: [0.6, 0.55],
                    color: ['#7540d9', '#7540d9'],
                    radius: '70%',
                    itemStyle: {
                        shadowBlur: 0
                    },
                    outline: {
                        show: false,
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 0,
                            borderColor: '#92d4c5',
                            shadowBlur: 20,
                            shadowColor: 'rgba(146, 212, 197, 0)'
                        }
                    },
                    backgroundStyle: {
                        // borderColor: '#156ACF',
                        // borderWidth: 1,
                        // shadowColor: 'rgba(0, 0, 0, 0.4)',
                        // shadowBlur: 20
                        borderWidth: 0,
                        // borderColor: 'rgb(255,0,255,0.9)',
                        color: 'rgb(255,0,255,0.01)',
                        borderColor: 'rgb(255,0,255,0.01)',
                        // color: '#007eff'

                    },
                    shape: '123',

                    label: {
                        normal: {
                            position: ['50%', '40%'],
                            formatter: function () {
                                var PM25 = '25%';
                                // var html ='<span style="fontSize:15px;">'+PM25+'<span>';
                                // html +='<span style="fontSize:15px;">47μg/m³<span>';
                                return PM25;
                            },
                            textStyle: {
                                fontSize: 32,
                                color: '#fff'
                            }
                        }
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        function initLiquidFill4() {
            // ECharts 水球图插件
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart-liquid-fill4'));


            var data = [[5, 5, 0], [1.5, 1.6, 15], [2, 2, 31], [2.6, 1.7, 35], [2.6, 1, 22], [3.2, 1.5, 10], [3.9, 1.7, 24], [2.2, 3.2, 20]]
            var option = {
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false
                },
                series: [{
                    type: 'liquidFill',
                    data: [0.6, 0.55],
                    color: ['#3ecf73', '#3ecf73'],
                    radius: '80%',
                    itemStyle: {
                        shadowBlur: 0
                    },
                    outline: {
                        show: false,
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 0,
                            borderColor: '#92d4c5',
                            shadowBlur: 20,
                            shadowColor: 'rgba(146, 212, 197, 0)'
                        }
                    },
                    backgroundStyle: {
                        borderWidth: 0,
                        color: 'rgb(255,0,255,0.01)',
                        borderColor: 'rgb(255,0,255,0.01)',

                    },
                    shape: '123',

                    label: {
                        normal: {
                            position: ['50%', '40%'],
                            formatter: function () {
                                var PM25 = '46%';
                                return PM25;
                            },
                            textStyle: {
                                fontSize: 32,
                                color: '#fff'
                            }
                        }
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        initBasicLine1();
        initBasicLine2();
        initBasicLine3();
        initBasicLine4();
        initBasicLine5();
        initBasicBar1();
        initBasicBar2();
        initBasicBar3();
        initBasicBar4();
        initBasicBar5();
        initLiquidFill1();
        initLiquidFill2();
        initLiquidFill3();
        initLiquidFill4();
    },

    event: function () {

    },

    slideCard: function () {
        var transform = (function () {
            var vendors = ['webkit', 'moz', 'ms'];
            var style = document.createElement("div").style;
            var trans = 'transform' in style ? 'transform' : undefined;
            for (var i = 0, count = vendors.length; i < count; i++) {
                var prop = vendors[i] + 'Transform';
                if (prop in style) {
                    trans = prop;
                    break;
                }
            }
            return trans;
        })();
        var Item = function (element, options) {
            element.item = this;
            this.element = element;
            if (element.tagName === 'IMG') {
                this.fullWidth = element.width;
                this.fullHeight = element.height;
            } else {
                element.style.display = "inline-block";
                this.fullWidth = element.offsetWidth;
                this.fullHeight = element.offsetHeight;
            }
            element.style.position = 'absolute';
            if (options.mirror && this.element.tagName === 'IMG') {
                this.reflection = $(element).reflect(options.mirror).next()[0];
                var $reflection = $(this.reflection);
                this.reflection.fullHeight = $reflection.height();
                $reflection.css('margin-top', options.mirror.gap + 'px');
                $reflection.css('width', '100%');
                element.style.width = "100%";
                this.element = this.element.parentNode;
                this.element.item = this;
                this.element.alt = element.alt;
                this.element.title = element.title;
            }
            if (transform && options.transforms)
                this.element.style[transform + "Origin"] = "0 0";
            this.moveTo = function (x, y, scale) {
                this.width = this.fullWidth * scale;
                this.height = this.fullHeight * scale;
                this.x = x;
                this.y = y;
                this.scale = scale;
                var style = this.element.style;
                style.zIndex = "" + (scale * 100) | 0;
                if (transform && options.transforms) {
                    style[transform] = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
                } else {
                    if (options.mirror && this.element.tagName === 'IMG')
                        this.reflection.style.marginTop = (options.mirror.gap * scale) + "px";
                    style.width = this.width + "px";
                    style.left = x + "px";
                    style.top = y + "px";
                }
                // by wuchuan
                if (scale === 1) {
                    $(this.element).addClass('active').siblings().removeClass('active');
                }
            }
        }
        var time = !window.performance || !window.performance.now ? function () {
            return +new Date()
        } : function () {
            return performance.now()
        };
        var cancelFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
        var requestFrame = window.requestAnimationFrame;
        (function () {
            var vendors = ['webkit', 'moz', 'ms'];
            for (var i = 0, count = vendors.length; i < count && !cancelFrame; i++) {
                cancelFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] +
                'CancelRequestAnimationFrame'];
                requestFrame = requestFrame && window[vendors[i] + 'RequestAnimationFrame'];
            }
        }());
        var Carousel = function (element, options) {
            var self = this;
            var $container = $(element);
            this.items = [];
            this.xOrigin = (options.xOrigin === null) ? $container.width() * 0.5 : options.xOrigin;
            this.yOrigin = (options.yOrigin === null) ? $container.height() * 0.1 : options.yOrigin;
            this.xRadius = (options.xRadius === null) ? $container.width() / 2.3 : options.xRadius;
            this.yRadius = (options.yRadius === null) ? $container.height() / 6 : options.yRadius;
            this.farScale = options.farScale;
            this.rotation = this.destRotation = Math.PI / 2;
            this.speed = options.speed;
            this.smooth = options.smooth;
            this.fps = options.fps;
            this.timer = 0;
            this.autoPlayAmount = options.autoPlay;
            this.autoPlayDelay = options.autoPlayDelay;
            this.autoPlayTimer = 0;
            this.frontItemClass = options.frontItemClass;
            this.onLoaded = options.onLoaded;
            this.onRendered = options.onRendered;
            this.onAnimationFinished = options.onAnimationFinished;
            this.itemOptions = {
                transforms: options.transforms
            }
            if (options.mirror) {
                this.itemOptions.mirror = $.extend({
                    gap: 2
                }, options.mirror);
            }
            $container.css({
                position: 'relative',
                overflow: 'hidden'
            });
            this.renderItem = function (itemIndex, rotation) {
                var item = this.items[itemIndex];
                var sin = Math.sin(rotation);
                var farScale = this.farScale;
                var scale = farScale + ((1 - farScale) * (sin + 1) * 0.5);
                item.moveTo(this.xOrigin + (scale * ((Math.cos(rotation) * this.xRadius) - (item.fullWidth *
                    0.5))), this.yOrigin + (scale * sin * this.yRadius), scale);
                return item;
            }
            this.render = function () {
                var count = this.items.length;
                var spacing = 2 * Math.PI / count;
                var radians = this.rotation;
                var nearest = this.nearestIndex();
                for (var i = 0; i < count; i++) {
                    var item = this.renderItem(i, radians);
                    if (i === nearest)
                        $(item.element).addClass(this.frontItemClass);
                    else
                        $(item.element).removeClass(this.frontItemClass);
                    radians += spacing;
                }
                if (typeof this.onRendered === 'function')
                    this.onRendered(this);
            }
            this.playFrame = function () {
                var rem = self.destRotation - self.rotation;
                var now = time();
                var dt = (now - self.lastTime) * 0.002;
                self.lastTime = now;
                if (Math.abs(rem) < 0.003) {
                    self.rotation = self.destRotation;
                    self.pause();
                    if (typeof self.onAnimationFinished === 'function')
                        self.onAnimationFinished();
                } else {
                    self.rotation = self.destRotation - rem / (1 + (self.speed * dt));
                    self.scheduleNextFrame();
                }
                self.render();
            }
            this.scheduleNextFrame = function () {
                this.lastTime = time();
                this.timer = this.smooth && cancelFrame ? requestFrame(self.playFrame) : setTimeout(self.playFrame,
                    1000 / this.fps);
            }
            this.itemsRotated = function () {
                return this.items.length * ((Math.PI / 2) - this.rotation) / (2 * Math.PI);
            }
            this.floatIndex = function () {
                var count = this.items.length;
                var floatIndex = this.itemsRotated() % count;
                return (floatIndex < 0) ? floatIndex + count : floatIndex;
            }
            this.nearestIndex = function () {
                return Math.round(this.floatIndex()) % this.items.length;
            }
            this.nearestItem = function () {
                return this.items[this.nearestIndex()];
            }
            this.play = function () {
                if (this.timer === 0)
                    this.scheduleNextFrame();
            }
            this.pause = function () {
                this.smooth && cancelFrame ? cancelFrame(this.timer) : clearTimeout(this.timer);
                this.timer = 0;
            }
            this.go = function (count) {
                this.destRotation += (2 * Math.PI / this.items.length) * count;
                this.play();
            }
            this.goTo = function (index) {
                var count = this.items.length;
                var diff = index - (this.floatIndex() % count);
                if (2 * Math.abs(diff) > count)
                    diff -= (diff > 0) ? count : -count;
                this.destRotation = this.rotation;
                this.go(-diff);
                return diff;
            }
            this.deactivate = function () {
                this.pause();
                clearInterval(this.autoPlayTimer);
                if (options.buttonLeft) options.buttonLeft.unbind('click');
                if (options.buttonRight) options.buttonRight.unbind('click');
                $container.unbind('.cloud9');
            }
            this.autoPlay = function () {
                this.autoPlayTimer = setInterval(function () {
                    self.go(self.autoPlayAmount)
                }, this.autoPlayDelay);
            }
            this.enableAutoPlay = function () {
                $container.bind('mouseover.cloud9', function () {
                    clearInterval(self.autoPlayTimer);
                });
                $container.bind('mouseout.cloud9', function () {
                    self.autoPlay();
                });
                this.autoPlay();
            }
            this.bindControls = function () {
                if (options.buttonLeft) {
                    options.buttonLeft.bind('click', function () {
                        self.go(-1);
                        return false;
                    });
                }
                if (options.buttonRight) {
                    options.buttonRight.bind('click', function () {
                        self.go(1);
                        return false;
                    });
                }
                if (options.mouseWheel) {
                    $container.bind('mousewheel.cloud9', function (event, delta) {
                        self.go((delta > 0) ? 1 : -1);
                        return false;
                    });
                }
                if (options.bringToFront) {
                    $container.bind('click.cloud9', function (event) {
                        var hits = $(event.target).closest('.' + options.itemClass);
                        if (hits.length !== 0) {
                            var diff = self.goTo(self.items.indexOf(hits[0].item));
                            if (Math.abs(diff) > 0.5)
                                event.preventDefault();
                        }
                    });
                }
            }
            var items = $container.find('.' + options.itemClass);
            this.finishInit = function () {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if ((item.tagName === 'IMG') && ((item.width === undefined) || ((item.complete !==
                        undefined) && !item.complete)))
                        return;
                }
                clearInterval(this.initTimer);
                for (i = 0; i < items.length; i++)
                    this.items.push(new Item(items[i], this.itemOptions));
                $container.bind('mousedown onselectstart', function () {
                    return false
                });
                if (this.autoPlayAmount !== 0) this.enableAutoPlay();
                this.bindControls();
                this.render();
                if (typeof this.onLoaded === 'function')
                    this.onLoaded(this);
            };
            this.initTimer = setInterval(function () {
                self.finishInit()
            }, 50);
        }
        $.fn.Cloud9Carousel = function (options) {
            return this.each(function () {
                options = $.extend({
                    xOrigin: null,
                    yOrigin: null,
                    xRadius: null,
                    yRadius: null,
                    farScale: 0.5,
                    transforms: true,
                    smooth: true,
                    fps: 30,
                    speed: 4,
                    autoPlay: 0,
                    autoPlayDelay: 4000,
                    bringToFront: false,
                    itemClass: 'cloud9-item',
                    frontItemClass: null,
                    handle: 'carousel'
                }, options);
                $(this).data(options.handle, new Carousel(this, options));
            });
        }
    }

};

app._initWork();
