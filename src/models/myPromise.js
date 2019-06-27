"use strict";
exports.__esModule = true;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var CustomPromise = /** @class */ (function () {
    function CustomPromise(action) {
        this.state = "pending";
        this.value = undefined;
        this.thenCallbacks = [];
        this.onFinally = undefined;
        this.onCatch = undefined;
        action(this.resolver, this.rejector);
    }
    CustomPromise.prototype.then = function (callback) {
        this.thenCallbacks.push(callback);
        return this;
    };
    CustomPromise.prototype["catch"] = function (callback) {
        this.onCatch = callback;
        return this;
    };
    CustomPromise.prototype["finally"] = function (callback) {
        this.onFinally = callback;
        return this;
    };
    CustomPromise.prototype.resolver = function (value) {
        var _this = this;
        this.state = 'resolved';
        this.value = value;
        this.thenCallbacks.forEach(function (func) {
            func(_this.value);
        }, this);
        if (typeof this.onFinally === 'function') {
            this.onFinally(this.value);
        }
    };
    CustomPromise.prototype.rejector = function (value) {
        this.state = 'rejected';
        this.value = value;
        if (typeof this.onCatch === 'function') {
            this.onCatch(this.value);
        }
        if (typeof this.onFinally === 'function') {
            this.onFinally(this.value);
        }
    };
    return CustomPromise;
}());
exports.CustomPromise = CustomPromise;
function get(url) {
    return new CustomPromise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function () {
            if (request.status === 200) {
                resolve(request.responseText);
            }
            else {
                reject(Error(request.statusText));
            }
        };
        request.onerror = function () {
            reject(Error('Network Error'));
        };
        request.send();
    });
}
get('https://nerboda.github.io1') //https://darms.service-now.com/nav_to.do?uri=%2Fhome.do
    .then(function (response) {
    console.log('response', response);
}).then(function (response) { return console.log('second', response); })["catch"](function (error) { return console.log('error', error); })["finally"](function (result) { return console.log('finally', result); });
