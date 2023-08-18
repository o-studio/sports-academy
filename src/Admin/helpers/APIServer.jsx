import Config from "../Config.json";

class APIServer {
  constructor(group, item) {
    this.baseUrl = Config.apiServer;
    this.group = group;
    this.item = item;
  }
  async fetch(url, method = "GET", data = null) {
    var controller = new AbortController();
    return fetch(url, {
      method: method,
      signal: controller.signal,
      headers: {
        "Accept": "*/*",
      },
      body: data,
    })
      .then(res => res.json())
      .catch(console.warn);
  }
  get(name, callback) {
    this.fetch(`${this.baseUrl}/${this.item}/${name}`).then(data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
  getAll(page, perPage, callback) {
    var url = new URL(`${this.baseUrl}/${this.group}`);
    url.searchParams.append("page", page);
    url.searchParams.append("perPage", perPage);
    this.fetch(url).then(data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
  insert(body, callback) {
    var url = new URL(this.baseUrl + "/" + this.group);
    url.searchParams.append("token", localStorage.getItem("token"));
    this.fetch(url.href, "POST", body).then(data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
  update(name, body, callback) {
    var url = new URL(this.baseUrl + "/" + this.item + "/" + name + "/update");
    url.searchParams.append("token", localStorage.getItem("token"));
    this.fetch(url.href, "POST", body).then(
      data => {
        if (data.ok == true) {
          callback(data.result);
        } else console.warn(data);
      }
    );
  }
  delete(name, callback) {
    var url = new URL(this.baseUrl + "/" + this.item + "/" + name + "/delete");
    url.searchParams.append("token", localStorage.getItem("token"));
    this.fetch(url.href, "POST").then(data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
  search(page, perPage, query, callback) {
    var url = new URL(`${this.baseUrl}/${this.group}`);
    url.searchParams.append("q", query);
    url.searchParams.append("page", page);
    url.searchParams.append("perPage", perPage);
    this.fetch(url).then(data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
  count(callback) {
    this.fetch(`${this.baseUrl}/${this.group}/count`).then(data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
}

export default APIServer;
