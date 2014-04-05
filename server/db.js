var fs = Npm.require('fs');
var StopList = new Meteor.Collection("stopList"); 

Meteor.publish("stopList", function () { return StopList.find({}) }); 

StopList.remove({});

var pub = '../client/app/';
//Each image must be in a folder. It must have an img.json and img.JPG file.
//The folder must be prepended with the substring 'pub-'
var dirs = fs.readdirSync(pub).filter(function (file) {
    return file.indexOf('pub-') != -1 && fs.statSync(pub + file).isDirectory();
});

for(var i = 0; i < dirs.length; i++) {
    var imgJSON = 
        JSON.parse((fs.readFileSync(pub + dirs[i] + "/img.json", 'ascii')));
    imgJSON.imgUrl = dirs[i] + "/img.JPG";
    StopList.insert(imgJSON);
}     
