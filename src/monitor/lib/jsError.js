import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import tracker from "../utils/tracker";

export function injectError() {
  window.addEventListener(
    "error",
    function (event) {
      console.log("event:", event);
      let lastEvent = getLastEvent();
      if (event.target && (event.target.src || event.target.href)) {
        tracker.send({
          //资源加载错误
          kind: "stability", //稳定性指标
          type: "error", //resource
          errorType: "resourceError",
          filename: event.target.src || event.target.href, //加载失败的资源
          tagName: event.target.tagName, //标签名
          timeStamp: formatTime(event.timeStamp), //时间
          selector: getSelector(event.path || event.target), //选择器
        });
      } else {
        let log = {
          kind: "stability",
          type: "error",
          errorType: "jsError",
          url: "",
          message: event.message,
          fileName: event.filename,
          position: `${event.lineNo}:${event.columnno}`,
          stack: getLines(event.error.stack),
          selector: lastEvent ? getSelector(lastEvent.path) : "",
        };
        tracker.send(log);
      }
    },
    true
  );
  window.addEventListener(
    "unhandledrejection",
    function (event) {
      let lastEvent = getLastEvent();
      let message = "";
      let line = 0;
      let column = 0;
      let file = "";
      let stack = "";
      if (typeof event.reason === "string") {
        message = event.reason;
      } else if (typeof event.reason === "object") {
        message = event.reason.message;
      }
      let reason = event.reason;
      if (typeof reason === "string") {
        message = reason;
      } else if (typeof reason === "object") {
        if (reason.stack) {
          var matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
          if (matchResult) {
            file = matchResult[1];
            line = matchResult[2];
            column = matchResult[3];
          }
          stack = getLines(reason.stack);
        }
      }
      tracker.send({
        //未捕获的promise错误
        kind: "stability", //稳定性指标
        type: "error", //jsError
        errorType: "promiseError", //unhandledrejection
        message: message, //标签名
        filename: file,
        position: line + ":" + column, //行列
        stack,
        selector: lastEvent
          ? getSelector(lastEvent.path || lastEvent.target)
          : "",
      });
    },
    true
  );
  function getLines(stack) {
    return stack
      .split("\n")
      .slice(1)
      .map((item) => item.replace(/^\s+at\s+/g, ""))
      .join("^");
  }
}
