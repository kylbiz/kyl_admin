var userListOpt = {
    columns: [
      {
          title: '名字',
          data: 'username', 
          className: 'username'
      },
      {
          title: '电话',
          data: 'profile.phone'
      },
      {
        title: '注册时间',
        data: 'time'
      },
      {
        title: "操作",
        className: 'handle',
        render: function(cellData, renderType, currentRow) {
          var userId = currentRow._id;
          var html = '<button class="btn btn-danger showdetail" value=' + userId + '>详细</button>'  
          return html;
        }
      }
    ],
    pageLength: 10,
    lengthMenu: [10, 15, 20,25, 50],
    order: [[2, 'desc']]
};

Template.userList_partial.helpers({
    userlistData: function () {
        return function () {
          return Meteor.users.find({_id: {$ne: Meteor.userId()}, "roles": {$all: ["customer"]}}).fetch();
        };
    },
    optionsObject: userListOpt 
});


Template.userList.events({
  'click .showdetail': function(event, template) {
      // var userInfo = Users.find("_id": $(event.currentTarget).val());
      Router.go("userDetail", { _id: $(event.currentTarget).val() });
  }
});