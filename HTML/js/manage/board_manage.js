"use strict";

function _createForOfIteratorHelper(e, t) {
    var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (!n) {
        if (Array.isArray(e) || (n = _unsupportedIterableToArray(e)) || t && e && "number" == typeof e.length) {
            n && (e = n);
            var r = 0,
                t = function() {};
            return {
                s: t,
                n: function() {
                    return r >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[r++]
                    }
                },
                e: function(e) {
                    throw e
                },
                f: t
            }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var a, i = !0,
        o = !1;
    return {
        s: function() {
            n = n.call(e)
        },
        n: function() {
            var e = n.next();
            return i = e.done, e
        },
        e: function(e) {
            o = !0, a = e
        },
        f: function() {
            try {
                i || null == n.return || n.return()
            } finally {
                if (o) throw a
            }
        }
    }
}

function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(e, t) {
    if (e) {
        if ("string" == typeof e) return _arrayLikeToArray(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _arrayLikeToArray(e, t) : void 0
    }
}

function _iterableToArray(e) {
    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
}

function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) return _arrayLikeToArray(e)
}

function _arrayLikeToArray(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r
}

function _readOnlyError(e) {
    throw new TypeError('"' + e + '" is read-only')
}
var imagelimit = 1;

function pageLoad(e) {
    e.imagelimit, _readOnlyError("imagelimit")
}

function defaultImageOption(e, t) {
    $("#channel_image_preview > img, #channel_icon_preview > img").tooltip("dispose"), "delete" === t && (e = $(e).data("src").replace("https://", "//"), $("img[src='" + e + "']").remove())
}
$(function() {
    function e() {
        var e = $("#channel_image_preview").find("img:not(.ui-sortable-helper)").length;
        imagelimit <= e ? ($(".channel-image-upload-btn").hide(), $(".image-upload-count-warring").show()) : ($(".channel-image-upload-btn").show(), $(".image-upload-count-warring").hide()), $(".default-images-count").text(e)
    }

    function i() {
        var n = $("#channel_image_preview > img, #channel_icon_preview > img");
        n.off("click"), n.on("click", function() {
            n.tooltip("dispose");
            var e = this.src,
                t = '<div class="tooltip channel-image-tooltip" role="tooltip"><div class="arrow"></div>';
            t += '<div class="inner">', t += '&nbsp;<button class="btn btn-danger btn-sm" onclick=\'defaultImageOption(this, "delete");\' data-src="'.concat(e, '">').concat(i18n("DELETE"), "</button></div></div>"), $(this).tooltip({
                placement: "top",
                trigger: "manual",
                sanitize: !1,
                title: "&nbsp;",
                template: t
            }), $(this).tooltip("toggle")
        })
    }
    $("input[type=file]").on("change", function() {
        var a = $(this).data("purpose"),
            e = $("input[name=token]")[0].value,
            t = $(this)[0].files[0];
        if (t) {
            var n = new FormData;
            if (n.append("upload", t), n.append("token", e), n.append("purpose", a), "defaultImage" === a) {
                if ($("#channel_image_preview > img").length >= imagelimit) return;
                $("#channel_image_preview")
            }
            $.ajax({
                url: "/b/upload",
                type: "POST",
                data: n,
                processData: !1,
                contentType: !1,
                dataType: "json"
            }).done(function(e) {
                var t, n, r;
                e.uploaded ? (t = e.url, "defaultImage" === a ? 0 < (n = $("#channel_image_preview").find("img[src='".concat(t, "']"))).length ? n.animate({
                    opacity: "toggle"
                }, 250, "linear", function() {
                    n.animate({
                        opacity: "toggle"
                    }, 250, "linear")
                }) : ((r = $("<img />")).attr("src", t), containter.append(r), i()) : "channelIcon" === a && ($("#channel_icon_preview").empty(), (r = $("<img />")).attr("src", t), $("#channel_icon_preview").append(r))) : ArcaModal.error(e.message)
            }).fail(function(e) {
                try {
                    ArcaModal.error(e.responseJSON.message)
                } catch (e) {
                    ArcaModal.error("error")
                }
            })
        }
    }), $("#channel_image_preview").on("DOMSubtreeModified", function() {
        e()
    }), i(), $("form.channel-setting").on("submit", function(e) {
        e.preventDefault();
        var t = $("#channel_icon_preview > img");
        $("input[name=defaultIconImage]").val(t.attr("src")), 0 < $("#channel_image_preview > img").length && (e.preventDefault(), e = _toConsumableArray($("#channel_image_preview > img").map(function(e, t) {
            return $(t).attr("src")
        })).join(","), $("input[name=defaultImageUrl]").val(e)), this.submit()
    }), e()
});
var modals = {
    "country-restriction": function(e) {
        var t = e.clone();
        return e.remove(), t
    }($("#modal-country-restriction"))
};
$('[data-toggle="modal-country-restriction"]').on("click", function(e) {
    var t = $(this).closest(".sortable-list__item"),
        n = {
            id: t.find('[name="categories.order[]"]').val()
        },
        r = modals["country-restriction"].clone();
    Object.assign(n, {
        display_name: t.find('[name="categories.items['.concat(n.id, '].displayName"]')).val(),
        restricted_countries: function() {
            var e;
            try {
                e = JSON.parse(t.find('[name="categories.items['.concat(n.id, '].restricted_countries"]')).val())
            } catch (e) {}
            return e instanceof Array ? e : []
        }()
    });
    var a, i = Object.fromEntries(Array.from(r.find("form").prop("elements")["restricted_countries[]"]).map(function(e) {
            return [e.value, e]
        })),
        o = _createForOfIteratorHelper(n.restricted_countries);
    try {
        for (o.s(); !(a = o.n()).done;) i[a.value].checked = !0
    } catch (e) {
        o.e(e)
    } finally {
        o.f()
    }
    r.find(".modal-title").empty().append($("<span>").text("".concat(i18n("BOARD_MANAGE_COUNTRY_LIMIT"), " - ").concat(n.display_name)), $("<small>").text(i18n("BOARD_MANAGE_CATEGORY"))), r.find("form").on("submit", function(e) {
        e.preventDefault(), t.find('[name="categories.items['.concat(n.id, '].restricted_countries"]')).val(JSON.stringify(Array.from(r.find("form").prop("elements")["restricted_countries[]"]).filter(function(e) {
            return e.checked
        }).map(function(e) {
            return e.value
        }).filter(function(e) {
            return !!e
        }))), r.modal("hide")
    }), r.on("hidden.bs.modal", function(e) {
        $(this).remove()
    }), r.modal()
}), $(function() {
    function e() {
        $("input[type=checkbox").filter(function(e, t) {
            return t.name.endsWith(".onlyAdult") || t.name.endsWith(".denyBest")
        }).map(function(e, t) {
            var n;
            t.name.endsWith(".onlyAdult") ? n = $(t).parents(".item-body").find(".item-warrings > p > .best-live-type-adult") : t.name.endsWith(".denyBest") && (n = $(t).parents(".item-body").find(".item-warrings > p > .best-live-type-best")), n && n.css("display", t.checked ? "block" : "none")
        })
    }
    $(".sortable-list-wrapper").on("change", "input[type=checkbox]", e), e()
}), $(function() {
    function e() {
        var e;
        location.href.endsWith("/notice") && (e = ~~$("select[name=display_notice_count]").val(), $(".list-table > .sortable-list > .vrow").removeClass("active-with-bg"), $(".list-table > .sortable-list > .vrow:nth-child(-n+".concat(e, ")")).addClass("active-with-bg"))
    }
    $('button[data-action="sortable-list-add-item"]').on("click", function(e) {
        var t;
        if (void 0 === (null === (t = e.target.dataset) || void 0 === t ? void 0 : t.list)) return console.error("[data-list] is not defined"), !1;
        var n = $(e.target.dataset.list);
        if (n.length) {
            if (void 0 === (null === (e = n[0].dataset) || void 0 === e ? void 0 : e.sample)) return console.error("[data-sample] is not defined"), !1;
            var e = $(n[0].dataset.sample),
                r = e.clone(!0, !0);
            r.attr({
                class: r.attr("data-class")
            }), $.each(r.data(), function(e) {
                e = e.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(function(e) {
                    return e.toLowerCase()
                }).join("-");
                r.removeAttr("data-" + e)
            }), n.prop("newElemId") || n.prop("newElemId", +e.attr("data-idx-from") || 0), r.find("[name]").each(function(e, t) {
                t.name = t.name.replace(/\%idx\%/g, n.prop("newElemId"))
            }), r.find('[name$=".order[]"]').each(function(e, t) {
                t.value = t.value.replace(/\%idx\%/g, n.prop("newElemId"))
            }), r.find("[data-required]").each(function(e, t) {
                t.required = !0, t.removeAttribute("data-required")
            }), r.find('[id*="%idx%"]').each(function(e, t) {
                t.id = t.id.replace(/\%idx\%/g, n.prop("newElemId"))
            }), r.find('label[for*="%idx%"]').each(function(e, t) {
                t.htmlFor = t.htmlFor.replace(/\%idx\%/g, n.prop("newElemId"))
            }), n.prop("newElemId", n.prop("newElemId") + 1), n.append(r)
        } else console.error("[data-list] is not correct")
    }), $('button[data-action="sortable-list-remove-item"]').on("click", function(e) {
        e = $(e.currentTarget);
        e.attr("data-confirm") && e.attr("data-confirm-text") && !confirm(e.attr("data-confirm-text")) || e.closest(e.attr("data-item")).remove()
    }), $(".sortable-list.category").length && $(".body").on("click", ".sortable-list.category .item-head", function(e) {
        var t;
        "INPUT" !== e.target.tagName && ((e = (t = $(e.currentTarget)).next()).is(":hidden") ? (e.slideDown("fast"), t.parent().addClass("extend")) : (e.slideUp("fast"), t.parent().removeClass("extend")))
    }), $("select[name=display_notice_count], .sortable-list").on("change", e), e()
});