angular.module('starter')
.factory('userData', function(){
    var uid,
    name;
    return{
        getID: function(){
            return uid;
        },
        setID: function(id){
            uid=id;
        },
        getName: function(){
            return name;
        },
        setName: function(username){
            name=username;
        }
    }
})