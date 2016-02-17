Template.editorTpl.onRendered(function(){
    $('#editorTpl').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var box=button.closest('.box');
      var _name=box.find(".name").text().trim();
      var _cardId=box.find(".cardId").text().trim();
      var _money=box.find(".money").text().trim();
      var _moneyPercent = box.find(".moneyPercent").text().trim()
      var _address=box.find(".address").text().trim();
      var holderId = box.find(".holderId").val() || "";
        
      var modal = $(this);
      modal.find('.name').val(_name);
      modal.find('.cardId').val(_cardId);
      modal.find('.money').val(_money);
      modal.find(".moneyPercent").val(_moneyPercent);
      modal.find(".address").text(_address);
      modal.find(".modalHolderId").val(holderId);
    });

    $('#editorTpl').on('hide.bs.modal',function(event) {
      var modal = $(this);
      modal.find("form")[0].reset();
    });   
});

Template.addTpl.onRendered(function(){
    $('#addTpl').on('hide.bs.modal',function(event) {
      var modal = $(this);
      modal.find("form")[0].reset();
    });   
});

Template.editorTpl.events({
  "click .confirm": function(event) {
    var holderName = $(".holderName").val() || "";
    var holderCode = $(".holderCode").val() || "";
    var holderMoney = $(".holderMoney").val() || "";
    var moneyPercent= $(".moneyPercent").val() || 0;
    var holderAddress = $(".holderAddress").val() || "";
    var holderSex = $(".holderSex").val() || "男";
    var holderType = $(".holderType").val() || "自然人";
    var orderId = Session.get("orderId") || "";
    var holderId = $(".modalHolderId").val() || "";
    if(orderId && holderId && holderSex && holderName && holderCode && holderAddress && holderMoney && moneyPercent) {
      var options = {
        orderId: orderId,
        holderId: holderId,
        holderName: holderName,
        holderCode: holderCode,
        holderSex: holderSex,
        holderType: holderType,
        holderMoney: holderMoney,
        moneyPercent: moneyPercent,
        holderAddress: holderAddress
      };
      Meteor.call("UpdateHolder", options);

    }
    $("#editorTpl").modal('hide');
  }
});


Template.addTpl.events({
  "click .submit": function(event) {
    var holderName = $(".holderAName").val() || "";
    var holderType = $(".holderAType").val() || "自然人";
    var holderSex = $(".holderASex").val() || "男";
    var holderCode = $(".holderACode").val() || "";
    var holderMoney = $(".holderAMoney").val() || "";
    var moneyPercent = $(".moneyAPercent").val() || 0;
    var holderAddress = $(".holderAAddress").val() || "";
    var orderId = Session.get("orderId") || "";
    var holderId = Meteor.uuid();
    console.log(moneyPercent)
    if(orderId  && holderId && holderType && holderSex && holderName && holderCode && holderAddress && holderMoney && moneyPercent) {

      var options = {
        orderId: orderId,
        holderId: holderId,
        holderName: holderName,
        holderType: holderType,
        holderCode: holderCode,
        holderSex: holderSex,
        holderMoney: holderMoney,
        moneyPercent: moneyPercent,
        holderAddress: holderAddress
      };
      console.log(options)
      Meteor.call("OrderHolderAdd", options);
      $("#addTpl").modal("hide");
    } else {
      console.log("参数不正确！")
    }
  }
})




















