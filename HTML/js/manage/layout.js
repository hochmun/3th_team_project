"use strict";

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}

function _toConsumableArray(t) {
    return _arrayWithoutHoles(t) || _iterableToArray(t) || _unsupportedIterableToArray(t) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(t, e) {
    if (t) {
        if ("string" == typeof t) return _arrayLikeToArray(t, e);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        return "Map" === (n = "Object" === n && t.constructor ? t.constructor.name : n) || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _arrayLikeToArray(t, e) : void 0
    }
}

function _iterableToArray(t) {
    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
}

function _arrayWithoutHoles(t) {
    if (Array.isArray(t)) return _arrayLikeToArray(t)
}

function _arrayLikeToArray(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, a = new Array(e); n < e; n++) a[n] = t[n];
    return a
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(t, e) {
    for (var n = 0; n < e.length; n++) {
        var a = e[n];
        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
    }
}

function _createClass(t, e, n) {
    return e && _defineProperties(t.prototype, e), n && _defineProperties(t, n), Object.defineProperty(t, "prototype", {
        writable: !1
    }), t
}

function _classStaticPrivateMethodGet(t, e, n) {
    return _classCheckPrivateStaticAccess(t, e), n
}

function _classCheckPrivateStaticAccess(t, e) {
    if (t !== e) throw new TypeError("Private static access of wrong provenance")
}

function dragToMove(e) {
    var n, a, i;
    e && !e.__dragToMove && (n = !1, e.__dragToMove = !0, e.addEventListener("mousedown", function(t) {
        n = !0, e.classList.add("active"), a = t.pageX - e.offsetLeft, i = e.scrollLeft
    }), e.addEventListener("mouseleave", function() {
        n = !1, e.classList.remove("active")
    }), e.addEventListener("mouseup", function() {
        n = !1, e.classList.remove("active")
    }), e.addEventListener("mousemove", function(t) {
        n && (t.preventDefault(), t = 2 * (t.pageX - e.offsetLeft - a), e.scrollLeft = i - t)
    }))
}

function numberWithCommas(t) {
    return t.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

var _class, animateCSS = function(o, r, l) {
    var c = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "";
    return new Promise(function(e, t) {
        var n = "".concat(c).concat(r),
            a = o instanceof HTMLElement ? o : document.querySelector(o),
            i = a.style.animationDuration;
        a.style.animationDuration = l || ".5s", a.classList.add("".concat(c, "animated"), n), a.addEventListener("animationend", function(t) {
            t.stopPropagation(), a.style.animationDuration = "0s" === i ? "" : i, a.classList.remove("".concat(c, "animated"), n), e("Animation ended")
        }, {
            once: !0
        })
    })
};

var LoadingSpinner = function() {
    function n(t) {
        _classCallCheck(this, n), this.ready = !0, t instanceof HTMLElement || (this.ready = !1);
        var e = window.getComputedStyle(t).position;
        "relative" !== e && "static" !== e && (this.ready = !1);
        e = $($("#statefulSpinnerTemplate").html());
        t.style.position = "relative", t.append(e.get(0)), this.targetElement = t, this.$spinner = e
    }
    return _createClass(n, [{
        key: "success",
        value: function() {
            var e = this;
            this.$spinner.on("animationend.success", function(t) {
                "checkmarkFadeout" === t.originalEvent.animationName && (e.targetElement.style.position = "", e.$spinner.remove(), e.$spinner.off("animationend.success"))
            }), this.$spinner.attr("data-state", "SUCCESS")
        }
    }, {
        key: "fail",
        value: function() {
            var e = this;
            this.$spinner.on("animationend.fail", function(t) {
                "checkmarkFadeout" === t.originalEvent.animationName && (e.targetElement.style.position = "", e.$spinner.remove(), e.$spinner.off("animationend.fail"))
            }), this.$spinner.attr("data-state", "ERROR")
        }
    }, {
        key: "stop",
        value: function() {
            this.$spinner.remove(), this.targetElement.style.position = ""
        }
    }]), n
}();

function docEncode(t) {
    return ".." === t ? "..%20" : "." === t ? ".%20" : encodeURIComponent(t).replace(/%2F/g, "/")
}

function d2md(t) {
    var e = t.getHours() + "",
        t = t.getMinutes() + "";
    return (e = 1 === e.length ? "0" + e : e) + ":" + (t = 1 === t.length ? "0" + t : t)
}

function random(t, e) {
    return Math.floor(Math.random() * (e - t)) + t
}

function isMobile() {
    var t, e = !1;
    return t = navigator.userAgent || navigator.vendor || window.opera, e = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4)) ? !0 : e
}

function isTablet() {
    var t = navigator.userAgent.toLowerCase();
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(t)
}

function isDark() {
    return !$("html").hasClass("theme-light") && (!!$("html").hasClass("theme-dark") || window.matchMedia("(prefers-color-scheme: dark)").matches)
}

function applyLocalTimeFix() {
    var o = new Date,
        r = new Date((new Date).getTime() - 864e5);
    $("time, [data-localdate]").each(function() {
        var t, e, n = $(this).attr("data-localdate"),
            a = $(this).attr("data-format"),
            i = $(this).attr("datetime") || $(this).attr("data-datetime");
        "string" == typeof a && i && (t = new Date(i), e = null, e = "Q" === a ? r <= t ? formatDate(t, "H:i") : formatDate(t, "Y.m.d") : "q" === a ? (i = (o.getTime() - t.getTime()) / 1e3) < 60 ? i18n("LAYOUT_BEFORE_SECOND", Math.floor(i)) : i < 3600 ? i18n("LAYOUT_BEFORE_MINUTE", Math.floor(i / 60)) : i < 86400 ? i18n("LAYOUT_BEFORE_HOUR", Math.floor(i / 3600)) : formatDate(t, "m-d") : "short" === a ? o.getDate() === t.getDate() && o.getMonth() === t.getMonth() && o.getFullYear() === t.getFullYear() ? formatDate(t, "H:i") : formatDate(t, "m-d") : formatDate(t, a), n ? $(this).attr(n, e) : $(this).text(e))
    })
}

function loadRecaptchaPromise() {
    return new Promise(function(t, e) {
        null !== (n = window.LiveConfig.recaptcha) && void 0 !== n && n.siteKey || e("reCAPTCHA sitekey not defined");
        var n = "CN" === (null === (n = window.LiveConfig) || void 0 === n ? void 0 : n.country) ? "www.recaptcha.net" : "www.google.com",
            n = "https://".concat(n, "/recaptcha/api.js?render=").concat(null === (n = window.LiveConfig.recaptcha) || void 0 === n ? void 0 : n.siteKey);
        $.getScript(n).done(function() {
            t()
        }).fail(function() {
            e()
        })
    })
}
window.captchaHandlerFactory = function(i, o, r) {
    return function(e) {
        var t, n = this;
        e.preventDefault();
        var a = null;
        r instanceof HTMLElement ? a = new LoadingSpinner(r) : "string" == typeof r && (a = new LoadingSpinner(e.currentTarget.querySelector(r))), null !== (t = LiveConfig) && void 0 !== t && t.needCaptcha ? new Promise(function(t, e) {
            var n;
            void 0 === (null === (n = window.grecaptcha) || void 0 === n ? void 0 : n.execute) ? loadRecaptchaPromise().then(function() {
                t()
            }, function() {
                e()
            }) : t()
        }).then(function() {
            grecaptcha.ready(function() {
                grecaptcha.execute(LiveConfig.recaptcha.siteKey, {
                    action: o
                }).then(function(t) {
                    i.call(n, e, t, a)
                })
            })
        }, function(t) {
            window.GallModal.error("".concat(i18n("LAYOUT_RECAPTCHA_LOAD_FAIL"), " ").concat(i18n("ARTICLE_RETRY_LATER")))
        }) : i.call(n, e, null, a)
    }
};
var recaptchaInitCallbacks = [];

function recaptchaInit(t, e, n) {
    void 0 !== recaptchaInitCallbacks ? recaptchaInitCallbacks.push(recaptchaInit.bind(null, t, e, n)) : (t = window.grecaptcha.render(t, e), n && n(t))
}
var isRecaptchaLoad = !1;

function recaptchaOnLoad() {
    var t = recaptchaInitCallbacks;
    recaptchaInitCallbacks = void 0;
    for (var e = 0; e < t.length; e++) t[e]();
    isRecaptchaLoad = !0
}