/**
 * Created by Leon Revill on 11/06/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class MediumPosts extends HTMLElement {
    createdCallback() {
        this.innerHTML = `
            <style>
                .spinner {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
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
            <div class="spinner">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
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
                    $items.forEach(($item) => {
                        var descString = $item.querySelector("description").innerHTML.replace("<![CDATA[", "").replace("]]>", "");
                        var $desc = parser.parseFromString(descString, "text/html");
                        console.log($desc);
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
        console.log("ITEMS:", this.items);
        this.items.forEach((item) => {
            let $li = document.createElement("li");
            $li.style.backgroundImage = `url('${item.image}')`;
            let $a = document.createElement("a");
            $a.setAttribute("href", item.link);
            const dateString = new Intl.DateTimeFormat().format(new Date(item.date));
            $a.innerHTML = `<div class="date"><span>${dateString}</span></div><span>${item.title}</span>`;
            $li.appendChild($a);
            $template.appendChild($li);
        });

        setTimeout(() => {
            this.innerHTML = "";
            this.appendChild($template);
        }, 1000);

    }
}