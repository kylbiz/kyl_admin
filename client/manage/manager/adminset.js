Template.adminDetail_partial.events({
	'click .backbtn': function  () {
		Router.go('manager');
	},
	'click .savebtn': function (event, template) {
		// // $(event.currentTarget)
		var input_username = template.$('#username');
		var input_phone = template.$('#phone');
		var input_email = template.$('#email');
		var input_password = template.$('#password');

		var inputs = [input_username, input_phone, input_email, input_password];
		
		var checkBoxs_permission = template.$('[name=permissions]');
		var permissions = ['vieworders', 'editorders', 'manageusers'];
		var selected = [];
		_.each(checkBoxs_permission, function(checkBox) {
			selected.push($(checkBox).prop("checked"));
		});

		for (key in permissions) {
			if (!selected[key]) {
				permissions.splice(key,1);
			}
		}
		permissions.push('admin');


		userInfo = {
			info: {
				username: template.$('#username').val() || this.username,
				phone: template.$('#phone').val() || this.profile.phone,
				email: template.$('#email').val() || this.profile.email,
				password: template.$('#password').val(),
			},
			roles: permissions
		};

		if (this._id == 'addadmin') {
			// console.log('addadmin');
			Meteor.call('addUser', userInfo, function (err, result) {
				if (err) {
					alert(err);
				} else {
					alert(result);
					_.each(inputs, function(input) {
						 input.val('');
					});
					_.each(checkBoxs_permission, function(checkBox) {
						$(checkBox).prop("checked", false);
					});
				}
			});

		} else {
			Meteor.call('updateUser', this._id, userInfo, function (err, result) {
				if (err) {
					alert(err);
				} else {
					alert("updateUser ok", result);
				}
			});
		}

	}
});

Template.adminDetail_partial.helpers({
	permissions: function () {

		var arr = {'admin': false, 'vieworders': false, 'editorders': false, 'manageusers': false};
		var roles = this.roles;

		for(key in roles) {
			arr[ roles[key] ] = true;
		} 
		return arr;
	}
});