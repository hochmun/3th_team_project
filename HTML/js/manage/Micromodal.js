!function(b, a) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : (b = "undefined" != typeof globalThis ? globalThis : b || self).MicroModal = a()
}(this, function() {
    "use strict";
    function i(d, c) {
        for (var b = 0; b < c.length; b++) {
            var a = c[b];
            a.enumerable = a.enumerable || !1,
            a.configurable = !0,
            "value"in a && (a.writable = !0),
            Object.defineProperty(d, a.key, a)
        }
    }
    function j(a) {
        return k(a) || l(a) || m(a) || o()
    }
    function k(a) {
        if (Array.isArray(a))
            return n(a)
    }
    function l(a) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(a))
            return Array.from(a)
    }
    function m(a, c) {
        if (a) {
            if ("string" == typeof a)
                return n(a, c);
            var b = Object.prototype.toString.call(a).slice(8, -1);
            if ("Object" === b && a.constructor && (b = a.constructor.name),
            "Map" === b || "Set" === b)
                return Array.from(a);
            if ("Arguments" === b || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b))
                return n(a, c)
        }
    }
    function n(c, a) {
        (null == a || a > c.length) && (a = c.length);
        for (var b = 0, d = new Array(a); b < a; b++)
            d[b] = c[b];
        return d
    }
    function o() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var b, c, d, e, f, g, h, a = (b = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'],
    c = function() {
        var a, c, d;
        function e(a) {
            var p = a.targetModal
              , b = a.triggers
              , c = void 0 === b ? [] : b
              , d = a.onShow
              , f = a.onClose
              , g = a.openTrigger
              , h = a.closeTrigger
              , i = a.openClass
              , k = a.disableScroll
              , l = a.disableFocus
              , m = a.awaitCloseAnimation
              , n = a.awaitOpenAnimation
              , o = a.debugMode;
            (function(a, b) {
                if (!(a instanceof b))
                    throw new TypeError("Cannot call a class as a function")
            }
            )(this, e),
            this.modal = document.getElementById(p),
            this.config = {
                debugMode: void 0 !== o && o,
                disableScroll: void 0 !== k && k,
                openTrigger: void 0 === g ? "data-micromodal-trigger" : g,
                closeTrigger: void 0 === h ? "data-micromodal-close" : h,
                openClass: void 0 === i ? "is-open" : i,
                onShow: void 0 === d ? function() {}
                : d,
                onClose: void 0 === f ? function() {}
                : f,
                awaitCloseAnimation: void 0 !== m && m,
                awaitOpenAnimation: void 0 !== n && n,
                disableFocus: void 0 !== l && l
            },
            c.length > 0 && this.registerTriggers.apply(this, j(c)),
            this.onClick = this.onClick.bind(this),
            this.onKeydown = this.onKeydown.bind(this)
        }
        return a = e,
        c = [{
            key: "registerTriggers",
            value: function() {
                for (var d = this, b = arguments.length, c = new Array(b), a = 0; a < b; a++)
                    c[a] = arguments[a];
                c.filter(Boolean).forEach(function(a) {
                    a.addEventListener("click", function(a) {
                        return d.showModal(a)
                    })
                })
            }
        }, {
            key: "showModal",
            value: function() {
                var c = this
                  , a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                if (this.activeElement = document.activeElement,
                this.modal.setAttribute("aria-hidden", "false"),
                this.modal.classList.add(this.config.openClass),
                this.scrollBehaviour("disable"),
                this.addEventListeners(),
                this.config.awaitOpenAnimation) {
                    var b = function a() {
                        c.modal.removeEventListener("animationend", a, !1),
                        c.setFocusToFirstNode()
                    };
                    this.modal.addEventListener("animationend", b, !1)
                } else
                    this.setFocusToFirstNode();
                this.config.onShow(this.modal, this.activeElement, a)
            }
        }, {
            key: "closeModal",
            value: function() {
                var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                  , b = this.modal;
                if (this.modal.setAttribute("aria-hidden", "true"),
                this.removeEventListeners(),
                this.scrollBehaviour("enable"),
                this.activeElement && this.activeElement.focus && this.activeElement.focus(),
                this.config.onClose(this.modal, this.activeElement, a),
                this.config.awaitCloseAnimation) {
                    var c = this.config.openClass;
                    this.modal.addEventListener("animationend", function a() {
                        b.classList.remove(c),
                        b.removeEventListener("animationend", a, !1)
                    }, !1)
                } else
                    b.classList.remove(this.config.openClass)
            }
        }, {
            key: "closeModalById",
            value: function(a) {
                this.modal = document.getElementById(a),
                this.modal && this.closeModal()
            }
        }, {
            key: "scrollBehaviour",
            value: function(b) {
                if (this.config.disableScroll) {
                    var a = document.querySelector("body");
                    switch (b) {
                    case "enable":
                        Object.assign(a.style, {
                            overflow: ""
                        });
                        break;
                    case "disable":
                        Object.assign(a.style, {
                            overflow: "hidden"
                        })
                    }
                }
            }
        }, {
            key: "addEventListeners",
            value: function() {
                this.modal.addEventListener("touchstart", this.onClick),
                this.modal.addEventListener("click", this.onClick),
                document.addEventListener("keydown", this.onKeydown)
            }
        }, {
            key: "removeEventListeners",
            value: function() {
                this.modal.removeEventListener("touchstart", this.onClick),
                this.modal.removeEventListener("click", this.onClick),
                document.removeEventListener("keydown", this.onKeydown)
            }
        }, {
            key: "onClick",
            value: function(a) {
                (a.target.hasAttribute(this.config.closeTrigger) || a.target.parentNode.hasAttribute(this.config.closeTrigger)) && (a.preventDefault(),
                a.stopPropagation(),
                this.closeModal(a))
            }
        }, {
            key: "onKeydown",
            value: function(a) {
                9 === a.keyCode && this.retainFocus(a)
            }
        }, {
            key: "getFocusableNodes",
            value: function() {
                var a = this.modal.querySelectorAll(b);
                return Array.apply(void 0, j(a))
            }
        }, {
            key: "setFocusToFirstNode",
            value: function() {
                var c = this;
                if (!this.config.disableFocus) {
                    var a = this.getFocusableNodes();
                    if (0 !== a.length) {
                        var b = a.filter(function(a) {
                            return !a.hasAttribute(c.config.closeTrigger)
                        });
                        b.length > 0 && b[0].focus(),
                        0 === b.length && a[0].focus()
                    }
                }
            }
        }, {
            key: "retainFocus",
            value: function(b) {
                var a = this.getFocusableNodes();
                if (0 !== a.length) {
                    if (a = a.filter(function(a) {
                        return null !== a.offsetParent
                    }),
                    this.modal.contains(document.activeElement)) {
                        var c = a.indexOf(document.activeElement);
                        b.shiftKey && 0 === c && (a[a.length - 1].focus(),
                        b.preventDefault()),
                        !b.shiftKey && a.length > 0 && c === a.length - 1 && (a[0].focus(),
                        b.preventDefault())
                    } else
                        a[0].focus()
                }
            }
        }],
        i(a.prototype, c),
        d && i(a, d),
        e
    }(),
    d = null,
    e = function(a, c) {
        var b = [];
        return a.forEach(function(d) {
            var a = d.attributes[c].value;
            void 0 === b[a] && (b[a] = []),
            b[a].push(d)
        }),
        b
    }
    ,
    f = function(a) {
        if (!document.getElementById(a))
            return console.warn("MicroModal: \u2757Seems like you have missed %c'".concat(a, "'"), "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "ID somewhere in your code. Refer example below to resolve it."),
            console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<div class="modal" id="'.concat(a, '"></div>')),
            !1
    }
    ,
    g = function(a) {
        if (a.length <= 0)
            return console.warn("MicroModal: \u2757Please specify at least one %c'micromodal-trigger'", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "data attribute."),
            console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<a href="#" data-micromodal-trigger="my-modal"></a>'),
            !1
    }
    ,
    h = function(b, a) {
        if (g(b),
        !a)
            return !0;
        for (var c in a)
            f(c);
        return !0
    }
    ,
    {
        init: function(i) {
            var a = Object.assign({}, {
                openTrigger: "data-micromodal-trigger"
            }, i)
              , f = j(document.querySelectorAll("[".concat(a.openTrigger, "]")))
              , b = e(f, a.openTrigger);
            if (!0 !== a.debugMode || !1 !== h(f, b))
                for (var g in b) {
                    var k = b[g];
                    a.targetModal = g,
                    a.triggers = j(k),
                    d = new c(a)
                }
        },
        show: function(b, e) {
            var a = e || {};
            a.targetModal = b,
            (!0 !== a.debugMode || !1 !== f(b)) && (d && d.removeEventListeners(),
            (d = new c(a)).showModal())
        },
        close: function(a) {
            a ? d.closeModalById(a) : d.closeModal()
        }
    });
    return "undefined" != typeof window && (window.MicroModal = a),
    a
})
