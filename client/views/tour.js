Template.tour.updateLeftOverlay = function () {
    var curStop = Template.tour.data.StopList
        .findOne({id:Template.tour.engine.curId()});
    Template.tour_overlaysLeft.stop.title.set(curStop.name);
    Template.tour_overlaysLeft.stop.description.set(curStop.description);
    Template.tour_overlaysLeft.point.title.set('');
    Template.tour_overlaysLeft.point.description.set('');
    Template.tour_overlaysLeft.url.lat.set(curStop.lat);
    Template.tour_overlaysLeft.url.lon.set(curStop.long);
    Template.tour_overlaysLeft.url.id.set(Template.tour.engine.curId());
}

Template.tour.rendered = function() {
    var initEngine = function () {
        Template.tour.engine.init();
        Template.tour.engine.animate();
        Template.tour.engine.drawPoints();
        Template.tour_header.setUpAutoComplete();
        Template.tour.updateLeftOverlay();
    };
    Template.tour.data = Template.tour.getData( function () {
        Template.tour.engine = Template.tour.engineOverlays(THREE,
            Template.tour.engine(THREE, Template.tour.idManipulation({})));
        initEngine();
    }, initEngine);

};

Meteor.startup(function () {
    Session.set('locId', 1);
});

//call this after changing locId to move the engine to that location
Template.tour.reloadLocation = function () {
    Template.tour.engine.changeImage();
    Template.tour.engine.drawPoints();
    Template.tour.changeAudio();
    Template.tour.updateLeftOverlay();
}

Template.tour.changeLocationNext = function () {
	Template.tour.engine.setNext();
    Template.tour.reloadLocation();
}
Template.tour.changeLocationPrev = function () {
    Template.tour.engine.setPrev();
    Template.tour.reloadLocation();
}
Template.tour.changeLocation = function (id) {
    Session.set('locId', id);
    Template.tour.reloadLocation();
}


Template.tour.events({
    'click .toggler': function (e) {
        $('.graph').toggle("fade", function() {
            if ($(this).is(':visible')) {
                 $('.toggler').text('Hide Menu');
            } else {
                 $('.toggler').text('Show Menu');
            }
        });
    }
});

//Produce a popup asking for name and description, put it in the file on the
//server.
Template.tour.setLocation = function (name, description) {
    var name = prompt("Name:");
    var descr = prompt("Description:");
    if (name != null && name.length > 0 && descr != null && descr.length > 0) {
        Meteor.call('setLatLon', Session.get('locId'),
        Template.tour.engine.camera.target.closeX,
        Template.tour.engine.camera.target.closeY,
        Template.tour.engine.camera.target.closeZ, Template.tour.engine.lat,
            Template.tour.engine.lon, name, descr,
            function (err, res) {console.log(JSON.stringify(res));});
    }
}
//Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Template.tour.getRandomPoint = function () {
    var points =
        Template.tour.data.StopList.findOne({id: Session.get('locId')}).points;
    //NOTE: remove in final code, 1 in 2^62 possibility of array out of bounds
    //issue, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    Template.tour.setFocus(points, getRandomInt(0, points.length - 1));
}

Template.tour.setFocus = function (arr, index) {
    Template.tour.engine.lat = arr[index].pLat;
    Template.tour.engine.lon = arr[index].pLon;
}

Template.tour.isDebug = function () {
    return Meteor.absoluteUrl().indexOf('localhost') != -1;
}

Template.tour.changeAudio = function () {
    var audio = document.getElementById('audio');
    var source = document.getElementById('mp3Source');
    source.src=  Template.tour.data.StopList.findOne(
	{id:Session.get('locId')}).mp3Url;
    audio.load();
    audio.play();
}
