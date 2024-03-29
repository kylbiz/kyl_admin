Template.login.events({
  "click .submit": function(event) {
    var userName = $("#userName").val() || "";
    var userPassword = $("#userPassword").val() || "";

    if(userName && typeof(userPassword) === 'string' && userPassword.length >= 6) {
      Meteor.call("checkLoginPermission", userName, function(err, result) {
        if(result) {
          Meteor.loginWithPassword(userName, userPassword, function(err) {
            if(err) {
              $("[id=loginError]").html("登录失败,请再次登录!");           
              $("[id=loginError]").show();                    
            }
          })    

        } else {

          $("[id=loginError]").html("登录失败，禁止访问!");           
          $("[id=loginError]").show();      
        }
      })
    }
  }
});


Template.login.events({
  "focus": function(event) {
    $("#loginError").hide();
  }
})