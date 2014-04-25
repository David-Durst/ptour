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
