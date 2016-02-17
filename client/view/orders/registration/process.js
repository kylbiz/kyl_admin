Template.processTpl.onRendered(function(){
    $('#processTpl').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var modal = $(this);
      
      var status = button.data("status");      
      var circle = modal.find(".process-box").find(".circle");
      var length = circle.length -1;
      if(status>length) {
        status = length;
      }
      circle.eq(status).addClass("active").siblings().removeClass("active");

      var relationid=button.data("relationid");

      modal.find(".process-box").data("id",relationid);    
    })
    
    $(".process-box .circle").click(function(){
      $(this).addClass("active").siblings().removeClass("active");
    });
  
    $(".btn-primary").click(function(){
        var relationid = $(".process-box").data("id");
        var index= $(".process-box").find(".active").first().index();
        console.log(relationid && typeof(index) === 'number')
        if(relationid && typeof(index) === 'number') {
          var options = {
            relationId: relationid,
            status: index
          };

          Meteor.call("UpdateOrderProgress", options);
        }
        $('#processTpl').modal("hide");
    });
});

