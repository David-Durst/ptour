Template.tour.idManipulation = function (ret) {

    //helper function to get the prev, cur, and next location id's
    ret.prevId = function() {
        return Template.tour.data.StopList.findOne({id: Session.get('locId')}).prev;
    }

    ret.curId = function() {
        return Session.get('locId');
    }

    ret.nextId = function() {
        return Template.tour.data.StopList.findOne({id: Session.get('locId')}).next;
    }

    //Move to the prev or next or a specified position
    ret.setPrev = function() {
        Session.set('locId', ret.prevId());
    }

    ret.setCur = function(cur) {
        Session.set('locId', cur);
    }

    ret.setNext = function() {
        Session.set('locId', ret.nextId());
    }

    //get the image url's of the items
    ret.getPrevImgUrl = function () {
        return Template.tour.data.StopList.findOne(
            {id:ret.prevId()}).imgUrl;
    }

    ret.getCurImgUrl = function () {
        return Template.tour.data.StopList.findOne(
            {id:ret.curId()}).imgUrl;
    }

    ret.getNextImgUrl = function () {
        return Template.tour.data.StopList.findOne(
            {id:ret.nextId()}).imgUrl;
    }

    ret.getPrevNext = function () {
        $.Deferred(function (dfd) {
            var prev = new THREE.MeshBasicMaterial( {
                map: THREE.ImageUtils.loadTexture( ret.getPrevImgUrl() )
            });
            var next = new THREE.MeshBasicMaterial( {
                map: THREE.ImageUtils.loadTexture( ret.getNextImgUrl() )
            });
            prev.dispose();
            next.dispose();
        });
    }
    return ret;
}
