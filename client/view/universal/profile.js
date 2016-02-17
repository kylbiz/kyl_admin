Template.profile.events({
	'click .savebtn_passwd': function (event, template) {
		console.log("save personal data");
		var passwd_old_input = template.$('[name=password_old]');
		var passwd_new_input = template.$('[name=password_new]');
		var passwd_repeat_input = template.$('[name=password_repeat]');
		var warn_div = template.$('#warn_div');
		var warn_lab = template.$('#warn_lab');
		showWarn(false)

		var passwd_old = passwd_old_input.val() || '';
		var passwd_new  = passwd_new_input.val() || '';
		var passwd_repeat = passwd_repeat_input.val() || '';

		if (passwd_old.length < 6 || passwd_new.length < 6 || passwd_repeat.length < 6) { 
			showWarn("密码长度不少于6");
			return;
		}

		if (passwd_new != passwd_repeat) {
			showWarn("新密码两次输入不一致");
			return;
		}

		Accounts.changePassword(passwd_old, passwd_new, function (err) {
			if (err) {
				showWarn("设置密码失败 " + err);
			} else {
				alert("设置成功");
				passwd_old_input.val("");
				passwd_new_input.val("");
				passwd_repeat_input.val("");
				showWarn(false);
			}
		});


		function showWarn(str) {
			console.log("showWarn", str);
			if (str) {
				warn_div.show();
				warn_lab.text(str);
			} else {
				warn_div.hide();
				warn_lab.text('');
			}
		}
	},
	'click .savebtn_basic': function (event, template) {
		var input_username = template.$('[name=username]');
		var input_phone = template.$('[name=phone]');
		var input_email = template.$('[name=email]');

		var username = input_username.val();
		if (!username) {
			alert("用户名不可为空");
			return;
		}

		var phone = input_phone.val();
		var email = input_email.val();

		Meteor.call('updateSelf', {phone: phone, email: email, username: username}, function (err, result) {
			if (err) {
				alert(err);
			} else {
				alert("ok");
			}
		});



	}
});