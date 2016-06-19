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
	        var $section = this.closest(".section.content");
	        if ($section !== null) {
	            $section.classList.add("slideup");
	        }
	    });
	});
	var $sections = document.querySelectorAll(".section.content");
	[].forEach.call($sections, function ($element) {
	    if ($element.dataset.url !== undefined) {
	        $element.querySelector(".top").addEventListener("click", function () {
	            window.open($element.dataset.url, '_blank');
	        });
	    }
	    $element.addEventListener("mouseout", function (event) {
	        if (event.toElement !== null) {
	            var $section = event.toElement.closest(".section");
	            if ($section !== null && $section != this) {
	                var $bottom = event.target.closest(".bottom");
	                if ($bottom !== null) {
	                    $bottom.scrollTop = 0;
	                }
	                this.classList.remove("slideup");
	            }
	        }
	    });
	});

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

	var MediumPosts = exports.MediumPosts = function (_HTMLElement) {
	    _inherits(MediumPosts, _HTMLElement);

	    function MediumPosts() {
	        _classCallCheck(this, MediumPosts);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MediumPosts).apply(this, arguments));
	    }

	    _createClass(MediumPosts, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.createShadowRoot();
	            this.shadowRoot.innerHTML = "\n            <style>\n                ul {\n                    margin: 0;\n                    padding: 0;\n                    list-style: none;\n                }\n                ul li {\n                    border-bottom: solid 1px #999;\n                    border-top: solid 1px #FFF;\n                    box-sizing: content-box;\n                    transition: border-color 0.7s ease;\n                }\n                ul li a {\n                    text-decoration: none;\n                    display: block;\n                    height: 200px;\n                    padding: 30px 30px 0 30px;\n                    background-color: rgba(241, 241, 241, 0.90);\n                    color: #0d152d;\n                    transition: background-color 0.7s ease, color 0.7s ease;\n                    position: relative;\n                }\n                ul li a h3 {\n                    margin: 0;\n                    padding: 0;\n                    font-size: 22px;\n                    font-weight: 300;\n                }\n                ul li a .date {\n                    font-size: 12px;\n                    margin-bottom: 20px;\n                    color: #999;\n                    font-weight: 300;\n                }\n                ul li:hover {\n                    border-top: solid 1px #000;\n                }\n                ul li:hover a {\n                    background-color: #111111;\n                    color: #FFF !important;\n                }\n                .spinner {\n                    position: absolute;\n                    top: 0;\n                    right: 0;\n                    bottom: 0;\n                    left: 0;\n                    z-index: 200;\n                }\n                .spinner .inner {\n                    position: absolute;\n                    top: 50%;\n                    left: 50%;\n                    -webkit-transform: translate(-50%, -50%);\n                    transform: translate(-50%, -50%);\n                }\n                .ccontent {\n                    position: absolute;\n                    top: 100%;\n                    right: 0;\n                    bottom: 0;\n                    left: 0;\n                    z-index: 2;\n                }\n                .ccontainer.loaded .ccontent {\n                    transition: top 0.7s ease;\n                    top: 0;\n                }\n                .ccontainer.loaded .spinner {\n                    transition: top 0.6s ease;\n                    opacity: 0;\n                    z-index: 1;\n                }\n                .dot {\n                    width: 10px;\n                    height: 10px;\n                    border: 2px solid white;\n                    border-radius: 50%;\n                    float: left;\n                    margin: 0 5px;\n                    -webkit-transform: scale(0);\n                    transform: scale(0);\n                    -webkit-animation: fx 1000ms ease infinite 0ms;\n                    animation: fx 1000ms ease infinite 0ms;\n                }\n                .dot:nth-child(2) {\n                    -webkit-animation: fx 1000ms ease infinite 300ms;\n                    animation: fx 1000ms ease infinite 300ms;\n                }\n                .dot:nth-child(3) {\n                    -webkit-animation: fx 1000ms ease infinite 600ms;\n                    animation: fx 1000ms ease infinite 600ms;\n                }\n                @-webkit-keyframes fx {\n                    50% {\n                        -webkit-transform: scale(1);\n                        transform: scale(1);\n                        opacity: 1;\n                    }\n                    100% {\n                        opacity: 0;\n                    }\n                }\n                @keyframes fx {\n                    50% {\n                        -webkit-transform: scale(1);\n                        transform: scale(1);\n                        opacity: 1;\n                    }\n                    100% {\n                        opacity: 0;\n                    }\n                }\n            </style>\n            <div class=\"ccontainer\">\n                <div class=\"spinner\">\n                    <div class=\"inner\">\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                    </div>\n                </div>\n                <div class=\"ccontent\"></div>\n            </div>\n        ";
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

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
	                                var descString = $item.querySelector("description").innerHTML.replace("<![CDATA[", "").replace("]]>", "");
	                                var $desc = parser.parseFromString(descString, "text/html");
	                                _this2.items.push({
	                                    "title": $item.querySelector("title").innerHTML.replace("<![CDATA[", "").replace("]]>", ""),
	                                    "description": $desc.querySelector("p.medium-feed-snippet").innerHTML,
	                                    "image": $desc.querySelector("p.medium-feed-image img").src,
	                                    "link": $item.querySelector("link").innerHTML,
	                                    "date": $item.querySelector("pubDate").innerHTML
	                                });
	                            });
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
	                var dateString = new Intl.DateTimeFormat("en-GB").format(new Date(item.date));
	                $a.innerHTML = "<div class=\"date\"><span>" + dateString + "</span></div><h3>" + item.title + "</h3>";
	                $li.appendChild($a);
	                $template.appendChild($li);
	            });
	            this.shadowRoot.querySelector(".ccontent").appendChild($template);
	            setTimeout(function () {
	                _this3.shadowRoot.querySelector(".ccontainer").classList.add("loaded");
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

	var GithubRepos = exports.GithubRepos = function (_HTMLElement) {
	    _inherits(GithubRepos, _HTMLElement);

	    function GithubRepos() {
	        _classCallCheck(this, GithubRepos);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(GithubRepos).apply(this, arguments));
	    }

	    _createClass(GithubRepos, [{
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.createShadowRoot();
	            this.shadowRoot.innerHTML = "\n            <style>\n                ul {\n                    margin: 0;\n                    padding: 0;\n                    list-style: none;\n                }\n                ul li {\n                    border-bottom: solid 1px #999;\n                    border-top: solid 1px #FFF;\n                    box-sizing: content-box;\n                    transition: border-color 0.7s ease;\n                }\n                ul li a {\n                    text-decoration: none;\n                    display: block;\n                    height: 200px;\n                    padding: 30px 30px 0 30px;\n                    background-color: #F1F1F1;\n                    color: #0d152d;\n                    transition: background-color 0.7s ease, color 0.7s ease;\n                    position: relative;\n                }\n                ul li a h3 {\n                    margin: 0;\n                    padding: 0;\n                    font-size: 22px;\n                    font-weight: 300;\n                }\n                ul li a .info {\n                    font-size: 12px;\n                    margin-bottom: 20px;\n                }\n                ul li:hover {\n                    border-top: solid 1px #000;\n                }\n                ul li:hover a {\n                    background-color: #111111;\n                    color: #FFF;\n                }\n                .spinner {\n                    position: absolute;\n                    top: 0;\n                    right: 0;\n                    bottom: 0;\n                    left: 0;\n                    z-index: 200;\n                }\n                .spinner .inner {\n                    position: absolute;\n                    top: 50%;\n                    left: 50%;\n                    -webkit-transform: translate(-50%, -50%);\n                    transform: translate(-50%, -50%);\n                }\n                .ccontent {\n                    position: absolute;\n                    top: 100%;\n                    right: 0;\n                    bottom: 0;\n                    left: 0;\n                }\n                .ccontainer.loaded .ccontent {\n                    transition: top 0.7s ease;\n                    top: 0;\n                    z-index: 2;\n                }\n                .container.loaded .spinner {\n                    transition: top 0.6s ease;\n                    opacity: 0;\n                    z-index: 1;\n                }\n                .dot {\n                    width: 10px;\n                    height: 10px;\n                    border: 2px solid white;\n                    border-radius: 50%;\n                    float: left;\n                    margin: 0 5px;\n                    -webkit-transform: scale(0);\n                    transform: scale(0);\n                    -webkit-animation: fx 1000ms ease infinite 0ms;\n                    animation: fx 1000ms ease infinite 0ms;\n                }\n                .dot:nth-child(2) {\n                    -webkit-animation: fx 1000ms ease infinite 300ms;\n                    animation: fx 1000ms ease infinite 300ms;\n                }\n                .dot:nth-child(3) {\n                    -webkit-animation: fx 1000ms ease infinite 600ms;\n                    animation: fx 1000ms ease infinite 600ms;\n                }\n                @-webkit-keyframes fx {\n                    50% {\n                        -webkit-transform: scale(1);\n                        transform: scale(1);\n                        opacity: 1;\n                    }\n                    100% {\n                        opacity: 0;\n                    }\n                }\n                @keyframes fx {\n                    50% {\n                        -webkit-transform: scale(1);\n                        transform: scale(1);\n                        opacity: 1;\n                    }\n                    100% {\n                        opacity: 0;\n                    }\n                }\n                ul li .description {\n                    font-size: 12px;\n                    font-weight: 300;\n                    line-height: 20px;\n                }\n                ul li h3 {\n                    white-space: nowrap;\n                    overflow: hidden;\n                    text-overflow: ellipsis;\n                }\n                ul li a .date {\n                    font-size: 12px;\n                    margin-bottom: 20px;\n                    color: #999;\n                    font-weight: 300;\n                }\n            </style>\n            <div class=\"ccontainer\">\n                <div class=\"spinner\">\n                    <div class=\"inner\">\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                    </div>\n                </div>\n                <div class=\"ccontent\"></div>\n            </div>\n        ";
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            var xhr = new XMLHttpRequest();
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4 && xhr.status == 200) {
	                    try {
	                        _this2.items = JSON.parse(xhr.response);
	                        _this2.render();
	                    } catch (e) {
	                        console.error("Couldn't parse API response:", e);
	                    }
	                }
	            };
	            xhr.open("GET", "https://api.github.com/users/RevillWeb/repos?sort=updated&type=owner");
	            xhr.send();
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
	                var dateString = new Intl.DateTimeFormat().format(new Date(item.updated_at));
	                $a.innerHTML = "<div class=\"info\"><span class=\"date\">" + dateString + "</span></div><h3>" + item.name + "</h3><p class=\"description\">" + item.description + "</p>";
	                $li.appendChild($a);
	                $template.appendChild($li);
	            });
	            this.shadowRoot.querySelector(".ccontent").appendChild($template);
	            setTimeout(function () {
	                _this3.shadowRoot.querySelector(".ccontainer").classList.add("loaded");
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
	        key: "createdCallback",
	        value: function createdCallback() {
	            this.createShadowRoot();
	            this.shadowRoot.innerHTML = "\n            <style>\n                .spinner {\n                    position: absolute;\n                    top: 0;\n                    right: 0;\n                    bottom: 0;\n                    left: 0;\n                    z-index: 200;\n                }\n                .spinner .inner {\n                    position: absolute;\n                    top: 50%;\n                    left: 50%;\n                    -webkit-transform: translate(-50%, -50%);\n                    transform: translate(-50%, -50%);\n                }\n                .ccontent {\n                    position: absolute;\n                    top: 100%;\n                    right: 0;\n                    bottom: 0;\n                    left: 0;\n                }\n                .ccontainer.loaded .ccontent {\n                    transition: top 0.7s ease;\n                    top: 0;\n                    z-index: 2;\n                    background-color: #FFF;\n                }\n                .ccontainer.loaded .spinner {\n                    transition: top 0.6s ease;\n                    opacity: 0;\n                    z-index: 1;\n                }\n                .dot {\n                    width: 10px;\n                    height: 10px;\n                    border: 2px solid white;\n                    border-radius: 50%;\n                    float: left;\n                    margin: 0 5px;\n                    -webkit-transform: scale(0);\n                    transform: scale(0);\n                    -webkit-animation: fx 1000ms ease infinite 0ms;\n                    animation: fx 1000ms ease infinite 0ms;\n                }\n                .dot:nth-child(2) {\n                    -webkit-animation: fx 1000ms ease infinite 300ms;\n                    animation: fx 1000ms ease infinite 300ms;\n                }\n                .dot:nth-child(3) {\n                    -webkit-animation: fx 1000ms ease infinite 600ms;\n                    animation: fx 1000ms ease infinite 600ms;\n                }\n                @-webkit-keyframes fx {\n                    50% {\n                        -webkit-transform: scale(1);\n                        transform: scale(1);\n                        opacity: 1;\n                    }\n                    100% {\n                        opacity: 0;\n                    }\n                }\n                @keyframes fx {\n                    50% {\n                        -webkit-transform: scale(1);\n                        transform: scale(1);\n                        opacity: 1;\n                    }\n                    100% {\n                        opacity: 0;\n                    }\n                }\n            </style>\n            <div class=\"ccontainer\">\n                <div class=\"spinner\">\n                    <div class=\"inner\">\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                        <div class=\"dot\"></div>\n                    </div>\n                </div>\n                <div class=\"ccontent\"><content></content></div>\n            </div>\n        ";
	        }
	    }, {
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            setTimeout(function () {
	                _this2.shadowRoot.querySelector(".ccontainer").classList.add("loaded");
	            }, 1000);
	        }
	    }]);

	    return TwitterWidget;
	}(HTMLElement);

/***/ }
/******/ ]);