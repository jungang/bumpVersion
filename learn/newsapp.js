!
	function(e, n) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : e.newsappAPI = n()
	} (this,
		function() {
			"use strict";
			function e(e) {
				var n = document.getElementById(e);
				return n || (n = document.createElement("iframe"), n.id = e, n.style.display = "none", document.body.appendChild(n), n)
			}
			function n(e) {
				setTimeout(function() {
						var n = document.getElementById(e);
						n && document.body.removeChild(n)
					},
					3e3)
			}
			function o(o, t) {
				e(o).src = t,
					n(o)
			}
			function t(e) {
				var n = [{
						id: "__newsapp_sharewxurl",
						text: e.wxUrl
					},
						{
							id: "__newsapp_sharewxthumburl",
							text: e.wxImg
						},
						{
							id: "__newsapp_sharewxtitle",
							text: e.wxTitle
						},
						{
							id: "__newsapp_sharewxtext",
							text: e.wxText
						},
						{
							id: "__newsapp_sharephotourl",
							text: e.wbImg
						}],
					o = document.getElementById("__newsapp_shareDom");
				o || ((o = document.createElement("div")).id = "__newsapp_shareDom", o.style.display = "none", document.body.appendChild(o)),
					o.innerHTML = "",
					o.innerHTML = n.map(function(e) {
						return e.text ? '<div id="' + e.id + '">' + e.text + "</div>": ""
					}).join("")
			}
			function i(e) {
				return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
			}
			function a() {
				var e = "__newsapp_upload_image",
					n = document.getElementById(e);
				return n || ((n = document.createElement("input")).id = e, n.type = "file", n.style.display = "none", n.accept = "image/*", document.body.appendChild(n)),
					n
			}
			var d = {
					ui: "docmode://",
					copy: "copy://{{text}}",
					share: "share://",
					openArticle: "newsapp://doc/{{docId}}",
					openVedio: "newsapp://video/{{videoId}}",
					openPhoto: "newsapp://photo/{{channelId}}/{{docId}}",
					device: "device://",
					trash: "trashid://",
					encrypt: "encrypt://{{text}}",
					login: "login://",
					userinfo: "userinfo://",
					location: "location://",
					setting: "settings://",
					alarm: "alarm://",
					remind: "alert://",
					comment: "comment://",
					opencomment: "newsapp://tie/{{docId}}",
					pushview: "pushview://",
					updateprofile: "updateprofile://",
					uploadimage: "uploadimage://",
					downloadImage: "downloadimage://{{imgUrl}}",
					otherappinfo: "downloadimage://{{imgUrl}}"
				},
				p = window.navigator.userAgent,
				c = /newsapp/i.test(p),
				r = (p.match(/ipad|iphone|ipod/i), p.match(/android/i));
			return {
				ui: {
					showToolbar: function() {
						o("showToolbar", d.ui + "toolbar/show")
					},
					hideToolbar: function() {
						o("hideToolbar", d.ui + "toolbar/hide")
					},
					modifyTitle: function(e) {
						o("modifyTitle", d.ui + "modifytitle/" + encodeURIComponent(e))
					},
					button: function(e, n) {
						o("button", d.ui + "actionbutton/" + encodeURIComponent(e)),
							window.__newsapp_browser_actionbutton = function() {
								window.__newsapp_browser_actionbutton = null,
								n && n()
							}
					}
				},
				open: function(e, n, t) {
					var i = void 0;
					switch (e) {
						case "article":
							i = d.openArticle.replace("{{docId}}", encodeURIComponent(n));
							break;
						case "vedio":
							i = d.openVedio.replace("{{videoId}}", encodeURIComponent(n));
							break;
						case "photo":
							i = d.openPhoto.replace("{{docId}}", encodeURIComponent(n)).replace("{{channelId}}", encodeURIComponent(t));
							break;
						default:
							return
					}
					o("open_" + e + "_" + n, i)
				},
				copy: function(e) {
					o("copy", d.copy.replace("{{text}}", encodeURIComponent(e)))
				},
				device: function(e) {
					o("device", d.device),
						window.__newsapp_device_done = function(n) {
							window.__newsapp_device_done = null,
							e && e(JSON.stringify(n))
						}
				},
				trash: function(e) {
					o("trash", d.trash),
						window.__newsapp_trashid_done = function(n) {
							window.__newsapp_trashid_done = null,
							e && e(JSON.stringify(n))
						}
				},
				encrypt: function(e, n) {
					var t = encodeURIComponent(JSON.stringify(e));
					o("encrypt", d.encrypt.replace("{{text}}", t)),
						window.__newsapp_encrypt_done = function(e) {
							window.__newsapp_encrypt_done = null,
							n && n(e)
						},
					r && window.extra && n(window.extra.__newsapp_encrypt(t))
				},
				share: {
					invokeShare: function(e, n) {
						t(e),
							o("share", d.share),
							window.__newsapp_share_done = function() {
								window.__newsapp_share_done = null,
								n && n()
							}
					},
					setShareData: t
				},
				alarm: function(e, n) {
					e.url,
						e.date,
						e.title,
						e.message;
					var t = e.type;
					if ("add" === t || "remove" === t || "check" === t || "enable" === t) {
						for (var i in e) if ("type" !== i) {
							var a = document.getElementById("__newsapp_alarm_" + i);
							a || ((a = document.createElement("div")).style.display = "none", a.id = "__newsapp_alarm_" + i, document.body.appendChild(a)),
								a.innerHTML = e[i]
						}
						o("alarm_" + t, d.alarm + t);
						var p = window;
						r && window.extra,
							p["__newsapp_alarm_" + t + "_done"] = function(e) {
								p.func = null,
								n && n(e)
							}
					}
				},
				remind: function(e, n) {
					e.id,
						e.url,
						e.start,
						e.end,
						e.pattern,
						e.title,
						e.message;
					var t = e.type;
					if ("add" === t || "remove" === t || "check" === t || "change" === t || "enable" === t) {
						for (var i in e) if ("type" !== i) {
							var a = document.getElementById("__newsapp_alert_" + i);
							a || ((a = document.createElement("div")).style.display = "none", a.id = "__newsapp_alert_" + i, document.body.appendChild(a)),
								a.innerHTML = e[i]
						}
						o("remind_" + t, d.remind + t);
						var p = window;
						r && window.extra,
							p["__newsapp_alert_" + t + "_done"] = function(e) {
								p.func = null,
								n && n(e)
							}
					}
				},
				login: function(e) {
					o("login", d.login),
						window.__newsapp_login_done = function(n) {
							window.__newsapp_login_done = null,
							e && e(n)
						}
				},
				userinfo: function(e) {
					if (o("userinfo", d.userinfo), window.__newsapp_userinfo_done = function(n) {
							window.__newsapp_userinfo_done = null,
								n ? (o("login", d.login), e && e(n)) : alert(n)
						},
							!c) {
						var n = i("S_INFO"),
							t = i("P_INFO");
						n && e && e({
							nickname: t.split("|")[0]
						})
					}
				},
				location: function(e, n) { ("current" === e || "switch" === e) && (o("location_" + e, d.location + e), window.__newsapp_location_done = function(e) {
					window.__newsapp_location_done = null,
					n && n(e)
				})
				},
				setting: function(e) {
					o("setting", d.setting),
						window.__newsapp_settings_done = function(n) {
							window.__newsapp_settings_done = null,
							e && e(n)
						}
				},
				comment: function(e, n) {
					var t = e.boardid,
						i = e.docid,
						a = e.replyid,
						p = void 0 === a ? "": a,
						c = "__newsapp_comment",
						r = document.getElementById(c);
					r || ((r = document.createElement("div")).style.display = "none", r.id = c, document.body.appendChild(r)),
						r.setAttribute("boardid", t),
						r.setAttribute("docid", i),
						r.setAttribute("replyid", p),
						o("comment", d.comment),
						window.__newsapp_comment_done = function(e) {
							window.__newsapp_comment_done = null,
							n && n(e)
						}
				},
				opencomment: function(e) {
					o("opencomment", d.opencomment.replace("{{docId}}", e))
				},
				pushview: {
					feedback: function(e) {
						var n = e ? "/" + encodeURIComponent(e) : "";
						o("pushview__feedback", d.pushview + "feedback" + n)
					},
					personalcenter: function() {
						o("pushview__personalcenter", d.pushview + "personalcenter")
					},
					mytask: function() {
						o("pushview__mytask", d.pushview + "mytask")
					},
					inapppurchase: function() {
						o("pushview__inapppurchase", d.pushview + "inapppurchase")
					},
					wallet: function(e) {
						o("pushview__wallet" + e, d.pushview + "wallet/" + e)
					},
					coupon: function() {
						o("pushview__coupon", d.pushview + "wallet/coupon")
					},
					applicationsettings: function() {
						o("pushview__applicationsettings", d.pushview + "applicationsettings")
					},
					settings: function() {
						o("pushview__settings", d.pushview + "settings")
					},
					qrcode: function() {
						o("pushview__qrcode", d.pushview + "qrcode")
					}
				},
				updateprofile: function() {
					o("updateprofile", d.updateprofile)
				},
				uploadimage: function(e, n) {
					var t = e.width,
						i = void 0 === t ? 750 : t,
						p = e.height,
						c = void 0 === p ? 1e4: p,
						l = e.type,
						u = void 0 === l ? "album": l;
					if (r) o("upload" + u, "" + d.uploadimage + u + "/" + i + "x" + c),
						window.__newsapp_upload_image_done = function(e) {
							window.__newsapp_upload_image_done = null,
								alert(e),
							n && n("http://s.cimg.163.com/i/" + e.replace("http://", "") + "." + i + "x" + c + ".75.auto.jpg")
						};
					else {
						var s = a();
						s.onchange = function() {
							var o = s.files[0];
							if (o && /image/.test(o.type)) {
								var t = new FormData;
								t.append("files", o),
								"function" == typeof e.loadingStart && e.loadingStart();
								var a = new XMLHttpRequest;
								a.open("POST", "http://upfile.m.163.com/nos/upload/pub"),
									a.onload = function(o) {
										var t = null;
										200 === a.status && (t = JSON.parse(a.responseText)),
										"function" == typeof e.loadingEnd && e.loadingEnd(),
											n(t ? t.url + "?imageView&thumbnail=" + i + "x" + c + "&quality=75": null)
									},
									a.send(t)
							} else alert("请上传图片类型")
						},
							s.click()
					}
				},
				downloadImage: function(e, n) {
					o("downloadImage", d.downloadImage.replace("{{imgUrl}}", encodeURIComponent(e)));
					var t = window;
					r && window.extra && (t = window.extra),
						t.__newsapp_download_image_done = function(e, o) {
							t.__newsapp_download_image_done = null,
							e && n(o)
						}
				}
			}
		});