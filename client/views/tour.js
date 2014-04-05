Template.tour.rendered = function() {

    Template.tour.data = Template.tour.getData( function () {
        Template.tour.engine = Template.tour.engine(THREE);
        Template.tour.engine.init();
        Template.tour.engine.animate();
    });

};

Meteor.startup(function () {
    Session.set('locId', 1);
});

Template.tour.changeLocation = function () {
    if (Session.get('locId') == 1)
	Session.set('locId', 2);
    else
	Session.set('locId', 1);

    Template.tour.engine.changeImage();
}

//Produce a popup asking for name and description, put it in the file on the
//server.
Template.tour.setLocation = function (name, description) {
    var name = prompt("Name:");
    var descr = prompt("Description:");
    if (name != null && name.length > 0 && descr != null && descr.length > 0) {
        Meteor.call('setLatLon', Session.get('locId'), Template.tour.engine.lat, 
            Template.tour.engine.lon, name, descr, 
            function (err, res) {console.log(JSON.stringify(res));});
    }
}

Template.tour.isDebug = function () {
    return Meteor.absoluteUrl().indexOf('localhost') != -1;
}
