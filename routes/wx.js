Router.route('/list/wxorderlists', {
  "name": "wxorderlists",
  waitOn: function() {
    return Meteor.subscribe("getwxorders");
  }, 
  data: function() {
    var wxorders = Orders.find({host: 'KYLWECHAT'});
    return {
      wxorders: wxorders
    }
  }
});

Router.route('/wxorder/:orderId', {
  name: 'wxorderdetail',
  waitOn: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('getwxorder', orderId);
  }, 
  data: function() {
    var orderId = this.params.orderId;
    var order = Orders.findOne({host: 'KYLWECHAT', order_id: orderId});
    return {
      order: order
    }
  }
})


