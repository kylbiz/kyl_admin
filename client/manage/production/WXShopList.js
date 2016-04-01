// 微信小店商品页
Template.WXShopList.events({
  'click #updateListBtn': function () {
    Meteor.call('flashWXShopGoods', function (error, result) {
      if (error) {
        console.log("update list fail", error);
        alert("更新列表失败");
      } else {
        alert("更新成功");
      }
    });
  }
});

// 微信小店商品列表
Template.wxGoodList.onRendered(function() {
  $("#deleteWXGoodBtn").on("show.bs.modal", function(event) {
    var modal = $(this);
    var button = $(event.relatedTarget);
    var name = button.attr("data-name") || "";
    var id = button.attr("data-id") || "";

    modal.find(".deleteWXGoodBtnName").html(name);
    modal.find(".deleteWXGoodBtnId").html(id);
  });
})

Template.wxGoodList.helpers({
  goodInfo: function () {
    return function () {
      return  WeChatShopGoods.find({}).fetch() || [];
    }
  },
  tableOpt: function () {
    return {
      columns: [
      {
        title: '名称',
        data: 'product_base.name',
      }, {
        title: '价格(元)',
        data: 'sku_list.0.price',
        render: function (cellData, renderType, currentRow) {
          return parseInt(cellData) / 100
        }
      },{
        title: '数量',
        data: 'sku_list.0.quantity',
      },{
        title: '状态',
        data: 'status',
      }, {
        title: "操作",
        className: 'handle-btn',
        createdCell: function (node, cellData, rowData) {
          var _id = rowData._id;
          return $(node).html(Blaze.toHTMLWithData(Template.wxGoodOpt, {idObj: {_id: _id}, name: rowData.product_base.name, _id: _id }));
        },
        orderable: false,
      }],
    };
  }
});

Template.wxGoodList.events({
  'click .deleteWXGoodBtn': function (event) {
    var button = $(event.currentTarget);
    var id = $(".deleteWXGoodBtnId").html() || "";
    Meteor.call("delWXShopGood", id, function (err) {
      if (err) {
        alert("删除失败");
      }
    });
    $("#deleteWXGoodBtn").modal("hide");
  }
});


Template.wxGoodDetail.helpers({
  inputData: function() {
    var goodsInfo = WeChatShopGoods.findOne({});
    // getObjByKey();
    return [
      {name: 'hello', id: 'hello-world', value: 'world'},
    ];
  }
});



/////////////////////////////////////////////////////////////////////////
// 辅助函数
/////////////////////////////////////////////////////////////////////////
function getObjByKey() {
  var keysMap = {
    'product_id': {label: '序列', type: 'String', elem: {name: 'input'}, limitInput: true},
    'product_base.name': {label: '名称', type: 'String', elem: {name: 'input'}},
    'product_base.main_img': {label: '图片', type: 'Url'},
    'product_base.buy_limit':{label: '限购'},
    'sku_list.0.sku_id': {hidden: true, autoValue: ''},
    'sku_list.0.price': {label: '价格', type: 'Number', elem: {name: 'input'}},
    'sku_list.0.quantity': {label: '库存', type: 'Number', elem: {name: 'input'}},
    'status': {label: '状态', type:'Number', elem: {name: 'select', opts: [{label: '上架', value: 1}, {label: '下架', value: 2}] }},
    'attrext.isPostFree': {hidden: true, autoValue: 1},
    'attrext.isHasReceipt': {label: '是否提供发票', type: 'Number', elem: {name: 'select', opts:[{label: '是', value:1}, {label: '否', value: 0}]}},
    'attrext.location.country': {label: '国家', type: 'String', limitInput:true, autoValue: '中国'},
    'attrext.location.province': {label: '市', type: 'String', limitInput:true, autoValue: '上海市'},
    'attrext.location.city': {label: '区', type: 'String', elem: {name: 'select', opts: Util.area_shanghai}},
  }
}



