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
