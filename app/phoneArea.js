var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var listArray = [];
var url = 'https://reg.taobao.com/member/reg/h5/fill_mobile.htm';

function getPhoneArea() {
    request.get(url, function (error, response, body) {
        var $ = cheerio.load(body);
        $("#mySelect").children('option').each(function () {
            var $this = $(this);
            var _obj = {};
            _obj.code = $this.attr('data-code');
            _obj.name = $this.text().replace(' ', '').replace($this.attr('data-code'), '').replace('(', '').replace(')', '').replace(' ', '').replace('+', '');
            listArray.push(_obj);
        });
        listArray.sort(function (a, b) {
            if (a.code > b.code) {
                return 1;
            }
            else if (a.code < b.code) {
                return -1;
            }
            else {
                return 0;
            }
        });
        var _path = 'api/phoneArea.json';
        fs.exists(_path, function (exists) {
            if (exists) {
                fs.unlink(_path);
            }
            fs.writeFile(_path, JSON.stringify(listArray), function (err) {
                if (err) {
                    console.log(err);
                }
                console.log(_path + ' create success!');
            });
        });
    });
}

/**
 * 手机区号
 */
module.exports = {
    getPhoneArea: getPhoneArea
}