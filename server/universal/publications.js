Meteor.publish('getAllOrders', function(dataLimit, dataFilter) {
  dataLimit = dataLimit || {};
  page = dataLimit.page || 1;
  num = dataLimit.num || 10;

  dataFilter = dataFilter || {};
  dataFilter.payed = true;

  var user = Meteor.users.findOne({_id: this.userId});
  if (!Roles.userIsInRole(user, ['manageusers'])) {
    var userNameLists = /15618871296|18521595051|15026444506|13701673465|13524861250|13916175286|15921239366|13585955409|150000852940/;
    var users = Meteor.users.find({
      username: userNameLists
    }, {
      fields: {
        username: 1,
        _id: 1
      }
    }).fetch();

    var userIdLists = [];
    for(var i = 0; i < users.length; i++) {
      userIdLists.push(users[i]._id);
    }
    dataFilter.userId = {$nin: userIdLists};
  }

  var orderInfo = Orders.find(dataFilter, {
    sort: {payedTime: -1},
    limit: num || 20,
    skip: (page - 1) * num,
    fields: {openid: 1}
  });

  var openidList = [];
  orderInfo.forEach(function (order) {
    if (order.openid) {
      openidList.push(order.openid);
    }
  });

  return [
    Orders.find(dataFilter, {
      sort: {payedTime: -1},
      limit: num || 20,
      skip: (page - 1) * num
    }),
    PayLogs.find(
      { openid: {$in: openidList || []} },
      {
        fields: {openid: 1, payInfos: 1, wxpayInfos: 1, paySuccessInfo: 1}
      }
    )
  ];
})


Meteor.publish('getOrderTypeLists', function(typeNameFlag) {
  var user = Meteor.users.findOne({_id: this.userId});

  if (!Roles.userIsInRole(user, ['manageusers'])) {
    var userNameLists = /15618871296|18521595051|15026444506|13701673465|13524861250|13916175286|15921239366|13585955409|150000852940/;
    var users = Meteor.users.find({
      username: userNameLists
    }, {
      fields: {
        username: 1,
        _id: 1
      }
    }).fetch();

    var userIdLists = [];
    // var length = user.count();
    for(var i = 0; i < users.length; i++) {
      userIdLists.push(users[i]._id);
    }
    var orders =  Orders.find({
      typeNameFlag: typeNameFlag,
      host: /KYLPC|KYLWX|KYLWAP/,
      'userId': {
        $nin: userIdLists
      }
    }, {
      sort: {orderId: -1}
    });
    return orders;
  } else {
    return Orders.find({
      typeNameFlag: typeNameFlag,
      host: /KYLPC|KYLWX|KYLWAP/
    }, {
      sort: {orderId: -1}
    });
  }

  // return Orders.find({typeNameFlag: typeNameFlag, host: /KYLPC|KYLWX|KYLWAP/});
})

Meteor.publish('getUser', function(userId) {
  return User.find({_id: userId});
})

Meteor.publish('registrationLists', function() {
  return RegistrationLists.find();
})

Meteor.publish('orderInformation', function(orderId) {
  return Orders.find({orderId: orderId});
})

Meteor.publish('getUserOrderInfo', function(userId) {
  return Orders.find({userId: userId});
})

Meteor.publish('getBusinessTypeLists', function() {
  return BusinessTypeLists.find({});
})

Meteor.publish('getIndustrySmall', function(industryBig) {
  industryBig = industryBig || "";
  return Business.find({industryBig: industryBig});
})

Meteor.publish('IndustryLists', function() {
  return Business1.find({});
});

Meteor.publish("getwxorders", function() {
  return Orders.find({
    host: 'KYLWECHAT'
  }, {
    fields: {
      order_id: 1,
      order_status: 1,
      product_name: 1,
      product_price: 1,
      order_create_time: 1,
      updateTime: 1,
      host: 1
    }
  });
})

Meteor.publish("getwxorder", function(order_id) {
  return Orders.find({host: 'KYLWECHAT', order_id: order_id});
})

// Meteor.publish("getyzorders", function() {
//   return Orders.find({
//     host: 'KYLYZ'
//   }, {
//     fields: {
//       tid: 1,
//       title: 1,
//       status: 1,
//       num: 1,
//       type: 1,
//       price: 1,
//       buyer_nick: 1,
//       pay_time: 1,
//       host: 1
//     }
//   });
// })

// Meteor.publish("yzorder", function(tid) {
//   return Orders.find({host: 'KYLYZ', orderId: tid});
// })


//---------------------------------------------------------

Meteor.publish("customers", function () {
  var user = Meteor.users.findOne({_id: this.userId});

  if (Roles.userIsInRole(user, ['admin'])) {
    var users = Roles.getUsersInRole('customer', '',{fields: {emails: 1, profile: 1, roles: 1, createdAt: 1, username: 1}});
    // var users = Meteor.users.find({"roles": {$all: ["customer"]}})
    return users;
  }

  this.stop();
  return;
});


Meteor.publish("getCustomer", function(userId) {
  var user = Meteor.users.findOne({_id: this.userId});

  if (Roles.userIsInRole(user, ['admin'])) {
    var users = Meteor.users.find({_id: userId});
    return users;
  }

  this.stop();
  return;
})



Meteor.publish("admins", function () {
  var user = Meteor.users.findOne({_id: this.userId});

  if (Roles.userIsInRole(user, ['manageusers'])) {
    var users = Roles.getUsersInRole('admin', '',{fields: {emails: 1, profile: 1, roles: 1, createdAt: 1, username: 1}});
    return users;
  }

  this.stop();
  return;
});


Meteor.publish('GetHandleResults', function(uuid) {
  return HandleResults.find({uuid: uuid});
})

Meteor.publish('getDocNum', function(userId) {
  return DocNum.find({userId: userId});
})

// 获取微信小店的数据
Meteor.publish('getWxShopInfo', function (cond) {
  var userId = this.userId;
  if (userId && Roles.userIsInRole(userId, ['editgoods'])) {
    cond = cond || {};
    return WeChatShopGoods.find(cond);
  } else {
    this.stop();
    return;
  }
})



