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

	"use strict";

	var _mediumPosts = __webpack_require__(1);

	document.registerElement("medium-posts", _mediumPosts.MediumPosts); /**
	                                                                     * Created by Leon Revill on 11/06/16.
	                                                                     * Blog: http://www.revilweb.com
	                                                                     * GitHub: https://github.com/RevillWeb
	                                                                     * Twitter: @RevillWeb
	                                                                     */

	var $bottoms = document.querySelectorAll(".bottom");
	$bottoms.forEach(function ($element) {
	    $element.addEventListener("mouseover", function () {
	        this.parentNode.classList.add("contenthover");
	    });
	    $element.addEventListener("mouseout", function () {
	        this.parentNode.classList.remove("contenthover");
	    });
	});
	var $mores = document.querySelectorAll(".more button");
	$mores.forEach(function ($element) {
	    $element.addEventListener("click", function (event) {
	        event.preventDefault();
	        var $section = this.closest(".section.content");
	        if ($section !== null) {
	            $section.classList.add("slideup");
	        }
	    });
	});
	var $sections = document.querySelectorAll(".section.content");
	$sections.forEach(function ($element) {
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
	        key: "attachedCallback",
	        value: function attachedCallback() {
	            var _this2 = this;

	            console.log("CREATED!");
	            var xhr = new XMLHttpRequest();
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4 && xhr.status == 200) {
	                    try {
	                        (function () {
	                            var parser = new DOMParser();
	                            var $xml = parser.parseFromString(xhr.response, "text/xml");
	                            console.log($xml);
	                            var $items = $xml.querySelectorAll("item");
	                            _this2.items = [];
	                            $items.forEach(function ($item) {
	                                var descString = $item.querySelector("description").innerHTML.replace("<![CDATA[", "").replace("]]>", "");
	                                var $desc = parser.parseFromString(descString, "text/html");
	                                console.log($desc);
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
	            var $template = document.createElement("ul");
	            console.log("ITEMS:", this.items);
	            this.items.forEach(function (item) {
	                var $li = document.createElement("li");
	                $li.style.backgroundImage = "url('" + item.image + "')";
	                var $a = document.createElement("a");
	                $a.setAttribute("href", item.link);
	                var dateString = new Intl.DateTimeFormat().format(new Date(item.date));
	                $a.innerHTML = "<div class=\"date\"><span>" + dateString + "</span></div><span>" + item.title + "</span>";
	                $li.appendChild($a);
	                $template.appendChild($li);
	            });
	            this.appendChild($template);
	        }
	    }]);

	    return MediumPosts;
	}(HTMLElement);

/***/ }
/******/ ]);