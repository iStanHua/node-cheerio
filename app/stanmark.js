var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');

var stanmark = [];
var stanmarkObj = {};

// 省份
var provinceArray = [];
// 景观
var landscapeArray = [];
// 美食
var foodArray = [];
// 特产
var specialtyArray = [];
// 人物
var peopleArray = [];
// 其它
var listArray = [];

var url = 'files/stanmark.txt';
var _landscapeId = 1;
var _foodId = 1;
var _specialtyId = 1;
var _peopleId = 1;
var _listId = 1;

function setJson() {
    fs.readFile(url, function (error, body) {
        var $ = cheerio.load(body);
        $("#J_article").children('.list').each(function (index) {
            stanmarkObj = {};
            var $p = $(this).children('p');
            var _txt = $p.eq(0).text();
            var _obj = {};
            var pid = index + 1;
            _obj.id = pid;
            _obj.name = _txt;
            _obj.image = $p.eq(1).children('img').attr('src');
            provinceArray.push(_obj);
            _arr = [];

            stanmarkObj = _obj;
            var stanArray = [];

            _txt = $p.eq(3).text();
            _arr = _txt.split('、');
            for (var i = 0; i < _arr.length; i++) {
                _obj = {};
                _obj.id = _landscapeId;
                _obj.name = _arr[i];
                // _obj.image = '';
                // _obj.desc = '';
                // _obj.pid = pid;
                landscapeArray.push(_obj);
                _landscapeId++;

                stanArray.push(_obj);
            }
            _arr = [];

            stanmarkObj.landscape = stanArray;
            stanArray = [];

            _txt = $p.eq(5).text();
            _arr = _txt.split('、');
            for (var i = 0; i < _arr.length; i++) {
                _obj = {};
                _obj.id = _foodId;
                _obj.name = _arr[i];
                // _obj.image = '';
                // _obj.desc = '';
                // _obj.pid = pid;
                foodArray.push(_obj);
                _foodId++;

                stanArray.push(_obj);
            }
            _arr = [];

            stanmarkObj.food = stanArray;
            stanArray = [];

            _txt = $p.eq(7).text();
            _arr = _txt.split('、');
            for (var i = 0; i < _arr.length; i++) {
                _obj = {};
                _obj.id = _specialtyId;
                _obj.name = _arr[i];
                // _obj.image = '';
                // _obj.desc = '';
                // _obj.pid = pid;
                specialtyArray.push(_obj);
                _specialtyId++;
                
                stanArray.push(_obj);
            }
            _arr = [];

            stanmarkObj.specialty = stanArray;
            stanArray = [];

            _txt = $p.eq(9).text();
            _arr = _txt.split('、');
            for (var i = 0; i < _arr.length; i++) {
                _obj = {};
                _obj.id = _peopleId;
                _obj.name = _arr[i];
                // _obj.image = '';
                // _obj.desc = '';
                // _obj.pid = pid;
                peopleArray.push(_obj);
                _peopleId++;
                
                stanArray.push(_obj);
            }
            _arr = [];

            stanmarkObj.people = stanArray;
            stanArray = [];

            _txt = $p.eq(11).text();
            _arr = _txt.split('、');
            for (var i = 0; i < _arr.length; i++) {
                _obj = {};
                _obj.id = _listId;
                _obj.name = _arr[i];
                // _obj.image = '';
                // _obj.desc = '';
                // _obj.pid = pid;
                listArray.push(_obj);
                _listId++;
                
                stanArray.push(_obj);
            }
            _arr = [];

            stanmarkObj.other = stanArray;
            stanArray = [];

            stanmark.push(stanmarkObj);
        });

        var _province = 'api/stanmark/province.json';
        // if (!fs.exists(path.dirname(_province))) {
        //     fs.mkdir(path.dirname(_province));
        // }
        fs.writeFile(_province, JSON.stringify(provinceArray), function (err) {
            if (err) {
                console.log(err);
            }
            console.log(_province + ' create success!');
        });

        var _landscape = 'api/stanmark/landscape.json';
        fs.writeFile(_landscape, JSON.stringify(landscapeArray), function (err) {
            if (err) {
                console.log(err);
            }
            console.log(_landscape + ' create success!');
        });

        var _food = 'api/stanmark/food.json';
        fs.writeFile(_food, JSON.stringify(foodArray), function (err) {
            if (err) {
                console.log(err);
            }
            console.log(_food + ' create success!');
        });

        var _specialty = 'api/stanmark/specialty.json';
        fs.writeFile(_specialty, JSON.stringify(specialtyArray), function (err) {
            if (err) {
                console.log(err);
            }
            console.log(_specialty + ' create success!');
        });

        var _people = 'api/stanmark/people.json';
        fs.writeFile(_people, JSON.stringify(peopleArray), function (err) {
            if (err) {
                console.log(err);
            }
            console.log(_people + ' create success!');
        });

        var _other = 'api/stanmark/other.json';
        fs.writeFile(_other, JSON.stringify(listArray), function (err) {
            if (err) {
                console.log(err);
            }
            console.log(_other + ' create success!');
        });
        var _stanmark = 'api/stanmark/stanmark.json';
        fs.writeFile(_stanmark, JSON.stringify(stanmark), function (err) {
            if (err) {
                console.log(err);
            }
            console.log(_other + ' create success!');
        });
    });
}

/**
 * 手机区号
 */
module.exports = {
    setJson: setJson
}