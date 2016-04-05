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
    className: 'handle-min',
    data: "receiverName"
  },  
  {
    title: '收货电话',
    data: "receiverPhone"
  }, 
  {
    title: '产品名称',
    data: 'productName',
    render: function(cellData, renderType,currentRow) {
      if(currentRow.host=="KYLWX") {
        return currentRow.servicesNameList[0].label;
      }
      else {
        //console.log(cellData);
        return cellData;
      }
    }    
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
   title: "当前状态",
   className: 'handle',
   data: 'productProgress.status',
   render:function(cellData){
    if(cellData==undefined||cellData==null)
      return "资料未提交"
    if(cellData==0)
      return "提交资料";
    else if(cellData==1)
      return "核名"
    else if(cellData==2)
      return "股东签字确认"
    else if(cellData==3)
      return "工商注册登记"
    else if(cellData==4)
      return "领取企业代码证"

  }
},      
{
 title: "设置状态",
 className: 'handle',
 render: function(cellData, renderType, currentRow) {
    if(currentRow.hasOwnProperty("productProgress") && currentRow.hasOwnProperty("relationId")) {
      var status = currentRow.productProgress.status;
      var relationId = currentRow.relationId;
      var html="<a href='#' class='set' data-toggle='modal' data-target='#processTpl' data-status='" 
      + status + "' "
      + "data-relationid='" + relationId + "' "  
      + ">设置</a>";  
      return html;
    } else {
      return "";
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
  lengthMenu: [10, 15, 20,25, 50]
}

var reactiveFun = function () { 
  var orders = Orders.find({typeNameFlag: 'registration'});
  if(orders.count() === 0) {
    return [];
  } else {
    return orders.fetch(); 
  }
};

Template.registrationListsView.helpers({
  orderlistData: function () {
    return reactiveFun;
  },
  optionsObject: orderlistsOptions 
});

Template.registrationListsView.onRendered(function(){
  $("#classify").change(function(){
    var value=$(this).val();     
    $("table.table").DataTable().columns(9).search(value).draw();
  });
});


Template.registrationLists.helpers({
  "listNum": function() {
    return Orders.find({typeNameFlag: 'registration'}).count();
  }
})

