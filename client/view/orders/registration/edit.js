Template.editorFactory.onCreated(function(){  
    Session.set("baseInfoEdit",false);
    Session.set("vocationEdit",false);
    Session.set("mainInfoEdit",false);  
    Session.set("expressInfoEdit",false);
    Session.set("introInfoEdit",false);
    Session.set("contractorEdit",false);
});

Template.editorFactory_partial.onCreated(function() {
    Session.set("addressEdit", false);
});

Template.editorFactory_partial.events({
  "click .editAddress": function(e, template) {
    Session.set("addressEdit", true);  
  },
  "click .cancelAddress": function(event) {
    Session.set("addressEdit", false);
  },
  "click .saveAddress": function(event) {
    Session.set("addressEdit", false);

    var companyAddress = $(".companyAddress").val() || "";
    var orderId = Session.get("orderId") || "";
    var companyMoney = $(".companyMoney").val() || 0;
    if(orderId && companyAddress) {
      var options = {
        orderId: orderId,
        companyAddress: companyAddress,
        companyMoney: companyMoney
      }
      Meteor.call("updateCompanyAddress", options);
    } else {

    }
  }
})




Template.editorFactory_partial.helpers({
  "baseInfoEdit":function(){
    return Session.get("baseInfoEdit");    
  },
  "vocationEdit":function(){
    return Session.get("vocationEdit"); 
  },
  "mainInfoEdit":function(){
    return Session.get("mainInfoEdit"); 
  },
  "expressInfoEdit":function(){
    return Session.get("expressInfoEdit");
  },
  "introInfoEdit":function(){
    return Session.get("introInfoEdit"); 
  },
  "contractorEdit":function(){
    return Session.get("contractorEdit");
  },
  "addressEdit": function() {
    return Session.get("addressEdit");
  }
})


Template.editorFactory.events({
  "click .editBtn":function(e,template){
    var prop=$(e.currentTarget).closest(".module").data("module");
    Session.set(prop,true);
  },
  "click .saveBtn":function(e,template){
    var prop=$(e.currentTarget).closest(".module").data("module");
    Session.set(prop,false);
  },
  "click .cancelBtn":function(e,template){
    var prop=$(e.currentTarget).closest(".module").data("module")
    Session.set(prop,false);
    return false;  
  }
})


Template.editorFactory.events({
  "click .addressInfo": function(event) {
    var receiver = $(".receiver").val() || "";
    var address = $(".address").val() || "";
    var phone = $(".phone").val() || "";
    var zipcode = $(".zipcode").val() || "";
    var relationId = $(".relationId").val() || "";

    if(relationId && address && receiver && phone && zipcode) {
      var options = {
        relationId: relationId,
        receiver: receiver,
        address: address,
        phone: phone,
        zipcode: zipcode
      };
      Meteor.call('updateOrderAddress', options);
    } else {
    }
  }
})


Template.editorFactory.events({
  "click .personInfo": function(event) {
    var legalPersonName = $(".legalPersonName").val() || "";
    var legalPersonId = $(".legalPersonId").val() || "";
    var legalPersonPhone = $(".legalPersonPhone").val() || "";
    var legalPersonTel = $(".legalPersonTel").val() || "";
    var legalPersonEmail = $(".legalPersonEmail").val() || "";
    var supervisorName = $(".supervisorName").val() || "";
    var supervisorId = $(".supervisorId").val() || "";
    var orderId = $(".orderId").val() || "";

    if(orderId && legalPersonName && legalPersonId 
      && legalPersonPhone && legalPersonEmail
      && supervisorName && supervisorId) {
      var options = {
        orderId: orderId,
        legalPersonId: legalPersonId,
        legalPersonName: legalPersonName,
        legalPersonPhone: legalPersonPhone,
        legalPersonTel: legalPersonTel,
        legalPersonEmail: legalPersonEmail,
        supervisorId: supervisorId,
        supervisorName: supervisorName
      };
      Meteor.call("OrderEditPerson", options);
    }
  } 
});

Template.editorFactory.events({
  "click .companyName": function(event) {
    var orderId = $(".orderId").val() || "";
    var alternativeName1 = $(".alternativeName1").val() || "";
    var alternativeName2 = $(".alternativeName2").val() || "";
    var alternativeName3 = $(".alternativeName3").val() || "";
    var alternativeName4 = $(".alternativeName4").val() || "";
    var mainName = $(".mainName").val() || "";

    if(orderId && mainName && (alternativeName1 || alternativeName2 || alternativeName3 || alternativeName4)) {
      var options = {
        orderId: orderId,
        mainName: mainName,
        alternativeName1: alternativeName1,
        alternativeName2: alternativeName2,
        alternativeName3: alternativeName3,
        alternativeName4: alternativeName4
      };
      console.log("updateCompanyName: 1")
      Meteor.call("updateCompanyName", options);
    } else {
      console.log("updateCompanyName: 2")
    }
  }
})

Template.editorFactory_partial.helpers({
  'industryBigLists': function() {
    Meteor.subscribe('getBusinessTypeLists');

    var typeLists = BusinessTypeLists.find();
    return typeLists;
  },
  'industrySmallLists': function() {
    var industryBig = Session.get('industryBig') || "";
    var self = this;
    self.industrySmall = [];
    Meteor.subscribe('getIndustrySmall', industryBig);

    var businesses = Business.find({industryBig: industryBig});
    if(businesses.count()) {
      businesses.forEach(function(business) {
        var businessObj = {
          name: business.industrySmall
        }
        self.industrySmall.push(businessObj);
      })
    };
    return self.industrySmall;
  }
}) 





Template.editorFactory_partial.events({
  'change #industryBig': function(event) {
    var industryBig = $('#industryBig').val() || "";
    if(industryBig !== null) {
      Session.set('industryBig', industryBig);
    }
  },
  'click #industryBtn': function(event) {
    var industryBig = $('#industryBig').val() || "";
    var industrySmall = $('#industrySmall').val() || "";
    var orderId = $('.orderId').val() || "";
    console.log(orderId, industryBig, industrySmall, orderId && industryBig && industrySmall)
    if(orderId && industryBig && industrySmall && industryBig !== null && industrySmall !== null) {
      var industryOptions = {
        orderId: orderId,
        industryBig: industryBig,
        industrySmall: industrySmall
      };
      Meteor.call('updateIndustry', industryOptions);
    }
  }
});


Template.editorFactory_partial.events({
  'click #scopeEdit': function() {
    var orderId = $(".orderId").val() || "";
    var contents=[];
    $("#dataTable").find(".check-control").each(function(index,element){
      var smart=$(element).prop("checked");
      if(smart)
      {
        content=$(element).closest(".td").text().trim();
        contents.push(content);
      }
    });
    var scopeEditOptions = {
      orderId: orderId,
      contents: contents
    };
    Meteor.call('EditScope', scopeEditOptions);
  }
})




Meteor.subscribe('IndustryLists');
Template.classify.helpers({
  'serviceTypeList': function() {
    var business1 = Business1.findOne({businessBig: '服务类'});
    if(business1) {
      return business1.businessSmall
    }
  },
  'salesTypeList': function() {
    var business1 = Business1.findOne({businessBig: '销售类'});
    if(business1) {
      return business1.businessSmall
    }    
  }

})

Template.classify.events({
  "click .productTypeR": function(event) {
    var contents = $(event.currentTarget).data("content");
    Session.set("contents", contents)
  }
})

Template.itemR.helpers({
  "contents": function() {
    var contentsStr = Session.get("contents");
    if(typeof(contentsStr) === "string") {
      return contentsStr.split(",");
    } else {
      return contentsStr;
    }
  }
})

Template.itemR.events({
  "click .confirm": function(event) {
      var contents = [];
      $("#dataTableR").find(".check-control").each(function(index,element){
      var smart=$(element).prop("checked");
      if(smart)
      {
        content=$(element).closest("li").text().trim();
        contents.push(content);
      }
    });
    var orderId = $(".orderId").val() || "";
    if(orderId && contents) {
      var options = {
        orderId: orderId,
        contents: contents
      };
    Meteor.call('UpdateIndustryDetail', options);      
    $("#itemTpl").modal("hide");
    }
  }
})



Template.editorFactory.events({
  "click .consignerSave": function(event) {

    var orderId = Session.get('orderId');
    var EmailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var PhoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

    var consignerName = $("#consignerName").val().trim() || "";
    var consignerPhone = $("#consignerPhone").val().trim() || "";
    var consignerEmail = $("#consignerEmail").val().trim() || "";

    if(orderId && consignerName && EmailReg.test(consignerEmail) && PhoneReg.test(consignerPhone)) {
      var options = {
        orderId: orderId,
        consignerName: consignerName,
        consignerPhone: consignerPhone,
        consignerEmail: consignerEmail
      };
      Meteor.call("UpdateOrderConsigner", options);
    }
  }
})


Template.editorFactory.events({
  "click .saveContractor": function(event) {
    var orderId = Session.get('orderId');
    var IdReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var EmailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var PhoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

    var liaisonsName = $("#liaisonsName").val() || "";
    var liaisonsId = $("#liaisonsId").val() || "";
    var liaisonsPhone = $("#liaisonsPhone").val() || "";
    var liaisonsEmail = $("#liaisonsEmail").val() || "";

    var financialStaffName = $("#financialStaffName").val() || "";
    var financialStaffId = $("#financialStaffId").val() || "";
    var financialStaffPhone = $("#financialStaffPhone").val() || "";
    var financialStaffEmail = $("#financialStaffEmail").val() || ""; 
    
    //财务负责方式
    var financialAgent =$("#agentSelect").val().trim()||"";
    
    if(orderId && liaisonsName && IdReg.test(liaisonsId) && PhoneReg.test(liaisonsPhone) && financialStaffName && IdReg.test(financialStaffId) && PhoneReg.test(financialStaffPhone) && EmailReg.test(liaisonsEmail) && EmailReg.test(financialStaffEmail) && financialStaffId !== liaisonsId) {
      var options = {
        orderId: orderId,
        liaisons: {
          liaisonsName: liaisonsName,
          liaisonsId: liaisonsId,
          liaisonsPhone: liaisonsPhone,
          liaisonsEmail: liaisonsEmail
        },
        financialStaff: {
          financialStaffName: financialStaffName,
          financialStaffId: financialStaffId,
          financialStaffPhone:  financialStaffPhone,
          financialStaffEmail: financialStaffEmail,
          financialAgent: financialAgent
        }
      };
      Meteor.call('CompayContractorHandle', options);    
    }
  }
});

//财务负责人编辑状态
Template.editorFactory.events({
  "change #agentSelect":function(e,template){
    var self = $(e.currentTarget);
    var current = self.val();
    console.log(current);
    if(current==1){
      Session.set("editAgent",true);
    }
    else if(current==2){
      Session.set("editAgent",false);
    }
  }
});

//财务负责人编辑状态
Template.editorFactory_partial.onRendered(function(){  
  Session.set("editAgent",Orders.findOne().contractor.financialStaff.financialAgent);  
  this.autorun(function(){
    if(!Session.get("contractorEdit")) {
      Session.set("editAgent",Orders.findOne().contractor.financialStaff.financialAgent);      
    }    
  })  
});

//财务负责人编辑状态
Template.editorFactory_partial.helpers({
  "financialAgent":function(){
    return Session.get("editAgent");               
  }
})