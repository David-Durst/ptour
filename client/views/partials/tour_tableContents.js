/* Reposition clicked element to VIEW position */

Template.tour_tableContents.events({
  'click .graph-item':function(e) {
    var VIEW = 100;
    var curr = document.querySelector(e.currentTarget.id);
    var currPosx = $("#" + e.currentTarget.id).offset().left;
    var diff = currPosx - VIEW;
    var offset = "" + Math.abs(diff);

    console.log("id: " + e.currentTarget.id);
    console.log(currPosx);


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
    $("#" + e.currentTarget.id).addClass("active").animate("fade",600);

  },
  /* Left/Right links on graph */
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

