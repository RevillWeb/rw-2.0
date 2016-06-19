/**
 * Created by Leon Revill on 11/06/16.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */
export class TwitterWidget extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
        this.shadowRoot.innerHTML = `
            <style>
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
                }
                .ccontainer.loaded .ccontent {
                    transition: top 0.7s ease;
                    top: 0;
                    z-index: 2;
                    background-color: #FFF;
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
                <div class="ccontent"><content></content></div>
            </div>
        `;
    }
    attachedCallback() {
        setTimeout(() => {
            this.shadowRoot.querySelector(".ccontainer").classList.add("loaded");
        }, 1000);
    }
}