// ==UserScript==
// @name         MAL -> SeriesGraph Linker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add an icon linking the current MAL entry to seriesgraph
// @author       Bharath
// @match        https://myanimelist.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=myanimelist.net
// @require      https://raw.githubusercontent.com/bharath6115/TamperMonkey-Scripts/refs/heads/main/utils.js
// @grant        GM_xmlhttpRequest
// @connect      seriesgraph.com
// ==/UserScript==

(function() {
    'use strict';

    let lastUrl = location.href;

    const appendSGIcon = async () =>{

        const target = document.querySelector("#horiznav_nav").children[0];
        if (!target || document.querySelector("#seriesGraphLinker")) return;

        const title = animeUtils.cleanTitle(document.querySelector(".title-name").innerText);

        const block = await seriesGraph.generateIcon(title);
        target.appendChild(block);
    }

    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href; // Always update
            if (location.href.includes("/anime/")) {
                document.querySelector("h1")?.querySelector("#seriesGraphLinker")?.remove(); // clear old icon
                setTimeout(appendSGIcon, 1000);
            }
        }
        const target = document.querySelector("h1");
        if (target && !target.querySelector("#seriesGraphLinker")) setTimeout(appendSGIcon, 1000);

    }, 1000);

    setTimeout(appendSGIcon, 500);
    setTimeout(appendSGIcon, 1500);

})();
