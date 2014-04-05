objs = {};
fnHolder.fillDB(objs);
//In debug mode, allow for people to get locations, write to file
if(Meteor.absoluteUrl().indexOf('localhost') != -1) {
    fnHolder.getLoc(objs);
}
