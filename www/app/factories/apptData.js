angular.module('starter')
.factory('apptData', function(){
    var booking = { 
                    client: '',
                    clientID:'',
                    clientPhone:'',
                    address: {},
                    shovler: '',
                    shovlerID: '',
                    status:'',
                    date: ''
                };

                // client id, name
                // shoveler id, name
                // status
                // address
                // id
                // date
                
    return{
         setClientID: function(id){
            booking.clientID = id;
        },
        getClientID: function(){
            return booking.clientID;
        },
         setClientPhone: function(pnum){
            booking.clientPhone = pnum;
        },
        getClientPhone: function(){
            return booking.clientPhone;
        },
        setAddress: function(addr){
            booking.address = addr;
        },
        getAddress: function(){
            return booking.address;
        },
        setShovler: function(name){
            booking.shovler = name;
        },
        getShovler: function(){
            return booking.shovler;
        },
        setShovlerID: function(id){
            booking.shovlerID = id;
        },
        getShovlerID: function(){
            return booking.shovlerID;
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
        },
        setDate: function(date){
            booking.date = date;
        },
        getDate: function(){
            return booking.date;
        }
    }
})