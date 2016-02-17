Template.basicLayout.helpers({
	username: function () {
		return Meteor.user().username || "hello";
	},
});