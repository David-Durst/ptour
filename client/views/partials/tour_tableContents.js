/* Reposition clicked element to VIEW position */

Template.tour_tableContents.translateGraphItems = function(elemId,diff,offset) {
    if (diff < 0) { // move right
      $(".graph-item").animate({
        left: "+=" + offset + "px",
      }, 800, "easeInOutExpo" );
    } else {          // move left
      $(".graph-item").animate({
          left: "-=" + offset + "px",
      }, 800, "easeInOutExpo" );
    }

    $('li.active').removeClass("active");
    $(elemId).addClass("active").animate("fade",600);
}

Template.tour_tableContents.animateGraph = function(e) {
    var VIEW = 100;
    var curr = document.querySelector(e.currentTarget.id);
    var elemId = "#" + e.currentTarget.id;
    var currPosx = $(elemId).offset().left;
    var diff = currPosx - VIEW;
    var offset = "" + Math.abs(diff);

    Template.tour_tableContents.translateGraphItems(elemId,diff,offset);
}

Template.tour_tableContents.animateGraphWithId = function(e, sceneId) {
    var VIEW = 100;
    var currPosx = $(sceneId).offset().left;
    var diff = currPosx - VIEW;
    var offset = "" + Math.abs(diff);

    Template.tour_tableContents.translateGraphItems(sceneId,diff,offset);
}

Template.tour_tableContents.events({
  'click .graph-item':function(e){
    Template.tour_tableContents.animateGraph(e)
  },
  'click #control-left':function(e) {
    var LTHRESHOLD = 22;
    if ($("#scene01").offset().left < LTHRESHOLD) {
      $(".graph-item").animate({
        left: "+=300px",
      }, 800, "easeInOutExpo" );
    }
  },
  'click #control-right':function(e) {
    var RTHRESHOLD = $(window).width() * 0.85;
    if ($("#scene15").offset().left > RTHRESHOLD) {
      $(".graph-item").animate({
        left: "-=300px",
      }, 800, "easeInOutExpo" );
    }
  }

});

