angular.module('starter')
.factory('userData', function(){
    var uid;
    return{
        getID: function(){
            return uid;
        },
        setID: function(id){
            uid=id;
        }
    }
})