var fs = Npm.require('fs');
//var StopImagesStore = new FS.Store.GridFS("stopImagesStore");
//var StopImages = new FS.Collection("stopImages", {stores: [StopImagesStore]});
var StopList = new Meteor.Collection("stopList"); 

Meteor.publish("stopList", function () { return StopList.find({}) }); 
/*Meteor.publish("stopImages", function (locs) { 
    if (StopImages.find({}).count() == 0) {
        StopList.find({}).forEach(function (d) {
            //StopImages.insert(pub + dirs[i] + "/img.JPG");
            //StopImages.insert(pub + dirs[i] + "/img.JPG", "string");
            //console.log(Meteor.absoluteUrl() + dirs[i] + "/img.JPG", "string");
            StopImages.insert(d.imgUrl);
            console.log(d.imgUrl);
            //StopImages.insert("http://www.ptour.co/testTexture.jpg");
            console.log(StopImages.findOne());
            console.log(StopImages.find({}).count());
        });
    }
    //return StopImages.find({$in: locs}) 
    return StopImages.find({}) 
});*/

StopList.remove({});
//StopImages.remove({});

//NOTE: MUST CHECK THAT THESE WORK
/*StopImages.allow({
    download: function(userId, fileObj) { return false; },
});
StopImages.deny({
    insert: function(userId, doc) { return true; },
    update: function(userId, doc, fields, modifier) { return true; },
    remove: function(userId, doc) { return true; },
});*/

var pub = '../client/app/';
//Each image must be in a folder. It must have an img.json and img.JPG file.
//The folder must be prepended with the substring 'pub-'
var dirs = fs.readdirSync(pub).filter(function (file) {
    return file.indexOf('pub-') != -1 && fs.statSync(pub + file).isDirectory();
});

for(var i = 0; i < dirs.length; i++) {
    var imgJSON = 
        JSON.parse((fs.readFileSync(pub + dirs[i] + "/img.json", 'ascii')));
    imgJSON.imgUrl = Meteor.absoluteUrl() + dirs[i] + "/img.JPG";
    //imgJSON.imgUrl = Meteor.absoluteUrl() + "testTexture.jpg";
    StopList.insert(imgJSON);
    //console.log("hi");
    //create a new collection for each image, allowing for fine grained
    //caching
}     
