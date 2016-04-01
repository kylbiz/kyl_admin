/*
 * 页面权限管理的统一文件
 * created by air_cc @2016-03-22
 **/

// 商品编辑的权限
var productEditRouters = [
  "RegistrationInfos", "RegistrationManageView", "ManageBank", "WXShopList", "WXShopGoodView"
];
Router.onBeforeAction(function () {
  Meteor.call('checkUserHandlePermission', ['editgoods'], function (err, res) {
    if (err || !res) {
      self.render('nopermission');
    }
  });
  this.next();
}, {only: productEditRouters});
