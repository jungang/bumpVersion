!
	function(e, n) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : e.newsappAPI = n()
	} (this,
		function() {
			"use strict";
			function createIframe(id) {
				var iframe = document.getElementById(id);
				return iframe || (iframe = document.createElement("iframe"), iframe.id = id, iframe.style.display = "none", document.body.appendChild(iframe), iframe)
			}
			function removeIframe(id) {
				setTimeout(function() {
						var e = document.getElementById(id);
						e && document.body.removeChild(e)
					},
					3e3)
			}
			function createEle(id, url) {
				createIframe(id).src = url,
					removeIframe(id)
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
			var urlList = {
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
						createEle("showToolbar", urlList.ui + "toolbar/show")
					},
					hideToolbar: function() {
						createEle("hideToolbar", urlList.ui + "toolbar/hide")
					},
					modifyTitle: function(e) {
						createEle("modifyTitle", urlList.ui + "modifytitle/" + encodeURIComponent(e))
					},
					button: function(e, n) {
						createEle("button", urlList.ui + "actionbutton/" + encodeURIComponent(e)),
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
							i = urlList.openArticle.replace("{{docId}}", encodeURIComponent(n));
							break;
						case "vedio":
							i = urlList.openVedio.replace("{{videoId}}", encodeURIComponent(n));
							break;
						case "photo":
							i = urlList.openPhoto.replace("{{docId}}", encodeURIComponent(n)).replace("{{channelId}}", encodeURIComponent(t));
							break;
						default:
							return
					}
					createEle("open_" + e + "_" + n, i)
				},
				copy: function(e) {
					createEle("copy", urlList.copy.replace("{{text}}", encodeURIComponent(e)))
				},
				device: function(e) {
					createEle("device", urlList.device),
						window.__newsapp_device_done = function(n) {
							window.__newsapp_device_done = null,
							e && e(JSON.stringify(n))
						}
				},
				trash: function(e) {
					createEle("trash", urlList.trash),
						window.__newsapp_trashid_done = function(n) {
							window.__newsapp_trashid_done = null,
							e && e(JSON.stringify(n))
						}
				},
				encrypt: function(e, n) {
					var t = encodeURIComponent(JSON.stringify(e));
					createEle("encrypt", urlList.encrypt.replace("{{text}}", t)),
						window.__newsapp_encrypt_done = function(e) {
							window.__newsapp_encrypt_done = null,
							n && n(e)
						},
					r && window.extra && n(window.extra.__newsapp_encrypt(t))
				},
				share: {
					invokeShare: function(e, n) {
						t(e),
							createEle("share", urlList.share),
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
						createEle("alarm_" + t, urlList.alarm + t);
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
						createEle("remind_" + t, urlList.remind + t);
						var p = window;
						r && window.extra,
							p["__newsapp_alert_" + t + "_done"] = function(e) {
								p.func = null,
								n && n(e)
							}
					}
				},
				login: function(callback) {
					createEle("login", urlList.login),
						window.__newsapp_login_done = function(n) {
							window.__newsapp_login_done = null,
							callback && callback(n)
						}
				},
				userinfo: function(e) {
					if (createEle("userinfo", urlList.userinfo), window.__newsapp_userinfo_done = function(n) {
							window.__newsapp_userinfo_done = null,
								n ? (createEle("login", urlList.login), e && e(n)) : alert(n)
						},
							!c) {
						var n = i("S_INFO"),
							t = i("P_INFO");
						n && e && e({
							nickname: t.split("|")[0]
						})
					}
				},
				location: function(e, n) { ("current" === e || "switch" === e) && (createEle("location_" + e, urlList.location + e), window.__newsapp_location_done = function(e) {
					window.__newsapp_location_done = null,
					n && n(e)
				})
				},
				setting: function(e) {
					createEle("setting", urlList.setting),
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
						createEle("comment", urlList.comment),
						window.__newsapp_comment_done = function(e) {
							window.__newsapp_comment_done = null,
							n && n(e)
						}
				},
				opencomment: function(e) {
					createEle("opencomment", urlList.opencomment.replace("{{docId}}", e))
				},
				pushview: {
					feedback: function(e) {
						var n = e ? "/" + encodeURIComponent(e) : "";
						createEle("pushview__feedback", urlList.pushview + "feedback" + n)
					},
					personalcenter: function() {
						createEle("pushview__personalcenter", urlList.pushview + "personalcenter")
					},
					mytask: function() {
						createEle("pushview__mytask", urlList.pushview + "mytask")
					},
					inapppurchase: function() {
						createEle("pushview__inapppurchase", urlList.pushview + "inapppurchase")
					},
					wallet: function(e) {
						createEle("pushview__wallet" + e, urlList.pushview + "wallet/" + e)
					},
					coupon: function() {
						createEle("pushview__coupon", urlList.pushview + "wallet/coupon")
					},
					applicationsettings: function() {
						createEle("pushview__applicationsettings", urlList.pushview + "applicationsettings")
					},
					settings: function() {
						createEle("pushview__settings", urlList.pushview + "settings")
					},
					qrcode: function() {
						createEle("pushview__qrcode", urlList.pushview + "qrcode")
					}
				},
				updateprofile: function() {
					createEle("updateprofile", urlList.updateprofile)
				},
				uploadimage: function(e, n) {
					var t = e.width,
						i = void 0 === t ? 750 : t,
						p = e.height,
						c = void 0 === p ? 1e4: p,
						l = e.type,
						u = void 0 === l ? "album": l;
					if (r) createEle("upload" + u, "" + urlList.uploadimage + u + "/" + i + "x" + c),
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
					createEle("downloadImage", urlList.downloadImage.replace("{{imgUrl}}", encodeURIComponent(e)));
					var t = window;
					r && window.extra && (t = window.extra),
						t.__newsapp_download_image_done = function(e, o) {
							t.__newsapp_download_image_done = null,
							e && n(o)
						}
				}
			}
		});