fnHolder.fillDB = function (obj) {
    obj.fs = Npm.require('fs');
    obj.StopList = new Meteor.Collection("stopList"); 

    Meteor.publish("stopList", function () { return obj.StopList.find({}) }); 

    obj.StopList.remove({});

    obj.pub = '../client/app/';
    //Each image must be in a folder. It must have an img.json and img.JPG file.
    //The folder must be prepended with the substring 'pub-'
    var dirs = obj.fs.readdirSync(obj.pub).filter(function (file) {
        return file.indexOf('pub-') != -1 && obj.fs.statSync(obj.pub + file).isDirectory();
    });

    for(var i = 0; i < dirs.length; i++) {
        var imgJSON = 
            JSON.parse((obj.fs.readFileSync(obj.pub + dirs[i] + "/img.json", 'ascii')));
        imgJSON.imgUrl = dirs[i] + "/img.JPG";
        imgJSON.jsonFile = obj.pub + dirs[i] + "img.json";
        obj.StopList.insert(imgJSON);
    }     
}
