var bt, w, Rr, Le, ar, Dr, Ar, Tr, Ht, $t, Mt, Hr, ot = {}, Fr = [], bn = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, lt = Array.isArray;
function ge(e, t) {
  for (var r in t) e[r] = t[r];
  return e;
}
function Ft(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function D(e, t, r) {
  var n, o, a, i = {};
  for (a in t) a == "key" ? n = t[a] : a == "ref" ? o = t[a] : i[a] = t[a];
  if (arguments.length > 2 && (i.children = arguments.length > 3 ? bt.call(arguments, 2) : r), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) i[a] === void 0 && (i[a] = e.defaultProps[a]);
  return ht(e, i, n, o, null);
}
function ht(e, t, r, n, o) {
  var a = { type: e, props: t, key: r, ref: n, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: o ?? ++Rr, __i: -1, __u: 0 };
  return o == null && w.vnode != null && w.vnode(a), a;
}
function Ce(e) {
  return e.children;
}
function ye(e, t) {
  this.props = e, this.context = t;
}
function et(e, t) {
  if (t == null) return e.__ ? et(e.__, e.__i + 1) : null;
  for (var r; t < e.__k.length; t++) if ((r = e.__k[t]) != null && r.__e != null) return r.__e;
  return typeof e.type == "function" ? et(e) : null;
}
function Lr(e) {
  var t, r;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((r = e.__k[t]) != null && r.__e != null) {
      e.__e = e.__c.base = r.__e;
      break;
    }
    return Lr(e);
  }
}
function Pt(e) {
  (!e.__d && (e.__d = !0) && Le.push(e) && !gt.__r++ || ar != w.debounceRendering) && ((ar = w.debounceRendering) || Dr)(gt);
}
function gt() {
  for (var e, t, r, n, o, a, i, u = 1; Le.length; ) Le.length > u && Le.sort(Ar), e = Le.shift(), u = Le.length, e.__d && (r = void 0, o = (n = (t = e).__v).__e, a = [], i = [], t.__P && ((r = ge({}, n)).__v = n.__v + 1, w.vnode && w.vnode(r), Lt(t.__P, r, n, t.__n, t.__P.namespaceURI, 32 & n.__u ? [o] : null, a, o ?? et(n), !!(32 & n.__u), i), r.__v = n.__v, r.__.__k[r.__i] = r, Ir(a, r, i), r.__e != o && Lr(r)));
  gt.__r = 0;
}
function Ur(e, t, r, n, o, a, i, u, s, c, h) {
  var l, p, f, y, g, v, m, _ = n && n.__k || Fr, d = t.length;
  for (s = Cn(r, t, _, s, d), l = 0; l < d; l++) (f = r.__k[l]) != null && (p = f.__i == -1 ? ot : _[f.__i] || ot, f.__i = l, v = Lt(e, f, p, o, a, i, u, s, c, h), y = f.__e, f.ref && p.ref != f.ref && (p.ref && Ut(p.ref, null, f), h.push(f.ref, f.__c || y, f)), g == null && y != null && (g = y), (m = !!(4 & f.__u)) || p.__k === f.__k ? s = jr(f, s, e, m) : typeof f.type == "function" && v !== void 0 ? s = v : y && (s = y.nextSibling), f.__u &= -7);
  return r.__e = g, s;
}
function Cn(e, t, r, n, o) {
  var a, i, u, s, c, h = r.length, l = h, p = 0;
  for (e.__k = new Array(o), a = 0; a < o; a++) (i = t[a]) != null && typeof i != "boolean" && typeof i != "function" ? (s = a + p, (i = e.__k[a] = typeof i == "string" || typeof i == "number" || typeof i == "bigint" || i.constructor == String ? ht(null, i, null, null, null) : lt(i) ? ht(Ce, { children: i }, null, null, null) : i.constructor == null && i.__b > 0 ? ht(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i).__ = e, i.__b = e.__b + 1, u = null, (c = i.__i = kn(i, r, s, l)) != -1 && (l--, (u = r[c]) && (u.__u |= 2)), u == null || u.__v == null ? (c == -1 && (o > h ? p-- : o < h && p++), typeof i.type != "function" && (i.__u |= 4)) : c != s && (c == s - 1 ? p-- : c == s + 1 ? p++ : (c > s ? p-- : p++, i.__u |= 4))) : e.__k[a] = null;
  if (l) for (a = 0; a < h; a++) (u = r[a]) != null && (2 & u.__u) == 0 && (u.__e == n && (n = et(u)), zr(u, u));
  return n;
}
function jr(e, t, r, n) {
  var o, a;
  if (typeof e.type == "function") {
    for (o = e.__k, a = 0; o && a < o.length; a++) o[a] && (o[a].__ = e, t = jr(o[a], t, r, n));
    return t;
  }
  e.__e != t && (n && (t && e.type && !t.parentNode && (t = et(e)), r.insertBefore(e.__e, t || null)), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType == 8);
  return t;
}
function yt(e, t) {
  return t = t || [], e == null || typeof e == "boolean" || (lt(e) ? e.some(function(r) {
    yt(r, t);
  }) : t.push(e)), t;
}
function kn(e, t, r, n) {
  var o, a, i, u = e.key, s = e.type, c = t[r], h = c != null && (2 & c.__u) == 0;
  if (c === null && e.key == null || h && u == c.key && s == c.type) return r;
  if (n > (h ? 1 : 0)) {
    for (o = r - 1, a = r + 1; o >= 0 || a < t.length; ) if ((c = t[i = o >= 0 ? o-- : a++]) != null && (2 & c.__u) == 0 && u == c.key && s == c.type) return i;
  }
  return -1;
}
function or(e, t, r) {
  t[0] == "-" ? e.setProperty(t, r ?? "") : e[t] = r == null ? "" : typeof r != "number" || bn.test(t) ? r : r + "px";
}
function dt(e, t, r, n, o) {
  var a, i;
  e: if (t == "style") if (typeof r == "string") e.style.cssText = r;
  else {
    if (typeof n == "string" && (e.style.cssText = n = ""), n) for (t in n) r && t in r || or(e.style, t, "");
    if (r) for (t in r) n && r[t] == n[t] || or(e.style, t, r[t]);
  }
  else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(Tr, "$1")), i = t.toLowerCase(), t = i in e || t == "onFocusOut" || t == "onFocusIn" ? i.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = r, r ? n ? r.u = n.u : (r.u = Ht, e.addEventListener(t, a ? Mt : $t, a)) : e.removeEventListener(t, a ? Mt : $t, a);
  else {
    if (o == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = r ?? "";
      break e;
    } catch {
    }
    typeof r == "function" || (r == null || r === !1 && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && r == 1 ? "" : r));
  }
}
function ir(e) {
  return function(t) {
    if (this.l) {
      var r = this.l[t.type + e];
      if (t.t == null) t.t = Ht++;
      else if (t.t < r.u) return;
      return r(w.event ? w.event(t) : t);
    }
  };
}
function Lt(e, t, r, n, o, a, i, u, s, c) {
  var h, l, p, f, y, g, v, m, _, d, C, E, O, I, L, $, x, S = t.type;
  if (t.constructor != null) return null;
  128 & r.__u && (s = !!(32 & r.__u), a = [u = t.__e = r.__e]), (h = w.__b) && h(t);
  e: if (typeof S == "function") try {
    if (m = t.props, _ = "prototype" in S && S.prototype.render, d = (h = S.contextType) && n[h.__c], C = h ? d ? d.props.value : h.__ : n, r.__c ? v = (l = t.__c = r.__c).__ = l.__E : (_ ? t.__c = l = new S(m, C) : (t.__c = l = new ye(m, C), l.constructor = S, l.render = wn), d && d.sub(l), l.props = m, l.state || (l.state = {}), l.context = C, l.__n = n, p = l.__d = !0, l.__h = [], l._sb = []), _ && l.__s == null && (l.__s = l.state), _ && S.getDerivedStateFromProps != null && (l.__s == l.state && (l.__s = ge({}, l.__s)), ge(l.__s, S.getDerivedStateFromProps(m, l.__s))), f = l.props, y = l.state, l.__v = t, p) _ && S.getDerivedStateFromProps == null && l.componentWillMount != null && l.componentWillMount(), _ && l.componentDidMount != null && l.__h.push(l.componentDidMount);
    else {
      if (_ && S.getDerivedStateFromProps == null && m !== f && l.componentWillReceiveProps != null && l.componentWillReceiveProps(m, C), !l.__e && l.shouldComponentUpdate != null && l.shouldComponentUpdate(m, l.__s, C) === !1 || t.__v == r.__v) {
        for (t.__v != r.__v && (l.props = m, l.state = l.__s, l.__d = !1), t.__e = r.__e, t.__k = r.__k, t.__k.some(function(N) {
          N && (N.__ = t);
        }), E = 0; E < l._sb.length; E++) l.__h.push(l._sb[E]);
        l._sb = [], l.__h.length && i.push(l);
        break e;
      }
      l.componentWillUpdate != null && l.componentWillUpdate(m, l.__s, C), _ && l.componentDidUpdate != null && l.__h.push(function() {
        l.componentDidUpdate(f, y, g);
      });
    }
    if (l.context = C, l.props = m, l.__P = e, l.__e = !1, O = w.__r, I = 0, _) {
      for (l.state = l.__s, l.__d = !1, O && O(t), h = l.render(l.props, l.state, l.context), L = 0; L < l._sb.length; L++) l.__h.push(l._sb[L]);
      l._sb = [];
    } else do
      l.__d = !1, O && O(t), h = l.render(l.props, l.state, l.context), l.state = l.__s;
    while (l.__d && ++I < 25);
    l.state = l.__s, l.getChildContext != null && (n = ge(ge({}, n), l.getChildContext())), _ && !p && l.getSnapshotBeforeUpdate != null && (g = l.getSnapshotBeforeUpdate(f, y)), $ = h, h != null && h.type === Ce && h.key == null && ($ = Wr(h.props.children)), u = Ur(e, lt($) ? $ : [$], t, r, n, o, a, i, u, s, c), l.base = t.__e, t.__u &= -161, l.__h.length && i.push(l), v && (l.__E = l.__ = null);
  } catch (N) {
    if (t.__v = null, s || a != null) if (N.then) {
      for (t.__u |= s ? 160 : 128; u && u.nodeType == 8 && u.nextSibling; ) u = u.nextSibling;
      a[a.indexOf(u)] = null, t.__e = u;
    } else {
      for (x = a.length; x--; ) Ft(a[x]);
      Ot(t);
    }
    else t.__e = r.__e, t.__k = r.__k, N.then || Ot(t);
    w.__e(N, t, r);
  }
  else a == null && t.__v == r.__v ? (t.__k = r.__k, t.__e = r.__e) : u = t.__e = Sn(r.__e, t, r, n, o, a, i, s, c);
  return (h = w.diffed) && h(t), 128 & t.__u ? void 0 : u;
}
function Ot(e) {
  e && e.__c && (e.__c.__e = !0), e && e.__k && e.__k.forEach(Ot);
}
function Ir(e, t, r) {
  for (var n = 0; n < r.length; n++) Ut(r[n], r[++n], r[++n]);
  w.__c && w.__c(t, e), e.some(function(o) {
    try {
      e = o.__h, o.__h = [], e.some(function(a) {
        a.call(o);
      });
    } catch (a) {
      w.__e(a, o.__v);
    }
  });
}
function Wr(e) {
  return typeof e != "object" || e == null || e.__b && e.__b > 0 ? e : lt(e) ? e.map(Wr) : ge({}, e);
}
function Sn(e, t, r, n, o, a, i, u, s) {
  var c, h, l, p, f, y, g, v = r.props, m = t.props, _ = t.type;
  if (_ == "svg" ? o = "http://www.w3.org/2000/svg" : _ == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), a != null) {
    for (c = 0; c < a.length; c++) if ((f = a[c]) && "setAttribute" in f == !!_ && (_ ? f.localName == _ : f.nodeType == 3)) {
      e = f, a[c] = null;
      break;
    }
  }
  if (e == null) {
    if (_ == null) return document.createTextNode(m);
    e = document.createElementNS(o, _, m.is && m), u && (w.__m && w.__m(t, a), u = !1), a = null;
  }
  if (_ == null) v === m || u && e.data == m || (e.data = m);
  else {
    if (a = a && bt.call(e.childNodes), v = r.props || ot, !u && a != null) for (v = {}, c = 0; c < e.attributes.length; c++) v[(f = e.attributes[c]).name] = f.value;
    for (c in v) if (f = v[c], c != "children") {
      if (c == "dangerouslySetInnerHTML") l = f;
      else if (!(c in m)) {
        if (c == "value" && "defaultValue" in m || c == "checked" && "defaultChecked" in m) continue;
        dt(e, c, null, f, o);
      }
    }
    for (c in m) f = m[c], c == "children" ? p = f : c == "dangerouslySetInnerHTML" ? h = f : c == "value" ? y = f : c == "checked" ? g = f : u && typeof f != "function" || v[c] === f || dt(e, c, f, v[c], o);
    if (h) u || l && (h.__html == l.__html || h.__html == e.innerHTML) || (e.innerHTML = h.__html), t.__k = [];
    else if (l && (e.innerHTML = ""), Ur(t.type == "template" ? e.content : e, lt(p) ? p : [p], t, r, n, _ == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, a, i, a ? a[0] : r.__k && et(r, 0), u, s), a != null) for (c = a.length; c--; ) Ft(a[c]);
    u || (c = "value", _ == "progress" && y == null ? e.removeAttribute("value") : y != null && (y !== e[c] || _ == "progress" && !y || _ == "option" && y != v[c]) && dt(e, c, y, v[c], o), c = "checked", g != null && g != e[c] && dt(e, c, g, v[c], o));
  }
  return e;
}
function Ut(e, t, r) {
  try {
    if (typeof e == "function") {
      var n = typeof e.__u == "function";
      n && e.__u(), n && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (o) {
    w.__e(o, r);
  }
}
function zr(e, t, r) {
  var n, o;
  if (w.unmount && w.unmount(e), (n = e.ref) && (n.current && n.current != e.__e || Ut(n, null, t)), (n = e.__c) != null) {
    if (n.componentWillUnmount) try {
      n.componentWillUnmount();
    } catch (a) {
      w.__e(a, t);
    }
    n.base = n.__P = null;
  }
  if (n = e.__k) for (o = 0; o < n.length; o++) n[o] && zr(n[o], t, r || typeof e.type != "function");
  r || Ft(e.__e), e.__c = e.__ = e.__e = void 0;
}
function wn(e, t, r) {
  return this.constructor(e, r);
}
function En(e, t, r) {
  var n, o, a, i;
  t == document && (t = document.documentElement), w.__ && w.__(e, t), o = (n = !1) ? null : t.__k, a = [], i = [], Lt(t, e = t.__k = D(Ce, null, [e]), o || ot, ot, t.namespaceURI, o ? null : t.firstChild ? bt.call(t.childNodes) : null, a, o ? o.__e : t.firstChild, n, i), Ir(a, e, i);
}
function Br(e) {
  function t(r) {
    var n, o;
    return this.getChildContext || (n = /* @__PURE__ */ new Set(), (o = {})[t.__c] = this, this.getChildContext = function() {
      return o;
    }, this.componentWillUnmount = function() {
      n = null;
    }, this.shouldComponentUpdate = function(a) {
      this.props.value != a.value && n.forEach(function(i) {
        i.__e = !0, Pt(i);
      });
    }, this.sub = function(a) {
      n.add(a);
      var i = a.componentWillUnmount;
      a.componentWillUnmount = function() {
        n && n.delete(a), i && i.call(a);
      };
    }), r.children;
  }
  return t.__c = "__cC" + Hr++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(r, n) {
    return r.children(n);
  }).contextType = t, t;
}
bt = Fr.slice, w = { __e: function(e, t, r, n) {
  for (var o, a, i; t = t.__; ) if ((o = t.__c) && !o.__) try {
    if ((a = o.constructor) && a.getDerivedStateFromError != null && (o.setState(a.getDerivedStateFromError(e)), i = o.__d), o.componentDidCatch != null && (o.componentDidCatch(e, n || {}), i = o.__d), i) return o.__E = o;
  } catch (u) {
    e = u;
  }
  throw e;
} }, Rr = 0, ye.prototype.setState = function(e, t) {
  var r;
  r = this.__s != null && this.__s != this.state ? this.__s : this.__s = ge({}, this.state), typeof e == "function" && (e = e(ge({}, r), this.props)), e && ge(r, e), e != null && this.__v && (t && this._sb.push(t), Pt(this));
}, ye.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Pt(this));
}, ye.prototype.render = Ce, Le = [], Dr = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Ar = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, gt.__r = 0, Tr = /(PointerCapture)$|Capture$/i, Ht = 0, $t = ir(!1), Mt = ir(!0), Hr = 0;
var Ie, A, St, lr, tt = 0, qr = [], F = w, ur = F.__b, cr = F.__r, sr = F.diffed, _r = F.__c, fr = F.unmount, dr = F.__;
function ut(e, t) {
  F.__h && F.__h(A, e, tt || t), tt = 0;
  var r = A.__H || (A.__H = { __: [], __h: [] });
  return e >= r.__.length && r.__.push({}), r.__[e];
}
function X(e) {
  return tt = 1, Nn(Kr, e);
}
function Nn(e, t, r) {
  var n = ut(Ie++, 2);
  if (n.t = e, !n.__c && (n.__ = [r ? r(t) : Kr(void 0, t), function(u) {
    var s = n.__N ? n.__N[0] : n.__[0], c = n.t(s, u);
    s !== c && (n.__N = [c, n.__[1]], n.__c.setState({}));
  }], n.__c = A, !A.__f)) {
    var o = function(u, s, c) {
      if (!n.__c.__H) return !0;
      var h = n.__c.__H.__.filter(function(p) {
        return !!p.__c;
      });
      if (h.every(function(p) {
        return !p.__N;
      })) return !a || a.call(this, u, s, c);
      var l = n.__c.props !== u;
      return h.forEach(function(p) {
        if (p.__N) {
          var f = p.__[0];
          p.__ = p.__N, p.__N = void 0, f !== p.__[0] && (l = !0);
        }
      }), a && a.call(this, u, s, c) || l;
    };
    A.__f = !0;
    var a = A.shouldComponentUpdate, i = A.componentWillUpdate;
    A.componentWillUpdate = function(u, s, c) {
      if (this.__e) {
        var h = a;
        a = void 0, o(u, s, c), a = h;
      }
      i && i.call(this, u, s, c);
    }, A.shouldComponentUpdate = o;
  }
  return n.__N || n.__;
}
function je(e, t) {
  var r = ut(Ie++, 3);
  !F.__s && jt(r.__H, t) && (r.__ = e, r.u = t, A.__H.__h.push(r));
}
function Vr(e, t) {
  var r = ut(Ie++, 4);
  !F.__s && jt(r.__H, t) && (r.__ = e, r.u = t, A.__h.push(r));
}
function be(e) {
  return tt = 5, G(function() {
    return { current: e };
  }, []);
}
function Gr(e, t, r) {
  tt = 6, Vr(function() {
    if (typeof e == "function") {
      var n = e(t());
      return function() {
        e(null), n && typeof n == "function" && n();
      };
    }
    if (e) return e.current = t(), function() {
      return e.current = null;
    };
  }, r == null ? r : r.concat(e));
}
function G(e, t) {
  var r = ut(Ie++, 7);
  return jt(r.__H, t) && (r.__ = e(), r.__H = t, r.__h = e), r.__;
}
function mt(e, t) {
  return tt = 8, G(function() {
    return e;
  }, t);
}
function ze(e) {
  var t = A.context[e.__c], r = ut(Ie++, 9);
  return r.c = e, t ? (r.__ == null && (r.__ = !0, t.sub(A)), t.props.value) : e.__;
}
function xn() {
  for (var e; e = qr.shift(); ) if (e.__P && e.__H) try {
    e.__H.__h.forEach(pt), e.__H.__h.forEach(Rt), e.__H.__h = [];
  } catch (t) {
    e.__H.__h = [], F.__e(t, e.__v);
  }
}
F.__b = function(e) {
  A = null, ur && ur(e);
}, F.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), dr && dr(e, t);
}, F.__r = function(e) {
  cr && cr(e), Ie = 0;
  var t = (A = e.__c).__H;
  t && (St === A ? (t.__h = [], A.__h = [], t.__.forEach(function(r) {
    r.__N && (r.__ = r.__N), r.u = r.__N = void 0;
  })) : (t.__h.forEach(pt), t.__h.forEach(Rt), t.__h = [], Ie = 0)), St = A;
}, F.diffed = function(e) {
  sr && sr(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && (qr.push(t) !== 1 && lr === F.requestAnimationFrame || ((lr = F.requestAnimationFrame) || $n)(xn)), t.__H.__.forEach(function(r) {
    r.u && (r.__H = r.u), r.u = void 0;
  })), St = A = null;
}, F.__c = function(e, t) {
  t.some(function(r) {
    try {
      r.__h.forEach(pt), r.__h = r.__h.filter(function(n) {
        return !n.__ || Rt(n);
      });
    } catch (n) {
      t.some(function(o) {
        o.__h && (o.__h = []);
      }), t = [], F.__e(n, r.__v);
    }
  }), _r && _r(e, t);
}, F.unmount = function(e) {
  fr && fr(e);
  var t, r = e.__c;
  r && r.__H && (r.__H.__.forEach(function(n) {
    try {
      pt(n);
    } catch (o) {
      t = o;
    }
  }), r.__H = void 0, t && F.__e(t, r.__v));
};
var vr = typeof requestAnimationFrame == "function";
function $n(e) {
  var t, r = function() {
    clearTimeout(n), vr && cancelAnimationFrame(t), setTimeout(e);
  }, n = setTimeout(r, 35);
  vr && (t = requestAnimationFrame(r));
}
function pt(e) {
  var t = A, r = e.__c;
  typeof r == "function" && (e.__c = void 0, r()), A = t;
}
function Rt(e) {
  var t = A;
  e.__c = e.__(), A = t;
}
function jt(e, t) {
  return !e || e.length !== t.length || t.some(function(r, n) {
    return r !== e[n];
  });
}
function Kr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Xr(e, t) {
  for (var r in t) e[r] = t[r];
  return e;
}
function hr(e, t) {
  for (var r in e) if (r !== "__source" && !(r in t)) return !0;
  for (var n in t) if (n !== "__source" && e[n] !== t[n]) return !0;
  return !1;
}
function mr(e, t) {
  this.props = e, this.context = t;
}
(mr.prototype = new ye()).isPureReactComponent = !0, mr.prototype.shouldComponentUpdate = function(e, t) {
  return hr(this.props, e) || hr(this.state, t);
};
var pr = w.__b;
w.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), pr && pr(e);
};
var Mn = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function It(e) {
  function t(r) {
    var n = Xr({}, r);
    return delete n.ref, e(n, r.ref || null);
  }
  return t.$$typeof = Mn, t.render = e, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var Pn = w.__e;
w.__e = function(e, t, r, n) {
  if (e.then) {
    for (var o, a = t; a = a.__; ) if ((o = a.__c) && o.__c) return t.__e == null && (t.__e = r.__e, t.__k = r.__k), o.__c(e, t);
  }
  Pn(e, t, r, n);
};
var gr = w.unmount;
function Yr(e, t, r) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(n) {
    typeof n.__c == "function" && n.__c();
  }), e.__c.__H = null), (e = Xr({}, e)).__c != null && (e.__c.__P === r && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(n) {
    return Yr(n, t, r);
  })), e;
}
function Jr(e, t, r) {
  return e && r && (e.__v = null, e.__k = e.__k && e.__k.map(function(n) {
    return Jr(n, t, r);
  }), e.__c && e.__c.__P === t && (e.__e && r.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = r)), e;
}
function wt() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Qr(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function vt() {
  this.i = null, this.l = null;
}
w.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), gr && gr(e);
}, (wt.prototype = new ye()).__c = function(e, t) {
  var r = t.__c, n = this;
  n.o == null && (n.o = []), n.o.push(r);
  var o = Qr(n.__v), a = !1, i = function() {
    a || (a = !0, r.__R = null, o ? o(u) : u());
  };
  r.__R = i;
  var u = function() {
    if (!--n.__u) {
      if (n.state.__a) {
        var s = n.state.__a;
        n.__v.__k[0] = Jr(s, s.__c.__P, s.__c.__O);
      }
      var c;
      for (n.setState({ __a: n.__b = null }); c = n.o.pop(); ) c.forceUpdate();
    }
  };
  n.__u++ || 32 & t.__u || n.setState({ __a: n.__b = n.__v.__k[0] }), e.then(i, i);
}, wt.prototype.componentWillUnmount = function() {
  this.o = [];
}, wt.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var r = document.createElement("div"), n = this.__v.__k[0].__c;
      this.__v.__k[0] = Yr(this.__b, r, n.__O = n.__P);
    }
    this.__b = null;
  }
  var o = t.__a && D(Ce, null, e.fallback);
  return o && (o.__u &= -33), [D(Ce, null, t.__a ? null : e.children), o];
};
var yr = function(e, t, r) {
  if (++r[1] === r[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (r = e.i; r; ) {
    for (; r.length > 3; ) r.pop()();
    if (r[1] < r[0]) break;
    e.i = r = r[2];
  }
};
(vt.prototype = new ye()).__a = function(e) {
  var t = this, r = Qr(t.__v), n = t.l.get(e);
  return n[0]++, function(o) {
    var a = function() {
      t.props.revealOrder ? (n.push(o), yr(t, e, n)) : o();
    };
    r ? r(a) : a();
  };
}, vt.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = yt(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var r = t.length; r--; ) this.l.set(t[r], this.i = [1, 0, this.i]);
  return e.children;
}, vt.prototype.componentDidUpdate = vt.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, r) {
    yr(e, r, t);
  });
};
var Zr = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, On = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Rn = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Dn = /[A-Z0-9]/g, An = typeof document < "u", Tn = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
ye.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(ye.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var br = w.event;
function Hn() {
}
function Fn() {
  return this.cancelBubble;
}
function Ln() {
  return this.defaultPrevented;
}
w.event = function(e) {
  return br && (e = br(e)), e.persist = Hn, e.isPropagationStopped = Fn, e.isDefaultPrevented = Ln, e.nativeEvent = e;
};
var Un = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, Cr = w.vnode;
w.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var r = t.props, n = t.type, o = {}, a = n.indexOf("-") === -1;
    for (var i in r) {
      var u = r[i];
      if (!(i === "value" && "defaultValue" in r && u == null || An && i === "children" && n === "noscript" || i === "class" || i === "className")) {
        var s = i.toLowerCase();
        i === "defaultValue" && "value" in r && r.value == null ? i = "value" : i === "download" && u === !0 ? u = "" : s === "translate" && u === "no" ? u = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? i = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || Tn(r.type) ? s === "onfocus" ? i = "onfocusin" : s === "onblur" ? i = "onfocusout" : Rn.test(i) && (i = s) : s = i = "oninput" : a && On.test(i) ? i = i.replace(Dn, "-$&").toLowerCase() : u === null && (u = void 0), s === "oninput" && o[i = s] && (i = "oninputCapture"), o[i] = u;
      }
    }
    n == "select" && o.multiple && Array.isArray(o.value) && (o.value = yt(r.children).forEach(function(c) {
      c.props.selected = o.value.indexOf(c.props.value) != -1;
    })), n == "select" && o.defaultValue != null && (o.value = yt(r.children).forEach(function(c) {
      c.props.selected = o.multiple ? o.defaultValue.indexOf(c.props.value) != -1 : o.defaultValue == c.props.value;
    })), r.class && !r.className ? (o.class = r.class, Object.defineProperty(o, "className", Un)) : (r.className && !r.class || r.class && r.className) && (o.class = o.className = r.className), t.props = o;
  }(e), e.$$typeof = Zr, Cr && Cr(e);
};
var kr = w.__r;
w.__r = function(e) {
  kr && kr(e), e.__c;
};
var Sr = w.diffed;
w.diffed = function(e) {
  Sr && Sr(e);
  var t = e.props, r = e.__e;
  r != null && e.type === "textarea" && "value" in t && t.value !== r.value && (r.value = t.value == null ? "" : t.value);
};
function jn(e) {
  return !!e && e.$$typeof === Zr;
}
var In = function(e, t) {
  return e(t);
}, Wn = 0;
function b(e, t, r, n, o, a) {
  t || (t = {});
  var i, u, s = t;
  if ("ref" in s) for (u in s = {}, t) u == "ref" ? i = t[u] : s[u] = t[u];
  var c = { type: e, props: s, key: r, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --Wn, __i: -1, __u: 0, __source: o, __self: a };
  if (typeof e == "function" && (i = e.defaultProps)) for (u in i) s[u] === void 0 && (s[u] = i[u]);
  return w.vnode && w.vnode(c), c;
}
function Oe(e) {
  "@babel/helpers - typeof";
  return Oe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Oe(e);
}
function zn(e, t) {
  if (Oe(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Oe(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Bn(e) {
  var t = zn(e, "string");
  return Oe(t) == "symbol" ? t : t + "";
}
function oe(e, t, r) {
  return (t = Bn(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function wr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Y(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wr(Object(r), !0).forEach(function(n) {
      oe(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wr(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Dt(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function qn(e) {
  if (Array.isArray(e)) return Dt(e);
}
function Vn(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function en(e, t) {
  if (e) {
    if (typeof e == "string") return Dt(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Dt(e, t) : void 0;
  }
}
function Gn() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function pe(e) {
  return qn(e) || Vn(e) || en(e) || Gn();
}
function Kn(e) {
  if (Array.isArray(e)) return e;
}
function Xn(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, o, a, i, u = [], s = !0, c = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (h) {
      c = !0, o = h;
    } finally {
      try {
        if (!s && r.return != null && (i = r.return(), Object(i) !== i)) return;
      } finally {
        if (c) throw o;
      }
    }
    return u;
  }
}
function Yn() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function K(e, t) {
  return Kn(e) || Xn(e, t) || en(e, t) || Yn();
}
function Jn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Et = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var Er;
function Qn() {
  return Er || (Er = 1, function(e) {
    (function() {
      var t = {}.hasOwnProperty;
      function r() {
        for (var a = "", i = 0; i < arguments.length; i++) {
          var u = arguments[i];
          u && (a = o(a, n(u)));
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
        var i = "";
        for (var u in a)
          t.call(a, u) && a[u] && (i = o(i, u));
        return i;
      }
      function o(a, i) {
        return i ? a ? a + " " + i : a + i : a;
      }
      e.exports ? (r.default = r, e.exports = r) : window.classNames = r;
    })();
  }(Et)), Et.exports;
}
var Zn = Qn();
const We = /* @__PURE__ */ Jn(Zn);
function Ze(e) {
  var t = be();
  t.current = e;
  var r = mt(function() {
    for (var n, o = arguments.length, a = new Array(o), i = 0; i < o; i++)
      a[i] = arguments[i];
    return (n = t.current) === null || n === void 0 ? void 0 : n.call.apply(n, [t].concat(a));
  }, []);
  return r;
}
function ea() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var Nr = ea() ? Vr : je, tn = function(t, r) {
  var n = be(!0);
  Nr(function() {
    return t(n.current);
  }, r), Nr(function() {
    return n.current = !1, function() {
      n.current = !0;
    };
  }, []);
}, xr = function(t, r) {
  tn(function(n) {
    if (!n)
      return t();
  }, r);
};
function $r(e) {
  var t = be(!1), r = X(e), n = K(r, 2), o = n[0], a = n[1];
  je(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function i(u, s) {
    s && t.current || a(u);
  }
  return [o, i];
}
function Nt(e) {
  return e !== void 0;
}
function ta(e, t) {
  var r = t || {}, n = r.defaultValue, o = r.value, a = r.onChange, i = r.postState, u = $r(function() {
    return Nt(o) ? o : Nt(n) ? typeof n == "function" ? n() : n : typeof e == "function" ? e() : e;
  }), s = K(u, 2), c = s[0], h = s[1], l = o !== void 0 ? o : c, p = i ? i(l) : l, f = Ze(a), y = $r([l]), g = K(y, 2), v = g[0], m = g[1];
  xr(function() {
    var d = v[0];
    c !== d && f(c, d);
  }, [v]), xr(function() {
    Nt(o) || h(o);
  }, [o]);
  var _ = Ze(function(d, C) {
    h(d, C), m([l], C);
  });
  return [p, _];
}
var At = {}, ra = function(t) {
};
function na(e, t) {
}
function aa(e, t) {
}
function oa() {
  At = {};
}
function rn(e, t, r) {
  !t && !At[r] && (e(!1, r), At[r] = !0);
}
function rt(e, t) {
  rn(na, e, t);
}
function ia(e, t) {
  rn(aa, e, t);
}
rt.preMessage = ra;
rt.resetWarned = oa;
rt.noteOnce = ia;
function la(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = /* @__PURE__ */ new Set();
  function o(a, i) {
    var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, s = n.has(a);
    if (rt(!s, "Warning: There may be circular references"), s)
      return !1;
    if (a === i)
      return !0;
    if (r && u > 1)
      return !1;
    n.add(a);
    var c = u + 1;
    if (Array.isArray(a)) {
      if (!Array.isArray(i) || a.length !== i.length)
        return !1;
      for (var h = 0; h < a.length; h++)
        if (!o(a[h], i[h], c))
          return !1;
      return !0;
    }
    if (a && i && Oe(a) === "object" && Oe(i) === "object") {
      var l = Object.keys(a);
      return l.length !== Object.keys(i).length ? !1 : l.every(function(p) {
        return o(a[p], i[p], c);
      });
    }
    return !1;
  }
  return o(e, t);
}
function it() {
  return it = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, it.apply(null, arguments);
}
function ua(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function nn(e, t) {
  if (e == null) return {};
  var r, n, o = ua(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
  }
  return o;
}
function Tt(e, t, r) {
  return (e - t) / (r - t);
}
function Wt(e, t, r, n) {
  var o = Tt(t, r, n), a = {};
  switch (e) {
    case "rtl":
      a.right = "".concat(o * 100, "%"), a.transform = "translateX(50%)";
      break;
    case "btt":
      a.bottom = "".concat(o * 100, "%"), a.transform = "translateY(50%)";
      break;
    case "ttb":
      a.top = "".concat(o * 100, "%"), a.transform = "translateY(-50%)";
      break;
    default:
      a.left = "".concat(o * 100, "%"), a.transform = "translateX(-50%)";
      break;
  }
  return a;
}
function Ue(e, t) {
  return Array.isArray(e) ? e[t] : e;
}
var q = {
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
}, Be = /* @__PURE__ */ Br({
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
}), ca = /* @__PURE__ */ Br({}), sa = ["prefixCls", "value", "valueIndex", "onStartMove", "onDelete", "style", "render", "dragging", "draggingDelete", "onOffsetChange", "onChangeComplete", "onFocus", "onMouseEnter"], Mr = /* @__PURE__ */ It(function(e, t) {
  var r = e.prefixCls, n = e.value, o = e.valueIndex, a = e.onStartMove, i = e.onDelete, u = e.style, s = e.render, c = e.dragging, h = e.draggingDelete, l = e.onOffsetChange, p = e.onChangeComplete, f = e.onFocus, y = e.onMouseEnter, g = nn(e, sa), v = ze(Be), m = v.min, _ = v.max, d = v.direction, C = v.disabled, E = v.keyboard, O = v.range, I = v.tabIndex, L = v.ariaLabelForHandle, $ = v.ariaLabelledByForHandle, x = v.ariaRequired, S = v.ariaValueTextFormatterForHandle, N = v.styles, W = v.classNames, J = "".concat(r, "-handle"), V = function(T) {
    C || a(T, o);
  }, te = function(T) {
    f?.(T, o);
  }, U = function(T) {
    y(T, o);
  }, ke = function(T) {
    if (!C && E) {
      var P = null;
      switch (T.which || T.keyCode) {
        case q.LEFT:
          P = d === "ltr" || d === "btt" ? -1 : 1;
          break;
        case q.RIGHT:
          P = d === "ltr" || d === "btt" ? 1 : -1;
          break;
        // Up is plus
        case q.UP:
          P = d !== "ttb" ? 1 : -1;
          break;
        // Down is minus
        case q.DOWN:
          P = d !== "ttb" ? -1 : 1;
          break;
        case q.HOME:
          P = "min";
          break;
        case q.END:
          P = "max";
          break;
        case q.PAGE_UP:
          P = 2;
          break;
        case q.PAGE_DOWN:
          P = -2;
          break;
        case q.BACKSPACE:
        case q.DELETE:
          i(o);
          break;
      }
      P !== null && (T.preventDefault(), l(P, o));
    }
  }, ce = function(T) {
    switch (T.which || T.keyCode) {
      case q.LEFT:
      case q.RIGHT:
      case q.UP:
      case q.DOWN:
      case q.HOME:
      case q.END:
      case q.PAGE_UP:
      case q.PAGE_DOWN:
        p?.();
        break;
    }
  }, Re = Wt(d, n, m, _), Se = {};
  if (o !== null) {
    var De;
    Se = {
      tabIndex: C ? null : Ue(I, o),
      role: "slider",
      "aria-valuemin": m,
      "aria-valuemax": _,
      "aria-valuenow": n,
      "aria-disabled": C,
      "aria-label": Ue(L, o),
      "aria-labelledby": Ue($, o),
      "aria-required": Ue(x, o),
      "aria-valuetext": (De = Ue(S, o)) === null || De === void 0 ? void 0 : De(n),
      "aria-orientation": d === "ltr" || d === "rtl" ? "horizontal" : "vertical",
      onMouseDown: V,
      onTouchStart: V,
      onFocus: te,
      onMouseEnter: U,
      onKeyDown: ke,
      onKeyUp: ce
    };
  }
  var Ae = /* @__PURE__ */ D("div", it({
    ref: t,
    className: We(J, oe(oe(oe({}, "".concat(J, "-").concat(o + 1), o !== null && O), "".concat(J, "-dragging"), c), "".concat(J, "-dragging-delete"), h), W.handle),
    style: Y(Y(Y({}, Re), u), N.handle)
  }, Se, g));
  return s && (Ae = s(Ae, {
    index: o,
    prefixCls: r,
    value: n,
    dragging: c,
    draggingDelete: h
  })), Ae;
}), _a = ["prefixCls", "style", "onStartMove", "onOffsetChange", "values", "handleRender", "activeHandleRender", "draggingIndex", "draggingDelete", "onFocus"], fa = /* @__PURE__ */ It(function(e, t) {
  var r = e.prefixCls, n = e.style, o = e.onStartMove, a = e.onOffsetChange, i = e.values, u = e.handleRender, s = e.activeHandleRender, c = e.draggingIndex, h = e.draggingDelete, l = e.onFocus, p = nn(e, _a), f = be({}), y = X(!1), g = K(y, 2), v = g[0], m = g[1], _ = X(-1), d = K(_, 2), C = d[0], E = d[1], O = function(S) {
    E(S), m(!0);
  }, I = function(S, N) {
    O(N), l?.(S);
  }, L = function(S, N) {
    O(N);
  };
  Gr(t, function() {
    return {
      focus: function(S) {
        var N;
        (N = f.current[S]) === null || N === void 0 || N.focus();
      },
      hideHelp: function() {
        In(function() {
          m(!1);
        });
      }
    };
  });
  var $ = Y({
    prefixCls: r,
    onStartMove: o,
    onOffsetChange: a,
    render: u,
    onFocus: I,
    onMouseEnter: L
  }, p);
  return /* @__PURE__ */ D(Ce, null, i.map(function(x, S) {
    var N = c === S;
    return /* @__PURE__ */ D(Mr, it({
      ref: function(J) {
        J ? f.current[S] = J : delete f.current[S];
      },
      dragging: N,
      draggingDelete: N && h,
      style: Ue(n, S),
      key: S,
      value: x,
      valueIndex: S
    }, $));
  }), s && v && /* @__PURE__ */ D(Mr, it({
    key: "a11y"
  }, $, {
    value: i[C],
    valueIndex: null,
    dragging: c !== -1,
    draggingDelete: h,
    render: s,
    style: {
      pointerEvents: "none"
    },
    tabIndex: null,
    "aria-hidden": !0
  })));
}), da = function(t) {
  var r = t.prefixCls, n = t.style, o = t.children, a = t.value, i = t.onClick, u = ze(Be), s = u.min, c = u.max, h = u.direction, l = u.includedStart, p = u.includedEnd, f = u.included, y = "".concat(r, "-text"), g = Wt(h, a, s, c);
  return /* @__PURE__ */ D("span", {
    className: We(y, oe({}, "".concat(y, "-active"), f && l <= a && a <= p)),
    style: Y(Y({}, g), n),
    onMouseDown: function(m) {
      m.stopPropagation();
    },
    onClick: function() {
      i(a);
    }
  }, o);
}, va = function(t) {
  var r = t.prefixCls, n = t.marks, o = t.onClick, a = "".concat(r, "-mark");
  return n.length ? /* @__PURE__ */ D("div", {
    className: a
  }, n.map(function(i) {
    var u = i.value, s = i.style, c = i.label;
    return /* @__PURE__ */ D(da, {
      key: u,
      prefixCls: a,
      style: s,
      value: u,
      onClick: o
    }, c);
  })) : null;
}, ha = function(t) {
  var r = t.prefixCls, n = t.value, o = t.style, a = t.activeStyle, i = ze(Be), u = i.min, s = i.max, c = i.direction, h = i.included, l = i.includedStart, p = i.includedEnd, f = "".concat(r, "-dot"), y = h && l <= n && n <= p, g = Y(Y({}, Wt(c, n, u, s)), typeof o == "function" ? o(n) : o);
  return y && (g = Y(Y({}, g), typeof a == "function" ? a(n) : a)), /* @__PURE__ */ D("span", {
    className: We(f, oe({}, "".concat(f, "-active"), y)),
    style: g
  });
}, ma = function(t) {
  var r = t.prefixCls, n = t.marks, o = t.dots, a = t.style, i = t.activeStyle, u = ze(Be), s = u.min, c = u.max, h = u.step, l = G(function() {
    var p = /* @__PURE__ */ new Set();
    if (n.forEach(function(y) {
      p.add(y.value);
    }), o && h !== null)
      for (var f = s; f <= c; )
        p.add(f), f += h;
    return Array.from(p);
  }, [s, c, h, o, n]);
  return /* @__PURE__ */ D("div", {
    className: "".concat(r, "-step")
  }, l.map(function(p) {
    return /* @__PURE__ */ D(ha, {
      prefixCls: r,
      key: p,
      value: p,
      style: a,
      activeStyle: i
    });
  }));
}, Pr = function(t) {
  var r = t.prefixCls, n = t.style, o = t.start, a = t.end, i = t.index, u = t.onStartMove, s = t.replaceCls, c = ze(Be), h = c.direction, l = c.min, p = c.max, f = c.disabled, y = c.range, g = c.classNames, v = "".concat(r, "-track"), m = Tt(o, l, p), _ = Tt(a, l, p), d = function(I) {
    !f && u && u(I, -1);
  }, C = {};
  switch (h) {
    case "rtl":
      C.right = "".concat(m * 100, "%"), C.width = "".concat(_ * 100 - m * 100, "%");
      break;
    case "btt":
      C.bottom = "".concat(m * 100, "%"), C.height = "".concat(_ * 100 - m * 100, "%");
      break;
    case "ttb":
      C.top = "".concat(m * 100, "%"), C.height = "".concat(_ * 100 - m * 100, "%");
      break;
    default:
      C.left = "".concat(m * 100, "%"), C.width = "".concat(_ * 100 - m * 100, "%");
  }
  var E = s || We(v, oe(oe({}, "".concat(v, "-").concat(i + 1), i !== null && y), "".concat(r, "-track-draggable"), u), g.track);
  return /* @__PURE__ */ D("div", {
    className: E,
    style: Y(Y({}, C), n),
    onMouseDown: d,
    onTouchStart: d
  });
}, pa = function(t) {
  var r = t.prefixCls, n = t.style, o = t.values, a = t.startPoint, i = t.onStartMove, u = ze(Be), s = u.included, c = u.range, h = u.min, l = u.styles, p = u.classNames, f = G(function() {
    if (!c) {
      if (o.length === 0)
        return [];
      var g = a ?? h, v = o[0];
      return [{
        start: Math.min(g, v),
        end: Math.max(g, v)
      }];
    }
    for (var m = [], _ = 0; _ < o.length - 1; _ += 1)
      m.push({
        start: o[_],
        end: o[_ + 1]
      });
    return m;
  }, [o, c, a, h]);
  if (!s)
    return null;
  var y = f != null && f.length && (p.tracks || l.tracks) ? /* @__PURE__ */ D(Pr, {
    index: null,
    prefixCls: r,
    start: f[0].start,
    end: f[f.length - 1].end,
    replaceCls: We(p.tracks, "".concat(r, "-tracks")),
    style: l.tracks
  }) : null;
  return /* @__PURE__ */ D(Ce, null, y, f.map(function(g, v) {
    var m = g.start, _ = g.end;
    return /* @__PURE__ */ D(Pr, {
      index: v,
      prefixCls: r,
      style: Y(Y({}, Ue(n, v)), l.track),
      start: m,
      end: _,
      key: v,
      onStartMove: i
    });
  }));
}, ga = 130;
function Or(e) {
  var t = "targetTouches" in e ? e.targetTouches[0] : e;
  return {
    pageX: t.pageX,
    pageY: t.pageY
  };
}
function ya(e, t, r, n, o, a, i, u, s, c, h) {
  var l = X(null), p = K(l, 2), f = p[0], y = p[1], g = X(-1), v = K(g, 2), m = v[0], _ = v[1], d = X(!1), C = K(d, 2), E = C[0], O = C[1], I = X(r), L = K(I, 2), $ = L[0], x = L[1], S = X(r), N = K(S, 2), W = N[0], J = N[1], V = be(null), te = be(null), U = be(null), ke = ze(ca), ce = ke.onDragStart, Re = ke.onDragChange;
  tn(function() {
    m === -1 && x(r);
  }, [r, m]), je(function() {
    return function() {
      document.removeEventListener("mousemove", V.current), document.removeEventListener("mouseup", te.current), U.current && (U.current.removeEventListener("touchmove", V.current), U.current.removeEventListener("touchend", te.current));
    };
  }, []);
  var Se = function(P, z, Z) {
    z !== void 0 && y(z), x(P);
    var re = P;
    Z && (re = P.filter(function(j, ee) {
      return ee !== m;
    })), i(re), Re && Re({
      rawValues: P,
      deleteIndex: Z ? m : -1,
      draggingIndex: m,
      draggingValue: z
    });
  }, De = Ze(function(T, P, z) {
    if (T === -1) {
      var Z = W[0], re = W[W.length - 1], j = n - Z, ee = o - re, ie = P * (o - n);
      ie = Math.max(ie, j), ie = Math.min(ie, ee);
      var qe = a(Z + ie);
      ie = qe - Z;
      var se = W.map(function(de) {
        return de + ie;
      });
      Se(se);
    } else {
      var _e = (o - n) * P, fe = pe($);
      fe[T] = W[T];
      var Ee = s(fe, _e, T, "dist");
      Se(Ee.values, Ee.value, z);
    }
  }), Ae = function(P, z, Z) {
    P.stopPropagation();
    var re = Z || r, j = re[z];
    _(z), y(j), J(re), x(re), O(!1);
    var ee = Or(P), ie = ee.pageX, qe = ee.pageY, se = !1;
    ce && ce({
      rawValues: re,
      draggingIndex: z,
      draggingValue: j
    });
    var _e = function(de) {
      de.preventDefault();
      var ne = Or(de), Ve = ne.pageX, Ge = ne.pageY, Ke = Ve - ie, ue = Ge - qe, le = e.current.getBoundingClientRect(), Te = le.width, Xe = le.height, Ne, xe;
      switch (t) {
        case "btt":
          Ne = -ue / Xe, xe = Ke;
          break;
        case "ttb":
          Ne = ue / Xe, xe = Ke;
          break;
        case "rtl":
          Ne = -Ke / Te, xe = ue;
          break;
        default:
          Ne = Ke / Te, xe = ue;
      }
      se = c ? Math.abs(xe) > ga && h < $.length : !1, O(se), De(z, Ne, se);
    }, fe = function Ee(de) {
      de.preventDefault(), document.removeEventListener("mouseup", Ee), document.removeEventListener("mousemove", _e), U.current && (U.current.removeEventListener("touchmove", V.current), U.current.removeEventListener("touchend", te.current)), V.current = null, te.current = null, U.current = null, u(se), _(-1), O(!1);
    };
    document.addEventListener("mouseup", fe), document.addEventListener("mousemove", _e), P.currentTarget.addEventListener("touchend", fe), P.currentTarget.addEventListener("touchmove", _e), V.current = _e, te.current = fe, U.current = P.currentTarget;
  }, we = G(function() {
    var T = pe(r).sort(function(j, ee) {
      return j - ee;
    }), P = pe($).sort(function(j, ee) {
      return j - ee;
    }), z = {};
    P.forEach(function(j) {
      z[j] = (z[j] || 0) + 1;
    }), T.forEach(function(j) {
      z[j] = (z[j] || 0) - 1;
    });
    var Z = c ? 1 : 0, re = Object.values(z).reduce(function(j, ee) {
      return j + Math.abs(ee);
    }, 0);
    return re <= Z ? $ : r;
  }, [r, $, c]);
  return [m, f, E, we, Ae];
}
function ba(e, t, r, n, o, a) {
  var i = mt(function(f) {
    return Math.max(e, Math.min(t, f));
  }, [e, t]), u = mt(function(f) {
    if (r !== null) {
      var y = e + Math.round((i(f) - e) / r) * r, g = function(d) {
        return (String(d).split(".")[1] || "").length;
      }, v = Math.max(g(r), g(t), g(e)), m = Number(y.toFixed(v));
      return e <= m && m <= t ? m : null;
    }
    return null;
  }, [r, e, t, i]), s = mt(function(f) {
    var y = i(f), g = n.map(function(_) {
      return _.value;
    });
    r !== null && g.push(u(f)), g.push(e, t);
    var v = g[0], m = t - e;
    return g.forEach(function(_) {
      var d = Math.abs(y - _);
      d <= m && (v = _, m = d);
    }), v;
  }, [e, t, n, r, i, u]), c = function f(y, g, v) {
    var m = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
    if (typeof g == "number") {
      var _, d = y[v], C = d + g, E = [];
      n.forEach(function(x) {
        E.push(x.value);
      }), E.push(e, t), E.push(u(d));
      var O = g > 0 ? 1 : -1;
      m === "unit" ? E.push(u(d + O * r)) : E.push(u(C)), E = E.filter(function(x) {
        return x !== null;
      }).filter(function(x) {
        return g < 0 ? x <= d : x >= d;
      }), m === "unit" && (E = E.filter(function(x) {
        return x !== d;
      }));
      var I = m === "unit" ? d : C;
      _ = E[0];
      var L = Math.abs(_ - I);
      if (E.forEach(function(x) {
        var S = Math.abs(x - I);
        S < L && (_ = x, L = S);
      }), _ === void 0)
        return g < 0 ? e : t;
      if (m === "dist")
        return _;
      if (Math.abs(g) > 1) {
        var $ = pe(y);
        return $[v] = _, f($, g - O, v, m);
      }
      return _;
    } else {
      if (g === "min")
        return e;
      if (g === "max")
        return t;
    }
  }, h = function(y, g, v) {
    var m = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit", _ = y[v], d = c(y, g, v, m);
    return {
      value: d,
      changed: d !== _
    };
  }, l = function(y) {
    return a === null && y === 0 || typeof a == "number" && y < a;
  }, p = function(y, g, v) {
    var m = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit", _ = y.map(s), d = _[v], C = c(_, g, v, m);
    if (_[v] = C, o === !1) {
      var E = a || 0;
      v > 0 && _[v - 1] !== d && (_[v] = Math.max(_[v], _[v - 1] + E)), v < _.length - 1 && _[v + 1] !== d && (_[v] = Math.min(_[v], _[v + 1] - E));
    } else if (typeof a == "number" || a === null) {
      for (var O = v + 1; O < _.length; O += 1)
        for (var I = !0; l(_[O] - _[O - 1]) && I; ) {
          var L = h(_, 1, O);
          _[O] = L.value, I = L.changed;
        }
      for (var $ = v; $ > 0; $ -= 1)
        for (var x = !0; l(_[$] - _[$ - 1]) && x; ) {
          var S = h(_, -1, $ - 1);
          _[$ - 1] = S.value, x = S.changed;
        }
      for (var N = _.length - 1; N > 0; N -= 1)
        for (var W = !0; l(_[N] - _[N - 1]) && W; ) {
          var J = h(_, -1, N - 1);
          _[N - 1] = J.value, W = J.changed;
        }
      for (var V = 0; V < _.length - 1; V += 1)
        for (var te = !0; l(_[V + 1] - _[V]) && te; ) {
          var U = h(_, 1, V + 1);
          _[V + 1] = U.value, te = U.changed;
        }
    }
    return {
      value: _[v],
      values: _
    };
  };
  return [s, p];
}
function Ca(e) {
  return G(function() {
    if (e === !0 || !e)
      return [!!e, !1, !1, 0];
    var t = e.editable, r = e.draggableTrack, n = e.minCount, o = e.maxCount;
    return [!0, t, !t && r, n || 0, o];
  }, [e]);
}
var xt = /* @__PURE__ */ It(function(e, t) {
  var r = e.prefixCls, n = r === void 0 ? "rc-slider" : r, o = e.className, a = e.style, i = e.classNames, u = e.styles, s = e.id, c = e.disabled, h = c === void 0 ? !1 : c, l = e.keyboard, p = l === void 0 ? !0 : l, f = e.autoFocus, y = e.onFocus, g = e.onBlur, v = e.min, m = v === void 0 ? 0 : v, _ = e.max, d = _ === void 0 ? 100 : _, C = e.step, E = C === void 0 ? 1 : C, O = e.value, I = e.defaultValue, L = e.range, $ = e.count, x = e.onChange, S = e.onBeforeChange, N = e.onAfterChange, W = e.onChangeComplete, J = e.allowCross, V = J === void 0 ? !0 : J, te = e.pushable, U = te === void 0 ? !1 : te, ke = e.reverse, ce = e.vertical, Re = e.included, Se = Re === void 0 ? !0 : Re, De = e.startPoint, Ae = e.trackStyle, we = e.handleStyle, T = e.railStyle, P = e.dotStyle, z = e.activeDotStyle, Z = e.marks, re = e.dots, j = e.handleRender, ee = e.activeHandleRender, ie = e.track, qe = e.tabIndex, se = qe === void 0 ? 0 : qe, _e = e.ariaLabelForHandle, fe = e.ariaLabelledByForHandle, Ee = e.ariaRequired, de = e.ariaValueTextFormatterForHandle, ne = be(null), Ve = be(null), Ge = G(function() {
    return ce ? ke ? "ttb" : "btt" : ke ? "rtl" : "ltr";
  }, [ke, ce]), Ke = Ca(L), ue = K(Ke, 5), le = ue[0], Te = ue[1], Xe = ue[2], Ne = ue[3], xe = ue[4], ae = G(function() {
    return isFinite(m) ? m : 0;
  }, [m]), Ye = G(function() {
    return isFinite(d) ? d : 100;
  }, [d]), He = G(function() {
    return E !== null && E <= 0 ? 1 : E;
  }, [E]), on = G(function() {
    return typeof U == "boolean" ? U ? He : !1 : U >= 0 ? U : !1;
  }, [U, He]), ct = G(function() {
    return Object.keys(Z || {}).map(function(M) {
      var k = Z[M], R = {
        value: Number(M)
      };
      return k && Oe(k) === "object" && !/* @__PURE__ */ jn(k) && ("label" in k || "style" in k) ? (R.style = k.style, R.label = k.label) : R.label = k, R;
    }).filter(function(M) {
      var k = M.label;
      return k || typeof k == "number";
    }).sort(function(M, k) {
      return M.value - k.value;
    });
  }, [Z]), ln = ba(ae, Ye, He, ct, V, on), zt = K(ln, 2), st = zt[0], Bt = zt[1], un = ta(I, {
    value: O
  }), qt = K(un, 2), $e = qt[0], cn = qt[1], Q = G(function() {
    var M = $e == null ? [] : Array.isArray($e) ? $e : [$e], k = K(M, 1), R = k[0], H = R === void 0 ? ae : R, B = $e === null ? [] : [H];
    if (le) {
      if (B = pe(M), $ || $e === void 0) {
        var Me = $ >= 0 ? $ + 1 : 2;
        for (B = B.slice(0, Me); B.length < Me; ) {
          var ve;
          B.push((ve = B[B.length - 1]) !== null && ve !== void 0 ? ve : ae);
        }
      }
      B.sort(function(he, me) {
        return he - me;
      });
    }
    return B.forEach(function(he, me) {
      B[me] = st(he);
    }), B;
  }, [$e, le, ae, $, st]), Je = function(k) {
    return le ? k : k[0];
  }, _t = Ze(function(M) {
    var k = pe(M).sort(function(R, H) {
      return R - H;
    });
    x && !la(k, Q, !0) && x(Je(k)), cn(k);
  }), Vt = Ze(function(M) {
    M && ne.current.hideHelp();
    var k = Je(Q);
    N?.(k), rt(!N, "[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead."), W?.(k);
  }), sn = function(k) {
    if (!(h || !Te || Q.length <= Ne)) {
      var R = pe(Q);
      R.splice(k, 1), S?.(Je(R)), _t(R);
      var H = Math.max(0, k - 1);
      ne.current.hideHelp(), ne.current.focus(H);
    }
  }, _n = ya(Ve, Ge, Q, ae, Ye, st, _t, Vt, Bt, Te, Ne), nt = K(_n, 5), Gt = nt[0], fn = nt[1], dn = nt[2], Ct = nt[3], Kt = nt[4], Xt = function(k, R) {
    if (!h) {
      var H = pe(Q), B = 0, Me = 0, ve = Ye - ae;
      Q.forEach(function(Pe, ft) {
        var nr = Math.abs(k - Pe);
        nr <= ve && (ve = nr, B = ft), Pe < k && (Me = ft);
      });
      var he = B;
      Te && ve !== 0 && (!xe || Q.length < xe) ? (H.splice(Me + 1, 0, k), he = Me + 1) : H[B] = k, le && !Q.length && $ === void 0 && H.push(k);
      var me = Je(H);
      if (S?.(me), _t(H), R) {
        var Fe, Qe;
        (Fe = document.activeElement) === null || Fe === void 0 || (Qe = Fe.blur) === null || Qe === void 0 || Qe.call(Fe), ne.current.focus(he), Kt(R, he, H);
      } else
        N?.(me), rt(!N, "[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead."), W?.(me);
    }
  }, vn = function(k) {
    k.preventDefault();
    var R = Ve.current.getBoundingClientRect(), H = R.width, B = R.height, Me = R.left, ve = R.top, he = R.bottom, me = R.right, Fe = k.clientX, Qe = k.clientY, Pe;
    switch (Ge) {
      case "btt":
        Pe = (he - Qe) / B;
        break;
      case "ttb":
        Pe = (Qe - ve) / B;
        break;
      case "rtl":
        Pe = (me - Fe) / H;
        break;
      default:
        Pe = (Fe - Me) / H;
    }
    var ft = ae + Pe * (Ye - ae);
    Xt(st(ft), k);
  }, hn = X(null), Yt = K(hn, 2), kt = Yt[0], Jt = Yt[1], mn = function(k, R) {
    if (!h) {
      var H = Bt(Q, k, R);
      S?.(Je(Q)), _t(H.values), Jt(H.value);
    }
  };
  je(function() {
    if (kt !== null) {
      var M = Q.indexOf(kt);
      M >= 0 && ne.current.focus(M);
    }
    Jt(null);
  }, [kt]);
  var pn = G(function() {
    return Xe && He === null ? !1 : Xe;
  }, [Xe, He]), Qt = Ze(function(M, k) {
    Kt(M, k), S?.(Je(Q));
  }), Zt = Gt !== -1;
  je(function() {
    if (!Zt) {
      var M = Q.lastIndexOf(fn);
      ne.current.focus(M);
    }
  }, [Zt]);
  var at = G(function() {
    return pe(Ct).sort(function(M, k) {
      return M - k;
    });
  }, [Ct]), gn = G(function() {
    return le ? [at[0], at[at.length - 1]] : [ae, at[0]];
  }, [at, le, ae]), er = K(gn, 2), tr = er[0], rr = er[1];
  Gr(t, function() {
    return {
      focus: function() {
        ne.current.focus(0);
      },
      blur: function() {
        var k, R = document, H = R.activeElement;
        (k = Ve.current) !== null && k !== void 0 && k.contains(H) && H?.blur();
      }
    };
  }), je(function() {
    f && ne.current.focus(0);
  }, []);
  var yn = G(function() {
    return {
      min: ae,
      max: Ye,
      direction: Ge,
      disabled: h,
      keyboard: p,
      step: He,
      included: Se,
      includedStart: tr,
      includedEnd: rr,
      range: le,
      tabIndex: se,
      ariaLabelForHandle: _e,
      ariaLabelledByForHandle: fe,
      ariaRequired: Ee,
      ariaValueTextFormatterForHandle: de,
      styles: u || {},
      classNames: i || {}
    };
  }, [ae, Ye, Ge, h, p, He, Se, tr, rr, le, se, _e, fe, Ee, de, u, i]);
  return /* @__PURE__ */ D(Be.Provider, {
    value: yn
  }, /* @__PURE__ */ D("div", {
    ref: Ve,
    className: We(n, o, oe(oe(oe(oe({}, "".concat(n, "-disabled"), h), "".concat(n, "-vertical"), ce), "".concat(n, "-horizontal"), !ce), "".concat(n, "-with-marks"), ct.length)),
    style: a,
    onMouseDown: vn,
    id: s
  }, /* @__PURE__ */ D("div", {
    className: We("".concat(n, "-rail"), i?.rail),
    style: Y(Y({}, T), u?.rail)
  }), ie !== !1 && /* @__PURE__ */ D(pa, {
    prefixCls: n,
    style: Ae,
    values: Q,
    startPoint: De,
    onStartMove: pn ? Qt : void 0
  }), /* @__PURE__ */ D(ma, {
    prefixCls: n,
    marks: ct,
    dots: re,
    style: P,
    activeStyle: z
  }), /* @__PURE__ */ D(fa, {
    ref: ne,
    prefixCls: n,
    style: we,
    values: Ct,
    draggingIndex: Gt,
    draggingDelete: dn,
    onStartMove: Qt,
    onOffsetChange: mn,
    onFocus: y,
    onBlur: g,
    handleRender: j,
    activeHandleRender: ee,
    onChangeComplete: Vt,
    onDelete: Te ? sn : void 0
  }), /* @__PURE__ */ D(va, {
    prefixCls: n,
    marks: ct,
    onClick: Xt
  })));
});
const ka = () => {
  const [e, t] = X(!0), [r, n] = X(25), [o, a] = X(5e4), [i, u] = X([0, 1e4]), [s, c] = X([]), [h, l] = X(""), [p, f] = X(""), y = [
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
  ], g = [
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
  je(() => {
    (async () => {
      try {
        await new Promise((C) => setTimeout(C, 2e3)), t(!1);
      } catch (C) {
        console.error("Failed to load form data:", C), t(!1);
      }
    })();
  }, []);
  const v = (d) => {
    s.includes(d) || (c([...s, d]), l(""));
  }, m = (d) => {
    c(s.filter((C) => C !== d));
  }, _ = y.filter(
    (d) => d.toLowerCase().includes(h.toLowerCase()) && !s.includes(d)
  );
  return /* @__PURE__ */ b(Ce, { children: [
    /* @__PURE__ */ b("style", { children: `
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
    /* @__PURE__ */ b("div", { className: "roi-form", children: [
      /* @__PURE__ */ b("div", { className: "roi-field", children: [
        /* @__PURE__ */ b("div", { className: "roi-field-title", children: "Opportunity win rate" }),
        e ? /* @__PURE__ */ b("div", { className: "roi-field-skeleton" }) : /* @__PURE__ */ b("div", { className: "roi-slider-input-group", children: [
          /* @__PURE__ */ b("div", { className: "roi-slider-wrapper-no-label", children: /* @__PURE__ */ b(
            xt,
            {
              value: r,
              onChange: (d) => n(d),
              min: 0,
              max: 100,
              className: "roi-rc-slider"
            }
          ) }),
          /* @__PURE__ */ b(
            "input",
            {
              type: "text",
              value: `${r}%`,
              onChange: (d) => {
                const C = d.target.value.replace("%", ""), E = parseFloat(C);
                isNaN(E) || n(Math.max(0, Math.min(100, E)));
              },
              className: "roi-field-input roi-input-fixed",
              placeholder: "25%"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ b("div", { className: "roi-field", children: [
        /* @__PURE__ */ b("div", { className: "roi-field-title", children: "Average deal size" }),
        e ? /* @__PURE__ */ b("div", { className: "roi-field-skeleton" }) : /* @__PURE__ */ b("div", { className: "roi-slider-input-group", children: [
          /* @__PURE__ */ b("div", { className: "roi-slider-wrapper-no-label", children: /* @__PURE__ */ b(
            xt,
            {
              value: o,
              onChange: (d) => a(d),
              min: 1e4,
              max: 1e6,
              step: 1e4,
              className: "roi-rc-slider"
            }
          ) }),
          /* @__PURE__ */ b(
            "input",
            {
              type: "text",
              value: `$${o.toLocaleString()}`,
              onChange: (d) => {
                const C = d.target.value.replace(/[$,]/g, ""), E = parseFloat(C);
                isNaN(E) || a(Math.max(1e4, Math.min(1e6, E)));
              },
              className: "roi-field-input roi-input-fixed",
              placeholder: "$50,000"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ b("div", { className: "roi-field", children: [
        /* @__PURE__ */ b("div", { className: "roi-field-title", children: "What company sizes do you sell to?" }),
        e ? /* @__PURE__ */ b("div", { className: "roi-field-skeleton" }) : /* @__PURE__ */ b("div", { className: "roi-slider-wrapper", children: [
          /* @__PURE__ */ b(
            xt,
            {
              range: !0,
              value: i,
              onChange: (d) => u(d),
              min: 0,
              max: 1e4,
              className: "roi-rc-slider"
            }
          ),
          /* @__PURE__ */ b("span", { className: "roi-slider-value-min", children: i[0].toLocaleString() }),
          /* @__PURE__ */ b("span", { className: "roi-slider-value-max", children: [
            i[1].toLocaleString(),
            "+"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ b("div", { className: "roi-field", children: [
        /* @__PURE__ */ b("div", { className: "roi-field-title", children: "What territories do you sell to?" }),
        e ? /* @__PURE__ */ b("div", { className: "roi-field-skeleton" }) : /* @__PURE__ */ b("div", { className: "roi-autocomplete-container", children: [
          /* @__PURE__ */ b(
            "input",
            {
              type: "text",
              value: h,
              onChange: (d) => l(d.target.value),
              className: "roi-field-input",
              placeholder: "Search territories..."
            }
          ),
          h && _.length > 0 && /* @__PURE__ */ b("div", { className: "roi-autocomplete-dropdown", children: _.slice(0, 5).map((d) => /* @__PURE__ */ b(
            "div",
            {
              className: "roi-autocomplete-item",
              onClick: () => v(d),
              children: d
            },
            d
          )) }),
          s.length > 0 && /* @__PURE__ */ b("div", { className: "roi-pills-container", children: s.map((d) => /* @__PURE__ */ b("div", { className: "roi-pill", children: [
            d,
            /* @__PURE__ */ b(
              "button",
              {
                onClick: () => m(d),
                className: "roi-pill-remove",
                children: "×"
              }
            )
          ] }, d)) })
        ] })
      ] }),
      /* @__PURE__ */ b("div", { className: "roi-field", children: [
        /* @__PURE__ */ b("div", { className: "roi-field-title", children: "What industries do you sell to?" }),
        e ? /* @__PURE__ */ b("div", { className: "roi-field-skeleton" }) : /* @__PURE__ */ b(
          "select",
          {
            value: p,
            onChange: (d) => f(d.target.value),
            className: "roi-field-input roi-select-full",
            children: [
              /* @__PURE__ */ b("option", { value: "", children: "Select industry" }),
              g.map((d) => /* @__PURE__ */ b("option", { value: d, children: d }, d))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ b("div", { className: "roi-field", children: /* @__PURE__ */ b("a", { href: "#", className: "roi-submit w-button", children: "Calculate" }) })
    ] }),
    /* @__PURE__ */ b("div", { className: "roi-results", children: [
      /* @__PURE__ */ b("div", { className: "roi-stats", children: [
        /* @__PURE__ */ b("div", { className: "roi-stats-number", children: "—" }),
        /* @__PURE__ */ b("div", { className: "roi-stats-title", children: "Total accounts in your market in Crunchbase" })
      ] }),
      /* @__PURE__ */ b("div", { className: "roi-stats-group", children: [
        /* @__PURE__ */ b("div", { className: "roi-stats-group-item", children: [
          /* @__PURE__ */ b("div", { className: "roi-item-title", children: "Accounts with funding in the last 6 months" }),
          /* @__PURE__ */ b("div", { className: "roi-item-value", children: "—" })
        ] }),
        /* @__PURE__ */ b("div", { className: "roi-stats-group-item", children: [
          /* @__PURE__ */ b("div", { className: "roi-item-title", children: "Accounts with funding in the last 6 months" }),
          /* @__PURE__ */ b("div", { className: "roi-item-value", children: "—" })
        ] })
      ] }),
      /* @__PURE__ */ b("div", { className: "roi-stats", children: [
        /* @__PURE__ */ b("div", { className: "roi-stats-number", children: "—" }),
        /* @__PURE__ */ b("div", { className: "roi-stats-title", children: "Potential additional revenue" })
      ] })
    ] })
  ] });
};
function an(e = "#roi-calculator") {
  console.log("🚀 ROI Calculator: Starting initialization...");
  try {
    const t = document.querySelector(e);
    if (!t) {
      console.error(
        `❌ ROI Calculator: Container "${e}" not found`
      );
      return;
    }
    return console.log(`✅ ROI Calculator: Found container "${e}"`), En(D(ka), t), console.log("✅ ROI Calculator: Component rendered successfully"), t;
  } catch (t) {
    console.error("❌ ROI Calculator: Error during initialization:", t);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#roi-calculator") ? an() : console.log(
    "💡 ROI Calculator: No #roi-calculator container found. Use initROICalculator('#your-selector') to initialize manually."
  );
});
window.initROICalculator = an;
export {
  an as default,
  an as initROICalculator
};
