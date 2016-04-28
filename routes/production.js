//---------------------------------------------
function isInteger(value) {
  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;  
}



function handleProportion(numerator, denominator) {
  var num = numerator * 100 / denominator;
  if(isInteger(num)){
    return num + '%';
  }else {
    return num.toFixed(2) + '%';
  }
}


Router.configure({
  layoutTemplate: 'basicLayout',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  onBeforeAction: function() {
    if(!Meteor.user()) {
      Router.go('/login');
    } else {
      Router.go('/list');
      this.next();
    }
  }
});

Router.route('/login', function () {
  this.render('login');
  Router.go('/');
});

Router.route('list', {
  onBeforeAction: function() {
    if(!Meteor.user()) {
      Router.go('/login');
    } else {
      this.next();
    }
  },  
  waitOn: function() {
    var userId = Meteor.userId() || "";
    return Meteor.subscribe('getAllOrders');
  }
});

Router.route('/list/registration', {
  name: 'registrationLists',
  subscriptions: function() {
    return Meteor.subscribe('getOrderTypeLists', 'registration');
  },
  waitOn: function() {
    return Meteor.subscribe('getOrderTypeLists', 'registration');
  }
})

Router.route('/list/finance', {
  name: 'financeList',
  subscriptions: function() {
    return Meteor.subscribe('getOrderTypeLists', 'finance');
  },
  waitOn: function() {
    return Meteor.subscribe('getOrderTypeLists', 'finance');
  }
});

Router.route('/list/bank', {
  name: 'bankList',
  subscriptions: function() {
   return  Meteor.subscribe('getOrderTypeLists', 'bank');
  },  
  waitOn: function() {
   return  Meteor.subscribe('getOrderTypeLists', 'bank');
  }
});

Router.route('/list/assurance', {
  name: 'assuranceList',
  subscriptions: function() {
   return Meteor.subscribe('getOrderTypeLists', 'assurance');
  },  
  waitOn: function() {
   return Meteor.subscribe('getOrderTypeLists', 'assurance');
  }
});

Router.route('/list/bookkeeping',{
  name: 'bookkeepingList',
  subscriptions: function() {
    return Meteor.subscribe('getOrderTypeLists', 'bookkeeping');
  },  
  waitOn: function() {
   return Meteor.subscribe('getOrderTypeLists', 'bookkeeping');
  }
});

Router.route('/list/special',{
  name: 'specialList',
  subscriptions: function() {
    return Meteor.subscribe('getOrderTypeLists', 'special');
  },  
  waitOn: function() {
   return Meteor.subscribe('getOrderTypeLists', 'special');
  }
});


Router.route('/primaryList', function () {
  this.render('primaryList');
});

Router.route('/registration/:orderId', {
  name: 'registrationView',
  subscriptions: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('orderInformation', orderId);
  },
  waitOn: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('orderInformation', orderId);
  },
  data: function() {
    var orderId = this.params.orderId;
    Session.set('orderId', orderId);
    var order = Orders.findOne({orderId: orderId});
    if(order && order.holders){
      var holders = order.holders;
      var moneyAmount = 0;
      holders.forEach(function(holder) {
        if(typeof(holder.money === 'string')) {
          holder.money = parseInt(holder.money);
        }
        moneyAmount += holder.money;
      });
      var length = holders.length;
      if(moneyAmount > 0) {
        for(var i = 0; i < length; i++) {
          var percentage = handleProportion(parseInt(holders[i].money), moneyAmount); 
          holders[i].percentage = percentage;
        }        
      }
      order.holders = holders;
    }
    return {
      order: order
    }
  }
});

Router.route('/edit/registration/:orderId', {
  name: 'editorFactory',
  subscriptions: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('orderInformation', orderId);
  },
  waitOn: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('orderInformation', orderId);
  },
  data: function() {
    var self = this;
    self.businessScope = [];
    var orderId = this.params.orderId;
    Session.set('orderId', orderId);
    var order = Orders.findOne({orderId: orderId}, {sort: {createTime: -1}});
    if(order && order.hasOwnProperty('businessScope')) {
      var businessScope = order.businessScope;
      var length = businessScope.length;
      for(var i = 0; i < length; i++) {
        self.businessScope.push({name: businessScope[i]});
      }
      return {
        businessScope: self.businessScope,
        order: order
      }
    }
  }
});

Router.route('/assurance/:orderId', {
  name: 'assuranceView',
  subscriptions: function() {
    var orderId = this.params.orderId;

    return Meteor.subscribe('orderInformation', orderId);
  },
  waitOn: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('orderInformation', orderId);
  },
  data: function() {
    var orderId = this.params.orderId;
    var order = Orders.findOne({orderId: orderId});
    return {
      order: order
    }
  }
});


Router.route('/finance/:orderId', {
  name: 'financeView',
  subscriptions: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('orderInformation', orderId);
  },
  waitOn: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('orderInformation', orderId);
  },
  data: function() {
    var orderId = this.params.orderId;
    var order = Orders.findOne({orderId: orderId});
    return {
      order: order
    }
  }
});



Router.route('/bank/:orderId', {
  name: 'bankView',
  subscriptions: function() {
    var orderId = this.params.orderId;

    return Meteor.subscribe('orderInformation', orderId);
  },
  waitOn: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('orderInformation', orderId);
  },
  data: function() {
    var orderId = this.params.orderId;
    var order = Orders.findOne({orderId: orderId});
    return {
      order: order
    }
  }
});


Router.route('/bookkeeping/:orderId', {
  name: 'bookkeepingView',
  subscriptions: function() {
    var orderId = this.params.orderId;

    return Meteor.subscribe('orderInformation', orderId);
  },
  waitOn: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('orderInformation', orderId);
  },
  data: function() {
    var orderId = this.params.orderId;
    var order = Orders.findOne({orderId: orderId});
    if(order && order.holders){
      var holders = order.holders;
      var moneyAmount = 0;
      holders.forEach(function(holder) {
        if(typeof(holder.money === 'string')) {
          holder.money = parseInt(holder.money);
        }
        moneyAmount += holder.money;
      }); 
      var length = holders.length;
      if(moneyAmount > 0) {
        for(var i = 0; i < length; i++) {
          var percentage = handleProportion(parseInt(holders[i].money), moneyAmount); 
          holders[i].percentage = percentage;
        }        
      }
      order.holders = holders;
    }
    return {
      order: order
    }
  }
});


Router.route('/special/:orderId', {
  name: 'specialView',
  subscriptions: function() {
    var orderId = this.params.orderId;

    return Meteor.subscribe('orderInformation', orderId);
  },
  waitOn: function() {
    var orderId = this.params.orderId;
    return Meteor.subscribe('orderInformation', orderId);
  },
  data: function() {
    var orderId = this.params.orderId;
    var order = Orders.findOne({orderId: orderId});
    return {
      order: order
    }
  }
});



// 客户帐号查看
Router.route('/userList',{
  name: 'userList',
  subscriptions: function () {
    return Meteor.subscribe("customers");
  },  
  waitOn: function () {
    return Meteor.subscribe("customers");
  }
});

Router.route('/userDetail/:_id', {
  name: 'userDetail',
  waitOn: function () {
    var userId = this.params._id;
    return Meteor.subscribe("getCustomer", userId);
  },
  data: function() {
    Session.set("userId", this.params._id);
    return Meteor.users.findOne({_id: this.params._id});
  } 
});

Router.route('/adminSet/:_id', {
  name: 'adminSet',
  waitOn: function () {
    return Meteor.subscribe("admins");
  },
  data: function () {
    if (this.params._id == "addadmin") {
      return {_id: this.params._id};
    };
    return Meteor.users.findOne({_id: this.params._id});
  }
});

// 登陆权限控制
Router.onBeforeAction(function () {
  var user = Meteor.user();
  if (!user || !user.username) {
    this.render('login');
  } else {
    var username = user.username;
    Meteor.call("checkLoginPermission", username, function(err, result) {
      if(!result) {
        Meteor.logout();
      }
    })
    this.next(); 
  }
});

Router.route('profile');
