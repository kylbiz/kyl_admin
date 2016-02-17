Template.primaryDetail_partial.onRendered(function(){    
//handleBoxTools 
    //remove
    function remove() {
        var name=$(this).closest('.box-title').find("span.name").text();
        var holderId=$(this).closest('.box-title').find(".holderId").val();
        var orderId = Session.get("orderId");
        var message="确定删除股东:"+name+"?";
        var object=$(this).closest('.box');
        bootbox.confirm(message, function(result) {
            if (result) {
                //data
                //object.remove();
                if(orderId && holderId) {
                    var options = {
                        orderId: orderId,
                        holderId: holderId
                    };
                    Meteor.call('deleteHolder', options);
                }
            }else{

            }
        })              
    }
    $(document).on("click",".remove",remove);    
    //collapse
    function collapse(){
        var el = $(this).closest(".box").children(".box-body");
        if ($(this).hasClass("collapse")) {
            $(this).removeClass("collapse").addClass("expand");
            var i = $(this).children(".fa-chevron-up");
            i.removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideUp(200);
        } else {
            $(this).removeClass("expand").addClass("collapse");
            var i = $(this).children(".fa-chevron-down");
            i.removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideDown(200);
        }      
    }
    $(document).on("click",".box .tools .collapse,.box .tools .expand",collapse);
});


Template.primaryDetail_partial.events({
    "click .genereateChe": function(event) {
        var orderId = Session.get("orderId") || "";
        var zone = $(event.currentTarget).attr("data-zone") || "";
        var holdernum = $(event.currentTarget).attr("data-holdernum") || 0;
        var uuid = Meteor.uuid();

        if(zone !== "浦东" && zone !== "虹口") {
            alert("小白云目前只支持虹口和浦东！");
        } else if(!orderId) {
            alert("必须有订单号，方能生成文档！");
        } else if(!uuid) {
            alert("内部错误，生成失败！");
        } else if(!holdernum >= 1) {
            alert("必须有股东信息，方能生成文档！");
        } else {
            var options = {
                orderId: orderId,
                uuid: uuid,
                zone: zone
            }
            var zoneStr = "hk";
            if(zone === "浦东") {
                zoneStr = "pd";
            }
            Meteor.call("GenerateCheTemplate", options);
            var num = 0;
            if(holdernum > 1) {
                num = 1;
            } 
            Router.go("/template?uuid=" + uuid + '&type=check&zone=' + zoneStr + '&holdernum=' + num);
            
        }

    },
    "click .generateReg": function(event) {
        var orderId = Session.get("orderId") || "";
        var zone = $(event.currentTarget).attr("data-zone") || "";
        var holdernum = $(event.currentTarget).attr("data-holdernum") || 0;
        var uuid = Meteor.uuid();

        if(zone !== "浦东" && zone !== "虹口") {
            alert("小白云目前只支持虹口和浦东！");
        } else if(!orderId) {
            alert("必须有订单号，方能生成文档！");
        } else if(!uuid) {
            alert("内部错误，生成失败！");
        } else if(holdernum < 1) {
            alert("必须有股东信息，方能生成文档！");
        } else {
            var options = {
                orderId: orderId,
                uuid: uuid,
                zone: zone
            }
            var zoneStr = "hk";
            if(zone === "浦东") {
                zoneStr = "pd";
            }
            Meteor.call("GenerateRegTemplate", options);
            Router.go("/template?uuid=" + uuid + '&type=registration&zone=' + zoneStr + '&holdernum=' + holdernum);
            
        }

    }    
})
 






