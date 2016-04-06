var orderlistsOptions = {
  columns: [
  {
    title: '订单编号',
    data: 'orderId',
    className: 'orderId'
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
    title: '收货电话',
    data: "receiverPhone"
  },
  {
    title: '产品名称',
    data: 'productName'
  },
  {
    title: '金额',
    className: 'width-40',
    data: 'moneyAmount'
  },
  {
    title: '订单来源',
    className: 'handle',
    data: 'orderHost'
  },
  {
    title: '下单时间',
    className: 'width-80',
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
   pageLength: 10,
   lengthMenu: [ 10, 15, 20, 25, 50 ]
}

Template.specialListsView.helpers({
  speciallistData: function () {
    return function () {
      return Orders.find({host: /KYLPC|KYLWX|KYLWAP/, typeNameFlag: 'special'}).fetch();
    };
  },
  optionsObject: orderlistsOptions
});
