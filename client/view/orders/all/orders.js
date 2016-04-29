var orderlistsOptions = {
  columns: [
  // {
  //   title: '订单编号',
  //   data: 'orderId',
  //   className: 'width-100',
  //   className: 'orderId'
  // },
  {
    title: '支付单号',
    // className: 'width-100',
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
    className: 'handle source-data',
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
          var html = '<span class="Mlabel label-success">已支付</span>';
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
          var remark = currentRow.remark || "";
          var url='/'+currentRow.typeNameFlag+'/'+ orderId;
          var html = "<a href="+url+">详细信息, </a>&nbsp;&nbsp;"
                    + "<a href='#' class='set' data-toggle='modal' data-target='#orderRemark' "
                    + "data-orderid='" + orderId + "' "
                    + "data-remark='" + remark + "' "
                    + ">备注信息</a>";
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

Template.list_partial.helpers({
  orderlistData: function () {
    return function () {
      // return Orders.find({payed: true}, {sort: {orderId: -1}}).fetch();
      return Orders.find({}, {payedTime: -1}).fetch();
    };
  },
  optionsObject: orderlistsOptions,
  ordersLists: function() {
    return Orders.find({});
  },
  Orders() {
    var params =  Router.current().params.query;
    var page = parseInt(params.page) || 1;
    var num = parseInt(params.num) || 10;
    return Orders.find({},{
      sort:{createdAt:-1},
      skip:(page-1)*num,
      limit:10,
    });
  },
  'click .previous':function() {
    var params =  Router.current().params.query;
    var page = parseInt(params.page) || 1;
    var num = parseInt(params.num) || 10;
    if (page<=1) {
      // statement
      alert('已经是第一页!');
    }else{
      return Orders.find({},{
        sort:{createdAt:-1},
        skip:(page-2)*num,
        limit:10,
      });
    }
  },
  'click .next':function() {
    var params =  Router.current().params.query;
    var page = parseInt(params.page) || 1;
    var num = parseInt(params.num) || 10;
    if (page*num > Orders.find().count()) {
      alert('已经是最后一页！')
    }
    else {
      return Orders.find({},{
        sort:{createdAt:-1},
        skip:(page)*num,
        limit:10,
      });
    }
  }
});

Template.list.helpers({
  "listNum": function() {
    return Orders.find({}).count();
  }
})

Template.list.onRendered(function () {
  $("table.table").DataTable().order([10, 'asc']).draw();

  $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
      var min = $('#start_date').val();
      var max = $('#last_date').val();
      var time = data[4];

      min = Date.parse(min);
      max = Date.parse(max);
      time = Date.parse(time);

      if ((isNaN(min) && isNaN(max)) ||
        (isNaN(min) && time < max) ||
        (min < time && isNaN(max)) ||
        (min < time && time < max)) {
        return true;
    }
    return false;
  }
  );

})
