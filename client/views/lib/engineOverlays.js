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
        var s = ""
        $.each(intersects, function (i,p) {
            if (p.object.clickable) {
                s += p.object.point.pName + " ";
            }});
        //alert(s);
    }

    return ret;
}
