
// var orderlistsOptions = {
//   columns: [
//   {
//     title: '订单编号',
//     data: 'order_id', 
//     className: 'orderId'
//   },
//   {
//     title: '订单状态', 
//     data: 'order_statusL'
//   },
//   {
//     title: '产品',
//     data: 'product_name'
//   },
//   {
//     title: '产品价格（元）',
//     data: 'product_priceL'
//   },
//   {
//     title: '下单时间',
//     data: 'order_create_timeL'
//   },
//   {
//     title: '更新时间',
//     data: 'order_update_time'
//   }, 
//   {
//     'title': '详细信息', 
//     className: 'handle', 
//     render: function(cellData, renderType, currentRow) {
//       var html = "<a href='/wxorder/" + currentRow.order_id  + "'><button type='button' class='btn btn-primary'>详细信息</button></a>"
//       return html;
//     }
//   }   
//   ],
//   pageLength: 10,
//   lengthMenu: [10, 15, 20,25, 50]  
// }



// var reactiveFun = function () { 
//   return Orders.find({host: 'KYLWECHAT'}).fetch(); 
// };



// Template.wechatorderlistsTpl.helpers({
//   orderlistData: function () {
//     return reactiveFun;
//   },
//   optionsObject: orderlistsOptions 
// });



// Template.wxorderlists.events({
//   "click .getwxorders": function(event) {
//     Meteor.call("searchOrders");
//   }
// });



