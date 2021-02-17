
/**
 * 等待U3D加载结束
 */
function LoadComplete() {
    app._initWork();
    window.parent.postMessage({
        actionType: 'complete'
    }, '*');
}
/**
 * 这里开始写业务逻辑代码
 */
var app = {
    init: function () {
        var that = this;

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

    // 平台提供的组件数据
    dataChange: function (data) {
        console.log('我是平台提供的组件数据', data);
        gameInstance.SendMessage("Net", "InitScene", JSON.stringify(data))

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
