angular.module('starter')
.factory('completedAppt', function(){
    var stylistID,
        apptID;

    return{
        getStylistID: function(){
            return stylistID;
        },
        setStylistID: function(id){
            stylistID=id;
        },
        getApptID: function(){
            return apptID;
        },
        setApptID: function(id){
            apptID=id;
        }
    }
})