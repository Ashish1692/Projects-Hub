var e = Object.create,
  t = Object.defineProperty,
  n = Object.getOwnPropertyDescriptor,
  r = Object.getOwnPropertyNames,
  i = Object.getPrototypeOf,
  a = Object.prototype.hasOwnProperty,
  o = (e, t) => () => (
    t || (e((t = { exports: {} }).exports, t), (e = null)),
    t.exports
  ),
  s = (e, i, o, s) => {
    if ((i && typeof i == `object`) || typeof i == `function`)
      for (var c = r(i), l = 0, u = c.length, d; l < u; l++)
        ((d = c[l]),
          !a.call(e, d) &&
            d !== o &&
            t(e, d, {
              get: ((e) => i[e]).bind(null, d),
              enumerable: !(s = n(i, d)) || s.enumerable,
            }));
    return e;
  },
  c = (n, r, a) => (
    (a = n == null ? {} : e(i(n))),
    s(
      r || !n || !n.__esModule
        ? t(a, `default`, { value: n, enumerable: !0 })
        : a,
      n,
    )
  );
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
          ? (t.credentials = `omit`)
          : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var l = o((e) => {
    var t = Symbol.for(`react.element`),
      n = Symbol.for(`react.portal`),
      r = Symbol.for(`react.fragment`),
      i = Symbol.for(`react.strict_mode`),
      a = Symbol.for(`react.profiler`),
      o = Symbol.for(`react.provider`),
      s = Symbol.for(`react.context`),
      c = Symbol.for(`react.forward_ref`),
      l = Symbol.for(`react.suspense`),
      u = Symbol.for(`react.memo`),
      d = Symbol.for(`react.lazy`),
      f = Symbol.iterator;
    function p(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (f && e[f]) || e[`@@iterator`]),
          typeof e == `function` ? e : null);
    }
    var m = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      h = Object.assign,
      g = {};
    function _(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = g),
        (this.updater = n || m));
    }
    ((_.prototype.isReactComponent = {}),
      (_.prototype.setState = function (e, t) {
        if (typeof e != `object` && typeof e != `function` && e != null)
          throw Error(
            `setState(...): takes an object of state variables to update or a function which returns an object of state variables.`,
          );
        this.updater.enqueueSetState(this, e, t, `setState`);
      }),
      (_.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
      }));
    function v() {}
    v.prototype = _.prototype;
    function y(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = g),
        (this.updater = n || m));
    }
    var b = (y.prototype = new v());
    ((b.constructor = y), h(b, _.prototype), (b.isPureReactComponent = !0));
    var x = Array.isArray,
      S = Object.prototype.hasOwnProperty,
      C = { current: null },
      w = { key: !0, ref: !0, __self: !0, __source: !0 };
    function T(e, n, r) {
      var i,
        a = {},
        o = null,
        s = null;
      if (n != null)
        for (i in (n.ref !== void 0 && (s = n.ref),
        n.key !== void 0 && (o = `` + n.key),
        n))
          S.call(n, i) && !w.hasOwnProperty(i) && (a[i] = n[i]);
      var c = arguments.length - 2;
      if (c === 1) a.children = r;
      else if (1 < c) {
        for (var l = Array(c), u = 0; u < c; u++) l[u] = arguments[u + 2];
        a.children = l;
      }
      if (e && e.defaultProps)
        for (i in ((c = e.defaultProps), c)) a[i] === void 0 && (a[i] = c[i]);
      return {
        $$typeof: t,
        type: e,
        key: o,
        ref: s,
        props: a,
        _owner: C.current,
      };
    }
    function ee(e, n) {
      return {
        $$typeof: t,
        type: e.type,
        key: n,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function te(e) {
      return typeof e == `object` && !!e && e.$$typeof === t;
    }
    function ne(e) {
      var t = { "=": `=0`, ":": `=2` };
      return (
        `$` +
        e.replace(/[=:]/g, function (e) {
          return t[e];
        })
      );
    }
    var re = /\/+/g;
    function ie(e, t) {
      return typeof e == `object` && e && e.key != null
        ? ne(`` + e.key)
        : t.toString(36);
    }
    function ae(e, r, i, a, o) {
      var s = typeof e;
      (s === `undefined` || s === `boolean`) && (e = null);
      var c = !1;
      if (e === null) c = !0;
      else
        switch (s) {
          case `string`:
          case `number`:
            c = !0;
            break;
          case `object`:
            switch (e.$$typeof) {
              case t:
              case n:
                c = !0;
            }
        }
      if (c)
        return (
          (c = e),
          (o = o(c)),
          (e = a === `` ? `.` + ie(c, 0) : a),
          x(o)
            ? ((i = ``),
              e != null && (i = e.replace(re, `$&/`) + `/`),
              ae(o, r, i, ``, function (e) {
                return e;
              }))
            : o != null &&
              (te(o) &&
                (o = ee(
                  o,
                  i +
                    (!o.key || (c && c.key === o.key)
                      ? ``
                      : (`` + o.key).replace(re, `$&/`) + `/`) +
                    e,
                )),
              r.push(o)),
          1
        );
      if (((c = 0), (a = a === `` ? `.` : a + `:`), x(e)))
        for (var l = 0; l < e.length; l++) {
          s = e[l];
          var u = a + ie(s, l);
          c += ae(s, r, i, u, o);
        }
      else if (((u = p(e)), typeof u == `function`))
        for (e = u.call(e), l = 0; !(s = e.next()).done; )
          ((s = s.value), (u = a + ie(s, l++)), (c += ae(s, r, i, u, o)));
      else if (s === `object`)
        throw (
          (r = String(e)),
          Error(
            `Objects are not valid as a React child (found: ` +
              (r === `[object Object]`
                ? `object with keys {` + Object.keys(e).join(`, `) + `}`
                : r) +
              `). If you meant to render a collection of children, use an array instead.`,
          )
        );
      return c;
    }
    function oe(e, t, n) {
      if (e == null) return e;
      var r = [],
        i = 0;
      return (
        ae(e, r, ``, ``, function (e) {
          return t.call(n, e, i++);
        }),
        r
      );
    }
    function se(e) {
      if (e._status === -1) {
        var t = e._result;
        ((t = t()),
          t.then(
            function (t) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 1), (e._result = t));
            },
            function (t) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 2), (e._result = t));
            },
          ),
          e._status === -1 && ((e._status = 0), (e._result = t)));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var E = { current: null },
      ce = { transition: null },
      le = {
        ReactCurrentDispatcher: E,
        ReactCurrentBatchConfig: ce,
        ReactCurrentOwner: C,
      };
    function ue() {
      throw Error(`act(...) is not supported in production builds of React.`);
    }
    ((e.Children = {
      map: oe,
      forEach: function (e, t, n) {
        oe(
          e,
          function () {
            t.apply(this, arguments);
          },
          n,
        );
      },
      count: function (e) {
        var t = 0;
        return (
          oe(e, function () {
            t++;
          }),
          t
        );
      },
      toArray: function (e) {
        return (
          oe(e, function (e) {
            return e;
          }) || []
        );
      },
      only: function (e) {
        if (!te(e))
          throw Error(
            `React.Children.only expected to receive a single React element child.`,
          );
        return e;
      },
    }),
      (e.Component = _),
      (e.Fragment = r),
      (e.Profiler = a),
      (e.PureComponent = y),
      (e.StrictMode = i),
      (e.Suspense = l),
      (e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = le),
      (e.act = ue),
      (e.cloneElement = function (e, n, r) {
        if (e == null)
          throw Error(
            `React.cloneElement(...): The argument must be a React element, but you passed ` +
              e +
              `.`,
          );
        var i = h({}, e.props),
          a = e.key,
          o = e.ref,
          s = e._owner;
        if (n != null) {
          if (
            (n.ref !== void 0 && ((o = n.ref), (s = C.current)),
            n.key !== void 0 && (a = `` + n.key),
            e.type && e.type.defaultProps)
          )
            var c = e.type.defaultProps;
          for (l in n)
            S.call(n, l) &&
              !w.hasOwnProperty(l) &&
              (i[l] = n[l] === void 0 && c !== void 0 ? c[l] : n[l]);
        }
        var l = arguments.length - 2;
        if (l === 1) i.children = r;
        else if (1 < l) {
          c = Array(l);
          for (var u = 0; u < l; u++) c[u] = arguments[u + 2];
          i.children = c;
        }
        return {
          $$typeof: t,
          type: e.type,
          key: a,
          ref: o,
          props: i,
          _owner: s,
        };
      }),
      (e.createContext = function (e) {
        return (
          (e = {
            $$typeof: s,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
          }),
          (e.Provider = { $$typeof: o, _context: e }),
          (e.Consumer = e)
        );
      }),
      (e.createElement = T),
      (e.createFactory = function (e) {
        var t = T.bind(null, e);
        return ((t.type = e), t);
      }),
      (e.createRef = function () {
        return { current: null };
      }),
      (e.forwardRef = function (e) {
        return { $$typeof: c, render: e };
      }),
      (e.isValidElement = te),
      (e.lazy = function (e) {
        return {
          $$typeof: d,
          _payload: { _status: -1, _result: e },
          _init: se,
        };
      }),
      (e.memo = function (e, t) {
        return { $$typeof: u, type: e, compare: t === void 0 ? null : t };
      }),
      (e.startTransition = function (e) {
        var t = ce.transition;
        ce.transition = {};
        try {
          e();
        } finally {
          ce.transition = t;
        }
      }),
      (e.unstable_act = ue),
      (e.useCallback = function (e, t) {
        return E.current.useCallback(e, t);
      }),
      (e.useContext = function (e) {
        return E.current.useContext(e);
      }),
      (e.useDebugValue = function () {}),
      (e.useDeferredValue = function (e) {
        return E.current.useDeferredValue(e);
      }),
      (e.useEffect = function (e, t) {
        return E.current.useEffect(e, t);
      }),
      (e.useId = function () {
        return E.current.useId();
      }),
      (e.useImperativeHandle = function (e, t, n) {
        return E.current.useImperativeHandle(e, t, n);
      }),
      (e.useInsertionEffect = function (e, t) {
        return E.current.useInsertionEffect(e, t);
      }),
      (e.useLayoutEffect = function (e, t) {
        return E.current.useLayoutEffect(e, t);
      }),
      (e.useMemo = function (e, t) {
        return E.current.useMemo(e, t);
      }),
      (e.useReducer = function (e, t, n) {
        return E.current.useReducer(e, t, n);
      }),
      (e.useRef = function (e) {
        return E.current.useRef(e);
      }),
      (e.useState = function (e) {
        return E.current.useState(e);
      }),
      (e.useSyncExternalStore = function (e, t, n) {
        return E.current.useSyncExternalStore(e, t, n);
      }),
      (e.useTransition = function () {
        return E.current.useTransition();
      }),
      (e.version = `18.3.1`));
  }),
  u = o((e, t) => {
    t.exports = l();
  }),
  d = c(u(), 1),
  f = `modulepreload`,
  p = function (e, t) {
    return new URL(e, t).href;
  },
  m = {},
  h = function (e, t, n) {
    let r = Promise.resolve();
    if (t && t.length > 0) {
      let e = document.getElementsByTagName(`link`),
        i = document.querySelector(`meta[property=csp-nonce]`),
        a = i?.nonce || i?.getAttribute(`nonce`);
      function o(e) {
        return Promise.all(
          e.map((e) =>
            Promise.resolve(e).then(
              (e) => ({ status: `fulfilled`, value: e }),
              (e) => ({ status: `rejected`, reason: e }),
            ),
          ),
        );
      }
      function s(e) {
        return import.meta.resolve
          ? import.meta.resolve(e)
          : new URL(e, import.meta.url).href;
      }
      r = o(
        t.map((t) => {
          if (((t = p(t, n)), (t = s(t)), t in m)) return;
          m[t] = !0;
          let r = t.endsWith(`.css`);
          for (let n = e.length - 1; n >= 0; n--) {
            let i = e[n];
            if (i.href === t && (!r || i.rel === `stylesheet`)) return;
          }
          let i = document.createElement(`link`);
          if (
            ((i.rel = r ? `stylesheet` : f),
            r || (i.as = `script`),
            (i.crossOrigin = ``),
            (i.href = t),
            a && i.setAttribute(`nonce`, a),
            document.head.appendChild(i),
            r)
          )
            return new Promise((e, n) => {
              (i.addEventListener(`load`, e),
                i.addEventListener(`error`, () =>
                  n(Error(`Unable to preload CSS for ${t}`)),
                ));
            });
        }),
      );
    }
    function i(e) {
      let t = new Event(`vite:preloadError`, { cancelable: !0 });
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
        throw e;
    }
    return r.then((t) => {
      for (let e of t || []) e.status === `rejected` && i(e.reason);
      return e().catch(i);
    });
  },
  g = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  _ = /^[\\/]{2}/;
function v(e, t) {
  return t + e.replace(/\\/g, `/`);
}
var y = `popstate`;
function b(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `pathname` in e &&
    `search` in e &&
    `hash` in e &&
    `state` in e &&
    `key` in e
  );
}
function x(e = {}) {
  function t(e, t) {
    let {
      pathname: n = `/`,
      search: r = ``,
      hash: i = ``,
    } = ne(e.location.hash.substring(1));
    return (
      !n.startsWith(`/`) && !n.startsWith(`.`) && (n = `/` + n),
      ee(
        ``,
        { pathname: n, search: r, hash: i },
        (t.state && t.state.usr) || null,
        (t.state && t.state.key) || `default`,
      )
    );
  }
  function n(e, t) {
    let n = e.document.querySelector(`base`),
      r = ``;
    if (n && n.getAttribute(`href`)) {
      let t = e.location.href,
        n = t.indexOf(`#`);
      r = n === -1 ? t : t.slice(0, n);
    }
    return r + `#` + (typeof t == `string` ? t : te(t));
  }
  function r(e, t) {
    C(
      e.pathname.charAt(0) === `/`,
      `relative pathnames are not supported in hash history.push(${JSON.stringify(t)})`,
    );
  }
  return re(t, n, r, e);
}
function S(e, t) {
  if (e === !1 || e == null) throw Error(t);
}
function C(e, t) {
  if (!e) {
    typeof console < `u` && console.warn(t);
    try {
      throw Error(t);
    } catch {}
  }
}
function w() {
  return Math.random().toString(36).substring(2, 10);
}
function T(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
    masked: e.mask
      ? { pathname: e.pathname, search: e.search, hash: e.hash }
      : void 0,
  };
}
function ee(e, t, n = null, r, i) {
  return {
    pathname: typeof e == `string` ? e : e.pathname,
    search: ``,
    hash: ``,
    ...(typeof t == `string` ? ne(t) : t),
    state: n,
    key: (t && t.key) || r || w(),
    mask: i,
  };
}
function te({ pathname: e = `/`, search: t = ``, hash: n = `` }) {
  return (
    t && t !== `?` && (e += t.charAt(0) === `?` ? t : `?` + t),
    n && n !== `#` && (e += n.charAt(0) === `#` ? n : `#` + n),
    e
  );
}
function ne(e) {
  let t = {};
  if (e) {
    let n = e.indexOf(`#`);
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let r = e.indexOf(`?`);
    (r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))),
      e && (t.pathname = e));
  }
  return t;
}
function re(e, t, n, r = {}) {
  let { window: i = document.defaultView, v5Compat: a = !1 } = r,
    o = i.history,
    s = `POP`,
    c = null,
    l = u();
  l ?? ((l = 0), o.replaceState({ ...o.state, idx: l }, ``));
  function u() {
    return (o.state || { idx: null }).idx;
  }
  function d() {
    s = `POP`;
    let e = u(),
      t = e == null ? null : e - l;
    ((l = e), c && c({ action: s, location: h.location, delta: t }));
  }
  function f(e, t) {
    s = `PUSH`;
    let r = b(e) ? e : ee(h.location, e, t);
    (n && n(r, e), (l = u() + 1));
    let d = T(r, l),
      f = h.createHref(r.mask || r);
    try {
      o.pushState(d, ``, f);
    } catch (e) {
      if (e instanceof DOMException && e.name === `DataCloneError`) throw e;
      i.location.assign(f);
    }
    a && c && c({ action: s, location: h.location, delta: 1 });
  }
  function p(e, t) {
    s = `REPLACE`;
    let r = b(e) ? e : ee(h.location, e, t);
    (n && n(r, e), (l = u()));
    let i = T(r, l),
      d = h.createHref(r.mask || r);
    (o.replaceState(i, ``, d),
      a && c && c({ action: s, location: h.location, delta: 0 }));
  }
  function m(e) {
    return ie(i, e);
  }
  let h = {
    get action() {
      return s;
    },
    get location() {
      return e(i, o);
    },
    listen(e) {
      if (c) throw Error(`A history only accepts one active listener`);
      return (
        i.addEventListener(y, d),
        (c = e),
        () => {
          (i.removeEventListener(y, d), (c = null));
        }
      );
    },
    createHref(e) {
      return t(i, e);
    },
    createURL: m,
    encodeLocation(e) {
      let t = m(e);
      return { pathname: t.pathname, search: t.search, hash: t.hash };
    },
    push: f,
    replace: p,
    go(e) {
      return o.go(e);
    },
  };
  return h;
}
function ie(e, t, n = !1) {
  let r = `http://localhost`;
  (e &&
    (r = e.location.origin === `null` ? e.location.href : e.location.origin),
    S(r, `No window.location.(origin|href) available to create URL`));
  let i = typeof t == `string` ? t : te(t);
  return (
    (i = i.replace(/ $/, `%20`)),
    !n && _.test(i) && (i = r + i),
    new URL(i, r)
  );
}
function ae(e, t, n = `/`) {
  return oe(e, t, n, !1);
}
function oe(e, t, n, r, i) {
  let a = Se((typeof t == `string` ? ne(t) : t).pathname || `/`, n);
  if (a == null) return null;
  let o = i ?? E(e),
    s = null,
    c = xe(a);
  for (let e = 0; s == null && e < o.length; ++e) s = k(o[e], c, r);
  return s;
}
function se(e, t) {
  let { route: n, pathname: r, params: i } = e;
  return {
    id: n.id,
    pathname: r,
    params: i,
    data: t[n.id],
    loaderData: t[n.id],
    handle: n.handle,
  };
}
function E(e) {
  let t = ce(e);
  return (ue(t), t);
}
function ce(e, t = [], n = [], r = ``, i = !1) {
  let a = (e, a, o = i, s) => {
    let c = {
      relativePath: s === void 0 ? e.path || `` : s,
      caseSensitive: e.caseSensitive === !0,
      childrenIndex: a,
      route: e,
    };
    if (c.relativePath.startsWith(`/`)) {
      if (!c.relativePath.startsWith(r) && o) return;
      (S(
        c.relativePath.startsWith(r),
        `Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (c.relativePath = c.relativePath.slice(r.length)));
    }
    let l = Ae([r, c.relativePath]),
      u = n.concat(c);
    (e.children &&
      e.children.length > 0 &&
      (S(
        e.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${l}".`,
      ),
      ce(e.children, t, u, l, o)),
      !(e.path == null && !e.index) &&
        t.push({
          path: l,
          score: O(l, e.index),
          routesMeta: u.map((e, t) => {
            let [n, r] = be(
              e.relativePath,
              e.caseSensitive,
              t === u.length - 1,
            );
            return { ...e, matcher: n, compiledParams: r };
          }),
        }));
  };
  return (
    e.forEach((e, t) => {
      if (e.path === `` || !e.path?.includes(`?`)) a(e, t);
      else for (let n of le(e.path)) a(e, t, !0, n);
    }),
    t
  );
}
function le(e) {
  let t = e.split(`/`);
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith(`?`),
    a = n.replace(/\?$/, ``);
  if (r.length === 0) return i ? [a, ``] : [a];
  let o = le(r.join(`/`)),
    s = [];
  return (
    s.push(...o.map((e) => (e === `` ? a : [a, e].join(`/`)))),
    i && s.push(...o),
    s.map((t) => (e.startsWith(`/`) && t === `` ? `/` : t))
  );
}
function ue(e) {
  e.sort((e, t) =>
    e.score === t.score
      ? _e(
          e.routesMeta.map((e) => e.childrenIndex),
          t.routesMeta.map((e) => e.childrenIndex),
        )
      : t.score - e.score,
  );
}
var D = /^:[\w-]+$/,
  de = 3,
  fe = 2,
  pe = 1,
  me = 10,
  he = -2,
  ge = (e) => e === `*`;
function O(e, t) {
  let n = e.split(`/`),
    r = n.length;
  return (
    n.some(ge) && (r += he),
    t && (r += fe),
    n
      .filter((e) => !ge(e))
      .reduce((e, t) => e + (D.test(t) ? de : t === `` ? pe : me), r)
  );
}
function _e(e, t) {
  return e.length === t.length && e.slice(0, -1).every((e, n) => e === t[n])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function k(e, t, n = !1) {
  let { routesMeta: r } = e,
    i = {},
    a = `/`,
    o = [];
  for (let e = 0; e < r.length; ++e) {
    let s = r[e],
      c = e === r.length - 1,
      l = a === `/` ? t : t.slice(a.length) || `/`,
      u = { path: s.relativePath, caseSensitive: s.caseSensitive, end: c },
      d =
        s.matcher && s.compiledParams
          ? ye(u, l, s.matcher, s.compiledParams)
          : ve(u, l),
      f = s.route;
    if (
      (!d &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (d = ve(
          { path: s.relativePath, caseSensitive: s.caseSensitive, end: !1 },
          l,
        )),
      !d)
    )
      return null;
    (Object.assign(i, d.params),
      o.push({
        params: i,
        pathname: Ae([a, d.pathname]),
        pathnameBase: Me(Ae([a, d.pathnameBase])),
        route: f,
      }),
      d.pathnameBase !== `/` && (a = Ae([a, d.pathnameBase])));
  }
  return o;
}
function ve(e, t) {
  typeof e == `string` && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = be(e.path, e.caseSensitive, e.end);
  return ye(e, t, n, r);
}
function ye(e, t, n, r) {
  let i = t.match(n);
  if (!i) return null;
  let a = i[0],
    o = a.replace(/(.)\/+$/, `$1`),
    s = i.slice(1);
  return {
    params: r.reduce((e, { paramName: t, isOptional: n }, r) => {
      if (t === `*`) {
        let e = s[r] || ``;
        o = a.slice(0, a.length - e.length).replace(/(.)\/+$/, `$1`);
      }
      let i = s[r];
      return (
        n && !i ? (e[t] = void 0) : (e[t] = (i || ``).replace(/%2F/g, `/`)),
        e
      );
    }, {}),
    pathname: a,
    pathnameBase: o,
    pattern: e,
  };
}
function be(e, t = !1, n = !0) {
  C(
    e === `*` || !e.endsWith(`*`) || e.endsWith(`/*`),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, `/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, `/*`)}".`,
  );
  let r = [],
    i =
      `^` +
      e
        .replace(/\/*\*?$/, ``)
        .replace(/^\/*/, `/`)
        .replace(/[\\.*+^${}|()[\]]/g, `\\$&`)
        .replace(/\/:([\w-]+)(\?)?/g, (e, t, n, i, a) => {
          if ((r.push({ paramName: t, isOptional: n != null }), n)) {
            let t = a.charAt(i + e.length);
            return t && t !== `/` ? `/([^\\/]*)` : `(?:/([^\\/]*))?`;
          }
          return `/([^\\/]+)`;
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, `(/$1)?$2`);
  return (
    e.endsWith(`*`)
      ? (r.push({ paramName: `*` }),
        (i += e === `*` || e === `/*` ? `(.*)$` : `(?:\\/(.+)|\\/*)$`))
      : n
        ? (i += `\\/*$`)
        : e !== `` && e !== `/` && (i += `(?:(?=\\/|$))`),
    [new RegExp(i, t ? void 0 : `i`), r]
  );
}
function xe(e) {
  try {
    return e
      .split(`/`)
      .map((e) => decodeURIComponent(e).replace(/\//g, `%2F`))
      .join(`/`);
  } catch (t) {
    return (
      C(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    );
  }
}
function Se(e, t) {
  if (t === `/`) return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith(`/`) ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== `/` ? null : e.slice(n) || `/`;
}
function Ce(e, t = `/`) {
  let {
      pathname: n,
      search: r = ``,
      hash: i = ``,
    } = typeof e == `string` ? ne(e) : e,
    a;
  return (
    n
      ? ((n = ke(n)),
        (a = n.startsWith(`/`) ? we(n.substring(1), `/`) : we(n, t)))
      : (a = t),
    { pathname: a, search: Ne(r), hash: Pe(i) }
  );
}
function we(e, t) {
  let n = je(t).split(`/`);
  return (
    e.split(`/`).forEach((e) => {
      e === `..` ? n.length > 1 && n.pop() : e !== `.` && n.push(e);
    }),
    n.length > 1 ? n.join(`/`) : `/`
  );
}
function Te(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Ee(e) {
  return e.filter(
    (e, t) => t === 0 || (e.route.path && e.route.path.length > 0),
  );
}
function De(e) {
  let t = Ee(e);
  return t.map((e, n) => (n === t.length - 1 ? e.pathname : e.pathnameBase));
}
function Oe(e, t, n, r = !1) {
  let i;
  typeof e == `string`
    ? (i = ne(e))
    : ((i = { ...e }),
      S(
        !i.pathname || !i.pathname.includes(`?`),
        Te(`?`, `pathname`, `search`, i),
      ),
      S(
        !i.pathname || !i.pathname.includes(`#`),
        Te(`#`, `pathname`, `hash`, i),
      ),
      S(!i.search || !i.search.includes(`#`), Te(`#`, `search`, `hash`, i)));
  let a = e === `` || i.pathname === ``,
    o = a ? `/` : i.pathname,
    s;
  if (o == null) s = n;
  else {
    let e = t.length - 1;
    if (!r && o.startsWith(`..`)) {
      let t = o.split(`/`);
      for (; t[0] === `..`; ) (t.shift(), --e);
      i.pathname = t.join(`/`);
    }
    s = e >= 0 ? t[e] : `/`;
  }
  let c = Ce(i, s),
    l = o && o !== `/` && o.endsWith(`/`),
    u = (a || o === `.`) && n.endsWith(`/`);
  return (!c.pathname.endsWith(`/`) && (l || u) && (c.pathname += `/`), c);
}
var ke = (e) => e.replace(/[\\/]{2,}/g, `/`),
  Ae = (e) => ke(e.join(`/`)),
  je = (e) => e.replace(/\/+$/, ``),
  Me = (e) => je(e).replace(/^\/*/, `/`),
  Ne = (e) => (!e || e === `?` ? `` : e.startsWith(`?`) ? e : `?` + e),
  Pe = (e) => (!e || e === `#` ? `` : e.startsWith(`#`) ? e : `#` + e),
  Fe = class {
    constructor(e, t, n, r = !1) {
      ((this.status = e),
        (this.statusText = t || ``),
        (this.internal = r),
        n instanceof Error
          ? ((this.data = n.toString()), (this.error = n))
          : (this.data = n));
    }
  };
function Ie(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.internal == `boolean` &&
    `data` in e
  );
}
function Le(e) {
  return Ae(e.map((e) => e.route.path).filter(Boolean)) || `/`;
}
var Re =
  typeof window < `u` &&
  window.document !== void 0 &&
  window.document.createElement !== void 0;
function ze(e, t) {
  let n = e;
  if (typeof n != `string` || !g.test(n))
    return { absoluteURL: void 0, isExternal: !1, to: n };
  let r = n,
    i = !1;
  if (Re)
    try {
      let e = new URL(window.location.href),
        r = _.test(n) ? new URL(v(n, e.protocol)) : new URL(n),
        a = Se(r.pathname, t);
      r.origin === e.origin && a != null
        ? (n = a + r.search + r.hash)
        : (i = !0);
    } catch {
      C(
        !1,
        `<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: r, isExternal: i, to: n };
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
var Be = [`POST`, `PUT`, `PATCH`, `DELETE`];
new Set(Be);
var A = [`GET`, ...Be];
new Set(A);
var Ve = [
  `about:`,
  `blob:`,
  `chrome:`,
  `chrome-untrusted:`,
  `content:`,
  `data:`,
  `devtools:`,
  `file:`,
  `filesystem:`,
  `javascript:`,
];
function He(e) {
  try {
    return Ve.includes(new URL(e).protocol);
  } catch {
    return !1;
  }
}
var Ue = d.createContext(null);
Ue.displayName = `DataRouter`;
var j = d.createContext(null);
j.displayName = `DataRouterState`;
var We = d.createContext(!1);
function Ge() {
  return d.useContext(We);
}
var Ke = d.createContext({ isTransitioning: !1 });
Ke.displayName = `ViewTransition`;
var qe = d.createContext(new Map());
qe.displayName = `Fetchers`;
var Je = d.createContext(null);
Je.displayName = `Await`;
var Ye = d.createContext(null);
Ye.displayName = `Navigation`;
var Xe = d.createContext(null);
Xe.displayName = `Location`;
var Ze = d.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Ze.displayName = `Route`;
var Qe = d.createContext(null);
Qe.displayName = `RouteError`;
var $e = `REACT_ROUTER_ERROR`,
  et = `REDIRECT`,
  M = `ROUTE_ERROR_RESPONSE`;
function tt(e) {
  if (e.startsWith(`${$e}:${et}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (
        typeof t == `object` &&
        t &&
        typeof t.status == `number` &&
        typeof t.statusText == `string` &&
        typeof t.location == `string` &&
        typeof t.reloadDocument == `boolean` &&
        typeof t.replace == `boolean`
      )
        return t;
    } catch {}
}
function nt(e) {
  if (e.startsWith(`${$e}:${M}:{`))
    try {
      let t = JSON.parse(e.slice(40));
      if (
        typeof t == `object` &&
        t &&
        typeof t.status == `number` &&
        typeof t.statusText == `string`
      )
        return new Fe(t.status, t.statusText, t.data);
    } catch {}
}
function rt(e, { relative: t } = {}) {
  S(it(), `useHref() may be used only in the context of a <Router> component.`);
  let { basename: n, navigator: r } = d.useContext(Ye),
    { hash: i, pathname: a, search: o } = ut(e, { relative: t }),
    s = a;
  return (
    n !== `/` && (s = a === `/` ? n : Ae([n, a])),
    r.createHref({ pathname: s, search: o, hash: i })
  );
}
function it() {
  return d.useContext(Xe) != null;
}
function at() {
  return (
    S(
      it(),
      `useLocation() may be used only in the context of a <Router> component.`,
    ),
    d.useContext(Xe).location
  );
}
var ot = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function st(e) {
  d.useContext(Ye).static || d.useLayoutEffect(e);
}
function ct() {
  let { isDataRoute: e } = d.useContext(Ze);
  return e ? F() : lt();
}
function lt() {
  S(
    it(),
    `useNavigate() may be used only in the context of a <Router> component.`,
  );
  let e = d.useContext(Ue),
    { basename: t, navigator: n } = d.useContext(Ye),
    { matches: r } = d.useContext(Ze),
    { pathname: i } = at(),
    a = JSON.stringify(De(r)),
    o = d.useRef(!1);
  return (
    st(() => {
      o.current = !0;
    }),
    d.useCallback(
      (r, s = {}) => {
        if ((C(o.current, ot), !o.current)) return;
        if (typeof r == `number`) {
          n.go(r);
          return;
        }
        let c = Oe(r, JSON.parse(a), i, s.relative === `path`);
        (e == null &&
          t !== `/` &&
          (c.pathname = c.pathname === `/` ? t : Ae([t, c.pathname])),
          (s.replace ? n.replace : n.push)(c, s.state, s));
      },
      [t, n, a, i, e],
    )
  );
}
d.createContext(null);
function ut(e, { relative: t } = {}) {
  let { matches: n } = d.useContext(Ze),
    { pathname: r } = at(),
    i = JSON.stringify(De(n));
  return d.useMemo(() => Oe(e, JSON.parse(i), r, t === `path`), [e, i, r, t]);
}
function dt(e, t, n) {
  S(
    it(),
    `useRoutes() may be used only in the context of a <Router> component.`,
  );
  let { navigator: r } = d.useContext(Ye),
    { matches: i } = d.useContext(Ze),
    a = i[i.length - 1],
    o = a ? a.params : {},
    s = a ? a.pathname : `/`,
    c = a ? a.pathnameBase : `/`,
    l = a && a.route;
  {
    let e = (l && l.path) || ``;
    Dt(
      s,
      !l || e.endsWith(`*`) || e.endsWith(`*?`),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e === `/` ? `*` : `${e}/*`}">.`,
    );
  }
  let u = at(),
    f;
  if (t) {
    let e = typeof t == `string` ? ne(t) : t;
    (S(
      c === `/` || e.pathname?.startsWith(c),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`,
    ),
      (f = e));
  } else f = u;
  let p = f.pathname || `/`,
    m = p;
  if (c !== `/`) {
    let e = c.replace(/^\//, ``).split(`/`);
    m = `/` + p.replace(/^\//, ``).split(`/`).slice(e.length).join(`/`);
  }
  let h =
    n && n.state.matches.length
      ? n.state.matches.map((e) =>
          Object.assign(e, { route: n.manifest[e.route.id] || e.route }),
        )
      : ae(e, { pathname: m });
  (C(
    l || h != null,
    `No routes matched location "${f.pathname}${f.search}${f.hash}" `,
  ),
    C(
      h == null ||
        h[h.length - 1].route.element !== void 0 ||
        h[h.length - 1].route.Component !== void 0 ||
        h[h.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${f.pathname}${f.search}${f.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let g = _t(
    h &&
      h.map((e) =>
        Object.assign({}, e, {
          params: Object.assign({}, o, e.params),
          pathname: Ae([
            c,
            r.encodeLocation
              ? r.encodeLocation(
                  e.pathname
                    .replace(/%/g, `%25`)
                    .replace(/\?/g, `%3F`)
                    .replace(/#/g, `%23`),
                ).pathname
              : e.pathname,
          ]),
          pathnameBase:
            e.pathnameBase === `/`
              ? c
              : Ae([
                  c,
                  r.encodeLocation
                    ? r.encodeLocation(
                        e.pathnameBase
                          .replace(/%/g, `%25`)
                          .replace(/\?/g, `%3F`)
                          .replace(/#/g, `%23`),
                      ).pathname
                    : e.pathnameBase,
                ]),
        }),
      ),
    i,
    n,
  );
  return t && g
    ? d.createElement(
        Xe.Provider,
        {
          value: {
            location: {
              pathname: `/`,
              search: ``,
              hash: ``,
              state: null,
              key: `default`,
              mask: void 0,
              ...f,
            },
            navigationType: `POP`,
          },
        },
        g,
      )
    : g;
}
function ft() {
  let e = Tt(),
    t = Ie(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    r = `rgba(200,200,200, 0.5)`,
    i = { padding: `0.5rem`, backgroundColor: r },
    a = { padding: `2px 4px`, backgroundColor: r },
    o = null;
  return (
    console.error(`Error handled by React Router default ErrorBoundary:`, e),
    (o = d.createElement(
      d.Fragment,
      null,
      d.createElement(`p`, null, `💿 Hey developer 👋`),
      d.createElement(
        `p`,
        null,
        `You can provide a way better UX than this when your app throws errors by providing your own `,
        d.createElement(`code`, { style: a }, `ErrorBoundary`),
        ` or`,
        ` `,
        d.createElement(`code`, { style: a }, `errorElement`),
        ` prop on your route.`,
      ),
    )),
    d.createElement(
      d.Fragment,
      null,
      d.createElement(`h2`, null, `Unexpected Application Error!`),
      d.createElement(`h3`, { style: { fontStyle: `italic` } }, t),
      n ? d.createElement(`pre`, { style: i }, n) : null,
      o,
    )
  );
}
var pt = d.createElement(ft, null),
  mt = class extends d.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== `idle` && e.revalidation === `idle`)
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error === void 0 ? t.error : e.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.onError
        ? this.props.onError(e, t)
        : console.error(
            `React Router caught the following error during render`,
            e,
          );
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == `object` &&
        e &&
        `digest` in e &&
        typeof e.digest == `string`
      ) {
        let t = nt(e.digest);
        t && (e = t);
      }
      let t =
        e === void 0
          ? this.props.children
          : d.createElement(
              Ze.Provider,
              { value: this.props.routeContext },
              d.createElement(Qe.Provider, {
                value: e,
                children: this.props.component,
              }),
            );
      return this.context ? d.createElement(gt, { error: e }, t) : t;
    }
  };
mt.contextType = We;
var ht = new WeakMap();
function gt({ children: e, error: t }) {
  let { basename: n } = d.useContext(Ye);
  if (
    typeof t == `object` &&
    t &&
    `digest` in t &&
    typeof t.digest == `string`
  ) {
    let e = tt(t.digest);
    if (e) {
      let r = ht.get(t);
      if (r) throw r;
      let i = ze(e.location, n),
        a = i.absoluteURL || i.to;
      if (He(a)) throw Error(`Invalid redirect location`);
      if (Re && !ht.get(t))
        if (i.isExternal || e.reloadDocument) window.location.href = a;
        else {
          let n = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(i.to, {
              replace: e.replace,
            }),
          );
          throw (ht.set(t, n), n);
        }
      return d.createElement(`meta`, {
        httpEquiv: `refresh`,
        content: `0;url=${a}`,
      });
    }
  }
  return e;
}
function N({ routeContext: e, match: t, children: n }) {
  let r = d.useContext(Ue);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    d.createElement(Ze.Provider, { value: e }, n)
  );
}
function _t(e, t = [], n) {
  let r = n?.state;
  if (e == null) {
    if (!r) return null;
    if (r.errors) e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else return null;
  }
  let i = e,
    a = r?.errors;
  if (a != null) {
    let e = i.findIndex((e) => e.route.id && a?.[e.route.id] !== void 0);
    (S(
      e >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`,
    ),
      (i = i.slice(0, Math.min(i.length, e + 1))));
  }
  let o = !1,
    s = -1;
  if (n && r) {
    o = r.renderFallback;
    for (let e = 0; e < i.length; e++) {
      let t = i[e];
      if (
        ((t.route.HydrateFallback || t.route.hydrateFallbackElement) && (s = e),
        t.route.id)
      ) {
        let { loaderData: e, errors: a } = r,
          c =
            t.route.loader &&
            !e.hasOwnProperty(t.route.id) &&
            (!a || a[t.route.id] === void 0);
        if (t.route.lazy || c) {
          (n.isStatic && (o = !0), (i = s >= 0 ? i.slice(0, s + 1) : [i[0]]));
          break;
        }
      }
    }
  }
  let c = n?.onError,
    l =
      r && c
        ? (e, t) => {
            c(e, {
              location: r.location,
              params: r.matches?.[0]?.params ?? {},
              pattern: Le(r.matches),
              errorInfo: t,
            });
          }
        : void 0;
  return i.reduceRight((e, n, c) => {
    let u,
      f = !1,
      p = null,
      m = null;
    r &&
      ((u = a && n.route.id ? a[n.route.id] : void 0),
      (p = n.route.errorElement || pt),
      o &&
        (s < 0 && c === 0
          ? (Dt(
              `route-fallback`,
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (f = !0),
            (m = null))
          : s === c &&
            ((f = !0), (m = n.route.hydrateFallbackElement || null))));
    let h = t.concat(i.slice(0, c + 1)),
      g = () => {
        let t;
        return (
          (t = u
            ? p
            : f
              ? m
              : n.route.Component
                ? d.createElement(n.route.Component, null)
                : n.route.element
                  ? n.route.element
                  : e),
          d.createElement(N, {
            match: n,
            routeContext: { outlet: e, matches: h, isDataRoute: r != null },
            children: t,
          })
        );
      };
    return r && (n.route.ErrorBoundary || n.route.errorElement || c === 0)
      ? d.createElement(mt, {
          location: r.location,
          revalidation: r.revalidation,
          component: p,
          error: u,
          children: g(),
          routeContext: { outlet: null, matches: h, isDataRoute: !0 },
          onError: l,
        })
      : g();
  }, null);
}
function vt(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function yt(e) {
  let t = d.useContext(Ue);
  return (S(t, vt(e)), t);
}
function bt(e) {
  let t = d.useContext(j);
  return (S(t, vt(e)), t);
}
function P(e) {
  let t = d.useContext(Ze);
  return (S(t, vt(e)), t);
}
function xt(e) {
  let t = P(e),
    n = t.matches[t.matches.length - 1];
  return (
    S(n.route.id, `${e} can only be used on routes that contain a unique "id"`),
    n.route.id
  );
}
function St() {
  return xt(`useRouteId`);
}
function Ct() {
  let e = bt(`useNavigation`);
  return d.useMemo(() => {
    let { matches: t, historyAction: n, ...r } = e.navigation;
    return r;
  }, [e.navigation]);
}
function wt() {
  let { matches: e, loaderData: t } = bt(`useMatches`);
  return d.useMemo(() => e.map((e) => se(e, t)), [e, t]);
}
function Tt() {
  let e = d.useContext(Qe),
    t = bt(`useRouteError`),
    n = xt(`useRouteError`);
  return e === void 0 ? t.errors?.[n] : e;
}
function F() {
  let { router: e } = yt(`useNavigate`),
    t = xt(`useNavigate`),
    n = d.useRef(!1);
  return (
    st(() => {
      n.current = !0;
    }),
    d.useCallback(
      async (r, i = {}) => {
        (C(n.current, ot),
          n.current &&
            (typeof r == `number`
              ? await e.navigate(r)
              : await e.navigate(r, { fromRouteId: t, ...i })));
      },
      [e, t],
    )
  );
}
var Et = {};
function Dt(e, t, n) {
  !t && !Et[e] && ((Et[e] = !0), C(!1, n));
}
d.memo(Ot);
function Ot({
  routes: e,
  manifest: t,
  future: n,
  state: r,
  isStatic: i,
  onError: a,
}) {
  return dt(e, void 0, {
    manifest: t,
    state: r,
    isStatic: i,
    onError: a,
    future: n,
  });
}
function kt({
  basename: e = `/`,
  children: t = null,
  location: n,
  navigationType: r = `POP`,
  navigator: i,
  static: a = !1,
  useTransitions: o,
}) {
  S(
    !it(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`,
  );
  let s = e.replace(/^\/*/, `/`),
    c = d.useMemo(
      () => ({
        basename: s,
        navigator: i,
        static: a,
        useTransitions: o,
        future: {},
      }),
      [s, i, a, o],
    );
  typeof n == `string` && (n = ne(n));
  let {
      pathname: l = `/`,
      search: u = ``,
      hash: f = ``,
      state: p = null,
      key: m = `default`,
      mask: h,
    } = n,
    g = d.useMemo(() => {
      let e = Se(l, s);
      return e == null
        ? null
        : {
            location: {
              pathname: e,
              search: u,
              hash: f,
              state: p,
              key: m,
              mask: h,
            },
            navigationType: r,
          };
    }, [s, l, u, f, p, m, r, h]);
  return (
    C(
      g != null,
      `<Router basename="${s}"> is not able to match the URL "${l}${u}${f}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    g == null
      ? null
      : d.createElement(
          Ye.Provider,
          { value: c },
          d.createElement(Xe.Provider, { children: t, value: g }),
        )
  );
}
d.Component;
var At = `get`,
  jt = `application/x-www-form-urlencoded`;
function Mt(e) {
  return typeof HTMLElement < `u` && e instanceof HTMLElement;
}
function I(e) {
  return Mt(e) && e.tagName.toLowerCase() === `button`;
}
function Nt(e) {
  return Mt(e) && e.tagName.toLowerCase() === `form`;
}
function Pt(e) {
  return Mt(e) && e.tagName.toLowerCase() === `input`;
}
function Ft(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function It(e, t) {
  return e.button === 0 && (!t || t === `_self`) && !Ft(e);
}
var Lt = null;
function Rt() {
  if (Lt === null)
    try {
      (new FormData(document.createElement(`form`), 0), (Lt = !1));
    } catch {
      Lt = !0;
    }
  return Lt;
}
var zt = new Set([
  `application/x-www-form-urlencoded`,
  `multipart/form-data`,
  `text/plain`,
]);
function Bt(e) {
  return e != null && !zt.has(e)
    ? (C(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${jt}"`,
      ),
      null)
    : e;
}
function Vt(e, t) {
  let n, r, i, a, o;
  if (Nt(e)) {
    let o = e.getAttribute(`action`);
    ((r = o ? Se(o, t) : null),
      (n = e.getAttribute(`method`) || At),
      (i = Bt(e.getAttribute(`enctype`)) || jt),
      (a = new FormData(e)));
  } else if (I(e) || (Pt(e) && (e.type === `submit` || e.type === `image`))) {
    let o = e.form;
    if (o == null)
      throw Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`,
      );
    let s = e.getAttribute(`formaction`) || o.getAttribute(`action`);
    if (
      ((r = s ? Se(s, t) : null),
      (n = e.getAttribute(`formmethod`) || o.getAttribute(`method`) || At),
      (i =
        Bt(e.getAttribute(`formenctype`)) ||
        Bt(o.getAttribute(`enctype`)) ||
        jt),
      (a = new FormData(o, e)),
      !Rt())
    ) {
      let { name: t, type: n, value: r } = e;
      if (n === `image`) {
        let e = t ? `${t}.` : ``;
        (a.append(`${e}x`, `0`), a.append(`${e}y`, `0`));
      } else t && a.append(t, r);
    }
  } else if (Mt(e))
    throw Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`,
    );
  else ((n = At), (r = null), (i = jt), (o = e));
  return (
    a && i === `text/plain` && ((o = a), (a = void 0)),
    { action: r, method: n.toLowerCase(), encType: i, formData: a, body: o }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
var Ht = {
    "&": `\\u0026`,
    ">": `\\u003e`,
    "<": `\\u003c`,
    "\u2028": `\\u2028`,
    "\u2029": `\\u2029`,
  },
  L = /[&><\u2028\u2029]/g;
function R(e) {
  return e.replace(L, (e) => Ht[e]);
}
function Ut(e, t) {
  if (e === !1 || e == null) throw Error(t);
}
function Wt(e, t, n, r) {
  let i =
    typeof e == `string`
      ? new URL(
          e,
          typeof window > `u`
            ? `server://singlefetch/`
            : window.location.origin,
        )
      : e;
  return (
    n
      ? i.pathname.endsWith(`/`)
        ? (i.pathname = `${i.pathname}_.${r}`)
        : (i.pathname = `${i.pathname}.${r}`)
      : i.pathname === `/`
        ? (i.pathname = `_root.${r}`)
        : t && Se(i.pathname, t) === `/`
          ? (i.pathname = `${je(t)}/_root.${r}`)
          : (i.pathname = `${je(i.pathname)}.${r}`),
    i
  );
}
async function Gt(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await h(() => import(e.module), [], import.meta.url);
    return ((t[e.id] = n), n);
  } catch (t) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(t),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Kt(e) {
  return e != null && typeof e.page == `string`;
}
function qt(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === `preload` &&
        typeof e.imageSrcSet == `string` &&
        typeof e.imageSizes == `string`
      : typeof e.rel == `string` && typeof e.href == `string`;
}
async function Jt(e, t, n) {
  return Qt(
    (
      await Promise.all(
        e.map(async (e) => {
          let r = t.routes[e.route.id];
          if (r) {
            let e = await Gt(r, n);
            return e.links ? e.links() : [];
          }
          return [];
        }),
      )
    )
      .flat(1)
      .filter(qt)
      .filter((e) => e.rel === `stylesheet` || e.rel === `preload`)
      .map((e) =>
        e.rel === `stylesheet`
          ? { ...e, rel: `prefetch`, as: `style` }
          : { ...e, rel: `prefetch` },
      ),
  );
}
function Yt(e, t, n, r, i, a) {
  let o = (e, t) => !n[t] || e.route.id !== n[t].route.id,
    s = (e, t) =>
      n[t].pathname !== e.pathname ||
      (n[t].route.path?.endsWith(`*`) && n[t].params[`*`] !== e.params[`*`]);
  return a === `assets`
    ? t.filter((e, t) => o(e, t) || s(e, t))
    : a === `data`
      ? t.filter((t, a) => {
          let c = r.routes[t.route.id];
          if (!c || !c.hasLoader) return !1;
          if (o(t, a) || s(t, a)) return !0;
          if (t.route.shouldRevalidate) {
            let r = t.route.shouldRevalidate({
              currentUrl: new URL(
                i.pathname + i.search + i.hash,
                window.origin,
              ),
              currentParams: n[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: t.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof r == `boolean`) return r;
          }
          return !0;
        })
      : [];
}
function Xt(e, t, { includeHydrateFallback: n } = {}) {
  return z(
    e
      .map((e) => {
        let r = t.routes[e.route.id];
        if (!r) return [];
        let i = [r.module];
        return (
          r.clientActionModule && (i = i.concat(r.clientActionModule)),
          r.clientLoaderModule && (i = i.concat(r.clientLoaderModule)),
          n &&
            r.hydrateFallbackModule &&
            (i = i.concat(r.hydrateFallbackModule)),
          r.imports && (i = i.concat(r.imports)),
          i
        );
      })
      .flat(1),
  );
}
function z(e) {
  return [...new Set(e)];
}
function Zt(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let r of n) t[r] = e[r];
  return t;
}
function Qt(e, t) {
  let n = new Set(),
    r = new Set(t);
  return e.reduce((e, i) => {
    if (t && !Kt(i) && i.as === `script` && i.href && r.has(i.href)) return e;
    let a = JSON.stringify(Zt(i));
    return (n.has(a) || (n.add(a), e.push({ key: a, link: i })), e);
  }, []);
}
function $t() {
  let e = d.useContext(Ue);
  return (
    Ut(
      e,
      `You must render this element inside a <DataRouterContext.Provider> element`,
    ),
    e
  );
}
function en() {
  let e = d.useContext(j);
  return (
    Ut(
      e,
      `You must render this element inside a <DataRouterStateContext.Provider> element`,
    ),
    e
  );
}
var tn = d.createContext(void 0);
tn.displayName = `FrameworkContext`;
function nn() {
  let e = d.useContext(tn);
  return (
    Ut(e, `You must render this element inside a <HydratedRouter> element`),
    e
  );
}
function rn(e, t) {
  let n = d.useContext(tn),
    [r, i] = d.useState(!1),
    [a, o] = d.useState(!1),
    {
      onFocus: s,
      onBlur: c,
      onMouseEnter: l,
      onMouseLeave: u,
      onTouchStart: f,
    } = t,
    p = d.useRef(null);
  (d.useEffect(() => {
    if ((e === `render` && o(!0), e === `viewport`)) {
      let e = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            o(e.isIntersecting);
          });
        },
        { threshold: 0.5 },
      );
      return (
        p.current && e.observe(p.current),
        () => {
          e.disconnect();
        }
      );
    }
  }, [e]),
    d.useEffect(() => {
      if (r) {
        let e = setTimeout(() => {
          o(!0);
        }, 100);
        return () => {
          clearTimeout(e);
        };
      }
    }, [r]));
  let m = () => {
      i(!0);
    },
    h = () => {
      (i(!1), o(!1));
    };
  return n
    ? e === `intent`
      ? [
          a,
          p,
          {
            onFocus: an(s, m),
            onBlur: an(c, h),
            onMouseEnter: an(l, m),
            onMouseLeave: an(u, h),
            onTouchStart: an(f, m),
          },
        ]
      : [a, p, {}]
    : [!1, p, {}];
}
function an(e, t) {
  return (n) => {
    (e && e(n), n.defaultPrevented || t(n));
  };
}
function on({ page: e, ...t }) {
  let n = Ge(),
    { nonce: r } = nn(),
    { router: i } = $t(),
    a = d.useMemo(() => ae(i.routes, e, i.basename), [i.routes, e, i.basename]);
  return a
    ? (t.nonce == null && r && (t = { ...t, nonce: r }),
      n
        ? d.createElement(cn, { page: e, matches: a, ...t })
        : d.createElement(ln, { page: e, matches: a, ...t }))
    : null;
}
function sn(e) {
  let { manifest: t, routeModules: n } = nn(),
    [r, i] = d.useState([]);
  return (
    d.useEffect(() => {
      let r = !1;
      return (
        Jt(e, t, n).then((e) => {
          r || i(e);
        }),
        () => {
          r = !0;
        }
      );
    }, [e, t, n]),
    r
  );
}
function cn({ page: e, matches: t, ...n }) {
  let r = at(),
    { future: i } = nn(),
    { basename: a } = $t(),
    o = d.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let n = Wt(e, a, i.v8_trailingSlashAwareDataRequests, `rsc`),
        o = !1,
        s = [];
      for (let e of t)
        typeof e.route.shouldRevalidate == `function`
          ? (o = !0)
          : s.push(e.route.id);
      return (
        o && s.length > 0 && n.searchParams.set(`_routes`, s.join(`,`)),
        [n.pathname + n.search]
      );
    }, [a, i.v8_trailingSlashAwareDataRequests, e, r, t]);
  return d.createElement(
    d.Fragment,
    null,
    o.map((e) =>
      d.createElement(`link`, {
        key: e,
        rel: `prefetch`,
        as: `fetch`,
        href: e,
        ...n,
      }),
    ),
  );
}
function ln({ page: e, matches: t, ...n }) {
  let r = at(),
    { future: i, manifest: a, routeModules: o } = nn(),
    { basename: s } = $t(),
    { loaderData: c, matches: l } = en(),
    u = d.useMemo(() => Yt(e, t, l, a, r, `data`), [e, t, l, a, r]),
    f = d.useMemo(() => Yt(e, t, l, a, r, `assets`), [e, t, l, a, r]),
    p = d.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let n = new Set(),
        l = !1;
      if (
        (t.forEach((e) => {
          let t = a.routes[e.route.id];
          !t ||
            !t.hasLoader ||
            ((!u.some((t) => t.route.id === e.route.id) &&
              e.route.id in c &&
              o[e.route.id]?.shouldRevalidate) ||
            t.hasClientLoader
              ? (l = !0)
              : n.add(e.route.id));
        }),
        n.size === 0)
      )
        return [];
      let d = Wt(e, s, i.v8_trailingSlashAwareDataRequests, `data`);
      return (
        l &&
          n.size > 0 &&
          d.searchParams.set(
            `_routes`,
            t
              .filter((e) => n.has(e.route.id))
              .map((e) => e.route.id)
              .join(`,`),
          ),
        [d.pathname + d.search]
      );
    }, [s, i.v8_trailingSlashAwareDataRequests, c, r, a, u, t, e, o]),
    m = d.useMemo(() => Xt(f, a), [f, a]),
    h = sn(f);
  return d.createElement(
    d.Fragment,
    null,
    p.map((e) =>
      d.createElement(`link`, {
        key: e,
        rel: `prefetch`,
        as: `fetch`,
        href: e,
        ...n,
      }),
    ),
    m.map((e) =>
      d.createElement(`link`, { key: e, rel: `modulepreload`, href: e, ...n }),
    ),
    h.map(({ key: e, link: t }) =>
      d.createElement(`link`, {
        key: e,
        nonce: n.nonce,
        ...t,
        crossOrigin: t.crossOrigin ?? n.crossOrigin,
      }),
    ),
  );
}
function un(...e) {
  return (t) => {
    e.forEach((e) => {
      typeof e == `function` ? e(t) : e != null && (e.current = t);
    });
  };
}
d.Component;
var dn =
  typeof window < `u` &&
  window.document !== void 0 &&
  window.document.createElement !== void 0;
try {
  dn && (window.__reactRouterVersion = `7.18.1`);
} catch {}
function fn({ basename: e, children: t, useTransitions: n, window: r }) {
  let i = d.useRef();
  i.current ??= x({ window: r, v5Compat: !0 });
  let a = i.current,
    [o, s] = d.useState({ action: a.action, location: a.location }),
    c = d.useCallback(
      (e) => {
        n === !1 ? s(e) : d.startTransition(() => s(e));
      },
      [n],
    );
  return (
    d.useLayoutEffect(() => a.listen(c), [a, c]),
    d.createElement(kt, {
      basename: e,
      children: t,
      location: o.location,
      navigationType: o.action,
      navigator: a,
      useTransitions: n,
    })
  );
}
function pn({ basename: e, children: t, history: n, useTransitions: r }) {
  let [i, a] = d.useState({ action: n.action, location: n.location }),
    o = d.useCallback(
      (e) => {
        r === !1 ? a(e) : d.startTransition(() => a(e));
      },
      [r],
    );
  return (
    d.useLayoutEffect(() => n.listen(o), [n, o]),
    d.createElement(kt, {
      basename: e,
      children: t,
      location: i.location,
      navigationType: i.action,
      navigator: n,
      useTransitions: r,
    })
  );
}
pn.displayName = `unstable_HistoryRouter`;
var mn = d.forwardRef(function (
  {
    onClick: e,
    discover: t = `render`,
    prefetch: n = `none`,
    relative: r,
    reloadDocument: i,
    replace: a,
    mask: o,
    state: s,
    target: c,
    to: l,
    preventScrollReset: u,
    viewTransition: f,
    defaultShouldRevalidate: p,
    ...m
  },
  h,
) {
  let { basename: _, navigator: v, useTransitions: y } = d.useContext(Ye),
    b = typeof l == `string` && g.test(l),
    x = ze(l, _);
  l = x.to;
  let S = rt(l, { relative: r }),
    C = at(),
    w = null;
  if (o) {
    let e = Oe(o, [], C.mask ? C.mask.pathname : `/`, !0);
    (_ !== `/` && (e.pathname = e.pathname === `/` ? _ : Ae([_, e.pathname])),
      (w = v.createHref(e)));
  }
  let [T, ee, te] = rn(n, m),
    ne = xn(l, {
      replace: a,
      mask: o,
      state: s,
      target: c,
      preventScrollReset: u,
      relative: r,
      viewTransition: f,
      defaultShouldRevalidate: p,
      useTransitions: y,
    });
  function re(t) {
    (e && e(t), t.defaultPrevented || ne(t));
  }
  let ie = !(x.isExternal || i),
    ae = d.createElement(`a`, {
      ...m,
      ...te,
      href: (ie ? w : void 0) || x.absoluteURL || S,
      onClick: ie ? re : e,
      ref: un(h, ee),
      target: c,
      "data-discover": !b && t === `render` ? `true` : void 0,
    });
  return T && !b
    ? d.createElement(d.Fragment, null, ae, d.createElement(on, { page: S }))
    : ae;
});
mn.displayName = `Link`;
var hn = d.forwardRef(function (
  {
    "aria-current": e = `page`,
    caseSensitive: t = !1,
    className: n = ``,
    end: r = !1,
    style: i,
    to: a,
    viewTransition: o,
    children: s,
    ...c
  },
  l,
) {
  let u = ut(a, { relative: c.relative }),
    f = at(),
    p = d.useContext(j),
    { navigator: m, basename: h } = d.useContext(Ye),
    g = p != null && jn(u) && o === !0,
    _ = m.encodeLocation ? m.encodeLocation(u).pathname : u.pathname,
    v = f.pathname,
    y =
      p && p.navigation && p.navigation.location
        ? p.navigation.location.pathname
        : null;
  (t ||
    ((v = v.toLowerCase()),
    (y = y ? y.toLowerCase() : null),
    (_ = _.toLowerCase())),
    y && h && (y = Se(y, h) || y));
  let b = _ !== `/` && _.endsWith(`/`) ? _.length - 1 : _.length,
    x = v === _ || (!r && v.startsWith(_) && v.charAt(b) === `/`),
    S =
      y != null &&
      (y === _ || (!r && y.startsWith(_) && y.charAt(_.length) === `/`)),
    C = { isActive: x, isPending: S, isTransitioning: g },
    w = x ? e : void 0,
    T;
  T =
    typeof n == `function`
      ? n(C)
      : [
          n,
          x ? `active` : null,
          S ? `pending` : null,
          g ? `transitioning` : null,
        ]
          .filter(Boolean)
          .join(` `);
  let ee = typeof i == `function` ? i(C) : i;
  return d.createElement(
    mn,
    {
      ...c,
      "aria-current": w,
      className: T,
      ref: l,
      style: ee,
      to: a,
      viewTransition: o,
    },
    typeof s == `function` ? s(C) : s,
  );
});
hn.displayName = `NavLink`;
var gn = d.forwardRef(
  (
    {
      discover: e = `render`,
      fetcherKey: t,
      navigate: n,
      reloadDocument: r,
      replace: i,
      state: a,
      method: o = At,
      action: s,
      onSubmit: c,
      relative: l,
      preventScrollReset: u,
      viewTransition: f,
      defaultShouldRevalidate: p,
      ...m
    },
    h,
  ) => {
    let { useTransitions: _ } = d.useContext(Ye),
      v = wn(),
      y = Tn(s, { relative: l }),
      b = o.toLowerCase() === `get` ? `get` : `post`,
      x = typeof s == `string` && g.test(s);
    return d.createElement(`form`, {
      ref: h,
      method: b,
      action: y,
      onSubmit: r
        ? c
        : (e) => {
            if ((c && c(e), e.defaultPrevented)) return;
            e.preventDefault();
            let r = e.nativeEvent.submitter,
              s = r?.getAttribute(`formmethod`) || o,
              m = () =>
                v(r || e.currentTarget, {
                  fetcherKey: t,
                  method: s,
                  navigate: n,
                  replace: i,
                  state: a,
                  relative: l,
                  preventScrollReset: u,
                  viewTransition: f,
                  defaultShouldRevalidate: p,
                });
            _ && n !== !1 ? d.startTransition(() => m()) : m();
          },
      ...m,
      "data-discover": !x && e === `render` ? `true` : void 0,
    });
  },
);
gn.displayName = `Form`;
function _n({ getKey: e, storageKey: t, ...n }) {
  let r = d.useContext(tn),
    { basename: i } = d.useContext(Ye),
    a = at(),
    o = wt();
  kn({ getKey: e, storageKey: t });
  let s = d.useMemo(() => {
    if (!r || !e) return null;
    let t = On(a, o, i, e);
    return t === a.key ? null : t;
  }, []);
  if (!r || r.isSpaMode) return null;
  let c = ((e, t) => {
    if (!window.history.state || !window.history.state.key) {
      let e = Math.random().toString(32).slice(2);
      window.history.replaceState({ key: e }, ``);
    }
    try {
      let n = JSON.parse(sessionStorage.getItem(e) || `{}`)[
        t || window.history.state.key
      ];
      typeof n == `number` && window.scrollTo(0, n);
    } catch (t) {
      (console.error(t), sessionStorage.removeItem(e));
    }
  }).toString();
  return (
    n.nonce == null && r?.nonce && (n.nonce = r.nonce),
    d.createElement(`script`, {
      ...n,
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: `(${c})(${R(JSON.stringify(t || En))}, ${R(JSON.stringify(s))})`,
      },
    })
  );
}
_n.displayName = `ScrollRestoration`;
function vn(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function yn(e) {
  let t = d.useContext(Ue);
  return (S(t, vn(e)), t);
}
function bn(e) {
  let t = d.useContext(j);
  return (S(t, vn(e)), t);
}
function xn(
  e,
  {
    target: t,
    replace: n,
    mask: r,
    state: i,
    preventScrollReset: a,
    relative: o,
    viewTransition: s,
    defaultShouldRevalidate: c,
    useTransitions: l,
  } = {},
) {
  let u = ct(),
    f = at(),
    p = ut(e, { relative: o });
  return d.useCallback(
    (m) => {
      if (It(m, t)) {
        m.preventDefault();
        let t = n === void 0 ? te(f) === te(p) : n,
          h = () =>
            u(e, {
              replace: t,
              mask: r,
              state: i,
              preventScrollReset: a,
              relative: o,
              viewTransition: s,
              defaultShouldRevalidate: c,
            });
        l ? d.startTransition(() => h()) : h();
      }
    },
    [f, u, p, n, r, i, t, e, a, o, s, c, l],
  );
}
var Sn = 0,
  Cn = () => `__${String(++Sn)}__`;
function wn() {
  let { router: e } = yn(`useSubmit`),
    { basename: t } = d.useContext(Ye),
    n = St(),
    r = e.fetch,
    i = e.navigate;
  return d.useCallback(
    async (e, a = {}) => {
      let { action: o, method: s, encType: c, formData: l, body: u } = Vt(e, t);
      if (a.navigate === !1) {
        let e = a.fetcherKey || Cn();
        await r(e, n, a.action || o, {
          defaultShouldRevalidate: a.defaultShouldRevalidate,
          preventScrollReset: a.preventScrollReset,
          formData: l,
          body: u,
          formMethod: a.method || s,
          formEncType: a.encType || c,
          flushSync: a.flushSync,
        });
      } else
        await i(a.action || o, {
          defaultShouldRevalidate: a.defaultShouldRevalidate,
          preventScrollReset: a.preventScrollReset,
          formData: l,
          body: u,
          formMethod: a.method || s,
          formEncType: a.encType || c,
          replace: a.replace,
          state: a.state,
          fromRouteId: n,
          flushSync: a.flushSync,
          viewTransition: a.viewTransition,
        });
    },
    [r, i, t, n],
  );
}
function Tn(e, { relative: t } = {}) {
  let { basename: n } = d.useContext(Ye),
    r = d.useContext(Ze);
  S(r, `useFormAction must be used inside a RouteContext`);
  let [i] = r.matches.slice(-1),
    a = { ...ut(e || `.`, { relative: t }) },
    o = at();
  if (e == null) {
    a.search = o.search;
    let e = new URLSearchParams(a.search),
      t = e.getAll(`index`);
    if (t.some((e) => e === ``)) {
      (e.delete(`index`),
        t.filter((e) => e).forEach((t) => e.append(`index`, t)));
      let n = e.toString();
      a.search = n ? `?${n}` : ``;
    }
  }
  return (
    (!e || e === `.`) &&
      i.route.index &&
      (a.search = a.search ? a.search.replace(/^\?/, `?index&`) : `?index`),
    n !== `/` && (a.pathname = a.pathname === `/` ? n : Ae([n, a.pathname])),
    te(a)
  );
}
var En = `react-router-scroll-positions`,
  Dn = {};
function On(e, t, n, r) {
  let i = null;
  return (
    r &&
      (i = r(
        n === `/` ? e : { ...e, pathname: Se(e.pathname, n) || e.pathname },
        t,
      )),
    (i ??= e.key),
    i
  );
}
function kn({ getKey: e, storageKey: t } = {}) {
  let { router: n } = yn(`useScrollRestoration`),
    { restoreScrollPosition: r, preventScrollReset: i } =
      bn(`useScrollRestoration`),
    { basename: a } = d.useContext(Ye),
    o = at(),
    s = wt(),
    c = Ct();
  (d.useEffect(
    () => (
      (window.history.scrollRestoration = `manual`),
      () => {
        window.history.scrollRestoration = `auto`;
      }
    ),
    [],
  ),
    An(
      d.useCallback(() => {
        if (c.state === `idle`) {
          let t = On(o, s, a, e);
          Dn[t] = window.scrollY;
        }
        try {
          sessionStorage.setItem(t || En, JSON.stringify(Dn));
        } catch (e) {
          C(
            !1,
            `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`,
          );
        }
        window.history.scrollRestoration = `auto`;
      }, [c.state, e, a, o, s, t]),
    ),
    typeof document < `u` &&
      (d.useLayoutEffect(() => {
        try {
          let e = sessionStorage.getItem(t || En);
          e && (Dn = JSON.parse(e));
        } catch {}
      }, [t]),
      d.useLayoutEffect(() => {
        let t = n?.enableScrollRestoration(
          Dn,
          () => window.scrollY,
          e ? (t, n) => On(t, n, a, e) : void 0,
        );
        return () => t && t();
      }, [n, a, e]),
      d.useLayoutEffect(() => {
        if (r !== !1) {
          if (typeof r == `number`) {
            window.scrollTo(0, r);
            return;
          }
          try {
            if (o.hash) {
              let e = document.getElementById(
                decodeURIComponent(o.hash.slice(1)),
              );
              if (e) {
                e.scrollIntoView();
                return;
              }
            }
          } catch {
            C(
              !1,
              `"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`,
            );
          }
          i !== !0 && window.scrollTo(0, 0);
        }
      }, [o, r, i])));
}
function An(e, t) {
  let { capture: n } = t || {};
  d.useEffect(() => {
    let t = n == null ? void 0 : { capture: n };
    return (
      window.addEventListener(`pagehide`, e, t),
      () => {
        window.removeEventListener(`pagehide`, e, t);
      }
    );
  }, [e, n]);
}
function jn(e, { relative: t } = {}) {
  let n = d.useContext(Ke);
  S(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: r } = yn(`useViewTransitionState`),
    i = ut(e, { relative: t });
  if (!n.isTransitioning) return !1;
  let a = Se(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    o = Se(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return ve(i.pathname, o) != null || ve(i.pathname, a) != null;
}
var Mn = o((e) => {
    function t(e, t) {
      var n = e.length;
      e.push(t);
      a: for (; 0 < n; ) {
        var r = (n - 1) >>> 1,
          a = e[r];
        if (0 < i(a, t)) ((e[r] = t), (e[n] = a), (n = r));
        else break a;
      }
    }
    function n(e) {
      return e.length === 0 ? null : e[0];
    }
    function r(e) {
      if (e.length === 0) return null;
      var t = e[0],
        n = e.pop();
      if (n !== t) {
        e[0] = n;
        a: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
          var s = 2 * (r + 1) - 1,
            c = e[s],
            l = s + 1,
            u = e[l];
          if (0 > i(c, n))
            l < a && 0 > i(u, c)
              ? ((e[r] = u), (e[l] = n), (r = l))
              : ((e[r] = c), (e[s] = n), (r = s));
          else if (l < a && 0 > i(u, n)) ((e[r] = u), (e[l] = n), (r = l));
          else break a;
        }
      }
      return t;
    }
    function i(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n === 0 ? e.id - t.id : n;
    }
    if (
      typeof performance == `object` &&
      typeof performance.now == `function`
    ) {
      var a = performance;
      e.unstable_now = function () {
        return a.now();
      };
    } else {
      var o = Date,
        s = o.now();
      e.unstable_now = function () {
        return o.now() - s;
      };
    }
    var c = [],
      l = [],
      u = 1,
      d = null,
      f = 3,
      p = !1,
      m = !1,
      h = !1,
      g = typeof setTimeout == `function` ? setTimeout : null,
      _ = typeof clearTimeout == `function` ? clearTimeout : null,
      v = typeof setImmediate < `u` ? setImmediate : null;
    typeof navigator < `u` &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function y(e) {
      for (var i = n(l); i !== null; ) {
        if (i.callback === null) r(l);
        else if (i.startTime <= e)
          (r(l), (i.sortIndex = i.expirationTime), t(c, i));
        else break;
        i = n(l);
      }
    }
    function b(e) {
      if (((h = !1), y(e), !m))
        if (n(c) !== null) ((m = !0), oe(x));
        else {
          var t = n(l);
          t !== null && se(b, t.startTime - e);
        }
    }
    function x(t, i) {
      ((m = !1), h && ((h = !1), _(w), (w = -1)), (p = !0));
      var a = f;
      try {
        for (
          y(i), d = n(c);
          d !== null && (!(d.expirationTime > i) || (t && !te()));
        ) {
          var o = d.callback;
          if (typeof o == `function`) {
            ((d.callback = null), (f = d.priorityLevel));
            var s = o(d.expirationTime <= i);
            ((i = e.unstable_now()),
              typeof s == `function` ? (d.callback = s) : d === n(c) && r(c),
              y(i));
          } else r(c);
          d = n(c);
        }
        if (d !== null) var u = !0;
        else {
          var g = n(l);
          (g !== null && se(b, g.startTime - i), (u = !1));
        }
        return u;
      } finally {
        ((d = null), (f = a), (p = !1));
      }
    }
    var S = !1,
      C = null,
      w = -1,
      T = 5,
      ee = -1;
    function te() {
      return !(e.unstable_now() - ee < T);
    }
    function ne() {
      if (C !== null) {
        var t = e.unstable_now();
        ee = t;
        var n = !0;
        try {
          n = C(!0, t);
        } finally {
          n ? re() : ((S = !1), (C = null));
        }
      } else S = !1;
    }
    var re;
    if (typeof v == `function`)
      re = function () {
        v(ne);
      };
    else if (typeof MessageChannel < `u`) {
      var ie = new MessageChannel(),
        ae = ie.port2;
      ((ie.port1.onmessage = ne),
        (re = function () {
          ae.postMessage(null);
        }));
    } else
      re = function () {
        g(ne, 0);
      };
    function oe(e) {
      ((C = e), S || ((S = !0), re()));
    }
    function se(t, n) {
      w = g(function () {
        t(e.unstable_now());
      }, n);
    }
    ((e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (e.unstable_continueExecution = function () {
        m || p || ((m = !0), oe(x));
      }),
      (e.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e
          ? console.error(
              `forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`,
            )
          : (T = 0 < e ? Math.floor(1e3 / e) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return f;
      }),
      (e.unstable_getFirstCallbackNode = function () {
        return n(c);
      }),
      (e.unstable_next = function (e) {
        switch (f) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = f;
        }
        var n = f;
        f = t;
        try {
          return e();
        } finally {
          f = n;
        }
      }),
      (e.unstable_pauseExecution = function () {}),
      (e.unstable_requestPaint = function () {}),
      (e.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = f;
        f = e;
        try {
          return t();
        } finally {
          f = n;
        }
      }),
      (e.unstable_scheduleCallback = function (r, i, a) {
        var o = e.unstable_now();
        switch (
          (typeof a == `object` && a
            ? ((a = a.delay), (a = typeof a == `number` && 0 < a ? o + a : o))
            : (a = o),
          r)
        ) {
          case 1:
            var s = -1;
            break;
          case 2:
            s = 250;
            break;
          case 5:
            s = 1073741823;
            break;
          case 4:
            s = 1e4;
            break;
          default:
            s = 5e3;
        }
        return (
          (s = a + s),
          (r = {
            id: u++,
            callback: i,
            priorityLevel: r,
            startTime: a,
            expirationTime: s,
            sortIndex: -1,
          }),
          a > o
            ? ((r.sortIndex = a),
              t(l, r),
              n(c) === null &&
                r === n(l) &&
                (h ? (_(w), (w = -1)) : (h = !0), se(b, a - o)))
            : ((r.sortIndex = s), t(c, r), m || p || ((m = !0), oe(x))),
          r
        );
      }),
      (e.unstable_shouldYield = te),
      (e.unstable_wrapCallback = function (e) {
        var t = f;
        return function () {
          var n = f;
          f = t;
          try {
            return e.apply(this, arguments);
          } finally {
            f = n;
          }
        };
      }));
  }),
  Nn = o((e, t) => {
    t.exports = Mn();
  }),
  Pn = o((e) => {
    var t = u(),
      n = Nn();
    function r(e) {
      for (
        var t = `https://reactjs.org/docs/error-decoder.html?invariant=` + e,
          n = 1;
        n < arguments.length;
        n++
      )
        t += `&args[]=` + encodeURIComponent(arguments[n]);
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    var i = new Set(),
      a = {};
    function o(e, t) {
      (s(e, t), s(e + `Capture`, t));
    }
    function s(e, t) {
      for (a[e] = t, e = 0; e < t.length; e++) i.add(t[e]);
    }
    var c = !(
        typeof window > `u` ||
        window.document === void 0 ||
        window.document.createElement === void 0
      ),
      l = Object.prototype.hasOwnProperty,
      d =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      f = {},
      p = {};
    function m(e) {
      return l.call(p, e)
        ? !0
        : l.call(f, e)
          ? !1
          : d.test(e)
            ? (p[e] = !0)
            : ((f[e] = !0), !1);
    }
    function h(e, t, n, r) {
      if (n !== null && n.type === 0) return !1;
      switch (typeof t) {
        case `function`:
        case `symbol`:
          return !0;
        case `boolean`:
          return r
            ? !1
            : n === null
              ? ((e = e.toLowerCase().slice(0, 5)),
                e !== `data-` && e !== `aria-`)
              : !n.acceptsBooleans;
        default:
          return !1;
      }
    }
    function g(e, t, n, r) {
      if (t == null || h(e, t, n, r)) return !0;
      if (r) return !1;
      if (n !== null)
        switch (n.type) {
          case 3:
            return !t;
          case 4:
            return !1 === t;
          case 5:
            return isNaN(t);
          case 6:
            return isNaN(t) || 1 > t;
        }
      return !1;
    }
    function _(e, t, n, r, i, a, o) {
      ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = a),
        (this.removeEmptyString = o));
    }
    var v = {};
    (`children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style`
      .split(` `)
      .forEach(function (e) {
        v[e] = new _(e, 0, !1, e, null, !1, !1);
      }),
      [
        [`acceptCharset`, `accept-charset`],
        [`className`, `class`],
        [`htmlFor`, `for`],
        [`httpEquiv`, `http-equiv`],
      ].forEach(function (e) {
        var t = e[0];
        v[t] = new _(t, 1, !1, e[1], null, !1, !1);
      }),
      [`contentEditable`, `draggable`, `spellCheck`, `value`].forEach(
        function (e) {
          v[e] = new _(e, 2, !1, e.toLowerCase(), null, !1, !1);
        },
      ),
      [
        `autoReverse`,
        `externalResourcesRequired`,
        `focusable`,
        `preserveAlpha`,
      ].forEach(function (e) {
        v[e] = new _(e, 2, !1, e, null, !1, !1);
      }),
      `allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope`
        .split(` `)
        .forEach(function (e) {
          v[e] = new _(e, 3, !1, e.toLowerCase(), null, !1, !1);
        }),
      [`checked`, `multiple`, `muted`, `selected`].forEach(function (e) {
        v[e] = new _(e, 3, !0, e, null, !1, !1);
      }),
      [`capture`, `download`].forEach(function (e) {
        v[e] = new _(e, 4, !1, e, null, !1, !1);
      }),
      [`cols`, `rows`, `size`, `span`].forEach(function (e) {
        v[e] = new _(e, 6, !1, e, null, !1, !1);
      }),
      [`rowSpan`, `start`].forEach(function (e) {
        v[e] = new _(e, 5, !1, e.toLowerCase(), null, !1, !1);
      }));
    var y = /[\-:]([a-z])/g;
    function b(e) {
      return e[1].toUpperCase();
    }
    (`accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height`
      .split(` `)
      .forEach(function (e) {
        var t = e.replace(y, b);
        v[t] = new _(t, 1, !1, e, null, !1, !1);
      }),
      `xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type`
        .split(` `)
        .forEach(function (e) {
          var t = e.replace(y, b);
          v[t] = new _(t, 1, !1, e, `http://www.w3.org/1999/xlink`, !1, !1);
        }),
      [`xml:base`, `xml:lang`, `xml:space`].forEach(function (e) {
        var t = e.replace(y, b);
        v[t] = new _(
          t,
          1,
          !1,
          e,
          `http://www.w3.org/XML/1998/namespace`,
          !1,
          !1,
        );
      }),
      [`tabIndex`, `crossOrigin`].forEach(function (e) {
        v[e] = new _(e, 1, !1, e.toLowerCase(), null, !1, !1);
      }),
      (v.xlinkHref = new _(
        `xlinkHref`,
        1,
        !1,
        `xlink:href`,
        `http://www.w3.org/1999/xlink`,
        !0,
        !1,
      )),
      [`src`, `href`, `action`, `formAction`].forEach(function (e) {
        v[e] = new _(e, 1, !1, e.toLowerCase(), null, !0, !0);
      }));
    function x(e, t, n, r) {
      var i = v.hasOwnProperty(t) ? v[t] : null;
      (i === null
        ? r ||
          !(2 < t.length) ||
          (t[0] !== `o` && t[0] !== `O`) ||
          (t[1] !== `n` && t[1] !== `N`)
        : i.type !== 0) &&
        (g(t, n, i, r) && (n = null),
        r || i === null
          ? m(t) &&
            (n === null ? e.removeAttribute(t) : e.setAttribute(t, `` + n))
          : i.mustUseProperty
            ? (e[i.propertyName] = n === null ? i.type !== 3 && `` : n)
            : ((t = i.attributeName),
              (r = i.attributeNamespace),
              n === null
                ? e.removeAttribute(t)
                : ((i = i.type),
                  (n = i === 3 || (i === 4 && !0 === n) ? `` : `` + n),
                  r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    var S = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      C = Symbol.for(`react.element`),
      w = Symbol.for(`react.portal`),
      T = Symbol.for(`react.fragment`),
      ee = Symbol.for(`react.strict_mode`),
      te = Symbol.for(`react.profiler`),
      ne = Symbol.for(`react.provider`),
      re = Symbol.for(`react.context`),
      ie = Symbol.for(`react.forward_ref`),
      ae = Symbol.for(`react.suspense`),
      oe = Symbol.for(`react.suspense_list`),
      se = Symbol.for(`react.memo`),
      E = Symbol.for(`react.lazy`),
      ce = Symbol.for(`react.offscreen`),
      le = Symbol.iterator;
    function ue(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (le && e[le]) || e[`@@iterator`]),
          typeof e == `function` ? e : null);
    }
    var D = Object.assign,
      de;
    function fe(e) {
      if (de === void 0)
        try {
          throw Error();
        } catch (e) {
          var t = e.stack.trim().match(/\n( *(at )?)/);
          de = (t && t[1]) || ``;
        }
      return (
        `
` +
        de +
        e
      );
    }
    var pe = !1;
    function me(e, t) {
      if (!e || pe) return ``;
      pe = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (t)
          if (
            ((t = function () {
              throw Error();
            }),
            Object.defineProperty(t.prototype, "props", {
              set: function () {
                throw Error();
              },
            }),
            typeof Reflect == `object` && Reflect.construct)
          ) {
            try {
              Reflect.construct(t, []);
            } catch (e) {
              var r = e;
            }
            Reflect.construct(e, [], t);
          } else {
            try {
              t.call();
            } catch (e) {
              r = e;
            }
            e.call(t.prototype);
          }
        else {
          try {
            throw Error();
          } catch (e) {
            r = e;
          }
          e();
        }
      } catch (t) {
        if (t && r && typeof t.stack == `string`) {
          for (
            var i = t.stack.split(`
`),
              a = r.stack.split(`
`),
              o = i.length - 1,
              s = a.length - 1;
            1 <= o && 0 <= s && i[o] !== a[s];
          )
            s--;
          for (; 1 <= o && 0 <= s; o--, s--)
            if (i[o] !== a[s]) {
              if (o !== 1 || s !== 1)
                do
                  if ((o--, s--, 0 > s || i[o] !== a[s])) {
                    var c =
                      `
` + i[o].replace(` at new `, ` at `);
                    return (
                      e.displayName &&
                        c.includes(`<anonymous>`) &&
                        (c = c.replace(`<anonymous>`, e.displayName)),
                      c
                    );
                  }
                while (1 <= o && 0 <= s);
              break;
            }
        }
      } finally {
        ((pe = !1), (Error.prepareStackTrace = n));
      }
      return (e = e ? e.displayName || e.name : ``) ? fe(e) : ``;
    }
    function he(e) {
      switch (e.tag) {
        case 5:
          return fe(e.type);
        case 16:
          return fe(`Lazy`);
        case 13:
          return fe(`Suspense`);
        case 19:
          return fe(`SuspenseList`);
        case 0:
        case 2:
        case 15:
          return ((e = me(e.type, !1)), e);
        case 11:
          return ((e = me(e.type.render, !1)), e);
        case 1:
          return ((e = me(e.type, !0)), e);
        default:
          return ``;
      }
    }
    function ge(e) {
      if (e == null) return null;
      if (typeof e == `function`) return e.displayName || e.name || null;
      if (typeof e == `string`) return e;
      switch (e) {
        case T:
          return `Fragment`;
        case w:
          return `Portal`;
        case te:
          return `Profiler`;
        case ee:
          return `StrictMode`;
        case ae:
          return `Suspense`;
        case oe:
          return `SuspenseList`;
      }
      if (typeof e == `object`)
        switch (e.$$typeof) {
          case re:
            return (e.displayName || `Context`) + `.Consumer`;
          case ne:
            return (e._context.displayName || `Context`) + `.Provider`;
          case ie:
            var t = e.render;
            return (
              (e = e.displayName),
              (e ||=
                ((e = t.displayName || t.name || ``),
                e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
              e
            );
          case se:
            return (
              (t = e.displayName || null),
              t === null ? ge(e.type) || `Memo` : t
            );
          case E:
            ((t = e._payload), (e = e._init));
            try {
              return ge(e(t));
            } catch {}
        }
      return null;
    }
    function O(e) {
      var t = e.type;
      switch (e.tag) {
        case 24:
          return `Cache`;
        case 9:
          return (t.displayName || `Context`) + `.Consumer`;
        case 10:
          return (t._context.displayName || `Context`) + `.Provider`;
        case 18:
          return `DehydratedFragment`;
        case 11:
          return (
            (e = t.render),
            (e = e.displayName || e.name || ``),
            t.displayName || (e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)
          );
        case 7:
          return `Fragment`;
        case 5:
          return t;
        case 4:
          return `Portal`;
        case 3:
          return `Root`;
        case 6:
          return `Text`;
        case 16:
          return ge(t);
        case 8:
          return t === ee ? `StrictMode` : `Mode`;
        case 22:
          return `Offscreen`;
        case 12:
          return `Profiler`;
        case 21:
          return `Scope`;
        case 13:
          return `Suspense`;
        case 19:
          return `SuspenseList`;
        case 25:
          return `TracingMarker`;
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if (typeof t == `function`) return t.displayName || t.name || null;
          if (typeof t == `string`) return t;
      }
      return null;
    }
    function _e(e) {
      switch (typeof e) {
        case `boolean`:
        case `number`:
        case `string`:
        case `undefined`:
          return e;
        case `object`:
          return e;
        default:
          return ``;
      }
    }
    function k(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === `input` &&
        (t === `checkbox` || t === `radio`)
      );
    }
    function ve(e) {
      var t = k(e) ? `checked` : `value`,
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = `` + e[t];
      if (
        !e.hasOwnProperty(t) &&
        n !== void 0 &&
        typeof n.get == `function` &&
        typeof n.set == `function`
      ) {
        var i = n.get,
          a = n.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return i.call(this);
            },
            set: function (e) {
              ((r = `` + e), a.call(this, e));
            },
          }),
          Object.defineProperty(e, t, { enumerable: n.enumerable }),
          {
            getValue: function () {
              return r;
            },
            setValue: function (e) {
              r = `` + e;
            },
            stopTracking: function () {
              ((e._valueTracker = null), delete e[t]);
            },
          }
        );
      }
    }
    function ye(e) {
      e._valueTracker ||= ve(e);
    }
    function be(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = ``;
      return (
        e && (r = k(e) ? (e.checked ? `true` : `false`) : e.value),
        (e = r),
        e === n ? !1 : (t.setValue(e), !0)
      );
    }
    function xe(e) {
      if (((e ||= typeof document < `u` ? document : void 0), e === void 0))
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function Se(e, t) {
      var n = t.checked;
      return D({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
      });
    }
    function Ce(e, t) {
      var n = t.defaultValue == null ? `` : t.defaultValue,
        r = t.checked == null ? t.defaultChecked : t.checked;
      ((n = _e(t.value == null ? n : t.value)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            t.type === `checkbox` || t.type === `radio`
              ? t.checked != null
              : t.value != null,
        }));
    }
    function we(e, t) {
      ((t = t.checked), t != null && x(e, `checked`, t, !1));
    }
    function Te(e, t) {
      we(e, t);
      var n = _e(t.value),
        r = t.type;
      if (n != null)
        r === `number`
          ? ((n === 0 && e.value === ``) || e.value != n) && (e.value = `` + n)
          : e.value !== `` + n && (e.value = `` + n);
      else if (r === `submit` || r === `reset`) {
        e.removeAttribute(`value`);
        return;
      }
      (t.hasOwnProperty(`value`)
        ? De(e, t.type, n)
        : t.hasOwnProperty(`defaultValue`) && De(e, t.type, _e(t.defaultValue)),
        t.checked == null &&
          t.defaultChecked != null &&
          (e.defaultChecked = !!t.defaultChecked));
    }
    function Ee(e, t, n) {
      if (t.hasOwnProperty(`value`) || t.hasOwnProperty(`defaultValue`)) {
        var r = t.type;
        if (
          !(
            (r !== `submit` && r !== `reset`) ||
            (t.value !== void 0 && t.value !== null)
          )
        )
          return;
        ((t = `` + e._wrapperState.initialValue),
          n || t === e.value || (e.value = t),
          (e.defaultValue = t));
      }
      ((n = e.name),
        n !== `` && (e.name = ``),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== `` && (e.name = n));
    }
    function De(e, t, n) {
      (t !== `number` || xe(e.ownerDocument) !== e) &&
        (n == null
          ? (e.defaultValue = `` + e._wrapperState.initialValue)
          : e.defaultValue !== `` + n && (e.defaultValue = `` + n));
    }
    var Oe = Array.isArray;
    function ke(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t[`$` + n[i]] = !0;
        for (n = 0; n < e.length; n++)
          ((i = t.hasOwnProperty(`$` + e[n].value)),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0));
      } else {
        for (n = `` + _e(n), t = null, i = 0; i < e.length; i++) {
          if (e[i].value === n) {
            ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
            return;
          }
          t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Ae(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(r(91));
      return D({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: `` + e._wrapperState.initialValue,
      });
    }
    function je(e, t) {
      var n = t.value;
      if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
          if (t != null) throw Error(r(92));
          if (Oe(n)) {
            if (1 < n.length) throw Error(r(93));
            n = n[0];
          }
          t = n;
        }
        ((t ??= ``), (n = t));
      }
      e._wrapperState = { initialValue: _e(n) };
    }
    function Me(e, t) {
      var n = _e(t.value),
        r = _e(t.defaultValue);
      (n != null &&
        ((n = `` + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = `` + r));
    }
    function Ne(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        t !== `` &&
        t !== null &&
        (e.value = t);
    }
    function Pe(e) {
      switch (e) {
        case `svg`:
          return `http://www.w3.org/2000/svg`;
        case `math`:
          return `http://www.w3.org/1998/Math/MathML`;
        default:
          return `http://www.w3.org/1999/xhtml`;
      }
    }
    function Fe(e, t) {
      return e == null || e === `http://www.w3.org/1999/xhtml`
        ? Pe(t)
        : e === `http://www.w3.org/2000/svg` && t === `foreignObject`
          ? `http://www.w3.org/1999/xhtml`
          : e;
    }
    var Ie,
      Le = (function (e) {
        return typeof MSApp < `u` && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, i) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n, r, i);
              });
            }
          : e;
      })(function (e, t) {
        if (e.namespaceURI !== `http://www.w3.org/2000/svg` || `innerHTML` in e)
          e.innerHTML = t;
        else {
          for (
            Ie ||= document.createElement(`div`),
              Ie.innerHTML = `<svg>` + t.valueOf().toString() + `</svg>`,
              t = Ie.firstChild;
            e.firstChild;
          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function Re(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var ze = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      Be = [`Webkit`, `ms`, `Moz`, `O`];
    Object.keys(ze).forEach(function (e) {
      Be.forEach(function (t) {
        ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ze[t] = ze[e]));
      });
    });
    function A(e, t, n) {
      return t == null || typeof t == `boolean` || t === ``
        ? ``
        : n ||
            typeof t != `number` ||
            t === 0 ||
            (ze.hasOwnProperty(e) && ze[e])
          ? (`` + t).trim()
          : t + `px`;
    }
    function Ve(e, t) {
      for (var n in ((e = e.style), t))
        if (t.hasOwnProperty(n)) {
          var r = n.indexOf(`--`) === 0,
            i = A(n, t[n], r);
          (n === `float` && (n = `cssFloat`),
            r ? e.setProperty(n, i) : (e[n] = i));
        }
    }
    var He = D(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      },
    );
    function Ue(e, t) {
      if (t) {
        if (He[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw Error(r(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(r(60));
          if (
            typeof t.dangerouslySetInnerHTML != `object` ||
            !(`__html` in t.dangerouslySetInnerHTML)
          )
            throw Error(r(61));
        }
        if (t.style != null && typeof t.style != `object`) throw Error(r(62));
      }
    }
    function j(e, t) {
      if (e.indexOf(`-`) === -1) return typeof t.is == `string`;
      switch (e) {
        case `annotation-xml`:
        case `color-profile`:
        case `font-face`:
        case `font-face-src`:
        case `font-face-uri`:
        case `font-face-format`:
        case `font-face-name`:
        case `missing-glyph`:
          return !1;
        default:
          return !0;
      }
    }
    var We = null;
    function Ge(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var Ke = null,
      qe = null,
      Je = null;
    function Ye(e) {
      if ((e = zi(e))) {
        if (typeof Ke != `function`) throw Error(r(280));
        var t = e.stateNode;
        t && ((t = Vi(t)), Ke(e.stateNode, e.type, t));
      }
    }
    function Xe(e) {
      qe ? (Je ? Je.push(e) : (Je = [e])) : (qe = e);
    }
    function Ze() {
      if (qe) {
        var e = qe,
          t = Je;
        if (((Je = qe = null), Ye(e), t))
          for (e = 0; e < t.length; e++) Ye(t[e]);
      }
    }
    function Qe(e, t) {
      return e(t);
    }
    function $e() {}
    var et = !1;
    function M(e, t, n) {
      if (et) return e(t, n);
      et = !0;
      try {
        return Qe(e, t, n);
      } finally {
        ((et = !1), (qe !== null || Je !== null) && ($e(), Ze()));
      }
    }
    function tt(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var i = Vi(n);
      if (i === null) return null;
      n = i[t];
      a: switch (t) {
        case `onClick`:
        case `onClickCapture`:
        case `onDoubleClick`:
        case `onDoubleClickCapture`:
        case `onMouseDown`:
        case `onMouseDownCapture`:
        case `onMouseMove`:
        case `onMouseMoveCapture`:
        case `onMouseUp`:
        case `onMouseUpCapture`:
        case `onMouseEnter`:
          ((i = !i.disabled) ||
            ((e = e.type),
            (i = !(
              e === `button` ||
              e === `input` ||
              e === `select` ||
              e === `textarea`
            ))),
            (e = !i));
          break a;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != `function`) throw Error(r(231, t, typeof n));
      return n;
    }
    var nt = !1;
    if (c)
      try {
        var rt = {};
        (Object.defineProperty(rt, "passive", {
          get: function () {
            nt = !0;
          },
        }),
          window.addEventListener(`test`, rt, rt),
          window.removeEventListener(`test`, rt, rt));
      } catch {
        nt = !1;
      }
    function it(e, t, n, r, i, a, o, s, c) {
      var l = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, l);
      } catch (e) {
        this.onError(e);
      }
    }
    var at = !1,
      ot = null,
      st = !1,
      ct = null,
      lt = {
        onError: function (e) {
          ((at = !0), (ot = e));
        },
      };
    function ut(e, t, n, r, i, a, o, s, c) {
      ((at = !1), (ot = null), it.apply(lt, arguments));
    }
    function dt(e, t, n, i, a, o, s, c, l) {
      if ((ut.apply(this, arguments), at)) {
        if (at) {
          var u = ot;
          ((at = !1), (ot = null));
        } else throw Error(r(198));
        st || ((st = !0), (ct = u));
      }
    }
    function ft(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
        while (e);
      }
      return t.tag === 3 ? n : null;
    }
    function pt(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (
          (t === null &&
            ((e = e.alternate), e !== null && (t = e.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function mt(e) {
      if (ft(e) !== e) throw Error(r(188));
    }
    function ht(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = ft(e)), t === null)) throw Error(r(188));
        return t === e ? e : null;
      }
      for (var n = e, i = t; ; ) {
        var a = n.return;
        if (a === null) break;
        var o = a.alternate;
        if (o === null) {
          if (((i = a.return), i !== null)) {
            n = i;
            continue;
          }
          break;
        }
        if (a.child === o.child) {
          for (o = a.child; o; ) {
            if (o === n) return (mt(a), e);
            if (o === i) return (mt(a), t);
            o = o.sibling;
          }
          throw Error(r(188));
        }
        if (n.return !== i.return) ((n = a), (i = o));
        else {
          for (var s = !1, c = a.child; c; ) {
            if (c === n) {
              ((s = !0), (n = a), (i = o));
              break;
            }
            if (c === i) {
              ((s = !0), (i = a), (n = o));
              break;
            }
            c = c.sibling;
          }
          if (!s) {
            for (c = o.child; c; ) {
              if (c === n) {
                ((s = !0), (n = o), (i = a));
                break;
              }
              if (c === i) {
                ((s = !0), (i = o), (n = a));
                break;
              }
              c = c.sibling;
            }
            if (!s) throw Error(r(189));
          }
        }
        if (n.alternate !== i) throw Error(r(190));
      }
      if (n.tag !== 3) throw Error(r(188));
      return n.stateNode.current === n ? e : t;
    }
    function gt(e) {
      return ((e = ht(e)), e === null ? null : N(e));
    }
    function N(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = N(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var _t = n.unstable_scheduleCallback,
      vt = n.unstable_cancelCallback,
      yt = n.unstable_shouldYield,
      bt = n.unstable_requestPaint,
      P = n.unstable_now,
      xt = n.unstable_getCurrentPriorityLevel,
      St = n.unstable_ImmediatePriority,
      Ct = n.unstable_UserBlockingPriority,
      wt = n.unstable_NormalPriority,
      Tt = n.unstable_LowPriority,
      F = n.unstable_IdlePriority,
      Et = null,
      Dt = null;
    function Ot(e) {
      if (Dt && typeof Dt.onCommitFiberRoot == `function`)
        try {
          Dt.onCommitFiberRoot(Et, e, void 0, (e.current.flags & 128) == 128);
        } catch {}
    }
    var kt = Math.clz32 ? Math.clz32 : Mt,
      At = Math.log,
      jt = Math.LN2;
    function Mt(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((At(e) / jt) | 0)) | 0);
    }
    var I = 64,
      Nt = 4194304;
    function Pt(e) {
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return e & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return e;
      }
    }
    function Ft(e, t) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var r = 0,
        i = e.suspendedLanes,
        a = e.pingedLanes,
        o = n & 268435455;
      if (o !== 0) {
        var s = o & ~i;
        s === 0 ? ((a &= o), a !== 0 && (r = Pt(a))) : (r = Pt(s));
      } else ((o = n & ~i), o === 0 ? a !== 0 && (r = Pt(a)) : (r = Pt(o)));
      if (r === 0) return 0;
      if (
        t !== 0 &&
        t !== r &&
        (t & i) === 0 &&
        ((i = r & -r), (a = t & -t), i >= a || (i === 16 && a & 4194240))
      )
        return t;
      if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; )
          ((n = 31 - kt(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
      return r;
    }
    function It(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
          return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function Lt(e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          i = e.expirationTimes,
          a = e.pendingLanes;
        0 < a;
      ) {
        var o = 31 - kt(a),
          s = 1 << o,
          c = i[o];
        (c === -1
          ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = It(s, t))
          : c <= t && (e.expiredLanes |= s),
          (a &= ~s));
      }
    }
    function Rt(e) {
      return (
        (e = e.pendingLanes & -1073741825),
        e === 0 ? (e & 1073741824 ? 1073741824 : 0) : e
      );
    }
    function zt() {
      var e = I;
      return ((I <<= 1), !(I & 4194240) && (I = 64), e);
    }
    function Bt(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function Vt(e, t, n) {
      ((e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - kt(t)),
        (e[t] = n));
    }
    function Ht(e, t) {
      var n = e.pendingLanes & ~t;
      ((e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements));
      var r = e.eventTimes;
      for (e = e.expirationTimes; 0 < n; ) {
        var i = 31 - kt(n),
          a = 1 << i;
        ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~a));
      }
    }
    function L(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n; ) {
        var r = 31 - kt(n),
          i = 1 << r;
        ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
      }
    }
    var R = 0;
    function Ut(e) {
      return (
        (e &= -e),
        1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
      );
    }
    var Wt,
      Gt,
      Kt,
      qt,
      Jt,
      Yt = !1,
      Xt = [],
      z = null,
      Zt = null,
      Qt = null,
      $t = new Map(),
      en = new Map(),
      tn = [],
      nn =
        `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit`.split(
          ` `,
        );
    function rn(e, t) {
      switch (e) {
        case `focusin`:
        case `focusout`:
          z = null;
          break;
        case `dragenter`:
        case `dragleave`:
          Zt = null;
          break;
        case `mouseover`:
        case `mouseout`:
          Qt = null;
          break;
        case `pointerover`:
        case `pointerout`:
          $t.delete(t.pointerId);
          break;
        case `gotpointercapture`:
        case `lostpointercapture`:
          en.delete(t.pointerId);
      }
    }
    function an(e, t, n, r, i, a) {
      return e === null || e.nativeEvent !== a
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: a,
            targetContainers: [i],
          }),
          t !== null && ((t = zi(t)), t !== null && Gt(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
    }
    function on(e, t, n, r, i) {
      switch (t) {
        case `focusin`:
          return ((z = an(z, e, t, n, r, i)), !0);
        case `dragenter`:
          return ((Zt = an(Zt, e, t, n, r, i)), !0);
        case `mouseover`:
          return ((Qt = an(Qt, e, t, n, r, i)), !0);
        case `pointerover`:
          var a = i.pointerId;
          return ($t.set(a, an($t.get(a) || null, e, t, n, r, i)), !0);
        case `gotpointercapture`:
          return (
            (a = i.pointerId),
            en.set(a, an(en.get(a) || null, e, t, n, r, i)),
            !0
          );
      }
      return !1;
    }
    function sn(e) {
      var t = Ri(e.target);
      if (t !== null) {
        var n = ft(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = pt(n)), t !== null)) {
              ((e.blockedOn = t),
                Jt(e.priority, function () {
                  Kt(n);
                }));
              return;
            }
          } else if (
            t === 3 &&
            n.stateNode.current.memoizedState.isDehydrated
          ) {
            e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function cn(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = yn(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var r = new n.constructor(n.type, n);
          ((We = r), n.target.dispatchEvent(r), (We = null));
        } else return ((t = zi(n)), t !== null && Gt(t), (e.blockedOn = n), !1);
        t.shift();
      }
      return !0;
    }
    function ln(e, t, n) {
      cn(e) && n.delete(t);
    }
    function un() {
      ((Yt = !1),
        z !== null && cn(z) && (z = null),
        Zt !== null && cn(Zt) && (Zt = null),
        Qt !== null && cn(Qt) && (Qt = null),
        $t.forEach(ln),
        en.forEach(ln));
    }
    function dn(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        Yt ||
          ((Yt = !0),
          n.unstable_scheduleCallback(n.unstable_NormalPriority, un)));
    }
    function fn(e) {
      function t(t) {
        return dn(t, e);
      }
      if (0 < Xt.length) {
        dn(Xt[0], e);
        for (var n = 1; n < Xt.length; n++) {
          var r = Xt[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        z !== null && dn(z, e),
          Zt !== null && dn(Zt, e),
          Qt !== null && dn(Qt, e),
          $t.forEach(t),
          en.forEach(t),
          n = 0;
        n < tn.length;
        n++
      )
        ((r = tn[n]), r.blockedOn === e && (r.blockedOn = null));
      for (; 0 < tn.length && ((n = tn[0]), n.blockedOn === null); )
        (sn(n), n.blockedOn === null && tn.shift());
    }
    var pn = S.ReactCurrentBatchConfig,
      mn = !0;
    function hn(e, t, n, r) {
      var i = R,
        a = pn.transition;
      pn.transition = null;
      try {
        ((R = 1), _n(e, t, n, r));
      } finally {
        ((R = i), (pn.transition = a));
      }
    }
    function gn(e, t, n, r) {
      var i = R,
        a = pn.transition;
      pn.transition = null;
      try {
        ((R = 4), _n(e, t, n, r));
      } finally {
        ((R = i), (pn.transition = a));
      }
    }
    function _n(e, t, n, r) {
      if (mn) {
        var i = yn(e, t, n, r);
        if (i === null) (di(e, t, r, vn, n), rn(e, r));
        else if (on(i, e, t, n, r)) r.stopPropagation();
        else if ((rn(e, r), t & 4 && -1 < nn.indexOf(e))) {
          for (; i !== null; ) {
            var a = zi(i);
            if (
              (a !== null && Wt(a),
              (a = yn(e, t, n, r)),
              a === null && di(e, t, r, vn, n),
              a === i)
            )
              break;
            i = a;
          }
          i !== null && r.stopPropagation();
        } else di(e, t, r, null, n);
      }
    }
    var vn = null;
    function yn(e, t, n, r) {
      if (((vn = null), (e = Ge(r)), (e = Ri(e)), e !== null))
        if (((t = ft(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
          if (((e = pt(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      return ((vn = e), null);
    }
    function bn(e) {
      switch (e) {
        case `cancel`:
        case `click`:
        case `close`:
        case `contextmenu`:
        case `copy`:
        case `cut`:
        case `auxclick`:
        case `dblclick`:
        case `dragend`:
        case `dragstart`:
        case `drop`:
        case `focusin`:
        case `focusout`:
        case `input`:
        case `invalid`:
        case `keydown`:
        case `keypress`:
        case `keyup`:
        case `mousedown`:
        case `mouseup`:
        case `paste`:
        case `pause`:
        case `play`:
        case `pointercancel`:
        case `pointerdown`:
        case `pointerup`:
        case `ratechange`:
        case `reset`:
        case `resize`:
        case `seeked`:
        case `submit`:
        case `touchcancel`:
        case `touchend`:
        case `touchstart`:
        case `volumechange`:
        case `change`:
        case `selectionchange`:
        case `textInput`:
        case `compositionstart`:
        case `compositionend`:
        case `compositionupdate`:
        case `beforeblur`:
        case `afterblur`:
        case `beforeinput`:
        case `blur`:
        case `fullscreenchange`:
        case `focus`:
        case `hashchange`:
        case `popstate`:
        case `select`:
        case `selectstart`:
          return 1;
        case `drag`:
        case `dragenter`:
        case `dragexit`:
        case `dragleave`:
        case `dragover`:
        case `mousemove`:
        case `mouseout`:
        case `mouseover`:
        case `pointermove`:
        case `pointerout`:
        case `pointerover`:
        case `scroll`:
        case `toggle`:
        case `touchmove`:
        case `wheel`:
        case `mouseenter`:
        case `mouseleave`:
        case `pointerenter`:
        case `pointerleave`:
          return 4;
        case `message`:
          switch (xt()) {
            case St:
              return 1;
            case Ct:
              return 4;
            case wt:
            case Tt:
              return 16;
            case F:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var xn = null,
      Sn = null,
      Cn = null;
    function wn() {
      if (Cn) return Cn;
      var e,
        t = Sn,
        n = t.length,
        r,
        i = `value` in xn ? xn.value : xn.textContent,
        a = i.length;
      for (e = 0; e < n && t[e] === i[e]; e++);
      var o = n - e;
      for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
      return (Cn = i.slice(e, 1 < r ? 1 - r : void 0));
    }
    function Tn(e) {
      var t = e.keyCode;
      return (
        `charCode` in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function En() {
      return !0;
    }
    function Dn() {
      return !1;
    }
    function On(e) {
      function t(t, n, r, i, a) {
        for (var o in ((this._reactName = t),
        (this._targetInst = r),
        (this.type = n),
        (this.nativeEvent = i),
        (this.target = a),
        (this.currentTarget = null),
        e))
          e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(i) : i[o]));
        return (
          (this.isDefaultPrevented = (
            i.defaultPrevented == null
              ? !1 === i.returnValue
              : i.defaultPrevented
          )
            ? En
            : Dn),
          (this.isPropagationStopped = Dn),
          this
        );
      }
      return (
        D(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e &&
              (e.preventDefault
                ? e.preventDefault()
                : typeof e.returnValue != `unknown` && (e.returnValue = !1),
              (this.isDefaultPrevented = En));
          },
          stopPropagation: function () {
            var e = this.nativeEvent;
            e &&
              (e.stopPropagation
                ? e.stopPropagation()
                : typeof e.cancelBubble != `unknown` && (e.cancelBubble = !0),
              (this.isPropagationStopped = En));
          },
          persist: function () {},
          isPersistent: En,
        }),
        t
      );
    }
    var kn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      An = On(kn),
      jn = D({}, kn, { view: 0, detail: 0 }),
      Mn = On(jn),
      Pn,
      Fn,
      In,
      Ln = D({}, jn, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Jn,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return e.relatedTarget === void 0
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget;
        },
        movementX: function (e) {
          return `movementX` in e
            ? e.movementX
            : (e !== In &&
                (In && e.type === `mousemove`
                  ? ((Pn = e.screenX - In.screenX),
                    (Fn = e.screenY - In.screenY))
                  : (Fn = Pn = 0),
                (In = e)),
              Pn);
        },
        movementY: function (e) {
          return `movementY` in e ? e.movementY : Fn;
        },
      }),
      Rn = On(Ln),
      zn = On(D({}, Ln, { dataTransfer: 0 })),
      Bn = On(D({}, jn, { relatedTarget: 0 })),
      Vn = On(
        D({}, kn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      ),
      Hn = On(
        D({}, kn, {
          clipboardData: function (e) {
            return `clipboardData` in e
              ? e.clipboardData
              : window.clipboardData;
          },
        }),
      ),
      Un = On(D({}, kn, { data: 0 })),
      Wn = {
        Esc: `Escape`,
        Spacebar: ` `,
        Left: `ArrowLeft`,
        Up: `ArrowUp`,
        Right: `ArrowRight`,
        Down: `ArrowDown`,
        Del: `Delete`,
        Win: `OS`,
        Menu: `ContextMenu`,
        Apps: `ContextMenu`,
        Scroll: `ScrollLock`,
        MozPrintableKey: `Unidentified`,
      },
      Gn = {
        8: `Backspace`,
        9: `Tab`,
        12: `Clear`,
        13: `Enter`,
        16: `Shift`,
        17: `Control`,
        18: `Alt`,
        19: `Pause`,
        20: `CapsLock`,
        27: `Escape`,
        32: ` `,
        33: `PageUp`,
        34: `PageDown`,
        35: `End`,
        36: `Home`,
        37: `ArrowLeft`,
        38: `ArrowUp`,
        39: `ArrowRight`,
        40: `ArrowDown`,
        45: `Insert`,
        46: `Delete`,
        112: `F1`,
        113: `F2`,
        114: `F3`,
        115: `F4`,
        116: `F5`,
        117: `F6`,
        118: `F7`,
        119: `F8`,
        120: `F9`,
        121: `F10`,
        122: `F11`,
        123: `F12`,
        144: `NumLock`,
        145: `ScrollLock`,
        224: `Meta`,
      },
      Kn = {
        Alt: `altKey`,
        Control: `ctrlKey`,
        Meta: `metaKey`,
        Shift: `shiftKey`,
      };
    function qn(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = Kn[e])
          ? !!t[e]
          : !1;
    }
    function Jn() {
      return qn;
    }
    var Yn = On(
        D({}, jn, {
          key: function (e) {
            if (e.key) {
              var t = Wn[e.key] || e.key;
              if (t !== `Unidentified`) return t;
            }
            return e.type === `keypress`
              ? ((e = Tn(e)), e === 13 ? `Enter` : String.fromCharCode(e))
              : e.type === `keydown` || e.type === `keyup`
                ? Gn[e.keyCode] || `Unidentified`
                : ``;
          },
          code: 0,
          location: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          repeat: 0,
          locale: 0,
          getModifierState: Jn,
          charCode: function (e) {
            return e.type === `keypress` ? Tn(e) : 0;
          },
          keyCode: function (e) {
            return e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0;
          },
          which: function (e) {
            return e.type === `keypress`
              ? Tn(e)
              : e.type === `keydown` || e.type === `keyup`
                ? e.keyCode
                : 0;
          },
        }),
      ),
      Xn = On(
        D({}, Ln, {
          pointerId: 0,
          width: 0,
          height: 0,
          pressure: 0,
          tangentialPressure: 0,
          tiltX: 0,
          tiltY: 0,
          twist: 0,
          pointerType: 0,
          isPrimary: 0,
        }),
      ),
      Zn = On(
        D({}, jn, {
          touches: 0,
          targetTouches: 0,
          changedTouches: 0,
          altKey: 0,
          metaKey: 0,
          ctrlKey: 0,
          shiftKey: 0,
          getModifierState: Jn,
        }),
      ),
      Qn = On(D({}, kn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
      $n = On(
        D({}, Ln, {
          deltaX: function (e) {
            return `deltaX` in e
              ? e.deltaX
              : `wheelDeltaX` in e
                ? -e.wheelDeltaX
                : 0;
          },
          deltaY: function (e) {
            return `deltaY` in e
              ? e.deltaY
              : `wheelDeltaY` in e
                ? -e.wheelDeltaY
                : `wheelDelta` in e
                  ? -e.wheelDelta
                  : 0;
          },
          deltaZ: 0,
          deltaMode: 0,
        }),
      ),
      er = [9, 13, 27, 32],
      tr = c && `CompositionEvent` in window,
      nr = null;
    c && `documentMode` in document && (nr = document.documentMode);
    var rr = c && `TextEvent` in window && !nr,
      ir = c && (!tr || (nr && 8 < nr && 11 >= nr)),
      ar = ` `,
      or = !1;
    function sr(e, t) {
      switch (e) {
        case `keyup`:
          return er.indexOf(t.keyCode) !== -1;
        case `keydown`:
          return t.keyCode !== 229;
        case `keypress`:
        case `mousedown`:
        case `focusout`:
          return !0;
        default:
          return !1;
      }
    }
    function cr(e) {
      return (
        (e = e.detail),
        typeof e == `object` && `data` in e ? e.data : null
      );
    }
    var lr = !1;
    function ur(e, t) {
      switch (e) {
        case `compositionend`:
          return cr(t);
        case `keypress`:
          return t.which === 32 ? ((or = !0), ar) : null;
        case `textInput`:
          return ((e = t.data), e === ar && or ? null : e);
        default:
          return null;
      }
    }
    function dr(e, t) {
      if (lr)
        return e === `compositionend` || (!tr && sr(e, t))
          ? ((e = wn()), (Cn = Sn = xn = null), (lr = !1), e)
          : null;
      switch (e) {
        case `paste`:
          return null;
        case `keypress`:
          if (
            !(t.ctrlKey || t.altKey || t.metaKey) ||
            (t.ctrlKey && t.altKey)
          ) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case `compositionend`:
          return ir && t.locale !== `ko` ? null : t.data;
        default:
          return null;
      }
    }
    var fr = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function pr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === `input` ? !!fr[e.type] : t === `textarea`;
    }
    function mr(e, t, n, r) {
      (Xe(r),
        (t = fi(t, `onChange`)),
        0 < t.length &&
          ((n = new An(`onChange`, `change`, null, n, r)),
          e.push({ event: n, listeners: t })));
    }
    var hr = null,
      gr = null;
    function B(e) {
      oi(e, 0);
    }
    function _r(e) {
      if (be(Bi(e))) return e;
    }
    function vr(e, t) {
      if (e === `change`) return t;
    }
    var yr = !1;
    if (c) {
      var br;
      if (c) {
        var xr = `oninput` in document;
        if (!xr) {
          var Sr = document.createElement(`div`);
          (Sr.setAttribute(`oninput`, `return;`),
            (xr = typeof Sr.oninput == `function`));
        }
        br = xr;
      } else br = !1;
      yr = br && (!document.documentMode || 9 < document.documentMode);
    }
    function Cr() {
      hr && (hr.detachEvent(`onpropertychange`, wr), (gr = hr = null));
    }
    function wr(e) {
      if (e.propertyName === `value` && _r(gr)) {
        var t = [];
        (mr(t, gr, e, Ge(e)), M(B, t));
      }
    }
    function Tr(e, t, n) {
      e === `focusin`
        ? (Cr(), (hr = t), (gr = n), hr.attachEvent(`onpropertychange`, wr))
        : e === `focusout` && Cr();
    }
    function Er(e) {
      if (e === `selectionchange` || e === `keyup` || e === `keydown`)
        return _r(gr);
    }
    function Dr(e, t) {
      if (e === `click`) return _r(t);
    }
    function V(e, t) {
      if (e === `input` || e === `change`) return _r(t);
    }
    function Or(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var kr = typeof Object.is == `function` ? Object.is : Or;
    function Ar(e, t) {
      if (kr(e, t)) return !0;
      if (typeof e != `object` || !e || typeof t != `object` || !t) return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!l.call(t, i) || !kr(e[i], t[i])) return !1;
      }
      return !0;
    }
    function jr(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Mr(e, t) {
      var n = jr(e);
      e = 0;
      for (var r; n; ) {
        if (n.nodeType === 3) {
          if (((r = e + n.textContent.length), e <= t && r >= t))
            return { node: n, offset: t - e };
          e = r;
        }
        a: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break a;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = jr(n);
      }
    }
    function Nr(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? Nr(e, t.parentNode)
              : `contains` in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function Pr() {
      for (var e = window, t = xe(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == `string`;
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = xe(e.document);
      }
      return t;
    }
    function Fr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        ((t === `input` &&
          (e.type === `text` ||
            e.type === `search` ||
            e.type === `tel` ||
            e.type === `url` ||
            e.type === `password`)) ||
          t === `textarea` ||
          e.contentEditable === `true`)
      );
    }
    function Ir(e) {
      var t = Pr(),
        n = e.focusedElem,
        r = e.selectionRange;
      if (
        t !== n &&
        n &&
        n.ownerDocument &&
        Nr(n.ownerDocument.documentElement, n)
      ) {
        if (r !== null && Fr(n)) {
          if (
            ((t = r.start),
            (e = r.end),
            e === void 0 && (e = t),
            `selectionStart` in n)
          )
            ((n.selectionStart = t),
              (n.selectionEnd = Math.min(e, n.value.length)));
          else if (
            ((e =
              ((t = n.ownerDocument || document) && t.defaultView) || window),
            e.getSelection)
          ) {
            e = e.getSelection();
            var i = n.textContent.length,
              a = Math.min(r.start, i);
            ((r = r.end === void 0 ? a : Math.min(r.end, i)),
              !e.extend && a > r && ((i = r), (r = a), (a = i)),
              (i = Mr(n, a)));
            var o = Mr(n, r);
            i &&
              o &&
              (e.rangeCount !== 1 ||
                e.anchorNode !== i.node ||
                e.anchorOffset !== i.offset ||
                e.focusNode !== o.node ||
                e.focusOffset !== o.offset) &&
              ((t = t.createRange()),
              t.setStart(i.node, i.offset),
              e.removeAllRanges(),
              a > r
                ? (e.addRange(t), e.extend(o.node, o.offset))
                : (t.setEnd(o.node, o.offset), e.addRange(t)));
          }
        }
        for (t = [], e = n; (e = e.parentNode); )
          e.nodeType === 1 &&
            t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
          typeof n.focus == `function` && n.focus(), n = 0;
          n < t.length;
          n++
        )
          ((e = t[n]),
            (e.element.scrollLeft = e.left),
            (e.element.scrollTop = e.top));
      }
    }
    var Lr = c && `documentMode` in document && 11 >= document.documentMode,
      Rr = null,
      zr = null,
      Br = null,
      Vr = !1;
    function Hr(e, t, n) {
      var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Vr ||
        Rr == null ||
        Rr !== xe(r) ||
        ((r = Rr),
        `selectionStart` in r && Fr(r)
          ? (r = { start: r.selectionStart, end: r.selectionEnd })
          : ((r = (
              (r.ownerDocument && r.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (r = {
              anchorNode: r.anchorNode,
              anchorOffset: r.anchorOffset,
              focusNode: r.focusNode,
              focusOffset: r.focusOffset,
            })),
        (Br && Ar(Br, r)) ||
          ((Br = r),
          (r = fi(zr, `onSelect`)),
          0 < r.length &&
            ((t = new An(`onSelect`, `select`, null, t, n)),
            e.push({ event: t, listeners: r }),
            (t.target = Rr))));
    }
    function Ur(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n[`Webkit` + e] = `webkit` + t),
        (n[`Moz` + e] = `moz` + t),
        n
      );
    }
    var Wr = {
        animationend: Ur(`Animation`, `AnimationEnd`),
        animationiteration: Ur(`Animation`, `AnimationIteration`),
        animationstart: Ur(`Animation`, `AnimationStart`),
        transitionend: Ur(`Transition`, `TransitionEnd`),
      },
      Gr = {},
      Kr = {};
    c &&
      ((Kr = document.createElement(`div`).style),
      `AnimationEvent` in window ||
        (delete Wr.animationend.animation,
        delete Wr.animationiteration.animation,
        delete Wr.animationstart.animation),
      `TransitionEvent` in window || delete Wr.transitionend.transition);
    function qr(e) {
      if (Gr[e]) return Gr[e];
      if (!Wr[e]) return e;
      var t = Wr[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in Kr) return (Gr[e] = t[n]);
      return e;
    }
    var Jr = qr(`animationend`),
      Yr = qr(`animationiteration`),
      Xr = qr(`animationstart`),
      Zr = qr(`transitionend`),
      Qr = new Map(),
      $r =
        `abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(
          ` `,
        );
    function ei(e, t) {
      (Qr.set(e, t), o(t, [e]));
    }
    for (var ti = 0; ti < $r.length; ti++) {
      var ni = $r[ti];
      ei(ni.toLowerCase(), `on` + (ni[0].toUpperCase() + ni.slice(1)));
    }
    (ei(Jr, `onAnimationEnd`),
      ei(Yr, `onAnimationIteration`),
      ei(Xr, `onAnimationStart`),
      ei(`dblclick`, `onDoubleClick`),
      ei(`focusin`, `onFocus`),
      ei(`focusout`, `onBlur`),
      ei(Zr, `onTransitionEnd`),
      s(`onMouseEnter`, [`mouseout`, `mouseover`]),
      s(`onMouseLeave`, [`mouseout`, `mouseover`]),
      s(`onPointerEnter`, [`pointerout`, `pointerover`]),
      s(`onPointerLeave`, [`pointerout`, `pointerover`]),
      o(
        `onChange`,
        `change click focusin focusout input keydown keyup selectionchange`.split(
          ` `,
        ),
      ),
      o(
        `onSelect`,
        `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(
          ` `,
        ),
      ),
      o(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]),
      o(
        `onCompositionEnd`,
        `compositionend focusout keydown keypress keyup mousedown`.split(` `),
      ),
      o(
        `onCompositionStart`,
        `compositionstart focusout keydown keypress keyup mousedown`.split(` `),
      ),
      o(
        `onCompositionUpdate`,
        `compositionupdate focusout keydown keypress keyup mousedown`.split(
          ` `,
        ),
      ));
    var ri =
        `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(
          ` `,
        ),
      ii = new Set(
        `cancel close invalid load scroll toggle`.split(` `).concat(ri),
      );
    function ai(e, t, n) {
      var r = e.type || `unknown-event`;
      ((e.currentTarget = n), dt(r, t, void 0, e), (e.currentTarget = null));
    }
    function oi(e, t) {
      t = (t & 4) != 0;
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          i = r.event;
        r = r.listeners;
        a: {
          var a = void 0;
          if (t)
            for (var o = r.length - 1; 0 <= o; o--) {
              var s = r[o],
                c = s.instance,
                l = s.currentTarget;
              if (((s = s.listener), c !== a && i.isPropagationStopped()))
                break a;
              (ai(i, s, l), (a = c));
            }
          else
            for (o = 0; o < r.length; o++) {
              if (
                ((s = r[o]),
                (c = s.instance),
                (l = s.currentTarget),
                (s = s.listener),
                c !== a && i.isPropagationStopped())
              )
                break a;
              (ai(i, s, l), (a = c));
            }
        }
      }
      if (st) throw ((e = ct), (st = !1), (ct = null), e);
    }
    function H(e, t) {
      var n = t[Fi];
      n === void 0 && (n = t[Fi] = new Set());
      var r = e + `__bubble`;
      n.has(r) || (ui(t, e, 2, !1), n.add(r));
    }
    function si(e, t, n) {
      var r = 0;
      (t && (r |= 4), ui(n, e, r, t));
    }
    var ci = `_reactListening` + Math.random().toString(36).slice(2);
    function li(e) {
      if (!e[ci]) {
        ((e[ci] = !0),
          i.forEach(function (t) {
            t !== `selectionchange` &&
              (ii.has(t) || si(t, !1, e), si(t, !0, e));
          }));
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[ci] || ((t[ci] = !0), si(`selectionchange`, !1, t));
      }
    }
    function ui(e, t, n, r) {
      switch (bn(t)) {
        case 1:
          var i = hn;
          break;
        case 4:
          i = gn;
          break;
        default:
          i = _n;
      }
      ((n = i.bind(null, t, n, e)),
        (i = void 0),
        !nt ||
          (t !== `touchstart` && t !== `touchmove` && t !== `wheel`) ||
          (i = !0),
        r
          ? i === void 0
            ? e.addEventListener(t, n, !0)
            : e.addEventListener(t, n, { capture: !0, passive: i })
          : i === void 0
            ? e.addEventListener(t, n, !1)
            : e.addEventListener(t, n, { passive: i }));
    }
    function di(e, t, n, r, i) {
      var a = r;
      if (!(t & 1) && !(t & 2) && r !== null)
        a: for (;;) {
          if (r === null) return;
          var o = r.tag;
          if (o === 3 || o === 4) {
            var s = r.stateNode.containerInfo;
            if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
            if (o === 4)
              for (o = r.return; o !== null; ) {
                var c = o.tag;
                if (
                  (c === 3 || c === 4) &&
                  ((c = o.stateNode.containerInfo),
                  c === i || (c.nodeType === 8 && c.parentNode === i))
                )
                  return;
                o = o.return;
              }
            for (; s !== null; ) {
              if (((o = Ri(s)), o === null)) return;
              if (((c = o.tag), c === 5 || c === 6)) {
                r = a = o;
                continue a;
              }
              s = s.parentNode;
            }
          }
          r = r.return;
        }
      M(function () {
        var r = a,
          i = Ge(n),
          o = [];
        a: {
          var s = Qr.get(e);
          if (s !== void 0) {
            var c = An,
              l = e;
            switch (e) {
              case `keypress`:
                if (Tn(n) === 0) break a;
              case `keydown`:
              case `keyup`:
                c = Yn;
                break;
              case `focusin`:
                ((l = `focus`), (c = Bn));
                break;
              case `focusout`:
                ((l = `blur`), (c = Bn));
                break;
              case `beforeblur`:
              case `afterblur`:
                c = Bn;
                break;
              case `click`:
                if (n.button === 2) break a;
              case `auxclick`:
              case `dblclick`:
              case `mousedown`:
              case `mousemove`:
              case `mouseup`:
              case `mouseout`:
              case `mouseover`:
              case `contextmenu`:
                c = Rn;
                break;
              case `drag`:
              case `dragend`:
              case `dragenter`:
              case `dragexit`:
              case `dragleave`:
              case `dragover`:
              case `dragstart`:
              case `drop`:
                c = zn;
                break;
              case `touchcancel`:
              case `touchend`:
              case `touchmove`:
              case `touchstart`:
                c = Zn;
                break;
              case Jr:
              case Yr:
              case Xr:
                c = Vn;
                break;
              case Zr:
                c = Qn;
                break;
              case `scroll`:
                c = Mn;
                break;
              case `wheel`:
                c = $n;
                break;
              case `copy`:
              case `cut`:
              case `paste`:
                c = Hn;
                break;
              case `gotpointercapture`:
              case `lostpointercapture`:
              case `pointercancel`:
              case `pointerdown`:
              case `pointermove`:
              case `pointerout`:
              case `pointerover`:
              case `pointerup`:
                c = Xn;
            }
            var u = (t & 4) != 0,
              d = !u && e === `scroll`,
              f = u ? (s === null ? null : s + `Capture`) : s;
            u = [];
            for (var p = r, m; p !== null; ) {
              m = p;
              var h = m.stateNode;
              if (
                (m.tag === 5 &&
                  h !== null &&
                  ((m = h),
                  f !== null &&
                    ((h = tt(p, f)), h != null && u.push(U(p, h, m)))),
                d)
              )
                break;
              p = p.return;
            }
            0 < u.length &&
              ((s = new c(s, l, null, n, i)),
              o.push({ event: s, listeners: u }));
          }
        }
        if (!(t & 7)) {
          a: {
            if (
              ((s = e === `mouseover` || e === `pointerover`),
              (c = e === `mouseout` || e === `pointerout`),
              s &&
                n !== We &&
                (l = n.relatedTarget || n.fromElement) &&
                (Ri(l) || l[Pi]))
            )
              break a;
            if (
              (c || s) &&
              ((s =
                i.window === i
                  ? i
                  : (s = i.ownerDocument)
                    ? s.defaultView || s.parentWindow
                    : window),
              c
                ? ((l = n.relatedTarget || n.toElement),
                  (c = r),
                  (l = l ? Ri(l) : null),
                  l !== null &&
                    ((d = ft(l)), l !== d || (l.tag !== 5 && l.tag !== 6)) &&
                    (l = null))
                : ((c = null), (l = r)),
              c !== l)
            ) {
              if (
                ((u = Rn),
                (h = `onMouseLeave`),
                (f = `onMouseEnter`),
                (p = `mouse`),
                (e === `pointerout` || e === `pointerover`) &&
                  ((u = Xn),
                  (h = `onPointerLeave`),
                  (f = `onPointerEnter`),
                  (p = `pointer`)),
                (d = c == null ? s : Bi(c)),
                (m = l == null ? s : Bi(l)),
                (s = new u(h, p + `leave`, c, n, i)),
                (s.target = d),
                (s.relatedTarget = m),
                (h = null),
                Ri(i) === r &&
                  ((u = new u(f, p + `enter`, l, n, i)),
                  (u.target = m),
                  (u.relatedTarget = d),
                  (h = u)),
                (d = h),
                c && l)
              )
                b: {
                  for (u = c, f = l, p = 0, m = u; m; m = pi(m)) p++;
                  for (m = 0, h = f; h; h = pi(h)) m++;
                  for (; 0 < p - m; ) ((u = pi(u)), p--);
                  for (; 0 < m - p; ) ((f = pi(f)), m--);
                  for (; p--; ) {
                    if (u === f || (f !== null && u === f.alternate)) break b;
                    ((u = pi(u)), (f = pi(f)));
                  }
                  u = null;
                }
              else u = null;
              (c !== null && mi(o, s, c, u, !1),
                l !== null && d !== null && mi(o, d, l, u, !0));
            }
          }
          a: {
            if (
              ((s = r ? Bi(r) : window),
              (c = s.nodeName && s.nodeName.toLowerCase()),
              c === `select` || (c === `input` && s.type === `file`))
            )
              var g = vr;
            else if (pr(s))
              if (yr) g = V;
              else {
                g = Er;
                var _ = Tr;
              }
            else
              (c = s.nodeName) &&
                c.toLowerCase() === `input` &&
                (s.type === `checkbox` || s.type === `radio`) &&
                (g = Dr);
            if ((g &&= g(e, r))) {
              mr(o, g, n, i);
              break a;
            }
            (_ && _(e, s, r),
              e === `focusout` &&
                (_ = s._wrapperState) &&
                _.controlled &&
                s.type === `number` &&
                De(s, `number`, s.value));
          }
          switch (((_ = r ? Bi(r) : window), e)) {
            case `focusin`:
              (pr(_) || _.contentEditable === `true`) &&
                ((Rr = _), (zr = r), (Br = null));
              break;
            case `focusout`:
              Br = zr = Rr = null;
              break;
            case `mousedown`:
              Vr = !0;
              break;
            case `contextmenu`:
            case `mouseup`:
            case `dragend`:
              ((Vr = !1), Hr(o, n, i));
              break;
            case `selectionchange`:
              if (Lr) break;
            case `keydown`:
            case `keyup`:
              Hr(o, n, i);
          }
          var v;
          if (tr)
            b: {
              switch (e) {
                case `compositionstart`:
                  var y = `onCompositionStart`;
                  break b;
                case `compositionend`:
                  y = `onCompositionEnd`;
                  break b;
                case `compositionupdate`:
                  y = `onCompositionUpdate`;
                  break b;
              }
              y = void 0;
            }
          else
            lr
              ? sr(e, n) && (y = `onCompositionEnd`)
              : e === `keydown` &&
                n.keyCode === 229 &&
                (y = `onCompositionStart`);
          (y &&
            (ir &&
              n.locale !== `ko` &&
              (lr || y !== `onCompositionStart`
                ? y === `onCompositionEnd` && lr && (v = wn())
                : ((xn = i),
                  (Sn = `value` in xn ? xn.value : xn.textContent),
                  (lr = !0))),
            (_ = fi(r, y)),
            0 < _.length &&
              ((y = new Un(y, e, null, n, i)),
              o.push({ event: y, listeners: _ }),
              v ? (y.data = v) : ((v = cr(n)), v !== null && (y.data = v)))),
            (v = rr ? ur(e, n) : dr(e, n)) &&
              ((r = fi(r, `onBeforeInput`)),
              0 < r.length &&
                ((i = new Un(`onBeforeInput`, `beforeinput`, null, n, i)),
                o.push({ event: i, listeners: r }),
                (i.data = v))));
        }
        oi(o, t);
      });
    }
    function U(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function fi(e, t) {
      for (var n = t + `Capture`, r = []; e !== null; ) {
        var i = e,
          a = i.stateNode;
        (i.tag === 5 &&
          a !== null &&
          ((i = a),
          (a = tt(e, n)),
          a != null && r.unshift(U(e, a, i)),
          (a = tt(e, t)),
          a != null && r.push(U(e, a, i))),
          (e = e.return));
      }
      return r;
    }
    function pi(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function mi(e, t, n, r, i) {
      for (var a = t._reactName, o = []; n !== null && n !== r; ) {
        var s = n,
          c = s.alternate,
          l = s.stateNode;
        if (c !== null && c === r) break;
        (s.tag === 5 &&
          l !== null &&
          ((s = l),
          i
            ? ((c = tt(n, a)), c != null && o.unshift(U(n, c, s)))
            : i || ((c = tt(n, a)), c != null && o.push(U(n, c, s)))),
          (n = n.return));
      }
      o.length !== 0 && e.push({ event: t, listeners: o });
    }
    var hi = /\r\n?/g,
      gi = /\u0000|\uFFFD/g;
    function _i(e) {
      return (typeof e == `string` ? e : `` + e)
        .replace(
          hi,
          `
`,
        )
        .replace(gi, ``);
    }
    function vi(e, t, n) {
      if (((t = _i(t)), _i(e) !== t && n)) throw Error(r(425));
    }
    function yi() {}
    var bi = null,
      xi = null;
    function Si(e, t) {
      return (
        e === `textarea` ||
        e === `noscript` ||
        typeof t.children == `string` ||
        typeof t.children == `number` ||
        (typeof t.dangerouslySetInnerHTML == `object` &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Ci = typeof setTimeout == `function` ? setTimeout : void 0,
      wi = typeof clearTimeout == `function` ? clearTimeout : void 0,
      Ti = typeof Promise == `function` ? Promise : void 0,
      Ei =
        typeof queueMicrotask == `function`
          ? queueMicrotask
          : Ti === void 0
            ? Ci
            : function (e) {
                return Ti.resolve(null).then(e).catch(Di);
              };
    function Di(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function Oi(e, t) {
      var n = t,
        r = 0;
      do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8))
          if (((n = i.data), n === `/$`)) {
            if (r === 0) {
              (e.removeChild(i), fn(t));
              return;
            }
            r--;
          } else (n !== `$` && n !== `$?` && n !== `$!`) || r++;
        n = i;
      } while (n);
      fn(t);
    }
    function ki(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (((t = e.data), t === `$` || t === `$!` || t === `$?`)) break;
          if (t === `/$`) return null;
        }
      }
      return e;
    }
    function Ai(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === `$` || n === `$!` || n === `$?`) {
            if (t === 0) return e;
            t--;
          } else n === `/$` && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var ji = Math.random().toString(36).slice(2),
      Mi = `__reactFiber$` + ji,
      Ni = `__reactProps$` + ji,
      Pi = `__reactContainer$` + ji,
      Fi = `__reactEvents$` + ji,
      Ii = `__reactListeners$` + ji,
      Li = `__reactHandles$` + ji;
    function Ri(e) {
      var t = e[Mi];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[Pi] || n[Mi])) {
          if (
            ((n = t.alternate),
            t.child !== null || (n !== null && n.child !== null))
          )
            for (e = Ai(e); e !== null; ) {
              if ((n = e[Mi])) return n;
              e = Ai(e);
            }
          return t;
        }
        ((e = n), (n = e.parentNode));
      }
      return null;
    }
    function zi(e) {
      return (
        (e = e[Mi] || e[Pi]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
          ? null
          : e
      );
    }
    function Bi(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(r(33));
    }
    function Vi(e) {
      return e[Ni] || null;
    }
    var Hi = [],
      Ui = -1;
    function Wi(e) {
      return { current: e };
    }
    function W(e) {
      0 > Ui || ((e.current = Hi[Ui]), (Hi[Ui] = null), Ui--);
    }
    function G(e, t) {
      (Ui++, (Hi[Ui] = e.current), (e.current = t));
    }
    var Gi = {},
      Ki = Wi(Gi),
      qi = Wi(!1),
      Ji = Gi;
    function Yi(e, t) {
      var n = e.type.contextTypes;
      if (!n) return Gi;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {},
        a;
      for (a in n) i[a] = t[a];
      return (
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = i)),
        i
      );
    }
    function Xi(e) {
      return ((e = e.childContextTypes), e != null);
    }
    function Zi() {
      (W(qi), W(Ki));
    }
    function Qi(e, t, n) {
      if (Ki.current !== Gi) throw Error(r(168));
      (G(Ki, t), G(qi, n));
    }
    function $i(e, t, n) {
      var i = e.stateNode;
      if (((t = t.childContextTypes), typeof i.getChildContext != `function`))
        return n;
      for (var a in ((i = i.getChildContext()), i))
        if (!(a in t)) throw Error(r(108, O(e) || `Unknown`, a));
      return D({}, n, i);
    }
    function ea(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          Gi),
        (Ji = Ki.current),
        G(Ki, e),
        G(qi, qi.current),
        !0
      );
    }
    function ta(e, t, n) {
      var i = e.stateNode;
      if (!i) throw Error(r(169));
      (n
        ? ((e = $i(e, t, Ji)),
          (i.__reactInternalMemoizedMergedChildContext = e),
          W(qi),
          W(Ki),
          G(Ki, e))
        : W(qi),
        G(qi, n));
    }
    var na = null,
      ra = !1,
      K = !1;
    function ia(e) {
      na === null ? (na = [e]) : na.push(e);
    }
    function aa(e) {
      ((ra = !0), ia(e));
    }
    function oa() {
      if (!K && na !== null) {
        K = !0;
        var e = 0,
          t = R;
        try {
          var n = na;
          for (R = 1; e < n.length; e++) {
            var r = n[e];
            do r = r(!0);
            while (r !== null);
          }
          ((na = null), (ra = !1));
        } catch (t) {
          throw (na !== null && (na = na.slice(e + 1)), _t(St, oa), t);
        } finally {
          ((R = t), (K = !1));
        }
      }
      return null;
    }
    var sa = [],
      ca = 0,
      la = null,
      ua = 0,
      q = [],
      da = 0,
      fa = null,
      pa = 1,
      ma = ``;
    function ha(e, t) {
      ((sa[ca++] = ua), (sa[ca++] = la), (la = e), (ua = t));
    }
    function ga(e, t, n) {
      ((q[da++] = pa), (q[da++] = ma), (q[da++] = fa), (fa = e));
      var r = pa;
      e = ma;
      var i = 32 - kt(r) - 1;
      ((r &= ~(1 << i)), (n += 1));
      var a = 32 - kt(t) + i;
      if (30 < a) {
        var o = i - (i % 5);
        ((a = (r & ((1 << o) - 1)).toString(32)),
          (r >>= o),
          (i -= o),
          (pa = (1 << (32 - kt(t) + i)) | (n << i) | r),
          (ma = a + e));
      } else ((pa = (1 << a) | (n << i) | r), (ma = e));
    }
    function _a(e) {
      e.return !== null && (ha(e, 1), ga(e, 1, 0));
    }
    function va(e) {
      for (; e === la; )
        ((la = sa[--ca]), (sa[ca] = null), (ua = sa[--ca]), (sa[ca] = null));
      for (; e === fa; )
        ((fa = q[--da]),
          (q[da] = null),
          (ma = q[--da]),
          (q[da] = null),
          (pa = q[--da]),
          (q[da] = null));
    }
    var ya = null,
      ba = null,
      J = !1,
      xa = null;
    function Sa(e, t) {
      var n = Kl(5, null, null, 0);
      ((n.elementType = `DELETED`),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
    }
    function Ca(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            (t =
              t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t),
            t === null
              ? !1
              : ((e.stateNode = t), (ya = e), (ba = ki(t.firstChild)), !0)
          );
        case 6:
          return (
            (t = e.pendingProps === `` || t.nodeType !== 3 ? null : t),
            t === null ? !1 : ((e.stateNode = t), (ya = e), (ba = null), !0)
          );
        case 13:
          return (
            (t = t.nodeType === 8 ? t : null),
            t === null
              ? !1
              : ((n = fa === null ? null : { id: pa, overflow: ma }),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                (n = Kl(18, null, null, 0)),
                (n.stateNode = t),
                (n.return = e),
                (e.child = n),
                (ya = e),
                (ba = null),
                !0)
          );
        default:
          return !1;
      }
    }
    function wa(e) {
      return (e.mode & 1) != 0 && (e.flags & 128) == 0;
    }
    function Ta(e) {
      if (J) {
        var t = ba;
        if (t) {
          var n = t;
          if (!Ca(e, t)) {
            if (wa(e)) throw Error(r(418));
            t = ki(n.nextSibling);
            var i = ya;
            t && Ca(e, t)
              ? Sa(i, n)
              : ((e.flags = (e.flags & -4097) | 2), (J = !1), (ya = e));
          }
        } else {
          if (wa(e)) throw Error(r(418));
          ((e.flags = (e.flags & -4097) | 2), (J = !1), (ya = e));
        }
      }
    }
    function Ea(e) {
      for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;
      )
        e = e.return;
      ya = e;
    }
    function Da(e) {
      if (e !== ya) return !1;
      if (!J) return (Ea(e), (J = !0), !1);
      var t;
      if (
        ((t = e.tag !== 3) &&
          !(t = e.tag !== 5) &&
          ((t = e.type),
          (t = t !== `head` && t !== `body` && !Si(e.type, e.memoizedProps))),
        (t &&= ba))
      ) {
        if (wa(e)) throw (Oa(), Error(r(418)));
        for (; t; ) (Sa(e, t), (t = ki(t.nextSibling)));
      }
      if ((Ea(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e))
          throw Error(r(317));
        a: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var n = e.data;
              if (n === `/$`) {
                if (t === 0) {
                  ba = ki(e.nextSibling);
                  break a;
                }
                t--;
              } else (n !== `$` && n !== `$!` && n !== `$?`) || t++;
            }
            e = e.nextSibling;
          }
          ba = null;
        }
      } else ba = ya ? ki(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Oa() {
      for (var e = ba; e; ) e = ki(e.nextSibling);
    }
    function ka() {
      ((ba = ya = null), (J = !1));
    }
    function Aa(e) {
      xa === null ? (xa = [e]) : xa.push(e);
    }
    var ja = S.ReactCurrentBatchConfig;
    function Ma(e, t, n) {
      if (
        ((e = n.ref),
        e !== null && typeof e != `function` && typeof e != `object`)
      ) {
        if (n._owner) {
          if (((n = n._owner), n)) {
            if (n.tag !== 1) throw Error(r(309));
            var i = n.stateNode;
          }
          if (!i) throw Error(r(147, e));
          var a = i,
            o = `` + e;
          return t !== null &&
            t.ref !== null &&
            typeof t.ref == `function` &&
            t.ref._stringRef === o
            ? t.ref
            : ((t = function (e) {
                var t = a.refs;
                e === null ? delete t[o] : (t[o] = e);
              }),
              (t._stringRef = o),
              t);
        }
        if (typeof e != `string`) throw Error(r(284));
        if (!n._owner) throw Error(r(290, e));
      }
      return e;
    }
    function Na(e, t) {
      throw (
        (e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === `[object Object]`
              ? `object with keys {` + Object.keys(t).join(`, `) + `}`
              : e,
          ),
        )
      );
    }
    function Pa(e) {
      var t = e._init;
      return t(e._payload);
    }
    function Fa(e) {
      function t(t, n) {
        if (e) {
          var r = t.deletions;
          r === null ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; r !== null; ) (t(n, r), (r = r.sibling));
        return null;
      }
      function i(e, t) {
        for (e = new Map(); t !== null; )
          (t.key === null ? e.set(t.index, t) : e.set(t.key, t),
            (t = t.sibling));
        return e;
      }
      function a(e, t) {
        return ((e = Yl(e, t)), (e.index = 0), (e.sibling = null), e);
      }
      function o(t, n, r) {
        return (
          (t.index = r),
          e
            ? ((r = t.alternate),
              r === null
                ? ((t.flags |= 2), n)
                : ((r = r.index), r < n ? ((t.flags |= 2), n) : r))
            : ((t.flags |= 1048576), n)
        );
      }
      function s(t) {
        return (e && t.alternate === null && (t.flags |= 2), t);
      }
      function c(e, t, n, r) {
        return t === null || t.tag !== 6
          ? ((t = $l(n, e.mode, r)), (t.return = e), t)
          : ((t = a(t, n)), (t.return = e), t);
      }
      function l(e, t, n, r) {
        var i = n.type;
        return i === T
          ? d(e, t, n.props.children, r, n.key)
          : t !== null &&
              (t.elementType === i ||
                (typeof i == `object` &&
                  i &&
                  i.$$typeof === E &&
                  Pa(i) === t.type))
            ? ((r = a(t, n.props)), (r.ref = Ma(e, t, n)), (r.return = e), r)
            : ((r = Xl(n.type, n.key, n.props, null, e.mode, r)),
              (r.ref = Ma(e, t, n)),
              (r.return = e),
              r);
      }
      function u(e, t, n, r) {
        return t === null ||
          t.tag !== 4 ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? ((t = eu(n, e.mode, r)), (t.return = e), t)
          : ((t = a(t, n.children || [])), (t.return = e), t);
      }
      function d(e, t, n, r, i) {
        return t === null || t.tag !== 7
          ? ((t = Zl(n, e.mode, r, i)), (t.return = e), t)
          : ((t = a(t, n)), (t.return = e), t);
      }
      function f(e, t, n) {
        if ((typeof t == `string` && t !== ``) || typeof t == `number`)
          return ((t = $l(`` + t, e.mode, n)), (t.return = e), t);
        if (typeof t == `object` && t) {
          switch (t.$$typeof) {
            case C:
              return (
                (n = Xl(t.type, t.key, t.props, null, e.mode, n)),
                (n.ref = Ma(e, null, t)),
                (n.return = e),
                n
              );
            case w:
              return ((t = eu(t, e.mode, n)), (t.return = e), t);
            case E:
              var r = t._init;
              return f(e, r(t._payload), n);
          }
          if (Oe(t) || ue(t))
            return ((t = Zl(t, e.mode, n, null)), (t.return = e), t);
          Na(e, t);
        }
        return null;
      }
      function p(e, t, n, r) {
        var i = t === null ? null : t.key;
        if ((typeof n == `string` && n !== ``) || typeof n == `number`)
          return i === null ? c(e, t, `` + n, r) : null;
        if (typeof n == `object` && n) {
          switch (n.$$typeof) {
            case C:
              return n.key === i ? l(e, t, n, r) : null;
            case w:
              return n.key === i ? u(e, t, n, r) : null;
            case E:
              return ((i = n._init), p(e, t, i(n._payload), r));
          }
          if (Oe(n) || ue(n)) return i === null ? d(e, t, n, r, null) : null;
          Na(e, n);
        }
        return null;
      }
      function m(e, t, n, r, i) {
        if ((typeof r == `string` && r !== ``) || typeof r == `number`)
          return ((e = e.get(n) || null), c(t, e, `` + r, i));
        if (typeof r == `object` && r) {
          switch (r.$$typeof) {
            case C:
              return (
                (e = e.get(r.key === null ? n : r.key) || null),
                l(t, e, r, i)
              );
            case w:
              return (
                (e = e.get(r.key === null ? n : r.key) || null),
                u(t, e, r, i)
              );
            case E:
              var a = r._init;
              return m(e, t, n, a(r._payload), i);
          }
          if (Oe(r) || ue(r))
            return ((e = e.get(n) || null), d(t, e, r, i, null));
          Na(t, r);
        }
        return null;
      }
      function h(r, a, s, c) {
        for (
          var l = null, u = null, d = a, h = (a = 0), g = null;
          d !== null && h < s.length;
          h++
        ) {
          d.index > h ? ((g = d), (d = null)) : (g = d.sibling);
          var _ = p(r, d, s[h], c);
          if (_ === null) {
            d === null && (d = g);
            break;
          }
          (e && d && _.alternate === null && t(r, d),
            (a = o(_, a, h)),
            u === null ? (l = _) : (u.sibling = _),
            (u = _),
            (d = g));
        }
        if (h === s.length) return (n(r, d), J && ha(r, h), l);
        if (d === null) {
          for (; h < s.length; h++)
            ((d = f(r, s[h], c)),
              d !== null &&
                ((a = o(d, a, h)),
                u === null ? (l = d) : (u.sibling = d),
                (u = d)));
          return (J && ha(r, h), l);
        }
        for (d = i(r, d); h < s.length; h++)
          ((g = m(d, r, h, s[h], c)),
            g !== null &&
              (e &&
                g.alternate !== null &&
                d.delete(g.key === null ? h : g.key),
              (a = o(g, a, h)),
              u === null ? (l = g) : (u.sibling = g),
              (u = g)));
        return (
          e &&
            d.forEach(function (e) {
              return t(r, e);
            }),
          J && ha(r, h),
          l
        );
      }
      function g(a, s, c, l) {
        var u = ue(c);
        if (typeof u != `function`) throw Error(r(150));
        if (((c = u.call(c)), c == null)) throw Error(r(151));
        for (
          var d = (u = null), h = s, g = (s = 0), _ = null, v = c.next();
          h !== null && !v.done;
          g++, v = c.next()
        ) {
          h.index > g ? ((_ = h), (h = null)) : (_ = h.sibling);
          var y = p(a, h, v.value, l);
          if (y === null) {
            h === null && (h = _);
            break;
          }
          (e && h && y.alternate === null && t(a, h),
            (s = o(y, s, g)),
            d === null ? (u = y) : (d.sibling = y),
            (d = y),
            (h = _));
        }
        if (v.done) return (n(a, h), J && ha(a, g), u);
        if (h === null) {
          for (; !v.done; g++, v = c.next())
            ((v = f(a, v.value, l)),
              v !== null &&
                ((s = o(v, s, g)),
                d === null ? (u = v) : (d.sibling = v),
                (d = v)));
          return (J && ha(a, g), u);
        }
        for (h = i(a, h); !v.done; g++, v = c.next())
          ((v = m(h, a, g, v.value, l)),
            v !== null &&
              (e &&
                v.alternate !== null &&
                h.delete(v.key === null ? g : v.key),
              (s = o(v, s, g)),
              d === null ? (u = v) : (d.sibling = v),
              (d = v)));
        return (
          e &&
            h.forEach(function (e) {
              return t(a, e);
            }),
          J && ha(a, g),
          u
        );
      }
      function _(e, r, i, o) {
        if (
          (typeof i == `object` &&
            i &&
            i.type === T &&
            i.key === null &&
            (i = i.props.children),
          typeof i == `object` && i)
        ) {
          switch (i.$$typeof) {
            case C:
              a: {
                for (var c = i.key, l = r; l !== null; ) {
                  if (l.key === c) {
                    if (((c = i.type), c === T)) {
                      if (l.tag === 7) {
                        (n(e, l.sibling),
                          (r = a(l, i.props.children)),
                          (r.return = e),
                          (e = r));
                        break a;
                      }
                    } else if (
                      l.elementType === c ||
                      (typeof c == `object` &&
                        c &&
                        c.$$typeof === E &&
                        Pa(c) === l.type)
                    ) {
                      (n(e, l.sibling),
                        (r = a(l, i.props)),
                        (r.ref = Ma(e, l, i)),
                        (r.return = e),
                        (e = r));
                      break a;
                    }
                    n(e, l);
                    break;
                  } else t(e, l);
                  l = l.sibling;
                }
                i.type === T
                  ? ((r = Zl(i.props.children, e.mode, o, i.key)),
                    (r.return = e),
                    (e = r))
                  : ((o = Xl(i.type, i.key, i.props, null, e.mode, o)),
                    (o.ref = Ma(e, r, i)),
                    (o.return = e),
                    (e = o));
              }
              return s(e);
            case w:
              a: {
                for (l = i.key; r !== null; ) {
                  if (r.key === l)
                    if (
                      r.tag === 4 &&
                      r.stateNode.containerInfo === i.containerInfo &&
                      r.stateNode.implementation === i.implementation
                    ) {
                      (n(e, r.sibling),
                        (r = a(r, i.children || [])),
                        (r.return = e),
                        (e = r));
                      break a;
                    } else {
                      n(e, r);
                      break;
                    }
                  else t(e, r);
                  r = r.sibling;
                }
                ((r = eu(i, e.mode, o)), (r.return = e), (e = r));
              }
              return s(e);
            case E:
              return ((l = i._init), _(e, r, l(i._payload), o));
          }
          if (Oe(i)) return h(e, r, i, o);
          if (ue(i)) return g(e, r, i, o);
          Na(e, i);
        }
        return (typeof i == `string` && i !== ``) || typeof i == `number`
          ? ((i = `` + i),
            r !== null && r.tag === 6
              ? (n(e, r.sibling), (r = a(r, i)), (r.return = e), (e = r))
              : (n(e, r), (r = $l(i, e.mode, o)), (r.return = e), (e = r)),
            s(e))
          : n(e, r);
      }
      return _;
    }
    var Ia = Fa(!0),
      La = Fa(!1),
      Ra = Wi(null),
      za = null,
      Ba = null,
      Va = null;
    function Ha() {
      Va = Ba = za = null;
    }
    function Ua(e) {
      var t = Ra.current;
      (W(Ra), (e._currentValue = t));
    }
    function Wa(e, t, n) {
      for (; e !== null; ) {
        var r = e.alternate;
        if (
          ((e.childLanes & t) === t
            ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t)
            : ((e.childLanes |= t), r !== null && (r.childLanes |= t)),
          e === n)
        )
          break;
        e = e.return;
      }
    }
    function Ga(e, t) {
      ((za = e),
        (Va = Ba = null),
        (e = e.dependencies),
        e !== null &&
          e.firstContext !== null &&
          ((e.lanes & t) !== 0 && (Ms = !0), (e.firstContext = null)));
    }
    function Ka(e) {
      var t = e._currentValue;
      if (Va !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), Ba === null)) {
          if (za === null) throw Error(r(308));
          ((Ba = e), (za.dependencies = { lanes: 0, firstContext: e }));
        } else Ba = Ba.next = e;
      return t;
    }
    var qa = null;
    function Y(e) {
      qa === null ? (qa = [e]) : qa.push(e);
    }
    function Ja(e, t, n, r) {
      var i = t.interleaved;
      return (
        i === null ? ((n.next = n), Y(t)) : ((n.next = i.next), (i.next = n)),
        (t.interleaved = n),
        Ya(e, r)
      );
    }
    function Ya(e, t) {
      e.lanes |= t;
      var n = e.alternate;
      for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        ((e.childLanes |= t),
          (n = e.alternate),
          n !== null && (n.childLanes |= t),
          (n = e),
          (e = e.return));
      return n.tag === 3 ? n.stateNode : null;
    }
    var Xa = !1;
    function Za(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
      };
    }
    function Qa(e, t) {
      ((e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects,
          }));
    }
    function $a(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      };
    }
    function eo(e, t, n) {
      var r = e.updateQueue;
      if (r === null) return null;
      if (((r = r.shared), $ & 2)) {
        var i = r.pending;
        return (
          i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
          (r.pending = t),
          Ya(e, n)
        );
      }
      return (
        (i = r.interleaved),
        i === null ? ((t.next = t), Y(r)) : ((t.next = i.next), (i.next = t)),
        (r.interleaved = t),
        Ya(e, n)
      );
    }
    function to(e, t, n) {
      if (((t = t.updateQueue), t !== null && ((t = t.shared), n & 4194240))) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), L(e, n));
      }
    }
    function no(e, t) {
      var n = e.updateQueue,
        r = e.alternate;
      if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
          a = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var o = {
              eventTime: n.eventTime,
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: n.callback,
              next: null,
            };
            (a === null ? (i = a = o) : (a = a.next = o), (n = n.next));
          } while (n !== null);
          a === null ? (i = a = t) : (a = a.next = t);
        } else i = a = t;
        ((n = {
          baseState: r.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: a,
          shared: r.shared,
          effects: r.effects,
        }),
          (e.updateQueue = n));
        return;
      }
      ((e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t));
    }
    function ro(e, t, n, r) {
      var i = e.updateQueue;
      Xa = !1;
      var a = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        s = i.shared.pending;
      if (s !== null) {
        i.shared.pending = null;
        var c = s,
          l = c.next;
        ((c.next = null), o === null ? (a = l) : (o.next = l), (o = c));
        var u = e.alternate;
        u !== null &&
          ((u = u.updateQueue),
          (s = u.lastBaseUpdate),
          s !== o &&
            (s === null ? (u.firstBaseUpdate = l) : (s.next = l),
            (u.lastBaseUpdate = c)));
      }
      if (a !== null) {
        var d = i.baseState;
        ((o = 0), (u = l = c = null), (s = a));
        do {
          var f = s.lane,
            p = s.eventTime;
          if ((r & f) === f) {
            u !== null &&
              (u = u.next =
                {
                  eventTime: p,
                  lane: 0,
                  tag: s.tag,
                  payload: s.payload,
                  callback: s.callback,
                  next: null,
                });
            a: {
              var m = e,
                h = s;
              switch (((f = t), (p = n), h.tag)) {
                case 1:
                  if (((m = h.payload), typeof m == `function`)) {
                    d = m.call(p, d, f);
                    break a;
                  }
                  d = m;
                  break a;
                case 3:
                  m.flags = (m.flags & -65537) | 128;
                case 0:
                  if (
                    ((m = h.payload),
                    (f = typeof m == `function` ? m.call(p, d, f) : m),
                    f == null)
                  )
                    break a;
                  d = D({}, d, f);
                  break a;
                case 2:
                  Xa = !0;
              }
            }
            s.callback !== null &&
              s.lane !== 0 &&
              ((e.flags |= 64),
              (f = i.effects),
              f === null ? (i.effects = [s]) : f.push(s));
          } else
            ((p = {
              eventTime: p,
              lane: f,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            }),
              u === null ? ((l = u = p), (c = d)) : (u = u.next = p),
              (o |= f));
          if (((s = s.next), s === null)) {
            if (((s = i.shared.pending), s === null)) break;
            ((f = s),
              (s = f.next),
              (f.next = null),
              (i.lastBaseUpdate = f),
              (i.shared.pending = null));
          }
        } while (1);
        if (
          (u === null && (c = d),
          (i.baseState = c),
          (i.firstBaseUpdate = l),
          (i.lastBaseUpdate = u),
          (t = i.shared.interleaved),
          t !== null)
        ) {
          i = t;
          do ((o |= i.lane), (i = i.next));
          while (i !== t);
        } else a === null && (i.shared.lanes = 0);
        ((Jc |= o), (e.lanes = o), (e.memoizedState = d));
      }
    }
    function io(e, t, n) {
      if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
          var i = e[t],
            a = i.callback;
          if (a !== null) {
            if (((i.callback = null), (i = n), typeof a != `function`))
              throw Error(r(191, a));
            a.call(i);
          }
        }
    }
    var ao = {},
      oo = Wi(ao),
      so = Wi(ao),
      co = Wi(ao);
    function lo(e) {
      if (e === ao) throw Error(r(174));
      return e;
    }
    function uo(e, t) {
      switch ((G(co, t), G(so, e), G(oo, ao), (e = t.nodeType), e)) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : Fe(null, ``);
          break;
        default:
          ((e = e === 8 ? t.parentNode : t),
            (t = e.namespaceURI || null),
            (e = e.tagName),
            (t = Fe(t, e)));
      }
      (W(oo), G(oo, t));
    }
    function fo() {
      (W(oo), W(so), W(co));
    }
    function po(e) {
      lo(co.current);
      var t = lo(oo.current),
        n = Fe(t, e.type);
      t !== n && (G(so, e), G(oo, n));
    }
    function mo(e) {
      so.current === e && (W(oo), W(so));
    }
    var X = Wi(0);
    function ho(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (
            n !== null &&
            ((n = n.dehydrated),
            n === null || n.data === `$?` || n.data === `$!`)
          )
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
      return null;
    }
    var go = [];
    function _o() {
      for (var e = 0; e < go.length; e++)
        go[e]._workInProgressVersionPrimary = null;
      go.length = 0;
    }
    var vo = S.ReactCurrentDispatcher,
      yo = S.ReactCurrentBatchConfig,
      bo = 0,
      Z = null,
      xo = null,
      So = null,
      Co = !1,
      wo = !1,
      To = 0,
      Eo = 0;
    function Do() {
      throw Error(r(321));
    }
    function Oo(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!kr(e[n], t[n])) return !1;
      return !0;
    }
    function ko(e, t, n, i, a, o) {
      if (
        ((bo = o),
        (Z = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (vo.current = e === null || e.memoizedState === null ? fs : ps),
        (e = n(i, a)),
        wo)
      ) {
        o = 0;
        do {
          if (((wo = !1), (To = 0), 25 <= o)) throw Error(r(301));
          ((o += 1),
            (So = xo = null),
            (t.updateQueue = null),
            (vo.current = ms),
            (e = n(i, a)));
        } while (wo);
      }
      if (
        ((vo.current = ds),
        (t = xo !== null && xo.next !== null),
        (bo = 0),
        (So = xo = Z = null),
        (Co = !1),
        t)
      )
        throw Error(r(300));
      return e;
    }
    function Ao() {
      var e = To !== 0;
      return ((To = 0), e);
    }
    function jo() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return (
        So === null ? (Z.memoizedState = So = e) : (So = So.next = e),
        So
      );
    }
    function Mo() {
      if (xo === null) {
        var e = Z.alternate;
        e = e === null ? null : e.memoizedState;
      } else e = xo.next;
      var t = So === null ? Z.memoizedState : So.next;
      if (t !== null) ((So = t), (xo = e));
      else {
        if (e === null) throw Error(r(310));
        ((xo = e),
          (e = {
            memoizedState: xo.memoizedState,
            baseState: xo.baseState,
            baseQueue: xo.baseQueue,
            queue: xo.queue,
            next: null,
          }),
          So === null ? (Z.memoizedState = So = e) : (So = So.next = e));
      }
      return So;
    }
    function No(e, t) {
      return typeof t == `function` ? t(e) : t;
    }
    function Po(e) {
      var t = Mo(),
        n = t.queue;
      if (n === null) throw Error(r(311));
      n.lastRenderedReducer = e;
      var i = xo,
        a = i.baseQueue,
        o = n.pending;
      if (o !== null) {
        if (a !== null) {
          var s = a.next;
          ((a.next = o.next), (o.next = s));
        }
        ((i.baseQueue = a = o), (n.pending = null));
      }
      if (a !== null) {
        ((o = a.next), (i = i.baseState));
        var c = (s = null),
          l = null,
          u = o;
        do {
          var d = u.lane;
          if ((bo & d) === d)
            (l !== null &&
              (l = l.next =
                {
                  lane: 0,
                  action: u.action,
                  hasEagerState: u.hasEagerState,
                  eagerState: u.eagerState,
                  next: null,
                }),
              (i = u.hasEagerState ? u.eagerState : e(i, u.action)));
          else {
            var f = {
              lane: d,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            };
            (l === null ? ((c = l = f), (s = i)) : (l = l.next = f),
              (Z.lanes |= d),
              (Jc |= d));
          }
          u = u.next;
        } while (u !== null && u !== o);
        (l === null ? (s = i) : (l.next = c),
          kr(i, t.memoizedState) || (Ms = !0),
          (t.memoizedState = i),
          (t.baseState = s),
          (t.baseQueue = l),
          (n.lastRenderedState = i));
      }
      if (((e = n.interleaved), e !== null)) {
        a = e;
        do ((o = a.lane), (Z.lanes |= o), (Jc |= o), (a = a.next));
        while (a !== e);
      } else a === null && (n.lanes = 0);
      return [t.memoizedState, n.dispatch];
    }
    function Fo(e) {
      var t = Mo(),
        n = t.queue;
      if (n === null) throw Error(r(311));
      n.lastRenderedReducer = e;
      var i = n.dispatch,
        a = n.pending,
        o = t.memoizedState;
      if (a !== null) {
        n.pending = null;
        var s = (a = a.next);
        do ((o = e(o, s.action)), (s = s.next));
        while (s !== a);
        (kr(o, t.memoizedState) || (Ms = !0),
          (t.memoizedState = o),
          t.baseQueue === null && (t.baseState = o),
          (n.lastRenderedState = o));
      }
      return [o, i];
    }
    function Io() {}
    function Lo(e, t) {
      var n = Z,
        i = Mo(),
        a = t(),
        o = !kr(i.memoizedState, a);
      if (
        (o && ((i.memoizedState = a), (Ms = !0)),
        (i = i.queue),
        Yo(Bo.bind(null, n, i, e), [e]),
        i.getSnapshot !== t || o || (So !== null && So.memoizedState.tag & 1))
      ) {
        if (
          ((n.flags |= 2048),
          Wo(9, zo.bind(null, n, i, a, t), void 0, null),
          Vc === null)
        )
          throw Error(r(349));
        bo & 30 || Ro(n, t, a);
      }
      return a;
    }
    function Ro(e, t, n) {
      ((e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = Z.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (Z.updateQueue = t),
            (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
    }
    function zo(e, t, n, r) {
      ((t.value = n), (t.getSnapshot = r), Vo(t) && Ho(e));
    }
    function Bo(e, t, n) {
      return n(function () {
        Vo(t) && Ho(e);
      });
    }
    function Vo(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !kr(e, n);
      } catch {
        return !0;
      }
    }
    function Ho(e) {
      var t = Ya(e, 1);
      t !== null && ml(t, e, 1, -1);
    }
    function Uo(e) {
      var t = jo();
      return (
        typeof e == `function` && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: No,
          lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = ss.bind(null, Z, e)),
        [t.memoizedState, e]
      );
    }
    function Wo(e, t, n, r) {
      return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = Z.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (Z.updateQueue = t),
            (t.lastEffect = e.next = e))
          : ((n = t.lastEffect),
            n === null
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
        e
      );
    }
    function Go() {
      return Mo().memoizedState;
    }
    function Ko(e, t, n, r) {
      var i = jo();
      ((Z.flags |= e),
        (i.memoizedState = Wo(1 | t, n, void 0, r === void 0 ? null : r)));
    }
    function qo(e, t, n, r) {
      var i = Mo();
      r = r === void 0 ? null : r;
      var a = void 0;
      if (xo !== null) {
        var o = xo.memoizedState;
        if (((a = o.destroy), r !== null && Oo(r, o.deps))) {
          i.memoizedState = Wo(t, n, a, r);
          return;
        }
      }
      ((Z.flags |= e), (i.memoizedState = Wo(1 | t, n, a, r)));
    }
    function Jo(e, t) {
      return Ko(8390656, 8, e, t);
    }
    function Yo(e, t) {
      return qo(2048, 8, e, t);
    }
    function Xo(e, t) {
      return qo(4, 2, e, t);
    }
    function Zo(e, t) {
      return qo(4, 4, e, t);
    }
    function Qo(e, t) {
      if (typeof t == `function`)
        return (
          (e = e()),
          t(e),
          function () {
            t(null);
          }
        );
      if (t != null)
        return (
          (e = e()),
          (t.current = e),
          function () {
            t.current = null;
          }
        );
    }
    function $o(e, t, n) {
      return (
        (n = n == null ? null : n.concat([e])),
        qo(4, 4, Qo.bind(null, t, e), n)
      );
    }
    function es() {}
    function ts(e, t) {
      var n = Mo();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && Oo(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
    }
    function ns(e, t) {
      var n = Mo();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && Oo(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
    }
    function rs(e, t, n) {
      return bo & 21
        ? (kr(n, t) ||
            ((n = zt()), (Z.lanes |= n), (Jc |= n), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (Ms = !0)),
          (e.memoizedState = n));
    }
    function is(e, t) {
      var n = R;
      ((R = n !== 0 && 4 > n ? n : 4), e(!0));
      var r = yo.transition;
      yo.transition = {};
      try {
        (e(!1), t());
      } finally {
        ((R = n), (yo.transition = r));
      }
    }
    function as() {
      return Mo().memoizedState;
    }
    function os(e, t, n) {
      var r = pl(e);
      if (
        ((n = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        cs(e))
      )
        ls(t, n);
      else if (((n = Ja(e, t, n, r)), n !== null)) {
        var i = fl();
        (ml(n, e, r, i), us(n, t, r));
      }
    }
    function ss(e, t, n) {
      var r = pl(e),
        i = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
      if (cs(e)) ls(t, i);
      else {
        var a = e.alternate;
        if (
          e.lanes === 0 &&
          (a === null || a.lanes === 0) &&
          ((a = t.lastRenderedReducer), a !== null)
        )
          try {
            var o = t.lastRenderedState,
              s = a(o, n);
            if (((i.hasEagerState = !0), (i.eagerState = s), kr(s, o))) {
              var c = t.interleaved;
              (c === null
                ? ((i.next = i), Y(t))
                : ((i.next = c.next), (c.next = i)),
                (t.interleaved = i));
              return;
            }
          } catch {}
        ((n = Ja(e, t, i, r)),
          n !== null && ((i = fl()), ml(n, e, r, i), us(n, t, r)));
      }
    }
    function cs(e) {
      var t = e.alternate;
      return e === Z || (t !== null && t === Z);
    }
    function ls(e, t) {
      wo = Co = !0;
      var n = e.pending;
      (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t));
    }
    function us(e, t, n) {
      if (n & 4194240) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), L(e, n));
      }
    }
    var ds = {
        readContext: Ka,
        useCallback: Do,
        useContext: Do,
        useEffect: Do,
        useImperativeHandle: Do,
        useInsertionEffect: Do,
        useLayoutEffect: Do,
        useMemo: Do,
        useReducer: Do,
        useRef: Do,
        useState: Do,
        useDebugValue: Do,
        useDeferredValue: Do,
        useTransition: Do,
        useMutableSource: Do,
        useSyncExternalStore: Do,
        useId: Do,
        unstable_isNewReconciler: !1,
      },
      fs = {
        readContext: Ka,
        useCallback: function (e, t) {
          return ((jo().memoizedState = [e, t === void 0 ? null : t]), e);
        },
        useContext: Ka,
        useEffect: Jo,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = n == null ? null : n.concat([e])),
            Ko(4194308, 4, Qo.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return Ko(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          return Ko(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = jo();
          return (
            (t = t === void 0 ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = jo();
          return (
            (t = n === void 0 ? t : n(t)),
            (r.memoizedState = r.baseState = t),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: t,
            }),
            (r.queue = e),
            (e = e.dispatch = os.bind(null, Z, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = jo();
          return ((e = { current: e }), (t.memoizedState = e));
        },
        useState: Uo,
        useDebugValue: es,
        useDeferredValue: function (e) {
          return (jo().memoizedState = e);
        },
        useTransition: function () {
          var e = Uo(!1),
            t = e[0];
          return ((e = is.bind(null, e[1])), (jo().memoizedState = e), [t, e]);
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
          var i = Z,
            a = jo();
          if (J) {
            if (n === void 0) throw Error(r(407));
            n = n();
          } else {
            if (((n = t()), Vc === null)) throw Error(r(349));
            bo & 30 || Ro(i, t, n);
          }
          a.memoizedState = n;
          var o = { value: n, getSnapshot: t };
          return (
            (a.queue = o),
            Jo(Bo.bind(null, i, o, e), [e]),
            (i.flags |= 2048),
            Wo(9, zo.bind(null, i, o, n, t), void 0, null),
            n
          );
        },
        useId: function () {
          var e = jo(),
            t = Vc.identifierPrefix;
          if (J) {
            var n = ma,
              r = pa;
            ((n = (r & ~(1 << (32 - kt(r) - 1))).toString(32) + n),
              (t = `:` + t + `R` + n),
              (n = To++),
              0 < n && (t += `H` + n.toString(32)),
              (t += `:`));
          } else ((n = Eo++), (t = `:` + t + `r` + n.toString(32) + `:`));
          return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
      },
      ps = {
        readContext: Ka,
        useCallback: ts,
        useContext: Ka,
        useEffect: Yo,
        useImperativeHandle: $o,
        useInsertionEffect: Xo,
        useLayoutEffect: Zo,
        useMemo: ns,
        useReducer: Po,
        useRef: Go,
        useState: function () {
          return Po(No);
        },
        useDebugValue: es,
        useDeferredValue: function (e) {
          return rs(Mo(), xo.memoizedState, e);
        },
        useTransition: function () {
          return [Po(No)[0], Mo().memoizedState];
        },
        useMutableSource: Io,
        useSyncExternalStore: Lo,
        useId: as,
        unstable_isNewReconciler: !1,
      },
      ms = {
        readContext: Ka,
        useCallback: ts,
        useContext: Ka,
        useEffect: Yo,
        useImperativeHandle: $o,
        useInsertionEffect: Xo,
        useLayoutEffect: Zo,
        useMemo: ns,
        useReducer: Fo,
        useRef: Go,
        useState: function () {
          return Fo(No);
        },
        useDebugValue: es,
        useDeferredValue: function (e) {
          var t = Mo();
          return xo === null
            ? (t.memoizedState = e)
            : rs(t, xo.memoizedState, e);
        },
        useTransition: function () {
          return [Fo(No)[0], Mo().memoizedState];
        },
        useMutableSource: Io,
        useSyncExternalStore: Lo,
        useId: as,
        unstable_isNewReconciler: !1,
      };
    function hs(e, t) {
      if (e && e.defaultProps) {
        for (var n in ((t = D({}, t)), (e = e.defaultProps), e))
          t[n] === void 0 && (t[n] = e[n]);
        return t;
      }
      return t;
    }
    function gs(e, t, n, r) {
      ((t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : D({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n));
    }
    var _s = {
      isMounted: function (e) {
        return (e = e._reactInternals) ? ft(e) === e : !1;
      },
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = fl(),
          i = pl(e),
          a = $a(r, i);
        ((a.payload = t),
          n != null && (a.callback = n),
          (t = eo(e, a, i)),
          t !== null && (ml(t, e, i, r), to(t, e, i)));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = fl(),
          i = pl(e),
          a = $a(r, i);
        ((a.tag = 1),
          (a.payload = t),
          n != null && (a.callback = n),
          (t = eo(e, a, i)),
          t !== null && (ml(t, e, i, r), to(t, e, i)));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = fl(),
          r = pl(e),
          i = $a(n, r);
        ((i.tag = 2),
          t != null && (i.callback = t),
          (t = eo(e, i, r)),
          t !== null && (ml(t, e, r, n), to(t, e, r)));
      },
    };
    function vs(e, t, n, r, i, a, o) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == `function`
          ? e.shouldComponentUpdate(r, a, o)
          : t.prototype && t.prototype.isPureReactComponent
            ? !Ar(n, r) || !Ar(i, a)
            : !0
      );
    }
    function ys(e, t, n) {
      var r = !1,
        i = Gi,
        a = t.contextType;
      return (
        typeof a == `object` && a
          ? (a = Ka(a))
          : ((i = Xi(t) ? Ji : Ki.current),
            (r = t.contextTypes),
            (a = (r = r != null) ? Yi(e, i) : Gi)),
        (t = new t(n, a)),
        (e.memoizedState =
          t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = _s),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = i),
          (e.__reactInternalMemoizedMaskedChildContext = a)),
        t
      );
    }
    function bs(e, t, n, r) {
      ((e = t.state),
        typeof t.componentWillReceiveProps == `function` &&
          t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == `function` &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && _s.enqueueReplaceState(t, t.state, null));
    }
    function xs(e, t, n, r) {
      var i = e.stateNode;
      ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), Za(e));
      var a = t.contextType;
      (typeof a == `object` && a
        ? (i.context = Ka(a))
        : ((a = Xi(t) ? Ji : Ki.current), (i.context = Yi(e, a))),
        (i.state = e.memoizedState),
        (a = t.getDerivedStateFromProps),
        typeof a == `function` && (gs(e, t, a, n), (i.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == `function` ||
          typeof i.getSnapshotBeforeUpdate == `function` ||
          (typeof i.UNSAFE_componentWillMount != `function` &&
            typeof i.componentWillMount != `function`) ||
          ((t = i.state),
          typeof i.componentWillMount == `function` && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == `function` &&
            i.UNSAFE_componentWillMount(),
          t !== i.state && _s.enqueueReplaceState(i, i.state, null),
          ro(e, n, i, r),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == `function` && (e.flags |= 4194308));
    }
    function Ss(e, t) {
      try {
        var n = ``,
          r = t;
        do ((n += he(r)), (r = r.return));
        while (r);
        var i = n;
      } catch (e) {
        i =
          `
Error generating stack: ` +
          e.message +
          `
` +
          e.stack;
      }
      return { value: e, source: t, stack: i, digest: null };
    }
    function Cs(e, t, n) {
      return { value: e, source: null, stack: n ?? null, digest: t ?? null };
    }
    function ws(e, t) {
      try {
        console.error(t.value);
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    var Ts = typeof WeakMap == `function` ? WeakMap : Map;
    function Es(e, t, n) {
      ((n = $a(-1, n)), (n.tag = 3), (n.payload = { element: null }));
      var r = t.value;
      return (
        (n.callback = function () {
          (nl || ((nl = !0), (rl = r)), ws(e, t));
        }),
        n
      );
    }
    function Ds(e, t, n) {
      ((n = $a(-1, n)), (n.tag = 3));
      var r = e.type.getDerivedStateFromError;
      if (typeof r == `function`) {
        var i = t.value;
        ((n.payload = function () {
          return r(i);
        }),
          (n.callback = function () {
            ws(e, t);
          }));
      }
      var a = e.stateNode;
      return (
        a !== null &&
          typeof a.componentDidCatch == `function` &&
          (n.callback = function () {
            (ws(e, t),
              typeof r != `function` &&
                (il === null ? (il = new Set([this])) : il.add(this)));
            var n = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: n === null ? `` : n,
            });
          }),
        n
      );
    }
    function Os(e, t, n) {
      var r = e.pingCache;
      if (r === null) {
        r = e.pingCache = new Ts();
        var i = new Set();
        r.set(t, i);
      } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
      i.has(n) || (i.add(n), (e = zl.bind(null, e, t, n)), t.then(e, e));
    }
    function ks(e) {
      do {
        var t;
        if (
          ((t = e.tag === 13) &&
            ((t = e.memoizedState), (t = t === null || t.dehydrated !== null)),
          t)
        )
          return e;
        e = e.return;
      } while (e !== null);
      return null;
    }
    function As(e, t, n, r, i) {
      return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = i), e)
        : (e === t
            ? (e.flags |= 65536)
            : ((e.flags |= 128),
              (n.flags |= 131072),
              (n.flags &= -52805),
              n.tag === 1 &&
                (n.alternate === null
                  ? (n.tag = 17)
                  : ((t = $a(-1, 1)), (t.tag = 2), eo(n, t, 1))),
              (n.lanes |= 1)),
          e);
    }
    var js = S.ReactCurrentOwner,
      Ms = !1;
    function Ns(e, t, n, r) {
      t.child = e === null ? La(t, null, n, r) : Ia(t, e.child, n, r);
    }
    function Ps(e, t, n, r, i) {
      n = n.render;
      var a = t.ref;
      return (
        Ga(t, i),
        (r = ko(e, t, n, r, a, i)),
        (n = Ao()),
        e !== null && !Ms
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~i),
            ec(e, t, i))
          : (J && n && _a(t), (t.flags |= 1), Ns(e, t, r, i), t.child)
      );
    }
    function Fs(e, t, n, r, i) {
      if (e === null) {
        var a = n.type;
        return typeof a == `function` &&
          !ql(a) &&
          a.defaultProps === void 0 &&
          n.compare === null &&
          n.defaultProps === void 0
          ? ((t.tag = 15), (t.type = a), Is(e, t, a, r, i))
          : ((e = Xl(n.type, null, r, t, t.mode, i)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((a = e.child), (e.lanes & i) === 0)) {
        var o = a.memoizedProps;
        if (
          ((n = n.compare),
          (n = n === null ? Ar : n),
          n(o, r) && e.ref === t.ref)
        )
          return ec(e, t, i);
      }
      return (
        (t.flags |= 1),
        (e = Yl(a, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function Is(e, t, n, r, i) {
      if (e !== null) {
        var a = e.memoizedProps;
        if (Ar(a, r) && e.ref === t.ref)
          if (((Ms = !1), (t.pendingProps = r = a), (e.lanes & i) !== 0))
            e.flags & 131072 && (Ms = !0);
          else return ((t.lanes = e.lanes), ec(e, t, i));
      }
      return zs(e, t, n, r, i);
    }
    function Ls(e, t, n) {
      var r = t.pendingProps,
        i = r.children,
        a = e === null ? null : e.memoizedState;
      if (r.mode === `hidden`)
        if (!(t.mode & 1))
          ((t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            G(Gc, Wc),
            (Wc |= n));
        else {
          if (!(n & 1073741824))
            return (
              (e = a === null ? n : a.baseLanes | n),
              (t.lanes = t.childLanes = 1073741824),
              (t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null,
              }),
              (t.updateQueue = null),
              G(Gc, Wc),
              (Wc |= e),
              null
            );
          ((t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            (r = a === null ? n : a.baseLanes),
            G(Gc, Wc),
            (Wc |= r));
        }
      else
        (a === null
          ? (r = n)
          : ((r = a.baseLanes | n), (t.memoizedState = null)),
          G(Gc, Wc),
          (Wc |= r));
      return (Ns(e, t, i, n), t.child);
    }
    function Rs(e, t) {
      var n = t.ref;
      ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
    }
    function zs(e, t, n, r, i) {
      var a = Xi(n) ? Ji : Ki.current;
      return (
        (a = Yi(t, a)),
        Ga(t, i),
        (n = ko(e, t, n, r, a, i)),
        (r = Ao()),
        e !== null && !Ms
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~i),
            ec(e, t, i))
          : (J && r && _a(t), (t.flags |= 1), Ns(e, t, n, i), t.child)
      );
    }
    function Bs(e, t, n, r, i) {
      if (Xi(n)) {
        var a = !0;
        ea(t);
      } else a = !1;
      if ((Ga(t, i), t.stateNode === null))
        ($s(e, t), ys(t, n, r), xs(t, n, r, i), (r = !0));
      else if (e === null) {
        var o = t.stateNode,
          s = t.memoizedProps;
        o.props = s;
        var c = o.context,
          l = n.contextType;
        typeof l == `object` && l
          ? (l = Ka(l))
          : ((l = Xi(n) ? Ji : Ki.current), (l = Yi(t, l)));
        var u = n.getDerivedStateFromProps,
          d =
            typeof u == `function` ||
            typeof o.getSnapshotBeforeUpdate == `function`;
        (d ||
          (typeof o.UNSAFE_componentWillReceiveProps != `function` &&
            typeof o.componentWillReceiveProps != `function`) ||
          ((s !== r || c !== l) && bs(t, o, r, l)),
          (Xa = !1));
        var f = t.memoizedState;
        ((o.state = f),
          ro(t, r, o, i),
          (c = t.memoizedState),
          s !== r || f !== c || qi.current || Xa
            ? (typeof u == `function` &&
                (gs(t, n, u, r), (c = t.memoizedState)),
              (s = Xa || vs(t, n, s, r, f, c, l))
                ? (d ||
                    (typeof o.UNSAFE_componentWillMount != `function` &&
                      typeof o.componentWillMount != `function`) ||
                    (typeof o.componentWillMount == `function` &&
                      o.componentWillMount(),
                    typeof o.UNSAFE_componentWillMount == `function` &&
                      o.UNSAFE_componentWillMount()),
                  typeof o.componentDidMount == `function` &&
                    (t.flags |= 4194308))
                : (typeof o.componentDidMount == `function` &&
                    (t.flags |= 4194308),
                  (t.memoizedProps = r),
                  (t.memoizedState = c)),
              (o.props = r),
              (o.state = c),
              (o.context = l),
              (r = s))
            : (typeof o.componentDidMount == `function` && (t.flags |= 4194308),
              (r = !1)));
      } else {
        ((o = t.stateNode),
          Qa(e, t),
          (s = t.memoizedProps),
          (l = t.type === t.elementType ? s : hs(t.type, s)),
          (o.props = l),
          (d = t.pendingProps),
          (f = o.context),
          (c = n.contextType),
          typeof c == `object` && c
            ? (c = Ka(c))
            : ((c = Xi(n) ? Ji : Ki.current), (c = Yi(t, c))));
        var p = n.getDerivedStateFromProps;
        ((u =
          typeof p == `function` ||
          typeof o.getSnapshotBeforeUpdate == `function`) ||
          (typeof o.UNSAFE_componentWillReceiveProps != `function` &&
            typeof o.componentWillReceiveProps != `function`) ||
          ((s !== d || f !== c) && bs(t, o, r, c)),
          (Xa = !1),
          (f = t.memoizedState),
          (o.state = f),
          ro(t, r, o, i));
        var m = t.memoizedState;
        s !== d || f !== m || qi.current || Xa
          ? (typeof p == `function` && (gs(t, n, p, r), (m = t.memoizedState)),
            (l = Xa || vs(t, n, l, r, f, m, c) || !1)
              ? (u ||
                  (typeof o.UNSAFE_componentWillUpdate != `function` &&
                    typeof o.componentWillUpdate != `function`) ||
                  (typeof o.componentWillUpdate == `function` &&
                    o.componentWillUpdate(r, m, c),
                  typeof o.UNSAFE_componentWillUpdate == `function` &&
                    o.UNSAFE_componentWillUpdate(r, m, c)),
                typeof o.componentDidUpdate == `function` && (t.flags |= 4),
                typeof o.getSnapshotBeforeUpdate == `function` &&
                  (t.flags |= 1024))
              : (typeof o.componentDidUpdate != `function` ||
                  (s === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                typeof o.getSnapshotBeforeUpdate != `function` ||
                  (s === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = r),
                (t.memoizedState = m)),
            (o.props = r),
            (o.state = m),
            (o.context = c),
            (r = l))
          : (typeof o.componentDidUpdate != `function` ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != `function` ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (r = !1));
      }
      return Vs(e, t, n, r, a, i);
    }
    function Vs(e, t, n, r, i, a) {
      Rs(e, t);
      var o = (t.flags & 128) != 0;
      if (!r && !o) return (i && ta(t, n, !1), ec(e, t, a));
      ((r = t.stateNode), (js.current = t));
      var s =
        o && typeof n.getDerivedStateFromError != `function`
          ? null
          : r.render();
      return (
        (t.flags |= 1),
        e !== null && o
          ? ((t.child = Ia(t, e.child, null, a)), (t.child = Ia(t, null, s, a)))
          : Ns(e, t, s, a),
        (t.memoizedState = r.state),
        i && ta(t, n, !0),
        t.child
      );
    }
    function Hs(e) {
      var t = e.stateNode;
      (t.pendingContext
        ? Qi(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Qi(e, t.context, !1),
        uo(e, t.containerInfo));
    }
    function Us(e, t, n, r, i) {
      return (ka(), Aa(i), (t.flags |= 256), Ns(e, t, n, r), t.child);
    }
    var Ws = { dehydrated: null, treeContext: null, retryLane: 0 };
    function Gs(e) {
      return { baseLanes: e, cachePool: null, transitions: null };
    }
    function Ks(e, t, n) {
      var r = t.pendingProps,
        i = X.current,
        a = !1,
        o = (t.flags & 128) != 0,
        s;
      if (
        ((s = o) ||
          (s = e !== null && e.memoizedState === null ? !1 : (i & 2) != 0),
        s
          ? ((a = !0), (t.flags &= -129))
          : (e === null || e.memoizedState !== null) && (i |= 1),
        G(X, i & 1),
        e === null)
      )
        return (
          Ta(t),
          (e = t.memoizedState),
          e !== null && ((e = e.dehydrated), e !== null)
            ? (t.mode & 1
                ? e.data === `$!`
                  ? (t.lanes = 8)
                  : (t.lanes = 1073741824)
                : (t.lanes = 1),
              null)
            : ((o = r.children),
              (e = r.fallback),
              a
                ? ((r = t.mode),
                  (a = t.child),
                  (o = { mode: `hidden`, children: o }),
                  !(r & 1) && a !== null
                    ? ((a.childLanes = 0), (a.pendingProps = o))
                    : (a = Ql(o, r, 0, null)),
                  (e = Zl(e, r, n, null)),
                  (a.return = t),
                  (e.return = t),
                  (a.sibling = e),
                  (t.child = a),
                  (t.child.memoizedState = Gs(n)),
                  (t.memoizedState = Ws),
                  e)
                : qs(t, o))
        );
      if (
        ((i = e.memoizedState), i !== null && ((s = i.dehydrated), s !== null))
      )
        return Ys(e, t, o, r, s, i, n);
      if (a) {
        ((a = r.fallback), (o = t.mode), (i = e.child), (s = i.sibling));
        var c = { mode: `hidden`, children: r.children };
        return (
          !(o & 1) && t.child !== i
            ? ((r = t.child),
              (r.childLanes = 0),
              (r.pendingProps = c),
              (t.deletions = null))
            : ((r = Yl(i, c)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
          s === null
            ? ((a = Zl(a, o, n, null)), (a.flags |= 2))
            : (a = Yl(s, a)),
          (a.return = t),
          (r.return = t),
          (r.sibling = a),
          (t.child = r),
          (r = a),
          (a = t.child),
          (o = e.child.memoizedState),
          (o =
            o === null
              ? Gs(n)
              : {
                  baseLanes: o.baseLanes | n,
                  cachePool: null,
                  transitions: o.transitions,
                }),
          (a.memoizedState = o),
          (a.childLanes = e.childLanes & ~n),
          (t.memoizedState = Ws),
          r
        );
      }
      return (
        (a = e.child),
        (e = a.sibling),
        (r = Yl(a, { mode: `visible`, children: r.children })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
          ((n = t.deletions),
          n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
      );
    }
    function qs(e, t) {
      return (
        (t = Ql({ mode: `visible`, children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
      );
    }
    function Js(e, t, n, r) {
      return (
        r !== null && Aa(r),
        Ia(t, e.child, null, n),
        (e = qs(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function Ys(e, t, n, i, a, o, s) {
      if (n)
        return t.flags & 256
          ? ((t.flags &= -257), (i = Cs(Error(r(422)))), Js(e, t, s, i))
          : t.memoizedState === null
            ? ((o = i.fallback),
              (a = t.mode),
              (i = Ql({ mode: `visible`, children: i.children }, a, 0, null)),
              (o = Zl(o, a, s, null)),
              (o.flags |= 2),
              (i.return = t),
              (o.return = t),
              (i.sibling = o),
              (t.child = i),
              t.mode & 1 && Ia(t, e.child, null, s),
              (t.child.memoizedState = Gs(s)),
              (t.memoizedState = Ws),
              o)
            : ((t.child = e.child), (t.flags |= 128), null);
      if (!(t.mode & 1)) return Js(e, t, s, null);
      if (a.data === `$!`) {
        if (((i = a.nextSibling && a.nextSibling.dataset), i)) var c = i.dgst;
        return (
          (i = c),
          (o = Error(r(419))),
          (i = Cs(o, i, void 0)),
          Js(e, t, s, i)
        );
      }
      if (((c = (s & e.childLanes) !== 0), Ms || c)) {
        if (((i = Vc), i !== null)) {
          switch (s & -s) {
            case 4:
              a = 2;
              break;
            case 16:
              a = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              a = 32;
              break;
            case 536870912:
              a = 268435456;
              break;
            default:
              a = 0;
          }
          ((a = (a & (i.suspendedLanes | s)) === 0 ? a : 0),
            a !== 0 &&
              a !== o.retryLane &&
              ((o.retryLane = a), Ya(e, a), ml(i, e, a, -1)));
        }
        return (Ol(), (i = Cs(Error(r(421)))), Js(e, t, s, i));
      }
      return a.data === `$?`
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = Vl.bind(null, e)),
          (a._reactRetry = t),
          null)
        : ((e = o.treeContext),
          (ba = ki(a.nextSibling)),
          (ya = t),
          (J = !0),
          (xa = null),
          e !== null &&
            ((q[da++] = pa),
            (q[da++] = ma),
            (q[da++] = fa),
            (pa = e.id),
            (ma = e.overflow),
            (fa = t)),
          (t = qs(t, i.children)),
          (t.flags |= 4096),
          t);
    }
    function Xs(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      (r !== null && (r.lanes |= t), Wa(e.return, t, n));
    }
    function Zs(e, t, n, r, i) {
      var a = e.memoizedState;
      a === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: i,
          })
        : ((a.isBackwards = t),
          (a.rendering = null),
          (a.renderingStartTime = 0),
          (a.last = r),
          (a.tail = n),
          (a.tailMode = i));
    }
    function Qs(e, t, n) {
      var r = t.pendingProps,
        i = r.revealOrder,
        a = r.tail;
      if ((Ns(e, t, r.children, n), (r = X.current), r & 2))
        ((r = (r & 1) | 2), (t.flags |= 128));
      else {
        if (e !== null && e.flags & 128)
          a: for (e = t.child; e !== null; ) {
            if (e.tag === 13) e.memoizedState !== null && Xs(e, n, t);
            else if (e.tag === 19) Xs(e, n, t);
            else if (e.child !== null) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break a;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break a;
              e = e.return;
            }
            ((e.sibling.return = e.return), (e = e.sibling));
          }
        r &= 1;
      }
      if ((G(X, r), !(t.mode & 1))) t.memoizedState = null;
      else
        switch (i) {
          case `forwards`:
            for (n = t.child, i = null; n !== null; )
              ((e = n.alternate),
                e !== null && ho(e) === null && (i = n),
                (n = n.sibling));
            ((n = i),
              n === null
                ? ((i = t.child), (t.child = null))
                : ((i = n.sibling), (n.sibling = null)),
              Zs(t, !1, i, n, a));
            break;
          case `backwards`:
            for (n = null, i = t.child, t.child = null; i !== null; ) {
              if (((e = i.alternate), e !== null && ho(e) === null)) {
                t.child = i;
                break;
              }
              ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
            }
            Zs(t, !0, n, null, a);
            break;
          case `together`:
            Zs(t, !1, null, null, void 0);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function $s(e, t) {
      !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
    }
    function ec(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies),
        (Jc |= t.lanes),
        (n & t.childLanes) === 0)
      )
        return null;
      if (e !== null && t.child !== e.child) throw Error(r(153));
      if (t.child !== null) {
        for (
          e = t.child, n = Yl(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;
        )
          ((e = e.sibling),
            (n = n.sibling = Yl(e, e.pendingProps)),
            (n.return = t));
        n.sibling = null;
      }
      return t.child;
    }
    function tc(e, t, n) {
      switch (t.tag) {
        case 3:
          (Hs(t), ka());
          break;
        case 5:
          po(t);
          break;
        case 1:
          Xi(t.type) && ea(t);
          break;
        case 4:
          uo(t, t.stateNode.containerInfo);
          break;
        case 10:
          var r = t.type._context,
            i = t.memoizedProps.value;
          (G(Ra, r._currentValue), (r._currentValue = i));
          break;
        case 13:
          if (((r = t.memoizedState), r !== null))
            return r.dehydrated === null
              ? (n & t.child.childLanes) === 0
                ? (G(X, X.current & 1),
                  (e = ec(e, t, n)),
                  e === null ? null : e.sibling)
                : Ks(e, t, n)
              : (G(X, X.current & 1), (t.flags |= 128), null);
          G(X, X.current & 1);
          break;
        case 19:
          if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
            if (r) return Qs(e, t, n);
            t.flags |= 128;
          }
          if (
            ((i = t.memoizedState),
            i !== null &&
              ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
            G(X, X.current),
            r)
          )
            break;
          return null;
        case 22:
        case 23:
          return ((t.lanes = 0), Ls(e, t, n));
      }
      return ec(e, t, n);
    }
    var nc = function (e, t) {
        for (var n = t.child; n !== null; ) {
          if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
          else if (n.tag !== 4 && n.child !== null) {
            ((n.child.return = n), (n = n.child));
            continue;
          }
          if (n === t) break;
          for (; n.sibling === null; ) {
            if (n.return === null || n.return === t) return;
            n = n.return;
          }
          ((n.sibling.return = n.return), (n = n.sibling));
        }
      },
      rc = function (e, t, n, r) {
        var i = e.memoizedProps;
        if (i !== r) {
          ((e = t.stateNode), lo(oo.current));
          var o = null;
          switch (n) {
            case `input`:
              ((i = Se(e, i)), (r = Se(e, r)), (o = []));
              break;
            case `select`:
              ((i = D({}, i, { value: void 0 })),
                (r = D({}, r, { value: void 0 })),
                (o = []));
              break;
            case `textarea`:
              ((i = Ae(e, i)), (r = Ae(e, r)), (o = []));
              break;
            default:
              typeof i.onClick != `function` &&
                typeof r.onClick == `function` &&
                (e.onclick = yi);
          }
          Ue(n, r);
          var s;
          for (u in ((n = null), i))
            if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
              if (u === `style`) {
                var c = i[u];
                for (s in c) c.hasOwnProperty(s) && ((n ||= {}), (n[s] = ``));
              } else
                u !== `dangerouslySetInnerHTML` &&
                  u !== `children` &&
                  u !== `suppressContentEditableWarning` &&
                  u !== `suppressHydrationWarning` &&
                  u !== `autoFocus` &&
                  (a.hasOwnProperty(u) ? (o ||= []) : (o ||= []).push(u, null));
          for (u in r) {
            var l = r[u];
            if (
              ((c = i?.[u]),
              r.hasOwnProperty(u) && l !== c && (l != null || c != null))
            )
              if (u === `style`)
                if (c) {
                  for (s in c)
                    !c.hasOwnProperty(s) ||
                      (l && l.hasOwnProperty(s)) ||
                      ((n ||= {}), (n[s] = ``));
                  for (s in l)
                    l.hasOwnProperty(s) &&
                      c[s] !== l[s] &&
                      ((n ||= {}), (n[s] = l[s]));
                } else (n || ((o ||= []), o.push(u, n)), (n = l));
              else
                u === `dangerouslySetInnerHTML`
                  ? ((l = l ? l.__html : void 0),
                    (c = c ? c.__html : void 0),
                    l != null && c !== l && (o ||= []).push(u, l))
                  : u === `children`
                    ? (typeof l != `string` && typeof l != `number`) ||
                      (o ||= []).push(u, `` + l)
                    : u !== `suppressContentEditableWarning` &&
                      u !== `suppressHydrationWarning` &&
                      (a.hasOwnProperty(u)
                        ? (l != null && u === `onScroll` && H(`scroll`, e),
                          o || c === l || (o = []))
                        : (o ||= []).push(u, l));
          }
          n && (o ||= []).push(`style`, n);
          var u = o;
          (t.updateQueue = u) && (t.flags |= 4);
        }
      },
      ic = function (e, t, n, r) {
        n !== r && (t.flags |= 4);
      };
    function ac(e, t) {
      if (!J)
        switch (e.tailMode) {
          case `hidden`:
            t = e.tail;
            for (var n = null; t !== null; )
              (t.alternate !== null && (n = t), (t = t.sibling));
            n === null ? (e.tail = null) : (n.sibling = null);
            break;
          case `collapsed`:
            n = e.tail;
            for (var r = null; n !== null; )
              (n.alternate !== null && (r = n), (n = n.sibling));
            r === null
              ? t || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (r.sibling = null);
        }
    }
    function oc(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
      if (t)
        for (var i = e.child; i !== null; )
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags & 14680064),
            (r |= i.flags & 14680064),
            (i.return = e),
            (i = i.sibling));
      else
        for (i = e.child; i !== null; )
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags),
            (r |= i.flags),
            (i.return = e),
            (i = i.sibling));
      return ((e.subtreeFlags |= r), (e.childLanes = n), t);
    }
    function sc(e, t, n) {
      var i = t.pendingProps;
      switch ((va(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (oc(t), null);
        case 1:
          return (Xi(t.type) && Zi(), oc(t), null);
        case 3:
          return (
            (i = t.stateNode),
            fo(),
            W(qi),
            W(Ki),
            _o(),
            i.pendingContext &&
              ((i.context = i.pendingContext), (i.pendingContext = null)),
            (e === null || e.child === null) &&
              (Da(t)
                ? (t.flags |= 4)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), xa !== null && (vl(xa), (xa = null)))),
            oc(t),
            null
          );
        case 5:
          mo(t);
          var o = lo(co.current);
          if (((n = t.type), e !== null && t.stateNode != null))
            (rc(e, t, n, i, o),
              e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
          else {
            if (!i) {
              if (t.stateNode === null) throw Error(r(166));
              return (oc(t), null);
            }
            if (((e = lo(oo.current)), Da(t))) {
              ((i = t.stateNode), (n = t.type));
              var s = t.memoizedProps;
              switch (((i[Mi] = t), (i[Ni] = s), (e = (t.mode & 1) != 0), n)) {
                case `dialog`:
                  (H(`cancel`, i), H(`close`, i));
                  break;
                case `iframe`:
                case `object`:
                case `embed`:
                  H(`load`, i);
                  break;
                case `video`:
                case `audio`:
                  for (o = 0; o < ri.length; o++) H(ri[o], i);
                  break;
                case `source`:
                  H(`error`, i);
                  break;
                case `img`:
                case `image`:
                case `link`:
                  (H(`error`, i), H(`load`, i));
                  break;
                case `details`:
                  H(`toggle`, i);
                  break;
                case `input`:
                  (Ce(i, s), H(`invalid`, i));
                  break;
                case `select`:
                  ((i._wrapperState = { wasMultiple: !!s.multiple }),
                    H(`invalid`, i));
                  break;
                case `textarea`:
                  (je(i, s), H(`invalid`, i));
              }
              for (var c in (Ue(n, s), (o = null), s))
                if (s.hasOwnProperty(c)) {
                  var l = s[c];
                  c === `children`
                    ? typeof l == `string`
                      ? i.textContent !== l &&
                        (!0 !== s.suppressHydrationWarning &&
                          vi(i.textContent, l, e),
                        (o = [`children`, l]))
                      : typeof l == `number` &&
                        i.textContent !== `` + l &&
                        (!0 !== s.suppressHydrationWarning &&
                          vi(i.textContent, l, e),
                        (o = [`children`, `` + l]))
                    : a.hasOwnProperty(c) &&
                      l != null &&
                      c === `onScroll` &&
                      H(`scroll`, i);
                }
              switch (n) {
                case `input`:
                  (ye(i), Ee(i, s, !0));
                  break;
                case `textarea`:
                  (ye(i), Ne(i));
                  break;
                case `select`:
                case `option`:
                  break;
                default:
                  typeof s.onClick == `function` && (i.onclick = yi);
              }
              ((i = o), (t.updateQueue = i), i !== null && (t.flags |= 4));
            } else {
              ((c = o.nodeType === 9 ? o : o.ownerDocument),
                e === `http://www.w3.org/1999/xhtml` && (e = Pe(n)),
                e === `http://www.w3.org/1999/xhtml`
                  ? n === `script`
                    ? ((e = c.createElement(`div`)),
                      (e.innerHTML = `<script><\/script>`),
                      (e = e.removeChild(e.firstChild)))
                    : typeof i.is == `string`
                      ? (e = c.createElement(n, { is: i.is }))
                      : ((e = c.createElement(n)),
                        n === `select` &&
                          ((c = e),
                          i.multiple
                            ? (c.multiple = !0)
                            : i.size && (c.size = i.size)))
                  : (e = c.createElementNS(e, n)),
                (e[Mi] = t),
                (e[Ni] = i),
                nc(e, t, !1, !1),
                (t.stateNode = e));
              a: {
                switch (((c = j(n, i)), n)) {
                  case `dialog`:
                    (H(`cancel`, e), H(`close`, e), (o = i));
                    break;
                  case `iframe`:
                  case `object`:
                  case `embed`:
                    (H(`load`, e), (o = i));
                    break;
                  case `video`:
                  case `audio`:
                    for (o = 0; o < ri.length; o++) H(ri[o], e);
                    o = i;
                    break;
                  case `source`:
                    (H(`error`, e), (o = i));
                    break;
                  case `img`:
                  case `image`:
                  case `link`:
                    (H(`error`, e), H(`load`, e), (o = i));
                    break;
                  case `details`:
                    (H(`toggle`, e), (o = i));
                    break;
                  case `input`:
                    (Ce(e, i), (o = Se(e, i)), H(`invalid`, e));
                    break;
                  case `option`:
                    o = i;
                    break;
                  case `select`:
                    ((e._wrapperState = { wasMultiple: !!i.multiple }),
                      (o = D({}, i, { value: void 0 })),
                      H(`invalid`, e));
                    break;
                  case `textarea`:
                    (je(e, i), (o = Ae(e, i)), H(`invalid`, e));
                    break;
                  default:
                    o = i;
                }
                for (s in (Ue(n, o), (l = o), l))
                  if (l.hasOwnProperty(s)) {
                    var u = l[s];
                    s === `style`
                      ? Ve(e, u)
                      : s === `dangerouslySetInnerHTML`
                        ? ((u = u ? u.__html : void 0), u != null && Le(e, u))
                        : s === `children`
                          ? typeof u == `string`
                            ? (n !== `textarea` || u !== ``) && Re(e, u)
                            : typeof u == `number` && Re(e, `` + u)
                          : s !== `suppressContentEditableWarning` &&
                            s !== `suppressHydrationWarning` &&
                            s !== `autoFocus` &&
                            (a.hasOwnProperty(s)
                              ? u != null && s === `onScroll` && H(`scroll`, e)
                              : u != null && x(e, s, u, c));
                  }
                switch (n) {
                  case `input`:
                    (ye(e), Ee(e, i, !1));
                    break;
                  case `textarea`:
                    (ye(e), Ne(e));
                    break;
                  case `option`:
                    i.value != null &&
                      e.setAttribute(`value`, `` + _e(i.value));
                    break;
                  case `select`:
                    ((e.multiple = !!i.multiple),
                      (s = i.value),
                      s == null
                        ? i.defaultValue != null &&
                          ke(e, !!i.multiple, i.defaultValue, !0)
                        : ke(e, !!i.multiple, s, !1));
                    break;
                  default:
                    typeof o.onClick == `function` && (e.onclick = yi);
                }
                switch (n) {
                  case `button`:
                  case `input`:
                  case `select`:
                  case `textarea`:
                    i = !!i.autoFocus;
                    break a;
                  case `img`:
                    i = !0;
                    break a;
                  default:
                    i = !1;
                }
              }
              i && (t.flags |= 4);
            }
            t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
          }
          return (oc(t), null);
        case 6:
          if (e && t.stateNode != null) ic(e, t, e.memoizedProps, i);
          else {
            if (typeof i != `string` && t.stateNode === null)
              throw Error(r(166));
            if (((n = lo(co.current)), lo(oo.current), Da(t))) {
              if (
                ((i = t.stateNode),
                (n = t.memoizedProps),
                (i[Mi] = t),
                (s = i.nodeValue !== n) && ((e = ya), e !== null))
              )
                switch (e.tag) {
                  case 3:
                    vi(i.nodeValue, n, (e.mode & 1) != 0);
                    break;
                  case 5:
                    !0 !== e.memoizedProps.suppressHydrationWarning &&
                      vi(i.nodeValue, n, (e.mode & 1) != 0);
                }
              s && (t.flags |= 4);
            } else
              ((i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i)),
                (i[Mi] = t),
                (t.stateNode = i));
          }
          return (oc(t), null);
        case 13:
          if (
            (W(X),
            (i = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (J && ba !== null && t.mode & 1 && !(t.flags & 128))
              (Oa(), ka(), (t.flags |= 98560), (s = !1));
            else if (((s = Da(t)), i !== null && i.dehydrated !== null)) {
              if (e === null) {
                if (!s) throw Error(r(318));
                if (
                  ((s = t.memoizedState),
                  (s = s === null ? null : s.dehydrated),
                  !s)
                )
                  throw Error(r(317));
                s[Mi] = t;
              } else
                (ka(),
                  !(t.flags & 128) && (t.memoizedState = null),
                  (t.flags |= 4));
              (oc(t), (s = !1));
            } else (xa !== null && (vl(xa), (xa = null)), (s = !0));
            if (!s) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128
            ? ((t.lanes = n), t)
            : ((i = i !== null),
              i !== (e !== null && e.memoizedState !== null) &&
                i &&
                ((t.child.flags |= 8192),
                t.mode & 1 &&
                  (e === null || X.current & 1 ? Kc === 0 && (Kc = 3) : Ol())),
              t.updateQueue !== null && (t.flags |= 4),
              oc(t),
              null);
        case 4:
          return (
            fo(),
            e === null && li(t.stateNode.containerInfo),
            oc(t),
            null
          );
        case 10:
          return (Ua(t.type._context), oc(t), null);
        case 17:
          return (Xi(t.type) && Zi(), oc(t), null);
        case 19:
          if ((W(X), (s = t.memoizedState), s === null)) return (oc(t), null);
          if (((i = (t.flags & 128) != 0), (c = s.rendering), c === null))
            if (i) ac(s, !1);
            else {
              if (Kc !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null; ) {
                  if (((c = ho(e)), c !== null)) {
                    for (
                      t.flags |= 128,
                        ac(s, !1),
                        i = c.updateQueue,
                        i !== null && ((t.updateQueue = i), (t.flags |= 4)),
                        t.subtreeFlags = 0,
                        i = n,
                        n = t.child;
                      n !== null;
                    )
                      ((s = n),
                        (e = i),
                        (s.flags &= 14680066),
                        (c = s.alternate),
                        c === null
                          ? ((s.childLanes = 0),
                            (s.lanes = e),
                            (s.child = null),
                            (s.subtreeFlags = 0),
                            (s.memoizedProps = null),
                            (s.memoizedState = null),
                            (s.updateQueue = null),
                            (s.dependencies = null),
                            (s.stateNode = null))
                          : ((s.childLanes = c.childLanes),
                            (s.lanes = c.lanes),
                            (s.child = c.child),
                            (s.subtreeFlags = 0),
                            (s.deletions = null),
                            (s.memoizedProps = c.memoizedProps),
                            (s.memoizedState = c.memoizedState),
                            (s.updateQueue = c.updateQueue),
                            (s.type = c.type),
                            (e = c.dependencies),
                            (s.dependencies =
                              e === null
                                ? null
                                : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext,
                                  })),
                        (n = n.sibling));
                    return (G(X, (X.current & 1) | 2), t.child);
                  }
                  e = e.sibling;
                }
              s.tail !== null &&
                P() > el &&
                ((t.flags |= 128), (i = !0), ac(s, !1), (t.lanes = 4194304));
            }
          else {
            if (!i)
              if (((e = ho(c)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (i = !0),
                  (n = e.updateQueue),
                  n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                  ac(s, !0),
                  s.tail === null &&
                    s.tailMode === `hidden` &&
                    !c.alternate &&
                    !J)
                )
                  return (oc(t), null);
              } else
                2 * P() - s.renderingStartTime > el &&
                  n !== 1073741824 &&
                  ((t.flags |= 128), (i = !0), ac(s, !1), (t.lanes = 4194304));
            s.isBackwards
              ? ((c.sibling = t.child), (t.child = c))
              : ((n = s.last),
                n === null ? (t.child = c) : (n.sibling = c),
                (s.last = c));
          }
          return s.tail === null
            ? (oc(t), null)
            : ((t = s.tail),
              (s.rendering = t),
              (s.tail = t.sibling),
              (s.renderingStartTime = P()),
              (t.sibling = null),
              (n = X.current),
              G(X, i ? (n & 1) | 2 : n & 1),
              t);
        case 22:
        case 23:
          return (
            wl(),
            (i = t.memoizedState !== null),
            e !== null && (e.memoizedState !== null) !== i && (t.flags |= 8192),
            i && t.mode & 1
              ? Wc & 1073741824 &&
                (oc(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : oc(t),
            null
          );
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(r(156, t.tag));
    }
    function cc(e, t) {
      switch ((va(t), t.tag)) {
        case 1:
          return (
            Xi(t.type) && Zi(),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            fo(),
            W(qi),
            W(Ki),
            _o(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 5:
          return (mo(t), null);
        case 13:
          if (
            (W(X), (e = t.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(r(340));
            ka();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return (W(X), null);
        case 4:
          return (fo(), null);
        case 10:
          return (Ua(t.type._context), null);
        case 22:
        case 23:
          return (wl(), null);
        case 24:
          return null;
        default:
          return null;
      }
    }
    var lc = !1,
      uc = !1,
      dc = typeof WeakSet == `function` ? WeakSet : Set,
      Q = null;
    function fc(e, t) {
      var n = e.ref;
      if (n !== null)
        if (typeof n == `function`)
          try {
            n(null);
          } catch (n) {
            Rl(e, t, n);
          }
        else n.current = null;
    }
    function pc(e, t, n) {
      try {
        n();
      } catch (n) {
        Rl(e, t, n);
      }
    }
    var mc = !1;
    function hc(e, t) {
      if (((bi = mn), (e = Pr()), Fr(e))) {
        if (`selectionStart` in e)
          var n = { start: e.selectionStart, end: e.selectionEnd };
        else
          a: {
            n = ((n = e.ownerDocument) && n.defaultView) || window;
            var i = n.getSelection && n.getSelection();
            if (i && i.rangeCount !== 0) {
              n = i.anchorNode;
              var a = i.anchorOffset,
                o = i.focusNode;
              i = i.focusOffset;
              try {
                (n.nodeType, o.nodeType);
              } catch {
                n = null;
                break a;
              }
              var s = 0,
                c = -1,
                l = -1,
                u = 0,
                d = 0,
                f = e,
                p = null;
              b: for (;;) {
                for (
                  var m;
                  f !== n || (a !== 0 && f.nodeType !== 3) || (c = s + a),
                    f !== o || (i !== 0 && f.nodeType !== 3) || (l = s + i),
                    f.nodeType === 3 && (s += f.nodeValue.length),
                    (m = f.firstChild) !== null;
                )
                  ((p = f), (f = m));
                for (;;) {
                  if (f === e) break b;
                  if (
                    (p === n && ++u === a && (c = s),
                    p === o && ++d === i && (l = s),
                    (m = f.nextSibling) !== null)
                  )
                    break;
                  ((f = p), (p = f.parentNode));
                }
                f = m;
              }
              n = c === -1 || l === -1 ? null : { start: c, end: l };
            } else n = null;
          }
        n ||= { start: 0, end: 0 };
      } else n = null;
      for (
        xi = { focusedElem: e, selectionRange: n }, mn = !1, Q = t;
        Q !== null;
      )
        if (((t = Q), (e = t.child), t.subtreeFlags & 1028 && e !== null))
          ((e.return = t), (Q = e));
        else
          for (; Q !== null; ) {
            t = Q;
            try {
              var h = t.alternate;
              if (t.flags & 1024)
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (h !== null) {
                      var g = h.memoizedProps,
                        _ = h.memoizedState,
                        v = t.stateNode;
                      v.__reactInternalSnapshotBeforeUpdate =
                        v.getSnapshotBeforeUpdate(
                          t.elementType === t.type ? g : hs(t.type, g),
                          _,
                        );
                    }
                    break;
                  case 3:
                    var y = t.stateNode.containerInfo;
                    y.nodeType === 1
                      ? (y.textContent = ``)
                      : y.nodeType === 9 &&
                        y.documentElement &&
                        y.removeChild(y.documentElement);
                    break;
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    throw Error(r(163));
                }
            } catch (e) {
              Rl(t, t.return, e);
            }
            if (((e = t.sibling), e !== null)) {
              ((e.return = t.return), (Q = e));
              break;
            }
            Q = t.return;
          }
      return ((h = mc), (mc = !1), h);
    }
    function gc(e, t, n) {
      var r = t.updateQueue;
      if (((r = r === null ? null : r.lastEffect), r !== null)) {
        var i = (r = r.next);
        do {
          if ((i.tag & e) === e) {
            var a = i.destroy;
            ((i.destroy = void 0), a !== void 0 && pc(t, n, a));
          }
          i = i.next;
        } while (i !== r);
      }
    }
    function _c(e, t) {
      if (
        ((t = t.updateQueue),
        (t = t === null ? null : t.lastEffect),
        t !== null)
      ) {
        var n = (t = t.next);
        do {
          if ((n.tag & e) === e) {
            var r = n.create;
            n.destroy = r();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function vc(e) {
      var t = e.ref;
      if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
          case 5:
            e = n;
            break;
          default:
            e = n;
        }
        typeof t == `function` ? t(e) : (t.current = e);
      }
    }
    function yc(e) {
      var t = e.alternate;
      (t !== null && ((e.alternate = null), yc(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
          ((t = e.stateNode),
          t !== null &&
            (delete t[Mi],
            delete t[Ni],
            delete t[Fi],
            delete t[Ii],
            delete t[Li])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
    }
    function bc(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function xc(e) {
      a: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || bc(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
        ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
          ((e.child.return = e), (e = e.child));
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Sc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        ((e = e.stateNode),
          t
            ? n.nodeType === 8
              ? n.parentNode.insertBefore(e, t)
              : n.insertBefore(e, t)
            : (n.nodeType === 8
                ? ((t = n.parentNode), t.insertBefore(e, n))
                : ((t = n), t.appendChild(e)),
              (n = n._reactRootContainer),
              n != null || t.onclick !== null || (t.onclick = yi)));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (Sc(e, t, n), e = e.sibling; e !== null; )
          (Sc(e, t, n), (e = e.sibling));
    }
    function Cc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (Cc(e, t, n), e = e.sibling; e !== null; )
          (Cc(e, t, n), (e = e.sibling));
    }
    var wc = null,
      Tc = !1;
    function Ec(e, t, n) {
      for (n = n.child; n !== null; ) (Dc(e, t, n), (n = n.sibling));
    }
    function Dc(e, t, n) {
      if (Dt && typeof Dt.onCommitFiberUnmount == `function`)
        try {
          Dt.onCommitFiberUnmount(Et, n);
        } catch {}
      switch (n.tag) {
        case 5:
          uc || fc(n, t);
        case 6:
          var r = wc,
            i = Tc;
          ((wc = null),
            Ec(e, t, n),
            (wc = r),
            (Tc = i),
            wc !== null &&
              (Tc
                ? ((e = wc),
                  (n = n.stateNode),
                  e.nodeType === 8
                    ? e.parentNode.removeChild(n)
                    : e.removeChild(n))
                : wc.removeChild(n.stateNode)));
          break;
        case 18:
          wc !== null &&
            (Tc
              ? ((e = wc),
                (n = n.stateNode),
                e.nodeType === 8
                  ? Oi(e.parentNode, n)
                  : e.nodeType === 1 && Oi(e, n),
                fn(e))
              : Oi(wc, n.stateNode));
          break;
        case 4:
          ((r = wc),
            (i = Tc),
            (wc = n.stateNode.containerInfo),
            (Tc = !0),
            Ec(e, t, n),
            (wc = r),
            (Tc = i));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            !uc &&
            ((r = n.updateQueue),
            r !== null && ((r = r.lastEffect), r !== null))
          ) {
            i = r = r.next;
            do {
              var a = i,
                o = a.destroy;
              ((a = a.tag),
                o !== void 0 && (a & 2 || a & 4) && pc(n, t, o),
                (i = i.next));
            } while (i !== r);
          }
          Ec(e, t, n);
          break;
        case 1:
          if (
            !uc &&
            (fc(n, t),
            (r = n.stateNode),
            typeof r.componentWillUnmount == `function`)
          )
            try {
              ((r.props = n.memoizedProps),
                (r.state = n.memoizedState),
                r.componentWillUnmount());
            } catch (e) {
              Rl(n, t, e);
            }
          Ec(e, t, n);
          break;
        case 21:
          Ec(e, t, n);
          break;
        case 22:
          n.mode & 1
            ? ((uc = (r = uc) || n.memoizedState !== null),
              Ec(e, t, n),
              (uc = r))
            : Ec(e, t, n);
          break;
        default:
          Ec(e, t, n);
      }
    }
    function Oc(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        (n === null && (n = e.stateNode = new dc()),
          t.forEach(function (t) {
            var r = Hl.bind(null, e, t);
            n.has(t) || (n.add(t), t.then(r, r));
          }));
      }
    }
    function kc(e, t) {
      var n = t.deletions;
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var a = n[i];
          try {
            var o = e,
              s = t,
              c = s;
            a: for (; c !== null; ) {
              switch (c.tag) {
                case 5:
                  ((wc = c.stateNode), (Tc = !1));
                  break a;
                case 3:
                  ((wc = c.stateNode.containerInfo), (Tc = !0));
                  break a;
                case 4:
                  ((wc = c.stateNode.containerInfo), (Tc = !0));
                  break a;
              }
              c = c.return;
            }
            if (wc === null) throw Error(r(160));
            (Dc(o, s, a), (wc = null), (Tc = !1));
            var l = a.alternate;
            (l !== null && (l.return = null), (a.return = null));
          } catch (e) {
            Rl(a, t, e);
          }
        }
      if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) (Ac(t, e), (t = t.sibling));
    }
    function Ac(e, t) {
      var n = e.alternate,
        i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if ((kc(t, e), jc(e), i & 4)) {
            try {
              (gc(3, e, e.return), _c(3, e));
            } catch (t) {
              Rl(e, e.return, t);
            }
            try {
              gc(5, e, e.return);
            } catch (t) {
              Rl(e, e.return, t);
            }
          }
          break;
        case 1:
          (kc(t, e), jc(e), i & 512 && n !== null && fc(n, n.return));
          break;
        case 5:
          if (
            (kc(t, e),
            jc(e),
            i & 512 && n !== null && fc(n, n.return),
            e.flags & 32)
          ) {
            var a = e.stateNode;
            try {
              Re(a, ``);
            } catch (t) {
              Rl(e, e.return, t);
            }
          }
          if (i & 4 && ((a = e.stateNode), a != null)) {
            var o = e.memoizedProps,
              s = n === null ? o : n.memoizedProps,
              c = e.type,
              l = e.updateQueue;
            if (((e.updateQueue = null), l !== null))
              try {
                (c === `input` &&
                  o.type === `radio` &&
                  o.name != null &&
                  we(a, o),
                  j(c, s));
                var u = j(c, o);
                for (s = 0; s < l.length; s += 2) {
                  var d = l[s],
                    f = l[s + 1];
                  d === `style`
                    ? Ve(a, f)
                    : d === `dangerouslySetInnerHTML`
                      ? Le(a, f)
                      : d === `children`
                        ? Re(a, f)
                        : x(a, d, f, u);
                }
                switch (c) {
                  case `input`:
                    Te(a, o);
                    break;
                  case `textarea`:
                    Me(a, o);
                    break;
                  case `select`:
                    var p = a._wrapperState.wasMultiple;
                    a._wrapperState.wasMultiple = !!o.multiple;
                    var m = o.value;
                    m == null
                      ? p !== !!o.multiple &&
                        (o.defaultValue == null
                          ? ke(a, !!o.multiple, o.multiple ? [] : ``, !1)
                          : ke(a, !!o.multiple, o.defaultValue, !0))
                      : ke(a, !!o.multiple, m, !1);
                }
                a[Ni] = o;
              } catch (t) {
                Rl(e, e.return, t);
              }
          }
          break;
        case 6:
          if ((kc(t, e), jc(e), i & 4)) {
            if (e.stateNode === null) throw Error(r(162));
            ((a = e.stateNode), (o = e.memoizedProps));
            try {
              a.nodeValue = o;
            } catch (t) {
              Rl(e, e.return, t);
            }
          }
          break;
        case 3:
          if (
            (kc(t, e),
            jc(e),
            i & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              fn(t.containerInfo);
            } catch (t) {
              Rl(e, e.return, t);
            }
          break;
        case 4:
          (kc(t, e), jc(e));
          break;
        case 13:
          (kc(t, e),
            jc(e),
            (a = e.child),
            a.flags & 8192 &&
              ((o = a.memoizedState !== null),
              (a.stateNode.isHidden = o),
              !o ||
                (a.alternate !== null && a.alternate.memoizedState !== null) ||
                ($c = P())),
            i & 4 && Oc(e));
          break;
        case 22:
          if (
            ((d = n !== null && n.memoizedState !== null),
            e.mode & 1 ? ((uc = (u = uc) || d), kc(t, e), (uc = u)) : kc(t, e),
            jc(e),
            i & 8192)
          ) {
            if (
              ((u = e.memoizedState !== null),
              (e.stateNode.isHidden = u) && !d && e.mode & 1)
            )
              for (Q = e, d = e.child; d !== null; ) {
                for (f = Q = d; Q !== null; ) {
                  switch (((p = Q), (m = p.child), p.tag)) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      gc(4, p, p.return);
                      break;
                    case 1:
                      fc(p, p.return);
                      var h = p.stateNode;
                      if (typeof h.componentWillUnmount == `function`) {
                        ((i = p), (n = p.return));
                        try {
                          ((t = i),
                            (h.props = t.memoizedProps),
                            (h.state = t.memoizedState),
                            h.componentWillUnmount());
                        } catch (e) {
                          Rl(i, n, e);
                        }
                      }
                      break;
                    case 5:
                      fc(p, p.return);
                      break;
                    case 22:
                      if (p.memoizedState !== null) {
                        Fc(f);
                        continue;
                      }
                  }
                  m === null ? Fc(f) : ((m.return = p), (Q = m));
                }
                d = d.sibling;
              }
            a: for (d = null, f = e; ; ) {
              if (f.tag === 5) {
                if (d === null) {
                  d = f;
                  try {
                    ((a = f.stateNode),
                      u
                        ? ((o = a.style),
                          typeof o.setProperty == `function`
                            ? o.setProperty(`display`, `none`, `important`)
                            : (o.display = `none`))
                        : ((c = f.stateNode),
                          (l = f.memoizedProps.style),
                          (s =
                            l != null && l.hasOwnProperty(`display`)
                              ? l.display
                              : null),
                          (c.style.display = A(`display`, s))));
                  } catch (t) {
                    Rl(e, e.return, t);
                  }
                }
              } else if (f.tag === 6) {
                if (d === null)
                  try {
                    f.stateNode.nodeValue = u ? `` : f.memoizedProps;
                  } catch (t) {
                    Rl(e, e.return, t);
                  }
              } else if (
                ((f.tag !== 22 && f.tag !== 23) ||
                  f.memoizedState === null ||
                  f === e) &&
                f.child !== null
              ) {
                ((f.child.return = f), (f = f.child));
                continue;
              }
              if (f === e) break a;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === e) break a;
                (d === f && (d = null), (f = f.return));
              }
              (d === f && (d = null),
                (f.sibling.return = f.return),
                (f = f.sibling));
            }
          }
          break;
        case 19:
          (kc(t, e), jc(e), i & 4 && Oc(e));
          break;
        case 21:
          break;
        default:
          (kc(t, e), jc(e));
      }
    }
    function jc(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          a: {
            for (var n = e.return; n !== null; ) {
              if (bc(n)) {
                var i = n;
                break a;
              }
              n = n.return;
            }
            throw Error(r(160));
          }
          switch (i.tag) {
            case 5:
              var a = i.stateNode;
              (i.flags & 32 && (Re(a, ``), (i.flags &= -33)), Cc(e, xc(e), a));
              break;
            case 3:
            case 4:
              var o = i.stateNode.containerInfo;
              Sc(e, xc(e), o);
              break;
            default:
              throw Error(r(161));
          }
        } catch (t) {
          Rl(e, e.return, t);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Mc(e, t, n) {
      ((Q = e), Nc(e, t, n));
    }
    function Nc(e, t, n) {
      for (var r = (e.mode & 1) != 0; Q !== null; ) {
        var i = Q,
          a = i.child;
        if (i.tag === 22 && r) {
          var o = i.memoizedState !== null || lc;
          if (!o) {
            var s = i.alternate,
              c = (s !== null && s.memoizedState !== null) || uc;
            s = lc;
            var l = uc;
            if (((lc = o), (uc = c) && !l))
              for (Q = i; Q !== null; )
                ((o = Q),
                  (c = o.child),
                  (o.tag === 22 && o.memoizedState !== null) || c === null
                    ? Ic(i)
                    : ((c.return = o), (Q = c)));
            for (; a !== null; ) ((Q = a), Nc(a, t, n), (a = a.sibling));
            ((Q = i), (lc = s), (uc = l));
          }
          Pc(e, t, n);
        } else
          i.subtreeFlags & 8772 && a !== null
            ? ((a.return = i), (Q = a))
            : Pc(e, t, n);
      }
    }
    function Pc(e) {
      for (; Q !== null; ) {
        var t = Q;
        if (t.flags & 8772) {
          var n = t.alternate;
          try {
            if (t.flags & 8772)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  uc || _c(5, t);
                  break;
                case 1:
                  var i = t.stateNode;
                  if (t.flags & 4 && !uc)
                    if (n === null) i.componentDidMount();
                    else {
                      var a =
                        t.elementType === t.type
                          ? n.memoizedProps
                          : hs(t.type, n.memoizedProps);
                      i.componentDidUpdate(
                        a,
                        n.memoizedState,
                        i.__reactInternalSnapshotBeforeUpdate,
                      );
                    }
                  var o = t.updateQueue;
                  o !== null && io(t, o, i);
                  break;
                case 3:
                  var s = t.updateQueue;
                  if (s !== null) {
                    if (((n = null), t.child !== null))
                      switch (t.child.tag) {
                        case 5:
                          n = t.child.stateNode;
                          break;
                        case 1:
                          n = t.child.stateNode;
                      }
                    io(t, s, n);
                  }
                  break;
                case 5:
                  var c = t.stateNode;
                  if (n === null && t.flags & 4) {
                    n = c;
                    var l = t.memoizedProps;
                    switch (t.type) {
                      case `button`:
                      case `input`:
                      case `select`:
                      case `textarea`:
                        l.autoFocus && n.focus();
                        break;
                      case `img`:
                        l.src && (n.src = l.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (t.memoizedState === null) {
                    var u = t.alternate;
                    if (u !== null) {
                      var d = u.memoizedState;
                      if (d !== null) {
                        var f = d.dehydrated;
                        f !== null && fn(f);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(r(163));
              }
            uc || (t.flags & 512 && vc(t));
          } catch (e) {
            Rl(t, t.return, e);
          }
        }
        if (t === e) {
          Q = null;
          break;
        }
        if (((n = t.sibling), n !== null)) {
          ((n.return = t.return), (Q = n));
          break;
        }
        Q = t.return;
      }
    }
    function Fc(e) {
      for (; Q !== null; ) {
        var t = Q;
        if (t === e) {
          Q = null;
          break;
        }
        var n = t.sibling;
        if (n !== null) {
          ((n.return = t.return), (Q = n));
          break;
        }
        Q = t.return;
      }
    }
    function Ic(e) {
      for (; Q !== null; ) {
        var t = Q;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var n = t.return;
              try {
                _c(4, t);
              } catch (e) {
                Rl(t, n, e);
              }
              break;
            case 1:
              var r = t.stateNode;
              if (typeof r.componentDidMount == `function`) {
                var i = t.return;
                try {
                  r.componentDidMount();
                } catch (e) {
                  Rl(t, i, e);
                }
              }
              var a = t.return;
              try {
                vc(t);
              } catch (e) {
                Rl(t, a, e);
              }
              break;
            case 5:
              var o = t.return;
              try {
                vc(t);
              } catch (e) {
                Rl(t, o, e);
              }
          }
        } catch (e) {
          Rl(t, t.return, e);
        }
        if (t === e) {
          Q = null;
          break;
        }
        var s = t.sibling;
        if (s !== null) {
          ((s.return = t.return), (Q = s));
          break;
        }
        Q = t.return;
      }
    }
    var Lc = Math.ceil,
      Rc = S.ReactCurrentDispatcher,
      zc = S.ReactCurrentOwner,
      Bc = S.ReactCurrentBatchConfig,
      $ = 0,
      Vc = null,
      Hc = null,
      Uc = 0,
      Wc = 0,
      Gc = Wi(0),
      Kc = 0,
      qc = null,
      Jc = 0,
      Yc = 0,
      Xc = 0,
      Zc = null,
      Qc = null,
      $c = 0,
      el = 1 / 0,
      tl = null,
      nl = !1,
      rl = null,
      il = null,
      al = !1,
      ol = null,
      sl = 0,
      cl = 0,
      ll = null,
      ul = -1,
      dl = 0;
    function fl() {
      return $ & 6 ? P() : ul === -1 ? (ul = P()) : ul;
    }
    function pl(e) {
      return e.mode & 1
        ? $ & 2 && Uc !== 0
          ? Uc & -Uc
          : ja.transition === null
            ? ((e = R),
              e === 0
                ? ((e = window.event), (e = e === void 0 ? 16 : bn(e.type)), e)
                : e)
            : (dl === 0 && (dl = zt()), dl)
        : 1;
    }
    function ml(e, t, n, i) {
      if (50 < cl) throw ((cl = 0), (ll = null), Error(r(185)));
      (Vt(e, n, i),
        (!($ & 2) || e !== Vc) &&
          (e === Vc && (!($ & 2) && (Yc |= n), Kc === 4 && bl(e, Uc)),
          hl(e, i),
          n === 1 &&
            $ === 0 &&
            !(t.mode & 1) &&
            ((el = P() + 500), ra && oa())));
    }
    function hl(e, t) {
      var n = e.callbackNode;
      Lt(e, t);
      var r = Ft(e, e === Vc ? Uc : 0);
      if (r === 0)
        (n !== null && vt(n),
          (e.callbackNode = null),
          (e.callbackPriority = 0));
      else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && vt(n), t === 1))
          (e.tag === 0 ? aa(xl.bind(null, e)) : ia(xl.bind(null, e)),
            Ei(function () {
              !($ & 6) && oa();
            }),
            (n = null));
        else {
          switch (Ut(r)) {
            case 1:
              n = St;
              break;
            case 4:
              n = Ct;
              break;
            case 16:
              n = wt;
              break;
            case 536870912:
              n = F;
              break;
            default:
              n = wt;
          }
          n = Wl(n, gl.bind(null, e));
        }
        ((e.callbackPriority = t), (e.callbackNode = n));
      }
    }
    function gl(e, t) {
      if (((ul = -1), (dl = 0), $ & 6)) throw Error(r(327));
      var n = e.callbackNode;
      if (Il() && e.callbackNode !== n) return null;
      var i = Ft(e, e === Vc ? Uc : 0);
      if (i === 0) return null;
      if (i & 30 || (i & e.expiredLanes) !== 0 || t) t = kl(e, i);
      else {
        t = i;
        var a = $;
        $ |= 2;
        var o = Dl();
        (Vc !== e || Uc !== t) && ((tl = null), (el = P() + 500), Tl(e, t));
        do
          try {
            jl();
            break;
          } catch (t) {
            El(e, t);
          }
        while (1);
        (Ha(),
          (Rc.current = o),
          ($ = a),
          Hc === null ? ((Vc = null), (Uc = 0), (t = Kc)) : (t = 0));
      }
      if (t !== 0) {
        if (
          (t === 2 && ((a = Rt(e)), a !== 0 && ((i = a), (t = _l(e, a)))),
          t === 1)
        )
          throw ((n = qc), Tl(e, 0), bl(e, i), hl(e, P()), n);
        if (t === 6) bl(e, i);
        else {
          if (
            ((a = e.current.alternate),
            !(i & 30) &&
              !yl(a) &&
              ((t = kl(e, i)),
              t === 2 && ((o = Rt(e)), o !== 0 && ((i = o), (t = _l(e, o)))),
              t === 1))
          )
            throw ((n = qc), Tl(e, 0), bl(e, i), hl(e, P()), n);
          switch (((e.finishedWork = a), (e.finishedLanes = i), t)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 2:
              Pl(e, Qc, tl);
              break;
            case 3:
              if (
                (bl(e, i),
                (i & 130023424) === i && ((t = $c + 500 - P()), 10 < t))
              ) {
                if (Ft(e, 0) !== 0) break;
                if (((a = e.suspendedLanes), (a & i) !== i)) {
                  (fl(), (e.pingedLanes |= e.suspendedLanes & a));
                  break;
                }
                e.timeoutHandle = Ci(Pl.bind(null, e, Qc, tl), t);
                break;
              }
              Pl(e, Qc, tl);
              break;
            case 4:
              if ((bl(e, i), (i & 4194240) === i)) break;
              for (t = e.eventTimes, a = -1; 0 < i; ) {
                var s = 31 - kt(i);
                ((o = 1 << s), (s = t[s]), s > a && (a = s), (i &= ~o));
              }
              if (
                ((i = a),
                (i = P() - i),
                (i =
                  (120 > i
                    ? 120
                    : 480 > i
                      ? 480
                      : 1080 > i
                        ? 1080
                        : 1920 > i
                          ? 1920
                          : 3e3 > i
                            ? 3e3
                            : 4320 > i
                              ? 4320
                              : 1960 * Lc(i / 1960)) - i),
                10 < i)
              ) {
                e.timeoutHandle = Ci(Pl.bind(null, e, Qc, tl), i);
                break;
              }
              Pl(e, Qc, tl);
              break;
            case 5:
              Pl(e, Qc, tl);
              break;
            default:
              throw Error(r(329));
          }
        }
      }
      return (hl(e, P()), e.callbackNode === n ? gl.bind(null, e) : null);
    }
    function _l(e, t) {
      var n = Zc;
      return (
        e.current.memoizedState.isDehydrated && (Tl(e, t).flags |= 256),
        (e = kl(e, t)),
        e !== 2 && ((t = Qc), (Qc = n), t !== null && vl(t)),
        e
      );
    }
    function vl(e) {
      Qc === null ? (Qc = e) : Qc.push.apply(Qc, e);
    }
    function yl(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var n = t.updateQueue;
          if (n !== null && ((n = n.stores), n !== null))
            for (var r = 0; r < n.length; r++) {
              var i = n[r],
                a = i.getSnapshot;
              i = i.value;
              try {
                if (!kr(a(), i)) return !1;
              } catch {
                return !1;
              }
            }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
          ((n.return = t), (t = n));
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      }
      return !0;
    }
    function bl(e, t) {
      for (
        t &= ~Xc,
          t &= ~Yc,
          e.suspendedLanes |= t,
          e.pingedLanes &= ~t,
          e = e.expirationTimes;
        0 < t;
      ) {
        var n = 31 - kt(t),
          r = 1 << n;
        ((e[n] = -1), (t &= ~r));
      }
    }
    function xl(e) {
      if ($ & 6) throw Error(r(327));
      Il();
      var t = Ft(e, 0);
      if (!(t & 1)) return (hl(e, P()), null);
      var n = kl(e, t);
      if (e.tag !== 0 && n === 2) {
        var i = Rt(e);
        i !== 0 && ((t = i), (n = _l(e, i)));
      }
      if (n === 1) throw ((n = qc), Tl(e, 0), bl(e, t), hl(e, P()), n);
      if (n === 6) throw Error(r(345));
      return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        Pl(e, Qc, tl),
        hl(e, P()),
        null
      );
    }
    function Sl(e, t) {
      var n = $;
      $ |= 1;
      try {
        return e(t);
      } finally {
        (($ = n), $ === 0 && ((el = P() + 500), ra && oa()));
      }
    }
    function Cl(e) {
      ol !== null && ol.tag === 0 && !($ & 6) && Il();
      var t = $;
      $ |= 1;
      var n = Bc.transition,
        r = R;
      try {
        if (((Bc.transition = null), (R = 1), e)) return e();
      } finally {
        ((R = r), (Bc.transition = n), ($ = t), !($ & 6) && oa());
      }
    }
    function wl() {
      ((Wc = Gc.current), W(Gc));
    }
    function Tl(e, t) {
      ((e.finishedWork = null), (e.finishedLanes = 0));
      var n = e.timeoutHandle;
      if ((n !== -1 && ((e.timeoutHandle = -1), wi(n)), Hc !== null))
        for (n = Hc.return; n !== null; ) {
          var r = n;
          switch ((va(r), r.tag)) {
            case 1:
              ((r = r.type.childContextTypes), r != null && Zi());
              break;
            case 3:
              (fo(), W(qi), W(Ki), _o());
              break;
            case 5:
              mo(r);
              break;
            case 4:
              fo();
              break;
            case 13:
              W(X);
              break;
            case 19:
              W(X);
              break;
            case 10:
              Ua(r.type._context);
              break;
            case 22:
            case 23:
              wl();
          }
          n = n.return;
        }
      if (
        ((Vc = e),
        (Hc = e = Yl(e.current, null)),
        (Uc = Wc = t),
        (Kc = 0),
        (qc = null),
        (Xc = Yc = Jc = 0),
        (Qc = Zc = null),
        qa !== null)
      ) {
        for (t = 0; t < qa.length; t++)
          if (((n = qa[t]), (r = n.interleaved), r !== null)) {
            n.interleaved = null;
            var i = r.next,
              a = n.pending;
            if (a !== null) {
              var o = a.next;
              ((a.next = i), (r.next = o));
            }
            n.pending = r;
          }
        qa = null;
      }
      return e;
    }
    function El(e, t) {
      do {
        var n = Hc;
        try {
          if ((Ha(), (vo.current = ds), Co)) {
            for (var i = Z.memoizedState; i !== null; ) {
              var a = i.queue;
              (a !== null && (a.pending = null), (i = i.next));
            }
            Co = !1;
          }
          if (
            ((bo = 0),
            (So = xo = Z = null),
            (wo = !1),
            (To = 0),
            (zc.current = null),
            n === null || n.return === null)
          ) {
            ((Kc = 1), (qc = t), (Hc = null));
            break;
          }
          a: {
            var o = e,
              s = n.return,
              c = n,
              l = t;
            if (
              ((t = Uc),
              (c.flags |= 32768),
              typeof l == `object` && l && typeof l.then == `function`)
            ) {
              var u = l,
                d = c,
                f = d.tag;
              if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
                var p = d.alternate;
                p
                  ? ((d.updateQueue = p.updateQueue),
                    (d.memoizedState = p.memoizedState),
                    (d.lanes = p.lanes))
                  : ((d.updateQueue = null), (d.memoizedState = null));
              }
              var m = ks(s);
              if (m !== null) {
                ((m.flags &= -257),
                  As(m, s, c, o, t),
                  m.mode & 1 && Os(o, u, t),
                  (t = m),
                  (l = u));
                var h = t.updateQueue;
                if (h === null) {
                  var g = new Set();
                  (g.add(l), (t.updateQueue = g));
                } else h.add(l);
                break a;
              } else {
                if (!(t & 1)) {
                  (Os(o, u, t), Ol());
                  break a;
                }
                l = Error(r(426));
              }
            } else if (J && c.mode & 1) {
              var _ = ks(s);
              if (_ !== null) {
                (!(_.flags & 65536) && (_.flags |= 256),
                  As(_, s, c, o, t),
                  Aa(Ss(l, c)));
                break a;
              }
            }
            ((o = l = Ss(l, c)),
              Kc !== 4 && (Kc = 2),
              Zc === null ? (Zc = [o]) : Zc.push(o),
              (o = s));
            do {
              switch (o.tag) {
                case 3:
                  ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                  var v = Es(o, l, t);
                  no(o, v);
                  break a;
                case 1:
                  c = l;
                  var y = o.type,
                    b = o.stateNode;
                  if (
                    !(o.flags & 128) &&
                    (typeof y.getDerivedStateFromError == `function` ||
                      (b !== null &&
                        typeof b.componentDidCatch == `function` &&
                        (il === null || !il.has(b))))
                  ) {
                    ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                    var x = Ds(o, c, t);
                    no(o, x);
                    break a;
                  }
              }
              o = o.return;
            } while (o !== null);
          }
          Nl(n);
        } catch (e) {
          ((t = e), Hc === n && n !== null && (Hc = n = n.return));
          continue;
        }
        break;
      } while (1);
    }
    function Dl() {
      var e = Rc.current;
      return ((Rc.current = ds), e === null ? ds : e);
    }
    function Ol() {
      ((Kc === 0 || Kc === 3 || Kc === 2) && (Kc = 4),
        Vc === null || (!(Jc & 268435455) && !(Yc & 268435455)) || bl(Vc, Uc));
    }
    function kl(e, t) {
      var n = $;
      $ |= 2;
      var i = Dl();
      (Vc !== e || Uc !== t) && ((tl = null), Tl(e, t));
      do
        try {
          Al();
          break;
        } catch (t) {
          El(e, t);
        }
      while (1);
      if ((Ha(), ($ = n), (Rc.current = i), Hc !== null)) throw Error(r(261));
      return ((Vc = null), (Uc = 0), Kc);
    }
    function Al() {
      for (; Hc !== null; ) Ml(Hc);
    }
    function jl() {
      for (; Hc !== null && !yt(); ) Ml(Hc);
    }
    function Ml(e) {
      var t = Ul(e.alternate, e, Wc);
      ((e.memoizedProps = e.pendingProps),
        t === null ? Nl(e) : (Hc = t),
        (zc.current = null));
    }
    function Nl(e) {
      var t = e;
      do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
          if (((n = cc(n, t)), n !== null)) {
            ((n.flags &= 32767), (Hc = n));
            return;
          }
          if (e !== null)
            ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
          else {
            ((Kc = 6), (Hc = null));
            return;
          }
        } else if (((n = sc(n, t, Wc)), n !== null)) {
          Hc = n;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          Hc = t;
          return;
        }
        Hc = t = e;
      } while (t !== null);
      Kc === 0 && (Kc = 5);
    }
    function Pl(e, t, n) {
      var r = R,
        i = Bc.transition;
      try {
        ((Bc.transition = null), (R = 1), Fl(e, t, n, r));
      } finally {
        ((Bc.transition = i), (R = r));
      }
      return null;
    }
    function Fl(e, t, n, i) {
      do Il();
      while (ol !== null);
      if ($ & 6) throw Error(r(327));
      n = e.finishedWork;
      var a = e.finishedLanes;
      if (n === null) return null;
      if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(r(177));
      ((e.callbackNode = null), (e.callbackPriority = 0));
      var o = n.lanes | n.childLanes;
      if (
        (Ht(e, o),
        e === Vc && ((Hc = Vc = null), (Uc = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
          al ||
          ((al = !0),
          Wl(wt, function () {
            return (Il(), null);
          })),
        (o = (n.flags & 15990) != 0),
        n.subtreeFlags & 15990 || o)
      ) {
        ((o = Bc.transition), (Bc.transition = null));
        var s = R;
        R = 1;
        var c = $;
        (($ |= 4),
          (zc.current = null),
          hc(e, n),
          Ac(n, e),
          Ir(xi),
          (mn = !!bi),
          (xi = bi = null),
          (e.current = n),
          Mc(n, e, a),
          bt(),
          ($ = c),
          (R = s),
          (Bc.transition = o));
      } else e.current = n;
      if (
        (al && ((al = !1), (ol = e), (sl = a)),
        (o = e.pendingLanes),
        o === 0 && (il = null),
        Ot(n.stateNode, i),
        hl(e, P()),
        t !== null)
      )
        for (i = e.onRecoverableError, n = 0; n < t.length; n++)
          ((a = t[n]),
            i(a.value, { componentStack: a.stack, digest: a.digest }));
      if (nl) throw ((nl = !1), (e = rl), (rl = null), e);
      return (
        sl & 1 && e.tag !== 0 && Il(),
        (o = e.pendingLanes),
        o & 1 ? (e === ll ? cl++ : ((cl = 0), (ll = e))) : (cl = 0),
        oa(),
        null
      );
    }
    function Il() {
      if (ol !== null) {
        var e = Ut(sl),
          t = Bc.transition,
          n = R;
        try {
          if (((Bc.transition = null), (R = 16 > e ? 16 : e), ol === null))
            var i = !1;
          else {
            if (((e = ol), (ol = null), (sl = 0), $ & 6)) throw Error(r(331));
            var a = $;
            for ($ |= 4, Q = e.current; Q !== null; ) {
              var o = Q,
                s = o.child;
              if (Q.flags & 16) {
                var c = o.deletions;
                if (c !== null) {
                  for (var l = 0; l < c.length; l++) {
                    var u = c[l];
                    for (Q = u; Q !== null; ) {
                      var d = Q;
                      switch (d.tag) {
                        case 0:
                        case 11:
                        case 15:
                          gc(8, d, o);
                      }
                      var f = d.child;
                      if (f !== null) ((f.return = d), (Q = f));
                      else
                        for (; Q !== null; ) {
                          d = Q;
                          var p = d.sibling,
                            m = d.return;
                          if ((yc(d), d === u)) {
                            Q = null;
                            break;
                          }
                          if (p !== null) {
                            ((p.return = m), (Q = p));
                            break;
                          }
                          Q = m;
                        }
                    }
                  }
                  var h = o.alternate;
                  if (h !== null) {
                    var g = h.child;
                    if (g !== null) {
                      h.child = null;
                      do {
                        var _ = g.sibling;
                        ((g.sibling = null), (g = _));
                      } while (g !== null);
                    }
                  }
                  Q = o;
                }
              }
              if (o.subtreeFlags & 2064 && s !== null)
                ((s.return = o), (Q = s));
              else
                b: for (; Q !== null; ) {
                  if (((o = Q), o.flags & 2048))
                    switch (o.tag) {
                      case 0:
                      case 11:
                      case 15:
                        gc(9, o, o.return);
                    }
                  var v = o.sibling;
                  if (v !== null) {
                    ((v.return = o.return), (Q = v));
                    break b;
                  }
                  Q = o.return;
                }
            }
            var y = e.current;
            for (Q = y; Q !== null; ) {
              s = Q;
              var b = s.child;
              if (s.subtreeFlags & 2064 && b !== null)
                ((b.return = s), (Q = b));
              else
                b: for (s = y; Q !== null; ) {
                  if (((c = Q), c.flags & 2048))
                    try {
                      switch (c.tag) {
                        case 0:
                        case 11:
                        case 15:
                          _c(9, c);
                      }
                    } catch (e) {
                      Rl(c, c.return, e);
                    }
                  if (c === s) {
                    Q = null;
                    break b;
                  }
                  var x = c.sibling;
                  if (x !== null) {
                    ((x.return = c.return), (Q = x));
                    break b;
                  }
                  Q = c.return;
                }
            }
            if (
              (($ = a),
              oa(),
              Dt && typeof Dt.onPostCommitFiberRoot == `function`)
            )
              try {
                Dt.onPostCommitFiberRoot(Et, e);
              } catch {}
            i = !0;
          }
          return i;
        } finally {
          ((R = n), (Bc.transition = t));
        }
      }
      return !1;
    }
    function Ll(e, t, n) {
      ((t = Ss(n, t)),
        (t = Es(e, t, 1)),
        (e = eo(e, t, 1)),
        (t = fl()),
        e !== null && (Vt(e, 1, t), hl(e, t)));
    }
    function Rl(e, t, n) {
      if (e.tag === 3) Ll(e, e, n);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            Ll(t, e, n);
            break;
          } else if (t.tag === 1) {
            var r = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == `function` ||
              (typeof r.componentDidCatch == `function` &&
                (il === null || !il.has(r)))
            ) {
              ((e = Ss(n, e)),
                (e = Ds(t, e, 1)),
                (t = eo(t, e, 1)),
                (e = fl()),
                t !== null && (Vt(t, 1, e), hl(t, e)));
              break;
            }
          }
          t = t.return;
        }
    }
    function zl(e, t, n) {
      var r = e.pingCache;
      (r !== null && r.delete(t),
        (t = fl()),
        (e.pingedLanes |= e.suspendedLanes & n),
        Vc === e &&
          (Uc & n) === n &&
          (Kc === 4 || (Kc === 3 && (Uc & 130023424) === Uc && 500 > P() - $c)
            ? Tl(e, 0)
            : (Xc |= n)),
        hl(e, t));
    }
    function Bl(e, t) {
      t === 0 &&
        (e.mode & 1
          ? ((t = Nt), (Nt <<= 1), !(Nt & 130023424) && (Nt = 4194304))
          : (t = 1));
      var n = fl();
      ((e = Ya(e, t)), e !== null && (Vt(e, t, n), hl(e, n)));
    }
    function Vl(e) {
      var t = e.memoizedState,
        n = 0;
      (t !== null && (n = t.retryLane), Bl(e, n));
    }
    function Hl(e, t) {
      var n = 0;
      switch (e.tag) {
        case 13:
          var i = e.stateNode,
            a = e.memoizedState;
          a !== null && (n = a.retryLane);
          break;
        case 19:
          i = e.stateNode;
          break;
        default:
          throw Error(r(314));
      }
      (i !== null && i.delete(t), Bl(e, n));
    }
    var Ul = function (e, t, n) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || qi.current) Ms = !0;
        else {
          if ((e.lanes & n) === 0 && !(t.flags & 128))
            return ((Ms = !1), tc(e, t, n));
          Ms = !!(e.flags & 131072);
        }
      else ((Ms = !1), J && t.flags & 1048576 && ga(t, ua, t.index));
      switch (((t.lanes = 0), t.tag)) {
        case 2:
          var i = t.type;
          ($s(e, t), (e = t.pendingProps));
          var a = Yi(t, Ki.current);
          (Ga(t, n), (a = ko(null, t, i, e, a, n)));
          var o = Ao();
          return (
            (t.flags |= 1),
            typeof a == `object` &&
            a &&
            typeof a.render == `function` &&
            a.$$typeof === void 0
              ? ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                Xi(i) ? ((o = !0), ea(t)) : (o = !1),
                (t.memoizedState =
                  a.state !== null && a.state !== void 0 ? a.state : null),
                Za(t),
                (a.updater = _s),
                (t.stateNode = a),
                (a._reactInternals = t),
                xs(t, i, e, n),
                (t = Vs(null, t, i, !0, o, n)))
              : ((t.tag = 0),
                J && o && _a(t),
                Ns(null, t, a, n),
                (t = t.child)),
            t
          );
        case 16:
          i = t.elementType;
          a: {
            switch (
              ($s(e, t),
              (e = t.pendingProps),
              (a = i._init),
              (i = a(i._payload)),
              (t.type = i),
              (a = t.tag = Jl(i)),
              (e = hs(i, e)),
              a)
            ) {
              case 0:
                t = zs(null, t, i, e, n);
                break a;
              case 1:
                t = Bs(null, t, i, e, n);
                break a;
              case 11:
                t = Ps(null, t, i, e, n);
                break a;
              case 14:
                t = Fs(null, t, i, hs(i.type, e), n);
                break a;
            }
            throw Error(r(306, i, ``));
          }
          return t;
        case 0:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : hs(i, a)),
            zs(e, t, i, a, n)
          );
        case 1:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : hs(i, a)),
            Bs(e, t, i, a, n)
          );
        case 3:
          a: {
            if ((Hs(t), e === null)) throw Error(r(387));
            ((i = t.pendingProps),
              (o = t.memoizedState),
              (a = o.element),
              Qa(e, t),
              ro(t, i, null, n));
            var s = t.memoizedState;
            if (((i = s.element), o.isDehydrated))
              if (
                ((o = {
                  element: i,
                  isDehydrated: !1,
                  cache: s.cache,
                  pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                  transitions: s.transitions,
                }),
                (t.updateQueue.baseState = o),
                (t.memoizedState = o),
                t.flags & 256)
              ) {
                ((a = Ss(Error(r(423)), t)), (t = Us(e, t, i, n, a)));
                break a;
              } else if (i !== a) {
                ((a = Ss(Error(r(424)), t)), (t = Us(e, t, i, n, a)));
                break a;
              } else
                for (
                  ba = ki(t.stateNode.containerInfo.firstChild),
                    ya = t,
                    J = !0,
                    xa = null,
                    n = La(t, null, i, n),
                    t.child = n;
                  n;
                )
                  ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            else {
              if ((ka(), i === a)) {
                t = ec(e, t, n);
                break a;
              }
              Ns(e, t, i, n);
            }
            t = t.child;
          }
          return t;
        case 5:
          return (
            po(t),
            e === null && Ta(t),
            (i = t.type),
            (a = t.pendingProps),
            (o = e === null ? null : e.memoizedProps),
            (s = a.children),
            Si(i, a) ? (s = null) : o !== null && Si(i, o) && (t.flags |= 32),
            Rs(e, t),
            Ns(e, t, s, n),
            t.child
          );
        case 6:
          return (e === null && Ta(t), null);
        case 13:
          return Ks(e, t, n);
        case 4:
          return (
            uo(t, t.stateNode.containerInfo),
            (i = t.pendingProps),
            e === null ? (t.child = Ia(t, null, i, n)) : Ns(e, t, i, n),
            t.child
          );
        case 11:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : hs(i, a)),
            Ps(e, t, i, a, n)
          );
        case 7:
          return (Ns(e, t, t.pendingProps, n), t.child);
        case 8:
          return (Ns(e, t, t.pendingProps.children, n), t.child);
        case 12:
          return (Ns(e, t, t.pendingProps.children, n), t.child);
        case 10:
          a: {
            if (
              ((i = t.type._context),
              (a = t.pendingProps),
              (o = t.memoizedProps),
              (s = a.value),
              G(Ra, i._currentValue),
              (i._currentValue = s),
              o !== null)
            )
              if (kr(o.value, s)) {
                if (o.children === a.children && !qi.current) {
                  t = ec(e, t, n);
                  break a;
                }
              } else
                for (o = t.child, o !== null && (o.return = t); o !== null; ) {
                  var c = o.dependencies;
                  if (c !== null) {
                    s = o.child;
                    for (var l = c.firstContext; l !== null; ) {
                      if (l.context === i) {
                        if (o.tag === 1) {
                          ((l = $a(-1, n & -n)), (l.tag = 2));
                          var u = o.updateQueue;
                          if (u !== null) {
                            u = u.shared;
                            var d = u.pending;
                            (d === null
                              ? (l.next = l)
                              : ((l.next = d.next), (d.next = l)),
                              (u.pending = l));
                          }
                        }
                        ((o.lanes |= n),
                          (l = o.alternate),
                          l !== null && (l.lanes |= n),
                          Wa(o.return, n, t),
                          (c.lanes |= n));
                        break;
                      }
                      l = l.next;
                    }
                  } else if (o.tag === 10)
                    s = o.type === t.type ? null : o.child;
                  else if (o.tag === 18) {
                    if (((s = o.return), s === null)) throw Error(r(341));
                    ((s.lanes |= n),
                      (c = s.alternate),
                      c !== null && (c.lanes |= n),
                      Wa(s, n, t),
                      (s = o.sibling));
                  } else s = o.child;
                  if (s !== null) s.return = o;
                  else
                    for (s = o; s !== null; ) {
                      if (s === t) {
                        s = null;
                        break;
                      }
                      if (((o = s.sibling), o !== null)) {
                        ((o.return = s.return), (s = o));
                        break;
                      }
                      s = s.return;
                    }
                  o = s;
                }
            (Ns(e, t, a.children, n), (t = t.child));
          }
          return t;
        case 9:
          return (
            (a = t.type),
            (i = t.pendingProps.children),
            Ga(t, n),
            (a = Ka(a)),
            (i = i(a)),
            (t.flags |= 1),
            Ns(e, t, i, n),
            t.child
          );
        case 14:
          return (
            (i = t.type),
            (a = hs(i, t.pendingProps)),
            (a = hs(i.type, a)),
            Fs(e, t, i, a, n)
          );
        case 15:
          return Is(e, t, t.type, t.pendingProps, n);
        case 17:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : hs(i, a)),
            $s(e, t),
            (t.tag = 1),
            Xi(i) ? ((e = !0), ea(t)) : (e = !1),
            Ga(t, n),
            ys(t, i, a),
            xs(t, i, a, n),
            Vs(null, t, i, !0, e, n)
          );
        case 19:
          return Qs(e, t, n);
        case 22:
          return Ls(e, t, n);
      }
      throw Error(r(156, t.tag));
    };
    function Wl(e, t) {
      return _t(e, t);
    }
    function Gl(e, t, n, r) {
      ((this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
    }
    function Kl(e, t, n, r) {
      return new Gl(e, t, n, r);
    }
    function ql(e) {
      return ((e = e.prototype), !(!e || !e.isReactComponent));
    }
    function Jl(e) {
      if (typeof e == `function`) return +!!ql(e);
      if (e != null) {
        if (((e = e.$$typeof), e === ie)) return 11;
        if (e === se) return 14;
      }
      return 2;
    }
    function Yl(e, t) {
      var n = e.alternate;
      return (
        n === null
          ? ((n = Kl(e.tag, t, e.key, e.mode)),
            (n.elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.type = e.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
          t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
      );
    }
    function Xl(e, t, n, i, a, o) {
      var s = 2;
      if (((i = e), typeof e == `function`)) ql(e) && (s = 1);
      else if (typeof e == `string`) s = 5;
      else
        a: switch (e) {
          case T:
            return Zl(n.children, a, o, t);
          case ee:
            ((s = 8), (a |= 8));
            break;
          case te:
            return (
              (e = Kl(12, n, t, a | 2)),
              (e.elementType = te),
              (e.lanes = o),
              e
            );
          case ae:
            return (
              (e = Kl(13, n, t, a)),
              (e.elementType = ae),
              (e.lanes = o),
              e
            );
          case oe:
            return (
              (e = Kl(19, n, t, a)),
              (e.elementType = oe),
              (e.lanes = o),
              e
            );
          case ce:
            return Ql(n, a, o, t);
          default:
            if (typeof e == `object` && e)
              switch (e.$$typeof) {
                case ne:
                  s = 10;
                  break a;
                case re:
                  s = 9;
                  break a;
                case ie:
                  s = 11;
                  break a;
                case se:
                  s = 14;
                  break a;
                case E:
                  ((s = 16), (i = null));
                  break a;
              }
            throw Error(r(130, e == null ? e : typeof e, ``));
        }
      return (
        (t = Kl(s, n, t, a)),
        (t.elementType = e),
        (t.type = i),
        (t.lanes = o),
        t
      );
    }
    function Zl(e, t, n, r) {
      return ((e = Kl(7, e, r, t)), (e.lanes = n), e);
    }
    function Ql(e, t, n, r) {
      return (
        (e = Kl(22, e, r, t)),
        (e.elementType = ce),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
      );
    }
    function $l(e, t, n) {
      return ((e = Kl(6, e, null, t)), (e.lanes = n), e);
    }
    function eu(e, t, n) {
      return (
        (t = Kl(4, e.children === null ? [] : e.children, e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function tu(e, t, n, r, i) {
      ((this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
          this.pingCache =
          this.current =
          this.pendingChildren =
            null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = Bt(0)),
        (this.expirationTimes = Bt(-1)),
        (this.entangledLanes =
          this.finishedLanes =
          this.mutableReadLanes =
          this.expiredLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = Bt(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = i),
        (this.mutableSourceEagerHydrationData = null));
    }
    function nu(e, t, n, r, i, a, o, s, c) {
      return (
        (e = new tu(e, t, n, s, c)),
        t === 1 ? ((t = 1), !0 === a && (t |= 8)) : (t = 0),
        (a = Kl(3, null, null, t)),
        (e.current = a),
        (a.stateNode = e),
        (a.memoizedState = {
          element: r,
          isDehydrated: n,
          cache: null,
          transitions: null,
          pendingSuspenseBoundaries: null,
        }),
        Za(a),
        e
      );
    }
    function ru(e, t, n) {
      var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: w,
        key: r == null ? null : `` + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    function iu(e) {
      if (!e) return Gi;
      e = e._reactInternals;
      a: {
        if (ft(e) !== e || e.tag !== 1) throw Error(r(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break a;
            case 1:
              if (Xi(t.type)) {
                t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                break a;
              }
          }
          t = t.return;
        } while (t !== null);
        throw Error(r(171));
      }
      if (e.tag === 1) {
        var n = e.type;
        if (Xi(n)) return $i(e, n, t);
      }
      return t;
    }
    function au(e, t, n, r, i, a, o, s, c) {
      return (
        (e = nu(n, r, !0, e, i, a, o, s, c)),
        (e.context = iu(null)),
        (n = e.current),
        (r = fl()),
        (i = pl(n)),
        (a = $a(r, i)),
        (a.callback = t ?? null),
        eo(n, a, i),
        (e.current.lanes = i),
        Vt(e, i, r),
        hl(e, r),
        e
      );
    }
    function ou(e, t, n, r) {
      var i = t.current,
        a = fl(),
        o = pl(i);
      return (
        (n = iu(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = $a(a, o)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = eo(i, t, o)),
        e !== null && (ml(e, i, o, a), to(e, i, o)),
        o
      );
    }
    function su(e) {
      if (((e = e.current), !e.child)) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function cu(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function lu(e, t) {
      (cu(e, t), (e = e.alternate) && cu(e, t));
    }
    function uu() {
      return null;
    }
    var du =
      typeof reportError == `function`
        ? reportError
        : function (e) {
            console.error(e);
          };
    function fu(e) {
      this._internalRoot = e;
    }
    ((pu.prototype.render = fu.prototype.render =
      function (e) {
        var t = this._internalRoot;
        if (t === null) throw Error(r(409));
        ou(e, t, null, null);
      }),
      (pu.prototype.unmount = fu.prototype.unmount =
        function () {
          var e = this._internalRoot;
          if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            (Cl(function () {
              ou(null, e, null, null);
            }),
              (t[Pi] = null));
          }
        }));
    function pu(e) {
      this._internalRoot = e;
    }
    pu.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = qt();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < tn.length && t !== 0 && t < tn[n].priority; n++);
        (tn.splice(n, 0, e), n === 0 && sn(e));
      }
    };
    function mu(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function hu(e) {
      return !(
        !e ||
        (e.nodeType !== 1 &&
          e.nodeType !== 9 &&
          e.nodeType !== 11 &&
          (e.nodeType !== 8 || e.nodeValue !== ` react-mount-point-unstable `))
      );
    }
    function gu() {}
    function _u(e, t, n, r, i) {
      if (i) {
        if (typeof r == `function`) {
          var a = r;
          r = function () {
            var e = su(o);
            a.call(e);
          };
        }
        var o = au(t, r, e, 0, null, !1, !1, ``, gu);
        return (
          (e._reactRootContainer = o),
          (e[Pi] = o.current),
          li(e.nodeType === 8 ? e.parentNode : e),
          Cl(),
          o
        );
      }
      for (; (i = e.lastChild); ) e.removeChild(i);
      if (typeof r == `function`) {
        var s = r;
        r = function () {
          var e = su(c);
          s.call(e);
        };
      }
      var c = nu(e, 0, !1, null, null, !1, !1, ``, gu);
      return (
        (e._reactRootContainer = c),
        (e[Pi] = c.current),
        li(e.nodeType === 8 ? e.parentNode : e),
        Cl(function () {
          ou(t, c, n, r);
        }),
        c
      );
    }
    function vu(e, t, n, r, i) {
      var a = n._reactRootContainer;
      if (a) {
        var o = a;
        if (typeof i == `function`) {
          var s = i;
          i = function () {
            var e = su(o);
            s.call(e);
          };
        }
        ou(t, o, e, i);
      } else o = _u(n, t, e, i, r);
      return su(o);
    }
    ((Wt = function (e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var n = Pt(t.pendingLanes);
            n !== 0 &&
              (L(t, n | 1), hl(t, P()), !($ & 6) && ((el = P() + 500), oa()));
          }
          break;
        case 13:
          (Cl(function () {
            var t = Ya(e, 1);
            t !== null && ml(t, e, 1, fl());
          }),
            lu(e, 1));
      }
    }),
      (Gt = function (e) {
        if (e.tag === 13) {
          var t = Ya(e, 134217728);
          (t !== null && ml(t, e, 134217728, fl()), lu(e, 134217728));
        }
      }),
      (Kt = function (e) {
        if (e.tag === 13) {
          var t = pl(e),
            n = Ya(e, t);
          (n !== null && ml(n, e, t, fl()), lu(e, t));
        }
      }),
      (qt = function () {
        return R;
      }),
      (Jt = function (e, t) {
        var n = R;
        try {
          return ((R = e), t());
        } finally {
          R = n;
        }
      }),
      (Ke = function (e, t, n) {
        switch (t) {
          case `input`:
            if ((Te(e, n), (t = n.name), n.type === `radio` && t != null)) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll(
                  `input[name=` + JSON.stringify(`` + t) + `][type="radio"]`,
                ),
                  t = 0;
                t < n.length;
                t++
              ) {
                var i = n[t];
                if (i !== e && i.form === e.form) {
                  var a = Vi(i);
                  if (!a) throw Error(r(90));
                  (be(i), Te(i, a));
                }
              }
            }
            break;
          case `textarea`:
            Me(e, n);
            break;
          case `select`:
            ((t = n.value), t != null && ke(e, !!n.multiple, t, !1));
        }
      }),
      (Qe = Sl),
      ($e = Cl));
    var yu = { usingClientEntryPoint: !1, Events: [zi, Bi, Vi, Xe, Ze, Sl] },
      bu = {
        findFiberByHostInstance: Ri,
        bundleType: 0,
        version: `18.3.1`,
        rendererPackageName: `react-dom`,
      },
      xu = {
        bundleType: bu.bundleType,
        version: bu.version,
        rendererPackageName: bu.rendererPackageName,
        rendererConfig: bu.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: S.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
          return ((e = gt(e)), e === null ? null : e.stateNode);
        },
        findFiberByHostInstance: bu.findFiberByHostInstance || uu,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: `18.3.1-next-f1338f8080-20240426`,
      };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
      var Su = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Su.isDisabled && Su.supportsFiber)
        try {
          ((Et = Su.inject(xu)), (Dt = Su));
        } catch {}
    }
    ((e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yu),
      (e.createPortal = function (e, t) {
        var n =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!mu(t)) throw Error(r(200));
        return ru(e, t, null, n);
      }),
      (e.createRoot = function (e, t) {
        if (!mu(e)) throw Error(r(299));
        var n = !1,
          i = ``,
          a = du;
        return (
          t != null &&
            (!0 === t.unstable_strictMode && (n = !0),
            t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (a = t.onRecoverableError)),
          (t = nu(e, 1, !1, null, null, n, !1, i, a)),
          (e[Pi] = t.current),
          li(e.nodeType === 8 ? e.parentNode : e),
          new fu(t)
        );
      }),
      (e.findDOMNode = function (e) {
        if (e == null) return null;
        if (e.nodeType === 1) return e;
        var t = e._reactInternals;
        if (t === void 0)
          throw typeof e.render == `function`
            ? Error(r(188))
            : ((e = Object.keys(e).join(`,`)), Error(r(268, e)));
        return ((e = gt(t)), (e = e === null ? null : e.stateNode), e);
      }),
      (e.flushSync = function (e) {
        return Cl(e);
      }),
      (e.hydrate = function (e, t, n) {
        if (!hu(t)) throw Error(r(200));
        return vu(null, e, t, !0, n);
      }),
      (e.hydrateRoot = function (e, t, n) {
        if (!mu(e)) throw Error(r(405));
        var i = (n != null && n.hydratedSources) || null,
          a = !1,
          o = ``,
          s = du;
        if (
          (n != null &&
            (!0 === n.unstable_strictMode && (a = !0),
            n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
          (t = au(t, null, e, 1, n ?? null, a, !1, o, s)),
          (e[Pi] = t.current),
          li(e),
          i)
        )
          for (e = 0; e < i.length; e++)
            ((n = i[e]),
              (a = n._getVersion),
              (a = a(n._source)),
              t.mutableSourceEagerHydrationData == null
                ? (t.mutableSourceEagerHydrationData = [n, a])
                : t.mutableSourceEagerHydrationData.push(n, a));
        return new pu(t);
      }),
      (e.render = function (e, t, n) {
        if (!hu(t)) throw Error(r(200));
        return vu(null, e, t, !1, n);
      }),
      (e.unmountComponentAtNode = function (e) {
        if (!hu(e)) throw Error(r(40));
        return e._reactRootContainer
          ? (Cl(function () {
              vu(null, null, e, !1, function () {
                ((e._reactRootContainer = null), (e[Pi] = null));
              });
            }),
            !0)
          : !1;
      }),
      (e.unstable_batchedUpdates = Sl),
      (e.unstable_renderSubtreeIntoContainer = function (e, t, n, i) {
        if (!hu(n)) throw Error(r(200));
        if (e == null || e._reactInternals === void 0) throw Error(r(38));
        return vu(e, t, n, !1, i);
      }),
      (e.version = `18.3.1-next-f1338f8080-20240426`));
  }),
  Fn = o((e, t) => {
    function n() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
        } catch (e) {
          console.error(e);
        }
    }
    (n(), (t.exports = Pn()));
  }),
  In = o((e) => {
    var t = Fn();
    ((e.createRoot = t.createRoot), (e.hydrateRoot = t.hydrateRoot));
  })(),
  Ln = `true`,
  Rn = `false`,
  zn = Ln === `true`,
  Bn = Rn === `true`;
function Vn(e = {}) {
  let {
      immediate: t = !1,
      onNeedReload: n,
      onNeedRefresh: r,
      onOfflineReady: i,
      onRegistered: a,
      onRegisteredSW: o,
      onRegisterError: s,
    } = e,
    c,
    l,
    u,
    d = async (e = !0) => {
      (await l, zn || u?.());
    };
  async function f() {
    if (`serviceWorker` in navigator) {
      if (
        ((c = await h(
          async () => {
            let { Workbox: e } = await import(
              `./workbox-window.prod.es5-Bd17z0YL.js`
            );
            return { Workbox: e };
          },
          [],
          import.meta.url,
        )
          .then(
            ({ Workbox: e }) =>
              new e(`./sw.js`, { scope: `./`, type: `classic` }),
          )
          .catch((e) => {
            s?.(e);
          })),
        !c)
      )
        return;
      if (
        ((u = () => {
          c?.messageSkipWaiting();
        }),
        !Bn)
      )
        if (zn)
          (c.addEventListener(`activated`, (e) => {
            (e.isUpdate || e.isExternal) &&
              (n ? n() : window.location.reload());
          }),
            c.addEventListener(`installed`, (e) => {
              e.isUpdate || i?.();
            }));
        else {
          let e = !1,
            t = () => {
              ((e = !0),
                c?.addEventListener(`controlling`, (e) => {
                  e.isUpdate && (n ? n() : window.location.reload());
                }),
                r?.());
            };
          (c.addEventListener(`installed`, (n) => {
            n.isUpdate === void 0
              ? n.isExternal === void 0
                ? !e && i?.()
                : n.isExternal
                  ? t()
                  : !e && i?.()
              : n.isUpdate || i?.();
          }),
            c.addEventListener(`waiting`, t));
        }
      c.register({ immediate: t })
        .then((e) => {
          o ? o(`./sw.js`, e) : a?.(e);
        })
        .catch((e) => {
          s?.(e);
        });
    }
  }
  return ((l = f()), d);
}
var Hn = 365.2425,
  Un = 6048e5,
  Wn = 864e5,
  Gn = 3600 * 24;
(Gn * 7, ((Gn * Hn) / 12) * 3);
var Kn = Symbol.for(`constructDateFrom`);
function qn(e, t) {
  return typeof e == `function`
    ? e(t)
    : e && typeof e == `object` && Kn in e
      ? e[Kn](t)
      : e instanceof Date
        ? new e.constructor(t)
        : new Date(t);
}
function Jn(e, t) {
  return qn(t || e, e);
}
function Yn(e, t, n) {
  let r = Jn(e, n?.in);
  return isNaN(t) ? qn(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
var Xn = {};
function Zn() {
  return Xn;
}
function Qn(e, t) {
  let n = Zn(),
    r =
      t?.weekStartsOn ??
      t?.locale?.options?.weekStartsOn ??
      n.weekStartsOn ??
      n.locale?.options?.weekStartsOn ??
      0,
    i = Jn(e, t?.in),
    a = i.getDay(),
    o = (a < r ? 7 : 0) + a - r;
  return (i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i);
}
function $n(e, t) {
  return Qn(e, { ...t, weekStartsOn: 1 });
}
function er(e, t) {
  let n = Jn(e, t?.in),
    r = n.getFullYear(),
    i = qn(n, 0);
  (i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0));
  let a = $n(i),
    o = qn(n, 0);
  (o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0));
  let s = $n(o);
  return n.getTime() >= a.getTime()
    ? r + 1
    : n.getTime() >= s.getTime()
      ? r
      : r - 1;
}
function tr(e) {
  let t = Jn(e),
    n = new Date(
      Date.UTC(
        t.getFullYear(),
        t.getMonth(),
        t.getDate(),
        t.getHours(),
        t.getMinutes(),
        t.getSeconds(),
        t.getMilliseconds(),
      ),
    );
  return (n.setUTCFullYear(t.getFullYear()), e - +n);
}
function nr(e, ...t) {
  let n = qn.bind(null, e || t.find((e) => typeof e == `object`));
  return t.map(n);
}
function rr(e, t) {
  let n = Jn(e, t?.in);
  return (n.setHours(0, 0, 0, 0), n);
}
function ir(e, t, n) {
  let [r, i] = nr(n?.in, e, t),
    a = rr(r),
    o = rr(i),
    s = +a - tr(a),
    c = +o - tr(o);
  return Math.round((s - c) / Wn);
}
function ar(e, t) {
  let n = er(e, t),
    r = qn(t?.in || e, 0);
  return (r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), $n(r));
}
function or(e) {
  return qn(e, Date.now());
}
function sr(e, t, n) {
  let [r, i] = nr(n?.in, e, t);
  return +rr(r) == +rr(i);
}
function cr(e) {
  return (
    e instanceof Date ||
    (typeof e == `object` &&
      Object.prototype.toString.call(e) === `[object Date]`)
  );
}
function lr(e) {
  return !((!cr(e) && typeof e != `number`) || isNaN(+Jn(e)));
}
function ur(e, t) {
  let n = Jn(e, t?.in);
  return (n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n);
}
var dr = {
    lessThanXSeconds: {
      one: `less than a second`,
      other: `less than {{count}} seconds`,
    },
    xSeconds: { one: `1 second`, other: `{{count}} seconds` },
    halfAMinute: `half a minute`,
    lessThanXMinutes: {
      one: `less than a minute`,
      other: `less than {{count}} minutes`,
    },
    xMinutes: { one: `1 minute`, other: `{{count}} minutes` },
    aboutXHours: { one: `about 1 hour`, other: `about {{count}} hours` },
    xHours: { one: `1 hour`, other: `{{count}} hours` },
    xDays: { one: `1 day`, other: `{{count}} days` },
    aboutXWeeks: { one: `about 1 week`, other: `about {{count}} weeks` },
    xWeeks: { one: `1 week`, other: `{{count}} weeks` },
    aboutXMonths: { one: `about 1 month`, other: `about {{count}} months` },
    xMonths: { one: `1 month`, other: `{{count}} months` },
    aboutXYears: { one: `about 1 year`, other: `about {{count}} years` },
    xYears: { one: `1 year`, other: `{{count}} years` },
    overXYears: { one: `over 1 year`, other: `over {{count}} years` },
    almostXYears: { one: `almost 1 year`, other: `almost {{count}} years` },
  },
  fr = (e, t, n) => {
    let r,
      i = dr[e];
    return (
      (r =
        typeof i == `string`
          ? i
          : t === 1
            ? i.one
            : i.other.replace(`{{count}}`, t.toString())),
      n?.addSuffix
        ? n.comparison && n.comparison > 0
          ? `in ` + r
          : r + ` ago`
        : r
    );
  };
function pr(e) {
  return (t = {}) => {
    let n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
var mr = {
    date: pr({
      formats: {
        full: `EEEE, MMMM do, y`,
        long: `MMMM do, y`,
        medium: `MMM d, y`,
        short: `MM/dd/yyyy`,
      },
      defaultWidth: `full`,
    }),
    time: pr({
      formats: {
        full: `h:mm:ss a zzzz`,
        long: `h:mm:ss a z`,
        medium: `h:mm:ss a`,
        short: `h:mm a`,
      },
      defaultWidth: `full`,
    }),
    dateTime: pr({
      formats: {
        full: `{{date}} 'at' {{time}}`,
        long: `{{date}} 'at' {{time}}`,
        medium: `{{date}}, {{time}}`,
        short: `{{date}}, {{time}}`,
      },
      defaultWidth: `full`,
    }),
  },
  hr = {
    lastWeek: `'last' eeee 'at' p`,
    yesterday: `'yesterday at' p`,
    today: `'today at' p`,
    tomorrow: `'tomorrow at' p`,
    nextWeek: `eeee 'at' p`,
    other: `P`,
  },
  gr = (e, t, n, r) => hr[e];
function B(e) {
  return (t, n) => {
    let r = n?.context ? String(n.context) : `standalone`,
      i;
    if (r === `formatting` && e.formattingValues) {
      let t = e.defaultFormattingWidth || e.defaultWidth,
        r = n?.width ? String(n.width) : t;
      i = e.formattingValues[r] || e.formattingValues[t];
    } else {
      let t = e.defaultWidth,
        r = n?.width ? String(n.width) : e.defaultWidth;
      i = e.values[r] || e.values[t];
    }
    let a = e.argumentCallback ? e.argumentCallback(t) : t;
    return i[a];
  };
}
var _r = {
  ordinalNumber: (e, t) => {
    let n = Number(e),
      r = n % 100;
    if (r > 20 || r < 10)
      switch (r % 10) {
        case 1:
          return n + `st`;
        case 2:
          return n + `nd`;
        case 3:
          return n + `rd`;
      }
    return n + `th`;
  },
  era: B({
    values: {
      narrow: [`B`, `A`],
      abbreviated: [`BC`, `AD`],
      wide: [`Before Christ`, `Anno Domini`],
    },
    defaultWidth: `wide`,
  }),
  quarter: B({
    values: {
      narrow: [`1`, `2`, `3`, `4`],
      abbreviated: [`Q1`, `Q2`, `Q3`, `Q4`],
      wide: [`1st quarter`, `2nd quarter`, `3rd quarter`, `4th quarter`],
    },
    defaultWidth: `wide`,
    argumentCallback: (e) => e - 1,
  }),
  month: B({
    values: {
      narrow: [`J`, `F`, `M`, `A`, `M`, `J`, `J`, `A`, `S`, `O`, `N`, `D`],
      abbreviated: [
        `Jan`,
        `Feb`,
        `Mar`,
        `Apr`,
        `May`,
        `Jun`,
        `Jul`,
        `Aug`,
        `Sep`,
        `Oct`,
        `Nov`,
        `Dec`,
      ],
      wide: [
        `January`,
        `February`,
        `March`,
        `April`,
        `May`,
        `June`,
        `July`,
        `August`,
        `September`,
        `October`,
        `November`,
        `December`,
      ],
    },
    defaultWidth: `wide`,
  }),
  day: B({
    values: {
      narrow: [`S`, `M`, `T`, `W`, `T`, `F`, `S`],
      short: [`Su`, `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`],
      abbreviated: [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`],
      wide: [
        `Sunday`,
        `Monday`,
        `Tuesday`,
        `Wednesday`,
        `Thursday`,
        `Friday`,
        `Saturday`,
      ],
    },
    defaultWidth: `wide`,
  }),
  dayPeriod: B({
    values: {
      narrow: {
        am: `a`,
        pm: `p`,
        midnight: `mi`,
        noon: `n`,
        morning: `morning`,
        afternoon: `afternoon`,
        evening: `evening`,
        night: `night`,
      },
      abbreviated: {
        am: `AM`,
        pm: `PM`,
        midnight: `midnight`,
        noon: `noon`,
        morning: `morning`,
        afternoon: `afternoon`,
        evening: `evening`,
        night: `night`,
      },
      wide: {
        am: `a.m.`,
        pm: `p.m.`,
        midnight: `midnight`,
        noon: `noon`,
        morning: `morning`,
        afternoon: `afternoon`,
        evening: `evening`,
        night: `night`,
      },
    },
    defaultWidth: `wide`,
    formattingValues: {
      narrow: {
        am: `a`,
        pm: `p`,
        midnight: `mi`,
        noon: `n`,
        morning: `in the morning`,
        afternoon: `in the afternoon`,
        evening: `in the evening`,
        night: `at night`,
      },
      abbreviated: {
        am: `AM`,
        pm: `PM`,
        midnight: `midnight`,
        noon: `noon`,
        morning: `in the morning`,
        afternoon: `in the afternoon`,
        evening: `in the evening`,
        night: `at night`,
      },
      wide: {
        am: `a.m.`,
        pm: `p.m.`,
        midnight: `midnight`,
        noon: `noon`,
        morning: `in the morning`,
        afternoon: `in the afternoon`,
        evening: `in the evening`,
        night: `at night`,
      },
    },
    defaultFormattingWidth: `wide`,
  }),
};
function vr(e) {
  return (t, n = {}) => {
    let r = n.width,
      i = (r && e.matchPatterns[r]) || e.matchPatterns[e.defaultMatchWidth],
      a = t.match(i);
    if (!a) return null;
    let o = a[0],
      s = (r && e.parsePatterns[r]) || e.parsePatterns[e.defaultParseWidth],
      c = Array.isArray(s) ? br(s, (e) => e.test(o)) : yr(s, (e) => e.test(o)),
      l;
    ((l = e.valueCallback ? e.valueCallback(c) : c),
      (l = n.valueCallback ? n.valueCallback(l) : l));
    let u = t.slice(o.length);
    return { value: l, rest: u };
  };
}
function yr(e, t) {
  for (let n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function br(e, t) {
  for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
function xr(e) {
  return (t, n = {}) => {
    let r = t.match(e.matchPattern);
    if (!r) return null;
    let i = r[0],
      a = t.match(e.parsePattern);
    if (!a) return null;
    let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
    o = n.valueCallback ? n.valueCallback(o) : o;
    let s = t.slice(i.length);
    return { value: o, rest: s };
  };
}
var Sr = {
  code: `en-US`,
  formatDistance: fr,
  formatLong: mr,
  formatRelative: gr,
  localize: _r,
  match: {
    ordinalNumber: xr({
      matchPattern: /^(\d+)(th|st|nd|rd)?/i,
      parsePattern: /\d+/i,
      valueCallback: (e) => parseInt(e, 10),
    }),
    era: vr({
      matchPatterns: {
        narrow: /^(b|a)/i,
        abbreviated:
          /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i,
      },
      defaultMatchWidth: `wide`,
      parsePatterns: { any: [/^b/i, /^(a|c)/i] },
      defaultParseWidth: `any`,
    }),
    quarter: vr({
      matchPatterns: {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i,
      },
      defaultMatchWidth: `wide`,
      parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
      defaultParseWidth: `any`,
      valueCallback: (e) => e + 1,
    }),
    month: vr({
      matchPatterns: {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
      },
      defaultMatchWidth: `wide`,
      parsePatterns: {
        narrow: [
          /^j/i,
          /^f/i,
          /^m/i,
          /^a/i,
          /^m/i,
          /^j/i,
          /^j/i,
          /^a/i,
          /^s/i,
          /^o/i,
          /^n/i,
          /^d/i,
        ],
        any: [
          /^ja/i,
          /^f/i,
          /^mar/i,
          /^ap/i,
          /^may/i,
          /^jun/i,
          /^jul/i,
          /^au/i,
          /^s/i,
          /^o/i,
          /^n/i,
          /^d/i,
        ],
      },
      defaultParseWidth: `any`,
    }),
    day: vr({
      matchPatterns: {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
      },
      defaultMatchWidth: `wide`,
      parsePatterns: {
        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
      },
      defaultParseWidth: `any`,
    }),
    dayPeriod: vr({
      matchPatterns: {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
      },
      defaultMatchWidth: `any`,
      parsePatterns: {
        any: {
          am: /^a/i,
          pm: /^p/i,
          midnight: /^mi/i,
          noon: /^no/i,
          morning: /morning/i,
          afternoon: /afternoon/i,
          evening: /evening/i,
          night: /night/i,
        },
      },
      defaultParseWidth: `any`,
    }),
  },
  options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
};
function Cr(e, t) {
  let n = Jn(e, t?.in);
  return ir(n, ur(n)) + 1;
}
function wr(e, t) {
  let n = Jn(e, t?.in),
    r = $n(n) - +ar(n);
  return Math.round(r / Un) + 1;
}
function Tr(e, t) {
  let n = Jn(e, t?.in),
    r = n.getFullYear(),
    i = Zn(),
    a =
      t?.firstWeekContainsDate ??
      t?.locale?.options?.firstWeekContainsDate ??
      i.firstWeekContainsDate ??
      i.locale?.options?.firstWeekContainsDate ??
      1,
    o = qn(t?.in || e, 0);
  (o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0));
  let s = Qn(o, t),
    c = qn(t?.in || e, 0);
  (c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0));
  let l = Qn(c, t);
  return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
function Er(e, t) {
  let n = Zn(),
    r =
      t?.firstWeekContainsDate ??
      t?.locale?.options?.firstWeekContainsDate ??
      n.firstWeekContainsDate ??
      n.locale?.options?.firstWeekContainsDate ??
      1,
    i = Tr(e, t),
    a = qn(t?.in || e, 0);
  return (a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), Qn(a, t));
}
function Dr(e, t) {
  let n = Jn(e, t?.in),
    r = Qn(n, t) - +Er(n, t);
  return Math.round(r / Un) + 1;
}
function V(e, t) {
  return (e < 0 ? `-` : ``) + Math.abs(e).toString().padStart(t, `0`);
}
var Or = {
    y(e, t) {
      let n = e.getFullYear(),
        r = n > 0 ? n : 1 - n;
      return V(t === `yy` ? r % 100 : r, t.length);
    },
    M(e, t) {
      let n = e.getMonth();
      return t === `M` ? String(n + 1) : V(n + 1, 2);
    },
    d(e, t) {
      return V(e.getDate(), t.length);
    },
    a(e, t) {
      let n = e.getHours() / 12 >= 1 ? `pm` : `am`;
      switch (t) {
        case `a`:
        case `aa`:
          return n.toUpperCase();
        case `aaa`:
          return n;
        case `aaaaa`:
          return n[0];
        default:
          return n === `am` ? `a.m.` : `p.m.`;
      }
    },
    h(e, t) {
      return V(e.getHours() % 12 || 12, t.length);
    },
    H(e, t) {
      return V(e.getHours(), t.length);
    },
    m(e, t) {
      return V(e.getMinutes(), t.length);
    },
    s(e, t) {
      return V(e.getSeconds(), t.length);
    },
    S(e, t) {
      let n = t.length,
        r = e.getMilliseconds();
      return V(Math.trunc(r * 10 ** (n - 3)), t.length);
    },
  },
  kr = {
    am: `am`,
    pm: `pm`,
    midnight: `midnight`,
    noon: `noon`,
    morning: `morning`,
    afternoon: `afternoon`,
    evening: `evening`,
    night: `night`,
  },
  Ar = {
    G: function (e, t, n) {
      let r = +(e.getFullYear() > 0);
      switch (t) {
        case `G`:
        case `GG`:
        case `GGG`:
          return n.era(r, { width: `abbreviated` });
        case `GGGGG`:
          return n.era(r, { width: `narrow` });
        default:
          return n.era(r, { width: `wide` });
      }
    },
    y: function (e, t, n) {
      if (t === `yo`) {
        let t = e.getFullYear(),
          r = t > 0 ? t : 1 - t;
        return n.ordinalNumber(r, { unit: `year` });
      }
      return Or.y(e, t);
    },
    Y: function (e, t, n, r) {
      let i = Tr(e, r),
        a = i > 0 ? i : 1 - i;
      return t === `YY`
        ? V(a % 100, 2)
        : t === `Yo`
          ? n.ordinalNumber(a, { unit: `year` })
          : V(a, t.length);
    },
    R: function (e, t) {
      return V(er(e), t.length);
    },
    u: function (e, t) {
      return V(e.getFullYear(), t.length);
    },
    Q: function (e, t, n) {
      let r = Math.ceil((e.getMonth() + 1) / 3);
      switch (t) {
        case `Q`:
          return String(r);
        case `QQ`:
          return V(r, 2);
        case `Qo`:
          return n.ordinalNumber(r, { unit: `quarter` });
        case `QQQ`:
          return n.quarter(r, { width: `abbreviated`, context: `formatting` });
        case `QQQQQ`:
          return n.quarter(r, { width: `narrow`, context: `formatting` });
        default:
          return n.quarter(r, { width: `wide`, context: `formatting` });
      }
    },
    q: function (e, t, n) {
      let r = Math.ceil((e.getMonth() + 1) / 3);
      switch (t) {
        case `q`:
          return String(r);
        case `qq`:
          return V(r, 2);
        case `qo`:
          return n.ordinalNumber(r, { unit: `quarter` });
        case `qqq`:
          return n.quarter(r, { width: `abbreviated`, context: `standalone` });
        case `qqqqq`:
          return n.quarter(r, { width: `narrow`, context: `standalone` });
        default:
          return n.quarter(r, { width: `wide`, context: `standalone` });
      }
    },
    M: function (e, t, n) {
      let r = e.getMonth();
      switch (t) {
        case `M`:
        case `MM`:
          return Or.M(e, t);
        case `Mo`:
          return n.ordinalNumber(r + 1, { unit: `month` });
        case `MMM`:
          return n.month(r, { width: `abbreviated`, context: `formatting` });
        case `MMMMM`:
          return n.month(r, { width: `narrow`, context: `formatting` });
        default:
          return n.month(r, { width: `wide`, context: `formatting` });
      }
    },
    L: function (e, t, n) {
      let r = e.getMonth();
      switch (t) {
        case `L`:
          return String(r + 1);
        case `LL`:
          return V(r + 1, 2);
        case `Lo`:
          return n.ordinalNumber(r + 1, { unit: `month` });
        case `LLL`:
          return n.month(r, { width: `abbreviated`, context: `standalone` });
        case `LLLLL`:
          return n.month(r, { width: `narrow`, context: `standalone` });
        default:
          return n.month(r, { width: `wide`, context: `standalone` });
      }
    },
    w: function (e, t, n, r) {
      let i = Dr(e, r);
      return t === `wo` ? n.ordinalNumber(i, { unit: `week` }) : V(i, t.length);
    },
    I: function (e, t, n) {
      let r = wr(e);
      return t === `Io` ? n.ordinalNumber(r, { unit: `week` }) : V(r, t.length);
    },
    d: function (e, t, n) {
      return t === `do`
        ? n.ordinalNumber(e.getDate(), { unit: `date` })
        : Or.d(e, t);
    },
    D: function (e, t, n) {
      let r = Cr(e);
      return t === `Do`
        ? n.ordinalNumber(r, { unit: `dayOfYear` })
        : V(r, t.length);
    },
    E: function (e, t, n) {
      let r = e.getDay();
      switch (t) {
        case `E`:
        case `EE`:
        case `EEE`:
          return n.day(r, { width: `abbreviated`, context: `formatting` });
        case `EEEEE`:
          return n.day(r, { width: `narrow`, context: `formatting` });
        case `EEEEEE`:
          return n.day(r, { width: `short`, context: `formatting` });
        default:
          return n.day(r, { width: `wide`, context: `formatting` });
      }
    },
    e: function (e, t, n, r) {
      let i = e.getDay(),
        a = (i - r.weekStartsOn + 8) % 7 || 7;
      switch (t) {
        case `e`:
          return String(a);
        case `ee`:
          return V(a, 2);
        case `eo`:
          return n.ordinalNumber(a, { unit: `day` });
        case `eee`:
          return n.day(i, { width: `abbreviated`, context: `formatting` });
        case `eeeee`:
          return n.day(i, { width: `narrow`, context: `formatting` });
        case `eeeeee`:
          return n.day(i, { width: `short`, context: `formatting` });
        default:
          return n.day(i, { width: `wide`, context: `formatting` });
      }
    },
    c: function (e, t, n, r) {
      let i = e.getDay(),
        a = (i - r.weekStartsOn + 8) % 7 || 7;
      switch (t) {
        case `c`:
          return String(a);
        case `cc`:
          return V(a, t.length);
        case `co`:
          return n.ordinalNumber(a, { unit: `day` });
        case `ccc`:
          return n.day(i, { width: `abbreviated`, context: `standalone` });
        case `ccccc`:
          return n.day(i, { width: `narrow`, context: `standalone` });
        case `cccccc`:
          return n.day(i, { width: `short`, context: `standalone` });
        default:
          return n.day(i, { width: `wide`, context: `standalone` });
      }
    },
    i: function (e, t, n) {
      let r = e.getDay(),
        i = r === 0 ? 7 : r;
      switch (t) {
        case `i`:
          return String(i);
        case `ii`:
          return V(i, t.length);
        case `io`:
          return n.ordinalNumber(i, { unit: `day` });
        case `iii`:
          return n.day(r, { width: `abbreviated`, context: `formatting` });
        case `iiiii`:
          return n.day(r, { width: `narrow`, context: `formatting` });
        case `iiiiii`:
          return n.day(r, { width: `short`, context: `formatting` });
        default:
          return n.day(r, { width: `wide`, context: `formatting` });
      }
    },
    a: function (e, t, n) {
      let r = e.getHours() / 12 >= 1 ? `pm` : `am`;
      switch (t) {
        case `a`:
        case `aa`:
          return n.dayPeriod(r, {
            width: `abbreviated`,
            context: `formatting`,
          });
        case `aaa`:
          return n
            .dayPeriod(r, { width: `abbreviated`, context: `formatting` })
            .toLowerCase();
        case `aaaaa`:
          return n.dayPeriod(r, { width: `narrow`, context: `formatting` });
        default:
          return n.dayPeriod(r, { width: `wide`, context: `formatting` });
      }
    },
    b: function (e, t, n) {
      let r = e.getHours(),
        i;
      switch (
        ((i =
          r === 12
            ? kr.noon
            : r === 0
              ? kr.midnight
              : r / 12 >= 1
                ? `pm`
                : `am`),
        t)
      ) {
        case `b`:
        case `bb`:
          return n.dayPeriod(i, {
            width: `abbreviated`,
            context: `formatting`,
          });
        case `bbb`:
          return n
            .dayPeriod(i, { width: `abbreviated`, context: `formatting` })
            .toLowerCase();
        case `bbbbb`:
          return n.dayPeriod(i, { width: `narrow`, context: `formatting` });
        default:
          return n.dayPeriod(i, { width: `wide`, context: `formatting` });
      }
    },
    B: function (e, t, n) {
      let r = e.getHours(),
        i;
      switch (
        ((i =
          r >= 17
            ? kr.evening
            : r >= 12
              ? kr.afternoon
              : r >= 4
                ? kr.morning
                : kr.night),
        t)
      ) {
        case `B`:
        case `BB`:
        case `BBB`:
          return n.dayPeriod(i, {
            width: `abbreviated`,
            context: `formatting`,
          });
        case `BBBBB`:
          return n.dayPeriod(i, { width: `narrow`, context: `formatting` });
        default:
          return n.dayPeriod(i, { width: `wide`, context: `formatting` });
      }
    },
    h: function (e, t, n) {
      if (t === `ho`) {
        let t = e.getHours() % 12;
        return (t === 0 && (t = 12), n.ordinalNumber(t, { unit: `hour` }));
      }
      return Or.h(e, t);
    },
    H: function (e, t, n) {
      return t === `Ho`
        ? n.ordinalNumber(e.getHours(), { unit: `hour` })
        : Or.H(e, t);
    },
    K: function (e, t, n) {
      let r = e.getHours() % 12;
      return t === `Ko` ? n.ordinalNumber(r, { unit: `hour` }) : V(r, t.length);
    },
    k: function (e, t, n) {
      let r = e.getHours();
      return (
        r === 0 && (r = 24),
        t === `ko` ? n.ordinalNumber(r, { unit: `hour` }) : V(r, t.length)
      );
    },
    m: function (e, t, n) {
      return t === `mo`
        ? n.ordinalNumber(e.getMinutes(), { unit: `minute` })
        : Or.m(e, t);
    },
    s: function (e, t, n) {
      return t === `so`
        ? n.ordinalNumber(e.getSeconds(), { unit: `second` })
        : Or.s(e, t);
    },
    S: function (e, t) {
      return Or.S(e, t);
    },
    X: function (e, t, n) {
      let r = e.getTimezoneOffset();
      if (r === 0) return `Z`;
      switch (t) {
        case `X`:
          return Mr(r);
        case `XXXX`:
        case `XX`:
          return Nr(r);
        default:
          return Nr(r, `:`);
      }
    },
    x: function (e, t, n) {
      let r = e.getTimezoneOffset();
      switch (t) {
        case `x`:
          return Mr(r);
        case `xxxx`:
        case `xx`:
          return Nr(r);
        default:
          return Nr(r, `:`);
      }
    },
    O: function (e, t, n) {
      let r = e.getTimezoneOffset();
      switch (t) {
        case `O`:
        case `OO`:
        case `OOO`:
          return `GMT` + jr(r, `:`);
        default:
          return `GMT` + Nr(r, `:`);
      }
    },
    z: function (e, t, n) {
      let r = e.getTimezoneOffset();
      switch (t) {
        case `z`:
        case `zz`:
        case `zzz`:
          return `GMT` + jr(r, `:`);
        default:
          return `GMT` + Nr(r, `:`);
      }
    },
    t: function (e, t, n) {
      return V(Math.trunc(e / 1e3), t.length);
    },
    T: function (e, t, n) {
      return V(+e, t.length);
    },
  };
function jr(e, t = ``) {
  let n = e > 0 ? `-` : `+`,
    r = Math.abs(e),
    i = Math.trunc(r / 60),
    a = r % 60;
  return a === 0 ? n + String(i) : n + String(i) + t + V(a, 2);
}
function Mr(e, t) {
  return e % 60 == 0 ? (e > 0 ? `-` : `+`) + V(Math.abs(e) / 60, 2) : Nr(e, t);
}
function Nr(e, t = ``) {
  let n = e > 0 ? `-` : `+`,
    r = Math.abs(e),
    i = V(Math.trunc(r / 60), 2),
    a = V(r % 60, 2);
  return n + i + t + a;
}
var Pr = (e, t) => {
    switch (e) {
      case `P`:
        return t.date({ width: `short` });
      case `PP`:
        return t.date({ width: `medium` });
      case `PPP`:
        return t.date({ width: `long` });
      default:
        return t.date({ width: `full` });
    }
  },
  Fr = (e, t) => {
    switch (e) {
      case `p`:
        return t.time({ width: `short` });
      case `pp`:
        return t.time({ width: `medium` });
      case `ppp`:
        return t.time({ width: `long` });
      default:
        return t.time({ width: `full` });
    }
  },
  Ir = {
    p: Fr,
    P: (e, t) => {
      let n = e.match(/(P+)(p+)?/) || [],
        r = n[1],
        i = n[2];
      if (!i) return Pr(e, t);
      let a;
      switch (r) {
        case `P`:
          a = t.dateTime({ width: `short` });
          break;
        case `PP`:
          a = t.dateTime({ width: `medium` });
          break;
        case `PPP`:
          a = t.dateTime({ width: `long` });
          break;
        default:
          a = t.dateTime({ width: `full` });
          break;
      }
      return a.replace(`{{date}}`, Pr(r, t)).replace(`{{time}}`, Fr(i, t));
    },
  },
  Lr = /^D+$/,
  Rr = /^Y+$/,
  zr = [`D`, `DD`, `YY`, `YYYY`];
function Br(e) {
  return Lr.test(e);
}
function Vr(e) {
  return Rr.test(e);
}
function Hr(e, t, n) {
  let r = Ur(e, t, n);
  if ((console.warn(r), zr.includes(e))) throw RangeError(r);
}
function Ur(e, t, n) {
  let r = e[0] === `Y` ? `years` : `days of the month`;
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
var Wr = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  Gr = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  Kr = /^'([^]*?)'?$/,
  qr = /''/g,
  Jr = /[a-zA-Z]/;
function Yr(e, t, n) {
  let r = Zn(),
    i = n?.locale ?? r.locale ?? Sr,
    a =
      n?.firstWeekContainsDate ??
      n?.locale?.options?.firstWeekContainsDate ??
      r.firstWeekContainsDate ??
      r.locale?.options?.firstWeekContainsDate ??
      1,
    o =
      n?.weekStartsOn ??
      n?.locale?.options?.weekStartsOn ??
      r.weekStartsOn ??
      r.locale?.options?.weekStartsOn ??
      0,
    s = Jn(e, n?.in);
  if (!lr(s)) throw RangeError(`Invalid time value`);
  let c = t
    .match(Gr)
    .map((e) => {
      let t = e[0];
      if (t === `p` || t === `P`) {
        let n = Ir[t];
        return n(e, i.formatLong);
      }
      return e;
    })
    .join(``)
    .match(Wr)
    .map((e) => {
      if (e === `''`) return { isToken: !1, value: `'` };
      let t = e[0];
      if (t === `'`) return { isToken: !1, value: Xr(e) };
      if (Ar[t]) return { isToken: !0, value: e };
      if (t.match(Jr))
        throw RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            t +
            "`",
        );
      return { isToken: !1, value: e };
    });
  i.localize.preprocessor && (c = i.localize.preprocessor(s, c));
  let l = { firstWeekContainsDate: a, weekStartsOn: o, locale: i };
  return c
    .map((r) => {
      if (!r.isToken) return r.value;
      let a = r.value;
      ((!n?.useAdditionalWeekYearTokens && Vr(a)) ||
        (!n?.useAdditionalDayOfYearTokens && Br(a))) &&
        Hr(a, t, String(e));
      let o = Ar[a[0]];
      return o(s, a, i.localize, l);
    })
    .join(``);
}
function Xr(e) {
  let t = e.match(Kr);
  return t ? t[1].replace(qr, `'`) : e;
}
function Zr(e, t) {
  let n = Jn(e, t?.in),
    r = n.getFullYear(),
    i = n.getMonth(),
    a = qn(n, 0);
  return (a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate());
}
function Qr(e, t) {
  return sr(qn(t?.in || e, e), or(t?.in || e));
}
function $r(e, t) {
  return sr(e, Yn(or(t?.in || e), 1), t);
}
function ei(e, t, n) {
  return Yn(e, -t, n);
}
function ti(e, t) {
  return sr(qn(t?.in || e, e), ei(or(t?.in || e), 1));
}
function ni(e, t, n) {
  let r = Jn(e, n?.in),
    i = r.getFullYear(),
    a = r.getDate(),
    o = qn(n?.in || e, 0);
  (o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0));
  let s = Zr(o);
  return (r.setMonth(t, Math.min(a, s)), r);
}
function ri(e, t, n) {
  let r = Jn(e, n?.in);
  return isNaN(+r)
    ? qn(n?.in || e, NaN)
    : (t.year != null && r.setFullYear(t.year),
      t.month != null && (r = ni(r, t.month)),
      t.date != null && r.setDate(t.date),
      t.hours != null && r.setHours(t.hours),
      t.minutes != null && r.setMinutes(t.minutes),
      t.seconds != null && r.setSeconds(t.seconds),
      t.milliseconds != null && r.setMilliseconds(t.milliseconds),
      r);
}
var ii = (...e) =>
    e
      .filter((e, t, n) => !!e && e.trim() !== `` && n.indexOf(e) === t)
      .join(` `)
      .trim(),
  ai = (e) => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
  oi = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) =>
      n ? n.toUpperCase() : t.toLowerCase(),
    ),
  H = (e) => {
    let t = oi(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  si = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 2,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  ci = (e) => {
    for (let t in e)
      if (t.startsWith(`aria-`) || t === `role` || t === `title`) return !0;
    return !1;
  },
  li = (0, d.createContext)({}),
  ui = () => (0, d.useContext)(li),
  di = (0, d.forwardRef)(
    (
      {
        color: e,
        size: t,
        strokeWidth: n,
        absoluteStrokeWidth: r,
        className: i = ``,
        children: a,
        iconNode: o,
        ...s
      },
      c,
    ) => {
      let {
          size: l = 24,
          strokeWidth: u = 2,
          absoluteStrokeWidth: f = !1,
          color: p = `currentColor`,
          className: m = ``,
        } = ui() ?? {},
        h = (r ?? f) ? (Number(n ?? u) * 24) / Number(t ?? l) : (n ?? u);
      return (0, d.createElement)(
        `svg`,
        {
          ref: c,
          ...si,
          width: t ?? l ?? si.width,
          height: t ?? l ?? si.height,
          stroke: e ?? p,
          strokeWidth: h,
          className: ii(`lucide`, m, i),
          ...(!a && !ci(s) && { "aria-hidden": `true` }),
          ...s,
        },
        [
          ...o.map(([e, t]) => (0, d.createElement)(e, t)),
          ...(Array.isArray(a) ? a : [a]),
        ],
      );
    },
  ),
  U = (e, t) => {
    let n = (0, d.forwardRef)(({ className: n, ...r }, i) =>
      (0, d.createElement)(di, {
        ref: i,
        iconNode: t,
        className: ii(`lucide-${ai(H(e))}`, `lucide-${e}`, n),
        ...r,
      }),
    );
    return ((n.displayName = H(e)), n);
  },
  fi = U(`arrow-down`, [
    [`path`, { d: `M12 5v14`, key: `s699le` }],
    [`path`, { d: `m19 12-7 7-7-7`, key: `1idqje` }],
  ]),
  pi = U(`arrow-up-down`, [
    [`path`, { d: `m21 16-4 4-4-4`, key: `f6ql7i` }],
    [`path`, { d: `M17 20V4`, key: `1ejh1v` }],
    [`path`, { d: `m3 8 4-4 4 4`, key: `11wl7u` }],
    [`path`, { d: `M7 4v16`, key: `1glfcx` }],
  ]),
  mi = U(`bell`, [
    [`path`, { d: `M10.268 21a2 2 0 0 0 3.464 0`, key: `vwvbt9` }],
    [
      `path`,
      {
        d: `M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326`,
        key: `11g9vi`,
      },
    ],
  ]),
  hi = U(`calendar-days`, [
    [`path`, { d: `M8 2v4`, key: `1cmpym` }],
    [`path`, { d: `M16 2v4`, key: `4m81vk` }],
    [
      `rect`,
      { width: `18`, height: `18`, x: `3`, y: `4`, rx: `2`, key: `1hopcy` },
    ],
    [`path`, { d: `M3 10h18`, key: `8toen8` }],
    [`path`, { d: `M8 14h.01`, key: `6423bh` }],
    [`path`, { d: `M12 14h.01`, key: `1etili` }],
    [`path`, { d: `M16 14h.01`, key: `1gbofw` }],
    [`path`, { d: `M8 18h.01`, key: `lrp35t` }],
    [`path`, { d: `M12 18h.01`, key: `mhygvu` }],
    [`path`, { d: `M16 18h.01`, key: `kzsmim` }],
  ]),
  gi = U(`chevron-down`, [[`path`, { d: `m6 9 6 6 6-6`, key: `qrunsl` }]]),
  _i = U(`chevron-up`, [[`path`, { d: `m18 15-6-6-6 6`, key: `153udz` }]]),
  vi = U(`circle-alert`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`line`, { x1: `12`, x2: `12`, y1: `8`, y2: `12`, key: `1pkeuh` }],
    [`line`, { x1: `12`, x2: `12.01`, y1: `16`, y2: `16`, key: `4dfq90` }],
  ]),
  yi = U(`circle-check`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `m9 12 2 2 4-4`, key: `dzmm74` }],
  ]),
  bi = U(`circle-pause`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`line`, { x1: `10`, x2: `10`, y1: `15`, y2: `9`, key: `c1nkhi` }],
    [`line`, { x1: `14`, x2: `14`, y1: `15`, y2: `9`, key: `h65svq` }],
  ]),
  xi = U(`circle`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
  ]),
  Si = U(`clock-3`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `M12 6v6h4`, key: `135r8i` }],
  ]),
  Ci = U(`corner-down-left`, [
    [`path`, { d: `M20 4v7a4 4 0 0 1-4 4H4`, key: `6o5b7l` }],
    [`path`, { d: `m9 10-5 5 5 5`, key: `1kshq7` }],
  ]),
  wi = U(`download`, [
    [`path`, { d: `M12 15V3`, key: `m9g1x1` }],
    [`path`, { d: `M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`, key: `ih7n3h` }],
    [`path`, { d: `m7 10 5 5 5-5`, key: `brsn70` }],
  ]),
  Ti = U(`ellipsis`, [
    [`circle`, { cx: `12`, cy: `12`, r: `1`, key: `41hilf` }],
    [`circle`, { cx: `19`, cy: `12`, r: `1`, key: `1wjl8i` }],
    [`circle`, { cx: `5`, cy: `12`, r: `1`, key: `1pcz8c` }],
  ]),
  Ei = U(`flag`, [
    [
      `path`,
      {
        d: `M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528`,
        key: `1jaruq`,
      },
    ],
  ]),
  Di = U(`hash`, [
    [`line`, { x1: `4`, x2: `20`, y1: `9`, y2: `9`, key: `4lhtct` }],
    [`line`, { x1: `4`, x2: `20`, y1: `15`, y2: `15`, key: `vyu0kd` }],
    [`line`, { x1: `10`, x2: `8`, y1: `3`, y2: `21`, key: `1ggp8o` }],
    [`line`, { x1: `16`, x2: `14`, y1: `3`, y2: `21`, key: `weycgp` }],
  ]),
  Oi = U(`inbox`, [
    [
      `polyline`,
      { points: `22 12 16 12 14 15 10 15 8 12 2 12`, key: `o97t9d` },
    ],
    [
      `path`,
      {
        d: `M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,
        key: `oot6mr`,
      },
    ],
  ]),
  ki = U(`layout-dashboard`, [
    [
      `rect`,
      { width: `7`, height: `9`, x: `3`, y: `3`, rx: `1`, key: `10lvy0` },
    ],
    [
      `rect`,
      { width: `7`, height: `5`, x: `14`, y: `3`, rx: `1`, key: `16une8` },
    ],
    [
      `rect`,
      { width: `7`, height: `9`, x: `14`, y: `12`, rx: `1`, key: `1hutg5` },
    ],
    [
      `rect`,
      { width: `7`, height: `5`, x: `3`, y: `16`, rx: `1`, key: `ldoo1y` },
    ],
  ]),
  Ai = U(`layout-panel-left`, [
    [
      `rect`,
      { width: `7`, height: `18`, x: `3`, y: `3`, rx: `1`, key: `2obqm` },
    ],
    [
      `rect`,
      { width: `7`, height: `7`, x: `14`, y: `3`, rx: `1`, key: `6d4xhi` },
    ],
    [
      `rect`,
      { width: `7`, height: `7`, x: `14`, y: `14`, rx: `1`, key: `nxv5o0` },
    ],
  ]),
  ji = U(`message-square`, [
    [
      `path`,
      {
        d: `M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,
        key: `18887p`,
      },
    ],
  ]),
  Mi = U(`moon`, [
    [
      `path`,
      {
        d: `M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,
        key: `kfwtm`,
      },
    ],
  ]),
  Ni = U(`plus`, [
    [`path`, { d: `M5 12h14`, key: `1ays0h` }],
    [`path`, { d: `M12 5v14`, key: `s699le` }],
  ]),
  Pi = U(`search`, [
    [`path`, { d: `m21 21-4.34-4.34`, key: `14j7rj` }],
    [`circle`, { cx: `11`, cy: `11`, r: `8`, key: `4ej97u` }],
  ]),
  Fi = U(`settings`, [
    [
      `path`,
      {
        d: `M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915`,
        key: `1i5ecw`,
      },
    ],
    [`circle`, { cx: `12`, cy: `12`, r: `3`, key: `1v7zrd` }],
  ]),
  Ii = U(`square`, [
    [
      `rect`,
      { width: `18`, height: `18`, x: `3`, y: `3`, rx: `2`, key: `afitv7` },
    ],
  ]),
  Li = U(`sun`, [
    [`circle`, { cx: `12`, cy: `12`, r: `4`, key: `4exip2` }],
    [`path`, { d: `M12 2v2`, key: `tus03m` }],
    [`path`, { d: `M12 20v2`, key: `1lh1kg` }],
    [`path`, { d: `m4.93 4.93 1.41 1.41`, key: `149t6j` }],
    [`path`, { d: `m17.66 17.66 1.41 1.41`, key: `ptbguv` }],
    [`path`, { d: `M2 12h2`, key: `1t8f8n` }],
    [`path`, { d: `M20 12h2`, key: `1q8mjw` }],
    [`path`, { d: `m6.34 17.66-1.41 1.41`, key: `1m8zz5` }],
    [`path`, { d: `m19.07 4.93-1.41 1.41`, key: `1shlcs` }],
  ]),
  Ri = U(`trash-2`, [
    [`path`, { d: `M10 11v6`, key: `nco0om` }],
    [`path`, { d: `M14 11v6`, key: `outv1u` }],
    [`path`, { d: `M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`, key: `miytrc` }],
    [`path`, { d: `M3 6h18`, key: `d0wm0j` }],
    [`path`, { d: `M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`, key: `e791ji` }],
  ]),
  zi = U(`type`, [
    [`path`, { d: `M12 4v16`, key: `1654pz` }],
    [`path`, { d: `M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2`, key: `e0r10z` }],
    [`path`, { d: `M9 20h6`, key: `s66wpe` }],
  ]),
  Bi = U(`undo-2`, [
    [`path`, { d: `M9 14 4 9l5-5`, key: `102s5s` }],
    [
      `path`,
      {
        d: `M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11`,
        key: `f3b9sd`,
      },
    ],
  ]),
  Vi = U(`upload`, [
    [`path`, { d: `M12 3v12`, key: `1x0j5s` }],
    [`path`, { d: `m17 8-5-5-5 5`, key: `7q97r8` }],
    [`path`, { d: `M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`, key: `ih7n3h` }],
  ]),
  Hi = U(`x`, [
    [`path`, { d: `M18 6 6 18`, key: `1bl5f8` }],
    [`path`, { d: `m6 6 12 12`, key: `d8bk6v` }],
  ]),
  Ui = 8;
function Wi(e) {
  let t = 0;
  for (let n = 0; n < e.length; n += 1) t = (t * 31 + e.charCodeAt(n)) >>> 0;
  return `var(--tag-${t % Ui})`;
}
var W = [
    `Dashboard`,
    `My day`,
    `Inbox`,
    `Overdue`,
    `Upcoming`,
    `Waiting`,
    `Completed`,
  ],
  G = [...W, `Today`, `All tasks`],
  Gi = [`Dashboard`, `Inbox`, `Upcoming`],
  Ki = [
    { value: `manual`, label: `Manual order`, short: `Manual` },
    { value: `due`, label: `Due date`, short: `Due` },
    { value: `priority`, label: `Priority`, short: `Priority` },
  ];
function qi(e) {
  return Ki[(Ki.findIndex((t) => t.value === e) + 1) % Ki.length].value;
}
var Ji = {
    Dashboard: `Nothing left to do. Add a task above to start the day.`,
    "My day": `Nothing scheduled for today. Add a task or pull one from Inbox.`,
    Inbox: `Nothing unfiled. Tasks added without a date wait here.`,
    Overdue: `Nothing overdue. Everything with a date is still ahead of you.`,
    Upcoming: `Nothing due in the next seven days. Add a task with a date.`,
    Waiting: `Nothing is blocked. Set a task to waiting when it is on someone else.`,
    Today: `Nothing due today. Give a task a date to see it here.`,
    Completed: `Nothing completed yet. Finished tasks collect here.`,
    "All tasks": `No tasks yet. Add the first one above.`,
  },
  Yi = 864e5;
function Xi(e) {
  let t = new Date(e),
    n = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
  return { start: n, end: n + Yi };
}
function Zi(e, t, n) {
  let { start: r, end: i } = Xi(n);
  switch (t) {
    case `Dashboard`:
      return e.status !== `completed`;
    case `Inbox`:
      return e.status !== `completed` && e.dueAt == null;
    case `My day`:
      return e.inMyDay;
    case `Today`:
      return e.dueAt != null && e.dueAt >= r && e.dueAt < i;
    case `Upcoming`:
      return e.dueAt != null && e.dueAt >= i && e.dueAt <= i + 7 * Yi;
    case `Overdue`:
      return e.dueAt != null && e.dueAt < n && e.status !== `completed`;
    case `Waiting`:
      return e.status === `waiting`;
    case `Completed`:
      return e.status === `completed`;
    case `All tasks`:
      return !0;
  }
}
function Qi(e, t) {
  let n = t.trim().toLowerCase();
  return (
    !n ||
    `${e.title} ${e.description} ${e.tags.join(` `)}`.toLowerCase().includes(n)
  );
}
var $i = { high: 0, medium: 1, low: 2, none: 3 };
function ea(e, t) {
  let n = (e, t) => e.order - t.order;
  return [...e].sort((e, r) =>
    t === `due`
      ? e.dueAt == null && r.dueAt == null
        ? n(e, r)
        : e.dueAt == null
          ? 1
          : r.dueAt == null
            ? -1
            : e.dueAt - r.dueAt || n(e, r)
      : (t === `priority` && $i[e.priority] - $i[r.priority]) || n(e, r),
  );
}
function ta(e, t) {
  let { end: n } = Xi(t),
    r = e.filter((e) => e.status !== `completed`),
    i = new Set(),
    a = (e, t, n, a) => {
      let o = r.filter((e) => !i.has(e.id) && n(e));
      for (let e of o) i.add(e.id);
      return { title: e, column: t, empty: a, tasks: ea(o, `due`) };
    };
  return [
    a(
      `Today`,
      0,
      (e) => e.inMyDay,
      `Nothing scheduled for today. Pull one up from Remaining.`,
    ),
    a(`Overdue`, 3, (e) => e.dueAt != null && e.dueAt < t),
    a(`Tomorrow`, 1, (e) => e.dueAt != null && e.dueAt < n + Yi),
    a(`Remaining`, 2, () => !0),
  ].filter((e) => e.tasks.length > 0 || e.empty !== void 0);
}
function na(e) {
  let t = new Map();
  for (let n of e)
    if (n.status !== `completed`)
      for (let e of n.tags) t.set(e, (t.get(e) ?? 0) + 1);
  return [...t.entries()]
    .map(([e, t]) => ({ tag: e, count: t }))
    .sort((e, t) => e.tag.localeCompare(t.tag));
}
var ra = o((e) => {
    var t = u(),
      n = Symbol.for(`react.element`),
      r = Symbol.for(`react.fragment`),
      i = Object.prototype.hasOwnProperty,
      a =
        t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      o = { key: !0, ref: !0, __self: !0, __source: !0 };
    function s(e, t, r) {
      var s,
        c = {},
        l = null,
        u = null;
      for (s in (r !== void 0 && (l = `` + r),
      t.key !== void 0 && (l = `` + t.key),
      t.ref !== void 0 && (u = t.ref),
      t))
        i.call(t, s) && !o.hasOwnProperty(s) && (c[s] = t[s]);
      if (e && e.defaultProps)
        for (s in ((t = e.defaultProps), t)) c[s] === void 0 && (c[s] = t[s]);
      return {
        $$typeof: n,
        type: e,
        key: l,
        ref: u,
        props: c,
        _owner: a.current,
      };
    }
    ((e.Fragment = r), (e.jsx = s), (e.jsxs = s));
  }),
  K = o((e, t) => {
    t.exports = ra();
  })(),
  ia = 8;
function aa({
  tasks: e,
  tags: t,
  onClose: n,
  onSelectView: r,
  onSelectTag: i,
  onOpenTask: a,
  onToggleTheme: o,
  onOpenSettings: s,
}) {
  let [c, l] = (0, d.useState)(``),
    [u, f] = (0, d.useState)(0),
    p = (0, d.useRef)(null),
    m = (0, d.useMemo)(() => {
      let n = c.trim().toLowerCase(),
        r = (n ? e.filter((e) => Qi(e, n)) : [])
          .slice(0, ia)
          .map((e) => ({
            kind: `task`,
            id: `task-${e.id}`,
            label: e.title,
            hint: e.status === `completed` ? `completed` : void 0,
          })),
        i = G.filter((e) => !n || e.toLowerCase().includes(n)).map((e) => ({
          kind: `view`,
          id: `view-${e}`,
          label: `Go to ${e}`,
          view: e,
        })),
        a = t
          .filter(({ tag: e }) => !n || e.includes(n))
          .map(({ tag: e }) => ({
            kind: `tag`,
            id: `tag-${e}`,
            label: `Filter by ${e}`,
            tag: e,
          })),
        l = [
          { kind: `action`, id: `theme`, label: `Toggle theme`, run: o },
          { kind: `action`, id: `settings`, label: `Open settings`, run: s },
        ].filter((e) => !n || e.label.toLowerCase().includes(n));
      return [...r, ...i, ...a, ...l];
    }, [c, e, t, o, s]);
  ((0, d.useEffect)(() => f(0), [c]),
    (0, d.useEffect)(() => {
      p.current
        ?.querySelector(`[data-active="true"]`)
        ?.scrollIntoView({ block: `nearest` });
    }, [u]));
  let h = (e) => {
    if (e) {
      switch (e.kind) {
        case `task`:
          a(e.id.slice(5));
          break;
        case `view`:
          (i(void 0), r(e.view));
          break;
        case `tag`:
          i(e.tag);
          break;
        case `action`:
          e.run();
          break;
      }
      n();
    }
  };
  return (0, K.jsx)(`div`, {
    className: `fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[12vh]`,
    onMouseDown: (e) => {
      e.target === e.currentTarget && n();
    },
    children: (0, K.jsxs)(`div`, {
      role: `dialog`,
      "aria-modal": `true`,
      "aria-label": `Command palette`,
      className: `flex max-h-[60vh] w-full max-w-lg flex-col overflow-hidden rounded border border-line bg-surface-2`,
      onMouseDown: (e) => e.stopPropagation(),
      children: [
        (0, K.jsxs)(`div`, {
          className: `flex shrink-0 items-center gap-2 border-b border-line px-3 py-2.5`,
          children: [
            (0, K.jsx)(Pi, {
              size: 16,
              className: `shrink-0 text-ink-muted`,
              "aria-hidden": `true`,
            }),
            (0, K.jsx)(`input`, {
              autoFocus: !0,
              value: c,
              onChange: (e) => l(e.target.value),
              onKeyDown: (e) => {
                e.key === `ArrowDown`
                  ? (e.preventDefault(),
                    f((e) => Math.min(e + 1, m.length - 1)))
                  : e.key === `ArrowUp`
                    ? (e.preventDefault(), f((e) => Math.max(e - 1, 0)))
                    : e.key === `Enter` && (e.preventDefault(), h(m[u]));
              },
              placeholder: `Search tasks, or jump to a view`,
              "aria-label": `Search tasks, or jump to a view`,
              className: `w-full bg-transparent text-title text-ink outline-none placeholder:text-ink-muted`,
            }),
          ],
        }),
        (0, K.jsxs)(`ul`, {
          ref: p,
          className: `min-h-0 flex-1 overflow-y-auto p-1`,
          children: [
            m.length === 0 &&
              (0, K.jsxs)(`li`, {
                className: `px-2 py-3 text-body text-ink-muted`,
                children: [
                  `Nothing matches “`,
                  c.trim(),
                  `”. Try a task title or a view name.`,
                ],
              }),
            m.map((e, t) =>
              (0, K.jsx)(
                `li`,
                {
                  children: (0, K.jsxs)(`button`, {
                    type: `button`,
                    "data-active": t === u,
                    onMouseMove: () => f(t),
                    onClick: () => h(e),
                    className: `flex w-full items-center gap-2.5 rounded px-2 py-1.5 text-left text-title ${t === u ? `bg-accent-bg text-accent` : `text-ink-secondary`}`,
                    children: [
                      (0, K.jsx)(oa, { item: e }),
                      (0, K.jsx)(`span`, {
                        className: `min-w-0 flex-1 truncate`,
                        children: e.label,
                      }),
                      e.kind === `task` &&
                        e.hint &&
                        (0, K.jsx)(`span`, {
                          className: `shrink-0 text-meta text-ink-muted`,
                          children: e.hint,
                        }),
                      t === u &&
                        (0, K.jsx)(Ci, {
                          size: 13,
                          "aria-hidden": `true`,
                          className: `shrink-0 opacity-60`,
                        }),
                    ],
                  }),
                },
                e.id,
              ),
            ),
          ],
        }),
      ],
    }),
  });
}
function oa({ item: e }) {
  return e.kind === `tag`
    ? (0, K.jsx)(`span`, {
        "aria-hidden": `true`,
        className: `h-[7px] w-[7px] shrink-0 rounded-full`,
        style: { background: Wi(e.tag) },
      })
    : (0, K.jsx)(
        e.kind === `task`
          ? Ii
          : e.kind === `view`
            ? Di
            : e.id === `theme`
              ? Mi
              : Fi,
        { size: 14, "aria-hidden": `true`, className: `shrink-0 opacity-70` },
      );
}
var sa = { Dashboard: ki, Inbox: Oi, Upcoming: Si };
function ca({ view: e, onSelectView: t, onOpenSettings: n }) {
  let r = (e) =>
    `flex flex-1 flex-col items-center gap-1 py-2 text-meta ${e ? `text-accent` : `text-ink-muted`}`;
  return (0, K.jsxs)(`nav`, {
    className: `fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-surface-2 md:hidden`,
    children: [
      Gi.map((n) => {
        let i = sa[n] ?? Oi;
        return (0, K.jsxs)(
          `button`,
          {
            type: `button`,
            onClick: () => t(n),
            "aria-current": e === n ? `page` : void 0,
            className: r(e === n),
            children: [(0, K.jsx)(i, { size: 18, "aria-hidden": `true` }), n],
          },
          n,
        );
      }),
      (0, K.jsxs)(`button`, {
        type: `button`,
        onClick: n,
        className: r(!1),
        children: [
          (0, K.jsx)(Fi, { size: 18, "aria-hidden": `true` }),
          `Settings`,
        ],
      }),
    ],
  });
}
var la = 5 * 6e4,
  ua = 6e4,
  q = 60 * ua,
  da = 24 * q;
function fa(e) {
  return e === `offsets` || e === `every` || e === `escalating`;
}
function pa(e) {
  return Number.isFinite(e) ? Math.min(Math.max(Math.trunc(e), 0), 20) : 0;
}
function ma(e, t, n) {
  switch (t.kind) {
    case `none`:
      return [];
    case `at`:
      return [t.at];
    case `offsets`: {
      if (e.dueAt == null) return [];
      let n = e.dueAt;
      return t.before.map((e) => n - e);
    }
    case `every`: {
      if (e.dueAt == null || t.interval <= 0) return [];
      let n = e.dueAt,
        r = pa(t.cap),
        i = [];
      for (let e = r; e >= 1; e--) i.push(n - e * t.interval);
      return i;
    }
    case `escalating`: {
      if (e.dueAt == null) return [];
      let r = e.dueAt,
        i = pa(t.count),
        a = r - n;
      if (i === 0 || a <= 3e5) return [];
      let o = [];
      for (let e = 1; e <= i; e++) o.push(r - Math.max(a / 2 ** e, la));
      return o;
    }
  }
}
function ha(e, t, n = {}) {
  let r = n.now ?? Date.now(),
    i = n.newId ?? (() => crypto.randomUUID()),
    a =
      t.kind === `none`
        ? []
        : (n.existing ?? []).filter((t) => t.taskId === e.id),
    o = new Map(),
    s = new Map();
  for (let e of a)
    (s.set(e.remindAt, e), e.fired === 1 && o.set(e.remindAt, e));
  let c = ma(e, t, r).filter((e) => Number.isFinite(e) && e > r && !o.has(e)),
    l = [...o.keys(), ...new Set(c)].sort((e, t) => e - t).slice(-20);
  return l.map((t, n) => {
    let r = o.get(t) ?? s.get(t);
    return {
      id: r?.id ?? i(),
      taskId: e.id,
      remindAt: t,
      seq: n + 1,
      total: l.length,
      fired: r?.fired ?? 0,
    };
  });
}
var ga = { m: ua, h: q, d: da };
function _a(e) {
  let t = /^(\d+(?:\.\d+)?)\s*([mhd])$/i.exec(e.trim());
  if (t) return Number(t[1]) * ga[t[2].toLowerCase()];
}
function va(e) {
  let t = e
    .split(`,`)
    .map((e) => _a(e))
    .filter((e) => e !== void 0 && e > 0);
  return [...new Set(t)].sort((e, t) => t - e);
}
function ya(e) {
  return e % 864e5 == 0
    ? `${e / da}d`
    : e % 36e5 == 0
      ? `${e / q}h`
      : `${Math.round(e / ua)}m`;
}
function ba(e) {
  if (e <= 0) return `now`;
  if (e < 6e4) return `under a minute`;
  let t = Math.floor(e / da),
    n = Math.floor((e % da) / q),
    r = Math.floor((e % q) / ua);
  return t > 0
    ? n > 0
      ? `${t}d ${n}h`
      : `${t}d`
    : n > 0
      ? r > 0
        ? `${n}h ${r}m`
        : `${n}h`
      : `${r}m`;
}
var J = 6,
  xa = 9,
  Sa = 20,
  Ca = {
    "!none": `none`,
    "!low": `low`,
    "!med": `medium`,
    "!medium": `medium`,
    "!high": `high`,
  },
  wa = {
    sun: 0,
    sunday: 0,
    mon: 1,
    monday: 1,
    tue: 2,
    tues: 2,
    tuesday: 2,
    wed: 3,
    weds: 3,
    wednesday: 3,
    thu: 4,
    thur: 4,
    thurs: 4,
    thursday: 4,
    fri: 5,
    friday: 5,
    sat: 6,
    saturday: 6,
  },
  Ta = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i,
  Ea = /^#[\w-]+$/;
function Da(e) {
  let t = [],
    n = /\S+/g,
    r;
  for (; (r = n.exec(e)) !== null; )
    t.push({ text: r[0], start: r.index, end: n.lastIndex });
  return t;
}
function Oa(e) {
  let t = Ta.exec(e);
  if (!t) return;
  let n = t[3]?.toLowerCase();
  if (!n && t[2] === void 0) return;
  let r = Number(t[1]),
    i = Number(t[2] ?? 0);
  if (
    !(r > 23 || i > 59) &&
    (n === `pm` && r < 12 && (r += 12),
    n === `am` && r === 12 && (r = 0),
    !(r > 23))
  )
    return r * 60 + i;
}
function ka(e) {
  let t = e.slice(1).toLowerCase(),
    n = /^escalate(\d+)$/.exec(t);
  if (n) return { kind: `escalating`, count: Number(n[1]) };
  let r = /^every(\d+[mhd])$/.exec(t);
  if (r) {
    let e = _a(r[1]);
    return e === void 0 ? void 0 : { kind: `every`, interval: e, cap: J };
  }
  let i = va(t);
  if (i.length > 0) return { kind: `offsets`, before: i };
}
function Aa(e) {
  let t = e.toLowerCase();
  return t.startsWith(`!`)
    ? t in Ca
      ? `priority`
      : `none`
    : Ea.test(e)
      ? `tag`
      : t.startsWith(`~`)
        ? _a(t.slice(1)) === void 0
          ? `none`
          : `estimate`
        : t.startsWith(`@`)
          ? ka(t) === void 0
            ? `none`
            : `reminder`
          : t === `today` || t === `tonight` || t === `tomorrow` || t in wa
            ? `day`
            : t === `at` || t === `next`
              ? `connector`
              : Oa(t) === void 0
                ? `none`
                : `time`;
}
function ja(e, t, n, r) {
  if (e === void 0 && t === void 0) return;
  let i = t === void 0 ? void 0 : Oa(t),
    a = e?.toLowerCase(),
    o;
  if (a === void 0) o = rr(r);
  else if (a === `today` || a === `tonight`) o = rr(r);
  else if (a === `tomorrow`) o = Yn(rr(r), 1);
  else {
    let e = (wa[a] - new Date(r).getDay() + 7) % 7 || 7;
    o = Yn(rr(r), n && e < 7 ? e + 7 : e);
  }
  let s = i === void 0 ? (a === `tonight` ? Sa : xa) : Math.floor(i / 60),
    c = ri(o, {
      hours: s,
      minutes: i === void 0 ? 0 : i % 60,
      seconds: 0,
      milliseconds: 0,
    }).getTime();
  return a === void 0 && c <= r ? c + da : c;
}
function Ma(e, t = Date.now()) {
  let n = Da(e),
    r = [];
  for (let e = n.length - 1; e >= 0; e--) {
    let t = n[e],
      i = Aa(t.text);
    if (i === `none`) break;
    if (i === `connector`) {
      let e = r[0]?.kind;
      if (
        (e !== `day` && e !== `time`) ||
        (t.text.toLowerCase() === `next` && e !== `day`)
      )
        break;
    }
    r.unshift({ word: t, kind: i });
  }
  let i = r[0]?.word.start ?? e.length,
    a = e.slice(0, i).trim(),
    o = [],
    s = [],
    c,
    l,
    u,
    d = [],
    f,
    p,
    m = !1;
  for (let { word: e, kind: t } of r) {
    let n = e.text.toLowerCase();
    switch (t) {
      case `priority`:
        ((c = Ca[n]),
          o.push({
            type: `priority`,
            start: e.start,
            end: e.end,
            text: e.text,
          }));
        break;
      case `tag`: {
        let t = e.text.slice(1).toLowerCase();
        (s.includes(t) || s.push(t),
          o.push({ type: `tag`, start: e.start, end: e.end, text: e.text }));
        break;
      }
      case `estimate`: {
        let t = _a(n.slice(1));
        (t !== void 0 && (l = Math.round(t / ua)),
          o.push({
            type: `estimate`,
            start: e.start,
            end: e.end,
            text: e.text,
          }));
        break;
      }
      case `reminder`:
        ((u = ka(n)),
          o.push({
            type: `reminder`,
            start: e.start,
            end: e.end,
            text: e.text,
          }));
        break;
      case `day`:
        ((f = n), d.push(e));
        break;
      case `time`:
        ((p = n), d.push(e));
        break;
      case `connector`:
        (n === `next` && (m = !0), d.push(e));
        break;
    }
  }
  let h = ja(f, p, m, t);
  if (h !== void 0 && d.length > 0) {
    let t = Math.min(...d.map((e) => e.start)),
      n = Math.max(...d.map((e) => e.end));
    o.push({ type: `due`, start: t, end: n, text: e.slice(t, n) });
  }
  return {
    title: a,
    priority: c,
    tags: s,
    estimatedMinutes: l,
    dueAt: h,
    policy: u,
    tokens: o.sort((e, t) => e.start - t.start),
  };
}
function Na(e) {
  if (e < 60) return `${e} min`;
  let t = Math.floor(e / 60),
    n = e % 60;
  return n === 0 ? `${t} h` : `${t} h ${n} min`;
}
var Pa = c(
    o((e, t) => {
      ((n, r) => {
        typeof e == `object` && t !== void 0
          ? (t.exports = r())
          : typeof define == `function` && define.amd
            ? define(r)
            : ((n = typeof globalThis < `u` ? globalThis : n || self).Dexie =
                r());
      })(e, function () {
        var e = function (t, n) {
            return (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array
                ? function (e, t) {
                    e.__proto__ = t;
                  }
                : function (e, t) {
                    for (var n in t)
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[n] = t[n]);
                  }))(t, n);
          },
          t = function () {
            return (t =
              Object.assign ||
              function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                  for (var i in (t = arguments[n]))
                    Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e;
              }).apply(this, arguments);
          };
        function n(e, t, n) {
          if (n || arguments.length === 2)
            for (var r, i = 0, a = t.length; i < a; i++)
              (!r && i in t) ||
                ((r ||= Array.prototype.slice.call(t, 0, i))[i] = t[i]);
          return e.concat(r || Array.prototype.slice.call(t));
        }
        var r =
            typeof globalThis < `u`
              ? globalThis
              : typeof self < `u`
                ? self
                : typeof window < `u`
                  ? window
                  : global,
          i = Object.keys,
          a = Array.isArray;
        function o(e, t) {
          return (
            typeof t == `object` &&
              i(t).forEach(function (n) {
                e[n] = t[n];
              }),
            e
          );
        }
        typeof Promise > `u` || r.Promise || (r.Promise = Promise);
        var s = Object.getPrototypeOf,
          c = {}.hasOwnProperty;
        function l(e, t) {
          return c.call(e, t);
        }
        function u(e, t) {
          (typeof t == `function` && (t = t(s(e))),
            (typeof Reflect > `u` ? i : Reflect.ownKeys)(t).forEach(
              function (n) {
                f(e, n, t[n]);
              },
            ));
        }
        var d = Object.defineProperty;
        function f(e, t, n, r) {
          d(
            e,
            t,
            o(
              n && l(n, `get`) && typeof n.get == `function`
                ? { get: n.get, set: n.set, configurable: !0 }
                : { value: n, configurable: !0, writable: !0 },
              r,
            ),
          );
        }
        function p(e) {
          return {
            from: function (t) {
              return (
                (e.prototype = Object.create(t.prototype)),
                f(e.prototype, `constructor`, e),
                { extend: u.bind(null, e.prototype) }
              );
            },
          };
        }
        var m = Object.getOwnPropertyDescriptor,
          h = [].slice;
        function g(e, t, n) {
          return h.call(e, t, n);
        }
        function _(e, t) {
          return t(e);
        }
        function v(e) {
          if (!e) throw Error(`Assertion Failed`);
        }
        function y(e) {
          r.setImmediate ? setImmediate(e) : setTimeout(e, 0);
        }
        function b(e, t) {
          if (typeof t == `string` && l(e, t)) return e[t];
          if (!t) return e;
          if (typeof t != `string`) {
            for (var n = [], r = 0, i = t.length; r < i; ++r) {
              var a = b(e, t[r]);
              n.push(a);
            }
            return n;
          }
          var o,
            s = t.indexOf(`.`);
          return s === -1 || (o = e[t.substr(0, s)]) == null
            ? void 0
            : b(o, t.substr(s + 1));
        }
        function x(e, t, n) {
          if (
            e &&
            t !== void 0 &&
            !(`isFrozen` in Object && Object.isFrozen(e))
          )
            if (typeof t != `string` && `length` in t) {
              v(typeof n != `string` && `length` in n);
              for (var r = 0, i = t.length; r < i; ++r) x(e, t[r], n[r]);
            } else {
              var o = t.indexOf(`.`);
              if (o !== -1) {
                var s = t.substr(0, o),
                  o = t.substr(o + 1);
                if (o === ``)
                  n === void 0
                    ? a(e) && !isNaN(parseInt(s))
                      ? e.splice(s, 1)
                      : delete e[s]
                    : (e[s] = n);
                else {
                  var c = e[s];
                  if (!c || !l(e, s)) {
                    if (n === void 0) return;
                    c = e[s] = {};
                  }
                  x(c, o, n);
                }
              } else
                n === void 0
                  ? a(e) && !isNaN(parseInt(t))
                    ? e.splice(t, 1)
                    : delete e[t]
                  : (e[t] = n);
            }
        }
        function S(e) {
          var t,
            n = {};
          for (t in e) l(e, t) && (n[t] = e[t]);
          return n;
        }
        var C = [].concat;
        function w(e) {
          return C.apply([], e);
        }
        var T =
            `BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey`
              .split(`,`)
              .concat(
                w(
                  [8, 16, 32, 64].map(function (e) {
                    return [`Int`, `Uint`, `Float`].map(function (t) {
                      return t + e + `Array`;
                    });
                  }),
                ),
              )
              .filter(function (e) {
                return r[e];
              }),
          ee = new Set(
            T.map(function (e) {
              return r[e];
            }),
          ),
          te = null;
        function ne(e) {
          return (
            (te = new WeakMap()),
            (e = (function e(t) {
              if (!t || typeof t != `object`) return t;
              var n = te.get(t);
              if (n) return n;
              if (a(t)) {
                ((n = []), te.set(t, n));
                for (var r = 0, i = t.length; r < i; ++r) n.push(e(t[r]));
              } else if (ee.has(t.constructor)) n = t;
              else {
                var o,
                  c = s(t);
                for (o in ((n = c === Object.prototype ? {} : Object.create(c)),
                te.set(t, n),
                t))
                  l(t, o) && (n[o] = e(t[o]));
              }
              return n;
            })(e)),
            (te = null),
            e
          );
        }
        var re = {}.toString;
        function ie(e) {
          return re.call(e).slice(8, -1);
        }
        var ae = typeof Symbol < `u` ? Symbol.iterator : `@@iterator`,
          oe =
            typeof ae == `symbol`
              ? function (e) {
                  var t;
                  return e != null && (t = e[ae]) && t.apply(e);
                }
              : function () {
                  return null;
                };
        function se(e, t) {
          ((t = e.indexOf(t)), 0 <= t && e.splice(t, 1));
        }
        var E = {};
        function ce(e) {
          var t, n, r, i;
          if (arguments.length === 1) {
            if (a(e)) return e.slice();
            if (this === E && typeof e == `string`) return [e];
            if ((i = oe(e)))
              for (n = []; !(r = i.next()).done; ) n.push(r.value);
            else {
              if (e == null || typeof (t = e.length) != `number`) return [e];
              for (n = Array(t); t--; ) n[t] = e[t];
            }
          } else
            for (t = arguments.length, n = Array(t); t--; ) n[t] = arguments[t];
          return n;
        }
        var le =
            typeof Symbol < `u`
              ? function (e) {
                  return e[Symbol.toStringTag] === `AsyncFunction`;
                }
              : function () {
                  return !1;
                },
          T = [
            `Unknown`,
            `Constraint`,
            `Data`,
            `TransactionInactive`,
            `ReadOnly`,
            `Version`,
            `NotFound`,
            `InvalidState`,
            `InvalidAccess`,
            `Abort`,
            `Timeout`,
            `QuotaExceeded`,
            `Syntax`,
            `DataClone`,
          ],
          ue = [
            `Modify`,
            `Bulk`,
            `OpenFailed`,
            `VersionChange`,
            `Schema`,
            `Upgrade`,
            `InvalidTable`,
            `MissingAPI`,
            `NoSuchDatabase`,
            `InvalidArgument`,
            `SubTransaction`,
            `Unsupported`,
            `Internal`,
            `DatabaseClosed`,
            `PrematureCommit`,
            `ForeignAwait`,
          ].concat(T),
          D = {
            VersionChanged: `Database version changed by other database connection`,
            DatabaseClosed: `Database has been closed`,
            Abort: `Transaction aborted`,
            TransactionInactive: `Transaction has already completed or failed`,
            MissingAPI: `IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb`,
          };
        function de(e, t) {
          ((this.name = e), (this.message = t));
        }
        function fe(e, t) {
          return (
            e +
            `. Errors: ` +
            Object.keys(t)
              .map(function (e) {
                return t[e].toString();
              })
              .filter(function (e, t, n) {
                return n.indexOf(e) === t;
              }).join(`
`)
          );
        }
        function pe(e, t, n, r) {
          ((this.failures = t),
            (this.failedKeys = r),
            (this.successCount = n),
            (this.message = fe(e, t)));
        }
        function me(e, t) {
          ((this.name = `BulkError`),
            (this.failures = Object.keys(t).map(function (e) {
              return t[e];
            })),
            (this.failuresByPos = t),
            (this.message = fe(e, this.failures)));
        }
        (p(de)
          .from(Error)
          .extend({
            toString: function () {
              return this.name + `: ` + this.message;
            },
          }),
          p(pe).from(de),
          p(me).from(de));
        var he = ue.reduce(function (e, t) {
            return ((e[t] = t + `Error`), e);
          }, {}),
          ge = de,
          O = ue.reduce(function (e, t) {
            var n = t + `Error`;
            function r(e, r) {
              ((this.name = n),
                e
                  ? typeof e == `string`
                    ? ((this.message = `${e}${
                        r
                          ? `
 ` + r
                          : ``
                      }`),
                      (this.inner = r || null))
                    : typeof e == `object` &&
                      ((this.message = `${e.name} ${e.message}`),
                      (this.inner = e))
                  : ((this.message = D[t] || n), (this.inner = null)));
            }
            return (p(r).from(ge), (e[t] = r), e);
          }, {}),
          _e =
            ((O.Syntax = SyntaxError),
            (O.Type = TypeError),
            (O.Range = RangeError),
            T.reduce(function (e, t) {
              return ((e[t + `Error`] = O[t]), e);
            }, {}));
        T = ue.reduce(function (e, t) {
          return (
            [`Syntax`, `Type`, `Range`].indexOf(t) === -1 &&
              (e[t + `Error`] = O[t]),
            e
          );
        }, {});
        function k() {}
        function ve(e) {
          return e;
        }
        function ye(e, t) {
          return e == null || e === ve
            ? t
            : function (n) {
                return t(e(n));
              };
        }
        function be(e, t) {
          return function () {
            (e.apply(this, arguments), t.apply(this, arguments));
          };
        }
        function xe(e, t) {
          return e === k
            ? t
            : function () {
                var n = e.apply(this, arguments),
                  r = (n !== void 0 && (arguments[0] = n), this.onsuccess),
                  i = this.onerror,
                  a =
                    ((this.onsuccess = null),
                    (this.onerror = null),
                    t.apply(this, arguments));
                return (
                  r &&
                    (this.onsuccess = this.onsuccess
                      ? be(r, this.onsuccess)
                      : r),
                  i && (this.onerror = this.onerror ? be(i, this.onerror) : i),
                  a === void 0 ? n : a
                );
              };
        }
        function Se(e, t) {
          return e === k
            ? t
            : function () {
                e.apply(this, arguments);
                var n = this.onsuccess,
                  r = this.onerror;
                ((this.onsuccess = this.onerror = null),
                  t.apply(this, arguments),
                  n &&
                    (this.onsuccess = this.onsuccess
                      ? be(n, this.onsuccess)
                      : n),
                  r && (this.onerror = this.onerror ? be(r, this.onerror) : r));
              };
        }
        function Ce(e, t) {
          return e === k
            ? t
            : function (n) {
                var r = e.apply(this, arguments),
                  n = (o(n, r), this.onsuccess),
                  i = this.onerror,
                  a =
                    ((this.onsuccess = null),
                    (this.onerror = null),
                    t.apply(this, arguments));
                return (
                  n &&
                    (this.onsuccess = this.onsuccess
                      ? be(n, this.onsuccess)
                      : n),
                  i && (this.onerror = this.onerror ? be(i, this.onerror) : i),
                  r === void 0 ? (a === void 0 ? void 0 : a) : o(r, a)
                );
              };
        }
        function we(e, t) {
          return e === k
            ? t
            : function () {
                return (
                  !1 !== t.apply(this, arguments) && e.apply(this, arguments)
                );
              };
        }
        function Te(e, t) {
          return e === k
            ? t
            : function () {
                var n = e.apply(this, arguments);
                if (n && typeof n.then == `function`) {
                  for (var r = this, i = arguments.length, a = Array(i); i--; )
                    a[i] = arguments[i];
                  return n.then(function () {
                    return t.apply(r, a);
                  });
                }
                return t.apply(this, arguments);
              };
        }
        ((T.ModifyError = pe), (T.DexieError = de), (T.BulkError = me));
        var Ee =
          typeof location < `u` &&
          /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
        function De(e) {
          Ee = e;
        }
        var Oe = {},
          ke = 100,
          Ae =
            typeof Promise > `u`
              ? []
              : ((ue = Promise.resolve()),
                typeof crypto < `u` && crypto.subtle
                  ? [
                      (Ae = crypto.subtle.digest(
                        `SHA-512`,
                        new Uint8Array([0]),
                      )),
                      s(Ae),
                      ue,
                    ]
                  : [ue, s(ue), ue]),
          ue = Ae[0],
          je = Ae[1],
          je = je && je.then,
          Me = ue && ue.constructor,
          Ne = !!Ae[2],
          Pe = function (e, t) {
            (Ve.push([e, t]), (Ie &&= (queueMicrotask(Xe), !1)));
          },
          Fe = !0,
          Ie = !0,
          Le = [],
          Re = [],
          ze = ve,
          Be = {
            id: `global`,
            global: !0,
            ref: 0,
            unhandleds: [],
            onunhandled: k,
            pgp: !1,
            env: {},
            finalize: k,
          },
          A = Be,
          Ve = [],
          He = 0,
          Ue = [];
        function j(e) {
          if (typeof this != `object`)
            throw TypeError(`Promises must be constructed via new`);
          ((this._listeners = []), (this._lib = !1));
          var t = (this._PSD = A);
          if (typeof e != `function`) {
            if (e !== Oe) throw TypeError(`Not a function`);
            ((this._state = arguments[1]),
              (this._value = arguments[2]),
              !1 === this._state && Ke(this, this._value));
          } else
            ((this._state = null),
              (this._value = null),
              ++t.ref,
              (function e(t, n) {
                try {
                  n(
                    function (n) {
                      if (t._state === null) {
                        if (n === t)
                          throw TypeError(
                            `A promise cannot be resolved with itself.`,
                          );
                        var r = t._lib && Ze();
                        (n && typeof n.then == `function`
                          ? e(t, function (e, t) {
                              n instanceof j ? n._then(e, t) : n.then(e, t);
                            })
                          : ((t._state = !0), (t._value = n), qe(t)),
                          r && Qe());
                      }
                    },
                    Ke.bind(null, t),
                  );
                } catch (e) {
                  Ke(t, e);
                }
              })(this, e));
        }
        var We = {
          get: function () {
            var e = A,
              t = at;
            function n(n, r) {
              var i = this,
                a = !e.global && (e !== A || t !== at),
                o = a && !lt(),
                s = new j(function (t, s) {
                  Je(i, new Ge(ht(n, e, a, o), ht(r, e, a, o), t, s, e));
                });
              return (
                this._consoleTask && (s._consoleTask = this._consoleTask),
                s
              );
            }
            return ((n.prototype = Oe), n);
          },
          set: function (e) {
            f(
              this,
              `then`,
              e && e.prototype === Oe
                ? We
                : {
                    get: function () {
                      return e;
                    },
                    set: We.set,
                  },
            );
          },
        };
        function Ge(e, t, n, r, i) {
          ((this.onFulfilled = typeof e == `function` ? e : null),
            (this.onRejected = typeof t == `function` ? t : null),
            (this.resolve = n),
            (this.reject = r),
            (this.psd = i));
        }
        function Ke(e, t) {
          var n, r;
          (Re.push(t),
            e._state === null &&
              ((n = e._lib && Ze()),
              (t = ze(t)),
              (e._state = !1),
              (e._value = t),
              (r = e),
              Le.some(function (e) {
                return e._value === r._value;
              }) || Le.push(r),
              qe(e),
              n) &&
              Qe());
        }
        function qe(e) {
          var t = e._listeners;
          e._listeners = [];
          for (var n = 0, r = t.length; n < r; ++n) Je(e, t[n]);
          var i = e._PSD;
          (--i.ref || i.finalize(),
            He === 0 &&
              (++He,
              Pe(function () {
                --He == 0 && $e();
              }, [])));
        }
        function Je(e, t) {
          if (e._state === null) e._listeners.push(t);
          else {
            var n = e._state ? t.onFulfilled : t.onRejected;
            if (n === null) return (e._state ? t.resolve : t.reject)(e._value);
            (++t.psd.ref, ++He, Pe(Ye, [n, e, t]));
          }
        }
        function Ye(e, t, n) {
          try {
            var r,
              i = t._value;
            (!t._state && Re.length && (Re = []),
              (r =
                Ee && t._consoleTask
                  ? t._consoleTask.run(function () {
                      return e(i);
                    })
                  : e(i)),
              t._state ||
                Re.indexOf(i) !== -1 ||
                ((e) => {
                  for (var t = Le.length; t; )
                    if (Le[--t]._value === e._value) return Le.splice(t, 1);
                })(t),
              n.resolve(r));
          } catch (e) {
            n.reject(e);
          } finally {
            (--He == 0 && $e(), --n.psd.ref || n.psd.finalize());
          }
        }
        function Xe() {
          mt(Be, function () {
            Ze() && Qe();
          });
        }
        function Ze() {
          var e = Fe;
          return ((Ie = Fe = !1), e);
        }
        function Qe() {
          var e, t, n;
          do
            for (; 0 < Ve.length; )
              for (e = Ve, Ve = [], n = e.length, t = 0; t < n; ++t) {
                var r = e[t];
                r[0].apply(null, r[1]);
              }
          while (0 < Ve.length);
          Ie = Fe = !0;
        }
        function $e() {
          for (
            var e = Le,
              t =
                ((Le = []),
                e.forEach(function (e) {
                  e._PSD.onunhandled.call(null, e._value, e);
                }),
                Ue.slice(0)),
              n = t.length;
            n;
          )
            t[--n]();
        }
        function et(e) {
          return new j(Oe, !1, e);
        }
        function M(e, t) {
          var n = A;
          return function () {
            var r = Ze(),
              i = A;
            try {
              return (ft(n, !0), e.apply(this, arguments));
            } catch (e) {
              t && t(e);
            } finally {
              (ft(i, !1), r && Qe());
            }
          };
        }
        (u(j.prototype, {
          then: We,
          _then: function (e, t) {
            Je(this, new Ge(null, null, e, t, A));
          },
          catch: function (e) {
            var t, n;
            return arguments.length === 1
              ? this.then(null, e)
              : ((t = e),
                (n = arguments[1]),
                typeof t == `function`
                  ? this.then(null, function (e) {
                      return (e instanceof t ? n : et)(e);
                    })
                  : this.then(null, function (e) {
                      return (e && e.name === t ? n : et)(e);
                    }));
          },
          finally: function (e) {
            return this.then(
              function (t) {
                return j.resolve(e()).then(function () {
                  return t;
                });
              },
              function (t) {
                return j.resolve(e()).then(function () {
                  return et(t);
                });
              },
            );
          },
          timeout: function (e, t) {
            var n = this;
            return e < 1 / 0
              ? new j(function (r, i) {
                  var a = setTimeout(function () {
                    return i(new O.Timeout(t));
                  }, e);
                  n.then(r, i).finally(clearTimeout.bind(null, a));
                })
              : this;
          },
        }),
          typeof Symbol < `u` &&
            Symbol.toStringTag &&
            f(j.prototype, Symbol.toStringTag, `Dexie.Promise`),
          (Be.env = pt()),
          u(j, {
            all: function () {
              var e = ce.apply(null, arguments).map(ut);
              return new j(function (t, n) {
                e.length === 0 && t([]);
                var r = e.length;
                e.forEach(function (i, a) {
                  return j.resolve(i).then(function (n) {
                    ((e[a] = n), --r || t(e));
                  }, n);
                });
              });
            },
            resolve: function (e) {
              return e instanceof j
                ? e
                : e && typeof e.then == `function`
                  ? new j(function (t, n) {
                      e.then(t, n);
                    })
                  : new j(Oe, !0, e);
            },
            reject: et,
            race: function () {
              var e = ce.apply(null, arguments).map(ut);
              return new j(function (t, n) {
                e.map(function (e) {
                  return j.resolve(e).then(t, n);
                });
              });
            },
            PSD: {
              get: function () {
                return A;
              },
              set: function (e) {
                return (A = e);
              },
            },
            totalEchoes: {
              get: function () {
                return at;
              },
            },
            newPSD: st,
            usePSD: mt,
            scheduler: {
              get: function () {
                return Pe;
              },
              set: function (e) {
                Pe = e;
              },
            },
            rejectionMapper: {
              get: function () {
                return ze;
              },
              set: function (e) {
                ze = e;
              },
            },
            follow: function (e, t) {
              return new j(function (n, r) {
                return st(
                  function (t, n) {
                    var r = A;
                    ((r.unhandleds = []),
                      (r.onunhandled = n),
                      (r.finalize = be(function () {
                        var e,
                          r = this;
                        ((e = function () {
                          r.unhandleds.length === 0 ? t() : n(r.unhandleds[0]);
                        }),
                          Ue.push(function t() {
                            (e(), Ue.splice(Ue.indexOf(t), 1));
                          }),
                          ++He,
                          Pe(function () {
                            --He == 0 && $e();
                          }, []));
                      }, r.finalize)),
                      e());
                  },
                  t,
                  n,
                  r,
                );
              });
            },
          }),
          Me &&
            (Me.allSettled &&
              f(j, `allSettled`, function () {
                var e = ce.apply(null, arguments).map(ut);
                return new j(function (t) {
                  e.length === 0 && t([]);
                  var n = e.length,
                    r = Array(n);
                  e.forEach(function (e, i) {
                    return j
                      .resolve(e)
                      .then(
                        function (e) {
                          return (r[i] = { status: `fulfilled`, value: e });
                        },
                        function (e) {
                          return (r[i] = { status: `rejected`, reason: e });
                        },
                      )
                      .then(function () {
                        return --n || t(r);
                      });
                  });
                });
              }),
            Me.any &&
              typeof AggregateError < `u` &&
              f(j, `any`, function () {
                var e = ce.apply(null, arguments).map(ut);
                return new j(function (t, n) {
                  e.length === 0 && n(AggregateError([]));
                  var r = e.length,
                    i = Array(r);
                  e.forEach(function (e, a) {
                    return j.resolve(e).then(
                      function (e) {
                        return t(e);
                      },
                      function (e) {
                        ((i[a] = e), --r || n(AggregateError(i)));
                      },
                    );
                  });
                });
              }),
            Me.withResolvers) &&
            (j.withResolvers = Me.withResolvers));
        var tt = { awaits: 0, echoes: 0, id: 0 },
          nt = 0,
          rt = [],
          it = 0,
          at = 0,
          ot = 0;
        function st(e, t, n, r) {
          var i = A,
            a = Object.create(i),
            t =
              ((a.parent = i),
              (a.ref = 0),
              (a.global = !1),
              (a.id = ++ot),
              Be.env,
              (a.env = Ne
                ? {
                    Promise: j,
                    PromiseProp: { value: j, configurable: !0, writable: !0 },
                    all: j.all,
                    race: j.race,
                    allSettled: j.allSettled,
                    any: j.any,
                    resolve: j.resolve,
                    reject: j.reject,
                  }
                : {}),
              t && o(a, t),
              ++i.ref,
              (a.finalize = function () {
                --this.parent.ref || this.parent.finalize();
              }),
              mt(a, e, n, r));
          return (a.ref === 0 && a.finalize(), t);
        }
        function ct() {
          return ((tt.id ||= ++nt), ++tt.awaits, (tt.echoes += ke), tt.id);
        }
        function lt() {
          return (
            !!tt.awaits &&
            (--tt.awaits == 0 && (tt.id = 0), (tt.echoes = tt.awaits * ke), !0)
          );
        }
        function ut(e) {
          return tt.echoes && e && e.constructor === Me
            ? (ct(),
              e.then(
                function (e) {
                  return (lt(), e);
                },
                function (e) {
                  return (lt(), N(e));
                },
              ))
            : e;
        }
        function dt() {
          var e = rt[rt.length - 1];
          (rt.pop(), ft(e, !1));
        }
        function ft(e, t) {
          var n,
            i,
            a = A;
          ((t ? !tt.echoes || (it++ && e === A) : !it || (--it && e === A)) ||
            queueMicrotask(
              t
                ? function (e) {
                    (++at,
                      (tt.echoes && --tt.echoes != 0) ||
                        (tt.echoes = tt.awaits = tt.id = 0),
                      rt.push(A),
                      ft(e, !0));
                  }.bind(null, e)
                : dt,
            ),
            e !== A &&
              ((A = e), a === Be && (Be.env = pt()), Ne) &&
              ((n = Be.env.Promise), (i = e.env), a.global || e.global) &&
              (Object.defineProperty(r, "Promise", i.PromiseProp),
              (n.all = i.all),
              (n.race = i.race),
              (n.resolve = i.resolve),
              (n.reject = i.reject),
              i.allSettled && (n.allSettled = i.allSettled),
              i.any) &&
              (n.any = i.any));
        }
        function pt() {
          var e = r.Promise;
          return Ne
            ? {
                Promise: e,
                PromiseProp: Object.getOwnPropertyDescriptor(r, `Promise`),
                all: e.all,
                race: e.race,
                allSettled: e.allSettled,
                any: e.any,
                resolve: e.resolve,
                reject: e.reject,
              }
            : {};
        }
        function mt(e, t, n, r, i) {
          var a = A;
          try {
            return (ft(e, !0), t(n, r, i));
          } finally {
            ft(a, !1);
          }
        }
        function ht(e, t, n, r) {
          return typeof e == `function`
            ? function () {
                var i = A;
                (n && ct(), ft(t, !0));
                try {
                  return e.apply(this, arguments);
                } finally {
                  (ft(i, !1), r && queueMicrotask(lt));
                }
              }
            : e;
        }
        function gt(e) {
          Promise === Me && tt.echoes === 0
            ? it === 0
              ? e()
              : enqueueNativeMicroTask(e)
            : setTimeout(e, 0);
        }
        (`` + je).indexOf(`[native code]`) === -1 && (ct = lt = k);
        var N = j.reject,
          _t = `￿`,
          vt = `Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.`,
          yt = `String expected.`,
          bt = `__dbnames`,
          P = `readonly`,
          xt = `readwrite`;
        function St(e, t) {
          return e
            ? t
              ? function () {
                  return e.apply(this, arguments) && t.apply(this, arguments);
                }
              : e
            : t;
        }
        var Ct = {
          type: 3,
          lower: -1 / 0,
          lowerOpen: !1,
          upper: [[]],
          upperOpen: !1,
        };
        function wt(e) {
          return typeof e != `string` || /\./.test(e)
            ? function (e) {
                return e;
              }
            : function (t) {
                return (t[e] === void 0 && e in t && delete (t = ne(t))[e], t);
              };
        }
        function Tt() {
          throw O.Type(
            `Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.`,
          );
        }
        function F(e, t) {
          try {
            var n = Et(e),
              r = Et(t);
            if (n !== r)
              return n === `Array`
                ? 1
                : r === `Array`
                  ? -1
                  : n === `binary`
                    ? 1
                    : r === `binary`
                      ? -1
                      : n === `string`
                        ? 1
                        : r === `string`
                          ? -1
                          : n === `Date`
                            ? 1
                            : r === `Date`
                              ? -1
                              : NaN;
            switch (n) {
              case `number`:
              case `Date`:
              case `string`:
                return t < e ? 1 : e < t ? -1 : 0;
              case `binary`:
                for (
                  var i = Dt(e),
                    a = Dt(t),
                    o = i.length,
                    s = a.length,
                    c = o < s ? o : s,
                    l = 0;
                  l < c;
                  ++l
                )
                  if (i[l] !== a[l]) return i[l] < a[l] ? -1 : 1;
                return o === s ? 0 : o < s ? -1 : 1;
              case `Array`:
                for (
                  var u = e,
                    d = t,
                    f = u.length,
                    p = d.length,
                    m = f < p ? f : p,
                    h = 0;
                  h < m;
                  ++h
                ) {
                  var g = F(u[h], d[h]);
                  if (g !== 0) return g;
                }
                return f === p ? 0 : f < p ? -1 : 1;
            }
          } catch {}
          return NaN;
        }
        function Et(e) {
          var t = typeof e;
          return t == `object` &&
            (ArrayBuffer.isView(e) || (t = ie(e)) === `ArrayBuffer`)
            ? `binary`
            : t;
        }
        function Dt(e) {
          return e instanceof Uint8Array
            ? e
            : ArrayBuffer.isView(e)
              ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
              : new Uint8Array(e);
        }
        function Ot(e, t, n) {
          var r = e.schema.yProps;
          return r
            ? (t &&
                0 < n.numFailures &&
                (t = t.filter(function (e, t) {
                  return !n.failures[t];
                })),
              Promise.all(
                r.map(function (n) {
                  return (
                    (n = n.updatesTable),
                    t
                      ? e.db.table(n).where(`k`).anyOf(t).delete()
                      : e.db.table(n).clear()
                  );
                }),
              ).then(function () {
                return n;
              }))
            : n;
        }
        At.prototype.execute = function (e) {
          var t = this[`@@propmod`];
          if (t.add !== void 0) {
            var r = t.add;
            if (a(r)) return n(n([], a(e) ? e : [], !0), r, !0).sort();
            if (typeof r == `number`) return (Number(e) || 0) + r;
            if (typeof r == `bigint`)
              try {
                return BigInt(e) + r;
              } catch {
                return BigInt(0) + r;
              }
            throw TypeError(`Invalid term ${r}`);
          }
          if (t.remove !== void 0) {
            var i = t.remove;
            if (a(i))
              return a(e)
                ? e
                    .filter(function (e) {
                      return !i.includes(e);
                    })
                    .sort()
                : [];
            if (typeof i == `number`) return Number(e) - i;
            if (typeof i == `bigint`)
              try {
                return BigInt(e) - i;
              } catch {
                return BigInt(0) - i;
              }
            throw TypeError(`Invalid subtrahend ${i}`);
          }
          return (
            (r = (r = t.replacePrefix)?.[0]),
            r && typeof e == `string` && e.startsWith(r)
              ? t.replacePrefix[1] + e.substring(r.length)
              : e
          );
        };
        var kt = At;
        function At(e) {
          this[`@@propmod`] = e;
        }
        function jt(e, t) {
          for (var n = i(t), r = n.length, a = !1, o = 0; o < r; ++o) {
            var s = n[o],
              c = t[s],
              l = b(e, s);
            c instanceof kt
              ? (x(e, s, c.execute(l)), (a = !0))
              : l !== c && (x(e, s, c), (a = !0));
          }
          return a;
        }
        ((I.prototype._trans = function (e, t, n) {
          var r = this._tx || A.trans,
            i = this.name,
            a =
              Ee &&
              typeof console < `u` &&
              console.createTask &&
              console.createTask(
                `Dexie: ${e === `readonly` ? `read` : `write`} ${this.name}`,
              );
          function o(e, n, r) {
            if (r.schema[i]) return t(r.idbtrans, r);
            throw new O.NotFound(`Table ` + i + ` not part of transaction`);
          }
          var s = Ze();
          try {
            var c =
              r && r.db._novip === this.db._novip
                ? r === A.trans
                  ? r._promise(e, o, n)
                  : st(
                      function () {
                        return r._promise(e, o, n);
                      },
                      { trans: r, transless: A.transless || A },
                    )
                : (function e(t, n, r, i) {
                    if (
                      t.idbdb &&
                      (t._state.openComplete || A.letThrough || t._vip)
                    ) {
                      var a = t._createTransaction(n, r, t._dbSchema);
                      try {
                        (a.create(), (t._state.PR1398_maxLoop = 3));
                      } catch (a) {
                        return a.name === he.InvalidState &&
                          t.isOpen() &&
                          0 < --t._state.PR1398_maxLoop
                          ? (console.warn(`Dexie: Need to reopen db`),
                            t.close({ disableAutoOpen: !1 }),
                            t.open().then(function () {
                              return e(t, n, r, i);
                            }))
                          : N(a);
                      }
                      return a
                        ._promise(n, function (e, t) {
                          return st(function () {
                            return ((A.trans = a), i(e, t, a));
                          });
                        })
                        .then(function (e) {
                          if (n === `readwrite`)
                            try {
                              a.idbtrans.commit();
                            } catch {}
                          return n === `readonly`
                            ? e
                            : a._completion.then(function () {
                                return e;
                              });
                        });
                    }
                    if (t._state.openComplete)
                      return N(new O.DatabaseClosed(t._state.dbOpenError));
                    if (!t._state.isBeingOpened) {
                      if (!t._state.autoOpen) return N(new O.DatabaseClosed());
                      t.open().catch(k);
                    }
                    return t._state.dbReadyPromise.then(function () {
                      return e(t, n, r, i);
                    });
                  })(this.db, e, [this.name], o);
            return (
              a &&
                ((c._consoleTask = a),
                (c = c.catch(function (e) {
                  return (console.trace(e), N(e));
                }))),
              c
            );
          } finally {
            s && Qe();
          }
        }),
          (I.prototype.get = function (e, t) {
            var n = this;
            return e && e.constructor === Object
              ? this.where(e).first(t)
              : e == null
                ? N(new O.Type(`Invalid argument to Table.get()`))
                : this._trans(`readonly`, function (t) {
                    return n.core.get({ trans: t, key: e }).then(function (e) {
                      return n.hook.reading.fire(e);
                    });
                  }).then(t);
          }),
          (I.prototype.where = function (e) {
            if (typeof e == `string`) return new this.db.WhereClause(this, e);
            if (a(e)) return new this.db.WhereClause(this, `[${e.join(`+`)}]`);
            var t = i(e);
            if (t.length === 1) return this.where(t[0]).equals(e[t[0]]);
            var n = this.schema.indexes
              .concat(this.schema.primKey)
              .filter(function (e) {
                if (
                  e.compound &&
                  t.every(function (t) {
                    return 0 <= e.keyPath.indexOf(t);
                  })
                ) {
                  for (var n = 0; n < t.length; ++n)
                    if (t.indexOf(e.keyPath[n]) === -1) return !1;
                  return !0;
                }
                return !1;
              })
              .sort(function (e, t) {
                return e.keyPath.length - t.keyPath.length;
              })[0];
            if (n && this.db._maxKey !== _t)
              return (
                (s = n.keyPath.slice(0, t.length)),
                this.where(s).equals(
                  s.map(function (t) {
                    return e[t];
                  }),
                )
              );
            !n &&
              Ee &&
              console.warn(
                `The query ${JSON.stringify(e)} on ${this.name} would benefit from a compound index [${t.join(`+`)}]`,
              );
            var r = this.schema.idxByName;
            function o(e, t) {
              return F(e, t) === 0;
            }
            var s = t.reduce(
                function (t, n) {
                  var i = t[0],
                    t = t[1],
                    s = r[n],
                    c = e[n];
                  return [
                    i || s,
                    i || !s
                      ? St(
                          t,
                          s && s.multi
                            ? function (e) {
                                return (
                                  (e = b(e, n)),
                                  a(e) &&
                                    e.some(function (e) {
                                      return o(c, e);
                                    })
                                );
                              }
                            : function (e) {
                                return o(c, b(e, n));
                              },
                        )
                      : t,
                  ];
                },
                [null, null],
              ),
              c = s[0],
              s = s[1];
            return c
              ? this.where(c.name).equals(e[c.keyPath]).filter(s)
              : n
                ? this.filter(s)
                : this.where(t).equals(``);
          }),
          (I.prototype.filter = function (e) {
            return this.toCollection().and(e);
          }),
          (I.prototype.count = function (e) {
            return this.toCollection().count(e);
          }),
          (I.prototype.offset = function (e) {
            return this.toCollection().offset(e);
          }),
          (I.prototype.limit = function (e) {
            return this.toCollection().limit(e);
          }),
          (I.prototype.each = function (e) {
            return this.toCollection().each(e);
          }),
          (I.prototype.toArray = function (e) {
            return this.toCollection().toArray(e);
          }),
          (I.prototype.toCollection = function () {
            return new this.db.Collection(new this.db.WhereClause(this));
          }),
          (I.prototype.orderBy = function (e) {
            return new this.db.Collection(
              new this.db.WhereClause(this, a(e) ? `[${e.join(`+`)}]` : e),
            );
          }),
          (I.prototype.reverse = function () {
            return this.toCollection().reverse();
          }),
          (I.prototype.mapToClass = function (t) {
            for (
              var n = this.db,
                r = this.name,
                i =
                  ((this.schema.mappedClass = t).prototype instanceof Tt &&
                    (t = ((t) => {
                      var i = s,
                        a = t;
                      if (typeof a != `function` && a !== null)
                        throw TypeError(
                          `Class extends value ` +
                            String(a) +
                            ` is not a constructor or null`,
                        );
                      function o() {
                        this.constructor = i;
                      }
                      function s() {
                        return (t !== null && t.apply(this, arguments)) || this;
                      }
                      return (
                        e(i, a),
                        (i.prototype =
                          a === null
                            ? Object.create(a)
                            : ((o.prototype = a.prototype), new o())),
                        Object.defineProperty(s.prototype, "db", {
                          get: function () {
                            return n;
                          },
                          enumerable: !1,
                          configurable: !0,
                        }),
                        (s.prototype.table = function () {
                          return r;
                        }),
                        s
                      );
                    })(t)),
                  new Set()),
                a = t.prototype;
              a;
              a = s(a)
            )
              Object.getOwnPropertyNames(a).forEach(function (e) {
                return i.add(e);
              });
            function o(e) {
              if (!e) return e;
              var n,
                r = Object.create(t.prototype);
              for (n in e)
                if (!i.has(n))
                  try {
                    r[n] = e[n];
                  } catch {}
              return r;
            }
            return (
              this.schema.readHook &&
                this.hook.reading.unsubscribe(this.schema.readHook),
              (this.schema.readHook = o),
              this.hook(`reading`, o),
              t
            );
          }),
          (I.prototype.defineClass = function () {
            return this.mapToClass(function (e) {
              o(this, e);
            });
          }),
          (I.prototype.add = function (e, t) {
            var n = this,
              r = this.schema.primKey,
              i = r.auto,
              a = r.keyPath,
              o = e;
            return (
              a && i && (o = wt(a)(e)),
              this._trans(`readwrite`, function (e) {
                return n.core.mutate({
                  trans: e,
                  type: `add`,
                  keys: t == null ? null : [t],
                  values: [o],
                });
              })
                .then(function (e) {
                  return e.numFailures ? j.reject(e.failures[0]) : e.lastResult;
                })
                .then(function (t) {
                  if (a)
                    try {
                      x(e, a, t);
                    } catch {}
                  return t;
                })
            );
          }),
          (I.prototype.upsert = function (e, t) {
            var n = this,
              r = this.schema.primKey.keyPath;
            return this._trans(`readwrite`, function (i) {
              return n.core.get({ trans: i, key: e }).then(function (a) {
                var o = a ?? {};
                return (
                  jt(o, t),
                  r && x(o, r, e),
                  n.core
                    .mutate({
                      trans: i,
                      type: `put`,
                      values: [o],
                      keys: [e],
                      upsert: !0,
                      updates: { keys: [e], changeSpecs: [t] },
                    })
                    .then(function (e) {
                      return e.numFailures ? j.reject(e.failures[0]) : !!a;
                    })
                );
              });
            });
          }),
          (I.prototype.update = function (e, t) {
            return typeof e != `object` || a(e)
              ? this.where(`:id`).equals(e).modify(t)
              : (e = b(e, this.schema.primKey.keyPath)) === void 0
                ? N(
                    new O.InvalidArgument(
                      `Given object does not contain its primary key`,
                    ),
                  )
                : this.where(`:id`).equals(e).modify(t);
          }),
          (I.prototype.put = function (e, t) {
            var n = this,
              r = this.schema.primKey,
              i = r.auto,
              a = r.keyPath,
              o = e;
            return (
              a && i && (o = wt(a)(e)),
              this._trans(`readwrite`, function (e) {
                return n.core.mutate({
                  trans: e,
                  type: `put`,
                  values: [o],
                  keys: t == null ? null : [t],
                });
              })
                .then(function (e) {
                  return e.numFailures ? j.reject(e.failures[0]) : e.lastResult;
                })
                .then(function (t) {
                  if (a)
                    try {
                      x(e, a, t);
                    } catch {}
                  return t;
                })
            );
          }),
          (I.prototype.delete = function (e) {
            var t = this;
            return this._trans(`readwrite`, function (n) {
              return t.core
                .mutate({ trans: n, type: `delete`, keys: [e] })
                .then(function (n) {
                  return Ot(t, [e], n);
                })
                .then(function (e) {
                  return e.numFailures ? j.reject(e.failures[0]) : void 0;
                });
            });
          }),
          (I.prototype.clear = function () {
            var e = this;
            return this._trans(`readwrite`, function (t) {
              return e.core
                .mutate({ trans: t, type: `deleteRange`, range: Ct })
                .then(function (t) {
                  return Ot(e, null, t);
                });
            }).then(function (e) {
              return e.numFailures ? j.reject(e.failures[0]) : void 0;
            });
          }),
          (I.prototype.bulkGet = function (e) {
            var t = this;
            return this._trans(`readonly`, function (n) {
              return t.core.getMany({ keys: e, trans: n }).then(function (e) {
                return e.map(function (e) {
                  return t.hook.reading.fire(e);
                });
              });
            });
          }),
          (I.prototype.bulkAdd = function (e, t, n) {
            var r = this,
              i = Array.isArray(t) ? t : void 0,
              a = (n ||= i ? void 0 : t) ? n.allKeys : void 0;
            return this._trans(`readwrite`, function (t) {
              var n = r.schema.primKey,
                o = n.auto,
                n = n.keyPath;
              if (n && i)
                throw new O.InvalidArgument(
                  `bulkAdd(): keys argument invalid on tables with inbound keys`,
                );
              if (i && i.length !== e.length)
                throw new O.InvalidArgument(
                  `Arguments objects and keys must have the same length`,
                );
              var s = e.length,
                o = n && o ? e.map(wt(n)) : e;
              return r.core
                .mutate({
                  trans: t,
                  type: `add`,
                  keys: i,
                  values: o,
                  wantResults: a,
                })
                .then(function (e) {
                  var t = e.numFailures,
                    n = e.failures;
                  if (t === 0) return a ? e.results : e.lastResult;
                  throw new me(
                    `${r.name}.bulkAdd(): ${t} of ${s} operations failed`,
                    n,
                  );
                });
            });
          }),
          (I.prototype.bulkPut = function (e, t, n) {
            var r = this,
              i = Array.isArray(t) ? t : void 0,
              a = (n ||= i ? void 0 : t) ? n.allKeys : void 0;
            return this._trans(`readwrite`, function (t) {
              var n = r.schema.primKey,
                o = n.auto,
                n = n.keyPath;
              if (n && i)
                throw new O.InvalidArgument(
                  `bulkPut(): keys argument invalid on tables with inbound keys`,
                );
              if (i && i.length !== e.length)
                throw new O.InvalidArgument(
                  `Arguments objects and keys must have the same length`,
                );
              var s = e.length,
                o = n && o ? e.map(wt(n)) : e;
              return r.core
                .mutate({
                  trans: t,
                  type: `put`,
                  keys: i,
                  values: o,
                  wantResults: a,
                })
                .then(function (e) {
                  var t = e.numFailures,
                    n = e.failures;
                  if (t === 0) return a ? e.results : e.lastResult;
                  throw new me(
                    `${r.name}.bulkPut(): ${t} of ${s} operations failed`,
                    n,
                  );
                });
            });
          }),
          (I.prototype.bulkUpdate = function (e) {
            var t = this,
              n = this.core,
              r = e.map(function (e) {
                return e.key;
              }),
              i = e.map(function (e) {
                return e.changes;
              }),
              a = [];
            return this._trans(`readwrite`, function (o) {
              return n
                .getMany({ trans: o, keys: r, cache: `clone` })
                .then(function (s) {
                  var c = [],
                    l = [],
                    u =
                      (e.forEach(function (e, n) {
                        var r = e.key,
                          i = e.changes,
                          o = s[n];
                        if (o) {
                          for (
                            var u = 0, d = Object.keys(i);
                            u < d.length;
                            u++
                          ) {
                            var f = d[u],
                              p = i[f];
                            if (f === t.schema.primKey.keyPath) {
                              if (F(p, r) !== 0)
                                throw new O.Constraint(
                                  `Cannot update primary key in bulkUpdate()`,
                                );
                            } else x(o, f, p);
                          }
                          (a.push(n), c.push(r), l.push(o));
                        }
                      }),
                      c.length);
                  return n
                    .mutate({
                      trans: o,
                      type: `put`,
                      keys: c,
                      values: l,
                      updates: { keys: r, changeSpecs: i },
                    })
                    .then(function (e) {
                      var n = e.numFailures,
                        r = e.failures;
                      if (n === 0) return u;
                      for (var i = 0, o = Object.keys(r); i < o.length; i++) {
                        var s,
                          c = o[i],
                          l = a[Number(c)];
                        l != null && ((s = r[c]), delete r[c], (r[l] = s));
                      }
                      throw new me(
                        `${t.name}.bulkUpdate(): ${n} of ${u} operations failed`,
                        r,
                      );
                    });
                });
            });
          }),
          (I.prototype.bulkDelete = function (e) {
            var t = this,
              n = e.length;
            return this._trans(`readwrite`, function (n) {
              return t.core
                .mutate({ trans: n, type: `delete`, keys: e })
                .then(function (n) {
                  return Ot(t, e, n);
                });
            }).then(function (e) {
              var r = e.numFailures,
                i = e.failures;
              if (r === 0) return e.lastResult;
              throw new me(
                `${t.name}.bulkDelete(): ${r} of ${n} operations failed`,
                i,
              );
            });
          }));
        var Mt = I;
        function I() {}
        function Nt(e) {
          function t(t, r) {
            if (r) {
              for (var i = arguments.length, a = Array(i - 1); --i; )
                a[i - 1] = arguments[i];
              return (n[t].subscribe.apply(null, a), e);
            }
            if (typeof t == `string`) return n[t];
          }
          var n = {};
          t.addEventType = s;
          for (var r = 1, o = arguments.length; r < o; ++r) s(arguments[r]);
          return t;
          function s(e, r, o) {
            var c, l;
            if (typeof e != `object`)
              return (
                (r ||= we),
                (l = {
                  subscribers: [],
                  fire: (o ||= k),
                  subscribe: function (e) {
                    l.subscribers.indexOf(e) === -1 &&
                      (l.subscribers.push(e), (l.fire = r(l.fire, e)));
                  },
                  unsubscribe: function (e) {
                    ((l.subscribers = l.subscribers.filter(function (t) {
                      return t !== e;
                    })),
                      (l.fire = l.subscribers.reduce(r, o)));
                  },
                }),
                (n[e] = t[e] = l)
              );
            i((c = e)).forEach(function (e) {
              var t = c[e];
              if (a(t)) s(e, c[e][0], c[e][1]);
              else {
                if (t !== `asap`)
                  throw new O.InvalidArgument(`Invalid event config`);
                var n = s(e, ve, function () {
                  for (var e = arguments.length, t = Array(e); e--; )
                    t[e] = arguments[e];
                  n.subscribers.forEach(function (e) {
                    y(function () {
                      e.apply(null, t);
                    });
                  });
                });
              }
            });
          }
        }
        function Pt(e, t) {
          return (p(t).from({ prototype: e }), t);
        }
        function Ft(e, t) {
          return (
            !(e.filter || e.algorithm || e.or) &&
            (t ? e.justLimit : !e.replayFilter)
          );
        }
        function It(e, t) {
          e.filter = St(e.filter, t);
        }
        function Lt(e, t, n) {
          var r = e.replayFilter;
          ((e.replayFilter = r
            ? function () {
                return St(r(), t());
              }
            : t),
            (e.justLimit = n && !r));
        }
        function Rt(e, t) {
          if (e.isPrimKey) return t.primaryKey;
          var n = t.getIndexByKeyPath(e.index);
          if (n) return n;
          throw new O.Schema(
            `KeyPath ` +
              e.index +
              ` on object store ` +
              t.name +
              ` is not indexed`,
          );
        }
        function zt(e, t, n) {
          var r = Rt(e, t.schema);
          return t.openCursor({
            trans: n,
            values: !e.keysOnly,
            reverse: e.dir === `prev`,
            unique: !!e.unique,
            query: { index: r, range: e.range },
          });
        }
        function Bt(e, t, n, r) {
          var i,
            a,
            o = e.replayFilter ? St(e.filter, e.replayFilter()) : e.filter;
          return e.or
            ? ((i = {}),
              (a = function (e, n, r) {
                var a, s;
                (o &&
                  !o(
                    n,
                    r,
                    function (e) {
                      return n.stop(e);
                    },
                    function (e) {
                      return n.fail(e);
                    },
                  )) ||
                  ((s = `` + (a = n.primaryKey)) == `[object ArrayBuffer]` &&
                    (s = `` + new Uint8Array(a)),
                  l(i, s)) ||
                  ((i[s] = !0), t(e, n, r));
              }),
              Promise.all([
                e.or._iterate(a, n),
                Vt(zt(e, r, n), e.algorithm, a, !e.keysOnly && e.valueMapper),
              ]))
            : Vt(
                zt(e, r, n),
                St(e.algorithm, o),
                t,
                !e.keysOnly && e.valueMapper,
              );
        }
        function Vt(e, t, n, r) {
          var i = M(
            r
              ? function (e, t, i) {
                  return n(r(e), t, i);
                }
              : n,
          );
          return e.then(function (e) {
            if (e)
              return e.start(function () {
                var n = function () {
                  return e.continue();
                };
                ((t &&
                  !t(
                    e,
                    function (e) {
                      return (n = e);
                    },
                    function (t) {
                      (e.stop(t), (n = k));
                    },
                    function (t) {
                      (e.fail(t), (n = k));
                    },
                  )) ||
                  i(e.value, e, function (e) {
                    return (n = e);
                  }),
                  n());
              });
          });
        }
        ((L.prototype._read = function (e, t) {
          var n = this._ctx;
          return n.error
            ? n.table._trans(null, N.bind(null, n.error))
            : n.table._trans(`readonly`, e).then(t);
        }),
          (L.prototype._write = function (e) {
            var t = this._ctx;
            return t.error
              ? t.table._trans(null, N.bind(null, t.error))
              : t.table._trans(`readwrite`, e, `locked`);
          }),
          (L.prototype._addAlgorithm = function (e) {
            var t = this._ctx;
            t.algorithm = St(t.algorithm, e);
          }),
          (L.prototype._iterate = function (e, t) {
            return Bt(this._ctx, e, t, this._ctx.table.core);
          }),
          (L.prototype.clone = function (e) {
            var t = Object.create(this.constructor.prototype),
              n = Object.create(this._ctx);
            return (e && o(n, e), (t._ctx = n), t);
          }),
          (L.prototype.raw = function () {
            return ((this._ctx.valueMapper = null), this);
          }),
          (L.prototype.each = function (e) {
            var t = this._ctx;
            return this._read(function (n) {
              return Bt(t, e, n, t.table.core);
            });
          }),
          (L.prototype.count = function (e) {
            var t = this;
            return this._read(function (e) {
              var n,
                r = t._ctx,
                i = r.table.core;
              return Ft(r, !0)
                ? i
                    .count({
                      trans: e,
                      query: { index: Rt(r, i.schema), range: r.range },
                    })
                    .then(function (e) {
                      return Math.min(e, r.limit);
                    })
                : ((n = 0),
                  Bt(
                    r,
                    function () {
                      return (++n, !1);
                    },
                    e,
                    i,
                  ).then(function () {
                    return n;
                  }));
            }).then(e);
          }),
          (L.prototype.sortBy = function (e, t) {
            var n = e.split(`.`).reverse(),
              r = n[0],
              i = n.length - 1;
            function a(e, t) {
              return t ? a(e[n[t]], t - 1) : e[r];
            }
            var o = this._ctx.dir === `next` ? 1 : -1;
            function s(e, t) {
              return F(a(e, i), a(t, i)) * o;
            }
            return this.toArray(function (e) {
              return e.slice().sort(s);
            }).then(t);
          }),
          (L.prototype.toArray = function (e) {
            var t = this;
            return this._read(function (e) {
              var n,
                r,
                i,
                a = t._ctx;
              return Ft(a, !0) && 0 < a.limit
                ? ((n = a.valueMapper),
                  (r = Rt(a, a.table.core.schema)),
                  a.table.core
                    .query({
                      trans: e,
                      limit: a.limit,
                      values: !0,
                      direction: a.dir === `prev` ? `prev` : void 0,
                      query: { index: r, range: a.range },
                    })
                    .then(function (e) {
                      return ((e = e.result), n ? e.map(n) : e);
                    }))
                : ((i = []),
                  Bt(
                    a,
                    function (e) {
                      return i.push(e);
                    },
                    e,
                    a.table.core,
                  ).then(function () {
                    return i;
                  }));
            }, e);
          }),
          (L.prototype.offset = function (e) {
            var t = this._ctx;
            return (
              e <= 0 ||
                ((t.offset += e),
                Ft(t)
                  ? Lt(t, function () {
                      var t = e;
                      return function (e, n) {
                        return (
                          t === 0 ||
                          (t === 1
                            ? --t
                            : n(function () {
                                (e.advance(t), (t = 0));
                              }),
                          !1)
                        );
                      };
                    })
                  : Lt(t, function () {
                      var t = e;
                      return function () {
                        return --t < 0;
                      };
                    })),
              this
            );
          }),
          (L.prototype.limit = function (e) {
            return (
              (this._ctx.limit = Math.min(this._ctx.limit, e)),
              Lt(
                this._ctx,
                function () {
                  var t = e;
                  return function (e, n, r) {
                    return (--t <= 0 && n(r), 0 <= t);
                  };
                },
                !0,
              ),
              this
            );
          }),
          (L.prototype.until = function (e, t) {
            return (
              It(this._ctx, function (n, r, i) {
                return !e(n.value) || (r(i), t);
              }),
              this
            );
          }),
          (L.prototype.first = function (e) {
            return this.limit(1)
              .toArray(function (e) {
                return e[0];
              })
              .then(e);
          }),
          (L.prototype.last = function (e) {
            return this.reverse().first(e);
          }),
          (L.prototype.filter = function (e) {
            var t;
            return (
              It(this._ctx, function (t) {
                return e(t.value);
              }),
              ((t = this._ctx).isMatch = St(t.isMatch, e)),
              this
            );
          }),
          (L.prototype.and = function (e) {
            return this.filter(e);
          }),
          (L.prototype.or = function (e) {
            return new this.db.WhereClause(this._ctx.table, e, this);
          }),
          (L.prototype.reverse = function () {
            return (
              (this._ctx.dir = this._ctx.dir === `prev` ? `next` : `prev`),
              this._ondirectionchange && this._ondirectionchange(this._ctx.dir),
              this
            );
          }),
          (L.prototype.desc = function () {
            return this.reverse();
          }),
          (L.prototype.eachKey = function (e) {
            var t = this._ctx;
            return (
              (t.keysOnly = !t.isMatch),
              this.each(function (t, n) {
                e(n.key, n);
              })
            );
          }),
          (L.prototype.eachUniqueKey = function (e) {
            return ((this._ctx.unique = `unique`), this.eachKey(e));
          }),
          (L.prototype.eachPrimaryKey = function (e) {
            var t = this._ctx;
            return (
              (t.keysOnly = !t.isMatch),
              this.each(function (t, n) {
                e(n.primaryKey, n);
              })
            );
          }),
          (L.prototype.keys = function (e) {
            var t = this._ctx,
              n = ((t.keysOnly = !t.isMatch), []);
            return this.each(function (e, t) {
              n.push(t.key);
            })
              .then(function () {
                return n;
              })
              .then(e);
          }),
          (L.prototype.primaryKeys = function (e) {
            var t = this._ctx;
            if (Ft(t, !0) && 0 < t.limit)
              return this._read(function (e) {
                var n = Rt(t, t.table.core.schema);
                return t.table.core.query({
                  trans: e,
                  values: !1,
                  limit: t.limit,
                  direction: t.dir === `prev` ? `prev` : void 0,
                  query: { index: n, range: t.range },
                });
              })
                .then(function (e) {
                  return e.result;
                })
                .then(e);
            t.keysOnly = !t.isMatch;
            var n = [];
            return this.each(function (e, t) {
              n.push(t.primaryKey);
            })
              .then(function () {
                return n;
              })
              .then(e);
          }),
          (L.prototype.uniqueKeys = function (e) {
            return ((this._ctx.unique = `unique`), this.keys(e));
          }),
          (L.prototype.firstKey = function (e) {
            return this.limit(1)
              .keys(function (e) {
                return e[0];
              })
              .then(e);
          }),
          (L.prototype.lastKey = function (e) {
            return this.reverse().firstKey(e);
          }),
          (L.prototype.distinct = function () {
            var e,
              t = this._ctx,
              t = t.index && t.table.schema.idxByName[t.index];
            return (
              t &&
                t.multi &&
                ((e = {}),
                It(this._ctx, function (t) {
                  var t = t.primaryKey.toString(),
                    n = l(e, t);
                  return ((e[t] = !0), !n);
                })),
              this
            );
          }),
          (L.prototype.modify = function (e) {
            var t = this,
              n = this._ctx;
            return this._write(function (r) {
              function a(e, t) {
                var n = t.failures;
                p += e - t.numFailures;
                for (var r = 0, a = i(n); r < a.length; r++) {
                  var o = a[r];
                  f.push(n[o]);
                }
              }
              var o =
                  typeof e == `function`
                    ? e
                    : function (t) {
                        return jt(t, e);
                      },
                s = n.table.core,
                c = s.schema.primaryKey,
                l = c.outbound,
                u = c.extractKey,
                d = 200,
                c = t.db._options.modifyChunkSize,
                f =
                  (c &&
                    (d = typeof c == `object` ? c[s.name] || c[`*`] || 200 : c),
                  []),
                p = 0,
                m = [],
                h = e === R;
              return t
                .clone()
                .primaryKeys()
                .then(function (t) {
                  function i(f) {
                    var p = Math.min(d, t.length - f),
                      m = t.slice(f, f + p);
                    return (
                      h
                        ? Promise.resolve([])
                        : s.getMany({ trans: r, keys: m, cache: `immutable` })
                    ).then(function (g) {
                      var _ = [],
                        v = [],
                        y = l ? [] : null,
                        b = h ? m : [];
                      if (!h)
                        for (var x = 0; x < p; ++x) {
                          var S = g[x],
                            C = { value: ne(S), primKey: t[f + x] };
                          !1 !== o.call(C, C.value, C) &&
                            (C.value == null
                              ? b.push(t[f + x])
                              : l || F(u(S), u(C.value)) === 0
                                ? (v.push(C.value), l && y.push(t[f + x]))
                                : (b.push(t[f + x]), _.push(C.value)));
                        }
                      return Promise.resolve(
                        0 < _.length &&
                          s
                            .mutate({ trans: r, type: `add`, values: _ })
                            .then(function (e) {
                              for (var t in e.failures)
                                b.splice(parseInt(t), 1);
                              a(_.length, e);
                            }),
                      )
                        .then(function () {
                          return (
                            (0 < v.length || (c && typeof e == `object`)) &&
                            s
                              .mutate({
                                trans: r,
                                type: `put`,
                                keys: y,
                                values: v,
                                criteria: c,
                                changeSpec: typeof e != `function` && e,
                                isAdditionalChunk: 0 < f,
                              })
                              .then(function (e) {
                                return a(v.length, e);
                              })
                          );
                        })
                        .then(function () {
                          return (
                            (0 < b.length || (c && h)) &&
                            s
                              .mutate({
                                trans: r,
                                type: `delete`,
                                keys: b,
                                criteria: c,
                                isAdditionalChunk: 0 < f,
                              })
                              .then(function (e) {
                                return Ot(n.table, b, e);
                              })
                              .then(function (e) {
                                return a(b.length, e);
                              })
                          );
                        })
                        .then(function () {
                          return t.length > f + p && i(f + d);
                        });
                    });
                  }
                  var c = Ft(n) &&
                    n.limit === 1 / 0 &&
                    (typeof e != `function` || h) && {
                      index: n.index,
                      range: n.range,
                    };
                  return i(0).then(function () {
                    if (0 < f.length)
                      throw new pe(
                        `Error modifying one or more objects`,
                        f,
                        p,
                        m,
                      );
                    return t.length;
                  });
                });
            });
          }),
          (L.prototype.delete = function () {
            var e = this._ctx,
              t = e.range;
            return !Ft(e) ||
              e.table.schema.yProps ||
              (!e.isPrimKey && t.type !== 3)
              ? this.modify(R)
              : this._write(function (n) {
                  var r = e.table.core.schema.primaryKey,
                    i = t;
                  return e.table.core
                    .count({ trans: n, query: { index: r, range: i } })
                    .then(function (t) {
                      return e.table.core
                        .mutate({ trans: n, type: `deleteRange`, range: i })
                        .then(function (e) {
                          var n = e.failures,
                            e = e.numFailures;
                          if (e)
                            throw new pe(
                              `Could not delete some values`,
                              Object.keys(n).map(function (e) {
                                return n[e];
                              }),
                              t - e,
                            );
                          return t - e;
                        });
                    });
                });
          }));
        var Ht = L;
        function L() {}
        var R = function (e, t) {
          return (t.value = null);
        };
        function Ut(e, t) {
          return e < t ? -1 : e === t ? 0 : 1;
        }
        function Wt(e, t) {
          return t < e ? -1 : e === t ? 0 : 1;
        }
        function Gt(e, t, n) {
          return (
            (e = e instanceof Xt ? new e.Collection(e) : e),
            (e._ctx.error = new (n || TypeError)(t)),
            e
          );
        }
        function Kt(e) {
          return new e.Collection(e, function () {
            return Yt(``);
          }).limit(0);
        }
        function qt(e, t, n, r) {
          var i,
            a,
            o,
            s,
            c,
            l,
            u,
            d = n.length;
          if (
            !n.every(function (e) {
              return typeof e == `string`;
            })
          )
            return Gt(e, yt);
          function f(e) {
            ((i =
              e === `next`
                ? function (e) {
                    return e.toUpperCase();
                  }
                : function (e) {
                    return e.toLowerCase();
                  }),
              (a =
                e === `next`
                  ? function (e) {
                      return e.toLowerCase();
                    }
                  : function (e) {
                      return e.toUpperCase();
                    }),
              (o = e === `next` ? Ut : Wt));
            var t = n
              .map(function (e) {
                return { lower: a(e), upper: i(e) };
              })
              .sort(function (e, t) {
                return o(e.lower, t.lower);
              });
            ((s = t.map(function (e) {
              return e.upper;
            })),
              (c = t.map(function (e) {
                return e.lower;
              })),
              (u = (l = e) === `next` ? `` : r));
          }
          f(`next`);
          var e = new e.Collection(e, function () {
              return Jt(s[0], c[d - 1] + r);
            }),
            p =
              ((e._ondirectionchange = function (e) {
                f(e);
              }),
              0);
          return (
            e._addAlgorithm(function (e, n, r) {
              var i = e.key;
              if (typeof i == `string`) {
                var f = a(i);
                if (t(f, c, p)) return !0;
                for (var m = null, h = p; h < d; ++h) {
                  var g = ((e, t, n, r, i, a) => {
                    for (
                      var o = Math.min(e.length, r.length), s = -1, c = 0;
                      c < o;
                      ++c
                    ) {
                      var l = t[c];
                      if (l !== r[c])
                        return i(e[c], n[c]) < 0
                          ? e.substr(0, c) + n[c] + n.substr(c + 1)
                          : i(e[c], r[c]) < 0
                            ? e.substr(0, c) + r[c] + n.substr(c + 1)
                            : 0 <= s
                              ? e.substr(0, s) + t[s] + n.substr(s + 1)
                              : null;
                      i(e[c], l) < 0 && (s = c);
                    }
                    return o < r.length && a === `next`
                      ? e + n.substr(e.length)
                      : o < e.length && a === `prev`
                        ? e.substr(0, n.length)
                        : s < 0
                          ? null
                          : e.substr(0, s) + r[s] + n.substr(s + 1);
                  })(i, f, s[h], c[h], o, l);
                  g === null && m === null
                    ? (p = h + 1)
                    : (m === null || 0 < o(m, g)) && (m = g);
                }
                n(
                  m === null
                    ? r
                    : function () {
                        e.continue(m + u);
                      },
                );
              }
              return !1;
            }),
            e
          );
        }
        function Jt(e, t, n, r) {
          return { type: 2, lower: e, upper: t, lowerOpen: n, upperOpen: r };
        }
        function Yt(e) {
          return { type: 1, lower: e, upper: e };
        }
        (Object.defineProperty(z.prototype, "Collection", {
          get: function () {
            return this._ctx.table.db.Collection;
          },
          enumerable: !1,
          configurable: !0,
        }),
          (z.prototype.between = function (e, t, n, r) {
            ((n = !1 !== n), (r = !0 === r));
            try {
              return 0 < this._cmp(e, t) ||
                (this._cmp(e, t) === 0 && (n || r) && (!n || !r))
                ? Kt(this)
                : new this.Collection(this, function () {
                    return Jt(e, t, !n, !r);
                  });
            } catch {
              return Gt(this, vt);
            }
          }),
          (z.prototype.equals = function (e) {
            return e == null
              ? Gt(this, vt)
              : new this.Collection(this, function () {
                  return Yt(e);
                });
          }),
          (z.prototype.above = function (e) {
            return e == null
              ? Gt(this, vt)
              : new this.Collection(this, function () {
                  return Jt(e, void 0, !0);
                });
          }),
          (z.prototype.aboveOrEqual = function (e) {
            return e == null
              ? Gt(this, vt)
              : new this.Collection(this, function () {
                  return Jt(e, void 0, !1);
                });
          }),
          (z.prototype.below = function (e) {
            return e == null
              ? Gt(this, vt)
              : new this.Collection(this, function () {
                  return Jt(void 0, e, !1, !0);
                });
          }),
          (z.prototype.belowOrEqual = function (e) {
            return e == null
              ? Gt(this, vt)
              : new this.Collection(this, function () {
                  return Jt(void 0, e);
                });
          }),
          (z.prototype.startsWith = function (e) {
            return typeof e == `string`
              ? this.between(e, e + _t, !0, !0)
              : Gt(this, yt);
          }),
          (z.prototype.startsWithIgnoreCase = function (e) {
            return e === ``
              ? this.startsWith(e)
              : qt(
                  this,
                  function (e, t) {
                    return e.indexOf(t[0]) === 0;
                  },
                  [e],
                  _t,
                );
          }),
          (z.prototype.equalsIgnoreCase = function (e) {
            return qt(
              this,
              function (e, t) {
                return e === t[0];
              },
              [e],
              ``,
            );
          }),
          (z.prototype.anyOfIgnoreCase = function () {
            var e = ce.apply(E, arguments);
            return e.length === 0
              ? Kt(this)
              : qt(
                  this,
                  function (e, t) {
                    return t.indexOf(e) !== -1;
                  },
                  e,
                  ``,
                );
          }),
          (z.prototype.startsWithAnyOfIgnoreCase = function () {
            var e = ce.apply(E, arguments);
            return e.length === 0
              ? Kt(this)
              : qt(
                  this,
                  function (e, t) {
                    return t.some(function (t) {
                      return e.indexOf(t) === 0;
                    });
                  },
                  e,
                  _t,
                );
          }),
          (z.prototype.anyOf = function () {
            var e,
              t,
              n = this,
              r = ce.apply(E, arguments),
              i = this._cmp;
            try {
              r.sort(i);
            } catch {
              return Gt(this, vt);
            }
            return r.length === 0
              ? Kt(this)
              : (((e = new this.Collection(this, function () {
                  return Jt(r[0], r[r.length - 1]);
                }))._ondirectionchange = function (e) {
                  ((i = e === `next` ? n._ascending : n._descending),
                    r.sort(i));
                }),
                (t = 0),
                e._addAlgorithm(function (e, n, a) {
                  for (var o = e.key; 0 < i(o, r[t]); )
                    if (++t === r.length) return (n(a), !1);
                  return (
                    i(o, r[t]) === 0 ||
                    (n(function () {
                      e.continue(r[t]);
                    }),
                    !1)
                  );
                }),
                e);
          }),
          (z.prototype.notEqual = function (e) {
            return this.inAnyRange(
              [
                [-1 / 0, e],
                [e, this.db._maxKey],
              ],
              { includeLowers: !1, includeUppers: !1 },
            );
          }),
          (z.prototype.noneOf = function () {
            var e = ce.apply(E, arguments);
            if (e.length === 0) return new this.Collection(this);
            try {
              e.sort(this._ascending);
            } catch {
              return Gt(this, vt);
            }
            var t = e.reduce(function (e, t) {
              return e ? e.concat([[e[e.length - 1][1], t]]) : [[-1 / 0, t]];
            }, null);
            return (
              t.push([e[e.length - 1], this.db._maxKey]),
              this.inAnyRange(t, { includeLowers: !1, includeUppers: !1 })
            );
          }),
          (z.prototype.inAnyRange = function (e, t) {
            var n = this,
              r = this._cmp,
              i = this._ascending,
              a = this._descending,
              o = this._min,
              s = this._max;
            if (e.length === 0) return Kt(this);
            if (
              !e.every(function (e) {
                return e[0] !== void 0 && e[1] !== void 0 && i(e[0], e[1]) <= 0;
              })
            )
              return Gt(
                this,
                `First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower`,
                O.InvalidArgument,
              );
            var c = !t || !1 !== t.includeLowers,
              l = t && !0 === t.includeUppers,
              u,
              d = i;
            function f(e, t) {
              return d(e[0], t[0]);
            }
            try {
              (u = e.reduce(function (e, t) {
                for (var n = 0, i = e.length; n < i; ++n) {
                  var a = e[n];
                  if (r(t[0], a[1]) < 0 && 0 < r(t[1], a[0])) {
                    ((a[0] = o(a[0], t[0])), (a[1] = s(a[1], t[1])));
                    break;
                  }
                }
                return (n === i && e.push(t), e);
              }, [])).sort(f);
            } catch {
              return Gt(this, vt);
            }
            var p = 0,
              m = l
                ? function (e) {
                    return 0 < i(e, u[p][1]);
                  }
                : function (e) {
                    return 0 <= i(e, u[p][1]);
                  },
              h = c
                ? function (e) {
                    return 0 < a(e, u[p][0]);
                  }
                : function (e) {
                    return 0 <= a(e, u[p][0]);
                  },
              g = m,
              t = new this.Collection(this, function () {
                return Jt(u[0][0], u[u.length - 1][1], !c, !l);
              });
            return (
              (t._ondirectionchange = function (e) {
                ((d = e === `next` ? ((g = m), i) : ((g = h), a)), u.sort(f));
              }),
              t._addAlgorithm(function (e, t, r) {
                for (var a, o = e.key; g(o); )
                  if (++p === u.length) return (t(r), !1);
                return (
                  (!m((a = o)) && !h(a)) ||
                  (n._cmp(o, u[p][1]) === 0 ||
                    n._cmp(o, u[p][0]) === 0 ||
                    t(function () {
                      d === i ? e.continue(u[p][0]) : e.continue(u[p][1]);
                    }),
                  !1)
                );
              }),
              t
            );
          }),
          (z.prototype.startsWithAnyOf = function () {
            var e = ce.apply(E, arguments);
            return e.every(function (e) {
              return typeof e == `string`;
            })
              ? e.length === 0
                ? Kt(this)
                : this.inAnyRange(
                    e.map(function (e) {
                      return [e, e + _t];
                    }),
                  )
              : Gt(this, `startsWithAnyOf() only works with strings`);
          }));
        var Xt = z;
        function z() {}
        function Zt(e) {
          return M(function (t) {
            return (Qt(t), e(t.target.error), !1);
          });
        }
        function Qt(e) {
          (e.stopPropagation && e.stopPropagation(),
            e.preventDefault && e.preventDefault());
        }
        var $t = `storagemutated`,
          en = `x-storagemutated-1`,
          tn = Nt(null, $t),
          nn =
            ((rn.prototype._lock = function () {
              return (
                v(!A.global),
                ++this._reculock,
                this._reculock !== 1 || A.global || (A.lockOwnerFor = this),
                this
              );
            }),
            (rn.prototype._unlock = function () {
              if ((v(!A.global), --this._reculock == 0))
                for (
                  A.global || (A.lockOwnerFor = null);
                  0 < this._blockedFuncs.length && !this._locked();
                ) {
                  var e = this._blockedFuncs.shift();
                  try {
                    mt(e[1], e[0]);
                  } catch {}
                }
              return this;
            }),
            (rn.prototype._locked = function () {
              return this._reculock && A.lockOwnerFor !== this;
            }),
            (rn.prototype.create = function (e) {
              var t = this;
              if (this.mode) {
                var n = this.db.idbdb,
                  r = this.db._state.dbOpenError;
                if ((v(!this.idbtrans), !e && !n))
                  switch (r && r.name) {
                    case `DatabaseClosedError`:
                      throw new O.DatabaseClosed(r);
                    case `MissingAPIError`:
                      throw new O.MissingAPI(r.message, r);
                    default:
                      throw new O.OpenFailed(r);
                  }
                if (!this.active) throw new O.TransactionInactive();
                (v(this._completion._state === null),
                  ((e = this.idbtrans =
                    e ||
                    (this.db.core || n).transaction(
                      this.storeNames,
                      this.mode,
                      { durability: this.chromeTransactionDurability },
                    )).onerror = M(function (n) {
                    (Qt(n), t._reject(e.error));
                  })),
                  (e.onabort = M(function (n) {
                    (Qt(n),
                      t.active && t._reject(new O.Abort(e.error)),
                      (t.active = !1),
                      t.on(`abort`).fire(n));
                  })),
                  (e.oncomplete = M(function () {
                    ((t.active = !1),
                      t._resolve(),
                      `mutatedParts` in e &&
                        tn.storagemutated.fire(e.mutatedParts));
                  })));
              }
              return this;
            }),
            (rn.prototype._promise = function (e, t, n) {
              var r,
                i = this;
              return e === `readwrite` && this.mode !== `readwrite`
                ? N(new O.ReadOnly(`Transaction is readonly`))
                : this.active
                  ? this._locked()
                    ? new j(function (r, a) {
                        i._blockedFuncs.push([
                          function () {
                            i._promise(e, t, n).then(r, a);
                          },
                          A,
                        ]);
                      })
                    : n
                      ? st(function () {
                          var e = new j(function (e, n) {
                            i._lock();
                            var r = t(e, n, i);
                            r && r.then && r.then(e, n);
                          });
                          return (
                            e.finally(function () {
                              return i._unlock();
                            }),
                            (e._lib = !0),
                            e
                          );
                        })
                      : (((r = new j(function (e, n) {
                          var r = t(e, n, i);
                          r && r.then && r.then(e, n);
                        }))._lib = !0),
                        r)
                  : N(new O.TransactionInactive());
            }),
            (rn.prototype._root = function () {
              return this.parent ? this.parent._root() : this;
            }),
            (rn.prototype.waitFor = function (e) {
              var t,
                n = this._root(),
                r = j.resolve(e),
                i =
                  (n._waitingFor
                    ? (n._waitingFor = n._waitingFor.then(function () {
                        return r;
                      }))
                    : ((n._waitingFor = r),
                      (n._waitingQueue = []),
                      (t = n.idbtrans.objectStore(n.storeNames[0])),
                      (function e() {
                        for (++n._spinCount; n._waitingQueue.length; )
                          n._waitingQueue.shift()();
                        n._waitingFor && (t.get(-1 / 0).onsuccess = e);
                      })()),
                  n._waitingFor);
              return new j(function (e, t) {
                r.then(
                  function (t) {
                    return n._waitingQueue.push(M(e.bind(null, t)));
                  },
                  function (e) {
                    return n._waitingQueue.push(M(t.bind(null, e)));
                  },
                ).finally(function () {
                  n._waitingFor === i && (n._waitingFor = null);
                });
              });
            }),
            (rn.prototype.abort = function () {
              this.active &&
                ((this.active = !1),
                this.idbtrans && this.idbtrans.abort(),
                this._reject(new O.Abort()));
            }),
            (rn.prototype.table = function (e) {
              var t = (this._memoizedTables ||= {});
              if (l(t, e)) return t[e];
              var n = this.schema[e];
              if (n)
                return (
                  ((n = new this.db.Table(e, n, this)).core =
                    this.db.core.table(e)),
                  (t[e] = n)
                );
              throw new O.NotFound(`Table ` + e + ` not part of transaction`);
            }),
            rn);
        function rn() {}
        function an(e, t, n, r, i, a, o, s) {
          return {
            name: e,
            keyPath: t,
            unique: n,
            multi: r,
            auto: i,
            compound: a,
            src:
              (n && !o ? `&` : ``) + (r ? `*` : ``) + (i ? `++` : ``) + on(t),
            type: s,
          };
        }
        function on(e) {
          return typeof e == `string`
            ? e
            : e
              ? `[` + [].join.call(e, `+`) + `]`
              : ``;
        }
        function sn(e, t, n) {
          return {
            name: e,
            primKey: t,
            indexes: n,
            mappedClass: null,
            idxByName:
              ((r = function (e) {
                return [e.name, e];
              }),
              n.reduce(function (e, t, n) {
                return ((t = r(t, n)), t && (e[t[0]] = t[1]), e);
              }, {})),
          };
          var r;
        }
        var cn = function (e) {
          try {
            return (
              e.only([[]]),
              (cn = function () {
                return [[]];
              }),
              [[]]
            );
          } catch {
            return (
              (cn = function () {
                return _t;
              }),
              _t
            );
          }
        };
        function ln(e) {
          return e == null
            ? function () {}
            : typeof e == `string`
              ? (t = e).split(`.`).length === 1
                ? function (e) {
                    return e[t];
                  }
                : function (e) {
                    return b(e, t);
                  }
              : function (t) {
                  return b(t, e);
                };
          var t;
        }
        function un(e) {
          return [].slice.call(e);
        }
        var dn = 0;
        function fn(e) {
          return e == null
            ? `:id`
            : typeof e == `string`
              ? e
              : `[${e.join(`+`)}]`;
        }
        function pn(e, t, n) {
          function r(e) {
            if (e.type === 3) return null;
            if (e.type === 4)
              throw Error(`Cannot convert never type to IDBKeyRange`);
            var n = e.lower,
              r = e.upper,
              i = e.lowerOpen,
              e = e.upperOpen;
            return n === void 0
              ? r === void 0
                ? null
                : t.upperBound(r, !!e)
              : r === void 0
                ? t.lowerBound(n, !!i)
                : t.bound(n, r, !!i, !!e);
          }
          function i(e) {
            var t,
              n,
              i = e.name;
            return {
              name: i,
              schema: e,
              mutate: function (e) {
                var t = e.trans,
                  n = e.type,
                  a = e.keys,
                  o = e.values,
                  s = e.range;
                return new Promise(function (e, c) {
                  e = M(e);
                  var l = t.objectStore(i),
                    u = l.keyPath == null,
                    d = n === `put` || n === `add`;
                  if (!d && n !== `delete` && n !== `deleteRange`)
                    throw Error(`Invalid operation type: ` + n);
                  var f,
                    p = (a || o || { length: 1 }).length;
                  if (a && o && a.length !== o.length)
                    throw Error(
                      `Given keys array must have same length as given values array.`,
                    );
                  if (p === 0)
                    return e({
                      numFailures: 0,
                      failures: {},
                      results: [],
                      lastResult: void 0,
                    });
                  function m(e) {
                    (++_, Qt(e));
                  }
                  var h = [],
                    g = [],
                    _ = 0;
                  if (n === `deleteRange`) {
                    if (s.type === 4)
                      return e({
                        numFailures: _,
                        failures: g,
                        results: [],
                        lastResult: void 0,
                      });
                    s.type === 3
                      ? h.push((f = l.clear()))
                      : h.push((f = l.delete(r(s))));
                  } else {
                    var u = d ? (u ? [o, a] : [o, null]) : [a, null],
                      v = u[0],
                      y = u[1];
                    if (d)
                      for (var b = 0; b < p; ++b)
                        (h.push(
                          (f =
                            y && y[b] !== void 0
                              ? l[n](v[b], y[b])
                              : l[n](v[b])),
                        ),
                          (f.onerror = m));
                    else
                      for (b = 0; b < p; ++b)
                        (h.push((f = l[n](v[b]))), (f.onerror = m));
                  }
                  function x(t) {
                    ((t = t.target.result),
                      h.forEach(function (e, t) {
                        return e.error != null && (g[t] = e.error);
                      }),
                      e({
                        numFailures: _,
                        failures: g,
                        results:
                          n === `delete`
                            ? a
                            : h.map(function (e) {
                                return e.result;
                              }),
                        lastResult: t,
                      }));
                  }
                  ((f.onerror = function (e) {
                    (m(e), x(e));
                  }),
                    (f.onsuccess = x));
                });
              },
              getMany: function (e) {
                var t = e.trans,
                  n = e.keys;
                return new Promise(function (e, r) {
                  e = M(e);
                  for (
                    var a,
                      o = t.objectStore(i),
                      s = n.length,
                      c = Array(s),
                      l = 0,
                      u = 0,
                      d = function (t) {
                        ((t = t.target),
                          (c[t._pos] = t.result),
                          ++u === l && e(c));
                      },
                      f = Zt(r),
                      p = 0;
                    p < s;
                    ++p
                  )
                    n[p] != null &&
                      (((a = o.get(n[p]))._pos = p),
                      (a.onsuccess = d),
                      (a.onerror = f),
                      ++l);
                  l === 0 && e(c);
                });
              },
              get: function (e) {
                var t = e.trans,
                  n = e.key;
                return new Promise(function (e, r) {
                  e = M(e);
                  var a = t.objectStore(i).get(n);
                  ((a.onsuccess = function (t) {
                    return e(t.target.result);
                  }),
                    (a.onerror = Zt(r)));
                });
              },
              query:
                ((t = c),
                (n = l),
                function (e) {
                  return new Promise(function (a, o) {
                    a = M(a);
                    var s,
                      c,
                      l,
                      u,
                      d = e.trans,
                      f = e.values,
                      p = e.limit,
                      m = e.query,
                      h = (h = e.direction) ?? `next`,
                      g = p === 1 / 0 ? void 0 : p,
                      _ = m.index,
                      m = m.range,
                      d = d.objectStore(i),
                      d = _.isPrimaryKey ? d : d.index(_.name),
                      _ = r(m);
                    if (p === 0) return a({ result: [] });
                    n
                      ? ((m = { query: _, count: g, direction: h }),
                        ((s = f ? d.getAll(m) : d.getAllKeys(m)).onsuccess =
                          function (e) {
                            return a({ result: e.target.result });
                          }),
                        (s.onerror = Zt(o)))
                      : t && h === `next`
                        ? (((s = f
                            ? d.getAll(_, g)
                            : d.getAllKeys(_, g)).onsuccess = function (e) {
                            return a({ result: e.target.result });
                          }),
                          (s.onerror = Zt(o)))
                        : ((c = 0),
                          (l =
                            !f && `openKeyCursor` in d
                              ? d.openKeyCursor(_, h)
                              : d.openCursor(_, h)),
                          (u = []),
                          (l.onsuccess = function () {
                            var e = l.result;
                            return !e ||
                              (u.push(f ? e.value : e.primaryKey), ++c === p)
                              ? a({ result: u })
                              : void e.continue();
                          }),
                          (l.onerror = Zt(o)));
                  });
                }),
              openCursor: function (e) {
                var t = e.trans,
                  n = e.values,
                  a = e.query,
                  o = e.reverse,
                  s = e.unique;
                return new Promise(function (e, c) {
                  e = M(e);
                  var l = a.index,
                    u = a.range,
                    d = t.objectStore(i),
                    d = l.isPrimaryKey ? d : d.index(l.name),
                    l = o
                      ? s
                        ? `prevunique`
                        : `prev`
                      : s
                        ? `nextunique`
                        : `next`,
                    f =
                      !n && `openKeyCursor` in d
                        ? d.openKeyCursor(r(u), l)
                        : d.openCursor(r(u), l);
                  ((f.onerror = Zt(c)),
                    (f.onsuccess = M(function (n) {
                      var r,
                        i,
                        a,
                        o,
                        s = f.result;
                      s
                        ? ((s.___id = ++dn),
                          (s.done = !1),
                          (r = s.continue.bind(s)),
                          (i = (i = s.continuePrimaryKey) && i.bind(s)),
                          (a = s.advance.bind(s)),
                          (o = function () {
                            throw Error(`Cursor not stopped`);
                          }),
                          (s.trans = t),
                          (s.stop =
                            s.continue =
                            s.continuePrimaryKey =
                            s.advance =
                              function () {
                                throw Error(`Cursor not started`);
                              }),
                          (s.fail = M(c)),
                          (s.next = function () {
                            var e = this,
                              t = 1;
                            return this.start(function () {
                              return t-- ? e.continue() : e.stop();
                            }).then(function () {
                              return e;
                            });
                          }),
                          (s.start = function (e) {
                            function t() {
                              if (f.result)
                                try {
                                  e();
                                } catch (e) {
                                  s.fail(e);
                                }
                              else
                                ((s.done = !0),
                                  (s.start = function () {
                                    throw Error(`Cursor behind last entry`);
                                  }),
                                  s.stop());
                            }
                            var n = new Promise(function (e, t) {
                              ((e = M(e)),
                                (f.onerror = Zt(t)),
                                (s.fail = t),
                                (s.stop = function (t) {
                                  ((s.stop =
                                    s.continue =
                                    s.continuePrimaryKey =
                                    s.advance =
                                      o),
                                    e(t));
                                }));
                            });
                            return (
                              (f.onsuccess = M(function (e) {
                                ((f.onsuccess = t), t());
                              })),
                              (s.continue = r),
                              (s.continuePrimaryKey = i),
                              (s.advance = a),
                              t(),
                              n
                            );
                          }),
                          e(s))
                        : e(null);
                    }, c)));
                });
              },
              count: function (e) {
                var t = e.query,
                  n = e.trans,
                  a = t.index,
                  o = t.range;
                return new Promise(function (e, t) {
                  var s = n.objectStore(i),
                    s = a.isPrimaryKey ? s : s.index(a.name),
                    c = r(o),
                    c = c ? s.count(c) : s.count();
                  ((c.onsuccess = M(function (t) {
                    return e(t.target.result);
                  })),
                    (c.onerror = Zt(t)));
                });
              },
            };
          }
          ((o = n),
            (s = un((n = e).objectStoreNames)),
            (u = 0 < s.length ? o.objectStore(s[0]) : {}));
          var o,
            n = {
              schema: {
                name: n.name,
                tables: s
                  .map(function (e) {
                    return o.objectStore(e);
                  })
                  .map(function (e) {
                    var t = e.keyPath,
                      n = e.autoIncrement,
                      r = a(t),
                      i = {},
                      r = {
                        name: e.name,
                        primaryKey: {
                          name: null,
                          isPrimaryKey: !0,
                          outbound: t == null,
                          compound: r,
                          keyPath: t,
                          autoIncrement: n,
                          unique: !0,
                          extractKey: ln(t),
                        },
                        indexes: un(e.indexNames)
                          .map(function (t) {
                            return e.index(t);
                          })
                          .map(function (e) {
                            var t = e.name,
                              n = e.unique,
                              r = e.multiEntry,
                              e = e.keyPath,
                              t = {
                                name: t,
                                compound: a(e),
                                keyPath: e,
                                unique: n,
                                multiEntry: r,
                                extractKey: ln(e),
                              };
                            return (i[fn(e)] = t);
                          }),
                        getIndexByKeyPath: function (e) {
                          return i[fn(e)];
                        },
                      };
                    return (
                      (i[`:id`] = r.primaryKey),
                      t != null && (i[fn(t)] = r.primaryKey),
                      r
                    );
                  }),
              },
              hasGetAll:
                0 < s.length &&
                `getAll` in u &&
                !(
                  typeof navigator < `u` &&
                  /Safari/.test(navigator.userAgent) &&
                  !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
                  [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604
                ),
              hasIdb3Features: `getAllRecords` in u,
            },
            s = n.schema,
            c = n.hasGetAll,
            l = n.hasIdb3Features,
            u = s.tables.map(i),
            d = {};
          return (
            u.forEach(function (e) {
              return (d[e.name] = e);
            }),
            {
              stack: `dbcore`,
              transaction: e.transaction.bind(e),
              table: function (e) {
                if (d[e]) return d[e];
                throw Error(`Table '${e}' not found`);
              },
              MIN_KEY: -1 / 0,
              MAX_KEY: cn(t),
              schema: s,
            }
          );
        }
        function mn(e, n, r, i) {
          return (
            (r = r.IDBKeyRange),
            (n = pn(n, r, i)),
            {
              dbcore: e.dbcore.reduce(function (e, n) {
                return ((n = n.create), t(t({}, e), n(e)));
              }, n),
            }
          );
        }
        function hn(e, t) {
          var n = t.db,
            n = mn(e._middlewares, n, e._deps, t);
          ((e.core = n.dbcore),
            e.tables.forEach(function (t) {
              var n = t.name;
              e.core.schema.tables.some(function (e) {
                return e.name === n;
              }) &&
                ((t.core = e.core.table(n)), e[n] instanceof e.Table) &&
                (e[n].core = t.core);
            }));
        }
        function gn(e, t, n, r) {
          n.forEach(function (n) {
            var i = r[n];
            t.forEach(function (t) {
              var r = (function e(t, n) {
                return m(t, n) || ((t = s(t)) && e(t, n));
              })(t, n);
              (!r || (`value` in r && r.value === void 0)) &&
                (t === e.Transaction.prototype || t instanceof e.Transaction
                  ? f(t, n, {
                      get: function () {
                        return this.table(n);
                      },
                      set: function (e) {
                        d(this, n, {
                          value: e,
                          writable: !0,
                          configurable: !0,
                          enumerable: !0,
                        });
                      },
                    })
                  : (t[n] = new e.Table(n, i)));
            });
          });
        }
        function _n(e, t) {
          t.forEach(function (t) {
            for (var n in t) t[n] instanceof e.Table && delete t[n];
          });
        }
        function vn(e, t) {
          return e._cfg.version - t._cfg.version;
        }
        function yn(e, t, n, r) {
          var a = e._dbSchema,
            o =
              (n.objectStoreNames.contains(`$meta`) &&
                !a.$meta &&
                ((a.$meta = sn(`$meta`, Dn(``)[0], [])),
                e._storeNames.push(`$meta`)),
              e._createTransaction(`readwrite`, e._storeNames, a)),
            s = (o.create(n), o._completion.catch(r), o._reject.bind(o)),
            c = A.transless || A;
          st(function () {
            if (((A.trans = o), (A.transless = c), t !== 0))
              return (
                hn(e, n),
                (l = t),
                ((r = o).storeNames.includes(`$meta`)
                  ? r
                      .table(`$meta`)
                      .get(`version`)
                      .then(function (e) {
                        return e ?? l;
                      })
                  : j.resolve(l)
                )
                  .then(function (t) {
                    var r = e,
                      a = t,
                      s = o,
                      c = n,
                      l = [],
                      t = r._versions,
                      u = (r._dbSchema = Tn(0, r.idbdb, c));
                    return (t = t.filter(function (e) {
                      return e._cfg.version >= a;
                    })).length === 0
                      ? j.resolve()
                      : (t.forEach(function (e) {
                          (l.push(function () {
                            var t,
                              n,
                              o,
                              l = u,
                              d = e._cfg.dbschema,
                              f =
                                (En(r, l, c),
                                En(r, d, c),
                                (u = r._dbSchema = d),
                                xn(l, d)),
                              p =
                                (f.add.forEach(function (e) {
                                  Sn(c, e[0], e[1].primKey, e[1].indexes);
                                }),
                                f.change.forEach(function (e) {
                                  if (e.recreate)
                                    throw new O.Upgrade(
                                      `Not yet support for changing primary key`,
                                    );
                                  var t = c.objectStore(e.name);
                                  (e.add.forEach(function (e) {
                                    return wn(t, e);
                                  }),
                                    e.change.forEach(function (e) {
                                      (t.deleteIndex(e.name), wn(t, e));
                                    }),
                                    e.del.forEach(function (e) {
                                      return t.deleteIndex(e);
                                    }));
                                }),
                                e._cfg.contentUpgrade);
                            if (p && e._cfg.version > a)
                              return (
                                hn(r, c),
                                (s._memoizedTables = {}),
                                (t = S(d)),
                                f.del.forEach(function (e) {
                                  t[e] = l[e];
                                }),
                                _n(r, [r.Transaction.prototype]),
                                gn(r, [r.Transaction.prototype], i(t), t),
                                (s.schema = t),
                                (n = le(p)) && ct(),
                                (d = j.follow(function () {
                                  var e;
                                  (o = p(s)) &&
                                    n &&
                                    ((e = lt.bind(null, null)), o.then(e, e));
                                })),
                                o && typeof o.then == `function`
                                  ? j.resolve(o)
                                  : d.then(function () {
                                      return o;
                                    })
                              );
                          }),
                            l.push(function (t) {
                              var n = e._cfg.dbschema,
                                i = t;
                              ([].slice
                                .call(i.db.objectStoreNames)
                                .forEach(function (e) {
                                  return (
                                    n[e] == null && i.db.deleteObjectStore(e)
                                  );
                                }),
                                _n(r, [r.Transaction.prototype]),
                                gn(
                                  r,
                                  [r.Transaction.prototype],
                                  r._storeNames,
                                  r._dbSchema,
                                ),
                                (s.schema = r._dbSchema));
                            }),
                            l.push(function (t) {
                              r.idbdb.objectStoreNames.contains(`$meta`) &&
                                (Math.ceil(r.idbdb.version / 10) ===
                                e._cfg.version
                                  ? (r.idbdb.deleteObjectStore(`$meta`),
                                    delete r._dbSchema.$meta,
                                    (r._storeNames = r._storeNames.filter(
                                      function (e) {
                                        return e !== `$meta`;
                                      },
                                    )))
                                  : t
                                      .objectStore(`$meta`)
                                      .put(e._cfg.version, `version`));
                            }));
                        }),
                        (function e() {
                          return l.length
                            ? j.resolve(l.shift()(s.idbtrans)).then(e)
                            : j.resolve();
                        })().then(function () {
                          Cn(u, c);
                        }));
                  })
                  .catch(s)
              );
            var r, l;
            (i(a).forEach(function (e) {
              Sn(n, e, a[e].primKey, a[e].indexes);
            }),
              hn(e, n),
              j
                .follow(function () {
                  return e.on.populate.fire(o);
                })
                .catch(s));
          });
        }
        function bn(e, t) {
          (Cn(e._dbSchema, t),
            t.db.version % 10 != 0 ||
              t.objectStoreNames.contains(`$meta`) ||
              t.db
                .createObjectStore(`$meta`)
                .add(Math.ceil(t.db.version / 10 - 1), `version`));
          var n = Tn(0, e.idbdb, t);
          En(e, e._dbSchema, t);
          for (var r = 0, i = xn(n, e._dbSchema).change; r < i.length; r++) {
            var a = ((e) => {
              if (e.change.length || e.recreate)
                return (
                  console.warn(
                    `Unable to patch indexes of table ${e.name} because it has changes on the type of index or primary key.`,
                  ),
                  { value: void 0 }
                );
              var n = t.objectStore(e.name);
              e.add.forEach(function (t) {
                (Ee &&
                  console.debug(
                    `Dexie upgrade patch: Creating missing index ${e.name}.${t.src}`,
                  ),
                  wn(n, t));
              });
            })(i[r]);
            if (typeof a == `object`) return a.value;
          }
        }
        function xn(e, t) {
          var n,
            r = { del: [], add: [], change: [] };
          for (n in e) t[n] || r.del.push(n);
          for (n in t) {
            var i = e[n],
              a = t[n];
            if (i) {
              var o = {
                name: n,
                def: a,
                recreate: !1,
                del: [],
                add: [],
                change: [],
              };
              if (
                `` + (i.primKey.keyPath || ``) !=
                  `` + (a.primKey.keyPath || ``) ||
                i.primKey.auto !== a.primKey.auto
              )
                ((o.recreate = !0), r.change.push(o));
              else {
                var s = i.idxByName,
                  c = a.idxByName,
                  l = void 0;
                for (l in s) c[l] || o.del.push(l);
                for (l in c) {
                  var u = s[l],
                    d = c[l];
                  u ? u.src !== d.src && o.change.push(d) : o.add.push(d);
                }
                (0 < o.del.length || 0 < o.add.length || 0 < o.change.length) &&
                  r.change.push(o);
              }
            } else r.add.push([n, a]);
          }
          return r;
        }
        function Sn(e, t, n, r) {
          var i = e.db.createObjectStore(
            t,
            n.keyPath
              ? { keyPath: n.keyPath, autoIncrement: n.auto }
              : { autoIncrement: n.auto },
          );
          r.forEach(function (e) {
            return wn(i, e);
          });
        }
        function Cn(e, t) {
          i(e).forEach(function (n) {
            t.db.objectStoreNames.contains(n) ||
              (Ee && console.debug(`Dexie: Creating missing table`, n),
              Sn(t, n, e[n].primKey, e[n].indexes));
          });
        }
        function wn(e, t) {
          e.createIndex(t.name, t.keyPath, {
            unique: t.unique,
            multiEntry: t.multi,
          });
        }
        function Tn(e, t, n) {
          var r = {};
          return (
            g(t.objectStoreNames, 0).forEach(function (e) {
              for (
                var t = n.objectStore(e),
                  i = an(
                    on((c = t.keyPath)),
                    c || ``,
                    !0,
                    !1,
                    !!t.autoIncrement,
                    c && typeof c != `string`,
                    !0,
                  ),
                  a = [],
                  o = 0;
                o < t.indexNames.length;
                ++o
              ) {
                var s = t.index(t.indexNames[o]),
                  c = s.keyPath,
                  s = an(
                    s.name,
                    c,
                    !!s.unique,
                    !!s.multiEntry,
                    !1,
                    c && typeof c != `string`,
                    !1,
                  );
                a.push(s);
              }
              r[e] = sn(e, i, a);
            }),
            r
          );
        }
        function En(e, t, n) {
          for (var i = n.db.objectStoreNames, a = 0; a < i.length; ++a) {
            var o = i[a],
              s = n.objectStore(o);
            e._hasGetAll = `getAll` in s;
            for (var c = 0; c < s.indexNames.length; ++c) {
              var l,
                u = s.indexNames[c],
                d = s.index(u).keyPath,
                d = typeof d == `string` ? d : `[` + g(d).join(`+`) + `]`;
              t[o] &&
                (l = t[o].idxByName[d]) &&
                ((l.name = u),
                delete t[o].idxByName[d],
                (t[o].idxByName[u] = l));
            }
          }
          typeof navigator < `u` &&
            /Safari/.test(navigator.userAgent) &&
            !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
            r.WorkerGlobalScope &&
            r instanceof r.WorkerGlobalScope &&
            [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 &&
            (e._hasGetAll = !1);
        }
        function Dn(e) {
          return e.split(`,`).map(function (e, t) {
            var n = e.split(`:`),
              r = (r = n[1])?.trim(),
              n = (e = n[0].trim()).replace(/([&*]|\+\+)/g, ``),
              i = /^\[/.test(n) ? n.match(/^\[(.*)\]$/)[1].split(`+`) : n;
            return an(
              n,
              i || null,
              /\&/.test(e),
              /\*/.test(e),
              /\+\+/.test(e),
              a(i),
              t === 0,
              r,
            );
          });
        }
        ((kn.prototype._createTableSchema = sn),
          (kn.prototype._parseIndexSyntax = Dn),
          (kn.prototype._parseStoresSpec = function (e, t) {
            var n = this;
            i(e).forEach(function (r) {
              if (e[r] !== null) {
                var i = n._parseIndexSyntax(e[r]),
                  a = i.shift();
                if (!a)
                  throw new O.Schema(
                    `Invalid schema for table ` + r + `: ` + e[r],
                  );
                if (((a.unique = !0), a.multi))
                  throw new O.Schema(`Primary key cannot be multiEntry*`);
                (i.forEach(function (e) {
                  if (e.auto)
                    throw new O.Schema(
                      `Only primary key can be marked as autoIncrement (++)`,
                    );
                  if (!e.keyPath)
                    throw new O.Schema(
                      `Index must have a name and cannot be an empty string`,
                    );
                }),
                  (a = n._createTableSchema(r, a, i)),
                  (t[r] = a));
              }
            });
          }),
          (kn.prototype.stores = function (e) {
            var t = this.db,
              e =
                ((this._cfg.storesSource = this._cfg.storesSource
                  ? o(this._cfg.storesSource, e)
                  : e),
                t._versions),
              n = {},
              r = {};
            return (
              e.forEach(function (e) {
                (o(n, e._cfg.storesSource),
                  (r = e._cfg.dbschema = {}),
                  e._parseStoresSpec(n, r));
              }),
              (t._dbSchema = r),
              _n(t, [t._allTables, t, t.Transaction.prototype]),
              gn(
                t,
                [t._allTables, t, t.Transaction.prototype, this._cfg.tables],
                i(r),
                r,
              ),
              (t._storeNames = i(r)),
              this
            );
          }),
          (kn.prototype.upgrade = function (e) {
            return (
              (this._cfg.contentUpgrade = Te(this._cfg.contentUpgrade || k, e)),
              this
            );
          }));
        var On = kn;
        function kn() {}
        var An = (() => {
          var e, t, n;
          return typeof FinalizationRegistry < `u` && typeof WeakRef < `u`
            ? ((e = new Set()),
              (t = new FinalizationRegistry(function (t) {
                e.delete(t);
              })),
              {
                toArray: function () {
                  return Array.from(e)
                    .map(function (e) {
                      return e.deref();
                    })
                    .filter(function (e) {
                      return e !== void 0;
                    });
                },
                add: function (n) {
                  var r = new WeakRef(n._novip);
                  (e.add(r),
                    t.register(n._novip, r, r),
                    e.size > n._options.maxConnections &&
                      ((r = e.values().next().value),
                      e.delete(r),
                      t.unregister(r)));
                },
                remove: function (n) {
                  if (n)
                    for (var r = e.values(), i = r.next(); !i.done; ) {
                      var a = i.value;
                      if (a.deref() === n._novip)
                        return (e.delete(a), void t.unregister(a));
                      i = r.next();
                    }
                },
              })
            : ((n = []),
              {
                toArray: function () {
                  return n;
                },
                add: function (e) {
                  n.push(e._novip);
                },
                remove: function (e) {
                  e && (e = n.indexOf(e._novip)) !== -1 && n.splice(e, 1);
                },
              });
        })();
        function jn(e, t) {
          var n = e._dbNamesDB;
          return (
            n ||
              (n = e._dbNamesDB =
                new gr(bt, { addons: [], indexedDB: e, IDBKeyRange: t }))
                .version(1)
                .stores({ dbnames: `name` }),
            n.table(`dbnames`)
          );
        }
        function Mn(e) {
          return e && typeof e.databases == `function`;
        }
        function Nn(e) {
          return st(function () {
            return ((A.letThrough = !0), e());
          });
        }
        function Pn(e) {
          return !(`from` in e);
        }
        var Fn = function (e, t) {
          var n;
          if (!this) return ((n = new Fn()), e && `d` in e && o(n, e), n);
          o(
            this,
            arguments.length
              ? { d: 1, from: e, to: 1 < arguments.length ? t : e }
              : { d: 0 },
          );
        };
        function In(e, t, n) {
          var r = F(t, n);
          if (!isNaN(r)) {
            if (0 < r) throw RangeError();
            if (Pn(e)) return o(e, { from: t, to: n, d: 1 });
            var r = e.l,
              i = e.r;
            if (F(n, e.from) < 0)
              return (
                r
                  ? In(r, t, n)
                  : (e.l = { from: t, to: n, d: 1, l: null, r: null }),
                Bn(e)
              );
            if (0 < F(t, e.to))
              return (
                i
                  ? In(i, t, n)
                  : (e.r = { from: t, to: n, d: 1, l: null, r: null }),
                Bn(e)
              );
            (F(t, e.from) < 0 &&
              ((e.from = t), (e.l = null), (e.d = i ? i.d + 1 : 1)),
              0 < F(n, e.to) &&
                ((e.to = n), (e.r = null), (e.d = e.l ? e.l.d + 1 : 1)),
              (t = !e.r),
              r && !e.l && Ln(e, r),
              i && t && Ln(e, i));
          }
        }
        function Ln(e, t) {
          Pn(t) ||
            (function e(t, n) {
              var r = n.from,
                i = n.l,
                a = n.r;
              (In(t, r, n.to), i && e(t, i), a && e(t, a));
            })(e, t);
        }
        function Rn(e, t) {
          var n = zn(t),
            r = n.next();
          if (!r.done)
            for (
              var i = r.value, a = zn(e), o = a.next(i.from), s = o.value;
              !r.done && !o.done;
            ) {
              if (F(s.from, i.to) <= 0 && 0 <= F(s.to, i.from)) return !0;
              F(i.from, s.from) < 0
                ? (i = (r = n.next(s.from)).value)
                : (s = (o = a.next(i.from)).value);
            }
          return !1;
        }
        function zn(e) {
          var t = Pn(e) ? null : { s: 0, n: e };
          return {
            next: function (e) {
              for (var n = 0 < arguments.length; t; )
                switch (t.s) {
                  case 0:
                    if (((t.s = 1), n))
                      for (; t.n.l && F(e, t.n.from) < 0; )
                        t = { up: t, n: t.n.l, s: 1 };
                    else for (; t.n.l; ) t = { up: t, n: t.n.l, s: 1 };
                  case 1:
                    if (((t.s = 2), !n || F(e, t.n.to) <= 0))
                      return { value: t.n, done: !1 };
                  case 2:
                    if (t.n.r) {
                      ((t.s = 3), (t = { up: t, n: t.n.r, s: 0 }));
                      continue;
                    }
                  case 3:
                    t = t.up;
                }
              return { done: !0 };
            },
          };
        }
        function Bn(e) {
          var n,
            r,
            i,
            a = ((a = e.r)?.d || 0) - ((a = e.l)?.d || 0),
            a = 1 < a ? `r` : a < -1 ? `l` : ``;
          (a &&
            ((n = a == `r` ? `l` : `r`),
            (r = t({}, e)),
            (i = e[a]),
            (e.from = i.from),
            (e.to = i.to),
            (e[a] = i[a]),
            (r[a] = i[n]),
            ((e[n] = r).d = Vn(r))),
            (e.d = Vn(e)));
        }
        function Vn(e) {
          var t = e.r,
            e = e.l;
          return (t ? (e ? Math.max(t.d, e.d) : t.d) : e ? e.d : 0) + 1;
        }
        function Hn(e, t) {
          return (
            i(t).forEach(function (n) {
              e[n]
                ? Ln(e[n], t[n])
                : (e[n] = (function e(t) {
                    var n,
                      r,
                      i = {};
                    for (n in t)
                      l(t, n) &&
                        ((r = t[n]),
                        (i[n] =
                          !r || typeof r != `object` || ee.has(r.constructor)
                            ? r
                            : e(r)));
                    return i;
                  })(t[n]));
            }),
            e
          );
        }
        function Un(e, t) {
          return (
            e.all ||
            t.all ||
            Object.keys(e).some(function (n) {
              return t[n] && Rn(t[n], e[n]);
            })
          );
        }
        u(
          Fn.prototype,
          (((ue = {
            add: function (e) {
              return (Ln(this, e), this);
            },
            addKey: function (e) {
              return (In(this, e, e), this);
            },
            addKeys: function (e) {
              var t = this;
              return (
                e.forEach(function (e) {
                  return In(t, e, e);
                }),
                this
              );
            },
            hasKey: function (e) {
              var t = zn(this).next(e).value;
              return t && F(t.from, e) <= 0 && 0 <= F(t.to, e);
            },
          })[ae] = function () {
            return zn(this);
          }),
          ue),
        );
        var Wn = {},
          Gn = {},
          Kn = !1;
        function qn(e) {
          (Hn(Gn, e),
            Kn ||
              ((Kn = !0),
              setTimeout(function () {
                ((Kn = !1), Jn(Gn, !(Gn = {})));
              }, 0)));
        }
        function Jn(e, t) {
          t === void 0 && (t = !1);
          var n = new Set();
          if (e.all)
            for (var r = 0, i = Object.values(Wn); r < i.length; r++)
              Yn((s = i[r]), e, n, t);
          else
            for (var a in e) {
              var o,
                s,
                a = /^idb\:\/\/(.*)\/(.*)\//.exec(a);
              a &&
                ((o = a[1]), (a = a[2]), (s = Wn[`idb://${o}/${a}`])) &&
                Yn(s, e, n, t);
            }
          n.forEach(function (e) {
            return e();
          });
        }
        function Yn(e, t, n, r) {
          for (
            var i = [], a = 0, o = Object.entries(e.queries.query);
            a < o.length;
            a++
          ) {
            for (
              var s = o[a], c = s[0], l = [], u = 0, d = s[1];
              u < d.length;
              u++
            ) {
              var f = d[u];
              Un(t, f.obsSet)
                ? f.subscribers.forEach(function (e) {
                    return n.add(e);
                  })
                : r && l.push(f);
            }
            r && i.push([c, l]);
          }
          if (r)
            for (var p = 0, m = i; p < m.length; p++) {
              var h = m[p],
                c = h[0],
                l = h[1];
              e.queries.query[c] = l;
            }
        }
        function Xn(e) {
          var t = e._state,
            n = e._deps.indexedDB;
          if (t.isBeingOpened || e.idbdb)
            return t.dbReadyPromise.then(function () {
              return t.dbOpenError ? N(t.dbOpenError) : e;
            });
          ((t.isBeingOpened = !0),
            (t.dbOpenError = null),
            (t.openComplete = !1));
          var r = t.openCanceller,
            a = Math.round(10 * e.verno),
            o = !1;
          function s() {
            if (t.openCanceller !== r)
              throw new O.DatabaseClosed(`db.open() was cancelled`);
          }
          function c() {
            return new j(function (r, l) {
              if ((s(), !n)) throw new O.MissingAPI();
              var u = e.name,
                p = t.autoSchema || !a ? n.open(u) : n.open(u, a);
              if (!p) throw new O.MissingAPI();
              ((p.onerror = Zt(l)),
                (p.onblocked = M(e._fireOnBlocked)),
                (p.onupgradeneeded = M(function (r) {
                  var i;
                  ((d = p.transaction),
                    t.autoSchema && !e._options.allowEmptyDB
                      ? ((p.onerror = Qt),
                        d.abort(),
                        p.result.close(),
                        ((i = n.deleteDatabase(u)).onsuccess = i.onerror =
                          M(function () {
                            l(
                              new O.NoSuchDatabase(
                                `Database ${u} doesnt exist`,
                              ),
                            );
                          })))
                      : ((d.onerror = Zt(l)),
                        (i = r.oldVersion > 2 ** 62 ? 0 : r.oldVersion),
                        (f = i < 1),
                        (e.idbdb = p.result),
                        o && bn(e, d),
                        yn(e, i / 10, d, l)));
                }, l)),
                (p.onsuccess = M(function () {
                  d = null;
                  var n,
                    s,
                    l,
                    m,
                    h,
                    _,
                    v = (e.idbdb = p.result),
                    y = g(v.objectStoreNames);
                  if (0 < y.length)
                    try {
                      var b = v.transaction(
                        (h = y).length === 1 ? h[0] : h,
                        `readonly`,
                      );
                      if (t.autoSchema)
                        ((_ = v),
                          (m = b),
                          ((l = e).verno = _.version / 10),
                          (m = l._dbSchema = Tn(0, _, m)),
                          (l._storeNames = g(_.objectStoreNames, 0)),
                          gn(l, [l._allTables], i(m), m));
                      else if (
                        (En(e, e._dbSchema, b),
                        (s = b),
                        ((s = xn(Tn(0, (n = e).idbdb, s), n._dbSchema)).add
                          .length ||
                          s.change.some(function (e) {
                            return e.add.length || e.change.length;
                          })) &&
                          !o)
                      )
                        return (
                          console.warn(
                            `Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this.`,
                          ),
                          v.close(),
                          (a = v.version + 1),
                          (o = !0),
                          r(c())
                        );
                      hn(e, b);
                    } catch {}
                  (An.add(e),
                    (v.onversionchange = M(function (n) {
                      ((t.vcFired = !0), e.on(`versionchange`).fire(n));
                    })),
                    (v.onclose = M(function () {
                      e.close({ disableAutoOpen: !1 });
                    })),
                    f &&
                      ((y = e._deps),
                      (h = u),
                      Mn((_ = y.indexedDB)) ||
                        h === bt ||
                        jn(_, y.IDBKeyRange).put({ name: h }).catch(k)),
                    r());
                }, l)));
            }).catch(function (e) {
              switch (e?.name) {
                case `UnknownError`:
                  if (0 < t.PR1398_maxLoop)
                    return (
                      t.PR1398_maxLoop--,
                      console.warn(
                        `Dexie: Workaround for Chrome UnknownError on open()`,
                      ),
                      c()
                    );
                  break;
                case `VersionError`:
                  if (0 < a) return ((a = 0), c());
              }
              return j.reject(e);
            });
          }
          var l,
            u = t.dbReadyResolve,
            d = null,
            f = !1;
          return j
            .race([
              r,
              (typeof navigator > `u`
                ? j.resolve()
                : !navigator.userAgentData &&
                    /Safari\//.test(navigator.userAgent) &&
                    !/Chrom(e|ium)\//.test(navigator.userAgent) &&
                    indexedDB.databases
                  ? new Promise(function (e) {
                      function t() {
                        return indexedDB.databases().finally(e);
                      }
                      ((l = setInterval(t, 100)), t());
                    }).finally(function () {
                      return clearInterval(l);
                    })
                  : Promise.resolve()
              ).then(c),
            ])
            .then(function () {
              return (
                s(),
                (t.onReadyBeingFired = []),
                j
                  .resolve(
                    Nn(function () {
                      return e.on.ready.fire(e.vip);
                    }),
                  )
                  .then(function n() {
                    var r;
                    if (0 < t.onReadyBeingFired.length)
                      return (
                        (r = t.onReadyBeingFired.reduce(Te, k)),
                        (t.onReadyBeingFired = []),
                        j
                          .resolve(
                            Nn(function () {
                              return r(e.vip);
                            }),
                          )
                          .then(n)
                      );
                  })
              );
            })
            .finally(function () {
              t.openCanceller === r &&
                ((t.onReadyBeingFired = null), (t.isBeingOpened = !1));
            })
            .catch(function (n) {
              t.dbOpenError = n;
              try {
                d && d.abort();
              } catch {}
              return (r === t.openCanceller && e._close(), N(n));
            })
            .finally(function () {
              ((t.openComplete = !0), u());
            })
            .then(function () {
              var t;
              return (
                f &&
                  ((t = {}),
                  e.tables.forEach(function (n) {
                    (n.schema.indexes.forEach(function (r) {
                      r.name &&
                        (t[`idb://${e.name}/${n.name}/${r.name}`] = new Fn(
                          -1 / 0,
                          [[[]]],
                        ));
                    }),
                      (t[`idb://${e.name}/${n.name}/`] = t[
                        `idb://${e.name}/${n.name}/:dels`
                      ] =
                        new Fn(-1 / 0, [[[]]])));
                  }),
                  tn($t).fire(t),
                  Jn(t, !0)),
                e
              );
            });
        }
        function Zn(e) {
          function t(t) {
            return e.next(t);
          }
          var n = i(t),
            r = i(function (t) {
              return e.throw(t);
            });
          function i(e) {
            return function (t) {
              var t = e(t),
                i = t.value;
              return t.done
                ? i
                : i && typeof i.then == `function`
                  ? i.then(n, r)
                  : a(i)
                    ? Promise.all(i).then(n, r)
                    : n(i);
            };
          }
          return i(t)();
        }
        function Qn(e, t, n) {
          for (var r = a(e) ? e.slice() : [e], i = 0; i < n; ++i) r.push(t);
          return r;
        }
        var $n = {
          stack: `dbcore`,
          name: `VirtualIndexMiddleware`,
          level: 1,
          create: function (e) {
            return t(t({}, e), {
              table: function (n) {
                var r = e.table(n),
                  n = r.schema,
                  i = {},
                  a = [];
                function o(e, n, r) {
                  var s = fn(e),
                    c = (i[s] = i[s] || []),
                    l = e == null ? 0 : typeof e == `string` ? 1 : e.length,
                    u = 0 < n,
                    s = t(t({}, r), {
                      name: u ? `${s}(virtual-from:${r.name})` : r.name,
                      lowLevelIndex: r,
                      isVirtual: u,
                      keyTail: n,
                      keyLength: l,
                      extractKey: ln(e),
                      unique: !u && r.unique,
                    });
                  return (
                    c.push(s),
                    s.isPrimaryKey || a.push(s),
                    1 < l && o(l === 2 ? e[0] : e.slice(0, l - 1), n + 1, r),
                    c.sort(function (e, t) {
                      return e.keyTail - t.keyTail;
                    }),
                    s
                  );
                }
                var s = o(n.primaryKey.keyPath, 0, n.primaryKey);
                i[`:id`] = [s];
                for (var c = 0, l = n.indexes; c < l.length; c++) {
                  var u = l[c];
                  o(u.keyPath, 0, u);
                }
                function d(n) {
                  var r,
                    i = n.query.index;
                  return i.isVirtual
                    ? t(t({}, n), {
                        query: {
                          index: i.lowLevelIndex,
                          range:
                            ((r = n.query.range),
                            (i = i.keyTail),
                            {
                              type: r.type === 1 ? 2 : r.type,
                              lower: Qn(
                                r.lower,
                                r.lowerOpen ? e.MAX_KEY : e.MIN_KEY,
                                i,
                              ),
                              lowerOpen: !0,
                              upper: Qn(
                                r.upper,
                                r.upperOpen ? e.MIN_KEY : e.MAX_KEY,
                                i,
                              ),
                              upperOpen: !0,
                            }),
                        },
                      })
                    : n;
                }
                return t(t({}, r), {
                  schema: t(t({}, n), {
                    primaryKey: s,
                    indexes: a,
                    getIndexByKeyPath: function (e) {
                      return (e = i[fn(e)]) && e[0];
                    },
                  }),
                  count: function (e) {
                    return r.count(d(e));
                  },
                  query: function (e) {
                    return r.query(d(e));
                  },
                  openCursor: function (t) {
                    var n = t.query.index,
                      i = n.keyTail,
                      a = n.keyLength;
                    return n.isVirtual
                      ? r.openCursor(d(t)).then(function (e) {
                          return e && o(e);
                        })
                      : r.openCursor(t);
                    function o(n) {
                      return Object.create(n, {
                        continue: {
                          value: function (r) {
                            r == null
                              ? t.unique
                                ? n.continue(
                                    n.key
                                      .slice(0, a)
                                      .concat(
                                        t.reverse ? e.MIN_KEY : e.MAX_KEY,
                                        i,
                                      ),
                                  )
                                : n.continue()
                              : n.continue(
                                  Qn(r, t.reverse ? e.MAX_KEY : e.MIN_KEY, i),
                                );
                          },
                        },
                        continuePrimaryKey: {
                          value: function (t, r) {
                            n.continuePrimaryKey(Qn(t, e.MAX_KEY, i), r);
                          },
                        },
                        primaryKey: {
                          get: function () {
                            return n.primaryKey;
                          },
                        },
                        key: {
                          get: function () {
                            var e = n.key;
                            return a === 1 ? e[0] : e.slice(0, a);
                          },
                        },
                        value: {
                          get: function () {
                            return n.value;
                          },
                        },
                      });
                    }
                  },
                });
              },
            });
          },
        };
        function er(e, t, n, r) {
          return (
            (n ||= {}),
            (r ||= ``),
            i(e).forEach(function (i) {
              var a, o, s;
              l(t, i)
                ? ((a = e[i]),
                  (o = t[i]),
                  typeof a == `object` && typeof o == `object` && a && o
                    ? (s = ie(a)) === ie(o)
                      ? s === `Object`
                        ? er(a, o, n, r + i + `.`)
                        : a !== o && (n[r + i] = t[i])
                      : (n[r + i] = t[i])
                    : a !== o && (n[r + i] = t[i]))
                : (n[r + i] = void 0);
            }),
            i(t).forEach(function (i) {
              l(e, i) || (n[r + i] = t[i]);
            }),
            n
          );
        }
        function tr(e, t) {
          return t.type === `delete`
            ? t.keys
            : t.keys || t.values.map(e.extractKey);
        }
        var nr = {
          stack: `dbcore`,
          name: `HooksMiddleware`,
          level: 2,
          create: function (e) {
            return t(t({}, e), {
              table: function (r) {
                var i = e.table(r),
                  a = i.schema.primaryKey;
                return t(t({}, i), {
                  mutate: function (e) {
                    var o = A.trans,
                      s = o.table(r).hook,
                      c = s.deleting,
                      u = s.creating,
                      d = s.updating;
                    switch (e.type) {
                      case `add`:
                        if (u.fire === k) break;
                        return o._promise(
                          `readwrite`,
                          function () {
                            return f(e);
                          },
                          !0,
                        );
                      case `put`:
                        if (u.fire === k && d.fire === k) break;
                        return o._promise(
                          `readwrite`,
                          function () {
                            return f(e);
                          },
                          !0,
                        );
                      case `delete`:
                        if (c.fire === k) break;
                        return o._promise(
                          `readwrite`,
                          function () {
                            return f(e);
                          },
                          !0,
                        );
                      case `deleteRange`:
                        if (c.fire === k) break;
                        return o._promise(
                          `readwrite`,
                          function () {
                            return (function e(n, r, o) {
                              return i
                                .query({
                                  trans: n,
                                  values: !1,
                                  query: { index: a, range: r },
                                  limit: o,
                                })
                                .then(function (i) {
                                  var a = i.result;
                                  return f({
                                    type: `delete`,
                                    keys: a,
                                    trans: n,
                                  }).then(function (i) {
                                    return 0 < i.numFailures
                                      ? Promise.reject(i.failures[0])
                                      : a.length < o
                                        ? {
                                            failures: [],
                                            numFailures: 0,
                                            lastResult: void 0,
                                          }
                                        : e(
                                            n,
                                            t(t({}, r), {
                                              lower: a[a.length - 1],
                                              lowerOpen: !0,
                                            }),
                                            o,
                                          );
                                  });
                                });
                            })(e.trans, e.range, 1e4);
                          },
                          !0,
                        );
                    }
                    return i.mutate(e);
                    function f(e) {
                      var r,
                        o,
                        s,
                        f = A.trans,
                        p = e.keys || tr(a, e);
                      if (p)
                        return (
                          (e =
                            e.type === `add` || e.type === `put`
                              ? t(t({}, e), { keys: p })
                              : t({}, e)).type !== `delete` &&
                            (e.values = n([], e.values, !0)),
                          (e.keys &&= n([], e.keys, !0)),
                          (r = i),
                          (s = p),
                          ((o = e).type === `add`
                            ? Promise.resolve([])
                            : r.getMany({
                                trans: o.trans,
                                keys: s,
                                cache: `immutable`,
                              })
                          ).then(function (t) {
                            var n = p.map(function (n, r) {
                              var i,
                                o,
                                s,
                                p = t[r],
                                m = { onerror: null, onsuccess: null };
                              return (
                                e.type === `delete`
                                  ? c.fire.call(m, n, p, f)
                                  : e.type === `add` || p === void 0
                                    ? ((i = u.fire.call(m, n, e.values[r], f)),
                                      n == null &&
                                        i != null &&
                                        ((e.keys[r] = n = i),
                                        a.outbound ||
                                          x(e.values[r], a.keyPath, n)))
                                    : ((i = er(p, e.values[r])),
                                      (o = d.fire.call(m, i, n, p, f)) &&
                                        ((s = e.values[r]),
                                        Object.keys(o).forEach(function (e) {
                                          l(s, e)
                                            ? (s[e] = o[e])
                                            : x(s, e, o[e]);
                                        }))),
                                m
                              );
                            });
                            return i
                              .mutate(e)
                              .then(function (r) {
                                for (
                                  var i = r.failures,
                                    a = r.results,
                                    o = r.numFailures,
                                    r = r.lastResult,
                                    s = 0;
                                  s < p.length;
                                  ++s
                                ) {
                                  var c = (a || p)[s],
                                    l = n[s];
                                  c == null
                                    ? l.onerror && l.onerror(i[s])
                                    : l.onsuccess &&
                                      l.onsuccess(
                                        e.type === `put` && t[s]
                                          ? e.values[s]
                                          : c,
                                      );
                                }
                                return {
                                  failures: i,
                                  results: a,
                                  numFailures: o,
                                  lastResult: r,
                                };
                              })
                              .catch(function (e) {
                                return (
                                  n.forEach(function (t) {
                                    return t.onerror && t.onerror(e);
                                  }),
                                  Promise.reject(e)
                                );
                              });
                          })
                        );
                      throw Error(`Keys missing`);
                    }
                  },
                });
              },
            });
          },
        };
        function rr(e, t, n) {
          try {
            if (!t || t.keys.length < e.length) return null;
            for (
              var r = [], i = 0, a = 0;
              i < t.keys.length && a < e.length;
              ++i
            )
              F(t.keys[i], e[a]) === 0 &&
                (r.push(n ? ne(t.values[i]) : t.values[i]), ++a);
            return r.length === e.length ? r : null;
          } catch {
            return null;
          }
        }
        var ir = {
          stack: `dbcore`,
          level: -1,
          create: function (e) {
            return {
              table: function (n) {
                var r = e.table(n);
                return t(t({}, r), {
                  getMany: function (e) {
                    var t;
                    return e.cache
                      ? (t = rr(e.keys, e.trans._cache, e.cache === `clone`))
                        ? j.resolve(t)
                        : r.getMany(e).then(function (t) {
                            return (
                              (e.trans._cache = {
                                keys: e.keys,
                                values: e.cache === `clone` ? ne(t) : t,
                              }),
                              t
                            );
                          })
                      : r.getMany(e);
                  },
                  mutate: function (e) {
                    return (
                      e.type !== `add` && (e.trans._cache = null),
                      r.mutate(e)
                    );
                  },
                });
              },
            };
          },
        };
        function ar(e, t) {
          return (
            e.trans.mode === `readonly` &&
            !!e.subscr &&
            !e.trans.explicit &&
            e.trans.db._options.cache !== `disabled` &&
            !t.schema.primaryKey.outbound
          );
        }
        function or(e, t) {
          switch (e) {
            case `query`:
              return t.values && !t.unique;
            case `get`:
            case `getMany`:
            case `count`:
            case `openCursor`:
              return !1;
          }
        }
        var sr = {
          stack: `dbcore`,
          level: 0,
          name: `Observability`,
          create: function (e) {
            var n = e.schema.name,
              r = new Fn(e.MIN_KEY, e.MAX_KEY);
            return t(t({}, e), {
              transaction: function (t, n, r) {
                if (A.subscr && n !== `readonly`)
                  throw new O.ReadOnly(
                    `Readwrite transaction in liveQuery context. Querier source: ${A.querier}`,
                  );
                return e.transaction(t, n, r);
              },
              table: function (o) {
                function s(t) {
                  var t = t.query;
                  return [
                    t.index,
                    new Fn(
                      (t = t.range).lower ?? e.MIN_KEY,
                      t.upper ?? e.MAX_KEY,
                    ),
                  ];
                }
                var c = e.table(o),
                  l = c.schema,
                  u = l.primaryKey,
                  d = l.indexes,
                  f = u.extractKey,
                  p = u.outbound,
                  m =
                    u.autoIncrement &&
                    d.filter(function (e) {
                      return e.compound && e.keyPath.includes(u.keyPath);
                    }),
                  h = t(t({}, c), {
                    mutate: function (t) {
                      function i(e) {
                        return (
                          (e = `idb://${n}/${o}/${e}`),
                          h[e] || (h[e] = new Fn())
                        );
                      }
                      var s,
                        d,
                        f,
                        p = t.trans,
                        h = (t.mutatedParts ||= {}),
                        g = i(``),
                        _ = i(`:dels`),
                        v = t.type,
                        y =
                          t.type === `deleteRange`
                            ? [t.range]
                            : t.type === `delete`
                              ? [t.keys]
                              : t.values.length < 50
                                ? [
                                    tr(u, t).filter(function (e) {
                                      return e;
                                    }),
                                    t.values,
                                  ]
                                : [],
                        b = y[0],
                        y = y[1],
                        x = t.trans._cache;
                      return (
                        a(b)
                          ? (g.addKeys(b),
                            (v =
                              v === `delete` || b.length === y.length
                                ? rr(b, x)
                                : null) || _.addKeys(b),
                            (v || y) &&
                              ((s = i),
                              (d = v),
                              (f = y),
                              l.indexes.forEach(function (e) {
                                var t = s(e.name || ``);
                                function n(t) {
                                  return t == null ? null : e.extractKey(t);
                                }
                                function r(n) {
                                  e.multiEntry && a(n)
                                    ? n.forEach(function (e) {
                                        return t.addKey(e);
                                      })
                                    : t.addKey(n);
                                }
                                (d || f).forEach(function (e, t) {
                                  var i = d && n(d[t]),
                                    t = f && n(f[t]);
                                  F(i, t) !== 0 &&
                                    (i != null && r(i), t != null) &&
                                    r(t);
                                });
                              })))
                          : b
                            ? ((y = {
                                from: (x = b.lower) ?? e.MIN_KEY,
                                to: (v = b.upper) ?? e.MAX_KEY,
                              }),
                              _.add(y),
                              g.add(y))
                            : (g.add(r),
                              _.add(r),
                              l.indexes.forEach(function (e) {
                                return i(e.name).add(r);
                              })),
                        c.mutate(t).then(function (e) {
                          return (
                            !b ||
                              (t.type !== `add` && t.type !== `put`) ||
                              (g.addKeys(e.results),
                              m &&
                                m.forEach(function (n) {
                                  for (
                                    var r = t.values.map(function (e) {
                                        return n.extractKey(e);
                                      }),
                                      a = n.keyPath.findIndex(function (e) {
                                        return e === u.keyPath;
                                      }),
                                      o = 0,
                                      s = e.results.length;
                                    o < s;
                                    ++o
                                  )
                                    r[o][a] = e.results[o];
                                  i(n.name).addKeys(r);
                                })),
                            (p.mutatedParts = Hn(p.mutatedParts || {}, h)),
                            e
                          );
                        })
                      );
                    },
                  }),
                  g = {
                    get: function (e) {
                      return [u, new Fn(e.key)];
                    },
                    getMany: function (e) {
                      return [u, new Fn().addKeys(e.keys)];
                    },
                    count: s,
                    query: s,
                    openCursor: s,
                  };
                return (
                  i(g).forEach(function (e) {
                    h[e] = function (i) {
                      var a = A.subscr,
                        s = !!a,
                        l = ar(A, c) && or(e, i) ? (i.obsSet = {}) : a;
                      if (s) {
                        var u,
                          a = function (e) {
                            return (
                              (e = `idb://${n}/${o}/${e}`),
                              l[e] || (l[e] = new Fn())
                            );
                          },
                          d = a(``),
                          m = a(`:dels`),
                          s = g[e](i),
                          h = s[0],
                          s = s[1];
                        if (
                          ((e === `query` && h.isPrimaryKey && !i.values
                            ? m
                            : a(h.name || ``)
                          ).add(s),
                          !h.isPrimaryKey)
                        ) {
                          if (e !== `count`)
                            return (
                              (u =
                                e === `query` &&
                                p &&
                                i.values &&
                                c.query(t(t({}, i), { values: !1 }))),
                              c[e].apply(this, arguments).then(function (t) {
                                if (e === `query`) {
                                  if (p && i.values)
                                    return u.then(function (e) {
                                      return ((e = e.result), d.addKeys(e), t);
                                    });
                                  var n = i.values ? t.result.map(f) : t.result;
                                  (i.values ? d : m).addKeys(n);
                                } else {
                                  var r, a;
                                  if (e === `openCursor`)
                                    return (
                                      (a = i.values),
                                      (r = t) &&
                                        Object.create(r, {
                                          key: {
                                            get: function () {
                                              return (
                                                m.addKey(r.primaryKey),
                                                r.key
                                              );
                                            },
                                          },
                                          primaryKey: {
                                            get: function () {
                                              var e = r.primaryKey;
                                              return (m.addKey(e), e);
                                            },
                                          },
                                          value: {
                                            get: function () {
                                              return (
                                                a && d.addKey(r.primaryKey),
                                                r.value
                                              );
                                            },
                                          },
                                        })
                                    );
                                }
                                return t;
                              })
                            );
                          m.add(r);
                        }
                      }
                      return c[e].apply(this, arguments);
                    };
                  }),
                  h
                );
              },
            });
          },
        };
        function cr(e, n, r) {
          var i;
          return r.numFailures === 0
            ? n
            : n.type === `deleteRange` ||
                ((i = n.keys
                  ? n.keys.length
                  : `values` in n && n.values
                    ? n.values.length
                    : 1),
                r.numFailures === i)
              ? null
              : ((i = t({}, n)),
                a(i.keys) &&
                  (i.keys = i.keys.filter(function (e, t) {
                    return !(t in r.failures);
                  })),
                `values` in i &&
                  a(i.values) &&
                  (i.values = i.values.filter(function (e, t) {
                    return !(t in r.failures);
                  })),
                i);
        }
        function lr(e, t) {
          return (
            (n = e),
            ((r = t).lower === void 0 ||
              (r.lowerOpen ? 0 < F(n, r.lower) : 0 <= F(n, r.lower))) &&
              ((n = e),
              (r = t).upper === void 0 ||
                (r.upperOpen ? F(n, r.upper) < 0 : F(n, r.upper) <= 0))
          );
          var n, r;
        }
        function ur(e, t, n, r, i, o) {
          var s, c, l, u, d, f, p;
          return !n ||
            n.length === 0 ||
            ((s = t.query.index),
            (c = s.multiEntry),
            (l = t.query.range),
            (u = r.schema.primaryKey.extractKey),
            (d = s.extractKey),
            (f = (s.lowLevelIndex || s).extractKey),
            (r = n.reduce(function (e, n) {
              var r = e,
                i = [];
              if (n.type === `add` || n.type === `put`)
                for (var o = new Fn(), s = n.values.length - 1; 0 <= s; --s) {
                  var f,
                    p = n.values[s],
                    m = u(p);
                  !o.hasKey(m) &&
                    ((f = d(p)),
                    c && a(f)
                      ? f.some(function (e) {
                          return lr(e, l);
                        })
                      : lr(f, l)) &&
                    (o.addKey(m), i.push(p));
                }
              switch (n.type) {
                case `add`:
                  var h = new Fn().addKeys(
                      t.values
                        ? e.map(function (e) {
                            return u(e);
                          })
                        : e,
                    ),
                    r = e.concat(
                      t.values
                        ? i.filter(function (e) {
                            return (
                              (e = u(e)),
                              !h.hasKey(e) && (h.addKey(e), !0)
                            );
                          })
                        : i
                            .map(function (e) {
                              return u(e);
                            })
                            .filter(function (e) {
                              return !h.hasKey(e) && (h.addKey(e), !0);
                            }),
                    );
                  break;
                case `put`:
                  var g = new Fn().addKeys(
                    n.values.map(function (e) {
                      return u(e);
                    }),
                  );
                  r = e
                    .filter(function (e) {
                      return !g.hasKey(t.values ? u(e) : e);
                    })
                    .concat(
                      t.values
                        ? i
                        : i.map(function (e) {
                            return u(e);
                          }),
                    );
                  break;
                case `delete`:
                  var _ = new Fn().addKeys(n.keys);
                  r = e.filter(function (e) {
                    return !_.hasKey(t.values ? u(e) : e);
                  });
                  break;
                case `deleteRange`:
                  var v = n.range;
                  r = e.filter(function (e) {
                    return !lr(u(e), v);
                  });
              }
              return r;
            }, e)) === e)
            ? e
            : ((p = function (e, t) {
                return F(f(e), f(t)) || F(u(e), u(t));
              }),
              r.sort(
                t.direction === `prev` || t.direction === `prevunique`
                  ? function (e, t) {
                      return p(t, e);
                    }
                  : p,
              ),
              t.limit &&
                t.limit < 1 / 0 &&
                (r.length > t.limit
                  ? (r.length = t.limit)
                  : e.length === t.limit &&
                    r.length < t.limit &&
                    (i.dirty = !0)),
              o ? Object.freeze(r) : r);
        }
        function dr(e, t) {
          return (
            F(e.lower, t.lower) === 0 &&
            F(e.upper, t.upper) === 0 &&
            !!e.lowerOpen == !!t.lowerOpen &&
            !!e.upperOpen == !!t.upperOpen
          );
        }
        function fr(e, t) {
          return (
            ((e, t, n, r) => {
              if (e === void 0) return t === void 0 ? 0 : -1;
              if (t === void 0) return 1;
              if ((e = F(e, t)) === 0) {
                if (n && r) return 0;
                if (n) return 1;
                if (r) return -1;
              }
              return e;
            })(e.lower, t.lower, e.lowerOpen, t.lowerOpen) <= 0 &&
            0 <=
              ((e, t, n, r) => {
                if (e === void 0) return t === void 0 ? 0 : 1;
                if (t === void 0) return -1;
                if ((e = F(e, t)) === 0) {
                  if (n && r) return 0;
                  if (n) return -1;
                  if (r) return 1;
                }
                return e;
              })(e.upper, t.upper, e.upperOpen, t.upperOpen)
          );
        }
        function pr(e, t, n, r) {
          (e.subscribers.add(n),
            r.addEventListener(`abort`, function () {
              var r, i;
              (e.subscribers.delete(n),
                e.subscribers.size === 0 &&
                  ((r = e),
                  (i = t),
                  setTimeout(function () {
                    r.subscribers.size === 0 && se(i, r);
                  }, 3e3)));
            }));
        }
        var mr = {
          stack: `dbcore`,
          level: 0,
          name: `Cache`,
          create: function (e) {
            var n = e.schema.name;
            return t(t({}, e), {
              transaction: function (t, r, i) {
                var a,
                  o,
                  s = e.transaction(t, r, i);
                return (
                  r === `readwrite` &&
                    ((i = (a = new AbortController()).signal),
                    s.addEventListener(
                      `abort`,
                      (o = function (i) {
                        return function () {
                          if ((a.abort(), r === `readwrite`)) {
                            for (
                              var o = new Set(), c = 0, l = t;
                              c < l.length;
                              c++
                            ) {
                              var u = l[c],
                                d = Wn[`idb://${n}/${u}`];
                              if (d) {
                                var f = e.table(u),
                                  p = d.optimisticOps.filter(function (e) {
                                    return e.trans === s;
                                  });
                                if (s._explicit && i && s.mutatedParts)
                                  for (
                                    var m = 0,
                                      h = Object.values(d.queries.query);
                                    m < h.length;
                                    m++
                                  )
                                    for (
                                      var g = 0, _ = (b = h[m]).slice();
                                      g < _.length;
                                      g++
                                    )
                                      Un((x = _[g]).obsSet, s.mutatedParts) &&
                                        (se(b, x),
                                        x.subscribers.forEach(function (e) {
                                          return o.add(e);
                                        }));
                                else if (0 < p.length) {
                                  d.optimisticOps = d.optimisticOps.filter(
                                    function (e) {
                                      return e.trans !== s;
                                    },
                                  );
                                  for (
                                    var v = 0,
                                      y = Object.values(d.queries.query);
                                    v < y.length;
                                    v++
                                  )
                                    for (
                                      var b,
                                        x,
                                        S,
                                        C = 0,
                                        w = (b = y[v]).slice();
                                      C < w.length;
                                      C++
                                    )
                                      (x = w[C]).res != null &&
                                        s.mutatedParts &&
                                        (i && !x.dirty
                                          ? ((S = Object.isFrozen(x.res)),
                                            (S = ur(x.res, x.req, p, f, x, S)),
                                            x.dirty
                                              ? (se(b, x),
                                                x.subscribers.forEach(
                                                  function (e) {
                                                    return o.add(e);
                                                  },
                                                ))
                                              : S !== x.res &&
                                                ((x.res = S),
                                                (x.promise = j.resolve({
                                                  result: S,
                                                }))))
                                          : (x.dirty && se(b, x),
                                            x.subscribers.forEach(function (e) {
                                              return o.add(e);
                                            })));
                                }
                              }
                            }
                            o.forEach(function (e) {
                              return e();
                            });
                          }
                        };
                      })(!1),
                      { signal: i },
                    ),
                    s.addEventListener(`error`, o(!1), { signal: i }),
                    s.addEventListener(`complete`, o(!0), { signal: i })),
                  s
                );
              },
              table: function (r) {
                var i = e.table(r),
                  a = i.schema.primaryKey;
                return t(t({}, i), {
                  mutate: function (e) {
                    var o,
                      s = A.trans;
                    return !a.outbound &&
                      s.db._options.cache !== `disabled` &&
                      !s.explicit &&
                      s.idbtrans.mode === `readwrite` &&
                      (o = Wn[`idb://${n}/${r}`])
                      ? ((s = i.mutate(e)),
                        (e.type !== `add` && e.type !== `put`) ||
                        !(
                          50 <= e.values.length ||
                          tr(a, e).some(function (e) {
                            return e == null;
                          })
                        )
                          ? (o.optimisticOps.push(e),
                            e.mutatedParts && qn(e.mutatedParts),
                            s.then(function (t) {
                              0 < t.numFailures &&
                                (se(o.optimisticOps, e),
                                (t = cr(0, e, t)) && o.optimisticOps.push(t),
                                e.mutatedParts) &&
                                qn(e.mutatedParts);
                            }),
                            s.catch(function () {
                              (se(o.optimisticOps, e),
                                e.mutatedParts && qn(e.mutatedParts));
                            }))
                          : s.then(function (n) {
                              var r = cr(
                                0,
                                t(t({}, e), {
                                  values: e.values.map(function (e, r) {
                                    var i;
                                    return n.failures[r]
                                      ? e
                                      : (x(
                                          (i =
                                            (i = a.keyPath) != null &&
                                            i.includes(`.`)
                                              ? ne(e)
                                              : t({}, e)),
                                          a.keyPath,
                                          n.results[r],
                                        ),
                                        i);
                                  }),
                                }),
                                n,
                              );
                              (o.optimisticOps.push(r),
                                queueMicrotask(function () {
                                  return e.mutatedParts && qn(e.mutatedParts);
                                }));
                            }),
                        s)
                      : i.mutate(e);
                  },
                  query: function (e) {
                    var t, a, o, s, c, l, u;
                    return ar(A, i) && or(`query`, e)
                      ? ((t = (o = A.trans)?.db._options.cache === `immutable`),
                        (a = (o = A).requery),
                        (o = o.signal),
                        (l = ((e, t, n, r) => {
                          var i = Wn[`idb://${e}/${t}`];
                          if (!i) return [];
                          if (!(e = i.queries[n])) return [null, !1, i, null];
                          var a =
                            e[(r.query ? r.query.index.name : null) || ``];
                          if (!a) return [null, !1, i, null];
                          switch (n) {
                            case `query`:
                              var o = (s = r.direction) ?? `next`,
                                s = a.find(function (e) {
                                  return (
                                    e.req.limit === r.limit &&
                                    e.req.values === r.values &&
                                    (e.req.direction ?? `next`) === o &&
                                    dr(e.req.query.range, r.query.range)
                                  );
                                });
                              return s
                                ? [s, !0, i, a]
                                : [
                                    a.find(function (e) {
                                      return (
                                        (`limit` in e.req
                                          ? e.req.limit
                                          : 1 / 0) >= r.limit &&
                                        (e.req.direction ?? `next`) === o &&
                                        (!r.values || e.req.values) &&
                                        fr(e.req.query.range, r.query.range)
                                      );
                                    }),
                                    !1,
                                    i,
                                    a,
                                  ];
                            case `count`:
                              return (
                                (s = a.find(function (e) {
                                  return dr(e.req.query.range, r.query.range);
                                })),
                                [s, !!s, i, a]
                              );
                          }
                        })(n, r, `query`, e)),
                        (u = l[0]),
                        (s = l[2]),
                        (c = l[3]),
                        u && l[1]
                          ? (u.obsSet = e.obsSet)
                          : ((l = i
                              .query(e)
                              .then(function (e) {
                                var n = e.result;
                                if ((u && (u.res = n), t)) {
                                  for (var r = 0, i = n.length; r < i; ++r)
                                    Object.freeze(n[r]);
                                  Object.freeze(n);
                                }
                                return e;
                              })
                              .catch(function (e) {
                                return (c && u && se(c, u), Promise.reject(e));
                              })),
                            (u = {
                              obsSet: e.obsSet,
                              promise: l,
                              subscribers: new Set(),
                              type: `query`,
                              req: e,
                              dirty: !1,
                            }),
                            c
                              ? c.push(u)
                              : ((c = [u]),
                                ((s ||= Wn[`idb://${n}/${r}`] =
                                  {
                                    queries: { query: {}, count: {} },
                                    objs: new Map(),
                                    optimisticOps: [],
                                    unsignaledParts: {},
                                  }).queries.query[e.query.index.name || ``] =
                                  c))),
                        pr(u, c, a, o),
                        u.promise.then(function (n) {
                          return (
                            (n = ur(n.result, e, s?.optimisticOps, i, u, t)),
                            { result: t ? n : ne(n) }
                          );
                        }))
                      : i.query(e);
                  },
                });
              },
            });
          },
        };
        function hr(e, t) {
          return new Proxy(e, {
            get: function (e, n, r) {
              return n === `db` ? t : Reflect.get(e, n, r);
            },
          });
        }
        ((B.prototype.version = function (e) {
          if (isNaN(e) || e < 0.1)
            throw new O.Type(`Given version is not a positive number`);
          if (
            ((e = Math.round(10 * e) / 10),
            this.idbdb || this._state.isBeingOpened)
          )
            throw new O.Schema(`Cannot add version when database is open`);
          this.verno = Math.max(this.verno, e);
          var t = this._versions,
            n = t.filter(function (t) {
              return t._cfg.version === e;
            })[0];
          return (
            n ||
              ((n = new this.Version(e)),
              t.push(n),
              t.sort(vn),
              n.stores({}),
              (this._state.autoSchema = !1)),
            n
          );
        }),
          (B.prototype._whenReady = function (e) {
            var t = this;
            return this.idbdb &&
              (this._state.openComplete || A.letThrough || this._vip)
              ? e()
              : new j(function (e, n) {
                  if (t._state.openComplete)
                    return n(new O.DatabaseClosed(t._state.dbOpenError));
                  if (!t._state.isBeingOpened) {
                    if (!t._state.autoOpen)
                      return void n(new O.DatabaseClosed());
                    t.open().catch(k);
                  }
                  t._state.dbReadyPromise.then(e, n);
                }).then(e);
          }),
          (B.prototype.use = function (e) {
            var t = e.stack,
              n = e.create,
              r = e.level,
              e = e.name,
              i =
                (e && this.unuse({ stack: t, name: e }),
                this._middlewares[t] || (this._middlewares[t] = []));
            return (
              i.push({ stack: t, create: n, level: r ?? 10, name: e }),
              i.sort(function (e, t) {
                return e.level - t.level;
              }),
              this
            );
          }),
          (B.prototype.unuse = function (e) {
            var t = e.stack,
              n = e.name,
              r = e.create;
            return (
              t &&
                this._middlewares[t] &&
                (this._middlewares[t] = this._middlewares[t].filter(
                  function (e) {
                    return r ? e.create !== r : !!n && e.name !== n;
                  },
                )),
              this
            );
          }),
          (B.prototype.open = function () {
            var e = this;
            return mt(Be, function () {
              return Xn(e);
            });
          }),
          (B.prototype._close = function () {
            this.on.close.fire(new CustomEvent(`close`));
            var e = this._state;
            if ((An.remove(this), this.idbdb)) {
              try {
                this.idbdb.close();
              } catch {}
              this.idbdb = null;
            }
            e.isBeingOpened ||
              ((e.dbReadyPromise = new j(function (t) {
                e.dbReadyResolve = t;
              })),
              (e.openCanceller = new j(function (t, n) {
                e.cancelOpen = n;
              })));
          }),
          (B.prototype.close = function (e) {
            var e = (e === void 0 ? { disableAutoOpen: !0 } : e)
                .disableAutoOpen,
              t = this._state;
            e
              ? (t.isBeingOpened && t.cancelOpen(new O.DatabaseClosed()),
                this._close(),
                (t.autoOpen = !1),
                (t.dbOpenError = new O.DatabaseClosed()))
              : (this._close(),
                (t.autoOpen = this._options.autoOpen || t.isBeingOpened),
                (t.openComplete = !1),
                (t.dbOpenError = null));
          }),
          (B.prototype.delete = function (e) {
            var t = this,
              n =
                (e === void 0 && (e = { disableAutoOpen: !0 }),
                0 < arguments.length && typeof arguments[0] != `object`),
              r = this._state;
            return new j(function (i, a) {
              function o() {
                t.close(e);
                var n = t._deps.indexedDB.deleteDatabase(t.name);
                ((n.onsuccess = M(function () {
                  var e = t._deps,
                    n = t.name,
                    r;
                  (Mn((r = e.indexedDB)) ||
                    n === bt ||
                    jn(r, e.IDBKeyRange).delete(n).catch(k),
                    i());
                })),
                  (n.onerror = Zt(a)),
                  (n.onblocked = t._fireOnBlocked));
              }
              if (n)
                throw new O.InvalidArgument(
                  `Invalid closeOptions argument to db.delete()`,
                );
              r.isBeingOpened ? r.dbReadyPromise.then(o) : o();
            });
          }),
          (B.prototype.backendDB = function () {
            return this.idbdb;
          }),
          (B.prototype.isOpen = function () {
            return this.idbdb !== null;
          }),
          (B.prototype.hasBeenClosed = function () {
            var e = this._state.dbOpenError;
            return e && e.name === `DatabaseClosed`;
          }),
          (B.prototype.hasFailed = function () {
            return this._state.dbOpenError !== null;
          }),
          (B.prototype.dynamicallyOpened = function () {
            return this._state.autoSchema;
          }),
          Object.defineProperty(B.prototype, "tables", {
            get: function () {
              var e = this;
              return i(this._allTables).map(function (t) {
                return e._allTables[t];
              });
            },
            enumerable: !1,
            configurable: !0,
          }),
          (B.prototype.transaction = function () {
            var e = function (e, t, n) {
              var r = arguments.length;
              if (r < 2) throw new O.InvalidArgument(`Too few arguments`);
              for (var i = Array(r - 1); --r; ) i[r - 1] = arguments[r];
              return ((n = i.pop()), [e, w(i), n]);
            }.apply(this, arguments);
            return this._transaction.apply(this, e);
          }),
          (B.prototype._transaction = function (e, t, n) {
            var r,
              i,
              a = this,
              o = A.trans,
              s =
                ((o && o.db === this && e.indexOf(`!`) === -1) || (o = null),
                e.indexOf(`?`) !== -1);
            e = e.replace(`!`, ``).replace(`?`, ``);
            try {
              if (
                ((i = t.map(function (e) {
                  if (
                    ((e = e instanceof a.Table ? e.name : e),
                    typeof e != `string`)
                  )
                    throw TypeError(
                      `Invalid table argument to Dexie.transaction(). Only Table or String are allowed`,
                    );
                  return e;
                })),
                e == `r` || e === P)
              )
                r = P;
              else {
                if (e != `rw` && e != xt)
                  throw new O.InvalidArgument(`Invalid transaction mode: ` + e);
                r = xt;
              }
              if (o) {
                if (o.mode === P && r === xt) {
                  if (!s)
                    throw new O.SubTransaction(
                      `Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY`,
                    );
                  o = null;
                }
                (o &&
                  i.forEach(function (e) {
                    if (o && o.storeNames.indexOf(e) === -1) {
                      if (!s)
                        throw new O.SubTransaction(
                          `Table ` + e + ` not included in parent transaction.`,
                        );
                      o = null;
                    }
                  }),
                  s && o && !o.active && (o = null));
              }
            } catch (e) {
              return o
                ? o._promise(null, function (t, n) {
                    n(e);
                  })
                : N(e);
            }
            var c = function e(t, n, r, i, a) {
              return j.resolve().then(function () {
                var o = A.transless || A,
                  s = t._createTransaction(n, r, t._dbSchema, i),
                  o = ((s.explicit = !0), { trans: s, transless: o });
                if (i) s.idbtrans = i.idbtrans;
                else
                  try {
                    (s.create(),
                      (s.idbtrans._explicit = !0),
                      (t._state.PR1398_maxLoop = 3));
                  } catch (i) {
                    return i.name === he.InvalidState &&
                      t.isOpen() &&
                      0 < --t._state.PR1398_maxLoop
                      ? (console.warn(`Dexie: Need to reopen db`),
                        t.close({ disableAutoOpen: !1 }),
                        t.open().then(function () {
                          return e(t, n, r, null, a);
                        }))
                      : N(i);
                  }
                var c,
                  l = le(a),
                  o =
                    (l && ct(),
                    j.follow(function () {
                      var e;
                      (c = a.call(s, s)) &&
                        (l
                          ? ((e = lt.bind(null, null)), c.then(e, e))
                          : typeof c.next == `function` &&
                            typeof c.throw == `function` &&
                            (c = Zn(c)));
                    }, o));
                return (
                  c && typeof c.then == `function`
                    ? j.resolve(c).then(function (e) {
                        return s.active
                          ? e
                          : N(
                              new O.PrematureCommit(
                                `Transaction committed too early. See http://bit.ly/2kdckMn`,
                              ),
                            );
                      })
                    : o.then(function () {
                        return c;
                      })
                )
                  .then(function (e) {
                    return (
                      i && s._resolve(),
                      s._completion.then(function () {
                        return e;
                      })
                    );
                  })
                  .catch(function (e) {
                    return (s._reject(e), N(e));
                  });
              });
            }.bind(null, this, r, i, o, n);
            return o
              ? o._promise(r, c, `lock`)
              : A.trans
                ? mt(A.transless, function () {
                    return a._whenReady(c);
                  })
                : this._whenReady(c);
          }),
          (B.prototype.table = function (e) {
            if (l(this._allTables, e)) return this._allTables[e];
            throw new O.InvalidTable(`Table ${e} does not exist`);
          }));
        var gr = B;
        function B(e, n) {
          var r,
            i,
            a,
            o,
            s,
            c = this,
            l = ((this._middlewares = {}), (this.verno = 0), B.dependencies),
            l =
              ((this._options = n =
                t(
                  {
                    addons: B.addons,
                    autoOpen: !0,
                    indexedDB: l.indexedDB,
                    IDBKeyRange: l.IDBKeyRange,
                    cache: `cloned`,
                    maxConnections: 1e3,
                  },
                  n,
                )),
              (this._deps = {
                indexedDB: n.indexedDB,
                IDBKeyRange: n.IDBKeyRange,
              }),
              n.addons),
            u =
              ((this._dbSchema = {}),
              (this._versions = []),
              (this._storeNames = []),
              (this._allTables = {}),
              (this.idbdb = null),
              (this._novip = this),
              {
                dbOpenError: null,
                isBeingOpened: !1,
                onReadyBeingFired: null,
                openComplete: !1,
                dbReadyResolve: k,
                dbReadyPromise: null,
                cancelOpen: k,
                openCanceller: null,
                autoSchema: !0,
                PR1398_maxLoop: 3,
                autoOpen: n.autoOpen,
              }),
            d =
              ((u.dbReadyPromise = new j(function (e) {
                u.dbReadyResolve = e;
              })),
              (u.openCanceller = new j(function (e, t) {
                u.cancelOpen = t;
              })),
              (this._state = u),
              (this.name = e),
              (this.on = Nt(
                this,
                `populate`,
                `blocked`,
                `versionchange`,
                `close`,
                { ready: [Te, k] },
              )),
              (this.once = function (e, t) {
                var n = function () {
                  var r = [...arguments];
                  (c.on(e).unsubscribe(n), t.apply(c, r));
                };
                return c.on(e, n);
              }),
              (this.on.ready.subscribe = _(
                this.on.ready.subscribe,
                function (e) {
                  return function (t, n) {
                    B.vip(function () {
                      var r,
                        i = c._state;
                      i.openComplete
                        ? (i.dbOpenError || j.resolve().then(t), n && e(t))
                        : i.onReadyBeingFired
                          ? (i.onReadyBeingFired.push(t), n && e(t))
                          : (e(t),
                            (r = c),
                            n ||
                              e(function e() {
                                (r.on.ready.unsubscribe(t),
                                  r.on.ready.unsubscribe(e));
                              }));
                    });
                  };
                },
              )),
              (this.Collection =
                ((r = this),
                Pt(Ht.prototype, function (e, t) {
                  this.db = r;
                  var n = Ct,
                    i = null;
                  if (t)
                    try {
                      n = t();
                    } catch (e) {
                      i = e;
                    }
                  var t = e._ctx,
                    e = t.table,
                    a = e.hook.reading.fire;
                  this._ctx = {
                    table: e,
                    index: t.index,
                    isPrimKey:
                      !t.index ||
                      (e.schema.primKey.keyPath &&
                        t.index === e.schema.primKey.name),
                    range: n,
                    keysOnly: !1,
                    dir: `next`,
                    unique: ``,
                    algorithm: null,
                    filter: null,
                    replayFilter: null,
                    justLimit: !0,
                    isMatch: null,
                    offset: 0,
                    limit: 1 / 0,
                    error: i,
                    or: t.or,
                    valueMapper: a === ve ? null : a,
                  };
                }))),
              (this.Table =
                ((i = this),
                Pt(Mt.prototype, function (e, t, n) {
                  ((this.db = i),
                    (this._tx = n),
                    (this.name = e),
                    (this.schema = t),
                    (this.hook = i._allTables[e]
                      ? i._allTables[e].hook
                      : Nt(null, {
                          creating: [xe, k],
                          reading: [ye, ve],
                          updating: [Ce, k],
                          deleting: [Se, k],
                        })));
                }))),
              (this.Transaction =
                ((a = this),
                Pt(nn.prototype, function (e, t, n, r, i) {
                  var o = this;
                  (e !== `readonly` &&
                    t.forEach(function (e) {
                      ((e = (e = n[e])?.yProps),
                        e &&
                          (t = t.concat(
                            e.map(function (e) {
                              return e.updatesTable;
                            }),
                          )));
                    }),
                    (this.db = a),
                    (this.mode = e),
                    (this.storeNames = t),
                    (this.schema = n),
                    (this.chromeTransactionDurability = r),
                    (this.idbtrans = null),
                    (this.on = Nt(this, `complete`, `error`, `abort`)),
                    (this.parent = i || null),
                    (this.active = !0),
                    (this._reculock = 0),
                    (this._blockedFuncs = []),
                    (this._resolve = null),
                    (this._reject = null),
                    (this._waitingFor = null),
                    (this._waitingQueue = null),
                    (this._spinCount = 0),
                    (this._completion = new j(function (e, t) {
                      ((o._resolve = e), (o._reject = t));
                    })),
                    this._completion.then(
                      function () {
                        ((o.active = !1), o.on.complete.fire());
                      },
                      function (e) {
                        var t = o.active;
                        return (
                          (o.active = !1),
                          o.on.error.fire(e),
                          o.parent
                            ? o.parent._reject(e)
                            : t && o.idbtrans && o.idbtrans.abort(),
                          N(e)
                        );
                      },
                    ));
                }))),
              (this.Version =
                ((o = this),
                Pt(On.prototype, function (e) {
                  ((this.db = o),
                    (this._cfg = {
                      version: e,
                      storesSource: null,
                      dbschema: {},
                      tables: {},
                      contentUpgrade: null,
                    }));
                }))),
              (this.WhereClause =
                ((s = this),
                Pt(Xt.prototype, function (e, t, n) {
                  if (
                    ((this.db = s),
                    (this._ctx = {
                      table: e,
                      index: t === `:id` ? null : t,
                      or: n,
                    }),
                    (this._cmp = this._ascending = F),
                    (this._descending = function (e, t) {
                      return F(t, e);
                    }),
                    (this._max = function (e, t) {
                      return 0 < F(e, t) ? e : t;
                    }),
                    (this._min = function (e, t) {
                      return F(e, t) < 0 ? e : t;
                    }),
                    (this._IDBKeyRange = s._deps.IDBKeyRange),
                    !this._IDBKeyRange)
                  )
                    throw new O.MissingAPI();
                }))),
              this.on(`versionchange`, function (e) {
                (0 < e.newVersion
                  ? console.warn(
                      `Another connection wants to upgrade database '${c.name}'. Closing db now to resume the upgrade.`,
                    )
                  : console.warn(
                      `Another connection wants to delete database '${c.name}'. Closing db now to resume the delete request.`,
                    ),
                  c.close({ disableAutoOpen: !1 }));
              }),
              this.on(`blocked`, function (e) {
                !e.newVersion || e.newVersion < e.oldVersion
                  ? console.warn(`Dexie.delete('${c.name}') was blocked`)
                  : console.warn(
                      `Upgrade '${c.name}' blocked by other connection holding version ${e.oldVersion / 10}`,
                    );
              }),
              (this._maxKey = cn(n.IDBKeyRange)),
              (this._createTransaction = function (e, t, n, r) {
                return new c.Transaction(
                  e,
                  t,
                  n,
                  c._options.chromeTransactionDurability,
                  r,
                );
              }),
              (this._fireOnBlocked = function (e) {
                (c.on(`blocked`).fire(e),
                  An.toArray()
                    .filter(function (e) {
                      return e.name === c.name && e !== c && !e._state.vcFired;
                    })
                    .map(function (t) {
                      return t.on(`versionchange`).fire(e);
                    }));
              }),
              this.use(ir),
              this.use(mr),
              this.use(sr),
              this.use($n),
              this.use(nr),
              new Proxy(this, {
                get: function (e, t, n) {
                  var r;
                  return (
                    t === `_vip` ||
                    (t === `table`
                      ? function (e) {
                          return hr(c.table(e), d);
                        }
                      : (r = Reflect.get(e, t, n)) instanceof Mt
                        ? hr(r, d)
                        : t === `tables`
                          ? r.map(function (e) {
                              return hr(e, d);
                            })
                          : t === `_createTransaction`
                            ? function () {
                                return hr(r.apply(this, arguments), d);
                              }
                            : r)
                  );
                },
              }));
          ((this.vip = d),
            l.forEach(function (e) {
              return e(c);
            }));
        }
        var _r,
          je =
            typeof Symbol < `u` && `observable` in Symbol
              ? Symbol.observable
              : `@@observable`,
          vr =
            ((yr.prototype.subscribe = function (e, t, n) {
              return this._subscribe(
                e && typeof e != `function`
                  ? e
                  : { next: e, error: t, complete: n },
              );
            }),
            (yr.prototype[je] = function () {
              return this;
            }),
            yr);
        function yr(e) {
          this._subscribe = e;
        }
        try {
          _r = {
            indexedDB:
              r.indexedDB ||
              r.mozIndexedDB ||
              r.webkitIndexedDB ||
              r.msIndexedDB,
            IDBKeyRange: r.IDBKeyRange || r.webkitIDBKeyRange,
          };
        } catch {
          _r = { indexedDB: null, IDBKeyRange: null };
        }
        function br(e) {
          var t,
            n = !1,
            r = new vr(function (r) {
              var i = le(e),
                a,
                o = !1,
                s = {},
                c = {},
                l = {
                  get closed() {
                    return o;
                  },
                  unsubscribe: function () {
                    o ||
                      ((o = !0),
                      a && a.abort(),
                      u && tn.storagemutated.unsubscribe(p));
                  },
                },
                u = (r.start && r.start(l), !1),
                d = function () {
                  return gt(m);
                };
              function f() {
                return Un(c, s);
              }
              var p = function (e) {
                  (Hn(s, e), f() && d());
                },
                m = function () {
                  var l, m, h;
                  !o &&
                    _r.indexedDB &&
                    ((s = {}),
                    (l = {}),
                    a && a.abort(),
                    (a = new AbortController()),
                    (h = ((t) => {
                      var n = Ze();
                      try {
                        i && ct();
                        var r = st(e, t);
                        return (r = i ? r.finally(lt) : r);
                      } finally {
                        n && Qe();
                      }
                    })(
                      (m = {
                        subscr: l,
                        signal: a.signal,
                        requery: d,
                        querier: e,
                        trans: null,
                      }),
                    )),
                    (u ||= (tn.storagemutated.subscribe(p), !0)),
                    Promise.resolve(h).then(
                      function (e) {
                        ((n = !0),
                          (t = e),
                          o ||
                            m.signal.aborted ||
                            (f() || ((c = l), f())
                              ? d()
                              : ((s = {}),
                                gt(function () {
                                  return !o && r.next && r.next(e);
                                }))));
                      },
                      function (e) {
                        ((n = !1),
                          [`DatabaseClosedError`, `AbortError`].includes(
                            e?.name,
                          ) ||
                            o ||
                            gt(function () {
                              o || (r.error && r.error(e));
                            }));
                      },
                    ));
                };
              return (setTimeout(d, 0), l);
            });
          return (
            (r.hasValue = function () {
              return n;
            }),
            (r.getValue = function () {
              return t;
            }),
            r
          );
        }
        var xr = gr;
        function Sr(e) {
          var t = wr;
          try {
            ((wr = !0), tn.storagemutated.fire(e), Jn(e, !0));
          } finally {
            wr = t;
          }
        }
        (u(
          xr,
          t(t({}, T), {
            delete: function (e) {
              return new xr(e, { addons: [] }).delete();
            },
            exists: function (e) {
              return new xr(e, { addons: [] })
                .open()
                .then(function (e) {
                  return (e.close(), !0);
                })
                .catch(`NoSuchDatabaseError`, function () {
                  return !1;
                });
            },
            getDatabaseNames: function (e) {
              try {
                return (
                  (t = xr.dependencies),
                  (n = t.indexedDB),
                  (t = t.IDBKeyRange),
                  (Mn(n)
                    ? Promise.resolve(n.databases()).then(function (e) {
                        return e
                          .map(function (e) {
                            return e.name;
                          })
                          .filter(function (e) {
                            return e !== bt;
                          });
                      })
                    : jn(n, t).toCollection().primaryKeys()
                  ).then(e)
                );
              } catch {
                return N(new O.MissingAPI());
              }
              var t, n;
            },
            defineClass: function () {
              return function (e) {
                o(this, e);
              };
            },
            ignoreTransaction: function (e) {
              return A.trans ? mt(A.transless || Be, e) : e();
            },
            vip: Nn,
            async: function (e) {
              return function () {
                try {
                  var t = Zn(e.apply(this, arguments));
                  return t && typeof t.then == `function` ? t : j.resolve(t);
                } catch (e) {
                  return N(e);
                }
              };
            },
            spawn: function (e, t, n) {
              try {
                var r = Zn(e.apply(n, t || []));
                return r && typeof r.then == `function` ? r : j.resolve(r);
              } catch (e) {
                return N(e);
              }
            },
            currentTransaction: {
              get: function () {
                return A.trans || null;
              },
            },
            waitFor: function (e, t) {
              return (
                (e = j
                  .resolve(typeof e == `function` ? xr.ignoreTransaction(e) : e)
                  .timeout(t || 6e4)),
                A.trans ? A.trans.waitFor(e) : e
              );
            },
            Promise: j,
            debug: {
              get: function () {
                return Ee;
              },
              set: function (e) {
                De(e);
              },
            },
            derive: p,
            extend: o,
            props: u,
            override: _,
            Events: Nt,
            on: tn,
            liveQuery: br,
            extendObservabilitySet: Hn,
            getByKeyPath: b,
            setByKeyPath: x,
            delByKeyPath: function (e, t) {
              typeof t == `string`
                ? x(e, t, void 0)
                : `length` in t &&
                  [].map.call(t, function (t) {
                    x(e, t, void 0);
                  });
            },
            shallowClone: S,
            deepClone: ne,
            getObjectDiff: er,
            cmp: F,
            asap: y,
            minKey: -1 / 0,
            addons: [],
            connections: { get: An.toArray },
            errnames: he,
            dependencies: _r,
            cache: Wn,
            semVer: `4.4.4`,
            version: `4.4.4`
              .split(`.`)
              .map(function (e) {
                return parseInt(e);
              })
              .reduce(function (e, t, n) {
                return e + t / 10 ** (2 * n);
              }),
          }),
        ),
          (xr.maxKey = cn(xr.dependencies.IDBKeyRange)),
          typeof dispatchEvent < `u` &&
            typeof addEventListener < `u` &&
            (tn($t, function (e) {
              wr ||=
                ((e = new CustomEvent(en, { detail: e })),
                (wr = !0),
                dispatchEvent(e),
                !1);
            }),
            addEventListener(en, function (e) {
              ((e = e.detail), wr || Sr(e));
            })));
        var Cr,
          wr = !1,
          Tr = function () {};
        return (
          typeof BroadcastChannel < `u` &&
            ((Tr = function () {
              (Cr = new BroadcastChannel(en)).onmessage = function (e) {
                return e.data && Sr(e.data);
              };
            })(),
            typeof Cr.unref == `function` && Cr.unref(),
            tn($t, function (e) {
              wr || Cr.postMessage(e);
            })),
          typeof addEventListener < `u` &&
            (addEventListener(`pagehide`, function (e) {
              if (!gr.disableBfCache && e.persisted) {
                (Ee && console.debug(`Dexie: handling persisted pagehide`),
                  Cr?.close());
                for (var t = 0, n = An.toArray(); t < n.length; t++)
                  n[t].close({ disableAutoOpen: !1 });
              }
            }),
            addEventListener(`pageshow`, function (e) {
              !gr.disableBfCache &&
                e.persisted &&
                (Ee && console.debug(`Dexie: handling persisted pageshow`),
                Tr(),
                Sr({ all: new Fn(-1 / 0, [[]]) }));
            })),
          (j.rejectionMapper = function (e, t) {
            return !e ||
              e instanceof de ||
              e instanceof TypeError ||
              e instanceof SyntaxError ||
              !e.name ||
              !_e[e.name]
              ? e
              : ((t = new _e[e.name](t || e.message, e)),
                `stack` in e &&
                  f(t, `stack`, {
                    get: function () {
                      return this.inner.stack;
                    },
                  }),
                t);
          }),
          De(Ee),
          t(
            gr,
            Object.freeze({
              __proto__: null,
              DEFAULT_MAX_CONNECTIONS: 1e3,
              Dexie: gr,
              Entity: Tt,
              PropModification: kt,
              RangeSet: Fn,
              add: function (e) {
                return new kt({ add: e });
              },
              cmp: F,
              default: gr,
              liveQuery: br,
              mergeRanges: Ln,
              rangesOverlap: Rn,
              remove: function (e) {
                return new kt({ remove: e });
              },
              replacePrefix: function (e, t) {
                return new kt({ replacePrefix: [e, t] });
              },
            }),
            { default: gr },
          ),
          gr
        );
      });
    })(),
    1,
  ),
  Fa = Symbol.for(`Dexie`),
  Ia = globalThis[Fa] || (globalThis[Fa] = Pa.default);
if (Pa.default.semVer !== Ia.semVer)
  throw Error(
    `Two different versions of Dexie loaded in the same app: ${Pa.default.semVer} and ${Ia.semVer}`,
  );
var {
    liveQuery: La,
    mergeRanges: Ra,
    rangesOverlap: za,
    RangeSet: Ba,
    cmp: Va,
    Entity: Ha,
    PropModification: Ua,
    replacePrefix: Wa,
    add: Ga,
    remove: Ka,
    DexieYProvider: qa,
  } = Ia,
  Y = new (class extends Ia {
    tasks;
    thread;
    reminderOccurrences;
    settings;
    constructor() {
      (super(`workdeck-lite`),
        this.version(3).stores({
          tasks: `id,status,dueAt,completedAt,order,*tags,inMyDay`,
          comments: `id,taskId,createdAt`,
          reminders: `id,taskId,remindAt,fired`,
          settings: `key`,
        }),
        this.version(4)
          .stores({
            tasks: `id,status,dueAt,completedAt,order,*tags,inMyDay`,
            comments: `id,taskId,createdAt`,
            reminders: `id,taskId,remindAt,fired`,
            reminderOccurrences: `id,taskId,remindAt,fired,[fired+remindAt],[taskId+remindAt]`,
            settings: `key`,
          })
          .upgrade(async (e) => {
            let t = await e.table(`reminders`).toArray(),
              n = new Set(await e.table(`tasks`).toCollection().primaryKeys()),
              r = new Map();
            for (let e of t) {
              if (!n.has(e.taskId)) continue;
              let t = r.get(e.taskId);
              t ? t.push(e) : r.set(e.taskId, [e]);
            }
            (await e
              .table(`reminderOccurrences`)
              .bulkAdd(
                [...r.values()]
                  .flat()
                  .map((e) => ({
                    id: e.id,
                    taskId: e.taskId,
                    remindAt: e.remindAt,
                    seq: 1,
                    total: 1,
                    fired: e.fired,
                  })),
              ),
              await e
                .table(`tasks`)
                .toCollection()
                .modify((e) => {
                  let t = r.get(e.id);
                  e.reminderPolicy =
                    t?.length === 1
                      ? { kind: `at`, at: t[0].remindAt }
                      : { kind: `none` };
                }));
          }),
        this.version(5).stores({ reminders: null }),
        this.version(6)
          .stores({
            tasks: `id,status,dueAt,completedAt,order,*tags,inMyDay`,
            comments: `id,taskId,createdAt`,
            thread: `id,taskId,createdAt,kind,[taskId+createdAt],[taskId+kind]`,
            reminderOccurrences: `id,taskId,remindAt,fired,[fired+remindAt],[taskId+remindAt]`,
            settings: `key`,
          })
          .upgrade(async (e) => {
            let t = await e.table(`comments`).toArray(),
              n = new Set(await e.table(`tasks`).toCollection().primaryKeys());
            await e
              .table(`thread`)
              .bulkAdd(
                t
                  .filter((e) => n.has(e.taskId))
                  .map((e) => ({
                    id: e.id,
                    taskId: e.taskId,
                    createdAt: e.createdAt,
                    kind: `comment`,
                    body: e.body,
                  })),
              );
          }),
        this.version(7).stores({ comments: null }));
    }
  })();
function Ja(e) {
  return Y.thread
    .where(`[taskId+createdAt]`)
    .between([e, -1 / 0], [e, 1 / 0])
    .toArray();
}
function Ya(e) {
  return Y.thread.add(e);
}
function Xa(e) {
  return Y.thread.bulkAdd(e);
}
async function Za(e, t) {
  let n = t.trim();
  n &&
    (await Ya({
      id: crypto.randomUUID(),
      taskId: e,
      createdAt: Date.now(),
      kind: `comment`,
      body: n,
    }));
}
async function Qa(e, t, n, r = Date.now()) {
  await Ya({
    id: crypto.randomUUID(),
    taskId: e,
    createdAt: r,
    kind: `event`,
    event: t,
    detail: n,
  });
}
async function $a() {
  let e = new Map();
  return (
    await Y.thread
      .where(`kind`)
      .equals(`comment`)
      .each((t) => {
        e.set(t.taskId, (e.get(t.taskId) ?? 0) + 1);
      }),
    e
  );
}
function eo(e) {
  return `status changed to ${e}`;
}
function to(e) {
  return e === `none` ? `priority cleared` : `priority changed to ${e}`;
}
function no(e) {
  if (e == null) return `due date cleared`;
  let t = Yr(e, `HH:mm`);
  return Qr(e)
    ? `due date moved to today ${t}`
    : $r(e)
      ? `due date moved to tomorrow ${t}`
      : ti(e)
        ? `due date moved to yesterday ${t}`
        : `due date moved to ${Yr(e, `d MMM`)} ${t}`;
}
function ro(e, t) {
  return `reminder ${e} of ${t} sent`;
}
function io(e) {
  let t = [];
  for (let n of e) {
    let e = t.at(-1);
    e && sr(e.day, n.createdAt)
      ? e.entries.push(n)
      : t.push({ day: n.createdAt, entries: [n] });
  }
  return t;
}
var ao = { none: `None`, low: `Low`, medium: `Medium`, high: `High` };
function oo(e, t) {
  let n = [
      `- Status: ${e.status}`,
      `- Priority: ${ao[e.priority]}`,
      e.dueAt != null && `- Due: ${Yr(e.dueAt, `EEE d MMM yyyy, HH:mm`)}`,
      e.estimatedMinutes != null && `- Estimate: ${e.estimatedMinutes} min`,
      e.tags.length > 0 && `- Tags: ${e.tags.join(`, `)}`,
      `- Created: ${Yr(e.createdAt, `d MMM yyyy`)}`,
    ].filter((e) => typeof e == `string`),
    r = [`# ${e.title}`, ``, ...n];
  if (
    (e.description.trim() !== `` &&
      r.push(``, `## Description`, ``, e.description.trim()),
    r.push(``, `## Thread`),
    t.length === 0)
  )
    r.push(``, `Nothing recorded.`);
  else
    for (let { day: e, entries: n } of io(t)) {
      r.push(``, `### ${Yr(e, `EEE d MMM yyyy`)}`, ``);
      for (let e of n) {
        let t =
          e.kind === `comment`
            ? e.body.replace(/\s*\n\s*/g, ` `).trim()
            : e.detail;
        r.push(`- ${Yr(e.createdAt, `HH:mm`)} — ${t}`);
      }
    }
  return `${r.join(`
`)}\n`;
}
async function so(e, t) {
  await Y.tasks.update(e, { ...t, updatedAt: Date.now() });
}
async function co(e) {
  let t = Date.now(),
    n = crypto.randomUUID(),
    r = {
      id: n,
      title: e.title,
      description: ``,
      status: `open`,
      priority: e.priority ?? `none`,
      dueAt: e.dueAt,
      tags: e.tags ?? [],
      inMyDay: e.inMyDay ?? !1,
      estimatedMinutes: e.estimatedMinutes,
      reminderPolicy: e.reminderPolicy ?? { kind: `none` },
      createdAt: t,
      updatedAt: t,
      order: t,
    };
  return (
    await Y.transaction(`rw`, [Y.tasks, Y.reminderOccurrences], async () => {
      (await Y.tasks.add(r),
        r.reminderPolicy.kind !== `none` &&
          (await Y.reminderOccurrences.bulkAdd(
            ha(r, r.reminderPolicy, { now: t }),
          )));
    }),
    n
  );
}
async function lo(e, t) {
  let n = await Y.tasks.get(e);
  !n ||
    n.status === t ||
    (await so(e, {
      status: t,
      completedAt: t === `completed` ? Date.now() : void 0,
    }),
    await Qa(e, `status`, eo(t)));
}
async function uo(e, t) {
  let n = await Y.tasks.get(e);
  !n ||
    n.priority === t ||
    (await so(e, { priority: t }), await Qa(e, `priority`, to(t)));
}
async function fo(e) {
  await lo(e.id, e.status === `completed` ? `open` : `completed`);
}
async function po(e, t) {
  await so(e, { inMyDay: t });
}
async function mo(e, t) {
  let n = t.trim().replace(/^#/, ``).toLowerCase();
  if (!n) return;
  let r = await Y.tasks.get(e);
  !r || r.tags.includes(n) || (await so(e, { tags: [...r.tags, n] }));
}
async function X(e, t) {
  let n = await Y.tasks.get(e);
  n && (await so(e, { tags: n.tags.filter((e) => e !== t) }));
}
async function ho(e, t) {
  await Y.transaction(`rw`, Y.tasks, async () => {
    let [n, r] = await Promise.all([Y.tasks.get(e), Y.tasks.get(t)]);
    if (!n || !r) return;
    let i = Date.now();
    (await Y.tasks.update(n.id, { order: r.order, updatedAt: i }),
      await Y.tasks.update(r.id, { order: n.order, updatedAt: i }));
  });
}
async function go(e) {
  return Y.transaction(
    `rw`,
    [Y.tasks, Y.thread, Y.reminderOccurrences],
    async () => {
      let t = await Y.tasks.get(e);
      if (!t) throw Error(`Task not found.`);
      let n = await Y.thread.where(`taskId`).equals(e).toArray(),
        r = await Y.reminderOccurrences.where(`taskId`).equals(e).toArray();
      return (
        await Y.thread.where(`taskId`).equals(e).delete(),
        await Y.reminderOccurrences.where(`taskId`).equals(e).delete(),
        await Y.tasks.delete(e),
        { task: t, thread: n, occurrences: r }
      );
    },
  );
}
async function _o(e) {
  await Y.transaction(
    `rw`,
    [Y.tasks, Y.thread, Y.reminderOccurrences],
    async () => {
      (await Y.tasks.add(e.task),
        await Xa(e.thread),
        await Y.reminderOccurrences.bulkAdd(e.occurrences));
    },
  );
}
var vo = `Fix SSO redirect !high tomorrow 5pm #incident ~30m`,
  yo = {
    priority: `text-token-priority`,
    due: `text-token-due`,
    tag: `text-token-tag`,
    estimate: `text-token-estimate`,
    reminder: `text-token-reminder`,
  },
  bo = {
    priority: `--token-priority-bg`,
    due: `--token-due-bg`,
    tag: `--token-tag-bg`,
    estimate: `--token-estimate-bg`,
    reminder: `--token-reminder-bg`,
  },
  Z = {
    high: `var(--priority-high)`,
    medium: `var(--priority-medium)`,
    low: `var(--priority-low)`,
    none: `var(--text-muted)`,
  },
  xo = { none: `None`, low: `Low`, medium: `Medium`, high: `High` },
  So = `px-0 py-0 text-title tracking-normal whitespace-pre`;
function Co(e, t) {
  let n = [],
    r = 0;
  for (let i of t.tokens)
    (i.start > r && n.push({ text: e.slice(r, i.start) }),
      n.push({ text: e.slice(i.start, i.end), type: i.type }),
      (r = i.end));
  return (r < e.length && n.push({ text: e.slice(r) }), n);
}
function wo(e) {
  switch (e.kind) {
    case `escalating`:
      return `Escalating, ${e.count} before due`;
    case `every`:
      return `Every ${ya(e.interval)} until due`;
    case `offsets`:
      return `${e.before.map(ya).join(`, `)} before due`;
    case `at`:
      return `Once at ${Yr(e.at, `d MMM, HH:mm`)}`;
    case `none`:
      return `None`;
  }
}
var To = (0, d.forwardRef)(function (e, t) {
  let [n, r] = (0, d.useState)(``),
    i = (0, d.useRef)(null),
    a = Ma(n),
    o = a.tokens.length > 0,
    s = () => {
      a.title &&
        (co({
          title: a.title,
          priority: a.priority,
          tags: a.tags,
          dueAt: a.dueAt,
          estimatedMinutes: a.estimatedMinutes,
          reminderPolicy: a.policy,
        }),
        r(``));
    };
  return (0, K.jsxs)(`div`, {
    children: [
      (0, K.jsxs)(`form`, {
        onSubmit: (e) => {
          (e.preventDefault(), s());
        },
        className: `flex items-center gap-2 border border-line bg-surface-2 px-3 py-2 focus-within:border-line-strong`,
        children: [
          (0, K.jsx)(Ni, {
            size: 16,
            className: `shrink-0 text-ink-muted`,
            "aria-hidden": `true`,
          }),
          (0, K.jsxs)(`div`, {
            className: `relative min-w-0 flex-1`,
            children: [
              (0, K.jsx)(`div`, {
                ref: i,
                "aria-hidden": `true`,
                className: `pointer-events-none absolute inset-0 overflow-hidden text-ink ${So}`,
                children: Co(n, a).map((e, t) =>
                  (0, K.jsx)(
                    `span`,
                    {
                      className: e.type ? yo[e.type] : void 0,
                      style: e.type
                        ? {
                            boxShadow: `0 0 0 2px var(${bo[e.type]})`,
                            background: `var(${bo[e.type]})`,
                            borderRadius: `2px`,
                          }
                        : void 0,
                      children: e.text,
                    },
                    t,
                  ),
                ),
              }),
              (0, K.jsx)(`input`, {
                ref: t,
                value: n,
                onChange: (e) => r(e.target.value),
                onScroll: (e) => {
                  i.current &&
                    (i.current.scrollLeft = e.currentTarget.scrollLeft);
                },
                className: `relative w-full bg-transparent text-transparent caret-ink outline-none placeholder:text-ink-muted ${So}`,
                placeholder: vo,
                "aria-label": `Add task`,
                spellCheck: !1,
              }),
            ],
          }),
        ],
      }),
      o && (0, K.jsx)(Eo, { parsed: a }),
    ],
  });
});
function Eo({ parsed: e }) {
  return (0, K.jsxs)(`div`, {
    className: `mt-2`,
    children: [
      (0, K.jsxs)(`p`, {
        className: `flex items-center gap-1 text-meta text-ink-muted`,
        children: [
          (0, K.jsx)(fi, { size: 12, "aria-hidden": `true` }),
          `Parsed`,
        ],
      }),
      (0, K.jsxs)(`dl`, {
        className: `mt-1.5 grid grid-cols-[92px_1fr] gap-x-3 gap-y-2 rounded border border-line bg-surface-1 p-3`,
        children: [
          (0, K.jsx)(Do, {
            label: `Title`,
            children: (0, K.jsx)(`span`, {
              className: `text-title text-ink`,
              children:
                e.title ||
                (0, K.jsx)(`span`, {
                  className: `text-ink-muted`,
                  children: `Nothing yet`,
                }),
            }),
          }),
          e.priority &&
            (0, K.jsx)(Do, {
              label: `Priority`,
              children: (0, K.jsxs)(`span`, {
                className: `flex items-center gap-1.5 text-title text-ink`,
                children: [
                  (0, K.jsx)(`span`, {
                    "aria-hidden": `true`,
                    className: `h-[7px] w-[7px] rounded-full`,
                    style: { background: Z[e.priority] },
                  }),
                  xo[e.priority],
                ],
              }),
            }),
          e.dueAt != null &&
            (0, K.jsx)(Do, {
              label: `Due`,
              children: (0, K.jsx)(`span`, {
                className: `text-title text-ink`,
                children: Yr(e.dueAt, `EEE d MMM, HH:mm`),
              }),
            }),
          e.tags.length > 0 &&
            (0, K.jsx)(Do, {
              label: e.tags.length === 1 ? `Tag` : `Tags`,
              children: (0, K.jsx)(`span`, {
                className: `flex flex-wrap items-center gap-2`,
                children: e.tags.map((e) =>
                  (0, K.jsx)(
                    `span`,
                    {
                      className: `text-title`,
                      style: { color: Wi(e) },
                      children: e,
                    },
                    e,
                  ),
                ),
              }),
            }),
          e.estimatedMinutes != null &&
            (0, K.jsx)(Do, {
              label: `Estimate`,
              children: (0, K.jsx)(`span`, {
                className: `text-title text-ink`,
                children: Na(e.estimatedMinutes),
              }),
            }),
          e.policy &&
            (0, K.jsx)(Do, {
              label: `Reminders`,
              children: (0, K.jsx)(Oo, { policy: e.policy, dueAt: e.dueAt }),
            }),
        ],
      }),
      (0, K.jsx)(Ao, {}),
    ],
  });
}
function Do({ label: e, children: t }) {
  return (0, K.jsxs)(K.Fragment, {
    children: [
      (0, K.jsx)(`dt`, { className: `text-title text-ink-muted`, children: e }),
      (0, K.jsx)(`dd`, { className: `min-w-0`, children: t }),
    ],
  });
}
function Oo({ policy: e, dueAt: t }) {
  let n = t == null && fa(e.kind),
    r = 0,
    i = n
      ? []
      : ha({ id: `preview`, dueAt: t }, e, {
          newId: () => `preview-${r++}`,
        }).map((e) => Yr(e.remindAt, `HH:mm`));
  return (0, K.jsxs)(`div`, {
    className: `min-w-0`,
    children: [
      (0, K.jsx)(`span`, { className: `text-title text-ink`, children: wo(e) }),
      n
        ? (0, K.jsx)(`span`, {
            className: `mt-0.5 block text-meta text-ink-muted`,
            children: `Add a due date and these will schedule.`,
          })
        : i.length > 0 &&
          (0, K.jsx)(`span`, {
            className: `mt-0.5 block truncate font-mono text-meta text-ink-muted`,
            children: i.join(` · `),
          }),
    ],
  });
}
var ko = [
  { tokens: `!low !med !high`, label: `priority`, type: `priority` },
  { tokens: `#tag`, label: `tag`, type: `tag` },
  { tokens: `~30m ~2h`, label: `estimate`, type: `estimate` },
  { tokens: `@every2h @escalate6`, label: `reminders`, type: `reminder` },
  { tokens: `tomorrow 5pm`, label: `due`, type: `due` },
];
function Ao() {
  return (0, K.jsx)(`p`, {
    className: `mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-meta`,
    children: ko.map((e) =>
      (0, K.jsxs)(
        `span`,
        {
          className: `flex items-center gap-1.5`,
          children: [
            (0, K.jsx)(`span`, {
              className: `font-mono ${yo[e.type]}`,
              children: e.tokens,
            }),
            (0, K.jsx)(`span`, {
              className: `text-ink-muted`,
              children: e.label,
            }),
          ],
        },
        e.label,
      ),
    ),
  });
}
function jo({
  title: e,
  header: t,
  scroll: n = !0,
  wide: r = !1,
  onClose: i,
  children: a,
}) {
  return (0, K.jsxs)(K.Fragment, {
    children: [
      (0, K.jsx)(`div`, {
        "aria-hidden": `true`,
        onClick: i,
        className: `fixed inset-0 z-30 bg-black/40 md:hidden`,
      }),
      (0, K.jsxs)(`section`, {
        "aria-label": e,
        className: `fixed inset-x-0 bottom-0 z-40 flex h-[92vh] flex-col border-t border-line bg-surface-2 md:inset-y-0 md:left-auto md:right-0 md:h-full md:border-l md:border-t-0 ${r ? `md:w-[var(--drawer-w)]` : `md:w-drawer`}`,
        children: [
          (0, K.jsxs)(`header`, {
            className: `flex shrink-0 items-start gap-2 border-b border-line px-4 py-3`,
            children: [
              t ?? (0, K.jsx)(`h2`, { className: `text-heading`, children: e }),
              (0, K.jsx)(`button`, {
                type: `button`,
                "aria-label": `Close ${e.toLowerCase()}`,
                onClick: i,
                className: `-mr-1 ml-auto shrink-0 rounded p-1 text-ink-muted hover:text-ink`,
                children: (0, K.jsx)(Hi, { size: 18, "aria-hidden": `true` }),
              }),
            ],
          }),
          (0, K.jsx)(`div`, {
            className: `flex min-h-0 flex-1 flex-col ${n ? `overflow-y-auto` : `overflow-hidden`}`,
            children: a,
          }),
        ],
      }),
    ],
  });
}
var Mo = [
  {
    value: `merge`,
    label: `Merge into this browser`,
    hint: `Keeps tasks that are only here. A task in both is overwritten by the backup.`,
  },
  {
    value: `replace`,
    label: `Replace everything`,
    hint: `Deletes all tasks, threads, reminders, and settings in this browser first.`,
  },
];
function No({
  fileName: e,
  summary: t,
  mode: n,
  busy: r,
  error: i,
  onModeChange: a,
  onCancel: o,
  onConfirm: s,
}) {
  return (0, K.jsx)(`div`, {
    className: `fixed inset-0 z-50 grid place-items-center bg-black/40 p-4`,
    onMouseDown: (e) => {
      e.target === e.currentTarget && o();
    },
    children: (0, K.jsxs)(`section`, {
      role: `dialog`,
      "aria-modal": `true`,
      "aria-labelledby": `import-title`,
      className: `w-full max-w-sm rounded border border-line bg-surface-2 p-4`,
      onMouseDown: (e) => e.stopPropagation(),
      children: [
        (0, K.jsxs)(`div`, {
          className: `flex items-start justify-between gap-3`,
          children: [
            (0, K.jsx)(`h2`, {
              id: `import-title`,
              className: `text-heading`,
              children: `Import backup?`,
            }),
            (0, K.jsx)(`button`, {
              type: `button`,
              "aria-label": `Close import confirmation`,
              onClick: o,
              className: `text-ink-muted hover:text-ink`,
              children: (0, K.jsx)(Hi, { size: 18, "aria-hidden": `true` }),
            }),
          ],
        }),
        (0, K.jsxs)(`p`, {
          className: `mt-2 text-body text-ink-secondary`,
          children: [
            e,
            t &&
              ` holds ${t.tasks} tasks, ${t.thread} thread entries, and ${t.reminders} reminders.`,
          ],
        }),
        (0, K.jsxs)(`fieldset`, {
          className: `mt-3 space-y-2`,
          children: [
            (0, K.jsx)(`legend`, {
              className: `sr-only`,
              children: `Import mode`,
            }),
            Mo.map((e) =>
              (0, K.jsxs)(
                `label`,
                {
                  className: `flex gap-2 rounded border border-line p-2`,
                  children: [
                    (0, K.jsx)(`input`, {
                      type: `radio`,
                      name: `import-mode`,
                      value: e.value,
                      checked: n === e.value,
                      onChange: () => a(e.value),
                      className: `mt-0.5 accent-[var(--accent)]`,
                    }),
                    (0, K.jsxs)(`span`, {
                      children: [
                        (0, K.jsx)(`span`, {
                          className: `block text-title text-ink`,
                          children: e.label,
                        }),
                        (0, K.jsx)(`span`, {
                          className: `block text-meta text-ink-muted`,
                          children: e.hint,
                        }),
                      ],
                    }),
                  ],
                },
                e.value,
              ),
            ),
          ],
        }),
        n === `replace` &&
          (0, K.jsx)(`p`, {
            role: `alert`,
            className: `mt-3 text-meta text-danger`,
            children: `Replace cannot be undone. Export first if this browser holds anything the backup does not.`,
          }),
        i &&
          (0, K.jsx)(`p`, {
            role: `alert`,
            className: `mt-3 text-meta text-danger`,
            children: i,
          }),
        (0, K.jsxs)(`div`, {
          className: `mt-4 flex justify-end gap-2`,
          children: [
            (0, K.jsx)(`button`, {
              type: `button`,
              onClick: o,
              className: `rounded border border-line px-3 py-1.5 text-title text-ink-secondary`,
              children: `Cancel`,
            }),
            (0, K.jsx)(`button`, {
              type: `button`,
              disabled: r,
              onClick: s,
              className: `rounded px-3 py-1.5 text-title font-medium text-white disabled:opacity-50 ${n === `replace` ? `bg-danger` : `bg-accent`}`,
              children: n === `replace` ? `Replace data` : `Merge data`,
            }),
          ],
        }),
      ],
    }),
  });
}
function Po(e) {
  return typeof e == `object` && !!e;
}
var Fo = [3, 4, 5];
function Io(e) {
  if (!Po(e) || typeof e.version != `number` || !Fo.includes(e.version))
    throw Error(`This is not a supported WorkDeck Lite backup.`);
  for (let t of [`tasks`, `reminders`, `settings`])
    if (!Array.isArray(e[t]))
      throw Error(`The backup contains invalid ${t} data.`);
  if (!Array.isArray(e.thread) && !Array.isArray(e.comments))
    throw Error(`The backup contains invalid thread data.`);
}
function Lo(e) {
  return {
    tasks: e.tasks.map((e) => ({
      ...e,
      reminderPolicy: e.reminderPolicy ?? { kind: `none` },
    })),
    occurrences: e.reminders.map((e) => ({
      id: e.id,
      taskId: e.taskId,
      remindAt: e.remindAt,
      seq: e.seq ?? 1,
      total: e.total ?? 1,
      fired: e.fired ?? 0,
    })),
    thread: (e.thread ?? e.comments ?? []).map((e) => ({
      ...e,
      kind: e.kind ?? `comment`,
    })),
  };
}
async function Ro(e) {
  let t = JSON.parse(await e.text());
  Io(t);
  let { thread: n } = Lo(t);
  return {
    mode: `merge`,
    tasks: t.tasks.length,
    thread: n.length,
    reminders: t.reminders.length,
    settings: t.settings.length,
  };
}
async function zo() {
  let e = {
      version: 5,
      exportedAt: Date.now(),
      tasks: await Y.tasks.toArray(),
      thread: await Y.thread.toArray(),
      reminders: await Y.reminderOccurrences.toArray(),
      settings: await Y.settings.toArray(),
    },
    t = URL.createObjectURL(
      new Blob([JSON.stringify(e, null, 2)], { type: `application/json` }),
    ),
    n = document.createElement(`a`);
  ((n.href = t),
    (n.download = `workdeck-backup-${new Date().toISOString().slice(0, 10)}.json`),
    n.click(),
    URL.revokeObjectURL(t),
    await Y.settings.put({ key: `lastExportAt`, value: Date.now() }));
}
async function Bo(e, t) {
  let n = JSON.parse(await e.text());
  Io(n);
  let { tasks: r, occurrences: i, thread: a } = Lo(n);
  return (
    await Y.transaction(
      `rw`,
      [Y.tasks, Y.thread, Y.reminderOccurrences, Y.settings],
      async () => {
        (t === `replace` &&
          (await Promise.all([
            Y.tasks.clear(),
            Y.thread.clear(),
            Y.reminderOccurrences.clear(),
            Y.settings.clear(),
          ])),
          await Y.tasks.bulkPut(r),
          await Y.thread.bulkPut(a),
          await Y.reminderOccurrences.bulkPut(i),
          await Y.settings.bulkPut(n.settings));
      },
    ),
    {
      mode: t,
      tasks: n.tasks.length,
      thread: a.length,
      reminders: n.reminders.length,
      settings: n.settings.length,
    }
  );
}
var Vo = `flex w-full items-center gap-2 rounded border border-line px-3 py-2 text-left text-title text-ink hover:bg-surface-1 disabled:opacity-50`;
function Ho() {
  let e = (0, d.useRef)(null),
    [t, n] = (0, d.useState)(),
    [r, i] = (0, d.useState)(),
    [a, o] = (0, d.useState)(`merge`),
    [s, c] = (0, d.useState)(),
    [l, u] = (0, d.useState)(!1);
  async function f() {
    (c(void 0), u(!0));
    try {
      await zo();
    } catch (e) {
      c(e instanceof Error ? e.message : `Export failed.`);
    } finally {
      u(!1);
    }
  }
  async function p(e) {
    (c(void 0), o(`merge`), i(void 0), n(e));
    try {
      i(await Ro(e));
    } catch (e) {
      c(e instanceof Error ? e.message : `That file is not readable.`);
    }
  }
  async function m() {
    if (t) {
      (c(void 0), u(!0));
      try {
        (await Bo(t, a), n(void 0), i(void 0));
      } catch (e) {
        c(e instanceof Error ? e.message : `Import failed.`);
      } finally {
        u(!1);
      }
    }
  }
  return (0, K.jsxs)(K.Fragment, {
    children: [
      (0, K.jsxs)(`div`, {
        className: `space-y-2`,
        children: [
          (0, K.jsxs)(`button`, {
            type: `button`,
            disabled: l,
            onClick: () => void f(),
            className: Vo,
            children: [
              (0, K.jsx)(wi, { size: 16, "aria-hidden": `true` }),
              `Export data`,
            ],
          }),
          (0, K.jsxs)(`button`, {
            type: `button`,
            disabled: l,
            onClick: () => e.current?.click(),
            className: Vo,
            children: [
              (0, K.jsx)(Vi, { size: 16, "aria-hidden": `true` }),
              `Import data`,
            ],
          }),
          (0, K.jsx)(`input`, {
            ref: e,
            type: `file`,
            accept: `application/json,.json`,
            className: `hidden`,
            onChange: (e) => {
              let t = e.target.files?.[0];
              ((e.currentTarget.value = ``), t && p(t));
            },
          }),
          s &&
            !t &&
            (0, K.jsx)(`p`, {
              role: `alert`,
              className: `text-meta text-danger`,
              children: s,
            }),
        ],
      }),
      t &&
        (0, K.jsx)(No, {
          fileName: t.name,
          summary: r,
          mode: a,
          busy: l,
          error: s,
          onModeChange: o,
          onCancel: () => {
            (n(void 0), i(void 0), c(void 0));
          },
          onConfirm: () => void m(),
        }),
    ],
  });
}
function Uo({ theme: e, onToggleTheme: t, onClose: n }) {
  return (0, K.jsx)(jo, {
    title: `Settings`,
    onClose: n,
    children: (0, K.jsxs)(`div`, {
      className: `space-y-5 p-4`,
      children: [
        (0, K.jsxs)(`section`, {
          children: [
            (0, K.jsx)(`h3`, {
              className: `text-meta text-ink-muted`,
              children: `Appearance`,
            }),
            (0, K.jsx)(`button`, {
              type: `button`,
              onClick: t,
              className: `mt-2 w-full rounded border border-line px-3 py-2 text-left text-title text-ink`,
              children:
                e === `dark` ? `Switch to light theme` : `Switch to dark theme`,
            }),
            (0, K.jsx)(`p`, {
              className: `mt-1 text-meta text-ink-muted`,
              children: `Follows the system setting until you choose here.`,
            }),
          ],
        }),
        (0, K.jsxs)(`section`, {
          children: [
            (0, K.jsx)(`h3`, {
              className: `text-meta text-ink-muted`,
              children: `Your data`,
            }),
            (0, K.jsx)(`p`, {
              className: `mt-1 text-meta text-ink-muted`,
              children: `Everything is stored in this browser. Export writes a JSON file you keep.`,
            }),
            (0, K.jsx)(`div`, {
              className: `mt-2`,
              children: (0, K.jsx)(Ho, {}),
            }),
          ],
        }),
      ],
    }),
  });
}
var Wo = {
    Dashboard: ki,
    "My day": Li,
    Inbox: Oi,
    Overdue: vi,
    Upcoming: Si,
    Waiting: bi,
    Completed: yi,
  },
  Go = {
    Dashboard: `var(--text-secondary)`,
    "My day": `var(--warning)`,
    Inbox: `var(--text-secondary)`,
    Overdue: `var(--danger)`,
    Upcoming: `var(--accent)`,
    Waiting: `var(--text-muted)`,
    Completed: `var(--success)`,
    Today: `var(--accent)`,
    "All tasks": `var(--text-secondary)`,
  },
  Ko = `flex w-full items-center gap-2.5 rounded px-2 py-[7px] text-meta text-ink-secondary hover:bg-surface-1`;
function qo({
  view: e,
  counts: t,
  tags: n,
  activeTag: r,
  expanded: i,
  theme: a,
  onSelectView: o,
  onSelectTag: s,
  onToggleExpanded: c,
  onToggleTheme: l,
  onOpenSettings: u,
}) {
  return (0, K.jsxs)(`aside`, {
    className: `fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-line bg-surface-2 p-2 md:flex ${i ? `w-sidebar` : `w-sidebar-collapsed`}`,
    children: [
      (0, K.jsxs)(`button`, {
        type: `button`,
        "aria-label": i ? `Collapse sidebar` : `Expand sidebar`,
        "aria-expanded": i,
        onClick: c,
        className: `${Ko} mb-3 text-ink hover:bg-transparent`,
        children: [
          (0, K.jsx)(Ai, {
            size: 17,
            "aria-hidden": `true`,
            className: `shrink-0`,
          }),
          i &&
            (0, K.jsx)(`span`, {
              className: `text-title`,
              children: `WorkDeck`,
            }),
        ],
      }),
      (0, K.jsx)(`nav`, {
        className: `flex flex-col gap-0.5`,
        children: W.map((n) => {
          let a = Wo[n] ?? Oi,
            c = e === n && r === void 0,
            l = t[n] || 0,
            u = n === `Overdue` && l > 0;
          return (0, K.jsxs)(
            `button`,
            {
              type: `button`,
              onClick: () => {
                (s(void 0), o(n));
              },
              "aria-current": c ? `page` : void 0,
              "aria-label": i ? void 0 : `${n}, ${l}`,
              title: i ? void 0 : `${n} (${l})`,
              className: `${Ko} relative ${c ? `bg-accent-bg text-accent` : u ? `text-danger` : ``}`,
              children: [
                (0, K.jsxs)(`span`, {
                  className: `relative shrink-0`,
                  children: [
                    (0, K.jsx)(a, {
                      size: 15,
                      "aria-hidden": `true`,
                      style: { color: Go[n] },
                    }),
                    !i &&
                      l > 0 &&
                      (0, K.jsx)(`span`, {
                        "aria-hidden": `true`,
                        className: `absolute -right-1.5 -top-1.5 min-w-[14px] rounded-full px-[3px] text-center text-[9px] font-medium leading-[14px] text-white`,
                        style: { background: Go[n] },
                        children: l > 99 ? `99+` : l,
                      }),
                  ],
                }),
                i &&
                  (0, K.jsxs)(K.Fragment, {
                    children: [
                      (0, K.jsx)(`span`, {
                        className: `truncate`,
                        children: n,
                      }),
                      (0, K.jsx)(`span`, {
                        className: `ml-auto ${c ? `text-accent` : u ? `text-danger` : `text-ink-muted`}`,
                        children: l || ``,
                      }),
                    ],
                  }),
              ],
            },
            n,
          );
        }),
      }),
      i &&
        n.length > 0 &&
        (0, K.jsxs)(`div`, {
          className: `mt-5 flex min-h-0 flex-col`,
          children: [
            (0, K.jsx)(`h2`, {
              className: `px-2 pb-1.5 text-meta text-ink-muted`,
              children: `Tags`,
            }),
            (0, K.jsx)(`div`, {
              className: `flex flex-col gap-0.5 overflow-y-auto`,
              children: n.map(({ tag: e }) =>
                (0, K.jsxs)(
                  `button`,
                  {
                    type: `button`,
                    onClick: () => s(r === e ? void 0 : e),
                    "aria-pressed": r === e,
                    className: `${Ko} ${r === e ? `bg-accent-bg text-accent` : ``}`,
                    children: [
                      (0, K.jsx)(`span`, {
                        "aria-hidden": `true`,
                        className: `h-[7px] w-[7px] shrink-0 rounded-full`,
                        style: { background: Wi(e) },
                      }),
                      (0, K.jsx)(`span`, {
                        className: `truncate`,
                        children: e,
                      }),
                    ],
                  },
                  e,
                ),
              ),
            }),
          ],
        }),
      (0, K.jsxs)(`div`, {
        className: `mt-auto flex flex-col gap-0.5 pt-2`,
        children: [
          (0, K.jsxs)(`button`, {
            type: `button`,
            onClick: l,
            className: Ko,
            children: [
              a === `dark`
                ? (0, K.jsx)(Li, {
                    size: 15,
                    "aria-hidden": `true`,
                    className: `shrink-0`,
                  })
                : (0, K.jsx)(Mi, {
                    size: 15,
                    "aria-hidden": `true`,
                    className: `shrink-0`,
                  }),
              i &&
                (0, K.jsx)(`span`, {
                  children: a === `dark` ? `Light` : `Dark`,
                }),
            ],
          }),
          (0, K.jsxs)(`button`, {
            type: `button`,
            onClick: u,
            className: Ko,
            children: [
              (0, K.jsx)(Fi, {
                size: 15,
                "aria-hidden": `true`,
                className: `shrink-0`,
              }),
              i && (0, K.jsx)(`span`, { children: `Settings` }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Jo(e, t, n) {
  var r, i;
  typeof e == `function` ? ((r = t || []), (i = n)) : ((r = []), (i = t));
  var a = d.useRef({ hasResult: !1, result: i, error: null }),
    o = d.useReducer(function (e) {
      return e + 1;
    }, 0);
  o[0];
  var s = o[1],
    c = d.useMemo(function () {
      var t = typeof e == `function` ? e() : e;
      if (!t || typeof t.subscribe != `function`)
        throw TypeError(
          e === t
            ? `Given argument to useObservable() was neither a valid observable nor a function.`
            : `Observable factory given to useObservable() did not return a valid observable.`,
        );
      if (
        !a.current.hasResult &&
        typeof window < `u` &&
        (typeof t.hasValue != `function` || t.hasValue())
      )
        if (typeof t.getValue == `function`)
          ((a.current.result = t.getValue()), (a.current.hasResult = !0));
        else {
          var n = t.subscribe(function (e) {
            ((a.current.result = e), (a.current.hasResult = !0));
          });
          typeof n == `function` ? n() : n.unsubscribe();
        }
      return t;
    }, r);
  if (
    (d.useDebugValue(a.current.result),
    d.useEffect(function () {
      var e = c.subscribe(
        function (e) {
          var t = a.current;
          (t.error !== null || t.result !== e) &&
            ((t.error = null), (t.result = e), (t.hasResult = !0), s());
        },
        function (e) {
          var t = a.current;
          t.error !== e && ((t.error = e), s());
        },
      );
      return typeof e == `function` ? e : e.unsubscribe.bind(e);
    }, r),
    a.current.error)
  )
    throw a.current.error;
  return a.current.result;
}
function Yo(e, t, n) {
  return Jo(
    function () {
      return La(e);
    },
    t || [],
    n,
  );
}
function Xo(e) {
  let t = e.trim();
  if (/^https?:\/\//i.test(t)) return t;
  if (/^www\./i.test(t)) return `https://${t}`;
}
function Zo(e) {
  return e
    .split(
      /(<a\s+href=['"][^'"]+['"]\s*>.*?<\/a>|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/gi,
    )
    .map((e, t) => {
      let n = e.match(/^<a\s+href=['"]([^'"]+)['"]\s*>(.*?)<\/a>$/i);
      if (n) {
        let e = Xo(n[1] ?? ``);
        return e
          ? (0, K.jsx)(
              `a`,
              {
                href: e,
                target: `_blank`,
                rel: `noopener noreferrer`,
                className: `text-accent underline`,
                children: n[2],
              },
              t,
            )
          : (0, K.jsx)(`span`, { children: n[2] }, t);
      }
      return e.startsWith("`") && e.endsWith("`")
        ? (0, K.jsx)(
            `code`,
            {
              className: `rounded bg-surface-1 px-1 font-mono`,
              children: e.slice(1, -1),
            },
            t,
          )
        : e.startsWith(`**`) && e.endsWith(`**`)
          ? (0, K.jsx)(`strong`, { children: e.slice(2, -2) }, t)
          : e.startsWith(`*`) && e.endsWith(`*`)
            ? (0, K.jsx)(`em`, { children: e.slice(1, -1) }, t)
            : e.replace(/<[^>]*>/g, ``);
    });
}
function Qo({ value: e }) {
  return (0, K.jsx)(`div`, {
    className: `space-y-2 break-words`,
    children: e
      .split(
        `
`,
      )
      .map((e, t) =>
        e.startsWith(`# `)
          ? (0, K.jsx)(
              `h3`,
              { className: `text-heading`, children: Zo(e.slice(2)) },
              t,
            )
          : e.startsWith(`- `)
            ? (0, K.jsx)(
                `div`,
                {
                  className: `pl-4 before:mr-2 before:content-['•']`,
                  children: Zo(e.slice(2)),
                },
                t,
              )
            : (0, K.jsx)(`p`, { children: Zo(e) }, t),
      ),
  });
}
function $o() {
  return Yo(() => $a(), [], new Map());
}
function es(e) {
  return Yo(() => Ja(e), [e]);
}
function ts({ taskId: e }) {
  let t = es(e),
    n = (0, d.useRef)(null);
  (0, d.useEffect)(() => {
    n.current && (n.current.scrollTop = 0);
  }, [t?.length]);
  let r = t && [...t].reverse();
  return (0, K.jsxs)(`div`, {
    className: `flex min-h-0 flex-1 flex-col`,
    children: [
      (0, K.jsx)(is, { taskId: e }),
      (0, K.jsx)(`div`, {
        ref: n,
        className: `min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-3`,
        children:
          r === void 0
            ? null
            : r.length === 0
              ? (0, K.jsx)(`p`, {
                  className: `text-body text-ink-muted`,
                  children: `Nothing recorded yet. Add the first note above.`,
                })
              : (0, K.jsx)(`div`, {
                  className: `grid grid-cols-[9px_minmax(0,1fr)] items-start gap-x-3 gap-y-3`,
                  children: io(r).map(({ day: e, entries: t }) =>
                    (0, K.jsxs)(
                      d.Fragment,
                      {
                        children: [
                          (0, K.jsx)(`p`, {
                            className: `col-span-2 py-1 text-center text-[10px] leading-none text-ink-muted`,
                            children: ns(e),
                          }),
                          t.map((e) => (0, K.jsx)(rs, { entry: e }, e.id)),
                        ],
                      },
                      e,
                    ),
                  ),
                }),
      }),
    ],
  });
}
function ns(e) {
  return Qr(e) ? `Today` : ti(e) ? `Yesterday` : Yr(e, `EEE d MMM`);
}
function rs({ entry: e }) {
  let t = Yr(e.createdAt, `HH:mm`);
  return e.kind === `event`
    ? (0, K.jsxs)(K.Fragment, {
        children: [
          (0, K.jsx)(`span`, {
            "aria-hidden": `true`,
            className: `mt-[5px] h-[9px] w-[9px] rounded-full border border-line-strong bg-surface-2`,
          }),
          (0, K.jsxs)(`p`, {
            className: `min-w-0 break-words font-mono text-meta text-ink-muted`,
            children: [t, ` · `, e.detail],
          }),
        ],
      })
    : (0, K.jsxs)(K.Fragment, {
        children: [
          (0, K.jsx)(`span`, {
            "aria-hidden": `true`,
            className: `mt-[5px] h-[9px] w-[9px] rounded-full bg-accent`,
          }),
          (0, K.jsxs)(`div`, {
            className: `min-w-0 max-w-full`,
            children: [
              (0, K.jsx)(`time`, {
                className: `font-mono text-meta text-ink-muted`,
                children: t,
              }),
              (0, K.jsx)(`div`, {
                className: `prose mt-1 w-fit max-w-full break-words rounded border border-line bg-surface-0 px-3 py-2 text-body text-ink`,
                children: (0, K.jsx)(Qo, { value: e.body }),
              }),
            ],
          }),
        ],
      });
}
function is({ taskId: e }) {
  let [t, n] = (0, d.useState)(``),
    r = (0, d.useRef)(null);
  (0, d.useLayoutEffect)(() => {
    let e = r.current;
    e && ((e.style.height = `auto`), (e.style.height = `${e.scrollHeight}px`));
  }, [t]);
  let i = () => {
    let r = t.trim();
    r && (Za(e, r), n(``));
  };
  return (0, K.jsx)(`form`, {
    onSubmit: (e) => {
      (e.preventDefault(), i());
    },
    className: `shrink-0 border-b border-line p-3`,
    children: (0, K.jsxs)(`div`, {
      className: `flex items-end gap-2 rounded border border-line bg-surface-0 px-3 py-2 focus-within:border-line-strong`,
      children: [
        (0, K.jsx)(`textarea`, {
          ref: r,
          rows: 1,
          value: t,
          onChange: (e) => n(e.target.value),
          onKeyDown: (e) => {
            (e.metaKey || e.ctrlKey) &&
              e.key === `Enter` &&
              (e.preventDefault(), i());
          },
          placeholder: `Add a note…`,
          "aria-label": `Add a note`,
          className: `max-h-32 min-h-[20px] w-full resize-none bg-transparent text-body text-ink outline-none placeholder:text-ink-muted`,
        }),
        (0, K.jsx)(`button`, {
          type: `submit`,
          "aria-label": `Add note`,
          disabled: t.trim() === ``,
          className: `shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-meta text-ink-muted disabled:opacity-40`,
          children: `⌘↵`,
        }),
      ],
    }),
  });
}
function as({ label: e, children: t }) {
  return (0, K.jsxs)(`label`, {
    className: `block text-meta text-ink-muted`,
    children: [
      e,
      (0, K.jsx)(`div`, { className: `mt-1 text-title text-ink`, children: t }),
    ],
  });
}
var os = `w-full rounded border border-line bg-surface-0 p-2 text-title text-ink outline-none focus-visible:border-accent`;
function ss({ taskId: e, tags: t }) {
  let [n, r] = (0, d.useState)(``),
    i = () => {
      n.trim() && (mo(e, n), r(``));
    };
  return (0, K.jsxs)(`div`, {
    children: [
      (0, K.jsx)(`label`, {
        htmlFor: `tag-input`,
        className: `block text-meta text-ink-muted`,
        children: `Tags`,
      }),
      t.length > 0 &&
        (0, K.jsx)(`div`, {
          className: `mt-1 flex flex-wrap gap-1.5`,
          children: t.map((t) =>
            (0, K.jsxs)(
              `span`,
              {
                className: `flex items-center gap-1.5 rounded border border-line px-2 py-0.5 text-meta text-ink-secondary`,
                children: [
                  (0, K.jsx)(`span`, {
                    "aria-hidden": `true`,
                    className: `h-[7px] w-[7px] rounded-full`,
                    style: { background: Wi(t) },
                  }),
                  t,
                  (0, K.jsx)(`button`, {
                    type: `button`,
                    "aria-label": `Remove tag ${t}`,
                    onClick: () => void X(e, t),
                    className: `text-ink-muted hover:text-danger`,
                    children: (0, K.jsx)(Hi, {
                      size: 12,
                      "aria-hidden": `true`,
                    }),
                  }),
                ],
              },
              t,
            ),
          ),
        }),
      (0, K.jsx)(`input`, {
        id: `tag-input`,
        value: n,
        onChange: (e) => r(e.target.value),
        onBlur: i,
        onKeyDown: (e) => {
          (e.key === `Enter` || e.key === `,`) && (e.preventDefault(), i());
        },
        className: `mt-1.5 w-full rounded border border-line bg-surface-0 p-2 text-title text-ink outline-none focus-visible:border-accent`,
        placeholder: `Add a tag, then press Enter`,
      }),
    ],
  });
}
var cs = (e) => String(e).padStart(2, `0`);
function ls(e) {
  if (e == null || !Number.isFinite(e)) return ``;
  let t = new Date(e);
  return `${t.getFullYear()}-${cs(t.getMonth() + 1)}-${cs(t.getDate())}T${cs(t.getHours())}:${cs(t.getMinutes())}`;
}
function us(e) {
  if (!e) return;
  let t = new Date(e).getTime();
  return Number.isFinite(t) ? t : void 0;
}
var ds = 6e4,
  fs = 60 * ds,
  ps = 24 * fs;
function ms(e, t = Date.now()) {
  let n = Math.max(t - e, 0);
  return n < ds
    ? `just now`
    : n < fs
      ? `${Math.floor(n / ds)}m ago`
      : n < ps
        ? `${Math.floor(n / fs)}h ago`
        : `${Math.floor(n / ps)}d ago`;
}
var hs = `snooze`,
  gs = `done`;
function _s() {
  return globalThis.TimestampTrigger;
}
function vs() {
  return typeof Notification < `u` && Notification.permission === `granted`;
}
async function ys() {
  return typeof Notification > `u`
    ? !1
    : Notification.permission === `granted` ||
        (Notification.permission !== `denied` &&
          (await Notification.requestPermission()) === `granted`);
}
async function bs() {
  if (`serviceWorker` in navigator)
    try {
      return await navigator.serviceWorker.ready;
    } catch {
      return;
    }
}
var xs = [
  { action: hs, title: `Snooze 1h` },
  { action: gs, title: `Mark done` },
];
function Ss(e, t) {
  let n = t.total > 1 ? ` · ${t.seq} of ${t.total}` : ``;
  if (e.dueAt == null) return `Reminder${n}`;
  let r = e.dueAt - t.remindAt;
  return r > 0 ? `Due in ${ya(r)}${n}` : `Overdue${n}`;
}
async function Cs(e, t) {
  let n = await bs();
  return !n || !vs()
    ? !1
    : (await n.showNotification(e.title, {
        body: Ss(e, t),
        tag: `reminder-${t.id}`,
        data: { occurrenceId: t.id, taskId: e.id },
        actions: xs,
        timestamp: t.remindAt,
      }),
      !0);
}
async function ws(e) {
  let t = await bs();
  return !t || !vs()
    ? !1
    : (await t.showNotification(`${e} reminders missed`, {
        body: `Open WorkDeck to see which tasks they belong to.`,
        tag: `reminders-missed`,
        data: { missed: e },
      }),
      !0);
}
async function Ts(e) {
  let t = _s(),
    n = await bs();
  if (!t || !n || !vs()) return;
  let r = await n.getNotifications({ includeTriggered: !1 }),
    i = new Set(r.map((e) => e.tag));
  for (let { task: r, occurrence: a } of e) {
    let e = `reminder-${a.id}`;
    i.has(e) ||
      (await n.showNotification(r.title, {
        body: Ss(r, a),
        tag: e,
        data: { occurrenceId: a.id, taskId: r.id },
        actions: xs,
        showTrigger: new t(a.remindAt),
      }));
  }
}
var Es = q;
async function Ds(e, t, n = Date.now()) {
  await Y.transaction(`rw`, [Y.tasks, Y.reminderOccurrences], async () => {
    let r = await Y.tasks.get(e);
    r &&
      (await ks(r, t, n),
      await Y.tasks.update(e, { reminderPolicy: t, updatedAt: n }));
  });
}
async function Os(e, t, n = Date.now()) {
  await Y.transaction(
    `rw`,
    [Y.tasks, Y.reminderOccurrences, Y.thread],
    async () => {
      let r = await Y.tasks.get(e);
      if (!r || r.dueAt === t) return;
      let i =
        t == null && r.reminderPolicy.kind !== `at`
          ? { kind: `none` }
          : r.reminderPolicy;
      (await ks({ ...r, dueAt: t }, i, n),
        await Y.tasks.update(e, { dueAt: t, reminderPolicy: i, updatedAt: n }),
        await Qa(e, `due`, no(t), n));
    },
  );
}
async function ks(e, t, n) {
  let r = ha(e, t, {
      now: n,
      existing: await Y.reminderOccurrences
        .where(`taskId`)
        .equals(e.id)
        .toArray(),
    }),
    i = new Set(r.map((e) => e.id));
  (await Y.reminderOccurrences
    .where(`taskId`)
    .equals(e.id)
    .and((e) => !i.has(e.id))
    .delete(),
    await Y.reminderOccurrences.bulkPut(r));
}
function As(e) {
  return Y.reminderOccurrences
    .where(`[taskId+remindAt]`)
    .between([e, -1 / 0], [e, 1 / 0])
    .toArray();
}
function js(e = Date.now()) {
  return Y.reminderOccurrences
    .where(`[fired+remindAt]`)
    .between([0, -1 / 0], [0, e], !0, !0)
    .toArray();
}
async function Ms() {
  return (
    await Y.reminderOccurrences
      .where(`[fired+remindAt]`)
      .between([0, -1 / 0], [0, 1 / 0])
      .first()
  )?.remindAt;
}
async function Ns(e) {
  await Y.transaction(`rw`, [Y.reminderOccurrences, Y.thread], async () => {
    let t = await Y.reminderOccurrences.get(e);
    !t ||
      t.fired === 1 ||
      (await Y.reminderOccurrences.update(e, { fired: 1 }),
      await Qa(t.taskId, `reminder`, ro(t.seq, t.total)));
  });
}
async function Ps(e, t = Es) {
  await Y.transaction(`rw`, Y.reminderOccurrences, async () => {
    let n = (await As(e)).filter((e) => e.fired === 0);
    await Promise.all(
      n.map((e) =>
        Y.reminderOccurrences.update(e.id, { remindAt: e.remindAt + t }),
      ),
    );
  });
}
var Fs = [
    { kind: `at`, label: `One time`, hint: `A single moment` },
    { kind: `offsets`, label: `Fixed offsets`, hint: `1d, 4h, 1h before` },
    { kind: `every`, label: `Every interval`, hint: `Every 2h until due` },
    { kind: `escalating`, label: `Escalating`, hint: `Tightens toward due` },
  ],
  Is = [
    { value: 30 * 6e4, label: `30m` },
    { value: q, label: `1h` },
    { value: 2 * q, label: `2h` },
    { value: 4 * q, label: `4h` },
    { value: 24 * q, label: `1d` },
  ];
function Ls(e, t) {
  switch (e) {
    case `at`:
      return { kind: `at`, at: t.dueAt ?? Date.now() + 36e5 };
    case `offsets`:
      return { kind: `offsets`, before: [24 * q, 4 * q, q] };
    case `every`:
      return { kind: `every`, interval: 2 * q, cap: 6 };
    case `escalating`:
      return { kind: `escalating`, count: 6 };
    case `none`:
      return { kind: `none` };
  }
}
function Rs(e) {
  if (e.kind === `every`) return e.cap;
  if (e.kind === `escalating`) return e.count;
}
function zs(e, t) {
  return e.kind === `every`
    ? { ...e, cap: t }
    : e.kind === `escalating`
      ? { ...e, count: t }
      : e;
}
function Bs({ task: e }) {
  let t = e.reminderPolicy,
    n = e.dueAt != null,
    r = Yo(() => As(e.id), [e.id]) ?? [],
    i = async (t) => {
      (t.kind !== `none` && (await ys()), await Ds(e.id, t));
    },
    a = (n) => {
      let r = t.kind === n ? { kind: `none` } : Ls(n, e);
      i(r);
    };
  return (0, K.jsxs)(`section`, {
    children: [
      (0, K.jsxs)(`div`, {
        className: `flex items-center gap-2`,
        children: [
          (0, K.jsx)(`h3`, {
            className: `text-meta text-ink-muted`,
            children: `Reminder policy`,
          }),
          t.kind !== `none` &&
            (0, K.jsx)(`button`, {
              type: `button`,
              onClick: () => void i({ kind: `none` }),
              className: `ml-auto text-meta text-ink-muted hover:text-danger`,
              children: `Clear`,
            }),
        ],
      }),
      (0, K.jsx)(`div`, {
        className: `mt-2 grid grid-cols-2 gap-2`,
        children: Fs.map((e) => {
          let r = !n && fa(e.kind),
            i = t.kind === e.kind;
          return (0, K.jsxs)(
            `button`,
            {
              type: `button`,
              disabled: r,
              "aria-pressed": i,
              onClick: () => a(e.kind),
              className: `rounded border px-2.5 py-2 text-left ${i ? `border-accent bg-accent-bg/40` : `border-line hover:border-line-strong`} ${r ? `cursor-not-allowed opacity-40` : ``}`,
              children: [
                (0, K.jsx)(`span`, {
                  className: `block text-title ${i ? `text-accent` : `text-ink`}`,
                  children: e.label,
                }),
                (0, K.jsx)(`span`, {
                  className: `block text-meta ${i ? `text-accent` : `text-ink-muted`}`,
                  children: e.hint,
                }),
              ],
            },
            e.kind,
          );
        }),
      }),
      !n &&
        (0, K.jsx)(`p`, {
          className: `mt-1.5 text-meta text-ink-muted`,
          children: `Add a due date to use offsets, intervals or escalating reminders.`,
        }),
      (0, K.jsx)(Vs, { policy: t, onChange: (e) => void i(e) }),
      r.length > 0 &&
        (0, K.jsx)(Hs, {
          occurrences: r,
          dueAt: e.dueAt,
          onSnoozeAll: () => void Ps(e.id),
        }),
    ],
  });
}
function Vs({ policy: e, onChange: t }) {
  let n = Rs(e),
    r = e.kind === `offsets` ? e.before.map(ya).join(`, `) : ``,
    [i, a] = (0, d.useState)(n ?? 1);
  (0, d.useEffect)(() => a(n ?? 1), [n]);
  let [o, s] = (0, d.useState)(r);
  return (
    (0, d.useEffect)(() => s(r), [r]),
    e.kind === `none`
      ? null
      : e.kind === `at`
        ? (0, K.jsxs)(
            `label`,
            {
              className: `mt-3 flex items-center gap-2 text-meta text-ink-muted`,
              children: [
                `Remind at`,
                (0, K.jsx)(`input`, {
                  type: `datetime-local`,
                  value: ls(e.at),
                  onChange: (e) => {
                    let n = us(e.target.value);
                    n !== void 0 && t({ kind: `at`, at: n });
                  },
                  className: `rounded border border-line bg-surface-0 px-2 py-1 text-meta text-ink outline-none focus-visible:border-accent`,
                }),
              ],
            },
            `at`,
          )
        : e.kind === `offsets`
          ? (0, K.jsxs)(
              `label`,
              {
                className: `mt-3 flex items-center gap-2 text-meta text-ink-muted`,
                children: [
                  `Before due`,
                  (0, K.jsx)(`input`, {
                    value: o,
                    onChange: (e) => s(e.target.value),
                    placeholder: `1d, 4h, 1h`,
                    onBlur: (e) => {
                      let n = va(e.target.value);
                      n.length > 0 ? t({ kind: `offsets`, before: n }) : s(r);
                    },
                    className: `w-40 rounded border border-line bg-surface-0 px-2 py-1 text-meta text-ink outline-none focus-visible:border-accent`,
                  }),
                ],
              },
              `offsets`,
            )
          : (0, K.jsxs)(`div`, {
              className: `mt-3 space-y-2`,
              children: [
                e.kind === `every` &&
                  (0, K.jsxs)(`label`, {
                    className: `flex items-center gap-2 text-meta text-ink-muted`,
                    children: [
                      `Every`,
                      (0, K.jsx)(`select`, {
                        value: e.interval,
                        onChange: (n) =>
                          t({ ...e, interval: Number(n.target.value) }),
                        className: `rounded border border-line bg-surface-0 px-2 py-1 text-meta text-ink outline-none focus-visible:border-accent`,
                        children: Is.map((e) =>
                          (0, K.jsx)(
                            `option`,
                            { value: e.value, children: e.label },
                            e.value,
                          ),
                        ),
                      }),
                      `until due`,
                    ],
                  }),
                (0, K.jsxs)(`label`, {
                  className: `flex items-center gap-3 text-meta text-ink-muted`,
                  children: [
                    `How many`,
                    (0, K.jsx)(`input`, {
                      type: `range`,
                      min: 1,
                      max: 20,
                      value: i,
                      onChange: (e) => a(Number(e.target.value)),
                      onPointerUp: () => t(zs(e, i)),
                      onKeyUp: () => t(zs(e, i)),
                      className: `flex-1 accent-accent`,
                    }),
                    (0, K.jsx)(`span`, {
                      className: `w-5 text-right text-title text-ink`,
                      children: i,
                    }),
                  ],
                }),
              ],
            })
  );
}
function Hs({ occurrences: e, dueAt: t, onSnoozeAll: n }) {
  let r = e.findIndex((e) => e.fired === 0),
    i = e.filter((e) => e.fired === 1).length,
    a = r === -1 ? void 0 : e[r],
    o = e.length,
    s = o === 0 ? 0 : ((r === -1 ? o : r) / o) * 100,
    c = (e) => (t != null && sr(e, t) ? Yr(e, `HH:mm`) : Yr(e, `d MMM HH:mm`));
  return (0, K.jsxs)(`div`, {
    className: `mt-3 rounded border border-line bg-surface-1 p-3`,
    children: [
      (0, K.jsxs)(`div`, {
        className: `relative flex items-start justify-between`,
        children: [
          (0, K.jsx)(`span`, {
            "aria-hidden": `true`,
            className: `absolute left-0 right-0 top-[5px] h-[2px] bg-line-strong`,
          }),
          (0, K.jsx)(`span`, {
            "aria-hidden": `true`,
            className: `absolute left-0 top-[5px] h-[2px] bg-accent`,
            style: { width: `${s}%` },
          }),
          e.map((e) =>
            (0, K.jsxs)(
              `span`,
              {
                className: `relative flex flex-col items-center gap-1`,
                children: [
                  (0, K.jsx)(`span`, {
                    className: `h-3 w-3 rounded-full border-2 ${e.fired === 1 ? `border-accent bg-accent` : e.id === a?.id ? `border-accent bg-surface-1` : `border-line-strong bg-surface-1`}`,
                  }),
                  (0, K.jsx)(`span`, {
                    className: `font-mono text-meta text-ink-muted`,
                    children: c(e.remindAt),
                  }),
                  e.fired === 1 &&
                    (0, K.jsx)(`span`, {
                      className: `text-meta text-ink-muted`,
                      children: `sent`,
                    }),
                ],
              },
              e.id,
            ),
          ),
          t != null &&
            (0, K.jsxs)(`span`, {
              className: `relative flex flex-col items-center gap-1`,
              children: [
                (0, K.jsx)(`span`, { className: `h-3 w-3 bg-danger` }),
                (0, K.jsx)(`span`, {
                  className: `font-mono text-meta text-danger`,
                  children: Yr(t, `HH:mm`),
                }),
                (0, K.jsx)(`span`, {
                  className: `text-meta text-danger`,
                  children: `due`,
                }),
              ],
            }),
        ],
      }),
      (0, K.jsxs)(`div`, {
        className: `mt-3 flex items-center gap-2 border-t border-line pt-2.5`,
        children: [
          (0, K.jsx)(mi, {
            size: 13,
            "aria-hidden": `true`,
            className: `text-accent`,
          }),
          (0, K.jsx)(`span`, {
            className: `text-meta text-ink-secondary`,
            children: a
              ? `Next reminder in ${ba(a.remindAt - Date.now())} — ${i} of ${o} sent`
              : `All ${o} sent`,
          }),
          a &&
            (0, K.jsxs)(`button`, {
              type: `button`,
              onClick: n,
              className: `ml-auto rounded border border-line px-2 py-1 text-meta text-ink-secondary hover:bg-surface-2`,
              children: [`Snooze all `, ya(Es)],
            }),
        ],
      }),
    ],
  });
}
var Us = [
    { value: `none`, label: `None` },
    { value: `low`, label: `Low` },
    { value: `medium`, label: `Medium` },
    { value: `high`, label: `High` },
  ],
  Ws = [
    { value: `open`, label: `Open` },
    { value: `waiting`, label: `Waiting` },
    { value: `completed`, label: `Completed` },
  ];
function Gs({ task: e }) {
  let t = (t) => void so(e.id, t);
  return (0, K.jsxs)(`div`, {
    className: `space-y-4 p-4`,
    children: [
      (0, K.jsx)(`input`, {
        "aria-label": `Task title`,
        defaultValue: e.title,
        onChange: (e) => t({ title: e.target.value }),
        className: `w-full border-b border-line bg-transparent pb-1 text-title text-ink outline-none focus-visible:border-accent`,
      }),
      (0, K.jsx)(`div`, {
        className: `flex items-center gap-2`,
        children: (0, K.jsxs)(`button`, {
          type: `button`,
          "aria-pressed": e.inMyDay,
          onClick: () => void po(e.id, !e.inMyDay),
          className: `flex items-center gap-1.5 rounded border border-line px-2 py-1 text-meta ${e.inMyDay ? `text-accent` : `text-ink-secondary`}`,
          children: [
            (0, K.jsx)(Li, { size: 14, "aria-hidden": `true` }),
            e.inMyDay ? `In My day` : `Add to My day`,
          ],
        }),
      }),
      (0, K.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-3`,
        children: [
          (0, K.jsx)(as, {
            label: `Status`,
            children: (0, K.jsx)(`select`, {
              value: e.status,
              onChange: (t) => void lo(e.id, t.target.value),
              className: os,
              children: Ws.map((e) =>
                (0, K.jsx)(
                  `option`,
                  { value: e.value, children: e.label },
                  e.value,
                ),
              ),
            }),
          }),
          (0, K.jsx)(as, {
            label: `Priority`,
            children: (0, K.jsx)(`select`, {
              value: e.priority,
              onChange: (t) => void uo(e.id, t.target.value),
              className: os,
              children: Us.map((e) =>
                (0, K.jsx)(
                  `option`,
                  { value: e.value, children: e.label },
                  e.value,
                ),
              ),
            }),
          }),
          (0, K.jsx)(as, {
            label: `Due`,
            children: (0, K.jsx)(`input`, {
              type: `datetime-local`,
              value: ls(e.dueAt),
              onChange: (t) => void Os(e.id, us(t.target.value)),
              className: os,
            }),
          }),
          (0, K.jsx)(as, {
            label: `Estimate (minutes)`,
            children: (0, K.jsx)(`input`, {
              type: `number`,
              min: `1`,
              defaultValue: e.estimatedMinutes ?? ``,
              onChange: (e) =>
                t({
                  estimatedMinutes: e.target.value
                    ? Number(e.target.value)
                    : void 0,
                }),
              className: os,
              placeholder: `—`,
            }),
          }),
        ],
      }),
      (0, K.jsx)(ss, { taskId: e.id, tags: e.tags }),
      (0, K.jsx)(Bs, { task: e }),
      (0, K.jsxs)(`div`, {
        children: [
          (0, K.jsx)(`label`, {
            htmlFor: `task-description`,
            className: `block text-meta text-ink-muted`,
            children: `Description`,
          }),
          (0, K.jsx)(`textarea`, {
            id: `task-description`,
            defaultValue: e.description,
            onChange: (e) => t({ description: e.target.value }),
            className: `${os} mt-1 min-h-24`,
            placeholder: `Markdown or text`,
          }),
          e.description.trim() !== `` &&
            (0, K.jsx)(`div`, {
              className: `prose mt-2 border border-line bg-surface-1 p-3 text-body text-ink-secondary`,
              children: (0, K.jsx)(Qo, { value: e.description }),
            }),
        ],
      }),
    ],
  });
}
var Ks = 6e4,
  qs = 36e5,
  Js = 864e5;
function Ys(e, t) {
  return Yr(
    e,
    new Date(e).getFullYear() === new Date(t).getFullYear()
      ? `d MMM`
      : `d MMM yyyy`,
  );
}
function Xs(e) {
  return e < qs
    ? `${Math.max(1, Math.round(e / Ks))}m`
    : e < Js
      ? `${Math.round(e / qs)}h`
      : `${Math.round(e / Js)}d`;
}
function Zs(e, t) {
  let n = new Date(t),
    r = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime() + Js;
  if (e < t) {
    let n = t - e;
    return {
      tone: `danger`,
      label: n < 2 * Js ? `Overdue ${Xs(n)}` : `Overdue ${Ys(e, t)}`,
    };
  }
  return e < r
    ? { tone: `warning`, label: `Today ${Yr(e, `HH:mm`)}` }
    : e - t < 2 * Js
      ? { tone: `muted`, label: `Tomorrow ${Yr(e, `HH:mm`)}` }
      : e <= r + 7 * Js
        ? { tone: `muted`, label: Yr(e, `EEE`) }
        : { tone: `muted`, label: Ys(e, t) };
}
var Qs = {
    high: `var(--priority-high)`,
    medium: `var(--priority-medium)`,
    low: `var(--priority-low)`,
    none: `transparent`,
  },
  $s = { none: `None`, low: `Low`, medium: `Medium`, high: `High` };
function ec({ task: e, onClose: t, onRequestDelete: n }) {
  let [r, i] = (0, d.useState)(`activity`);
  return (0, K.jsxs)(jo, {
    title: `Task`,
    scroll: !1,
    wide: !0,
    onClose: t,
    header: (0, K.jsx)(tc, { task: e, onRequestDelete: n }),
    children: [
      (0, K.jsx)(`div`, {
        className: `shrink-0 px-4 pt-3`,
        children: (0, K.jsx)(nc, { task: e }),
      }),
      (0, K.jsxs)(`div`, {
        className: `mt-3 flex shrink-0 items-center gap-4 border-b border-line px-4`,
        children: [
          (0, K.jsx)(`div`, {
            className: `flex items-center gap-4 xl:hidden`,
            children: [`activity`, `description`].map((e) =>
              (0, K.jsx)(
                `button`,
                {
                  type: `button`,
                  onClick: () => i(e),
                  "aria-current": r === e ? `true` : void 0,
                  className: `-mb-px border-b-2 pb-2 text-title capitalize ${r === e ? `border-ink text-ink` : `border-transparent text-ink-muted hover:text-ink-secondary`}`,
                  children: e,
                },
                e,
              ),
            ),
          }),
          (0, K.jsx)(rc, { task: e }),
        ],
      }),
      (0, K.jsxs)(`div`, {
        className: `grid min-h-0 flex-1 overflow-hidden xl:grid-cols-[340px_minmax(0,1fr)]`,
        children: [
          (0, K.jsx)(`div`, {
            className: `min-h-0 min-w-0 overflow-y-auto xl:block xl:border-r xl:border-line ${r === `description` ? `` : `hidden`}`,
            children: (0, K.jsx)(Gs, { task: e }, e.id),
          }),
          (0, K.jsx)(`div`, {
            className: `min-h-0 min-w-0 xl:flex ${r === `activity` ? `flex` : `hidden`}`,
            children: (0, K.jsx)(ts, { taskId: e.id }),
          }),
        ],
      }),
    ],
  });
}
function tc({ task: e, onRequestDelete: t }) {
  let [n, r] = (0, d.useState)(!1);
  return (0, K.jsxs)(`div`, {
    className: `flex min-w-0 flex-1 items-start gap-2.5`,
    children: [
      (0, K.jsx)(`span`, {
        "aria-hidden": `true`,
        className: `mt-0.5 w-rail self-stretch`,
        style: { background: Qs[e.priority] },
      }),
      (0, K.jsxs)(`div`, {
        className: `min-w-0 flex-1`,
        children: [
          (0, K.jsx)(`h2`, {
            className: `truncate text-heading`,
            children: e.title,
          }),
          (0, K.jsxs)(`p`, {
            className: `mt-0.5 text-meta text-ink-muted`,
            children: [
              `Created `,
              Yr(e.createdAt, `d MMM`),
              ` · updated`,
              ` `,
              ms(e.updatedAt),
            ],
          }),
        ],
      }),
      (0, K.jsxs)(`div`, {
        className: `relative shrink-0`,
        children: [
          (0, K.jsx)(`button`, {
            type: `button`,
            "aria-label": `Task actions`,
            "aria-expanded": n,
            onClick: () => r((e) => !e),
            className: `rounded p-1 text-ink-muted hover:text-ink`,
            children: (0, K.jsx)(Ti, { size: 18, "aria-hidden": `true` }),
          }),
          n &&
            (0, K.jsxs)(K.Fragment, {
              children: [
                (0, K.jsx)(`div`, {
                  "aria-hidden": `true`,
                  className: `fixed inset-0 z-10`,
                  onClick: () => r(!1),
                }),
                (0, K.jsx)(`div`, {
                  className: `absolute right-0 top-full z-20 mt-1 w-40 rounded border border-line bg-surface-2 p-1 shadow-lg`,
                  children: (0, K.jsxs)(`button`, {
                    type: `button`,
                    onClick: () => {
                      (r(!1), t());
                    },
                    className: `flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-meta text-ink-secondary hover:bg-surface-1 hover:text-danger`,
                    children: [
                      (0, K.jsx)(Ri, { size: 13, "aria-hidden": `true` }),
                      `Delete task`,
                    ],
                  }),
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
function nc({ task: e }) {
  let t = Yo(() => As(e.id), [e.id]) ?? [],
    n = e.dueAt == null ? void 0 : Zs(e.dueAt, Date.now()),
    r = t.filter((e) => e.fired === 1).length,
    i = `flex items-center gap-1.5 rounded border border-line px-2 py-1`;
  return (0, K.jsxs)(`div`, {
    className: `flex flex-wrap items-center gap-1.5 text-meta`,
    children: [
      e.priority !== `none` &&
        (0, K.jsxs)(`span`, {
          className: `${i} text-ink-secondary`,
          children: [
            (0, K.jsx)(Ei, {
              size: 12,
              "aria-hidden": `true`,
              style: { color: Qs[e.priority] },
            }),
            $s[e.priority],
          ],
        }),
      n &&
        (0, K.jsxs)(`span`, {
          className: `flex items-center gap-1.5 rounded px-2 py-1 ${n.tone === `danger` ? `bg-danger-bg text-danger` : n.tone === `warning` ? `bg-warning-bg text-warning` : `border border-line text-ink-muted`}`,
          children: [
            (0, K.jsx)(hi, { size: 12, "aria-hidden": `true` }),
            n.label,
          ],
        }),
      e.estimatedMinutes != null &&
        (0, K.jsxs)(`span`, {
          className: `${i} text-ink-secondary`,
          children: [
            (0, K.jsx)(Si, { size: 12, "aria-hidden": `true` }),
            e.estimatedMinutes,
            `m`,
          ],
        }),
      t.length > 0 &&
        (0, K.jsxs)(`span`, {
          className: `flex items-center gap-1.5 rounded bg-accent-bg px-2 py-1 text-accent`,
          children: [
            (0, K.jsx)(mi, { size: 12, "aria-hidden": `true` }),
            r,
            ` of `,
            t.length,
          ],
        }),
      e.tags.map((e) =>
        (0, K.jsx)(
          `span`,
          {
            className: `rounded px-2 py-1`,
            style: { color: Wi(e), background: `var(--surface-1)` },
            children: e,
          },
          e,
        ),
      ),
    ],
  });
}
function rc({ task: e }) {
  let [t, n] = (0, d.useState)(!1),
    r = async () => {
      n(!0);
      try {
        let t = oo(e, await Ja(e.id)),
          n = URL.createObjectURL(new Blob([t], { type: `text/markdown` })),
          r = document.createElement(`a`);
        ((r.href = n),
          (r.download = `${ic(e.title)}.md`),
          r.click(),
          URL.revokeObjectURL(n));
      } finally {
        n(!1);
      }
    };
  return (0, K.jsxs)(`button`, {
    type: `button`,
    disabled: t,
    onClick: () => void r(),
    className: `ml-auto flex items-center gap-1.5 pb-2 text-meta text-ink-muted hover:text-ink disabled:opacity-50`,
    children: [
      (0, K.jsx)(wi, { size: 13, "aria-hidden": `true` }),
      `Export thread`,
    ],
  });
}
function ic(e) {
  return (
    e
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, `-`)
      .replace(/^-|-$/g, ``) || `task`
  );
}
function ac({ message: e }) {
  return (0, K.jsx)(`p`, {
    className: `bg-surface-1 px-3 py-8 text-center text-body text-ink-muted`,
    children: e,
  });
}
function oc({ taskId: e }) {
  let t = Yo(() => As(e), [e]);
  if (!t || t.length === 0) return null;
  let n = t.filter((e) => e.fired === 1).length,
    r = t.find((e) => e.fired === 0);
  return (0, K.jsxs)(`span`, {
    className: `flex items-center gap-1 ${r ? `text-accent` : `text-ink-muted`}`,
    children: [
      (0, K.jsx)(mi, { size: 12, "aria-hidden": `true` }),
      r
        ? `Next in ${ba(r.remindAt - Date.now())} · ${n + 1} of ${t.length}`
        : `${n} of ${t.length} sent`,
    ],
  });
}
var sc = `rounded p-1.5 opacity-100 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100`;
function cc({
  task: e,
  showReorder: t,
  canMoveUp: n,
  canMoveDown: r,
  onDelete: i,
  onMove: a,
}) {
  let o = (e) => e.stopPropagation();
  return (0, K.jsxs)(`div`, {
    className: `flex shrink-0 items-center gap-0.5`,
    children: [
      t &&
        (0, K.jsxs)(K.Fragment, {
          children: [
            (0, K.jsx)(`button`, {
              type: `button`,
              "aria-label": `Move ${e.title} up`,
              disabled: !n,
              onClick: (e) => {
                (o(e), a(-1));
              },
              className: `${sc} text-ink-muted disabled:opacity-20`,
              children: (0, K.jsx)(_i, { size: 16, "aria-hidden": `true` }),
            }),
            (0, K.jsx)(`button`, {
              type: `button`,
              "aria-label": `Move ${e.title} down`,
              disabled: !r,
              onClick: (e) => {
                (o(e), a(1));
              },
              className: `${sc} text-ink-muted disabled:opacity-20`,
              children: (0, K.jsx)(gi, { size: 16, "aria-hidden": `true` }),
            }),
          ],
        }),
      (0, K.jsx)(`button`, {
        type: `button`,
        "aria-label": e.inMyDay
          ? `Remove ${e.title} from My Day`
          : `Add ${e.title} to My Day`,
        "aria-pressed": e.inMyDay,
        onClick: (t) => {
          (o(t), po(e.id, !e.inMyDay));
        },
        className: e.inMyDay
          ? `rounded p-1.5 text-accent`
          : `${sc} text-ink-muted`,
        children: (0, K.jsx)(Li, { size: 16, "aria-hidden": `true` }),
      }),
      (0, K.jsx)(`button`, {
        type: `button`,
        "aria-label": `Delete ${e.title}`,
        onClick: (e) => {
          (o(e), i());
        },
        className: `${sc} text-ink-muted hover:text-danger`,
        children: (0, K.jsx)(Ri, { size: 16, "aria-hidden": `true` }),
      }),
    ],
  });
}
var lc = {
    high: `bg-rail-high`,
    medium: `bg-rail-medium`,
    low: `bg-rail-low`,
    none: `bg-transparent`,
  },
  uc = {
    danger: `bg-danger-bg text-danger`,
    warning: `bg-warning-bg text-warning`,
    muted: `border-[0.5px] border-line-strong text-ink-muted`,
  };
function dc({ task: e }) {
  return e.status === `completed`
    ? (0, K.jsx)(yi, { size: 16, className: `text-success` })
    : e.status === `waiting`
      ? (0, K.jsx)(bi, { size: 16, className: `text-ink-muted` })
      : (0, K.jsx)(xi, { size: 16, className: `text-ink-muted` });
}
function Q({
  task: e,
  comments: t,
  selected: n,
  showReorder: r,
  canMoveUp: i,
  canMoveDown: a,
  onOpen: o,
  onDelete: s,
  onMove: c,
}) {
  let l = e.status === `completed`,
    u = e.dueAt != null && !l ? Zs(e.dueAt, Date.now()) : void 0;
  return (0, K.jsxs)(`article`, {
    onClick: o,
    "data-task-row": e.id,
    "aria-current": n ? `true` : void 0,
    className: `group relative flex cursor-pointer gap-3 rounded-none border bg-surface-1 py-[9px] pl-3 pr-3 ${n ? `border-accent` : `border-transparent`} ${l ? `opacity-[0.55]` : ``}`,
    children: [
      (0, K.jsx)(`span`, {
        "aria-hidden": `true`,
        className: `absolute inset-y-0 left-0 w-rail ${lc[e.priority]}`,
      }),
      (0, K.jsx)(`button`, {
        type: `button`,
        "aria-label": l ? `Reopen ${e.title}` : `Complete ${e.title}`,
        onClick: (t) => {
          (t.stopPropagation(), fo(e));
        },
        className: `mt-0.5 shrink-0 self-start`,
        children: (0, K.jsx)(dc, { task: e }),
      }),
      (0, K.jsxs)(`div`, {
        className: `min-w-0 flex-1`,
        children: [
          (0, K.jsxs)(`div`, {
            className: `flex items-start gap-2`,
            children: [
              (0, K.jsx)(`span`, {
                className: `min-w-0 flex-1 truncate text-title ${l ? `line-through` : ``}`,
                children: e.title,
              }),
              u &&
                (0, K.jsx)(`span`, {
                  className: `shrink-0 rounded px-1.5 py-0.5 text-meta ${uc[u.tone]}`,
                  children: u.label,
                }),
            ],
          }),
          !l &&
            (0, K.jsxs)(`div`, {
              className: `mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-ink-muted empty:hidden`,
              children: [
                (0, K.jsx)(oc, { taskId: e.id }),
                t > 0 &&
                  (0, K.jsxs)(`span`, {
                    className: `flex items-center gap-1`,
                    children: [
                      (0, K.jsx)(ji, { size: 12, "aria-hidden": `true` }),
                      t,
                    ],
                  }),
                e.estimatedMinutes != null &&
                  (0, K.jsxs)(`span`, { children: [e.estimatedMinutes, `m`] }),
                e.tags.map((e) =>
                  (0, K.jsx)(
                    `span`,
                    { style: { color: Wi(e) }, children: e },
                    e,
                  ),
                ),
              ],
            }),
        ],
      }),
      (0, K.jsx)(cc, {
        task: e,
        showReorder: r,
        canMoveUp: i,
        canMoveDown: a,
        onDelete: s,
        onMove: c,
      }),
    ],
  });
}
function fc({
  tasks: e,
  sortKey: t,
  emptyMessage: n,
  comments: r,
  cursor: i,
  onOpen: a,
  onDelete: o,
}) {
  return e.length === 0
    ? (0, K.jsx)(ac, { message: n })
    : (0, K.jsx)(`div`, {
        className: `flex flex-col gap-row`,
        children: e.map((n, s) =>
          (0, K.jsx)(
            Q,
            {
              task: n,
              comments: r.get(n.id) ?? 0,
              selected: n.id === i,
              showReorder: t === `manual`,
              canMoveUp: s > 0,
              canMoveDown: s < e.length - 1,
              onOpen: () => a(n.id),
              onDelete: () => o(n.id),
              onMove: (t) => {
                let r = e[s + t];
                r && ho(n.id, r.id);
              },
            },
            n.id,
          ),
        ),
      });
}
var pc = 6e3;
function mc({ message: e, onUndo: t, onDismiss: n }) {
  let [r, i] = (0, d.useState)(pc),
    a = (0, d.useRef)(Date.now()),
    o = (0, d.useRef)(n);
  ((o.current = n),
    (0, d.useEffect)(() => {
      ((a.current = Date.now()), i(pc));
      let e = setInterval(() => {
        let t = pc - (Date.now() - a.current);
        t <= 0 ? (clearInterval(e), o.current()) : i(t);
      }, 100);
      return () => clearInterval(e);
    }, [e]));
  let s = Math.ceil(r / 1e3);
  return (0, K.jsxs)(`div`, {
    role: `status`,
    "aria-live": `polite`,
    className: `fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded border border-line bg-surface-2 px-3 py-2 shadow-lg md:bottom-6 md:left-auto md:right-6 md:translate-x-0`,
    children: [
      (0, K.jsx)(`span`, { className: `text-title text-ink`, children: e }),
      (0, K.jsxs)(`button`, {
        type: `button`,
        onClick: t,
        className: `flex items-center gap-1.5 rounded border border-line px-2 py-1 text-meta text-accent hover:bg-surface-1`,
        children: [(0, K.jsx)(Bi, { size: 13, "aria-hidden": `true` }), `Undo`],
      }),
      (0, K.jsx)(`span`, {
        "aria-hidden": `true`,
        className: `w-4 text-right font-mono text-meta text-ink-muted`,
        children: s,
      }),
    ],
  });
}
async function hc(e, t) {
  let n = await Y.settings.get(e);
  return n === void 0 ? t : n.value;
}
async function gc(e, t) {
  await Y.settings.put({ key: e, value: t });
}
function _c(e, t) {
  let n = Yo(() => hc(e, t), [e]);
  return n === void 0 ? t : n;
}
var vc = `sortKey`;
function yc(e) {
  let [t, n] = (0, d.useState)(`Dashboard`),
    [r, i] = (0, d.useState)(),
    a = _c(vc, `manual`),
    o = Date.now(),
    s = (0, d.useMemo)(() => {
      let n = e.filter(
        (e) => Zi(e, t, o) && (r === void 0 || e.tags.includes(r)),
      );
      if (t === `Dashboard`) return ta(n, o);
      let i = r
        ? `Nothing tagged ${r} in ${t.toLowerCase()}. Clear the tag to see the rest.`
        : Ji[t];
      return [{ title: ``, column: 0, tasks: ea(n, a), empty: i }];
    }, [e, t, r, a]);
  return {
    view: t,
    sortKey: a,
    tag: r,
    sections: s,
    shown: (0, d.useMemo)(() => s.flatMap((e) => e.tasks), [s]),
    counts: (0, d.useMemo)(() => {
      let t = {};
      for (let n of G) t[n] = e.filter((e) => Zi(e, n, o)).length;
      return t;
    }, [e]),
    tags: (0, d.useMemo)(() => na(e), [e]),
    setView: n,
    setSortKey: (e) => void gc(vc, e),
    setTag: i,
  };
}
var bc = 5 * 6e4,
  xc = 1440 * 6e4,
  Sc = 20;
function Cc() {
  (0, d.useEffect)(() => {
    let e,
      t = !1,
      n = !1,
      r = !0,
      i = (n) => {
        if (t) return;
        e !== void 0 && clearTimeout(e);
        let r = n === void 0 ? bc : Math.min(Math.max(n - Date.now(), 0), bc);
        e = setTimeout(() => void o(), r);
      },
      a = async (e) => {
        let t = await Y.tasks.get(e.taskId);
        (t && t.status !== `completed` && (await Cs(t, e)), await Ns(e.id));
      },
      o = async () => {
        if (!(t || n)) {
          n = !0;
          try {
            let e = await js(Date.now());
            if (r && e.length > 1) {
              await ws(e.length);
              for (let t of e) await Ns(t.id);
            } else for (let t of e) await a(t);
            ((r = !1), await s());
          } finally {
            n = !1;
          }
          i(await Ms());
        }
      },
      s = async () => {
        let e = Date.now() + xc,
          t = await Y.reminderOccurrences
            .where(`[fired+remindAt]`)
            .between([0, Date.now()], [0, e])
            .limit(Sc)
            .toArray(),
          n = [];
        for (let e of t) {
          let t = await Y.tasks.get(e.taskId);
          t && t.status !== `completed` && n.push({ task: t, occurrence: e });
        }
        await Ts(n);
      },
      c = () => {
        document.visibilityState === `visible` && o();
      },
      l = La(() => Ms()).subscribe({
        next: (e) => i(e),
        error: () => i(void 0),
      });
    return (
      document.addEventListener(`visibilitychange`, c),
      o(),
      () => {
        ((t = !0),
          e !== void 0 && clearTimeout(e),
          l.unsubscribe(),
          document.removeEventListener(`visibilitychange`, c));
      }
    );
  }, []);
}
function wc(e) {
  if (!(e instanceof HTMLElement)) return !1;
  let t = e.tagName;
  return (
    t === `INPUT` || t === `TEXTAREA` || t === `SELECT` || e.isContentEditable
  );
}
function Tc(e, t = !0) {
  let n = (0, d.useRef)(e);
  ((n.current = e),
    (0, d.useEffect)(() => {
      if (!t) return;
      let e = (e) => {
        let t = n.current,
          r = wc(e.target);
        if (e.key === `Escape`) {
          t.onEscape();
          return;
        }
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === `k`) {
          (e.preventDefault(), t.onPalette());
          return;
        }
        if (!(r || e.metaKey || e.ctrlKey || e.altKey))
          switch (e.key) {
            case `/`:
              (e.preventDefault(), t.onSearch());
              break;
            case `n`:
              (e.preventDefault(), t.onQuickAdd());
              break;
            case `j`:
              (e.preventDefault(), t.onMove(1));
              break;
            case `k`:
              (e.preventDefault(), t.onMove(-1));
              break;
            case `x`:
              (e.preventDefault(), t.onToggleComplete());
              break;
            case `e`:
            case `Enter`:
              (e.preventDefault(), t.onOpen());
              break;
          }
      };
      return (
        window.addEventListener(`keydown`, e),
        () => window.removeEventListener(`keydown`, e)
      );
    }, [t]));
}
function Ec() {
  return Yo(() => Y.tasks.toArray(), []) ?? [];
}
function Dc(e) {
  return Yo(() => (e ? Y.tasks.get(e) : void 0), [e]);
}
var Oc = `theme`;
function kc() {
  return window.matchMedia?.(`(prefers-color-scheme: dark)`).matches
    ? `dark`
    : `light`;
}
function Ac(e) {
  document.documentElement.classList.toggle(`dark`, e === `dark`);
}
function jc() {
  let e = _c(Oc, null),
    [t] = (0, d.useState)(kc),
    n = e ?? t;
  return (
    (0, d.useEffect)(() => Ac(n), [n]),
    { theme: n, toggle: () => void gc(Oc, n === `dark` ? `light` : `dark`) }
  );
}
var Mc = `uiScale`,
  Nc = [
    { value: `default`, label: `Default`, rootPx: 16 },
    { value: `large`, label: `Large`, rootPx: 17.5 },
    { value: `larger`, label: `Larger`, rootPx: 19 },
  ];
function Pc() {
  let e = _c(Mc, `default`),
    t = Nc.find((t) => t.value === e) ?? Nc[0];
  return (
    (0, d.useEffect)(() => {
      document.documentElement.style.fontSize = `${t.rootPx}px`;
    }, [t.rootPx]),
    {
      scale: e,
      label: t.label,
      cycle: () => {
        gc(Mc, Nc[(Nc.findIndex((t) => t.value === e) + 1) % Nc.length].value);
      },
    }
  );
}
var Fc = `sidebarExpanded`;
function Ic() {
  let [e, t] = (0, d.useState)(),
    [n, r] = (0, d.useState)(!1),
    [i, a] = (0, d.useState)(!1),
    [o, s] = (0, d.useState)(),
    [c, l] = (0, d.useState)(),
    [u, f] = (0, d.useState)(),
    p = (0, d.useRef)(null),
    m = Ec(),
    h = yc(m),
    g = $o(),
    { theme: _, toggle: v } = jc(),
    y = Pc(),
    b = _c(Fc, !0),
    x = Dc(e),
    S = x ? `md:pr-[var(--drawer-gutter)]` : n ? `md:pr-[436px]` : `md:pr-4`,
    C = Ki.find((e) => e.value === h.sortKey)?.short ?? `Manual`;
  (Cc(),
    (0, d.useEffect)(() => {
      if (!(`serviceWorker` in navigator)) return;
      let e = (e) => {
        let n = e.data;
        n?.type === `open-task` && n.taskId && t(n.taskId);
      };
      return (
        navigator.serviceWorker.addEventListener(`message`, e),
        () => navigator.serviceWorker.removeEventListener(`message`, e)
      );
    }, []));
  let w = (0, d.useMemo)(
    () => h.shown.find((e) => e.id === u) ?? h.shown[0],
    [h.shown, u],
  );
  Tc({
    onSearch: () => a(!0),
    onPalette: () => a((e) => !e),
    onQuickAdd: () => p.current?.focus(),
    onMove: (e) => {
      let t = h.shown;
      if (t.length === 0) return;
      let n = t.findIndex((e) => e.id === w?.id),
        r = Math.min(Math.max(n + e, 0), t.length - 1);
      (f(t[r].id),
        document
          .querySelector(`[data-task-row="${t[r].id}"]`)
          ?.scrollIntoView({ block: `nearest` }));
    },
    onToggleComplete: () => {
      w && fo(w);
    },
    onOpen: () => {
      w && t(w.id);
    },
    onEscape: () => {
      i ? a(!1) : n ? r(!1) : e ? t(void 0) : h.tag && h.setTag(void 0);
    },
  });
  let T = (0, d.useCallback)(
      (n) => {
        (l(void 0),
          go(n)
            .then((r) => {
              (s(r), e === n && t(void 0));
            })
            .catch((e) => {
              l(e instanceof Error ? e.message : `Unable to delete the task.`);
            }));
      },
      [e],
    ),
    ee = (0, d.useCallback)(() => {
      if (!o) return;
      let e = o;
      (s(void 0), _o(e).catch(() => l(`Unable to restore the task.`)));
    }, [o]),
    te = h.view === `Dashboard`,
    ne = (0, d.useMemo)(
      () =>
        te
          ? Array.from({ length: 4 }, (e, t) =>
              h.sections.filter((e) => e.column === t),
            )
          : [h.sections],
      [te, h.sections],
    );
  return (0, K.jsxs)(`div`, {
    className: `min-h-screen bg-surface-0 text-ink`,
    children: [
      (0, K.jsx)(qo, {
        view: h.view,
        counts: h.counts,
        tags: h.tags,
        activeTag: h.tag,
        expanded: b,
        theme: _,
        onSelectView: h.setView,
        onSelectTag: h.setTag,
        onToggleExpanded: () => void gc(Fc, !b),
        onToggleTheme: v,
        onOpenSettings: () => r(!0),
      }),
      (0, K.jsx)(`main`, {
        className: `px-4 pb-24 pt-4 md:pb-10 md:pt-6 ${b ? `md:pl-[164px]` : `md:pl-[72px]`} ${S}`,
        children: (0, K.jsxs)(`div`, {
          className: `mx-auto flex flex-col gap-3 ${te ? `max-w-[80%]` : `max-w-list`}`,
          children: [
            (0, K.jsxs)(`header`, {
              className: `flex items-center gap-3`,
              children: [
                (0, K.jsx)(`h1`, {
                  className: `text-heading`,
                  children: h.tag ?? h.view,
                }),
                (0, K.jsx)(`span`, {
                  className: `text-meta text-ink-muted`,
                  children: Yr(Date.now(), `EEEE, d MMMM`),
                }),
                (0, K.jsxs)(`div`, {
                  className: `ml-auto flex items-center gap-2`,
                  children: [
                    h.view !== `Dashboard` &&
                      (0, K.jsxs)(`button`, {
                        type: `button`,
                        onClick: () => h.setSortKey(qi(h.sortKey)),
                        "aria-label": `Sort by ${C.toLowerCase()}, change`,
                        className: `flex items-center gap-1.5 rounded border border-line px-2 py-1 text-meta text-ink-secondary hover:border-line-strong`,
                        children: [
                          (0, K.jsx)(pi, { size: 12, "aria-hidden": `true` }),
                          C,
                        ],
                      }),
                    (0, K.jsxs)(`button`, {
                      type: `button`,
                      onClick: y.cycle,
                      "aria-label": `Text size ${y.label.toLowerCase()}, change`,
                      title: `Text size: ${y.label}`,
                      className: `flex items-center gap-1.5 rounded border px-2 py-1 text-meta hover:border-line-strong ${y.scale === "default" ? `border-line text-ink-secondary` : `border-accent text-accent`}`,
                      children: [
                        (0, K.jsx)(zi, { size: 12, "aria-hidden": `true` }),
                        y.label,
                      ],
                    }),
                    (0, K.jsx)(`button`, {
                      type: `button`,
                      onClick: () => a(!0),
                      "aria-label": `Open command palette`,
                      className: `rounded border border-line px-2 py-1 font-mono text-meta text-ink-secondary hover:border-line-strong`,
                      children: `⌘K`,
                    }),
                  ],
                }),
              ],
            }),
            (0, K.jsx)(To, { ref: p }),
            (0, K.jsx)(`div`, {
              className: te
                ? `flex flex-col  gap-3`
                : ``,
              children: ne.map((e, n) =>
                (0, K.jsx)(
                  `div`,
                  {
                    className: `flex flex-col gap-3`,
                    children: e.map((e) => {
                      let n = (0, K.jsx)(fc, {
                        tasks: e.tasks,
                        sortKey: h.sortKey,
                        emptyMessage: e.empty ?? ``,
                        comments: g,
                        cursor: w?.id,
                        onOpen: t,
                        onDelete: T,
                      });
                      return e.title
                        ? (0, K.jsxs)(
                            `section`,
                            {
                              className: `rounded border border-line bg-surface-2 p-2.5`,
                              children: [
                                (0, K.jsxs)(`h2`, {
                                  className: `pb-2 text-title text-ink-secondary`,
                                  children: [
                                    e.title,
                                    (0, K.jsx)(`span`, {
                                      className: `ml-1.5 text-ink-muted`,
                                      children: e.tasks.length,
                                    }),
                                  ],
                                }),
                                (0, K.jsx)(`div`, {
                                  className: `max-h-[60vh] overflow-y-auto`,
                                  children: n,
                                }),
                              ],
                            },
                            e.title,
                          )
                        : (0, K.jsx)(`div`, { children: n }, `all`);
                    }),
                  },
                  n,
                ),
              ),
            }),
            c &&
              (0, K.jsx)(`p`, {
                role: `alert`,
                className: `text-meta text-danger`,
                children: c,
              }),
          ],
        }),
      }),
      (0, K.jsx)(`button`, {
        type: `button`,
        "aria-label": `Add task`,
        onClick: () => p.current?.focus(),
        className: `fixed bottom-20 right-4 z-30 grid h-11 w-11 place-items-center rounded-full bg-accent text-white md:hidden`,
        children: (0, K.jsx)(Ni, { size: 20, "aria-hidden": `true` }),
      }),
      (0, K.jsx)(ca, {
        view: h.view,
        onSelectView: h.setView,
        onOpenSettings: () => r(!0),
      }),
      x &&
        (0, K.jsx)(ec, {
          task: x,
          onClose: () => t(void 0),
          onRequestDelete: () => T(x.id),
        }),
      n && (0, K.jsx)(Uo, { theme: _, onToggleTheme: v, onClose: () => r(!1) }),
      i &&
        (0, K.jsx)(aa, {
          tasks: m,
          tags: h.tags,
          onClose: () => a(!1),
          onSelectView: h.setView,
          onSelectTag: h.setTag,
          onOpenTask: t,
          onToggleTheme: v,
          onOpenSettings: () => r(!0),
        }),
      o &&
        (0, K.jsx)(mc, {
          message: `Deleted “${o.task.title}”`,
          onUndo: ee,
          onDismiss: () => s(void 0),
        }),
    ],
  });
}
(Vn({ immediate: !0 }),
  (0, In.createRoot)(document.getElementById(`root`)).render(
    (0, K.jsx)(d.StrictMode, {
      children: (0, K.jsx)(fn, { children: (0, K.jsx)(Ic, {}) }),
    }),
  ));
