Template.tour.engine = function (THREE, ret) {

    //TravelToTarget is whether we are rotating to a target in lat or long. 
    ret.travelLonToTarget = false, ret.travelLatToTarget = false;
    ret.travelRate = 2;
    ret.targetLon = 0, ret.targetLat = 0;
    ret.onPointerDownPointerX = 0, ret.onPointerDownPointerY = 0, ret.lon = 0, ret.onPointerDownLon = 0, ret.lat = 0, ret.onPointerDownLat = 0, ret.phi = 0, ret.theta = 0, ret.rho = 500, ret.rhoRatio = 0.3;

    ret.pointClicked = function (intersects) {
        //Do nothing for now, gets overwritten later.
        //this should just handle overzealous clickers.
        //EngineOverlays.js handles actual logic.
    }

    ret.init = function () {

        var container, mesh;

        container = document.getElementById( 'container' );

        ret.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
        ret.camera.target = new THREE.Vector3( 0, 0, 0 );

        ret.projector = new THREE.Projector();
        ret.raycaster = new THREE.Raycaster();

        ret.scene = new THREE.Scene();

        var geometry = new THREE.SphereGeometry( ret.rho, 60, 40 );
        geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

        var material = new THREE.MeshBasicMaterial( {
            map: THREE.ImageUtils.loadTexture( ret.getCurImgUrl() )
        });

        ret.getPrevNext();

        mesh = new THREE.Mesh( geometry, material );

        mesh.clickable = false;

        ret.scene.add( mesh );

        ret.renderer = Detector.webgl? new THREE.WebGLRenderer(): new THREE.CanvasRenderer();
        ret.renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( ret.renderer.domElement );

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
        document.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);

        //

        window.addEventListener( 'resize', onWindowResize, false );

	Template.tour.changeAudio();

    }

    function onWindowResize() {

        ret.camera.aspect = window.innerWidth / window.innerHeight;
        ret.camera.updateProjectionMatrix();

        ret.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onDocumentMouseDown( event ) {

        event.preventDefault();

        ret.isUserInteracting = true;

        //Stop moving if they click
        ret.travelLonToTarget = 0;
        ret.travelLatToTarget = 0;

        ret.onPointerDownPointerX = event.clientX;
        ret.onPointerDownPointerY = event.clientY;

        ret.onPointerDownLon = ret.lon;
        ret.onPointerDownLat = ret.lat;

        var vec = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1, 1);

        ret.projector.unprojectVector(vec, ret.camera);

        ret.raycaster.set(ret.camera.position, vec.sub(ret.camera.position).normalize());

        ret.intersects = ret.raycaster.intersectObjects(ret.scene.children);
        //        alert(ret.scene.children);
        
        if (ret.intersects.length > 1) {
            ret.pointClicked(ret.intersects);
        }

    }

    function onDocumentMouseMove( event ) {

        if ( ret.isUserInteracting === true ) {

            ret.lon = ( ret.onPointerDownPointerX - event.clientX ) * 0.1 + ret.onPointerDownLon;
            ret.lat = ( event.clientY - ret.onPointerDownPointerY ) * 0.1 + ret.onPointerDownLat;

        }

    }

    function onDocumentMouseUp( event ) {

        ret.isUserInteracting = false;

    }

    function onDocumentMouseWheel( event ) {

        // WebKit

        if ( event.wheelDeltaY ) {

            ret.camera.fov -= event.wheelDeltaY * 0.05;

            // Opera / Explorer 9

        } else if ( event.wheelDelta ) {

            ret.camera.fov -= event.wheelDelta * 0.05;

            // Firefox

        } else if ( event.detail ) {

            ret.camera.fov += event.detail * 1.0;

        }

        //ensure never get too close or too far out
        //numbers chosen by guess and check.
        if (ret.camera.fov < 15) {
            ret.camera.fov = 15;
        }
        else if (ret.camera.fov > 100) {
            ret.camera.fov = 100;
        }

        ret.camera.updateProjectionMatrix();

    }

    ret.animate = function () {

        requestAnimationFrame( ret.animate );
        update();

    }

    function normalizeDegrees (lon) {
        //get it in -360 to 0 or 0 to 360 form
        var twoRotations = lon % 360;
        //if 0 to 360, good, otherwise flip it
        if (twoRotations >= 0) {
            return twoRotations;
        }
        else {
            return twoRotations + 360;
        }
    }

    //return positive or if right, negative if left
    function leftOrRight (curLon, newLon) {
        if (newLon < curLon) {
            newLon += 360;
        }
        if (curLon + 180 >= newLon) {
            return ret.travelRate;
        }
        else {
            return -1*ret.travelRate;
        }
    }

    function update() {

        if (ret.travelLonToTarget) {
            //normalize it to a circle from 0 to 360
            var normalTargetLon = normalizeDegrees(ret.targetLon);
            var normalCurLon = normalizeDegrees(ret.lon);
            //set 0 to current position, if within 180 degrees, move left
            //else move right
            var movAmnt = leftOrRight(normalCurLon, normalTargetLon);
            if (movAmnt + normalCurLon < normalTargetLon - ret.travelRate || 
                movAmnt + normalCurLon > normalTargetLon + ret.travelRate ) {
                ret.lon += movAmnt;
            }
            else {
                ret.lon = ret.targetLon;
                ret.travelLonToTarget = false;
            }
        }
        else if (ret.travelLatToTarget) {
            var movAmnt = ret.targetLat > ret.lat ? ret.travelRate : -1*ret.travelRate;
            if (movAmnt + ret.lat < ret.targetLat - ret.travelRate || 
                movAmnt + ret.lat > ret.targetLat + ret.travelRate ) {
                ret.lat += movAmnt;
            }
            else {
                ret.lat = ret.targetLat;
                ret.travelLatToTarget = false;
            }
        }
        else {
            ret.travelLonToTarget = false;
            ret.travelLatToTarget = false;
        }

        ret.lat = Math.max( - 85, Math.min( 85, ret.lat ) );
        ret.phi = THREE.Math.degToRad( 90 - ret.lat );
        ret.theta = THREE.Math.degToRad( ret.lon );

        ret.camera.target.x = ret.rho * Math.sin( ret.phi ) * Math.cos( ret.theta );
        ret.camera.target.y = ret.rho * Math.cos( ret.phi );
        ret.camera.target.z = ret.rho * Math.sin( ret.phi ) * Math.sin( ret.theta );

        ret.camera.target.closeX = ret.camera.target.x * ret.rhoRatio
        ret.camera.target.closeY = ret.camera.target.y * ret.rhoRatio
        ret.camera.target.closeZ = ret.camera.target.z * ret.rhoRatio

        ret.camera.lookAt( ret.camera.target );
        

        /*
        // distortion
        ret.camera.position.copy( ret.camera.target ).negate();
        */

        ret.renderer.render( ret.scene, ret.camera );

    }

    ret.changeImage = function () {

        ret.scene = new THREE.Scene();

        var geometry = new THREE.SphereGeometry( 500, 60, 40 );
        geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

        var material = new THREE.MeshBasicMaterial( {
	    map: THREE.ImageUtils.loadTexture( ret.getCurImgUrl()  )
        });	    

        mesh = new THREE.Mesh( geometry, material );
        mesh.clickable = false;


        ret.scene.add( mesh );
        ret.getPrevNext();
	ret.lat = 0.0
	ret.lon = 0.0
    }

    return ret;
};
