
// var app_id = '732e59d55034eee6fa'; //有赞 app_id
// var app_secert = 'b5735d3f0c2619490ad767a93a6f49c2'; // 有赞 app_secert

// var getyzordermethods = 'kdt.trades.sold.get';
// var format = 'json';
// var v = '1.0';
// var sign_method = 'md5';
// var baseurl = 'https://open.koudaitong.com/api/entry';


// //---------------------------------------------------
// /**
//  *  log function
//  *  @param  anything that needs to log
//  */
//  function log(info) {
//   console.log('------------------------------');
//   var length = arguments.length;
//   for(var i = 0; i < length; i++) {
//     console.log(arguments[i]);
//   }
// }

// //---------------------------------------------------
// /**
//  * get yz orders from youzan
//  */
//  Meteor.methods({
//   "SearchYZOrders": function() {
//     var date = new Date();
//     var timestamp = moment(date).format("YYYY-MM-DD HH:mm:ss");

//     var paramsStr = app_secert 
//     + 'app_id' + app_id 
//     + 'format' + format 
//     + 'method' + getyzordermethods
//     + 'sign_method' + sign_method
//     + 'timestamp' + timestamp
//     + 'v' + v 
//     + app_secert;

//     var sign = CryptoJS.MD5(paramsStr).toString();
//     var options = {
//       params: {
//         sign: sign,
//         timestamp: timestamp,
//         v: v,
//         app_id: app_id,
//         method: getyzordermethods,
//         sign_method: sign_method,
//         format: format
//       }
//     };

//     HTTP.call("GET", baseurl, options, function(err, result) {
//       if(err) {
//         log("get youzan orders error");
//       } else {
//         var content = JSON.parse(result.content);
//         var trades = content.response.trades;
//         trades.forEach(function(trade) {
//           trade.host = 'KYLYZ';
//           trade.updateTime = new Date();
//           Orders.upsert({
//             tid: trade.tid
//           }, {
//             $set: trade
//           }, function(err) {
//             if(err) {
//               log("save youzan orders error", err);
//             } else {
//               log("save youzan orders succeed");
//             }
//           })
//         })
//       }
//     });
//   }
// })


// //---------------------------------------------------








