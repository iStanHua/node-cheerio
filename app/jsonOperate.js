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
                    _this.data = _this._select(_data, json);
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
                if (_this._select(_this.data, json).length == 0) {
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
            if (_this._select(_this.data, json).length == 0) {
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
        _this._delete(_this.data, json);
        _this.write();
    },
    /**
     * select
     * @param array
     * @param obj
     */
    _select: function (array, obj) {
        var _arr = [];
        for (var i = 0; i < array.length; i++) {
            var _obj = array[i];
            for (key in _obj) {
                // 单个id值
                if (typeof obj === 'number') {
                    if (_obj['id'] === obj) {
                        _arr.push(_obj);
                        _obj = {};
                        break;
                    }
                }
                // 有id值
                else if (obj.id) {
                    if (_obj[key] == obj[key]) {
                        _arr.push(_obj);
                        _obj = {};
                        break;
                    }
                }
                else {
                    for (k in obj) {
                        console.log(k);
                        if (_obj[k].indexOf(obj[k]) > -1) {
                            _arr.push(_obj);
                            break;
                        }
                    }
                }
            }
        }
        return _arr;
    },
    /**
     * update
     * @param array
     * @param obj
     * @param type 1:select;2:update;3:delete;
     */
    _update: function (array, obj, type) {
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

    /**
     * delete
     * @param array
     * @param obj
     */
    _delete: function (array, obj) {
        for (var i = 0; i < array.length; i++) {
            var _obj = array[i];
            for (key in _obj) {
                // 单个id值
                if (typeof obj === 'number') {
                    if (_obj['id'] === obj) {
                        array.splice(i, 1);
                    }
                    break;
                }
                // 有id值
                else if (obj.id) {
                    if (_obj[key] == obj[key]) {
                        array.splice(i, 1);
                        break;
                    }
                }
                else {
                    for (k in obj) {
                        if (_obj[k].indexOf(obj[k]) > -1) {
                            array.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }
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