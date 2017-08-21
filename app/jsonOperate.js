/**
 * json 操作
 */
var fs = require('fs');
var path = require('path');
/**
 * json operate
 * @param url
 */
var jsonOperate = function (url) {
    this.url = url;
    this.data = null;
    this.select();
}
jsonOperate.prototype = {
    select: function (json) {
        var _this = this;
        var _data = _this.read();
        if (_data) {
            if (json == undefined) {
                _this.data = _data;
            }
            else {
                if (_this.isArray(_data)) {
                    _this.data = _this.operate(_data, json, 1);
                }
                else if (_this.isObject(_data)) {
                    if (typeof json === 'string') {
                        _this.data = _data[json];
                    }
                }
            }
        }
        return _this;
    },
    insert: function (json) {
        var _this = this;
        if (_this.data && typeof _this.data === 'object') {
            if (_this.isArray(_this.data)) {
                if (_this.operate(_this.data, json, 1).length == 0) {
                    _this.data.push(json);
                }
            }
            else {
                for (key in json) {
                    _this.data[key] = json[key];
                }
            }
        }
        else {
            if (_this.operate(_this.data, json, 1).length == 0) {
                _this.data.push(json);
            }
        }
        _this.write();
        return _this;
    },
    update: function (json) {

    },
    delete: function (json) {
        var _this = this;
        var _data = _this.operate(_this.data, json, 3);
        if (_data.length !== _this.data.length) {
            _this.data = _data;
            _this.write();
        }
    },
    /**
     * array object operate
     * @param array
     * @param obj
     * @param type 1:select;2:update;3:delete;
     */
    operate: function (array, obj, type) {
        var _arr = [];
        for (var i = 0; i < array.length; i++) {
            var _obj = array[i];
            for (key in _obj) {
                // 单个id值
                if (typeof obj === 'number') {
                    if (_obj['id'] === obj) {
                        if (type == 1) {
                            _arr.push(_obj);
                        }
                        else if (type == 3) {
                            array.splice(i, 1);
                            return array;
                        }
                        break;
                    }
                    else {
                        if (type == 3) {
                            return array;
                        }
                    }
                }
                // 有id值
                else if (obj.id) {
                    if (_obj[key] == obj[key]) {
                        if (type == 1) {
                            _arr.push(_obj);
                        }
                        break;
                    }
                }
                else {
                    if (_obj[key].indexOf(obj[key]) > -1) {
                        if (type == 1) {
                            _arr.push(_obj);
                        }
                        break;
                    }
                }
            }
        }
        return _arr;
    },
    read: function () {
        return JSON.parse(fs.readFileSync(this.url));
    },
    write: function () {
        fs.writeFileSync(this.url, JSON.stringify(this.data));
    },
    isArray: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isObject: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
}
module.exports = jsonOperate;