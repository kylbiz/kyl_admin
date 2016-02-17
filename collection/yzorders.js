// Orders.helpers({
//   yzpaytype: function() {
//     var pay_type = this.pay_type;
//     var yzpaytype = '';
//     if (pay_type !== null) {
//       switch (pay_type) {
//         case 'WEIXIN':
//           yzpaytype = '微信支付';
//           break;
//         case 'ALIPAY':
//           yzpaytype = '支付宝支付';
//           break;
//         case 'BANKCARDPAY':
//           yzpaytype = '银行卡支付';
//           break;
//         case 'PEERPAY':
//           yzpaytype = '代付';
//           break;
//         case 'CODPAY':
//           yzpaytype = '货到付款';
//           break;
//         case 'BAIDUPAY':
//           yzpaytype = '百度钱包支付';
//           break;
//         case 'PRESENTTAKE':
//           yzpaytype = '直接领取赠品';
//           break;
//         case 'COUPONPAY':
//           yzpaytype = '优惠券/码全额抵扣';
//           break;
//         case 'BULKPURCHASE':
//           yzpaytype = '来自分销商的采购';
//           break;
//         default:
//           yzpaytype = '';
//           break;
//       }
//     };
//     return yzpaytype;
//   },
//   'yzorderstatus': function() {
//     var status = this.status;
//     var yzorderstatus = '';
//     if (status !== null) {
//       switch (status) {
//         case 'TRADE_NO_CREATE_PAY':
//           yzorderstatus = '没有创建支付交易';
//           break;
//         case 'WAIT_BUYER_PAY':
//           yzorderstatus = '等待买家付款';
//           break;
//         case 'WAIT_PAY_RETURN':
//           yzorderstatus = '等待支付确认';
//           break;
//         case 'WAIT_SELLER_SEND_GOODS':
//           yzorderstatus = '等待卖家发货';
//           break;
//         case 'WAIT_BUYER_CONFIRM_GOODS':
//           yzorderstatus = '等待买家确认收货';
//           break;
//         case 'TRADE_BUYER_SIGNED':
//           yzorderstatus = '买家已签收';
//           break;
//         case 'TRADE_CLOSED':
//           yzorderstatus = '付款以后用户退款成功，交易自动关闭';
//           break;
//         case 'TRADE_CLOSED_BY_USER':
//           yzorderstatus = '付款以前，卖家或买家主动关闭交易)';
//           break;
//         default:
//           yzorderstatus = '';
//           break;
//       }
//     }
//     return yzorderstatus;
//   },
//   'yzProductNum': function() {
//     var num = this.num;
//     if (num !== null) {
//       return num;
//     } else {
//       return "";
//     }
//   },
//   'yzordertype': function() {
//     var type = this.type;
//     var yzordertype = '';
//     if (type !== null) {
//       switch (type) {
//         case 'FIXED':
//           yzordertype = '一口价';
//           break;
//         case 'GIFT':
//           yzordertype = '送礼';
//           break;
//         case 'BULK_PURCHASE':
//           yzordertype = '来自分销商的采购';
//           break;
//         case 'PRESENT':
//           yzordertype = '赠品领取';
//           break;
//         case 'COD':
//           yzordertype = '货到付款';
//           break;
//         case 'QRCODE':
//           yzordertype = '扫码商家二维码直接支付的交易';
//           break;
//         default:
//           yzordertype = '';
//           break;
//       }
//     }
//     return yzordertype;
//   },
//   'yzfeedback': function() {
//     var feedback = this.feedback;
//     var yzfeedback = '';
//     if (feedback !== null) {
//       switch (feedback) {
//         case 0:
//           yzfeedback = '无维权';
//           break;
//         case 1:
//           yzfeedback = '顾客发起维权';
//           break;
//         case 2:
//           yzfeedback = '顾客拒绝商家的处理结果';
//           break;
//         case 3:
//           yzfeedback = '顾客接受商家的处理结果';
//           break;
//         case 9:
//           yzfeedback = '商家正在处理';
//           break;
//         case 101:
//           yzfeedback = '等待卖家同意退款申请';
//           break;
//         case 102:
//           yzfeedback = '等待卖家同意退款申请（维权失败过）';
//           break;
//         case 103:
//           yzfeedback = '卖家不同意退款申请';
//           break;
//         case 104:
//           yzfeedback = '已经申请有赞客满介入';
//           break;
//         case 105:
//           yzfeedback = '卖家已同意退款';
//           break;
//         case 106:
//           yzfeedback = '已退货，等待卖家确认收货';
//           break;
//         case 107:
//           yzfeedback = '维权已经关闭';
//           break;
//         case 110:
//           yzfeedback = '退款成功';
//           break;
//         default:
//           yzfeedback = '';
//           break;
//       }
//     }
//     return yzfeedback;
//   },
//   'yzrefundstate': function() {
//     var refund_state = this.refund_state;
//     var yzrefundstate = '';
//     if (refund_state !== null) {
//       switch (refund_state) {
//         case 'NO_REFUND':
//           yzrefundstate = '无退款';
//           break;
//         case 'PARTIAL_REFUNDING':
//           yzrefundstate = '部分退款中';
//           break;
//         case 'PARTIAL_REFUNDED':
//           yzrefundstate = '已部分退款';
//           break;
//         case 'PARTIAL_REFUND_FAILED':
//           yzrefundstate = '部分退款失败';
//           break;
//         case 'FULL_REFUNDING':
//           yzrefundstate = '全额退款中';
//           break;
//         case 'FULL_REFUNDED':
//           yzrefundstate = '已全额退款';
//           break;
//         case 'FULL_REFUND_FAILED':
//           yzrefundstate = '全额退款失败';
//           break;
//         default:
//           yzrefundstate = '';
//           break;
//       }
//     }
//     return yzrefundstate;
//   },
//   'yzshippingtype': function() {
//     var shipping_type = this.shipping_type;
//     var yzshippingtype = '';
//     if (shipping_type !== null) {
//       switch (shipping_type) {
//         case 'express':
//           yzshippingtype = '快递';
//           break;
//         case 'fetch':
//           yzshippingtype = '到店自提';
//           break;
//         default:
//           yzshippingtype = '';
//           break;
//       }
//     }
//     return yzshippingtype;
//   },
//   'yzcoupontype': function() {
//     var coupon_type = this.coupon_details.coupon_type;
//     var yzcoupontype = '';
//     if (coupon_type !== null) {
//       switch (coupon_type) {
//         case 'PROMOCARD':
//           yzcoupontype = '优惠券';
//           break;
//         case 'PROMOCODE':
//           yzcoupontype = '优惠码';
//           break;
//         default:
//           yzcoupontype = '';
//           break;
//       }
//     }
//     return yzcoupontype;
//   },
//   'yzpromotiontype': function() {
//     var promotion_type = this.promotion_details.promotion_type;
//     var yzpromotiontype = '';
//     if (promotion_type !== null) {
//       switch (promotion_type) {
//         case 'FULLREDUCE':
//           yzpromotiontype = '满减满送';
//           break;
//         default:
//           yzpromotiontype = '';
//           break;
//       }
//     }
//     return yzpromotiontype;
//   }
// })