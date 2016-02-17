Meteor.subscribe('registrationLists');

var registrationlistsOptions = {
  columns: [{
    title: '产品名称',
    data: 'name'
  }, {
    title: '注册产品代码',
    data: "type"
  }, {
    title: "操作",
    className: 'handle-btn',
    render: function(cellData, renderType, currentRow) {
      var listId = currentRow._id;
      var name = currentRow.name || "";
      var type = currentRow.type || "";
      var url = '/manager/registration/' + listId;
      var  html = "<a href=" + url + "><button type='button' class='btn btn-primary'>详细信息</button></a>";
      html += "<button type='button' class='btn btn-danger deleteRegistrationBtn'  data-name='" + name + "' data-type='" + type +  "' data-id='" + listId + "' data-toggle='modal' data-target='#deleteRegistration'>删除</button>"
      return html;
    }
  }]
}

var reactiveFun = function() {
  return RegistrationLists.find({
    name: /./
  }).fetch();
};

Template.registrationInfoLists.helpers({
  registrationListsData: function() {
    return reactiveFun;
  },
  optionsObject: registrationlistsOptions
});


/**
 * registration 列表
 */

Template.registrationManageDetail.helpers({
  "registration": function() {
    var listId = Session.get("listId");
    return RegistrationLists.findOne({
      _id: listId
    })
  }
})

Template.registrationManageDetail.onRendered(function() {
  Session.set('toggle', false);
});

Template.registrationManageDetail.events({
  "click .changebtn": function(event) {
    var toggle = Session.get("toggle");
    if (toggle === true || toggle === "true") {
      Session.set("toggle", false);
    } else {
      Session.set("toggle", true);
    }
  }
});


Template.registrationManageDetail.helpers({
  isEditable: function() {
    return Session.get('toggle');
  },
  btnClass: function() {
    if (Session.get('toggle'))
      return 'btn-warning save-btn'
    else
      return 'btn-info edit-btn'
  }

});

/**
 * 修改registration 的基本信息： 名称，代码
 */

Template.registrationManageDetail.events({
  "click #registrationMain": function(event) {
    var registrationName = $(".registrationName").val() || "";
    var registrationType = $(".registrationType").val() || "";
    var listId = Session.get("listId") || "";
    if (Meteor.userId() && listId && registrationName && registrationType) {
      var options = {
        userId: Meteor.userId(),
        listId: listId,
        registrationName: registrationName,
        registrationType: registrationType
      };
      Meteor.call('checkUserHandlePermission', function(error, result) {
        console.log(arguments)
        if (result && result === true) {
          Meteor.call("UpdateRegistrationMainInfo", options, function(err, result) {
            console.log(arguments)
            if (result && result.status === 0) {
              $("#mainError").html(result.message);
              $("#mainError").show();
            } else if (result && result.status === 1) {
              $("#mainSuccess").html(result.message);
              $("#mainSuccess").show();
            } else {
              $("#mainError").html("更新信息失败，请重新提交！");
              $("#mainError").show();
            }
          })
        } else {
          $("#mainError").html("没有权限，不允许操作！");
          $("#mainError").show();
        }
      })
    } else {
      $("#mainError").html("信息不完成，不能提交！");
      $("#mainError").show();
    }
  },
  "focus input": function(event) {
    $("#mainError").hide();
    $("#mainSuccess").hide();
  }
})

/**
 * 增加区域信息
 * 
 */

Template.registrationManageDetail.events({
  "click .addzonesave": function(event) {
    var modal = $("#addZone");
    var zone = modal.find(".addZoneZone").val() || "全区";
    var payment = modal.find("#addZonePayment").val() || 0;
    var message = modal.find("#addZoneMessage").val() || "";
    var listId = Session.get("listId") || "";
    var userId = Meteor.userId();
    if (userId && listId && zone && payment && message) {
      var options = {
        listId: listId,
        userId: userId,
        zone: zone,
        payment: payment,
        message: message
      }
      Meteor.call("upsertRegistrationZone", options, function(err, result) {
        if (result && result.status === 1) {
          $('#addZone').modal('hide')
        } else if (result && result.status === 0) {
          $("#addzoneerror").html(result.message || "更新信息失败，请重新提交！")
          $("#addzoneerror").show();
        } else {
          $("#addzonesuccess").html(result.message || "更新信息失败，请重新提交！")
          $("#addzonesuccess").show();
        }
      })
    } else {
      $("#addzoneerror").html("信息不完整，不能提交！")
      $("#addzoneerror").show();
    }
  },
  "focus input,textarea": function() {
    $("#addzoneerror").hide();
    $("#addzonesuccess").hide();
  }
});

Template.registrationManageDetail.onRendered(function() {
  $('#addZone').on('show.bs.modal', function(e) {
    var modal = $(this);
    modal.find("form")[0].reset();
    $("#addzonesuccess").hide();
    $("#addzoneerror").hide();
  });

  $("#deleteZone").on("show.bs.modal", function(event) {
    var modal = $(this);

    var button = $(event.relatedTarget);
    var zone = button.attr("data-zone") || "";
    var payment = button.attr("data-payment") || 0;
    var message = button.attr("data-message") || 0;

    modal.find(".deletezonezone").html(zone);
    modal.find(".deletezonepayment").html(payment);
    modal.find(".deletezonemessage").html(message);
  });

  $("#editZone").on("show.bs.modal", function(event) {
    var modal = $(this);

    var button = $(event.relatedTarget);
    var zone = button.attr("data-zone") || "";
    var payment = button.attr("data-payment") || 0;
    var message = button.attr("data-message") || 0;

    modal.find(".editzonezone").val(zone);
    modal.find(".editzonepayment").val(payment);
    modal.find(".editzonemessage").val(message);
  });
});


/**
 * registration 中的区域操作
 */

Template.registrationManageDetail.events({
  "click .deleteconfirm": function(event) {
    var zone = $(".deletezonezone").html() || "";
    var listId = Session.get("listId");
    var userId = Meteor.userId();


    if (Meteor.userId() && listId &&  zone) {
      var options = {
        listId: listId,
        userId: userId, 
        zone: zone
      };

      Meteor.call("deleteRegistrationZone", options);
      $('#deleteZone').modal('hide')
    } 
  },
  "click .editzoneconfirm": function(event) {
    var zone = $(".editzonezone").val() || "";
    var payment = $(".editzonepayment").val() || "";
    var message = $(".editzonemessage").val() || "";
    var listId = Session.get("listId");
    var userId = Meteor.userId();


    if (userId && listId && zone && payment && message) {
      var options = {
        listId: listId,
        userId: userId, 
        zone: zone,
        payment: payment,
        message: message
      };

      Meteor.call("upsertRegistrationZone", options, function(err, result) {
        if (result && result.status === 1) {
          $('#editZone').modal('hide')
        } else if (result && result.status === 0) {
          $("#editzoneerror").html(result.message || "更新信息失败，请重新提交！")
          $("#editzoneerror").show();
        } else {
          $("#editzonesuccess").html(result.message || "更新信息失败，请重新提交！")
          $("#editzonesuccess").show();
        }
      })
    } else {
      $("#editzoneerror").html("信息不完整，不能提交！")
      $("#editzoneerror").show();
    }
  },
  "focus input,textarea": function() {
    $("#editzoneerror").hide();
    $("#editzonesuccess").hide();
  } 
});

Template.registrationInfoLists.onRendered( function(){
  $("#deleteRegistration").on("show.bs.modal", function(event) {
    var modal = $(this);
    var button = $(event.relatedTarget);
    var name = button.attr("data-name") || "";
    var type = button.attr("data-type") || 0;
    var listId = button.attr("data-id") || "";

    modal.find(".deleteRegistrationName").html(name);
    modal.find(".deleteRegistrationType").html(type);
    modal.find(".deleteRegistrationId").html(listId);
  });
})

/**
 * 删除 registration list
 */

Template.registrationInfoLists.events({
  "click .deleteregistrationconfirm": function(event) {
    var button = $(event.currentTarget);
    var listId = $(".deleteRegistrationId").html() || "";
    var userId = Meteor.userId();
    console.log(listId, userId)
    if(listId && userId) {
      var options = {
        listId: listId,
        userId: userId
      };
      console.log(options)
      Meteor.call("deleteRegistrationHandle", options);
    };
    $("#deleteRegistration").modal("hide");
  }
});

/**
 * 新增 registration list 
 */

Template.registrationInfoLists.events({
  "click .addregistrationconfirm": function(event) {
    var userId = Meteor.userId();
    var name = $(".addRegistrationName").val() || "";
    var type = $(".addRegistrationType").val() || "";
    console.log(userId, name, type)
    if(userId && name && type) {
      var options = {
        userId: userId,
        name: name, 
        type: type
      };
      Meteor.call("addRegistrationList", options, function(err, result) {
        if(result && result.status === 1) {
          $("#addRegistrationList").modal("hide");
        } else if(result && result.status == 0) {
          $("#addReError").html(result.message || "新怎公司注册失败，请重试！");
          $("#addReError").show();
        } else {
          $("#addReError").html("新怎公司注册失败，请重试！");
          $("#addReError").show();
        }
      })
    } else {
      $("#addReError").html("参数不完整，请重新提交！");
      $("#addReError").show();
    }
  },
  "focus input": function(event) {
    $("#addReError").hide();
  }
})

