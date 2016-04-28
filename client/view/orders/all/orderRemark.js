Template.orderRemark.onRendered( function(){
    $('#orderRemark').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var modal = $(this);

      var orderId = button.data("orderid");
      var remark = button.data("remark") || "";

      modal.find("#remarkInfo").val(remark);
      modal.find("#remarkInfo").data("orderid", orderId);
    })

    $(".btn-primary").click(function() {
      var orderId = $("#remarkInfo").data("orderid");
      var remarkInfo = $("#remarkInfo").val();
      Meteor.call("UpdateOrderRemark", orderId, remarkInfo);
      $('#orderRemark').modal("hide");
    });
});
