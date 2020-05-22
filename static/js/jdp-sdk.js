/**
 * JDP-SDK 3.0.1
 * Copyright 2016, zhuziyi@jd.com
 * Released on: April 12, 2016
 */

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}

function JDP() {
    this.ua = navigator.userAgent;
    this.android = this.ua.match(/(Android)\s+([\d.]+)/);
    this.ios = this.ua.match(/(iPhone\sOS)\s([\d_]+)/);
}

JDP.prototype = {
    constructor: JDP,
    getInfo: function(fn) {
        var callback = ('globalCallback' + Math.random()).replace(/\./, '');
        this.fnCallback(callback, fn);

        if (this.android) {
            android.getInfo(callback);
        } else {
            this.openIframe('native://getInfo?callback=' + callback);
        }
    },
    setTitle: function(text) {
        if (this.android) {
            android.setTitleName(text);
        } else {
            this.openIframe('native://setTitleName?titleName=' + text);
        }
    },
    alert: function(text) {
        var callback = ('globalCallback' + Math.random()).replace(/\./, '');
        if (this.android) {
            android.alert(text);
        } else {
            this.fnCallback(callback, null);
            this.openIframe('native://alert?text=' + text + '&callback=' + callback);
        }
    },
    confirm: function(json) {
        var callback = ('globalCallback' + Math.random()).replace(/\./, '');
        this.fnCallback(callback, json.callback);

        if (this.android) {
            android.confirm(json.text, json.sure, json.cancel, callback);
        } else {
            this.openIframe('native://confirm?text=' + json.text + '&btn0Name=' + json.sure + '&btn1Name=' + json.cancel + '&callback=' + callback)
        }
    },
    close: function() {
        if (this.android) {
            android.close();
        } else {
            location.href = 'native://close';
        }
    },
    addCache: function(json) {
        if (this.android) {
            android.putCache(json.key, json.value);
        } else {
            this.openIframe('native://putCache?key=' + json.key + '&value=' + json.value);
        }
    },
    getCache: function(json) {
        var callback = ('globalCallback' + Math.random()).replace(/\./, '');
        this.fnCallback(callback, json.callback);

        if (this.android) {
            android.getCache(json.key, callback);
        } else {
            this.openIframe('native://getCache? key=' + json.key + '&callback=' + callback);
        }

    },
    removeCache: function(json) {

        if (this.android) {
            android.removeCache(json.key);
        } else {
            this.openIframe('native://removeCache? key=' + json.key);
        }
    },
    removeAllCache: function() {

        if (this.android) {
            android.removeAllCache();
        } else {
            this.openIframe('native://removeAllCache');
        }
    },
    goBackListener: function(fn) {
        window['goBackListenerCallback'] = function() {
            if (fn) {
                return fn();
            } else {
                return 0;
            }
        };

        if (this.android) {
            android.setGoBackListener('goBackListenerCallback');
        } else {
            this.openIframe('native://setGoBackListener?listener=goBackListenerCallback')
        }

    },
    checkNetwork: function(fn) {
        var callback = ('globalCallback' + Math.random()).replace(/\./, '');
        this.fnCallback(callback, fn);

        if (this.android) {
            android.checkNetwork(callback);
        } else {
            this.openIframe('native://checkNetwork?callback=' + callback)
        }

    },
    buriedPoint: function(json) { //{once:, eventId:, eventLabel: ,}
        var once = json.once ? true : false;

        if (once && this.android) {
            android.buriedPointOnce(json.eventId);
        } else {
            android.buriedPoint(json.eventId, json.eventLable);
        }

        if (once && this.ios) {;
            this.openIframe('native://buriedPoint?eventId=' + json.eventId);
        } else {
            this.openIframe('native://buriedPoint?eventId=' + json.eventId + '&eventLable=' + json.eventLable);
        }
    },
    openAppModel: function(json) {
        var str = this.json2str(json.params) || '',
            name = (json.name).toUpperCase(),
            callback = ('globalCallback' + Math.random()).replace(/\./, '');

        this.fnCallback(callback, json.callback);

        if (json.name == 'ACTIVITY' && this.android) {
            android.start(json.params.url, callback);
            return;
        }
        if (json.name == 'ACTIVITY' && this.ios) {
            this.openIframe('native://start?name=' + json.params.url + '&callback=' + callback)
            return;
        }

        if (this.android) {
            android.start(name, JSON.stringify(json.params), callback);
        } else {
            this.openIframe('native://start?name=' + name + str + '&callback=' + callback)
        }
    },
    shareText: function(json) {

        var callback = ('globalCallback' + Math.random()).replace(/\./, ''),
            channel = json.channel || '';

        this.fnCallback(callback, json.callback);

        if (this.android) {
            android.shareText(json.text, channel, callback);
        } else {
            this.openIframe('native://shareText?text=' + json.text + '&jsonChannel=' + channel + '&callback=' + callback);
        }
    },
    shareImage: function(json) {

        var callback = ('globalCallback' + Math.random()).replace(/\./, ''),
            channel = json.channel || '';

        this.fnCallback(callback, json.callback);

        if (this.android) {
            android.shareImage(json.startY, json.endY, json.channel, callback);
        } else {
            this.openIframe('native://shareImage?startY=' + json.startY + '&endY=' + json.endY + '&jsonChannel=' + json.channel + '&callback=' + callback);
        }
    },
    shareUrl: function(json) {

        var callback = ('globalCallback' + Math.random()).replace(/\./, ''),
            channel = json.channel || '';

        this.fnCallback(callback, json.callback);

        if (this.android) {
            android.shareWebPage(json.url, json.title, json.desc, channel, callback);
        } else {
            this.openIframe('native://shareWebPage?url=' + json.url + '&webTitle=' + json.title + '&webDesc=' + json.desc + '&jsonChannel=' + channel + '&callback=' + callback);
        }
    },
    json2str: function(json) {
        var str = '';
        for (var n in json) {
            str += '&' + n + '=' + json[n]
        }
        return str;
    },
    openIframe: function(src) {
        var ifr = document.createElement('iframe');
        ifr.src = src;
        document.body.appendChild(ifr);
        setTimeout(function() {
            document.body.removeChild(ifr);
        }, 2000);
    },
    fnCallback: function(name, callback) {
        window[name] = function(result) {
            callback && callback(result);
            delete window[name];
        };
    },
    setMenu: function(menuList) {
        var json = {};
        str = '[';
        menuList.forEach(function(obj, index) {
            json['item' + index] = obj;
            str += JSON.stringify(obj) + ',';
        })
        str = str.substring(0, str.length - 1);
        str += ']';
        if (this.android) {
            android.setTitleMenu(str);
        } else {
            WebViewJavascriptBridge.callHandler('setMenu', json)
        }
    },
    pay: function(json) {
        var callback = ('globalCallback' + Math.random()).replace(/\./, ''),
            params = JSON.stringify(json.params);

        this.fnCallback(callback, json.callback);

        delete json.callback;

        if (this.android) {
            android.pay(params, callback)
        } else {
            this.openIframe("native://commonPay?params=" + params + "&callback=" + callback)
        }
    }
};
window.JDP = JDP;

var jdp = new JDP();
