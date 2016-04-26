
User = Meteor.users;

Orders = new Meteor.Collection('Orders');

Business = new Meteor.Collection('Business');

Business1 = new Meteor.Collection('Business1');

ProgressTemple = new Meteor.Collection('ProgressTemple');

BusinessTypeLists = new Meteor.Collection('BusinessTypeLists');

RegistrationLists = new Meteor.Collection("RegistrationLists");

HandleResults = new Meteor.Collection("HandleResults");

DocNum = new Meteor.Collection("DocNum");

WeChatInfo = new Meteor.Collection('wechatinfo');

WeChatShopGoods = new Meteor.Collection('WeChatShopGoods');

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }


Orders.helpers({
  // payOrderId: function () {
  //   if (this.payed) {
  //     var openid = this.openid;
  //     var host = this.host;
  //     var payLog = PayLogs.findOne({openid: openid}) || {};

  //     payOrderId = '';
  //     if (host == "KYLPC") {
  //       // payOrderId = payLog.
  //     } else if (host == "KYLWX") {

  //     } else if (host == "KYLWAP") {

  //     }
  //     return payOrderId;
  //   }
  // },
  openidL: function () {
    var host = this.host;
    var payHost = {
      'KYLPC': 'PC端支付宝支付',
      'KYLWX': '微信支付',
      'KYLWAP': '移动端支付宝支付',
    }[host] || "未知渠道";
    return payHost + '-' + this.openid;
  },
  createTimeL: function () {
    if (this.createTime) {
      return moment(this.createTime).format('YYYY-MM-DD HH:mm');
      // var createTimeL = this.createTime;
      // var year = createTimeL.getFullYear();
      // var month = createTimeL.getMonth() + 1;
      // var date= createTimeL.getDate();
      // var hours = createTimeL.getHours();
      // var minutes = createTimeL.getMinutes();
      // var createTime =  year+ '-' +  month +'-' + date + ' ' + hours + ':' + minutes;
      // return createTime;
      // return moment(this.createTime).format("YYYY年MM月DD日 H:mm");
    } else {
      return '未知';
    }
  },
  payedTimeL: function () {
    if (this.payedTime) {
      return moment(this.payedTime).format('YYYY-MM-DD HH:mm');
    }
    return '未知';
  },
  productName: function() {
    var productName = '';
    if ( (this.host == 'KYLWAP') || (this.host == 'KYLWX') ) {
      var productInfo = this.servicesNameList[0];
      productName = productInfo.zhDes || productInfo.label || productInfo.name;
    } else {
      productName = this.servicesNameList[0].name;
    }
    return productName || '未知';
  },

  businessScopeL: function() {
    if(this.businessScope) {
      return this.businessScope.toString();
    } else {
      return '';
    }
  },
  companyNameL: function() {
    if(this.companyName && this.companyName.mainName) {
      var mainName = this.companyName.mainName || "";
      var industrySmall = this.industrySmall || "";
      return mainName + '（上海）' + industrySmall + '有限公司';
    }
    return "";
  },
  alternativeName: function() {
    if(this.companyName) {
      var companyName = '';
      if(this.companyName.alternativeName1) {
        companyName += this.companyName.alternativeName1;
      };
      if(this.companyName.alternativeName2) {
        companyName += ',' + this.companyName.alternativeName2;
      };
      if(this.companyName.alternativeName3) {
        companyName += ',' + this.companyName.alternativeName3;
      };
      if(this.companyName.alternativeName4) {
        companyName += ',' + this.companyName.alternativeName4;
      }
      return companyName;
    }
  },
  displayHolders: function() {
    if(this.holders) {
      var holders = this.holders;
      var displayHolders = [];
      if(holders && holders.length <=3) {
        displayHolders = holders;
        return displayHolders;
      } else if(holders && holders.length > 3) {
        displayHolders.push(holders[0]);
        displayHolders.push(holders[1]);
        return displayHolders;
      } else {
        return displayHolders;
      }
    }
  },
  hideHolders: function() {
    if(this.holders) {
      var holders = this.holders;
      var hideHolders = [];
      if(holders && holders.length <=3) {
        hideHolders = holders;
        return [];
      } else if(holders && holders.length >3) {
        // hideHolders.push(holders[0]);
        // hideHolders.push(holders[1]);
        holders.shift();
        holders.shift();
        hideHolders = holders;
        return hideHolders;
      } else {
        return [];
      }
    }
  },
  user: function() {
    if(this.userId) {
      var userId = this.userId;
      Meteor.subscribe('getUser', userId);
      return User.findOne({_id: userId});
    }
  },
  username: function() {
    if(this.userId) {
      var userId = this.userId;
      Meteor.subscribe('getUser', userId);
      var user = User.findOne({_id: userId});
      if(user && user.username) {
        return user.username
      } else {
        return '';
      }
    }
  },
  receiverName: function() {
    if(this.addressInfo && this.addressInfo.receiver) {
      return this.addressInfo.receiver;
    } else  {
      return "";
    }
  },
  receiverPhone: function() {
    if(this.addressInfo && this.addressInfo.phone) {
      return this.addressInfo.phone;
    } else  {
      return "";
    }
  },
  "orderHost": function() {
    if(this.host) {
      if(this.host === "KYLWX") {
        return "新版微信";
      } else if(this.host === "KYLPC") {
        return "官网";
      } else if (this.host === "KYLWAP") {
        return "移动端";
      } else {
        return this.host;
      }
    } else {
      return "未知"
    }
  },
  "zone": function() {
    if(this.servicesNameList && this.typeNameFlag === "registration") {
       var nameList = this.servicesNameList[0];
       if(nameList.hasOwnProperty("zone")) {
        return nameList.zone;
       } else {
        var name = nameList.name;
        var zone = name.slice(name.lastIndexOf("[") + 1, name.lastIndexOf("]"));
        return zone || "";
       }
    } else {
      return "";
    }
  },
  "holdernum": function() {
    if(this.holders) {
      return this.holders.length || 0;
    } else {
      return 0;
    }
  },
  isTest: function()  {
    if(this.username) {
      var userId = this.userId;
      // Meteor.subscribe('getUser', userId);
      var user = User.findOne({_id: userId});
      if(user && user.username) {
        if(username === "15618871296" || username === "18521595051") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
})


Meteor.users.helpers({
  time: function() {
    return this.createdAt.Format("yyyy-MM-dd hh:mm");
  }
});
