Template.source_boxTemplate.onRendered(function(){

  var table =  $("table.table");
  var tr = table.find("tr").first();
  var th = tr.find("th");
  var source = tr.find("th.source-data")
  var index = th.index(source);

  $(".nav-tabs li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    if(!index) {
      console.log("error!")
      return false;
    }
    var text = $(this).text().replace(/\s/g, "");
    if(text=="全部订单") {
      text="";
      table.DataTable().columns(index).visible(true);
    }
    else {
      if(text == "手机端") {
        text='新版微信|移动端';
      }
      table.DataTable().columns(index).visible(false);
    }

    table.DataTable().columns(index).search(text, true).draw();
  });
})
