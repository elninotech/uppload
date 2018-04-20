!(function(e, t) {
	"object" == typeof exports && "object" == typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
			? define([], t)
			: "object" == typeof exports
				? (exports.uppload = t())
				: (e.uppload = t());
})(this, function() {
	return (function(e) {
		var t = {};
		function o(n) {
			if (t[n]) return t[n].exports;
			var r = (t[n] = { i: n, l: !1, exports: {} });
			return e[n].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
		}
		return (
			(o.m = e),
			(o.c = t),
			(o.d = function(e, t, n) {
				o.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: n });
			}),
			(o.r = function(e) {
				Object.defineProperty(e, "__esModule", { value: !0 });
			}),
			(o.n = function(e) {
				var t =
					e && e.__esModule
						? function() {
								return e.default;
						  }
						: function() {
								return e;
						  };
				return o.d(t, "a", t), t;
			}),
			(o.o = function(e, t) {
				return Object.prototype.hasOwnProperty.call(e, t);
			}),
			(o.p = ""),
			o((o.s = 0))
		);
	})([
		function(e, t, o) {
			"use strict";
			var n = 2;
			n++;
			console.log("Hello, world!", n);
		}
	]);
});
