/*
 * 一些辅助运营人员的方法
 **/


function outPutOrder(fromTime, toTime) {
  if (!fromTime || !toTime) {
    return ;
  }
  var jsonInfo = [];

  var orders = Orders.find({
    payedTime: {$lte: toTime, $gte: fromTime}, payed: true
  }, {
    sort: {payedTime: 1},
    fields: {host: 1, openid: 1, orderId: 1}
  }).forEach(function (info) {
    var payChannel = {'KYLPC': 'PC端支付宝', 'KYLWAP': '移动端支付宝', 'KYLWX': '微信'}[info.host];
    var orderId = info.orderId;
    jsonInfo.push({"支付渠道": payChannel, "订单编号": orderId});
  });

  var pathBasic = process.env.PWD + '/server/fix/';

  outPutJsonFile(jsonInfo, pathBasic + "out.json");
};

function outPutJsonFile(jsonData, filePath) {
  var fs = Npm.require('fs');
  fs.writeFileSync(filePath, JSON.stringify(jsonData));
}


Meteor.startup(function(){
  // outPutOrder(new Date(1459488133856), new Date(1461924605798));
});








