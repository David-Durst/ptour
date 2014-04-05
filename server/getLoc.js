fnHolder.getLoc = function (obj) {
    Meteor.methods({
        setLatLon: function (THREE, locId, lat, lon, name, description) {
            var loc = obj.StopList.findOne({id:locId});
            loc.points.push({
                pLat: lat,
                pLon: lon,
                pName: name,
                pDescription: description,
            });
            obj.fs.writeFileSync(imgJSON.jsonFile, JSON.stringify(loc))
        }
    });
}
