function prettyDate(dateString){
 var d = dateString.getDate();
 var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
 var m = monthNames[dateString.getMonth()];
 var y = dateString.getFullYear();
 return d+' '+m+' '+y;
}
