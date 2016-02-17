Template.classify.onRendered(function(){
  $('#classifyTpl').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
  });
  $(document).on("click",".list-group-item",function(){
    $("#classifyTpl").modal("hide");
    $("#itemTpl").modal("show");
  });
});