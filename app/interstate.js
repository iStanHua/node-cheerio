
var fs = require('fs');
var path = require('path');

var Locations = require('../files/t');
var listArray = [];

function getListData() {
    var _id = 0;
    for (var i = 0; i < Locations.length; i++) {
        _id += (i + 1);
        var _time = (new Date()).getTime();
        var _pa = Locations[i];
        var _ppid = _id;
        var _interstate = {};
        _interstate.id = _id;
        _interstate.name = _pa.Name;
        _interstate.lat = '';
        _interstate.lon = '';
        _interstate.parentId = 0;
        listArray.push(_interstate);

        var _cou = _pa.Countries;
        for (var y = 0; y < _cou.length; y++) {
            _id += (y + 1);
            var _ele = _cou[y];
            var _pid = _id;
            _interstate = {};
            _interstate.id = _pid;
            _interstate.name = _ele.Name;
            _interstate.lat = '';
            _interstate.lon = '';
            _interstate.parentId = _ppid;
            listArray.push(_interstate);

            var _po = _ele.PoiList;
            for (var k = 0; k < _po.length; k++) {
                _id += (k + 1);
                var _el = _po[k];

                _interstate = {};
                _interstate.id = _id;
                _interstate.name = _el.Name;
                _interstate.lat = _el.lat;
                _interstate.lon = _el.lon;
                _interstate.parentId = _pid;
                listArray.push(_interstate);
            }
        }
    }
    var _path = 'api/interstate.json';
    fs.writeFile(_path, JSON.stringify(listArray), function (err) {
        if (err) {
            console.log(err);
        }
        console.log(_path + ' create success!');
    });
}

/**
 * 手机区号
 */
module.exports = {
    getLocations: getListData
}