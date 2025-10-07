import { A as me, q as et, _ as rr, y as Fe, d as z, Q as _t, D as ct, x as _e, a as F, F as $t, E as nr, k as st, T as X, m as ar, u as d, G as ir } from "./jsxRuntime.module-Dy4jXDNb.js";
function Me(e) {
  "@babel/helpers - typeof";
  return Me = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Me(e);
}
function or(e, t) {
  if (Me(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Me(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function lr(e) {
  var t = or(e, "string");
  return Me(t) == "symbol" ? t : t + "";
}
function re(e, t, r) {
  return (t = lr(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function Rt(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function q(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rt(Object(r), !0).forEach(function(n) {
      re(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Rt(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ot(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function ur(e) {
  if (Array.isArray(e)) return ot(e);
}
function cr(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Lt(e, t) {
  if (e) {
    if (typeof e == "string") return ot(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? ot(e, t) : void 0;
  }
}
function sr() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ge(e) {
  return ur(e) || cr(e) || Lt(e) || sr();
}
function dr(e) {
  if (Array.isArray(e)) return e;
}
function fr(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, u, s = [], b = !0, m = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        b = !1;
      } else for (; !(b = (n = a.call(r)).done) && (s.push(n.value), s.length !== t); b = !0) ;
    } catch (h) {
      m = !0, i = h;
    } finally {
      try {
        if (!b && r.return != null && (u = r.return(), Object(u) !== u)) return;
      } finally {
        if (m) throw i;
      }
    }
    return s;
  }
}
function vr() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function W(e, t) {
  return dr(e) || fr(e, t) || Lt(e, t) || vr();
}
function gr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var nt = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var Ot;
function mr() {
  return Ot || (Ot = 1, function(e) {
    (function() {
      var t = {}.hasOwnProperty;
      function r() {
        for (var a = "", u = 0; u < arguments.length; u++) {
          var s = arguments[u];
          s && (a = i(a, n(s)));
        }
        return a;
      }
      function n(a) {
        if (typeof a == "string" || typeof a == "number")
          return a;
        if (typeof a != "object")
          return "";
        if (Array.isArray(a))
          return r.apply(null, a);
        if (a.toString !== Object.prototype.toString && !a.toString.toString().includes("[native code]"))
          return a.toString();
        var u = "";
        for (var s in a)
          t.call(a, s) && a[s] && (u = i(u, s));
        return u;
      }
      function i(a, u) {
        return u ? a ? a + " " + u : a + u : a;
      }
      e.exports ? (r.default = r, e.exports = r) : window.classNames = r;
    })();
  }(nt)), nt.exports;
}
var hr = mr();
const Te = /* @__PURE__ */ gr(hr);
function Ge(e) {
  var t = me();
  t.current = e;
  var r = et(function() {
    for (var n, i = arguments.length, a = new Array(i), u = 0; u < i; u++)
      a[u] = arguments[u];
    return (n = t.current) === null || n === void 0 ? void 0 : n.call.apply(n, [t].concat(a));
  }, []);
  return r;
}
function yr() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var xt = yr() ? rr : Fe, jt = function(t, r) {
  var n = me(!0);
  xt(function() {
    return t(n.current);
  }, r), xt(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
}, Dt = function(t, r) {
  jt(function(n) {
    if (!n)
      return t();
  }, r);
};
function Pt(e) {
  var t = me(!1), r = z(e), n = W(r, 2), i = n[0], a = n[1];
  Fe(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function u(s, b) {
    b && t.current || a(s);
  }
  return [i, u];
}
function at(e) {
  return e !== void 0;
}
function br(e, t) {
  var r = t || {}, n = r.defaultValue, i = r.value, a = r.onChange, u = r.postState, s = Pt(function() {
    return at(i) ? i : at(n) ? typeof n == "function" ? n() : n : typeof e == "function" ? e() : e;
  }), b = W(s, 2), m = b[0], h = b[1], S = i !== void 0 ? i : m, k = u ? u(S) : S, y = Ge(a), p = Pt([S]), v = W(p, 2), c = v[0], f = v[1];
  Dt(function() {
    var o = c[0];
    m !== o && y(m, o);
  }, [c]), Dt(function() {
    at(i) || h(i);
  }, [i]);
  var l = Ge(function(o, C) {
    h(o, C), f([S], C);
  });
  return [k, l];
}
var lt = {}, Cr = function(t) {
};
function Sr(e, t) {
}
function pr(e, t) {
}
function kr() {
  lt = {};
}
function Ht(e, t, r) {
  !t && !lt[r] && (e(!1, r), lt[r] = !0);
}
function Ke(e, t) {
  Ht(Sr, e, t);
}
function Er(e, t) {
  Ht(pr, e, t);
}
Ke.preMessage = Cr;
Ke.resetWarned = kr;
Ke.noteOnce = Er;
function Nr(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = /* @__PURE__ */ new Set();
  function i(a, u) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, b = n.has(a);
    if (Ke(!b, "Warning: There may be circular references"), b)
      return !1;
    if (a === u)
      return !0;
    if (r && s > 1)
      return !1;
    n.add(a);
    var m = s + 1;
    if (Array.isArray(a)) {
      if (!Array.isArray(u) || a.length !== u.length)
        return !1;
      for (var h = 0; h < a.length; h++)
        if (!i(a[h], u[h], m))
          return !1;
      return !0;
    }
    if (a && u && Me(a) === "object" && Me(u) === "object") {
      var S = Object.keys(a);
      return S.length !== Object.keys(u).length ? !1 : S.every(function(k) {
        return i(a[k], u[k], m);
      });
    }
    return !1;
  }
  return i(e, t);
}
function Ye() {
  return Ye = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ye.apply(null, arguments);
}
function Mr(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function It(e, t) {
  if (e == null) return {};
  var r, n, i = Mr(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function ut(e, t, r) {
  return (e - t) / (r - t);
}
function dt(e, t, r, n) {
  var i = ut(t, r, n), a = {};
  switch (e) {
    case "rtl":
      a.right = "".concat(i * 100, "%"), a.transform = "translateX(50%)";
      break;
    case "btt":
      a.bottom = "".concat(i * 100, "%"), a.transform = "translateY(50%)";
      break;
    case "ttb":
      a.top = "".concat(i * 100, "%"), a.transform = "translateY(-50%)";
      break;
    default:
      a.left = "".concat(i * 100, "%"), a.transform = "translateX(-50%)";
      break;
  }
  return a;
}
function Ae(e, t) {
  return Array.isArray(e) ? e[t] : e;
}
var I = {
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33,
  // also NUM_NORTH_EAST
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,
  // also NUM_SOUTH_EAST
  /**
   * END
   */
  END: 35,
  // also NUM_SOUTH_WEST
  /**
   * HOME
   */
  HOME: 36,
  // also NUM_NORTH_WEST
  /**
   * LEFT
   */
  LEFT: 37,
  // also NUM_WEST
  /**
   * UP
   */
  UP: 38,
  // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39,
  // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40,
  // also NUM_INSERT
  /**
   * DELETE
   */
  DELETE: 46
}, $e = /* @__PURE__ */ _t({
  min: 0,
  max: 0,
  direction: "ltr",
  step: 1,
  includedStart: 0,
  includedEnd: 0,
  tabIndex: 0,
  keyboard: !0,
  styles: {},
  classNames: {}
}), wr = /* @__PURE__ */ _t({}), Rr = ["prefixCls", "value", "valueIndex", "onStartMove", "onDelete", "style", "render", "dragging", "draggingDelete", "onOffsetChange", "onChangeComplete", "onFocus", "onMouseEnter"], At = /* @__PURE__ */ ct(function(e, t) {
  var r = e.prefixCls, n = e.value, i = e.valueIndex, a = e.onStartMove, u = e.onDelete, s = e.style, b = e.render, m = e.dragging, h = e.draggingDelete, S = e.onOffsetChange, k = e.onChangeComplete, y = e.onFocus, p = e.onMouseEnter, v = It(e, Rr), c = _e($e), f = c.min, l = c.max, o = c.direction, C = c.disabled, N = c.keyboard, T = c.range, G = c.tabIndex, Y = c.ariaLabelForHandle, D = c.ariaLabelledByForHandle, w = c.ariaRequired, E = c.ariaValueTextFormatterForHandle, M = c.styles, L = c.classNames, K = "".concat(r, "-handle"), U = function(P) {
    C || a(P, i);
  }, Q = function(P) {
    y?.(P, i);
  }, _ = function(P) {
    p(P, i);
  }, he = function(P) {
    if (!C && N) {
      var O = null;
      switch (P.which || P.keyCode) {
        case I.LEFT:
          O = o === "ltr" || o === "btt" ? -1 : 1;
          break;
        case I.RIGHT:
          O = o === "ltr" || o === "btt" ? 1 : -1;
          break;
        // Up is plus
        case I.UP:
          O = o !== "ttb" ? 1 : -1;
          break;
        // Down is minus
        case I.DOWN:
          O = o !== "ttb" ? -1 : 1;
          break;
        case I.HOME:
          O = "min";
          break;
        case I.END:
          O = "max";
          break;
        case I.PAGE_UP:
          O = 2;
          break;
        case I.PAGE_DOWN:
          O = -2;
          break;
        case I.BACKSPACE:
        case I.DELETE:
          u(i);
          break;
      }
      O !== null && (P.preventDefault(), S(O, i));
    }
  }, oe = function(P) {
    switch (P.which || P.keyCode) {
      case I.LEFT:
      case I.RIGHT:
      case I.UP:
      case I.DOWN:
      case I.HOME:
      case I.END:
      case I.PAGE_UP:
      case I.PAGE_DOWN:
        k?.();
        break;
    }
  }, we = dt(o, n, f, l), ye = {};
  if (i !== null) {
    var Re;
    ye = {
      tabIndex: C ? null : Ae(G, i),
      role: "slider",
      "aria-valuemin": f,
      "aria-valuemax": l,
      "aria-valuenow": n,
      "aria-disabled": C,
      "aria-label": Ae(Y, i),
      "aria-labelledby": Ae(D, i),
      "aria-required": Ae(w, i),
      "aria-valuetext": (Re = Ae(E, i)) === null || Re === void 0 ? void 0 : Re(n),
      "aria-orientation": o === "ltr" || o === "rtl" ? "horizontal" : "vertical",
      onMouseDown: U,
      onTouchStart: U,
      onFocus: Q,
      onMouseEnter: _,
      onKeyDown: he,
      onKeyUp: oe
    };
  }
  var Oe = /* @__PURE__ */ F("div", Ye({
    ref: t,
    className: Te(K, re(re(re({}, "".concat(K, "-").concat(i + 1), i !== null && T), "".concat(K, "-dragging"), m), "".concat(K, "-dragging-delete"), h), L.handle),
    style: q(q(q({}, we), s), M.handle)
  }, ye, v));
  return b && (Oe = b(Oe, {
    index: i,
    prefixCls: r,
    value: n,
    dragging: m,
    draggingDelete: h
  })), Oe;
}), Or = ["prefixCls", "style", "onStartMove", "onOffsetChange", "values", "handleRender", "activeHandleRender", "draggingIndex", "draggingDelete", "onFocus"], xr = /* @__PURE__ */ ct(function(e, t) {
  var r = e.prefixCls, n = e.style, i = e.onStartMove, a = e.onOffsetChange, u = e.values, s = e.handleRender, b = e.activeHandleRender, m = e.draggingIndex, h = e.draggingDelete, S = e.onFocus, k = It(e, Or), y = me({}), p = z(!1), v = W(p, 2), c = v[0], f = v[1], l = z(-1), o = W(l, 2), C = o[0], N = o[1], T = function(E) {
    N(E), f(!0);
  }, G = function(E, M) {
    T(M), S?.(E);
  }, Y = function(E, M) {
    T(M);
  };
  $t(t, function() {
    return {
      focus: function(E) {
        var M;
        (M = y.current[E]) === null || M === void 0 || M.focus();
      },
      hideHelp: function() {
        nr(function() {
          f(!1);
        });
      }
    };
  });
  var D = q({
    prefixCls: r,
    onStartMove: i,
    onOffsetChange: a,
    render: s,
    onFocus: G,
    onMouseEnter: Y
  }, k);
  return /* @__PURE__ */ F(st, null, u.map(function(w, E) {
    var M = m === E;
    return /* @__PURE__ */ F(At, Ye({
      ref: function(K) {
        K ? y.current[E] = K : delete y.current[E];
      },
      dragging: M,
      draggingDelete: M && h,
      style: Ae(n, E),
      key: E,
      value: w,
      valueIndex: E
    }, D));
  }), b && c && /* @__PURE__ */ F(At, Ye({
    key: "a11y"
  }, D, {
    value: u[C],
    valueIndex: null,
    dragging: m !== -1,
    draggingDelete: h,
    render: b,
    style: {
      pointerEvents: "none"
    },
    tabIndex: null,
    "aria-hidden": !0
  })));
}), Dr = function(t) {
  var r = t.prefixCls, n = t.style, i = t.children, a = t.value, u = t.onClick, s = _e($e), b = s.min, m = s.max, h = s.direction, S = s.includedStart, k = s.includedEnd, y = s.included, p = "".concat(r, "-text"), v = dt(h, a, b, m);
  return /* @__PURE__ */ F("span", {
    className: Te(p, re({}, "".concat(p, "-active"), y && S <= a && a <= k)),
    style: q(q({}, v), n),
    onMouseDown: function(f) {
      f.stopPropagation();
    },
    onClick: function() {
      u(a);
    }
  }, i);
}, Pr = function(t) {
  var r = t.prefixCls, n = t.marks, i = t.onClick, a = "".concat(r, "-mark");
  return n.length ? /* @__PURE__ */ F("div", {
    className: a
  }, n.map(function(u) {
    var s = u.value, b = u.style, m = u.label;
    return /* @__PURE__ */ F(Dr, {
      key: s,
      prefixCls: a,
      style: b,
      value: s,
      onClick: i
    }, m);
  })) : null;
}, Ar = function(t) {
  var r = t.prefixCls, n = t.value, i = t.style, a = t.activeStyle, u = _e($e), s = u.min, b = u.max, m = u.direction, h = u.included, S = u.includedStart, k = u.includedEnd, y = "".concat(r, "-dot"), p = h && S <= n && n <= k, v = q(q({}, dt(m, n, s, b)), typeof i == "function" ? i(n) : i);
  return p && (v = q(q({}, v), typeof a == "function" ? a(n) : a)), /* @__PURE__ */ F("span", {
    className: Te(y, re({}, "".concat(y, "-active"), p)),
    style: v
  });
}, Fr = function(t) {
  var r = t.prefixCls, n = t.marks, i = t.dots, a = t.style, u = t.activeStyle, s = _e($e), b = s.min, m = s.max, h = s.step, S = X(function() {
    var k = /* @__PURE__ */ new Set();
    if (n.forEach(function(p) {
      k.add(p.value);
    }), i && h !== null)
      for (var y = b; y <= m; )
        k.add(y), y += h;
    return Array.from(k);
  }, [b, m, h, i, n]);
  return /* @__PURE__ */ F("div", {
    className: "".concat(r, "-step")
  }, S.map(function(k) {
    return /* @__PURE__ */ F(Ar, {
      prefixCls: r,
      key: k,
      value: k,
      style: a,
      activeStyle: u
    });
  }));
}, Ft = function(t) {
  var r = t.prefixCls, n = t.style, i = t.start, a = t.end, u = t.index, s = t.onStartMove, b = t.replaceCls, m = _e($e), h = m.direction, S = m.min, k = m.max, y = m.disabled, p = m.range, v = m.classNames, c = "".concat(r, "-track"), f = ut(i, S, k), l = ut(a, S, k), o = function(G) {
    !y && s && s(G, -1);
  }, C = {};
  switch (h) {
    case "rtl":
      C.right = "".concat(f * 100, "%"), C.width = "".concat(l * 100 - f * 100, "%");
      break;
    case "btt":
      C.bottom = "".concat(f * 100, "%"), C.height = "".concat(l * 100 - f * 100, "%");
      break;
    case "ttb":
      C.top = "".concat(f * 100, "%"), C.height = "".concat(l * 100 - f * 100, "%");
      break;
    default:
      C.left = "".concat(f * 100, "%"), C.width = "".concat(l * 100 - f * 100, "%");
  }
  var N = b || Te(c, re(re({}, "".concat(c, "-").concat(u + 1), u !== null && p), "".concat(r, "-track-draggable"), s), v.track);
  return /* @__PURE__ */ F("div", {
    className: N,
    style: q(q({}, C), n),
    onMouseDown: o,
    onTouchStart: o
  });
}, Tr = function(t) {
  var r = t.prefixCls, n = t.style, i = t.values, a = t.startPoint, u = t.onStartMove, s = _e($e), b = s.included, m = s.range, h = s.min, S = s.styles, k = s.classNames, y = X(function() {
    if (!m) {
      if (i.length === 0)
        return [];
      var v = a ?? h, c = i[0];
      return [{
        start: Math.min(v, c),
        end: Math.max(v, c)
      }];
    }
    for (var f = [], l = 0; l < i.length - 1; l += 1)
      f.push({
        start: i[l],
        end: i[l + 1]
      });
    return f;
  }, [i, m, a, h]);
  if (!b)
    return null;
  var p = y != null && y.length && (k.tracks || S.tracks) ? /* @__PURE__ */ F(Ft, {
    index: null,
    prefixCls: r,
    start: y[0].start,
    end: y[y.length - 1].end,
    replaceCls: Te(k.tracks, "".concat(r, "-tracks")),
    style: S.tracks
  }) : null;
  return /* @__PURE__ */ F(st, null, p, y.map(function(v, c) {
    var f = v.start, l = v.end;
    return /* @__PURE__ */ F(Ft, {
      index: c,
      prefixCls: r,
      style: q(q({}, Ae(n, c)), S.track),
      start: f,
      end: l,
      key: c,
      onStartMove: u
    });
  }));
}, _r = 130;
function Tt(e) {
  var t = "targetTouches" in e ? e.targetTouches[0] : e;
  return {
    pageX: t.pageX,
    pageY: t.pageY
  };
}
function $r(e, t, r, n, i, a, u, s, b, m, h) {
  var S = z(null), k = W(S, 2), y = k[0], p = k[1], v = z(-1), c = W(v, 2), f = c[0], l = c[1], o = z(!1), C = W(o, 2), N = C[0], T = C[1], G = z(r), Y = W(G, 2), D = Y[0], w = Y[1], E = z(r), M = W(E, 2), L = M[0], K = M[1], U = me(null), Q = me(null), _ = me(null), he = _e(wr), oe = he.onDragStart, we = he.onDragChange;
  jt(function() {
    f === -1 && w(r);
  }, [r, f]), Fe(function() {
    return function() {
      document.removeEventListener("mousemove", U.current), document.removeEventListener("mouseup", Q.current), _.current && (_.current.removeEventListener("touchmove", U.current), _.current.removeEventListener("touchend", Q.current));
    };
  }, []);
  var ye = function(O, j, V) {
    j !== void 0 && p(j), w(O);
    var Z = O;
    V && (Z = O.filter(function($, J) {
      return J !== f;
    })), u(Z), we && we({
      rawValues: O,
      deleteIndex: V ? f : -1,
      draggingIndex: f,
      draggingValue: j
    });
  }, Re = Ge(function(P, O, j) {
    if (P === -1) {
      var V = L[0], Z = L[L.length - 1], $ = n - V, J = i - Z, ne = O * (i - n);
      ne = Math.max(ne, $), ne = Math.min(ne, J);
      var Le = a(V + ne);
      ne = Le - V;
      var le = L.map(function(se) {
        return se + ne;
      });
      ye(le);
    } else {
      var ue = (i - n) * O, ce = ge(D);
      ce[P] = L[P];
      var Ce = b(ce, ue, P, "dist");
      ye(Ce.values, Ce.value, j);
    }
  }), Oe = function(O, j, V) {
    O.stopPropagation();
    var Z = V || r, $ = Z[j];
    l(j), p($), K(Z), w(Z), T(!1);
    var J = Tt(O), ne = J.pageX, Le = J.pageY, le = !1;
    oe && oe({
      rawValues: Z,
      draggingIndex: j,
      draggingValue: $
    });
    var ue = function(se) {
      se.preventDefault();
      var ee = Tt(se), je = ee.pageX, He = ee.pageY, Ie = je - ne, ie = He - Le, ae = e.current.getBoundingClientRect(), xe = ae.width, Ue = ae.height, Se, pe;
      switch (t) {
        case "btt":
          Se = -ie / Ue, pe = Ie;
          break;
        case "ttb":
          Se = ie / Ue, pe = Ie;
          break;
        case "rtl":
          Se = -Ie / xe, pe = ie;
          break;
        default:
          Se = Ie / xe, pe = ie;
      }
      le = m ? Math.abs(pe) > _r && h < D.length : !1, T(le), Re(j, Se, le);
    }, ce = function Ce(se) {
      se.preventDefault(), document.removeEventListener("mouseup", Ce), document.removeEventListener("mousemove", ue), _.current && (_.current.removeEventListener("touchmove", U.current), _.current.removeEventListener("touchend", Q.current)), U.current = null, Q.current = null, _.current = null, s(le), l(-1), T(!1);
    };
    document.addEventListener("mouseup", ce), document.addEventListener("mousemove", ue), O.currentTarget.addEventListener("touchend", ce), O.currentTarget.addEventListener("touchmove", ue), U.current = ue, Q.current = ce, _.current = O.currentTarget;
  }, be = X(function() {
    var P = ge(r).sort(function($, J) {
      return $ - J;
    }), O = ge(D).sort(function($, J) {
      return $ - J;
    }), j = {};
    O.forEach(function($) {
      j[$] = (j[$] || 0) + 1;
    }), P.forEach(function($) {
      j[$] = (j[$] || 0) - 1;
    });
    var V = m ? 1 : 0, Z = Object.values(j).reduce(function($, J) {
      return $ + Math.abs(J);
    }, 0);
    return Z <= V ? D : r;
  }, [r, D, m]);
  return [f, y, N, be, Oe];
}
function Lr(e, t, r, n, i, a) {
  var u = et(function(y) {
    return Math.max(e, Math.min(t, y));
  }, [e, t]), s = et(function(y) {
    if (r !== null) {
      var p = e + Math.round((u(y) - e) / r) * r, v = function(o) {
        return (String(o).split(".")[1] || "").length;
      }, c = Math.max(v(r), v(t), v(e)), f = Number(p.toFixed(c));
      return e <= f && f <= t ? f : null;
    }
    return null;
  }, [r, e, t, u]), b = et(function(y) {
    var p = u(y), v = n.map(function(l) {
      return l.value;
    });
    r !== null && v.push(s(y)), v.push(e, t);
    var c = v[0], f = t - e;
    return v.forEach(function(l) {
      var o = Math.abs(p - l);
      o <= f && (c = l, f = o);
    }), c;
  }, [e, t, n, r, u, s]), m = function y(p, v, c) {
    var f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
    if (typeof v == "number") {
      var l, o = p[c], C = o + v, N = [];
      n.forEach(function(w) {
        N.push(w.value);
      }), N.push(e, t), N.push(s(o));
      var T = v > 0 ? 1 : -1;
      f === "unit" ? N.push(s(o + T * r)) : N.push(s(C)), N = N.filter(function(w) {
        return w !== null;
      }).filter(function(w) {
        return v < 0 ? w <= o : w >= o;
      }), f === "unit" && (N = N.filter(function(w) {
        return w !== o;
      }));
      var G = f === "unit" ? o : C;
      l = N[0];
      var Y = Math.abs(l - G);
      if (N.forEach(function(w) {
        var E = Math.abs(w - G);
        E < Y && (l = w, Y = E);
      }), l === void 0)
        return v < 0 ? e : t;
      if (f === "dist")
        return l;
      if (Math.abs(v) > 1) {
        var D = ge(p);
        return D[c] = l, y(D, v - T, c, f);
      }
      return l;
    } else {
      if (v === "min")
        return e;
      if (v === "max")
        return t;
    }
  }, h = function(p, v, c) {
    var f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit", l = p[c], o = m(p, v, c, f);
    return {
      value: o,
      changed: o !== l
    };
  }, S = function(p) {
    return a === null && p === 0 || typeof a == "number" && p < a;
  }, k = function(p, v, c) {
    var f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit", l = p.map(b), o = l[c], C = m(l, v, c, f);
    if (l[c] = C, i === !1) {
      var N = a || 0;
      c > 0 && l[c - 1] !== o && (l[c] = Math.max(l[c], l[c - 1] + N)), c < l.length - 1 && l[c + 1] !== o && (l[c] = Math.min(l[c], l[c + 1] - N));
    } else if (typeof a == "number" || a === null) {
      for (var T = c + 1; T < l.length; T += 1)
        for (var G = !0; S(l[T] - l[T - 1]) && G; ) {
          var Y = h(l, 1, T);
          l[T] = Y.value, G = Y.changed;
        }
      for (var D = c; D > 0; D -= 1)
        for (var w = !0; S(l[D] - l[D - 1]) && w; ) {
          var E = h(l, -1, D - 1);
          l[D - 1] = E.value, w = E.changed;
        }
      for (var M = l.length - 1; M > 0; M -= 1)
        for (var L = !0; S(l[M] - l[M - 1]) && L; ) {
          var K = h(l, -1, M - 1);
          l[M - 1] = K.value, L = K.changed;
        }
      for (var U = 0; U < l.length - 1; U += 1)
        for (var Q = !0; S(l[U + 1] - l[U]) && Q; ) {
          var _ = h(l, 1, U + 1);
          l[U + 1] = _.value, Q = _.changed;
        }
    }
    return {
      value: l[c],
      values: l
    };
  };
  return [b, k];
}
function jr(e) {
  return X(function() {
    if (e === !0 || !e)
      return [!!e, !1, !1, 0];
    var t = e.editable, r = e.draggableTrack, n = e.minCount, i = e.maxCount;
    return [!0, t, !t && r, n || 0, i];
  }, [e]);
}
var it = /* @__PURE__ */ ct(function(e, t) {
  var r = e.prefixCls, n = r === void 0 ? "rc-slider" : r, i = e.className, a = e.style, u = e.classNames, s = e.styles, b = e.id, m = e.disabled, h = m === void 0 ? !1 : m, S = e.keyboard, k = S === void 0 ? !0 : S, y = e.autoFocus, p = e.onFocus, v = e.onBlur, c = e.min, f = c === void 0 ? 0 : c, l = e.max, o = l === void 0 ? 100 : l, C = e.step, N = C === void 0 ? 1 : C, T = e.value, G = e.defaultValue, Y = e.range, D = e.count, w = e.onChange, E = e.onBeforeChange, M = e.onAfterChange, L = e.onChangeComplete, K = e.allowCross, U = K === void 0 ? !0 : K, Q = e.pushable, _ = Q === void 0 ? !1 : Q, he = e.reverse, oe = e.vertical, we = e.included, ye = we === void 0 ? !0 : we, Re = e.startPoint, Oe = e.trackStyle, be = e.handleStyle, P = e.railStyle, O = e.dotStyle, j = e.activeDotStyle, V = e.marks, Z = e.dots, $ = e.handleRender, J = e.activeHandleRender, ne = e.track, Le = e.tabIndex, le = Le === void 0 ? 0 : Le, ue = e.ariaLabelForHandle, ce = e.ariaLabelledByForHandle, Ce = e.ariaRequired, se = e.ariaValueTextFormatterForHandle, ee = me(null), je = me(null), He = X(function() {
    return oe ? he ? "ttb" : "btt" : he ? "rtl" : "ltr";
  }, [he, oe]), Ie = jr(Y), ie = W(Ie, 5), ae = ie[0], xe = ie[1], Ue = ie[2], Se = ie[3], pe = ie[4], te = X(function() {
    return isFinite(f) ? f : 0;
  }, [f]), We = X(function() {
    return isFinite(o) ? o : 100;
  }, [o]), De = X(function() {
    return N !== null && N <= 0 ? 1 : N;
  }, [N]), Wt = X(function() {
    return typeof _ == "boolean" ? _ ? De : !1 : _ >= 0 ? _ : !1;
  }, [_, De]), Ve = X(function() {
    return Object.keys(V || {}).map(function(R) {
      var g = V[R], x = {
        value: Number(R)
      };
      return g && Me(g) === "object" && !/* @__PURE__ */ ar(g) && ("label" in g || "style" in g) ? (x.style = g.style, x.label = g.label) : x.label = g, x;
    }).filter(function(R) {
      var g = R.label;
      return g || typeof g == "number";
    }).sort(function(R, g) {
      return R.value - g.value;
    });
  }, [V]), zt = Lr(te, We, De, Ve, U, Wt), ft = W(zt, 2), Je = ft[0], vt = ft[1], qt = br(G, {
    value: T
  }), gt = W(qt, 2), ke = gt[0], Gt = gt[1], B = X(function() {
    var R = ke == null ? [] : Array.isArray(ke) ? ke : [ke], g = W(R, 1), x = g[0], A = x === void 0 ? te : x, H = ke === null ? [] : [A];
    if (ae) {
      if (H = ge(R), D || ke === void 0) {
        var Ee = D >= 0 ? D + 1 : 2;
        for (H = H.slice(0, Ee); H.length < Ee; ) {
          var de;
          H.push((de = H[H.length - 1]) !== null && de !== void 0 ? de : te);
        }
      }
      H.sort(function(fe, ve) {
        return fe - ve;
      });
    }
    return H.forEach(function(fe, ve) {
      H[ve] = Je(fe);
    }), H;
  }, [ke, ae, te, D, Je]), ze = function(g) {
    return ae ? g : g[0];
  }, Qe = Ge(function(R) {
    var g = ge(R).sort(function(x, A) {
      return x - A;
    });
    w && !Nr(g, B, !0) && w(ze(g)), Gt(g);
  }), mt = Ge(function(R) {
    R && ee.current.hideHelp();
    var g = ze(B);
    M?.(g), Ke(!M, "[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead."), L?.(g);
  }), Kt = function(g) {
    if (!(h || !xe || B.length <= Se)) {
      var x = ge(B);
      x.splice(g, 1), E?.(ze(x)), Qe(x);
      var A = Math.max(0, g - 1);
      ee.current.hideHelp(), ee.current.focus(A);
    }
  }, Bt = $r(je, He, B, te, We, Je, Qe, mt, vt, xe, Se), Be = W(Bt, 5), ht = Be[0], Xt = Be[1], Yt = Be[2], tt = Be[3], yt = Be[4], bt = function(g, x) {
    if (!h) {
      var A = ge(B), H = 0, Ee = 0, de = We - te;
      B.forEach(function(Ne, Ze) {
        var wt = Math.abs(g - Ne);
        wt <= de && (de = wt, H = Ze), Ne < g && (Ee = Ze);
      });
      var fe = H;
      xe && de !== 0 && (!pe || B.length < pe) ? (A.splice(Ee + 1, 0, g), fe = Ee + 1) : A[H] = g, ae && !B.length && D === void 0 && A.push(g);
      var ve = ze(A);
      if (E?.(ve), Qe(A), x) {
        var Pe, qe;
        (Pe = document.activeElement) === null || Pe === void 0 || (qe = Pe.blur) === null || qe === void 0 || qe.call(Pe), ee.current.focus(fe), yt(x, fe, A);
      } else
        M?.(ve), Ke(!M, "[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead."), L?.(ve);
    }
  }, Vt = function(g) {
    g.preventDefault();
    var x = je.current.getBoundingClientRect(), A = x.width, H = x.height, Ee = x.left, de = x.top, fe = x.bottom, ve = x.right, Pe = g.clientX, qe = g.clientY, Ne;
    switch (He) {
      case "btt":
        Ne = (fe - qe) / H;
        break;
      case "ttb":
        Ne = (qe - de) / H;
        break;
      case "rtl":
        Ne = (ve - Pe) / A;
        break;
      default:
        Ne = (Pe - Ee) / A;
    }
    var Ze = te + Ne * (We - te);
    bt(Je(Ze), g);
  }, Jt = z(null), Ct = W(Jt, 2), rt = Ct[0], St = Ct[1], Qt = function(g, x) {
    if (!h) {
      var A = vt(B, g, x);
      E?.(ze(B)), Qe(A.values), St(A.value);
    }
  };
  Fe(function() {
    if (rt !== null) {
      var R = B.indexOf(rt);
      R >= 0 && ee.current.focus(R);
    }
    St(null);
  }, [rt]);
  var Zt = X(function() {
    return Ue && De === null ? !1 : Ue;
  }, [Ue, De]), pt = Ge(function(R, g) {
    yt(R, g), E?.(ze(B));
  }), kt = ht !== -1;
  Fe(function() {
    if (!kt) {
      var R = B.lastIndexOf(Xt);
      ee.current.focus(R);
    }
  }, [kt]);
  var Xe = X(function() {
    return ge(tt).sort(function(R, g) {
      return R - g;
    });
  }, [tt]), er = X(function() {
    return ae ? [Xe[0], Xe[Xe.length - 1]] : [te, Xe[0]];
  }, [Xe, ae, te]), Et = W(er, 2), Nt = Et[0], Mt = Et[1];
  $t(t, function() {
    return {
      focus: function() {
        ee.current.focus(0);
      },
      blur: function() {
        var g, x = document, A = x.activeElement;
        (g = je.current) !== null && g !== void 0 && g.contains(A) && A?.blur();
      }
    };
  }), Fe(function() {
    y && ee.current.focus(0);
  }, []);
  var tr = X(function() {
    return {
      min: te,
      max: We,
      direction: He,
      disabled: h,
      keyboard: k,
      step: De,
      included: ye,
      includedStart: Nt,
      includedEnd: Mt,
      range: ae,
      tabIndex: le,
      ariaLabelForHandle: ue,
      ariaLabelledByForHandle: ce,
      ariaRequired: Ce,
      ariaValueTextFormatterForHandle: se,
      styles: s || {},
      classNames: u || {}
    };
  }, [te, We, He, h, k, De, ye, Nt, Mt, ae, le, ue, ce, Ce, se, s, u]);
  return /* @__PURE__ */ F($e.Provider, {
    value: tr
  }, /* @__PURE__ */ F("div", {
    ref: je,
    className: Te(n, i, re(re(re(re({}, "".concat(n, "-disabled"), h), "".concat(n, "-vertical"), oe), "".concat(n, "-horizontal"), !oe), "".concat(n, "-with-marks"), Ve.length)),
    style: a,
    onMouseDown: Vt,
    id: b
  }, /* @__PURE__ */ F("div", {
    className: Te("".concat(n, "-rail"), u?.rail),
    style: q(q({}, P), s?.rail)
  }), ne !== !1 && /* @__PURE__ */ F(Tr, {
    prefixCls: n,
    style: Oe,
    values: B,
    startPoint: Re,
    onStartMove: Zt ? pt : void 0
  }), /* @__PURE__ */ F(Fr, {
    prefixCls: n,
    marks: Ve,
    dots: Z,
    style: O,
    activeStyle: j
  }), /* @__PURE__ */ F(xr, {
    ref: ee,
    prefixCls: n,
    style: be,
    values: tt,
    draggingIndex: ht,
    draggingDelete: Yt,
    onStartMove: pt,
    onOffsetChange: Qt,
    onFocus: p,
    onBlur: v,
    handleRender: $,
    activeHandleRender: J,
    onChangeComplete: mt,
    onDelete: xe ? Kt : void 0
  }), /* @__PURE__ */ F(Pr, {
    prefixCls: n,
    marks: Ve,
    onClick: bt
  })));
});
const Hr = () => {
  const [e, t] = z(!0), [r, n] = z(25), [i, a] = z(5e4), [u, s] = z([0, 1e4]), [b, m] = z([]), [h, S] = z(""), [k, y] = z(""), p = [
    "North America",
    "Europe",
    "Asia Pacific",
    "Latin America",
    "Middle East",
    "Africa",
    "Canada",
    "United States",
    "United Kingdom",
    "Germany",
    "France",
    "Japan",
    "Australia",
    "Brazil",
    "India"
  ], v = [
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Manufacturing",
    "Education",
    "Real Estate",
    "Transportation",
    "Energy",
    "Media & Entertainment",
    "Agriculture",
    "Construction",
    "Professional Services",
    "Government",
    "Non-profit"
  ];
  Fe(() => {
    (async () => {
      try {
        await new Promise((C) => setTimeout(C, 2e3)), t(!1);
      } catch (C) {
        console.error("Failed to load form data:", C), t(!1);
      }
    })();
  }, []);
  const c = (o) => {
    b.includes(o) || (m([...b, o]), S(""));
  }, f = (o) => {
    m(b.filter((C) => C !== o));
  }, l = p.filter(
    (o) => o.toLowerCase().includes(h.toLowerCase()) && !b.includes(o)
  );
  return /* @__PURE__ */ d(st, { children: [
    /* @__PURE__ */ d("style", { children: `
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: 4px solid #146aff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          input[type="range"]::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: 4px solid #146aff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          /* Firefox styling */
          input[type="range"]::-moz-range-track {
            background: #E4EAEF;
            height: 4px;
            border-radius: 2px;
            border: none;
          }

          input[type="range"]::-moz-range-progress {
            background: #146aff;
            height: 4px;
            border-radius: 2px;
          }

          /* Webkit browsers */
          input[type="range"]::-webkit-slider-track {
            background: #E4EAEF;
            height: 4px;
            border-radius: 2px;
            border: none;
          }

          /* Webkit progress value (limited support) */
          input[type="range"]::-webkit-progress-value {
            background: #146aff;
          }
        ` }),
    /* @__PURE__ */ d("div", { className: "roi-form", children: [
      /* @__PURE__ */ d("div", { className: "roi-field", children: [
        /* @__PURE__ */ d("div", { className: "roi-field-title", children: "Opportunity win rate" }),
        e ? /* @__PURE__ */ d("div", { className: "roi-field-skeleton" }) : /* @__PURE__ */ d("div", { className: "roi-slider-input-group", children: [
          /* @__PURE__ */ d("div", { className: "roi-slider-wrapper-no-label", children: /* @__PURE__ */ d(
            it,
            {
              value: r,
              onChange: (o) => n(o),
              min: 0,
              max: 100,
              className: "roi-rc-slider"
            }
          ) }),
          /* @__PURE__ */ d(
            "input",
            {
              type: "text",
              value: `${r}%`,
              onChange: (o) => {
                const C = o.target.value.replace("%", ""), N = parseFloat(C);
                isNaN(N) || n(Math.max(0, Math.min(100, N)));
              },
              className: "roi-field-input roi-input-fixed",
              placeholder: "25%"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ d("div", { className: "roi-field", children: [
        /* @__PURE__ */ d("div", { className: "roi-field-title", children: "Average deal size" }),
        e ? /* @__PURE__ */ d("div", { className: "roi-field-skeleton" }) : /* @__PURE__ */ d("div", { className: "roi-slider-input-group", children: [
          /* @__PURE__ */ d("div", { className: "roi-slider-wrapper-no-label", children: /* @__PURE__ */ d(
            it,
            {
              value: i,
              onChange: (o) => a(o),
              min: 1e4,
              max: 1e6,
              step: 1e4,
              className: "roi-rc-slider"
            }
          ) }),
          /* @__PURE__ */ d(
            "input",
            {
              type: "text",
              value: `$${i.toLocaleString()}`,
              onChange: (o) => {
                const C = o.target.value.replace(/[$,]/g, ""), N = parseFloat(C);
                isNaN(N) || a(Math.max(1e4, Math.min(1e6, N)));
              },
              className: "roi-field-input roi-input-fixed",
              placeholder: "$50,000"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ d("div", { className: "roi-field", children: [
        /* @__PURE__ */ d("div", { className: "roi-field-title", children: "What company sizes do you sell to?" }),
        e ? /* @__PURE__ */ d("div", { className: "roi-field-skeleton" }) : /* @__PURE__ */ d("div", { className: "roi-slider-wrapper", children: [
          /* @__PURE__ */ d(
            it,
            {
              range: !0,
              value: u,
              onChange: (o) => s(o),
              min: 0,
              max: 1e4,
              className: "roi-rc-slider"
            }
          ),
          /* @__PURE__ */ d("span", { className: "roi-slider-value-min", children: u[0].toLocaleString() }),
          /* @__PURE__ */ d("span", { className: "roi-slider-value-max", children: [
            u[1].toLocaleString(),
            "+"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d("div", { className: "roi-field", children: [
        /* @__PURE__ */ d("div", { className: "roi-field-title", children: "What territories do you sell to?" }),
        e ? /* @__PURE__ */ d("div", { className: "roi-field-skeleton" }) : /* @__PURE__ */ d("div", { className: "roi-autocomplete-container", children: [
          /* @__PURE__ */ d(
            "input",
            {
              type: "text",
              value: h,
              onChange: (o) => S(o.target.value),
              className: "roi-field-input",
              placeholder: "Search territories..."
            }
          ),
          h && l.length > 0 && /* @__PURE__ */ d("div", { className: "roi-autocomplete-dropdown", children: l.slice(0, 5).map((o) => /* @__PURE__ */ d(
            "div",
            {
              className: "roi-autocomplete-item",
              onClick: () => c(o),
              children: o
            },
            o
          )) }),
          b.length > 0 && /* @__PURE__ */ d("div", { className: "roi-pills-container", children: b.map((o) => /* @__PURE__ */ d("div", { className: "roi-pill", children: [
            o,
            /* @__PURE__ */ d(
              "button",
              {
                onClick: () => f(o),
                className: "roi-pill-remove",
                children: "×"
              }
            )
          ] }, o)) })
        ] })
      ] }),
      /* @__PURE__ */ d("div", { className: "roi-field", children: [
        /* @__PURE__ */ d("div", { className: "roi-field-title", children: "What industries do you sell to?" }),
        e ? /* @__PURE__ */ d("div", { className: "roi-field-skeleton" }) : /* @__PURE__ */ d(
          "select",
          {
            value: k,
            onChange: (o) => y(o.target.value),
            className: "roi-field-input roi-select-full",
            children: [
              /* @__PURE__ */ d("option", { value: "", children: "Select industry" }),
              v.map((o) => /* @__PURE__ */ d("option", { value: o, children: o }, o))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ d("div", { className: "roi-field", children: /* @__PURE__ */ d("a", { href: "#", className: "roi-submit w-button", children: "Calculate" }) })
    ] }),
    /* @__PURE__ */ d("div", { className: "roi-results", children: [
      /* @__PURE__ */ d("div", { className: "roi-stats", children: [
        /* @__PURE__ */ d("div", { className: "roi-stats-number", children: "—" }),
        /* @__PURE__ */ d("div", { className: "roi-stats-title", children: "Total accounts in your market in Crunchbase" })
      ] }),
      /* @__PURE__ */ d("div", { className: "roi-stats-group", children: [
        /* @__PURE__ */ d("div", { className: "roi-stats-group-item", children: [
          /* @__PURE__ */ d("div", { className: "roi-item-title", children: "Accounts with funding in the last 6 months" }),
          /* @__PURE__ */ d("div", { className: "roi-item-value", children: "—" })
        ] }),
        /* @__PURE__ */ d("div", { className: "roi-stats-group-item", children: [
          /* @__PURE__ */ d("div", { className: "roi-item-title", children: "Accounts with funding in the last 6 months" }),
          /* @__PURE__ */ d("div", { className: "roi-item-value", children: "—" })
        ] })
      ] }),
      /* @__PURE__ */ d("div", { className: "roi-stats", children: [
        /* @__PURE__ */ d("div", { className: "roi-stats-number", children: "—" }),
        /* @__PURE__ */ d("div", { className: "roi-stats-title", children: "Potential additional revenue" })
      ] })
    ] })
  ] });
};
function Ut(e = "#roi-calculator") {
  console.log("🚀 ROI Calculator: Starting initialization...");
  try {
    const t = document.querySelector(e);
    if (!t) {
      console.error(
        `❌ ROI Calculator: Container "${e}" not found`
      );
      return;
    }
    return console.log(`✅ ROI Calculator: Found container "${e}"`), ir(F(Hr), t), console.log("✅ ROI Calculator: Component rendered successfully"), t;
  } catch (t) {
    console.error("❌ ROI Calculator: Error during initialization:", t);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#roi-calculator") ? Ut() : console.log(
    "💡 ROI Calculator: No #roi-calculator container found. Use initROICalculator('#your-selector') to initialize manually."
  );
});
window.initROICalculator = Ut;
export {
  Ut as default,
  Ut as initROICalculator
};
