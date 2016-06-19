/**
 * Created by Leon Revill on 11/06/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class MediumPosts extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
        this.shadowRoot.innerHTML = `
            <style>
                ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
                ul li {
                    border-bottom: solid 1px #999;
                    border-top: solid 1px #FFF;
                    box-sizing: content-box;
                    transition: border-color 0.7s ease;
                }
                ul li a {
                    text-decoration: none;
                    display: block;
                    height: 200px;
                    padding: 30px 30px 0 30px;
                    background-color: rgba(241, 241, 241, 0.90);
                    color: #0d152d;
                    transition: background-color 0.7s ease, color 0.7s ease;
                    position: relative;
                }
                ul li a h3 {
                    margin: 0;
                    padding: 0;
                    font-size: 22px;
                    font-weight: 300;
                }
                ul li a .date {
                    font-size: 12px;
                    margin-bottom: 20px;
                    color: #999;
                    font-weight: 300;
                }
                ul li:hover {
                    border-top: solid 1px #000;
                }
                ul li:hover a {
                    background-color: #111111;
                    color: #FFF !important;
                }
                .spinner {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 200;
                }
                .spinner .inner {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                }
                .ccontent {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 2;
                }
                .ccontainer.loaded .ccontent {
                    transition: top 0.7s ease;
                    top: 0;
                }
                .ccontainer.loaded .spinner {
                    transition: top 0.6s ease;
                    opacity: 0;
                    z-index: 1;
                }
                .dot {
                    width: 10px;
                    height: 10px;
                    border: 2px solid white;
                    border-radius: 50%;
                    float: left;
                    margin: 0 5px;
                    -webkit-transform: scale(0);
                    transform: scale(0);
                    -webkit-animation: fx 1000ms ease infinite 0ms;
                    animation: fx 1000ms ease infinite 0ms;
                }
                .dot:nth-child(2) {
                    -webkit-animation: fx 1000ms ease infinite 300ms;
                    animation: fx 1000ms ease infinite 300ms;
                }
                .dot:nth-child(3) {
                    -webkit-animation: fx 1000ms ease infinite 600ms;
                    animation: fx 1000ms ease infinite 600ms;
                }
                @-webkit-keyframes fx {
                    50% {
                        -webkit-transform: scale(1);
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
                @keyframes fx {
                    50% {
                        -webkit-transform: scale(1);
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            </style>
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
    }
    attachedCallback() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                try {
                    const parser = new DOMParser();
                    const $xml = parser.parseFromString(xhr.response, "text/xml");
                    const $items = $xml.querySelectorAll("item");
                    this.items = [];
                    [].forEach.call($items, ($item) => {
                        var descString = $item.querySelector("description").innerHTML.replace("<![CDATA[", "").replace("]]>", "");
                        var $desc = parser.parseFromString(descString, "text/html");
                        this.items.push({
                            "title": $item.querySelector("title").innerHTML.replace("<![CDATA[", "").replace("]]>", ""),
                            "description": $desc.querySelector("p.medium-feed-snippet").innerHTML,
                            "image": $desc.querySelector("p.medium-feed-image img").src,
                            "link": $item.querySelector("link").innerHTML,
                            "date": $item.querySelector("pubDate").innerHTML
                        });
                    });
                    this.render();
                } catch (e) {
                    console.error("Couldn't parse API response:", e);
                }
            }
        };
        xhr.open("GET", "http://cors.io/?u=https://blog.revillweb.com/feed");
        xhr.send();
    }
    render() {
        let $template = document.createElement("ul");
        this.items.forEach((item) => {
            let $li = document.createElement("li");
            $li.style.backgroundImage = `url('${item.image}')`;
            let $a = document.createElement("a");
            $a.setAttribute("href", item.link);
            $a.setAttribute("target", "_blank");
            const dateString = new Intl.DateTimeFormat("en-GB").format(new Date(item.date));
            $a.innerHTML = `<div class="date"><span>${dateString}</span></div><h3>${item.title}</h3>`;
            $li.appendChild($a);
            $template.appendChild($li);
        });
        this.shadowRoot.querySelector(".ccontent").appendChild($template);
        setTimeout(() => {
            this.shadowRoot.querySelector(".ccontainer").classList.add("loaded");
        }, 1000);
    }
}