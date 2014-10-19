angular.module('starter')
.factory('apptData', function(){
    var booking = { client: '',
                    clientID:'',
                    address: {},
                    shovler: '',
                    status:'',
                    id:''
                    };
    return{
        setAddress: function(addr){
            booking.address = addr;
        },
        getAddress: function(){
            return booking.address;
        },
        setShovlerID: function(id){
            booking.shovler = id;
        },
        getShovlerID: function(){
            return booking.shovler;
        },
        setClientID: function(id){
            booking.clientID = id;
        },
        getClientID: function(){
            return booking.clientID;
        },
        setID: function(id){
            booking.id = id;
        },
        getID: function(){
            return booking.id;
        },
        setClient: function(name){
            booking.client = name;
        },
        getClient: function(){
            return booking.client;
        },
        setStatus: function(stat){
            booking.status = stat;
        },
        getStatus: function(){
            return booking.status;
        },
        getAppointmentData: function(){
            return booking;
        },
        setAppointmentData: function(apptData){
            booking=apptData;
        }
    }
})