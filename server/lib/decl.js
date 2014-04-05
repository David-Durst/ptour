fnHolder = {};
fnHolder.isDebug = function () { 
    return Meteor.absoluteUrl().indexOf('localhost') != -1;
}
