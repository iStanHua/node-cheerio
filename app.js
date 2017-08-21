// var phoneArea = require("./app/phoneArea");
// /**
//  * 手机区号
//  */
// phoneArea.getPhoneArea();

// var stanmark = require("./app/stanmark");
// stanmark.setJson();

var jsonOperate = require("./app/jsonOperate");
// var _json = new jsonOperate('api/index.json');
var _json = new jsonOperate('api/stanmark/province.json');
// _json.insert({ id: 35, name: '海外', image: '' });
_json.delete(2);