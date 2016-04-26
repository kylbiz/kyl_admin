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
  }
  // {
  //   title: "支付状态",
  //   className: 'handle',
  //   render: function(cellData, renderType, currentRow) {
  //     if(currentRow.hasOwnProperty("payed")) {
  //       var payed = currentRow.payed;
  //       if(payed === true || payed === "true") {
  //         var html = '<span class="label label-success">已支付</span>';
  //         return html;
  //       } else {
  //         var html = '<span class="label label-default">未支付</span>';
  //         return html;
  //       }
  //     } else {
  //       var html = '<span class="label label-warning">不确定</span>';
  //       return html;
  //     }
  //   }
  // },
  // {
  //   title: "操作",
  //   className: 'handle',
  //   render: function(cellData, renderType, currentRow) {
  //     if(currentRow.hasOwnProperty("payed") && (currentRow.payed === true || currentRow.payed === "true")) {
  //       var orderId = currentRow.orderId;
  //       var url='/'+currentRow.typeNameFlag+'/'+orderId;
  //       var html = "<a href="+url+">详细信息</a>";
  //       return html;
  //     } else {
  //       return "";
  //     }
  //   }
  // }
  ],
  pageLength: 10,
  lengthMenu: [10, 15, 20,25, 50]
}


var reactiveFun = function () {
  var orders = Orders.find({typeNameFlag: 'assurance'});
  return orders.fetch();
};

Template.assurancelist_partial.helpers({
  orderlistData: function () {
    return reactiveFun;
  },
  optionsObject: orderlistsOptions
});


Template.assuranceList.helpers({
  "listNum": function() {
    return Orders.find({typeNameFlag: 'assurance'}).count();
  }
})


Template.detailTpl_partial.onRendered(function(){
  Session.set('toggle', false);
  this.$("#mainBtn").click(function(){
    if($(this).hasClass('edit-btn')) {
      Session.set('toggle', true);
    }
    else if($(this).hasClass('save-btn')) {
        //data
        var relationId = $(".infoL").data("relationid") || "";
        var address = $('.address').val() || "";
        var receiver = $('.receiver').val() || "";
        var phone = $('.phone').val() || "";
        var zipcode = $('.zipcode').val() || "";

        if(relationId && address && receiver && phone && zipcode) {
          var options = {
            relationId: relationId,
            receiver: receiver,
            address: address,
            phone: phone,
            zipcode: zipcode
          };

          Meteor.call('updateOrderAddress', options);
        };
        Session.set('toggle',false);
      }
    });
});

Template.detailTpl_partial.helpers({
  isEditable: function() {
    return Session.get('toggle');
  },
  btnClass:function() {
    if(Session.get('toggle'))
      return 'btn-warning save-btn'
    else
      return 'btn-info edit-btn'
  },

});


