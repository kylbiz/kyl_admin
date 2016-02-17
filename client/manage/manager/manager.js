
Template.managerList.helpers({
    managerListData: function () {
        return function () {
            return Meteor.users.find({_id: {$ne: Meteor.userId()}, "roles": {$all: ["admin"]}}).fetch();
        };
    },
    optionsObject: {
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
              title: '邮箱',
              data: 'profile.email'
          },
          {
            title: '注册时间',
            data: 'time'
          },
          {
            title: "操作",
            className: ['col-md-5', 'handle'],
            render: function(cellData, renderType, currentRow) {
              var userId = currentRow._id;

              var html = '<button class="btn btn-primary setadmin" value=' + userId + '>修改</button>'
                            + '<button class="btn btn-danger deleteadmin col-sm-offset-1" value=' + userId + '>删除</button>'
              return html;
            }
          }
        ]
    }
});


Template.managerList.events({
	'click .setadmin': function (event, template) {
		Router.go("adminSet", { _id: $(event.currentTarget).val() });
	},

    'click .deleteadmin': function (event, template) {
        Meteor.call("deleteUser", $(event.currentTarget).val(), function(err, result) {
            if (err) {
                alert(err);
            } else {
                alert(result);
            }
        });
    },

    'click .addadmin': function (event, template) {
        Router.go('adminSet', {_id: 'addadmin'});
    }
});
