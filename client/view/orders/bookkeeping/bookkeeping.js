var orderlistsOptions = {
  columns: [
  // {
  //   title: '订单编号',
  //   data: 'orderId',
  //   className: 'orderId'
  // },
  {
    title: '支付单号',
    data: 'openidL',
  },
  {
    title: '下单用户',
    data: "username"
  },
  {
    title: '收货人',
    data: "receiverName"
  },
  {
    title: '收货人电话',
    data: "receiverPhone"
  },
  {
    title: '产品名称',
    data: 'productName'
  },
  {
    title: '金额',
    data: 'moneyAmount'
  },
   {
    title: '订单来源',
    className: 'handle source-data',
    data: 'orderHost'
  },
  {
    title: '下单时间',
    data: 'createTimeL'
  },
  {
    title: "支付状态",
    className: 'handle',
    render: function(cellData, renderType, currentRow) {
      if(currentRow.hasOwnProperty("payed")) {
        var payed = currentRow.payed;
        if(payed === true || payed === "true") {
          var html = '<span class="label label-success">已支付</span>';
          return html;
        } else {
          var html = '<span class="label label-default">未支付</span>';
          return html;
        }
      } else {
        var html = '<span class="label label-warning">不确定</span>';
        return html;
      }
    }
  },
  {
    title: '支付时间',
    className: 'width-80',
    data: 'payedTimeL',
  },
  {
    title: "操作",
    className: 'handle',
    render: function(cellData, renderType, currentRow) {
      if(currentRow.hasOwnProperty("payed") && (currentRow.payed === true || currentRow.payed === "true")) {
        var orderId = currentRow.orderId;
        var url='/'+currentRow.typeNameFlag+'/'+orderId;
        var html = "<a href="+url+">详细信息</a>";
        return html;
      } else {
        return "";
      }
    }
  }
  ],
  bPaginate: false,
  // pageLength: 10,
  // lengthMenu: [10, 15, 20,25, 50]
}

var reactiveFun = function () {
  return Orders.find({typeNameFlag: 'bookkeeping'}, {payedTime: -1}).fetch();
};



Template.bookkeepingListPartital.onCreated(function () {
  Session.set('tableFilter', {typeNameFlag: 'bookkeeping'});
  this.autorun(function () {
      var dataLimit = Session.get('tableOpt') || {page: 1, num: 20};
      var dataFilter = Session.get('tableFilter') || {};
      return Meteor.subscribe('getAllOrders', dataLimit, dataFilter );
  });
});

Template.bookkeepingListPartital.helpers({
  orderlistData: function () {
    return reactiveFun;
  },
  optionsObject: orderlistsOptions
});


Template.bookkeepingList.helpers({
  "listNum": function() {
    return Orders.find({typeNameFlag: 'bookkeeping'}).count();
  }
})


