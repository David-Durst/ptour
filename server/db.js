Meteor.startup(function () {
    var fs = Npm.require('fs');
    var stopStore = new FS.Store.GridFS("stops");
    var StopList = new Meteor.Collection("stopList"); 
    StopList.remove({})

    var pub = '../client/app/';
    //Each image must be in a folder. It must have an img.json and img.JPG file.
    //The folder must be prepended with the substring 'pub-'
    var dirs = fs.readdirSync(pub).filter(function (file) {
        /*console.log(pub + file);
          if (file == '.pulse')
          return false;
          else
          return false;*/
        return file.indexOf('pub-') != -1 && fs.statSync(pub + file).isDirectory();
    });

    for(var i = 0; i < dirs.length; i++) {
        //console.log(pub + dirs[i] + "/img.json");
        //console.log(fs.readFileSync(pub + dirs[i] + "/img.json", 'ascii'));
        imgJSON = 
            JSON.parse((fs.readFileSync(pub + dirs[i] + "/img.json", 'ascii')));
        //console.log(StopList.findOne());
        if (StopList.find({id:1}).count() == 0) {
            console.log(imgJSON.name);
            //console.log(imgJSON[name]);
            var tmp = new FS.Collection(imgJSON.name, { stores: [stopStore]});
            tmp.insert(pub + dirs[i] + "/img.JPG");
            StopList.insert(imgJSON);
        }
    } 
    console.log(StopList.find().count());
    
});
