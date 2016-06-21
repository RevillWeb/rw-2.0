/**
 * Created by Leon Revill on 11/06/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
const LS_TS_KEY = "rw_gh_ts";
const LS_DATA_KEY = "rw_gh_data";
export class GithubRepos extends HTMLElement {
    attachedCallback() {
        this.innerHTML = `
            <div class="ccontainer github">
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
                        this.items = JSON.parse(xhr.response);
                        localStorage.setItem(LS_DATA_KEY, xhr.response);
                        localStorage.setItem(LS_TS_KEY, new Date());
                        this.render();
                    } catch (e) {
                        console.error("Couldn't parse API response:", e);
                    }
                }
            };
            xhr.open("GET", "https://api.github.com/users/RevillWeb/repos?sort=updated&type=owner&per_page=10");
            xhr.send();
        }
    }
    render() {
        let $template = document.createElement("ul");
        this.items.forEach((item) => {
            let $li = document.createElement("li");
            let $a = document.createElement("a");
            $a.setAttribute("href", item.html_url);
            $a.setAttribute("target", "_blank");
            const dateString = new Date(item.updated_at).toLocaleDateString();
            $a.innerHTML = `<div class="date">${dateString}</div><h3>${item.name}</h3><p class="item-description">${item.description}</p>`;
            $li.appendChild($a);
            $template.appendChild($li);
        });
        this.querySelector(".ccontent").appendChild($template);
        setTimeout(() => {
            this.querySelector(".ccontainer").classList.add("loaded");
        }, 1000);
    }
}