// var orderlistsOptions = {
//   columns: [
//   {
//     title: '订单编号',
//     data: 'tid'
//   },
//   {
//     title: '产品名称', 
//     data: 'title'
//   },
//   {
//     title: '购买数量',
//     data: 'yzProductNum'
//   },
//   {
//     title: '产品价格（元）',
//     data: 'price'
//   },
//   {
//     title: '买家昵称',
//     data: 'buyer_nick'
//   },
//   {
//     title: '交易状态',
//     data: 'yzorderstatus'
//   },
//   {
//     title: '买家付款时间',
//     data: 'pay_time'
//   },
//   {
//     'title': '详细信息', 
//     className: 'handle', 
//     render: function(cellData, renderType, currentRow) {
//       var html = "<a href='/yzorder/" + currentRow.tid  + "'><button type='button' class='btn btn-primary'>详细信息</button></a>"
//       return html;
//     }
//   }   
//   ],
//   pageLength: 10,
//   lengthMenu: [10, 15, 20,25, 50]  
// }



// var reactiveFun = function () { 
//   return Orders.find({host: 'KYLYZ'}).fetch(); 
// };



// Template.yxorder.helpers({
//   orderlistData: function () {
//     return reactiveFun;
//   },
//   optionsObject: orderlistsOptions 
// });


// Template.yzorderlists.events({
//   "click .getyzorders": function(event) {
//     Meteor.call("SearchYZOrders")
//   }
// });





