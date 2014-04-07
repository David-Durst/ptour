Template.tour.rendered = function() {

    Template.tour.data = Template.tour.getData( function () {
        Template.tour.engine = Template.tour.engineOverlays(THREE,
            Template.tour.engine(THREE));
        Template.tour.engine.init();
        Template.tour.engine.animate();
        Template.tour.engine.drawPoints();
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
    Template.tour.engine.drawPoints();
    Template.tour.changeAudio();
}

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

Template.tour.doSearch = function (query) {
    var query = prompt("Query:");
    if (query != null && query.length > 0) {
	var results = Template.tour.data.StopList.find({tags: query});
	results.forEach(function (res) {
	    console.log(res.name);
	});
    }
}
