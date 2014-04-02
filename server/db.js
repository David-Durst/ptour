var fs = Npm.require('fs');
var StopImagesStore = new FS.Store.GridFS("stopImagesStore");
var StopImages = new FS.Collection("stopImages", {stores: [StopImagesStore]});
var StopList = new Meteor.Collection("stopList"); 

Meteor.publish("stopList", function () { return StopList.find({}) }); 
Meteor.publish("stopImages", function (locs) { 
    //return StopImages.find({$in: locs}) 
    return StopImages.find({}) 
});

StopList.remove({});
StopImages.remove({});

//NOTE: MUST CHECK THAT THESE WORK
StopImages.allow({
    download: function(userId, fileObj) { return false; },
});
StopImages.deny({
    insert: function(userId, doc) { return true; },
    update: function(userId, doc, fields, modifier) { return true; },
    remove: function(userId, doc) { return true; },
});

var pub = '../client/app/';
//Each image must be in a folder. It must have an img.json and img.JPG file.
//The folder must be prepended with the substring 'pub-'
var dirs = fs.readdirSync(pub).filter(function (file) {
    return file.indexOf('pub-') != -1 && fs.statSync(pub + file).isDirectory();
});

for(var i = 0; i < dirs.length; i++) {
    var imgJSON = 
        JSON.parse((fs.readFileSync(pub + dirs[i] + "/img.json", 'ascii')));
    var larr = "/home/david/Documents/School Work/Junior Year/COS333/project/ptour/public/pub-chapelInside/img.JPG";
    console.log(fs.statSync(pub + dirs[i] + "/img.JPG"));
    //create a new collection for each image, allowing for fine grained
    //caching
    if (StopList.find({id:1}).count() == 0) {
        //StopImages.insert(pub + dirs[i] + "/img.JPG");
        var xad = new Uint8Array(2);
        xad[0] = 14;
        StopImages.insert(xad);
        console.log(StopImages.findOne());
        StopList.insert(imgJSON);
        console.log(StopImages.find({}).count());
    }
}     
