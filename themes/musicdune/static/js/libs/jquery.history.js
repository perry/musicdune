window.JSON || (window.JSON = {});
(function() {
  function c(b) {
    return 10 > b ? "0" + b : b
  }
  function n(b) {
    return f.lastIndex = 0, f.test(b) ? '"' + b.replace(f, function(b) {
      var a = l[b];
      return"string" == typeof a ? a : "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
    }) + '"' : '"' + b + '"'
  }
  function k(b, j) {
    var a, c, f, l, g = h, e, d = j[b];
    d && "object" == typeof d && "function" == typeof d.toJSON && (d = d.toJSON(b));
    "function" == typeof p && (d = p.call(j, b, d));
    switch(typeof d) {
      case "string":
        return n(d);
      case "number":
        return isFinite(d) ? String(d) : "null";
      case "boolean":
      ;
      case "null":
        return String(d);
      case "object":
        if(!d) {
          return"null"
        }
        h += q;
        e = [];
        if("[object Array]" === Object.prototype.toString.apply(d)) {
          l = d.length;
          for(a = 0;a < l;a += 1) {
            e[a] = k(a, d) || "null"
          }
          return f = 0 === e.length ? "[]" : h ? "[\n" + h + e.join(",\n" + h) + "\n" + g + "]" : "[" + e.join(",") + "]", h = g, f
        }
        if(p && "object" == typeof p) {
          l = p.length;
          for(a = 0;a < l;a += 1) {
            c = p[a], "string" == typeof c && (f = k(c, d), f && e.push(n(c) + (h ? ": " : ":") + f))
          }
        }else {
          for(c in d) {
            Object.hasOwnProperty.call(d, c) && (f = k(c, d), f && e.push(n(c) + (h ? ": " : ":") + f))
          }
        }
        return f = 0 === e.length ? "{}" : h ? "{\n" + h + e.join(",\n" + h) + "\n" + g + "}" : "{" + e.join(",") + "}", h = g, f
    }
  }
  "use strict";
  "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + c(this.getUTCMonth() + 1) + "-" + c(this.getUTCDate()) + "T" + c(this.getUTCHours()) + ":" + c(this.getUTCMinutes()) + ":" + c(this.getUTCSeconds()) + "Z" : null
  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
    return this.valueOf()
  });
  var b = window.JSON, j = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, h, q, l = {"\b":"\\b", "\t":"\\t", "\n":"\\n", "\f":"\\f", "\r":"\\r", '"':'\\"', "\\":"\\\\"}, p;
  "function" != typeof b.stringify && (b.stringify = function(b, j, a) {
    var c;
    q = h = "";
    if("number" == typeof a) {
      for(c = 0;c < a;c += 1) {
        q += " "
      }
    }else {
      "string" == typeof a && (q = a)
    }
    p = j;
    if(!j || "function" == typeof j || "object" == typeof j && "number" == typeof j.length) {
      return k("", {"":b})
    }
    throw Error("JSON.stringify");
  });
  "function" != typeof b.parse && (b.parse = function(b, c) {
    function a(b, j) {
      var g, e, d = b[j];
      if(d && "object" == typeof d) {
        for(g in d) {
          Object.hasOwnProperty.call(d, g) && (e = a(d, g), void 0 !== e ? d[g] = e : delete d[g])
        }
      }
      return c.call(b, j, d)
    }
    var f;
    b = String(b);
    j.lastIndex = 0;
    j.test(b) && (b = b.replace(j, function(a) {
      return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }));
    if(/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
      return f = eval("(" + b + ")"), "function" == typeof c ? a({"":f}, "") : f
    }
    throw new SyntaxError("JSON.parse");
  })
})();
(function(c, n) {
  var k = c.History = c.History || {}, b = c.jQuery;
  if("undefined" != typeof k.Adapter) {
    throw Error("History.js Adapter has already been loaded...");
  }
  k.Adapter = {bind:function(j, c, h) {
    b(j).bind(c, h)
  }, trigger:function(c, f, h) {
    b(c).trigger(f, h)
  }, extractEventData:function(b, c, h) {
    return c && c.originalEvent && c.originalEvent[b] || h && h[b] || n
  }, onDomLoad:function(c) {
    b(c)
  }};
  "undefined" != typeof k.init && k.init()
})(window);
(function(c) {
  var n = c.document, k = c.setInterval || k, b = c.History = c.History || {};
  if("undefined" != typeof b.initHtml4) {
    throw Error("History.js HTML4 Support has already been loaded...");
  }
  b.initHtml4 = function() {
    if("undefined" != typeof b.initHtml4.initialized) {
      return!1
    }
    b.initHtml4.initialized = !0;
    b.enabled = !0;
    b.savedHashes = [];
    b.isLastHash = function(c) {
      var f = b.getHashByIndex(), h;
      return h = c === f, h
    };
    b.saveHash = function(c) {
      return b.isLastHash(c) ? !1 : (b.savedHashes.push(c), !0)
    };
    b.getHashByIndex = function(b) {
      return null
    };
    b.discardedHashes = {};
    b.discardedStates = {};
    b.discardState = function(c, f, h) {
      var k = b.getHashByState(c), l;
      return l = {discardedState:c, backState:h, forwardState:f}, b.discardedStates[k] = l, !0
    };
    b.discardHash = function(c, f, h) {
      return b.discardedHashes[c] = {discardedHash:c, backState:h, forwardState:f}, !0
    };
    b.discardedState = function(c) {
      c = b.getHashByState(c);
      var f;
      return f = b.discardedStates[c] || !1, f
    };
    b.discardedHash = function(c) {
      return b.discardedHashes[c] || !1
    };
    b.recycleState = function(c) {
      var f = b.getHashByState(c);
      return b.discardedState(c) && delete b.discardedStates[f], !0
    };
    b.emulated.hashChange && (b.hashChangeInit = function() {
      b.checkerFunction = null;
      var j = "", f, h, q;
      return b.isInternetExplorer() ? (f = n.createElement("iframe"), f.setAttribute("id", "historyjs-iframe"), f.style.display = "none", n.body.appendChild(f), f.contentWindow.document.open(), f.contentWindow.document.close(), h = "", q = !1, b.checkerFunction = function() {
        if(q) {
          return!1
        }
        q = !0;
        var l = b.getHash() || "", k = b.unescapeHash(f.contentWindow.document.location.hash) || "";
        return l !== j ? (j = l, k !== l && (h = l, f.contentWindow.document.open(), f.contentWindow.document.close(), f.contentWindow.document.location.hash = b.escapeHash(l)), b.Adapter.trigger(c, "hashchange")) : k !== h && (h = k, b.setHash(k, !1)), q = !1, !0
      }) : b.checkerFunction = function() {
        var f = b.getHash();
        return f !== j && (j = f, b.Adapter.trigger(c, "hashchange")), !0
      }, b.intervalList.push(k(b.checkerFunction, b.options.hashChangeInterval)), !0
    }, b.Adapter.onDomLoad(b.hashChangeInit));
    b.emulated.pushState && (b.onHashChange = function(j) {
      j = b.getHashByUrl(j && j.newURL || n.location.href);
      var f = null, h;
      return b.isLastHash(j) ? (b.busy(!1), !1) : (b.doubleCheckComplete(), b.saveHash(j), j && b.isTraditionalAnchor(j) ? (b.Adapter.trigger(c, "anchorchange"), b.busy(!1), !1) : (f = b.extractState(b.getFullUrl(j || n.location.href, !1), !0), b.isLastSavedState(f) ? (b.busy(!1), !1) : (b.getHashByState(f), h = b.discardedState(f), h ? (b.getHashByIndex(-2) === b.getHashByState(h.forwardState) ? b.back(!1) : b.forward(!1), !1) : (b.pushState(f.data, f.title, f.url, !1), !0))))
    }, b.Adapter.bind(c, "hashchange", b.onHashChange), b.pushState = function(j, f, h, k) {
      if(b.getHashByUrl(h)) {
        throw Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
      }
      if(!1 !== k && b.busy()) {
        return b.pushQueue({scope:b, callback:b.pushState, args:arguments, queue:k}), !1
      }
      b.busy(!0);
      var l = b.createStateObject(j, f, h), p = b.getHashByState(l), m = b.getState(!1), m = b.getHashByState(m), s = b.getHash();
      return b.storeState(l), b.expectedStateId = l.id, b.recycleState(l), b.setTitle(l), p === m ? (b.busy(!1), !1) : p !== s && p !== b.getShortUrl(n.location.href) ? (b.setHash(p, !1), !1) : (b.saveState(l), b.Adapter.trigger(c, "statechange"), b.busy(!1), !0)
    }, b.replaceState = function(c, f, h, k) {
      if(b.getHashByUrl(h)) {
        throw Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
      }
      if(!1 !== k && b.busy()) {
        return b.pushQueue({scope:b, callback:b.replaceState, args:arguments, queue:k}), !1
      }
      b.busy(!0);
      var l = b.createStateObject(c, f, h), n = b.getState(!1), m = b.getStateByIndex(-2);
      return b.discardState(n, l, m), b.pushState(l.data, l.title, l.url, !1), !0
    });
    b.emulated.pushState && b.getHash() && !b.emulated.hashChange && b.Adapter.onDomLoad(function() {
      b.Adapter.trigger(c, "hashchange")
    })
  };
  "undefined" != typeof b.init && b.init()
})(window);
(function(c, n) {
  var k = c.console || n, b = c.document, j = c.navigator, f = c.sessionStorage || !1, h = c.setTimeout, q = c.clearTimeout, l = c.setInterval, p = c.clearInterval, m = c.JSON, s = c.alert, a = c.History = c.History || {}, r = c.history;
  m.stringify = m.stringify || m.encode;
  m.parse = m.parse || m.decode;
  if("undefined" != typeof a.init) {
    throw Error("History.js Core has already been loaded...");
  }
  a.init = function() {
    return"undefined" == typeof a.Adapter ? !1 : ("undefined" != typeof a.initCore && a.initCore(), "undefined" != typeof a.initHtml4 && a.initHtml4(), !0)
  };
  a.initCore = function() {
    if("undefined" != typeof a.initCore.initialized) {
      return!1
    }
    a.initCore.initialized = !0;
    a.options = a.options || {};
    a.options.hashChangeInterval = a.options.hashChangeInterval || 100;
    a.options.safariPollInterval = a.options.safariPollInterval || 500;
    a.options.doubleCheckInterval = a.options.doubleCheckInterval || 500;
    a.options.storeInterval = a.options.storeInterval || 1E3;
    a.options.busyDelay = a.options.busyDelay || 250;
    a.options.debug = a.options.debug || !1;
    a.options.initialTitle = a.options.initialTitle || b.title;
    a.intervalList = [];
    a.clearAllIntervals = function() {
      var g, b = a.intervalList;
      if("undefined" != typeof b && null !== b) {
        for(g = 0;g < b.length;g++) {
          p(b[g])
        }
        a.intervalList = null
      }
    };
    a.debug = function() {
      a.options.debug && a.log.apply(a, arguments)
    };
    a.log = function() {
      var a = "undefined" != typeof k && "undefined" != typeof k.log && "undefined" != typeof k.log.apply, e = b.getElementById("log"), d, c, f, h;
      a ? (c = Array.prototype.slice.call(arguments), d = c.shift(), "undefined" != typeof k.debug ? k.debug.apply(k, [d, c]) : k.log.apply(k, [d, c])) : d = "\n" + arguments[0] + "\n";
      c = 1;
      for(f = arguments.length;c < f;++c) {
        h = arguments[c];
        if("object" == typeof h && "undefined" != typeof m) {
          try {
            h = m.stringify(h)
          }catch(j) {
          }
        }
        d += "\n" + h + "\n"
      }
      return e ? (e.value += d + "\n-----\n", e.scrollTop = e.scrollHeight - e.clientHeight) : a || s(d), !0
    };
    a.getInternetExplorerMajorVersion = function() {
      var g = a.getInternetExplorerMajorVersion, e;
      if("undefined" != typeof a.getInternetExplorerMajorVersion.cached) {
        e = a.getInternetExplorerMajorVersion.cached
      }else {
        e = 3;
        for(var d = b.createElement("div"), c = d.getElementsByTagName("i");(d.innerHTML = "\x3c!--[if gt IE " + ++e + "]><i></i><![endif]--\x3e") && c[0];) {
        }
        e = 4 < e ? e : !1
      }
      return g.cached = e
    };
    a.isInternetExplorer = function() {
      return a.isInternetExplorer.cached = "undefined" != typeof a.isInternetExplorer.cached ? a.isInternetExplorer.cached : Boolean(a.getInternetExplorerMajorVersion())
    };
    a.emulated = {pushState:!Boolean(c.history && c.history.pushState && c.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(j.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(j.userAgent)), hashChange:Boolean(!("onhashchange" in c || "onhashchange" in b) || a.isInternetExplorer() && 8 > a.getInternetExplorerMajorVersion())};
    a.enabled = !a.emulated.pushState;
    a.bugs = {setHash:Boolean(!a.emulated.pushState && "Apple Computer, Inc." === j.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(j.userAgent)), safariPoll:Boolean(!a.emulated.pushState && "Apple Computer, Inc." === j.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(j.userAgent)), ieDoubleCheck:Boolean(a.isInternetExplorer() && 8 > a.getInternetExplorerMajorVersion()), hashEscape:Boolean(a.isInternetExplorer() && 7 > a.getInternetExplorerMajorVersion())};
    a.isEmptyObject = function(a) {
      for(var b in a) {
        return!1
      }
      return!0
    };
    a.cloneObject = function(a) {
      var b, d;
      return a ? (b = m.stringify(a), d = m.parse(b)) : d = {}, d
    };
    a.getRootUrl = function() {
      var a = b.location.protocol + "//" + (b.location.hostname || b.location.host);
      b.location.port && (a += ":" + b.location.port);
      return a += "/", a
    };
    a.getBaseHref = function() {
      var a = b.getElementsByTagName("base"), e = "";
      return 1 === a.length && (e = null.href.replace(/[^\/]+$/, "")), e = e.replace(/\/+$/, ""), e && (e += "/"), e
    };
    a.getBaseUrl = function() {
      return a.getBaseHref() || a.getBasePageUrl() || a.getRootUrl()
    };
    a.getPageUrl = function() {
      var g;
      return g = ((a.getState(!1, !1) || {}).url || b.location.href).replace(/\/+$/, "").replace(/[^\/]+$/, function(a) {
        return/\./.test(a) ? a : a + "/"
      }), g
    };
    a.getBasePageUrl = function() {
      return b.location.href.replace(/[#\?].*/, "").replace(/[^\/]+$/, function(a) {
        return/[^\/]$/.test(a) ? "" : a
      }).replace(/\/+$/, "") + "/"
    };
    a.getFullUrl = function(g, b) {
      var d = g, c = g.substring(0, 1);
      return b = "undefined" == typeof b ? !0 : b, /[a-z]+\:\/\//.test(g) || ("/" === c ? d = a.getRootUrl() + g.replace(/^\/+/, "") : "#" === c ? d = a.getPageUrl().replace(/#.*/, "") + g : "?" === c ? d = a.getPageUrl().replace(/[\?#].*/, "") + g : b ? d = a.getBaseUrl() + g.replace(/^(\.\/)+/, "") : d = a.getBasePageUrl() + g.replace(/^(\.\/)+/, "")), d.replace(/\#$/, "")
    };
    a.getShortUrl = function(g) {
      var b = a.getBaseUrl(), d = a.getRootUrl();
      return a.emulated.pushState && (g = g.replace(b, "")), g = g.replace(d, "/"), a.isTraditionalAnchor(g) && (g = "./" + g), g = g.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""), g
    };
    a.store = {};
    a.idToState = a.idToState || {};
    a.stateToId = a.stateToId || {};
    a.urlToId = a.urlToId || {};
    a.storedStates = a.storedStates || [];
    a.savedStates = a.savedStates || [];
    a.normalizeStore = function() {
      a.store.idToState = a.store.idToState || {};
      a.store.urlToId = a.store.urlToId || {};
      a.store.stateToId = a.store.stateToId || {}
    };
    a.getState = function(g, b) {
      "undefined" == typeof g && (g = !0);
      "undefined" == typeof b && (b = !0);
      var d = a.getLastSavedState();
      return!d && b && (d = a.createStateObject()), g && (d = a.cloneObject(d), d.url = d.cleanUrl || d.url), d
    };
    a.getIdByState = function(b) {
      var e = a.extractId(b.url), d;
      if(!e) {
        if(d = a.getStateString(b), "undefined" != typeof a.stateToId[d]) {
          e = a.stateToId[d]
        }else {
          if("undefined" != typeof a.store.stateToId[d]) {
            e = a.store.stateToId[d]
          }else {
            for(;!(e = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""), "undefined" == typeof a.idToState[e] && "undefined" == typeof a.store.idToState[e]);) {
            }
            a.stateToId[d] = e;
            a.idToState[e] = b
          }
        }
      }
      return e
    };
    a.normalizeState = function(g) {
      var e;
      if(!g || "object" != typeof g) {
        g = {}
      }
      if("undefined" != typeof g.normalized) {
        return g
      }
      if(!g.data || "object" != typeof g.data) {
        g.data = {}
      }
      e = {normalized:!0};
      e.title = g.title || "";
      e.url = a.getFullUrl(a.unescapeString(g.url || b.location.href));
      e.hash = a.getShortUrl(e.url);
      e.data = a.cloneObject(g.data);
      e.id = a.getIdByState(e);
      e.cleanUrl = e.url.replace(/\??\&_suid.*/, "");
      e.url = e.cleanUrl;
      g = !a.isEmptyObject(e.data);
      if(e.title || g) {
        e.hash = a.getShortUrl(e.url).replace(/\??\&_suid.*/, ""), /\?/.test(e.hash) || (e.hash += "?"), e.hash += "&_suid=" + e.id
      }
      return e.hashedUrl = a.getFullUrl(e.hash), (a.emulated.pushState || a.bugs.safariPoll) && a.hasUrlDuplicate(e) && (e.url = e.hashedUrl), e
    };
    a.createStateObject = function(b, e, d) {
      b = {data:b, title:e, url:d};
      return b = a.normalizeState(b), b
    };
    a.getStateById = function(b) {
      b = String(b);
      return a.idToState[b] || a.store.idToState[b] || n
    };
    a.getStateString = function(b) {
      var e, d, c;
      return e = a.normalizeState(b), d = {data:e.data, title:b.title, url:b.url}, c = m.stringify(d), c
    };
    a.getStateId = function(b) {
      var e, d;
      return e = a.normalizeState(b), d = e.id, d
    };
    a.getHashByState = function(b) {
      var e, d;
      return e = a.normalizeState(b), d = e.hash, d
    };
    a.extractId = function(a) {
      var b, d;
      return d = /(.*)\&_suid=([0-9]+)$/.exec(a), b = d ? String(d[2] || "") : "", b || !1
    };
    a.isTraditionalAnchor = function(a) {
      return!/[\/\?\.]/.test(a)
    };
    a.extractState = function(b, e) {
      var d = null, c, f;
      return e = e || !1, c = a.extractId(b), c && (d = a.getStateById(c)), d || (f = a.getFullUrl(b), c = a.getIdByUrl(f) || !1, c && (d = a.getStateById(c)), !d && e && !a.isTraditionalAnchor(b) && (d = a.createStateObject(null, null, f))), d
    };
    a.getIdByUrl = function(b) {
      return a.urlToId[b] || a.store.urlToId[b] || n
    };
    a.getLastSavedState = function() {
      return a.savedStates[a.savedStates.length - 1] || n
    };
    a.getLastStoredState = function() {
      return a.storedStates[a.storedStates.length - 1] || n
    };
    a.hasUrlDuplicate = function(b) {
      var e = !1, d;
      return d = a.extractState(b.url), e = d && d.id !== b.id, e
    };
    a.storeState = function(b) {
      return a.urlToId[b.url] = b.id, a.storedStates.push(a.cloneObject(b)), b
    };
    a.isLastSavedState = function() {
      return a.savedStates.length && a.getLastSavedState(), !1
    };
    a.saveState = function(b) {
      return a.isLastSavedState(b) ? !1 : (a.savedStates.push(a.cloneObject(b)), !0)
    };
    a.getStateByIndex = function(a) {
      return null
    };
    a.getHash = function() {
      return a.unescapeHash(b.location.hash)
    };
    a.unescapeString = function(a) {
      for(var b;;) {
        b = c.unescape(a);
        if(b === a) {
          break
        }
        a = b
      }
      return a
    };
    a.unescapeHash = function(b) {
      b = a.normalizeHash(b);
      return b = a.unescapeString(b), b
    };
    a.normalizeHash = function(a) {
      return a.replace(/[^#]*#/, "").replace(/#.*/, "")
    };
    a.setHash = function(g, e) {
      var d, c, f;
      return!1 !== e && a.busy() ? (a.pushQueue({scope:a, callback:a.setHash, args:arguments, queue:e}), !1) : (d = a.escapeHash(g), a.busy(!0), c = a.extractState(g, !0), c && !a.emulated.pushState ? a.pushState(c.data, c.title, c.url, !1) : b.location.hash !== d && (a.bugs.setHash ? (f = a.getPageUrl(), a.pushState(null, null, f + "#" + d, !1)) : b.location.hash = d), a)
    };
    a.escapeHash = function(b) {
      b = a.normalizeHash(b);
      return b = c.escape(b), a.bugs.hashEscape || (b = b.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), b
    };
    a.getHashByUrl = function(b) {
      b = String(b).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
      return b = a.unescapeHash(b), b
    };
    a.setTitle = function(c) {
      var e = c.title, d;
      e || (d = a.getStateByIndex(0), d && d.url === c.url && (e = d.title || a.options.initialTitle));
      try {
        b.getElementsByTagName("title")[0].innerHTML = e.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
      }catch(f) {
      }
      return b.title = e, a
    };
    a.queues = [];
    a.busy = function(b) {
      "undefined" != typeof b ? a.busy.flag = b : "undefined" == typeof a.busy.flag && (a.busy.flag = !1);
      if(!a.busy.flag) {
        q(a.busy.timeout);
        var c = function() {
          var b, g;
          if(!a.busy.flag) {
            for(b = a.queues.length - 1;0 <= b;--b) {
              g = a.queues[b], 0 !== g.length && (g = g.shift(), a.fireQueueItem(g), a.busy.timeout = h(c, a.options.busyDelay))
            }
          }
        };
        a.busy.timeout = h(c, a.options.busyDelay)
      }
      return a.busy.flag
    };
    a.busy.flag = !1;
    a.fireQueueItem = function(b) {
      return b.callback.apply(b.scope || a, b.args || [])
    };
    a.pushQueue = function(b) {
      return a.queues[b.queue || 0] = a.queues[b.queue || 0] || [], a.queues[b.queue || 0].push(b), a
    };
    a.queue = function(b, c) {
      return"function" == typeof b && (b = {callback:b}), "undefined" != typeof c && (b.queue = c), a.busy() ? a.pushQueue(b) : a.fireQueueItem(b), a
    };
    a.clearQueue = function() {
      return a.busy.flag = !1, a.queues = [], a
    };
    a.stateChanged = !1;
    a.doubleChecker = !1;
    a.doubleCheckComplete = function() {
      return a.stateChanged = !0, a.doubleCheckClear(), a
    };
    a.doubleCheckClear = function() {
      return a.doubleChecker && (q(a.doubleChecker), a.doubleChecker = !1), a
    };
    a.doubleCheck = function(b) {
      return a.stateChanged = !1, a.doubleCheckClear(), a.bugs.ieDoubleCheck && (a.doubleChecker = h(function() {
        return a.doubleCheckClear(), a.stateChanged || b(), !0
      }, a.options.doubleCheckInterval)), a
    };
    a.safariStatePoll = function() {
      var g = a.extractState(b.location.href);
      if(!a.isLastSavedState(g)) {
        return g || a.createStateObject(), a.Adapter.trigger(c, "popstate"), a
      }
    };
    a.back = function(b) {
      return!1 !== b && a.busy() ? (a.pushQueue({scope:a, callback:a.back, args:arguments, queue:b}), !1) : (a.busy(!0), a.doubleCheck(function() {
        a.back(!1)
      }), r.go(-1), !0)
    };
    a.forward = function(b) {
      return!1 !== b && a.busy() ? (a.pushQueue({scope:a, callback:a.forward, args:arguments, queue:b}), !1) : (a.busy(!0), a.doubleCheck(function() {
        a.forward(!1)
      }), r.go(1), !0)
    };
    a.go = function(b, c) {
      var d;
      if(0 < b) {
        for(d = 1;d <= b;++d) {
          a.forward(c)
        }
      }else {
        if(!(0 > b)) {
          throw Error("History.go: History.go requires a positive or negative integer passed.");
        }
        for(d = -1;d >= b;--d) {
          a.back(c)
        }
      }
      return a
    };
    if(a.emulated.pushState) {
      var t = function() {
      };
      a.pushState = a.pushState || t;
      a.replaceState = a.replaceState || t
    }else {
      a.onPopState = function(g, e) {
        var d = !1, f = !1, h, j;
        return a.doubleCheckComplete(), h = a.getHash(), h ? (j = a.extractState(h || b.location.href, !0), j ? a.replaceState(j.data, j.title, j.url, !1) : (a.Adapter.trigger(c, "anchorchange"), a.busy(!1)), a.expectedStateId = !1, !1) : (d = a.Adapter.extractEventData("state", g, e) || !1, d ? f = a.getStateById(d) : a.expectedStateId ? f = a.getStateById(a.expectedStateId) : f = a.extractState(b.location.href), f || (f = a.createStateObject(null, null, b.location.href)), a.expectedStateId = !1,
        a.isLastSavedState(f) ? (a.busy(!1), !1) : (a.storeState(f), a.saveState(f), a.setTitle(f), a.Adapter.trigger(c, "statechange"), a.busy(!1), !0))
      }, a.Adapter.bind(c, "popstate", a.onPopState), a.pushState = function(b, e, d, f) {
        if(a.getHashByUrl(d) && a.emulated.pushState) {
          throw Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
        }
        if(!1 !== f && a.busy()) {
          return a.pushQueue({scope:a, callback:a.pushState, args:arguments, queue:f}), !1
        }
        a.busy(!0);
        var h = a.createStateObject(b, e, d);
        return a.isLastSavedState(h) ? a.busy(!1) : (a.storeState(h), a.expectedStateId = h.id, r.pushState(h.id, h.title, h.url), a.Adapter.trigger(c, "popstate")), !0
      }, a.replaceState = function(b, e, d, f) {
        if(a.getHashByUrl(d) && a.emulated.pushState) {
          throw Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
        }
        if(!1 !== f && a.busy()) {
          return a.pushQueue({scope:a, callback:a.replaceState, args:arguments, queue:f}), !1
        }
        a.busy(!0);
        var h = a.createStateObject(b, e, d);
        return a.isLastSavedState(h) ? a.busy(!1) : (a.storeState(h), a.expectedStateId = h.id, r.replaceState(h.id, h.title, h.url), a.Adapter.trigger(c, "popstate")), !0
      }
    }
    if(f) {
      try {
        a.store = m.parse(f.getItem("History.store")) || {}
      }catch(u) {
        a.store = {}
      }
    }else {
      a.store = {}
    }
    a.normalizeStore();
    a.Adapter.bind(c, "beforeunload", a.clearAllIntervals);
    a.Adapter.bind(c, "unload", a.clearAllIntervals);
    a.saveState(a.storeState(a.extractState(b.location.href, !0)));
    f && (a.onUnload = function() {
      var b, c;
      try {
        b = m.parse(f.getItem("History.store")) || {}
      }catch(d) {
        b = {}
      }
      b.idToState = b.idToState || {};
      b.urlToId = b.urlToId || {};
      b.stateToId = b.stateToId || {};
      for(c in a.idToState) {
        a.idToState.hasOwnProperty(c) && (b.idToState[c] = a.idToState[c])
      }
      for(c in a.urlToId) {
        a.urlToId.hasOwnProperty(c) && (b.urlToId[c] = a.urlToId[c])
      }
      for(c in a.stateToId) {
        a.stateToId.hasOwnProperty(c) && (b.stateToId[c] = a.stateToId[c])
      }
      a.store = b;
      a.normalizeStore();
      f.setItem("History.store", m.stringify(b))
    }, a.intervalList.push(l(a.onUnload, a.options.storeInterval)), a.Adapter.bind(c, "beforeunload", a.onUnload), a.Adapter.bind(c, "unload", a.onUnload));
    if(!a.emulated.pushState && (a.bugs.safariPoll && a.intervalList.push(l(a.safariStatePoll, a.options.safariPollInterval)), "Apple Computer, Inc." === j.vendor || "Mozilla" === (j.appCodeName || ""))) {
      a.Adapter.bind(c, "hashchange", function() {
        a.Adapter.trigger(c, "popstate")
      }), a.getHash() && a.Adapter.onDomLoad(function() {
        a.Adapter.trigger(c, "hashchange")
      })
    }
  };
  a.init()
})(window);
