Template.tour_overlaysLeft.genDep = function (def) {
    def = typeof def !== 'undefined' ? def : '';
    return {
        value: '',
        dep: new Deps.Dependency,
        get: function () {
            this.dep.depend();
            return this.value;
        },
        set: function (newValue) {
            this.value = newValue;
            this.dep.changed();
            return this.value;
        }
    };
};

Template.tour_overlaysLeft.stop = {
    title : Template.tour_overlaysLeft.genDep(),
    description : Template.tour_overlaysLeft.genDep()
};
Template.tour_overlaysLeft.point = {
    title : Template.tour_overlaysLeft.genDep(),
    description : Template.tour_overlaysLeft.genDep()
};

Template.tour_overlaysLeft.url = {
    lat : Template.tour_overlaysLeft.genDep(),
    lon : Template.tour_overlaysLeft.genDep(),
    id : Template.tour_overlaysLeft.genDep()
};

Template.tour_overlaysLeft.isDebug = function () {
    return Meteor.absoluteUrl().indexOf('localhost') != -1;
}

/* Map locId to sceneId */
Template.tour_overlaysLeft.graphIdToScene = {
    '1': '#scene01',
    '2': '#scene02',
    '3': '#scene03',
    '4': '#scene04',
    '5': '#scene05',
    '6': '#scene06',
    '7': '#scene07',
    '8': '#scene08',
    '9': '#scene09',
    '10': '#scene10',
    '11': '#scene11',
    '12': '#scene12',
    '13': '#scene13',
    '14': '#scene14',
    '15': '#scene15'
};

Template.tour_overlaysLeft.prevNextControls = function(e) {
    var currLocId = Template.tour.engine.curId();
    var sceneId = Template.tour_overlaysLeft.graphIdToScene[currLocId];
    Template.tour_tableContents.animateGraphWithId(e, sceneId);
    // Reset play/pause button for audio
    $("#btn-pause").show();
    $("#btn-play").hide();
}


Template.tour_overlaysLeft.events({
    'click #btn-prev-scene':function(e) {
        Template.tour_overlaysLeft.prevNextControls(e);
    },
    'click #btn-next-scene':function(e) {
        Template.tour_overlaysLeft.prevNextControls(e);
    },
    'click #btn-rand-point':function(e) {
        $(".interest").hide().slideDown(700, "easeOutBack");
    },
    'click #btn-pause':function(e) {
        $("#audio").trigger("pause");
        $("#btn-pause").toggle();
        $("#btn-play").toggle();
    },
    'click #btn-play':function(e) {
        $("#audio").trigger("play");
        $("#btn-play").toggle();
        $("#btn-pause").toggle();
    }
});