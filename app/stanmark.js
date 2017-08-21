var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');

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

function setJson() {
    fs.readFile(url, function (error, body) {
        var $ = cheerio.load(body);
        $("#J_article").children('.list').each(function (index) {
            var $p = $(this).children('p');
            var _txt = $p.eq(0).text();
            var _obj = {};
            _obj.id = index + 1;
            _obj.name = _txt;
            _obj.image = $p.eq(1).children('img').attr('src');
            provinceArray.push(_obj);
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
        // var _landscape = 'api/stanmark/landscape.json';
        // fs.writeFile(_landscape, JSON.stringify(landscapeArray), function (err) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log(_landscape + ' create success!');
        // });
        // var _food = 'api/stanmark/food.json';
        // fs.writeFile(_province, JSON.stringify(foodArray), function (err) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log(_food + ' create success!');
        // });
        // var _specialty = 'api/stanmark/specialty.json';
        // fs.writeFile(_specialty, JSON.stringify(specialtyArray), function (err) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log(_specialty + ' create success!');
        // });
        // var _people = 'api/stanmark/people.json';
        // fs.writeFile(_people, JSON.stringify(peopleArray), function (err) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log(_people + ' create success!');
        // });
        // var _other = 'api/stanmark/other.json';
        // fs.writeFile(_other, JSON.stringify(listArray), function (err) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log(_other + ' create success!');
        // });
    });
}

/**
 * 手机区号
 */
module.exports = {
    setJson: setJson
}