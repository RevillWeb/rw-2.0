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

const $bottoms = document.querySelectorAll(".bottom");
$bottoms.forEach(($element) => {
    $element.addEventListener("mouseover", function() {
        this.parentNode.classList.add("contenthover");
    });
    $element.addEventListener("mouseout", function() {
        this.parentNode.classList.remove("contenthover");
    });
});
const $mores = document.querySelectorAll(".more button");
$mores.forEach(($element) => {
    $element.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        let $section = this.closest(".section.content");
        if ($section !== null) {
            $section.classList.add("slideup");
        }
    });
});
const $sections = document.querySelectorAll(".section.content");
$sections.forEach(($element) => {
    if ($element.dataset.url !== undefined) {
        $element.querySelector(".top").addEventListener("click", function(){
            window.open($element.dataset.url, '_blank');
        });
    }
    $element.addEventListener("mouseout", function(event) {
        if (event.toElement !== null) {
            const $section = event.toElement.closest(".section");
            if ($section !== null && $section != this) {
                let $bottom = event.target.closest(".bottom");
                if ($bottom !== null) {
                    $bottom.scrollTop = 0;
                }
                this.classList.remove("slideup");
            }
        }
    });
});