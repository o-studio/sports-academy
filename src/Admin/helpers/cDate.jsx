
const cDate = (date, type) => {
  const validDate = new Date(date);
  var year = validDate.getFullYear();
  var month = new String(validDate.getMonth());
  month = month.length == 1 ? "0"+month : month;
  var day = new String(validDate.getDay());
  day = day.length == 1 ? "0"+day : day;
  var hours = new String(validDate.getHours());
  hours = hours.length == 1 ? "0"+hours : hours;
  var minutes = new String(validDate.getMinutes());
  minutes = minutes.length == 1 ? "0"+minutes : minutes;
  var full = `${[year, month, day].join(".")} - ${hours}:${minutes}`;
  var date = `${[year, month, day].join(".")}`;
  var time = `${hours}:${minutes}`;
  if (type == "full") {
    return full;
  } else if(type == "date"){
    return date;
  } else {
    return time;
  }
};

export default cDate;