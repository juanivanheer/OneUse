!(function () {
  !(function () {
    if ("undefined" != typeof window.XMLHttpRequest.open) {
      var e = new XMLHttpRequest();
      e.open("GET", "https://api.mercadopago.com/preconnect", !0), e.send();
    }
  })(),
    (window.mobilecheck = function () {
      var e = !1;
      return (
        (function (t) {
          (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            t
          ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              t.substr(0, 4)
            )) &&
            (e = !0);
        })(navigator.userAgent || navigator.vendor || window.opera),
        e
      );
    }),
    String.prototype.trim ||
      !(function () {
        var e = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
          return this.replace(e, "");
        };
      })();
  var JSON = JSON || {};
  JSON.parse ||
    !(function () {
      JSON.parse = function (obj) {
        "use strict";
        return eval("(" + obj + ")");
      };
    })(),
    JSON.stringify ||
      !(function () {
        JSON.stringify = function (e) {
          var t = typeof e;
          if ("object" != t || null === e)
            return "string" == t && (e = '"' + e + '"'), String(e);
          var n,
            i,
            r = [],
            o = e && e.constructor == Array;
          for (n in e)
            (i = e[n]),
              (t = typeof i),
              "string" == t
                ? (i = '"' + i + '"')
                : "object" == t && null !== i && (i = JSON.stringify(i)),
              "function" !== t && r.push((o ? "" : '"' + n + '":') + String(i));
          return (o ? "[" : "{") + String(r) + (o ? "]" : "}");
        };
      })(),
    Array.prototype.filter ||
      !(function () {
        Array.prototype.filter = function (e) {
          "use strict";
          if (void 0 === this || null === this) throw new TypeError();
          var t = Object(this),
            n = t.length >>> 0;
          if ("function" != typeof e) throw new TypeError();
          for (
            var i = [],
              r = arguments.length >= 2 ? arguments[1] : void 0,
              o = 0;
            n > o;
            o++
          )
            if (o in t) {
              var a = t[o];
              e.call(r, a, o, t) && i.push(a);
            }
          return i;
        };
      })(),
    Array.prototype.forEach ||
      (Array.prototype.forEach = function (e, t) {
        "use strict";
        var n, i;
        if (null == this) throw new TypeError("this is null or not defined");
        var r,
          o = Object(this),
          a = o.length >>> 0;
        if ("[object Function]" !== {}.toString.call(e))
          throw new TypeError(e + " is not a function");
        for (arguments.length >= 2 && (n = t), i = 0; a > i; )
          i in o && ((r = o[i]), e.call(n, r, i, o)), i++;
      }),
    document.querySelectorAll ||
      !(function () {
        document.querySelectorAll = function (e) {
          var t,
            n = document.createElement("style"),
            i = [];
          for (
            document.documentElement.firstChild.appendChild(n),
              document._qsa = [],
              n.styleSheet.cssText =
                e +
                "{x-qsa:expression(document._qsa && document._qsa.push(this))}",
              window.scrollBy(0, 0),
              n.parentNode.removeChild(n);
            document._qsa.length;

          )
            (t = document._qsa.shift()),
              t.style.removeAttribute("x-qsa"),
              i.push(t);
          return (document._qsa = null), i;
        };
      })(),
    document.querySelector ||
      !(function () {
        document.querySelector = function (e) {
          var t = document.querySelectorAll(e);
          return t.length ? t[0] : null;
        };
      })();
})(),
  function () {
    var e = {
        version: "1.6.18",
        initialized: !1,
        initializedInsights: !1,
        key: null,
        deviceProfileId: null,
        tokenId: null,
        sessionId: null,
        environment: "omega",
      },
      t = { utils: {}, card: {}, request: {}, paymentMethods: {} },
      n = [];
    (e.referer = (function () {
      var e =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "");
      return e;
    })()),
      (e.setPublishableKey = function (t) {
        (e.key = t), e.initMercadopago();
      }),
      (function (e) {
        "use strict";
        var t = { baseUrl: "https://api.mercadopago.com/v1" };
        (t.clear = function (e) {
          return ("" + e).trim().replace(/\s+|-/g, "");
        }),
          (t.paramsForm = function (e) {
            var t = {},
              n = e.querySelectorAll("[data-checkout]");
            return (
              Array.prototype.forEach.call(n, function (e) {
                var n = e.getAttribute("data-checkout"),
                  i = e.selectedIndex;
                t[n] =
                  "SELECT" === e.nodeName && null !== i && -1 !== i
                    ? e.options[i].value
                    : e.value;
              }),
              t
            );
          }),
          (t.isEmpty = function (e) {
            var t = Object.prototype.hasOwnProperty;
            if (null == e) return !0;
            if (e.length > 0) return !1;
            if (0 === e.length) return !0;
            for (var n in e) if (t.call(e, n)) return !1;
            return !0;
          }),
          (e.utils = t);
      })(t),
      (function (e, t) {
        function n(t) {
          function n() {
            {
              var e,
                a = i ? new XDomainRequest() : new XMLHttpRequest();
              new Date().getTime();
            }
            return (
              a.open(t.method, t.url, !0),
              (a.timeout = t.timeout || 1e3),
              window.XDomainRequest
                ? ((a.onload = function () {
                    (e = JSON.parse(a.responseText)),
                      "function" == typeof t.success &&
                        t.success("POST" === t.requestedMethod ? 201 : 200, e),
                      "function" == typeof t.complete &&
                        t.complete("POST" === t.requestedMethod ? 201 : 200, e);
                  }),
                  (a.onerror = a.ontimeout = function () {
                    return r > 0
                      ? (r--, o++, setTimeout(n, 500))
                      : ("function" == typeof t.error &&
                          t.error(400, {
                            user_agent: window.navigator.userAgent,
                            error: "bad_request",
                            cause: [],
                          }),
                        void (
                          "function" == typeof t.complete &&
                          t.complete(400, {
                            user_agent: window.navigator.userAgent,
                            error: "bad_request",
                            cause: [],
                          })
                        ));
                  }),
                  (a.onprogress = function () {}))
                : (a.setRequestHeader("Accept", "application/json"),
                  -1 !==
                    t.url.indexOf(
                      "https://api.mercadopago.com/v1/card_tokens"
                    ) &&
                    (window.mobilecheck()
                      ? a.setRequestHeader(
                          "X-Product-Id",
                          "BCLQ07IBVKH001FP9VCG"
                        )
                      : a.setRequestHeader(
                          "X-Product-Id",
                          "BCHJ1GABVKH001FP9V4G"
                        )),
                  t.contentType
                    ? a.setRequestHeader("Content-Type", t.contentType)
                    : a.setRequestHeader("Content-Type", "application/json"),
                  (a.onreadystatechange = function () {
                    if (4 === this.readyState) {
                      {
                        0 == o ? t.id : t.id + "_retry";
                      }
                      if (this.status >= 200 && this.status < 400)
                        (e = JSON.parse(this.responseText)),
                          "function" == typeof t.success &&
                            t.success(this.status, e),
                          "function" == typeof t.complete &&
                            t.complete(this.status, e);
                      else if (this.status >= 400 && this.status < 500)
                        (e = JSON.parse(this.responseText)),
                          "function" == typeof t.error &&
                            t.error(this.status, e),
                          "function" == typeof t.complete &&
                            t.complete(this.status, e);
                      else if (this.status >= 500) {
                        if (r > 0) return r--, o++, setTimeout(n, 500);
                        (e = JSON.parse(this.responseText)),
                          "function" == typeof t.error &&
                            t.error(this.status, e),
                          "function" == typeof t.complete &&
                            t.complete(this.status, e);
                      } else {
                        if (r > 0) return r--, o++, setTimeout(n, 500);
                        "function" == typeof t.error && t.error(503, {}),
                          "function" == typeof t.complete &&
                            t.complete(503, {});
                      }
                    }
                  })),
              0 == r && o > 0
                ? (a.abort(), !1)
                : void ("GET" === t.method || null == t.data || void 0 == t.data
                    ? a.send()
                    : a.send(JSON.stringify(t.data)))
            );
          }
          var i = !!window.XDomainRequest,
            r = parseInt(t.retries, 10);
          (r = isNaN(r) || 1 > r ? 2 : r), r++;
          var o = 0;
          (t.url +=
            (t.url.indexOf("?") >= 0 ? "&" : "?") +
            "referer=" +
            escape(e.referer)),
            (t.requestedMethod = t.method),
            i &&
              "PUT" == t.method &&
              ((t.method = "POST"), (t.url += "&_method=PUT")),
            (t.id = t.id || "ajax"),
            n();
        }
        (t.request.AJAX = n), (e.AJAX = n);
      })(e, t),
      (function (e, t) {
        t.request, t.utils;
      })(e, t),
      (function (e, t) {
        function i(t, n) {
          var i =
            o.baseUrl +
            "/payment_methods/search?public_key=" +
            e.key +
            "&marketplace=NONE&status=active&js_version=" +
            e.version;
          t.bin
            ? (i += "&bins=" + t.bin)
            : t.payment_method_id && (i += "&id=" + t.payment_method_id),
            a.AJAX({
              id: "searchPaymentMethodsByBin",
              method: "GET",
              url: i,
              timeout: 1e4,
              error: function (e, t) {
                "function" == typeof n ? n(e, t) : null;
              },
              success: function (e, t) {
                "function" == typeof n ? n(e, t) : null;
              },
            });
        }
        function r(e) {
          for (var t = [], n = [], i = 0; i < e.length; i++)
            for (var r = e[i], o = 0; o < s.length; o++) {
              var a = s[o];
              if (
                a.id === r.id &&
                a.payment_type_id === r.payment_type_id &&
                !n[r.id + r.payment_type_id]
              ) {
                var c = JSON.parse(JSON.stringify(a));
                (c.settings = r.settings),
                  t.push(c),
                  (n[r.id + r.payment_type_id] = !0);
                break;
              }
            }
          return t;
        }
        var o = t.utils,
          a = t.request,
          c = {},
          d = {},
          s = [],
          u = {},
          l = {};
        (l.validateBinPattern = function (e, t) {
          var n = e.slice(0, 6);
          return !(
            !t ||
            !t.bin ||
            (n.match(t.bin.pattern) ? 0 : 1) ||
            (t.bin.exclusion_pattern && n.match(t.bin.exclusion_pattern))
          );
        }),
          (l.setPaymentMethods = function (e) {
            s = e;
          }),
          (l.getPaymentMethods = function () {
            return s;
          }),
          (l.getPaymentMethod = function (t, a) {
            if (!e.initialized)
              return n.push({ method: "getPaymentMethod", args: arguments });
            t.bin &&
              (t.bin = o
                .clear(t.bin)
                .replace(/[^0-9]/g, "")
                .slice(0, 6));
            var d = t.bin || t.payment_method_id;
            return d
              ? c && c[d]
                ? "function" == typeof a
                  ? a(200, c[d])
                  : null
                : i(t, function (e, t) {
                    var n = e,
                      i = t;
                    return (
                      200 === e &&
                        t &&
                        (t.results && t.results.length > 0
                          ? ((i = r(t.results)), (c[d] = i))
                          : ((n = 400),
                            (i = {
                              message: "payment method not found",
                              error: "bad_request",
                              status: 400,
                              cause: [],
                            }))),
                      "function" == typeof a ? a(n, i) : null
                    );
                  })
              : "function" == typeof a
              ? a(
                  400,
                  {
                    status: 400,
                    error: "bad_request",
                    cause: {
                      code: "2000",
                      description: "the payment_method_id or bin are required",
                    },
                  },
                  t
                )
              : null;
          }),
          (l.getAllPaymentMethods = function (t) {
            var n =
              o.baseUrl +
              "/payment_methods?public_key=" +
              e.key +
              "&js_version=" +
              e.version;
            document.querySelector("html").getAttribute("lang") &&
              (n +=
                "&locale=" +
                document.querySelector("html").getAttribute("lang")),
              a.AJAX({
                id: "getAllPaymentMethods",
                method: "GET",
                url: n,
                timeout: 1e4,
                success: function (e, n) {
                  l.setPaymentMethods(n),
                    "function" == typeof t ? t(e, n) : null;
                },
                error: function (e, n) {
                  "function" == typeof t ? t(e, n) : null;
                },
              });
          }),
          (l.getInstallments = function (t, i) {
            if (!e.initialized)
              return n.push({ method: "getInstallments", args: arguments });
            var r =
                o.baseUrl +
                "/payment_methods/installments?public_key=" +
                e.key +
                "&js_version=" +
                e.version,
              c = t.bin || t.payment_method_id,
              s = "";
            return (
              t.bin && (s += "&bin=" + t.bin),
              t.payment_method_id &&
                (s += "&payment_method_id=" + t.payment_method_id),
              t.issuer_id && (s += "&issuer.id=" + t.issuer_id),
              t.payment_type_id &&
                (s += "&payment_type_id=" + t.payment_type_id),
              t.amount && (s += "&amount=" + t.amount),
              t.differential_pricing_id &&
                (s += "&differential_pricing_id=" + t.differential_pricing_id),
              document.querySelector("html").getAttribute("lang") &&
                (s +=
                  "&locale=" +
                  document.querySelector("html").getAttribute("lang")),
              (r += s),
              d && d[s]
                ? "function" == typeof i
                  ? i(200, d[s])
                  : null
                : void a.AJAX({
                    id: "getInstallments",
                    method: "GET",
                    url: r,
                    timeout: 1e4,
                    error: function (e, n) {
                      "function" == typeof i ? i(e, n, t) : null;
                    },
                    success: function (e, n) {
                      200 === e &&
                        n.length > 0 &&
                        (c && (d[c] = n), s && (d[s] = n)),
                        "function" == typeof i ? i(e, n, t) : null;
                    },
                  })
            );
          }),
          (l.getIssuers = function (t, n) {
            var i =
              o.baseUrl +
              "/payment_methods/card_issuers?public_key=" +
              e.key +
              "&js_version=" +
              e.version;
            return (
              (null !== t || void 0 !== t) && (i += "&payment_method_id=" + t),
              u[t]
                ? "function" == typeof n
                  ? n(200, u[t])
                  : null
                : void a.AJAX({
                    id: "cardIssuers",
                    method: "GET",
                    url: i,
                    timeout: 1e4,
                    error: function (e, t) {
                      "function" == typeof n ? n(e, t) : null;
                    },
                    success: function (e, i) {
                      200 === e && (u[t] = i),
                        "function" == typeof n ? n(e, i) : null;
                    },
                  })
            );
          }),
          (t.paymentMethods = l);
        for (exports in l) e[exports] = l[exports];
      })(e, t),
      (function (e, t) {
        function r(t) {
          function r(e, n) {
            if ("function" == typeof t) t(e, n);
            else if (200 == e) {
              var i = document.querySelector("select[data-checkout=docType]");
              if (i) {
                i.options.length = 0;
                for (var r = 0; r < n.length; r++) {
                  var o = n[r],
                    a = new Option(o.name, o.id);
                  i.options.add(a);
                }
              }
            }
          }
          return e.initialized
            ? void (h.identificationTypes.length >= 1
                ? r(200, h.identificationTypes)
                : f.AJAX({
                    id: "getIdentificationTypes",
                    method: "GET",
                    timeout: 5e3,
                    url:
                      m.baseUrl + "/identification_types?public_key=" + e.key,
                    success: function (e, t) {
                      200 == e && (h.identificationTypes = t), r(e, t);
                    },
                    error: function (e, n) {
                      if (404 == e) {
                        var r = [
                          document.querySelector(
                            "select[data-checkout=docType]"
                          ),
                          document.querySelector(
                            "input[data-checkout=docNumber]"
                          ),
                          document.querySelector("label[for=docType]"),
                          document.querySelector("label[for=docNumber]"),
                        ];
                        for (i in r) r[i] && (r[i].style.display = "none");
                      }
                      "function" == typeof t ? t(e, n) : null;
                    },
                  }))
            : n.push({ method: "getIdentificationTypes", args: arguments });
        }
        function o(e) {
          var t, n, i, r, o, a;
          for (
            i = !0,
              r = 0,
              n = (e + "").split("").reverse(),
              o = 0,
              a = n.length;
            a > o;
            o++
          )
            (t = n[o]),
              (t = parseInt(t, 10)),
              (i = !i) && (t *= 2),
              t > 9 && (t -= 9),
              (r += t);
          return r % 10 === 0;
        }
        function a(e, t, n) {
          (e = m.clear(e)), void 0 == n && "function" == typeof t && (n = t);
          var i = { bin: e, internal_validate: !0 };
          "function" != typeof t && (i.payment_method_id = t),
            y.getPaymentMethod(i, function (t, i) {
              var r = !1;
              if (200 == t)
                for (var a = 0; a < i.length && !r; a++) {
                  config = i[a].settings;
                  for (var c = 0; config && c < config.length && !r; c++)
                    r =
                      e.length == config[c].card_number.length &&
                      y.validateBinPattern(e, config[c]) &&
                      ("none" == config[c].card_number.validation || o(e));
                }
              "function" == typeof n ? n(t, r) : null;
            });
        }
        function c(e, t, n) {
          return (
            (e = m.clear(e)),
            e && !/^\d+$/.test(e)
              ? "function" == typeof n
                ? n(200, !1)
                : null
              : void y.getPaymentMethod(
                  { bin: t, internal_validate: !0 },
                  function (t, i) {
                    var r = !0;
                    if (200 == t)
                      for (
                        var o = i[0] ? i[0].settings : [], a = 0;
                        o && a < o.length && r;
                        a++
                      )
                        r =
                          !o[a].security_code.length ||
                          e.length == o[a].security_code.length ||
                          ("optional" == o[a].security_code.mode && !e.length);
                    return "function" == typeof n ? n(t, r) : null;
                  }
                )
          );
        }
        function d(e, t, n) {
          var i = t.length;
          y.getPaymentMethod(
            { bin: e.cardNumber, internal_validate: !0 },
            function (r, o) {
              if (200 == r)
                for (
                  var a = o[0] ? o[0].additional_info_needed : [], c = 0;
                  c < a.length;
                  c++
                )
                  switch (a[c]) {
                    case "cardholder_name":
                      e.cardholderName && "" !== e.cardholderName
                        ? s(e.cardholderName) ||
                          (t[i++] = h.invalidParamsCode.cardholderName)
                        : (t[i++] = h.requiredParamsCodes.cardholderName);
                      break;
                    case "cardholder_identification_type":
                      e.docType && "" !== e.docType
                        ? h.identificationTypes &&
                          !h.identificationTypes.filter(function (t) {
                            return t.id == e.docType;
                          }) &&
                          (t[i++] = h.invalidParamsCode.docType)
                        : (t[i++] = h.requiredParamsCodes.docType);
                      break;
                    case "cardholder_identification_number":
                      e.docNumber && "" !== e.docNumber
                        ? u(e.docType, e.docNumber) ||
                          (t[i++] = h.invalidParamsCode.docNumber)
                        : (t[i++] = h.requiredParamsCodes.docNumber);
                  }
              "function" == typeof n ? n(r, t) : null;
            }
          );
        }
        function s(e) {
          var t =
            "^[a-zA-ZãÃáÁàÀâÂäÄẽẼéÉèÈêÊëËĩĨíÍìÌîÎïÏõÕóÓòÒôÔöÖũŨúÚùÙûÛüÜçÇ’ñÑ .']*$";
          return e.match(t) ? !0 : !1;
        }
        function u(e, t) {
          if (0 === h.identificationTypes.length) return !0;
          t = m.clear(t);
          var n =
            0 === h.identificationTypes.length
              ? null
              : h.identificationTypes.filter(function (t) {
                  return t.id == e;
                })[0];
          return (
            (n = n || null),
            (t = t || null),
            null !== n &&
              null !== t &&
              n.min_length <= t.length &&
              t.length <= n.max_length
          );
        }
        function l(e, t) {
          var n, i;
          if (((e = ("" + e).trim()), void 0 == t)) {
            if (1 == e.split("/").length) return !1;
            (t = e.split("/")[1]), (e = e.split("/")[0]);
          }
          return (
            (t = ("" + t).trim()),
            2 == t.length && (t = "20" + t),
            /^\d+$/.test(e) && /^\d+$/.test(t) && parseInt(e, 10) <= 12
              ? ((i = new Date(t, e)),
                (n = new Date()),
                i.setMonth(i.getMonth() - 1),
                i.setMonth(i.getMonth() + 1, 1),
                i > n)
              : !1
          );
        }
        function p(t, n) {
          var i,
            r = 0,
            o = [];
          if (t.cardId && "" !== t.cardId && "-1" !== t.cardId)
            return void n(o);
          !t.cardExpiration || (t.cardExpirationMonth && t.cardExpirationYear)
            ? (t.cardExpiration =
                t.cardExpirationMonth + "/" + t.cardExpirationYear)
            : ((t.cardExpirationMonth = t.cardExpiration.split("/")[0]),
              (t.cardExpirationYear = t.cardExpiration.split("/")[1])),
            t.cardExpirationYear &&
              2 == t.cardExpirationYear.length &&
              (t.cardExpirationYear = "20" + t.cardExpirationYear),
            (t.docNumber = m.clear(t.docNumber));
          for (var s = 0; s < h.whitelistedAttrs.length; s++)
            (i = h.whitelistedAttrs[s]),
              ("cardNumber" == i || "securityCode" == i) &&
                (t[i] = m.clear(t[i])),
              (t[i] && "" !== t[i]) ||
                "cardIssuerId" === i ||
                "securityCode" === i ||
                (o[r++] = h.requiredParamsCodes[i]);
          e.validateExpiryDate(t.cardExpirationMonth, t.cardExpirationYear) ||
            ((o[r++] = h.invalidParamsCode.cardExpirationMonth),
            (o[r++] = h.invalidParamsCode.cardExpirationYear)),
            a(t.cardNumber, function (e, i) {
              i || (o[r++] = h.invalidParamsCode.cardNumber),
                c(t.securityCode, t.cardNumber, function (e, i) {
                  i || (o[r++] = h.invalidParamsCode.securityCode),
                    d(t, o, function (e, t) {
                      n(t);
                    });
                });
            });
        }
        var m = t.utils,
          f = t.request,
          y = t.paymentMethods,
          h = {
            tokenName: "card",
            whitelistedAttrs: [
              "cardNumber",
              "securityCode",
              "cardExpirationMonth",
              "cardExpirationYear",
              "cardExpiration",
              "cardIssuerId",
            ],
            identificationTypes: [],
            requiredParamsCodes: {
              cardholderName: {
                code: "221",
                description: "parameter cardholderName can not be null/empty",
              },
              docNumber: {
                code: "214",
                description: "parameter docNumber can not be null/empty",
              },
              docType: {
                code: "212",
                description: "parameter docType can not be null/empty",
              },
              cardNumber: {
                code: "205",
                description: "parameter cardNumber can not be null/empty",
              },
              securityCode: {
                code: "224",
                description: "parameter securityCode can not be null/empty",
              },
              cardExpirationMonth: {
                code: "208",
                description:
                  "parameter cardExpirationMonth can not be null/empty",
              },
              cardExpirationYear: {
                code: "209",
                description:
                  "parameter cardExpirationYear can not be null/empty",
              },
              cardIssuerId: {
                code: "220",
                description: "parameter cardIssuerId can not be null/empty",
              },
            },
            invalidParamsCode: {
              cardholderName: {
                code: "316",
                description: "invalid parameter cardholderName",
              },
              docNumber: {
                code: "324",
                description: "invalid parameter docNumber",
              },
              docType: {
                code: "322",
                description: "invalid parameter docType",
              },
              cardNumber: {
                code: "E301",
                description: "invalid parameter cardNumber",
              },
              securityCode: {
                code: "E302",
                description: "invalid parameter securityCode",
              },
              cardExpirationMonth: {
                code: "325",
                description: "invalid parameter cardExpirationMonth",
              },
              cardExpirationYear: {
                code: "326",
                description: "invalid parameter cardExpirationYear",
              },
            },
          };
        (e.validateLuhn = o),
          (e.validateCardNumber = a),
          (e.validateSecurityCode = c),
          (e.validateCardholderName = s),
          (e.validateIdentification = u),
          (e.validateExpiryDate = l),
          (e.getIdentificationTypes = r),
          (h.validate = p),
          (t.card = h);
      })(e, t),
      (function (e, t) {
        function n(t) {
          var n = {};
          return (
            e.deviceProfileId &&
              (n.device = { meli: { session_id: e.deviceProfileId } }),
            t.cardId && "" !== t.cardId && "-1" !== t.cardId
              ? ((n.card_id = t.cardId), (n.security_code = t.securityCode), n)
              : ((n.card_number = t.cardNumber),
                (n.security_code = t.securityCode),
                (n.expiration_month = parseInt(t.cardExpirationMonth, 10)),
                (n.expiration_year = parseInt(t.cardExpirationYear, 10)),
                (n.cardholder = { name: t.cardholderName }),
                (n.cardholder.identification = {
                  type:
                    "" === t.docType || void 0 === t.docType ? null : t.docType,
                  number:
                    "" === t.docNumber || void 0 === t.docNumber
                      ? null
                      : t.docNumber,
                }),
                n)
          );
        }
        function i(n, i) {
          e.tokenId ? t.CardToken.update(n, i) : t.CardToken.create(n, i);
        }
        function r(e, t, n) {
          e && e.jquery && (e = e[0]),
            (e instanceof HTMLFormElement ||
              (void 0 !== e.nodeType &&
                e.nodeType === document.ELEMENT_NODE)) &&
              (e = c.paramsForm(e)),
            c.isEmpty(e)
              ? n(e)
              : d.validate(e, function (t) {
                  t.length && (e = t), n(e);
                });
        }
        function o(t, n) {
          function r() {
            for (var e = 0, t = [], n = 0; o && n < o.length; n++) {
              var i = o[n];
              null === i.name ||
                void 0 === i.name ||
                "" === i.name ||
                ("cardNumber" != i.getAttribute("data-checkout") &&
                  "securityCode" != i.getAttribute("data-checkout")) ||
                (t[e++] = i.getAttribute("data-checkout"));
            }
          }
          if (!e.key || "string" != typeof e.key)
            throw new Error(
              "You did not set a valid publishable key. Call Mercadopago.setPublishableKey() with your public_key."
            );
          if (/\s/g.test(e.key))
            throw new Error("Your key is invalid, as it contains whitespaces.");
          var o = document.querySelectorAll("[data-checkout]");
          if (
            "file:" != window.location.protocol &&
            "https:" != window.location.protocol &&
            o &&
            o.length > 0 &&
            !/^TEST/.test(e.key)
          )
            throw new Error(
              "Your payment cannot be processed because the website contains credit card data and is not using a secure connection.SSL certificate is required to operate."
            );
          r(), (t.card.public_key = e.key), i(t, n);
        }
        function a(e, t) {
          function n(e) {
            return (
              (i[d.tokenName] = e),
              i[d.tokenName][0]
                ? t(400, {
                    error: "bad_request",
                    message: "invalid parameters",
                    cause: i[d.tokenName],
                  })
                : o(i, t)
            );
          }
          var i = {};
          r(e, d.whitelistedAttrs, n);
        }
        var c = t.utils,
          d = t.card,
          s = t.request,
          u = {};
        (u.request = function (t, i, r) {
          var o = c.baseUrl + "/card_tokens",
            a = i.card ? n(i.card) : {};
          if (
            ((r = "function" == typeof r ? r : function () {}),
            "POST" != t && "PUT" != t)
          )
            throw new Error("Method not allowed.");
          "PUT" == t && (o += "/" + e.tokenId),
            (o += "?public_key=" + e.key + "&js_version=" + e.version),
            s.AJAX({
              id: "cardForm",
              method: t,
              url: o,
              data: a,
              timeout: 35e3,
              retries: 3,
              success: function (t, n) {
                e.tokenId = n.id;
              },
              complete: r,
            });
        }),
          (u["new"] = function (t) {
            u.request(
              "POST",
              {},
              (function () {
                return function (n, i) {
                  201 == n ? e.createDeviceProfile(t) : t(n, i);
                };
              })()
            );
          }),
          (u.update = function (t, n) {
            e.tokenId ? u.request("PUT", t, n) : u.create(t, n);
          }),
          (u.create = function (e, t) {
            u["new"](
              (function () {
                return function () {
                  u.update(e, t);
                };
              })()
            );
          }),
          (t.CardToken = u),
          (e.createToken = a);
      })(e, t),
      (function (e, t) {
        function n(n) {
          if ("https://mldp.mercadopago.com" == n.origin) {
            clearTimeout(o);
            var i = null;
            try {
              i = JSON.parse(n.data);
            } catch (a) {}
            i.session_id != e.deviceProfileId &&
              ((e.deviceProfileId = i.session_id),
              (t.creatingDevice = !1),
              r && r());
          }
        }
        function i(i) {
          if (e.tokenId) {
            t.creatingDevice = !0;
            var a = document.querySelector("iframe#device_profile");
            if (a) {
              var c = a.parentElement.removeChild(a);
              try {
                delete c;
              } catch (d) {}
            } else
              window.addEventListener
                ? window.addEventListener("message", n, !1)
                : window.attachEvent && window.attachEvent("onmessage", n);
            var s = document.createElement("iframe");
            (s.id = "device_profile"),
              (r = "function" == typeof i ? i : null),
              r &&
                (o = setTimeout(function () {
                  (t.creatingDevice = !1), r();
                }, 3e3)),
              (s.style.display = "none"),
              (s.src =
                "https://mldp.mercadopago.com/device_profile/widget?public_key=" +
                e.key +
                "&session_id=" +
                e.tokenId),
              document.body.appendChild(s);
          }
        }
        var r = null,
          o = null;
        (t.creatingDevice = !1), (e.createDeviceProfile = i);
      })(e, t),
      (function (e, t) {
        function i() {
          var e = window.crypto || window.msCrypto;
          if (
            "undefined" == typeof e ||
            "undefined" == typeof window.Uint32Array
          )
            return null;
          var t = new Uint32Array(8);
          e.getRandomValues(t);
          for (var n = "", i = 0; i < t.length; i++)
            n += (2 > i || i > 5 ? "" : "-") + t[i].toString(16).slice(-4);
          return n;
        }
        function r() {
          (e.initialized = !0),
            t.CardToken["new"](),
            0 === e.getPaymentMethods().length && e.getAllPaymentMethods();
        }
        function o() {
          if (
            e.initialized !== !0 &&
            (setTimeout(function () {
              if ((e.initialized === !1 && r(), n.length > 0))
                for (var t = 0; t < n.length; t++)
                  e[n[t].method].apply(null, n[t].args);
              e.initialized = !0;
            }, 1e3),
            (window.eventMetricSessionId = i()),
            e.initializedInsights === !1)
          ) {
            var t = document.createElement("script");
            (t.src = "https://http2.mlstatic.com/storage/event-metrics-sdk/js"),
              (t.type = "text/javascript"),
              (t.async = !1),
              t.setAttribute(
                "data-client-info-name",
                "MercadoPago-SDK-Javascript"
              ),
              t.setAttribute("data-client-info-version", e.version),
              window.mobilecheck()
                ? (t.setAttribute(
                    "data-business-flow-name",
                    "sdk-js-checkout-mobile"
                  ),
                  t.setAttribute(
                    "data-business-flow-uid",
                    "BCLQ07IBVKH001FP9VCG"
                  ))
                : (t.setAttribute(
                    "data-business-flow-name",
                    "sdk-js-checkout-web"
                  ),
                  t.setAttribute(
                    "data-business-flow-uid",
                    "BCHJ1GABVKH001FP9V4G"
                  )),
              t.setAttribute("data-event-info-name", "checkout"),
              t.setAttribute(
                "data-event-info-source",
                window.eventMetricSessionId
              ),
              (t.onload = function () {
                r();
              }),
              (t.onerror = function () {
                r();
              }),
              document.head.appendChild(t),
              (e.initializedInsights = !0);
          }
        }
        function a() {
          (e.tokenId = null), (e.deviceProfileId = null);
        }
        (e.clearSession = a), (e.initMercadopago = o);
      })(e, t),
      (this.Mercadopago = e);
  }.call();
