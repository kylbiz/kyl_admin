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
  template: 'loading',
  onBeforeAction: function () {
    var self = this;
    Meteor.call('checkUserHandlePermission', function (error, result) {
      if (!result) {
        self.render('nopermission');
      } else {
        self.render("RegistrationInfos");
      }
    });

    this.next();
  }
});

// -------------------------------------------------
// 公司注册具体信息
Router.route('/manager/registration/:listId', {
  template: 'loading',
  onBeforeAction: function () {
    var self = this;
    var listId = self.params.listId || "";
    Session.set({listId: listId});
    Meteor.call('checkUserHandlePermission', function (error, result) {
      if (!result) {
        self.render('nopermission');
      } else {
        self.render("RegistrationManageView");
      }
    });

    this.next();
  }

})

// -------------------------------------------------
// 管理银行信息
Router.route('/manager/bank', {
  template: 'loading',
  onBeforeAction: function () {
    var self = this;
    Meteor.call('checkUserHandlePermission', function (error, result) {
      if (!result) {
        self.render('nopermission');
      } else {
        self.render("ManageBank");
      }
    });
    this.next();
  }
});

// -------------------------------------------------










// -------------------------------------------------









// -------------------------------------------------
