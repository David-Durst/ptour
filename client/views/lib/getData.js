AD = 1;
Template.tour.getData = function () {
    StopList = new Meteor.Collection("stopList"); 
    ImageList = {};
    Meteor.subscribe("stopList", function () {
        StopList.find({}).forEach(function (stop) {
            ImageList[stop.name] = new Meteor.Collection(stop.name);
            //look at http://docs.mongodb.org/manual/reference/operator/query/in/
            //for smart subscriptions
            Meteor.subscribe(stop.name);
        });
    });
    return {"StopList": StopList, "ImageList": ImageList};
}
