

    export const formatTime =(hours) =>{
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var strTime = hours + ' ' + ampm;
        return strTime;
    }

    export const formatDate = (date) =>{
        var dt = new Date(date);
        var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

        // Saturday, September 17, 2016
        return dt.toLocaleDateString("en-US", options);
}

export const formatDateLong = (date) => {
    var dt = new Date(date);
    var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    
    //console.log(dt)
    // Saturday, September 17, 2016
    return dt.toLocaleDateString("en-US", options) + ' ' + dt.toLocaleTimeString('en-US');
}


