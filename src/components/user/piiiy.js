"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
	-重要结论
	原生端和js端的方法是相反的
	当原生端使用registerHandler注册事件后,js端需要使用callHandler来调用方法
	当js端使用registerHandler注册事件后,原生端需要使用callHandler来注册方法
	ios和Android初始化webview的方式不同
*/
module.exports = (_temp = _class = function () {
	function WeiChatWebView() {
		var _this = this;

		_classCallCheck(this, WeiChatWebView);

		this.ready = function (AfterReadyFn) {
			if (!_this.isWebView) {
				window.onload = function () {
					AfterReadyFn();
				};
			}
			if (_this.isAndroid) {
				//webview为安卓的情况
				if (window.WebViewJavascriptBridge) {
					WeiChatWebView.initWebViewJavascriptBridge();
					AfterReadyFn(window.WebViewJavascriptBridge);
				} else {
					document.addEventListener("WebViewJavascriptBridgeReady", function () {
						WeiChatWebView.initWebViewJavascriptBridge();
						AfterReadyFn(window.WebViewJavascriptBridge);
					}, false);
				}
			}
			if (_this.isIOS) {
				//webview为IOS的情况
				if (window.WebViewJavascriptBridge) {
					AfterReadyFn(window.WebViewJavascriptBridge);
					return false;
				}
				if (window.WVJBCallbacks) {
					window.WVJBCallbacks.push(AfterReadyFn);
					return false;
				}
				//以上两者都不存在的情况下使用iframe
				window.WVJBCallbacks = [AfterReadyFn];
				var WVJBIframe = document.createElement("iframe");
				WVJBIframe.style.display = "none";
				WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
				document.documentElement.appendChild(WVJBIframe);
				setTimeout(function () {
					document.documentElement.removeChild(WVJBIframe);
				}, 0);
			}
		};

		this.on = function (handleName, handleFunction) {
			if (!window.WebViewJavascriptBridge) {
				return false;
			}
			window.WebViewJavascriptBridge.registerHandler(handleName, function (data, responseCallback) {
				handleFunction(data);
				if (responseCallback) {
					responseCallback("数据交接完成");
				}
			});
		};

		this.emit = function (handleName, param, callback) {
			if (!window.WebViewJavascriptBridge) {
				return false;
			}
			window.WebViewJavascriptBridge.callHandler(handleName, param, function (responseData) {
				if (callback) {
					callback(responseData);
				}
			});
		};

		this._ua = window.navigator.userAgent.toLowerCase();
	}

	_createClass(WeiChatWebView, [{
		key: "isWebView",
		get: function get() {
			//console.log(ua);
			if (this._ua.match("com.jzker.weiliao.android")) {
				return true;
			}
			if (this._ua.match("com.jzker.weiliao.ios")) {
				return true;
			}
			return false;
		}
	}, {
		key: "isIOS",
		get: function get() {
			if (this._ua.match("com.jzker.weiliao.ios")) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "isAndroid",
		get: function get() {
			if (this._ua.match("com.jzker.weiliao.android")) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "WebViewType",
		get: function get() {
			if (this._ua.match("com.jzker.weiliao.ios")) {
				return "ios";
			}
			if (this._ua.match("com.jzker.weiliao.android")) {
				return "android";
			}
			return "other";
		}
	}]);

	return WeiChatWebView;
}(), _class.initWebViewJavascriptBridge = function () {
	window.WebViewJavascriptBridge.init(function (message, responseCallback) {
		if (responseCallback) {
			responseCallback({ "Javascript Responds": "测试中文!" });
		}
	});
	window.localStorage.clear();
}, _temp);
