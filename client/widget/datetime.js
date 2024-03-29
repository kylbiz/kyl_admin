Template.datetime.onRendered(function(){
  
    $.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今天",
        suffix: [],
        meridiem: ["上午", "下午"]
    };

    this.$(".form_datetime").datetimepicker({
        language :"zh-CN",
        format: "yyyy-MM-dd hh:mm",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });

    $("#datetimeSearch").click(function () {
      $("table.table").DataTable().draw();
    });  
  
    $(".datetime-reset").click(function () {
      $(this).closest("form")[0].reset();

      $("table.table").DataTable().draw();
    })
});