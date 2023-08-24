import { useAuthUser } from "react-auth-kit";
import Config from "../Config.json";

class APIServer {
  constructor(group, item) {
    const auth = useAuthUser();
    this.token = auth() ? auth().token : null;
    this.baseUrl = Config.apiServer;
    this.group = group;
    this.item = item;
  }
  async fetch(url, method = "GET", data = null, then) {
    url = new URL(url);
    url.searchParams.append("token", this.token);
    url.searchParams.append("lang", "ar");
    var controller = new AbortController();
    var req = await fetch(url.href, {
      method: method,
      signal: controller.signal,
      headers: { Accept: "*/*" },
      body: data,
    });
    if (req.ok) {
      var res = await req.json();
      then(res);
    } else {
      console.warn(res);
    }
  }
  get(name, callback) {
    this.fetch(`${this.baseUrl}/${this.item}/${name}`, "GET", null, data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
  getAll(page, perPage, callback) {
    var url = new URL(`${this.baseUrl}/${this.group}`);
    url.searchParams.append("page", page);
    url.searchParams.append("perPage", perPage);
    this.fetch(url, "GET", null, data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
  insert(body, callback) {
    var url = new URL(this.baseUrl + "/" + this.group);
    this.fetch(url.href, "POST", body, data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
  update(name, body, callback) {
    var url = this.baseUrl + "/" + this.item + "/" + name + "/update";
    this.fetch(url, "POST", body, data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
  delete(name, callback) {
    var url = this.baseUrl + "/" + this.item + "/" + name + "/delete";
    this.fetch(url, "POST", null, data => {
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
    this.fetch(url, "GET", null, data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
  count(callback) {
    var url = new URL();
    url.searchParams.append("token", this.token);
    this.fetch(`${this.baseUrl}/${this.group}/count`, "GET", null, data => {
      if (data.ok == true) {
        callback(data.result);
      } else console.warn(data);
    });
  }
}

export default APIServer;
