Template.tour.engine = function (THREE) {
    var ret = {}

    ret.texture_placeholder, ret.isUserInteracting = false, ret.onPointerDownPointerX = 0, ret.onPointerDownPointerY = 0, ret.lon = 0, ret.onPointerDownLon = 0, ret.lat = 0, ret.onPointerDownLat = 0, ret.phi = 0, ret.theta = 0, ret.rho = 500, ret.rhoRatio = 0.3;

    ret.getUrl = function () {
        return Template.tour.data.StopList.findOne(
            {id:Session.get('locId')}).imgUrl;
    }

    ret.init = function () {

        var container, mesh;

        container = document.getElementById( 'container' );

        ret.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
        ret.camera.target = new THREE.Vector3( 0, 0, 0 );

        ret.scene = new THREE.Scene();

        var geometry = new THREE.SphereGeometry( ret.rho, 60, 40 );
        geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

        var material = new THREE.MeshBasicMaterial( {
            map: THREE.ImageUtils.loadTexture( ret.getUrl() )
        });

        mesh = new THREE.Mesh( geometry, material );

        ret.scene.add( mesh );

        ret.renderer = new THREE.WebGLRenderer();
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

        ret.onPointerDownPointerX = event.clientX;
        ret.onPointerDownPointerY = event.clientY;

        ret.onPointerDownLon = ret.lon;
        ret.onPointerDownLat = ret.lat;

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

        ret.camera.updateProjectionMatrix();

    }

    ret.animate = function () {

        requestAnimationFrame( ret.animate );
        update();

    }

    function update() {

        if ( ret.isUserInteracting === false ) {

            //set to 0.1 ofr default rotation, but this bugs me.
            ret.lon += 0.0;

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
	    map: THREE.ImageUtils.loadTexture( ret.getUrl()  )
        });	    

        mesh = new THREE.Mesh( geometry, material );

        ret.scene.add( mesh );
	ret.lat = 0.0
	ret.lon = 0.0
    }

    return ret;
};
