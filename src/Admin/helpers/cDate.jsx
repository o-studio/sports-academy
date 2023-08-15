
function cDate(utcDate, type) {
  const clientDate = new Date(utcDate);
  
  const year = clientDate.getFullYear();
  const month = String(clientDate.getMonth() + 1).padStart(2, '0');
  const day = String(clientDate.getDate()).padStart(2, '0');
  const hours = String(clientDate.getHours()).padStart(2, '0');
  const minutes = String(clientDate.getMinutes()).padStart(2, '0');

  const full = `${[year, month, day].join(".")} - ${hours}:${minutes}`;
  const date = `${[year, month, day].join(".")}`;
  const time = `${hours}:${minutes}`;

  if (type === "full") {
    return full;
  } else if (type === "date") {
    return date;
  } else {
    return time;
  }
}


export default cDate;