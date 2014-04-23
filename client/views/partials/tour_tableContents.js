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
        }, "slow" );
    } else {          // move left
        $(".graph-item").animate({
            left: "-=" + offset + "px",
        }, "slow" );
    }
  }
  //'click .active':function(e) {}
});

//   /* For L/R Links that we don't necessarily need */
//   $("#right").click(function(e) {
//     $("li").animate({
//       left: "-=150px",
//     }, "fast" );
//   });

//   $("#left").click(function(e) {
//     $("ul").animate({
//       left: "+=150px",
//     }, "fast" );
//   });

// }