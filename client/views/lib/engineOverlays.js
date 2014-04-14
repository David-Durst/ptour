Template.tour.engineOverlays = function (THREE, ret) {
    ret.drawCircle = function(p) {
        var circle = new THREE.Mesh(new THREE.CircleGeometry(3,32), new THREE.MeshNormalMaterial());  
        circle.position.x = p.pX;
        circle.position.y = p.pY;
        circle.position.z = p.pZ;
        circle.lookAt(ret.camera.position);
        circle.clickable = true;
        circle.point = p
        ret.scene.add(circle);
    }

    ret.drawPoints = function() {
        var curStop = Template.tour.data.StopList.findOne({id:Session.get('locId')});
        $.each(curStop.points, function (i,p) { ret.drawCircle(p) });
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
