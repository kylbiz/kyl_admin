// var WechatAPI = Meteor.npmRequire('wechat-api');
// var Fiber = Npm.require('fibers');

// var api = new WechatAPI('wx8bd4746c11f87c76', '7119516f3a1ef641874d679e0c52053a' );


// Meteor.methods({
//   searchOrders: function(){
//     //var api = new WechatAPI(appId, appSecret);
//     console.log('searchOrders')
//     api.getOrdersByStatus(function (err, data, res){
//       if (!err){
//         if (data.errcode == 0){
//           var Fiber = Npm.require('fibers');
//           Fiber(function () {
//             for(i=0;i<data.order_list.length;i++){
//               //保存订单
//               var data_order_list = data.order_list[i];
//               if (data_order_list) {
//               //console.log(data_order_list.order_id)
              
//                 //console.log(data_order_list.order_id)
//                   Orders.upsert({
//                     order_id: data_order_list.order_id
//                   },{
//                     $set: {
//                       host: 'KYLWECHAT',
//                       order_id: data_order_list.order_id,
//                       order_status: data_order_list.order_status,
//                       order_total_price: data_order_list.order_total_price,
//                       order_create_time: data_order_list.order_create_time,
//                       order_express_price: data_order_list.order_express_price,
//                       order_create_time: data_order_list.order_create_time,
//                       buyer_openid: data_order_list.buyer_openid,
//                       buyer_nick: data_order_list.buyer_nick,
//                       receiver_name: data_order_list.receiver_name,
//                       receiver_province: data_order_list.receiver_province,
//                       receiver_city: data_order_list.receiver_city,
//                       receiver_address: data_order_list.receiver_address,
//                       receiver_mobile: data_order_list.receiver_mobile,
//                       receiver_phone: data_order_list.receiver_phone,
//                       product_id: data_order_list.product_id,
//                       product_name: data_order_list.product_name,
//                       product_price: data_order_list.product_price,
//                       product_name: data_order_list.product_name,
//                       product_sku: data_order_list.product_sku,
//                       product_count: data_order_list.product_count,
//                       product_img: data_order_list.product_img,
//                       delivery_id: data_order_list.delivery_id,
//                       delivery_company: data_order_list.delivery_company,
//                       trans_id: data_order_list.trans_id,
//                       receiver_zone: data_order_list.receiver_zone,
//                       updateTime: new Date()
//                     }
                    
//                   });
              
//               }
//             }
//           }).run();
//         }
//       }
//     })
//     return '100';
//   }
// })


