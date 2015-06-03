define([

], function() {

    var idCount = 0;
    return function () {
        idCount++;
        return 'id-' + idCount;
    }

});