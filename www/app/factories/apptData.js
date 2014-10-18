angular.module('starter')
.factory('apptData', function(){
    var booking = {services:[],
                    stylistID: '',
                    address: {},
                    userID: '',
                    status:'',
                    id:''
                    };
    return{
        getServices: function(){
            return booking.services;
        },
        addService: function(service){
            booking.services.push(service);
        },
        clearServices: function(){
            booking.services = [];
        },
        setAddress: function(addr){
            booking.address = addr;
        },
        getAddress: function(){
            return booking.address;
        },
        setUserID: function(id){
            booking.userID = id;
        },
        getUserID: function(){
            return booking.userID;
        },
        setStylistID: function(id){
            booking.stylistID = id;
        },
        getStylistID: function(){
            return booking.stylistID;
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
        getTotalCost: function(){
            var totalCost = 0;
            for(var i = 0; i<booking.services.length; i++){
                totalCost += Number(booking.services[i].price);
            }
            return totalCost;
        }
    }
})