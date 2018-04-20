!(function(t, e) {
	"object" == typeof exports && "object" == typeof module
		? (module.exports = e())
		: "function" == typeof define && define.amd
			? define([], e)
			: "object" == typeof exports
				? (exports.uppload = e())
				: (t.uppload = e());
})(this, function() {
	return (function(t) {
		var e = {};
		function n(r) {
			if (e[r]) return e[r].exports;
			var o = (e[r] = { i: r, l: !1, exports: {} });
			return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
		}
		return (
			(n.m = t),
			(n.c = e),
			(n.d = function(t, e, r) {
				n.o(t, e) || Object.defineProperty(t, e, { configurable: !1, enumerable: !0, get: r });
			}),
			(n.r = function(t) {
				Object.defineProperty(t, "__esModule", { value: !0 });
			}),
			(n.n = function(t) {
				var e =
					t && t.__esModule
						? function() {
								return t.default;
						  }
						: function() {
								return t;
						  };
				return n.d(e, "a", e), e;
			}),
			(n.o = function(t, e) {
				return Object.prototype.hasOwnProperty.call(t, e);
			}),
			(n.p = ""),
			n((n.s = 5))
		);
	})([
		function(t, e) {
			t.exports = function(t) {
				var e = "undefined" != typeof window && window.location;
				if (!e) throw new Error("fixUrls requires window.location");
				if (!t || "string" != typeof t) return t;
				var n = e.protocol + "//" + e.host,
					r = n + e.pathname.replace(/\/[^\/]*$/, "/");
				return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(t, e) {
					var o,
						i = e
							.trim()
							.replace(/^"(.*)"$/, function(t, e) {
								return e;
							})
							.replace(/^'(.*)'$/, function(t, e) {
								return e;
							});
					return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)
						? t
						: ((o = 0 === i.indexOf("//") ? i : 0 === i.indexOf("/") ? n + i : r + i.replace(/^\.\//, "")),
						  "url(" + JSON.stringify(o) + ")");
				});
			};
		},
		function(t, e, n) {
			var r,
				o,
				i = {},
				a = ((r = function() {
					return window && document && document.all && !window.atob;
				}),
				function() {
					return void 0 === o && (o = r.apply(this, arguments)), o;
				}),
				s = (function(t) {
					var e = {};
					return function(t) {
						if ("function" == typeof t) return t();
						if (void 0 === e[t]) {
							var n = function(t) {
								return document.querySelector(t);
							}.call(this, t);
							if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
								try {
									n = n.contentDocument.head;
								} catch (t) {
									n = null;
								}
							e[t] = n;
						}
						return e[t];
					};
				})(),
				u = null,
				f = 0,
				c = [],
				l = n(0);
			function p(t, e) {
				for (var n = 0; n < t.length; n++) {
					var r = t[n],
						o = i[r.id];
					if (o) {
						o.refs++;
						for (var a = 0; a < o.parts.length; a++) o.parts[a](r.parts[a]);
						for (; a < r.parts.length; a++) o.parts.push(y(r.parts[a], e));
					} else {
						var s = [];
						for (a = 0; a < r.parts.length; a++) s.push(y(r.parts[a], e));
						i[r.id] = { id: r.id, refs: 1, parts: s };
					}
				}
			}
			function d(t, e) {
				for (var n = [], r = {}, o = 0; o < t.length; o++) {
					var i = t[o],
						a = e.base ? i[0] + e.base : i[0],
						s = { css: i[1], media: i[2], sourceMap: i[3] };
					r[a] ? r[a].parts.push(s) : n.push((r[a] = { id: a, parts: [s] }));
				}
				return n;
			}
			function h(t, e) {
				var n = s(t.insertInto);
				if (!n)
					throw new Error(
						"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid."
					);
				var r = c[c.length - 1];
				if ("top" === t.insertAt)
					r ? (r.nextSibling ? n.insertBefore(e, r.nextSibling) : n.appendChild(e)) : n.insertBefore(e, n.firstChild), c.push(e);
				else if ("bottom" === t.insertAt) n.appendChild(e);
				else {
					if ("object" != typeof t.insertAt || !t.insertAt.before)
						throw new Error(
							"[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n"
						);
					var o = s(t.insertInto + " " + t.insertAt.before);
					n.insertBefore(e, o);
				}
			}
			function v(t) {
				if (null === t.parentNode) return !1;
				t.parentNode.removeChild(t);
				var e = c.indexOf(t);
				e >= 0 && c.splice(e, 1);
			}
			function b(t) {
				var e = document.createElement("style");
				return (t.attrs.type = "text/css"), m(e, t.attrs), h(t, e), e;
			}
			function m(t, e) {
				Object.keys(e).forEach(function(n) {
					t.setAttribute(n, e[n]);
				});
			}
			function y(t, e) {
				var n, r, o, i;
				if (e.transform && t.css) {
					if (!(i = e.transform(t.css))) return function() {};
					t.css = i;
				}
				if (e.singleton) {
					var a = f++;
					(n = u || (u = b(e))), (r = w.bind(null, n, a, !1)), (o = w.bind(null, n, a, !0));
				} else
					t.sourceMap &&
					"function" == typeof URL &&
					"function" == typeof URL.createObjectURL &&
					"function" == typeof URL.revokeObjectURL &&
					"function" == typeof Blob &&
					"function" == typeof btoa
						? ((n = (function(t) {
								var e = document.createElement("link");
								return (t.attrs.type = "text/css"), (t.attrs.rel = "stylesheet"), m(e, t.attrs), h(t, e), e;
						  })(e)),
						  (r = function(t, e, n) {
								var r = n.css,
									o = n.sourceMap,
									i = void 0 === e.convertToAbsoluteUrls && o;
								(e.convertToAbsoluteUrls || i) && (r = l(r));
								o &&
									(r +=
										"\n/*# sourceMappingURL=data:application/json;base64," +
										btoa(unescape(encodeURIComponent(JSON.stringify(o)))) +
										" */");
								var a = new Blob([r], { type: "text/css" }),
									s = t.href;
								(t.href = URL.createObjectURL(a)), s && URL.revokeObjectURL(s);
						  }.bind(null, n, e)),
						  (o = function() {
								v(n), n.href && URL.revokeObjectURL(n.href);
						  }))
						: ((n = b(e)),
						  (r = function(t, e) {
								var n = e.css,
									r = e.media;
								r && t.setAttribute("media", r);
								if (t.styleSheet) t.styleSheet.cssText = n;
								else {
									for (; t.firstChild; ) t.removeChild(t.firstChild);
									t.appendChild(document.createTextNode(n));
								}
						  }.bind(null, n)),
						  (o = function() {
								v(n);
						  }));
				return (
					r(t),
					function(e) {
						if (e) {
							if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
							r((t = e));
						} else o();
					}
				);
			}
			t.exports = function(t, e) {
				if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document)
					throw new Error("The style-loader cannot be used in a non-browser environment");
				((e = e || {}).attrs = "object" == typeof e.attrs ? e.attrs : {}),
					e.singleton || "boolean" == typeof e.singleton || (e.singleton = a()),
					e.insertInto || (e.insertInto = "head"),
					e.insertAt || (e.insertAt = "bottom");
				var n = d(t, e);
				return (
					p(n, e),
					function(t) {
						for (var r = [], o = 0; o < n.length; o++) {
							var a = n[o];
							(s = i[a.id]).refs--, r.push(s);
						}
						t && p(d(t, e), e);
						for (o = 0; o < r.length; o++) {
							var s;
							if (0 === (s = r[o]).refs) {
								for (var u = 0; u < s.parts.length; u++) s.parts[u]();
								delete i[s.id];
							}
						}
					}
				);
			};
			var g,
				x = ((g = []),
				function(t, e) {
					return (g[t] = e), g.filter(Boolean).join("\n");
				});
			function w(t, e, n, r) {
				var o = n ? "" : r.css;
				if (t.styleSheet) t.styleSheet.cssText = x(e, o);
				else {
					var i = document.createTextNode(o),
						a = t.childNodes;
					a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(i, a[e]) : t.appendChild(i);
				}
			}
		},
		function(t, e) {
			t.exports = function(t) {
				var e = [];
				return (
					(e.toString = function() {
						return this.map(function(e) {
							var n = (function(t, e) {
								var n = t[1] || "",
									r = t[3];
								if (!r) return n;
								if (e && "function" == typeof btoa) {
									var o = ((a = r),
										"/*# sourceMappingURL=data:application/json;charset=utf-8;base64," +
											btoa(unescape(encodeURIComponent(JSON.stringify(a)))) +
											" */"),
										i = r.sources.map(function(t) {
											return "/*# sourceURL=" + r.sourceRoot + t + " */";
										});
									return [n]
										.concat(i)
										.concat([o])
										.join("\n");
								}
								var a;
								return [n].join("\n");
							})(e, t);
							return e[2] ? "@media " + e[2] + "{" + n + "}" : n;
						}).join("");
					}),
					(e.i = function(t, n) {
						"string" == typeof t && (t = [[null, t, ""]]);
						for (var r = {}, o = 0; o < this.length; o++) {
							var i = this[o][0];
							"number" == typeof i && (r[i] = !0);
						}
						for (o = 0; o < t.length; o++) {
							var a = t[o];
							("number" == typeof a[0] && r[a[0]]) ||
								(n && !a[2] ? (a[2] = n) : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a));
						}
					}),
					e
				);
			};
		},
		function(t, e, n) {
			(t.exports = n(2)(!1)).push([
				t.i,
				".uppload-bg{position:fixed;z-index:10000;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.5)}.uppload-modal{position:fixed;background:#fff;z-index:11000;box-sizing:border-box;overflow:hidden;border-radius:.25rem}@media (min-width:860px){.uppload-modal{left:50%;top:50%;transform:translate(-50%,-50%);width:720px;height:500px}}@media (max-width:860px){.uppload-modal{left:0;right:0;top:10vh;bottom:0}}",
				""
			]);
		},
		function(t, e, n) {
			var r = n(3);
			"string" == typeof r && (r = [[t.i, r, ""]]);
			var o = { hmr: !0, transform: void 0, insertInto: void 0 };
			n(1)(r, o);
			r.locals && (t.exports = r.locals);
		},
		function(t, e, n) {
			"use strict";
			var r,
				o = n(4);
			(r = o) && r.__esModule;
			var i = document.createElement("div");
			i.classList.add("uppload-bg"), document.body.appendChild(i);
			var a = document.createElement("div");
			a.classList.add("uppload-modal"), (a.innerHTML = "Upploadmodal"), document.body.appendChild(a);
		}
	]);
});
