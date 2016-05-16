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
    var orderId = info.orderId;
    var openid = info.openid;
    var payChannel = {'KYLPC': 'PC端支付宝', 'KYLWAP': '移动端支付宝', 'KYLWX': '微信'}[info.host];

    var payLog = PayLogs.findOne({openid: openid}) || {};
    var channelPayOrder = {
      'KYLPC': function () {
        var payInfos = payLog.payInfos || {};
        if (!payInfos.messageDetail) {
          // console.log('payLog', host, openid, payInfos);
          return "未知";
        }
        return payInfos.messageDetail.trade_no || '未知';
      },
      'KYLWX': function () {
        var wxpayInfos = payLog.wxpayInfos || payLog.paySuccessInfo || {};
        return wxpayInfos.transaction_id || wxpayInfos.transaction_no || '未知';
      },
      'KYLWAP': function () {
        var paySuccessInfo = payLog.paySuccessInfo || {};
        return paySuccessInfo.transaction_no || '未知';
      }
    }[info.host]() || "未知";


    // var openid = PayLogs
    jsonInfo.push({"支付渠道": payChannel, "订单编号": orderId, '支付渠道方单号': channelPayOrder});
  });

  var pathBasic = process.env.PWD + '/server/fix/';

  outPutJsonFile(jsonInfo, pathBasic + "out.json");
};

function outPutJsonFile(jsonData, filePath) {
  var fs = Npm.require('fs');
  fs.writeFileSync(filePath, JSON.stringify(jsonData));
}


Meteor.startup(function(){
  // outPutOrder(new Date(1459488133856), new Date(1461924605798)); // 四月份的订单数据
});








