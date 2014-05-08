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
	    Template.tour.changeLocation(id);
	}
    });

    /* Anything that gets to the document
       will hide the dropdown */
    $(document).click(function(){
	$(".ui-autocomplete").hide();
    });

    /* Clicks within the dropdown won't make
       it past the dropdown itself */
   $(".ui-autocomplete").click(function(e){
	e.stopPropagation();
    });

    /* Do not submit form on enter */
   $('#searchForm').submit(function(e) {
	if (!$('#search').val()) {
	    e.preventDefault();
	}       
    });
};
