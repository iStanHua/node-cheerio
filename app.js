// var phoneArea = require("./app/phoneArea");
// /**
//  * 手机区号
//  */
// phoneArea.getPhoneArea();

// var stanmark = require("./app/stanmark");
// stanmark.setJson();

var jsonOperate = require("./app/jsonOperate");
var _json = new jsonOperate('api/index.json');
_json.insert({ id: 9, name: '避暑山庄' });
console.log(_json.select({ name: '山' }).data);
// _json.delete(2);
_json.delete({ name: '山' });