Template.tour.rendered = function() {

    Template.tour.engine = Template.tour.engine(THREE);

    Template.tour.engine.init();
    Template.tour.engine.animate();

};

Meteor.startup(function () {
    Session.set('location', 'fristNorth.JPG');
});

Template.tour.changeLocation = function () {
    if (Session.get('location') === 'fristNorth.JPG')
	Session.set('location', 'mccosh.JPG');
    else
	Session.set('location', 'fristNorth.JPG');

    Template.tour.engine.changeImage();
}
