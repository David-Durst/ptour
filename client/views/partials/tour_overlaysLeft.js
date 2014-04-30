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
    '99': '#scene03',
    '3': '#scene04',
    '4': '#scene05',
    '100': '#scene06',
    '5': '#scene07',
    '6': '#scene08',
    '7': '#scene09',
    '8': '#scene10',
    '9': '#scene11',
    '12': '#scene12',
    '13': '#scene13',
    '14': '#scene14',
    '15': '#scene15'
};

Template.tour_overlaysLeft.prevNextControls = function(e) {
    var currLocId = Template.tour.engine.curId();
    var sceneId = Template.tour_overlaysLeft.graphIdToScene[currLocId];

    Template.tour_tableContents.animateGraphWithId(e, sceneId);
}

Template.tour_overlaysLeft.events({
    'click #btn-prev-scene':function(e) {
        Template.tour_overlaysLeft.prevNextControls(e);
    },
    'click #btn-next-scene':function(e) {
        Template.tour_overlaysLeft.prevNextControls(e);
    },
    'click #btn-rand-point':function(e) {
        $(".interest").hide().slideDown(700, "easeOutElastic");
    }
});