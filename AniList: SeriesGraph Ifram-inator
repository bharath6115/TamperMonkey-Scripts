// ==UserScript==
// @name         AniList: SeriesGraph Ifram-inator
// @namespace    http://tampermonkey.net/
// @version      2026-05-23
// @description  SeriesGraph iframe Generator in AniList
// @match        https://anilist.co/*
// @require      https://raw.githubusercontent.com/bharath6115/TamperMonkey-Scripts/refs/heads/main/utils.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anilist.co
// @grant        GM_xmlhttpRequest
// @connect      seriesgraph.com
// ==/UserScript==

(function () {
    'use strict';

    let lastUrl = location.href;

    async function render( retryCount=0 ) {

        if (!location.pathname.startsWith("/anime/") || document.querySelector("#seriesGraphIframeBlock")) return;

        const titleEl = document.querySelector("h1");
        const parent = document.querySelector("div.overview");

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
        parent.prepend(block);

        console.log("SeriesGraph Iframe Block Injected");
    }

    function watchRouteChanges() {
        const observer = new MutationObserver(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                document.querySelector("#seriesGraphIframeBlock")?.remove(); //clear old Iframe
                render();
            }
        });

        //This is still the biggest inefficiency. Replacing it with History API interception would be the single biggest improvement.
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    seriesGraph.addStyles();
    render();
    watchRouteChanges();
})();
