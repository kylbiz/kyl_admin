Router.route("/template", {
  name: "template",
  onBeforeAction: function() {
    if (!Meteor.userId()) {
      Router.go('/sign-in');
    } else {
      var uuid = this.params.query.uuid || "";
      var type = this.params.query.type || "check";
      var zone = this.params.query.zone || "hk";
      var holdernum = this.params.query.holdernum || "1";

      Session.set("uuid", uuid);
      Session.set("type", type);
      Session.set("zone", zone);
      Session.set("holdernum", holdernum);

    }
    this.next();
  },
  subscriptions: function() {
    var uuid = this.params.query.uuid || "";
    Meteor.subscribe('GetHandleResults', uuid);
    Meteor.subscribe("getDocNum");
  }
})