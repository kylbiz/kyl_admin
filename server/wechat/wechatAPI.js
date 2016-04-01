var wechatAPI = Meteor.npmRequire('wechat-api');

var WXAPI = new wechatAPI(WXConfig.appID, WXConfig.appsecret, getToken, saveToken);
function getToken(callback) {
  // 传入一个获取全局token的方法
  console.log('getToken');
    var Fiber = Npm.require("fibers");
    Fiber(function () {
        var info = WeChatInfo.findOne({name: 'access_token'}) || {};
        callback(null, info.token);
    }).run();
}

function saveToken(token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
    console.log("saveToken", token);
    var Fiber = Npm.require("fibers");
    Fiber(function () {
        WeChatInfo.upsert({name: 'access_token'}, {$set: {name: 'access_token', token: token}}, callback);
    }).run();
}


Meteor.methods({
  'flashWXShopGoods': function () {
    // 拉取微信端的数据
    var retInfo = getGoodsByStatus(0);
    if (retInfo.errcode) {
      throw new Meteor.Error(retInfo.errcode + ": " + retInfo.errmsg);
    }
    // 更新数据库的数据
    var goods = retInfo.products_info || [];
    WeChatShopGoods.remove({});
    goods.forEach(function (good) {
      WeChatShopGoods.insert(good);
    });
  },
  'newWXShopGood': function (good) {
    var good = {
      product_base: {
        name: '测试商品',
        main_img: "http://mmbiz.qpic.cn/mmbiz/sgT7HNZ9VPX42WvTv9hT8XhYyMIF4KmYfdd3PDTH8plPPovf3No5oI3Vu35Libcm59j27qCow7xRHwibC1CEYpAw/0",
        buy_limit: 0,
        img: [
          "http://mmbiz.qpic.cn/mmbiz/sgT7HNZ9VPX42WvTv9hT8XhYyMIF4KmYfdd3PDTH8plPPovf3No5oI3Vu35Libcm59j27qCow7xRHwibC1CEYpAw/0"
        ],
        detail: [{
          text: '测试商品内容',
        }]
      },
      sku_list: [{
        sku_id: '',
        price: 1,
        quantity: 10,
      }],
      attrext: {
        isPostFree: 1,
        isHasReceipt: 1,
        location: {
          country: '中国',
          province: '上海市',
          city: '上海市',
          address: '长宁区'
        }
      }
    }

    var retInfo = createGoods(good);
    console.log("newWXShopGood", retInfo);
    if (retInfo.errcode) {
      throw new Meteor.Error(retInfo.errcode + ": " + retInfo.errmsg);
    }
    var product_id = retInfo.product_id;

    // 拉取全部数据 or 拉取单个数据

    // 更新数据库 全部 or 单个
  },
  'updateWXShopGood': function (id, good) {
    // 更新微信端的数据

    // 更新数据可的数据
  },
  'delWXShopGood': function (id) {
    console.log("delWXShopGood", id);
    return true;
  },
  'uploadImg': function () {
    // 获取图片数据
    var path = process.env.PWD + '/public/img/avatars/avatar.jpg';
    console.log("uploadImg", path);
    WXAPI.uploadPicture(path, function (err, res) {
      console.log("uploadImg", err, res);
    });
  }
});



////////////////////////////////////////////////////////////////////////////////////////
// 微信调用的同步化操作
////////////////////////////////////////////////////////////////////////////////////////
function getGoodsByStatus(status) {
  status = status || 0;
  var ret = Async.runSync(function(callback) {
      WXAPI.getGoodsByStatus(status, callback);
  });

  if (ret.error) {
      console.log("getGoodsByStatus error-", ret.error);
      throw new Meteor.Error(ret.error.name);
  } else {
      console.log("getGoodsByStatus ", ret.result);
      return ret.result;
  }
}

function createGoods(goods) {
  var ret = Async.runSync(function(callback) {
      WXAPI.createGoods(goods, callback);
  });

  if (ret.error) {
      console.log("updateGoods error-", ret.error);
      throw new Meteor.Error(ret.error);
  } else {
      console.log("updateGoods ", ret.result);
      return ret.result;
  }
}

function updateGoods(goods) {
  var ret = Async.runSync(function(callback) {
      WXAPI.updateGoods(status, callback);
  });

  if (ret.error) {
      console.log("updateGoods error-", ret.error);
      throw new Meteor.Error(ret.error);
  } else {
      console.log("updateGoods ", ret.result);
      return ret.result;
  }
}

function updateGoodsStatus(product_id, status) {
  var ret = Async.runSync(function(callback) {
    WXAPI.updateGoodsStatus(product_id, status, callback);
  });

  if (ret.error) {
      console.log("updateGoods error-", ret.error);
      throw new Meteor.Error(ret.error);
  } else {
      console.log("updateGoods ", ret.result);
      return ret.result;
  }
}

function deleteGoods(product_id) {
  var ret = Async.runSync(function(callback) {
    WXAPI.deleteGoods(product_id, callback);
  });

  if (ret.error) {
      console.log("updateGoods error-", ret.error);
      throw new Meteor.Error(ret.error);
  } else {
      console.log("updateGoods ", ret.result);
      return ret.result;
  }
}

function uploadPicture() {

}



