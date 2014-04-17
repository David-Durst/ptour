Template.tour.getData = function (onDataLoad, reInit) {
    //if it has already been defined, return it and don't resubscribe, a hack,
    //but can't figure out a better place to put this.
    if (typeof Template.tour.data !== 'undefined') {
        reInit();
        return Template.tour.data;
    }
    var StopList = new Meteor.Collection("stopList"); 
    Meteor.subscribe("stopList", onDataLoad);
    return {"StopList": StopList};
}
