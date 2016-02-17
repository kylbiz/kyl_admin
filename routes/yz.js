// Router.route('/list/yzorderlists', {
//   name: 'yzorderlists',
//   waitOn: function() {
//     return Meteor.subscribe('getyzorders');
//   },
//   data: function() {
//     var yzorders = Orders.find({host: 'KYLYZ'});
//     return {
//       yzorders: yzorders
//     }
//   }
// });


// Router.route('/yzorder/:tid', {
//   name: 'yzorderdetail',
//   waitOn: function() {
//     var tid = this.params.tid || "";
//     return Meteor.subscribe('yzorder', tid);
//   },
//   data: function() {
//     var tid = this.params.tid;
//     var order = Orders.findOne({host: 'KYLYZ', tid: tid});
//     return {
//       order: order
//     }
//   }
// })





