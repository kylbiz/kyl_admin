/*
 * 本文件中函数用于修复一些之前系统中的问题
**/



/*
 * 在订单中添加支付渠道自身的订单号（从之前的payLogs中取）
**/
function orderAddPayInfo() {

}

/*
 * host的信息有误
 *
 **/
function fixHostError() {
console.log("fixHostError");
  var count = 0;
  Orders.find({
    payed: true, host: {$in: ["KYLWX", "KYLWAP"]}
  }, {fields: {host: 1, openid: 1}}).forEach(function (order) {

    var paylog = PayLogs.findOne({openid: order.openid});
    var host = order.host;

    var updateOrder = false;
    if (paylog.paySuccessInfo && host == "KYLWX") {
      updateOrder = Orders.update({openid: order.openid}, {$set: {host: "KYLWAP"} });
    } else if (paylog.wxpayInfos && host == "KYLWAP") {
      updateOrder = Orders.update({openid: order.openid}, {$set: {host: "KYLWX"} });
    }

    if (updateOrder) {
      count += 1;
      console.log("updateOrder: ", updateOrder, " count:", count);
    }
  });
}



Meteor.startup(function(){
  // fixHostError();
});
