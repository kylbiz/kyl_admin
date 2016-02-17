// Orders.helpers({
//   order_update_time: function() {
//     var updateTime = this.updateTime;
//     if (updateTime) {
//       var year = updateTime.getFullYear();
//       var month = updateTime.getMonth() + 1;
//       var date = updateTime.getDate();
//       var hours = updateTime.getHours();
//       var minutes = updateTime.getMinutes();
//       var order_update_time = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes;
//       return order_update_time;
//     } else {
//       return ""; 
//     }
//   },
//   "order_create_timeL": function() {
//     var order_create_time = this.order_create_time;
//     if (order_create_time) {
//       var createTime = new Date(order_create_time * 1000);
//       var year = createTime.getFullYear();
//       var month = createTime.getMonth() + 1;
//       var date = createTime.getDate();
//       var hours = createTime.getHours();
//       var minutes = createTime.getMinutes();
//       var order_create_timeL = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes;
//       return order_create_timeL;
//     } else {
//       return "";
//     }
//   },
//   "product_priceL": function() {
//     var product_price = this.product_price || 0;
//     if (product_price) {
//       return product_price / 100;
//     } else {
//       return 0;
//     }
//   },
//   "order_total_priceL": function() {
//     var order_total_price = this.order_total_price || 0;
//     if (order_total_price) {
//       return order_total_price / 100;
//     } else {
//       return 0;
//     }
//   },
//   "order_statusL": function() {
//     var order_status = this.order_status || "";
//     var status = "";
//     if (order_status) {
//       switch (order_status) {
//         case 2:
//           status = "待发货";
//           break;
//         case 3:
//           status = '已发货';
//           break;
//         case 5:
//           status = '已完成';
//           break;
//         case 8:
//           status = '维权中';
//           break;
//         default:
//           status = '全部状态';
//           break;
//       }
//     }
//     return status;
//   }
// })