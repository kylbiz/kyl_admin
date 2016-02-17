function log(info) {
  console.log('-------------------------');
  var length = arguments.length;
  for (var i = 0; i < length; i++) {
    console.log(arguments[i]);
  }
}


/**
 * updateRegistrationMainInfo
 * 修改 registration list 的基本信息：名称，名称代码
 */

Meteor.methods({
  "UpdateRegistrationMainInfo": function(options) {
    function HandleRegistrationMain(callback) {
      if (!options || !options.userId || !options.listId || !options.registrationName || !options.registrationType) {
        log("UpdateRegistrationMainInfo failed, options illegal", options);
        callback(null, {
          status: 0,
          message: "更新信息失败，信息必须完整！"
        });
      } else {
        var user = Meteor.users.find({
          _id: options.userId,
          "roles": {
            $all: ["manageusers"]
          }
        });
        if (user) {
          RegistrationLists.update({
            _id: options.listId
          }, {
            $set: {
              name: options.registrationName,
              type: options.registrationType
            }
          }, function(err) {
            if (err) {
              log("product registration main information update error", err);
              callback(null, {
                status: 0,
                message: "更新信息失败，请重新提交信息！"
              });
            } else {
              log("product registration main information update succeed");
              callback(null, {
                status: 1,
                message: "更新公司注册产品信息成功！"
              })
            }
          })
        } else {
          log("user do not have authority to handle RegistrationLists db");
          callback(null, {
            status: 0,
            message: "更新失败，没有权限操作该信息"
          });
        }
      }
    }
    var handleRegistration = Async.wrap(HandleRegistrationMain);
    var response = new handleRegistration();
    return response;
  }
});


/**
 * 修改 registration list 中的区域信息
 */

Meteor.methods({
  "upsertRegistrationZone": function(options) {
    console.log("addRegistrationZone")

    function RegistrationZone(callback) {
      if (!options || !options.userId || !options.listId || !options.zone || !options.payment || !options.message) {
        log("registration zone information upsert failed for options illegal", options);
        callback(null, {
          status: 0,
          message: "修改区域信息失败，信息不完整！"
        });
      } else {
        var user = Meteor.users.find({
          _id: options.userId,
          "roles": {
            $all: ["manageusers"]
          }
        });
        if (user) {
          console.log(options)
          RegistrationLists.update({
            _id: options.listId,
            "services.zone": options.zone
          }, {
            "$set": {
              "services.$.zone": options.zone,
              "services.$.payment": options.payment,
              "services.$.message": options.message
            }
          }, function(err, result) {
            console.log(arguments)
            if (err) {
              log("add zone information error", err);
              callback(err, {
                status: 0,
                message: "修改区域信息失败！"
              })
            } else {
              if (result === 0) {
                RegistrationLists.update({
                  _id: options.listId,
                  "services.zone": {
                    $ne: options.zone
                  }
                }, {
                  $push: {
                    services: {
                      zone: options.zone,
                      payment: options.payment,
                      message: options.message
                    }
                  }
                }, function(err) {
                  if (err) {
                    log("updsert zone information error", err);
                    callback(err, {
                      status: 0,
                      message: "修改区域信息失败！"
                    })
                  } else {
                    log("upsert zone information succeed");
                    callback(null, {
                      status: 1,
                      message: "修改区域信息成功！"
                    })
                  }
                })
              } else {
                callback(null, {
                  status: 1,
                  message: "修改区域信息成功！"
                })
              }
            }
          })
} else {
  log("user do not have authority to handle RegistrationLists db");
  callback(null, {
    status: 0,
    message: "更新失败，没有权限操作该信息"
  });
}
}
}

var registrationZonen = Async.wrap(RegistrationZone);
var response = new registrationZonen();
return response;
}
});

/**
 * 删除registration 中的区域信息
 */

Meteor.methods({
  "deleteRegistrationZone": function(options) {
    if(!options || !options.listId || !options.userId || !options.zone) {
      log("delete registration zone failed", options);
    } else {
      var user = Meteor.users.find({
        _id: options.userId,
        "roles": {
          $all: ["manageusers"]
        }
      });
      if(user) {
        RegistrationLists.update({
          _id: options.listId
        }, {
          $pull: {
            "services": {
              zone: options.zone
            }
          }
        }, function(err) {
          if(err) {
            log("delete registration lists zone error", err);
          } else {
            log("delete registration lists zone succeed");
          }
        })
      } else {
        log("current user : " + options.userId + " do not have permission to delete registration zone");
      }
    }
  }
})

/**
 * 删除registration list  
 */

Meteor.methods({
  "deleteRegistrationHandle": function(options) {
    if(!options || !options.listId || !options.userId) {
      log("delete registration list failed", options);
    } else {
     var user = Meteor.users.find({
      _id: options.userId,
      "roles": {
        $all: ["manageusers"]
      }
    });
     if(user) {
      RegistrationLists.remove({
        _id: options.listId
      }, function(err) {
        if(err) {
          log("delete registration list error", err);
        } else {
          log("delete registration succeed");
        }
      })
    } else {
      log("user " + options.userId + " do not have permission to hancle registration lists");
    } 
  }
}
});

/**
 * 新增 registration list
 */

Meteor.methods({
  "addRegistrationList": function(options) {
    function RegistrationList(callback) {
      if(!options || !options.userId || !options.name || !options.type) {
        log("add registration list failed", options);
        callback(null, {status: 0, message: "参数不全，增加失败！"})
      } else {
       var user = Meteor.users.find({
        _id: options.userId,
        "roles": {
          $all: ["manageusers"]
        }
      });
       if(!user) {
        log("use do not have permission to hancle registration list");
        callback(null, {status: 0, message: "增加失败，没有权限！"});
      } else {

        RegistrationLists.update({
          name: options.name
        }, {
          $set: {
            name: options.name,
            type: options.type
          }
        }, {
          upsert: true
        }, function(err) {
          if(err) {
            log("registration list add error", err);
            callback(null, {status: 0, message: "新增公司注册信息失败，请重试！"});
          } else {
            log("registration list add succeed");
            callback(null, {status: 1, message: "新增公司注册信息成功！"})
          }
        })
      }
    }
  }
  var RegistrationHandleAdd = Async.wrap(RegistrationList);
  var response = new RegistrationHandleAdd();
  return response;
}
})



