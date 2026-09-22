// ==UserScript==
// @name         Animepahe -> SeriesGraph Linker
// @namespace    http://tampermonkey.net/
// @version      2026-04-19
// @description  Show a text linking to SeriesGraph search page in external links of the anime.
// @author       Bharath
// @match        https://animepahe.pw/anime/*
// @match        https://animepahe.com/anime/*
// @match        https://animepahe.si/anime/*
// @match        https://animepahe.org/anime/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=animepahe.pw
// @require      https://raw.githubusercontent.com/bharath6115/TamperMonkey-Scripts/refs/heads/main/utils.js
// @grant        GM_xmlhttpRequest
// @connect      seriesgraph.com
// ==/UserScript==

window.addEventListener("load",async function() {
    'use strict';

    const par = document.querySelectorAll("p.external-links")[0];
    if(!par) return;
    par.appendChild(document.createTextNode(", "));


    const heading = document.querySelectorAll(".title-wrapper span")[0]
    if(!heading){
        console.log("Heading query selector is broken.");
        return;
    }

    const title = animeUtils.cleanTitle(heading.innerText);
    const SGLink = await seriesGraph.generateSrc(title);

    const a = document.createElement("a");
    a.href = SGLink;
    a.className = "font-weight-bold";
    a.title = "Search in SeriesGraph";
    a.target = "_blank";
    a.textContent = "SeriesGraph";

    par.appendChild(a);

});
