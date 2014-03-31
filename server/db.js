Meteor.startup(function () {
    var fs = Npm.require('fs');
    var StopImages = new FS.Store.GridFS("stopImages");
    var StopList = new Meteor.Collection("stopList"); 
    StopList.remove({})

    var pub = '../client/app/';
    //Each image must be in a folder. It must have an img.json and img.JPG file.
    //The folder must be prepended with the substring 'pub-'
    var dirs = fs.readdirSync(pub).filter(function (file) {
        return file.indexOf('pub-') != -1 && fs.statSync(pub + file).isDirectory();
    });

    for(var i = 0; i < dirs.length; i++) {
        imgJSON = 
            JSON.parse((fs.readFileSync(pub + dirs[i] + "/img.json", 'ascii')));
        if (StopList.find({id:1}).count() == 0) {
            var tmp = new FS.Collection(imgJSON.name, {stores: [StopImages]});
            tmp.insert(pub + dirs[i] + "/img.JPG");
            StopList.insert(imgJSON);
        }
    } 
    
});
