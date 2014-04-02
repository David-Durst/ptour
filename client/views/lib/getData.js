Template.tour.getData = function () {
    var StopImagesStore = new FS.Store.GridFS("stopImagesStore");
    var StopImages = new FS.Collection("stopImages", {stores: [StopImagesStore]});
    var StopList = new Meteor.Collection("stopList"); 
    Meteor.subscribe("stopList", function () {
        //look at http://docs.mongodb.org/manual/reference/operator/query/in/
        //for smart subscriptions
        Meteor.subscribe("stopImages", 
            StopList.find({}, {fields: {name: 1}}).map( function(d) {
                return d.name;
        }));
    });
    return {"StopList": StopList, "StopImages": StopImages};
}
