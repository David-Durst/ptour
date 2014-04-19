Template.tour_header.setUpAutoComplete = function () {
    var stops = Template.tour.data.StopList.find({});
    var suggestions = [];
    
    stops.forEach(function (stop) {
	for (var i = 0; i < stop.tags.length; i++) {
	    suggestions.push(stop.tags[i] + ", " + stop.name);
	}
    });
    
    $("#searchBox").autocomplete({
	source: suggestions,
	select: function( event, ui) {
	    var stopName = ui.item.value.split(', ')[1];
	    var id = Template.tour.data.StopList.findOne(
		{name:stopName}).id;
	    Session.set('locId', id);
	    Template.tour.engine.changeImage();
	    Template.tour.engine.drawPoints();
	    Template.tour.changeAudio();
	    Template.tour.updateLeftOverlay();
	}
    });
};

/* Anything that gets to the document
   will hide the dropdown */
$(document).click(function(){
  $("#dropdown").hide();
});

/* Clicks within the dropdown won't make
   it past the dropdown itself */
$("#dropdown").click(function(e){
  e.stopPropagation();
});
