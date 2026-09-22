// ==UserScript==
// @name         MAL: SeriesGraph Ifram-inator
// @namespace    http://tampermonkey.net/
// @version      2026-05-25
// @description  Directly integrate Series Graph Iframe into MAL
// @author       Bharath
// @match        https://myanimelist.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=myanimelist.net
// @require      https://raw.githubusercontent.com/bharath6115/TamperMonkey-Scripts/refs/heads/main/utils.js
// @grant        GM_xmlhttpRequest
// @connect      seriesgraph.com
// ==/UserScript==

(function () {
    'use strict';

    let lastUrl = "";

    async function render( retryCount=0 ) {
        if (!location.pathname.startsWith("/anime/") || document.querySelector("#seriesGraphIframeBlock")) return;

        const titleEl = document.querySelector(".title-name");
        const parent = document.querySelector("h2#synopsis");

        if (!titleEl || !parent) {
            if(retryCount >= 15){
                console.log("Retry count exceeded!");
                return;
            }
            console.log("Retry Count: ", retryCount);
            console.log("Either of title element or parent arent found.");
            console.log("Title Element : ", titleEl);
            console.log("Parent Element : ", parent);
            setTimeout(()=>render(retryCount+1), 3000);
            return;
        }

        const title = animeUtils.cleanTitle(titleEl.innerText);
        const block = await seriesGraph.generateIframe(title);
        parent.insertAdjacentElement("beforeBegin",block);

        console.log("SeriesGraph Iframe Block Injected");
    }

    function watchRouteChanges() {
        const observer = setInterval(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                document.querySelector("#seriesGraphIframeBlock")?.remove(); //clear old Iframe
                render();
            }
        },1000);
    }

    seriesGraph.addStyles();
    render();
    watchRouteChanges();
})();
