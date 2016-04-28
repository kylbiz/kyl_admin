// 后台用户管理
Router.route('/manager/user', {
  template: 'loading',
  onBeforeAction: function () {
    var self = this;
    this.render("loading");
    Meteor.call('checkUserHandlePermission', function (error, result) {
      if (!result) {
        self.render('nopermission');
      } else {
        self.render("manager")
      }
    });

    this.next();
  },
  subscriptions: function () {
    return Meteor.subscribe("admins");
  }
});

// -------------------------------------------------


// 后台公司注册管理
Router.route('/manager/registration', {
  // template: 'loading',
  name: 'RegistrationInfos',
  // onBeforeAction: function () {
  //   var self = this;
  //   Meteor.call('checkUserHandlePermission', function (error, result) {
  //     if (!result) {
  //       self.render('nopermission');
  //     } else {
  //       self.render("RegistrationInfos");
  //     }
  //   });

  //   this.next();
  // }
});

// -------------------------------------------------
// 公司注册具体信息
Router.route('/manager/registration/:listId', {
  // template: 'loading',
  name: 'RegistrationManageView',
  // onBeforeAction: function () {
  //   var self = this;
  //   var listId = self.params.listId || "";
  //   Session.set({listId: listId});
  //   Meteor.call('checkUserHandlePermission', function (error, result) {
  //     if (!result) {
  //       self.render('nopermission');
  //     } else {
  //       self.render("RegistrationManageView");
  //     }
  //   });

  //   this.next();
  // }

})

// -------------------------------------------------
// 管理银行信息
Router.route('/manager/bank', {
  // template: 'loading',
  name: 'ManageBank',
  // onBeforeAction: function () {
  //   var self = this;
  //   Meteor.call('checkUserHandlePermission', function (error, result) {
  //     if (!result) {
  //       self.render('nopermission');
  //     } else {
  //       self.render("ManageBank");
  //     }
  //   });
  //   this.next();
  // }
});

// --------------------------------------------------


// 管理微信小店
Router.route('/manager/wxshop', {
  name: 'WXShopList',
  waitOn: function () {
    return Meteor.subscribe('getWxShopInfo');
  }
});

Router.route('/manager/wxshop/:_id', {
  // name: 'WXShopGoodView',
  name: 'developing',
  waitOn: function () {
    var _id = this.params._id;
    return Meteor.subscribe('getWxShopInfo', {_id: _id});
  }
});


// Router.route('/manager/wxshop/new', {});
