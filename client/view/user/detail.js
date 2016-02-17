var orderlistsOptions = {
  columns: [
  {
    title: '订单编号',
    data: 'orderId', 
    className: 'orderId'
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
    title: '下单时间',
    data: 'createTimeL'
  },
  {
    title: "操作",
    className: 'handle',
    render: function(cellData, renderType, currentRow) {
      var orderId = currentRow.orderId;          
      var url='/'+currentRow.typeNameFlag+'/'+orderId;
      var html = "<a href="+url+">详细信息</a>";    
      return html;
    }
  }
  ],
  pageLength: 10,
  lengthMenu: [10, 15, 20,25, 50]
}

Template.userDetail_partial.helpers({
  orderlistData: function () {
    return function () {
      var userId = Session.get("userId") || "";
      return Orders.find({userId: userId}).fetch(); 
    };
  },
  optionsObject: orderlistsOptions 
});


Template.userDetail.events({
  'click .backbtn': function(event, template) {
   Router.go("userList");
 }
});

