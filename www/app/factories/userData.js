angular.module('starter')
.factory('userData', function(){
    var data = {
            id:'',
            name:'',
            phone: '',
            email: '',
            status: 'none',
            ccInfo: null,
            type: '',
            recipientID: '',
            available: ''
    };

    return{

        setProperty: function(key, val){
            data[key] = val;
        },
        getProperty: function(key){
            return data[key];
        },
        getID: function(){
            return data.id;
        },
        setID: function(id){
            data.id=id;
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