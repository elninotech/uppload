import "whatwg-fetch";
// @ts-ignore
import "es6-promise/auto";

// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  (NodeList as any).prototype.forEach = Array.prototype.forEach;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#Polyfill
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, "startsWith", {
    value: function(search: string, rawPos: number) {
      var pos = rawPos > 0 ? rawPos | 0 : 0;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
if (!String.prototype.includes) {
  Object.defineProperty(String.prototype, "includes", {
    value: function(search: string, start?: number) {
      if (start === undefined) {
        start = 0;
      }
      return this.indexOf(search, start) !== -1;
    }
  });
}
