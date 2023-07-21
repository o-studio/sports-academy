const UrlQuery = (name, value, noRefresh=false) =>{
  let url = new URL(window.location.href);
  if (value) {
    url.searchParams.set(name, value);
    if (noRefresh) {
      window.history.pushState({}, '', url);
    } else {
      window.location.href = url.href;
    }
  } else {
    return parseInt(url.searchParams.get(name));
  }
  
}

export default UrlQuery;