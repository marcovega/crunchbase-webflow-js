var z, s, H_, S, u_, E_, N_, U_, t_, J, K, T_, W = {}, A_ = [], Q_ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, D = Array.isArray;
function w(_, e) {
  for (var t in e) _[t] = e[t];
  return _;
}
function n_(_) {
  _ && _.parentNode && _.parentNode.removeChild(_);
}
function X(_, e, t) {
  var n, r, o, l = {};
  for (o in e) o == "key" ? n = e[o] : o == "ref" ? r = e[o] : l[o] = e[o];
  if (arguments.length > 2 && (l.children = arguments.length > 3 ? z.call(arguments, 2) : t), typeof _ == "function" && _.defaultProps != null) for (o in _.defaultProps) l[o] === void 0 && (l[o] = _.defaultProps[o]);
  return q(_, l, n, r, null);
}
function q(_, e, t, n, r) {
  var o = { type: _, props: e, key: t, ref: n, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: r ?? ++H_, __i: -1, __u: 0 };
  return r == null && s.vnode != null && s.vnode(o), o;
}
function N(_) {
  return _.children;
}
function P(_, e) {
  this.props = _, this.context = e;
}
function U(_, e) {
  if (e == null) return _.__ ? U(_.__, _.__i + 1) : null;
  for (var t; e < _.__k.length; e++) if ((t = _.__k[e]) != null && t.__e != null) return t.__e;
  return typeof _.type == "function" ? U(_) : null;
}
function F_(_) {
  var e, t;
  if ((_ = _.__) != null && _.__c != null) {
    for (_.__e = _.__c.base = null, e = 0; e < _.__k.length; e++) if ((t = _.__k[e]) != null && t.__e != null) {
      _.__e = _.__c.base = t.__e;
      break;
    }
    return F_(_);
  }
}
function Y(_) {
  (!_.__d && (_.__d = !0) && S.push(_) && !I.__r++ || u_ != s.debounceRendering) && ((u_ = s.debounceRendering) || E_)(I);
}
function I() {
  for (var _, e, t, n, r, o, l, c = 1; S.length; ) S.length > c && S.sort(N_), _ = S.shift(), c = S.length, _.__d && (t = void 0, r = (n = (e = _).__v).__e, o = [], l = [], e.__P && ((t = w({}, n)).__v = n.__v + 1, s.vnode && s.vnode(t), r_(e.__P, t, n, e.__n, e.__P.namespaceURI, 32 & n.__u ? [r] : null, o, r ?? U(n), !!(32 & n.__u), l), t.__v = n.__v, t.__.__k[t.__i] = t, M_(o, t, l), t.__e != r && F_(t)));
  I.__r = 0;
}
function W_(_, e, t, n, r, o, l, c, a, u, p) {
  var i, h, f, b, k, g, d, v = n && n.__k || A_, x = e.length;
  for (a = Z_(t, e, v, a, x), i = 0; i < x; i++) (f = t.__k[i]) != null && (h = f.__i == -1 ? W : v[f.__i] || W, f.__i = i, g = r_(_, f, h, r, o, l, c, a, u, p), b = f.__e, f.ref && h.ref != f.ref && (h.ref && o_(h.ref, null, f), p.push(f.ref, f.__c || b, f)), k == null && b != null && (k = b), (d = !!(4 & f.__u)) || h.__k === f.__k ? a = D_(f, a, _, d) : typeof f.type == "function" && g !== void 0 ? a = g : b && (a = b.nextSibling), f.__u &= -7);
  return t.__e = k, a;
}
function Z_(_, e, t, n, r) {
  var o, l, c, a, u, p = t.length, i = p, h = 0;
  for (_.__k = new Array(r), o = 0; o < r; o++) (l = e[o]) != null && typeof l != "boolean" && typeof l != "function" ? (a = o + h, (l = _.__k[o] = typeof l == "string" || typeof l == "number" || typeof l == "bigint" || l.constructor == String ? q(null, l, null, null, null) : D(l) ? q(N, { children: l }, null, null, null) : l.constructor == null && l.__b > 0 ? q(l.type, l.props, l.key, l.ref ? l.ref : null, l.__v) : l).__ = _, l.__b = _.__b + 1, c = null, (u = l.__i = J_(l, t, a, i)) != -1 && (i--, (c = t[u]) && (c.__u |= 2)), c == null || c.__v == null ? (u == -1 && (r > p ? h-- : r < p && h++), typeof l.type != "function" && (l.__u |= 4)) : u != a && (u == a - 1 ? h-- : u == a + 1 ? h++ : (u > a ? h-- : h++, l.__u |= 4))) : _.__k[o] = null;
  if (i) for (o = 0; o < p; o++) (c = t[o]) != null && (2 & c.__u) == 0 && (c.__e == n && (n = U(c)), R_(c, c));
  return n;
}
function D_(_, e, t, n) {
  var r, o;
  if (typeof _.type == "function") {
    for (r = _.__k, o = 0; r && o < r.length; o++) r[o] && (r[o].__ = _, e = D_(r[o], e, t, n));
    return e;
  }
  _.__e != e && (n && (e && _.type && !e.parentNode && (e = U(_)), t.insertBefore(_.__e, e || null)), e = _.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function V(_, e) {
  return e = e || [], _ == null || typeof _ == "boolean" || (D(_) ? _.some(function(t) {
    V(t, e);
  }) : e.push(_)), e;
}
function J_(_, e, t, n) {
  var r, o, l, c = _.key, a = _.type, u = e[t], p = u != null && (2 & u.__u) == 0;
  if (u === null && _.key == null || p && c == u.key && a == u.type) return t;
  if (n > (p ? 1 : 0)) {
    for (r = t - 1, o = t + 1; r >= 0 || o < e.length; ) if ((u = e[l = r >= 0 ? r-- : o++]) != null && (2 & u.__u) == 0 && c == u.key && a == u.type) return l;
  }
  return -1;
}
function c_(_, e, t) {
  e[0] == "-" ? _.setProperty(e, t ?? "") : _[e] = t == null ? "" : typeof t != "number" || Q_.test(e) ? t : t + "px";
}
function L(_, e, t, n, r) {
  var o, l;
  _: if (e == "style") if (typeof t == "string") _.style.cssText = t;
  else {
    if (typeof n == "string" && (_.style.cssText = n = ""), n) for (e in n) t && e in t || c_(_.style, e, "");
    if (t) for (e in t) n && t[e] == n[e] || c_(_.style, e, t[e]);
  }
  else if (e[0] == "o" && e[1] == "n") o = e != (e = e.replace(U_, "$1")), l = e.toLowerCase(), e = l in _ || e == "onFocusOut" || e == "onFocusIn" ? l.slice(2) : e.slice(2), _.l || (_.l = {}), _.l[e + o] = t, t ? n ? t.u = n.u : (t.u = t_, _.addEventListener(e, o ? K : J, o)) : _.removeEventListener(e, o ? K : J, o);
  else {
    if (r == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in _) try {
      _[e] = t ?? "";
      break _;
    } catch {
    }
    typeof t == "function" || (t == null || t === !1 && e[4] != "-" ? _.removeAttribute(e) : _.setAttribute(e, e == "popover" && t == 1 ? "" : t));
  }
}
function a_(_) {
  return function(e) {
    if (this.l) {
      var t = this.l[e.type + _];
      if (e.t == null) e.t = t_++;
      else if (e.t < t.u) return;
      return t(s.event ? s.event(e) : e);
    }
  };
}
function r_(_, e, t, n, r, o, l, c, a, u) {
  var p, i, h, f, b, k, g, d, v, x, C, O, A, l_, R, F, G, $ = e.type;
  if (e.constructor != null) return null;
  128 & t.__u && (a = !!(32 & t.__u), o = [c = e.__e = t.__e]), (p = s.__b) && p(e);
  _: if (typeof $ == "function") try {
    if (d = e.props, v = "prototype" in $ && $.prototype.render, x = (p = $.contextType) && n[p.__c], C = p ? x ? x.props.value : p.__ : n, t.__c ? g = (i = e.__c = t.__c).__ = i.__E : (v ? e.__c = i = new $(d, C) : (e.__c = i = new P(d, C), i.constructor = $, i.render = X_), x && x.sub(i), i.props = d, i.state || (i.state = {}), i.context = C, i.__n = n, h = i.__d = !0, i.__h = [], i._sb = []), v && i.__s == null && (i.__s = i.state), v && $.getDerivedStateFromProps != null && (i.__s == i.state && (i.__s = w({}, i.__s)), w(i.__s, $.getDerivedStateFromProps(d, i.__s))), f = i.props, b = i.state, i.__v = e, h) v && $.getDerivedStateFromProps == null && i.componentWillMount != null && i.componentWillMount(), v && i.componentDidMount != null && i.__h.push(i.componentDidMount);
    else {
      if (v && $.getDerivedStateFromProps == null && d !== f && i.componentWillReceiveProps != null && i.componentWillReceiveProps(d, C), !i.__e && i.shouldComponentUpdate != null && i.shouldComponentUpdate(d, i.__s, C) === !1 || e.__v == t.__v) {
        for (e.__v != t.__v && (i.props = d, i.state = i.__s, i.__d = !1), e.__e = t.__e, e.__k = t.__k, e.__k.some(function(E) {
          E && (E.__ = e);
        }), O = 0; O < i._sb.length; O++) i.__h.push(i._sb[O]);
        i._sb = [], i.__h.length && l.push(i);
        break _;
      }
      i.componentWillUpdate != null && i.componentWillUpdate(d, i.__s, C), v && i.componentDidUpdate != null && i.__h.push(function() {
        i.componentDidUpdate(f, b, k);
      });
    }
    if (i.context = C, i.props = d, i.__P = _, i.__e = !1, A = s.__r, l_ = 0, v) {
      for (i.state = i.__s, i.__d = !1, A && A(e), p = i.render(i.props, i.state, i.context), R = 0; R < i._sb.length; R++) i.__h.push(i._sb[R]);
      i._sb = [];
    } else do
      i.__d = !1, A && A(e), p = i.render(i.props, i.state, i.context), i.state = i.__s;
    while (i.__d && ++l_ < 25);
    i.state = i.__s, i.getChildContext != null && (n = w(w({}, n), i.getChildContext())), v && !h && i.getSnapshotBeforeUpdate != null && (k = i.getSnapshotBeforeUpdate(f, b)), F = p, p != null && p.type === N && p.key == null && (F = O_(p.props.children)), c = W_(_, D(F) ? F : [F], e, t, n, r, o, l, c, a, u), i.base = e.__e, e.__u &= -161, i.__h.length && l.push(i), g && (i.__E = i.__ = null);
  } catch (E) {
    if (e.__v = null, a || o != null) if (E.then) {
      for (e.__u |= a ? 160 : 128; c && c.nodeType == 8 && c.nextSibling; ) c = c.nextSibling;
      o[o.indexOf(c)] = null, e.__e = c;
    } else {
      for (G = o.length; G--; ) n_(o[G]);
      __(e);
    }
    else e.__e = t.__e, e.__k = t.__k, E.then || __(e);
    s.__e(E, e, t);
  }
  else o == null && e.__v == t.__v ? (e.__k = t.__k, e.__e = t.__e) : c = e.__e = K_(t.__e, e, t, n, r, o, l, a, u);
  return (p = s.diffed) && p(e), 128 & e.__u ? void 0 : c;
}
function __(_) {
  _ && _.__c && (_.__c.__e = !0), _ && _.__k && _.__k.forEach(__);
}
function M_(_, e, t) {
  for (var n = 0; n < t.length; n++) o_(t[n], t[++n], t[++n]);
  s.__c && s.__c(e, _), _.some(function(r) {
    try {
      _ = r.__h, r.__h = [], _.some(function(o) {
        o.call(r);
      });
    } catch (o) {
      s.__e(o, r.__v);
    }
  });
}
function O_(_) {
  return typeof _ != "object" || _ == null || _.__b && _.__b > 0 ? _ : D(_) ? _.map(O_) : w({}, _);
}
function K_(_, e, t, n, r, o, l, c, a) {
  var u, p, i, h, f, b, k, g = t.props, d = e.props, v = e.type;
  if (v == "svg" ? r = "http://www.w3.org/2000/svg" : v == "math" ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), o != null) {
    for (u = 0; u < o.length; u++) if ((f = o[u]) && "setAttribute" in f == !!v && (v ? f.localName == v : f.nodeType == 3)) {
      _ = f, o[u] = null;
      break;
    }
  }
  if (_ == null) {
    if (v == null) return document.createTextNode(d);
    _ = document.createElementNS(r, v, d.is && d), c && (s.__m && s.__m(e, o), c = !1), o = null;
  }
  if (v == null) g === d || c && _.data == d || (_.data = d);
  else {
    if (o = o && z.call(_.childNodes), g = t.props || W, !c && o != null) for (g = {}, u = 0; u < _.attributes.length; u++) g[(f = _.attributes[u]).name] = f.value;
    for (u in g) if (f = g[u], u != "children") {
      if (u == "dangerouslySetInnerHTML") i = f;
      else if (!(u in d)) {
        if (u == "value" && "defaultValue" in d || u == "checked" && "defaultChecked" in d) continue;
        L(_, u, null, f, r);
      }
    }
    for (u in d) f = d[u], u == "children" ? h = f : u == "dangerouslySetInnerHTML" ? p = f : u == "value" ? b = f : u == "checked" ? k = f : c && typeof f != "function" || g[u] === f || L(_, u, f, g[u], r);
    if (p) c || i && (p.__html == i.__html || p.__html == _.innerHTML) || (_.innerHTML = p.__html), e.__k = [];
    else if (i && (_.innerHTML = ""), W_(e.type == "template" ? _.content : _, D(h) ? h : [h], e, t, n, v == "foreignObject" ? "http://www.w3.org/1999/xhtml" : r, o, l, o ? o[0] : t.__k && U(t, 0), c, a), o != null) for (u = o.length; u--; ) n_(o[u]);
    c || (u = "value", v == "progress" && b == null ? _.removeAttribute("value") : b != null && (b !== _[u] || v == "progress" && !b || v == "option" && b != g[u]) && L(_, u, b, g[u], r), u = "checked", k != null && k != _[u] && L(_, u, k, g[u], r));
  }
  return _;
}
function o_(_, e, t) {
  try {
    if (typeof _ == "function") {
      var n = typeof _.__u == "function";
      n && _.__u(), n && e == null || (_.__u = _(e));
    } else _.current = e;
  } catch (r) {
    s.__e(r, t);
  }
}
function R_(_, e, t) {
  var n, r;
  if (s.unmount && s.unmount(_), (n = _.ref) && (n.current && n.current != _.__e || o_(n, null, e)), (n = _.__c) != null) {
    if (n.componentWillUnmount) try {
      n.componentWillUnmount();
    } catch (o) {
      s.__e(o, e);
    }
    n.base = n.__P = null;
  }
  if (n = _.__k) for (r = 0; r < n.length; r++) n[r] && R_(n[r], e, t || typeof _.type != "function");
  t || n_(_.__e), _.__c = _.__ = _.__e = void 0;
}
function X_(_, e, t) {
  return this.constructor(_, t);
}
function de(_, e, t) {
  var n, r, o, l;
  e == document && (e = document.documentElement), s.__ && s.__(_, e), r = (n = !1) ? null : e.__k, o = [], l = [], r_(e, _ = e.__k = X(N, null, [_]), r || W, W, e.namespaceURI, r ? null : e.firstChild ? z.call(e.childNodes) : null, o, r ? r.__e : e.firstChild, n, l), M_(o, _, l);
}
function ve(_) {
  function e(t) {
    var n, r;
    return this.getChildContext || (n = /* @__PURE__ */ new Set(), (r = {})[e.__c] = this, this.getChildContext = function() {
      return r;
    }, this.componentWillUnmount = function() {
      n = null;
    }, this.shouldComponentUpdate = function(o) {
      this.props.value != o.value && n.forEach(function(l) {
        l.__e = !0, Y(l);
      });
    }, this.sub = function(o) {
      n.add(o);
      var l = o.componentWillUnmount;
      o.componentWillUnmount = function() {
        n && n.delete(o), l && l.call(o);
      };
    }), t.children;
  }
  return e.__c = "__cC" + T_++, e.__ = _, e.Provider = e.__l = (e.Consumer = function(t, n) {
    return t.children(n);
  }).contextType = e, e;
}
z = A_.slice, s = { __e: function(_, e, t, n) {
  for (var r, o, l; e = e.__; ) if ((r = e.__c) && !r.__) try {
    if ((o = r.constructor) && o.getDerivedStateFromError != null && (r.setState(o.getDerivedStateFromError(_)), l = r.__d), r.componentDidCatch != null && (r.componentDidCatch(_, n || {}), l = r.__d), l) return r.__E = r;
  } catch (c) {
    _ = c;
  }
  throw _;
} }, H_ = 0, P.prototype.setState = function(_, e) {
  var t;
  t = this.__s != null && this.__s != this.state ? this.__s : this.__s = w({}, this.state), typeof _ == "function" && (_ = _(w({}, t), this.props)), _ && w(t, _), _ != null && this.__v && (e && this._sb.push(e), Y(this));
}, P.prototype.forceUpdate = function(_) {
  this.__v && (this.__e = !0, _ && this.__h.push(_), Y(this));
}, P.prototype.render = N, S = [], E_ = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, N_ = function(_, e) {
  return _.__v.__b - e.__v.__b;
}, I.__r = 0, U_ = /(PointerCapture)$|Capture$/i, t_ = 0, J = a_(!1), K = a_(!0), T_ = 0;
var H, m, Q, f_, T = 0, L_ = [], y = s, s_ = y.__b, p_ = y.__r, h_ = y.diffed, d_ = y.__c, v_ = y.unmount, m_ = y.__;
function M(_, e) {
  y.__h && y.__h(m, _, T || e), T = 0;
  var t = m.__H || (m.__H = { __: [], __h: [] });
  return _ >= t.__.length && t.__.push({}), t.__[_];
}
function me(_) {
  return T = 1, Y_(q_, _);
}
function Y_(_, e, t) {
  var n = M(H++, 2);
  if (n.t = _, !n.__c && (n.__ = [t ? t(e) : q_(void 0, e), function(c) {
    var a = n.__N ? n.__N[0] : n.__[0], u = n.t(a, c);
    a !== u && (n.__N = [u, n.__[1]], n.__c.setState({}));
  }], n.__c = m, !m.__f)) {
    var r = function(c, a, u) {
      if (!n.__c.__H) return !0;
      var p = n.__c.__H.__.filter(function(h) {
        return !!h.__c;
      });
      if (p.every(function(h) {
        return !h.__N;
      })) return !o || o.call(this, c, a, u);
      var i = n.__c.props !== c;
      return p.forEach(function(h) {
        if (h.__N) {
          var f = h.__[0];
          h.__ = h.__N, h.__N = void 0, f !== h.__[0] && (i = !0);
        }
      }), o && o.call(this, c, a, u) || i;
    };
    m.__f = !0;
    var o = m.shouldComponentUpdate, l = m.componentWillUpdate;
    m.componentWillUpdate = function(c, a, u) {
      if (this.__e) {
        var p = o;
        o = void 0, r(c, a, u), o = p;
      }
      l && l.call(this, c, a, u);
    }, m.shouldComponentUpdate = r;
  }
  return n.__N || n.__;
}
function ye(_, e) {
  var t = M(H++, 3);
  !y.__s && i_(t.__H, e) && (t.__ = _, t.u = e, m.__H.__h.push(t));
}
function _e(_, e) {
  var t = M(H++, 4);
  !y.__s && i_(t.__H, e) && (t.__ = _, t.u = e, m.__h.push(t));
}
function be(_) {
  return T = 5, j_(function() {
    return { current: _ };
  }, []);
}
function ge(_, e, t) {
  T = 6, _e(function() {
    if (typeof _ == "function") {
      var n = _(e());
      return function() {
        _(null), n && typeof n == "function" && n();
      };
    }
    if (_) return _.current = e(), function() {
      return _.current = null;
    };
  }, t == null ? t : t.concat(_));
}
function j_(_, e) {
  var t = M(H++, 7);
  return i_(t.__H, e) && (t.__ = _(), t.__H = e, t.__h = _), t.__;
}
function ke(_, e) {
  return T = 8, j_(function() {
    return _;
  }, e);
}
function $e(_) {
  var e = m.context[_.__c], t = M(H++, 9);
  return t.c = _, e ? (t.__ == null && (t.__ = !0, e.sub(m)), e.props.value) : _.__;
}
function ee() {
  for (var _; _ = L_.shift(); ) if (_.__P && _.__H) try {
    _.__H.__h.forEach(B), _.__H.__h.forEach(e_), _.__H.__h = [];
  } catch (e) {
    _.__H.__h = [], y.__e(e, _.__v);
  }
}
y.__b = function(_) {
  m = null, s_ && s_(_);
}, y.__ = function(_, e) {
  _ && e.__k && e.__k.__m && (_.__m = e.__k.__m), m_ && m_(_, e);
}, y.__r = function(_) {
  p_ && p_(_), H = 0;
  var e = (m = _.__c).__H;
  e && (Q === m ? (e.__h = [], m.__h = [], e.__.forEach(function(t) {
    t.__N && (t.__ = t.__N), t.u = t.__N = void 0;
  })) : (e.__h.forEach(B), e.__h.forEach(e_), e.__h = [], H = 0)), Q = m;
}, y.diffed = function(_) {
  h_ && h_(_);
  var e = _.__c;
  e && e.__H && (e.__H.__h.length && (L_.push(e) !== 1 && f_ === y.requestAnimationFrame || ((f_ = y.requestAnimationFrame) || te)(ee)), e.__H.__.forEach(function(t) {
    t.u && (t.__H = t.u), t.u = void 0;
  })), Q = m = null;
}, y.__c = function(_, e) {
  e.some(function(t) {
    try {
      t.__h.forEach(B), t.__h = t.__h.filter(function(n) {
        return !n.__ || e_(n);
      });
    } catch (n) {
      e.some(function(r) {
        r.__h && (r.__h = []);
      }), e = [], y.__e(n, t.__v);
    }
  }), d_ && d_(_, e);
}, y.unmount = function(_) {
  v_ && v_(_);
  var e, t = _.__c;
  t && t.__H && (t.__H.__.forEach(function(n) {
    try {
      B(n);
    } catch (r) {
      e = r;
    }
  }), t.__H = void 0, e && y.__e(e, t.__v));
};
var y_ = typeof requestAnimationFrame == "function";
function te(_) {
  var e, t = function() {
    clearTimeout(n), y_ && cancelAnimationFrame(e), setTimeout(_);
  }, n = setTimeout(t, 35);
  y_ && (e = requestAnimationFrame(t));
}
function B(_) {
  var e = m, t = _.__c;
  typeof t == "function" && (_.__c = void 0, t()), m = e;
}
function e_(_) {
  var e = m;
  _.__c = _.__(), m = e;
}
function i_(_, e) {
  return !_ || _.length !== e.length || e.some(function(t, n) {
    return t !== _[n];
  });
}
function q_(_, e) {
  return typeof e == "function" ? e(_) : e;
}
function B_(_, e) {
  for (var t in e) _[t] = e[t];
  return _;
}
function b_(_, e) {
  for (var t in _) if (t !== "__source" && !(t in e)) return !0;
  for (var n in e) if (n !== "__source" && _[n] !== e[n]) return !0;
  return !1;
}
function g_(_, e) {
  this.props = _, this.context = e;
}
(g_.prototype = new P()).isPureReactComponent = !0, g_.prototype.shouldComponentUpdate = function(_, e) {
  return b_(this.props, _) || b_(this.state, e);
};
var k_ = s.__b;
s.__b = function(_) {
  _.type && _.type.__f && _.ref && (_.props.ref = _.ref, _.ref = null), k_ && k_(_);
};
var ne = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function we(_) {
  function e(t) {
    var n = B_({}, t);
    return delete n.ref, _(n, t.ref || null);
  }
  return e.$$typeof = ne, e.render = _, e.prototype.isReactComponent = e.__f = !0, e.displayName = "ForwardRef(" + (_.displayName || _.name) + ")", e;
}
var re = s.__e;
s.__e = function(_, e, t, n) {
  if (_.then) {
    for (var r, o = e; o = o.__; ) if ((r = o.__c) && r.__c) return e.__e == null && (e.__e = t.__e, e.__k = t.__k), r.__c(_, e);
  }
  re(_, e, t, n);
};
var $_ = s.unmount;
function I_(_, e, t) {
  return _ && (_.__c && _.__c.__H && (_.__c.__H.__.forEach(function(n) {
    typeof n.__c == "function" && n.__c();
  }), _.__c.__H = null), (_ = B_({}, _)).__c != null && (_.__c.__P === t && (_.__c.__P = e), _.__c.__e = !0, _.__c = null), _.__k = _.__k && _.__k.map(function(n) {
    return I_(n, e, t);
  })), _;
}
function V_(_, e, t) {
  return _ && t && (_.__v = null, _.__k = _.__k && _.__k.map(function(n) {
    return V_(n, e, t);
  }), _.__c && _.__c.__P === e && (_.__e && t.appendChild(_.__e), _.__c.__e = !0, _.__c.__P = t)), _;
}
function Z() {
  this.__u = 0, this.o = null, this.__b = null;
}
function z_(_) {
  var e = _.__.__c;
  return e && e.__a && e.__a(_);
}
function j() {
  this.i = null, this.l = null;
}
s.unmount = function(_) {
  var e = _.__c;
  e && e.__R && e.__R(), e && 32 & _.__u && (_.type = null), $_ && $_(_);
}, (Z.prototype = new P()).__c = function(_, e) {
  var t = e.__c, n = this;
  n.o == null && (n.o = []), n.o.push(t);
  var r = z_(n.__v), o = !1, l = function() {
    o || (o = !0, t.__R = null, r ? r(c) : c());
  };
  t.__R = l;
  var c = function() {
    if (!--n.__u) {
      if (n.state.__a) {
        var a = n.state.__a;
        n.__v.__k[0] = V_(a, a.__c.__P, a.__c.__O);
      }
      var u;
      for (n.setState({ __a: n.__b = null }); u = n.o.pop(); ) u.forceUpdate();
    }
  };
  n.__u++ || 32 & e.__u || n.setState({ __a: n.__b = n.__v.__k[0] }), _.then(l, l);
}, Z.prototype.componentWillUnmount = function() {
  this.o = [];
}, Z.prototype.render = function(_, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), n = this.__v.__k[0].__c;
      this.__v.__k[0] = I_(this.__b, t, n.__O = n.__P);
    }
    this.__b = null;
  }
  var r = e.__a && X(N, null, _.fallback);
  return r && (r.__u &= -33), [X(N, null, e.__a ? null : _.children), r];
};
var w_ = function(_, e, t) {
  if (++t[1] === t[0] && _.l.delete(e), _.props.revealOrder && (_.props.revealOrder[0] !== "t" || !_.l.size)) for (t = _.i; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    _.i = t = t[2];
  }
};
(j.prototype = new P()).__a = function(_) {
  var e = this, t = z_(e.__v), n = e.l.get(_);
  return n[0]++, function(r) {
    var o = function() {
      e.props.revealOrder ? (n.push(r), w_(e, _, n)) : r();
    };
    t ? t(o) : o();
  };
}, j.prototype.render = function(_) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var e = V(_.children);
  _.revealOrder && _.revealOrder[0] === "b" && e.reverse();
  for (var t = e.length; t--; ) this.l.set(e[t], this.i = [1, 0, this.i]);
  return _.children;
}, j.prototype.componentDidUpdate = j.prototype.componentDidMount = function() {
  var _ = this;
  this.l.forEach(function(e, t) {
    w_(_, t, e);
  });
};
var G_ = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, oe = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ie = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, le = /[A-Z0-9]/g, ue = typeof document < "u", ce = function(_) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(_);
};
P.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(_) {
  Object.defineProperty(P.prototype, _, { configurable: !0, get: function() {
    return this["UNSAFE_" + _];
  }, set: function(e) {
    Object.defineProperty(this, _, { configurable: !0, writable: !0, value: e });
  } });
});
var P_ = s.event;
function ae() {
}
function fe() {
  return this.cancelBubble;
}
function se() {
  return this.defaultPrevented;
}
s.event = function(_) {
  return P_ && (_ = P_(_)), _.persist = ae, _.isPropagationStopped = fe, _.isDefaultPrevented = se, _.nativeEvent = _;
};
var pe = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, x_ = s.vnode;
s.vnode = function(_) {
  typeof _.type == "string" && function(e) {
    var t = e.props, n = e.type, r = {}, o = n.indexOf("-") === -1;
    for (var l in t) {
      var c = t[l];
      if (!(l === "value" && "defaultValue" in t && c == null || ue && l === "children" && n === "noscript" || l === "class" || l === "className")) {
        var a = l.toLowerCase();
        l === "defaultValue" && "value" in t && t.value == null ? l = "value" : l === "download" && c === !0 ? c = "" : a === "translate" && c === "no" ? c = !1 : a[0] === "o" && a[1] === "n" ? a === "ondoubleclick" ? l = "ondblclick" : a !== "onchange" || n !== "input" && n !== "textarea" || ce(t.type) ? a === "onfocus" ? l = "onfocusin" : a === "onblur" ? l = "onfocusout" : ie.test(l) && (l = a) : a = l = "oninput" : o && oe.test(l) ? l = l.replace(le, "-$&").toLowerCase() : c === null && (c = void 0), a === "oninput" && r[l = a] && (l = "oninputCapture"), r[l] = c;
      }
    }
    n == "select" && r.multiple && Array.isArray(r.value) && (r.value = V(t.children).forEach(function(u) {
      u.props.selected = r.value.indexOf(u.props.value) != -1;
    })), n == "select" && r.defaultValue != null && (r.value = V(t.children).forEach(function(u) {
      u.props.selected = r.multiple ? r.defaultValue.indexOf(u.props.value) != -1 : r.defaultValue == u.props.value;
    })), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", pe)) : (t.className && !t.class || t.class && t.className) && (r.class = r.className = t.className), e.props = r;
  }(_), _.$$typeof = G_, x_ && x_(_);
};
var C_ = s.__r;
s.__r = function(_) {
  C_ && C_(_), _.__c;
};
var S_ = s.diffed;
s.diffed = function(_) {
  S_ && S_(_);
  var e = _.props, t = _.__e;
  t != null && _.type === "textarea" && "value" in e && e.value !== t.value && (t.value = e.value == null ? "" : e.value);
};
function Pe(_) {
  return !!_ && _.$$typeof === G_;
}
var xe = function(_, e) {
  return _(e);
}, he = 0;
function Ce(_, e, t, n, r, o) {
  e || (e = {});
  var l, c, a = e;
  if ("ref" in a) for (c in a = {}, e) c == "ref" ? l = e[c] : a[c] = e[c];
  var u = { type: _, props: a, key: t, ref: l, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --he, __i: -1, __u: 0, __source: r, __self: o };
  if (typeof _ == "function" && (l = _.defaultProps)) for (c in l) a[c] === void 0 && (a[c] = l[c]);
  return s.vnode && s.vnode(u), u;
}
export {
  be as A,
  we as D,
  xe as E,
  ge as F,
  de as G,
  ve as Q,
  j_ as T,
  _e as _,
  X as a,
  me as d,
  N as k,
  Pe as m,
  ke as q,
  Ce as u,
  $e as x,
  ye as y
};
