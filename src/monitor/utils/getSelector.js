function getSelectors(path) {
  return path
    .reverse()
    .filter((ele) => {
      return ele !== document && ele !== window;
    })
    .map((ele) => {
      let selector = "";
      if (ele.id) {
        selector = `#${ele.id}`;
      } else if (ele.className && typeof ele.className === "string") {
        selector =
          "." +
          ele.className
            .split(" ")
            .filter(function (item) {
              return !!item;
            })
            .join(".");
      } else {
        selector = ele.nodeName;
      }
      return selector;
    })
    .join(" ");
}

export default function (path) {
  if (Array.isArray(path)) {
    return getSelectors(path);
  }
}
