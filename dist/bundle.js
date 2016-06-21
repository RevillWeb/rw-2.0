/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mediumPosts = __webpack_require__(1);

	var _githubRepos = __webpack_require__(2);

	var _twitterWidget = __webpack_require__(3);

	document.registerElement("medium-posts", _mediumPosts.MediumPosts); /**
	                                                                     * Created by Leon Revill on 11/06/16.
	                                                                     * Blog: http://www.revilweb.com
	                                                                     * GitHub: https://github.com/RevillWeb
	                                                                     * Twitter: @RevillWeb
	                                                                     */

	document.registerElement("github-repos", _githubRepos.GithubRepos);
	document.registerElement("twitter-widget", _twitterWidget.TwitterWidget);

	function closest(el, selector) {
	    var matchesFn;

	    // find vendor prefix
	    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
	        if (typeof document.body[fn] == 'function') {
	            matchesFn = fn;
	            return true;
	        }
	        return false;
	    });

	    var parent;

	    // traverse parents
	    while (el) {
	        parent = el.parentElement;
	        if (parent && parent[matchesFn](selector)) {
	            return parent;
	        }
	        el = parent;
	    }

	    return null;
	}

	if (document.documentElement.className.indexOf("legacy") === -1) {

	    var $bottoms = document.querySelectorAll(".bottom");
	    [].forEach.call($bottoms, function ($element) {
	        $element.addEventListener("mouseover", function () {
	            this.parentNode.classList.add("contenthover");
	        });
	        $element.addEventListener("mouseout", function () {
	            this.parentNode.classList.remove("contenthover");
	        });
	    });
	    var $mores = document.querySelectorAll(".more button");
	    [].forEach.call($mores, function ($element) {
	        $element.addEventListener("click", function (event) {
	            event.preventDefault();
	            event.stopImmediatePropagation();
	            var $section = closest(event.target, ".section.content");
	            if ($section !== null) {
	                $section.classList.add("slideup");
	            }
	        });
	    });
	    var $sections = document.querySelectorAll(".section.content");
	    [].forEach.call($sections, function ($element) {
	        var url = $element.getAttribute("data-url");
	        if (url !== null) {
	            $element.querySelector(".top").addEventListener("click", function () {
	                window.open(url, '_blank');
	            });
	        }
	        $element.addEventListener("mouseout", function (event) {
	            if (event.toElement !== null) {
	                var $section = closest(event.toElement, ".section.content");
	                if ($section !== null && $section != this) {
	                    var $bottom = closest(event.target, ".bottom");
	                    if ($bottom !== null) {
	                        $bottom.scrollTop = 0;
	                    }
	                    this.classList.remove("slideup");
	                }
	            }
	        });
	    });
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by Leon Revill on 11/06/16.
	 * Blog: http://www.revilweb.com
	 * GitHub: https://github.com/RevillWeb
	 * Twitter: @RevillWeb
	 */
	var LS_TS_KEY = "rw_m_ts";
	var LS_DATA_KEY = "rw_m_data";

	var MediumPosts = exports.MediumPosts = function (_HTMLElement) {
	    _inherits(MediumPosts, _HTMLElement);

	    function MediumPosts() {
	        _classCallCheck(this, MediumPosts);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MediumPosts).apply(this, arguments));
	    }

	    _createClass(MediumPosts, [{
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            this.innerHTML = "\n            <div class=\"ccontainer\">\n                <div class=\"spinner\">\n                    <div class=\"inner\">\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                    </div>\n                </div>\n                <div class=\"ccontent\"></div>\n            </div>\n        ";

	            //Grab any items from local storage
	            var items = localStorage.getItem(LS_DATA_KEY);
	            //Try and parse a timestamp from local storage
	            var ts = null;
	            try {
	                ts = new Date(localStorage.getItem(LS_TS_KEY));
	            } catch (e) {}
	            //Couldn't parse ts

	            //If we have some cached data and its less than an hour old, use it
	            if (ts !== null && new Date().getTime() - ts.getTime() <= 60000 && items !== null) {
	                this.items = JSON.parse(items);
	                this.render();
	            } else {
	                //Otherwise go and grab some new data
	                var xhr = new XMLHttpRequest();
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState == 4 && xhr.status == 200) {
	                        try {
	                            (function () {
	                                var parser = new DOMParser();
	                                var $xml = parser.parseFromString(xhr.response, "text/xml");
	                                var $items = $xml.querySelectorAll("item");
	                                _this2.items = [];
	                                [].forEach.call($items, function ($item) {
	                                    var $desc = parser.parseFromString($item.querySelector("description").textContent, "text/html");
	                                    _this2.items.push({
	                                        "title": $item.querySelector("title").textContent,
	                                        "description": $item.querySelector("description").textContent,
	                                        "image": $desc.querySelector("p.medium-feed-image img").src,
	                                        "link": $item.querySelector("link").textContent,
	                                        "date": $item.querySelector("pubDate").textContent
	                                    });
	                                });
	                                localStorage.setItem(LS_DATA_KEY, JSON.stringify(_this2.items));
	                                localStorage.setItem(LS_TS_KEY, new Date());
	                                _this2.render();
	                            })();
	                        } catch (e) {
	                            console.error("Couldn't parse API response:", e);
	                        }
	                    }
	                };
	                xhr.open("GET", "http://cors.io/?u=https://blog.revillweb.com/feed");
	                xhr.send();
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this3 = this;

	            var $template = document.createElement("ul");
	            this.items.forEach(function (item) {
	                var $li = document.createElement("li");
	                $li.style.backgroundImage = "url('" + item.image + "')";
	                var $a = document.createElement("a");
	                $a.setAttribute("href", item.link);
	                $a.setAttribute("target", "_blank");
	                var dateString = new Date(item.date).toLocaleDateString();
	                $a.innerHTML = "<div class=\"date\"><span>" + dateString + "</span></div><h3>" + item.title + "</h3>";
	                $li.appendChild($a);
	                $template.appendChild($li);
	            });
	            this.querySelector(".ccontent").appendChild($template);
	            setTimeout(function () {
	                _this3.querySelector(".ccontainer").classList.add("loaded");
	            }, 1000);
	        }
	    }]);

	    return MediumPosts;
	}(HTMLElement);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by Leon Revill on 11/06/16.
	 * Blog: http://www.revilweb.com
	 * GitHub: https://github.com/RevillWeb
	 * Twitter: @RevillWeb
	 */
	var LS_TS_KEY = "rw_gh_ts";
	var LS_DATA_KEY = "rw_gh_data";

	var GithubRepos = exports.GithubRepos = function (_HTMLElement) {
	    _inherits(GithubRepos, _HTMLElement);

	    function GithubRepos() {
	        _classCallCheck(this, GithubRepos);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(GithubRepos).apply(this, arguments));
	    }

	    _createClass(GithubRepos, [{
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            this.innerHTML = "\n            <div class=\"ccontainer github\">\n                <div class=\"spinner\">\n                    <div class=\"inner\">\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                    </div>\n                </div>\n                <div class=\"ccontent\"></div>\n            </div>\n        ";

	            //Grab any items from local storage
	            var items = localStorage.getItem(LS_DATA_KEY);
	            //Try and parse a timestamp from local storage
	            var ts = null;
	            try {
	                ts = new Date(localStorage.getItem(LS_TS_KEY));
	            } catch (e) {}
	            //Couldn't parse ts

	            //If we have some cached data and its less than an hour old, use it
	            if (ts !== null && new Date().getTime() - ts.getTime() <= 60000 && items !== null) {
	                this.items = JSON.parse(items);
	                this.render();
	            } else {
	                //Otherwise go and grab some new data
	                var xhr = new XMLHttpRequest();
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState == 4 && xhr.status == 200) {
	                        try {
	                            _this2.items = JSON.parse(xhr.response);
	                            localStorage.setItem(LS_DATA_KEY, xhr.response);
	                            localStorage.setItem(LS_TS_KEY, new Date());
	                            _this2.render();
	                        } catch (e) {
	                            console.error("Couldn't parse API response:", e);
	                        }
	                    }
	                };
	                xhr.open("GET", "https://api.github.com/users/RevillWeb/repos?sort=updated&type=owner&per_page=10");
	                xhr.send();
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this3 = this;

	            var $template = document.createElement("ul");
	            this.items.forEach(function (item) {
	                var $li = document.createElement("li");
	                var $a = document.createElement("a");
	                $a.setAttribute("href", item.html_url);
	                $a.setAttribute("target", "_blank");
	                var dateString = new Date(item.updated_at).toLocaleDateString();
	                $a.innerHTML = "<div class=\"date\">" + dateString + "</div><h3>" + item.name + "</h3><p class=\"item-description\">" + item.description + "</p>";
	                $li.appendChild($a);
	                $template.appendChild($li);
	            });
	            this.querySelector(".ccontent").appendChild($template);
	            setTimeout(function () {
	                _this3.querySelector(".ccontainer").classList.add("loaded");
	            }, 1000);
	        }
	    }]);

	    return GithubRepos;
	}(HTMLElement);

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by Leon Revill on 11/06/16.
	 * Blog: http://www.revilweb.com
	 * GitHub: https://github.com/RevillWeb
	 * Twitter: @RevillWeb
	 */

	var TwitterWidget = exports.TwitterWidget = function (_HTMLElement) {
	    _inherits(TwitterWidget, _HTMLElement);

	    function TwitterWidget() {
	        _classCallCheck(this, TwitterWidget);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(TwitterWidget).apply(this, arguments));
	    }

	    _createClass(TwitterWidget, [{
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            this.innerHTML = "\n            <div class=\"ccontainer\">\n                <div class=\"spinner\">\n                    <div class=\"inner\">\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                    </div>\n                </div>\n                <div class=\"ccontent\"></div>\n            </div>\n        ";
	            var $script = document.createElement("script");
	            $script.setAttribute("src", "//platform.twitter.com/widgets.js");
	            var $a = document.createElement("a");
	            $a.classList.add("twitter-timeline");
	            $a.setAttribute("href", "https://twitter.com/revillweb");
	            var $content = this.querySelector(".ccontent");
	            $content.appendChild($script);
	            $content.appendChild($a);
	            setTimeout(function () {
	                _this2.querySelector(".ccontainer").classList.add("loaded");
	            }, 1000);
	        }
	    }]);

	    return TwitterWidget;
	}(HTMLElement);

/***/ }
/******/ ]);