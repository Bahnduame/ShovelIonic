angular.module('starter')
.factory('userData', function(){
    var data = {
            uid:'',
            name:'',
            phone: 0,
            email: '',
            status: 'none',
            ccInfo: null
    };

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
        },
        getEmail: function(){
            return data.email;
        },
        setEmail: function(emailAddr){
            data.email = emailAddr;
        },
        getStatus: function(){
            return data.status;
        },
        setStatus: function(){
            return status;
        },
        getCCInfo: function(){
            return data.ccInfo;
        },
        setCCInfo: function(ccInfo){
            data.ccInfo = {};
            data.ccInfo.id = ccInfo.id;
            data.ccInfo.lastFour = ccInfo.lastFour;
            data.ccInfo.brand = ccInfo.brand;
        },
        getUserData: function(){
            return data;
        }

    };

});