/*!
 * vconsole v1.2.1 (https://github.com/WechatFE/vConsole)
 * Copyright 2016, WechatFE Team
 * MIT license
 */
! function(o, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.vConsole = t() : o.vConsole = t() }(this, function() {
    return function(o) {
        function t(n) {
            if (e[n]) return e[n].exports;
            var r = e[n] = { exports: {}, id: n, loaded: !1 };
            return o[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports }
        var e = {};
        return t.m = o, t.c = e, t.p = "", t(0) }([function(o, t, e) { "use strict";

        function n(o) {
            return o && o.__esModule ? o : { "default": o } }

        function r() {
            var o = this;
            this.html = w["default"], this.$dom = null, this.activedTab = "default", this.tabList = ["default", "system", "network"], this.console = {}, this.logList = [], this.isReady = !1, o._mokeConsole(), o._mokeAjax(), d(window, "load", function() { o._render(), o._bindEvent(), o._autoRun() }) }

        function i(o, t) {
            return t ? t.querySelector(o) : document.querySelector(o) }

        function c(o, t) {
            var e, n = [];
            return e = t ? t.querySelectorAll(o) : document.querySelectorAll(o), e && e.length > 0 && (n = Array.prototype.slice.call(e)), n }

        function l(o, t) {
            if (o) { b(o) || (o = [o]);
                for (var e = 0; e < o.length; e++) o[e].className += " " + t } }

        function a(o, t) {
            if (o) { b(o) || (o = [o]);
                for (var e = 0; e < o.length; e++) {
                    for (var n = o[e].className.split(" "), r = 0; r < n.length; r++) n[r] == t && (n[r] = "");
                    o[e].className = n.join(" ") } } }

        function s(o, t) {
            if (!o) return !1;
            for (var e = o.className.split(" "), n = 0; n < e.length; n++)
                if (e[n] == t) return !0;
            return !1 }

        function d(o, t, e, n) {
            if (o) { void 0 === n && (n = !1), b(o) || (o = [o]);
                for (var r = 0; r < o.length; r++) o[r].addEventListener(t, e, n) } }

        function v(o) {
            var t = o > 0 ? new Date(o) : new Date,
                e = t.getDay() < 10 ? "0" + t.getDay() : t.getDay(),
                n = t.getMonth() < 9 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1,
                r = t.getFullYear(),
                i = t.getHours() < 10 ? "0" + t.getHours() : t.getHours(),
                c = t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes(),
                l = t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds(),
                a = t.getMilliseconds() < 10 ? "0" + t.getMilliseconds() : t.getMilliseconds();
            return 100 > a && (a = "0" + a), { time: +t, year: r, month: n, day: e, hour: i, minute: c, second: l, millisecond: a } }

        function f(o) {
            return document.createElement("a").appendChild(document.createTextNode(o)).parentNode.innerHTML }

        function p(o, t) {
            var e = o;
            for (var n in t) e = e.replace("{" + n + "}", t[n]);
            return e }

        function u(o) {
            return "[object Number]" == Object.prototype.toString.call(o) }

        function g(o) {
            return "[object String]" == Object.prototype.toString.call(o) }

        function b(o) {
            return "[object Array]" == Object.prototype.toString.call(o) }

        function h(o) {
            return "[object Object]" == Object.prototype.toString.call(o) }

        function m(o) {
            return "[object Function]" == Object.prototype.toString.call(o) }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var _ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol ? "symbol" : typeof o };
        e(1);
        var y = e(5),
            w = n(y),
            x = e(6),
            k = n(x);
        r.prototype._render = function() {
            var o = "#__vconsole";
            if (!i(o)) {
                var t = document.createElement("div");
                t.innerHTML = this.html, document.body.appendChild(t.children[0]) }
            this.$dom = i(o) }, r.prototype._bindEvent = function() {
            var o = this;
            d(i(".vc-show"), "click", function() { o.show() }),d(i(".vc-refresh"), "click", function() { location.reload(true)}),d(i(".vc-jump"), "click", function() {var url = location.href;if (url.indexOf("?") >= 0) {url =url.substring(0, url.indexOf("?"));} this.href=url+'?eruda=true'}), d(i(".vc-hide"), "click", function() { o.hide() }), d(i(".vc-mask"), "click", function(t) {
                return t.target != i(".vc-mask") ? !1 : void o.hide() }), d(i(".vc-clear"), "click", function() { o.clearLog(o.activedTab) }), d(c(".vc-tab"), "click", function(t) {
                var e = t.target.dataset.tab;
                e != o.activedTab && o.showTab(e) }), d(c(".vc-log"), "click", function(o) {
                var t = o.target;
                s(t, "vc-fold-outer") && (s(t.parentElement, "vc-toggle") ? a(t.parentElement, "vc-toggle") : l(t.parentElement, "vc-toggle"), o.preventDefault()) }) }, r.prototype._mokeConsole = function() {
            if (window.console) {
                var o = this;
                this.console.log = window.console.log, this.console.info = window.console.info, this.console.warn = window.console.warn, this.console.debug = window.console.debug, this.console.error = window.console.error, window.console.log = function() { o._printLog("auto", "log", arguments) }, window.console.info = function() { o._printLog("auto", "info", arguments) }, window.console.warn = function() { o._printLog("auto", "warn", arguments) }, window.console.debug = function() { o._printLog("auto", "debug", arguments) }, window.console.error = function() { o._printLog("auto", "error", arguments) }, window.onerror = function(o, t, e, n, r) {
                    var i = r.stack.split("at");
                    i = i[0] + " " + i[1], i = i.replace(location.origin, ""), console.error(i) } } }, r.prototype._mokeAjax = function() {
            var o = window.XMLHttpRequest;
            if (o) {
                var t = window.XMLHttpRequest.prototype.open,
                    e = window.XMLHttpRequest.prototype.send;
                window.XMLHttpRequest.prototype.open = function() {
                    var o = this,
                        e = arguments;
                    return setTimeout(function() {
                        var t = o.onreadystatechange || function() {};
                        o.onreadystatechange = function() {
                            if (4 == o.readyState) { o._endTime = +new Date;
                                var n = e[1] || "unknow URL",
                                    r = o._endTime - (o._startTime || o._endTime),
                                    i = "[network][" + o.status + "] [" + r + "ms] " + n;
                                o.status >= 200 && o.status < 400 ? console.log(i) : console.error(i) }
                            return t.apply(o, arguments) } }, 0), t.apply(o, e) }, window.XMLHttpRequest.prototype.send = function() {
                    var o = this,
                        t = arguments;
                    o._startTime = +new Date, setTimeout(function() { e.apply(o, t) }, 1) } } }, r.prototype._autoRun = function() {
            for (this.isReady = !0; this.logList.length > 0;) {
                var o = this.logList.shift();
                this._printLog(o.tabName, o.logType, o.logs) }
            var t = navigator.userAgent,
                e = [],
                n = v();
            this._printLog("system", "info", ["日志时间:", n.year + "-" + n.month + "-" + n.day + " " + n.hour + ":" + n.minute + ":" + n.second + " " + n.millisecond]), e = ["系统版本:", "不明"];
            var r = t.match(/(ipod).*\s([\d_]+)/i),
                i = t.match(/(ipad).*\s([\d_]+)/i),
                c = t.match(/(iphone)\sos\s([\d_]+)/i),
                l = t.match(/(android)\s([\d\.]+)/i);
            l ? e[1] = "Android " + l[2] : c ? e[1] = "iPhone, iOS " + c[2].replace(/_/g, ".") : i ? e[1] = "iPad, iOS " + i[2].replace(/_/g, ".") : r && (e[1] = "iPod, iOS " + r[2].replace(/_/g, ".")), this._printLog("system", "info", e);
            var a = t.match(/MicroMessenger\/([\d\.]+)/i);
            e = ["微信版本:", "不明"], a && a[1] && (e[1] = a[1], this._printLog("system", "info", e));
            var s = t.toLowerCase().match(/ nettype\/([^ ]+)/g);
            e = ["网络类型:", "不明"], s && s[0] && (s = s[0].split("/"), e[1] = s[1], this._printLog("system", "info", e)), e = ["网址协议:", "不明"], "https:" == location.protocol ? e[1] = "HTTPS" : "http:" == location.protocol ? e[1] = "HTTP" : e[1] = location.protocol.replace(":", ""), this._printLog("system", "info", e), window.addEventListener("load", function(o) {
                var t = window.performance || window.msPerformance || window.webkitPerformance;
                if (t && t.timing) {
                    var e = t.timing,
                        n = e.navigationStart;
                    this._printLog("system", "info", ["连接结束点:", e.connectEnd - n + "ms"]), this._printLog("system", "info", ["回包结束点:", e.responseEnd - n + "ms"]), e.secureConnectionStart > 0 && this._printLog("system", "info", ["ssl耗时:", e.connectEnd - e.secureConnectionStart + "ms"]), this._printLog("system", "info", ["dom渲染耗时:", e.domComplete - e.domLoading + "ms"]) } }) }, r.prototype._printLog = function(o, t, e) {
            if (e.length) {
                if (!this.isReady) return void this.logList.push({ tabName: o, logType: t, logs: e });
                for (var n = "", r = 0; r < e.length; r++) try { n += m(e[r]) ? " " + e[r].toString() : h(e[r]) || b(e[r]) ? " " + this._getFoldedLine(e[r]) : " " + f(e[r]).replace(/\n/g, "<br/>") } catch (c) { n += " [" + _(e[r]) + "]" }
                if ("auto" == o) {
                    var l = /^ \[(\w+)\]/i,
                        a = n.match(l);
                    null !== a && a.length > 0 && this.tabList.indexOf(a[1]) > -1 && (o = a[1], n = n.replace(l, "")) } "auto" == o && (o = "default");
                var s = i("#__vc_log_" + o),
                    d = document.createElement("p");
                d.className = "vc-item vc-item-" + t, d.innerHTML = n, i(".vc-log", s).appendChild(d), i(".vc-content").scrollTop = i(".vc-content").scrollHeight, this.console[t].apply(window.console, e) } }, r.prototype._getFoldedLine = function(o, t) {
            function e(o) {
                if (h(o)) {
                    var t = Object.keys(o);
                    i += "{\n", l++;
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        o.hasOwnProperty(r) && (i += Array(l + 1).join(a) + '<i class="vc-code-key">' + r + "</i>: ", e(o[r]), n < t.length - 1 && (i += ",\n")) }
                    l--, i += "\n" + Array(l + 1).join(a) + "}" } else if (b(o)) { i += "[\n", l++;
                    for (var n = 0; n < o.length; n++) i += Array(l + 1).join(a) + '<i class="vc-code-key">' + n + "</i>: ", e(o[n]), n < o.length - 1 && (i += ",\n");
                    l--, i += "\n" + Array(l + 1).join(a) + "]" } else i += g(o) ? '<i class="vc-code-string">"' + o + '"</i>' : u(o) ? '<i class="vc-code-number">' + o + "</i>" : JSON.stringify(o) }
            var n = JSON.stringify(o),
                r = "",
                i = "",
                c = "",
                l = 0,
                a = "  ";
            c = n.substr(0, 30), n.length > 30 && (c += "..."), r = Object.prototype.toString.call(o).replace("[object ", "").replace("]", ""), r += " " + c, e(o);
            var s = p(k["default"], { outer: r, inner: i });
            return s }, r.prototype.showTab = function(o) {
            var t = i("#__vc_log_" + o);
            a(c(".vc-tab", this.$dom), "vc-actived"), l(i("#__vc_tab_" + o), "vc-actived"), a(c(".vc-logbox"), "vc-actived"), l(t, "vc-actived"), i(".vc-content").scrollTop = i(".vc-content").scrollHeight, this.activedTab = o }, r.prototype.clearLog = function(o) {
            var t = i("#__vc_log_" + o);
            i(".vc-log", t).innerHTML = "" }, r.prototype.show = function() { l(this.$dom, "vc-toggle") }, r.prototype.hide = function() { a(this.$dom, "vc-toggle") }, r.prototype.ready = function(o) { console.warn("vConsole.ready() is deprecated, console.log() can be called at anytime without waiting for ready. This method will be removed at v2.0.0 and later"), o && o.call(this) }, t["default"] = new r, o.exports = t["default"] }, function(o, t, e) {
        var n = e(2); "string" == typeof n && (n = [
            [o.id, n, ""]
        ]);
        e(4)(n, {});
        n.locals && (o.exports = n.locals) }, function(o, t, e) { t = o.exports = e(3)(), t.push([o.id, '#__vconsole{font-size:13px}#__vconsole .vc-show,#__vconsole .vc-refresh,#__vconsole .vc-jump{display:block;position:fixed;right:10px;bottom:10px;color:#fff;background-color:hsla(160, 100%, 32%, 0.9);;line-height:1;font-size:14px;padding:8px 16px;z-index:10000;border-radius:4px;box-shadow:0 0 8px rgba(0,0,0,.4)}#__vconsole .vc-refresh{bottom: 50px;background-color:hsla(0, 80%, 60%, 0.9);}#__vconsole .vc-jump{bottom: 90px;text-decoration:none}#__vconsole .vc-mask{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background-color:transparent;z-index:10001;transition:background .3s;-webkit-tap-highlight-color:transparent}#__vconsole .vc-panel{position:fixed;min-height:80%;left:0;right:0;bottom:0;z-index:10002;background-color:#efeff4;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-transform:translateY(100%);transform:translateY(100%)}#__vconsole .vc-tabbar{border-bottom:1px solid #d9d9d9;overflow:hidden}#__vconsole .vc-tabbar .vc-tab{float:left;line-height:39px;padding:0 15px;border-right:1px solid #d9d9d9;text-decoration:none;color:#000;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}#__vconsole .vc-tabbar .vc-tab:active{background-color:rgba(0,0,0,.15)}#__vconsole .vc-tabbar .vc-tab.vc-actived{background-color:#fff}#__vconsole .vc-content{background-color:#fff;overflow-x:hidden;overflow-y:scroll;position:absolute;top:40px;left:0;right:0;bottom:40px;-webkit-overflow-scrolling:touch}#__vconsole .vc-logbox{display:none;position:relative;height:100%}#__vconsole .vc-logbox i{font-style:normal}#__vconsole .vc-logbox .vc-log{-webkit-tap-highlight-color:transparent}#__vconsole .vc-logbox .vc-log:empty:before{content:"No log";color:#999;position:absolute;top:45%;left:0;right:0;bottom:0;font-size:15px;text-align:center}#__vconsole .vc-logbox .vc-item{margin:0;padding:6px 8px;line-height:1.3;border-bottom:1px solid #eee;word-break:break-word}#__vconsole .vc-logbox .vc-item-info{color:#6a5acd}#__vconsole .vc-logbox .vc-item-debug{color:#daa520}#__vconsole .vc-logbox .vc-item-warn{color:orange;border-color:#ffb930;background-color:#fffacd}#__vconsole .vc-logbox .vc-item-error{color:#dc143c;border-color:#f4a0ab;background-color:#ffe4e1}#__vconsole .vc-logbox .vc-item .vc-fold{display:block;max-height:300px;overflow:scroll;-webkit-overflow-scrolling:touch}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer{display:block;font-style:italic}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer:active{background-color:rgba(0,0,0,.15)}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer{padding-left:10px;position:relative}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer:before{content:"";position:absolute;top:4px;left:2px;width:0;height:0;border:4px solid transparent;border-left-color:#000}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner{display:none}#__vconsole .vc-logbox .vc-item .vc-fold.vc-toggle .vc-fold-outer:before{top:6px;left:0;border-top-color:#000;border-left-color:transparent}#__vconsole .vc-logbox .vc-item .vc-fold.vc-toggle .vc-fold-inner{display:block}#__vconsole .vc-logbox .vc-code-key{color:#905}#__vconsole .vc-logbox .vc-code-number{color:#0086b3}#__vconsole .vc-logbox .vc-code-string{color:#183691}#__vconsole .vc-logbox.vc-actived{display:block}#__vconsole .vc-toolbar{border-top:1px solid #d9d9d9;line-height:39px;position:absolute;left:0;right:0;bottom:0;overflow:hidden}#__vconsole .vc-toolbar .vc-tool{text-decoration:none;color:#000;width:50%;float:left;text-align:center;position:relative;-webkit-touch-callout:none}#__vconsole .vc-toolbar .vc-tool:after{content:" ";position:absolute;top:7px;bottom:7px;right:0;border-left:1px solid #d9d9d9}#__vconsole .vc-toolbar .vc-tool-last:after{border:none}#__vconsole.vc-toggle .vc-show{display:none}#__vconsole.vc-toggle .vc-mask{background:rgba(0,0,0,.6);display:block}#__vconsole.vc-toggle .vc-panel{-webkit-transform:translate(0);transform:translate(0)}', ""]) }, function(o, t) { "use strict";
        o.exports = function() {
            var o = [];
            return o.toString = function() {
                for (var o = [], t = 0; t < this.length; t++) {
                    var e = this[t];
                    e[2] ? o.push("@media " + e[2] + "{" + e[1] + "}") : o.push(e[1]) }
                return o.join("") }, o.i = function(t, e) { "string" == typeof t && (t = [
                    [null, t, ""]
                ]);
                for (var n = {}, r = 0; r < this.length; r++) {
                    var i = this[r][0]; "number" == typeof i && (n[i] = !0) }
                for (r = 0; r < t.length; r++) {
                    var c = t[r]; "number" == typeof c[0] && n[c[0]] || (e && !c[2] ? c[2] = e : e && (c[2] = "(" + c[2] + ") and (" + e + ")"), o.push(c)) } }, o } }, function(o, t, e) {
        function n(o, t) {
            for (var e = 0; e < o.length; e++) {
                var n = o[e],
                    r = p[n.id];
                if (r) { r.refs++;
                    for (var i = 0; i < r.parts.length; i++) r.parts[i](n.parts[i]);
                    for (; i < n.parts.length; i++) r.parts.push(s(n.parts[i], t)) } else {
                    for (var c = [], i = 0; i < n.parts.length; i++) c.push(s(n.parts[i], t));
                    p[n.id] = { id: n.id, refs: 1, parts: c } } } }

        function r(o) {
            for (var t = [], e = {}, n = 0; n < o.length; n++) {
                var r = o[n],
                    i = r[0],
                    c = r[1],
                    l = r[2],
                    a = r[3],
                    s = { css: c, media: l, sourceMap: a };
                e[i] ? e[i].parts.push(s) : t.push(e[i] = { id: i, parts: [s] }) }
            return t }

        function i(o, t) {
            var e = b(),
                n = _[_.length - 1];
            if ("top" === o.insertAt) n ? n.nextSibling ? e.insertBefore(t, n.nextSibling) : e.appendChild(t) : e.insertBefore(t, e.firstChild), _.push(t);
            else {
                if ("bottom" !== o.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
                e.appendChild(t) } }

        function c(o) { o.parentNode.removeChild(o);
            var t = _.indexOf(o);
            t >= 0 && _.splice(t, 1) }

        function l(o) {
            var t = document.createElement("style");
            return t.type = "text/css", i(o, t), t }

        function a(o) {
            var t = document.createElement("link");
            return t.rel = "stylesheet", i(o, t), t }

        function s(o, t) {
            var e, n, r;
            if (t.singleton) {
                var i = m++;
                e = h || (h = l(t)), n = d.bind(null, e, i, !1), r = d.bind(null, e, i, !0) } else o.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (e = a(t), n = f.bind(null, e), r = function() { c(e), e.href && URL.revokeObjectURL(e.href) }) : (e = l(t), n = v.bind(null, e), r = function() { c(e) });
            return n(o),
                function(t) {
                    if (t) {
                        if (t.css === o.css && t.media === o.media && t.sourceMap === o.sourceMap) return;
                        n(o = t) } else r() } }

        function d(o, t, e, n) {
            var r = e ? "" : n.css;
            if (o.styleSheet) o.styleSheet.cssText = y(t, r);
            else {
                var i = document.createTextNode(r),
                    c = o.childNodes;
                c[t] && o.removeChild(c[t]), c.length ? o.insertBefore(i, c[t]) : o.appendChild(i) } }

        function v(o, t) {
            var e = t.css,
                n = t.media;
            if (n && o.setAttribute("media", n), o.styleSheet) o.styleSheet.cssText = e;
            else {
                for (; o.firstChild;) o.removeChild(o.firstChild);
                o.appendChild(document.createTextNode(e)) } }

        function f(o, t) {
            var e = t.css,
                n = t.sourceMap;
            n && (e += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */");
            var r = new Blob([e], { type: "text/css" }),
                i = o.href;
            o.href = URL.createObjectURL(r), i && URL.revokeObjectURL(i) }
        var p = {},
            u = function(o) {
                var t;
                return function() {
                    return "undefined" == typeof t && (t = o.apply(this, arguments)), t } },
            g = u(function() {
                return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase()) }),
            b = u(function() {
                return document.head || document.getElementsByTagName("head")[0] }),
            h = null,
            m = 0,
            _ = [];
        o.exports = function(o, t) { t = t || {}, "undefined" == typeof t.singleton && (t.singleton = g()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
            var e = r(o);
            return n(e, t),
                function(o) {
                    for (var i = [], c = 0; c < e.length; c++) {
                        var l = e[c],
                            a = p[l.id];
                        a.refs--, i.push(a) }
                    if (o) {
                        var s = r(o);
                        n(s, t) }
                    for (var c = 0; c < i.length; c++) {
                        var a = i[c];
                        if (0 === a.refs) {
                            for (var d = 0; d < a.parts.length; d++) a.parts[d]();
                            delete p[a.id] } } } };
        var y = function() {
            var o = [];
            return function(t, e) {
                return o[t] = e, o.filter(Boolean).join("\n") } }() }, function(o, t) { o.exports = '<div id=__vconsole class=""> <a class=vc-jump href="javascript:;">Eruda</a> <div class=vc-refresh>Refresh</div> <div class=vc-show>Console</div> <div class=vc-mask> </div> <div class=vc-panel> <div class=vc-tabbar> <a class="vc-tab vc-actived" data-tab=default id=__vc_tab_default>Log</a> <a class=vc-tab data-tab=system id=__vc_tab_system>System</a> <a class=vc-tab data-tab=network id=__vc_tab_network>Network</a> </div> <div class=vc-content> <div class="vc-logbox vc-actived" id=__vc_log_default> <div class=vc-log></div> </div> <div class=vc-logbox id=__vc_log_system> <div class=vc-log></div> </div> <div class=vc-logbox id=__vc_log_network> <div class=vc-log></div> </div> </div> <div class=vc-toolbar> <a class="vc-tool vc-clear">Clear</a> <a class="vc-tool vc-tool-last vc-hide">Hide</a> </div> </div> </div>' }, function(o, t) { o.exports = "<span class=vc-fold> <i class=vc-fold-outer>{outer}</i> <pre class=vc-fold-inner>{inner}</pre> </span>" }]) });
