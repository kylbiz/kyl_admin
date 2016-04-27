var DocNumLists = [
  {type: 'check', zone: 'hk', holdernum: '0', num: 1},
  {type: 'check', zone: 'hk', holdernum: '1', num: 1},
  {type: 'check', zone: 'pd', holdernum: '0', num: 3},
  {type: 'check', zone: 'pd', holdernum: '1', num: 3},
  {type: 'registration', zone: 'hk', holdernum: '0', num: 8},
  {type: 'registration', zone: 'hk', holdernum: '1', num: 8},
  {type: 'registration', zone: 'pd', holdernum: '0', num: 8},
  {type: 'registration', zone: 'pd', holdernum: '1', num: 8}
]

var OrdersLists = [
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'},
  {orderId:'1',username:'zzr',receivername:'zzr',receiverPhone:'157511',productName:'kylserivce',moneyAmount:'1000',orderHost:'110',createTimeL:'2016'}
]

Meteor.startup(function(){
  if(DocNum.find().count() === 0) {
    DocNumLists.forEach(function(docNum) {
      DocNum.insert(docNum);
    })
  }
  if (Orders.find().count()) {
    OrdersLists.forEach(function (order) {
      Orders.insert(order);
    });
  } 
});

