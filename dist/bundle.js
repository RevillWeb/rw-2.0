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
/***/ function(module, exports) {

	"use strict";

	/**
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

/***/ }
/******/ ]);