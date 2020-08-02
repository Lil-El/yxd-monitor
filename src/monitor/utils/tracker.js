let host = "cn-beijing.log.aliyuncs.com"; // 要和阿里云日志服务配置一样
let project = "yxd-log";
let logstore = "yxd-store";
var userAgent = require("user-agent");

function getExtraData() {
  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).name,
  };
}

class SendTracker {
  constructor() {
    this.url = `http://${project}.${host}/logstores/${logstore}/track`;
    this.xhr = new XMLHttpRequest();
  }
  send(data) {
    let extraData = getExtraData();
    let logs = { ...extraData, ...data };
    console.log(logs);
    for (let key in logs) {
      // 阿里云：值不能是number
      if (typeof logs[key] === "number") {
        logs[key] = "" + logs[key];
      }
    }
    let body = JSON.stringify({
      // 阿里云：格式规范
      __logs__: [logs],
    });
    this.xhr.open("POST", this.url, true);
    this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    this.xhr.setRequestHeader("x-log-apiversion", "0.6.0");
    this.xhr.setRequestHeader("x-log-bodyrawsize", body.length);
    this.xhr.onload = function () {
      if ((this.status >= 200 && this.status <= 300) || this.status == 304) {
        // callback && callback();
      }
    };
    this.xhr.onerror = function (error) {
      console.log("error", error);
    };
    this.xhr.send(body);
  }
}
export default new SendTracker();
