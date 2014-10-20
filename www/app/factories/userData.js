angular.module('starter')
.factory('userData', function(){
    var data = {uid:"",
            name:"",
            phone:""}
    return{
        getID: function(){
            return data.uid;
        },
        setID: function(id){
            data.uid=id;
        },
        getName: function(){
            return data.name;
        },
        setName: function(username){
            data.name=username;
        },
        getPhone: function(){
            return data.phone;
        },
        setPhone: function(pnum){
            data.phone=pnum;
        }
    }
})