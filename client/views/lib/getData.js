Template.tour.getData = function (onDataLoad) {
    //var StopImagesStore = new FS.Store.GridFS("stopImagesStore");
   // var StopImages = new FS.Collection("stopImages", {stores: [StopImagesStore]});
    var StopList = new Meteor.Collection("stopList"); 
    Meteor.subscribe("stopList", onDataLoad);
    //return {"StopList": StopList, "StopImages": StopImages};
    return {"StopList": StopList};
}
