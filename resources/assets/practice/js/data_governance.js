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
            that.emit({"v1": "我是来自组件的数据" + number});
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
            const {actionType} = data;
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
            const {actionType} = data;
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
        this.render();
        this.event();
    },

    render: function () {
        var self = this;
        this.renderTpl();
        setInterval(function () {
            self.renderTpl();
        }, 1000)
    },

    ender: function () {
        var self = this;
        this.renderTpl();
        setInterval(function () {
            self.renderTpl();
        }, 1000)
    },

    renderTpl: function () {
        var tpl = '<div class="time-box3">' +
            '<div class="time">' + this.get_cur_time().date2 + '</div>' +
            '<div class="week">' +
            '<span class="date">' + this.get_cur_time().date1 + '</span>' +
            '<span class="week">' + this.get_cur_time().week + '</span>' +
            '</div >' +
            '</div >' +
            '<div class="weather">' +
            '<img src="<%ctxPath%>/components/com/senior-data-governance/1.0.0/images/weather1.png" alt="">' +
            '<div class="weather-detail">' +
            '<div class="text">多云</div>' +
            '<div class="text">8~20&#176;C</div>' +
            '</div>' +
            '</div>';
        $(".head-right").html(tpl);
    },

    event: function () {
        var path1 = anime.path("#path1 path");
        var path2 = anime.path("#path2 path");
        var path3 = anime.path("#path3 path");
        var path4 = anime.path("#path4 path");
        var path5 = anime.path("#path5 path");
        var path6 = anime.path("#path6 path");
        var path7 = anime.path("#path7 path");
        var path8 = anime.path("#path8 path");
        var path9 = anime.path("#path9 path");
        var path10 = anime.path("#path10 path");
        var path11 = anime.path("#path11 path");
        var path12 = anime.path("#path12 path");
        var path13 = anime.path("#path13 path");
        var path14 = anime.path("#path14 path");
        anime({
            targets: "#path1Point1",
            translateX: path1("x"),
            translateY: path1("y"),
            rotate: path1("angle"),
            duration: 8000,
            loop: true,
            easing: "linear"
        });
        anime({
            targets: "#path2Point1",
            translateX: path2("x"),
            translateY: path2("y"),
            rotate: path2("angle"),
            duration: 2000,
            loop: true,
            easing: "linear"
        });
        anime({
            targets: "#path3Point1",
            translateX: path3("x"),
            translateY: path3("y"),
            rotate: path3("angle"),
            duration: 3000,
            loop: true,
            easing: "linear"
        });
        anime({
            targets: "#path3Point2",
            translateX: path3("x"),
            translateY: path3("y"),
            rotate: path3("angle"),
            duration: 4000,
            loop: true,
            easing: "linear"
        });
        anime({
            targets: "#path4Point1",
            translateX: path4("x"),
            translateY: path4("y"),
            rotate: path4("angle"),
            duration: 2000,
            loop: true,
            easing: "linear"
        });
        anime({
            targets: "#path5Point1",
            translateX: path5("x"),
            translateY: path5("y"),
            rotate: path5("angle"),
            duration: 2000,
            loop: true,
            easing: "linear"
        });
        anime({
            targets: "#path6Point1",
            translateX: path6("x"),
            translateY: path6("y"),
            rotate: path6("angle"),
            duration: 2000,
            loop: true,
            easing: "linear"
        });
        anime({
            targets: "#path7Point1",
            translateX: path7("x"),
            translateY: path7("y"),
            rotate: path7("angle"),
            duration: 3000,
            loop: true,
            easing: "linear"
        });
        anime({
            targets: "#path8Point1",
            translateX: path8("x"),
            translateY: path8("y"),
            rotate: path8("angle"),
            duration: 4000,
            loop: true,
            easing: "linear"
        });
        anime({
            targets: "#path9Point1",
            translateX: path9("x"),
            translateY: path9("y"),
            rotate: path9("angle"),
            duration: 2000,
            loop: true,
            easing: "linear"
        });
        anime({
            targets: "#path10Point1",
            translateX: path10("x"),
            translateY: path10("y"),
            rotate: path10("angle"),
            duration: 2000,
            loop: true,
            easing: "linear",
            direction: "reverse"
        });
        anime({
            targets: "#path11Point1",
            translateX: path11("x"),
            translateY: path11("y"),
            rotate: path11("angle"),
            duration: 3000,
            loop: true,
            easing: "linear",
        });
        anime({
            targets: "#path12Point1",
            translateX: path12("x"),
            translateY: path12("y"),
            rotate: path12("angle"),
            duration: 2000,
            loop: true,
            easing: "linear",
        });
        anime({
            targets: "#path13Point1",
            translateX: path13("x"),
            translateY: path13("y"),
            rotate: path13("angle"),
            duration: 2000,
            loop: true,
            easing: "linear",
        });
        anime({
            targets: "#path14Point1",
            translateX: path14("x"),
            translateY: path14("y"),
            rotate: path14("angle"),
            duration: 2500,
            loop: true,
            easing: "linear",
        });
    },

    get_cur_time: function () {
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        if (m <= 9) {
            m = '0' + m;
        }
        var ds = d.getDate();
        if (ds <= 9) {
            ds = '0' + ds;
        }
        var h = d.getHours();
        if (h <= 9) {
            h = '0' + h;
        }
        var f = d.getMinutes();
        if (f <= 9) {
            f = '0' + f;
        }
        var s = d.getSeconds();
        if (s <= 9) {
            s = '0' + s;
        }
        var days = d.getDay();
        switch (days) {
            case 1:
                days = '周一';
                break;
            case 2:
                days = '周二';
                break;
            case 3:
                days = '周三';
                break;
            case 4:
                days = '周四';
                break;
            case 5:
                days = '周五';
                break;
            case 6:
                days = '周六';
                break;
            case 0:
                days = '周日';
                break;

        }

        return {
            date1: y + ' ' + m + ' ' + ds,
            date2: h + ':' + f + ':' + s,
            week: days
        }
    }

};

app._initWork();
