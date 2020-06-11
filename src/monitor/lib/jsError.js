import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import tracker from "../utils/tracker";

export function injectError() {
  window.addEventListener("error", function (event) {
    let lastEvent = getLastEvent();
    let log = {
      kind: "stability",
      type: "error",
      errorType: "jsError",
      url: "",
      message: "",
      fileName: event.fileName,
      position: `${event.lineNo}:${event.columnno}`,
      stack: getLines(event.error.stack),
      selector: lastEvent ? getSelector(lastEvent.path) : "",
    };
    console.log(log);
    tracker.send(log);
  });
  function getLines(stack) {
    return stack
      .split("\n")
      .slice(1)
      .map((item) => item.replace(/^\s+at\s+/g, ""))
      .join("^");
  }
}
