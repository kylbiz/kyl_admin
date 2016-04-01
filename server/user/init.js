var users = [
    {
      name: "kyladmin",
      email:"air.cui@kyl.biz",
      password: 'kyl123',
      phone: 122222334,
      roles: ['admin', 'manageusers', 'vieworders', 'editorders', 'editgoods']
    }
];

if (Meteor.users.find().count() == 0 || Roles.getUsersInRole('admin').count() == 0) {
  console.log("create");
  _.each(users, function (user) {
        var userId;
        userId = Accounts.createUser({
        username: user.name,
        password: user.password,
        profile: {
          nickname: user.name,
          phone: user.phone,
          email: user.email,
        }
        });

        console.log('create user', user.name, userId);

        if (user.roles.length >= 0) {
            console.log(user.name, 'add roles', user.roles);
            Roles.addUsersToRoles(userId, user.roles);
        }
  });

    // Roles.createRole('customer');
}
