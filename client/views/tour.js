Template.tour.rendered = function() {

    Template.tour.engine = Template.tour.engine(THREE);

    Template.tour.engine.init();
    Template.tour.engine.animate();

};
