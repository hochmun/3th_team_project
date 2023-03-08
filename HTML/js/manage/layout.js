"use strict";
function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    }
    : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }
    )(t)
}
function _toConsumableArray(t) {
    return _arrayWithoutHoles(t) || _iterableToArray(t) || _unsupportedIterableToArray(t) || _nonIterableSpread()
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}
function _unsupportedIterableToArray(t, e) {
    if (t) {
        if ("string" == typeof t)
            return _arrayLikeToArray(t, e);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        return "Map" === (n = "Object" === n && t.constructor ? t.constructor.name : n) || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _arrayLikeToArray(t, e) : void 0
    }
}
function _iterableToArray(t) {
    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"])
        return Array.from(t)
}
function _arrayWithoutHoles(t) {
    if (Array.isArray(t))
        return _arrayLikeToArray(t)
}
function _arrayLikeToArray(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, a = new Array(e); n < e; n++)
        a[n] = t[n];
    return a
}
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
function _defineProperties(t, e) {
    for (var n = 0; n < e.length; n++) {
        var a = e[n];
        a.enumerable = a.enumerable || !1,
        a.configurable = !0,
        "value"in a && (a.writable = !0),
        Object.defineProperty(t, a.key, a)
    }
}
function _createClass(t, e, n) {
    return e && _defineProperties(t.prototype, e),
    n && _defineProperties(t, n),
    Object.defineProperty(t, "prototype", {
        writable: !1
    }),
    t
}
function _classStaticPrivateMethodGet(t, e, n) {
    return _classCheckPrivateStaticAccess(t, e),
    n
}
function _classCheckPrivateStaticAccess(t, e) {
    if (t !== e)
        throw new TypeError("Private static access of wrong provenance")
}
function dragToMove(e) {
    var n, a, i;
    e && !e.__dragToMove && (n = !1,
    e.__dragToMove = !0,
    e.addEventListener("mousedown", function(t) {
        n = !0,
        e.classList.add("active"),
        a = t.pageX - e.offsetLeft,
        i = e.scrollLeft
    }),
    e.addEventListener("mouseleave", function() {
        n = !1,
        e.classList.remove("active")
    }),
    e.addEventListener("mouseup", function() {
        n = !1,
        e.classList.remove("active")
    }),
    e.addEventListener("mousemove", function(t) {
        n && (t.preventDefault(),
        t = 2 * (t.pageX - e.offsetLeft - a),
        e.scrollLeft = i - t)
    }))
}
function numberWithCommas(t) {
    return t.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function changeNotificationIcon(t) {
    window.origTitle || (window.origTitle = document.title);
    var e = 99 < t ? "99+" : t;
    document.title = "(" + e + ") " + window.origTitle;
    t = "/static/favicon-notification.ico" + window.LiveConfig.CACHE_KEY;
    $("#dynamic-favicon").attr("href") != t && ($("head > link[rel=icon]").remove(),
    $("#dynamic-favicon").remove(),
    (e = document.createElement("link")).id = "dynamic-favicon",
    e.rel = "shortcut icon",
    e.href = t,
    $("head").append(e))
}
function resetFavicon() {
    window.origTitle && (document.title = window.origTitle,
    window.origTitle = null);
    var t = "/static/favicon.ico" + window.LiveConfig.CACHE_KEY;
    $("head > link[rel=icon]").remove(),
    $("#dynamic-favicon").remove();
    var e = document.createElement("link");
    e.id = "dynamic-favicon",
    e.rel = "shortcut icon",
    e.href = t,
    $("head").append(e)
}
function adjustModalLayout(t, e, n) {
    var a, i;
    n || ((a = document.createElement("div")).className = "modal-scrollbar-measure",
    document.body.appendChild(a),
    n = "".concat(a.getBoundingClientRect().width - a.clientWidth, "px"),
    document.body.removeChild(a)),
    e && (i = document.body.getBoundingClientRect(),
    a = Math.round(i.left + i.right) < window.innerWidth,
    i = e.scrollHeight > document.documentElement.clientHeight,
    !a && i && (e.classList.add("is-scroll"),
    Array.from(e.children).forEach(function(t) {
        return t.style.paddingLeft = n
    })),
    a && !i && (e.style.paddingRight = n)),
    t && (document.body.style.paddingRight = n),
    document.documentElement.classList.contains("navbar-fixed") && (document.querySelector(".navbar-wrapper").style.paddingRight = n),
    document.querySelector(".nav-control") && (document.querySelector(".nav-control").style.paddingRight = n)
}
function resetModalLayoutAdjust() {
    document.body.style.paddingRight = "",
    document.documentElement.classList.contains("navbar-fixed") && (document.querySelector(".navbar-wrapper").style.paddingRight = ""),
    document.querySelector(".nav-control") && (document.querySelector(".nav-control").style.paddingRight = "")
}
function setEvents() {
    $(".body .nav-control #goTopBtn").click(function(t) {
        var e = window.scrollX;
        return window.scrollTo(e, 0),
        !1
    }),
    $(".body .nav-control #goBottomBtn").click(function(t) {
        var e = window.scrollX;
        return window.scrollTo(e, document.body.clientHeight),
        !1
    }),
    $(".body .nav-control #goCommentBtn").click(function(t) {
        var e = window.scrollX
          , n = $(".article-view .article-comment").offset().top || 0;
        return window.scrollTo(e, n),
        !1
    }),
    $(".body .nav-control #goListBtn").click(function(t) {
        var e = window.scrollX
          , n = $("#boardBtns").offset().top || 0;
        return window.scrollTo(e, n),
        !1
    }),
    $(".body .noti-dropdown-menu #removeAllBtn").click(function() {
        return clearNotification(),
        !1
    }),
    $(".body .noti-alert .close").click(function() {
        return hideNotiAlert(),
        !1
    }),
    $(".navbar-wrapper #siteSearchBtn").click(function() {
        $(".navbar-wrapper").toggleClass("mb-search-on")
    }),
    $(document).on("shown.bs.modal", function() {
        adjustModalLayout(!1, void 0, $("body").css("padding-right"))
    }).on("hidden.bs.modal", function() {
        resetModalLayoutAdjust()
    })
}
var _class, animateCSS = function(o, r, l) {
    var c = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "";
    return new Promise(function(e, t) {
        var n = "".concat(c).concat(r)
          , a = o instanceof HTMLElement ? o : document.querySelector(o)
          , i = a.style.animationDuration;
        a.style.animationDuration = l || ".5s",
        a.classList.add("".concat(c, "animated"), n),
        a.addEventListener("animationend", function(t) {
            t.stopPropagation(),
            a.style.animationDuration = "0s" === i ? "" : i,
            a.classList.remove("".concat(c, "animated"), n),
            e("Animation ended")
        }, {
            once: !0
        })
    }
    )
};
function _renewFocus() {
    $("body > .microModal .microModal-buttons > button").attr("tabindex", "-1"),
    $("body > .microModal").last().find(".microModal-buttons > button").attr("tabindex", "0")
}
MicroModal && (window.ArcaModal = _class = function() {
    function t() {
        _classCallCheck(this, t)
    }
    return _createClass(t, null, [{
        key: "create",
        value: function(t) {
            var n, a = this, e = t.title, i = t.content, o = t.buttons, r = t.rawDOM, t = t.className, l = $(document.querySelector("#microModalTemplate").content.querySelector("div")).clone(), c = "modal_" + Date.now().toString();
            return l.attr("id", c),
            t && $(l.children()[0]).addClass(t),
            r ? l.find(".arca-dialog").html(r) : (e && l.find(".microModal-title").text(e),
            i && l.find(".microModal-content").html(i),
            0 < (null == o ? void 0 : o.length) && (n = l.find(".microModal-buttons"),
            o.filter(function(t) {
                return t
            }).forEach(function(e) {
                n.append($("<button>").attr({
                    type: "button",
                    class: e.type || "",
                    tabindex: "-1"
                }).on("click", function(t) {
                    e.callback && "function" == typeof e.callback ? e.callback.call(a, t, c) : e.href && "string" == typeof e.href && (location.href = e.href)
                }).text(e.text))
            }))),
            $(document.body).addClass("microModal-is-open").append(l),
            MicroModal.show(c, {
                onShow: function() {
                    adjustModalLayout(!0, l[0])
                },
                onClose: function() {
                    resetModalLayoutAdjust()
                }
            }),
            _classStaticPrivateMethodGet(this, _class, _renewFocus).call(this),
            c
        }
    }, {
        key: "close",
        value: function(t) {
            MicroModal.close(t),
            $("#".concat(t)).remove(),
            _classStaticPrivateMethodGet(this, _class, _renewFocus).call(this),
            document.querySelector(".microModal.is-open") || $(document.body).removeClass("microModal-is-open")
        }
    }, {
        key: "alert",
        value: function(t, e, n) {
            var a, i = this;
            return "string" != typeof t || t.includes("<") || t.includes(">") || (t = t.replaceAll("\n", "<br>")),
            "function" == typeof n && (a = n,
            n = {}),
            n = n || {},
            this.create({
                title: e,
                content: t,
                buttons: [Object.assign({
                    type: "primary",
                    text: i18n("DISPLAY_CONFIG_CLOSE"),
                    callback: function(t, e) {
                        a && "function" == typeof a && a.call(e),
                        i.close(e)
                    }
                }, (null === (t = n.buttons) || void 0 === t ? void 0 : t[0]) || {})].concat(_toConsumableArray((null === (n = n.buttons) || void 0 === n ? void 0 : n.slice(1)) || []))
            })
        }
    }, {
        key: "error",
        value: function(t, e, n) {
            var a = this;
            return this.create({
                title: "😱 ".concat(i18n("ERROR")),
                content: $("<p>").html("\n          ".concat(0 < t.length ? "".concat(t.replaceAll("\n", "<br>"), "<br>") : i18n("SETTINGS_UNKNOWN_ERROR"), "\n          ").concat(!t && e ? i18n("LAYOUT_REQUEST_CHANNEL_WITH_ERROR_ID") : "", "\n          ").concat(e ? "<br>".concat(i18n("ERROR"), " ID : <code>").concat(e, "</code>") : "", "\n        ")),
                buttons: [function() {
                    if (e)
                        return {
                            type: "dark",
                            text: i18n("REQUEST_CHANNEL"),
                            callback: function() {
                                window.open("/b/request", "_blank")
                            }
                        }
                }(), {
                    text: i18n("DISPLAY_CONFIG_CLOSE"),
                    callback: function(t, e) {
                        n && "function" == typeof n && n.call(e),
                        a.close(e)
                    }
                }]
            })
        }
    }, {
        key: "confirm",
        value: function(t, n, a) {
            var i = this;
            return this.create({
                title: i18n("REALLY"),
                content: t,
                buttons: [{
                    type: "primary",
                    text: i18n("CONFIRM"),
                    callback: function(t, e) {
                        n && "function" == typeof n && n.call(e),
                        i.close(e)
                    }
                }, {
                    type: "light",
                    text: i18n("CANCEL"),
                    callback: function(t, e) {
                        a && "function" == typeof a && a.call(e),
                        i.close(e)
                    }
                }]
            })
        }
    }]),
    t
}());
var LoadingSpinner = function() {
    function n(t) {
        _classCallCheck(this, n),
        this.ready = !0,
        t instanceof HTMLElement || (this.ready = !1);
        var e = window.getComputedStyle(t).position;
        "relative" !== e && "static" !== e && (this.ready = !1);
        e = $($("#statefulSpinnerTemplate").html());
        t.style.position = "relative",
        t.append(e.get(0)),
        this.targetElement = t,
        this.$spinner = e
    }
    return _createClass(n, [{
        key: "success",
        value: function() {
            var e = this;
            this.$spinner.on("animationend.success", function(t) {
                "checkmarkFadeout" === t.originalEvent.animationName && (e.targetElement.style.position = "",
                e.$spinner.remove(),
                e.$spinner.off("animationend.success"))
            }),
            this.$spinner.attr("data-state", "SUCCESS")
        }
    }, {
        key: "fail",
        value: function() {
            var e = this;
            this.$spinner.on("animationend.fail", function(t) {
                "checkmarkFadeout" === t.originalEvent.animationName && (e.targetElement.style.position = "",
                e.$spinner.remove(),
                e.$spinner.off("animationend.fail"))
            }),
            this.$spinner.attr("data-state", "ERROR")
        }
    }, {
        key: "stop",
        value: function() {
            this.$spinner.remove(),
            this.targetElement.style.position = ""
        }
    }]),
    n
}();
function refreshNewsCard(t) {
    var e;
    !document.hasFocus || document.hasFocus() || t ? (e = $(".body .right-sidebar #newsRank .link-list")).length < 1 || $.ajax({
        url: "/api/bywiki.json",
        dataType: "json"
    }).done(function(t) {
        e.empty(),
        t.articles.length = 5,
        [].map.call(t.articles, function(t) {
            e.append($("<a>").attr("href", t.link).attr("title", t.title).attr("target", "_blank").text(t.title))
        }),
        setTimeout(refreshNewsCard.bind(null, !1), 3e5)
    }).fail(function() {
        e.empty(),
        e.append("<a>".concat(i18n("LAYOUT_REFRESH_FAIL"), "</a>"))
    }) : setTimeout(refreshNewsCard, 1e4)
}
function refreshTopbar() {
    var e = $(".body .topbar-area .topbar-text");
    e.length < 1 || $.ajax({
        url: "/api/bywiki.json",
        dataType: "json"
    }).done(function(t) {
        e.empty(),
        t && t.articles && 0 < t.articles.length && (t = t.articles[Math.floor(Math.random() * t.articles.length)],
        e.append($("<a>").attr("href", t.link).attr("target", "_blank").attr("title", t.title).text(t.title))),
        setTimeout(refreshNewsCard.bind(null, !1), 3e5)
    }).fail(function() {
        e.empty(),
        e.append("<a>".concat(i18n("LAYOUT_REFRESH_FAIL"), "</a>"))
    })
}
function refreshNamuRanking(t) {
    var a;
    !document.hasFocus || document.hasFocus() || t ? (a = $(".body .right-sidebar #namuRank .link-list"),
    $.ajax({
        url: "//search.namu.wiki/api/ranking",
        dataType: "json"
    }).done(function(t) {
        a.empty();
        for (var e = 0; e < t.length; e++) {
            var n = $("<a>").attr("href", "//namu.wiki/Go?q=".concat(encodeURIComponent(t[e]).replace(/%2F/g, "/"))).attr("target", "_blank").attr("title", t[e]).text(t[e]);
            a.append(n)
        }
        setTimeout(refreshNamuRanking.bind(null, !1), 3e5)
    }).fail(function() {
        a.empty(),
        a.append("<a>".concat(i18n("LAYOUT_REFRESH_FAIL"), "</a>"))
    })) : setTimeout(refreshNewsCard, 1e4)
}
function refreshNotification(t) {
    if ($(".noti-menu-link").is(":visible")) {
        var c = $(".body .noti-dropdown-menu .noti-item-list");
        try {
            var e, n, a, i, s = null !== (e = window.LiveConfig) && void 0 !== e && null !== (n = e.mute) && void 0 !== n && n.users && 0 < (null === (a = window.LiveConfig) || void 0 === a || null === (i = a.mute) || void 0 === i ? void 0 : i.users.length) ? new RegExp(window.LiveConfig.mute.users.join("|")) : null
        } catch (t) {}
        $.ajax({
            url: "/api/notification",
            dataType: "json"
        }).done(function(t) {
            var n = {};
            c.find("li").each(function(t, e) {
                n[$(e).data("id")] = $(e).data("time")
            });
            for (var e = [], a = !1, i = 0; i < t.notifications.length; i++) {
                var o, r = t.notifications[i], l = null == r ? void 0 : r.username;
                null != l && null !== (o = l.match) && void 0 !== o && o.call(l, s) || (0 == a && 0 == r.isRead && (a = !0),
                l = r.title,
                l = $("<a>").attr("href", r.link).text(l),
                l = $("<li>").attr({
                    "data-id": r.id,
                    "data-time": r.time,
                    class: "text-break"
                }).append(l),
                r.isRead && l.attr("class", "isRead"),
                e.push(l))
            }
            a ? ($(".noti-menu-link > .red-dot").show(),
            window.newNotificationCount = e.length,
            "notification" == window.notificationBadge && changeNotificationIcon(window.newNotificationCount)) : $(".noti-menu-link > .red-dot").hide(),
            c.empty(),
            c.append(e)
        }).fail(function() {})
    }
}
function clearNotification() {
    $.ajax({
        url: "/api/notification",
        type: "delete",
        dataType: "json"
    }).done(function(t) {
        !0 === t.result && ("notification" == window.notificationBadge && resetFavicon(),
        $(".body .noti-dropdown-menu .noti-item-list > li").each(function(t, e) {
            $(e).addClass("isRead")
        }),
        $(".noti-menu-link > .red-dot").hide())
    }).fail(function() {})
}
function showNotiAlert(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
      , n = document.createElement("div")
      , a = !1;
    $(n).addClass("toast");
    var i = {
        role: "alert",
        "aria-live": "assertive",
        "aria-atomic": "true",
        "data-autohide": "false",
        "data-articleid": e.articleId
    };
    $(n).attr(i);
    var o = document.createElement("div");
    $(o).addClass("toast-header");
    var r = document.createElement("strong");
    $(r).addClass(["mr-1", "text-truncate"]);
    var l = document.createElement("strong")
      , c = document.createElement("small");
    $(c).addClass(["mr-auto"]);
    i = i18n("NOTIFICATION");
    e.title && (i = e.title),
    e.articleId && (s = e.articleId,
    window.notifications || (window.notifications = {}),
    -1 === Object.keys(window.notifications).indexOf(String(s)) ? window.notifications[s] = 0 : window.notifications[s] += 1,
    3 < (s = window.notifications[s]) && ($(r).removeClass("mr-1"),
    $(l).addClass(["mr-1", "text-nowrap"]),
    $(l).append("&nbsp;".concat(i18n("LAYOUT_ARTICLE_NOTIFICATION"))),
    $(c).addClass(["count"]),
    $(c).append("+" + s),
    a = !0,
    e.articleTitle && (i = e.articleTitle))),
    $(r).append(i);
    var s = document.createElement("span");
    $(s).addClass(["text-nowrap", "ml-2"]),
    e.datetime ? (d = document.createElement("time"),
    $(d).attr({
        datetime: e.datetime,
        "data-format": "q"
    }),
    $(s).append(d),
    window.timeTimer = setInterval(function() {
        applyLocalTimeFix()
    }, 1e3)) : e.subtitle && $(s).append(e.subtitle);
    i = document.createElement("button");
    $(i).attr({
        type: "button",
        "data-dismiss": "toast",
        "aria-label": "Close"
    }),
    $(i).addClass(["ml-2", "mb-1", "close"]);
    var d = document.createElement("span");
    $(d).attr({
        "aria-hidden": !0
    }),
    $(d).append("&times;"),
    $(i).append(d),
    $(i).on("click", function() {
        $(n).toast("hide")
    }),
    $(o).append([r, l, c, s, i]);
    i = document.createElement("div");
    $(i).addClass(["toast-body"]),
    $(i).append(t),
    $(n).append([o, i]),
    setTimeout(function() {
        $(n).toast("hide")
    }, 5e3),
    $(n).on("hidden.bs.toast", function() {
        $(n).remove(),
        0 == $("#toastbox > .toast").length && ($("#toastbox").hide(),
        window.notifications = {},
        window.timeTimer && (clearInterval(window.timeTimer),
        window.timeTimer = null))
    }),
    a && $(".toast[data-articleid=" + e.articleId + "]").toast("hide"),
    $("#toastbox").show(),
    $("#toastbox").append($(n)),
    $(".toast").toast("show"),
    applyLocalTimeFix()
}
function hideNotiAlert() {
    $(".body .noti-alert").animate({
        bottom: "-6rem",
        opacity: "0"
    }, 700, function() {
        $(".body .noti-alert .content").html("")
    })
}
function docEncode(t) {
    return ".." === t ? "..%20" : "." === t ? ".%20" : encodeURIComponent(t).replace(/%2F/g, "/")
}
function d2md(t) {
    var e = t.getHours() + ""
      , t = t.getMinutes() + "";
    return (e = 1 === e.length ? "0" + e : e) + ":" + (t = 1 === t.length ? "0" + t : t)
}
function random(t, e) {
    return Math.floor(Math.random() * (e - t)) + t
}
function isMobile() {
    var t, e = !1;
    return t = navigator.userAgent || navigator.vendor || window.opera,
    e = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4)) ? !0 : e
}
function isTablet() {
    var t = navigator.userAgent.toLowerCase();
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(t)
}
function isDark() {
    return !$("html").hasClass("theme-light") && (!!$("html").hasClass("theme-dark") || window.matchMedia("(prefers-color-scheme: dark)").matches)
}
function nicknameValidityCheck(t) {
    return /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\_]{1,16}$/.test(t)
}
function applyLocalTimeFix() {
    var o = new Date
      , r = new Date((new Date).getTime() - 864e5);
    $("time, [data-localdate]").each(function() {
        var t, e, n = $(this).attr("data-localdate"), a = $(this).attr("data-format"), i = $(this).attr("datetime") || $(this).attr("data-datetime");
        "string" == typeof a && i && (t = new Date(i),
        e = null,
        e = "Q" === a ? r <= t ? formatDate(t, "H:i") : formatDate(t, "Y.m.d") : "q" === a ? (i = (o.getTime() - t.getTime()) / 1e3) < 60 ? i18n("LAYOUT_BEFORE_SECOND", Math.floor(i)) : i < 3600 ? i18n("LAYOUT_BEFORE_MINUTE", Math.floor(i / 60)) : i < 86400 ? i18n("LAYOUT_BEFORE_HOUR", Math.floor(i / 3600)) : formatDate(t, "m-d") : "short" === a ? o.getDate() === t.getDate() && o.getMonth() === t.getMonth() && o.getFullYear() === t.getFullYear() ? formatDate(t, "H:i") : formatDate(t, "m-d") : formatDate(t, a),
        n ? $(this).attr(n, e) : $(this).text(e))
    })
}
function loadRecaptchaPromise() {
    return new Promise(function(t, e) {
        null !== (n = window.LiveConfig.recaptcha) && void 0 !== n && n.siteKey || e("reCAPTCHA sitekey not defined");
        var n = "CN" === (null === (n = window.LiveConfig) || void 0 === n ? void 0 : n.country) ? "www.recaptcha.net" : "www.google.com"
          , n = "https://".concat(n, "/recaptcha/api.js?render=").concat(null === (n = window.LiveConfig.recaptcha) || void 0 === n ? void 0 : n.siteKey);
        $.getScript(n).done(function() {
            t()
        }).fail(function() {
            e()
        })
    }
    )
}
window.captchaHandlerFactory = function(i, o, r) {
    return function(e) {
        var t, n = this;
        e.preventDefault();
        var a = null;
        r instanceof HTMLElement ? a = new LoadingSpinner(r) : "string" == typeof r && (a = new LoadingSpinner(e.currentTarget.querySelector(r))),
        null !== (t = LiveConfig) && void 0 !== t && t.needCaptcha ? new Promise(function(t, e) {
            var n;
            void 0 === (null === (n = window.grecaptcha) || void 0 === n ? void 0 : n.execute) ? loadRecaptchaPromise().then(function() {
                t()
            }, function() {
                e()
            }) : t()
        }
        ).then(function() {
            grecaptcha.ready(function() {
                grecaptcha.execute(LiveConfig.recaptcha.siteKey, {
                    action: o
                }).then(function(t) {
                    i.call(n, e, t, a)
                })
            })
        }, function(t) {
            window.ArcaModal.error("".concat(i18n("LAYOUT_RECAPTCHA_LOAD_FAIL"), " ").concat(i18n("ARTICLE_RETRY_LATER")))
        }) : i.call(n, e, null, a)
    }
}
;
var recaptchaInitCallbacks = [];
function recaptchaInit(t, e, n) {
    void 0 !== recaptchaInitCallbacks ? recaptchaInitCallbacks.push(recaptchaInit.bind(null, t, e, n)) : (t = window.grecaptcha.render(t, e),
    n && n(t))
}
var isRecaptchaLoad = !1;
function recaptchaOnLoad() {
    var t = recaptchaInitCallbacks;
    recaptchaInitCallbacks = void 0;
    for (var e = 0; e < t.length; e++)
        t[e]();
    isRecaptchaLoad = !0
}
function alertNeedTakeNickname() {
    "/settings/profile" !== location.pathname && window.ArcaModal.create({
        title: i18n("LAYOUT_TAKEN_FIXED_NICK"),
        content: i18n("LAYOUT_TAKEN_FIXED_NICK_DESCRIPTION"),
        buttons: [{
            type: "primary",
            text: i18n("CONFIRM"),
            callback: function(t, e) {
                location.href = "/settings/profile",
                window.ArcaModal.close(e)
            }
        }, {
            type: "secondary",
            text: i18n("DISPLAY_CONFIG_CLOSE"),
            callback: function(t, e) {
                window.ArcaModal.close(e)
            }
        }],
        className: "justify-content-end align-items-end"
    })
}
function alertTakeNickname(t) {
    window.ArcaModal.create({
        title: i18n("LAYOUT_FIXED_NICK_USE_CONFIRM"),
        content: i18n("LAYOUT_FIXED_NICK_USE_CONFIRM_DESCRIPTION", '<strong><time datetime="'.concat(t, '" data-format="Y-m-d H:i:s"></time></strong>')),
        buttons: [{
            type: "primary",
            text: i18n("LAYOUT_USE_CONTINUE"),
            callback: function(t, e) {
                location.href = "/settings/take_fixname/deny",
                window.ArcaModal.close(e)
            }
        }, {
            type: "btn",
            text: i18n("LAYOUT_THINKING_MORE"),
            callback: function(t, e) {
                window.ArcaModal.close(e)
            }
        }],
        className: "justify-content-end align-items-end"
    }),
    applyLocalTimeFix()
}
991 < window.innerWidth ? (setTimeout(refreshNamuRanking(!0), 0),
setTimeout(refreshNewsCard(!0), 0)) : refreshTopbar(),
refreshNotification(!0),
applyLocalTimeFix(),
setEvents(),
$.createModalBase = function() {
    var t = $('<div class="modal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
    return t.find(".modal-content").append(t.header = $('<div class="modal-header">').append(t.title = $('<h5 class="modal-title">')), t.body = $('<div class="modal-body">'), t.footer = $('<div class="modal-footer">')),
    t
}
,
function(p) {
    var e = null
      , f = document.getElementById("arcalive-current-users");
    p.currency && function(t) {
        if (t) {
            for (var n = {}, e = 0, a = Object.keys(t); e < a.length; e++) {
                var i, o = a[e];
                null !== (i = t[o]) && void 0 !== i && i.currency && (i = /^([0-9]*)([A-Za-z]+)$/.exec(o),
                n[i[2].toLowerCase()] = parseFloat(t[o].currency) / (parseInt(i[1]) || 1))
            }
            $("exchange").each(function() {
                var t = $(this).attr("data-currency").toLowerCase()
                  , e = parseFloat($(this).attr("data-value")) || 0;
                t && e && n[t] && $(this).text("(≒ ".concat(numberWithCommas(~~(n[t] * e))).concat(i18n("WON"), ")"))
            })
        }
    }(p.currency),
    window.WebSocket && function t() {
        (e = new WebSocket("ws" + ("https:" === window.location.protocol ? "s" : "") + "://" + window.location.host + "/arcalive","arcalive")).onopen = function() {
            var t;
            e.send("hello"),
            e.send("c|" + window.location.pathname + (null !== (t = window.location.search) && void 0 !== t ? t : ""))
        }
        ,
        e.onclose = function() {
            e = null,
            setTimeout(t, 5e3)
        }
        ,
        e.onmessage = function(t) {
            var n, a, e = t.data.split("|"), i = e[0];
            if (f && "c" === i)
                f.innerText = e[1];
            else if ("n" == i) {
                t = e.slice(1);
                try {
                    var o = JSON.parse(t);
                    if (location.pathname.startsWith("/u/notification"))
                        return $(".new-notification-badge").show(),
                        $(".new-notification-badge > .text").css({
                            "margin-top": "-10px",
                            opacity: 0
                        }),
                        void $(".new-notification-badge > .text").animate({
                            marginTop: 0,
                            opacity: 1
                        });
                    if (o.username && p.mute) {
                        var r = p.mute && 0 < p.mute.users.length ? new RegExp(p.mute.users.join("|")) : null;
                        if (o.username.match(r))
                            return
                    }
                    var l, c = document.createElement("a");
                    $(c).attr({
                        href: o.link
                    }),
                    o.mediaUrl ? "show" != window.notificationMedia ? ($(c).append(o.message),
                    delete o.title) : ((l = document.createElement("img")).setAttribute("src", o.mediaUrl),
                    l.setAttribute("width", "100"),
                    l.setAttribute("height", "100"),
                    $(c).append(l)) : $(c).append(o.message),
                    $(".noti-menu-link > .red-dot").show(),
                    0 < $(".noti-menu-link[aria-expanded=true]").length && refreshNotification(!0),
                    showNotiAlert(c, o),
                    "notification" == window.notificationBadge && (window.newNotificationCount ? window.newNotificationCount += 1 : window.newNotificationCount = 1,
                    changeNotificationIcon(window.newNotificationCount))
                } catch (t) {}
            } else if ("h" == i) {
                o = e.slice(1);
                try {
                    var s = JSON.parse(o)
                      , d = s.fileType
                      , u = s.fileId;
                    if ("voicecomment" === d && u == $("#commentForm > input[name=attachmentId]")[0].value) {
                        var m = $("#commentForm > input[type=hidden][name=progress]");
                        if (0 < m.length) {
                            if ("submit" == m[0].value)
                                return;
                            $("#commentFormButton").trigger("click"),
                            m[0].value = "submit"
                        }
                    }
                } catch (t) {}
            } else
                "r" == i ? ($("#ratingUp").text(e[1]),
                $("#ratingUpIp").text(e[2]),
                $("#ratingDown").text(e[3]),
                $("#ratingDownIp").text(e[4])) : "na" == i ? window.notificationBadge && "notification" == window.notificationBadge || (window.newArticleCount ? window.newArticleCount += 1 : window.newArticleCount = 1,
                changeNotificationIcon(window.newArticleCount)) : "nc" == i ? $("#comment").data("progressing") || ((a = $(".article-comment > .list-area > .newcomment-alert")).is(":visible") ? (a.removeClass("re-event"),
                a.addClass("re-event")) : (a.removeClass("d-none"),
                a.addClass("d-block"))) : "no" == i ? (n = e[1],
                a = $("#c_" + n),
                (m = window.location.pathname.split("/").slice(0, 4)).push(n),
                m = window.location.origin + m.join("/"),
                $.ajax({
                    type: "GET",
                    url: m,
                    success: function(t) {
                        var e = $(t).find("#c_" + n)
                          , t = e.find(".link-card-thumbnail-wrapper").data("idx");
                        0 !== a.find(".link-card").length && a.find(".link-card-thumbnail-wrapper").data("idx") == t || (a.replaceWith(e),
                        window.opengraphThumbnail && window.opengraphThumbnail[t] && $("#c_" + n + " .link-card-thumbnail-wrapper").html('<img src="' + window.opengraphThumbnail[t] + '" loading="lazy">'),
                        applyMute(window.LiveConfig),
                        applyLocalTimeFix(),
                        opengraphHandler(),
                        oopeHandler())
                    }
                })) : "ni" == i && (n = e[1],
                i = e[2],
                e = e[3],
                a = $("#c_" + n + " .link-card-thumbnail-wrapper"),
                window.opengraphThumbnail || (window.opengraphThumbnail = {}),
                window.opengraphThumbnail[e] = i,
                0 !== a.length && a.data("idx") == e && a.html('<img src="' + i + '" loading="lazy">'))
        }
    }()
}(window.LiveConfig),
void 0 !== jQuery.ui && $(".jquery-sortable").sortable(),
$('table [data-action="table-add-row"]').on("click", function(t) {
    var n = $(t.target).closest("table")
      , e = n.find(">tbody")
      , a = n.find('[data-action="table-sample"]');
    if (e.length || (e = n),
    !a.length)
        throw new TypeError("no sample provided");
    var i = a.children().clone(!0, !0);
    n.prop("newElemId") || n.prop("newElemId", +a.attr("data-idx-from") || 0),
    i.find("[name]").each(function(t, e) {
        e.name = e.name.replace(/\%idx\%/g, n.prop("newElemId"))
    }),
    i.find('[name$=".order[]"]').each(function(t, e) {
        e.value = e.value.replace(/\%idx\%/g, n.prop("newElemId"))
    }),
    i.find("[data-required]").each(function(t, e) {
        e.required = !0,
        e.removeAttribute("data-required")
    }),
    n.prop("newElemId", n.prop("newElemId") + 1),
    $("<tr>").append(i).appendTo(e),
    t.preventDefault()
}),
$('table [data-action="table-remove-row"]').on("click", function(t) {
    $(t.target).closest("tr").remove(),
    t.preventDefault()
}),
$('table [data-action="emoticons.remove"]').on("click", function(t) {
    var e = $(t.target).closest("tr");
    e.find('[name="customize.emoticons[]"]').length && (e.find('[name="customize.emoticons[]"]').attr("disabled") ? (e.find('[name="customize.emoticons[]"]').removeAttr("disabled"),
    e.appendTo($('[data-action-role="emoticons.enabled"]>tbody').first())) : (e.find('[name="customize.emoticons[]"]').attr("disabled", "disabled"),
    e.appendTo($('[data-action-role="emoticons.disabled"]>tbody').first())),
    t.preventDefault())
}),
$(".comment-count").click(function(t) {
    var e = $(this).closest("a");
    e.attr("href", e.attr("href") + "#comment")
}),
window.applyMute = function(t) {
    var n, a;
    if ((t = t || {}).mute && 0 < t.mute.users.length)
        try {
            n = new RegExp(t.mute.users.join("|"))
        } catch (t) {
            n = null,
            console.error(i18n("LAYOUT_MUTE_USER_INPUT_ERROR"))
        }
    if (t.mute && 0 < t.mute.keywords.length)
        try {
            a = new RegExp(t.mute.keywords.join("|"))
        } catch (t) {
            a = null,
            console.error(i18n("LAYOUT_MUTE_KEYWORD_INPUT_ERROR"))
        }
    var e = {
        keyword: i18n("KEYWORD"),
        user: i18n("USER"),
        notice: i18n("NOTICE"),
        deleted: i18n("DELETED")
    }
      , t = {
        articles: {},
        comments: {}
    }
      , i = {
        common: {
            mute: {
                users: function(t, e) {
                    return !!n && (null === (e = $(e).attr("data-filter")) || void 0 === e ? void 0 : e.match(n))
                },
                keywords: function(t, e) {
                    return !!a && $(e).text().replace(/^\s+|\s+$/g, "").match(a)
                }
            }
        },
        articles: {
            mute: {
                users: function(t, e) {
                    return i.common.mute.users(null, $(e).find(".user-info > [data-filter]"))
                },
                keywords: function(t, e) {
                    return i.common.mute.keywords(null, $(e).find(".col-title .title, .col-title .text-muted"))
                }
            }
        }
    };
    i.comments = {
        mute: {
            users: i.articles.mute.users,
            keywords: function(t, e) {
                return i.common.mute.keywords(null, $(e).find(".message"))
            }
        }
    },
    (n || a) && (t.articles.user = $(".list-table a.vrow:not(.notice)").filter(i.articles.mute.users).addClass(["filtered", "filtered-user"]).length,
    t.articles.keyword = $(".list-table a.vrow:not(.notice)").filter(i.articles.mute.keywords).addClass(["filtered", "filtered-keyword"]).length,
    t.comments.user = $("#comment .comment-item:not(.deleted)").filter(i.comments.mute.users).addClass(["filtered", "filtered-user"]).length,
    t.comments.keyword = $("#comment .comment-item:not(.deleted)").filter(i.comments.mute.keywords).addClass(["filtered", "filtered-keyword"]).length),
    t.comments.deleted = $("#comment .comment-item.deleted").addClass(["filtered", "filtered-deleted"]).length,
    $(".notice-unfilter").on("click", function(t) {
        t.preventDefault(),
        $(".list-table").toggleClass("show-filtered-notice"),
        $(".notice-unfilter").hide()
    }),
    function(n) {
        $(".list-table .frontend-header").remove();
        var a = $("<div>").addClass("frontend-header")
          , i = $("<span>").addClass("filter-title").text(i18n("LAYOUT_FILTERED_ARTICLE")).appendTo(a)
          , i = $("<span>").addClass("filter-count-container").appendTo(a);
        $.each(e, function(e, t) {
            n[e] = ~~n[e] || 0,
            n.all = (n.all || 0) + n[e],
            n[e] < 1 || i.append($("<span>").addClass("filter-count").addClass("filter-count-" + e).text(t + " (" + n[e] + ")").on("click", function(t) {
                t.preventDefault(),
                $([a, ".list-table"]).toggleClass("show-filtered-" + e)
            }))
        }),
        0 < n.all && (i.append($("<span>").addClass("filter-count").addClass("filter-count-all").text("".concat(i18n("ALL"), " (").concat(n.all, ")")).on("click", function(t) {
            t.preventDefault(),
            $([a, ".list-table"]).toggleClass("show-filtered")
        })),
        a.prependTo($(".list-table")))
    }(t.articles),
    function(n) {
        $("#comment .frontend-header").remove();
        var a = $("<div>").addClass("frontend-header")
          , i = $("<span>").addClass("filter-title").text(i18n("LAYOUT_FILTERED_ARTICLE")).appendTo(a)
          , i = $("<span>").addClass("filter-count-container").appendTo(a);
        $.each(e, function(e, t) {
            n[e] = ~~n[e] || 0,
            n.all = (n.all || 0) + n[e],
            n[e] < 1 || i.append($("<span>").addClass("filter-count").addClass("filter-count-" + e).text(t + " (" + n[e] + ")").on("click", function(t) {
                t.preventDefault(),
                $([a, ".list-area"]).toggleClass("show-filtered-" + e)
            }))
        }),
        0 < n.all && (i.append($("<span>").addClass("filter-count").addClass("filter-count-all").text("".concat(i18n("ALL"), " (").concat(n.all, ")")).on("click", function(t) {
            t.preventDefault(),
            $([a, ".list-area"]).toggleClass("show-filtered")
        })),
        a.insertBefore($("#comment .list-area")))
    }(t.comments)
}
,
applyMute(window.LiveConfig),
$(".batch-check-all").change(function() {
    $(this).is(":checked") ? $(".batch-check").prop("checked", !0) : $(".batch-check").prop("checked", !1)
}),
$(".body .article-list .admin-menu .batch-action-btn").click(function(t) {
    var e, n = [], a = $(".batch-action-form select[name='action']").val();
    $(".batch-check:checked").each(function() {
        n.push($(this).attr("data-id"))
    }),
    0 !== n.length && "null" != a ? (e = i18n("LAYOUT_ARTICLE_BATCH_DELETE_CONFIRM", n.length),
    "blockBest" == a ? e = i18n("LAYOUT_ARTICLE_BATCH_BLOCK_BEST_CONFIRM", n.length) : "unblockBest" == a ? e = i18n("LAYOUT_ARTICLE_BATCH_UNBLOCK_BEST_CONFIRM", n.length) : "setLive" == a ? e = i18n("LAYOUT_ARTICLE_BATCH_SET_LIVE_CONFIRM", n.length) : "removeLive" == a ? e = i18n("LAYOUT_ARTICLE_BATCH_REMOVE_LIVE_CONFIRM", n.length) : "resetRatingIp" == a ? e = i18n("LAYOUT_ARTICLE_BATCH_RESET_RATING_IP_CONFIRM", n.length) : "resetDeRatingIp" == a ? e = i18n("LAYOUT_ARTICLE_BATCH_RESET_DERATING_IP_CONFIRM", n.length) : "chgCategory" == a && (e = i18n("LAYOUT_ARTICLE_BATCH_CHANGE_CATEGORY_CONFIRM", n.length)),
    confirm(e) && ($(".batch-action-form [name=articleIds]").val(n.join(",")),
    $(".batch-action-form").submit())) : t.preventDefault()
}),
$(".jquery-sortable").on("touchstart", "input,textarea", function() {
    $(this).focus()
}),
window.addEventListener("touchmove", function() {}),
$(".board-category").each(function(t, e) {
    dragToMove(e)
}),
function() {
    var e, t, n, a, i, o;
    function r(t) {
        localStorage.setItem("visited-channel", JSON.stringify(t)),
        Cookies.set("visited-channel", JSON.stringify(t.slice(0, 30)), {
            expires: 365,
            domain: "." + window.LiveConfig.domain
        })
    }
    "b" === location.pathname.split("/")[1] && 1 === $(".channel-visit-history").length && (e = location.pathname.split("/")[2],
    t = $(".board-title [data-channel-name]").attr("data-channel-name").replace(/\s+채널$/, ""),
    n = "deactive" === $(".board-title [data-channel-status]").attr("data-channel-status"),
    o = JSON.parse(Cookies.get("visited-channel") || "[]"),
    a = JSON.parse(localStorage.getItem("visited-channel") || "[]"),
    (i = (i = ~~(null == a ? void 0 : a.length) > ~~(null == o ? void 0 : o.length) ? a : o).filter(function(t) {
        return t.slug !== e
    })).length < 1 ? $(".channel-visit-history").hide() : (o = i.map(function(t) {
        return $("<li>").append($("<a>").attr("href", "/b/" + t.slug).text(t.name), $("<span>").addClass("ion-close").attr("data-channel-slug", t.slug))
    }),
    $(".channel-visit-history__list").append(o)),
    n || i.unshift({
        name: t,
        slug: e
    }),
    r(i),
    $(".body").on("click", ".channel-visit-history .ion-close", function(e) {
        var t;
        t = $(e.target).attr("data-channel-slug"),
        $(".channel-visit-history [data-channel-slug=" + t + "]").map(function(t, e) {
            return e.parentNode
        }).remove(),
        r(i = i.filter(function(t) {
            return t.slug !== e.target.getAttribute("data-channel-slug")
        }))
    }),
    $(".channel-visit-history__clear-btn").on("click", function() {
        i.length = 0,
        r(i),
        $(".channel-visit-history").remove()
    }),
    $(".channel-visit-history__more-btn").on("click", function() {
        var t = $(".channel-visit-history__extend");
        t.toggleClass("show"),
        t.hasClass("show") ? $(this).removeClass("ion-android-menu").addClass("ion-close") : $(this).removeClass("ion-close").addClass("ion-android-menu")
    }))
}(),
function() {
    function t() {
        a.map(function t(e) {
            var n = void 0 !== i[e.name] ? i[e.name] : void 0 !== e.default ? e.default : null;
            e.name && e.apply && e.apply.call(i, n),
            e.items && e.items.map(t)
        })
    }
    function e(t) {
        t.preventDefault(),
        o.find(".modal-body").empty().append(a.map(function t(e) {
            var n = void 0 !== i[e.name] ? i[e.name] : void 0 !== e.default ? e.default : null
              , a = $('<div class="form-group">').append($("<label>").attr("for", "display-config-" + e.name).html(e.text));
            switch (e.type) {
            case "select":
                return a.append($("<select>").attr("name", e.name).attr("id", "display-config-" + e.name).addClass("form-control").append(e.options.map(function(t) {
                    return "object" === _typeof(t) ? $("<option>").text(t.text).each(function() {
                        this.setAttribute("value", t.value)
                    }) : $("<option>").attr("value", t).text(t)
                })).val(n).prop("disabled", e.disabled));
            case "form-row":
                return $('<div class="form-row">').append(e.items.map(t).map(function(t) {
                    return t.is('[class^="col-md-"]') ? t : t.addClass("col-md-" + ~~(12 / e.items.length))
                }))
            }
        })),
        o.modal()
    }
    var n, i = {}, a = [{
        type: "select",
        name: "i18n.language",
        text: "".concat(i18n("DISPLAY_CONFIG_LANGUAGE"), ' <span style="color: #dc3545; color: var(--danger);"><sup><i>α+</i></sup></span>'),
        default: "",
        options: [{
            text: i18n("DISPLAY_CONFIG_LANGUAGE_AUTO"),
            value: ""
        }, {
            text: i18n("DISPLAY_CONFIG_LANGUAGE_KO"),
            value: "ko"
        }, {
            text: i18n("DISPLAY_CONFIG_LANGUAGE_EN"),
            value: "en"
        }, {
            text: i18n("DISPLAY_CONFIG_LANGUAGE_JA"),
            value: "ja"
        }, {
            text: i18n("DISPLAY_CONFIG_LANGUAGE_ES"),
            value: "es"
        }],
        apply: function(t) {}
    }, {
        type: "form-row",
        items: [{
            type: "select",
            name: "font.family",
            text: i18n("DISPLAY_CONFIG_FONT"),
            default: "",
            options: [{
                text: i18n("DISPLAY_CONFIG_FONT_AUTOMATIC"),
                value: ""
            }, {
                text: i18n("DISPLAY_CONFIG_FONT_DEFAULT"),
                value: "sans-serif"
            }, {
                text: i18n("DISPLAY_CONFIG_FONT_NANUMBARUN"),
                value: "NanumBarunGothic"
            }, {
                text: i18n("DISPLAY_CONFIG_FONT_NANUMGOTHIC"),
                value: "NanumGothic"
            }, {
                text: "Noto Sans CJK KR",
                value: '"Noto Sans KR", "Noto Sans CJK KR"'
            }, "Apple SD Gothic Neo", {
                text: "Pretendard",
                value: '"Pretendard Variable", "Pretendard"'
            }],
            apply: function(t) {
                $("body").css("font-family", t || "")
            }
        }, {
            type: "select",
            name: "font.size",
            text: i18n("DISPLAY_CONFIG_FONT_SIZE"),
            default: "15px",
            options: [{
                text: i18n("DISPLAY_CONFIG_FONT_SIZE_DEAULT"),
                value: ""
            }, {
                text: i18n("DISPLAY_CONFIG_FONT_SIZE_18"),
                value: "18px"
            }, {
                text: i18n("DISPLAY_CONFIG_FONT_SIZE_16"),
                value: "16px"
            }, {
                text: i18n("DISPLAY_CONFIG_FONT_SIZE_15"),
                value: "15px"
            }, {
                text: i18n("DISPLAY_CONFIG_FONT_SIZE_14"),
                value: "14px"
            }, {
                text: i18n("DISPLAY_CONFIG_FONT_SIZE_13"),
                value: "13px"
            }],
            apply: function(t) {
                $("html").css("font-size", t || "")
            }
        }]
    }, {
        type: "form-row",
        items: [{
            type: "select",
            name: "theme.background",
            text: i18n("DISPLAY_CONFIG_THEME_BACKGROUND"),
            default: "",
            options: [{
                text: i18n("DISPLAY_CONFIG_THEME_BACKGROUND_DEFAULT"),
                value: ""
            }, {
                text: i18n("DISPLAY_CONFIG_THEME_BACKGROUND_LIGHT"),
                value: "light"
            }, {
                text: i18n("DISPLAY_CONFIG_THEME_BACKGROUND_DARK"),
                value: "dark"
            }],
            apply: function(t) {
                !t && window.matchMedia && (t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : ""),
                $("html").removeClass("theme-dark theme-light"),
                t && $("html").addClass("theme-" + t),
                $("html").trigger("classChange")
            }
        }, {
            type: "select",
            name: "theme.dark",
            text: i18n("DISPLAY_CONFIG_THEME_DARK_OPTION"),
            default: "",
            options: [{
                text: i18n("DISPLAY_CONFIG_THEME_DARK_DEFAULT"),
                value: ""
            }, {
                text: i18n("DISPLAY_CONFIG_THEME_DARK_BLACK"),
                value: "black"
            }],
            apply: function(t) {
                $("html").removeClass("theme-black"),
                t && $("html").addClass("theme-" + t)
            }
        }]
    }, {
        type: "form-row",
        items: [{
            type: "select",
            name: "theme.width",
            text: i18n("DISPLAY_CONFIG_THEME_PAGE_WIDTH"),
            default: "1300",
            options: [{
                text: i18n("DISPLAY_CONFIG_THEME_PAGE_WIDTH_NOT_FIXED"),
                value: ""
            }, {
                text: "1100px",
                value: 1100
            }, {
                text: "1200px",
                value: 1200
            }, {
                text: "1300px",
                value: 1300
            }, {
                text: "1500px",
                value: 1500
            }, {
                text: "1600px",
                value: 1600
            }],
            apply: function(t) {
                $("html").removeClass("width-1100 width-1200 width-1300 width-1500 width-1600"),
                t && $("html").addClass("width-" + t)
            }
        }, {
            type: "select",
            name: "theme.navbar",
            text: i18n("DISPLAY_CONFIG_THEME_NAVBAR"),
            default: "scroll",
            options: [{
                text: i18n("DISPLAY_CONFIG_THEME_NAVBAR_SCROLL"),
                value: "scroll"
            }, {
                text: i18n("DISPLAY_CONFIG_THEME_NAVBAR_FIXED"),
                value: "fixed"
            }],
            apply: function(t) {
                $("html").removeClass("navbar-scroll navbar-fixed"),
                t && $("html").addClass("navbar-" + t)
            }
        }]
    }, {
        type: "form-row",
        items: [{
            type: "select",
            name: "notification.muteMedia",
            text: i18n("DISPLAY_CONFIG_NOTIFICATION_EMOTICON"),
            default: "show",
            options: [{
                text: i18n("DISPLAY_CONFIG_NOTIFICATION_EMOTICON_SHOW"),
                value: "show"
            }, {
                text: i18n("DISPLAY_CONFIG_NOTIFICATION_EMOTICON_HIDE"),
                value: "hide"
            }],
            apply: function(t) {
                window.notificationMedia = t
            }
        }, {
            type: "select",
            name: "notification.badge",
            text: i18n("DISPLAY_CONFIG_NOTIFICATION_BADGE"),
            default: "default",
            options: [{
                text: i18n("DISPLAY_CONFIG_NOTIFICATION_BADGE_DEFAULT"),
                value: "default"
            }, {
                text: i18n("DISPLAY_CONFIG_NOTIFICATION_BADGE_NOTI"),
                value: "notification"
            }],
            apply: function(t) {
                resetFavicon(),
                window.notificationBadge = t
            }
        }]
    }, {
        type: "form-row",
        items: [{
            type: "select",
            name: "content.thumbnail",
            text: i18n("DISPLAY_CONFIG_CONTENT_THUMBNAIL"),
            default: "",
            options: [{
                text: i18n("DISPLAY_CONFIG_USE_TEXT"),
                value: ""
            }, {
                text: i18n("DISPLAY_CONFIG_DISABLED_TEXT"),
                value: "disabled"
            }],
            apply: function(t) {}
        }, {
            type: "select",
            name: "content.hidden_channel_defaultimage",
            text: i18n("DISPLAY_CONFIG_SHOW_CHANNEL_DEFAULT_IMAGE"),
            default: "",
            options: [{
                text: i18n("DISPLAY_CONFIG_USE_TEXT"),
                value: ""
            }, {
                text: i18n("DISPLAY_CONFIG_DISABLED_TEXT"),
                value: "disabled"
            }],
            apply: function(t) {}
        }]
    }, {
        type: "form-row",
        items: [{
            type: "select",
            name: "sidebar.content",
            text: i18n("DISPLAY_CONFIG_SIDEBAR"),
            default: "",
            options: [{
                text: i18n("DISPLAY_CONFIG_RANDOM"),
                value: ""
            }, {
                text: i18n("DISPLAY_CONFIG_SIDEBAR_HUMOR"),
                value: "humor"
            }, {
                text: i18n("DISPLAY_CONFIG_SIDEBAR_BESTLIVE"),
                value: "bestlive"
            }, {
                text: i18n("DISPLAY_CONFIG_SIDEBAR_DEAL"),
                value: "deal"
            }],
            apply: function(t) {}
        }, {
            type: "select",
            name: "content.disable_autoplay_emoticon",
            text: i18n("DISPLAY_CONFIG_DISABLE_AUTOPLAY_EMOTICON"),
            default: "",
            options: [{
                text: i18n("DISPLAY_CONFIG_USE_TEXT"),
                value: "disabled"
            }, {
                text: i18n("DISPLAY_CONFIG_DISABLED_TEXT"),
                value: ""
            }],
            apply: function(t) {}
        }]
    }], o = $('<div class="modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' + i18n("DISPLAY_CONFIG_TITLE") + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="' + i18n.DISPLAY_CONFIG_CLOSE + '"><span aria-hidden="true">&times;</span></button></div><form class="modal-body m-2"></form></div></div></div>'), r = o.find(".modal-body");
    if (Cookies.get("display-config"))
        try {
            i = JSON.parse(Cookies.get("display-config")),
            window.notificationMedia = null !== (n = i["notification.muteMedia"]) && void 0 !== n ? n : "show",
            window.notificationBadge = null !== (n = i["notification.badge"]) && void 0 !== n ? n : "default"
        } catch (t) {
            i = {},
            console.error(t)
        }
    t(),
    r.on("change", function() {
        i = r.serializeArray().reduce(function(t, e) {
            return t[e.name] = e.value,
            t
        }, {}),
        Cookies.set("display-config", JSON.stringify(i), {
            expires: 365,
            domain: "." + window.LiveConfig.domain
        }),
        t()
    }),
    window.matchMedia && ((n = window.matchMedia("(prefers-color-scheme: dark)")).addEventListener ? n.addEventListener("change", function() {
        t()
    }) : n.addListener(t)),
    $(".nav-control").prepend($("<li>").append($("<span>").attr("class", "ion-ios-gear").on("click", e))),
    $('.user-dropdown-menu .dropdown-item[href="/settings"]').after($("<span>").attr("class", "dropdown-item").addClass("displayconfig").on("click", e).text(i18n("DISPLAY_CONFIG_TITLE"))),
    $("html").trigger("classChange"),
    $(".config-alert").on("closed.bs.alert", function() {
        try {
            var t = $(this).data("id");
            i["close.noticeId"] = t,
            Cookies.set("display-config", JSON.stringify(i), {
                expires: 365,
                domain: "." + window.LiveConfig.domain
            })
        } catch (t) {}
    })
}(),
$('[data-toggle="tooltip"]').tooltip(),
function(a) {
    var t = {
        end: ["/write", "/edit"],
        start: ["/u", "/settings"]
    };
    if (location.pathname) {
        if (t.start.some(function(t) {
            return location.pathname.startsWith(t)
        }))
            return;
        if (t.end.some(function(t) {
            return location.pathname.endsWith(t)
        }))
            return
    }
    hotkeys("r,t,w", function(t, e) {
        switch (e.key) {
        case "r":
            0 < (n = $(".article-comment .fetch-comment")).length ? n.click() : location.reload();
            break;
        case "t":
            location.href = "#top";
            break;
        case "w":
            0 < $(".btn-arca-article-write").length && $(".btn-arca-article-write")[0].click()
        }
        var n
    }),
    hotkeys("shift+/", function(t, e) {
        "shift+/" === e.key && $("#shortcutHelpModal").modal("toggle")
    }),
    a.subList && hotkeys("1,2,3,4,5,6,7,8,9,0", function(t, e) {
        var n = parseInt(e.key)
          , n = null === (e = a.subList) || void 0 === e ? void 0 : e[0 === n ? 9 : n - 1];
        n && (location.href = "/b/".concat(n))
    })
}(window.LiveConfig),
$("[data-current-step] > [data-step]").parent().each(function(t, e) {
    e._arca_step = function(t) {
        t && $(e).attr("data-current-step", t);
        t = $(e).attr("data-current-step");
        $(e).find('> :not([data-step="'.concat(t, '"])')).addClass("d-none"),
        $(e).find('> [data-step="'.concat(t, '"]')).removeClass("d-none")
    }
    ,
    e._arca_step()
}),
function() {
    var t;
    (t = document.createElement("canvas")).getContext && t.getContext("2d") && 0 == t.toDataURL("image/webp").indexOf("data:image/webp") || Array.prototype.slice.call(document.querySelectorAll("img")).filter(function(t) {
        return !(!t.src || t.src.match(/gravatar\.com/) || t.src.match(/[\?&]type=jpg/) || !/^https?:/.test(t.src)) && (void 0 === t.naturalWidth || 0 === t.naturalWidth)
    }).forEach(function(t) {
        t.src += (-1 !== t.src.indexOf("?") ? "&" : "?") + "type=jpg"
    }),
    $(".noti-menu-link").on("click", function() {
        refreshNotification(!0)
    })
}(),
function() {
    var t, e = $(".board-category"), n = $(".board-category .item .active").parent();
    n.length && (!(t = n.position()) || (n = t.left + n.width()) > e.width() && (n = n - e.width(),
    5 < Math.abs(e.scrollLeft() - n) && e.scrollLeft(n)))
}(),
$('.modal form [name="until"]').on("change", function() {
    -1 == this.value && $(this).replaceWith($('<input type="number" class="form-control" name="until" placeholder="'.concat(i18n("LAYOUT_INPUT_BLOCK_DURATION"), '">')))
}),
$(document).on("click", ".navbar .noti-dropdown-menu", function(t) {
    t.stopPropagation()
}),
$(".board-title .info-btn").click(function() {
    $(".board-title .description").toggleClass("show"),
    $(".board-title .head .title").toggleClass("unfold")
}),
function() {
    var t, a;
    "undefined" == typeof Sortable || 0 < (t = document.querySelectorAll(".sortable-list")).length && (a = {
        handle: ".sortable-list__handle",
        animation: 150
    },
    t.forEach(function(t) {
        var e = Object.assign({}, a);
        null !== (n = t.dataset) && void 0 !== n && n.handle && (e.handle = t.dataset.handle);
        var n = Sortable.create(t, e);
        t.sortableObject = n,
        t.addEventListener("sortable-item-added", function() {
            t.sortableObject.destroy(),
            t.sortableObject = Sortable.create(t, e)
        })
    }))
}(),
$(".notificate-all").change(function() {
    var t = $(this);
    t.prop("checked") ? $(".notificate-category[data-slug='" + t.data("slug") + "']").prop("checked", !1) : $(".notificate-all[data-slug='" + t.data("slug") + "']").prop("checked", !0)
}),
$(".notificate-category").change(function() {
    var t = $(this);
    t.prop("checked") ? $(".notificate-all[data-slug='" + t.data("slug") + "']").prop("checked", !1) : 0 === $(".notificate-category[data-slug='" + t.data("slug") + "']:checked").length && $(".notificate-all[data-slug='" + t.data("slug") + "']").prop("checked", !0)
}),
$(".notificate-asterisk, .notificate-best").change(function() {
    var t = $(this);
    $(".notificate-asterisk[data-slug='" + t.data("slug") + "']").prop("checked") || $(".notificate-best[data-slug='" + t.data("slug") + "']").prop("checked") || (t.hasClass("notificate-asterisk") ? $(".notificate-best[data-slug='" + t.data("slug") + "']") : $(".notificate-asterisk[data-slug='" + t.data("slug") + "']")).prop("checked", !0),
    $(".notificate-asterisk[data-slug='" + t.data("slug") + "']").prop("checked") ? ($(".category[data-slug='" + t.data("slug") + "']").removeClass("invisible"),
    $(".category[data-slug='" + t.data("slug") + "']").addClass("visible"),
    0 === $(".notificate-category[data-slug='" + t.data("slug") + "']:checked").length && $(".notificate-all[data-slug='" + t.data("slug") + "']").prop("checked", !0)) : ($(".category[data-slug='" + t.data("slug") + "']").addClass("invisible"),
    $(".category[data-slug='" + t.data("slug") + "']").removeClass("visible"))
}),
$(".ion-android-remove-circle").click(function() {
    var t = $(this);
    t.hasClass("ion-android-remove-circle") ? (t.removeClass("ion-android-remove-circle"),
    t.addClass("ion-android-add-circle"),
    $(".order-and-name[data-slug='" + t.data("slug") + "']").addClass("drop"),
    $(".permissions[data-slug='" + t.data("slug") + "']").addClass("d-none"),
    $(".notificate-drop[data-slug='" + t.data("slug") + "']").val("on")) : (t.addClass("ion-android-remove-circle"),
    t.removeClass("ion-android-add-circle"),
    $(".order-and-name[data-slug='" + t.data("slug") + "']").removeClass("drop"),
    $(".permissions[data-slug='" + t.data("slug") + "']").removeClass("d-none"),
    $(".notificate-drop[data-slug='" + t.data("slug") + "']").val("off"))
}),
$(function() {
    $('[data-toggle="popover"]').popover()
}),
$(function() {
    $(document).on("mouseover", ".extendableDatetime", function() {
        $(this).children("time:last-of-type").show()
    }).on("mouseout", ".extendableDatetime", function() {
        $(this).children("time:last-of-type").hide()
    })
}),
$(function() {
    $('[data-toggle="popover"]').popover()
}),
$(function() {
    $(document).on("mouseover", ".extendableDatetime", function() {
        $(this).children("time:last-of-type").show()
    }).on("mouseout", ".extendableDatetime", function() {
        $(this).children("time:last-of-type").hide()
    })
});
