fnHolder.defineMethods = function (obj) {
    Meteor.methods({
        setLatLon: function (locId, x, y, z, lat, lon, name, description) {
            if (fnHolder.isDebug()) {
                var loc = obj.StopList.findOne({id:locId});
                obj.StopList.update(loc, {
                    $push : { points : {
                    pX: x,
                    pY: y,
                    pZ: z,
                    pLat: lat,
                    pLon: lon,
                    pName: name,
                    pDescription: description,
                }}});
                console.log(obj.StopList.findOne({id:locId}).points);
                return obj.StopList.findOne({id:locId}).points;
                //console.log(loc.jsonFile);
                //obj.fs.writeFileSync(loc.jsonFile, JSON.stringify(loc));
            }
        },

    });
}
