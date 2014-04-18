Template.tour.engineOverlays = function (THREE, ret) {
    ret.drawPOI = function(p) {
        var material = new THREE.MeshBasicMaterial( {
            map: THREE.ImageUtils.loadTexture('landing/icons/point_24x24.png'),
            transparent:true,
            opacity: 0.9,
            color: 0x000000
        });
        var poi = new THREE.Mesh(new THREE.CircleGeometry(4,32), material);  
        poi.position.x = p.pX;
        poi.position.y = p.pY;
        poi.position.z = p.pZ;
        poi.lookAt(ret.camera.position);
        poi.clickable = true;
        poi.point = p
        ret.scene.add(poi);
    }

    ret.drawPoints = function() {
        var curStop = Template.tour.data.StopList.findOne({id:Session.get('locId')});
        $.each(curStop.points, function (i,p) { ret.drawPOI(p) });
    }

    ret.pointClicked = function (intersects) {
        var i = 0;
        var point = {};
        $.each(intersects, function (i,p) {
            if (i === 0 && p.object.clickable) {
                point.title = p.object.point.pName;
                point.description = p.object.point.pDescription;
            }
            i = 1;
        });
        //alert(s);
        Template.tour_overlaysLeft.point.title.set(point.title);
        Template.tour_overlaysLeft.point.description.set(point.description);
    }

    return ret;
}
