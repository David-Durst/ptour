Template.tour.engineOverlays = function (THREE, ret) {
    ret.drawCircle = function(x, y, z) {
        var circle = new THREE.Mesh(new THREE.CircleGeometry(3,32), new THREE.MeshNormalMaterial());  
        circle.position.x = x;
        circle.position.y = y;
        circle.position.z = z;
        circle.lookAt(ret.camera.position);
        ret.scene.add(circle);
    }

    ret.drawPoints = function() {
        var curStop = Template.tour.data.StopList.findOne({id:Session.get('locId')});
        $.each(curStop.points, function (i,p) { ret.drawCircle(p.pX, p.pY, p.pZ) });
    }
    return ret;
}
