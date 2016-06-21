/**
 * Created by Leon Revill on 11/06/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

import {MediumPosts} from './components/medium-posts.js';
import {GithubRepos} from './components/github-repos.js';
import {TwitterWidget} from './components/twitter-widget.js';

document.registerElement("medium-posts", MediumPosts);
document.registerElement("github-repos", GithubRepos);
document.registerElement("twitter-widget", TwitterWidget);

function closest(el, selector) {
    var matchesFn;

    // find vendor prefix
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
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

    const $bottoms = document.querySelectorAll(".bottom");
    [].forEach.call($bottoms, ($element) => {
        $element.addEventListener("mouseover", function () {
            this.parentNode.classList.add("contenthover");
        });
        $element.addEventListener("mouseout", function () {
            this.parentNode.classList.remove("contenthover");
        });
    });
    const $mores = document.querySelectorAll(".more button");
    [].forEach.call($mores, ($element) => {
        $element.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let $section = closest(event.target, ".section.content");
            if ($section !== null) {
                $section.classList.add("slideup");
            }
        });
    });
    const $sections = document.querySelectorAll(".section.content");
    [].forEach.call($sections, ($element) => {
        const url = $element.getAttribute("data-url");
        if (url !== null) {
            $element.querySelector(".top").addEventListener("click", function () {
                window.open(url, '_blank');
            });
        }
        $element.addEventListener("mouseout", function (event) {
            if (event.toElement !== null) {
                const $section = closest(event.toElement, ".section.content");
                if ($section !== null && $section != this) {
                    let $bottom = closest(event.target, ".bottom");
                    if ($bottom !== null) {
                        $bottom.scrollTop = 0;
                    }
                    this.classList.remove("slideup");
                }
            }
        });
    });

}