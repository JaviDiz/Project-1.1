
// Torna la difrencia entre dues dates en anys "A", mesos "M" o dies "D"
//TODO: no té en compte anys bisiestos - fer servir https://momentjs.com
function diffAnys(date1, date2, format="A"){
    if (date1==undefined || date2==undefined) return -1;
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;
  
    var days = Math.floor(diff/day);
    var months = Math.floor(days/31);
    var years = Math.floor(months/12);
  
    switch(format) {
      case "A":
        return years;
      case "M":
        return moths;
      default:
        return days;
    }
  
  }
  