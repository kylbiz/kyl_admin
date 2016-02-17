

// 创建新用户的权限
Accounts.validateNewUser(function (user) {
  if (Meteor.users.find().count() == 0 || Roles.getUsersInRole('admin').count() == 0) {
    return true;
  }
  
  var loggedInUser = Meteor.user();
  if (Roles.userIsInRole(loggedInUser, ['admin','manageusers'])) {
    // NOTE: This example assumes the user is not using groups. 
    console.log("create user true");
    return true;
  }

  console.log("create user false");
  throw new Meteor.Error(403, "Not authorized to create new users");
});

// 操作用户的方法
Meteor.methods({
  checkUserHandlePermission: function () {
    var loggedInUser = Meteor.user();
    if (!loggedInUser ||
      !Roles.userIsInRole(loggedInUser, ['manageusers'])) {
      return false;
  } else {
    return true;
  }
},
   /**
    * check user permission for login this platform
    * @return {Boolean} true if permit 
    */
    checkLoginPermission: function(username) {
      var user = Meteor.users.findOne({"username": username});
      if(!user || !Roles.userIsInRole(user._id, ['admin'])) {
        return false;
      } else {
        return true
      }
    },

  /**
   * delete a user from a specific group
   * 
   * @method deleteUser
   * @param {String} targetUserId _id of user to delete
   * @param {String} group Company to update permissions for
   */
   deleteUser: function (targetUserId) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
      !Roles.userIsInRole(loggedInUser, 
        ['manageusers'])) {
      throw new Meteor.Error(403, "Access denied")
  }

    // remove permissions for target group
    Roles.setUserRoles(targetUserId, []);

    // do other actions required when a user is removed...
    Meteor.users.remove(targetUserId);

    return "delete user ok";
  },

  /**
   *  create user
   */
   addUser: function (user) {
    console.log("addUser", user);

    var loggedInUser = Meteor.user();
    if (!user || !loggedInUser || !Roles.userIsInRole(loggedInUser, ['manageusers'])) {
      throw new Meteor.Error(403, "Access denied");
    } 

    var info = user.info;
    var userId = Accounts.createUser({
      username: info.username,
      password: info.password,
      profile: {
        nickname: info.username,
        phone: info.phone,
        email: info.email,
      }
    });

    console.log('create user', info.username, userId);

    if (user.roles && user.roles.length >= 0) {
      console.log(info.username, 'add roles', user.roles);
      Roles.addUsersToRoles(userId, user.roles);
    }

    return "add " + info.username + " ok";
  },

  updateUser: function(targetUserId, user) {
        // var info = userInfo.info;
        console.log("update user", targetUserId, user);

        var loggedInUser = Meteor.user();

        if (!user || !loggedInUser ||
          !Roles.userIsInRole(loggedInUser, 
            ['manageusers'])) {
          throw new Meteor.Error(403, "Access denied");
      }    

      var roles = user.roles;
      Roles.setUserRoles(targetUserId, roles);

      var info = user.info;
      var targetUser = Meteor.users.update({_id: targetUserId}, {$set: {
        'username': info.username,
        'profile.email': info.email,
        'profile.phone': info.phone
      }}, function (err, result) {
        if (err) {
          console.log("update user err", err);
          throw new Meteor.Error(403, "update user err");
        } else {
          console.log("update user succeed", result);
        }
      });

      if (info.password) {
        console.log("change password");
        Accounts.setPassword(targetUserId, info.password);
      }
    },
    updateSelf: function (user) {
      if (Meteor.userId()) {
        var targetUser = Meteor.users.update({_id: Meteor.userId()}, {$set: {
          'username': user.username,
          'profile.email': user.email,
          'profile.phone': user.phone
        }}, function (err, result) {
          if (err) {
            console.log("update user err", err);
            throw new Meteor.Error(403, "update you self err");
          } else {
            console.log("update user succeed", result);
          }
        });
      } else {
        throw new Meteor.Error(403, "Not authorized to update you self");
      }
    },

  /**
   * update a user's permissions
   *
   * @param {Object} targetUserId Id of user to update
   * @param {Array} roles User's new permissions
   * @param {String} group Company to update permissions for
   */
   updateRoles: function (targetUserId, roles, group) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
      !Roles.userIsInRole(loggedInUser, 
        ['manage-users'], group)) {
      throw new Meteor.Error(403, "Access denied!")
  }
  if (roles || group) {      
    Roles.setUserRoles(targetUserId, roles, group)
  }
},
})
