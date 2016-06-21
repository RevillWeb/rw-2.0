/**
 * Created by Leon Revill on 11/06/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class TwitterWidget extends HTMLElement {
    attachedCallback() {
        this.innerHTML = `
            <div class="ccontainer">
                <div class="spinner">
                    <div class="inner">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
                <div class="ccontent"></div>
            </div>
        `;
        let $script = document.createElement("script");
        $script.setAttribute("src", "//platform.twitter.com/widgets.js");
        let $a = document.createElement("a");
        $a.classList.add("twitter-timeline");
        $a.setAttribute("href", "https://twitter.com/revillweb");
        let $content = this.querySelector(".ccontent");
        $content.appendChild($script);
        $content.appendChild($a);
        setTimeout(() => {
            this.querySelector(".ccontainer").classList.add("loaded");
        }, 1000);
    }
}