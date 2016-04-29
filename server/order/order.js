function log(info) {
  console.log('-------------------------');
  var length = arguments.length;
  for(var i = 0; i < length; i++) {
    console.log(arguments[i]);
  }
}


Meteor.methods({
  "updateOrderAddress": function(options) {
    log("updateOrderAddress: Hi, I am called.");
    if(!options || !options.relationId || !options.receiver || !options.address || !options.phone || !options.zipcode ) {
      console.log('user address options not legal');
      console.log(options);
    } else {
      var relationId = options.relationId;


      Orders.update({relationId: relationId}, {
        $set: {
          "addressInfo.receiver": options.receiver,
          "addressInfo.address": options.address,
          "addressInfo.phone": options.phone,
          "addressInfo.zipcode": options.zipcode
        }
      }, {
        multi: true
      }, function(err) {
        if(err) {
          console.log('update user address information error');
          console.log(err);
        } else {
          console.log('update user address information succeed');
        }
      })
    }
  }
});


Meteor.methods({
  "UpdateOrderProgress": function(options) {
    if(!options || !options.relationId || !typeof(options.status) === 'number') {
      console.log('order progress update stop for options illegal');
      console.log(options);
    } else {
      var relationId = options.relationId;
      var status = options.status;
      Orders.update({relationId: relationId}, {
        $set: {
          "productProgress.status": status
        }
      }, {
        upsert: true,
        multi: true
      }, function(err) {
        if(err) {
          console.log('update order progress error');
          console.log(err);
        } else {
          console.log('update order progress succeed');
        }
      })
    }
  },

})


Meteor.methods({
  "UpdateOrderRemark": function (orderId, remarkInfo) {
    if (!orderId || !remarkInfo) {
      throw new Meteor.Error("参数不可为空");
    }

    var orderInfo = Orders.findOne({orderId: orderId}) || false;
    if (!orderInfo ) {
      throw new Meteor.Error("参数非法");
    }

    Orders.upsert({orderId: orderId}, {$set: {remark: remarkInfo || ""}});
  }
});



Meteor.methods({
  "UpdateHolder": function(options) {
    if(!options || !options.orderId || !options.holderId  || !options.holderSex || !options.holderName || !options.holderCode || !options.holderAddress || !options.holderMoney || !options.moneyPercent) {
      console.log('order update holder options illegal');
      console.log(options);
    } else {
      console.log(options)
      Orders.update(
        {
          orderId: options.orderId,
          "holders.holderId": options.holderId
        }, {
        $set: {
          "holders.$.holderName": options.holderName,
          "holders.$.sex": options.holderSex,
          "holders.$.holderType": options.holderType,
          "holders.$.code": options.holderCode,
          "holders.$.money": options.holderMoney,
          "holders.$.moneyPercent": options.moneyPercent,
          "holders.$.address": options.holderAddress
        }
      }, {
        multi: true
      }, function(err) {
        if(err) {
          console.log('update holder error');
          console.log(err);
        } else {
          console.log('update holder succeed');
        }
      })
    }
  }
});


Meteor.methods({
  "deleteHolder": function(options) {
    if(!options || !options.orderId || !options.holderId) {
      console.log("delete holder failed for options illegal");
    } else {
      console.log(options)
      Orders.update({
        orderId: options.orderId
        }, {
        $pull: {
          holders: {
            holderId: options.holderId
          }
        }
      },  function(err) {
        if(err) {
          console.log("delete holder error");
          console.log(err);
        } else {
          console.log("delete holder succeed");
        }
      })
    }
  }
})


//----------------------------------------------------------------------------

Meteor.methods({
  "OrderHolderAdd": function(options) {
    if(!options || !options.orderId || !options.holderId || !options.holderSex || !options.holderName || !options.holderCode || !options.holderAddress || !options.holderMoney || !options.holderType || !options.moneyPercent) {
      console.log('order add holder options illegal');
      console.log(options);
    } else {
      Orders.update({
          orderId: options.orderId,
      }, {
        $push: {
          "holders": {
            holderId: options.holderId,
            holderName: options.holderName,
            holderType: options.holderType,
            sex: options.holderSex,
            code: options.holderCode,
            money: options.holderMoney,
            moneyPercent: options.moneyPercent,
            address: options.holderAddress
          }
        }
      }, {
        upsert: true
      }, function(err) {
        if(err) {
          console.log('add holder error');
          console.log(err);
        } else {
          console.log('add holder succeed');
        }
      })
   }
  }
});


Meteor.methods({
  'OrderEditPerson': function(options) {
      var orderId = options.orderId || "";
      var legalPersonName = options.legalPersonName || "";
      var legalPersonId = options.legalPersonId || "";
      var legalPersonPhone = options.legalPersonPhone || "";
      var legalPersonTel = options.legalPersonTel || "";
      var legalPersonEmail = options.legalPersonEmail || "";
      var supervisorName = options.supervisorName || "";
      var supervisorId = options.supervisorId || "";
      if(orderId && legalPersonName
        && legalPersonId && supervisorName
        && supervisorId) {
        Orders.update({orderId: orderId }, {
          $set: {
            legalPerson: {
              legalPersonName: legalPersonName,
              legalPersonId: legalPersonId,
              legalPersonPhone: legalPersonPhone,
              legalPersonTel: legalPersonTel,
              legalPersonEmail: legalPersonEmail
            },
            supervisor: {
              supervisorName: supervisorName,
              supervisorId: supervisorId
            }
          }
        }, {
          upsert: true
        },function(err) {
          if(err) {
            log('update order person information error', err);
          } else {
            log('update order person information succeed');
          }
        })
      } else {
        log('person information not complately', options);
      }
  }
})



Meteor.methods({
  'updateCompanyName': function(options) {
    log("updateCompanyName: Hi, I am called.", options);
    if(options && options.orderId && options.mainName
      && (options.alternativeName1 || options.alternativeName2
        || options.alternativeName3 || options.alternativeName4)) {
      var orderId = options.orderId;
      delete options.orderId;
      var companyName = options;
      log(companyName)
      Orders.update({orderId: orderId}, {
        $set: {
          companyName: companyName
        }
      }, function(err) {
        if(err) {
          log('update company name error', err);
        } else {
          log('update company name succeed');
        }
      })
    } else {
      log('update company name error, for the information you provided not valid', options);

    }
  }
})



Meteor.methods({
  'updateIndustry': function(industryOptions) {
    if(!industryOptions || !industryOptions.orderId || !industryOptions.industryBig || !industryOptions.industrySmall) {
      log("industryOptions illegal", industryOptions);
    } else {
      var orderId = industryOptions.orderId || "";
      var industryBig = industryOptions.industryBig || "";
      var industrySmall = industryOptions.industrySmall || "";
      var businessScope = [];
      var business = Business.findOne({industryBig: industryBig, industrySmall: industrySmall});
      if(business) {
        businessScope = business.content;
      }

      if(businessScope.length > 0 && industryOptions && orderId && industryBig !== null && industrySmall !== null && industryBig !== "" && industrySmall !== "") {

        Orders.update({orderId: orderId}, {
          $set: {
            industryBig: industryBig,
            industrySmall: industrySmall,
            businessScope: businessScope
          }
        }, function(err) {
          if(err) {
           log('update industry type error', err);
          } else {
            log('update industry type succeed');
          }
        });

      } else {
       log('update industry type error, check you parameters', industryOptions);
      }
    }
  }
})




Meteor.methods({
  'EditScope': function(options) {
    if(options && options.orderId
      && options.contents instanceof Array ) {
      Orders.update({orderId: options.orderId}, {
        $set: {
          businessScope: options.contents
        }
      }, function(err) {
        if(err) {
          log('Edit business scope error', err);
        } else {
          log('Edit business scope succeed')
        }
      })
    } else {
      log("Edit business scope failed for options illegal", options);
    }
  }
})




Meteor.methods({
  'UpdateIndustryDetail': function(options) {
    var orderId = options.orderId;
    var contents = options.contents;

    if(options && orderId
      && contents instanceof Array ) {
      Orders.update({orderId: orderId}, {
        $pushAll: {
          businessScope: contents
        }
      }, function(err) {
        if(err) {
          log('Add business scope error');
        } else {
          log('Add business scope succeed')
        }
      })
    }
  }
})



Meteor.methods({
  "UpdateOrderConsigner": function(options) {
      var EmailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      var PhoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if(!options || !options.orderId || !options.consignerName || !EmailReg.test(options.consignerEmail) || !PhoneReg.test(options.consignerPhone)) {
        var err = "consigner information not complately";
        log(err, options);
      } else {
        var orderId = options.orderId;
        var consigner = {
          consignerName: options.consignerName,
          consignerPhone: options.consignerPhone,
          consignerEmail: options.consignerEmail
        };

        Orders.update({orderId: orderId}, {
          $set:{
            consigner: consigner
          }
        }, function(err) {
          if(err) {
            log("update order consigner error", err);
          } else {
            log("update order consigner succeed");
          }
        })
      }
  }
});



Meteor.methods({
  'CompayContractorHandle': function(options) {
    var IdReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var EmailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var PhoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

    if(!options || !options.orderId
      || !options.liaisons
      || !IdReg.test(options.liaisons.liaisonsId)
      || !PhoneReg.test(options.liaisons.liaisonsPhone)
      || !EmailReg.test(options.liaisons.liaisonsEmail)
      || !options.financialStaff
      || !IdReg.test(options.financialStaff.financialStaffId)
      || !PhoneReg.test(options.financialStaff.financialStaffPhone)
      || !EmailReg.test(options.financialStaff.financialStaffEmail)) {
      var err = 'contractor information not complately';
      log(err, options);
    } else {
      var orderId = options.orderId;
      var liaisons = options.liaisons;
      var financialStaff = options.financialStaff;

      Orders.update({orderId: orderId }, {
        $set: {
           contractor: {
            liaisons: liaisons,
            financialStaff: financialStaff
           }
        }
      }, function(err) {
        if(err) {
          log('update contractor information error', err);
        } else {
          log('update contractor information succeed');
        }
      })
    }
  }
})


Meteor.methods({
  "updateCompanyAddress": function(options) {
    log("updateCompanyAddress: Hi, I am called");
    if(!options
      || !options.hasOwnProperty("orderId")
      || !options.hasOwnProperty("companyAddress")
      || !options.hasOwnProperty("companyMoney")) {
      log("updateCompanyAddress: options illegal", options);
    } else {
      var orderId = options.orderId;
      var companyAddress = options.companyAddress;
      var companyMoney = options.companyMoney;
      Orders.update({
        orderId: orderId
      }, {
        $set: {
          companyAddress: companyAddress,
          companyMoney: companyMoney
        }
      }, {
        upsert: true
      }, function(err) {
        if(err) {
          log("updateCompanyAddress: update address error", err);
        } else {
          log("updateCompanyAddress: update address succeed.");
        }
      })
    }
  }
})




Meteor.methods({
  'getOrdersCount': function (opt) {
    opt = opt || {};
    opt.payed = true;
    return Orders.find(opt).count();
  }
});




