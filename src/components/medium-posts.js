/**
 * Created by Leon Revill on 11/06/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
const LS_TS_KEY = "rw_m_ts";
const LS_DATA_KEY = "rw_m_data";
export class MediumPosts extends HTMLElement {
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

        //Grab any items from local storage
        const items = localStorage.getItem(LS_DATA_KEY);
        //Try and parse a timestamp from local storage
        let ts = null;
        try {
            ts = new Date(localStorage.getItem(LS_TS_KEY));
        } catch (e) {
            //Couldn't parse ts
        }
        //If we have some cached data and its less than an hour old, use it
        if (ts !== null && ((new Date().getTime() - ts.getTime()) <= 60000) && items !== null) {
            this.items = JSON.parse(items);
            this.render();
        } else {
            //Otherwise go and grab some new data
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    try {
                        const parser = new DOMParser();
                        const $xml = parser.parseFromString(xhr.response, "text/xml");
                        const $items = $xml.querySelectorAll("item");
                        this.items = [];
                        [].forEach.call($items, ($item) => {
                            var $desc = parser.parseFromString($item.querySelector("description").textContent, "text/html");
                            let _item = {
                                "title": $item.querySelector("title").textContent,
                                "description": $item.querySelector("description").textContent,
                                "link": $item.querySelector("link").textContent,
                                "date": $item.querySelector("pubDate").textContent
                            };
                            var _img = $desc.querySelector("p.medium-feed-image img");
                            if (_img !== null) {
                                _item.image = _img.src;
                            }
                            this.items.push(_item);
                        });
                        localStorage.setItem(LS_DATA_KEY, JSON.stringify(this.items));
                        localStorage.setItem(LS_TS_KEY, new Date());
                        this.render();
                    } catch (e) {
                        console.error("Couldn't parse API response:", e);
                    }
                }
            };
            xhr.open("GET", "http://cors.io/?u=https://blog.revillweb.com/feed");
            xhr.send();
        }
    }
    render() {
        let $template = document.createElement("ul");
        this.items.forEach((item) => {
            let $li = document.createElement("li");
            $li.style.backgroundImage = `url('${item.image}')`;
            let $a = document.createElement("a");
            $a.setAttribute("href", item.link);
            $a.setAttribute("target", "_blank");
            const dateString = new Date(item.date).toLocaleDateString();
            $a.innerHTML = `<div class="date"><span>${dateString}</span></div><h3>${item.title}</h3>`;
            $li.appendChild($a);
            $template.appendChild($li);
        });
        this.querySelector(".ccontent").appendChild($template);
        setTimeout(() => {
            this.querySelector(".ccontainer").classList.add("loaded");
        }, 1000);
    }
}